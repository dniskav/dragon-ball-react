import { FC } from "react";
import styles from './AbcProgressBar.module.css';

interface Props {
  progress: number;
}

const AbcProgressBar: FC<Props> = ({ progress }) => {
  return (
    <hr className={styles.progressBar} style={{ width: `${progress}%` }} />
  );
};

export default AbcProgressBar;