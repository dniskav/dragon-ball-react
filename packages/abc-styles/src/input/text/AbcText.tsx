import { useState, forwardRef, ReactNode } from 'react'
import styles from './AbcText.module.css'

interface Props {
  label: string
  value?: string
  id: string
  defaultValue?: string
  icon?: ReactNode
  onChange: (newValue: string) => void
}

const AbcText = forwardRef<HTMLInputElement, Props>(
  ({ label, value, id, defaultValue, onChange, icon }, ref) => {
    const [internalValue, setInternalValue] = useState(
      value ?? defaultValue ?? ''
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
      onChange(e.target.value)
    }

    return (
      <div className={styles.textContainer}>
        {icon}
        <input
          ref={ref || undefined}
          className={styles.text}
          type="text"
          id={id}
          value={internalValue}
          placeholder={label}
          aria-label={label}
          onChange={handleChange}
        />
      </div>
    )
  }
)

export default AbcText
