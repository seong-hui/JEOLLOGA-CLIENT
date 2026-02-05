import EAJImg from '@assets/images/test/test_img_large_EAJ.png';
import EAPImg from '@assets/images/test/test_img_large_EAP.png';
import EHJImg from '@assets/images/test/test_img_large_EHJ.png';
import EHPImg from '@assets/images/test/test_img_large_EHP.png';
import IAJImg from '@assets/images/test/test_img_large_IAJ.png';
import IAPImg from '@assets/images/test/test_img_large_IAP.png';
import IHJImg from '@assets/images/test/test_img_large_IHJ.png';
import IHPImg from '@assets/images/test/test_img_large_IHP.png';
import { TestType } from '@constants/test';
import { StaticImageData } from 'next/image';

interface TestResultData {
  name: string;
  text: string;
  image: StaticImageData;
}

const testResultMap: Record<TestType, TestResultData> = {
  IAP: { name: '내친구는 나형 목탁이', text: '내 친구는 나...', image: IAPImg },
  IAJ: { name: '잔잔한 호수형 목탁이', text: '호로록~ 아 좋다~', image: IAJImg },
  IHJ: { name: '꼼꼼 연구자형 목탁이', text: '이것 뭐에요?', image: IHJImg },
  IHP: { name: '찍먹 방랑자형 목탁이', text: '여기어때 저기어때!', image: IHPImg },
  EAJ: { name: '이야기 보따리형 목탁이', text: '저희,, 산책하실래요?', image: EAJImg },
  EAP: { name: '맘속 댄싱머신형 목탁이', text: '스님과 춤 춰 .', image: EAPImg },
  EHJ: { name: '템스 콜롬버스형 목탁이', text: '이리로 오라', image: EHJImg },
  EHP: { name: '끌릴땐 가야해형 목탁이', text: '지금 템스가 끌려', image: EHPImg },
};

const getTestType = (type: TestType): TestResultData => {
  return testResultMap[type];
};

export default getTestType;
