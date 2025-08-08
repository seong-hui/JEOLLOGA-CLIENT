'use client';

import Icon from '@assets/svgs';
import RankBtn from '@components/card/popularCard/RankBtn';
import Image from 'next/image';

import * as styles from './popularCard.css';

interface PopularCardProps {
  ranking: number;
  templestayName: string;
  templeLoc: string;
  templeImg: string;
  templeName: string;
  isLiked: boolean;
  onLikeToggle: (templestayId: number) => void;
  templestayId: number;
  link: string;
}

const PopularCard = ({
  ranking,
  templestayName,
  templeLoc,
  templeImg,
  templeName,
  isLiked,
  onLikeToggle,
  templestayId,
  link,
}: PopularCardProps) => {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    onLikeToggle(templestayId);
  };

  return (
    <a
      href={link}
      className={styles.cardWrapper}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}>
      <div>
        <div className={styles.imgBox}>
          <Image
            src={templeImg}
            alt={`${templestayName} 대표 이미지`}
            fill
            style={{ objectFit: 'cover' }}
          />
          <RankBtn ranking={ranking} />
        </div>
        <div className={styles.bottomWrapper}>
          <div className={styles.bottomContainer}>
            <h3 className={styles.templestayName}>{templestayName}</h3>
            <div className={styles.bottomBox}>
              <span>{templeLoc}</span>
              <Icon.IcnDivider />
              <span>{templeName}</span>
            </div>
          </div>
          <button className={styles.likeBtn} onClick={handleLikeClick}>
            {isLiked ? <Icon.IcnFlowerPink /> : <Icon.IcnFlowerGray />}
          </button>
        </div>
      </div>
    </a>
  );
};

export default PopularCard;
