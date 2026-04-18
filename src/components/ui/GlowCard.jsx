import { motion } from 'framer-motion';

/**
 * GlowCard — glassomorphism card with cyan glow on hover
 */
export default function GlowCard({ children, className = '', onClick }) {
  return (
    <motion.div
      className={`glass-card border border-[rgba(0,224,255,0.12)] rounded-2xl transition-colors duration-300 ${className}`}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 40px rgba(0, 224, 255, 0.18), 0 20px 60px rgba(0,0,0,0.4)',
        borderColor: 'rgba(0, 224, 255, 0.35)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
