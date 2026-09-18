import Sidebar from "../components/Sidebar.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import { useChatStore } from "../store/useChatStore.js";
import ChatContainer from "../components/ChatContainer.jsx";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <main className="mx-auto h-[calc(100vh-65px)] max-w-6xl p-4">
      <div className="flex h-full overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-xl">
        <Sidebar />

        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </div>
    </main>
  );
};

export default HomePage;