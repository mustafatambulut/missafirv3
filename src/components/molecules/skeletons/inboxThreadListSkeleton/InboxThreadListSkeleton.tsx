const InboxThreadListSkeleton = () => {
  const ListItem = ({ selected = false }: { selected?: boolean }) => {
    return (
      <div
        className={`flex gap-3 items-center ${
          selected && "bg-darkblue-50"
        } p-5 rounded-lg`}>
        <div className="bg-gray-200 rounded-lg h-10 w-10" />
        <div className="flex flex-col flex-1 gap-y-1">
          <div className="bg-gray-300 rounded h-2.5 w-7" />
          <div className="flex w-full justify-between">
            <div className="bg-gray-400 rounded h-4 w-[80%]" />
            <div className="bg-gray-400 rounded h-4 w-[15%]" />
          </div>
          <div className="flex w-full justify-between">
            <div className="bg-gray-200 rounded h-4 w-[80%]" />
            <div className="bg-gray-100 rounded h-4 w-[15%]" />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="animate-pulse grid grid-cols-1 gap-y-4">
      <ListItem selected={true} />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </div>
  );
};

export default InboxThreadListSkeleton;
