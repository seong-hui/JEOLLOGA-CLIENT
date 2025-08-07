'use client';

import { useEffect, useState } from 'react';

interface SearchHistoryItem {
  id: number;
  search: string;
}

export const getStorageValue = (key: string) => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
};

const useLocalStorage = () => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(() => {
    const data = getStorageValue('searchHistory');
    try {
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // 검색어 저장
  const addStorageValue = (searchQuery: string) => {
    const current: SearchHistoryItem[] = (() => {
      try {
        const data = localStorage.getItem('searchHistory');
        return data ? JSON.parse(data) : [];
      } catch {
        return [];
      }
    })();

    // 중복된 검색어는 저장 안 하도록, 최대 10개까지만
    const updatedHistory = [
      { id: new Date().getTime(), search: searchQuery },
      ...current.filter((item) => item.search !== searchQuery),
    ].slice(0, 10);

    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  // 검색어 삭제
  const delStorageValue = (searchId: number) => {
    const updatedHistory = searchHistory.filter((item) => item.id !== searchId);
    setSearchHistory(updatedHistory);
  };

  // 검색 기록 전체 삭제
  const clearStorageValue = () => {
    localStorage.removeItem('searchHistory');
    setSearchHistory([]);
  };

  return {
    searchHistory,
    setSearchHistory,
    getStorageValue,
    addStorageValue,
    delStorageValue,
    clearStorageValue,
  };
};

export default useLocalStorage;
