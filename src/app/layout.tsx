import type { Metadata, Viewport } from "next";
import "./globals.css";
import FloatingMobileBar from "@/components/layout/FloatingMobileBar";
import AppointmentModal from "@/components/appointment/AppointmentModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://drrahulsandhu.com"),
  title: {
    default: "Lt Col (Dr) Rahul Sandhu | Surgical Oncologist | Mohali & Chandigarh",
    template: "%s | Lt Col (Dr) Rahul Sandhu",
  },
  description:
    "Lt Col (Dr) Rahul Sandhu is an expert Surgical Oncologist with over 15 years of experience in advanced cancer surgery, trauma care, and military medicine. Former Armed Forces Surgical Specialist & Fellowship Trained at HBCHRC.",
  keywords: [
    "Lt Col Dr Rahul Sandhu",
    "Dr Rahul Sandhu",
    "Surgical Oncologist Mohali",
    "Cancer Surgeon Chandigarh",
    "Best Oncologist Punjab",
    "Tumor Resection",
    "Breast Cancer Surgeon Mohali",
    "Minimally Invasive Cancer Surgery",
    "Shalby Hospital Mohali Oncologist",
    "ClearMedi Healthcare Oncologist",
  ],
  authors: [{ name: "Lt Col (Dr) Rahul Sandhu" }],
  creator: "Lt Col (Dr) Rahul Sandhu",
  publisher: "Dr Rahul Sandhu Surgical Oncology",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://drrahulsandhu.com",
    title: "Lt Col (Dr) Rahul Sandhu | Surgical Oncologist",
    description:
      "Expert surgical oncology care focused on accurate diagnosis, individualized treatment, and supportive patient guidance by Lt Col (Dr) Rahul Sandhu.",
    siteName: "Dr Rahul Sandhu - Surgical Oncologist",
    images: [
      {
        url: "/images/Dr-Rahul-Sandhu-original.jpeg",
        width: 1200,
        height: 630,
        alt: "Lt Col (Dr) Rahul Sandhu - Surgical Oncologist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lt Col (Dr) Rahul Sandhu | Surgical Oncologist",
    description:
      "Advanced surgical oncology care and compassionate cancer surgery in Mohali & Chandigarh.",
    images: ["/images/Dr-Rahul-Sandhu-original.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/cropped-dr.-rahul-sandhu_fav-icon-32x32.png",
    apple: "/images/cropped-dr.-rahul-sandhu_fav-icon-180x180.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#17665F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://drrahulsandhu.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#283941] antialiased selection:bg-[#17665F]/15 selection:text-[#142B3D]">
        {children}
        <FloatingMobileBar />
        <AppointmentModal />
      </body>
    </html>
  );
}
