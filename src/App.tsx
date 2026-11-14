import type { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { LanguageProvider } from "./i18n/LanguageProvider";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import AiAgentsPage from "./pages/AiAgentsPage";
import WorkflowAutomationPage from "./pages/WorkflowAutomationPage";
import BilingualSeoPage from "./pages/BilingualSeoPage";
import CustomSoftwarePage from "./pages/CustomSoftwarePage";
import AboutPage from "./pages/AboutPage";
import OurProcessPage from "./pages/OurProcessPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import ContactPage from "./pages/ContactPage";
import LegalPage from "./pages/LegalPage";
import SitemapPage from "./pages/SitemapPage";
import NotFoundPage from "./pages/NotFoundPage";

type SiteRoute = { path: string; element: ReactElement };

const routes: SiteRoute[] = [
  { path: "services", element: <ServicesPage /> },
  { path: "ai-agents", element: <AiAgentsPage /> },
  { path: "workflow-automation", element: <WorkflowAutomationPage /> },
  { path: "bilingual-seo", element: <BilingualSeoPage /> },
  { path: "custom-software", element: <CustomSoftwarePage /> },
  { path: "about", element: <AboutPage /> },
  { path: "our-process", element: <OurProcessPage /> },
  { path: "case-studies", element: <CaseStudiesPage /> },
  { path: "contact", element: <ContactPage /> },
  { path: "privacy", element: <LegalPage kind="privacy" /> },
  { path: "terms", element: <LegalPage kind="terms" /> },
  { path: "sitemap", element: <SitemapPage /> },
];

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {/* Spanish uses the same components, prefixed by /es. */}
        <Route path="es" element={<HomePage />} />
        {routes.map((route) => (
          <Route key={`es-${route.path}`} path={`es/${route.path}`} element={route.element} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </BrowserRouter>
  );
}
