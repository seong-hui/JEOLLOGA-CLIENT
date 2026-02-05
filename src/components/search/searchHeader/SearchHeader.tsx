import Icon from '@assets/svgs';
import SearchBar from '@components/search/searchBar/SearchBar';
import * as styles from './searchHeader.css';
import useNavigateTo from '@hooks/useNavigateTo';

interface SearchHeader {
  searchText?: string;
  prevPath: string | number;
}

const SearchHeader = ({ searchText, prevPath }: SearchHeader) => {
  const handleToBack = useNavigateTo(prevPath);

  return (
    <header className={styles.searchHeaderStyle}>
      <button className={styles.backBtn} onClick={handleToBack}>
        <Icon.IcnArrowBlackLeft />
      </button>
      <SearchBar searchText={searchText} />
    </header>
  );
};

export default SearchHeader;
