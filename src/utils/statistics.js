export const priorityOrder = { low: 1, medium: 2, high: 3 };

export const statusLabels = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export const learningStatusLabels = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export function formatDate(dateValue) {
  if (!dateValue) {
    return 'No due date';
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'No due date';
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function calculateTaskStats(tasks = []) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === 'completed').length;
  const inProgress = tasks.filter((task) => task.status === 'in-progress').length;
  const todo = tasks.filter((task) => task.status === 'todo').length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    inProgress,
    todo,
    completionRate,
  };
}

export function calculateLearningStats(topics = []) {
  const total = topics.length;
  const completedTopics = topics.filter((topic) => topic.status === 'completed').length;
  const averageProgress = total === 0 ? 0 : Math.round(topics.reduce((sum, topic) => sum + Number(topic.progress || 0), 0) / total);

  return {
    total,
    completedTopics,
    averageProgress,
  };
}

export function getPriorityCounts(tasks = []) {
  return {
    low: tasks.filter((task) => task.priority === 'low').length,
    medium: tasks.filter((task) => task.priority === 'medium').length,
    high: tasks.filter((task) => task.priority === 'high').length,
  };
}

export function getStatusCounts(tasks = []) {
  return {
    todo: tasks.filter((task) => task.status === 'todo').length,
    'in-progress': tasks.filter((task) => task.status === 'in-progress').length,
    completed: tasks.filter((task) => task.status === 'completed').length,
  };
}
