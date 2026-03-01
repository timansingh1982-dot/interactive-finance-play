import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/tools/SEOHead";

const BASE_URL = "https://visualfinancelab.com";

const SafeRiskLevels = () => (
  <Layout>
    <SEOHead
      title="How to Set Safe Risk Levels in Trading & Investing — Visual Finance Lab"
      description="Learn practical risk management strategies for both investors and traders. Understand position sizing, portfolio allocation, and how to protect your capital."
      breadcrumbs={[
        { name: "Home", url: BASE_URL },
        { name: "Articles", url: `${BASE_URL}/articles` },
        { name: "Safe Risk Levels", url: `${BASE_URL}/articles/safe-risk-levels` },
      ]}
    />
    <article className="container py-12 md:py-16 max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground">Safe Risk Levels</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">How to Set Safe Risk Levels</h1>

      <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
        <p>
          Risk management is the single most important skill in both investing and trading. It's not about avoiding risk entirely — it's about understanding, measuring, and controlling it so that no single decision can derail your financial future.
        </p>

        <h2 className="text-xl font-heading font-semibold text-foreground mt-8 mb-3">The 1% Rule</h2>
        <p>
          Professional traders follow the 1% rule: never risk more than 1% of your total capital on a single trade. If you have a $50,000 account, your maximum loss on any trade should be $500. This means even a string of 10 losing trades only costs you 10% of your portfolio — painful but survivable.
        </p>

        <h2 className="text-xl font-heading font-semibold text-foreground mt-8 mb-3">Position Sizing</h2>
        <p>
          Position sizing determines how much capital you allocate to each trade or investment. It's directly tied to risk management. The formula is simple: <strong className="text-foreground">Position Size = Risk Amount ÷ Distance to Stop Loss</strong>.
        </p>
        <p>
          For example, if you're willing to risk $500 and your stop loss is 5% below entry, your position size should be $10,000. This ensures you lose exactly $500 if the stop is hit — regardless of the asset's price.
        </p>

        <h2 className="text-xl font-heading font-semibold text-foreground mt-8 mb-3">For Long-Term Investors</h2>
        <p>
          Risk management for investors looks different from traders. Key principles include:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-foreground">Diversification:</strong> Spread across asset classes (stocks, bonds, real estate, cash) to reduce correlated losses.</li>
          <li><strong className="text-foreground">Age-based allocation:</strong> A common rule is "110 minus your age" in stocks, with the rest in bonds. A 30-year-old might hold 80% stocks, 20% bonds.</li>
          <li><strong className="text-foreground">Emergency fund first:</strong> Keep 3–6 months of expenses in liquid savings before investing aggressively.</li>
          <li><strong className="text-foreground">Rebalance regularly:</strong> If one asset class grows disproportionately, rebalance to maintain your target allocation.</li>
        </ul>

        <h2 className="text-xl font-heading font-semibold text-foreground mt-8 mb-3">For Leveraged Traders</h2>
        <p>
          Leverage multiplies risk, making position sizing and stop-losses even more critical. Use our <Link to="/tools/liquidation-visualizer" className="text-primary hover:underline font-medium">Liquidation Visualizer</Link> to see exactly where your risk threshold lies. Combine it with our <Link to="/tools/goal-simulator" className="text-primary hover:underline font-medium">Goal Simulator</Link> to plan how profits compound when you trade safely over time.
        </p>

        <h2 className="text-xl font-heading font-semibold text-foreground mt-8 mb-3">The Bottom Line</h2>
        <p>
          The goal isn't to maximize any single trade's return — it's to stay in the game long enough for compounding to work in your favor. The best traders and investors are the ones who survive the longest. Risk management is how you survive.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-border/30">
        <h3 className="text-lg font-heading font-semibold mb-3">Related Tools & Articles</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/tools/goal-simulator" className="text-sm text-primary hover:underline">Money Goal Simulator →</Link>
          <Link to="/tools/liquidation-visualizer" className="text-sm text-primary hover:underline">Liquidation Visualizer →</Link>
          <Link to="/articles/compound-interest" className="text-sm text-primary hover:underline">How Compound Interest Grows Wealth →</Link>
        </div>
      </div>
    </article>
  </Layout>
);

export default SafeRiskLevels;
