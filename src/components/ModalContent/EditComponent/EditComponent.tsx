import React, { useEffect, useRef, useState } from 'react';
import { ISeminar } from '../../../types/types';
import styles from './EditComponent.module.css';
import { Loader } from '../../Loader/Loader';

interface Props {
  modalData: ISeminar;
  changeSeminarData: (id: number, title: string, description: string) => void;
  isLoading: boolean;
  closeModal: () => void;
}

export const EditComponent: React.FC<Props> = ({
  modalData,
  changeSeminarData,
  isLoading,
  closeModal,
}) => {
  const [values, setValues] = useState<{ title: string; description: string }>({
    title: modalData.title,
    description: modalData.description,
  });
  const startValuesRef = useRef<{ title: string; description: string }>();

  useEffect(() => {
    startValuesRef.current = { title: modalData.title, description: modalData.description };
  }, [modalData]); // Запоминаем начальное значение и не вызываем перерисовок

  function inputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleChangeSeminarData() {
    await changeSeminarData(modalData.id, values.title, values.description);
    closeModal();
  }

  function handleCancelChanges() {
    if (startValuesRef.current) setValues(startValuesRef.current);
  }

  return (
    <div className={styles.container}>
      <textarea onChange={inputChange} value={values.title} name="title" />
      <textarea onChange={inputChange} value={values.description} name="description" />

      <div className={styles.buttons_container}>
        {' '}
        <button disabled={isLoading} onClick={handleChangeSeminarData}>
          {' '}
          {isLoading ? <Loader /> : 'Изменить'}
        </button>
        <button onClick={handleCancelChanges}>Отменить изменения</button>
      </div>
    </div>
  );
};
