import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SliderInput from "@/components/tools/SliderInput";
import ResultCard from "@/components/tools/ResultCard";
import FAQSection from "@/components/tools/FAQSection";
import SEOHead from "@/components/tools/SEOHead";

const BASE_URL = "https://visualfinancelab.com";

const formatCurrency = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `$${(n / 1_000).toFixed(1)}K`
    : `$${n.toFixed(0)}`;

const goalFAQs = [
  {
    question: "How accurate is the savings goal calculator?",
    answer: "Our calculator uses standard compound interest formulas that financial professionals rely on. It provides a close estimate based on the inputs you provide — starting amount, monthly contributions, and expected annual return. Real-world results may vary due to market fluctuations, fees, and taxes, but the projections are mathematically precise for the given assumptions.",
  },
  {
    question: "Does it include compound interest?",
    answer: "Yes! Compound interest is at the core of this simulator. Your returns are compounded monthly, meaning you earn interest not only on your principal but also on previously accumulated interest. This is exactly how most investment accounts and savings vehicles work in practice.",
  },
  {
    question: "What return rate should I assume?",
    answer: "For a diversified stock portfolio, a commonly used long-term average is 7–10% annually before inflation. For bonds or savings accounts, 2–5% is more realistic. Conservative planners often use 6–7% to account for inflation. Use our slider to explore different scenarios and see how return rate impacts your timeline.",
  },
  {
    question: "Can I use it for SIP (Systematic Investment Plan) investments?",
    answer: "Absolutely. A SIP is essentially a fixed monthly contribution, which is exactly what the 'Monthly Contribution' slider represents. Set your SIP amount, expected fund return rate, and goal — and the simulator will show you the projected growth path, milestones, and timeline.",
  },
  {
    question: "What happens if I increase monthly savings?",
    answer: "Increasing your monthly savings has a dramatic compounding effect. Even a small increase — say $50 to $100 more per month — can shave years off your goal timeline. Use the slider to see the impact in real time. The chart updates instantly to reflect how higher contributions accelerate growth.",
  },
  {
    question: "Is inflation considered in the calculations?",
    answer: "This version of the simulator does not explicitly adjust for inflation. To account for inflation, you can use a 'real return rate' — subtract the expected inflation rate (typically 2–3%) from your nominal return rate. For example, if you expect 8% returns and 3% inflation, use 5% as your annual return.",
  },
];

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
      <SEOHead
        title="Financial Goal Calculator — Time to Reach Savings Goal | Visual Finance Lab"
        description="Free financial goal calculator to see how long it takes to reach your savings goal with compound interest. Visualize growth, milestones, and contributions instantly."
        breadcrumbs={[
          { name: "Home", url: BASE_URL },
          { name: "Tools", url: `${BASE_URL}/tools` },
          { name: "Goal Simulator", url: `${BASE_URL}/tools/goal-simulator` },
        ]}
        appSchema={{
          name: "Money Goal Simulator",
          description: "Interactive financial goal calculator with compound interest visualization",
          url: `${BASE_URL}/tools/goal-simulator`,
          category: "FinanceApplication",
        }}
      />

      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Goal Simulator</span>
          </nav>

          {/* Introduction */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
              Money Goal Simulator — Financial Goal Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              See how your savings grow with compound interest over time. This free financial goal calculator helps you visualize the path to any savings target — whether it's an emergency fund, a down payment, or retirement.
            </p>
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
                      <XAxis dataKey="month" tickFormatter={(m) => `${(m / 12).toFixed(0)}y`} stroke="hsl(215, 15%, 35%)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={(v) => formatCurrency(v)} stroke="hsl(215, 15%, 35%)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
                      <Tooltip
                        contentStyle={{ background: "hsl(220, 20%, 12%)", border: "1px solid hsl(220, 16%, 24%)", borderRadius: "8px", fontSize: "12px" }}
                        labelFormatter={(m) => `Month ${m} (${(Number(m) / 12).toFixed(1)} yr)`}
                        formatter={(v: number, name: string) => [formatCurrency(v), name === "balance" ? "Balance" : "Invested"]}
                      />
                      <ReferenceLine y={goalAmount} stroke="hsl(38, 92%, 55%)" strokeDasharray="6 4" label={{ value: "Goal", fill: "hsl(38, 92%, 55%)", fontSize: 11, position: "right" }} />
                      <Area type="monotone" dataKey="invested" stroke="hsl(215, 15%, 45%)" fill="url(#investedGrad)" strokeWidth={1.5} />
                      <Area type="monotone" dataKey="balance" stroke="hsl(174, 72%, 46%)" fill="url(#growthGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <section className="py-12 md:py-16 border-t border-border/30 mt-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">How the Savings Goal Calculator Works</h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">The Formula</h3>
                <p className="mb-3">
                  This calculator uses the <strong className="text-foreground">future value of an annuity formula</strong> combined with compound interest on your starting balance. Each month, your balance grows by: <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">New Balance = (Previous Balance + Monthly Contribution) × (1 + Monthly Rate)</code>.
                </p>
                <p>
                  The monthly rate is derived from your annual return: <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">Monthly Rate = Annual Return ÷ 12</code>. This compounding happens every month, which is why even small increases in contributions or return rates have outsized effects over time.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">Understanding the Inputs</h3>
                <ul className="space-y-2">
                  <li><strong className="text-foreground">Starting Amount:</strong> How much you already have saved. Even a small head start significantly accelerates growth.</li>
                  <li><strong className="text-foreground">Monthly Contribution:</strong> The fixed amount you add each month — like a SIP or auto-transfer to a savings account.</li>
                  <li><strong className="text-foreground">Annual Return:</strong> The expected yearly return on your investments. Use historical averages or conservative estimates.</li>
                  <li><strong className="text-foreground">Goal Amount:</strong> Your financial target. The simulator shows milestones at 25%, 50%, 75%, and 100% of your goal.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <section className="pb-4">
            <h2 className="text-xl font-heading font-semibold mb-4">Related Articles</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/articles/compound-interest" className="text-sm text-primary hover:underline">How Compound Interest Grows Wealth →</Link>
              <Link to="/articles/safe-risk-levels" className="text-sm text-primary hover:underline">How to Set Safe Risk Levels →</Link>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={goalFAQs} />
        </div>
      </div>
    </Layout>
  );
};

export default GoalSimulator;
