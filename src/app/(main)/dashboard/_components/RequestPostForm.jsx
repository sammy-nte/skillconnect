"use client"

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
  return (
    <form>
      <Card className="p-8 h-full">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold mb-2">Post Request</h3>
          <p className="text-gray-600">Get quotes from multiple workers</p>
        </div>
        <div className="space-y-4">
          <Select>
            <SelectTrigger className="h-12 text-sm">
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
          <Textarea
            placeholder="Describe your problem in detail"
            className="text-sm"
            rows={3}
          />
          <MapInput />
          <div className="grid grid-cols-2 gap-4">
            <Input type="date" className="h-12 text-sm" />
            <Select>
              <SelectTrigger className="h-12 text-sm">
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button className="w-full h-12 rounded-md bg-blue text-white font-bold whitespace-nowrap cursor-pointer">
            Submit Request
          </button>
        </div>
      </Card>
    </form>
  );
}

export default RequestPostForm;
