import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, X, ChevronDown } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { WordCloud } from "../components/WordCloud";
const wordCloudBg = "/images/wordCloudBg.png";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ProjectedPoint {
  x: number;
  y: number;
  scale: number;
  z: number;
}

interface CulturalNode {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  angle: number;
  radius: number;
  height: number;
  keywords: string[]; // Added keywords array
  content: {
    intro: string;
    description: string;
    poeticExamples: Array<{ title: string; content: string }>;
    culturalSignificance: string;
  };
}

const culturalNodes: CulturalNode[] = [
  {
    id: "connection",
    name: "连接",
    subtitle: "空间的延伸",
    color: "#f59e0b",
    angle: 0,
    radius: 380,
    height: 0,
    keywords: ["团圆", "沟通", "跨越", "联结"], // Removed three-character words
    content: {
      intro: "桥最原初的意义，是连接此岸与彼岸。",
      description:
        "在古代诗人眼中，桥不仅是物理空间的跨越，更是心灵世界的延伸。它连接着分离的人，连接着现实与想象，连接着今生与来世。鹊桥横跨银河，让牛郎织女得以相会；灞桥横跨灞水，成为送别亲友的最后一站。桥梁的存在，让「不可能」变为「可能」，让「遥远」化作「咫尺」。",
      poeticExamples: [
        {
          title: "《鹊桥仙》秦观",
          content: "纤云弄巧，飞星传恨，银汉迢迢暗度。金风玉露一相逢，便胜却人间无数。",
        },
        {
          title: "《送元二使安西》王维",
          content: "渭城朝雨浥轻尘，客舍青青柳色新。劝君更尽一杯酒，西出阳关无故人。",
        },
      ],
      culturalSignificance:
        "「连接」体现了中国文化中对团圆、沟通的重视。无论是七夕鹊桥的神话传说，还是灞桥折柳的送别习俗，都寄托着人们对跨越阻隔、实现联结的美好愿望。",
    },
  },
  {
    id: "transition",
    name: "过渡",
    subtitle: "时间的驿站",
    color: "#ec4899",
    angle: (Math.PI * 2) / 5,
    radius: 380,
    height: 100,
    keywords: ["变化", "转折", "临界", "怀古"], // Removed 枫桥
    content: {
      intro: "桥不是终点，而是「经过」的地方。",
      description:
        "桥是一个充满张力的临界空间。站在桥上，你既不属于此岸，也未抵达彼岸，处于一种悬置的「中间状态」。这种特殊的位置感，使桥成为人生转折、朝代更替、季节交替的绝佳象征。诗人在桥上回望过去，眺望未来，体会着时光流逝的无常与必然。",
      poeticExamples: [
        {
          title: "《经下邳圯桥怀张子房》李白",
          content: "我来圯桥上，怀古钦英风。唯见碧流水，曾无黄石公。",
        },
        {
          title: "《易水怀古》贾岛",
          content: "至今易水桥，寒风兮萧萧。易水流得尽，荆卿名不消。",
        },
      ],
      culturalSignificance:
        "「过渡」凝聚着中国哲学中的「变化」观念。桥梁作为界限的象征，提醒人们万物流转、盛衰无常。从繁华到衰落，从相聚到离散，桥见证着这一切变迁。",
    },
  },
  {
    id: "memory",
    name: "记忆",
    subtitle: "历史的见证",
    color: "#06b6d4",
    angle: (Math.PI * 4) / 5,
    radius: 380,
    height: -100,
    keywords: ["历史", "传承", "见证", "千载"],
    content: {
      intro: "桥作为一种长久的存在，见证了无数历史变迁。",
      description:
        "桥梁的物质性使其成为历史记忆的承载者。古老的石桥经历风雨洗礼，依然屹立不倒，默默讲述着往事。每一座桥，都是一部石头写成的历史书，记录着朝代更替、人事变迁。从卢沟桥的狮子到赵州桥的拱券，桥不仅是交通设施，更是民族记忆的象征。",
      poeticExamples: [
        {
          title: "《圯桥》胡曾",
          content: "庙算张良独有余，少年逃难下邳初。逡巡不进泥中履，争得先生一卷书。",
        },
        {
          title: "《卢沟桥歌》",
          content: "卢沟桥！卢沟桥！男儿坟墓在此桥！豺狼入室露牙爪，南北隳突真逍遥；快快拼起民族命，最后胜利是吾曹！",
        },
      ],
      culturalSignificance:
        "「记忆」体现了中国人对历史的敬畏与传承意识。桥梁承载着集体记忆，连接着过去与现在，提醒后人不忘来路，珍视传统。",
    },
  },
  {
    id: "emotion",
    name: "情感",
    subtitle: "心灵的寄托",
    color: "#a855f7",
    angle: (Math.PI * 6) / 5,
    radius: 380,
    height: 100,
    keywords: ["鹊桥", "灞桥", "蓝桥", "情感"], // Added keywords
    content: {
      intro: "桥承载着人类最深沉的情感。",
      description:
        "在中国诗歌中，桥是情感的聚集地。鹊桥象征着永恒不渝的爱情，灞桥代表着离别的忧伤，蓝桥寄托着对美好相遇的期盼。桥的意象超越了物质形态，成为情感的象征符号。当诗人写到桥时，往往不是在描绘桥本身，而是在抒发内心深处的思念、期盼、忧愁或喜悦。桥成为情感投射的载体，承载着无法言说的心绪。",
      poeticExamples: [
        {
          title: "《鹊桥仙》秦观",
          content: "两情若是久长时，又岂在朝朝暮暮。柔情似水，佳期如梦，忍顾鹊桥归路。",
        },
        {
          title: "《画堂春》纳兰性德",
          content: "浆向蓝桥易乞，药成碧海难奔。若容相访饮牛津，相对忘贫。",
        },
      ],
      culturalSignificance:
        "「情感」体现了中国文学的抒情传统。桥作为情感符号，帮助诗人表达难以直言的内心世界。从相思到离愁，从喜悦到哀伤，桥都能够承载。",
    },
  },
  {
    id: "order",
    name: "秩序",
    subtitle: "文明的智慧",
    color: "#10b981",
    angle: (Math.PI * 8) / 5,
    radius: 380,
    height: -100,
    keywords: ["技术", "秩序", "智慧", "工艺"], // Removed 赵州桥, 洛阳桥
    content: {
      intro: "桥梁的修建体现了文明的秩序与智慧。",
      description:
        "建造一座桥需要精密的计算、精湛的工艺、严密的组织。从选址勘测到材料准备，从结构设计到施工管理，每一步都体现着人类理性的光辉。赵州桥的敞肩拱结构，展现了隋代工匠的卓越智慧；洛阳桥的筏型基础，体现了宋代工程师对潮汐规律的深刻理解。桥梁不仅是技术成就，更是社会秩序、礼制规范、审美追求的综合体现。",
      poeticExamples: [
        {
          title: "《水经注·渭水》郦道元",
          content: "桥之为用，济涉斯备。或架木为梁，或累石成拱，因地制宜，各尽其妙。",
        },
        {
          title: "《赵州桥记》",
          content: "制造奇特，人不知其所以为。敞肩拱券，减水冲力，千载不毁，巧夺天工。",
        },
      ],
      culturalSignificance:
        "「秩序」彰显了中国文化对技术与美学统一的追求。桥梁建造不仅要实用坚固，还要形制优美、符合礼制。这种对秩序的追求，体现了中华文明的独特气质。",
    },
  },
];

// Word groups with descriptions
const WORD_GROUPS = [
  {
    id: "nature",
    name: "自然山水",
    words: ["水", "山", "云", "风", "雨", "春水", "流水", "桥山"],
    description: `桥横跨于山水之间，是自然地理中最具张力的节点。水、山、云、风、雨诸意象以极高频率与桥共现，说明唐人笔下的桥首先是一个自然空间中的存在。流水日夜不息，山峦巍然矗立，云雾缥缈聚散，桥在这一切中保持沉默的坚守，成为自然秩序的见证者。“春水”与“流水”的专项组合更强调水的流逝感，暗示时间在桥下无声流过，赋予桥以哲学意味。`
  },
  {
    id: "travel",
    name: "道路行旅",
    words: ["路", "马", "渡", "归", "万里", "山路"],
    description: `桥的本质功能是通道，“路”、“渡”、“马”共同构成了行旅的叙事场景。骑马而来、涉水而渡、踏桥而过，桥是旅途中短暂的落脚之地，也是漫漫“万里”征程的中途坐标。“归”字尤为深情——桥既是出发的起点，也是归来的门槛，无论是宦游者还是羁旅客，桥头是离家最后的回望，也是还家最先的欣慰。“山路”则把桥嵌入崎岖地形，突显了架桥之艰与过桥之险。`
  },
  {
    id: "season",
    name: "时令节序",
    words: ["春", "月", "夜", "秋", "春风", "秋风"],
    description: `桥是时间流逝最好的观测台。春风吹过、秋风乍起，月色倾洒桥面，夜色笼罩桥栏，桥目睹了四时更迭与昼夜轮转。"月""夜"的高频组合尤为典型——夜桥映月，静谧清冷，是唐诗中营造孤寂意境的标志性场景。春与秋的对举，则承载了中国古典诗学中盛衰、荣枯、欢悲的深层情感结构，桥因此成为感受时间之重的精神装置。`
  },
  {
    id: "urban",
    name: "城市人居",
    words: ["城", "楼", "寺", "花"],
    description: `桥不仅属于荒野，同样深嵌于城市肌理之中。城郭、楼阁、寺院、花木，构成了桥的人文背景。唐代城市中的桥往往是繁华地带的标志，“城”与“楼”暗示了桥周围的街市人声；“寺”则将桥引入宗教空间，桥头寺庙是旅人祈福停驻之所；“花”的出现更添生活气息，桥边柳暗花明，市井烟火扑面而来。这一组意象揭示了桥作为公共空间的社会性维度。`
  },
  {
    id: "plant",
    name: "植物与生命",
    words: ["柳", "杨柳"],
    description: `柳在唐诗桥意象中占据特殊地位，频次之高（79次/15次）远超其他植物，形成了“桥—柳”这一高度稳固的意象组合。折柳送别是唐代风俗，桥头杨柳因此成为离别情感的聚焦点。柳丝依依、随风摇曳，与桥的坚固形成质感上的对比，更以其柔性强化了离别的缠绵与不舍。“杨柳”一词的出现，往往意味着一场送别即将在桥头上演。`
  },
  {
    id: "farewell",
    name: "离别与相思",
    words: ["别", "鹊", "鹊桥", "乌鹊"],
    description: `桥在中国文化中是情感分合的象征核心。“别”字直指送别情境，而“鹊”、“乌鹊”、“鹊桥”的密集出现，则将桥与牛郎织女传说深度绑定。七夕鹊桥是天上的相会之桥，人间的桥由此获得了神话维度——每一座桥都潜藏着跨越阻隔、两情相聚的渴望。别离与团圆在桥上形成永恒的张力：人在桥头挥手而别，神在桥上跨越银河，桥成为人类情感中分离与重逢这一永恒主题的最佳物质载体。`
  }
];

// Word frequency data with group info
const WORD_FREQUENCY_DATA = [
  { rank: 1, text: "水", size: 180, frequency: 180 },
  { rank: 2, text: "山", size: 111, frequency: 111 },
  { rank: 3, text: "春", size: 98, frequency: 98 },
  { rank: 4, text: "路", size: 92, frequency: 92 },
  { rank: 5, text: "月", size: 86, frequency: 86 },
  { rank: 6, text: "柳", size: 79, frequency: 79 },
  { rank: 7, text: "云", size: 78, frequency: 78 },
  { rank: 8, text: "风", size: 72, frequency: 72 },
  { rank: 9, text: "马", size: 71, frequency: 71 },
  { rank: 10, text: "花", size: 68, frequency: 68 },
  { rank: 11, text: "夜", size: 48, frequency: 48 },
  { rank: 12, text: "渡", size: 45, frequency: 45 },
  { rank: 13, text: "城", size: 45, frequency: 45 },
  { rank: 14, text: "雨", size: 44, frequency: 44 },
  { rank: 15, text: "楼", size: 43, frequency: 43 },
  { rank: 16, text: "别", size: 42, frequency: 42 },
  { rank: 17, text: "鹊", size: 40, frequency: 40 },
  { rank: 18, text: "寺", size: 39, frequency: 39 },
  { rank: 19, text: "秋", size: 37, frequency: 37 },
  { rank: 20, text: "归", size: 36, frequency: 36 },
  { rank: 21, text: "鹊桥", size: 26, frequency: 26 },
  { rank: 22, text: "万里", size: 23, frequency: 23 },
  { rank: 23, text: "春水", size: 18, frequency: 18 },
  { rank: 24, text: "桥山", size: 17, frequency: 17 },
  { rank: 25, text: "杨柳", size: 15, frequency: 15 },
  { rank: 26, text: "春风", size: 14, frequency: 14 },
  { rank: 27, text: "乌鹊", size: 14, frequency: 14 },
  { rank: 28, text: "秋风", size: 10, frequency: 10 },
  { rank: 29, text: "流水", size: 9, frequency: 9 },
  { rank: 30, text: "山路", size: 8, frequency: 8 },
].map(word => {
  // Find which group this word belongs to
  const group = WORD_GROUPS.find(g => g.words.includes(word.text));
  return {
    ...word,
    groupId: group?.id || "",
    groupName: group?.name || ""
  };
});

export function Page3CulturalMeaning() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<CulturalNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const velocityRef = useRef({ x: 0.002, y: 0 });
  const [projectedNodes, setProjectedNodes] = useState<
    Array<{ node: CulturalNode; point: ProjectedPoint }>
  >([]);
  const [keywordLabels, setKeywordLabels] = useState<
    Array<{ keyword: string; point: ProjectedPoint; color: string }>
  >([]);

  // Create geodesic sphere vertices (more complex polyhedron)
  const createGeodesicSphere = (): Point3D[] => {
    const vertices: Point3D[] = [];
    const radius = 280; // Increased from 200

    // Create vertices using spherical coordinates
    const latitudes = 8;
    const longitudes = 12;

    for (let lat = 0; lat <= latitudes; lat++) {
      const theta = (lat * Math.PI) / latitudes;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let lon = 0; lon < longitudes; lon++) {
        const phi = (lon * 2 * Math.PI) / longitudes;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        vertices.push({
          x: radius * sinTheta * cosPhi,
          y: radius * cosTheta,
          z: radius * sinTheta * sinPhi,
        });
      }
    }

    return vertices;
  };

  // Create edges for the geodesic sphere
  const createGeodesicEdges = (vertices: Point3D[]): [number, number][] => {
    const edges: [number, number][] = [];
    const longitudes = 12;
    const latitudes = 8;

    for (let lat = 0; lat < latitudes; lat++) {
      for (let lon = 0; lon < longitudes; lon++) {
        const current = lat * longitudes + lon;
        const next = lat * longitudes + ((lon + 1) % longitudes);
        const below = (lat + 1) * longitudes + lon;

        // Horizontal edge
        edges.push([current, next]);

        // Vertical edge
        if (lat < latitudes) {
          edges.push([current, below]);
        }

        // Diagonal edge
        if (lat < latitudes) {
          const belowNext = (lat + 1) * longitudes + ((lon + 1) % longitudes);
          edges.push([current, belowNext]);
        }
      }
    }

    return edges;
  };

  // Rotate point in 3D space
  const rotatePoint = (point: Point3D, angleX: number, angleY: number): Point3D => {
    // Rotate around Y axis
    let x = point.x * Math.cos(angleY) - point.z * Math.sin(angleY);
    let z = point.x * Math.sin(angleY) + point.z * Math.cos(angleY);
    let y = point.y;

    // Rotate around X axis
    let newY = y * Math.cos(angleX) - z * Math.sin(angleX);
    let newZ = y * Math.sin(angleX) + z * Math.cos(angleX);

    return { x, y: newY, z: newZ };
  };

  // Project 3D point to 2D screen
  const projectPoint = (point: Point3D, width: number, height: number): ProjectedPoint => {
    const distance = 1000;
    const scale = distance / (distance + point.z);
    return {
      x: point.x * scale + width / 2,
      y: point.y * scale + height / 2,
      scale,
      z: point.z,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const vertices = createGeodesicSphere();
    const edges = createGeodesicEdges(vertices);

    // Create background stars
    const stars: Array<{ x: number; y: number; size: number; opacity: number }> = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    // Mouse interaction
    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseRef.current.isDown) {
        const deltaX = e.clientX - mouseRef.current.x;
        const deltaY = e.clientY - mouseRef.current.y;

        velocityRef.current.y = deltaX * 0.005;
        velocityRef.current.x = deltaY * 0.005;

        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Auto-rotation with drag influence
      if (!mouseRef.current.isDown) {
        velocityRef.current.y *= 0.98;
        velocityRef.current.x *= 0.98;
        if (Math.abs(velocityRef.current.y) < 0.001) velocityRef.current.y = 0.002;
      }

      rotationRef.current.y += velocityRef.current.y;
      rotationRef.current.x += velocityRef.current.x;

      // Rotate and project vertices
      const rotatedVertices = vertices.map((v) =>
        rotatePoint(v, rotationRef.current.x, rotationRef.current.y)
      );
      const projectedVertices = rotatedVertices.map((v) =>
        projectPoint(v, canvas.width, canvas.height)
      );

      // Sort edges by average Z-depth
      const edgesWithDepth = edges.map((edge) => {
        const avgZ = (rotatedVertices[edge[0]].z + rotatedVertices[edge[1]].z) / 2;
        return { edge, avgZ };
      });
      edgesWithDepth.sort((a, b) => a.avgZ - b.avgZ);

      // Draw edges
      edgesWithDepth.forEach(({ edge }) => {
        const p1 = projectedVertices[edge[0]];
        const p2 = projectedVertices[edge[1]];
        const avgScale = (p1.scale + p2.scale) / 2;

        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        gradient.addColorStop(0, `rgba(255, 193, 7, ${avgScale * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 193, 7, ${avgScale * 0.25})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = avgScale * 1.2;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw vertices
      projectedVertices.forEach((point) => {
        if (point.z > -100) { // Only draw front-facing vertices
          const glowSize = point.scale * 8;
          const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, glowSize
          );
          gradient.addColorStop(0, `rgba(255, 193, 7, ${point.scale * 0.8})`);
          gradient.addColorStop(0.5, `rgba(255, 193, 7, ${point.scale * 0.3})`);
          gradient.addColorStop(1, "rgba(255, 193, 7, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, glowSize, 0, Math.PI * 2);
          ctx.fill();

          // Vertex point
          ctx.fillStyle = `rgba(255, 193, 7, ${point.scale})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.scale * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Calculate node positions
      const nodePositions = culturalNodes.map((node) => {
        const nodePos: Point3D = {
          x: Math.cos(node.angle) * node.radius,
          y: node.height,
          z: Math.sin(node.angle) * node.radius,
        };
        const rotated = rotatePoint(nodePos, rotationRef.current.x, rotationRef.current.y);
        const projected = projectPoint(rotated, canvas.width, canvas.height);
        return { node, point: projected };
      });
      setProjectedNodes(nodePositions);

      // Calculate keyword labels positioned around each node
      const keywords: Array<{ keyword: string; point: ProjectedPoint; color: string }> = [];
      nodePositions.forEach(({ node }) => {
        const nodePos3D: Point3D = {
          x: Math.cos(node.angle) * node.radius,
          y: node.height,
          z: Math.sin(node.angle) * node.radius,
        };

        // Distribute keywords around the node in 3D space
        node.keywords.forEach((keyword, keywordIndex) => {
          const angleOffset = (keywordIndex / node.keywords.length) * Math.PI * 2;
          const keywordRadius = 80; // Distance from node center

          const keywordPos3D: Point3D = {
            x: nodePos3D.x + Math.cos(node.angle + angleOffset) * keywordRadius,
            y: nodePos3D.y + Math.sin(angleOffset) * keywordRadius * 0.5,
            z: nodePos3D.z + Math.sin(node.angle + angleOffset) * keywordRadius,
          };

          const rotatedKeyword = rotatePoint(keywordPos3D, rotationRef.current.x, rotationRef.current.y);
          const projectedKeyword = projectPoint(rotatedKeyword, canvas.width, canvas.height);

          keywords.push({ keyword, point: projectedKeyword, color: node.color });
        });
      });
      setKeywordLabels(keywords);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", updateCanvasSize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
    };
  }, []);

  return (
    <div className="relative overflow-y-auto h-screen snap-y snap-mandatory">
      {/* Section 1: 3D Polyhedron */}
      <div className="relative min-h-screen snap-start overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        {/* Canvas background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{ background: "radial-gradient(circle at center, #1a1a2e 0%, #000000 100%)" }}
        />

        {/* Content overlay */}
        <div className="relative z-10 pointer-events-none">
          {/* Header */}
          <motion.div
            className="flex items-center justify-start px-8 py-6 pointer-events-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 backdrop-blur-md transition-all hover:bg-black/50"
            >
              <ArrowLeft className="h-4 w-4 text-white" />
              <span
                className="text-sm tracking-wide text-white"
                style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
              >
                返回
              </span>
            </button>
          </motion.div>

          {/* Center "桥" character */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 text-center"
            style={{ top: "58%" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              className="text-9xl font-bold tracking-widest text-white"
              style={{
                fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif",
                textShadow: "0 0 60px rgba(255, 193, 7, 0.8), 0 0 120px rgba(255, 193, 7, 0.4)",
              }}
            >
              桥
            </div>
            <div
              className="mt-2 text-base tracking-widest text-white/60"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              拖拽旋转  点击探索
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto cursor-pointer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse" }}
            onClick={() => {
              const element = document.getElementById("word-cloud-section");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span
              className="text-sm tracking-widest text-white/60"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              向下探索词云
            </span>
            <ChevronDown className="h-6 w-6 text-white/60" />
          </motion.div>

          {/* Cultural nodes */}
          {projectedNodes.map(({ node, point }) => {
            const isHovered = hoveredNodeId === node.id;
            const size = point.scale * 80 + 60;

            return (
              <motion.div
                key={node.id}
                className="absolute pointer-events-auto cursor-pointer"
                style={{
                  left: point.x,
                  top: point.y,
                  transform: "translate(-50%, -50%)",
                  zIndex: point.z > 0 ? 100 : 50,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: isHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => setSelectedNode(node)}
              >
                {/* Glow effect */}
                <div
                  className="absolute -inset-8 rounded-full blur-2xl transition-opacity"
                  style={{
                    backgroundColor: node.color,
                    opacity: isHovered ? 0.8 : 0.4,
                  }}
                />

                {/* Node circle */}
                <div
                  className="relative rounded-full border-2 bg-black/70 backdrop-blur-md transition-all"
                  style={{
                    width: size,
                    height: size,
                    borderColor: node.color,
                    boxShadow: `0 0 40px ${node.color}80`,
                  }}
                >
                  <div className="flex h-full flex-col items-center justify-center p-3">
                    <p
                      className="text-center font-bold tracking-wider text-white"
                      style={{
                        fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif",
                        fontSize: `${point.scale * 20 + 16}px`,
                      }}
                    >
                      {node.name}
                    </p>
                    <p
                      className="mt-1 text-center text-white/70"
                      style={{
                        fontFamily: "'Noto Sans SC', sans-serif",
                        fontSize: `${point.scale * 9 + 10}px`,
                      }}
                    >
                      {node.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Keyword labels */}
          {keywordLabels.map(({ keyword, point, color }, index) => (
            <motion.div
              key={index}
              className="absolute pointer-events-none"
              style={{
                left: point.x,
                top: point.y,
                transform: "translate(-50%, -50%)",
                zIndex: point.z > 0 ? 100 : 50,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: point.z > 0 ? (point.scale * 0.9 + 0.1) : 0.3,
                scale: 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="relative rounded-full border-2 bg-black/70 backdrop-blur-md transition-all"
                style={{
                  width: point.scale * 40 + 20,
                  height: point.scale * 40 + 20,
                  borderColor: color,
                  boxShadow: `0 0 40px ${color}80`,
                }}
              >
                <div className="flex h-full flex-col items-center justify-center p-3">
                  <p
                    className="text-center font-bold tracking-wider text-white"
                    style={{
                      fontFamily: "'Noto Serif SC', serif",
                      fontSize: `${point.scale * 10 + 8}px`,
                    }}
                  >
                    {keyword}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 2: Word Cloud */}
      <div
        id="word-cloud-section"
        className="relative min-h-screen snap-start bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${wordCloudBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Subtle dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/15" />

        {/* Title */}
        <motion.div
          className="relative z-10 pt-20 pb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-7xl font-bold tracking-widest text-white mb-4"
            style={{
              fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif",
              textShadow: "0 0 40px rgba(251, 191, 36, 0.8), 0 0 80px rgba(251, 191, 36, 0.4)",
            }}
          >
            桥之词云
          </h2>
          <p
            className="text-lg tracking-wide text-white/80"
            style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          >
            全唐诗中的桥意象词频可视化
          </p>
        </motion.div>

        {/* Word Cloud */}
        <div className="relative z-10 h-[calc(100vh-240px)] px-4">
          <WordCloud words={WORD_FREQUENCY_DATA} groups={WORD_GROUPS} />
        </div>
      </div>

      {/* Detail modal for 3D nodes */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-lg p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-gradient-to-br from-gray-900/98 to-gray-800/98 p-12 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-10 rounded-3xl"
                style={{
                  background: `radial-gradient(circle at top right, ${selectedNode.color} 0%, transparent 70%)`,
                }}
              />

              {/* Close button */}
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute right-8 top-8 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              {/* Content */}
              <div className="relative space-y-8">
                {/* Title */}
                <div className="flex items-center gap-4">
                  <div
                    className="h-4 w-4 rounded-full animate-pulse"
                    style={{ backgroundColor: selectedNode.color }}
                  />
                  <h3
                    className="text-5xl font-bold tracking-wider text-white"
                    style={{ fontFamily: "'Huiwen-mincho', 'Noto Serif SC', serif" }}
                  >
                    {selectedNode.name}
                  </h3>
                  <span
                    className="ml-2 text-2xl text-white/50"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                  >
                    {selectedNode.subtitle}
                  </span>
                </div>

                {/* Intro quote */}
                <div
                  className="border-l-4 pl-6 py-2"
                  style={{ borderColor: selectedNode.color }}
                >
                  <p
                    className="text-2xl leading-relaxed text-white/90 italic"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {selectedNode.content.intro}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <p
                    className="text-lg leading-loose text-white/80 indent-8"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                  >
                    {selectedNode.content.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div
                    className="text-sm tracking-widest text-white/40"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                  >
                    诗词选读
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>

                {/* Poetic examples */}
                <div className="space-y-6">
                  {selectedNode.content.poeticExamples.map((example, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-white/20"
                    >
                      <h5
                        className="mb-3 text-lg text-white/90"
                        style={{
                          fontFamily: "'Noto Serif SC', serif",
                          color: selectedNode.color,
                        }}
                      >
                        {example.title}
                      </h5>
                      <p
                        className="text-base leading-loose text-white/70"
                        style={{ fontFamily: "'Noto Serif SC', serif" }}
                      >
                        {example.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div
                    className="text-sm tracking-widest text-white/40"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                  >
                    文化意义
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>

                {/* Cultural significance */}
                <div
                  className="rounded-2xl border p-6"
                  style={{
                    borderColor: `${selectedNode.color}40`,
                    backgroundColor: `${selectedNode.color}10`,
                  }}
                >
                  <p
                    className="text-base leading-loose text-white/80"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                  >
                    {selectedNode.content.culturalSignificance}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
    </div>
  );
}