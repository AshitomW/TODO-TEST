"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  CheckSquare,
  LogOut,
  Menu,
  X,
  CheckCircle,
  User,
  Calendar1Icon,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (error) {
        console.error("Invalid token");

        localStorage.removeItem("token");
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        router.push("/");
      }
    } else {
      router.push("/");
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/");
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Todos", href: "/dashboard/todos", icon: CheckSquare },
  ];

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            {/* Icon with gradient background */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-sm">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>

            {/* Gradient text logo */}
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              iTodo
            </h1>
          </div>

          {/* Sidebar toggle button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mt-1">
            <User className="h-5 w-5 text-gray-500" />
            <p className="font-medium text-gray-900">{user?.name || "User"}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute  bottom-0 w-full p-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center w-full px-3 py-2  text-sm font-medium text-red-400 hover:bg-gray-50 hover:text-red-600 rounded transition-colors"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded hover:bg-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>

          <div className="flex items-center">
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
