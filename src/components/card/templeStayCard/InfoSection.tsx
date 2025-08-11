import Tag from '@components/common/tag/Tag';

import * as styles from './infoSection.css';

interface InfoSectionProps {
  templeName: string;
  templestayName: string;
  region: string;
  type: string;
}

const InfoSection = ({ templeName, templestayName, region, type }: InfoSectionProps) => {
  return (
    <section className={styles.infoBox}>
      <div>
        <h2 className={styles.hashTag}>{templeName}</h2>
        <h2 className={styles.title}>{templestayName}</h2>
      </div>
      <div className={styles.tagBox}>
        <Tag color="brown" label={region} />
        <Tag color="blue" label={type} />
      </div>
    </section>
  );
};

export default InfoSection;
