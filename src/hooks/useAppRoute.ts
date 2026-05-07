import { useEffect, useState } from "react";

export type AppRoute = "home" | "disclaimers";

function getCurrentRoute(): AppRoute {
  const { pathname, hash } = window.location;
  return pathname === "/disclaimers" || hash === "#/disclaimers"
    ? "disclaimers"
    : "home";
}

export function useAppRoute() {
  const [route, setRoute] = useState<AppRoute>(getCurrentRoute);

  useEffect(() => {
    const syncRoute = () => setRoute(getCurrentRoute());
    window.addEventListener("popstate", syncRoute);
    window.addEventListener("hashchange", syncRoute);
    return () => {
      window.removeEventListener("popstate", syncRoute);
      window.removeEventListener("hashchange", syncRoute);
    };
  }, []);

  return route;
}

