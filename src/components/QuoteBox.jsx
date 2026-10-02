import { useState } from 'react'
import { ArrowRight, Car, Bike, HeartPulse, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const tabs = [
  { id: 'car', label: 'Car', Icon: Car },
  { id: 'bike', label: 'Bike', Icon: Bike },
  { id: 'health', label: 'Health', Icon: HeartPulse },
  { id: 'life', label: 'Life', Icon: ShieldCheck },
]

export default function QuoteBox() {
  const [tab, setTab] = useState('car')
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const isVehicle = tab === 'car' || tab === 'bike'

  const switchTab = (next) => {
    setTab(next)
    setValue('')
    setError('')
  }

  const submit = (event) => {
    event.preventDefault()
    if (isVehicle) {
      if (value.trim().length < 6) {
        setError('Enter a valid vehicle registration number.')
        return
      }
      navigate('/motor-insurance', { state: { vehicleType: tab, registration: value.toUpperCase() } })
      return
    }
    if (!/^[6-9]\d{9}$/.test(value)) {
      setError('Enter a valid 10-digit Indian mobile number.')
      return
    }
    if (tab === 'health') navigate('/health-insurance', { state: { mobile: value } })
    else navigate('/insurance?category=life#product-enquiry')
  }

  return (
    <section className="quote-box" aria-labelledby="quick-quote-title">
      <div className="quote-box-copy">
        <p className="eyebrow eyebrow-light">QUICK START</p>
        <h2 id="quick-quote-title">Tell us what you want to protect.</h2>
        <p>Choose a category and begin a focused, guided journey.</p>
      </div>
      <div className="quote-box-form">
        <div className="quote-tabs" role="tablist" aria-label="Insurance category">
          {tabs.map(({ id, label, Icon }) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? 'active' : ''} onClick={() => switchTab(id)}>
              <Icon size={18} /> {label}
            </button>
          ))}
        </div>
        <form onSubmit={submit} noValidate>
          <div className="quote-input-row">
            <div className="field dark-field">
              <label htmlFor="quick-value">{isVehicle ? 'Vehicle Registration Number' : 'Mobile Number'}</label>
              {isVehicle ? (
                <input id="quick-value" value={value} onChange={(event) => setValue(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))} placeholder="DL01AB1234" maxLength="12" />
              ) : (
                <div className="phone-field"><span>+91</span><input id="quick-value" inputMode="numeric" maxLength="10" value={value} onChange={(event) => setValue(event.target.value.replace(/\D/g, ''))} placeholder="10-digit number" /></div>
              )}
            </div>
            <button className="button button-white" type="submit">Get My Quote <ArrowRight size={18} /></button>
          </div>
          {error && <p className="form-error light-error" role="alert">{error}</p>}
          <p className="quote-note">Demonstration only. No live insurer quotes are requested.</p>
        </form>
      </div>
    </section>
  )
}
