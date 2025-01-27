import { BarChart3, Calendar, Globe, Paintbrush, PieChart, Users } from "lucide-react";

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
    visible: true,
    sections: [
      {
        title: "Getting Started",
        items: [
          {
            question: "How do I create an account?",
            displayInLanding: true,
            answer:
              "Click the Sign Up button and follow the registration process using your email or Google account.",
          },
          {
            question: "What are the system requirements?",
            displayInLanding: true,
            answer:
              "Our app works on any modern web browser with JavaScript enabled.",
          },
          {
            question: "Is my data secure?",
            displayInLanding: true,
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
            displayInLanding: false,
            answer:
              "Click the 'Forgot Password' link on the login page and follow the instructions sent to your email.",
          },
          {
            question: "Can I change my email address?",
            displayInLanding: false,
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
            displayInLanding: false,
            answer:
              "Visit the Pricing page to see a detailed comparison of features available in each plan.",
          },
          {
            question: "How do I upgrade my account?",
            displayInLanding: true,
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
    visible: true,
    currency: "USD",
    intervals: ["month", "year"],
    plans: [
      {
        name: "Free",
        description: "Best for content creators",
        price: { month: 0, year: 0 },
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
        description: "Best for large businesses",
        price: { month: 29, year: 290 },
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
        description: "Best for agencies",
        price: { month: 99, year: 990 },
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
  testimonials: {
    visible: true,
    data: [
      {
        name: "Jack Smith",
        body: "This platform is very easy to use, which makes managing your posts simple. It has helpful tools that let you schedule and organize your content without any hassle. Plus, it allows you to connect and build relationships with your audience, encouraging more interaction. With insights into how your audience behaves and what they like, you can adjust your content to better meet their needs and grow your community. Overall, this platform helps you strengthen your online presence and make your interactions more personal.",
        img: "https://avatar.vercel.sh/jack",
      },
      {
        name: "Jill Smith",
        body: "There are several things I love about this suite. Some of these things include - Ease of use - Helps me organize my social media accounts - I get work done faster - It does not consume my time - it has a professional interface",
        img: "https://avatar.vercel.sh/jill",
      },
      {
        name: "James Wilson",
        body: "As a privacy-first company we appreciate being able to self-host Template App! It brings all the core functionality of a social media scheduler plus a lot of AI to make things faster. It's also very easy to deploy and use, great work!",
        img: "https://avatar.vercel.sh/john",
      },
      {
        name: "Michael Anderson",
        body: "Omg! This is my absolutely favorite app this 2024 when it comes to social managing-saves me hours every week hassle free.",
        img: "https://avatar.vercel.sh/john",
      },
      {
        name: "Sarah Johnson",
        body: "Template App is fantastic! It makes social media management so easy. The AI tools for content creation and scheduling are a huge time-saver. I love the built-in design features and how simple it is to manage everything in one place. Highly recommend for anyone looking to streamline their social media tasks!",
        img: "https://avatar.vercel.sh/john",
      },
      {
        name: "David Williams",
        body: "as a user of Template App as a digital marketer, I liked it much because with Template App I managed things best and made my work easier.",
        img: "https://avatar.vercel.sh/john",
      },
      {
        name: "Maria Camila A.",
        body: "Template App changed how we manage our social media presence by aggregating our platforms into one effective tool. Post scheduling, and AI post ideation are two of the many features that come with Template App, and have made our management of social media simple and effective! Highly recommend",
        img: "https://avatar.vercel.sh/john",
      },
    ]
  },
  reviews: {
    visible: true,
    data: [
      {
        name: "Jack",
        username: "@jack",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "https://avatar.vercel.sh/jack",
      },
      {
        name: "Jill",
        username: "@jill",
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: "https://avatar.vercel.sh/jill",
      },
      {
        name: "John",
        username: "@john",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/john",
      },
      {
        name: "Jane",
        username: "@jane",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jane",
      },
      {
        name: "Jenny",
        username: "@jenny",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jenny",
      },
      {
        name: "James",
        username: "@james",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/james",
      },
    ]
  },
  features: {
    visible: true,
    data: [
      {
        title: "Seamless scheduling",
        description: "Schedule, analyze, and engage with your audience. Cross post your social media posts into multiple channels.",
        icon: Calendar,
        tag: "PLANNING",
        size: "lg"
      },
      {
        title: "AI Content assistant",
        description: "Improve your content creation process with AI Agent that performs all tasks for you.",
        icon: PieChart,
        tag: "ARTIFICIAL INTELLIGENCE",
        size: "lg"
      },
      {
        title: "Design it with AI",
        description: "Use a Canva-like tool to create stunning visuals for your social media posts and generate pictures with AI.",
        icon: Paintbrush,
        tag: "AI IMAGE",
        size: "lg"
      },
      {
        title: "Teamwork organization",
        description: "Manage your social media channels with ease. Collaborate with your team and delegate tasks.",
        icon: Users,
        tag: "ORGANIZING",
        size: "sm"
      },
      {
        title: "Extensive marketplace",
        description: "Expose your brand to a wider audience by connecting with influencers and brands. ALL FROM THE PLATFORM.",
        icon: Globe,
        tag: "EXPOSE",
        size: "sm"
      },
      {
        title: "Comprehensive analytics",
        description: "Learn from your data and improve your social media strategy. Track your performance and optimize your content.",
        icon: BarChart3,
        tag: "ANALYTICS",
        size: "lg"
      }
    ]
  }
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
export const adminPaths = ["/admin", "/admin/dashboard", "/admin/users", "/admin/settings"];

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
