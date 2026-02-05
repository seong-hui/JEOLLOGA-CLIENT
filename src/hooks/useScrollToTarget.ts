'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const useScrollToTarget = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const targetId = searchParams.get('scrollTo');

  useEffect(() => {
    if (!targetId) return;

    const performScroll = (element: HTMLElement) => {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });

      // url에서 파라미터 제거
      router.replace(pathname, { scroll: false });
    };

    // height 생길 때까지 체크
    const observer = new MutationObserver((_, obs) => {
      const element = document.getElementById(targetId);
      if (element && element.offsetHeight > 0) {
        performScroll(element);
        obs.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [targetId, router, pathname]);
};

export default useScrollToTarget;
