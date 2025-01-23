import { useAddWishlist, useRemoveWishlist } from '@apis/wish';
import SearchCardList from '@components/card/templeStayCard/searchCardList/SearchCardList';
import SearchEmpty from '@components/common/empty/searchEmpty/SearchEmpty';
import Pagination from '@components/common/pagination/Pagination';
import FilterTypeBox from '@components/filter/filterTypeBox/FilterTypeBox';
import SearchHeader from '@components/search/searchHeader/SearchHeader';
import React, { useState } from 'react';

import * as styles from './searchResultPage.css';

const mockSearchData = {
  page: 1,
  pageSize: 10,
  totalPages: 5,
  templestays: [
    {
      templestayId: 1,
      templeName: '봉은사',
      templestayName: '명상 차담 템플스테이',
      tag: '연예인이 다녀간',
      region: '서울',
      type: '체험형',
      imgUrl: 'http://noms.templestay.com/images//RsImage/L_28471.png',
      liked: true,
    },
    {
      templestayId: 2,
      templeName: '불국사',
      templestayName: '쉼. 멈춤. 비우기.',
      tag: '연예인이 다녀간',
      region: '경기',
      type: '체험형',
      imgUrl: 'http://noms.templestay.com/images/RsImage/S_28469.png',
      liked: false,
    },
    {
      templestayId: 3,
      templeName: '봉은사',
      templestayName: '명상 차담 템플스테이',
      tag: '연예인이 다녀간',
      region: '서울',
      type: '체험형',
      imgUrl: 'http://noms.templestay.com/images//RsImage/L_28471.png',
      liked: true,
    },
    {
      templestayId: 4,
      templeName: '불국사',
      templestayName: '쉼. 멈춤. 비우기.',
      tag: '연예인이 다녀간',
      region: '경기',
      type: '체험형',
      imgUrl: 'http://noms.templestay.com/images/RsImage/S_28469.png',
      liked: false,
    },
    {
      templestayId: 5,
      templeName: '봉은사',
      templestayName: '명상 차담 템플스테이',
      tag: '연예인이 다녀간',
      region: '서울',
      type: '체험형',
      imgUrl: 'http://noms.templestay.com/images//RsImage/L_28471.png',
      liked: true,
    },
    {
      templestayId: 6,
      templeName: '불국사',
      templestayName: '쉼. 멈춤. 비우기.',
      tag: '연예인이 다녀간',
      region: '경기',
      type: '체험형',
      imgUrl: 'http://noms.templestay.com/images/RsImage/S_28469.png',
      liked: false,
    },
    {
      templestayId: 7,
      templeName: '봉은사',
      templestayName: '명상 차담 템플스테이',
      tag: '연예인이 다녀간',
      region: '서울',
      type: '체험형',
      imgUrl: 'http://noms.templestay.com/images//RsImage/L_28471.png',
      liked: true,
    },
    {
      templestayId: 8,
      templeName: '불국사',
      templestayName: '쉼. 멈춤. 비우기.',
      tag: '연예인이 다녀간',
      region: '경기',
      type: '체험형',
      imgUrl: 'http://noms.templestay.com/images/RsImage/S_28469.png',
      liked: false,
    },
  ],
};

const SearchResultPage = () => {
  const [currentPage, setCurrentPage] = useState(mockSearchData.page);
  const [templestays, setTemplestays] = useState(mockSearchData.templestays);
  const [searchText, setSearchText] = useState('');
  const userId = Number(localStorage.getItem('userId'));

  const addWishlistMutation = useAddWishlist();
  const removeWishlistMutation = useRemoveWishlist();

  const handleSearch = (text: string) => {
    setSearchText(text);
    setTemplestays(mockSearchData.templestays);
    setCurrentPage(mockSearchData.page);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleToggleWishlist = (templestayId: number, liked: boolean) => {
    if (liked) {
      removeWishlistMutation.mutate({ userId, templestayId });
    } else {
      addWishlistMutation.mutate({ userId, templestayId });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <SearchHeader onSearch={handleSearch} />
        <FilterTypeBox />
      </div>
      {templestays.length === 0 ? (
        <SearchEmpty text={searchText} />
      ) : (
        <div className={styles.bodyContainer}>
          <SearchCardList
            data={templestays}
            layout="horizontal"
            onToggleWishlist={handleToggleWishlist}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={mockSearchData.totalPages}
            onPageChange={handlePageChange}
            color="white"
          />
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;
