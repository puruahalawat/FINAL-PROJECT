import React from "react";
import Question from "./Question";
import { HealthFAQ } from "../utils";

const FAQ = () => {
  return (
    <div className="lg:pl-8 lg:pr-8 lg:gap-8 sm:pl-6 sm:pr-6 pl-5 pr-5 gap-16 items-center max-w-[85vw] flex flex-col sm:flex-row mx-auto z-10 relative">
      <div className="lg:items-start items-center flex-col">
        <h4 className="text-center lg:text-left sm:leading-[1.125] text-[#0F172A] font-semibold text-3xl leading-[1.125]">
          FAQs
        </h4>
        <p className="lg:text-left text-[#334155] leading-[2rem] text-[1.125rem] text-center mt-2">
          At Travel Trove, you will find answers to{" "}
          <br className="hidden sm:block" /> some of the most frequently asked{" "}
          <br className="hidden sm:block" /> questions about traveling and visa
          requirements.
        </p>
        <div className="lg:justify-start row-gap-6 gap-x-10 justify-center items-center flex-wrap flex mt-4"></div>
      </div>
      <div className="lg:mr-0 max-w-[40rem] w-full mx-auto">
        <div className="w-full justify-center items-center flex flex-col gap-4">
          {HealthFAQ.map((question, i) => (
            <Question {...question} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
