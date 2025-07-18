
"use client";

import type { User } from '@/lib/types';
import { StatsPage } from '@/components/stats-page';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface UserStatsViewProps {
  user: User;
  onBack: () => void;
}

export function UserStatsView({ user, onBack }: UserStatsViewProps) {
  return (
    <div className="w-full max-w-sm h-screen bg-background flex flex-col">
       <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
          <Button variant="ghost" size="icon" className="w-8 h-8" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to User List</span>
          </Button>
          <h1 className="font-headline text-lg font-bold text-primary truncate px-2">
            {user.username}'s Stats
          </h1>
          <div className="w-8 h-8" />
      </header>
      <main className="flex-1 overflow-y-auto">
        <StatsPage userId={user.id} />
      </main>
    </div>
  );
}

    