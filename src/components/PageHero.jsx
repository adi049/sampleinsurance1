import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

const parent = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
}

export default function PageHero({ eyebrow, title, text, children, compact = false }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className={`page-hero ${compact ? 'page-hero-compact' : ''}`}>
      <div className="container page-hero-inner">
        <motion.div className="page-hero-copy" variants={parent} initial={reduceMotion ? false : 'hidden'} animate="show">
          <motion.p className="eyebrow" variants={item}>{eyebrow}</motion.p>
          <motion.h1 variants={item}>{title}</motion.h1>
          {text && <motion.p variants={item}>{text}</motion.p>}
          {children && <motion.div variants={item}>{children}</motion.div>}
        </motion.div>
        <motion.aside
          className="page-hero-aside"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>PROTECTION JOURNEY</span>
          <ShieldCheck />
          <p>Clear inputs.<br />Considered next steps.</p>
        </motion.aside>
      </div>
    </section>
  )
}
