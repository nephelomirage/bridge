import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Home, Layers, Heart } from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: "/", label: "首页", icon: <Home className="h-4 w-4" /> },
  { path: "/identity", label: "三重身份", icon: <Layers className="h-4 w-4" /> },
  { path: "/cultural-meaning", label: "文化意蕴", icon: <Heart className="h-4 w-4" /> },
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="flex gap-2 rounded-full border border-white/20 bg-black/30 p-2 backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm tracking-wide transition-all ${
                isActive
                  ? "text-white"
                  : "text-white/60 hover:text-white/90"
              }`}
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 to-pink-500/30"
                  layoutId="nav-indicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}