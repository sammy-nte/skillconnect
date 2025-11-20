import * as motion from "motion/react-client";

function QuickStatsCard({ number, title, icon }) {
  const item = {
    visible: { opacity: 1, transition: { duration: 0.3 } },
    hidden: { opacity: 0 },
  };
  return (
    <motion.div
      variants={item}
      className="p-6 border rounded-md"
    >
      <div className="flex items-center">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{number}</h3>
          <p className="text-gray-600 text-sm">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default QuickStatsCard;
