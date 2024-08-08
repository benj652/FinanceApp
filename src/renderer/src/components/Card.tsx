import { ComponentProps } from 'react';

const Card = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={`border-4 shadow-lg bg-gradient-to-br from-white via-gray-50 to-white opacity-80 rounded-2xl p-4 m-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
