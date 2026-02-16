import { loadFont as loadGotu } from "@remotion/google-fonts/Gotu";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

const { fontFamily: gotuFamily } = loadGotu();
const { fontFamily: montserratFamily } = loadMontserrat("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const FONTS = {
  display: gotuFamily,
  body: montserratFamily,
} as const;

// From Global.css :root
export const COLORS = {
  primary: "#C7866C",
  primaryDark: "#372118",
  primaryLight: "#F2DED6",
  secondary: "#945941",
  accent: "#A6AF6B",
  offWhite: "#FBF7F5",
  textPrimary: "#F2DED6",
  textMuted: "rgba(255, 255, 255, 0.6)",
  textPlaceholder: "rgba(255, 255, 255, 0.5)",
  bgGlass: "rgba(0, 0, 0, 0.8)",
  bgGlassLight: "rgba(255, 255, 255, 0.05)",
  bgGlassLighter: "rgba(255, 255, 255, 0.1)",
  bgOverlay: "rgba(26, 26, 26, 0.95)",
  borderGlass: "rgba(255, 255, 255, 0.08)",
  borderLight: "rgba(255, 255, 255, 0.1)",
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#60a5fa",
  bg: "#0f0f23",
} as const;

// Certification / intention colors (from GroupBentoCard + InterestCard)
export const CERT_COLORS: Record<string, string> = {
  trusted: "#22C55E",
  distrusted: "#EF4444",
  work: "#3B82F6",
  learning: "#06B6D4",
  fun: "#F59E0B",
  inspiration: "#8B5CF6",
  buying: "#EC4899",
};

// Triplet syntax coloring (from HistoryTab/PulseTab)
export const TRIPLET_COLORS = {
  subject: "#60a5fa",
  predicate: "#34d399",
  object: "#fbbf24",
} as const;

export const GRADIENTS = {
  iridescence:
    "linear-gradient(135deg, #D790C7 0%, #d37cbf 20%, #ffc6b0 50%, #ffa7b1 80%, #cea2fd 100%)",
  progress:
    "linear-gradient(90deg, #C7866C, #D4A574)",
} as const;

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
