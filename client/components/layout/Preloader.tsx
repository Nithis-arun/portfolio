import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "var(--bg-void)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Logo / initials */}
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <span
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  NT
                </span>
              </div>
            </motion.div>

            {/* Loading bar */}
            <div className="w-48 h-0.5 rounded-full overflow-hidden bg-white/5">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--accent-violet), var(--accent-cyan))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
              />
            </div>

            <motion.p
              className="text-xs text-white/30 tracking-[0.3em] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
