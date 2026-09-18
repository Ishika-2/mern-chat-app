import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-1 items-center justify-center bg-base-200/50 p-6">
      <div className="max-w-md text-center">
        <div className="mb-5 flex justify-center">
          <div className="rounded-2xl bg-primary/10 p-5">
            <MessageSquare className="size-12 text-primary" />
          </div>
        </div>

        <h2 className="text-2xl font-bold">
          Welcome to MERN Chat
        </h2>

        <p className="mt-3 text-base-content/60">
          Select a contact from the sidebar to start a conversation.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;