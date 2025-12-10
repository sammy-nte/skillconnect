"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serviceCategories } from "../../../data/data";
import MapInput from "./MapInput";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

function RequestPostForm() {
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [locationData, setLocationData] = useState({});
  const [date, setDate] = useState("");
  const [urgency, setUrgency] = useState("");

  function getServiceNumber(service) {
    const map = {
      electrician: 1,
      carpenter: 2,
      cleaner: 3,
      hvac: 4,
      "appliance repair": 5,
      landscaping: 6,
      plumbing: 7,
    };

    return map[service.toLowerCase()] || null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      category_id: getServiceNumber(serviceType),
      description,
      location: locationData?.formatted_address,
      coordinates: {
        lat: locationData?.geometry.location.lat(),
        long: locationData?.geometry.location.lng(),
      },
      urgency,
    };

    console.log("Submitting:", payload);

    // const res = await fetch("http://localhost:5000/api/requests", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });

    // if (res.ok) {
    //   alert("Request submitted!");
    // } else {
    //   alert("Something went wrong");
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-8 h-full">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold mb-2">Post Request</h3>
          <p className="text-gray-600">Get quotes from multiple workers</p>
        </div>

        <div className="space-y-4">
          <Select onValueChange={setServiceType}>
            <SelectTrigger className="h-12 text-sm">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              {serviceCategories.map((service) => (
                <SelectItem key={service.name} value={service.name}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Describe your problem in detail"
            className="text-sm"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <MapInput setLocationData={setLocationData} />
          <div className="flex items-center gap-3">
            <Select onValueChange={setUrgency}>
              <SelectTrigger className="h-12 text-sm flex-1">
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Emergency</SelectItem>
                <SelectItem value="normal">Standard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button
            type="submit"
            className="w-full h-12 rounded-md bg-blue text-white font-bold whitespace-nowrap cursor-pointer"
          >
            Submit Request
          </button>
        </div>
      </Card>
    </form>
  );
}

export default RequestPostForm;
