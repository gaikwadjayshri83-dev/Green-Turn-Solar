// A map of routes to their respective SEO metadata
const SEO_DATA: { [key: string]: { title: string; description: string } } = {
  '#home': {
    title: 'Green Turn Solar | Rooftop Solar Installation in Nagpur',
    description: 'Leading rooftop solar panel installation and maintenance services in Nagpur. Get a free quote from Green Turn Solar for sustainable energy solutions for your home or business.',
  },
  '#about': {
    title: 'About Green Turn Solar | Nagpur\'s Trusted Solar Partner',
    description: 'Learn about Green Turn Solar, our mission, and our commitment to providing affordable and reliable renewable energy solutions to the Nagpur community.',
  },
  '#services': {
    title: 'Solar Services in Nagpur | Installation & Maintenance',
    description: 'We offer comprehensive solar services including rooftop installation, maintenance, repair, and free consultations for residential and commercial clients in Nagpur.',
  },
  '#calculator': {
    title: 'Solar Savings Calculator | Estimate Your ROI in Nagpur',
    description: 'Use our AI-powered solar calculator to estimate your potential savings, installation costs, and environmental impact with a rooftop solar system from Green Turn Solar in Nagpur.',
  },
  '#faq': {
    title: 'Solar FAQs | Green Turn Solar Nagpur',
    description: 'Find answers to frequently asked questions about solar panels, costs, subsidies, and installation processes in Nagpur with our AI-powered FAQ section.',
  },
  '#contact': {
    title: 'Contact Green Turn Solar | Get a Free Quote in Nagpur',
    description: 'Ready to switch to solar? Contact Green Turn Solar today for a free, no-obligation consultation and personalized quote for your Nagpur home or business.',
  },
  '#gallery': {
    title: 'Project Gallery | Our Solar Installations in Nagpur',
    description: 'View our gallery of completed residential and commercial rooftop solar projects across Nagpur. See the quality and expertise of Green Turn Solar\'s work.',
  },
  '#build': {
    title: 'Build Your Custom Solar System | Green Turn Solar Nagpur',
    description: 'Design your own custom rooftop solar system. Select panels, inverters, and more to get a personalized quote for your specific needs in Nagpur.',
  },
  '#testimonials': {
    title: 'Customer Testimonials | Green Turn Solar Nagpur Reviews',
    description: 'Read what our satisfied customers in Nagpur have to say about their experience with Green Turn Solar and the benefits of their new rooftop solar systems.',
  },
  '#submit-testimonial': {
    title: 'Submit Your Testimonial | Green Turn Solar Nagpur',
    description: 'Share your experience with Green Turn Solar. We value your feedback and would love to feature your story about going solar in Nagpur.',
  },
};

const BASE_URL = 'https://greenturnsolar.com';

export const updateMetaTags = (route: string) => {
  const meta = SEO_DATA[route] || SEO_DATA['#home']; // Fallback to home meta

  // Update title
  document.title = meta.title;

  // Update meta description
  let descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) {
    descriptionTag.setAttribute('content', meta.description);
  } else {
    descriptionTag = document.createElement('meta');
    descriptionTag.setAttribute('name', 'description');
    descriptionTag.setAttribute('content', meta.description);
    document.head.appendChild(descriptionTag);
  }
  
  // Update Open Graph description
  let ogDescriptionTag = document.querySelector('meta[property="og:description"]');
  if (ogDescriptionTag) {
    ogDescriptionTag.setAttribute('content', meta.description);
  }
  
  // Update Twitter description
  let twitterDescriptionTag = document.querySelector('meta[property="twitter:description"]');
  if (twitterDescriptionTag) {
    twitterDescriptionTag.setAttribute('content', meta.description);
  }

  // Update Open Graph title
  let ogTitleTag = document.querySelector('meta[property="og:title"]');
  if (ogTitleTag) {
    ogTitleTag.setAttribute('content', meta.title);
  }
  
  // Update Twitter title
  let twitterTitleTag = document.querySelector('meta[property="twitter:title"]');
  if (twitterTitleTag) {
    twitterTitleTag.setAttribute('content', meta.title);
  }

  // Update canonical URL
  const canonicalLink = document.getElementById('canonical-link') as HTMLLinkElement | null;
  if (canonicalLink) {
    canonicalLink.href = `${BASE_URL}/${route}`;
  }
  
  // Update OG URL
  const ogUrlTag = document.querySelector('meta[property="og:url"]');
  if (ogUrlTag) {
    ogUrlTag.setAttribute('content', `${BASE_URL}/${route}`);
  }
  
  // Update Twitter URL
  const twitterUrlTag = document.querySelector('meta[property="twitter:url"]');
  if (twitterUrlTag) {
    twitterUrlTag.setAttribute('content', `${BASE_URL}/${route}`);
  }
};
