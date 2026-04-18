import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * CTAButton — primary or secondary CTA with magnetic hover
 */
export default function CTAButton({
  children,
  variant = 'primary',
  href,
  onClick,
  icon: Icon = ArrowRight,
  showIcon = true,
  className = '',
  ariaLabel,
}) {
  const Tag = href ? 'a' : 'button';
  const props = href ? { href } : { onClick };

  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <motion.div
      className="inline-block"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Tag
        {...props}
        aria-label={ariaLabel ?? (typeof children === 'string' ? children : undefined)}
        className={`${baseClass} ${className}`}
      >
        {children}
        {showIcon && <Icon size={16} aria-hidden="true" />}
      </Tag>
    </motion.div>
  );
}
