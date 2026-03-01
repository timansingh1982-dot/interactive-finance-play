import { Link, useLocation } from "react-router-dom";
import { TrendingUp, BarChart3, Home, BookOpen } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/tools/goal-simulator", label: "Goal Simulator", icon: TrendingUp },
    { path: "/tools/liquidation-visualizer", label: "Liquidation", icon: BarChart3 },
    { path: "/articles/compound-interest", label: "Articles", icon: BookOpen, match: "/articles" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
            <span className="font-heading font-bold text-lg">Visual Finance Lab</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.match
                ? location.pathname.startsWith(item.match)
                : location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <nav className="flex md:hidden items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.match
                ? location.pathname.startsWith(item.match)
                : location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border/50 py-8 mt-20">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Visual Finance Lab — Interactive financial simulators for smarter decisions.</p>
          <div className="flex justify-center gap-4 mt-3 flex-wrap">
            <Link to="/tools/goal-simulator" className="hover:text-foreground transition-colors">Goal Simulator</Link>
            <Link to="/tools/liquidation-visualizer" className="hover:text-foreground transition-colors">Liquidation Visualizer</Link>
            <Link to="/articles/compound-interest" className="hover:text-foreground transition-colors">Articles</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
