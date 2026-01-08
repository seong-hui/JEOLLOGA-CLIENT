import { StaticImageData } from 'next/image';
import { TestType } from '@constants/test';
import IAPImg from '@assets/images/test/test_img_large_IAP.png';
import IAJImg from '@assets/images/test/test_img_large_IAJ.png';
import IHJImg from '@assets/images/test/test_img_large_IHJ.png';
import IHPImg from '@assets/images/test/test_img_large_IHP.png';
import EAJImg from '@assets/images/test/test_img_large_EAJ.png';
import EAPImg from '@assets/images/test/test_img_large_EAP.png';
import EHJImg from '@assets/images/test/test_img_large_EHJ.png';
import EHPImg from '@assets/images/test/test_img_large_EHP.png';

interface TestResultData {
  text: string;
  image: StaticImageData;
}

const testResultMap: Record<TestType, TestResultData> = {
  IAP: { text: '내 친구는 나...', image: IAPImg as StaticImageData },
  IAJ: { text: '호로록~ 아 좋다~', image: IAJImg as StaticImageData },
  IHJ: { text: '이것 뭐에요?', image: IHJImg as StaticImageData },
  IHP: { text: '여기어때 저기어때!', image: IHPImg as StaticImageData },
  EAJ: { text: '저희,, 산책하실래요?', image: EAJImg as StaticImageData },
  EAP: { text: '스님과 춤 춰 .', image: EAPImg as StaticImageData },
  EHJ: { text: '이리로 오라', image: EHJImg as StaticImageData },
  EHP: { text: '지금 템스가 끌려', image: EHPImg as StaticImageData },
};

const getTestType = (type: TestType): TestResultData => {
  return testResultMap[type];
};

export default getTestType;
