
import { Experience, Project, Certification, CaseStudy } from './types';

export const PERSONAL_INFO = {
  name: "Samwad Patil",
  title: "Product-Driven Entrepreneur & Engineer",
  email: "samwadpatil23@gmail.com",
  phone: "+91 9834147657",
  location: "Chh. Sambhajinagar, Maharashtra, India",
  linkedin: "https://linkedin.com/in/samwad-patil",
  profileImage: "profile.jpg",
  summary: "B.Tech Electrical Engineering student with a proven track record of launching products from 0 to 1. Founded a fashion brand and led the development of an AI-driven EdTech MVP. Expert in translating user pain points into technical roadmaps and managing cross-functional projects. Seeking a Product Management Internship to drive data-led growth and user-centric innovation."
};

export const EXPERIENCES: Experience[] = [
  {
    role: "Founder & Product Manager",
    company: "Akarizen",
    period: "Ongoing",
    website: "https://www.akarizen.com",
    description: [
      "Scaled brand acquisition through targeted Meta Ads, achieving a consistent 15x ROAS.",
      "Engineered tiered pricing bundles like 'Buy 2/Buy 4' that increased Average Order Value (AOV) to ₹1,100.",
      "Spearheaded end-to-end development of the e-commerce platform using WordPress & WooCommerce.",
      "Led the '0-to-1' launch of 15+ anime-inspired streetwear collections (Berserk, Zen-minimalism, etc.).",
      "Developed a personalized CRM & Loyalty program to improve customer retention and Lifetime Value (LTV)."
    ],
    metrics: ["15x ROAS", "₹1,100 AOV", "15+ Product Launches", "2.5x Profit Margin"]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "AI-Based Classroom Attendance System",
    role: "Product Lead",
    description: [
      "Interviewed 20+ educators to identify administrative pain points and defined MVP requirements.",
      "Translated complex user needs into a prioritized product backlog and managed technical roadmap.",
      "Designed high-fidelity wireframes in Figma focusing on reducing 'time-to-task' for instructors.",
      "Managed sprint cycles for a developer team of three to deploy a pilot across 5 classrooms."
    ],
    impact: "Saved teachers 4.5 hours/month; Achieved 80.2% accuracy with 40% reduced latency."
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "akarizen-sizing-prd",
    title: "AI-Driven Sizing & Fit Engine",
    company: "Akarizen",
    tagline: "Reducing e-commerce returns by 30% through personalized fit recommendations.",
    color: "bg-indigo-600",
    framework: "GIST (Goals, Ideas, Step-projects, Tasks)",
    northStarMetric: { label: "Returns Rate (Fit-related)", value: "-30%" },
    secondaryMetrics: [{ label: "Add-to-Cart from Recommendation", trend: 'up' }],
    sections: [{ heading: "Summary", content: "Solving the #1 pain point in online apparel: Uncertainty about fit leads to 'cart abandonment' or 'costly returns'." }],
    fullPRD: {
      why: {
        business: "Minimize logistical costs associated with reverse commerce and improve Net Profit Margin.",
        users: "Empower users to buy with confidence without needing to read complex size charts."
      },
      measurement: {
        okr: "Reduce fit-related return requests by 25% within the first 6 months of deployment.",
        success: ["Size Selection Accuracy", "Conversion Rate of 'Recommended' items"],
        guardrail: ["Average Session Duration (Ensure tool isn't too friction-heavy)."]
      },
      users: {
        persona: "The 'New Customer' who loves the design but is wary of boutique brand sizing.",
        problems: ["Vague size charts", "Inconsistent fit between collections", "Anxiety over return shipping fees."],
        research: "Analysis of support tickets showed 65% of queries were 'Will this fit a 6ft person?'."
      },
      solution: {
        brief: "A 'Smart-Fit' modal that uses 3 simple questions (Height, Weight, Preferred Fit) and compares them against historical customer data to suggest a size.",
        alternatives: "Considered AR body scanning but rejected due to high friction and mobile browser limitations."
      },
      productFlow: {
        journey: "Product Page -> Click 'Find My Fit' -> Input Stats -> Size Selected -> Checkout.",
        wireframes: "Interactive modal overlay with step-by-step progress indicator and final size recommendation badge.",
        stories: ["As a buyer, I want a size recommendation based on other people like me.", "As a returning buyer, I want the system to remember my fit profile."],
        criteria: ["Modal must load in < 100ms.", "Recommendation must be displayed on the product page permanently after calculation."],
        edgeCases: ["User inputs unrealistic data (show error).", "Item is 'Oversized' by design (explain fit style)."],
        tracking: "Modal opened, Questions completed, Recommendation followed, Item returned (reason)."
      },
      dependencies: {
        questions: "How many data points do we need for statistical significance per SKU?",
        infra: "Custom database table to store Fit Profiles.",
        budget: "Self-funded within the brand's tech allocation.",
        partner: "WooCommerce API for real-time inventory and size availability check.",
        internal: "Coordination with fulfillment team to track 'Return Reasons' accurately."
      }
    }
  },
  {
    id: "netflix-prd",
    title: "Reducing Decision Paralysis in Content Discovery",
    company: "Netflix",
    tagline: "Minimizing 'Browse Without Play' sessions through intent-based filtering.",
    color: "bg-red-600",
    framework: "RICE Prioritization",
    northStarMetric: { label: "Stream Starts per Session", value: "+12%" },
    secondaryMetrics: [{ label: "Browse-to-Play Time", trend: 'down' }],
    sections: [{ heading: "Summary", content: "Solving 'Choice Fatigue' for users who spend 18+ minutes browsing without selecting content." }],
    fullPRD: {
      why: {
        business: "Increase Monthly Active Usage (MAU) by reducing churn from 'failed sessions'.",
        users: "Help users find high-relevance content in under 60 seconds based on their current mood and time."
      },
      measurement: {
        okr: "Improve content discovery efficiency by 20% in Q3.",
        success: ["Average Time to Play (TTP)", "Daily Active Stream Starts"],
        guardrail: ["Watch Time per session must not drop due to short-form bias."]
      },
      users: {
        persona: "The 'Tired Browser' - wants to relax but doesn't have a specific title in mind.",
        problems: ["Analysis Paralysis", "Infinite Scroll fatigue", "Irrelevant recommendations."],
        research: "User surveys indicate 1 in 5 mobile sessions end without any playback."
      },
      solution: {
        brief: "Introduce 'Intent Selector' - a 3-option toggle: 'Quick Watch' (<20m), 'Mood-based', or 'Surprise Me'.",
        alternatives: "Considered a 'TikTok-style' vertical feed but prioritized search-intent tools due to RICE score."
      },
      productFlow: {
        journey: "Home Screen -> Select Intent -> Preview Card -> 1-Click Play.",
        wireframes: "Horizontal intent picker at the top of the browse page with dynamic row updates.",
        stories: ["As a user with 15 mins, I want content filtered by duration.", "As a mood-driven user, I want genres based on my feeling."],
        criteria: ["Intent selector must appear within 2 scrolls.", "Loading time < 200ms."],
        edgeCases: ["User has poor connectivity (fallback to cached picks).", "No content matches intent."],
        tracking: "Click-through rate on Intent cards, Content completion rate."
      },
      dependencies: {
        questions: "How does this affect existing algorithm weights?",
        infra: "Real-time duration filtering API.",
        budget: "Existing R&D budget for Personalization Team.",
        partner: "N/A - Internal feature.",
        internal: "Coordination with Personalization and UI team."
      }
    }
  },
  {
    id: "swiggy-prd",
    title: "Checkout Conversion Rate Optimization",
    company: "Swiggy",
    tagline: "Solving high cart abandonment by front-loading fee transparency.",
    color: "bg-orange-500",
    framework: "Impact vs. Effort",
    northStarMetric: { label: "Cart-to-Order Conversion", value: "+8.5%" },
    secondaryMetrics: [{ label: "Checkout Drop-off", trend: 'down' }],
    sections: [{ heading: "Summary", content: "Addressing 24% payment-screen drop-off caused by hidden surge/platform fees." }],
    fullPRD: {
      why: {
        business: "Improve Marketplace Efficiency and increase Gross Merchandise Value (GMV).",
        users: "Eliminate 'Sticker Shock' at the final payment step."
      },
      measurement: {
        okr: "Increase checkout completion rate by 10% YoY.",
        success: ["Checkout completion %", "Reduction in support tickets regarding fees."],
        guardrail: ["Average Order Value (AOV) should not decrease."]
      },
      users: {
        persona: "The 'Budget Conscious' diner - tracks every rupee before ordering.",
        problems: ["Price jump at final step", "Coupon applicability confusion."],
        research: "Heatmaps show high churn immediately after 'Rain Surge' appears."
      },
      solution: {
        brief: "All-in Pricing: Show estimated total including delivery/taxes on the Restaurant Menu page.",
        alternatives: "Briefly considered lowering fees but prioritized transparency as it's a UX problem."
      },
      productFlow: {
        journey: "Menu -> Cart (Full Transparency) -> Payment (No Surprises).",
        wireframes: "Bottom stick bar on menu showing 'Estimated Total: ₹XXX (Incl. all taxes & fees)'.",
        stories: ["As a user, I want to see the final price before I add items.", "As a user, I want clear reasons for surge pricing."],
        criteria: ["Tooltip explanation for all fees.", "Real-time tax calculation on the fly."],
        edgeCases: ["Address change during checkout.", "Coupon expiry while browsing."],
        tracking: "Abandonment rate per step, Click rate on 'Fee Details'."
      },
      dependencies: {
        questions: "Will showing full price early reduce 'Add to Cart' rates?",
        infra: "Geo-fencing for accurate tax estimation.",
        budget: "Product Optimization Budget.",
        partner: "Payment gateway for real-time promotional discounts.",
        internal: "Legal/Tax compliance review."
      }
    }
  },
  {
    id: "uber-prd",
    title: "Post-Match Cancellation Reduction",
    company: "Uber",
    tagline: "Decreasing rider-initiated cancellations after a driver has been assigned.",
    color: "bg-black",
    framework: "Kano Model",
    northStarMetric: { label: "Completed Trip Rate", value: "+5.4%" },
    secondaryMetrics: [{ label: "Post-Match Cancellation", trend: 'down' }],
    sections: [{ heading: "Summary", content: "Reducing the 12% churn that happens within 2 minutes of a driver match." }],
    fullPRD: {
      why: {
        business: "Improve marketplace reliability and reduce driver idle time.",
        users: "Reduce anxiety during the pickup window."
      },
      measurement: {
        okr: "Reduce platform-wide cancellations by 15% this quarter.",
        success: ["Cancellation Rate @ <2 min", "Rider NPS during pickup."],
        guardrail: ["Driver-initiated cancellations must not increase."]
      },
      users: {
        persona: "The 'Anxious Traveler' - has a meeting and gets worried if the car doesn't move.",
        problems: ["Perceived driver inactivity", "Unreliable ETAs during traffic."],
        research: "60% of cancellations happen when rider thinks driver is 'moving away'."
      },
      solution: {
        brief: "Transparency HUD: Show driver context (e.g., 'U-turn needed', 'Stuck at signal').",
        alternatives: "Auto-penalty for cancellation was considered but rejected to avoid user hostility."
      },
      productFlow: {
        journey: "Match -> View Contextual Map -> Real-time status -> Pickup.",
        wireframes: "Status badge overlaying driver location on map with descriptive text and animations.",
        stories: ["As a rider, I want to see why my driver is delayed.", "As a driver, I want the rider to know I'm stuck in traffic."],
        criteria: ["Context updates every 30 seconds.", "Clear iconography for delays."],
        edgeCases: ["GPS signal loss.", "Manual status updates by driver."],
        tracking: "Cancellation rate vs Context shown, App dwell time during pickup."
      },
      dependencies: {
        questions: "What's the lag in GPS data reporting?",
        infra: "High-frequency Map matching service.",
        budget: "Marketplace Efficiency Budget.",
        partner: "Google Maps Platform (Roads API).",
        internal: "Operations team training for drivers."
      }
    }
  }
];

export const SKILLS = [
  { category: "Strategy", items: ["Design Thinking", "Product Strategy", "Feature Prioritization", "Stakeholder Management"] },
  { category: "Execution", items: ["Product Analytics", "Customer Empathy", "Sales Enablement", "Roadmapping", "A/B Testing"] },
  { category: "Tools", items: ["Figma", "Jira", "SQL", "Notion"] }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Project Management 101", issuer: "SimpliLearn", year: 2025 },
  { name: "Product Management 101: Who is a Product Manager?", issuer: "SimpliLearn", year: 2025 },
  { name: "Product Management Basics", issuer: "SimpliLearn", year: 2025 }
];

export const EDUCATION = {
  degree: "Bachelor of Technology in Electrical Engineering",
  institution: "Maharashtra Institute of Technology (MIT)",
  expected: "June 2026"
};
