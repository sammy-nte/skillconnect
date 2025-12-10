"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { use, useEffect, useState } from "react";
import * as motion from "motion/react-client";
import Loader from "@/app/components/Loader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarCog, Wrench } from "lucide-react";

export default function Page() {
  const [requests, setRequests] = useState([]);
  const [loadRequests, setLoadRequests] = useState(false);
  const [bookingResults, setBookingResults] = useState([]);

  useEffect(() => {
    async function getRequests() {
      try {
        setLoadRequests(true);
        const token = sessionStorage.getItem("token");
        const res = await fetch(
          "https://mod2-backend.onrender.com/api/customer/requests/active/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          console.error(data);
        }
        setRequests(data);
        setLoadRequests(false);
      } catch (error) {
        console.error(error);
      }
    }

    getRequests();
  }, []);

  if (loadRequests || !requests) {
    return <Loader loaderText="Loading all requests" />;
  }
  return (
    <div>
      {requests.length === 0 ? (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">My Requests</h2>
            <Button className="!rounded-button whitespace-nowrap cursor-pointer">
              Make New Request
            </Button>
          </div>
          <p className="font-bold text-center p-10 border-2 border-dashed border-gray-400">
            You have no active requests
          </p>
        </div>
      ) : (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">My Bookings</h2>
            <button className="!rounded-button whitespace-nowrap cursor-pointer">
              Make New Request
            </button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {requests.map((request) => (
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
                          request.status === "ACCEPTED"
                            ? "default"
                            : request.status === "PENDING"
                            ? "secondary"
                            : "outline"
                        }
                        className={request.status === ""}
                      >
                        {request.status}
                      </Badge>
                      <span className="font-medium text-gray-900">
                        {/* {request.amount} */}
                      </span>
                      {request.status === "PENDING" ? (
                        <Link href={`/requests/${request.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-sm border px-3 whitespace-nowrap cursor-pointer"
                          >
                            View Details
                          </Button>
                        </Link>
                      ) : (
                        <Link href={`/requests/accepted/${request.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-sm border px-3 whitespace-nowrap cursor-pointer"
                          >
                            View Details
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
