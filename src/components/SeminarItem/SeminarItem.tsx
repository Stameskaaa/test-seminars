import styles from './SeminarItem.module.css';
import { ISeminar, ModalType } from '../../types/types';

interface Props {
  data: ISeminar;
  showModalByType: (type: ModalType, data: ISeminar) => void;
}

export const SeminarItem: React.FC<Props> = ({ data, showModalByType }) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttons_container}>
        <button onClick={() => showModalByType('edit', data)}>Редактировать</button>
        <button onClick={() => showModalByType('delete', data)}>X</button>
      </div>

      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};
