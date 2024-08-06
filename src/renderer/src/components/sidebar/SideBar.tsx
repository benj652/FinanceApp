import { ComponentProps } from 'react';

const SideBar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={`p-4 overflow-auto items-center h-screen shadow-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-500 opacity-80 
        ${className}`}
      {...props}
    >
      {children}
    </aside>
  );
};

export default SideBar;
