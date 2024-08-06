import React from 'react';
import { RiExpandLeftLine } from 'react-icons/ri';

const Expander = ({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`transition-transform duration-200 ${isExpanded ? 'rotate-0 ' : 'rotate-180 '}`}
    >
      <button
        className={`flex items-center flex-shrink-0 justify-center hover:bg-zinc-400/50 transition-colors duration-180 size-10
              rounded-md hover:border hover:border-gray-800/50 
                          `}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <RiExpandLeftLine />
      </button>
    </div>
  );
};

export default Expander;
