import * as motion from "motion/react-client";

function Loader({ loaderText }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="h-[600px] grid place-content-center"
    >
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
        <h2 className="text-zinc-900 dark:text-white mt-4 font-bold">
          {loaderText}
        </h2>
      </div>
    </motion.div>
  );
}

export default Loader;
