import Tag from '@components/common/tag/Tag';

import * as styles from './infoSection.css';

interface InfoSectionProps {
  templeName: string;
  templestayName: string;
  region: string;
  type: string;
  size?: 'default' | 'small';
}

const InfoSection = ({
  templeName,
  templestayName,
  region,
  type,
  size = 'default',
}: InfoSectionProps) => {
  return (
    <section className={styles.infoBox({ size })}>
      <div>
        <h2 className={styles.hashTag({ size })}>{templeName}</h2>
        <h2 className={styles.title({ size })}>{templestayName}</h2>
      </div>
      <div className={styles.tagBox({ size })}>
        <Tag color="brown" label={region} />
        <Tag color="blue" label={type} />
      </div>
    </section>
  );
};

export default InfoSection;
