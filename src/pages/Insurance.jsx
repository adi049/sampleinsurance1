import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, Layers3 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import InsuranceCard from '../components/InsuranceCard'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import { Reveal, StaggerGroup } from '../components/Motion'
import { insuranceProducts } from '../data/insuranceData'

export default function Insurance() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const category = params.get('category')
  const selected = useMemo(() => insuranceProducts.find((item) => item.id === category), [category])
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setMobile('')
    setError('')
    setSubmitted(false)
  }, [category])

  const submit = (event) => {
    event.preventDefault()
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Enter a valid 10-digit Indian mobile number.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <main>
      <PageHero eyebrow="INSURANCE" title="Explore coverage by what you want to protect." text="Choose a category to enter a focused, transparent product journey. Live insurer connections can be added in a future production phase." />
      <section className="section insurance-catalogue">
        <div className="container">
          <SectionHeading eyebrow="COVERAGE CATEGORIES" title="A clear starting point for every need." text="Product journeys are separated by context so the experience stays relevant and easy to navigate." />
          <StaggerGroup className="products-grid insurance-page-grid" amount={0.12}>
            {insuranceProducts.map((product, index) => <InsuranceCard key={product.id} product={product} index={index} />)}
          </StaggerGroup>
        </div>
      </section>

      <section className="section selected-product-section" id="product-enquiry">
        <div className="container selected-product-grid">
          <Reveal direction="left" amount={0.25}>
            <p className="eyebrow">PRODUCT ENQUIRY</p>
            <h2>{selected ? `Start exploring ${selected.title.toLowerCase()}.` : 'Not sure which route fits?'}</h2>
            <p>{selected ? selected.description : 'Choose a category above or share a mobile number to prepare a guided product discovery conversation.'}</p>
            <div className="selection-points">
              <span><Check /> No insurer API request</span>
              <span><Check /> No payment or purchase</span>
              <span><Check /> Demonstration interface only</span>
            </div>
          </Reveal>
          <Reveal className="enquiry-panel" direction="right" amount={0.25}>
            {submitted ? (
              <div className="inline-success" role="status">
                <span><Check /></span>
                <h3>Enquiry state ready</h3>
                <p>Your entry was validated in the browser. A production version can connect this step to a secure enquiry service.</p>
                <button className="button button-secondary" type="button" onClick={() => { setSubmitted(false); setMobile('') }}>Start another enquiry</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <span className="panel-icon"><Layers3 /></span>
                <h3>{selected?.title || 'Guided product discovery'}</h3>
                <p>Enter a mobile number to preview the next-step state.</p>
                <div className="field">
                  <label htmlFor="insurance-mobile">Mobile Number</label>
                  <div className="phone-field"><span>+91</span><input id="insurance-mobile" inputMode="numeric" maxLength="10" value={mobile} onChange={(event) => setMobile(event.target.value.replace(/\D/g, ''))} placeholder="10-digit number" /></div>
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button className="button button-primary button-full" type="submit">Continue <ArrowRight size={17} /></button>
                {!selected && <button type="button" className="quiet-action" onClick={() => navigate('/contact')}>Speak to the team instead</button>}
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </main>
  )
}
