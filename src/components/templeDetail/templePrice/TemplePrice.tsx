import DetailTitle from '@components/detailTitle/DetailTitle';

import * as styles from './templePrice.css';
interface TemplePriceProps {
  templestayPrice?: number;
}

const TemplePrice = ({ templestayPrice }: TemplePriceProps) => {
  const hasPrice = templestayPrice !== null && templestayPrice !== undefined;
  return (
    <div className={styles.templePriceWrapper} id="detail-section-2">
      <DetailTitle title="가격" />
      {hasPrice ? (
        <div className={styles.templePriceBox}>
          <p className={styles.adultString}>성인(1인)</p>
          <p className={styles.priceString}>{templestayPrice.toLocaleString()}원</p>
        </div>
      ) : (
        <div className={styles.emptyContainer}>
          <p>가격 정보가 없어요</p>
        </div>
      )}
    </div>
  );
};

export default TemplePrice;
