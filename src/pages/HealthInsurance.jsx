import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, HeartPulse, Shield, Stethoscope, Users } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { Reveal, StaggerGroup, staggerItem } from '../components/Motion'

const healthOptions = [
  { Icon: HeartPulse, title: 'Individual cover', text: 'Structure a journey around one person and their health protection needs.', color: 'teal' },
  { Icon: Users, title: 'Family protection', text: 'Explore shared coverage considerations for a household in one flow.', color: 'light' },
  { Icon: Shield, title: 'Senior citizen cover', text: 'Capture age and health context relevant to protection for parents.', color: 'soft' },
  { Icon: Stethoscope, title: 'Critical illness options', text: 'Create room to compare condition-based benefits and policy terms.', color: 'gold' },
]

export default function HealthInsurance() {
  const location = useLocation()
  const [values, setValues] = useState({ mobile: location.state?.mobile || '', who: 'Self', age: '', cover: '₹10,00,000' })
  const [error, setError] = useState('')
  const [complete, setComplete] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    if (!/^[6-9]\d{9}$/.test(values.mobile)) {
      setError('Enter a valid 10-digit Indian mobile number.')
      return
    }
    const age = Number(values.age)
    if (!age || age < 18 || age > 100) {
      setError('Enter an age between 18 and 100.')
      return
    }
    setError('')
    setComplete(true)
  }

  return (
    <main>
      <PageHero eyebrow="HEALTH INSURANCE" title="Shape health cover around real needs." text="Share a few basic details to preview a health insurance journey designed for individuals and families." />
      <section className="section health-journey">
        <div className="container health-grid">
          <Reveal className="health-form-wrap" direction="left" amount={0.2}>
            {!complete ? (
              <form className="journey-form health-form" onSubmit={submit} noValidate>
                <div className="form-step-label"><span>01</span> COVER DETAILS</div>
                <h2>Who should this cover support?</h2>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="health-mobile">Mobile Number</label>
                    <div className="phone-field"><span>+91</span><input id="health-mobile" inputMode="numeric" maxLength="10" value={values.mobile} onChange={(event) => setValues({ ...values, mobile: event.target.value.replace(/\D/g, '') })} placeholder="10-digit number" /></div>
                  </div>
                  <div className="field">
                    <label htmlFor="health-who">Who needs cover?</label>
                    <select id="health-who" value={values.who} onChange={(event) => setValues({ ...values, who: event.target.value })}>
                      <option>Self</option><option>Self + Family</option><option>Parents</option><option>Family</option>
                    </select>
                  </div>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="health-age">Age</label>
                    <input id="health-age" type="number" min="18" max="100" value={values.age} onChange={(event) => setValues({ ...values, age: event.target.value })} placeholder="Primary member age" />
                  </div>
                  <div className="field">
                    <label htmlFor="health-cover">Coverage amount</label>
                    <select id="health-cover" value={values.cover} onChange={(event) => setValues({ ...values, cover: event.target.value })}>
                      <option>₹5,00,000</option><option>₹10,00,000</option><option>₹15,00,000</option><option>₹25,00,000</option><option>₹50,00,000</option>
                    </select>
                  </div>
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button className="button button-primary" type="submit">Continue <ArrowRight size={18} /></button>
                <p className="form-footnote">No health or quote data is sent from this demonstration interface.</p>
              </form>
            ) : (
              <Reveal className="health-complete" direction="up" amount={0.2} role="status">
                <span className="status-icon"><Check /></span>
                <p className="eyebrow">STEP PREVIEW READY</p>
                <h2>Your health journey is ready for comparison.</h2>
                <p>The interface has prepared an illustrative next state for <strong>{values.who}</strong>, age <strong>{values.age}</strong>, with a selected cover amount of <strong>{values.cover}</strong>.</p>
                <div className="health-summary"><span>Live quotes</span><strong>Not requested</strong><span>Data transmission</span><strong>Not active</strong></div>
                <button type="button" className="button button-secondary" onClick={() => setComplete(false)}><ArrowLeft size={17} /> Edit details</button>
              </Reveal>
            )}
          </Reveal>
          <Reveal as="aside" className="health-info" direction="right" amount={0.18}>
            <figure className="journey-photo health-context-photo">
              <img src={`${import.meta.env.BASE_URL}images/health-cover.jpg`} alt="Stethoscope resting on a medical notebook" width="1400" height="2100" loading="lazy" />
              <figcaption>Health protection context</figcaption>
            </figure>
            <p className="eyebrow">COVERAGE CONTEXT</p>
            <h2>One journey, several ways to protect health.</h2>
            <StaggerGroup className="health-option-grid" amount={0.15}>
              {healthOptions.map(({ Icon, title, text, color }) => (
                <motion.article variants={staggerItem} className={`health-option health-${color}`} key={title}>
                  <Icon /><div><h3>{title}</h3><p>{text}</p></div>
                </motion.article>
              ))}
            </StaggerGroup>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
