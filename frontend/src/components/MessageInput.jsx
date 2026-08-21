import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { LuImage, LuSend, LuX } from "react-icons/lu";
import { axiosInstance } from "../utils/axiosInstance";

import { addMessage } from "../features/chat/chatSlice";

const MessageInput = () => {
  const selectedUser = useSelector(state => state.chat.selectedUser);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // const notifySuccess = (message) => toast.success(message, { autoClose: 3000 });
  const notifyError = (message) => toast.error(message, { autoClose: 3000 });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      notifyError("Please, select an image");
      return;
    }

    const reader = new FileReader();
    // Convert file into a Base64 data URL
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;

    const messageData = {
      text: text.trim(),
      image: imagePreview
    };

    axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
    .then(res => {
      dispatch(res.data);
      // Clear form
      setText("");
      setImagePreview(null);
    })
    .catch(error => {
      notifyError(error.response.data.message);
    });
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <LuX className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <LuImage size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <LuSend size={22} />
        </button>
      </form>

      <ToastContainer/>
    </div>
  );
};

export default MessageInput;