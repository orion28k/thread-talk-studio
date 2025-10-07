import { Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface Thread {
  id: string;
  title: string;
  preview: string;
}

interface ChatSidebarProps {
  threads: Thread[];
  activeThreadId: string;
  onThreadSelect: (id: string) => void;
  onNewThread: () => void;
}

export function ChatSidebar({ threads, activeThreadId, onThreadSelect, onNewThread }: ChatSidebarProps) {
  const { open } = useSidebar();

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Button 
          onClick={onNewThread}
          className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          {open && <span>New Chat</span>}
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {threads.map((thread) => (
                <SidebarMenuItem key={thread.id}>
                  <SidebarMenuButton
                    onClick={() => onThreadSelect(thread.id)}
                    isActive={thread.id === activeThreadId}
                    className="w-full justify-start gap-2"
                  >
                    <MessageSquare className="h-4 w-4 flex-shrink-0" />
                    {open && (
                      <div className="flex flex-col items-start overflow-hidden">
                        <span className="truncate text-sm font-medium">{thread.title}</span>
                        <span className="truncate text-xs text-muted-foreground">{thread.preview}</span>
                      </div>
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
