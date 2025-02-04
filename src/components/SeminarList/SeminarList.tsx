import { ReactElement } from 'react';
import styles from './SeminarList.module.css';

interface Props {
  children?: ReactElement[];
}
export const SeminarList: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
