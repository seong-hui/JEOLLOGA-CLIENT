import { useGetSearchHistory, useDelAllSearchRecord, useDelSearchRecord } from '@apis/search';
import BasicBtn from '@components/common/button/basicBtn/BasicBtn';
import DetailTitle from '@components/detailTitle/DetailTitle';
import ExceptLayout from '@components/except/exceptLayout/ExceptLayout';
import * as styles from '@components/search/recentBtn/recentBtnBox.css';
import useFilter from '@hooks/useFilter';
import useLocalStorage from '@hooks/useLocalStorage';
import { getCookie } from 'cookies-next';

const RecentBtnBox = () => {
  const isLoggedIn = getCookie('userNickname');

  const { data, isLoading, isError } = useGetSearchHistory();
  const { mutate: deleteAllSearchRecords } = useDelAllSearchRecord();
  const { mutate: deleteSearchRecord } = useDelSearchRecord();
  const { handleSearch } = useFilter();
  const { searchHistory, delStorageValue, clearStorageValue } = useLocalStorage();

  const searchData = isLoggedIn ? data || [] : searchHistory;

  const handleDeleteAll = () => {
    if (isLoggedIn) {
      deleteAllSearchRecords();
    } else {
      clearStorageValue();
    }
  };

  const handleRecentSearchClick = (searchContent: string) => {
    handleSearch({ search: searchContent });
  };

  const handleDeleteSearch = (searchId: number) => {
    if (isLoggedIn) {
      deleteSearchRecord(searchId);
    } else {
      delStorageValue(searchId);
    }
  };

  if (isLoading) {
    return <ExceptLayout type="loading" />;
  }

  if (isError) {
    return <ExceptLayout type="networkError" />;
  }

  return (
    <section>
      <div className={styles.paddingStyle}>
        <DetailTitle
          title="최근 검색"
          isTotal
          size="small"
          rigntBtnLabel="전체 삭제"
          onClick={handleDeleteAll}
          rightBtnDisabled={searchData.length === 0}
        />
      </div>
      <div className={styles.recentBtnBox}>
        {searchData.length === 0 ? (
          <p className={styles.emptyResult}>최근 검색 내역이 없어요</p>
        ) : (
          searchData.map((item) => (
            <BasicBtn
              key={item.id}
              label={item.search}
              variant="lightGrayOutlined"
              size="small"
              rightIcon="IcnCloseSmallGray"
              onClick={() => handleRecentSearchClick(item.search)} // 검색어 클릭 이벤트
              onRightIconClick={() => handleDeleteSearch(item.id)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default RecentBtnBox;
