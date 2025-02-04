import { Dispatch, SetStateAction, useEffect } from 'react';
import styles from './ModalContainer.module.css';

interface Props {
  children?: React.ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const ModalContainer: React.FC<Props> = ({ children, showModal, setShowModal }) => {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  if (!showModal) {
    return null;
  }

  function handleModalClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (
      e.target === e.currentTarget ||
      (e.target instanceof HTMLButtonElement && e.target.id === 'modal-xmark')
    ) {
      setShowModal(false);
    }
  }

  return (
    <div role="dialog" onClick={handleModalClick} className={`${styles.wrapper} ${styles.close}`}>
      <div className={styles.content_container}>
        <button id="modal-xmark" className={styles.xmark_button}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};
