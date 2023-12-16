import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Analytics from "./pages/Analytics";
import Brand from "./pages/Brand";
import DThreePaiChart from "./pages/DThreePei";
import DThreeHistogram from "./pages/DThreeHistogram";
import PreLoader from "./components/Preloader/PreLoader";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <>
          <Routes>
            <Route exact path="/" element={<Analytics />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/dthreepei" element={<DThreePaiChart />} />
            <Route path="/dthreehistogram" element={<DThreeHistogram />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
