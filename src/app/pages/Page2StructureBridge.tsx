import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Navigation } from "../components/Navigation";
const structureBridgeImage = "/images/structureBridgeImage.png";
const structureBridgeImageAlt = "/images/structureBridgeImageAlt.png";

const poems = [
  {
    text: "奇巧固护，甲于天下",
    author: "《赵州志》",
  },
  {
    text: "水从碧玉环中过，人在苍龙背上行",
    author: "民间咏赵州桥",
  },
  {
    text: "造化功同天地炉，洪波安得驾飞梁",
    author: "元稹《赵州桥》",
  },
  {
    text: "潮州湘桥好风流，十八梭船廿四洲",
    author: "潮州民谣",
  },
  {
    text: "洛阳长桥卧海波，江翻流撼奈桥何",
    author: "何乔远《洛阳万安桥赋》",
  },
  {
    text: "跨海飞梁叠石成，晓风十里渡瑶琼",
    author: "刘子翚《洛阳桥》",
  },
  {
    text: "卢沟晓月照通州，古渡津亭石路修",
    author: "清代诗人咏卢沟桥",
  },
  {
    text: "石狮千态皆可观，桥影横斜水色寒",
    author: "民间咏卢沟桥",
  },
];

export function Page2StructureBridge() {
  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState<{
    craftsmanship: boolean;
    guangji: boolean;
    zhaozhou: boolean;
    luoyang: boolean;
    lugou: boolean;
  }>({
    craftsmanship: false,
    guangji: false,
    zhaozhou: false,
    luoyang: false,
    lugou: false,
  });

  const toggleCard = (card: keyof typeof expandedCards) => {
    setExpandedCards((prev) => ({
      ...prev,
      [card]: !prev[card],
    }));
  };

  return (
    <div className="relative h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth [scroll-snap-type:y_mandatory]">
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
            backgroundImage: `url(${structureBridgeImage})`,
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
            结构之桥
          </h1>
          <p
            className="text-4xl tracking-wide text-cyan-200/90"
            style={{
              fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif",
              fontWeight: 300,
            }}
          >
            中国四大名桥
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
      <section className="relative flex h-screen snap-start snap-always items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${structureBridgeImageAlt})`,
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
              duration: 60,
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

      {/* Section 3: Engineering Wisdom and Craftsmanship */}
      <section className="relative flex min-h-screen snap-start snap-always items-center justify-center overflow-hidden py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${structureBridgeImageAlt})`,
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
              工程智慧
            </h2>

            <div className="space-y-8">
              {/* 匠心精神 card */}
              <motion.div
                className="cursor-pointer rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                onClick={() => toggleCard("craftsmanship")}
              >
                <div className="p-10">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-3xl tracking-wide text-white"
                      style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                    >
                      匠心精神
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedCards.craftsmanship ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-8 w-8 text-white/60" />
                    </motion.div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
                    <p
                      className="text-lg tracking-wide text-cyan-200/80"
                      style={{
                        fontFamily: "'Source Han Serif SC', serif",
                      }}
                    >
                      石拱结构 · 力学智慧 · 永恒传承
                    </p>
                  </div>

                  <AnimatePresence>
                    {expandedCards.craftsmanship && (
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
                            中国古代桥梁建筑凝聚着无数工匠的智慧与心血。从选址勘测到设计施工，每一个环节都体现了对自然规律的深刻理解和对技艺的精益求精。这些桥梁历经千年而不倒，见证了中华工匠精神的传承与创新。
                          </p>
                          <p
                            className="text-xl leading-loose tracking-wide text-white/90"
                            style={{
                              fontFamily: "'Source Han Serif SC', serif",
                              fontWeight: 300,
                            }}
                          >
                            工匠们不仅掌握了先进的力学原理和建筑技术，更注重将实用性与艺术性完美结合。桥梁既是交通要道，也是文化艺术的载体。这种“技”“艺”合一的匠心精神，铸就了中国古代桥梁建筑的辉煌成就。
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* 广济桥 card */}
              <motion.div
                className="cursor-pointer rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                onClick={() => toggleCard("guangji")}
              >
                <div className="p-10">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-3xl tracking-wide text-white"
                      style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                    >
                      广济桥
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedCards.guangji ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-8 w-8 text-white/60" />
                    </motion.div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-1 w-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />
                    <p
                      className="text-lg tracking-wide text-cyan-200/80"
                      style={{
                        fontFamily: "'Source Han Serif SC', serif",
                      }}
                    >
                      梁舟结合 · 启闭式桥 · 世界孤例
                    </p>
                  </div>

                  <AnimatePresence>
                    {expandedCards.guangji && (
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
                            广济桥，俗称湘子桥，位于广东潮州，始建于南宋，是中国四大古桥之一。它以“十八梭船廿四洲”的独特结构闻名于世——桥身由东西两段石梁桥和中间一段浮桥组成，是世界上最早的启闭式桥梁，也是现存唯一的梁舟结合式古桥。
                          </p>
                          <p>
                            广济桥最具匠心的设计在于其可开启的浮桥段落。白天，十八艘梭船首尾相连，用缆索固定成浮桥供人通行；夜晚则解开缆索，将船只移开，既便于船只通航，又可减轻洪水对桥身的冲击。这种灵活应变的设计充分体现了古代工匠对水文环境的精准把握和对实用功能的创新思考。
                          </p>
                          <p>
                            桥上还建有二十四座亭台楼阁，集交通、商贸、观赏于一体，形成“一里长桥一里市”的独特景观。广济桥不仅是建筑技术的杰作，更是中国古代城市规划和商业文化的缩影，展现了“因地制宜、顺势而为”的工匠智慧。
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* 赵州桥 card */}
              <motion.div
                className="cursor-pointer rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                onClick={() => toggleCard("zhaozhou")}
              >
                <div className="p-10">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-3xl tracking-wide text-white"
                      style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                    >
                      赵州桥
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedCards.zhaozhou ? 180 : 0 }}
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
                      敞肩拱 · 千年不倒 · 领先世界
                    </p>
                  </div>

                  <AnimatePresence>
                    {expandedCards.zhaozhou && (
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
                            赵州桥，又名安济桥，位于河北赵县，由隋代工匠李春设计建造，距今已有1400多年历史，是世界上现存最古老、保存最完好的单孔石拱桥。它以“奇巧固护，甲于天下”而闻名，被誉为“天下第一桥”。
                          </p>
                          <p>
                            赵州桥最伟大的创新在于其独创的“敞肩拱”结构——在主拱两端各设两个小拱，形成四个“拱上拱”。这种设计具有多重妙用：一是减轻桥身自重约700吨，降低对地基的压力；二是增强泄洪能力，减少水流对桥身的冲击；三是节省石料，降低建造成本；四是增加美学效果，使桥身显得轻盈灵动。这一设计领先欧洲同类桥梁1000多年，充分体现了中国古代工匠对力学原理的精准运用。
                          </p>
                          <p>
                            桥身采用“纵向并列砌筑法”，每道拱圈可独立承重，即使局部损坏也不影响整体结构，这种“容错设计”极大提高了桥梁的耐久性。桥面两侧还雕刻有精美的蛟龙、兽面纹饰，将工程技术与艺术美学完美融合，展现了“技”“艺”合一的匠心精神。
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* 洛阳桥 card */}
              <motion.div
                className="cursor-pointer rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                onClick={() => toggleCard("luoyang")}
              >
                <div className="p-10">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-3xl tracking-wide text-white"
                      style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                    >
                      洛阳桥
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedCards.luoyang ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-8 w-8 text-white/60" />
                    </motion.div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500" />
                    <p
                      className="text-lg tracking-wide text-cyan-200/80"
                      style={{
                        fontFamily: "'Source Han Serif SC', serif",
                      }}
                    >
                      跨海长桥 · 筏形基础 · 生物固桥
                    </p>
                  </div>

                  <AnimatePresence>
                    {expandedCards.luoyang && (
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
                            洛阳桥，又名万安桥，位于福建泉州，始建于北宋，是中国现存最早的跨海梁式石桥。全长1200米，有“海内第一桥”之称。它的建造难度远超内陆河桥——需克服海潮冲击、软泥地基、海风侵蚀等重重难关，充分展现了宋代工匠的非凡智慧。
                          </p>
                          <p>
                            洛阳桥最具创新性的技术是“筏形基础”和“种蛎固基法”。工匠们先在海滩上用巨石垒成船筏状的基础，增大受力面积以防下沉；然后在桥基周围养殖大量牡蛎，利用牡蛎的钙质外壳将桥墩与礁石胶结成牢固的整体。这种“借助生物之力”的工程方法，开创了世界桥梁史上“生物固桥”的先河，体现了“天人合一”、“顺应自然”的东方智慧。
                          </p>
                          <p>
                            桥梁采用“睡木沉基”技术，在软泥中打入大量木桩形成桩林，再在其上铺设条石作为桥墩基础，这种做法类似现代的“桩基础”原理。桥面宽阔平坦，两侧设有护栏和石塔，既保障行人安全，又增添美学韵味。洛阳桥的建成，不仅解决了跨海交通难题，更推动了泉州港的繁荣发展，成为“海上丝绸之路”的重要节点。
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* 卢沟桥 card */}
              <motion.div
                className="cursor-pointer rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                onClick={() => toggleCard("lugou")}
              >
                <div className="p-10">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-3xl tracking-wide text-white"
                      style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                    >
                      卢沟桥
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedCards.lugou ? 180 : 0 }}
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
                      石狮千态 · 联拱结构 · 历史见证
                    </p>
                  </div>

                  <AnimatePresence>
                    {expandedCards.lugou && (
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
                            卢沟桥，位于北京西南永定河上，始建于金代，因“卢沟晓月”而成为燕京八景之一。全长266米，由11孔联拱组成，桥面两侧雕有485只形态各异的石狮子，民间有“卢沟桥的狮子数不清”之说，充分展现了工匠精湛的雕刻技艺和丰富的艺术想象力。
                          </p>
                          <p>
                            卢沟桥采用“联拱石桥”结构，11个桥孔高低错落，既保证了泄洪能力，又增强了结构稳定性。桥墩设计成船形，尖端朝向上游，能有效分流水势，减少洪水和冰凌的冲击。桥身采用巨大的石条和铁榫连接，不用一钉一铆，却能屹立近千年不倒，体现了古代工匠对材料力学和结构工程的深刻理解。
                          </p>
                          <p>
                            1937年7月7日，“七七事变”在卢沟桥爆发，中华民族全面抗战由此开始。卢沟桥因此被赋予了更深层的历史意义，从一座展示工程技艺的古桥，升华为民族精神和爱国情怀的象征。它见证了中华民族从屈辱走向复兴的历史进程，成为连接过去与未来的精神纽带。
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