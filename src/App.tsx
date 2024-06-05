import { TradingChart } from "./components/CandlestickChart";
import { InvestmentChart } from "./components/InvestmentChart";

import img from "./logov3.png";

export const App = () => {
  return (
    <div style={{ margin: "0 12px" }}>
      <div
        style={{
          width: "130px",
          height: "90px",
          position: "fixed",
          bottom: 0,
          left: 0,
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
          }}
          src={img}
          alt=""
        />
      </div>
      <InvestmentChart />
    </div>
  );
};
