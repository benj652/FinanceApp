import icon from '../../assets/icon.png';

const SideBarHeader = ({ isExpanded }: { isExpanded: boolean }) => {
  if (!isExpanded) return null;
  return (
    <div className="flex flex-row items-center">
      <img src={icon} className="w-10 h-10" />
      <span className="text-2xl font-bold">Slump Finance</span>
    </div>
  );
};

export default SideBarHeader;
