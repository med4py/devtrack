import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import { useAppContext } from '../context/AppContext';

const defaultValues = {
  name: '',
  description: '',
  progress: 0,
  status: 'not-started',
};

function LearningForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { topics, addTopic, updateTopic } = useAppContext();

  const existingTopic = topics.find((topic) => topic.id === id);

  useEffect(() => {
    if (id && !existingTopic) {
      navigate('/learning', { replace: true });
    }
  }, [existingTopic, id, navigate]);

  const [formData, setFormData] = useState(existingTopic ? { ...existingTopic } : defaultValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(existingTopic ? { ...existingTopic } : defaultValues);
  }, [existingTopic]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (Number(formData.progress) < 0 || Number(formData.progress) > 100) {
      nextErrors.progress = 'Progress must be between 0 and 100.';
    }

    if (!formData.status) {
      nextErrors.status = 'Status is required.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
      progress: Number(formData.progress),
    };

    if (existingTopic) {
      updateTopic(existingTopic.id, payload);
    } else {
      addTopic({
        ...payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      });
    }

    navigate('/learning');
  };

  return (
    <>
      <PageHeader title={existingTopic ? 'Edit Topic' : 'Add Topic'} subtitle="Keep track of what you are learning next." />

      <form className="card-surface form-card" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label" htmlFor="topic-name">
              Name
            </label>
            <input
              id="topic-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            {errors.name ? <div className="invalid-feedback d-block">{errors.name}</div> : null}
          </div>

          <div className="col-12">
            <label className="form-label" htmlFor="topic-description">
              Description
            </label>
            <textarea
              id="topic-description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="topic-progress">
              Progress
            </label>
            <input
              id="topic-progress"
              name="progress"
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={handleChange}
              className={`form-control ${errors.progress ? 'is-invalid' : ''}`}
            />
            {errors.progress ? <div className="invalid-feedback d-block">{errors.progress}</div> : null}
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="topic-status">
              Status
            </label>
            <select
              id="topic-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`form-select ${errors.status ? 'is-invalid' : ''}`}
            >
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status ? <div className="invalid-feedback d-block">{errors.status}</div> : null}
          </div>
        </div>

        <div className="form-card__actions">
          <button type="submit" className="btn btn-primary">
            {existingTopic ? 'Update topic' : 'Create topic'}
          </button>
        </div>
      </form>
    </>
  );
}

export default LearningForm;
