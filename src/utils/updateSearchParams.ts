import { useRouter } from 'next/navigation';

const useUpdateSearchParams = () => {
  const router = useRouter();

  const updateSearchParams = (params: Record<string, string | number>) => {
    const urlParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      urlParams.set(key, String(value));
    });

    router.push(`/searchResult?${urlParams.toString()}`);
  };

  return updateSearchParams;
};

export default useUpdateSearchParams;
