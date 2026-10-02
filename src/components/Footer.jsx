import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import Brand from './Brand'
import { Reveal } from './Motion'

export default function Footer() {
  return (
    <Reveal as="footer" className="footer" amount={0.08}>
      <div className="container footer-top">
        <div className="footer-brand">
          <Brand light />
          <p>A considered platform for clearer insurance discovery, comparison and support journeys.</p>
        </div>
        <div className="footer-column">
          <h2>Explore</h2>
          <Link to="/insurance">Insurance</Link>
          <Link to="/claims">Claims &amp; Renewals</Link>
          <Link to="/about#how-it-works">How It Works</Link>
        </div>
        <div className="footer-column">
          <h2>Company</h2>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </div>
        <div className="footer-column footer-contact">
          <h2>Talk to us</h2>
          <a href="tel:+918076690131"><Phone size={17} /> +91 8076690131</a>
          <a href="https://wa.me/918076690131?text=Hi%2C%20I%20want%20to%20know%20more%20about%20insurance." target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp <ArrowUpRight size={14} /></a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 SAMPLE WEBSITE</p>
        <p>Insurance discovery and support.</p>
      </div>
    </Reveal>
  )
}
