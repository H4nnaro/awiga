"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Subcategory = {
  label: string;
  href: string;
};

type Page = {
  id: string;
  label: string;
  href: string;
  subcategories?: Subcategory[];
};

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);

  const toggleDropdown = (id: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const toggleMobileDropdown = (id: string) => {
    setActiveMobileDropdown((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdown &&
        !document.getElementById(activeDropdown)?.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeDropdown]);

  const pages: Page[] = [
    { id: "home", label: "Home", href: "/" },
    {
      id: "products",
      label: "Products",
      href: "#",
      subcategories: [
        { label: "Soap Noodles", href: "#soap-noodles" },
        { label: "Bar Soaps", href: "#bar-soaps" },
        { label: "Cosmetics", href: "#cosmetics" },
      ],
    },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderLink = (page: Page, onClose: () => void) => {
    const baseClass = `block p-2 ${
      isActive(page.href) ? "font-semibold" : "text-white"
    }`;

    return page.href.startsWith("#") ? (
      <button
        onClick={() => {
          scrollToSection(page.href);
          onClose();
        }}
        className={`${baseClass} text-left w-full`}
      >
        {page.label}
      </button>
    ) : (
      <Link href={page.href} onClick={onClose} className={baseClass}>
        {page.label}
      </Link>
    );
  };

  const renderDesktopLink = (page: Page) => {
    const baseClass = `text-lg transition-all duration-200 ${
      isActive(page.href) ? "font-semibold" : "font-normal text-white"
    }`;

    return page.href.startsWith("#") ? (
      <button
        onClick={(e) => {
          e.stopPropagation();
          scrollToSection(page.href);
          setActiveDropdown(null);
        }}
        className={baseClass}
      >
        {page.label}
      </button>
    ) : (
      <Link href={page.href} className={baseClass}>
        {page.label}
      </Link>
    );
  };

  return (
    <div className="flex flex-col bg-neutral-900 text-white">
      <nav className="px-16 relative py-8 z-50">
        {/* Mobile Navbar Header */}
        <div className="flex 2xl:hidden justify-between items-center">
          <Image src="/images/logo-awiga2.png" alt="Awiga" width={200} />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black bg-opacity-50 2xl:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.2 }}
                className="fixed right-0 top-0 h-full w-80 bg-neutral-900` shadow-lg z-50 2xl:hidden"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Close menu"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <nav className="flex-1 overflow-y-auto">
                    {pages.map((page) => (
                      <div key={page.id} className="mb-2">
                        {page.subcategories ? (
                          <div>
                            <button
                              onClick={() => toggleMobileDropdown(page.id)}
                              className={`w-full flex justify-between items-center p-2 ${
                                isActive(page.href)
                                  ? "font-semibold"
                                  : "text-white"
                              }`}
                            >
                              <span>{page.label}</span>
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                  activeMobileDropdown === page.id
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                            <AnimatePresence>
                              {activeMobileDropdown === page.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="pl-4"
                                >
                                  {page.subcategories.map(
                                    (sub: Subcategory) => (
                                      <button
                                        key={sub.label}
                                        onClick={() => {
                                          scrollToSection(sub.href);
                                          setIsMenuOpen(false);
                                          setActiveMobileDropdown(null);
                                        }}
                                        className="block p-2 text-sm text-left w-full text-white"
                                      >
                                        {sub.label}
                                      </button>
                                    )
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          renderLink(page, () => setIsMenuOpen(false))
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Navbar */}
        <div className="hidden 2xl:flex flex-row container mx-auto items-center justify-between gap-8">
          <div className="flex items-center justify-center gap-2">
            <Image src="/images/logo-awiga2.png" alt="Awiga" width={220} />
          </div>

          <div className="hidden 2xl:flex items-center gap-10 relative">
            {pages.map((page) => (
              <div key={page.id} id={page.id} className="relative">
                {page.subcategories ? (
                  <>
                    <button
                      className={`flex items-center text-lg ${
                        isActive(page.href)
                          ? "font-semibold"
                          : "font-normal text-white"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(page.id);
                      }}
                    >
                      {page.label}
                      <ChevronDown
                        className={`w-4 h-4 ml-2 transition-transform ${
                          activeDropdown === page.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === page.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute top-full mt-10 left-0 w-56 bg-neutral-900 shadow-md rounded-lg py-2 z-50"
                        >
                          {page.subcategories.map((sub: Subcategory) => (
                            <button
                              key={sub.label}
                              onClick={() => {
                                scrollToSection(sub.href);
                                setActiveDropdown(null);
                              }}
                              className="block px-6 py-2 text-left w-full text-white"
                            >
                              {sub.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  renderDesktopLink(page)
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
