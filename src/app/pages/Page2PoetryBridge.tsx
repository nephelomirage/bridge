import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Navigation } from "../components/Navigation";
const poetryBridgeImage = "/images/poetryBridgeImage.png";
const poetryBridgeImageAlt = "/images/poetryBridgeImageAlt.png";

const poems = [
  {
    text: "二十四桥明月夜，玉人何处教吹箫",
    author: "杜牧《寄扬州韩绰判官》",
  },
  {
    text: "二十四桥仍在，波心荡、冷月无声。",
    author: "姜夔《扬州慢》",
  },
  {
    text: "耶娘妻子走相送，尘埃不见咸阳桥",
    author: "杜甫《兵车行》",
  },
  {
    text: "咸阳桥上雨如悬，万点空蒙隔钓船。",
    author: "温庭筠《咸阳值雨》",
  },
  {
    text: "参差烟树灞陵桥，风物尽前朝。",
    author: "柳永《少年游·参差烟树灞陵桥》",
  },
  {
    text: "年年柳色，灞陵伤别",
    author: "李白《忆秦娥》",
  },
  {
    text: "灞桥烟柳，曲江池馆，应待人来",
    author: "白居易《忆江南》",
  },
];

// 水墨晕染效果组件
function InkSplash({ count = 12 }: { count?: number }) {
  const [splashes, setSplashes] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // 初始化水墨形状
    const initialSplashes = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 80, // 80-180px，适中大小
      duration: Math.random() * 3 + 4, // 4-7秒
      delay: Math.random() * 8, // 0-8秒延迟
    }));
    setSplashes(initialSplashes);

    // 定期生成新的水墨
    const interval = setInterval(() => {
      setSplashes(prev => {
        const newSplash = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 100 + 80,
          duration: Math.random() * 3 + 4,
          delay: 0,
        };
        // 保持最多count个水墨
        return [...prev.slice(-count + 1), newSplash];
      });
    }, 4000); // 每4秒生成一个新的，更频繁

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {splashes.map((splash) => (
        <motion.div
          key={splash.id}
          className="absolute"
          style={{
            left: `${splash.x}%`,
            top: `${splash.y}%`,
            width: `${splash.size}px`,
            height: `${splash.size}px`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 1.8],
            opacity: [0, 0.35, 0], // 增加最大透明度从0.15到0.35
          }}
          transition={{
            duration: splash.duration,
            delay: splash.delay,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 8,
          }}
        >
          {/* 不规则水墨形状 - 多个圆形叠加 */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
            className="absolute inset-0"
            style={{
              filter: 'blur(4px)', // 减少模糊，从8px降到4px
            }}
          >
            {/* 中心主墨团 */}
            <circle
              cx="100"
              cy="100"
              r="45"
              fill="rgba(0, 0, 0, 0.7)" // 增加透明度从0.4到0.7
            />
            {/* 随机扩散的墨点 */}
            <circle
              cx={80 + Math.sin(splash.id) * 20}
              cy={90 + Math.cos(splash.id) * 20}
              r="35"
              fill="rgba(0, 0, 0, 0.6)" // 增加透明度从0.3到0.6
            />
            <circle
              cx={120 + Math.sin(splash.id * 1.5) * 25}
              cy={110 + Math.cos(splash.id * 1.5) * 25}
              r="40"
              fill="rgba(0, 0, 0, 0.65)" // 增加透明度从0.35到0.65
            />
            <circle
              cx={100 + Math.sin(splash.id * 2) * 30}
              cy={80 + Math.cos(splash.id * 2) * 30}
              r="30"
              fill="rgba(0, 0, 0, 0.5)" // 增加透明度从0.25到0.5
            />
            <circle
              cx={110 + Math.sin(splash.id * 2.5) * 35}
              cy={120 + Math.cos(splash.id * 2.5) * 35}
              r="33"
              fill="rgba(0, 0, 0, 0.55)" // 增加透明度从0.3到0.55
            />
            {/* 边缘轻墨 */}
            <circle
              cx={70 + Math.sin(splash.id * 3) * 15}
              cy={70 + Math.cos(splash.id * 3) * 15}
              r="25"
              fill="rgba(0, 0, 0, 0.35)" // 增加透明度从0.15到0.35
            />
            <circle
              cx={130 + Math.sin(splash.id * 3.5) * 18}
              cy={130 + Math.cos(splash.id * 3.5) * 18}
              r="28"
              fill="rgba(0, 0, 0, 0.4)" // 增加透明度从0.18到0.4
            />
            <circle
              cx={90 + Math.sin(splash.id * 4) * 20}
              cy={130 + Math.cos(splash.id * 4) * 20}
              r="23"
              fill="rgba(0, 0, 0, 0.3)" // 增加透明度从0.12到0.3
            />
            <circle
              cx={130 + Math.sin(splash.id * 4.5) * 22}
              cy={90 + Math.cos(splash.id * 4.5) * 22}
              r="30"
              fill="rgba(0, 0, 0, 0.45)" // 增加透明度从0.2到0.45
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function Page2PoetryBridge() {
  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState<{
    interpretation: boolean;
    twentyfour: boolean;
    ba: boolean;
    xianyang: boolean;
  }>({
    interpretation: false,
    twentyfour: false,
    ba: false,
    xianyang: false,
  });

  const toggleCard = (card: keyof typeof expandedCards) => {
    setExpandedCards((prev) => ({
      ...prev,
      [card]: !prev[card],
    }));
  };

  return (
    <div className="relative h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/* 水墨晕染效果 */}
      <InkSplash count={12} />

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
      <section className="relative flex h-screen snap-start items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: `url(${poetryBridgeImage})`,
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
            诗意之桥
          </h1>
          <p
            className="text-4xl tracking-wide text-cyan-200/90"
            style={{
              fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif",
              fontWeight: 300,
            }}
          >
            二十四桥 · 灞陵桥
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
            backgroundImage: `url(${poetryBridgeImageAlt})`,
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
              duration: 50,
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
            backgroundImage: `url(${poetryBridgeImageAlt})`,
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
              桥梁的诗歌意象
            </h2>

            <div className="space-y-8">
              {/* Description card - 意象解读 */}
              <motion.div
                className="cursor-pointer rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                onClick={() => toggleCard("interpretation")}
              >
                <div className="p-10">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-3xl tracking-wide text-white"
                      style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                    >
                      意象解读
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedCards.interpretation ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-8 w-8 text-white/60" />
                    </motion.div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-600" />
                    <p
                      className="text-lg tracking-wide text-cyan-200/80"
                      style={{
                        fontFamily: "'Source Han Serif SC', serif",
                      }}
                    >
                      木石结构 · 地域标识 · 文化记忆
                    </p>
                  </div>

                  <AnimatePresence>
                    {expandedCards.interpretation && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 space-y-6">
                          <p
                            className="text-xl leading-loose tracking-wide text-white/90"
                            style={{
                              fontFamily: "'Source Han Serif SC', serif",
                              fontWeight: 300,
                            }}
                          >
                            历史名桥承载着朝代更替、人文记忆与离别情怀。它们是时间的见证者，在诗人笔下化为永恒的文化符号。二十四桥位于扬州，因其风雅繁华而闻名于世；灞陵桥则是长安东郊的送别之地，折柳赠别的习俗由此而生。
                          </p>
                          <p
                            className="text-xl leading-loose tracking-wide text-white/90"
                            style={{
                              fontFamily: "'Source Han Serif SC', serif",
                              fontWeight: 300,
                            }}
                          >
                            这些桥梁不仅连接着空间的两岸，更联结着过去与现在、离别与重逢的情感纽带。它们见证了多少文人雅士的欢聚与离别，承载了多少代人的记忆与情思。
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* 二十四桥 card */}
              <motion.div
                className="cursor-pointer rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                onClick={() => toggleCard("twentyfour")}
              >
                <div className="p-10">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-3xl tracking-wide text-white"
                      style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                    >
                      二十四桥
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedCards.twentyfour ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-8 w-8 text-white/60" />
                    </motion.div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
                    <p
                      className="text-lg tracking-wide text-cyan-200/80"
                      style={{
                        fontFamily: "'Source Han Serif SC', serif",
                      }}
                    >
                      风雅繁华 · 明月箫声 · 今昔之叹
                    </p>
                  </div>

                  <AnimatePresence>
                    {expandedCards.twentyfour && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
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
                            二十四桥位于江苏扬州，是中国古代最富诗意的桥梁之一。其名称由来众说纷纭：一说扬州城内外原有二十四座桥，后人统称为“二十四桥”；一说此桥宽二丈四尺，因数字巧合而得名；还有传说因二十四位美人吹箫于此而命名。无论起源如何，这座桥已在唐宋诗词中成为扬州繁华与风雅的象征。
                          </p>
                          <p>
                            杜牧在《寄扬州韩绰判官》中写下千古名句“二十四桥明月夜，玉人何处教吹箫”，将桥、明月、美人、箫声融为一体，营造出空灵缥缈的意境。这两句诗不仅让二十四桥名扬天下，更奠定了它在中国文学史上作为“风雅”与“繁华”双重象征的地位。
                          </p>
                          <p>
                            到了南宋，姜夔在《扬州慢》中感叹“二十四桥仍在，波心荡、冷月无声”，透过今昔对比，表达了对往日繁华的追忆与对战乱之后衰败的感伤。同一座桥，在不同时代诗人笔下，既是盛世风流的见证，也是沧桑变迁的象征，成为连接过去与现在的文化记忆载体。
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* 灞桥 card */}
              <motion.div
                className="cursor-pointer rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                onClick={() => toggleCard("ba")}
              >
                <div className="p-10">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-3xl tracking-wide text-white"
                      style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                    >
                      灞桥
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedCards.ba ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-8 w-8 text-white/60" />
                    </motion.div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-1 w-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
                    <p
                      className="text-lg tracking-wide text-cyan-200/80"
                      style={{
                        fontFamily: "'Source Han Serif SC', serif",
                      }}
                    >
                      折柳送别 · 离愁别绪 · 天涯羁旅
                    </p>
                  </div>

                  <AnimatePresence>
                    {expandedCards.ba && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
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
                            灞桥，又称灞陵桥，位于长安（今西安）城东，横跨灞水，是古代长安通往东方的重要关口，也是中国文学史上最著名的送别之地。自汉代起，这里便是京城东行的必经之路，无数离别在此上演，折柳赠别的习俗也由此而生——“柳”谐音“留”，表达着挽留之意。
                          </p>
                          <p>
                            李白在《忆秦娥》中写道“年年柳色，灞陵伤别”，短短八字便道尽了灞桥离别的千古愁绪。每年春天，灞桥两岸柳色青青，却总是伴随着离别的伤感。柳永在《少年游》中感叹“参差烟树灞陵桥，风物尽前朝”，借灞桥寄托对往昔盛世的追忆，抒发物是人非的感慨。
                          </p>
                          <p>
                            白居易、王维、岑参等无数诗人都曾在此惜别友人，留下“灞桥风雪”、“灞柳依依”等经典意象。灞桥因此成为中国古典诗歌中“离别”主题的核心意象，它不仅是地理上的分界点，更是情感上的转折点——桥这边是故乡亲友，桥那边是未知前路；桥上是依依惜别，桥下是流水东去，一去不复返。
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* 咸阳桥 card */}
              <motion.div
                className="cursor-pointer rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                onClick={() => toggleCard("xianyang")}
              >
                <div className="p-10">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-3xl tracking-wide text-white"
                      style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                    >
                      咸阳桥
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedCards.xianyang ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-8 w-8 text-white/60" />
                    </motion.div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-1 w-24 rounded-full bg-gradient-to-r from-slate-400 to-gray-500" />
                    <p
                      className="text-lg tracking-wide text-cyan-200/80"
                      style={{
                        fontFamily: "'Source Han Serif SC', serif",
                      }}
                    >
                      战乱离散 · 历史兴衰 · 烟雨苍茫
                    </p>
                  </div>

                  <AnimatePresence>
                    {expandedCards.xianyang && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
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
                            咸阳桥横跨渭水，连接长安与咸阳，是古代关中地区的重要桥梁。作为秦汉故都咸阳的标志性建筑，这座桥见证了中国历史上最辉煌的朝代更替，也承载着战争、离乱与兴衰的沉重记忆。与二十四桥的风雅、灞桥的惜别不同，咸阳桥在诗歌中往往带有更深沉的历史感与悲剧色彩。
                          </p>
                          <p>
                            杜甫在《兵车行》中悲愤地写道“耶娘妻子走相送，尘埃不见咸阳桥”，描绘了战争征兵时百姓送别亲人的凄惨场景。滚滚尘埃遮蔽了咸阳桥，也遮蔽了无数家庭的希望与团圆。这首诗将咸阳桥与战争、离乱、民生疾苦紧密联系，使其成为唐代安史之乱前社会矛盾的象征。
                          </p>
                          <p>
                            温庭筠在《咸阳值雨》中写“咸阳桥上雨如悬，万点空蒙隔钓船”，以细腻的笔触描绘雨中咸阳桥的朦胧景象。雨丝如悬，烟雨空蒙，渔船隐约，营造出一种迷离的意境。咸阳桥在此既是实景描写的对象，也是历史兴衰、人世沧桑的隐喻——就像这场雨，模糊了眼前的景物，也模糊了曾经辉煌的秦汉故都。
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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