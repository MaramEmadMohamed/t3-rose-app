import { Sarabun, Tajawal } from "next/font/google";

// English: Regular (400), Medium (500), Semibold (600), Bold (700)
export const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sarabun",
  display: "swap",
});

// Arabic: Regular (400), Medium (500), Bold (700), Extra Bold (800)
export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});