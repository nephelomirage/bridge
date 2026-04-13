import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Home } from "lucide-react";
import { Navigation } from "../components/Navigation";

interface BridgeStructure {
  id: string;
  name: string;
  nameEn: string;
  characteristics: string;
  keywords: string[];
}

interface Imagery {
  id: string;
  text: string;
  textEn: string;
}

const structures: BridgeStructure[] = [
  {
    id: "arch",
    name: "拱桥",
    nameEn: "Arch Bridge",
    characteristics: "圆弧形态 · 承重均衡 · 永恒象征",
    keywords: ["永恒", "连接", "跨越"],
  },
  {
    id: "beam",
    name: "木桥",
    nameEn: "Wooden Bridge",
    characteristics: "平直结构 · 简洁朴素 · 临时过渡",
    keywords: ["过渡", "边界", "送别"],
  },
  {
    id: "pontoon",
    name: "浮桥",
    nameEn: "Pontoon Bridge",
    characteristics: "水上漂浮 · 灵活移动 · 随波起伏",
    keywords: ["流动", "过渡", "边界"],
  },
];

const imageries: Imagery[] = [
  { id: "transition", text: "过渡", textEn: "Transition" },
  { id: "boundary", text: "边界", textEn: "Boundary" },
  { id: "connection", text: "连接", textEn: "Connection" },
  { id: "eternity", text: "永恒", textEn: "Eternity" },
];

export function Page4StructureAndImagery() {
  const navigate = useNavigate();
  const [selectedStructure, setSelectedStructure] = useState<string | null>(
    null
  );
  const [hoveredImagery, setHoveredImagery] = useState<string | null>(null);

  const getConnectionOpacity = (
    structureId: string,
    imageryText: string
  ): number => {
    const structure = structures.find((s) => s.id === structureId);
    if (!structure) return 0;

    const isConnected = structure.keywords.includes(imageryText);
    if (selectedStructure === structureId && isConnected) return 0.8;
    if (selectedStructure === structureId) return 0.1;
    if (isConnected && !selectedStructure) return 0.3;
    return 0.05;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
      {/* Animated cool-tone background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 30% 40%, rgba(6, 182, 212, 0.2) 0%, transparent 60%)",
            "radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)",
            "radial-gradient(circle at 30% 40%, rgba(6, 182, 212, 0.2) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 py-20">
        {/* Title */}
        <motion.h2
          className="mb-4 text-5xl tracking-wider text-white"
          style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          桥梁形制与诗歌意象
        </motion.h2>

        <motion.p
          className="mb-20 text-lg tracking-wide text-cyan-200/80"
          style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          结构之美与意象之深的对话
        </motion.p>

        {/* Main visualization */}
        <div className="relative w-full max-w-6xl">
          <div className="grid grid-cols-2 gap-32">
            {/* Left: Bridge structures */}
            <div className="space-y-8">
              <h3
                className="mb-12 text-center text-2xl tracking-wider text-cyan-300"
                style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
              >
                桥梁形制
              </h3>

              {structures.map((structure, index) => (
                <motion.div
                  key={structure.id}
                  className="group relative cursor-pointer"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  onClick={() =>
                    setSelectedStructure(
                      selectedStructure === structure.id ? null : structure.id
                    )
                  }
                >
                  {/* Card */}
                  <div
                    className={`relative overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition-all ${
                      selectedStructure === structure.id
                        ? "border-cyan-400 bg-cyan-500/20"
                        : "border-white/20 bg-white/5 hover:border-cyan-300/50 hover:bg-white/10"
                    }`}
                  >
                    {/* Bridge illustration */}
                    <div className="mb-4 flex h-24 items-center justify-center">
                      {structure.id === "arch" && (
                        <svg width="160" height="80" viewBox="0 0 160 80">
                          <path
                            d="M 20 60 Q 80 10, 140 60"
                            stroke="rgb(34, 211, 238)"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 20 65 L 140 65"
                            stroke="rgb(34, 211, 238)"
                            strokeWidth="2"
                            fill="none"
                            opacity="0.5"
                          />
                          {[40, 60, 80, 100, 120].map((x) => (
                            <line
                              key={x}
                              x1={x}
                              y1={65 - (Math.abs(80 - x) / 60) * 50}
                              x2={x}
                              y2="65"
                              stroke="rgb(34, 211, 238)"
                              strokeWidth="1.5"
                              opacity="0.4"
                            />
                          ))}
                        </svg>
                      )}
                      {structure.id === "beam" && (
                        <svg width="160" height="80" viewBox="0 0 160 80">
                          <rect
                            x="20"
                            y="40"
                            width="120"
                            height="4"
                            fill="rgb(34, 211, 238)"
                          />
                          <rect
                            x="20"
                            y="45"
                            width="120"
                            height="2"
                            fill="rgb(34, 211, 238)"
                            opacity="0.5"
                          />
                          {[40, 80, 120].map((x) => (
                            <rect
                              key={x}
                              x={x - 2}
                              y="48"
                              width="4"
                              height="20"
                              fill="rgb(34, 211, 238)"
                              opacity="0.6"
                            />
                          ))}
                        </svg>
                      )}
                      {structure.id === "pontoon" && (
                        <svg width="160" height="80" viewBox="0 0 160 80">
                          <path
                            d="M 20 35 Q 50 30, 80 35 T 140 35"
                            stroke="rgb(34, 211, 238)"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 20 45 Q 50 50, 80 45 T 140 45"
                            stroke="rgb(34, 211, 238)"
                            strokeWidth="1.5"
                            fill="none"
                            opacity="0.3"
                          />
                          {[30, 60, 90, 120].map((x, i) => (
                            <ellipse
                              key={x}
                              cx={x}
                              cy={55 + (i % 2) * 3}
                              rx="8"
                              ry="6"
                              fill="rgb(34, 211, 238)"
                              opacity="0.5"
                            />
                          ))}
                        </svg>
                      )}
                    </div>

                    {/* Title */}
                    <h4
                      className="mb-1 text-center text-2xl tracking-wide text-white"
                      style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                    >
                      {structure.name}
                    </h4>
                    <p
                      className="mb-3 text-center text-sm tracking-wider text-cyan-200/60"
                      style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                    >
                      {structure.nameEn}
                    </p>

                    {/* Characteristics */}
                    <p
                      className="text-center text-sm leading-relaxed tracking-wide text-white/70"
                      style={{
                        fontFamily: "'Noto Sans SC', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {structure.characteristics}
                    </p>

                    {/* Selection indicator */}
                    {selectedStructure === structure.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                        layoutId="structure-indicator"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Imageries */}
            <div className="space-y-8">
              <h3
                className="mb-12 text-center text-2xl tracking-wider text-pink-300"
                style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
              >
                诗歌意象
              </h3>

              {imageries.map((imagery, index) => {
                const isHighlighted = selectedStructure
                  ? structures
                      .find((s) => s.id === selectedStructure)
                      ?.keywords.includes(imagery.text)
                  : false;

                return (
                  <motion.div
                    key={imagery.id}
                    className="relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    onMouseEnter={() => setHoveredImagery(imagery.id)}
                    onMouseLeave={() => setHoveredImagery(null)}
                  >
                    {/* Card */}
                    <div
                      className={`relative overflow-hidden rounded-2xl border p-8 text-center backdrop-blur-md transition-all ${
                        isHighlighted
                          ? "border-pink-400 bg-pink-500/20"
                          : "border-white/20 bg-white/5 hover:border-pink-300/50 hover:bg-white/10"
                      }`}
                    >
                      <h4
                        className="mb-2 text-3xl tracking-widest text-white"
                        style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                      >
                        {imagery.text}
                      </h4>
                      <p
                        className="text-sm tracking-wider text-pink-200/60"
                        style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                      >
                        {imagery.textEn}
                      </p>

                      {/* Glow effect when highlighted */}
                      {isHighlighted && (
                        <motion.div
                          className="absolute -inset-1 -z-10 rounded-2xl bg-pink-500/30 blur-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Connection lines */}
          <svg
            className="pointer-events-none absolute left-0 top-0 h-full w-full"
            style={{ zIndex: -1 }}
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(34, 211, 238)" />
                <stop offset="100%" stopColor="rgb(236, 72, 153)" />
              </linearGradient>
            </defs>
            {structures.map((structure, sIndex) => {
              return imageries.map((imagery, iIndex) => {
                const isConnected =
                  structure.keywords.includes(imagery.text);
                if (!isConnected) return null;

                const x1 = "45%";
                const y1 = `${20 + sIndex * 33}%`;
                const x2 = "55%";
                const y2 = `${20 + iIndex * 25}%`;

                return (
                  <motion.line
                    key={`${structure.id}-${imagery.id}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#lineGrad)"
                    strokeWidth="2"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{
                      opacity: getConnectionOpacity(structure.id, imagery.text),
                      pathLength: 1,
                    }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                );
              });
            })}
          </svg>
        </div>

        {/* Instruction */}
        <motion.p
          className="mt-16 text-sm tracking-wide text-white/50"
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          点击桥梁形制查看与意象的关联
        </motion.p>
      </div>
    </div>
  );
}