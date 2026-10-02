import { Link } from 'react-router-dom'

export default function Brand({ light = false, onClick }) {
  return (
    <Link to="/" className={`brand ${light ? 'brand-light' : ''}`} onClick={onClick} aria-label="SAMPLE WEBSITE home">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark-core">S</span>
        <span className="brand-mark-dot" />
      </span>
      <span className="brand-name">
        <strong>SAMPLE</strong>
        <span>WEBSITE</span>
      </span>
    </Link>
  )
}
