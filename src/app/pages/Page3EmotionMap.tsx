import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Navigation } from "../components/Navigation";

interface Emotion {
  id: string;
  name: string;
  color: string;
  angle: number;
  poems: Array<{
    text: string;
    author: string;
    bridge: string;
  }>;
}

const emotions: Emotion[] = [
  {
    id: "farewell",
    name: "送别",
    color: "#f59e0b",
    angle: 0,
    poems: [
      {
        text: "渭城朝雨浥轻尘，客舍青青柳色新",
        author: "王维《送元二使安西》",
        bridge: "渭城桥 · 木桥",
      },
      {
        text: "寒雨连江夜入吴，平明送客楚山孤",
        author: "王昌龄《芙蓉楼送辛渐》",
        bridge: "江桥 · 木桥",
      },
      {
        text: "故人西辞黄鹤楼，烟花三月下扬州",
        author: "李白《送孟浩然之广陵》",
        bridge: "码头栈桥 · 木结构",
      },
    ],
  },
  {
    id: "reunion",
    name: "相逢",
    color: "#ec4899",
    angle: 120,
    poems: [
      {
        text: "两情若是久长时，又岂在朝朝暮暮",
        author: "秦观《鹊桥仙》",
        bridge: "鹊桥 · 神话意象",
      },
      {
        text: "金风玉露一相逢，便胜却人间无数",
        author: "秦观《鹊桥仙》",
        bridge: "鹊桥 · 神话意象",
      },
      {
        text: "相逢桥上无相识，独倚栏干看落晖",
        author: "白居易",
        bridge: "城市桥梁 · 石桥",
      },
    ],
  },
  {
    id: "nostalgia",
    name: "思乡",
    color: "#06b6d4",
    angle: 240,
    poems: [
      {
        text: "君自故乡来，应知故乡事",
        author: "王维《杂诗》",
        bridge: "故乡桥 · 木石桥",
      },
      {
        text: "二十四桥明月夜，玉人何处教吹箫",
        author: "杜牧《寄扬州韩绰判官》",
        bridge: "二十四桥 · 历史名桥",
      },
      {
        text: "洛阳亲友如相问，一片冰心在玉壶",
        author: "王昌龄《芙蓉楼送辛渐》",
        bridge: "洛阳桥 · 石拱桥",
      },
    ],
  },
];

export function Page3EmotionMap() {
  const navigate = useNavigate();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
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
          桥的情绪图谱
        </motion.h2>

        <motion.p
          className="mb-20 text-lg tracking-wide text-cyan-200/80"
          style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          探索诗歌中桥梁的情感维度
        </motion.p>

        {/* Circular emotion map */}
        <div className="relative">
          {/* Center circle - "Bridge" */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-md">
              <p
                className="text-3xl tracking-widest text-white"
                style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
              >
                桥
              </p>
            </div>
          </motion.div>

          {/* Emotion nodes */}
          {emotions.map((emotion, index) => {
            const radius = 280;
            const angleInRadians = (emotion.angle * Math.PI) / 180;
            const x = Math.cos(angleInRadians) * radius;
            const y = Math.sin(angleInRadians) * radius;

            return (
              <motion.div
                key={emotion.id}
                className="absolute left-1/2 top-1/2 cursor-pointer"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                onMouseEnter={() => setHoveredEmotion(emotion.id)}
                onMouseLeave={() => setHoveredEmotion(null)}
                onClick={() => setSelectedEmotion(emotion)}
              >
                {/* Connecting line */}
                <svg
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10"
                  style={{
                    width: `${radius + 100}px`,
                    height: `${radius + 100}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${x}px)`}
                    y2={`calc(50% + ${y}px)`}
                    stroke={emotion.color}
                    strokeWidth={hoveredEmotion === emotion.id ? "3" : "1.5"}
                    opacity={hoveredEmotion === emotion.id ? "0.8" : "0.3"}
                    strokeDasharray="5,5"
                  />
                </svg>

                {/* Node glow */}
                <motion.div
                  className="absolute -inset-4 rounded-full blur-xl"
                  style={{ backgroundColor: emotion.color }}
                  animate={{
                    opacity: hoveredEmotion === emotion.id ? 0.6 : 0.3,
                  }}
                />

                {/* Node */}
                <motion.div
                  className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 bg-white/10 backdrop-blur-md"
                  style={{ borderColor: emotion.color }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <p
                    className="text-2xl tracking-widest text-white"
                    style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                  >
                    {emotion.name}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Instruction */}
        <motion.p
          className="mt-32 text-sm tracking-wide text-white/50"
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          点击情绪节点查看相关诗句
        </motion.p>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedEmotion && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEmotion(null)}
          >
            <motion.div
              className="relative mx-8 max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-gray-900/95 to-gray-800/95 p-12 shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background accent */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at top right, ${selectedEmotion.color}40 0%, transparent 60%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Title */}
                <div className="mb-8 flex items-center gap-4">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: selectedEmotion.color }}
                  />
                  <h3
                    className="text-4xl tracking-wider text-white"
                    style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                  >
                    {selectedEmotion.name}
                  </h3>
                </div>

                {/* Poems */}
                <div className="space-y-6">
                  {selectedEmotion.poems.map((poem, index) => (
                    <motion.div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <p
                        className="mb-3 text-xl leading-relaxed tracking-wide text-white"
                        style={{
                          fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif",
                          fontWeight: 300,
                        }}
                      >
                        「 {poem.text} 」
                      </p>
                      <div className="flex items-center justify-between">
                        <p
                          className="text-sm tracking-wide text-cyan-200/60"
                          style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                        >
                          {poem.author}
                        </p>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-1 w-8 rounded-full"
                            style={{ backgroundColor: selectedEmotion.color }}
                          />
                          <p
                            className="text-sm tracking-wide text-white/70"
                            style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                          >
                            {poem.bridge}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Close button */}
                <button
                  onClick={() => setSelectedEmotion(null)}
                  className="mt-8 w-full rounded-full border border-white/20 bg-white/10 py-3 tracking-wide text-white transition-all hover:bg-white/20"
                  style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}