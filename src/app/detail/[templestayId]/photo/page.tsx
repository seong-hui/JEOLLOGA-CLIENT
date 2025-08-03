import TempleImageClient from './TempleImagesClient';

const TemplePhotoPage = async ({ params }: { params: Promise<{ templestayId: string }> }) => {
  const { templestayId } = await params;
  const templestayIdNumber = Number(templestayId);

  return <TempleImageClient templestayId={templestayIdNumber} />;
};

export default TemplePhotoPage;
