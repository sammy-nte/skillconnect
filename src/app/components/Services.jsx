"use client";

import ServiceCard from "./ServiceCard";
import * as motion from "motion/react-client";
import {
  CarpentrySVG,
  CleaningSVG,
  ElectricSVG,
  HVACSVG,
  LandscapingSVG,
  PaintingSVG,
  PlumbingSVG,
  ToolsSVG,
} from "./Svg";
import { stagger } from "motion";

function Services() {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.3),
        duration: 0.5,
        delay: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="container mt-20"
    >
      <h2 className="text-center font-bold text-3xl text-gray-700">
        Popular Services
      </h2>
      <p className="text-center text-xl text-gray-500">
        Choose from our wide range of professional services
      </p>
      <motion.div
        variants={list}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true}}
        className="grid grid-cols-4 gap-5 my-7"
      >
        <ServiceCard title="Plumbing" icon={<PlumbingSVG />} flipColor={true} />
        <ServiceCard
          title="Carpentry"
          icon={<CarpentrySVG />}
          flipColor={false}
        />
        <ServiceCard title="Painting" icon={<PaintingSVG />} flipColor={true} />
        <ServiceCard
          title="Cleaning"
          icon={<CleaningSVG />}
          flipColor={false}
        />
        <ServiceCard
          title="Landscaping"
          icon={<LandscapingSVG />}
          flipColor={false}
        />
        <ServiceCard
          title="Electrical"
          icon={<ElectricSVG />}
          flipColor={true}
        />
        <ServiceCard title="HVAC" icon={<HVACSVG />} flipColor={false} />
        <ServiceCard
          title="Appliance Repair"
          icon={<ToolsSVG />}
          flipColor={true}
        />
      </motion.div>
    </motion.section>
  );
}

export default Services;
