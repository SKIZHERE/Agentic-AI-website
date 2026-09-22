export const event = {
  badge: "Ongoing Event",
  name: "Jaypee AI Summit",
  edition: "2026",
  tagline: "Build autonomous AI agents that think, act, and ship.",
  shortDescription:
    "A 2-day, online + offline hybrid summit by JIIT Noida where builders, developers and AI enthusiasts design autonomous AI agents that solve real-world problems end to end.",

  popup: {
    kicker: "You're invited, builder",
    title: "Jaypee AI Summit 2026 is LIVE",
    body: "2 days · 30–31 October at JIIT Noida. Design and ship an autonomous AI agent — win from a &#8377;15,00,000 hackathon prize pool.",
    primaryLabel: "Register Now",
    secondaryLabel: "Explore More",
    disclaimer: "Free to participate · Open to all students & developers",
  },

  about: {
    heading: "What is the Jaypee AI Summit?",
    paragraphs: [
      "The Jaypee AI Summit is a high-intensity 2-day event hosted by Jaypee Institute of Information Technology (Sector 128, Wish Town Campus, Noida), centered around one idea: software that doesn't wait to be told what to do. Participants design autonomous AI agents that reason over goals, break them into tasks, use tools, and act — end to end, with minimal human steering.",
      "Over the 2-day summit you will ideate, prototype and demo an agentic system on a real problem statement. Expect mentor check-ins, hands-on workshops and a closing demo day judged by industry leaders from AI startups and research labs.",
      "No login, no paywall, no gatekeeping. Bring your curiosity and your laptop — everything else is already set up for you.",
    ],
  },

  details: [
    { icon: "calendar", label: "Date", value: "30 – 31 October 2026" },
    { icon: "clock", label: "Format", value: "Hybrid · Online + On-campus" },
    { icon: "pin", label: "Venue", value: "JIIT, Sector 128, Wish Town Campus, Noida" },
    { icon: "users", label: "Team Size", value: "1 – 4 members per team" },
  ],

  tracks: [
    {
      icon: "spark",
      title: "Autonomous Workflows",
      desc: "Agents that plan multi-step workflows and operate tools, APIs and browsers on their own.",
    },
    {
      icon: "brain",
      title: "Reasoning Engines",
      desc: "Multi-agent systems that debate, critique and refine outputs before acting.",
    },
    {
      icon: "chat",
      title: "AI Assistants & Copilots",
      desc: "Context-aware assistants embedded in developer, productivity or creative tooling.",
    },
    {
      icon: "radar",
      title: "Open Innovation",
      desc: "Anything agentic that surprises us — robotics, research, gaming, simulation, health, finance.",
    },
  ],

  timeline: [
    { phase: "Phase 01", title: "Ideation", date: "30 Oct · Briefing", desc: "Problem statements revealed. Form teams, pick your track, refine your pitch." },
    { phase: "Phase 02", title: "Build Sprint", date: "30–31 Oct · 24h", desc: "A full build window. Mentor office hours run every 2 hours across all tracks." },
    { phase: "Phase 03", title: "Integrate & Test", date: "31 Oct · Morning", desc: "Wire up tools, harden reliability, and prepare your live demos." },
    { phase: "Phase 04", title: "Demo Day", date: "31 Oct · Afternoon", desc: "Live demos to judges. Winners announced at the closing ceremony." },
  ],

  prizes: [
    { place: "1st Place", amount: "₹7,00,000", highlight: true, perks: "Cash prize + incubation offer + direct interview pipeline" },
    { place: "2nd Place", amount: "₹5,00,000", highlight: false, perks: "Cash prize + cloud credits + interview pipeline" },
    { place: "3rd Place", amount: "₹3,00,000", highlight: false, perks: "Cash prize + swag kits + fast-track interviews" },
  ],

  rulesTbd: true,
  rules: [
    "Detailed rules, eligibility and scoring criteria are yet to be decided and will be announced here and over email shortly after registrations open. Expected format: teams of 1–4, a fixed build window, live demos, and a fair judged close.",
  ],

  faqs: [
    {
      q: "Who can participate?",
      a: "Anyone — students, working professionals and independent builders. There is no participation fee and no login needed to browse, though you must fill the registration form to compete.",
    },
    {
      q: "Is this purely online or on-site?",
      a: "It's hybrid. You can participate fully online, or join us on-campus at the Innovation Hub. Both tracks get identical prizes.",
    },
    {
      q: "Do I need prior AI experience?",
      a: "Not at all. We welcome first-timers — starter kits, models and mentor office hours are built into the event so everyone ships something.",
    },
    {
      q: "How do I register?",
      a: "Hit the Register Now button and choose either the Google Form or the Unstop event page. Registration closes 24 hours before Kickoff.",
    },
    {
      q: "Do we own what we build?",
      a: "Yes — 100%. Anything you build stays yours. Some tracks carry optional incubation offers, but ownership always remains with the team.",
    },
  ],

  register: {
    note: "Slots are capped per track. Registration closes 24 hours before kickoff — don't snooze.",
  },

  organizer: "Organised by JYC (Jaypee Youth Club)",
};

export const site = {
  name: "Agentic AI",
  nav: [
    { label: "About", target: "#about" },
    { label: "Details", target: "#details" },
    { label: "Tracks", target: "#tracks" },
    { label: "Timeline", target: "#timeline" },
    { label: "Prizes", target: "#prizes" },
    { label: "FAQ", target: "#faq" },
  ],
  register: {
    googleFormUrl: "#",
    unstopUrl: "#",
    googleFormLabel: "Open Google Form",
    unstopLabel: "Join on Unstop",
  },
  social: {
    github: "#",
    discord: "#",
    twitter: "#",
    email: "hello@agenticai.events",
  },
  footerNote:
    "Website built by JYC for the Jaypee AI Summit 2026. No login, no paywall — this page exists purely so you can decide to ship or sit this one out.",
};