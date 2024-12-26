export const appConfig = {
  cookieName: "app_auth_token",
  title: "Template App",
  description:
    "A modern web application template with authentication and user management",
  company: {
    name: "Your Company",
    email: "support@example.com",
    website: "https://example.com",
    address: "123 Main St",
    location: "San Francisco, CA",
    updatedAt: {
      privacy: "January 1, 2024",
      terms: "January 1, 2024",
    },
  },
  meta: {
    keywords: "template, web app, authentication, react, nextjs",
    author: "Your Name",
    themeColor: "#3B82F6", // blue-500
  },
  feature: {
    title: "Core Feature",
    description: "Experience the power of our main feature that sets us apart",
    benefits: [
      "Streamlined workflow",
      "Enhanced productivity",
      "Real-time collaboration",
      "Data-driven insights",
    ],
  },
  help: {
    sections: [
      {
        title: "Getting Started",
        items: [
          {
            question: "How do I create an account?",
            answer:
              "Click the Sign Up button and follow the registration process using your email or Google account.",
          },
          {
            question: "What are the system requirements?",
            answer:
              "Our app works on any modern web browser with JavaScript enabled.",
          },
          {
            question: "Is my data secure?",
            answer:
              "Yes, we use industry-standard encryption and security practices to protect your data.",
          },
        ],
      },
      {
        title: "Account Management",
        items: [
          {
            question: "How do I reset my password?",
            answer:
              "Click the 'Forgot Password' link on the login page and follow the instructions sent to your email.",
          },
          {
            question: "Can I change my email address?",
            answer:
              "Your email address is your unique identifier and cannot be changed. Please contact support if you need assistance.",
          },
        ],
      },
      {
        title: "Features & Usage",
        items: [
          {
            question: "What features are included in my plan?",
            answer:
              "Visit the Pricing page to see a detailed comparison of features available in each plan.",
          },
          {
            question: "How do I upgrade my account?",
            answer:
              "Go to Settings > Subscription to view and manage your plan options.",
          },
        ],
      },
    ],
  },
  settings: {
    sections: [
      {
        title: "Account",
        description: "Manage your account settings and preferences",
        items: [
          {
            key: "notifications",
            label: "Email Notifications",
            description: "Receive updates about your account and activity",
          },
          {
            key: "twoFactor",
            label: "Two-Factor Authentication",
            description: "Add an extra layer of security to your account",
          },
          {
            key: "sessions",
            label: "Active Sessions",
            description: "Manage your active login sessions",
          },
        ],
      },
      {
        title: "Privacy",
        description: "Control your privacy settings",
        items: [
          {
            key: "dataSharing",
            label: "Data Sharing",
            description: "Manage how your data is shared",
          },
          {
            key: "activityLog",
            label: "Activity Log",
            description: "View and manage your account activity",
          },
        ],
      },
      {
        title: "Preferences",
        description: "Customize your experience",
        items: [
          {
            key: "language",
            label: "Language",
            description: "Choose your preferred language",
          },
          {
            key: "theme",
            label: "Theme",
            description: "Choose between light and dark mode",
          },
        ],
      },
    ],
  },
  pricing: {
    currency: "USD",
    plans: [
      {
        name: "Free",
        price: 0,
        interval: "month",
        features: [
          "Basic features",
          "Up to 1,000 requests/month",
          "Community support",
          "Basic analytics",
        ],
        cta: "Get Started",
        highlighted: false,
      },
      {
        name: "Pro",
        price: 29,
        interval: "month",
        features: [
          "All Free features",
          "Up to 50,000 requests/month",
          "Priority support",
          "Advanced analytics",
          "Custom integrations",
        ],
        cta: "Start Free Trial",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: 99,
        interval: "month",
        features: [
          "All Pro features",
          "Unlimited requests",
          "24/7 dedicated support",
          "Custom solutions",
          "SLA guarantee",
          "On-premise deployment",
        ],
        cta: "Contact Sales",
        highlighted: false,
      },
    ],
  },
  storage: {
    emailSave: "app_email_save",
    nameSave: "app_name_save",
    passwordPassed: "app_password_passed",
  },
};

// Routes that require authentication
export const privatePaths = [
  "/dashboard",
  "/profile",
  "/settings",
  "/account",
  "/feature",
  "/help",
];

// Routes that require admin privileges
export const adminPaths = ["/admin", "/admin/users", "/admin/settings"];

// Routes that are publicly accessible
export const publicPaths = [
  "/",
  "/login",
  "/signup",
  "/about",
  "/privacy",
  "/terms",
  "/pricing",
];

// URL redirects
export const redirects: { [key: string]: string } = {
  "/home": "/dashboard",
  "/admin": "/admin/dashboard",
};

// Application routes
export const routes = {
  // Public routes
  home: "/",
  login: "/login",
  signup: "/signup",
  about: "/about",
  privacy: "/privacy",
  terms: "/terms",
  pricing: "/pricing",
  feature: "/feature",

  // Protected routes
  dashboard: "/dashboard",
  profile: "/profile",
  settings: "/settings",
  account: "/account",
  help: "/help",

  // Admin routes
  adminDashboard: "/admin/dashboard",
  adminUsers: "/admin/users",
  adminSettings: "/admin/settings",
};

// Footer menu items
export interface MenuItem {
  label: string;
  href: string;
  show: "everyone" | "guest_only" | "user_only" | "admin_only";
  footer: boolean;
}

export const footerMenuItems: MenuItem[] = [
  {
    label: "About",
    href: "/about",
    show: "everyone",
    footer: true,
  },
  {
    label: "Terms",
    href: "/terms",
    show: "everyone",
    footer: true,
  },
  {
    label: "Privacy",
    href: "/privacy",
    show: "everyone",
    footer: true,
  },
  {
    label: "Pricing",
    href: "/pricing",
    show: "everyone",
    footer: true,
  },
];
