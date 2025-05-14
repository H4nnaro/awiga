"use client";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { soapNoodlesData } from "../../public/data/soap-noodles";
import Image from "next/image";

export default function SoapNoodles() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof soapNoodlesData)[0] | null
  >(null);

  return (
    <div className="container mx-auto px-16 md:px-20 py-20 min-h-screen">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-12 text-neutral-900 tracking-wider">
        <span className="relative inline-block">
          Soap Noodles
          <span className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded"></span>
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {soapNoodlesData.map((product, index) => (
          <button
            key={index}
            onClick={() => setSelectedProduct(product)}
            className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 group h-full flex flex-col"
          >
            <div className="h-56 w-full">
              {/* Added fixed height container */}
              <Image
                src={product.image}
                alt={product.type}
                width={1080}
                height={720}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 rounded-2xl"
              />
            </div>
            <div className="p-6 text-left">
              <h2 className="text-xl font-semibold text-neutral-900 mb-1">
                {product.type}
              </h2>
              <p className="text-neutral-600 text-base flex items-center">
                <span className="mr-2">Click to see specs</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </p>
            </div>
          </button>
        ))}
      </div>

      <Transition appear show={selectedProduct !== null} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setSelectedProduct(null)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-6">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all">
                  <div className="flex justify-between items-center mb-6">
                    <DialogTitle className="text-2xl font-bold text-neutral-900">
                      {selectedProduct?.type}
                    </DialogTitle>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {selectedProduct && (
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="w-full lg:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden shadow-lg">
                          <Image
                            src={selectedProduct.image}
                            alt={selectedProduct.type}
                            className="rounded-2xl object-cover w-full h-64 transform hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" />
                        </div>
                      </div>

                      <div className="w-full lg:w-1/2 overflow-x-auto">
                        <div className="rounded-xl overflow-hidden shadow-lg border border-neutral-200">
                          <table className="w-full border-collapse text-sm">
                            <thead className="bg-neutral-100">
                              <tr>
                                <th className="px-6 py-3 text-left font-semibold">
                                  Parameter
                                </th>
                                <th className="px-6 py-3 text-left font-semibold">
                                  Value
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedProduct.specifications.map((spec, i) => (
                                <tr
                                  key={i}
                                  className={
                                    i % 2 === 0 ? "bg-white" : "bg-neutral-50"
                                  }
                                >
                                  <td className="px-6 py-3">
                                    {spec.parameter}
                                  </td>
                                  <td className="px-6 py-3">{spec.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
