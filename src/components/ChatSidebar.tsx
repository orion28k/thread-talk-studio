import { Plus, MessageSquare, Search, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

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

interface ChatSidebarProps {
  threads: Thread[];
  activeThreadId: string;
  onThreadSelect: (id: string) => void;
  onNewThread: () => void;
}

export function ChatSidebar({ threads, activeThreadId, onThreadSelect, onNewThread }: ChatSidebarProps) {
  const { open } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = threads.filter(thread => {
    const query = searchQuery.toLowerCase();
    return (
      thread.title.toLowerCase().includes(query) ||
      thread.preview.toLowerCase().includes(query) ||
      thread.messages.some(msg => msg.content.toLowerCase().includes(query))
    );
  });

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-3 space-y-2">
        {open && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-sidebar-accent border-0 focus-visible:ring-1 focus-visible:ring-sidebar-ring"
            />
          </div>
        )}
        
        <Button 
          onClick={onNewThread}
          variant="ghost"
          className="w-full justify-start gap-2 hover:bg-sidebar-accent"
        >
          <PenSquare className="h-4 w-4" />
          {open && <span>New Chat</span>}
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup className="py-0">
          {open && <SidebarGroupLabel className="px-2 text-xs">Recent</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredThreads.map((thread) => (
                <SidebarMenuItem key={thread.id}>
                  <SidebarMenuButton
                    onClick={() => onThreadSelect(thread.id)}
                    isActive={thread.id === activeThreadId}
                    className="w-full justify-start gap-3 px-2 py-2 h-auto hover:bg-sidebar-accent rounded-lg"
                  >
                    <MessageSquare className="h-4 w-4 flex-shrink-0" />
                    {open && (
                      <span className="truncate text-sm">{thread.title}</span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
