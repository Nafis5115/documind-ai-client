import { useState, useCallback, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  plan: string;
}

const STORAGE_KEY = 'documind-auth';

function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function storeUser(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(getStoredUser);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      initials: initials || 'U',
      plan: 'Pro Plan',
    };
    setUser(newUser);
    storeUser(newUser);
    setIsLoading(false);
    return newUser;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      initials: initials || 'U',
      plan: 'Free Plan',
    };
    setUser(newUser);
    storeUser(newUser);
    setIsLoading(false);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    storeUser(null);
  }, []);

  return { user, isLoading, login, register, logout, isAuthenticated: !!user };
}
