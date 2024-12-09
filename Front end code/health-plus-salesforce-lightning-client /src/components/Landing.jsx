import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FAQ from "./FAQ";

const Landing = ({ isAuthenticated }) => {
  return (
    <div className="w-full pb-6" id="landing">
      <Header isAuthenticated={isAuthenticated} />
      <section className="py-16 overflow-hidden relative">
        <div className="lg:pl-8 lg:pr-8 lg:gap-8 sm:pl-6 sm:pr-6 pl-5 pr-5 gap-16 items-center max-w-[85vw] flex flex-col sm:flex-row mx-auto z-10 relative">
          <div className="lg:items-start items-center flex-col flex">
            <h1 className="text-center lg:text-left sm:text-[3.75rem] sm:leading-[1.125] text-[#0F172A] font-semibold text-[3rem] leading-[1.125]">
              Embrace Health, <br /> Embrace Life
            </h1>
            <p className="lg:text-left text-[#334155] leading-[2rem] text-xl text-center mt-6">
              Prioritize your well-being, make healthy choices, and live a
              vibrant, <br /> energetic life every day.
            </p>
          </div>
          <div className="lg:mr-0 max-w-[38rem] w-full mx-auto">
            <div className="rounded-lg relative pb-[calc(var(--tw-aspect-h)/var(--tw-aspect-w)*100%)] aspect-[5/5]">
              <img
                src="/login-bg.png"
                alt="illustration"
                className="object-center object-cover rounded-lg absolute inset-0 h-full w-full left-0 top-0 right-0 bottom-0 text-transparent"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="faq px-8 sm:px-12 py-14 sm:py-20">
        <FAQ />
      </section>
      <section className="mb-20">
        <div className="lg:pl-8 lg:pr-8 sm:pl-6 sm:pr-6 pl-5 pr-5 gap-16 max-w-[85vw] flex flex-col mx-auto z-10 relative">
          <div className="lg:items-start items-center flex-col">
            <h4 className="text-center lg:text-left sm:leading-[1.125] text-[#0F172A] font-semibold text-3xl leading-[1.125]">
              Members
            </h4>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-5">
              <img width={100} height={100} src="/avatar.svg" alt="member-1" />
              <p className="text-xl font-bold">Member 1</p>
            </div>
            <div className="flex flex-col items-center gap-5">
              <img width={100} height={100} src="/avatar.svg" alt="member-2" />
              <p className="text-xl font-bold">Member 2</p>
            </div>
            <div className="flex flex-col items-center gap-5">
              <img width={100} height={100} src="/avatar.svg" alt="member-3" />
              <p className="text-xl font-bold">Member 3</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Landing;
