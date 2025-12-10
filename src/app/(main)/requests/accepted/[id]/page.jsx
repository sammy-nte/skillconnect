"use client";

import { use, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarClock,
  Car,
  ChevronRight,
  CreditCard,
  Mail,
  Map,
  MapPinned,
  NotebookPen,
  Phone,
  SquareX,
  Star,
  User,
  Verified,
  Wrench,
} from "lucide-react";
import Loader from "@/app/components/Loader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page({ params }) {
  const { id } = use(params);
  const [bookingDetail, setBookingDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getDetail() {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      try {
        const res = await fetch(
          `https://mod2-backend.onrender.com/api/services/requests/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          console.error(data);
        }
        setBookingDetail(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    getDetail();
  }, []);

  console.log(bookingDetail);

  function minutesToHrsMins(mins) {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}hrs ${minutes}mins`;
  }

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  if (loading || !bookingDetail) {
    return <Loader loaderText="Loading booking details" />;
  }

  const bookingDetails = {
    id: "BK-2024-001234",
    service: "Plumbing Repair",
    category: "Plumbing",
    description:
      "Kitchen sink leak repair and faucet replacement. The kitchen sink has been leaking from the base for the past week, causing water damage to the cabinet below. Need immediate repair and replacement of the old faucet with a new modern one.",
    status: "Scheduled",
    date: "November 15, 2024",
    time: "2:00 PM - 4:00 PM",
    estimatedDuration: "2 hours",
    address: "1234 Oak Street, Springfield, IL 62701",
    totalAmount: "$185.00",
    serviceFee: "$150.00",
    platformFee: "$15.00",
    tax: "$20.00",
    paymentMethod: "Credit Card (**** 4532)",
    paymentStatus: "Paid",
    worker: {
      name: "John Martinez",
      title: "Master Plumber",
      rating: 4.9,
      reviews: 127,
      phone: "(555) 123-4567",
      email: "john.martinez@skillconnect.com",
      verified: true,
      image:
        "https://readdy.ai/api/search-image?query=professional%20plumber%20in%20work%20uniform%20smiling%20confidently%20with%20modern%20tools%20and%20equipment%20in%20a%20clean%20workshop%20setting%20with%20natural%20lighting%20and%20professional%20appearance&width=300&height=300&seq=worker-detail1&orientation=squarish",
    },
    timeline: [
      {
        status: "Booking Confirmed",
        completed: true,
      },
      {
        status: "Worker Assigned",
        completed: true,
      },
      {
        status: "Service Scheduled",
        completed: true,
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link
              href="/requests"
              className="hover:text-blue-600 cursor-pointer"
            >
              My Requests
            </Link>
            <ChevronRight />
            <span className="text-gray-900">Request Details</span>
          </nav>
        </div>

        {/* Booking Overview Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {bookingDetail.category.description}
                  </h1>
                  <Badge
                    className={`${getStatusColor(
                      bookingDetail.status
                    )} font-medium`}
                  >
                    {bookingDetail.status}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-1 font-medium">
                  Booking ID: {bookingDetail.reference_code}
                </p>
                <p className="text-lg font-medium text-gray-900">
                  Scheduled Start:{" "}
                  {new Date(bookingDetail.scheduled_start).toLocaleDateString(
                    "en-GB"
                  )}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button
                  className="!rounded-button whitespace-nowrap cursor-pointer bg-blue"
                  onClick={() => setShowContactModal(true)}
                >
                  <Phone />
                  Contact Worker
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 gap-3 flex items-center">
                  <Wrench />
                  Service Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      Service Type
                    </h3>
                    <p className="text-gray-600">
                      {bookingDetail.category.name}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      Description
                    </h3>
                    <p className="text-gray-600">{bookingDetail.description}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      Estimated Duration
                    </h3>
                    <p className="text-gray-600">
                      {minutesToHrsMins(
                        bookingDetail.estimated_duration_minutes
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule and Location */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 gap-3 flex items-center">
                  <MapPinned />
                  Schedule & Location
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        Date & Time
                      </h3>
                      <p className="text-gray-600">
                        {new Date(
                          bookingDetail.scheduled_start
                        ).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        Duration
                      </h3>
                      <p className="text-gray-600">
                        {minutesToHrsMins(
                          bookingDetail.estimated_duration_minutes
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      Service Address
                    </h3>
                    <p className="text-gray-600">{bookingDetail.address}</p>
                    {/* <button className="mt-2 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-map mr-2"></i>
                      View on Map
                    </button> */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            {/* <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold gap-3 mb-4 flex items-center">
                  <CreditCard />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">
                      {bookingDetails.serviceFee}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Platform Fee</span>
                    <span className="font-medium">
                      {bookingDetails.platformFee}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{bookingDetails.tax}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        Total Amount
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {bookingDetails.totalAmount}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium">
                        {bookingDetails.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Payment Status</span>
                      <Badge
                        className="bg-green-100 text-green-800"
                        variant={undefined}
                      >
                        <i className="fas fa-check-circle mr-1"></i>
                        {bookingDetails.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* Booking Timeline */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 gap-3 flex items-center">
                  <CalendarClock />
                  Booking Timeline
                </h2>
                <div className="space-y-4">
                  {bookingDetails.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`w-4 h-4 rounded-full mt-1 ${
                          item.completed ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <h3
                          className={`font-medium ${
                            item.completed ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {item.status}
                        </h3>
                      </div>
                      {item.completed && (
                        <i className="fas fa-check text-green-500"></i>
                      )}
                    </div>
                  ))}
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-4 h-4 rounded-full mt-1 ${
                        bookingDetail.status === "IN_PROGRESS"
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <h3
                        className={`font-medium ${
                          bookingDetail.status === "IN_PROGRESS"
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        In Progress
                      </h3>
                    </div>
                    {bookingDetail.status === "IN_PROGRESS" && (
                      <i className="fas fa-check text-green-500"></i>
                    )}
                  </div>
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-4 h-4 rounded-full mt-1 ${
                        bookingDetail.status === "COMPLETED"
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <h3
                        className={`font-medium ${
                          bookingDetail.status === "COMPLETED"
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        Completed
                      </h3>
                    </div>
                    {bookingDetail.status === "COMPLETED" && (
                      <i className="fas fa-check text-green-500"></i>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 gap-3 flex items-center">
                  <NotebookPen />
                  Customer Notes & Special Instructions
                </h2>
                <div>
                  <p>{bookingDetail.customer_notes}</p>
                </div>
                {/* <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="text-sm"
                  rows={4}
                  placeholder="Add any special instructions or notes for the worker..."
                /> */}
                {/* <button className="mt-3 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-save mr-2"></i>
                  Save Notes
                </button> */}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            {/* Worker Profile */}
            <Card>
              <CardContent className="px-6 py-3">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <User />
                  Your Worker
                </h2>
                <div className="text-left">
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                    {bookingDetail.worker.first_name}{" "}{bookingDetail.worker.last_name}
                    <Verified size={20} color="blue" />
                  </h3>
                  <p className="text-gray-600 mb-2 font-medium">
                    {bookingDetail?.worker?.worker_profile?.category_name}
                  </p>
                  <div className="space-y-2">
                    <Button
                      className="w-full hover:bg-orange bg-orange whitespace-nowrap cursor-pointer"
                      onClick={() => setShowContactModal(true)}
                    >
                      <i className="fas fa-phone mr-2"></i>
                      Contact Worker
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full text-white bg-red-600 border-red-200 hover:bg-red-400 whitespace-nowrap cursor-pointer">
                    <i className="fas fa-times mr-2"></i>
                    Cancel Booking
                  </Button>
                </div>
              </CardContent>
            </Card>

            {bookingDetail.status === "ACCEPTED" && (
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <i className="fas fa-location-arrow mr-3"></i>
                    Live Worker Tracking
                  </h2>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-orange rounded-full flex items-center justify-center animate-pulse">
                      <Car color="white" />
                    </div>
                    <h3 className="font-semibold  mb-2">
                      {bookingDetails.worker.name} is on the way!
                    </h3>
                    <div className="space-y-2 mb-4"></div>
                    <Link href={`/requests/accepted/${id}/maps`}>
                      <Button className="w-full mb-3 !rounded-button whitespace-nowrap cursor-pointer">
                        <Map />
                        View Live Map
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-2 text-red-800">
                  Emergency Contact
                </h2>
                <p className="text-sm text-red-700 mb-3">
                  If you have an urgent issue during service hours, contact us
                  immediately.
                </p>
                <Button className="w-full bg-red-600 hover:bg-red-700 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-phone mr-2"></i>
                  Call Emergency Line
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <a
              href="https://readdy.ai/home/55c38c00-09fa-4109-9de7-2d6b1eb9f99f/b81871f7-4d15-401a-b86a-543a88275a58"
              data-readdy="true"
            >
              <button className="!rounded-button whitespace-nowrap cursor-pointer">
                <i className="fas fa-arrow-left mr-2"></i>
                Back to My Bookings
              </button>
            </a>
            <div className="flex space-x-3">
              <button className="!rounded-button whitespace-nowrap cursor-pointer">
                <i className="fas fa-redo mr-2"></i>
                Book Similar Service
              </button>
              <button className="!rounded-button whitespace-nowrap cursor-pointer">
                <i className="fas fa-star mr-2"></i>
                Rate Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-white/50 backdrop-blur-md"></div>
          <div className="relative  flex items-center justify-center h-full">
            <div className="bg-white border-2 rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Contact {bookingDetail.worker.first_name}{" "} {bookingDetail.worker.last_name}
                </h3>
                <Button
                  onClick={() => setShowContactModal(false)}
                  className="!rounded-button bg-orange"
                >
                  <SquareX />
                </Button>
              </div>

              <div className="space-y-4">
                {/* phone */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <i className="fas fa-phone text-blue-600"></i>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">
                      {bookingDetail.worker.phone_number}
                    </p>
                  </div>
                </div>

                {/* email */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <i className="fas fa-envelope text-blue-600"></i>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">
                      {bookingDetail.worker.email}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1 !rounded-button bg-orange">
                    <Phone /> Call
                  </Button>
                  <Button className="flex-1 !rounded-button bg-blue">
                    <Mail /> Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Reschedule Service</h3>
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="!rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  New Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Preferred Time
                </label>
                <select className="w-full p-3 border rounded-lg text-sm">
                  <option>Morning (8:00 AM - 12:00 PM)</option>
                  <option>Afternoon (12:00 PM - 5:00 PM)</option>
                  <option>Evening (5:00 PM - 8:00 PM)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Reason for Rescheduling
                </label>
                <Textarea
                  placeholder="Optional: Let us know why you need to reschedule"
                  className="text-sm"
                  rows={3}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  className="flex-1 !rounded-button whitespace-nowrap cursor-pointer"
                  onClick={() => setShowRescheduleModal(false)}
                >
                  Cancel
                </button>
                <button className="flex-1 !rounded-button whitespace-nowrap cursor-pointer">
                  Request Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
