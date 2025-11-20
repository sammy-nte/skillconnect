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

function QuickMatchForm() {
  const [serviceType, setServiceType] = useState("");
  const [locationData, setLocationData] = useState("");
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Service Type:", serviceType);
        console.log("Location Data:", locationData);
      }}
      className=""
    >
      <Card className="p-8 h-full">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold mb-2">Quick Match</h3>
          <p className="text-gray-600">Find available workers instantly</p>
        </div>
        <div className="space-y-4 grow flex justify-between flex-col">
          <div>
            <Select
              value={serviceType}
              onValueChange={(val) => {
                setServiceType(val);
              }}
            >
              <SelectTrigger className="h-12 text-sm mb-3">
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
            <MapInput setLocationData={setLocationData} />
          </div>
          <button className="w-full h-12 rounded-md bg-orange text-white font-bold whitespace-nowrap cursor-pointer">
            Find Workers Now
          </button>
        </div>
      </Card>
    </form>
  );
}

export default QuickMatchForm;
