import { AbcSearch } from "abc-styles"
import { useState } from "react"
import styles from "./SearchBox.module.css"

interface Props {
  doSearch: (term: string) => undefined[];
}


const SearchBox: React.FC<Props> = ({ doSearch }) => {
  const [resultsAmount, setResultsAmount] = useState(0)

  const onSearch = (term: string) => {
    const searchResults: undefined[] = doSearch(term)
    setResultsAmount(searchResults.length)
  }

  return (
    <>
    <AbcSearch id="searchId" onSearch={(e) => onSearch(e)} />
    <div className={styles.quantity}>
      {resultsAmount > 0 && `${resultsAmount} RESULTS`}
    </div>
    </>
  )
}

export default SearchBox