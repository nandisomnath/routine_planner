import { motion } from 'framer-motion'
import { Clock, BarChart3, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function PlanCard({ plan, index }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/progress/${plan.id}`)}
      className="group cursor-pointer relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]"
    >
      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col h-full">
        <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2 group-hover:text-primary transition-colors duration-300">
          {plan.title}
        </h3>

        <p className="text-[var(--text-muted)] text-sm mb-4 flex-grow leading-relaxed">
          {plan.description}
        </p>

        <div className="flex items-center gap-4 text-xs font-medium text-[var(--text-muted)] mb-4">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-primary-light" />
            {plan.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BarChart3 size={14} className="text-secondary" />
            {plan.level}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border-color)]">
          <span className="text-xs text-[var(--text-muted)]">Click to view roadmap</span>
          <motion.div
            className="flex items-center gap-1 text-primary text-sm font-semibold"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            View Roadmap
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default PlanCard

