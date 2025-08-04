import DetailTitle from '@components/detailTitle/DetailTitle';
import useExpandHook from '@hooks/useExpandHook/useExpandHook';
import { useRef } from 'react';

import ContentCollapse from './contentCollapse/ContentCollapse';
import * as styles from './templeInfo.css';

interface TempleInfoProps {
  introduction?: string;
}

const TempleInfo = ({ introduction }: TempleInfoProps) => {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const { isAppeared, isExpanded, handleToggleExpand } = useExpandHook(contentRef);

  return (
    <div className={styles.templeInfoContainer} id="detail-section-3">
      <DetailTitle title="템플스테이 정보" />
      {introduction ? (
        <div className={styles.templeInfoBoxStyle}>
          {(() => {
            return (
              <>
                {/* <h3 className={styles.templeInfoTitle}>{key}</h3> */}
                <p
                  ref={contentRef}
                  className={`${styles.templeInfoContent} ${
                    isExpanded ? styles.expandedContent : ''
                  }`}>
                  {introduction}
                </p>
              </>
            );
          })()}
          {isAppeared && (
            <ContentCollapse
              leftIcon={isExpanded ? 'IcnArrowGrayUp' : 'IcnArrowGrayDown'}
              text={isExpanded ? '접어두기' : '더보기'}
              onClick={handleToggleExpand}
            />
          )}
        </div>
      ) : (
        <div className={styles.emptyContainer}>
          <p>템플스테이 정보가 없어요</p>
        </div>
      )}
    </div>
  );
};

export default TempleInfo;
