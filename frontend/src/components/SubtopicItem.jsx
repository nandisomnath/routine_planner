import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

function SubtopicItem({ subtopic, nodeId, completed, onToggle }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="flex items-center gap-3 group cursor-pointer select-none"
      onClick={() => onToggle(nodeId, subtopic.id)}
    >
      {/* Custom checkbox */}
      <motion.div
        animate={{
          scale: completed ? 1.05 : 1,
          backgroundColor: completed ? 'var(--primary)' : 'transparent',
          borderColor: completed ? 'var(--primary)' : 'var(--border-color)',
        }}
        transition={{ duration: 0.2 }}
        className="relative flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: completed ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'backOut' }}
          className="flex items-center justify-center"
        >
          <Check size={12} className="text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Label */}
      <motion.span
        animate={{
          color: completed ? 'var(--text-muted)' : 'var(--text-heading)',
          textDecoration: completed ? 'line-through' : 'none',
          opacity: completed ? 0.6 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="text-sm font-medium"
      >
        {subtopic.title}
      </motion.span>
    </motion.div>
  );
}

export default SubtopicItem;

