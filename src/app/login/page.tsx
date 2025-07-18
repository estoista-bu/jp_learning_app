
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { UserRole } from '@/lib/types';
import Link from 'next/link';

// Temporary user database
const users = {
  user: { password: 'password', role: 'user' as UserRole },
  admin: { password: 'adminpass', role: 'admin' as UserRole },
};

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const user = users[username as keyof typeof users];

      if (user && user.password === password) {
        // In a real app, you would use a secure session/token method.
        // For this demo, we'll use localStorage.
        localStorage.setItem('userRole', user.role);
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${username}!`,
        });
        router.push('/app');
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid username or password.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    }, 500); // Simulate network delay
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
       <div className="absolute top-4 left-4">
         <Button variant="outline" asChild>
            <Link href="/">Home</Link>
         </Button>
       </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Nihongo Mastery</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
           <div className="mt-4 text-center text-xs text-muted-foreground">
             <p>Demo accounts:</p>
             <p>User: user / pass: password</p>
             <p>Admin: admin / pass: adminpass</p>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
