"use client";

import { useState, useEffect, use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CalendarDays,
  Check,
  FileText,
  Loader as LucideLoader,
  MapPinned,
  OctagonAlert,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/app/components/Loader";

function Page({ params }) {
  const { id } = use(params);
  const [progress, setProgress] = useState(50);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [requestDetail, setRequestDetail] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      const token = sessionStorage.getItem("token");
      const res = await fetch(
        `https://mod2-backend.onrender.com/api/services/requests/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.error(data);
      }

      setRequestDetail(data);
      setLoading(false);
    }

    fetchDetails();
  }, []);

  const matchingSteps = [
    "Analyzing your request...",
    "Searching for qualified workers around you...",
    "Matching based on location and availability...",
    "Alerted workers nearby...",
  ];

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % matchingSteps.length);
    }, 2000);

    return () => {
      clearInterval(stepTimer);
    };
  }, []);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "EMERGENCY":
        return "bg-red-100 text-red-600 border-red-200";
      case "STANDARD":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  if (loading || !requestDetail) {
    return <Loader loaderText="Loading request details" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-green-50 border-b border-green-200">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check color="green" />
              </div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                Request Successfully Submitted!
              </h1>
              <p className="text-lg text-green-700">
                Your service request has been posted and workers around have
                been alerted.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Request Details
                  </h2>
                  <Badge variant="outline" className="text-sm font-mono">
                    ID: {requestDetail.reference_code}
                  </Badge>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wrench />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Service Type
                      </h3>
                      <p className="text-gray-600">
                        {requestDetail?.category?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Problem Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {requestDetail.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPinned />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Location
                      </h3>
                      <p className="text-gray-600">{requestDetail.address}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CalendarDays />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Preferred Date
                        </h3>
                        <p className="text-gray-600">
                          {new Date(
                            requestDetail.scheduled_start
                          ).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <OctagonAlert />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Urgency Level
                        </h3>
                        <Badge
                          className={`${getUrgencyColor(
                            requestDetail.priority
                          )} capitalize`}
                        >
                          {requestDetail.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Matching Progress Section */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="animate-spin">
                      <LucideLoader />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Matching Workers in Progress...
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {matchingSteps[currentStep]}
                  </p>

                  <div className="max-w-md mx-auto">
                    <Progress value={progress} className="h-3 mb-4" />
                    <p className="text-sm text-gray-500">
                      {progress}% Complete
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">
                    What happens next?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <p className="text-blue-800 text-sm">
                        We match you with qualified workers in your area
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <p className="text-blue-800 text-sm">
                        Workers review your request and accept if conditions
                        favor them
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <p className="text-blue-800 text-sm">
                        You receive notifications
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="https://readdy.ai/home/55c38c00-09fa-4109-9de7-2d6b1eb9f99f/b81871f7-4d15-401a-b86a-543a88275a58"
                data-readdy="true"
              >
                <Button
                  variant="outline"
                  className="w-full h-12 !rounded-Button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-edit mr-2"></i>
                  Edit Request
                </Button>
              </a>
              <Button
                variant="destructive"
                className="w-full h-12 !rounded-Button whitespace-nowrap cursor-pointer"
              >
                <i className="fas fa-times mr-2"></i>
                Cancel Request
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Timeline Card */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Expected Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Request Submitted</p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Alerted Workers Nearby</p>
                      <p className="text-xs text-gray-500">In progress</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium text-sm">Waiting Acceptance</p>
                      <p className="text-xs text-gray-500">Workers have been alerted</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
