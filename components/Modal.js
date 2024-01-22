import styles from "../app/modal.module.css"


const Modal = ({ show, children, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalcontent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalheader}>
                    <h4 className="modal-title">Client PND Message</h4>
                </div>
                <div className={styles.modalbody}>
                    {children}
                </div>
                <div className={styles.modalfooter}>
                    <button onClick={onClose}>Chiudi</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;