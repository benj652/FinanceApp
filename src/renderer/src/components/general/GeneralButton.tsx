import { ComponentProps } from 'react';

const GeneralButton = ({ className, children, ...props }: ComponentProps<'button'>) => {
  return (
    <button
      className={`group bg-gradient-to-tr transition-all duration-300 ease-in-out hover:opacity-50 from-blue-700 via-blue-600 to-blue-500 text-white font-bold py-4 px-8 rounded-md shadow-2xl hover:shadow-sm shadow-blue-500/50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default GeneralButton;
