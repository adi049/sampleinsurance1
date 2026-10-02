import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import PageHero from './PageHero'
import { Reveal, StaggerGroup, staggerItem } from './Motion'

export default function LegalPage({ type, intro, sections }) {
  return (
    <main>
      <PageHero compact eyebrow="LEGAL INFORMATION" title={type} text={intro} />
      <section className="section legal-section">
        <div className="container legal-layout">
          <Reveal as="aside" className="legal-aside" direction="left" amount={0.2}>
            <span><AlertCircle /></span>
            <h2>Interim legal notice</h2>
            <p>This document contains interim legal content for a non-production demonstration. Qualified legal counsel must review and replace it before any production launch.</p>
            <small>Last content update: 2 October 2026</small>
          </Reveal>
          <StaggerGroup as="article" className="legal-content" amount={0.08}>
            {sections.map((section, index) => (
              <motion.section variants={staggerItem} key={section.title}>
                <span>0{index + 1}</span>
                <div><h2>{section.title}</h2>{section.paragraphs.map((text) => <p key={text}>{text}</p>)}</div>
              </motion.section>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </main>
  )
}
