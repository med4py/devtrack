function ConfirmModal({ show, title, message, confirmText = 'Delete', cancelText = 'Cancel', onCancel, onConfirm }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop show" aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content custom-modal">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body py-3">
            <p className="mb-0">{message}</p>
          </div>
          <div className="modal-footer border-0 pt-0">
            <button type="button" className="btn btn-light" onClick={onCancel}>
              {cancelText}
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
