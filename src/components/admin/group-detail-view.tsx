
"use client";

import { useState, useMemo } from 'react';
import type { User, Group } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, UserPlus, Check, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';

interface GroupDetailViewProps {
  group: Group;
  allUsers: User[];
  onBack: () => void;
  onGroupUpdate: (group: Group) => void;
  onAssignUserToGroup: (userId: string, groupIds: string[]) => void;
}

export function GroupDetailView({ group, allUsers, onBack, onGroupUpdate, onAssignUserToGroup }: GroupDetailViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleUser = (user: User) => {
    const currentGroups = user.groups || [];
    const isInGroup = currentGroups.includes(group.id);
    const newGroups = isInGroup 
      ? currentGroups.filter(gId => gId !== group.id)
      : [...currentGroups, group.id];
    onAssignUserToGroup(user.id, newGroups);
  };

  const filteredUsers = useMemo(() => {
    return allUsers.filter(user => 
      user.role === 'user' && 
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allUsers, searchQuery]);

  return (
    <div className="p-4 flex flex-col h-full">
      <header className="flex items-center gap-4 mb-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{group.name}</h2>
          <p className="text-muted-foreground">{group.description}</p>
        </div>
      </header>

      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Manage Members</CardTitle>
          <CardDescription>Select users to add or remove from this group.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <div className="mb-4">
            <Label htmlFor="search-users">Search Users</Label>
            <Input 
              id="search-users"
              placeholder="Search by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ScrollArea className="flex-grow border rounded-md">
            <div className="p-4 space-y-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <div key={user.id} className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md">
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={user.groups?.includes(group.id)}
                      onCheckedChange={() => handleToggleUser(user)}
                    />
                    <Label htmlFor={`user-${user.id}`} className="flex-1 cursor-pointer">
                      {user.username}
                    </Label>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center">No users found.</p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
