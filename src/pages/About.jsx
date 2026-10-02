import { motion } from 'framer-motion'
import { ArrowRight, Braces, Check, GitCompareArrows, PanelsTopLeft, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import { Reveal, StaggerGroup, staggerItem } from '../components/Motion'

const principles = [
  { Icon: PanelsTopLeft, number: '01', title: 'Clear product discovery', text: 'Separate product paths keep questions relevant and make the next action easier to understand.' },
  { Icon: GitCompareArrows, number: '02', title: 'Comparison-first journeys', text: 'Coverage, features and illustrative values are organized for considered side-by-side review.' },
  { Icon: Smartphone, number: '03', title: 'Mobile-friendly interactions', text: 'Forms, navigation and contact actions are designed to work intentionally on smaller screens.' },
  { Icon: Braces, number: '04', title: 'Integration-ready architecture', text: 'Interface states anticipate authentication, quote, payment, policy and claims integrations.' },
]

export default function About() {
  return (
    <main>
      <PageHero eyebrow="ABOUT THE CONCEPT" title="A more considered way to navigate insurance." text="SAMPLE WEBSITE presents an interface concept for clearer, more structured insurance discovery and service journeys." />
      <section className="section about-intro">
        <div className="container about-intro-grid">
          <Reveal direction="left" amount={0.2}>
            <p className="eyebrow">WHY THIS EXPERIENCE EXISTS</p>
            <h2>Reduce interface friction without reducing important context.</h2>
          </Reveal>
          <Reveal direction="right" amount={0.2}>
            <p>Insurance decisions involve product details, personal context and careful review. This concept uses focused steps, visible disclosures and consistent interaction patterns to make those decisions easier to navigate.</p>
            <p>It does not claim to sell, issue or service a policy today. It shows a production-minded interface foundation that can be connected to verified services later.</p>
          </Reveal>
          <Reveal as="figure" className="about-photo" direction="scale" amount={0.25}>
            <img src="/images/insurance-guidance.jpg" alt="People reviewing an insurance policy document together" width="1400" height="925" loading="lazy" />
            <figcaption>Clear information supports a more considered insurance journey.</figcaption>
          </Reveal>
        </div>
      </section>
      <section className="section principles-section">
        <div className="container">
          <SectionHeading eyebrow="DESIGN PRINCIPLES" title="Built around clarity, not claims." text="The concept focuses on useful product interaction patterns rather than invented company credentials or performance numbers." />
          <StaggerGroup className="principles-grid" amount={0.12}>
            {principles.map(({ Icon, number, title, text }) => (
              <motion.article key={title} variants={staggerItem}>
                <div><span>{number}</span><Icon /></div><h3>{title}</h3><p>{text}</p>
              </motion.article>
            ))}
          </StaggerGroup>
        </div>
      </section>
      <section className="section about-how" id="how-it-works">
        <div className="container about-how-grid">
          <Reveal className="about-how-copy" direction="left" amount={0.2}>
            <p className="eyebrow eyebrow-light">HOW IT WORKS</p>
            <h2>A flexible interface flow with honest states.</h2>
            <p>Each journey asks for relevant information, validates it in the browser and then presents a clearly labeled demonstration state.</p>
            <Link className="button button-white" to="/insurance">Choose a product <ArrowRight size={17} /></Link>
          </Reveal>
          <Reveal as="div" className="about-process-wrap" direction="right" amount={0.2}><ol className="about-process">
            <li><span>01</span><div><h3>Choose the need</h3><p>Begin with motor, health, life or another protection category.</p></div></li>
            <li><span>02</span><div><h3>Add relevant context</h3><p>Complete a short form built around the selected product journey.</p></div></li>
            <li><span>03</span><div><h3>Review an honest next state</h3><p>See a demonstration result that never pretends a live service was contacted.</p></div></li>
          </ol></Reveal>
        </div>
      </section>
      <section className="section integration-section">
        <div className="container integration-grid">
          <Reveal className="integration-copy" direction="left" amount={0.25}>
            <p className="eyebrow">FUTURE INTEGRATIONS</p>
            <h2>Prepared for a connected production platform.</h2>
            <p>A future phase can connect the interface to secure, reviewed services without replacing its central interaction model.</p>
          </Reveal>
          <Reveal className="integration-list" direction="right" amount={0.25}>
            {['Authentication and OTP service', 'Insurance quote and insurer APIs', 'Payment and policy issuance', 'Claims and renewal services', 'Database and admin dashboard'].map((item) => <span key={item}><Check size={17} />{item}</span>)}
          </Reveal>
        </div>
      </section>
    </main>
  )
}
