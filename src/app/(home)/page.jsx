

import Image from "next/image";
import HomeInput from "../components/HomeInput";
import * as motion from "motion/react-client";
import Works from "../components/Works";
import Services from "../components/Services";
import { trustFeatures, serviceCategories } from "../data/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Card} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";


export default function Home() {

  return (
    <motion.section layoutScroll>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
        className="relative bg-linear-to-r from-blue-50 to-indigo-100 py-24"
        style={{
          backgroundImage: `url(/images/home-banner.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/70 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}
          className="relative container px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Find Skilled Workers Near You
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with verified professionals for all your home service
                needs. From plumbing to electrical work, get matched with
                trusted workers in your area instantly.
              </p>
              <HomeInput />
            </div>
          </div>
        </motion.div>
      </motion.section>
      <Services />
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-20 bg-gray-100/70 py-10"
      >
        <h2 className="text-center font-bold text-3xl">
          How SkillConnect Works{" "}
        </h2>
        <p className="text-center text-xl text-gray-500">
          Choose the method that works best for you
        </p>
        <Works />
      </motion.section>
      <section className="py-16 bg-white mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
            <p className="text-lg text-gray-600">
              Choose your preferred way to connect with skilled workers
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">Quick Match</h3>
                <p className="text-gray-600">
                  Find available workers instantly
                </p>
              </div>
              <div className="space-y-4 grow flex justify-between flex-col">
                <div>
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
                  <Input
                    placeholder="Enter your location"
                    className="h-12 text-sm mt-5"
                  />
                </div>
                <a
                  href="#"
                  data-readdy="true"
                >
                  <button className="w-full h-12 rounded-md bg-orange text-white font-bold whitespace-nowrap cursor-pointer">
                    Find Workers Now
                  </button>
                </a>
              </div>
            </Card>
            <Card className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">Post Request</h3>
                <p className="text-gray-600">
                  Get quotes from multiple workers
                </p>
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
                <Input
                  placeholder="Enter your location"
                  className="h-12 text-sm"
                />
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
          </div>
        </div>
      </section>
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-100/70 mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SkillConnect</h2>
            <p className="text-lg text-gray-600">
              Your safety and satisfaction are our top priorities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.section>
  );
}
