function TaskFilters({ search, statusFilter, priorityFilter, sortBy, onSearchChange, onStatusChange, onPriorityChange, onSortChange }) {
  return (
    <div className="card-surface section-card filters-panel">
      <div className="row g-3 align-items-center">
        <div className="col-12 col-lg-4">
          <label className="form-label" htmlFor="task-search">
            Search tasks
          </label>
          <input
            id="task-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="form-control"
            placeholder="Search by title, description or category"
          />
        </div>

        <div className="col-12 col-md-4 col-lg-2">
          <label className="form-label" htmlFor="status-filter">
            Status
          </label>
          <select id="status-filter" value={statusFilter} onChange={(event) => onStatusChange(event.target.value)} className="form-select">
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="col-12 col-md-4 col-lg-2">
          <label className="form-label" htmlFor="priority-filter">
            Priority
          </label>
          <select id="priority-filter" value={priorityFilter} onChange={(event) => onPriorityChange(event.target.value)} className="form-select">
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="col-12 col-md-4 col-lg-4">
          <label className="form-label" htmlFor="sort-by">
            Sort by
          </label>
          <select id="sort-by" value={sortBy} onChange={(event) => onSortChange(event.target.value)} className="form-select">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskFilters;
