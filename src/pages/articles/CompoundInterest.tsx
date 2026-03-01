import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/tools/SEOHead";

const BASE_URL = "https://visualfinancelab.com";

const CompoundInterest = () => (
  <Layout>
    <SEOHead
      title="How Compound Interest Grows Wealth — Visual Finance Lab"
      description="Learn how compound interest works, why it's the most powerful force in personal finance, and how to harness it for your savings goals."
      breadcrumbs={[
        { name: "Home", url: BASE_URL },
        { name: "Articles", url: `${BASE_URL}/articles` },
        { name: "Compound Interest", url: `${BASE_URL}/articles/compound-interest` },
      ]}
    />
    <article className="container py-12 md:py-16 max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground">Compound Interest</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">How Compound Interest Grows Wealth</h1>

      <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
        <p>
          Albert Einstein reportedly called compound interest "the eighth wonder of the world." Whether or not he actually said it, the math behind compound interest is genuinely remarkable — and understanding it is one of the most important financial skills you can develop.
        </p>

        <h2 className="text-xl font-heading font-semibold text-foreground mt-8 mb-3">What Is Compound Interest?</h2>
        <p>
          Simple interest earns returns only on your original principal. Compound interest earns returns on your principal <em>and</em> on previously earned interest. This creates an exponential growth curve rather than a linear one.
        </p>
        <p>
          For example, $10,000 invested at 8% annual return grows to $10,800 after one year. In year two, you earn 8% on $10,800 — not just the original $10,000. That's $864 instead of $800. The difference seems small at first, but over decades it becomes enormous.
        </p>

        <h2 className="text-xl font-heading font-semibold text-foreground mt-8 mb-3">The Power of Time</h2>
        <p>
          The real magic of compounding is time. Over 10 years at 8%, $10,000 becomes $21,589. Over 30 years, it becomes $100,627 — more than 10× your original investment, with no additional contributions. Add monthly contributions of $500, and after 30 years you'd have over $780,000.
        </p>
        <p>
          This is why starting early matters more than starting big. Someone who invests $200/month starting at age 25 will likely have more at retirement than someone who invests $400/month starting at age 35, assuming the same return rate.
        </p>

        <h2 className="text-xl font-heading font-semibold text-foreground mt-8 mb-3">How to Harness Compounding</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-foreground">Start as early as possible</strong> — time is the most powerful variable in the compounding equation.</li>
          <li><strong className="text-foreground">Be consistent</strong> — regular monthly contributions (like SIPs) take advantage of dollar-cost averaging and keep compounding working for you.</li>
          <li><strong className="text-foreground">Reinvest dividends and returns</strong> — withdrawing interest breaks the compounding chain.</li>
          <li><strong className="text-foreground">Minimize fees</strong> — even 1% in annual fees can reduce your final portfolio by 25%+ over 30 years.</li>
        </ul>

        <h2 className="text-xl font-heading font-semibold text-foreground mt-8 mb-3">See It in Action</h2>
        <p>
          Numbers on a page can only do so much. To truly internalize the power of compounding, you need to <em>see</em> the growth curve — watch it bend upward as years pass. That's exactly what our <Link to="/tools/goal-simulator" className="text-primary hover:underline font-medium">Money Goal Simulator</Link> lets you do. Adjust your contributions, return rate, and goal, and watch the exponential curve unfold in real time.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-border/30">
        <h3 className="text-lg font-heading font-semibold mb-3">Related Tools & Articles</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/tools/goal-simulator" className="text-sm text-primary hover:underline">Money Goal Simulator →</Link>
          <Link to="/articles/safe-risk-levels" className="text-sm text-primary hover:underline">How to Set Safe Risk Levels →</Link>
        </div>
      </div>
    </article>
  </Layout>
);

export default CompoundInterest;
