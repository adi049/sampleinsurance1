import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, LockKeyhole, X } from 'lucide-react'

export default function LoginModal({ open, onClose }) {
  const reduceMotion = useReducedMotion()
  const [mode, setMode] = useState('login')
  const [step, setStep] = useState('form')
  const [values, setValues] = useState({ name: '', mobile: '' })
  const [error, setError] = useState('')
  const mobileRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.setTimeout(() => mobileRef.current?.focus(), 120)
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const focusable = document.querySelectorAll('.login-modal button, .login-modal input, .login-modal a')
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  const switchMode = () => {
    setMode((value) => value === 'login' ? 'signup' : 'login')
    setStep('form')
    setError('')
    setValues({ name: '', mobile: '' })
  }

  const submit = (event) => {
    event.preventDefault()
    const mobileOk = /^[6-9]\d{9}$/.test(values.mobile)
    if (mode === 'signup' && values.name.trim().length < 2) {
      setError('Enter your name to create an account.')
      return
    }
    if (!mobileOk) {
      setError('Enter a valid 10-digit Indian mobile number.')
      return
    }
    setError('')
    setStep('otp')
  }

  const resetAndClose = () => {
    setStep('form')
    setError('')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && resetAndClose()}
        >
          <motion.div
            className="login-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.24 }}
          >
            <button ref={closeRef} type="button" className="modal-close" onClick={resetAndClose} aria-label="Close login dialog"><X /></button>
            <section className="login-visual" aria-label="Secure access">
              <div className="login-visual-content">
                <span className="secure-icon"><LockKeyhole size={22} /></span>
                <p>SECURE ACCESS</p>
                <h2>Your insurance workspace.</h2>
                <div className="security-points">
                  <span><Check size={15} /> Mobile-first access</span>
                  <span><Check size={15} /> Prepared for OTP authentication</span>
                  <span><Check size={15} /> Clear demonstration states</span>
                </div>
                <div className="security-line"><span /> Interface prepared for secure integration</div>
              </div>
            </section>
            <section className="login-form-side">
              {step === 'form' ? (
                <>
                  <p className="eyebrow">{mode === 'login' ? 'WELCOME BACK' : 'CREATE ACCESS'}</p>
                  <h2 id="login-title">{mode === 'login' ? 'Login to continue.' : 'Create your account.'}</h2>
                  <p className="form-lead">Use your mobile number to access the demonstration journey.</p>
                  <form onSubmit={submit} noValidate>
                    {mode === 'signup' && (
                      <div className="field">
                        <label htmlFor="login-name">Name</label>
                        <input id="login-name" value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} autoComplete="name" placeholder="Your full name" />
                      </div>
                    )}
                    <div className="field">
                      <label htmlFor="login-mobile">Mobile number</label>
                      <div className="phone-field"><span>+91</span><input ref={mobileRef} id="login-mobile" inputMode="numeric" maxLength="10" value={values.mobile} onChange={(event) => setValues({ ...values, mobile: event.target.value.replace(/\D/g, '') })} autoComplete="tel" placeholder="10-digit number" /></div>
                    </div>
                    {error && <p className="form-error" role="alert">{error}</p>}
                    <button className="button button-primary button-full" type="submit">Send OTP <ArrowRight size={17} /></button>
                  </form>
                  <button type="button" className="mode-switch" onClick={switchMode}>
                    {mode === 'login' ? 'New here? Create an account' : 'Already registered? Login'}
                  </button>
                </>
              ) : (
                <motion.div className="otp-state" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.24 }}>
                  <span className="status-icon"><Check /></span>
                  <p className="eyebrow">DEMONSTRATION STATE</p>
                  <h2 id="login-title">OTP verification ready</h2>
                  <p>The interface is ready to connect to an authentication and OTP service. No OTP has been sent from this demonstration interface.</p>
                  <div className="otp-preview" aria-label="Illustrative OTP input layout">
                    {[1, 2, 3, 4].map((item) => <span key={item} />)}
                  </div>
                  <button type="button" className="button button-secondary button-full" onClick={() => setStep('form')}><ArrowLeft size={17} /> Back to mobile number</button>
                </motion.div>
              )}
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
