import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import ChartOne from "../components/ChartOne";
import ChartTwo from "../components/ChartTwo";
import ChartThree from "../components/ChartThree";

const Analytics = () => {
  return (
    <DefaultLayout>
      <ChartOne />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartTwo />
        <ChartThree />
      </div>
    </DefaultLayout>
  );
};

export default Analytics;
