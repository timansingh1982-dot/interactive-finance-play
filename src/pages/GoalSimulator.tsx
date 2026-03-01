import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import Layout from "@/components/Layout";
import SliderInput from "@/components/tools/SliderInput";
import ResultCard from "@/components/tools/ResultCard";

const formatCurrency = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `$${(n / 1_000).toFixed(1)}K`
    : `$${n.toFixed(0)}`;

const GoalSimulator = () => {
  const [startAmount, setStartAmount] = useState(5000);
  const [monthlyContrib, setMonthlyContrib] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [goalAmount, setGoalAmount] = useState(100000);

  const results = useMemo(() => {
    const monthlyRate = annualReturn / 100 / 12;
    const data: { month: number; balance: number; invested: number }[] = [];
    let balance = startAmount;
    let invested = startAmount;
    let goalMonth = -1;
    const milestones: Record<string, number> = {};

    for (let m = 0; m <= 600; m++) {
      data.push({ month: m, balance: Math.round(balance), invested: Math.round(invested) });

      const pct = balance / goalAmount;
      for (const p of [0.25, 0.5, 0.75, 1]) {
        const key = `${p * 100}%`;
        if (!(key in milestones) && pct >= p) {
          milestones[key] = m;
        }
      }

      if (goalMonth === -1 && balance >= goalAmount) {
        goalMonth = m;
      }

      if (goalMonth !== -1 && m >= goalMonth + 12) break;

      balance = (balance + monthlyContrib) * (1 + monthlyRate);
      invested += monthlyContrib;
    }

    const totalInvested = goalMonth >= 0 ? data[goalMonth]?.invested ?? invested : invested;
    const totalGrowth = goalMonth >= 0 ? (data[goalMonth]?.balance ?? balance) - totalInvested : balance - invested;
    const progress = Math.min(100, (data[data.length - 1]?.balance / goalAmount) * 100);

    return { data, goalMonth, totalInvested, totalGrowth, milestones, progress };
  }, [startAmount, monthlyContrib, annualReturn, goalAmount]);

  const yearsToGoal = results.goalMonth >= 0 ? (results.goalMonth / 12).toFixed(1) : "50+";

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
              Money Goal Simulator
            </h1>
            <p className="text-muted-foreground">See how your savings grow with compound interest over time.</p>
          </div>

          <div className="grid lg:grid-cols-[340px_1fr] gap-6">
            {/* Controls */}
            <div className="glass-card p-6 space-y-6 h-fit">
              <SliderInput label="Starting Amount" value={startAmount} min={0} max={100000} step={1000} onChange={setStartAmount} format={formatCurrency} />
              <SliderInput label="Monthly Contribution" value={monthlyContrib} min={0} max={5000} step={50} onChange={setMonthlyContrib} format={formatCurrency} />
              <SliderInput label="Annual Return" value={annualReturn} min={1} max={20} step={0.5} onChange={setAnnualReturn} unit="%" />
              <SliderInput label="Goal Amount" value={goalAmount} min={10000} max={2000000} step={10000} onChange={setGoalAmount} format={formatCurrency} />
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <ResultCard label="Time to Goal" value={`${yearsToGoal} yr`} variant="primary" />
                <ResultCard label="Total Invested" value={formatCurrency(results.totalInvested)} />
                <ResultCard label="Total Growth" value={formatCurrency(results.totalGrowth)} variant="primary" sublabel="from compound interest" />
                <ResultCard label="Goal Progress" value={`${Math.round(results.progress)}%`} variant={results.progress >= 100 ? "primary" : "accent"} />
              </div>

              {/* Progress Bar */}
              <div className="glass-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Progress to {formatCurrency(goalAmount)}</span>
                  <span className="text-xs font-semibold text-primary">{Math.round(results.progress)}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700 ease-out progress-animate"
                    style={{ width: `${Math.min(100, results.progress)}%` }}
                  />
                </div>
                {/* Milestones */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {Object.entries(results.milestones).map(([pct, month]) => (
                    <span key={pct} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
                      {pct} at {(month / 12).toFixed(1)} yr
                    </span>
                  ))}
                </div>
              </div>

              {/* Chart */}
              <div className="glass-card p-4 md:p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Growth Over Time</h3>
                <div className="h-[300px] md:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                      <defs>
                        <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(174, 72%, 46%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(174, 72%, 46%)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(215, 15%, 55%)" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="hsl(215, 15%, 55%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="month"
                        tickFormatter={(m) => `${(m / 12).toFixed(0)}y`}
                        stroke="hsl(215, 15%, 35%)"
                        tick={{ fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tickFormatter={(v) => formatCurrency(v)}
                        stroke="hsl(215, 15%, 35%)"
                        tick={{ fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        width={60}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(220, 20%, 12%)",
                          border: "1px solid hsl(220, 16%, 24%)",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        labelFormatter={(m) => `Month ${m} (${(Number(m) / 12).toFixed(1)} yr)`}
                        formatter={(v: number, name: string) => [formatCurrency(v), name === "balance" ? "Balance" : "Invested"]}
                      />
                      <ReferenceLine
                        y={goalAmount}
                        stroke="hsl(38, 92%, 55%)"
                        strokeDasharray="6 4"
                        label={{ value: "Goal", fill: "hsl(38, 92%, 55%)", fontSize: 11, position: "right" }}
                      />
                      <Area type="monotone" dataKey="invested" stroke="hsl(215, 15%, 45%)" fill="url(#investedGrad)" strokeWidth={1.5} />
                      <Area type="monotone" dataKey="balance" stroke="hsl(174, 72%, 46%)" fill="url(#growthGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GoalSimulator;
