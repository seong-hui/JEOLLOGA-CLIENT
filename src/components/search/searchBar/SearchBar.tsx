'use client';

import Icon from '@assets/svgs';
import useFilter from '@hooks/useFilter';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useEventLogger from 'src/gtm/hooks/useEventLogger';

import * as styles from './searchBar.css';

interface SearchBarProps {
  searchText?: string;
  autoFocus?: boolean;
}

const SearchBar = ({ searchText, autoFocus = false }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(searchText || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { handleSearch } = useFilter();
  const { logClickEvent } = useEventLogger('search_bar');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 16) {
      setInputValue(value);
    }
  };

  const handleClearInput = () => {
    setInputValue('');
    logClickEvent('click_delete', { label: inputValue });

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClickSearch = () => {
    if (inputValue.trim() === '') return;

    handleSearch({ search: inputValue });
    logClickEvent('click_enter', { label: inputValue });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleClickSearch();
    }
  };

  const pathname = usePathname();

  // 검색 페이지에서 입력하면 기존 필터 지우기
  useEffect(() => {
    if (pathname === '/search') {
      localStorage.setItem('prevPage', '/search');
    }
  }, []);

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBarLayout}>
        <div
          className={styles.pointer}
          role="button"
          tabIndex={0}
          onClick={() => handleClickSearch()}
          onKeyDown={(e) => e.key === 'Enter' && handleClickSearch()}>
          <Icon.IcnSearchMediumGray />
        </div>
        <input
          ref={inputRef}
          className={styles.inputStyle}
          placeholder="사찰명을 입력해 주세요"
          value={inputValue}
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
          maxLength={16}
        />
      </div>
      <button className={styles.pointer} onClick={() => handleClearInput()}>
        <Icon.IcnCloseLargeGray />
      </button>
    </div>
  );
};

export default SearchBar;
