import { ProjectItem } from "@/types/projectDataType";

export const projectsData: ProjectItem[] = [
  {
    slug: "uparzo",
    title: "Uparzo",
    subtitle: "E-commerce Website Builder",
    description:
      "A website builder that helps businesses create and customize their own e-commerce stores with flexible themes, content management, and production-ready storefronts.",
    detailedDescription:
      "Uparzo is an e-commerce website builder that allows businesses to create and customize their own online stores without building everything from scratch. The platform uses a theme-based architecture where merchants can select a storefront template, customize content and visual settings, and publish their store through a dedicated Uparzo subdomain. I contributed to frontend development, UI/UX, authentication, API integration, form validation, reusable components, technical SEO, deployment, and production optimization. The project also provided hands-on experience with scalable frontend architecture and production development workflows.",
    image: "/assets/ProjestsScreenshorts/uparzoOverview.png",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zod",
      "shadcn/ui",
      "Framer Motion",
      "GSAP",
    ],
    mainTech: [
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Zod",
        icon: "https://cdn.simpleicons.org/zod",
      },
      {
        name: "shadcn/ui",
        icon: "https://ui.shadcn.com/favicon.ico",
      },
      {
        name: "Framer Motion",
        icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
      },
      {
        name: "GSAP",
        icon: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
      },
    ],
    features: [
      "Theme-based e-commerce storefronts with customizable content and visual settings",
      "Authentication, API integration, form validation, and reusable UI components",
      "Production-ready storefront architecture with technical SEO and responsive UI",
      "Store publishing through dedicated Uparzo subdomains",
    ],
    challenges: [
      "Working with a scalable theme architecture where different storefronts can share common functionality while maintaining unique designs",
      "Building reusable components and dynamic rendering systems for multiple e-commerce storefront experiences",
      "Managing API-driven content, authentication, validation, and production states across the application",
      "Optimizing frontend performance, technical SEO, and deployment workflows for production environments",
    ],
    improvements: [
      "Expand the theme library with more industry-specific storefront templates",
      "Add deeper store customization options for typography, layouts, and advanced branding",
      "Introduce more advanced analytics and store management features for merchants",
      "Improve automated deployment and performance monitoring across published storefronts",
    ],
    liveUrl: "https://uparzo.com/",
    frontendUrl: "",
    category: "Frontend",
  },

  {
    slug: "feletrip",
    title: "FeleTrip",
    subtitle: "Hotel Booking Platform",
    description:
      "A hotel booking platform for finding and booking hotels based on availability and location, with search, filtering, booking, authentication, and map-based location features.",
    detailedDescription:
      "FeleTrip is a hotel booking platform designed to help users discover and book hotels based on availability and location. I contributed to the complete frontend development and UI/UX direction, including hotel search and filtering, hotel details, availability, booking flows, authentication, map and location features, API integration, and technical SEO. The project also involved working with date handling, map integration, responsive interfaces, frontend performance optimization, deployment, and production setup while collaborating with the team on frontend development and architecture.",
    image: "/assets/ProjestsScreenshorts/feletripOverview.png",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zod",
      "shadcn/ui",
      "ReUI",
      "Framer Motion",
      "React Query",
      "Leaflet",
    ],
    mainTech: [
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Zod",
        icon: "https://cdn.simpleicons.org/zod",
      },
      {
        name: "Framer Motion",
        icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
      },
      {
        name: "React Query",
        icon: "https://cdn.simpleicons.org/reactquery",
      },
      {
        name: "Leaflet",
        icon: "https://cdn.simpleicons.org/leaflet",
      },
    ],
    features: [
      "Hotel search and filtering based on availability, location, and user requirements",
      "Hotel detail pages with availability, booking flows, and location information",
      "Authentication and API-driven hotel data management",
      "Interactive map and location features with responsive, production-ready UI",
    ],
    challenges: [
      "Handling complex date and availability states across hotel search and booking flows",
      "Integrating interactive maps and location-based features while maintaining responsive performance",
      "Managing API-driven states and authentication across multiple hotel-related interfaces",
      "Optimizing frontend performance, technical SEO, and production deployment for a real-world application",
    ],
    improvements: [
      "Add more advanced hotel recommendation and personalized search features",
      "Expand booking management with richer user and vendor dashboards",
      "Improve map-based hotel discovery with advanced location filters",
      "Introduce additional performance monitoring and analytics for production usage",
    ],
    liveUrl: "https://www.feletrip.com/",
    frontendUrl: "",
    category: "Frontend",
  },

  {
    slug: "aidex",
    title: "AidEx",
    subtitle: "Blood Donation & Funding Platform",
    description:
      "A blood donation and funding platform for donor search, blood requests, request tracking, and online funding with role-based access control.",
    detailedDescription:
      "AidEx is a full-stack blood donation and funding platform that connects donors and recipients while enabling online funding for medical causes. Users can search for donors by blood group and location, create and manage donation requests, accept requests, and track their status. The platform includes JWT-protected APIs, role-based access for Donors, Volunteers, and Admins, request management, user management, statistics, and Stripe Checkout integration for online funding. This project provided hands-on experience with full-stack development, authentication, payments, and database management.",
    image: "/assets/ProjestsScreenshorts/aidexOverview.png",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Firebase Admin SDK",
      "JWT",
      "Stripe Checkout",
      "Tailwind CSS",
      "Framer Motion",
    ],
    mainTech: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Stripe",
        icon: "https://www.vectorlogo.zone/logos/stripe/stripe-icon.svg",
      },
    ],
    features: [
      "Blood donor search by blood group, district, and upazila",
      "Blood donation request creation, acceptance, and status tracking",
      "JWT authentication with role-based access for Donors, Volunteers, and Admins",
      "Stripe Checkout integration for online funding and payment tracking",
    ],
    challenges: [
      "Implementing JWT-protected API routes with Firebase Admin SDK token verification",
      "Building location-based donor search using district and upazila data",
      "Managing role-based permissions and separate dashboard experiences",
      "Integrating Stripe Checkout with payment verification and transaction handling",
    ],
    improvements: [
      "Add real-time notifications for matching blood requests",
      "Add email notifications for donation and funding updates",
      "Expand analytics with exportable reports and donor statistics",
      "Develop mobile applications for broader accessibility",
    ],
    liveUrl: "https://aidex-by-biswanath.netlify.app/",
    frontendUrl: "https://github.com/BiswanathBD/AidEx-Frontend",
    backendUrl: "https://github.com/BiswanathBD/AidEx-Backend",
    category: "Full Stack",
  },

  {
    slug: "wecare",
    title: "WeCare",
    subtitle: "Volunteer Event Management Platform",
    description:
      "A community-driven platform connecting volunteers with meaningful events through event creation, search, filtering, participation tracking, and secure authentication.",
    detailedDescription:
      "WeCare is a full-stack volunteer event management platform that connects organizations with volunteers. Organizations can create, edit, and manage events while volunteers can discover opportunities through search and filtering, join events, and track their participation. The platform uses Firebase authentication with server-side JWT verification, MongoDB for data persistence, and a responsive interface built with React and Tailwind CSS.",
    image: "/assets/ProjestsScreenshorts/weCareOverview.png",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Firebase Admin SDK",
      "JWT",
      "Tailwind CSS",
      "Framer Motion",
      "Axios",
    ],
    mainTech: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Framer Motion",
        icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
      },
    ],
    features: [
      "Create, edit, and manage volunteer events",
      "Search and filter events by category and availability",
      "Personal dashboard for created events and joined activities",
      "Firebase authentication with server-side JWT verification",
    ],
    challenges: [
      "Implementing secure server-side JWT verification using Firebase Admin SDK",
      "Building flexible event search and filtering functionality",
      "Managing event participation state while preventing duplicate joins",
      "Creating separate workflows for event creators and volunteers",
    ],
    improvements: [
      "Add email notifications for event reminders and updates",
      "Add volunteer hour tracking and participation certificates",
      "Add cloud-based image upload for event thumbnails",
      "Implement event capacity and waitlist management",
    ],
    liveUrl: "https://wecare-biswanath.netlify.app/",
    frontendUrl: "https://github.com/BiswanathBD/weCare-Client-Site",
    backendUrl: "https://github.com/BiswanathBD/weCare-Server-Site",
    category: "Full Stack",
  },

  {
    slug: "smart-deals",
    title: "Smart Deals",
    subtitle: "Bidding Platform for Smart Shoppers",
    description:
      "A modern bidding platform where users can list products, receive competitive bids, manage listings, and track their bidding activities.",
    detailedDescription:
      "Smart Deals is a full-stack bidding platform that enables users to buy and sell products through a competitive bidding system. Sellers can create product listings with price ranges while buyers can place bids within those ranges. The application includes Firebase authentication, backend JWT verification, protected routes, product management, bid tracking, and responsive UI with Framer Motion animations.",
    image: "/assets/ProjestsScreenshorts/smartDealsHome.png",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Firebase Admin SDK",
      "JWT",
      "Tailwind CSS",
      "Framer Motion",
    ],
    mainTech: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Framer Motion",
        icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
      },
    ],
    features: [
      "Competitive bidding with seller-defined price range validation",
      "Firebase authentication with backend JWT verification",
      "Product listing management with create, edit, delete, and sold states",
      "Separate bid tracking for sellers and buyers",
    ],
    challenges: [
      "Implementing secure JWT verification for protected backend endpoints",
      "Building bid validation based on seller-defined price ranges",
      "Creating responsive layouts for complex product and bid data",
      "Managing authentication state across protected routes",
    ],
    improvements: [
      "Add real-time notifications for new bids",
      "Add automatic bid expiration with countdown timers",
      "Add cloud storage for product images",
      "Add an admin dashboard with platform analytics",
    ],
    liveUrl: "https://smart-deals-by-biswanath.netlify.app/",
    frontendUrl: "https://github.com/BiswanathBD/Smart-Deals",
    backendUrl: "https://github.com/BiswanathBD/Smart-Deals-Server",
    category: "Full Stack",
  },

  {
    slug: "fishmart",
    title: "FishMart",
    subtitle: "Fresh Fish E-Commerce Platform",
    description:
      "A responsive e-commerce platform for buying fresh fish online in Bangladesh with authentication, product search, shopping cart, and product management features.",
    detailedDescription:
      "FishMart is an e-commerce web application built for the fresh fish market in Bangladesh. The platform includes authentication, protected routes, real-time product search, localStorage-powered cart management, and detailed product pages with nutritional information, cooking tips, and storage guidelines. The application focuses on responsive UI, smooth animations, and a mobile-first shopping experience.",
    image: "/assets/ProjestsScreenshorts/fishmart-landingpage.png",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "LocalStorage API",
    ],
    mainTech: [
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Framer Motion",
        icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
      },
    ],
    features: [
      "Cookie-based authentication with protected routes and middleware",
      "Real-time product search with instant filtering",
      "Shopping cart with localStorage persistence and quantity management",
      "Detailed product pages with nutritional and cooking information",
    ],
    challenges: [
      "Building efficient real-time product filtering",
      "Synchronizing cart state across components and browser storage",
      "Creating smooth animations while maintaining frontend performance",
      "Building responsive layouts across mobile and desktop devices",
    ],
    improvements: [
      "Integrate Bangladesh payment gateways such as bKash, Nagad, and Rocket",
      "Add user profiles with order history, addresses, and wishlist",
      "Implement real-time inventory management and stock alerts",
      "Add location-based delivery zones and estimated delivery times",
    ],
    liveUrl: "https://fishmart-by-biswanath.vercel.app/",
    frontendUrl: "https://github.com/BiswanathBD/FishMart",
    category: "Frontend",
  },
];
