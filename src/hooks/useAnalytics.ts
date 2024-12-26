"use client";

import { analytics } from "@/firebase/firebaseConfig";
import { logEvent, EventParams } from "firebase/analytics";

export const useAnalytics = () => {
  const trackEvent = (eventName: string, eventParams?: EventParams) => {
    if (analytics !== null) {
      logEvent(analytics, eventName, eventParams);
    }
  };

  const trackPageView = (pageTitle: string, pagePath: string) => {
    if (analytics !== null) {
      logEvent(analytics, "page_view", {
        page_title: pageTitle,
        page_path: pagePath,
      });
    }
  };

  const trackUserEngagement = (params: {
    method: "Google" | "Email" | "Other";
    status: "success" | "failure";
  }) => {
    if (analytics !== null) {
      logEvent(analytics, "user_engagement", params);
    }
  };

  return {
    trackEvent,
    trackPageView,
    trackUserEngagement,
  };
};
