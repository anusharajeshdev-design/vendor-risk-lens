import "./SuccessModal.css";

function SuccessModal({ title, message, onClose }) {
  return (
    <div className="modal-overlay">

      <div className="success-modal">

        <div className="success-icon">
          ✨
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <button
          className="modal-button"
          onClick={onClose}
        >
          OK
        </button>

      </div>

    </div>
  );
}

export default SuccessModal;