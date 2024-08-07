import { Link } from 'react-router-dom';
import { SideBarLinkProps } from 'src/shared/types';

const SideBarButton = ({
  isExpanded,
  isSelected,
  icon,
  className,
  children,
  ...props
}: SideBarLinkProps) => {
  return (
    <Link
      className={`rounded-md  text-center  ${isSelected ? 'bg-blue-500/50 text-blue-950 font-bold border-2 border-blue-900/10' : 'border-zinc-400/50 hover:bg-zinc-600/50'}  transition-colors duration-180 flex flex-col items-center w-full h-14 max-h-14 overflow-hidden justify-center ${className}`}
      {...props}
    >
      {isExpanded ? (
        <div className="flex flex-row items-center">
          {icon && <div style={{ marginRight: 'auto' }}>{icon}</div>}
          <span className="mx-3">{children}</span>
        </div>
      ) : (
        icon
      )}
    </Link>
  );
};

export default SideBarButton;
