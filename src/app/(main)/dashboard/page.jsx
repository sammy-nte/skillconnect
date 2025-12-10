"use client";
import { Card, CardContent } from "@/components/ui/card";
import * as motion from "motion/react-client";
import QuickStats from "./_components/QuickStats";
import QuickMatchForm from "./_components/QuickMatchForm";
import RequestPostForm from "./_components/RequestPostForm";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarCog } from "lucide-react";
import Loader from "@/app/components/Loader";

function Page() {
  const [profile, setProfile] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [activeRequests, setActiveRequests] = useState([]);
  const [completedRequests, setCompletedRequest] = useState([]);
  const [pendingRequests, setPendingRequest] = useState([]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoadingProfile(true);
        const token = sessionStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // FIRE ALL REQUESTS IN PARALLEL
        const [res, pendingRes, activeRes, completedRes] = await Promise.all([
          fetch("https://mod2-backend.onrender.com/api/auth/me/", { headers }),
          fetch(
            "https://mod2-backend.onrender.com/api/customer/requests/pending/",
            { headers }
          ),
          fetch(
            "https://mod2-backend.onrender.com/api/customer/requests/active/",
            { headers }
          ),
          fetch(
            "https://mod2-backend.onrender.com/api/customer/requests/completed/",
            { headers }
          ),
        ]);

        const [data, pendingData, activeData, completedData] = await Promise.all([
          res.json(),
          pendingRes.json(),
          activeRes.json(),
          completedRes.json()
        ]);

        if (!res.ok || !pendingRes.ok || !activeRes.ok, !completedRes.ok) {
          console.log("Error fetching:", data, pendingData, activeData);
        }

        setProfile(data);
        setPendingRequest(pendingData);
        setActiveRequests(activeData);
        setCompletedRequest(completedData)
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProfile(false);
      }
    }

    fetchProfile();
  }, []);

  // console.log(profile);
  console.log(completedRequests)

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
      status: "Completed",
      amount: "$85",
    },
    {
      id: 3,
      service: "Carpentry",
      worker: "Mike Thompson",
      date: "2024-11-05",
      status: "Completed",
      amount: "$200",
    },
  ];
  // const activeRequests = [
  //   {
  //     id: 1,
  //     service: "HVAC Repair",
  //     description: "Air conditioning unit not cooling properly",
  //     responses: 3,
  //     posted: "2 hours ago",
  //   },
  //   {
  //     id: 2,
  //     service: "Painting",
  //     description: "Interior painting for 2 bedrooms",
  //     responses: 7,
  //     posted: "1 day ago",
  //   },
  // ];

  if (loadingProfile || !profile) {
    return <Loader loaderText="Loading profile details" />;
  }

  return (
    <div className="mt-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {profile.first_name}
        </h2>
        <p className="text-gray-600">
          {`Here's what's happening with your services today.`}
        </p>
      </motion.div>
      <QuickStats
        completed={completedRequests.length}
        pending={pendingRequests.length}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="grid grid-cols-1 gap-8 mb-8 mt-15"
      >
        {/* <QuickMatchForm/> */}
        <RequestPostForm />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-15"
      >
        <Card>
          <div className="p-6 grow flex flex-col justify-between">
            <h3 className="text-xl font-semibold mb-4">Request History</h3>
            <div className="space-y-4">
              {completedRequests.slice(0, 3).map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {request?.category?.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {request?.worker.first_name} {request?.worker.last_name} • {new Date(request.completed_at).toLocaleDateString("en-GB") }
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="default" className="bg-green-700">
                      {request.status}
                    </Badge>
                    {/* <p className="text-sm font-medium text-gray-900 mt-1">
                      {booking.amount}
                    </p> */}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/bookings"
              className="w-full h-12 mt-8 rounded-md bg-blue text-white font-bold whitespace-nowrap cursor-pointer grid place-content-center"
            >
              View all request history
            </Link>
          </div>
        </Card>
        <Card>
          <div className="p-6 grow flex flex-col justify-between">
            <h3 className="text-xl font-semibold mb-4">Active Requests</h3>
            <div className="space-y-4">
              {activeRequests.slice(0, 3).map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CalendarCog />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {request.category.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {request.worker === null
                          ? "Request not accepted yet"
                          : request.worker.first_name +
                            " " +
                            request.worker.last_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(request.created_at).toLocaleDateString(
                          "en-GB"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={
                        request.status === "COMPLETED"
                          ? "default"
                          : request.status === "PENDING"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {request.status}
                    </Badge>
                    <span className="font-medium text-gray-900">
                      {/* {request.amount} */}
                    </span>
                    {request.status === "PENDING" ? (
                      <Link href={`/requests/${request.id}`}>
                        <button
                          variant="outline"
                          size="sm"
                          className="rounded-sm border px-3 whitespace-nowrap cursor-pointer"
                        >
                          View Details
                        </button>
                      </Link>
                    ) : (
                      <Link href={`/requests/accepted/${request.id}`}>
                        <button
                          variant="outline"
                          size="sm"
                          className="rounded-sm border px-3 whitespace-nowrap cursor-pointer"
                        >
                          View Details
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/requests"
              className="w-full h-12 mt-8 rounded-md bg-orange text-white font-bold whitespace-nowrap cursor-pointer grid place-content-center"
            >
              View all active request
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default Page;
