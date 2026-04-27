import { motion } from 'framer-motion'
import { BookOpen, GraduationCap } from 'lucide-react'
import PlanCard from '../components/PlanCard'
import { plans } from '../data/plansData'

function Plans() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 md:mb-14"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 shadow-lg">
          <GraduationCap size={28} className="text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-heading)] mb-3 tracking-tight">
          Study Plans
        </h1>
        <p className="text-[var(--text-muted)] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Choose a learning path and follow a structured roadmap to master new skills.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center justify-center gap-6 mb-10"
      >
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <BookOpen size={16} className="text-primary-light" />
          <span className="font-semibold text-[var(--text-heading)">{plans.length}</span> plans available
        </div>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan, index) => (
          <PlanCard key={plan.id} plan={plan} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Plans

