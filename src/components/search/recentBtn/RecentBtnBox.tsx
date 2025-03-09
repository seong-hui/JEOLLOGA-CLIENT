import { useGetSearchHistory, useDelAllSearchRecord, useDelSearchRecord } from '@apis/search';
import { Content } from '@apis/search/type';
import BasicBtn from '@components/common/button/basicBtn/BasicBtn';
import DetailTitle from '@components/detailTitle/DetailTitle';
import ExceptLayout from '@components/except/exceptLayout/ExceptLayout';
import * as styles from '@components/search/recentBtn/recentBtnBox.css';
import useFilter from '@hooks/useFilter';
import { useState, useEffect } from 'react';

const RecentBtnBox = () => {
  const userId = localStorage.getItem('userId');
  const { data, isLoading, isError } = useGetSearchHistory(userId ? Number(userId) : null);
  const { mutate: deleteAllSearchRecords } = useDelAllSearchRecord();
  const { mutate: deleteSearchRecord } = useDelSearchRecord();
  const { handleSearch } = useFilter();

  const [searchData, setSearchData] = useState<Content[]>([]);

  useEffect(() => {
    if (!userId) {
      const localSearchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      setSearchData(Array.isArray(localSearchHistory) ? localSearchHistory : []);
    } else if (data) {
      setSearchData(Array.isArray(data.searchHistory) ? data.searchHistory : []);
    }
  }, [data, userId]);

  const handleDeleteAll = () => {
    if (userId) {
      deleteAllSearchRecords({ userId: Number(userId) });
    } else {
      localStorage.removeItem('searchHistory');
      setSearchData([]);
    }
  };

  const handleRecentSearchClick = (searchContent: string) => {
    handleSearch(searchContent);
  };

  const handleDeleteSearch = (searchId: number) => {
    if (userId) {
      deleteSearchRecord({ userId: Number(userId), searchId });
    } else {
      const searchHistory: { searchId: number; content: string }[] = JSON.parse(
        localStorage.getItem('searchHistory') || '[]',
      );

      localStorage.setItem(
        'searchHistory',
        JSON.stringify(searchHistory.filter((item) => item.searchId !== searchId)),
      );
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
              key={item.searchId}
              label={item.content}
              variant="lightGrayOutlined"
              size="small"
              rightIcon="IcnCloseSmallGray"
              onClick={() => handleRecentSearchClick(item.content)} // 검색어 클릭 이벤트
              onRightIconClick={() => handleDeleteSearch(item.searchId)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default RecentBtnBox;
