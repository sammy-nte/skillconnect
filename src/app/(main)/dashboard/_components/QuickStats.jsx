"use client";
import { stagger } from "motion";
import QuickStatsCard from "./QuickStatsCard";
import {
  CalendarCheck,
  CalendarClock,
  MessageSquareHeart,
  SquareCheck,
} from "lucide-react";
import * as motion from "motion/react-client";

function QuickStats({completed, pending}) {
  const quickStart = {
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

  const total = pending + completed
  return (
    <motion.div
      variants={quickStart}
      whileInView="visible"
      viewport={{ once: true }}
      initial="hidden"
      className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
    >
      <QuickStatsCard
        title="Total Bookings"
        number={total}
        icon={<CalendarCheck />}
      />
      <QuickStatsCard title="Completed" number={completed} icon={<SquareCheck />} />
      <QuickStatsCard title="Pending" number={pending} icon={<CalendarClock />} />
      <QuickStatsCard
        title="Avg Rating"
        number={4.8}
        icon={<MessageSquareHeart />}
      />
    </motion.div>
  );
}

export default QuickStats;
