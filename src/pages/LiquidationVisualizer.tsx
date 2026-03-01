import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import Layout from "@/components/Layout";
import SliderInput from "@/components/tools/SliderInput";
import ResultCard from "@/components/tools/ResultCard";
import RiskMeter from "@/components/tools/RiskMeter";

const formatPrice = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const LiquidationVisualizer = () => {
  const [capital, setCapital] = useState(10000);
  const [leverage, setLeverage] = useState(10);
  const [entryPrice, setEntryPrice] = useState(50000);
  const [isLong, setIsLong] = useState(true);
  const [maintenanceMargin, setMaintenanceMargin] = useState(1);

  const results = useMemo(() => {
    const positionSize = capital * leverage;
    const mmDecimal = maintenanceMargin / 100;

    // Liquidation price calculation
    let liqPrice: number;
    if (isLong) {
      liqPrice = entryPrice * (1 - (1 / leverage) + mmDecimal);
    } else {
      liqPrice = entryPrice * (1 + (1 / leverage) - mmDecimal);
    }

    const moveToLiq = Math.abs((liqPrice - entryPrice) / entryPrice) * 100;
    const riskScore = Math.min(100, (1 / moveToLiq) * 100 * 5); // higher leverage = higher risk

    // Generate price chart data
    const range = Math.abs(entryPrice - liqPrice) * 2.5;
    const low = Math.min(entryPrice, liqPrice) - range * 0.2;
    const high = Math.max(entryPrice, liqPrice) + range * 0.2;
    const steps = 50;
    const stepSize = (high - low) / steps;

    const chartData = [];
    for (let i = 0; i <= steps; i++) {
      const price = low + stepSize * i;
      let pnl: number;
      if (isLong) {
        pnl = ((price - entryPrice) / entryPrice) * positionSize;
      } else {
        pnl = ((entryPrice - price) / entryPrice) * positionSize;
      }
      chartData.push({
        price: Math.round(price),
        pnl: Math.round(pnl),
      });
    }

    return { liqPrice, moveToLiq, riskScore, positionSize, chartData };
  }, [capital, leverage, entryPrice, isLong, maintenanceMargin]);

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
              Leverage Liquidation Visualizer
            </h1>
            <p className="text-muted-foreground">Understand your liquidation risk before you trade.</p>
          </div>

          <div className="grid lg:grid-cols-[340px_1fr] gap-6">
            {/* Controls */}
            <div className="glass-card p-6 space-y-6 h-fit">
              <SliderInput label="Capital" value={capital} min={100} max={100000} step={500} onChange={setCapital} format={formatPrice} />
              <SliderInput label="Leverage" value={leverage} min={2} max={125} step={1} onChange={setLeverage} unit="x" />
              <SliderInput label="Entry Price" value={entryPrice} min={100} max={200000} step={100} onChange={setEntryPrice} format={formatPrice} />
              <SliderInput label="Maintenance Margin" value={maintenanceMargin} min={0.5} max={5} step={0.25} onChange={setMaintenanceMargin} unit="%" />

              {/* Position Type Toggle */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-3 block">Position Type</label>
                <div className="flex rounded-lg bg-secondary p-1">
                  <button
                    onClick={() => setIsLong(true)}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${
                      isLong ? "bg-success/20 text-success" : "text-muted-foreground"
                    }`}
                  >
                    Long
                  </button>
                  <button
                    onClick={() => setIsLong(false)}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${
                      !isLong ? "bg-danger/20 text-danger" : "text-muted-foreground"
                    }`}
                  >
                    Short
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <ResultCard
                  label="Liquidation Price"
                  value={formatPrice(results.liqPrice)}
                  variant="danger"
                />
                <ResultCard
                  label="% Move to Liquidation"
                  value={`${results.moveToLiq.toFixed(2)}%`}
                  variant={results.moveToLiq < 5 ? "danger" : results.moveToLiq < 15 ? "accent" : "primary"}
                />
                <ResultCard
                  label="Position Size"
                  value={formatPrice(results.positionSize)}
                  sublabel={`${leverage}x leverage`}
                />
              </div>

              <RiskMeter risk={results.riskScore} />

              {/* Chart */}
              <div className="glass-card p-4 md:p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">P&L vs Price</h3>
                <div className="h-[300px] md:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                      <defs>
                        <linearGradient id="pnlGradPos" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(152, 68%, 46%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(152, 68%, 46%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="price"
                        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                        stroke="hsl(215, 15%, 35%)"
                        tick={{ fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                        stroke="hsl(215, 15%, 35%)"
                        tick={{ fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        width={55}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(220, 20%, 12%)",
                          border: "1px solid hsl(220, 16%, 24%)",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        formatter={(v: number) => [formatPrice(v), "P&L"]}
                        labelFormatter={(v) => `Price: ${formatPrice(Number(v))}`}
                      />
                      <ReferenceLine
                        x={Math.round(results.liqPrice)}
                        stroke="hsl(0, 72%, 55%)"
                        strokeDasharray="6 4"
                        label={{ value: "Liquidation", fill: "hsl(0, 72%, 55%)", fontSize: 11, position: "top" }}
                      />
                      <ReferenceLine
                        x={entryPrice}
                        stroke="hsl(174, 72%, 46%)"
                        strokeDasharray="4 4"
                        label={{ value: "Entry", fill: "hsl(174, 72%, 46%)", fontSize: 11, position: "top" }}
                      />
                      <ReferenceLine y={0} stroke="hsl(215, 15%, 30%)" />
                      <Area
                        type="monotone"
                        dataKey="pnl"
                        stroke="hsl(174, 72%, 46%)"
                        fill="url(#pnlGradPos)"
                        strokeWidth={2}
                      />
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

export default LiquidationVisualizer;
