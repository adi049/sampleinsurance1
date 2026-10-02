import { MessageCircle, Phone } from 'lucide-react'

const whatsappUrl = 'https://wa.me/918076690131?text=Hi%2C%20I%20want%20to%20know%20more%20about%20insurance.'

export default function FloatingContact() {
  return (
    <aside className="floating-contact" aria-label="Quick contact options">
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="contact-action whatsapp-action" aria-label="WhatsApp 8076690131">
        <MessageCircle aria-hidden="true" />
        <span><small>WhatsApp</small>8076690131</span>
      </a>
      <a href="tel:+918076690131" className="contact-action call-action" aria-label="Call 8076690131">
        <Phone aria-hidden="true" />
        <span><small>Call</small>8076690131</span>
      </a>
    </aside>
  )
}
