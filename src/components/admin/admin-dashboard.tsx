
"use client";

import { useState, useEffect } from 'react';
import type { User, Group } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Users, LogOut, BarChart3, Group as GroupIcon } from 'lucide-react';
import { UserList } from './user-list';
import { UserStatsView } from './user-stats-view';
import { UserManagement } from './user-management';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
  SidebarProvider
} from '@/components/ui/sidebar';
import { users as defaultUsers } from '@/lib/users';

interface AdminDashboardProps {
  currentUser: User;
  onLogout: () => void;
}

type AdminView = 'stats' | 'management';

function AdminDashboardContent({ currentUser, onLogout }: AdminDashboardProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [view, setView] = useState<AdminView>('stats');
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const { setOpenMobile } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Load users from localStorage or use defaults
    const storedUsers = localStorage.getItem('allUsers');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(defaultUsers);
    }
    
    // Load groups from localStorage
    const storedGroups = localStorage.getItem('allGroups');
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    }

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('allUsers', JSON.stringify(users));
    }
  }, [users, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('allGroups', JSON.stringify(groups));
    }
  }, [groups, isMounted]);

  const handleUserCreate = (newUser: User) => {
    setUsers(prev => [...prev, newUser]);
  };

  const handleUserDelete = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };
  
  const handleGroupUpdate = (updatedGroup: Group) => {
    const existingGroup = groups.find(g => g.id === updatedGroup.id);
    if (existingGroup) {
      setGroups(groups.map(g => (g.id === updatedGroup.id ? updatedGroup : g)));
    } else {
      setGroups([...groups, updatedGroup]);
    }
  };

  const handleGroupDelete = (groupId: string) => {
    setGroups(groups.filter(g => g.id !== groupId));
    // Also remove this group from any users
    setUsers(prevUsers => 
      prevUsers.map(u => ({
        ...u,
        groups: u.groups?.filter(gId => gId !== groupId)
      }))
    );
  };
  
  const handleAssignGroups = (userId: string, groupIds: string[]) => {
    setUsers(prevUsers => 
      prevUsers.map(u => u.id === userId ? { ...u, groups: groupIds } : u)
    );
  };

  const handleBack = () => {
    setSelectedUser(null);
  };
  
  const handleViewChange = (newView: AdminView) => {
    setView(newView);
    setSelectedUser(null);
    setOpenMobile(false);
  }

  const renderContent = () => {
    if (selectedUser) {
      return <UserStatsView user={selectedUser} onBack={handleBack} />;
    }

    switch (view) {
      case 'stats':
        return (
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">User Statistics</h2>
                <UserList onSelectUser={setSelectedUser} users={users} />
            </div>
        );
      case 'management':
        return (
          <UserManagement 
            users={users.filter(u => u.role !== 'admin')} 
            groups={groups}
            onUserCreate={handleUserCreate}
            onUserDelete={handleUserDelete}
            onGroupUpdate={handleGroupUpdate}
            onGroupDelete={handleGroupDelete}
            onAssignUserToGroup={handleAssignGroups}
          />
        );
      default:
        return <UserList onSelectUser={setSelectedUser} users={users} />;
    }
  };

  return (
    <>
      <Sidebar>
          <SidebarHeader>
               <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold p-2"><span className="text-primary">Admin</span></h1>
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
                      <SidebarMenuButton onClick={() => handleViewChange('stats')} isActive={view === 'stats'}>
                          <BarChart3 />
                          User stats
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton onClick={() => handleViewChange('management')} isActive={view === 'management'}>
                          <GroupIcon />
                         User Management
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
          </SidebarContent>
      </Sidebar>
      <SidebarInset>
          <header className="p-4 sm:p-6 md:p-8 flex items-center gap-4 border-b md:border-0">
               <SidebarTrigger className="md:hidden"/>
               <h1 className="text-2xl font-bold"><span className="text-muted-foreground">Dashboard</span></h1>
          </header>
          <main className="flex-1 overflow-y-auto">
             {renderContent()}
          </main>
      </SidebarInset>
    </>
  );
}

export function AdminDashboard(props: AdminDashboardProps) {
  return (
    <SidebarProvider>
      <AdminDashboardContent {...props} />
    </SidebarProvider>
  )
}
