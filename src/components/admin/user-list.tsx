
"use client";

import { useState, useEffect } from "react";
import type { User } from "@/lib/types";
import { users as allUsers } from "@/lib/users";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

interface UserListProps {
  onSelectUser: (user: User) => void;
}

export function UserList({ onSelectUser }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call.
    // We filter out the password for security, even in this simulation.
    const safeUsers = allUsers.map(({ password, ...rest }) => rest);
    setUsers(safeUsers as User[]);
  }, []);

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-2">
        <div className="px-2">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-sm text-muted-foreground">Select a user to view their stats.</p>
        </div>
        {users.map((user) => (
          <Card 
            key={user.id} 
            className="cursor-pointer hover:bg-muted"
            onClick={() => onSelectUser(user)}
          >
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-xs text-muted-foreground uppercase">{user.role}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}

    