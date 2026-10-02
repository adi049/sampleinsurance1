import LegalPage from '../components/LegalPage'

const sections = [
  { title: 'Current demonstration scope', paragraphs: ['SAMPLE WEBSITE is presently a demonstration interface. Forms show browser-based validation and interface states only. The interface does not transmit form entries to a production database, insurer, broker, payment provider or policy administration system.'] },
  { title: 'Information shown in the interface', paragraphs: ['The interface may ask for details such as a name, mobile number, vehicle registration, age, policy number or enquiry message. These inputs are used only to demonstrate local user interface behavior during the current non-production phase.', 'Do not enter sensitive financial, health, identity or policy information into this demonstration.'] },
  { title: 'Future production processing', paragraphs: ['A production version may require secure services for authentication, quote retrieval, insurer connectivity, payments, policy issuance, claims, renewals and customer support. Before those services are enabled, the privacy notice must be updated to explain the data collected, legal basis, purpose, retention, sharing, security, cookies and user rights.'] },
  { title: 'Third-party links', paragraphs: ['Phone and WhatsApp actions can open services provided by device or third-party platforms. Their handling of information is governed by their own policies. This interim notice does not describe those third-party practices.'] },
  { title: 'Security and retention', paragraphs: ['No promise of production-grade storage or transmission security is made for this demonstration because production data processing is not active. Appropriate technical and organizational controls must be implemented and documented before launch.'] },
  { title: 'Contact and legal review', paragraphs: ['For questions about this demonstration, call or WhatsApp +91 8076690131. Production privacy language, consent mechanisms and regulatory requirements must be reviewed by qualified legal and compliance professionals before launch.'] },
]

export default function Privacy() {
  return <LegalPage type="Privacy Policy" intro="A transparent interim notice explaining how information is treated during the current demonstration phase." sections={sections} />
}
