import EmptyState from '../common/EmptyState';
import TaskCard from './TaskCard';

function TaskList({ tasks, onEdit, onDelete, onCreate }) {
  if (!tasks.length) {
    return (
      <EmptyState
        title="No tasks yet"
        description="Create your first task to start tracking your progress."
        actionLabel="Add task"
        onAction={onCreate}
      />
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TaskList;
