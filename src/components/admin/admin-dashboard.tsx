
"use client";

import { useState } from 'react';
import type { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Users, LogOut, ArrowLeft } from 'lucide-react';
import { UserList } from './user-list';
import { UserStatsView } from './user-stats-view';

interface AdminDashboardProps {
  currentUser: User;
  onLogout: () => void;
}

export function AdminDashboard({ currentUser, onLogout }: AdminDashboardProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (selectedUser) {
    return (
      <UserStatsView 
        user={selectedUser} 
        onBack={() => setSelectedUser(null)}
      />
    );
  }

  return (
    <div className="w-full max-w-sm h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="w-8"></div>
        <h1 className="font-headline text-xl font-bold text-primary">
          Admin Dashboard
        </h1>
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
      </header>
      <main className="flex-1 flex flex-col overflow-y-auto">
        <UserList onSelectUser={setSelectedUser} />
      </main>
    </div>
  );
}

    