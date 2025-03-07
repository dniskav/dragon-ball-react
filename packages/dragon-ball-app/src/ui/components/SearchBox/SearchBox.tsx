import { AbcSearch } from 'abc-styles'
import styles from './SearchBox.module.css'
import { CharacterListItem } from '../../../modules/Character/domain/CharacterTypes'
import { FC } from 'react'

interface Props {
  doSearch: (term: string) => CharacterListItem[]
  list: CharacterListItem[]
}

const SearchBox: FC<Props> = ({ doSearch, list }) => {
  const onSearch = (term: string) => {
    doSearch(term)
  }

  return (
    <>
      <AbcSearch id="searchId" onSearch={(e) => onSearch(e)} />
      <div className={styles.quantity}>{`${list.length} RESULTS`}</div>
    </>
  )
}

export default SearchBox
