import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import NewsPage from "./pages/news/NewsPage.tsx";
import NewsDetailPage from "./pages/news/NewsDetailPage.tsx";
import DisclaimersPage from "./pages/disclaimers/DisclaimersPage.tsx";
import LearnShell from "./pages/learn/LearnShell.tsx";
import LearnComponentsPanel from "./pages/learn/LearnComponentsPanel.tsx";
import LearnAnimationsPanel from "./pages/learn/LearnAnimationsPanel.tsx";
import LearnHandbookPanel from "./pages/learn/LearnHandbookPanel.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:slug" element={<NewsDetailPage />} />
      <Route path="/disclaimers" element={<DisclaimersPage />} />
      <Route path="/learn" element={<LearnShell />}>
        <Route index element={<Navigate to="handbook" replace />} />
        <Route path="handbook" element={<LearnHandbookPanel />} />
        <Route
          path="components/:componentId"
          element={<LearnComponentsPanel />}
        />
        <Route path="animations" element={<LearnAnimationsPanel />} />
        <Route path="animations/:slug" element={<LearnAnimationsPanel />} />
      </Route>
    </Routes>
  );
}
