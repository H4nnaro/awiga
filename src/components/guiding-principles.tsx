import { FlaskRound, Handshake, Leaf, UsersRound } from "lucide-react";
import { memo } from "react";

const content = {
  values: [
    {
      title: "Ethical Commitment",
      text: "We use natural ingredients, ensure cruelty-free practices, and uphold fair wages for the artisans behind our products.",
      icon: <Handshake className="text-gray-600" size={32} />,
    },
    {
      title: "Eco-Conscious Approach",
      text: "Our formulas are 97% biodegradable and packaged with minimal plastic to reduce environmental impact.",
      icon: <Leaf className="text-gray-600" size={32} />,
    },
    {
      title: "Sustainable Innovation",
      text: "15% of our revenue is reinvested into enhancing eco-friendly formulations and sustainable product development.",
      icon: <FlaskRound className="text-gray-600" size={32} />,
    },
    {
      title: "Quality & Craftsmanship",
      text: "Each product is handcrafted with meticulous care, delivering a nourishing skincare experience rooted in authenticity.",
      icon: <UsersRound className="text-gray-600" size={32} />,
    },
  ],
};

const ValuePill = memo(
  ({
    title,
    text,
    icon,
  }: {
    title: string;
    text: React.ReactNode;
    icon: React.ReactNode;
  }) => (
    <div className="rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4 mb-3">
        <div className="p-3 bg-gray-50 rounded-md">{icon}</div>
        <h4 className="text-xl lg:text-xl font-medium text-gray-900">
          {title}
        </h4>
      </div>
      <p className="text-gray-600 text-md md:text-lg">{text}</p>
    </div>
  )
);
export default function GuidingPrinciples() {
  return (
    <>
      {/* Values Section */}
      <section className="container mx-auto px-16 md:px-20 py-20 space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">
            Guiding Principles
          </h2>
          <p className="text-gray-600 text-base md:text-lg lg:text-xl">
            The foundation of every decision, innovation, and partnership.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.values.map((value, index) => (
            <ValuePill key={index} {...value} />
          ))}
        </div>
        {/* Commitment Section */}
        <div className="mt-12 rounded-xl p-12 bg-neutral-900 text-white">
          <h3 className="text-4xl font-bold mb-2">Sustainable Commitment</h3>
          <p className="text-gray-200 text-base md:text-lg leading-relaxed">
            "We go beyond cleansing – our products are crafted with responsibly
            sourced ingredients and a focus on reducing environmental impact."
          </p>
        </div>
      </section>
    </>
  );
}
