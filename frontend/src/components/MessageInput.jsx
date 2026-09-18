import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

import { useChatStore } from "../store/useChatStore.js";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.onerror = () => {
      toast.error("Unable to read the selected image");
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!text.trim() && !imagePreview) return;

    try {
      setIsSending(true);

      await sendMessage({
        text: text.trim(),
        image: imagePreview || "",
      });

      setText("");
      removeImage();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="border-t border-base-300 p-4">
      {imagePreview && (
        <div className="mb-3 flex items-start">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Selected preview"
              className="h-20 w-20 rounded-lg border border-base-300 object-cover"
            />

            <button
              type="button"
              onClick={removeImage}
              className="btn btn-circle btn-error btn-xs absolute -right-2 -top-2"
              title="Remove image"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type a message..."
          className="input input-bordered min-w-0 flex-1"
        />

        <label
          className={`btn btn-circle cursor-pointer ${
            imagePreview ? "text-primary" : ""
          }`}
          title="Select image"
        >
          <Image className="size-5" />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <button
          type="submit"
          disabled={isSending || (!text.trim() && !imagePreview)}
          className="btn btn-circle btn-primary"
          title="Send message"
        >
          {isSending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <Send className="size-5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;