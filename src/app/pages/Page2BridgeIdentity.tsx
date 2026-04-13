import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Navigation } from "../components/Navigation";
const backgroundImage = "/images/backgroundImage.png";
const mythBridgeImage = "/images/mythBridgeImage.png";
const poetryBridgeImage = "/images/poetryBridgeImage.png";
const structureBridgeImage = "/images/structureBridgeImage.png";

interface BridgeType {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  poem: string;
  poemAuthor: string;
  description: string;
  structure: string;
  image: string;
}

const bridges: BridgeType[] = [
  {
    id: "myth",
    title: "神话之桥",
    subtitle: "鹊桥",
    color: "from-pink-500 to-rose-600",
    bgColor: "from-pink-600/30 via-purple-600/30 to-rose-800/30",
    poem: "两情若是久长时，又岂在朝朝暮暮",
    poemAuthor: "秦观《鹊桥仙》",
    description:
      "鹊桥作为神话意象，象征着跨越天河的相思与重逢。它不仅是物理空间的连接，更是情感与信仰的桥梁。",
    structure: "虚构形态 · 天象投影 · 情感象征",
    image: mythBridgeImage,
  },
  {
    id: "poetry",
    title: "诗意之桥",
    subtitle: "二十四桥 · 灞陵桥",
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-600/30 via-pink-600/30 to-rose-800/30",
    poem: "二十四桥明月夜，玉人何处教吹箫",
    poemAuthor: "杜牧《寄扬州韩绰判官》",
    description:
      "历史名桥承载着朝代更替、人文记忆与离别情怀。它们是时间的见证者，在诗人笔下化为永恒的文化符号。",
    structure: "木石结构 · 地域标识 · 文化记忆",
    image: poetryBridgeImage,
  },
  {
    id: "structure",
    title: "结构之桥",
    subtitle: "中国四大名桥",
    color: "from-cyan-500 to-blue-600",
    bgColor: "from-cyan-600/30 via-blue-600/30 to-indigo-800/30",
    poem: "水从碧玉环中过，人在苍龙背上行",
    poemAuthor: "民间咏赵州桥",
    description:
      "工程之桥以其精湛的建筑技艺著称，体现了古代中国的科技智慧。拱券结构与力学美学在此达到完美统一。",
    structure: "石拱结构 · 力学智慧 · 永恒象征",
    image: structureBridgeImage,
  },
];

export function Page2BridgeIdentity() {
  const navigate = useNavigate();

  const handleBridgeClick = (bridgeId: string) => {
    navigate(`/identity/${bridgeId}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <div className="absolute inset-0 bg-black/10" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 py-20">
        {/* Title */}
        <motion.h2
          className="mb-4 tracking-wider text-white text-[64px]"
          style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          桥的三重身份
        </motion.h2>

        <motion.p
          className="mb-16 tracking-wide text-cyan-200/80 text-[24px]"
          style={{ fontFamily: "'XiangcuiChaoxisong'", fontWeight: 300 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          神话 · 诗意 · 结构
        </motion.p>

        {/* Bridge cards */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 lg:gap-20">
          {bridges.map((bridge, index) => (
            <motion.div
              key={bridge.id}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => handleBridgeClick(bridge.id)}
            >
              {/* Card glow */}
              <div
                className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${bridge.color} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60`}
              />

              {/* Card content */}
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 px-8 pt-8 pb-6 backdrop-blur-md transition-all duration-500 group-hover:bg-white/10">
                {/* Bridge icon/illustration */}
                <div className="mb-6 flex h-56 items-center justify-center">
                  {/* Circular image with mask */}
                  <div
                    className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white/30 shadow-2xl transition-all duration-500 group-hover:border-white/50 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  >
                    <img
                      src={bridge.image}
                      alt={bridge.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${bridge.bgColor} opacity-20 transition-opacity duration-500 group-hover:opacity-10`}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="mb-2 text-center text-2xl tracking-wide text-white"
                  style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                >
                  {bridge.title}
                </h3>

                {/* Subtitle */}
                <p
                  className="mb-8 text-center text-xl tracking-wider text-cyan-200/70"
                  style={{
                    fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif",
                    fontWeight: 300,
                  }}
                >
                  {bridge.subtitle}
                </p>

                {/* Decorative element */}
                <div
                  className={`mx-auto h-1 w-16 rounded-full bg-gradient-to-r ${bridge.color}`}
                />

                {/* Hover hint */}
                <p
                  className="mt-6 text-center text-sm tracking-wide text-white/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                >
                  点击了解更多
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative mist at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white/20 to-transparent" />
    </div>
  );
}