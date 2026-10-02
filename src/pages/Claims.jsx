import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, FileSearch, RefreshCw } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Reveal, StaggerGroup, staggerItem } from '../components/Motion'

const initialClaim = { policy: '', mobile: '', incident: '' }
const initialRenewal = { policy: '', mobile: '' }

export default function Claims() {
  const [claim, setClaim] = useState(initialClaim)
  const [renewal, setRenewal] = useState(initialRenewal)
  const [claimError, setClaimError] = useState('')
  const [renewalError, setRenewalError] = useState('')
  const [claimDone, setClaimDone] = useState(false)
  const [renewalDone, setRenewalDone] = useState(false)

  const validBase = (values) => values.policy.trim().length >= 5 && /^[6-9]\d{9}$/.test(values.mobile)
  const submitClaim = (event) => {
    event.preventDefault()
    if (!validBase(claim) || claim.incident.trim().length < 10) {
      setClaimError('Enter a policy number, valid mobile number and a short description of at least 10 characters.')
      return
    }
    setClaimError('')
    setClaimDone(true)
  }
  const submitRenewal = (event) => {
    event.preventDefault()
    if (!validBase(renewal)) {
      setRenewalError('Enter a policy number and a valid 10-digit Indian mobile number.')
      return
    }
    setRenewalError('')
    setRenewalDone(true)
  }

  return (
    <main>
      <PageHero eyebrow="CLAIMS & RENEWALS" title="The right route for the next policy step." text="Preview structured assistance flows for a claim or renewal. No policy records or insurer systems are connected yet." />
      <section className="section service-flows">
        <StaggerGroup className="container service-grid" amount={0.16}>
          <motion.article variants={staggerItem} className="service-panel claim-panel">
            <div className="service-panel-head"><span><FileSearch /></span><div><p className="eyebrow">CLAIM ASSISTANCE</p><h2>Tell us what happened.</h2></div></div>
            {claimDone ? (
              <div className="service-success" role="status">
                <span className="status-icon"><Check /></span>
                <h3>Claim assistance state ready</h3>
                <p>Your details were validated only in this browser. No claim has been filed, and no insurer has received this information.</p>
                <button type="button" className="button button-secondary" onClick={() => { setClaim(initialClaim); setClaimDone(false) }}>Start another entry</button>
              </div>
            ) : (
              <form onSubmit={submitClaim} noValidate>
                <div className="field"><label htmlFor="claim-policy">Policy Number</label><input id="claim-policy" value={claim.policy} onChange={(event) => setClaim({ ...claim, policy: event.target.value })} placeholder="Enter policy number" /></div>
                <div className="field"><label htmlFor="claim-mobile">Mobile Number</label><div className="phone-field"><span>+91</span><input id="claim-mobile" inputMode="numeric" maxLength="10" value={claim.mobile} onChange={(event) => setClaim({ ...claim, mobile: event.target.value.replace(/\D/g, '') })} placeholder="10-digit number" /></div></div>
                <div className="field"><label htmlFor="claim-incident">What happened?</label><textarea id="claim-incident" rows="4" value={claim.incident} onChange={(event) => setClaim({ ...claim, incident: event.target.value })} placeholder="Briefly describe the situation" /></div>
                {claimError && <p className="form-error" role="alert">{claimError}</p>}
                <button className="button button-primary" type="submit">Start Claim <ArrowRight size={17} /></button>
                <p className="form-footnote">Demonstration only. This does not submit a claim.</p>
              </form>
            )}
          </motion.article>

          <motion.article variants={staggerItem} className="service-panel renewal-panel" id="renewal">
            <div className="service-panel-head"><span><RefreshCw /></span><div><p className="eyebrow">RENEWAL</p><h2>Find the policy path.</h2></div></div>
            {renewalDone ? (
              <div className="service-success" role="status">
                <span className="status-icon"><Check /></span>
                <h3>Renewal lookup state ready</h3>
                <p>The interface validated your entry. It did not look up a real policy, premium or insurer record.</p>
                <button type="button" className="button button-secondary" onClick={() => { setRenewal(initialRenewal); setRenewalDone(false) }}>Check another entry</button>
              </div>
            ) : (
              <form onSubmit={submitRenewal} noValidate>
                <div className="field"><label htmlFor="renewal-policy">Policy Number</label><input id="renewal-policy" value={renewal.policy} onChange={(event) => setRenewal({ ...renewal, policy: event.target.value })} placeholder="Enter policy number" /></div>
                <div className="field"><label htmlFor="renewal-mobile">Mobile Number</label><div className="phone-field"><span>+91</span><input id="renewal-mobile" inputMode="numeric" maxLength="10" value={renewal.mobile} onChange={(event) => setRenewal({ ...renewal, mobile: event.target.value.replace(/\D/g, '') })} placeholder="10-digit number" /></div></div>
                {renewalError && <p className="form-error" role="alert">{renewalError}</p>}
                <button className="button button-dark" type="submit">Find Policy <ArrowRight size={17} /></button>
                <p className="form-footnote">Demonstration only. No policy database is connected.</p>
              </form>
            )}
          </motion.article>
        </StaggerGroup>
        <Reveal className="container service-disclosure" amount={0.3}><strong>Important</strong><p>For urgent help with an existing policy, contact the relevant insurer through the official details in your policy documents. SAMPLE WEBSITE does not currently process claims or renewals.</p></Reveal>
      </section>
    </main>
  )
}
