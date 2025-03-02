import { ReactNode, useState } from 'react'
import styles from './AbcCard.module.css'
import AbcFavIcon from '../FavoritesIcon/AbcFavIcon'

interface AbcCardProps {
  label: string
  isFavorite?: boolean
  children?: ReactNode
  onClick?: () => void
}

const AbcCard: React.FC<AbcCardProps> = ({
  label,
  children,
  onClick,
  isFavorite = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section
      className={`${styles.card} ${isHovered ? styles.isHovered : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label={label}
    >
      {children}
      <div className={styles.cardLabel}>
        {label}
        <AbcFavIcon isFavorite={isFavorite} isHovered={isHovered} />
      </div>
    </section>
  )
}

export default AbcCard
