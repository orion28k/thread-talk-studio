import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatArea } from "@/components/ChatArea";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Thread {
  id: string;
  title: string;
  preview: string;
  messages: Message[];
}

const initialThreads: Thread[] = [
  {
    id: "1",
    title: "Welcome Chat",
    preview: "Getting started with the chat...",
    messages: [
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'm your AI assistant. How can I help you today?",
      },
    ],
  },
];

const Index = () => {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState(initialThreads[0].id);

  const activeThread = threads.find((t) => t.id === activeThreadId);

  const handleNewThread = () => {
    const newThread: Thread = {
      id: Date.now().toString(),
      title: "New Chat",
      preview: "Start a new conversation...",
      messages: [],
    };
    setThreads([newThread, ...threads]);
    setActiveThreadId(newThread.id);
  };

  const handleSendMessage = (content: string) => {
    if (!activeThread) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    // Simulate assistant response
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "Thanks for your message! This is a demo response. In a real application, this would be powered by an AI model.",
    };

    const updatedThreads = threads.map((thread) => {
      if (thread.id === activeThreadId) {
        const newMessages = [...thread.messages, userMessage, assistantMessage];
        return {
          ...thread,
          messages: newMessages,
          title: thread.messages.length === 0 ? content.slice(0, 30) + "..." : thread.title,
          preview: content.slice(0, 50) + "...",
        };
      }
      return thread;
    });

    setThreads(updatedThreads);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <ChatSidebar
          threads={threads}
          activeThreadId={activeThreadId}
          onThreadSelect={setActiveThreadId}
          onNewThread={handleNewThread}
        />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center px-4 bg-background">
            <SidebarTrigger />
            <h1 className="ml-4 font-semibold text-lg">
              {activeThread?.title || "New Chat"}
            </h1>
          </header>
          <ChatArea
            messages={activeThread?.messages || []}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
