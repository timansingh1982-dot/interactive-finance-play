import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SliderInput from "@/components/tools/SliderInput";
import ResultCard from "@/components/tools/ResultCard";
import RiskMeter from "@/components/tools/RiskMeter";
import FAQSection from "@/components/tools/FAQSection";
import SEOHead from "@/components/tools/SEOHead";

const BASE_URL = "https://visualfinancelab.com";

const formatPrice = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const liqFAQs = [
  {
    question: "What is liquidation in trading?",
    answer: "Liquidation occurs when your trading position is automatically closed by the exchange because your margin (collateral) can no longer cover potential losses. When the market moves against your leveraged position beyond a certain threshold, the exchange sells your assets to prevent further losses. This means you lose most or all of your initial capital for that trade.",
  },
  {
    question: "How is liquidation price calculated?",
    answer: "For a long position, the liquidation price is calculated as: Entry Price × (1 - 1/Leverage + Maintenance Margin%). For a short position: Entry Price × (1 + 1/Leverage - Maintenance Margin%). The maintenance margin is the minimum collateral percentage required by the exchange to keep the position open. Our tool uses these standard formulas used by most major exchanges.",
  },
  {
    question: "Is this tool accurate for crypto exchanges?",
    answer: "This tool uses the standard isolated-margin liquidation formula that most major crypto exchanges (Binance, Bybit, OKX) employ. However, each exchange may have slight variations in how they handle fees, funding rates, and partial liquidations. For exact figures, always cross-reference with your exchange's liquidation calculator. Our tool is best used for understanding risk dynamics rather than pinpointing exact liquidation prices.",
  },
  {
    question: "What leverage level is safe?",
    answer: "There is no universally 'safe' leverage level — it depends on the asset's volatility. For Bitcoin, 2-5x is considered moderate, while 10x+ is high risk. For highly volatile altcoins, even 3x can be dangerous. A good rule of thumb: if the % move to liquidation is less than the asset's average daily price swing, your position is at extreme risk. Use our risk meter to gauge your exposure visually.",
  },
  {
    question: "How does margin affect liquidation?",
    answer: "Higher maintenance margin requirements mean you get liquidated sooner — the exchange requires you to maintain a larger safety buffer. Cross-margin mode uses your entire account balance as collateral, giving you more buffer but risking your whole account. Isolated margin limits risk to the specific position's collateral. Our tool simulates isolated margin, which is what most traders should use for risk management.",
  },
  {
    question: "Can I avoid liquidation completely?",
    answer: "You can significantly reduce liquidation risk by: (1) using lower leverage — 2-3x instead of 10x+, (2) setting stop-losses well above your liquidation price, (3) adding more margin to your position if it moves against you, and (4) sizing your positions appropriately relative to your total capital. The best traders never risk more than 1-2% of their portfolio on a single leveraged trade.",
  },
];

const LiquidationVisualizer = () => {
  const [capital, setCapital] = useState(10000);
  const [leverage, setLeverage] = useState(10);
  const [entryPrice, setEntryPrice] = useState(50000);
  const [isLong, setIsLong] = useState(true);
  const [maintenanceMargin, setMaintenanceMargin] = useState(1);

  const results = useMemo(() => {
    const positionSize = capital * leverage;
    const mmDecimal = maintenanceMargin / 100;

    let liqPrice: number;
    if (isLong) {
      liqPrice = entryPrice * (1 - (1 / leverage) + mmDecimal);
    } else {
      liqPrice = entryPrice * (1 + (1 / leverage) - mmDecimal);
    }

    const moveToLiq = Math.abs((liqPrice - entryPrice) / entryPrice) * 100;
    const riskScore = Math.min(100, (1 / moveToLiq) * 100 * 5);

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
      chartData.push({ price: Math.round(price), pnl: Math.round(pnl) });
    }

    return { liqPrice, moveToLiq, riskScore, positionSize, chartData };
  }, [capital, leverage, entryPrice, isLong, maintenanceMargin]);

  return (
    <Layout>
      <SEOHead
        title="Liquidation Price Calculator — Leverage Risk Calculator | Visual Finance Lab"
        description="Free liquidation price calculator for leveraged trading. Visualize your liquidation risk, margin levels, and P&L with an interactive leverage risk calculator."
        breadcrumbs={[
          { name: "Home", url: BASE_URL },
          { name: "Tools", url: `${BASE_URL}/tools` },
          { name: "Liquidation Visualizer", url: `${BASE_URL}/tools/liquidation-visualizer` },
        ]}
        appSchema={{
          name: "Leverage Liquidation Visualizer",
          description: "Interactive liquidation price calculator for leveraged trading positions",
          url: `${BASE_URL}/tools/liquidation-visualizer`,
          category: "FinanceApplication",
        }}
      />

      <div className="container py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Liquidation Visualizer</span>
          </nav>

          {/* Introduction */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
              Leverage Liquidation Visualizer — Liquidation Price Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Understand your liquidation risk before you trade. This free leverage risk calculator visually shows how leverage, margin, and price movements determine when your position gets liquidated — helping you trade smarter and protect your capital.
            </p>
          </div>

          <div className="grid lg:grid-cols-[340px_1fr] gap-6">
            {/* Controls */}
            <div className="glass-card p-6 space-y-6 h-fit">
              <SliderInput label="Capital" value={capital} min={100} max={100000} step={500} onChange={setCapital} format={formatPrice} />
              <SliderInput label="Leverage" value={leverage} min={2} max={125} step={1} onChange={setLeverage} unit="x" />
              <SliderInput label="Entry Price" value={entryPrice} min={100} max={200000} step={100} onChange={setEntryPrice} format={formatPrice} />
              <SliderInput label="Maintenance Margin" value={maintenanceMargin} min={0.5} max={5} step={0.25} onChange={setMaintenanceMargin} unit="%" />

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-3 block">Position Type</label>
                <div className="flex rounded-lg bg-secondary p-1">
                  <button
                    onClick={() => setIsLong(true)}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${isLong ? "bg-success/20 text-success" : "text-muted-foreground"}`}
                  >
                    Long
                  </button>
                  <button
                    onClick={() => setIsLong(false)}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${!isLong ? "bg-danger/20 text-danger" : "text-muted-foreground"}`}
                  >
                    Short
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <ResultCard label="Liquidation Price" value={formatPrice(results.liqPrice)} variant="danger" />
                <ResultCard label="% Move to Liquidation" value={`${results.moveToLiq.toFixed(2)}%`} variant={results.moveToLiq < 5 ? "danger" : results.moveToLiq < 15 ? "accent" : "primary"} />
                <ResultCard label="Position Size" value={formatPrice(results.positionSize)} sublabel={`${leverage}x leverage`} />
              </div>

              <RiskMeter risk={results.riskScore} />

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
                      <XAxis dataKey="price" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} stroke="hsl(215, 15%, 35%)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} stroke="hsl(215, 15%, 35%)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={55} />
                      <Tooltip
                        contentStyle={{ background: "hsl(220, 20%, 12%)", border: "1px solid hsl(220, 16%, 24%)", borderRadius: "8px", fontSize: "12px" }}
                        formatter={(v: number) => [formatPrice(v), "P&L"]}
                        labelFormatter={(v) => `Price: ${formatPrice(Number(v))}`}
                      />
                      <ReferenceLine x={Math.round(results.liqPrice)} stroke="hsl(0, 72%, 55%)" strokeDasharray="6 4" label={{ value: "Liquidation", fill: "hsl(0, 72%, 55%)", fontSize: 11, position: "top" }} />
                      <ReferenceLine x={entryPrice} stroke="hsl(174, 72%, 46%)" strokeDasharray="4 4" label={{ value: "Entry", fill: "hsl(174, 72%, 46%)", fontSize: 11, position: "top" }} />
                      <ReferenceLine y={0} stroke="hsl(215, 15%, 30%)" />
                      <Area type="monotone" dataKey="pnl" stroke="hsl(174, 72%, 46%)" fill="url(#pnlGradPos)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <section className="py-12 md:py-16 border-t border-border/30 mt-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">How the Liquidation Price Calculator Works</h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">The Formulas</h3>
                <p className="mb-3">
                  For a <strong className="text-foreground">long position</strong>, the liquidation price is: <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">Liq Price = Entry × (1 - 1/Leverage + Maintenance Margin%)</code>.
                </p>
                <p className="mb-3">
                  For a <strong className="text-foreground">short position</strong>: <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">Liq Price = Entry × (1 + 1/Leverage - Maintenance Margin%)</code>.
                </p>
                <p>
                  The risk meter calculates how far the current price would need to move (as a percentage) to trigger liquidation. Positions with less than 5% buffer are flagged as extreme risk.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">Understanding the Inputs</h3>
                <ul className="space-y-2">
                  <li><strong className="text-foreground">Capital:</strong> Your initial margin — the collateral you're putting up for the trade.</li>
                  <li><strong className="text-foreground">Leverage:</strong> The multiplier on your capital. 10x means you control 10× your capital in position size.</li>
                  <li><strong className="text-foreground">Entry Price:</strong> The price at which you open the position.</li>
                  <li><strong className="text-foreground">Maintenance Margin:</strong> The minimum margin percentage required by the exchange. Typically 0.5%–5%.</li>
                  <li><strong className="text-foreground">Position Type:</strong> Long = profit when price goes up. Short = profit when price goes down.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <section className="pb-4">
            <h2 className="text-xl font-heading font-semibold mb-4">Related Articles</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/articles/leverage-trading" className="text-sm text-primary hover:underline">What Leverage Does to Traders →</Link>
              <Link to="/articles/safe-risk-levels" className="text-sm text-primary hover:underline">How to Set Safe Risk Levels →</Link>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={liqFAQs} />
        </div>
      </div>
    </Layout>
  );
};

export default LiquidationVisualizer;
