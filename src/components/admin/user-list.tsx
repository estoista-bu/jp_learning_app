
"use client";

import { useState } from "react";
import type { User } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface UserListProps {
  onSelectUser: (user: User) => void;
  users: User[];
}

export function UserList({ onSelectUser, users }: UserListProps) {
  const nonAdminUsers = users.filter(user => user.role !== 'admin');
  const safeUsers = nonAdminUsers.map(({ password, ...rest }) => rest);

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground px-2">Select a user to view their detailed statistics.</p>
      {safeUsers.map((user) => (
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
      {safeUsers.length === 0 && (
        <p className="text-muted-foreground text-center p-4">No users available to display.</p>
      )}
    </div>
  );
}
