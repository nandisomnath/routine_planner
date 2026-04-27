import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = (planId) => `progress_${planId}`;

function readProgress(planId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(planId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeProgress(planId, data) {
  try {
    localStorage.setItem(STORAGE_KEY(planId), JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function useProgress(planId) {
  const [progress, setProgress] = useState(() => readProgress(planId));

  // Re-read when planId changes
  useEffect(() => {
    setProgress(readProgress(planId));
  }, [planId]);

  const toggleSubtopic = useCallback(
    (nodeId, subtopicId) => {
      const key = `${nodeId}:${subtopicId}`;
      setProgress((prev) => {
        const next = { ...prev, [key]: !prev[key] };
        writeProgress(planId, next);
        return next;
      });
    },
    [planId]
  );

  const setSubtopic = useCallback(
    (nodeId, subtopicId, value) => {
      const key = `${nodeId}:${subtopicId}`;
      setProgress((prev) => {
        const next = { ...prev, [key]: value };
        writeProgress(planId, next);
        return next;
      });
    },
    [planId]
  );

  const resetNode = useCallback(
    (nodeId, subtopicIds) => {
      setProgress((prev) => {
        const next = { ...prev };
        subtopicIds.forEach((sid) => delete next[`${nodeId}:${sid}`]);
        writeProgress(planId, next);
        return next;
      });
    },
    [planId]
  );

  const markAllNode = useCallback(
    (nodeId, subtopicIds) => {
      setProgress((prev) => {
        const next = { ...prev };
        subtopicIds.forEach((sid) => {
          next[`${nodeId}:${sid}`] = true;
        });
        writeProgress(planId, next);
        return next;
      });
    },
    [planId]
  );

  const resetPlan = useCallback(() => {
    setProgress({});
    writeProgress(planId, {});
  }, [planId]);

  const isCompleted = useCallback(
    (nodeId, subtopicId) => {
      return !!progress[`${nodeId}:${subtopicId}`];
    },
    [progress]
  );

  const getNodeProgress = useCallback(
    (nodeId, subtopicIds) => {
      const completed = subtopicIds.filter((sid) => progress[`${nodeId}:${sid}`]).length;
      return { completed, total: subtopicIds.length };
    },
    [progress]
  );

  const getPlanProgress = useCallback(
    (nodes) => {
      let completed = 0;
      let total = 0;
      nodes.forEach((node) => {
        const ids = node.subtopics.map((s) => s.id);
        ids.forEach((sid) => {
          total++;
          if (progress[`${node.id}:${sid}`]) completed++;
        });
      });
      return { completed, total };
    },
    [progress]
  );

  return {
    progress,
    toggleSubtopic,
    setSubtopic,
    resetNode,
    markAllNode,
    resetPlan,
    isCompleted,
    getNodeProgress,
    getPlanProgress,
  };
}

