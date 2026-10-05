import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { axiosInstance } from "../utils/axiosInstance";
import { addMessage, setMessages } from "../features/chat/chatSlice";
import MessageSkeleton from "./MessageSkeleton";
import { socket } from "../utils/socket";

const ChatContainer = () => {
  const selectedUser = useSelector(state => state.chat.selectedUser);
  const user = useSelector(state => {
    // console.log(state.auth.user);
    return state.auth.user;
  });
  const messages = useSelector(state => {
    // console.log(state.chat.messages);
    return state.chat.messages;
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef(null);

  const notifyError = (message) => toast.error(message, { autoClose: 3000 });

  useEffect(() => {
    getMessages();

    const handleNewMessage = (newMessage) => {
      if (newMessage.senderId === selectedUser._id) {
        dispatch(addMessage(newMessage));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser]);

  const getMessages = () => {
    setIsLoading(true);
    axiosInstance.get(`/messages/${selectedUser._id}`)
    .then(res => {
      dispatch(setMessages(res.data));
    })
    .catch(error => {
      notifyError(error.response.data.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const formatMessageTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === user._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === user._id
                      ? user.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput/>

      <ToastContainer/>
    </div>
  );
};

export default ChatContainer;