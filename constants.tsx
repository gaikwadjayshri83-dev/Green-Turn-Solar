// FIX: Added constants for navigation, pricing, and FAQs to be used throughout the application.
export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Build System', href: '#build' },
  { name: 'About', href: '#about' },
  { name: 'Calculator', href: '#calculator' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export const PRICING_INFO = {
  title: "Understanding Solar Costs in Nagpur",
  intro: "The final cost of a rooftop solar system depends on several factors. Our goal is to provide a transparent and competitive pricing structure tailored to your specific needs.",
  factors: [
    "System Size (kW): The primary driver of cost.",
    "Type and Quality of Panels & Inverter: We use only Tier-1 components for reliability.",
    "Complexity of Installation: Roof type, angle, and accessibility can influence labor costs.",
    "Government Subsidies: We help you navigate and apply for all available state and central subsidies.",
  ],
  conclusion: "For a precise quote, we recommend a free, no-obligation site assessment by our expert team. However, here's a general price range to give you an idea:",
  priceList: [
    "1 kW System: ₹55,000 - ₹60,000",
    "3 kW System: ₹1,65,000 - ₹1,80,000",
    "5 kW System: ₹2,75,000 - ₹3,00,000",
    "10 kW System: Contact us for a custom quote",
  ],
};

export const FAQ_QUESTIONS = [
  "What is the average cost of a rooftop solar system in Nagpur?",
  "How much can I save on my electricity bill?",
  "Are there any government subsidies available?",
  "How long does the installation take?",
  "What kind of maintenance do solar panels require?",
];

export const SYSTEM_OPTIONS = {
  capacities: ["1 kW", "2 kW", "3 kW", "4 kW", "5 kW", "10 kW"],
  panels: ["Renew", "Adani", "Waaree", "UTL"],
  inverters: ["Ksolare", "UTL", "Polycab", "Havells"],
  structures: ["Nut-bolting", "Welding"],
};
