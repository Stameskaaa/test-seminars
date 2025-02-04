import styles from './DeleteComponent.module.css';
import { ISeminar } from '../../../types/types';

interface Props {
  modalData: ISeminar;
  deleteSeminar: (id: number) => void;
  isLoading: boolean;
}

export const DeleteComponent: React.FC<Props> = ({ modalData, deleteSeminar, isLoading }) => {
  return (
    <div className={styles.container}>
      <h1>{modalData.title}</h1>

      <button disabled={isLoading} onClick={() => modalData.id && deleteSeminar(modalData.id)}>
        {isLoading ? null : `Вы уверенны что хотите удалить семинар (id = ${modalData.id})?`}
      </button>
    </div>
  );
};
