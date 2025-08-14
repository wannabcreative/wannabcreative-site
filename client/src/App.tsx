import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageContext, useTranslation } from "@/lib/i18n";
import NotFound from "@/pages/not-found";
import PalmReader from "@/pages/palm-reader";
import Home from "@/pages/home";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/palmreader" component={PalmReader} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppWithProvider() {
  const { t, language, setLanguage } = useTranslation();

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage }}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </LanguageContext.Provider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWithProvider />
    </QueryClientProvider>
  );
}

export default App;
