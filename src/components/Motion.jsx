import { Children, cloneElement, isValidElement, useSyncExternalStore } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export const premiumEase = [0.22, 1, 0.36, 1]

const compactMotionQuery = '(max-width: 700px)'
let mediaQueryList
const mediaSubscribers = new Set()

function getMediaQueryList() {
  if (typeof window === 'undefined') return null
  if (!mediaQueryList) mediaQueryList = window.matchMedia(compactMotionQuery)
  return mediaQueryList
}

function subscribeToCompactMotion(callback) {
  const query = getMediaQueryList()
  if (!query) return () => {}

  mediaSubscribers.add(callback)
  if (mediaSubscribers.size === 1) query.addEventListener('change', notifyMediaSubscribers)

  return () => {
    mediaSubscribers.delete(callback)
    if (mediaSubscribers.size === 0) query.removeEventListener('change', notifyMediaSubscribers)
  }
}

function notifyMediaSubscribers() {
  mediaSubscribers.forEach((callback) => callback())
}

function getCompactMotionSnapshot() {
  return getMediaQueryList()?.matches ?? false
}

function useCompactMotion() {
  return useSyncExternalStore(subscribeToCompactMotion, getCompactMotionSnapshot, () => false)
}

function revealVariant(direction, compact) {
  const verticalDistance = compact ? 20 : 26
  const horizontalDistance = compact ? 18 : 24

  if (direction === 'left') {
    return {
      hidden: { opacity: 0, x: -horizontalDistance },
      show: { opacity: 1, x: 0, transition: { duration: 0.58, ease: premiumEase } },
    }
  }

  if (direction === 'right') {
    return {
      hidden: { opacity: 0, x: horizontalDistance },
      show: { opacity: 1, x: 0, transition: { duration: 0.58, ease: premiumEase } },
    }
  }

  if (direction === 'scale') {
    return {
      hidden: { opacity: 0, scale: compact ? 0.98 : 0.97 },
      show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: premiumEase } },
    }
  }

  return {
    hidden: { opacity: 0, y: verticalDistance },
    show: { opacity: 1, y: 0, transition: { duration: 0.56, ease: premiumEase } },
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}

export const staggerItem = {
  hidden: (compact = false) => ({ opacity: 0, y: compact ? 18 : 24 }),
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: premiumEase } },
}

const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  form: motion.form,
  figure: motion.figure,
  header: motion.header,
  footer: motion.footer,
}

export function Reveal({ children, className, as = 'div', direction = 'up', delay = 0, amount = 0.2, ...props }) {
  const reduceMotion = useReducedMotion()
  const compactMotion = useCompactMotion()
  const Tag = motionTags[as] || motion.div
  const variant = revealVariant(direction, compactMotion)
  const visible = {
    ...variant.show,
    transition: { ...variant.show.transition, delay },
  }

  return (
    <Tag
      className={className}
      initial={reduceMotion ? false : variant.hidden}
      whileInView={reduceMotion ? undefined : visible}
      viewport={{ once: true, amount }}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function StaggerGroup({ children, className, as = 'div', amount = 0.15, delay = 0, ...props }) {
  const reduceMotion = useReducedMotion()
  const compactMotion = useCompactMotion()
  const Tag = motionTags[as] || motion.div
  const visible = {
    ...staggerContainer.show,
    transition: { ...staggerContainer.show.transition, delayChildren: delay },
  }
  const responsiveChildren = Children.map(children, (child) => (
    isValidElement(child) ? cloneElement(child, { custom: compactMotion }) : child
  ))

  return (
    <Tag
      className={className}
      variants={reduceMotion ? undefined : { ...staggerContainer, show: visible }}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'show'}
      viewport={{ once: true, amount }}
      animate={reduceMotion ? { opacity: 1 } : undefined}
      {...props}
    >
      {responsiveChildren}
    </Tag>
  )
}
