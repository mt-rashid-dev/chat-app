import ChatHeader from "./ChatHeader";

const ChatContainer = () => {
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
    </div>
  );
};

export default ChatContainer;