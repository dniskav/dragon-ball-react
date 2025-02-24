import { FC } from 'react';
import styles from './FavoritesBtn.module.css';

interface Props {
  onClick: () => void;
}

const FavoritesBtn: FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.favoritesBtn} onClick={onClick}>
      <svg
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.71448 2.37318L3.71448 0.552368L0.714478 2.37318V6.27491L6.71448 11.3905L12.7145 6.27491V2.37318L9.71448 0.552368L6.71448 2.37318Z"
          fill="#EC1D24"
        />
      </svg>
    </div>
  );
};

export default FavoritesBtn;
