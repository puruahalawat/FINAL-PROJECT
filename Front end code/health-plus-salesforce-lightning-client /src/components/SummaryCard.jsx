import React from "react";
import { NumericFormat } from "react-number-format";

export default function SummaryCard({ count = "0", title, isLoading }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
            {isLoading ? (
              <span className="block h-9 w-24 bg-gray-200 rounded animate-pulse"></span>
            ) : (
              <NumericFormat
                value={count}
                displayType="text"
                thousandSeparator
                decimalScale={2}
              />
            )}
          </span>
          <h3 className="text-base font-normal text-gray-500">{title}</h3>
        </div>
      </div>
    </div>
  );
}
