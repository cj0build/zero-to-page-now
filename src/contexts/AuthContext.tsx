
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define UserRole type
export type UserRole = "customer" | "driver" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  phoneNumber?: string;
  provider?: "email" | "oauth";
  isAdmin?: boolean;
  bucketPoints?: number;
}

interface ProfileUpdateData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  profileImage?: string;
  bucketPoints?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { name: string, email: string, password: string, role: UserRole }) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  updateUserProfile?: (data: ProfileUpdateData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get user from localStorage during initialization
  function getUserFromLocalStorage(): User | null {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  
  // Save user to localStorage
  function saveUserToLocalStorage(user: User | null) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }

  // Check if user is admin
  const isAdmin = !!user && (user.role === "admin" || user.email === "admin@kotomoto.co");

  // Update the user's role if they are admin@kotomoto.co
  useEffect(() => {
    if (user && user.email === "admin@kotomoto.co" && user.role !== "admin") {
      const updatedUser = {
        ...user,
        role: "admin" as UserRole,
        isAdmin: true
      };
      setUser(updatedUser);
      saveUserToLocalStorage(updatedUser);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock implementation
    setIsLoading(true);
    setError(null);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        try {
          // Determine role based on email
          let role: UserRole = "customer";
          let isAdminUser = false;
          
          if (email.includes("admin") || email === "admin@kotomoto.co") {
            role = "admin";
            isAdminUser = true;
          } else if (email.includes("driver")) {
            role = "driver";
          }
          
          const newUser: User = {
            id: Math.random().toString(36).substring(2),
            name: email.split("@")[0],
            email,
            role,
            provider: "email",
            isAdmin: isAdminUser,
            bucketPoints: 25 // Initialize with some points
          };
          
          setUser(newUser);
          saveUserToLocalStorage(newUser);
          setIsLoading(false);
          resolve(true);
        } catch (err) {
          setError("Login failed. Please try again.");
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // Mock password reset process
        setIsLoading(false);
        // Simulate success
        resolve(true);
      }, 1500);
    });
  };

  const register = async (data: { name: string, email: string, password: string, role: UserRole }): Promise<void> => {
    // This is a mock implementation
    setIsLoading(true);
    setError(null);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          let isAdminUser = false;
          let role = data.role;
          
          // Force admin role if the email is admin@kotomoto.co
          if (data.email === "admin@kotomoto.co") {
            role = "admin";
            isAdminUser = true;
          }
          
          const newUser: User = {
            id: Math.random().toString(36).substring(2),
            name: data.name,
            email: data.email,
            role,
            provider: "email",
            isAdmin: isAdminUser || role === "admin",
            bucketPoints: 0 // Start with zero points for new users
          };
          
          setUser(newUser);
          saveUserToLocalStorage(newUser);
          setIsLoading(false);
          resolve();
        } catch (err) {
          setError("Registration failed. Please try again.");
          setIsLoading(false);
          reject(err);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    saveUserToLocalStorage(null);
  };
  
  const updateUserProfile = (data: ProfileUpdateData) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...data
      };
      setUser(updatedUser);
      saveUserToLocalStorage(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      resetPassword,
      isAdmin, 
      isLoading,
      error,
      updateUserProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
