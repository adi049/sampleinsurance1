import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../data/insuranceData'

export default function FAQ() {
  const reduceMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="faq-list">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <article className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.question}>
            <h3>
              <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)} aria-expanded={isOpen} aria-controls={`faq-panel-${index}`}>
                <span><small>0{index + 1}</small>{item.question}</span>
                <Plus className="faq-plus" aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`faq-panel-${index}`} className="faq-answer" initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }}>
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        )
      })}
    </div>
  )
}
