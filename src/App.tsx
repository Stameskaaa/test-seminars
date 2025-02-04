import { useEffect, useState } from 'react';
import './App.css';
import { SeminarList } from './components/SeminarList/SeminarList';
import { SeminarItem } from './components/SeminarItem/SeminarItem';
import { ISeminars } from './types/types';
import { ModalContainer } from './components/ModalContainer/ModalContainer';
import { ModalState, ModalType, ISeminar } from './types/types';
import { ModalContent } from './components/ModalContent/ModalContent';

const url = 'http://localhost:3001/seminars';

function App() {
  const [seminarList, setSeminarList] = useState<ISeminars>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalState>({
    type: 'delete',
    data: { id: 1, title: '', description: '', date: '' },
  });
  const [modalButtonsLoading, setModalButtonsLoading] = useState({ edit: false, delete: false });

  useEffect(() => {
    getSeminars();
  }, []);

  async function getSeminars() {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setSeminarList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteSeminar(id: number) {
    try {
      setModalButtonsLoading((prev) => ({ ...prev, delete: true }));
      const response = await fetch(`${url}/${id}`, { method: 'DELETE' });
      getSeminars();
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setModalButtonsLoading((prev) => ({ ...prev, delete: false }));
    }
  }

  async function changeSeminar(id: number, title: string, description: string) {
    const response = await fetch(`${url}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        description,
      }),
    });

    getSeminars();
    console.log(response);
  }

  function showModalByType(type: ModalType, data: ISeminar) {
    setShowModal(true);
    setModalData({ type, data });
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <SeminarList>
        {seminarList.map((item) => {
          return <SeminarItem data={item} showModalByType={showModalByType} key={item.id} />;
        })}
      </SeminarList>
      <ModalContainer showModal={showModal} setShowModal={setShowModal}>
        <ModalContent
          modalButtonsLoading={modalButtonsLoading}
          changeSeminar={changeSeminar}
          deleteSeminar={deleteSeminar}
          modalData={modalData}
        />
      </ModalContainer>
    </>
  );
}

export default App;
