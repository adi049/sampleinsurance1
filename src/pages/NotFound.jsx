import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>This route is not part of the journey.</h1>
        <p>Return to the SAMPLE WEBSITE home page and choose a clear next step.</p>
        <Link className="button button-primary" to="/"><ArrowLeft size={17} /> Back to home</Link>
      </div>
    </main>
  )
}
