"use client";
import { useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

export default function Works() {
  const options = ["Quick Match", "Post Request"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  return (
    <div className="container">
      <div className="flex gap-4 justify-between max-w-[600px] rounded-sm ml-auto mr-auto mt-5 bg-gray-200/70 px-2 py-2">
        {options.map((item) => (
          <motion.div
            layout
            key={item}
            initial={false}
            animate={{
              backgroundColor:
                item === selectedOption ? "#E46A5D" : "transparent",
              color: item === selectedOption ? "white" : "black",
            }}
            onClick={() => setSelectedOption(item)}
            className="px-4 py-2 w-2/4 rounded-sm text-center text-white font-bold cursor-pointer"
          >
            <p>{item}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedOption ? selectedOption : "none"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedOption === "Quick Match" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <WorkOptions
                  title="Select Service Type"
                  text="Choose your needed service and enter your location to find available workers nearby."
                  stepNumber={1}
                />
                <WorkOptions
                  title="Get Connected"
                  text=" View available workers nearby, check their profiles and ratings, then contact directly."
                  stepNumber={2}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <WorkOptions
                  title="Post Your Request"
                  text="Describe your problem, location, and preferred timing for the service."
                  stepNumber={1}
                />
                <WorkOptions
                  title="Get Matched"
                  text="Receive quotes and proposals from nearby qualified professionals."
                  stepNumber={2}
                />
                <WorkOptions
                  title="Choose & Book"
                  text="Select the best worker based on price, reviews, and availability, then schedule your service."
                  stepNumber={3}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function WorkOptions({ title, text, stepNumber }) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-[#E46A5D]/80 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-2xl font-bold text-white">{stepNumber}</span>
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
