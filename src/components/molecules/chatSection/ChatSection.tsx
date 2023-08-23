import { useState } from "react";
import { get, map } from "lodash";

import Input from "@/components/atoms/input/Input";
import { IChatSection } from "@/components/molecules/chatSection/types";

import "./ChatSection.css";
import SendIcon from "../../../../public/images/send.svg";

const ChatSection = ({ chats, className = "" }: IChatSection) => {
  const [message, setMessage] = useState("");

  const handleMessage = () => {
    // todo: event eklenecek
    alert(message);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) handleMessage();
  };

  return (
    <div className={`font-mi-sans text-sm ${className}`}>
      <div className="overflow-y-auto h-72">
        {map(chats, ({ start, end }, key) => (
          <div className="flex flex-col gap-y-4" key={key}>
            <div className="chat chat-start">
              <div className="flex justify-center text-lg lg:shadow-base-blur-5 items-center bg-white rounded-full w-10 h-10">
                <div>{get(start, "user")}</div>
              </div>
              <div className="chat-bubble text-black bg-primary-25 lg:shadow-base-blur-5">
                {get(start, "message")}
              </div>
              <div className="chat-footer opacity-50 mt-2 text-xs	text-xs">
                {get(start, "datetime")}
              </div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble bg-white text-black lg:shadow-base-blur-5">
                {get(end, "message")}
              </div>
              <div className="chat-footer opacity-50 mt-2 text-xs">
                {get(end, "datetime")}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Input
          type="text"
          name="message"
          label=""
          onKeyUp={handleKeyPress}
          righticon={
            <button onClick={handleMessage} className="flex mx-4">
              <SendIcon />
            </button>
          }
          placeholder="Mesajını yaz"
          containerclass="text-lg"
          onChange={({ target }) => setMessage(get(target, "value"))}
        />
      </div>
    </div>
  );
};

export default ChatSection;
