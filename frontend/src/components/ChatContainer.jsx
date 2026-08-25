import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { axiosInstance } from "../utils/axiosInstance";
import { setMessages } from "../features/chat/chatSlice";
import MessageSkeleton from "./MessageSkeleton";

const ChatContainer = () => {
  const selectedUser = useSelector(state => state.chat.selectedUser);
  const messages = useSelector(state => {
    // console.log(state.chat.messages);
    return state.chat.messages;
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const notifyError = (message) => toast.error(message, { autoClose: 3000 });

  useEffect(() => {
    getMessages();
  }, []);

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
      setIsLoading(true);
    });
  };

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

      <MessageInput/>

      <ToastContainer/>
    </div>
  );
};

export default ChatContainer;