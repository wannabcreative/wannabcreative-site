import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageContext, useTranslation } from "@/lib/i18n";
import NotFound from "@/pages/not-found";
import PalmReader from "@/pages/palm-reader";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PalmReader} />
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
