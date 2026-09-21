export const event = {
  badge: "Ongoing Event",
  name: "Agentic AI Hackathon",
  edition: "2026",
  tagline: "Build autonomous AI agents that think, act, and ship.",
  shortDescription:
    "A 48-hour, online + offline hybrid hackathon where builders, developers and AI enthusiasts design autonomous AI agents that solve real-world problems end to end.",

  popup: {
    kicker: "You're invited, builder",
    title: "Agentic AI Hackathon 2026 is LIVE",
    body: "48 hours. Real problems. Autonomous agents that think, plan and act on their own. Team up, build and ship — and win from a prize pool of &#8377;5,00,000.",
    primaryLabel: "Register Now",
    secondaryLabel: "Explore More",
    disclaimer: "Free to participate · Open to all students & developers",
  },

  about: {
    heading: "What is the Agentic AI Hackathon?",
    paragraphs: [
      "The Agentic AI Hackathon is a high-intensity build sprint centered around one idea: software that doesn't wait to be told what to do. Participants design autonomous AI agents that reason over goals, break them into tasks, use tools, and act — end to end, with minimal human steering.",
      "Over 48 hours you will ideate, prototype and demo an agentic system on a real problem statement. Expect mentor check-ins, hands-on workshops and a closing demo day judged by industry leaders from AI startups and research labs.",
      "No login, no paywall, no gatekeeping. Bring your curiosity and your laptop — everything else is already set up for you.",
    ],
  },

  details: [
    { icon: "calendar", label: "Date", value: "24 – 26 October 2026" },
    { icon: "clock", label: "Format", value: "Hybrid · Online + On-campus" },
    { icon: "pin", label: "Venue", value: "Innovation Hub, Tech Park Block C" },
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
    { phase: "Phase 01", title: "Ideation", date: "Day 0 · Briefing", desc: "Problem statements revealed. Form teams, pick your track, refine your pitch." },
    { phase: "Phase 02", title: "Build Sprint", date: "Day 1 · 24h", desc: "24 hours of pure build. Mentor office hours run every 2 hours across all tracks." },
    { phase: "Phase 03", title: "Integrate & Test", date: "Day 2 · Morning", desc: "Wire up tools, harden reliability, and prepare your live demos." },
    { phase: "Phase 04", title: "Demo Day", date: "Day 2 · Afternoon", desc: "Live demos to judges. Winners announced at the closing ceremony." },
  ],

  prizes: [
    { place: "1st Place", amount: "₹2,50,000", highlight: true, perks: "Cash prize + incubation offer + direct interview pipeline" },
    { place: "2nd Place", amount: "₹1,50,000", highlight: false, perks: "Cash prize + cloud credits + interview pipeline" },
    { place: "3rd Place", amount: "₹1,00,000", highlight: false, perks: "Cash prize + swag kits + fast-track interviews" },
  ],

  rules: [
    "Teams of 1–4 members. Solo hackers are welcome; we'll help you find a team at the pre-event mixer.",
    "Any tech stack is allowed. Your project must demonstrate an autonomous agentic system — no simple chat wrappers.",
    "All code must be written during the hackathon window. Open-source libraries and APIs are permitted.",
    "Projects must be demoed live on Demo Day. A short pitch + working walkthrough is mandatory.",
    "The judging panel's decision is final. Off-script or plagiarised submissions will be disqualified.",
    "One submission per team. All team members must be present for the demo to qualify for prizes.",
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
    note: "Registration closes 24 hours before kickoff. Slots are limited per track.",
  },

  organizer: "Organised by Agentic AI Community",
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
    "Built with agents, for agents. No login required — this page is purely an information hub.",
};