import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Bike, Car, Check, ChevronDown, Info, Truck } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import { Reveal, StaggerGroup, staggerItem } from '../components/Motion'
import { motorPlans } from '../data/insuranceData'

const vehicleTypes = [
  { id: 'car', label: 'Car', Icon: Car },
  { id: 'bike', label: 'Bike', Icon: Bike },
  { id: 'commercial', label: 'Commercial Vehicle', Icon: Truck },
]

export default function MotorInsurance() {
  const reduceMotion = useReducedMotion()
  const location = useLocation()
  const incoming = location.state || {}
  const [vehicleType, setVehicleType] = useState(incoming.vehicleType || 'car')
  const [registration, setRegistration] = useState(incoming.registration || '')
  const [error, setError] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    if (incoming.registration?.length >= 6) setShowResults(true)
  }, [])

  const submit = (event) => {
    event.preventDefault()
    if (registration.trim().length < 6) {
      setError('Enter a valid vehicle registration number.')
      return
    }
    setError('')
    setShowResults(true)
    window.setTimeout(() => document.getElementById('demo-comparison')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const reset = () => {
    setShowResults(false)
    setDetail(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main>
      <PageHero eyebrow="MOTOR INSURANCE" title="Start with your vehicle. Finish with clearer coverage." text="Choose your vehicle type and add its registration number to preview a comparison-ready motor journey." />
      <section className="section motor-form-section">
        <div className="container motor-layout">
          <Reveal as="form" className="journey-form" direction="left" amount={0.2} onSubmit={submit} noValidate>
            <div className="form-step-label"><span>01</span> VEHICLE DETAILS</div>
            <h2>What do you drive?</h2>
            <div className="vehicle-selector" role="radiogroup" aria-label="Vehicle type">
              {vehicleTypes.map(({ id, label, Icon }) => (
                <button type="button" role="radio" aria-checked={vehicleType === id} className={vehicleType === id ? 'active' : ''} onClick={() => setVehicleType(id)} key={id}>
                  <Icon /> <span>{label}</span><i aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="field">
              <label htmlFor="motor-registration">Vehicle Registration Number</label>
              <input id="motor-registration" value={registration} onChange={(event) => setRegistration(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))} placeholder="DL01AB1234" maxLength="12" />
              <small>Used only to demonstrate this interface journey.</small>
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-primary" type="submit">Continue <ArrowRight size={18} /></button>
          </Reveal>
          <Reveal as="aside" className="journey-aside" direction="right" amount={0.2}>
            <figure className="journey-photo journey-photo-motor">
              <img src={`${import.meta.env.BASE_URL}images/motor-cover.jpg`} alt="Car keys held inside a vehicle" width="1400" height="2489" loading="lazy" />
              <figcaption>Vehicle protection context</figcaption>
            </figure>
            <p className="eyebrow">WHAT COMES NEXT</p>
            <h2>A comparison view built around useful differences.</h2>
            <div className="aside-step"><span>1</span><p><strong>Confirm the vehicle</strong>Future vehicle data services can populate details here.</p></div>
            <div className="aside-step"><span>2</span><p><strong>Review cover structures</strong>Options can be arranged by coverage and feature differences.</p></div>
            <div className="aside-step"><span>3</span><p><strong>Select a next step</strong>Future integrations can support proposals and payments.</p></div>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {showResults && (
          <motion.section id="demo-comparison" className="section comparison-section" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.32 }}>
            <div className="container">
              <div className="comparison-header">
                <SectionHeading eyebrow="COVERAGE COMPARISON PREVIEW" title="See how coverage options could compare." text={`Illustrative interface for ${registration || 'your vehicle'}. Premium amounts and features below are for demonstration only, not real insurance quotes.`} />
                <button className="button button-secondary" type="button" onClick={reset}><ArrowLeft size={17} /> Edit vehicle</button>
              </div>
              <div className="demo-disclosure"><Info size={18} /><p><strong>Illustrative comparison</strong> No insurer has provided these amounts. Nothing shown here can be purchased or issued.</p></div>
              <StaggerGroup className="plans-grid" amount={0.14}>
                {motorPlans.map((plan, index) => (
                  <motion.article variants={staggerItem} className={`plan-card tone-${plan.tone} ${plan.featured ? 'featured' : ''}`} key={plan.name}>
                    {plan.featured && <span className="plan-marker">COMPARISON FOCUS</span>}
                    <div className="plan-head"><span>0{index + 1}</span><small>ILLUSTRATIVE OPTION</small></div>
                    <h3>{plan.name}</h3>
                    <p className="plan-coverage">{plan.coverage}</p>
                    <div className="premium"><small>INDICATIVE AMOUNT</small><strong>{plan.premium}</strong><span>for interface demonstration</span></div>
                    <ul>{plan.features.map((feature) => <li key={feature}><Check size={16} />{feature}</li>)}</ul>
                    <button type="button" className={`button ${plan.featured ? 'button-primary' : 'button-secondary'} button-full`} onClick={() => setDetail(detail === index ? null : index)} aria-expanded={detail === index}>
                      {detail === index ? 'Hide Details' : 'View Details'} <ChevronDown size={17} className={detail === index ? 'rotate-icon' : ''} />
                    </button>
                    <AnimatePresence initial={false}>
                      {detail === index && (
                        <motion.div className="plan-detail" initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }}>
                          <p>This panel demonstrates where limits, exclusions, add-ons and insurer documents could appear after API integration.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                ))}
              </StaggerGroup>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  )
}
