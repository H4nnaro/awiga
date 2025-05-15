import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black/95 border-t border-gray-800 py-12 relative overflow-hidden">
      <div className="container mx-auto px-16 md:px-20">
        {/* Gold decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background:
                "linear-gradient(to right, #60421d, #cb9c4c, #e6b056, #c7974b)",
            }}
          ></div>
          <div
            className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background:
                "linear-gradient(to left, #60421d, #cb9c4c, #e6b056, #c7974b)",
            }}
          ></div>
        </div>

        <div className="mx-auto py-12 max-w-8xl relative z-10">
          <div className="max-w-8xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-16">
              {/* Company Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/logo-awiga2.png"
                    alt="Awiga"
                    width={200}
                    height={100}
                  />
                </div>
                <p className="text-gray-400 text-md leading-relaxed max-w-[300px]">
                  Crafting natural beauty essentials with sustainable practices
                  and organic ingredients.
                </p>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          background:
                            "linear-gradient(to right, #60421d, #cb9c4c, #e6b056, #c7974b)",
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-md font-medium uppercase tracking-wider text-[#cb9c4c] relative pb-2">
                  Navigation
                  <div
                    className="absolute bottom-0 left-0 w-10 h-0.5"
                    style={{
                      background:
                        "linear-gradient(to right, #60421d, #cb9c4c, #e6b056, #c7974b)",
                    }}
                  ></div>
                </h4>
                <nav className="space-y-3">
                  {["Home", "Soap Noodles", "Bar Soaps", "About Us"].map(
                    (link) => (
                      <Link
                        key={link}
                        href={`/${link.toLowerCase().replace(" ", "-")}`}
                        className="block text-gray-400 hover:text-[#cb9c4c] transition-colors text-md group relative"
                      >
                        {link}
                        <span
                          className="block max-w-0 group-hover:max-w-[80%] transition-all duration-300 h-0.5 absolute bottom-0 left-0"
                          style={{
                            background:
                              "linear-gradient(to right, #60421d, #cb9c4c, #e6b056, #c7974b)",
                          }}
                        ></span>
                      </Link>
                    )
                  )}
                </nav>
              </div>

              {/* Support */}
              <div className="space-y-6">
                <h4 className="text-md font-medium uppercase tracking-wider text-[#cb9c4c] relative pb-2">
                  Support
                  <div
                    className="absolute bottom-0 left-0 w-10 h-0.5"
                    style={{
                      background:
                        "linear-gradient(to right, #60421d, #cb9c4c, #e6b056, #c7974b)",
                    }}
                  ></div>
                </h4>
                <nav className="space-y-3">
                  {["Contact Us", "Affiliate Program", "Privacy Policy"].map(
                    (link) => (
                      <Link
                        key={link}
                        href={`/${link.toLowerCase().replace(" ", "-")}`}
                        className="block text-gray-400 hover:text-[#cb9c4c] transition-colors text-md group relative"
                      >
                        {link}
                        <span
                          className="block max-w-0 group-hover:max-w-[80%] transition-all duration-300 h-0.5 absolute bottom-0 left-0"
                          style={{
                            background:
                              "linear-gradient(to right, #60421d, #cb9c4c, #e6b056, #c7974b)",
                          }}
                        ></span>
                      </Link>
                    )
                  )}
                </nav>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 text-md text-gray-500">
                <div>
                  © {new Date().getFullYear()} AWIGA. All rights reserved.
                </div>
                <div className="flex space-x-6">
                  <Link
                    href="/terms-of-service"
                    className="hover:text-[#cb9c4c] transition-colors"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-[#cb9c4c] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
