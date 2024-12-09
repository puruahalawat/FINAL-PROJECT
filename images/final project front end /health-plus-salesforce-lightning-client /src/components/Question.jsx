import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Question({ question, answer }) {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="bg-[#FCFCFC] max-w-[1072px] w-full border rounded-xl border-[#B3B3B3] p-[20px] flex flex-col gap-[10px]">
      <div
        className="cursor-pointer flex items-center justify-between"
        onClick={() => setCollapse(!collapse)}
      >
        <p className="leading-7">{question}</p>
        {collapse ? <FaChevronUp size="1em" /> : <FaChevronDown size="1em" />}
      </div>
      {collapse && <p className="text-sm text-muted-foreground">{answer}</p>}
    </div>
  );
}

export default Question;
