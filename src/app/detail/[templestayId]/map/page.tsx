import ArrowBtn from '@components/common/button/arrowBtn/ArrowBtn';
import MapContainer from '@components/templeDetail/naverMap/MapContainer';

import * as styles from './style.css';

const LargeMap = async ({
  searchParams,
}: {
  searchParams: Promise<{ latitude: string; longitude: string }>;
}) => {
  const params = await searchParams;
  const latitude = params.latitude ? parseFloat(params.latitude) : null;
  const longitude = params.longitude ? parseFloat(params.longitude) : null;

  if (latitude === null || longitude === null || isNaN(latitude) || isNaN(longitude)) {
    return <div>유효하지 않은 좌표입니다.</div>;
  }

  return (
    <>
      <div className={styles.largeMapContainer}>
        <div className={styles.arrowBtn}>
          <ArrowBtn />
        </div>
        <MapContainer latitude={latitude} longitude={longitude} size="large" />
      </div>
    </>
  );
};

export default LargeMap;
