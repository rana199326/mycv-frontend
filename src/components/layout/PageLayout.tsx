// src/layout/PageLayout.tsx
import { ReactNode } from "react";
import defaultBg from "../../assets/images/bg-profil.png"; 

type PageLayoutProps = { 
  children: ReactNode;
  backgroundImage?: string;
};

export default function PageLayout({ children, backgroundImage }: PageLayoutProps) {
  const bg = backgroundImage ?? defaultBg;

  return (
    <div
      className="
        relative w-full min-h-full pt-16
        bg-white md:bg-transparent
        md:flex md:justify-center md:items-start
      "
    >
      {/* Background */}
      <div
        className="hidden md:block fixed inset-0 -z-10 bg-center bg-cover"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <div
        className="
          w-full p-3
          md:max-w-2xl md:mx-auto
          bg-white md:bg-white/90 md:backdrop-blur-sm
          md:rounded-2xl md:shadow-lg md:overflow-hidden
        "
      >
        {children}
      </div>
    </div>
  );
}
