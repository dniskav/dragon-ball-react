import { useState } from 'react';
import styles from './AbcText.module.css';

interface Props {
  label: string;
  value?: string;
  id: string;
  controlled?: boolean;
  defaultValue?: string;
  ref?: React.Ref<HTMLInputElement>;
  onChange?: (newValue: string) => void;
}

const AbcText: React.FC<Props> = ({
  label,
  value,
  id,
  ref,
  defaultValue,
  controlled = false,
  onChange,
}) => {
  const [internalVale, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (controlled) {
      onChange && onChange(e.target.value);
    }
  };

  return (
    <>
      <input
        className={styles.text}
        defaultValue={defaultValue}
        type="text"
        id={id}
        value={value}
        placeholder={label}
        onChange={handleChange}
        ref={ref}
      />
    </>
  );
};

export default AbcText;
