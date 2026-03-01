import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/tools/SEOHead";

const BASE_URL = "https://visualfinancelab.com";

const LeverageTrading = () => (
  <Layout>
    <SEOHead
      title="What Leverage Does to Traders — Visual Finance Lab"
      description="Understand how leverage amplifies both gains and losses in trading, why most leveraged traders lose money, and how to manage risk effectively."
      breadcrumbs={[
        { name: "Home", url: BASE_URL },
        { name: "Articles", url: `${BASE_URL}/articles` },
        { name: "Leverage Trading", url: `${BASE_URL}/articles/leverage-trading` },
      ]}
    />
    <article className="container py-12 md:py-16 max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground">Leverage Trading</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">What Leverage Does to Traders</h1>

      <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
        <p>
          Leverage is one of the most misunderstood concepts in trading. It promises amplified gains but delivers amplified losses just as efficiently. Understanding how leverage actually works — mathematically and psychologically — is essential before risking real capital.
        </p>

        <h2 className="text-xl font-heading font-semibold text-foreground mt-8 mb-3">How Leverage Works</h2>
        <p>
          When you trade with 10× leverage, you're controlling a position worth 10 times your actual capital. If you deposit $1,000 and use 10× leverage, you're trading with $10,000 of exposure. A 5% price move in your favor means a 50% gain on your capital. But a 5% move against you means a 50% loss — and a 10% adverse move wipes out your entire position.
        </p>

        <h2 className="text-xl font-heading font-semibold text-foreground mt-8 mb-3">The Liquidation Trap</h2>
        <p>
          Every leveraged position has a liquidation price — the point where the exchange automatically closes your position because your margin can no longer cover potential losses. At 10× leverage, your liquidation price is roughly 10% away from your entry. At 50×, it's only 2% away.
        </p>
        <p>
          Crypto markets regularly swing 5–15% in a single day. This means high-leverage positions can be liquidated within hours or even minutes of being opened, even if the longer-term trade thesis is correct.
        </p>

        <h2 className="text-xl font-heading font-semibold text-foreground mt-8 mb-3">Why Most Leveraged Traders Lose</h2>
        <p>
          Studies consistently show that 70–80% of retail leveraged traders lose money. The reasons are mathematical, not just psychological:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-foreground">Asymmetric risk:</strong> A 50% loss requires a 100% gain just to break even.</li>
          <li><strong className="text-foreground">Funding costs:</strong> Leveraged positions often carry hourly or daily funding fees that silently erode your margin.</li>
          <li><strong className="text-foreground">Volatility exposure:</strong> Higher leverage means normal market noise can trigger liquidation.</li>
          <li><strong className="text-foreground">Overconfidence:</strong> Early wins with leverage create false confidence, leading to larger and riskier bets.</li>
        </ul>

        <h2 className="text-xl font-heading font-semibold text-foreground mt-8 mb-3">Managing Leverage Risk</h2>
        <p>
          If you choose to use leverage, follow these guidelines: use no more than 2–5× for most trades, always set stop-losses, never risk more than 1–2% of your total capital on a single trade, and always know your liquidation price before entering a position.
        </p>
        <p>
          Our <Link to="/tools/liquidation-visualizer" className="text-primary hover:underline font-medium">Liquidation Visualizer</Link> helps you see exactly where your liquidation price sits and how different leverage levels change your risk profile — before you put real money on the line.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-border/30">
        <h3 className="text-lg font-heading font-semibold mb-3">Related Tools & Articles</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/tools/liquidation-visualizer" className="text-sm text-primary hover:underline">Liquidation Visualizer →</Link>
          <Link to="/articles/safe-risk-levels" className="text-sm text-primary hover:underline">How to Set Safe Risk Levels →</Link>
        </div>
      </div>
    </article>
  </Layout>
);

export default LeverageTrading;
