import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Brand from './Brand'

const navItems = [
  { label: 'Insurance', path: '/insurance' },
  { label: 'Claims', path: '/claims' },
  { label: 'Renewals', path: '/claims#renewal' },
  { label: 'How It Works', path: '/about#how-it-works' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar({ onLogin }) {
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef(null)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname, location.hash])
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])
  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      menuButtonRef.current?.focus()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const isCurrent = (item) => {
    if (item.label === 'Renewals') return location.pathname === '/claims' && location.hash === '#renewal'
    if (item.label === 'Claims') return location.pathname === '/claims' && location.hash !== '#renewal'
    if (item.label === 'How It Works') return location.pathname === '/about' && location.hash === '#how-it-works'
    if (item.label === 'About') return location.pathname === '/about' && location.hash !== '#how-it-works'
    return location.pathname === item.path
  }

  return (
    <motion.header
      className={`navbar-wrap ${scrolled ? 'is-scrolled' : ''}`}
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container navbar">
        <motion.div initial={reduceMotion ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.04 }}>
          <Brand light onClick={() => setOpen(false)} />
        </motion.div>
        <motion.nav className="desktop-nav" aria-label="Primary navigation" initial={reduceMotion ? false : { opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.1 }}>
          {navItems.map((item) => (
            <Link key={`${item.label}-${item.path}`} to={item.path} className={isCurrent(item) ? 'active' : ''} aria-current={isCurrent(item) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </motion.nav>
        <motion.div className="nav-actions" initial={reduceMotion ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.16 }}>
          <button className="nav-login" type="button" onClick={onLogin}>Login</button>
          <Link className="button button-primary nav-quote" to="/motor-insurance">
            Get a Quote <ArrowUpRight size={16} />
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {open ? <X /> : <Menu />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="container" aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <Link key={`${item.label}-mobile`} to={item.path} onClick={() => setOpen(false)}>
                  <span>0{index + 1}</span>{item.label}<ArrowUpRight size={17} />
                </Link>
              ))}
              <div className="mobile-menu-actions">
                <button type="button" className="button button-secondary" onClick={() => { setOpen(false); onLogin() }}>Login</button>
                <Link className="button button-primary" to="/motor-insurance" onClick={() => setOpen(false)}>Get a Quote</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
