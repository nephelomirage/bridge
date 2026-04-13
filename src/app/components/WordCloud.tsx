import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import cloud from "d3-cloud";
import cardBg from "../../imports/card-bg.jpg";

interface WordData {
  text: string;
  size: number;
  rank: number;
  frequency: number;
  groupId: string;
  groupName: string;
}

interface CloudWord extends WordData {
  x?: number;
  y?: number;
  rotate?: number;
}

interface WordGroup {
  id: string;
  name: string;
  words: string[];
  description: string;
}

interface WordCloudProps {
  words: WordData[];
  groups: WordGroup[];
}

export function WordCloud({ words, groups }: WordCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cloudWords, setCloudWords] = useState<CloudWord[]>([]);
  const [hoveredWord, setHoveredWord] = useState<string | null>(
    null,
  );
  const [selectedGroup, setSelectedGroup] =
    useState<WordGroup | null>(null);
  const layoutGeneratedRef = useRef(false);
  const [error, setError] = useState<string | null>(null);

  // Validate props
  if (
    !words ||
    words.length === 0 ||
    !groups ||
    groups.length === 0
  ) {
    return (
      <div className="flex items-center justify-center h-full text-white/60">
        Invalid data provided to WordCloud
      </div>
    );
  }

  useEffect(() => {
    if (
      !containerRef.current ||
      words.length === 0 ||
      layoutGeneratedRef.current
    )
      return;

    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      // Retry after a short delay if container isn't sized yet
      const timer = setTimeout(() => {
        layoutGeneratedRef.current = false;
      }, 100);
      return () => clearTimeout(timer);
    }

    layoutGeneratedRef.current = true;
    const width = window.innerWidth;
    const height = window.innerHeight * 0.85;

    // Shuffle words for random distribution
    const shuffledWords = [...words].sort(
      () => Math.random() - 0.5,
    );

    try {
      const layout = cloud()
        .size([width * 0.9, height * 0.4]) // Horizontal layout area
        .words(shuffledWords.map((w) => ({ ...w })))
        .padding(12) // More padding to avoid overlap
        .rotate(() => 0)
        .font("Huiwen-mincho")
        .fontSize((d) => {
          const sizeMultiplier = Math.pow(d.size / 180, 0.6);
          return 40 + sizeMultiplier * 90;
        })
        .spiral("rectangular")
        .on("end", (words) => {
          // Post-process to create arch shape
          const processedWords = words.map((word) => {
            if (word.x === undefined || word.y === undefined)
              return word;

            // Current normalized X position from center (-1 to 1)
            const normalizedX = word.x / (width * 0.45);

            // Create stronger parabola for more dramatic arch
            const archHeight = height * 0.3; // Increased from 0.2
            const parabola = Math.pow(normalizedX, 2); // 0 at center, 1 at edges

            // Calculate arch offset based on X position
            const archOffset = archHeight * parabola; // 0 at center, increases toward edges

            // Apply offset to original Y (preserve d3's collision-free layout)
            // Move up by reducing the offset
            const newY = word.y + archOffset - height * 0.05; // Changed from +0.15 to -0.05

            return {
              ...word,
              x: word.x,
              y: newY,
            };
          });

          setCloudWords(processedWords as CloudWord[]);
        });

      layout.start();
    } catch (err) {
      console.error("Error generating word cloud layout:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate word cloud",
      );
      layoutGeneratedRef.current = false;
    }
  }, [words]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || cloudWords.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Get hovered group ID
    const hoveredGroupId = hoveredWord
      ? cloudWords.find((w) => w.text === hoveredWord)?.groupId
      : null;

    cloudWords.forEach((word) => {
      if (word.x === undefined || word.y === undefined) return;

      const x = centerX + word.x;
      const y = centerY + word.y;

      // Size based on frequency - slightly smaller to reduce overlap
      const sizeMultiplier = Math.pow(
        word.frequency / 180,
        0.6,
      );
      const fontSize = 40 + sizeMultiplier * 90; // 40px to 130px

      ctx.font = `${fontSize}px "Huiwen-mincho", "Noto Serif SC", serif`;

      // Opacity based on frequency - increased overall opacity
      const opacity = 0.55 + (word.frequency / 180) * 0.45;

      // Check if this word is in the hovered group
      const isInHoveredGroup =
        hoveredGroupId && word.groupId === hoveredGroupId;

      // Navy blue color (藏青色)
      if (isInHoveredGroup) {
        ctx.fillStyle = `rgba(18, 28, 58, ${Math.min(opacity + 0.25, 1)})`;
        ctx.shadowBlur = 25;
        ctx.shadowColor = `rgba(18, 28, 58, 0.7)`;
      } else {
        ctx.fillStyle = `rgba(25, 42, 76, ${opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(25, 42, 76, ${opacity * 0.4})`;
      }

      ctx.fillText(word.text, x, y);
      ctx.shadowBlur = 0;
    });
  }, [cloudWords, hoveredWord]);

  const handleCanvasMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas || cloudWords.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let foundWord: string | null = null;

    for (const word of cloudWords) {
      if (word.x === undefined || word.y === undefined)
        continue;

      const wx = centerX + word.x;
      const wy = centerY + word.y;
      const sizeMultiplier = Math.pow(
        word.frequency / 180,
        0.6,
      );
      const fontSize = 40 + sizeMultiplier * 90;

      ctx.font = `${fontSize}px "Huiwen-mincho", "Noto Serif SC", serif`;
      const metrics = ctx.measureText(word.text);
      const width = metrics.width;
      const height = fontSize;

      if (
        x >= wx - width / 2 &&
        x <= wx + width / 2 &&
        y >= wy - height / 2 &&
        y <= wy + height / 2
      ) {
        foundWord = word.text;
        break;
      }
    }

    if (foundWord !== hoveredWord) {
      setHoveredWord(foundWord);
    }
  };

  const handleCanvasClick = (
    e: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas || !groups || cloudWords.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    for (const word of cloudWords) {
      if (word.x === undefined || word.y === undefined)
        continue;

      const wx = centerX + word.x;
      const wy = centerY + word.y;
      const sizeMultiplier = Math.pow(
        word.frequency / 180,
        0.6,
      );
      const fontSize = 40 + sizeMultiplier * 90;

      ctx.font = `${fontSize}px "Huiwen-mincho", "Noto Serif SC", serif`;
      const metrics = ctx.measureText(word.text);
      const width = metrics.width;
      const height = fontSize;

      if (
        x >= wx - width / 2 &&
        x <= wx + width / 2 &&
        y >= wy - height / 2 &&
        y <= wy + height / 2
      ) {
        // Find and show the group this word belongs to
        const group = groups.find((g) => g.id === word.groupId);
        if (group) {
          setSelectedGroup(group);
        }
        break;
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
    >
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-400">
          Error: {error}
        </div>
      )}

      {!error && cloudWords.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-white/40">
          <div className="text-center">
            <div className="text-lg mb-2">
              Loading word cloud...
            </div>
            <div className="text-sm">
              Generating layout for {words.length} words
            </div>
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: hoveredWord ? "pointer" : "default" }}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={() => setHoveredWord(null)}
        onClick={handleCanvasClick}
      />

      {/* Group detail modal */}
      <AnimatePresence>
        {selectedGroup && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-md p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGroup(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-lg p-12 shadow-2xl"
              style={{
                backgroundImage: `url(${cardBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Semi-transparent overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/95 via-orange-50/92 to-amber-100/95 rounded-lg" />

              {/* Decorative border */}
              <div
                className="absolute inset-0 rounded-lg border-4 border-amber-700/40"
                style={{
                  boxShadow:
                    "inset 0 0 30px rgba(180, 83, 9, 0.1)",
                }}
              />

              {/* Inner decorative border */}
              <div className="absolute inset-3 rounded border border-amber-900/20" />

              {/* Close button */}
              <button
                onClick={() => setSelectedGroup(null)}
                className="absolute right-6 top-6 z-10 rounded-full border-2 border-amber-800/60 bg-amber-50/80 p-2.5 backdrop-blur-sm transition-all hover:bg-amber-100 hover:scale-110 hover:border-amber-900"
              >
                <X className="h-5 w-5 text-amber-900" />
              </button>

              {/* Content */}
              <div className="relative z-10 space-y-7">
                {/* Title */}
                <div className="flex items-center gap-4 border-b-2 border-amber-900/20 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-8 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full" />
                    <div className="w-1 h-6 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full" />
                  </div>
                  <h3
                    className="text-4xl font-bold tracking-wide text-amber-950"
                    style={{
                      fontFamily:
                        "'Source Han Serif SC', 'Noto Serif SC', serif",
                    }}
                  >
                    {selectedGroup.name}
                  </h3>
                </div>

                {/* Words in this group */}
                <div className="flex flex-wrap gap-3">
                  {selectedGroup.words.map((word, i) => (
                    <span
                      key={i}
                      className="px-5 py-2.5 rounded border-2 border-amber-800/30 bg-gradient-to-br from-amber-100/60 to-orange-100/60 text-amber-950 shadow-sm hover:shadow-md transition-all hover:border-amber-800/50"
                      style={{
                        fontFamily:
                          "'Source Han Serif SC', 'Noto Serif SC', serif",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 py-2">
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-800/60" />
                    <div
                      className="text-sm tracking-[0.3em] text-amber-900/80"
                      style={{
                        fontFamily:
                          "'Source Han Serif SC', 'Noto Serif SC', serif",
                      }}
                    >
                      意象内涵
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-800/60" />
                  </div>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />
                </div>

                {/* Description */}
                <div className="relative rounded-lg border-2 border-amber-800/25 bg-gradient-to-br from-white/40 to-amber-50/40 p-8 backdrop-blur-sm">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-900/40 -translate-x-px -translate-y-px" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-900/40 translate-x-px -translate-y-px" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-900/40 -translate-x-px translate-y-px" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-900/40 translate-x-px translate-y-px" />

                  <p
                    className="text-lg leading-relaxed text-gray-900 indent-8"
                    style={{
                      fontFamily:
                        "'Source Han Serif SC', 'Noto Serif SC', serif",
                      lineHeight: "2.2",
                    }}
                  >
                    {selectedGroup.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}