const InboxThreadChatBoxSkeleton = () => {
  const ChatItem = ({ position = "left" }: { position?: string }) => {
    return (
      <div
        className={`w-full flex ${
          position === "left" ? "justify-start" : "justify-end"
        }`}>
        <div className="flex flex-col w-[90%] lg:w-[70%]">
          <div className="flex items-start gap-5">
            {position === "left" && (
              <div className="bg-gray-100 rounded-full h-10 w-11" />
            )}
            <div className="w-full">
              <div className="flex flex-col flex-1 gap-y-1 bg-gray-50 p-5 rounded-xl">
                <div className="bg-gray-200 rounded h-3 w-full" />
                <div className="bg-gray-200 rounded h-3 w-[90%]" />
                <div className="bg-gray-200 rounded h-3 w-full" />
                <div className="bg-gray-200 rounded h-3 w-[40%]" />
              </div>
              <div
                className={`bg-gray-200 rounded h-3.5 w-11 mt-2 ${
                  position === "right" && "ml-auto"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="animate-pulse p-3 grid grid-cols-1 gap-y-4">
      <ChatItem />
      <ChatItem position="right" />
      <ChatItem />
      <ChatItem position="right" />
    </div>
  );
};

export default InboxThreadChatBoxSkeleton;
