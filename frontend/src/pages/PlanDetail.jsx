import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Map, BookOpen, RotateCcw } from 'lucide-react'
import RoadmapNode from '../components/RoadmapNode'
import { plans, roadmapData } from '../data/plansData'
import { useProgress } from '../hooks/useProgress'

function PlanDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const plan = plans.find((p) => p.id === id)
  const roadmap = roadmapData[id] || []

  const { getPlanProgress, resetPlan } = useProgress(id)
  const { completed, total } = getPlanProgress(roadmap)
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!plan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-10 shadow-[var(--shadow-lg)]"
        >
          <Map size={48} className="mx-auto text-[var(--text-muted)] mb-4" />
          <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-2">Plan Not Found</h2>
          <p className="text-[var(--text-muted)] mb-6">The study plan you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/plans')}
            className="inline-flex items-center gap-2"
          >
            <ChevronLeft size={18} />
            Back to Plans
          </button>
        </motion.div>
      </div>
    )
  }

  const totalLessons = roadmap.reduce((sum, node) => sum + node.lessons, 0)

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20">
      {/* Sticky Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 -mx-4 px-4 py-4 mb-6 backdrop-blur-xl bg-[var(--bg-body)]/80 border-b border-[var(--border-color)]"
      >
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/plans')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-primary hover:border-primary/40 transition-colors duration-200"
          >
            <ChevronLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </motion.button>

          <div className="flex-grow min-w-0">
            <h1 className="text-lg md:text-xl font-bold text-[var(--text-heading)] truncate">
              {plan.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
              <span>{plan.duration}</span>
              <span>•</span>
              <span>{plan.level}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <BookOpen size={12} />
                {totalLessons} lessons
              </span>
            </div>
          </div>

          {/* Overall plan progress in header */}
          {total > 0 && (
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              <div className="text-right">
                <div className="text-xs text-[var(--text-muted)]">
                  {completed}/{total} done
                </div>
                <div className="text-sm font-bold text-primary">{percent}%</div>
              </div>
              <div className="w-24 h-2 rounded-full bg-[var(--progress-bg)] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetPlan}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors text-xs font-medium"
                title="Reset all progress"
              >
                <RotateCcw size={13} />
                Reset
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile overall progress */}
      {total > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="sm:hidden mb-6"
        >
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[var(--text-muted)] font-medium">Overall Progress</span>
            <span className="text-primary font-bold">{percent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[var(--progress-bg)] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-1">
            {completed} of {total} subtopics completed
          </div>
        </motion.div>
      )}

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-[var(--text-muted)] text-sm md:text-base mb-8 md:mb-10 leading-relaxed"
      >
        {plan.description}
      </motion.p>

      {/* Roadmap Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-6 md:mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Map size={16} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-heading)]">Roadmap</h2>
        </div>

        <div className="relative">
          {roadmap.map((node, index) => (
            <RoadmapNode
              key={node.id}
              node={node}
              index={index}
              total={roadmap.length}
              planId={id}
            />
          ))}
        </div>
      </motion.div>

      {/* Empty state */}
      {roadmap.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-[var(--text-muted)]"
        >
          No roadmap data available for this plan.
        </motion.div>
      )}
    </div>
  )
}

export default PlanDetail

