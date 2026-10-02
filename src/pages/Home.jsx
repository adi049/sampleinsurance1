import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, FileSearch, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import FAQ from '../components/FAQ'
import InsuranceCard from '../components/InsuranceCard'
import QuoteBox from '../components/QuoteBox'
import SectionHeading from '../components/SectionHeading'
import { Reveal, StaggerGroup, staggerItem } from '../components/Motion'
import { insuranceProducts } from '../data/insuranceData'

const heroParent = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Home() {
  const reduceMotion = useReducedMotion()

  return (
    <main>
      <section className="home-hero">
        <div className="container hero-grid">
          <motion.div className="hero-copy" variants={heroParent} initial={reduceMotion ? false : 'hidden'} animate="show">
            <motion.p className="eyebrow" variants={heroItem}>A CLEARER START TO INSURANCE</motion.p>
            <motion.h1 variants={heroItem}>Compare insurance.<br /><span>Choose with clarity.</span></motion.h1>
            <motion.p className="hero-lead" variants={heroItem}>Explore motor, health, life and other protection options through one straightforward digital journey.</motion.p>
            <motion.div className="hero-actions" variants={heroParent}>
              <motion.span variants={heroItem}><Link className="button button-primary" to="/motor-insurance">Start a Quote <ArrowRight size={18} /></Link></motion.span>
              <motion.span variants={heroItem}><Link className="button button-secondary" to="/about#how-it-works">See How It Works</Link></motion.span>
            </motion.div>
            <motion.div className="hero-context" variants={heroItem}>
              <span><ShieldCheck size={17} /> Comparison-first design</span>
              <span>Insurance, made clearer</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="coverage-visual"
            initial={reduceMotion ? false : { opacity: 0, x: 22, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Illustrative insurance coverage interface"
          >
            <div className="coverage-visual-header">
              <span>Coverage workspace</span>
              <span>Illustrative demo</span>
            </div>
            <div className="coverage-card">
              <div className="coverage-card-head">
                <div><span className="mini-mark">S</span><strong>SAMPLE WEBSITE</strong></div>
                <span className="coverage-tag">COVERAGE VIEW</span>
              </div>
              <div className="coverage-main">
                <p>YOUR COVERAGE</p>
                <h2>₹10,00,000</h2>
                <span>Illustrative coverage amount</span>
              </div>
              <div className="coverage-features">
                <span><Check size={16} /> Flexible options</span>
                <span><Check size={16} /> Digital comparison</span>
                <span><Check size={16} /> Assisted journey</span>
              </div>
              <div className="coverage-footer">
                <span>PROTECTION OVERVIEW</span>
                <div className="bar-group" aria-hidden="true"><i /><i /><i /><i /></div>
              </div>
            </div>
            <div className="coverage-visual-note">
              <ShieldCheck size={20} />
              <div><strong>Built for informed choices</strong><span>Illustrative details remain clearly identified.</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section quote-section">
        <div className="container"><Reveal amount={0.18}><QuoteBox /></Reveal></div>
      </section>

      <section className="section products-section">
        <div className="container">
          <div className="heading-row">
            <SectionHeading eyebrow="PROTECTION, ORGANIZED" title="Coverage for the things that matter." text="Start with a category. Each path is structured around the details relevant to that type of protection." />
            <Link className="text-link" to="/insurance">View all insurance <ArrowRight size={17} /></Link>
          </div>
          <StaggerGroup className="products-grid" amount={0.12}>
            {insuranceProducts.map((product, index) => <InsuranceCard key={product.id} product={product} index={index} />)}
          </StaggerGroup>
        </div>
      </section>

      <section className="clarity-section">
        <div className="container clarity-grid">
          <Reveal className="clarity-visual" direction="left" amount={0.25} aria-hidden="true">
            <div className="document-card document-front">
              <div className="doc-head"><FileSearch /><span>COMPARE<br /><strong>COVERAGE</strong></span></div>
              <div className="doc-row"><span>Coverage type</span><strong>Clear labels</strong></div>
              <div className="doc-row"><span>Information</span><strong>Side by side</strong></div>
              <div className="doc-row"><span>Next step</span><strong>Guided</strong></div>
              <div className="doc-progress"><i /><i /><i /></div>
            </div>
          </Reveal>
          <Reveal className="clarity-copy" direction="right" delay={0.06} amount={0.25}>
            <p className="eyebrow">DESIGNED FOR DECISIONS</p>
            <h2>Understand the journey before you move forward.</h2>
            <p>Insurance interfaces should make complex choices easier to scan. SAMPLE WEBSITE brings product context, comparison patterns and assistance into one focused experience.</p>
            <ul className="feature-list">
              <li><Check /> Inputs that match the product journey</li>
              <li><Check /> Clear distinction between illustrative and live data</li>
              <li><Check /> Architecture prepared for future API integrations</li>
            </ul>
            <Link className="button button-secondary" to="/about">About the concept <ArrowRight size={17} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section how-section" id="how-it-works">
        <div className="container">
          <SectionHeading eyebrow="HOW IT WORKS" title="Three deliberate steps. No unnecessary detours." text="A simple structure that can support richer insurer and service integrations in the future." light />
          <StaggerGroup className="steps-grid" amount={0.18}>
            {[
              ['01', 'Tell us what you need', 'Choose the type of protection and share only the details relevant to that journey.'],
              ['02', 'Compare the options', 'Review coverage structure, features and clearly marked illustrative information side by side.'],
              ['03', 'Complete your journey', 'Move into an assisted next step designed for future authentication, payment and policy services.'],
            ].map(([number, title, text]) => (
              <motion.article key={number} variants={staggerItem}>
                <span className="step-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <i aria-hidden="true" />
              </motion.article>
            ))}
          </StaggerGroup>
          <Reveal className="how-action" amount={0.4}><Link className="button button-white" to="/insurance">Explore insurance <ArrowRight size={17} /></Link></Reveal>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-grid">
          <div className="faq-copy">
            <SectionHeading eyebrow="COMMON QUESTIONS" title="Useful answers, without the fine-print fog." text="A quick overview of what this interface concept can do today and how support works." />
            <Link className="text-link" to="/contact">Still need help? Contact us <ArrowRight size={17} /></Link>
          </div>
          <Reveal direction="right" amount={0.18}><FAQ /></Reveal>
        </div>
      </section>
    </main>
  )
}
