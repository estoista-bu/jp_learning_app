
"use client";

import { useState } from 'react';
import type { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Users, LogOut, BarChart3, Group } from 'lucide-react';
import { UserList } from './user-list';
import { UserStatsView } from './user-stats-view';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';

interface AdminDashboardProps {
  currentUser: User;
  onLogout: () => void;
}

type AdminView = 'stats' | 'management';

export function AdminDashboard({ currentUser, onLogout }: AdminDashboardProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [view, setView] = useState<AdminView>('stats');

  const handleBack = () => {
    setSelectedUser(null);
  };

  const renderContent = () => {
    if (selectedUser) {
      return <UserStatsView user={selectedUser} onBack={handleBack} />;
    }

    switch (view) {
      case 'stats':
        return (
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">User Statistics</h2>
                <UserList onSelectUser={setSelectedUser} />
            </div>
        );
      case 'management':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <p className="text-muted-foreground">User grouping functionality will be implemented here.</p>
          </div>
        );
      default:
        return <UserList onSelectUser={setSelectedUser} />;
    }
  };

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                 <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg text-primary">Admin</h2>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                            <Users className="h-5 w-5" />
                            <span className="sr-only">Open admin menu</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Admin: {currentUser.username}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={onLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                 </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => setView('stats')} isActive={view === 'stats'}>
                            <BarChart3 />
                            User stats
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => setView('management')} isActive={view === 'management'}>
                            <Group />
                           Users management
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <div className="p-4 sm:p-6 md:p-8 flex items-center gap-4">
                 <SidebarTrigger className="md:hidden"/>
                 <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
            </div>
            <main className="flex-1 overflow-y-auto">
               {renderContent()}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
