import { ComponentProps } from 'react';

const Card = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={`border-4 hover:shadow-2xl bg-gradient-to-br from-white via-gray-50 to-white  rounded-2xl p-4 m-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
