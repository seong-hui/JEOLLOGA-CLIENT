import Icon from '@assets/svgs';
import SearchBar from '@components/search/searchBar/SearchBar';
import * as styles from './searchHeader.css';
import useNavigateTo from '@hooks/useNavigateTo';

interface SearchHeader {
  searchText?: string;
  prevPath: string | number;
  autoFocus?: boolean;
}

const SearchHeader = ({ searchText, prevPath, autoFocus = false }: SearchHeader) => {
  const handleToBack = useNavigateTo(prevPath);

  return (
    <header className={styles.searchHeaderStyle}>
      <button className={styles.backBtn} onClick={handleToBack}>
        <Icon.IcnArrowBlackLeft />
      </button>
      <SearchBar searchText={searchText} autoFocus={autoFocus} />
    </header>
  );
};

export default SearchHeader;
