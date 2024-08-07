const Header = ({ selected }: { selected: string }) => {
  return (
    <div
      className="flex flex-col items-center justify-between shadow-lg bg-gradient-to-br from-gray-200 via-gray-50 to-gray-100 opacity-80 py-6
    border-black"
    >
      {selected}
    </div>
  );
};

export default Header;
