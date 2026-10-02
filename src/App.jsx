import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import FloatingContact from './components/FloatingContact'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/About'
import Claims from './pages/Claims'
import Contact from './pages/Contact'
import HealthInsurance from './pages/HealthInsurance'
import Home from './pages/Home'
import Insurance from './pages/Insurance'
import MotorInsurance from './pages/MotorInsurance'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

const titles = {
  '/': 'SAMPLE WEBSITE | Insurance, made clearer',
  '/insurance': 'Explore Insurance | SAMPLE WEBSITE',
  '/motor-insurance': 'Motor Insurance | SAMPLE WEBSITE',
  '/health-insurance': 'Health Insurance | SAMPLE WEBSITE',
  '/claims': 'Claims & Renewals | SAMPLE WEBSITE',
  '/about': 'About | SAMPLE WEBSITE',
  '/contact': 'Contact | SAMPLE WEBSITE',
  '/privacy': 'Privacy Policy | SAMPLE WEBSITE',
  '/terms': 'Terms & Conditions | SAMPLE WEBSITE',
}

export default function App() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    document.title = titles[location.pathname] || 'SAMPLE WEBSITE'
  }, [location.pathname])

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar onLogin={() => setLoginOpen(true)} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -5 }}
          transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/motor-insurance" element={<MotorInsurance />} />
            <Route path="/health-insurance" element={<HealthInsurance />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <FloatingContact />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  )
}
