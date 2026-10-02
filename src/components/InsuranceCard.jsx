import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { staggerItem } from './Motion'

export default function InsuranceCard({ product, index = 0, custom }) {
  const Icon = product.icon
  return (
    <motion.article className={`insurance-card accent-${product.accent}`} variants={staggerItem} custom={custom}>
      <div className="card-topline"><span>{product.label}</span><span className="card-index">0{index + 1}</span></div>
      <span className="product-icon"><Icon strokeWidth={1.8} /></span>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <Link to={product.path} className="card-link" aria-label={`Explore ${product.title}`}>
        Explore <ArrowUpRight size={17} />
      </Link>
    </motion.article>
  )
}
