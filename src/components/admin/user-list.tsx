
"use client";

import { useState, useEffect } from "react";
import type { User } from "@/lib/types";
import { users as allUsers } from "@/lib/users";
import { Card } from "@/components/ui/card";
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
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground px-2">Select a user to view their detailed statistics.</p>
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
  );
}
