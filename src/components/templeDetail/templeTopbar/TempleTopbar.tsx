import PageName from '@components/common/pageName/PageName';

interface TempleTopbarProps {
  templestayName: string;
}

const TempleTopbar = ({ templestayName }: TempleTopbarProps) => {
  return (
    <div>
      <PageName title={`${templestayName}`} />
    </div>
  );
};

export default TempleTopbar;
