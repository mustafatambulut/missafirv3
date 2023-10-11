const HeaderSkeleton = () => {
  return (
    <div className="w-full lg:py-8 py-4 lg:px-10 px-5 animate-pulse fixed top-0 w-full z-40">
      <div className="flex justify-between items-center">
        <div className="w-24 lg:w-44 h-10 lg:h-12 rounded-md bg-gray-100" />
        <div className="flex gap-x-3">
          <div className="hidden lg:block w-44 h-12 rounded-md bg-gray-100" />
          <div className="hidden lg:block w-24 h-12 rounded-md bg-gray-100" />
          <div className="w-12 h-10 lg:w-24 lg:h-12 rounded-md bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default HeaderSkeleton;
