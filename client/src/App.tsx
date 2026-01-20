import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { StructuredData } from "./components/StructuredData";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Approach from "./pages/Approach";
import Treatments from "./pages/Treatments";
import Contact from "./pages/Contact";
import Ebook from "./pages/Ebook";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function Router() {
  return (
    <Switch>
      {/* Rotas independentes (sem Layout) */}
      <Route path="/ebook" component={Ebook} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      
      {/* Rotas com Layout */}
      <Route>
        {() => (
          <Layout>
            <ScrollToTop />
            <StructuredData />
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/quem-sou" component={About} />
              <Route path="/abordagem" component={Approach} />
              <Route path="/tratamentos" component={Treatments} />
              <Route path="/contato" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        )}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
