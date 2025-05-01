import BarSoap from "@/components/bar-soap";
import CompanyProfile from "@/components/company-profile";
import Contact from "@/components/contact";
import GuidingPrinciples from "@/components/guiding-principles";
import Hero from "@/components/hero";
import SoapNoodles from "@/components/soap-noodles";
import MainLayout from "@/layouts/main-layout";
import Head from "next/head";

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Awiga</title>
      </Head>
      <Hero />
      <div id="company-profile">
        <CompanyProfile />
      </div>
      <div id="soap-noodles">
        <SoapNoodles />
      </div>
      <div id="bar-soaps">
        <BarSoap />
      </div>
      <div id="guiding-principles">
        <GuidingPrinciples />
      </div>
      <div id="contact" className="contact">
        <Contact />
      </div>
    </MainLayout>
  );
}
