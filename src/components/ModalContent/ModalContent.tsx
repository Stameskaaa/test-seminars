import { ModalButtonsLoading, ModalState } from '../../types/types';
import { DeleteComponent } from './DeleteComponent/DeleteComponent';
import { EditComponent } from './EditComponent/EditComponent';
import styles from './ModalContent.module.css';

interface Props {
  modalData: ModalState;
  deleteSeminar: (id: number) => void;
  changeSeminarData: (id: number, title: string, description: string) => void;
  modalButtonsLoading: ModalButtonsLoading;
  closeModal: () => void;
}

export const ModalContent: React.FC<Props> = ({
  modalData,
  deleteSeminar,
  changeSeminarData,
  modalButtonsLoading,
  closeModal,
}) => {
  let content;

  switch (modalData.type) {
    case 'delete':
      content = (
        <DeleteComponent
          isLoading={modalButtonsLoading.delete}
          modalData={modalData.data}
          deleteSeminar={deleteSeminar}
        />
      );
      break;
    case 'edit':
      content = (
        <EditComponent
          closeModal={closeModal}
          isLoading={modalButtonsLoading.edit}
          changeSeminarData={changeSeminarData}
          modalData={modalData.data}
        />
      );

      break;
    default:
      content = null;
      break;
  }

  return <div className={styles.container}>{content}</div>;
};
