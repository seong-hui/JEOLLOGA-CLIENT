import Icon from '@assets/svgs';
import { useRouter } from 'next/navigation';
import React from 'react';

import * as styles from './CurationHeader.css';

const CurationHeader = () => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTop}>
        <Icon.SmallLogo />

        <button onClick={handleClose}>
          <Icon.IcnCloseLargeGray />
        </button>
      </div>
    </div>
  );
};

export default CurationHeader;
