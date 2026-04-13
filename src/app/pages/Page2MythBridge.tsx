import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Navigation } from "../components/Navigation";
const mythBridgeImage = "/images/mythBridgeImage.png";
const mythBridgeImageAlt = "/images/mythBridgeImageAlt.png";

const poems = [
  {
    text: "柔情似水，佳期如梦，忍顾鹊桥归路",
    author: "秦观《鹊桥仙》",
  },
  {
    text: "星桥鹊驾，经年才见，想离情、别恨难穷",
    author: "李清照《行香子·七夕》",
  },
  {
    text: "喜鹊填河仙浪浅，云軿早在星桥畔",
    author: "欧阳修《渔家傲·七夕》",
  },
  {
    text: "天河渐近鹊桥时，一夜风吹斗柄移",
    author: "陆游《新秋》",
  },
  {
    text: "喜鹊桥成催凤驾。天为欢迟，乞与初凉夜",
    author: "晏几道《蝶恋花》",
  },
];

// Floating Star Particles Component
function FloatingStars({ count = 50 }: { count?: number }) {
  const [stars, setStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const newStars = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2, // 增大尺寸: 2-6px
      duration: Math.random() * 5 + 5, // 加快速度: 5-10秒
      delay: Math.random() * 3,
      opacity: Math.random() * 0.5 + 0.4, // 增加透明度: 0.4-0.9
    }));
    setStars(newStars);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.8), 0 0 ${star.size * 6}px rgba(147, 197, 253, 0.5), 0 0 ${star.size * 10}px rgba(59, 130, 246, 0.3)`,
          }}
          animate={{
            y: [0, -60, 0], // 增加垂直移动幅度
            x: [0, Math.sin(star.id) * 40, 0], // 增加水平移动幅度
            opacity: [star.opacity, star.opacity * 0.2, star.opacity],
            scale: [1, 1.5, 1], // 增加缩放幅度
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function Page2MythBridge() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth [scroll-snap-type:y_mandatory]">
      {/* Floating Star Particles */}
      <FloatingStars count={80} />

      {/* Navigation - fixed */}
      <Navigation />

      {/* Back button - fixed */}
      <button
        onClick={() => navigate("/identity")}
        className="fixed left-8 top-24 z-50 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md transition-all hover:bg-white/20"
      >
        <ArrowLeft className="h-5 w-5 text-white" />
        <span
          className="text-sm tracking-wide text-white"
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
        >
          返回
        </span>
      </button>

      {/* Section 1: Hero with title */}
      <section className="relative flex h-screen snap-start snap-always items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: `url(${mythBridgeImage})`,
          }}
        />
        <div className="absolute inset-0 bg-black/20 transition-opacity duration-700" />

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1
            className="mb-6 text-8xl tracking-wider text-white drop-shadow-2xl"
            style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
          >
            神话之桥
          </h1>
          <p
            className="text-4xl tracking-wide text-cyan-200/90"
            style={{
              fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif",
              fontWeight: 300,
            }}
          >
            鹊桥·星桥
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => {
            const section2 = document.querySelectorAll('section')[1];
            section2?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ChevronDown className="h-10 w-10 text-white/60" />
        </motion.div>
      </section>

      {/* Section 2: Poems vertical scrolling */}
      <section className="relative flex h-screen snap-start items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${mythBridgeImageAlt})`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Scrolling poems container */}
        <div className="relative z-10 flex h-full w-full max-w-6xl flex-col justify-center overflow-hidden py-20">
          {/* Seamless scrolling poems */}
          <motion.div
            className="flex flex-col gap-8"
            animate={{
              y: [0, -1 * (poems.length * 200)],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {/* First set of poems */}
            {poems.map((poem, index) => (
              <div key={`poem-1-${index}`} className="flex min-h-[200px] flex-col items-center justify-center px-8">
                <p
                  className="mb-4 text-center text-4xl leading-relaxed tracking-wide text-white drop-shadow-lg"
                  style={{
                    fontFamily: "'Source Han Serif SC', serif",
                    fontWeight: 300,
                  }}
                >
                  「 {poem.text} 」
                </p>
                <p
                  className="text-center text-lg tracking-widest text-cyan-200/70"
                  style={{ fontFamily: "'Source Han Serif SC', serif" }}
                >
                  —— {poem.author}
                </p>
              </div>
            ))}
            {/* Second set of poems for seamless loop */}
            {poems.map((poem, index) => (
              <div key={`poem-2-${index}`} className="flex min-h-[200px] flex-col items-center justify-center px-8">
                <p
                  className="mb-4 text-center text-4xl leading-relaxed tracking-wide text-white drop-shadow-lg"
                  style={{
                    fontFamily: "'Source Han Serif SC', serif",
                    fontWeight: 300,
                  }}
                >
                  「 {poem.text} 」
                </p>
                <p
                  className="text-center text-lg tracking-widest text-cyan-200/70"
                  style={{ fontFamily: "'Source Han Serif SC', serif" }}
                >
                  —— {poem.author}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlays for fade effect */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 z-20 h-32 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-10 w-10 text-white/60" />
        </motion.div>
      </section>

      {/* Section 3: Introduction and interpretation */}
      <section className="relative flex min-h-screen snap-start items-center justify-center overflow-hidden py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${mythBridgeImageAlt})`,
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full max-w-5xl px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="mb-12 text-center text-5xl tracking-wider text-white"
              style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
            >
              神话意象
            </h2>

            <div className="space-y-8">
              {/* Magpie & Star Bridge card - Expandable */}
              <motion.div
                className="rounded-3xl border border-white/20 bg-white/10 p-10 backdrop-blur-md"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3
                  className="mb-6 text-3xl tracking-wide text-white"
                  style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                >
                  喜鹊与星桥
                </h3>

                {/* Always visible content */}
                <div
                  className="space-y-6 text-xl leading-loose tracking-wide text-white/90"
                  style={{
                    fontFamily: "'Source Han Serif SC', serif",
                    fontWeight: 300,
                  }}
                >
                  <p>鹊桥，又名乌鹊桥，是中国神话中最动人的桥。</p>
                  <p>它本非人间之桥，却成为人间最美的桥，承载着相逢与守望。</p>
                  <p>牛郎织女隔河相望，每逢七夕，群鹊衔羽成桥，使二人得以一夕相会。桥因此不再只是通行之物，而成为情感的象征。</p>
                </div>

                {/* Expandable content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mt-6 space-y-6 text-xl leading-loose tracking-wide text-white/90"
                        style={{
                          fontFamily: "'Source Han Serif SC', serif",
                          fontWeight: 300,
                        }}
                      >
                        <p>
                          宋代词人秦观在《鹊桥仙》中以此为题，写下“两情若是久长时，又岂在朝朝暮暮”。这不仅是对神话爱情的礼赞，更升华为一种超越时空的爱情观，使鹊桥成为坚贞与恒久的文化意象。
                        </p>
                        <p>
                          “星桥”亦为鹊桥的别称。北周庾信在《舟中望月》中写道：“天汉看珠蚌，星桥似桂花。”宋代李清照亦言：“星桥鹊驾，经年才见。”星桥在诗词中渐渐成为离情与相思的象征。
                        </p>
                        <p>
                          有趣的是，现实中也存在着一座“星桥”——成都七星桥。王勃、李白、杜甫皆曾于诗文中提及。神话与现实在此交汇：一座桥既横跨星河，也横跨人间。
                        </p>
                        <p>
                          鹊桥因此成为一种超越物质形制的存在——它是连接天地的桥，也是连接情感与记忆的桥。
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expand/Collapse button */}
                <div className="mt-8 flex items-center justify-center">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 transition-all hover:bg-white/15"
                  >
                    <span
                      className="text-lg tracking-wide text-white"
                      style={{ fontFamily: "'Source Han Serif SC', serif" }}
                    >
                      {isExpanded ? "收起" : "展开全文"}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-white" />
                    </motion.div>
                  </button>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <div className="h-1 w-24 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
                  <p
                    className="text-lg tracking-wide text-cyan-200/80"
                    style={{
                      fontFamily: "'Source Han Serif SC', serif",
                    }}
                  >
                    神话传说 · 天人合一 · 情感象征
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative mist at bottom */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/30 to-transparent" />
      </section>
    </div>
  );
}