import * as styles from './nameContent.css';

interface TopInfoProps {
  nickname: string;
  email: string;
}

const TopInfo = ({ nickname, email }: TopInfoProps) => (
  <section className={styles.topInfoStyle}>
    <div className={styles.userNameStyle}>
      <h2>{nickname}</h2>
      <h2>님</h2>
    </div>
    <p className={styles.userEmailStyle}>{email}</p>
  </section>
);

export default TopInfo;
