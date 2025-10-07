import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatArea } from "@/components/ChatArea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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
  {
    id: "2",
    title: "Web app in Python",
    preview: "Building a Flask application...",
    messages: [],
  },
  {
    id: "3",
    title: "Landing page text ideas",
    preview: "Creating compelling copy...",
    messages: [],
  },
  {
    id: "4",
    title: "Revise email tone",
    preview: "Making emails more professional...",
    messages: [],
  },
  {
    id: "5",
    title: "QA role in software dev",
    preview: "Understanding QA responsibilities...",
    messages: [],
  },
  {
    id: "6",
    title: "React best practices",
    preview: "Modern React patterns...",
    messages: [],
  },
  {
    id: "7",
    title: "MongoDB connection",
    preview: "Setting up database...",
    messages: [],
  },
  {
    id: "8",
    title: "CSS animations guide",
    preview: "Creating smooth transitions...",
    messages: [],
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

  const handleDeleteThread = () => {
    const updatedThreads = threads.filter((t) => t.id !== activeThreadId);
    setThreads(updatedThreads);
    
    // Switch to first remaining thread or create a new one
    if (updatedThreads.length > 0) {
      setActiveThreadId(updatedThreads[0].id);
    } else {
      handleNewThread();
    }
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
          <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-background">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="ml-4 font-semibold text-lg">
                {activeThread?.title || "New Chat"}
              </h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDeleteThread}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
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
