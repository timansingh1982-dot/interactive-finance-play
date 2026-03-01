import { Link } from "react-router-dom";
import { TrendingUp, BarChart3, ArrowRight, Target, ShieldAlert, Lightbulb, Zap, BookOpen } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/tools/SEOHead";

const BASE_URL = "https://visualfinancelab.com";

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="Visual Finance Lab — Interactive Financial Simulators"
        description="Free interactive tools to visualize savings goals, compound growth, and leverage liquidation risk. No sign-up required."
        breadcrumbs={[{ name: "Home", url: BASE_URL }]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
              Understand Money{" "}
              <span className="gradient-text">Visually</span>,<br />
              Not Just Numerically
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Interactive tools to simulate financial decisions instantly. No sign-up, no fees — just clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tools/goal-simulator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <Target className="h-5 w-5" />
                Try Goal Simulator
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tools/liquidation-visualizer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors border border-border"
              >
                <ShieldAlert className="h-5 w-5" />
                Try Liquidation Visualizer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-4">
            Financial Tools That Make Sense
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">
            Interactive simulators powered by real math, designed for real decisions.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link to="/tools/goal-simulator" className="group">
              <div className="glass-card p-8 h-full transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">Money Goal Simulator</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  See exactly how long it takes to reach your savings goal with compound growth. Adjust contributions, returns, and watch milestones light up.
                </p>
                <span className="inline-flex items-center text-sm text-primary font-medium gap-1 group-hover:gap-2 transition-all">
                  Launch tool <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
            <Link to="/tools/liquidation-visualizer" className="group">
              <div className="glass-card p-8 h-full transition-all duration-300 hover:border-accent/30 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">Leverage Liquidation Visualizer</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Understand your liquidation risk visually. See how leverage, margin, and price movements affect your positions in real time.
                </p>
                <span className="inline-flex items-center text-sm text-accent font-medium gap-1 group-hover:gap-2 transition-all">
                  Launch tool <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-slide-up stagger-1">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-heading font-semibold mb-2">Why Visual Finance Tools?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Numbers in spreadsheets don't tell the full story. Visual tools help you intuitively grasp compound growth curves, risk thresholds, and turning points — making better financial decisions with less cognitive load.
              </p>
            </div>
            <div className="animate-slide-up stagger-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-heading font-semibold mb-2">How Compounding Works</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Compound interest is the most powerful force in personal finance. Our goal simulator shows you exactly how small, consistent contributions snowball over time — and where the inflection points are.
              </p>
            </div>
            <div className="animate-slide-up stagger-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <ShieldAlert className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-lg font-heading font-semibold mb-2">Why Leverage Risk Matters</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trading with leverage amplifies gains — and losses. Most traders don't realize how close they are to liquidation. Our visualizer makes that invisible threshold visible and actionable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-heading font-bold">Learn More</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { to: "/articles/compound-interest", title: "How Compound Interest Grows Wealth", desc: "Understand the most powerful force in personal finance and how to harness it." },
              { to: "/articles/leverage-trading", title: "What Leverage Does to Traders", desc: "Why most leveraged traders lose money and how to manage amplified risk." },
              { to: "/articles/safe-risk-levels", title: "How to Set Safe Risk Levels", desc: "Practical position sizing and risk management for investors and traders." },
            ].map((a) => (
              <Link key={a.to} to={a.to} className="glass-card p-5 hover:border-primary/20 transition-colors group">
                <h3 className="text-sm font-heading font-semibold mb-1 group-hover:text-primary transition-colors">{a.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
