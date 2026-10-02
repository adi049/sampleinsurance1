import { useState } from 'react'
import { ArrowRight, Check, Clock3, MessageCircle, Phone } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Reveal } from '../components/Motion'

export default function Contact() {
  const [values, setValues] = useState({ name: '', mobile: '', message: '' })
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    if (values.name.trim().length < 2) {
      setError('Enter your name.')
      return
    }
    if (!/^[6-9]\d{9}$/.test(values.mobile)) {
      setError('Enter a valid 10-digit Indian mobile number.')
      return
    }
    if (values.message.trim().length < 10) {
      setError('Tell us how we can help in at least 10 characters.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <main>
      <PageHero eyebrow="CONTACT" title="Need help choosing your next step?" text="Call, start a WhatsApp conversation or use the enquiry form below." />
      <section className="section contact-section">
        <div className="container contact-grid">
          <Reveal className="contact-details" direction="left" amount={0.2}>
            <p className="eyebrow">DIRECT CONTACT</p>
            <h2>Reach the team in the way that works for you.</h2>
            <a className="contact-card" href="tel:+918076690131"><span><Phone /></span><div><small>CALL</small><strong>+91 8076690131</strong><p>Open your phone dialer</p></div><ArrowRight /></a>
            <a className="contact-card" href="https://wa.me/918076690131?text=Hi%2C%20I%20want%20to%20know%20more%20about%20insurance." target="_blank" rel="noreferrer"><span className="accent-icon"><MessageCircle /></span><div><small>WHATSAPP</small><strong>+91 8076690131</strong><p>Start with a prefilled message</p></div><ArrowRight /></a>
            <div className="contact-note"><Clock3 /><p><strong>Contact options</strong>The phone and WhatsApp links are active. The enquiry form demonstrates validation only.</p></div>
          </Reveal>
          <Reveal className="contact-form-panel" direction="right" amount={0.2}>
            {submitted ? (
              <div className="contact-success" role="status">
                <span className="status-icon"><Check /></span>
                <p className="eyebrow">ENQUIRY CAPTURED LOCALLY</p>
                <h2>Thank you, {values.name.trim()}.</h2>
                <p>Your form passed local validation. It was not sent or stored because this demonstration has no backend enquiry service.</p>
                <button type="button" className="button button-secondary" onClick={() => { setSubmitted(false); setValues({ name: '', mobile: '', message: '' }) }}>Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <p className="eyebrow">SEND AN ENQUIRY</p>
                <h2>How can we help?</h2>
                <div className="field"><label htmlFor="contact-name">Name</label><input id="contact-name" autoComplete="name" value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} placeholder="Your full name" /></div>
                <div className="field"><label htmlFor="contact-mobile">Mobile Number</label><div className="phone-field"><span>+91</span><input id="contact-mobile" inputMode="numeric" maxLength="10" autoComplete="tel" value={values.mobile} onChange={(event) => setValues({ ...values, mobile: event.target.value.replace(/\D/g, '') })} placeholder="10-digit number" /></div></div>
                <div className="field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" rows="5" value={values.message} onChange={(event) => setValues({ ...values, message: event.target.value })} placeholder="Tell us what you would like help with" /></div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button className="button button-primary" type="submit">Send Enquiry <ArrowRight size={17} /></button>
                <p className="form-footnote">This form does not transmit or store your information.</p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </main>
  )
}
