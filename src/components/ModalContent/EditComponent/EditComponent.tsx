import React, { useState } from 'react';
import { ISeminar } from '../../../types/types';
import styles from './EditComponent.module.css';

interface Props {
  modalData: ISeminar;
  changeSeminar: (id: number, title: string, description: string) => void;
  isLoading: boolean;
}

export const EditComponent: React.FC<Props> = ({ modalData, changeSeminar, isLoading }) => {
  const [values, setValues] = useState<{ title: string; description: string }>({
    title: modalData.title,
    description: modalData.description,
  });

  function inputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleChangeSeminar() {
    changeSeminar(modalData.id, values.title, values.description);
  }

  return (
    <div className={styles.container}>
      <textarea onChange={inputChange} value={values.title} name="title" />
      <textarea onChange={inputChange} value={values.description} name="description" />

      <div className={styles.buttons_container}>
        {' '}
        <button onClick={handleChangeSeminar}>Изменить</button>
        <button>Отменить</button>
      </div>
    </div>
  );
};
