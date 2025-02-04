export interface ISeminar {
  id: number;
  title: string;
  date: string;
  description: string;
}

export type ISeminars = ISeminar[];

export type ModalType = 'edit' | 'delete';

export type ModalState = {
  type: ModalType;
  data: ISeminar;
};

export interface ModalButtonsLoading {
  edit: boolean;
  delete: boolean;
}
