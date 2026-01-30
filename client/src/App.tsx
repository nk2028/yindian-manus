// Swiss International Style - App Router
// Design: Clean navigation with SBB red accent

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Link, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider, useApp } from "./contexts/AppContext";
import Query from "./pages/Query";
import Settings from "./pages/Settings";
import About from "./pages/About";
import { getTranslation, type Language } from "./lib/i18n";


function Navigation() {
  const [location] = useLocation();
  const { language, setLanguage } = useApp();
  const t = getTranslation(language);

  const navItems = [
    { path: "/", label: t.nav.query },
    { path: "/settings", label: t.nav.settings },
    { path: "/about", label: t.nav.about },
  ];

  return (
    <nav className="bg-[#EB0000] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <img src="/yindian-icon.svg" alt="音典" className="w-8 h-8 invert" />
            <span className="text-xl font-bold tracking-tight">{t.nav.title}</span>
          </div>
          <div className="flex gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                  location === item.path
                    ? "bg-white text-[#EB0000]"
                    : "text-white hover:bg-gray-200 hover:text-gray-800"
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
