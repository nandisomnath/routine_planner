import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, BookOpen, ChevronDown, RotateCcw, CheckCircle2 } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'
import SubtopicItem from './SubtopicItem'

function RoadmapNode({ node, index, total, planId }) {
  const ref = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const focusTimeoutRef = useRef(null)
  const wasFocusedRef = useRef(false)
  const {
    toggleSubtopic,
    isCompleted,
    getNodeProgress,
    markAllNode,
    resetNode,
  } = useProgress(planId)

  const subtopicIds = node.subtopics.map((s) => s.id)
  const { completed, total: totalSubs } = getNodeProgress(node.id, subtopicIds)
  const nodePercent = totalSubs > 0 ? Math.round((completed / totalSubs) * 100) : 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (focusTimeoutRef.current) {
          clearTimeout(focusTimeoutRef.current)
        }

        focusTimeoutRef.current = setTimeout(() => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect
            const viewportCenter = window.innerHeight / 2
            const elementCenter = rect.top + rect.height / 2
            const distance = Math.abs(viewportCenter - elementCenter)
            const shouldFocus = distance < 250
            if (shouldFocus && isLast) {
              wasFocusedRef.current = true
            }
            setIsFocused(shouldFocus)
          } else if (!(isLast && wasFocusedRef.current)) {
            setIsFocused(false)
          }
        }, 100)
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-20% 0px -20% 0px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current)
      }
      observer.disconnect()
    }
  }, [])

  const isLast = index === total - 1

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        {/* Top connector (except first) */}
        {index > 0 && (
          <motion.div
            className="w-0.5 bg-[var(--border-color)] flex-shrink-0"
            initial={{ height: 0 }}
            animate={{ height: 24 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Node circle */}
        <motion.div
          className={`relative z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex-shrink-0 transition-all duration-500 ${
            isFocused
              ? 'bg-gradient-to-br from-primary to-accent border-primary shadow-lg shadow-primary/25 scale-110'
              : 'bg-[var(--bg-card)] border-[var(--border-color)]'
          }`}
          animate={{
            scale: isFocused ? 1.15 : 1,
            boxShadow: isFocused
              ? '0 0 20px rgba(79, 70, 229, 0.3)'
              : '0 0 0px rgba(79, 70, 229, 0)',
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <span className={`text-sm md:text-base font-bold ${isFocused ? 'text-white' : 'text-[var(--text-muted)]'}`}>
            {index + 1}
          </span>
        </motion.div>

        {/* Bottom connector (except last) */}
        {!isLast && (
          <motion.div
            className="w-0.5 bg-[var(--border-color)] flex-grow min-h-[40px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        className={`flex-grow pb-8 md:pb-12 transition-all duration-500 ${isFocused ? 'md:translate-x-2' : ''}`}
      >
        <motion.div
          className={`rounded-2xl border p-5 md:p-6 transition-all duration-500 ${
            isFocused
              ? 'bg-[var(--bg-card)] border-primary/40 shadow-[var(--shadow-lg)]'
              : 'bg-[var(--bg-card)]/60 border-[var(--border-color)] shadow-[var(--shadow)]'
          }`}
          animate={{
            backgroundColor: isFocused ? 'var(--bg-card)' : 'rgba(var(--bg-card), 0.6)',
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
              isFocused ? 'text-primary-light' : 'text-[var(--text-heading)]'
            }`}>
              {node.title}
            </h3>
            <motion.div
              animate={{ rotate: isFocused ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[var(--text-muted)] mt-1"
            >
              <ChevronDown size={18} />
            </motion.div>
          </div>

          {/* Compact info */}
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-2">
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {node.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen size={13} />
              {node.lessons} lessons
            </span>
            <span className="flex items-center gap-1 font-semibold text-primary-light">
              {completed}/{totalSubs} done
            </span>
          </div>

          {/* Node-level mini progress bar (always visible) */}
          <div className="w-full h-1.5 rounded-full bg-[var(--progress-bg)] overflow-hidden mb-3">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${nodePercent}%` }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed"
                >
                  {node.description}
                </motion.p>

                {/* Subtopic checkboxes */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--text-heading)] uppercase tracking-wider">
                      Subtopics
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          markAllNode(node.id, subtopicIds)
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 hover:bg-primary/20 transition-colors"
                        title="Mark all complete"
                      >
                        <CheckCircle2 size={12} />
                        All
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          resetNode(node.id, subtopicIds)
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                        title="Reset progress"
                      >
                        <RotateCcw size={12} />
                        Reset
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {node.subtopics.map((sub, i) => (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.05, duration: 0.25 }}
                      >
                        <SubtopicItem
                          subtopic={sub}
                          nodeId={node.id}
                          completed={isCompleted(node.id, sub.id)}
                          onToggle={toggleSubtopic}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default RoadmapNode

