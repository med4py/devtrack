import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import ConfirmModal from '../components/common/ConfirmModal';
import { useAppContext } from '../context/AppContext';

function Settings() {
  const { theme, toggleTheme, resetData } = useAppContext();
  const [showResetModal, setShowResetModal] = useState(false);

  const handleReset = () => {
    resetData();
    setShowResetModal(false);
  };

  return (
    <>
      <PageHeader title="Settings" subtitle="Adjust your workspace and reset your local dev plan." />

      <div className="card-surface form-card settings-card">
        <div className="settings-card__row">
          <div>
            <h3>Theme</h3>
            <p>Switch between light and dark mode.</p>
          </div>
          <button type="button" className="btn btn-outline-primary" onClick={toggleTheme}>
            {theme === 'dark' ? 'Use light mode' : 'Use dark mode'}
          </button>
        </div>

        <div className="settings-card__row settings-card__row--danger">
          <div>
            <h3>Reset application data</h3>
            <p>This restores the default task and learning data.</p>
          </div>
          <button type="button" className="btn btn-outline-danger" onClick={() => setShowResetModal(true)}>
            Reset data
          </button>
        </div>
      </div>

      <ConfirmModal
        show={showResetModal}
        title="Reset app data?"
        message="This will restore the default sample tasks and learning topics."
        confirmText="Reset"
        onCancel={() => setShowResetModal(false)}
        onConfirm={handleReset}
      />
    </>
  );
}

export default Settings;
