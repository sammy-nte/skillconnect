import clsx from "clsx";
import Link from "next/link";
import * as motion from "motion/react-client";
import { stagger } from "motion";

export default function ServiceCard({ title, link, icon, flipColor }) {
  const item = {
    visible: { opacity: 1, y: 0, transition: {duration: .3} },
    hidden: { opacity: 0, y: 10 },
  };
  return (
    <Link href={`/${link}`}>
      <motion.div
        variants={item}
        className={clsx(
          "border border-gray-300 rounded-md flex flex-col items-center gap-2 justify-evenly py-5 transition-all",
          flipColor ? "hover:bg-[#5EABB2]/60" : "hover:bg-[#E46A5D]/60"
        )}
      >
        {icon}
        <p className="font-bold text-gray-700">{title}</p>
      </motion.div>
    </Link>
  );
}
