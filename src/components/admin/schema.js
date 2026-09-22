export const SECTIONS = [
  {
    title: "Event basics",
    path: ["event"],
    kind: "group",
    fields: {
      badge: { label: "Badge", type: "text" },
      name: { label: "Event name", type: "text" },
      edition: { label: "Edition / year", type: "text" },
      date: { label: "Date line", type: "text" },
      venue: { label: "Venue line", type: "text" },
    },
  },
  {
    title: "Hero title & stats",
    path: ["event", "hero"],
    kind: "group",
    fields: {
      pre: { label: "Title before highlight", type: "text" },
      highlight: { label: "Highlighted (gradient) text", type: "text" },
      post: { label: "Title after highlight", type: "text" },
    },
  },
  {
    title: "Hero stats",
    path: ["event", "heroStats"],
    kind: "list",
    defaultItem: { num: "", label: "" },
    itemFields: {
      num: { label: "Number", type: "text" },
      label: { label: "Label", type: "text" },
    },
  },
  {
    title: "Entry popup",
    path: ["event", "popup"],
    kind: "group",
    fields: {
      kicker: { label: "Kicker", type: "text" },
      title: { label: "Title", type: "text" },
      body: { label: "Body (HTML allowed)", type: "textarea", rows: 3 },
      primaryLabel: { label: "Primary button label", type: "text" },
      secondaryLabel: { label: "Secondary button label", type: "text" },
      disclaimer: { label: "Disclaimer line", type: "text" },
    },
  },
  {
    title: "About section",
    path: ["event", "about"],
    kind: "group",
    fields: {
      heading: { label: "Heading", type: "text" },
      paragraphs: { label: "Paragraphs", type: "listString" },
    },
  },
  {
    title: "Details cards (Key Highlights)",
    path: ["event", "details"],
    kind: "list",
    defaultItem: { icon: "calendar", label: "", value: "" },
    itemFields: {
      icon: { label: "Icon", type: "text" },
      label: { label: "Label", type: "text" },
      value: { label: "Value", type: "text" },
    },
  },
  {
    title: "Thematic areas",
    path: ["event", "tracks"],
    kind: "list",
    defaultItem: { icon: "spark", title: "", desc: "" },
    itemFields: {
      icon: { label: "Icon (spark / brain / chat / radar)", type: "text" },
      title: { label: "Title", type: "text" },
      desc: { label: "Description", type: "textarea", rows: 2 },
    },
  },
  {
    title: "Why Agentic AI? (steps)",
    path: ["event", "timeline"],
    kind: "list",
    defaultItem: { phase: "", title: "", date: "", desc: "" },
    itemFields: {
      phase: { label: "Phase", type: "text" },
      title: { label: "Title", type: "text" },
      date: { label: "Date", type: "text" },
      desc: { label: "Description", type: "textarea", rows: 2 },
    },
  },
  {
    title: "Prizes",
    path: ["event", "prizes"],
    kind: "list",
    defaultItem: { place: "", amount: "", highlight: false, perks: "" },
    itemFields: {
      place: { label: "Place", type: "text" },
      amount: { label: "Amount", type: "text" },
      highlight: { label: "Highlight card", type: "boolean" },
      perks: { label: "Perks", type: "textarea", rows: 2 },
    },
  },
  {
    title: "Who should attend (bullets)",
    path: ["event"],
    kind: "group",
    fields: {
      rulesTbd: { label: "Show 'announced soon' (not used)", type: "boolean" },
      rules: { label: "Audience items", type: "listString" },
    },
  },
  {
    title: "FAQ",
    path: ["event", "faqs"],
    kind: "list",
    defaultItem: { q: "", a: "" },
    itemFields: {
      q: { label: "Question", type: "text" },
      a: { label: "Answer", type: "textarea", rows: 3 },
    },
  },
  {
    title: "Call to participate",
    path: ["event", "register"],
    kind: "group",
    fields: {
      note: { label: "CTA keywords line", type: "textarea", rows: 2 },
    },
  },
  {
    title: "Organizer",
    path: ["event", "organizer"],
    kind: "text",
  },
  {
    title: "Branding",
    path: ["site"],
    kind: "group",
    fields: {
      name: { label: "Site name", type: "text" },
      logoUrl: { label: "Logo image URL (or /logo.png)", type: "text" },
    },
  },
  {
    title: "Navigation",
    path: ["site", "nav"],
    kind: "list",
    defaultItem: { label: "", target: "" },
    itemFields: {
      label: { label: "Label", type: "text" },
      target: { label: "Target (e.g. #about)", type: "text" },
    },
  },
  {
    title: "Registration links",
    path: ["site", "register"],
    kind: "group",
    fields: {
      googleFormUrl: { label: "Google Form URL", type: "text" },
      unstopUrl: { label: "Unstop URL", type: "text" },
      googleFormLabel: { label: "Google Form button label", type: "text" },
      unstopLabel: { label: "Unstop button label", type: "text" },
    },
  },
  {
    title: "Social links",
    path: ["site", "social"],
    kind: "group",
    fields: {
      github: { label: "GitHub", type: "text" },
      discord: { label: "Discord", type: "text" },
      twitter: { label: "Twitter / X", type: "text" },
      email: { label: "Email", type: "text" },
    },
  },
  {
    title: "Footer",
    path: ["site", "footerNote"],
    kind: "textarea",
  },
];