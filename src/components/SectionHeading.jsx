import { Reveal } from './Motion'

export default function SectionHeading({ eyebrow, title, text, align = 'left', light = false }) {
  return (
    <Reveal as="header" className={`section-heading align-${align} ${light ? 'is-light' : ''}`} amount={0.25}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p className="section-intro">{text}</p>}
    </Reveal>
  )
}
