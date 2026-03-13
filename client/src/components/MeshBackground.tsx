import { motion } from "framer-motion";

const MeshBackground = () => {
  return (
    <div className="mesh-gradient">
      <motion.div
        className="mesh-blob bg-primary/20"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ top: "10%", left: "10%" }}
      />
      <motion.div
        className="mesh-blob bg-blue-500/10"
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, 50, 0],
          scale: [1, 1.1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ bottom: "10%", right: "10%" }}
      />
      <motion.div
        className="mesh-blob bg-purple-500/10"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.5, 1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ top: "40%", left: "40%" }}
      />
    </div>
  );
};

export default MeshBackground;
