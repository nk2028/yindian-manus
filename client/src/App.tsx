// Swiss International Style - App Router
// Design: Clean navigation with SBB red accent

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Link, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import Query from "./pages/Query";
import Settings from "./pages/Settings";
import About from "./pages/About";

function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "查字" },
    { path: "/settings", label: "设置" },
    { path: "/about", label: "关于" },
  ];

  return (
    <nav className="bg-[#EB0000] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="text-xl font-bold tracking-tight">音典</div>
          <div className="flex gap-0">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-5 py-4 text-sm font-bold transition-colors ${
                  location === item.path
                    ? "bg-white text-[#EB0000]"
                    : "text-white hover:bg-[#C50000]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Router() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" component={Query} />
        <Route path="/settings" component={Settings} />
        <Route path="/about" component={About} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
