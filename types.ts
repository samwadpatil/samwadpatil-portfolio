
export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  metrics: string[];
  website?: string;
}

export interface Project {
  title: string;
  role: string;
  description: string[];
  impact: string;
}

export interface PRDSection {
  heading: string;
  content: string | string[];
}

export interface FullPRD {
  why: {
    business: string;
    users: string;
  };
  measurement: {
    okr: string;
    success: string[];
    guardrail: string[];
  };
  users: {
    persona: string;
    problems: string[];
    research: string;
  };
  solution: {
    brief: string;
    alternatives: string;
  };
  productFlow: {
    journey: string;
    wireframes: string;
    stories: string[];
    criteria: string[];
    edgeCases: string[];
    tracking: string;
  };
  dependencies: {
    questions: string;
    infra: string;
    budget: string;
    partner: string;
    internal: string;
  };
}

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  tagline: string;
  color: string;
  framework: string;
  northStarMetric: { label: string; value: string };
  secondaryMetrics: { label: string; trend: 'up' | 'down' }[];
  sections: PRDSection[];
  fullPRD: FullPRD;
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
}
