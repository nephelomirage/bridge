import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
const icon1 = "/images/icon1.png";
const icon2 = "/images/icon2.png";
const bgImage = "/images/bgImage.png";
import { Navigation } from "../components/Navigation";

// Floating poems
const poems = [
  "二十四桥明月夜，玉人何处教吹箫",
  "柔情似水，佳期如梦，忍顾鹊桥归路",
  "鸡声茅店月，人迹板桥霜",
  "耶娘妻子走相送，尘埃不见咸阳桥",
  "枯藤老树昏鸦，小桥流水人家",
  "驿外断桥边，寂寞开无主",
];

export function Page1Cover() {
  const navigate = useNavigate();
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);

  // Rotate poems
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoemIndex((prev) => (prev + 1) % poems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-y-auto">
      {/* Background image */}
      <div
        className="fixed inset-0 bg-cover"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "56% center"
        }}
      />

      {/* Subtle overlay */}
      <div className="fixed inset-0 bg-black/5" />

      {/* Floating poems background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPoemIndex}
            className="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-5xl font-light tracking-widest text-white/30"
            style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -50 }}
            transition={{ duration: 2 }}
          >
            {poems[currentPoemIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center px-8 py-20 pb-32">
        {/* Title section with mixed fonts */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ marginTop: "22vh" }}
        >
          {/* Main title - 桥见千年 with different fonts for each character */}
          <div className="mb-3 flex items-center justify-center gap-0">
            <span
              className="text-white"
              style={{
                fontFamily: "'PangMenZhengDao-Cu6.0', 'Noto Serif SC', serif",
                fontSize: "230px",
                lineHeight: 1,
                textShadow: "3px 3px 10px rgba(0, 0, 0, 0.4)"
              }}
            >
              桥
            </span>
            <span
              className="text-white"
              style={{
                fontFamily: "'HYChengXingJ', 'Noto Serif SC', serif",
                fontSize: "145px",
                lineHeight: 1,
                textShadow: "3px 3px 10px rgba(0, 0, 0, 0.4)"
              }}
            >
              见
            </span>
            <span
              className="text-white"
              style={{
                fontFamily: "'AaTaoHuaShan', 'Noto Serif SC', serif",
                fontSize: "210px",
                lineHeight: 1,
                textShadow: "3px 3px 10px rgba(0, 0, 0, 0.4)"
              }}
            >
              千
            </span>
            <span
              className="text-white"
              style={{
                fontFamily: "'HYChengXingJ', 'Noto Serif SC', serif",
                fontSize: "160px",
                lineHeight: 1,
                textShadow: "3px 3px 10px rgba(0, 0, 0, 0.4)"
              }}
            >
              年
            </span>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-white"
            style={{
              fontFamily: "'Source Han Serif SC', 'Noto Serif SC', serif",
              fontSize: "60px",
              letterSpacing: "-0.02em",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            中国古代桥梁的文化与精神图谱
          </motion.p>
        </motion.div>

        {/* Navigation cards */}
        <div className="mb-16 mt-20 flex items-center gap-32">
          {/* Left icon - 三重身份 */}
          <motion.div
            className="group relative cursor-pointer"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.15, y: -10 }}
            onClick={() => navigate("/identity")}
          >
            {/* Icon without glass border */}
            <div className="relative mb-6 transition-all duration-300 group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]">
              <img src={icon1} alt="三重身份" className="h-64 w-64 drop-shadow-2xl" />
            </div>
            <div
              className="rounded-lg border border-white/40 bg-white/10 px-4 py-2 text-center backdrop-blur-sm transition-all group-hover:border-white/60 group-hover:bg-white/20"
            >
              <p
                className="tracking-wider text-white"
                style={{
                  fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif",
                  fontSize: "40px",
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
                  transform: "scaleX(1.3)"
                }}
              >
                三重身份
              </p>
            </div>
          </motion.div>

          {/* Center - 探索 进入 button (two columns vertical text, right to left) */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.button
              className="group relative overflow-hidden rounded-full bg-white/10 px-6 py-5 backdrop-blur-md transition-all hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/identity")}
            >
              <div className="relative z-10 flex gap-1">
                <span
                  className="block text-white"
                  style={{
                    fontFamily: "'XiangcuiChaoxisong', 'Noto Serif SC', serif",
                    fontSize: "60px",
                    writingMode: "vertical-rl",
                    letterSpacing: "-0.1em",
                    lineHeight: 1.8,
                    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
                    fontWeight: 500,
                    transform: "scaleX(1.3)"
                  }}
                >
                  探索
                </span>
                <span
                  className="block text-white"
                  style={{
                    fontFamily: "'XiangcuiChaoxisong', 'Noto Serif SC', serif",
                    fontSize: "60px",
                    writingMode: "vertical-rl",
                    letterSpacing: "-0.1em",
                    lineHeight: 1.8,
                    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
                    fontWeight: 500,
                    transform: "scaleX(1.3)"
                  }}
                >
                  进入
                </span>
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-pink-400/20"
                initial={{ y: "-100%" }}
                whileHover={{ y: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>

          {/* Right icon - 文化意蕴 */}
          <motion.div
            className="group relative cursor-pointer"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.15, y: -10 }}
            onClick={() => navigate("/cultural-meaning")}
          >
            {/* Icon without glass border */}
            <div className="relative mb-6 transition-all duration-300 group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]">
              <img src={icon2} alt="文化意蕴" className="h-64 w-64 drop-shadow-2xl" />
            </div>
            <div
              className="rounded-lg border border-white/40 bg-white/10 px-4 py-2 text-center backdrop-blur-sm transition-all group-hover:border-white/60 group-hover:bg-white/20"
            >
              <p
                className="tracking-wider text-white"
                style={{
                  fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif",
                  fontSize: "40px",
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
                  transform: "scaleX(1.3)"
                }}
              >
                文化意蕴
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom hint text */}
        <motion.p
          className="mt-8 text-sm tracking-widest text-white/60"
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          点击图标探索桥梁的文化内涵
        </motion.p>
      </div>

      {/* Mist effect at bottom */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-white/10 to-transparent" />

      <Navigation />
    </div>
  );
}