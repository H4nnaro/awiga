import { Leaf, Zap } from "lucide-react";
import Image from "next/image";
import React, { memo } from "react";

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: "easeInOut" },
};

const content = {
  vision: {
    title: "Our Vision",
    text: "Sustainable body care for healthier families, thriving communities, and a greener planet.",
    icon: <Leaf className="text-emerald-400" size={40} />,
  },
  mission: {
    title: "Our Mission",
    text: [
      "Craft eco-friendly soaps with sustainable ingredients.",
      "Use clean technology for a carbon-negative impact.",
      "Ensure packaging is recyclable or biodegradable.",
      "Support communities through ethical production.",
    ],
    icon: <Zap className="text-sky-400" size={40} />,
  },
};

const ContentSection = memo(
  ({
    title,
    text,
    icon,
    children,
  }: {
    title: string;
    text?: React.ReactNode;
    icon: React.ReactNode;
    children?: React.ReactNode;
  }) => (
    <div className="group relative rounded-2xl p-10 hover:shadow-2xl transition-all duration-300 ease-in-out backdrop-blur-sm bg-white/5">
      <div className="flex items-start space-x-8">
        <div className="p-5 rounded-xl bg-black/20 shadow-lg transform transition-transform group-hover:scale-110">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-4xl font-bold text-white mb-6 tracking-tight">
            {title}
          </h3>
          {text && (
            <p className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed">
              {text}
            </p>
          )}
          <span className="text-gray-200">{children}</span>
        </div>
      </div>
    </div>
  )
);

ContentSection.displayName = "ContentSection";

const CompanyProfile = memo(() => {
  return (
    <div {...pageTransition} className="py-4 md:py-20 bg-neutral-900 text-sm">
      <div className="container mx-auto xl:space-x-12 px-16 md:px-20 grid xl:grid-cols-2">
        <div className="relative rounded-3xl overflow-hidden bg-gray-100 h-[200px] mb-8 xl:mb-0 xl:h-[930px] shadow-2xl">
          <Image
            src="https://plus.unsplash.com/premium_photo-1678903964473-1271ecfb0288?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sustainable innovation in action"
            fill
            className="absolute inset-0 object-cover transform transition-transform hover:scale-105 duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="space-y-16 h-full flex flex-col">
          <header className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text">
              History
            </h1>
            <p className="text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed">
              Where sustainable soap and innovation come together to create a
              lasting impact for families and the planet.
            </p>
          </header>

          <div className="mb-12 space-y-12 flex-1">
            <ContentSection {...content.vision} />
            <ContentSection
              title={content.mission.title}
              icon={content.mission.icon}
              text={null}
            >
              <ul className="list-disc pl-8 flex flex-col gap-4 text-xl">
                {content.mission.text.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </ContentSection>
          </div>
        </div>
      </div>
    </div>
  );
});

CompanyProfile.displayName = "CompanyProfile";

export default CompanyProfile;
