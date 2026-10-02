import {
  Car,
  HeartPulse,
  ShieldCheck,
  House,
  BriefcaseBusiness,
  Plane,
} from 'lucide-react'

export const insuranceProducts = [
  {
    id: 'motor',
    title: 'Motor Insurance',
    description: 'Explore protection for cars, bikes and commercial vehicles with a guided comparison flow.',
    icon: Car,
    accent: 'teal',
    path: '/motor-insurance',
    label: 'Vehicle cover',
  },
  {
    id: 'health',
    title: 'Health Insurance',
    description: 'Shape a health cover journey around individuals, families, parents or senior citizens.',
    icon: HeartPulse,
    accent: 'light',
    path: '/health-insurance',
    label: 'Medical cover',
  },
  {
    id: 'life',
    title: 'Life Insurance',
    description: 'Review the information needed to plan long-term financial protection for loved ones.',
    icon: ShieldCheck,
    accent: 'gold',
    path: '/insurance?category=life#product-enquiry',
    label: 'Life cover',
  },
  {
    id: 'home',
    title: 'Home Insurance',
    description: 'Understand cover considerations for your home, belongings and common household risks.',
    icon: House,
    accent: 'soft',
    path: '/insurance?category=home#product-enquiry',
    label: 'Property cover',
  },
  {
    id: 'business',
    title: 'Business Insurance',
    description: 'Start identifying relevant protection for property, liability and day-to-day operations.',
    icon: BriefcaseBusiness,
    accent: 'navy',
    path: '/insurance?category=business#product-enquiry',
    label: 'Commercial cover',
  },
  {
    id: 'travel',
    title: 'Travel Insurance',
    description: 'Prepare for a trip with a clearer view of medical, baggage and disruption protection.',
    icon: Plane,
    accent: 'teal',
    path: '/insurance?category=travel#product-enquiry',
    label: 'Trip cover',
  },
]

export const faqs = [
  {
    question: 'Can I compare different insurance options?',
    answer: 'The experience is designed around comparison-first journeys. This interface demonstrates how options can be organized, but it does not connect to live insurer quote APIs yet.',
  },
  {
    question: 'Can I renew an existing policy?',
    answer: 'You can explore the renewal flow and provide a policy number and mobile number. The current experience shows a demonstration state rather than retrieving a real policy.',
  },
  {
    question: 'Is this website connected to insurers right now?',
    answer: 'No. SAMPLE WEBSITE is currently a demonstration interface. Insurer, payment, policy issuance and authentication services can be connected in a future production phase.',
  },
  {
    question: 'How do I contact the team?',
    answer: 'Call or WhatsApp +91 8076690131, or use the enquiry form on the Contact page. The form currently confirms your entry on screen and does not transmit data.',
  },
]

export const motorPlans = [
  {
    name: 'Essential Cover',
    coverage: 'Core vehicle protection',
    premium: '₹4,800',
    features: ['Own damage illustration', 'Third-party cover overview', 'Digital document checklist'],
    tone: 'navy',
  },
  {
    name: 'Balanced Cover',
    coverage: 'Broader everyday protection',
    premium: '₹7,200',
    features: ['Essential cover features', 'Roadside assistance add-on', 'Zero depreciation option'],
    tone: 'gold',
    featured: true,
  },
  {
    name: 'Enhanced Cover',
    coverage: 'Expanded protection options',
    premium: '₹9,600',
    features: ['Balanced cover features', 'Engine protection option', 'Consumables cover option'],
    tone: 'soft',
  },
]
