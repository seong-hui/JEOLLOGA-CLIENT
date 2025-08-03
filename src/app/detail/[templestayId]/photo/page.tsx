import TempleImageClient from './TempleImagesClient';

interface Props {
  params: {
    templestayId: string;
  };
}

const TemplePhotoPage = async ({ params }: Props) => {
  const { templestayId } = await params;
  const templestayIdNumber = Number(templestayId);

  return <TempleImageClient templestayId={templestayIdNumber} />;
};

export default TemplePhotoPage;
