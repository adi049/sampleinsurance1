import LegalPage from '../components/LegalPage'

const sections = [
  { title: 'Interface status', paragraphs: ['SAMPLE WEBSITE is currently a demonstration interface. It illustrates possible insurance discovery, comparison, login, claim, renewal and contact experiences. It is not a live insurance distribution or policy servicing platform.'] },
  { title: 'No offer or purchase', paragraphs: ['Nothing displayed in this demonstration is an offer, recommendation, policy contract or guarantee of coverage. Insurance policies cannot be purchased, renewed, issued, changed or cancelled through this interface.', 'Illustrative premiums, coverage amounts, product options and features are interface content only. They are not real quotes and are not supplied by an insurer.'] },
  { title: 'No connected services', paragraphs: ['The interface is not connected to insurer APIs, quote engines, payment gateways, OTP delivery, policy databases, claims services or renewal systems. A successful interface state confirms local validation only.'] },
  { title: 'User responsibility', paragraphs: ['Do not rely on this demonstration to make a financial or insurance decision. Verify policy terms, exclusions, limits, premiums and insurer information through authorized production channels and official policy documents. Do not submit confidential or sensitive information.'] },
  { title: 'Availability and changes', paragraphs: ['Features, routes, copy and interaction patterns may be changed as the product concept develops. Availability of the demonstration is not guaranteed, and the interface may be incomplete for production purposes despite showing complete user journeys.'] },
  { title: 'Required production review', paragraphs: ['These interim terms are not a substitute for legal advice. Before launch, qualified legal and compliance professionals must review applicable insurance, consumer, technology, privacy and accessibility obligations.'] },
]

export default function Terms() {
  return <LegalPage type="Terms & Conditions" intro="Interim terms defining what this demonstration interface does and, importantly, what it does not do." sections={sections} />
}
