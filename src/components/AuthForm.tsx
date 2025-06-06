
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "You've successfully signed up.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <Card className="w-full max-w-md bg-white dark:bg-dark-gray border-border-gray dark:border-medium-gray">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary-red">Cynefin</CardTitle>
          <CardDescription className="text-medium-gray dark:text-medium-gray">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-black dark:text-white">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                  placeholder="Enter your full name"
                  className="border-border-gray focus:border-primary-red dark:border-medium-gray dark:focus:border-primary-red"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black dark:text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="border-border-gray focus:border-primary-red dark:border-medium-gray dark:focus:border-primary-red"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black dark:text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="border-border-gray focus:border-primary-red dark:border-medium-gray dark:focus:border-primary-red"
              />
            </div>
            <Button type="submit" className="w-full bg-primary-red hover:bg-dark-red text-white" disabled={loading}>
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary-red hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
