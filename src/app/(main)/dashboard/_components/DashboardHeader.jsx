import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-orange-600">SkillConnect</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/dashboard"
              className={`px-3 py-1 text-sm font-medium cursor-pointer hover:border-b-2 hover:border-b-orange-500 `}
            >
              Dashboard
            </Link>
            <Link
              href="/bookings"
              className={`px-3 py-1 text-sm font-medium cursor-pointer hover:border-b-2 hover:border-b-orange-500 `}
            >
              My Bookings
            </Link>
            <Link
              href="/requests"
              className={`px-3 py-1 text-sm font-medium cursor-pointer hover:border-b-2 hover:border-b-orange-500 `}
            >
              My Requests
            </Link>
            <Link
              href="/saved-workers"
              className={`px-3 py-1 text-sm font-medium cursor-pointer hover:border-b-2 hover:border-b-orange-500 `}
            >
              Saved Workers
            </Link>
            <div className="relative">
              <button className="!rounded-Link whitespace-nowrap cursor-pointer">
                <i className="fas fa-bell mr-2"></i>
                Notifications
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs">
                  3
                </Badge>
              </button>
            </div>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">JS</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                John Smith
              </span>
              <button className="!rounded-button whitespace-nowrap cursor-pointer">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
