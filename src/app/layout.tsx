import type { Metadata } from "next";
import { Roboto_Mono, WindSong } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const windSong = WindSong({
  variable: "--font-wind-song",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Developer Portfolio | Flutter & React Developer",
  description:
    "Experienced Flutter and React developer specializing in creating beautiful, responsive, and high-performance applications. View my projects, skills, and professional journey.",
  keywords: [
    "Flutter",
    "React",
    "Developer",
    "Portfolio",
    "Web Development",
    "Mobile Development",
    "Frontend",
    "UI/UX",
  ],
  authors: [{ name: "Portfolio Owner" }],
  creator: "Portfolio Owner",
  publisher: "Portfolio Owner",
  robots: "index, follow",
  metadataBase: new URL("https://portfolio-website.com"),
  openGraph: {
    title: "Developer Portfolio | Flutter & React Developer",
    description:
      "Experienced Flutter and React developer specializing in creating beautiful, responsive applications",
    images: ["/images/portfolio-og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Portfolio | Flutter & React Developer",
    description: "Experienced Flutter and React developer portfolio",
    images: ["/images/portfolio-twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} ${windSong.variable} antialiased font-mono`}
      >
        {children}
      </body>
    </html>
  );
}
