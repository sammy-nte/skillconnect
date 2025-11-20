import { Card, CardContent } from "@/components/ui/card";
import * as motion from "motion/react-client";
import QuickStats from "./_components/QuickStats";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { serviceCategories } from "../../data/data";
import Map from "./_components/MapInput";
import MapInput from "./_components/MapInput";
import QuickMatchForm from "./_components/QuickMatchForm";
import RequestPostForm from "./_components/RequestPostForm";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function page() {
  const recentBookings = [
    {
      id: 1,
      service: "Plumbing",
      worker: "John Martinez",
      date: "2024-11-08",
      status: "Completed",
      amount: "$120",
    },
    {
      id: 2,
      service: "Electrical",
      worker: "Sarah Chen",
      date: "2024-11-12",
      status: "Scheduled",
      amount: "$85",
    },
    {
      id: 3,
      service: "Carpentry",
      worker: "Mike Thompson",
      date: "2024-11-05",
      status: "In Progress",
      amount: "$200",
    },
  ];
  const activeRequests = [
    {
      id: 1,
      service: "HVAC Repair",
      description: "Air conditioning unit not cooling properly",
      responses: 3,
      posted: "2 hours ago",
    },
    {
      id: 2,
      service: "Painting",
      description: "Interior painting for 2 bedrooms",
      responses: 7,
      posted: "1 day ago",
    },
  ];
  return (
    <div className="mt-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, John!
        </h2>
        <p className="text-gray-600">
          {`Here's what's happening with your services today.`}
        </p>
      </motion.div>
      <QuickStats />
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1.2}} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-15">
        <QuickMatchForm />
        <RequestPostForm />
      </motion.div>
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1.7}} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-15">
        <Card>
          <div className="p-6 grow flex flex-col justify-between">
            <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>
            <div className="space-y-4">
              {recentBookings.slice(0, 3).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {booking.service}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {booking.worker} • {booking.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        booking.status === "Completed"
                          ? "default"
                          : booking.status === "Scheduled"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {booking.status}
                    </Badge>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {booking.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/bookings"
              className="w-full h-12 mt-8 rounded-md bg-blue text-white font-bold whitespace-nowrap cursor-pointer grid place-content-center"
            >
              View all bookings
            </Link>
          </div>
        </Card>
        <Card>
          <div className="p-6 grow flex flex-col justify-between">
            <h3 className="text-xl font-semibold mb-4">Active Requests</h3>
            <div className="space-y-4">
              {activeRequests.map((request) => (
                <div key={request.id} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {request.service}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {request.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600">
                      {request.responses} responses
                    </span>
                    <span className="text-xs text-gray-500">
                      {request.posted}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/requests"
              className="w-full h-12 mt-8 rounded-md bg-orange text-white font-bold whitespace-nowrap cursor-pointer grid place-content-center"
            >
              View all request
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default page;
