"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HomeInput() {
  const [location, setLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const serviceCategories = [
    {
      name: "Plumbing",
      icon: "fas fa-wrench",
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Electrical",
      icon: "fas fa-bolt",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      name: "Carpentry",
      icon: "fas fa-hammer",
      color: "bg-amber-100 text-amber-600",
    },
    {
      name: "Cleaning",
      icon: "fas fa-broom",
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Painting",
      icon: "fas fa-paint-roller",
      color: "bg-purple-100 text-purple-600",
    },
    { name: "HVAC", icon: "fas fa-fan", color: "bg-cyan-100 text-cyan-600" },
    {
      name: "Appliance Repair",
      icon: "fas fa-tools",
      color: "bg-red-100 text-red-600",
    },
    {
      name: "Landscaping",
      icon: "fas fa-leaf",
      color: "bg-emerald-100 text-emerald-600",
    },
  ];
  return (
    <div className="bg-white p-2 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <input
            placeholder="Enter your location"
            className="py-1 rounded-sm pl-2 text-sm border-2 border-gray-300"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="h-12 text-sm border-gray-300">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              {serviceCategories.map((service) => (
                <SelectItem
                  key={service.name}
                  value={service.name.toLowerCase()}
                >
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <button className="h-12 px-8 whitespace-nowrap bg-[#E46A5D] rounded-sm text-white cursor-pointer">
          Find Workers
        </button>
      </div>
    </div>
  );
}
