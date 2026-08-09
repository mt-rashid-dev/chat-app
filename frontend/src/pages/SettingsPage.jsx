import { LuSend } from "react-icons/lu";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const setTheme = (value) => {
    document.documentElement.setAttribute("data-theme", value);
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto space-y-6 bg-base-300 rounded-xl p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="btn bg-purple-600 hover:bg-purple-500 text-gray-100" onClick={() => setTheme("light")}>Light Theme</button>
          <button className="btn bg-purple-600 hover:bg-purple-500 text-gray-100" onClick={() => setTheme("dark")}>Dark Theme</button>
        </div>

        {/* Preview chat theme */}
        <div className="overflow-hidden shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Preview</h3>
          <div className="p-4 bg-base-200 rounded-xl">
            <div className="max-w-lg mx-auto">
              {/* Example chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center text-gray-900 font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-cyan-300 text-gray-900" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn bg-cyan-300 hover:bg-cyan-400 text-gray-900 h-10 min-h-0">
                      <LuSend size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;