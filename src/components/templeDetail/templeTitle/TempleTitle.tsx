import * as styles from './templeTitle.css';

interface TempleTitleProps {
  templeName: string;
  templestayName: string;
}

const TempleTitle = ({ templeName, templestayName }: TempleTitleProps) => {
  return (
    <section className={styles.titleWrapper}>
      <div className={styles.tagBox}>
        <span className={styles.tagBox}>#{templeName}</span>
      </div>
      <div className={styles.templeNameBox}>
        <h1>{templestayName}</h1>
      </div>
    </section>
  );
};

export default TempleTitle;
