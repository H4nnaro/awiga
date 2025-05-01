"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Building, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import React, { memo } from "react";

const Contact = memo(() => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative py-20 container mx-auto px-16 md:px-20"
        id="contact"
      >
        {/* Hero Section */}
        <div className="relative h-[300px] rounded-xl bg-neutral-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
          <div className="relative h-full flex items-center justify-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center text-white px-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Connect With Us
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-neutral-200 max-w-2xl mx-auto leading-relaxed">
                Let’s create a cleaner future for every family. Contact us for
                products, collabs, or eco-friendly ideas.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contact Info Only */}
        <div className="max-w-screen-xl mx-auto py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-3 gap-12"
          >
            <div className="flex items-start gap-4">
              <div className="p-4 bg-neutral-900 text-white rounded-lg">
                <Phone />
              </div>
              <div>
                <h4 className="font-semibold text-lg">WhatsApp</h4>
                <Link
                  href="https://wa.me/6281389977767"
                  className="text-neutral-600 underline"
                >
                  +62 813-8997-7767
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-4 bg-neutral-900 text-white rounded-lg">
                <Building />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Our Factory</h4>
                <p className="text-neutral-600 text-base">
                  Jalan Raya Cileungsi No. 1
                  <br />
                  Kampung Baru, Desa Tegal Wangi
                  <br />
                  Kecamatan Jasinga, Kabupaten
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-4 bg-neutral-900 text-white rounded-lg">
                <MapPin />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Office</h4>
                <p className="text-neutral-600">Jakarta, Indonesia</p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            whileHover={{ y: -4 }}
            className="mt-16 w-full h-[500px] bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200"
          >
            <div className="w-full h-full bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
              <span className="text-neutral-400">Map Integration</span>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 p-8 bg-neutral-50 rounded-2xl max-w-3xl mx-auto"
          >
            <div className="text-neutral-600 space-y-4 text-center">
              <p className="text-lg italic">
                "Their natural soaps transformed my skincare routine – gentle,
                effective, and truly eco-conscious!"
              </p>
              <p className="font-medium text-neutral-900">– Butet</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

export default Contact;
