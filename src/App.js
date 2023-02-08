import "./App.scss";
import React, { useRef, useState } from "react";
import imgBackblaze from "./logos/backblaze.png";
import imgBunny from "./logos/bunny.png";
import imgScaleway from "./logos/scaleway.png";
import imgVultr from "./logos/vultr.png";

function App() {
  const [storageValue, setStorageValue] = useState(400);
  const [transferValue, setTransferValue] = useState(400);
  const [bunnyProps, setBunnyProps] = useState("HDD");
  const [scalewayProps, setScalewayProps] = useState("Single");
  const [bunnyMiltiplier, setBunnyMiltiplier] = useState(0.01);
  const [scalewayMiltiplier, setScalewayMiltiplier] = useState(0.03);

  const setHDD = () => {
    setBunnyProps("HDD");
    setBunnyMiltiplier(0.01);
  };

  const setSSD = () => {
    setBunnyProps("SSD");
    setBunnyMiltiplier(0.02);
  };

  const setMulti = () => {
    setScalewayProps("Multi");
    setScalewayMiltiplier(0.06);
  };

  const setSingle = () => {
    setScalewayProps("Single");
    setScalewayMiltiplier(0.03);
  };

  const backblazeRef = useRef(null);
  const bunnyRef = useRef(null);
  const scalewayRef = useRef(null);
  const vultrRef = useRef(null);

  const countPrice = (company) => {
    if (company === "backblaze") {
      if (storageValue * 0.005 + transferValue * 0.01 < 7) {
        return (7).toFixed(2);
      } else {
        return (storageValue * 0.005 + transferValue * 0.01).toFixed(2);
      }
    } else if (company === "bunny") {
      if (storageValue * bunnyMiltiplier + transferValue * 0.01 >= 10) {
        return (10).toFixed(2);
      } else if (storageValue * bunnyMiltiplier + transferValue * 0.01 < 10) {
        return (storageValue * bunnyMiltiplier + transferValue * 0.01).toFixed(
          2
        );
      }
    } else if (company === "scaleway") {
      if (storageValue <= 75 && transferValue <= 75) {
        return (0).toFixed(2);
      } else if (storageValue <= 75 && transferValue > 75) {
        return ((transferValue - 75) * 0.02).toFixed(2);
      } else if (storageValue > 75 && transferValue <= 75) {
        return ((storageValue - 75) * scalewayMiltiplier).toFixed(2);
      } else {
        return (
          (storageValue - 75) * scalewayMiltiplier +
          (transferValue - 75) * 0.02
        ).toFixed(2);
      }
    } else if (company === "vultr") {
      if (storageValue * 0.01 + transferValue * 0.01 < 5) {
        return (5).toFixed(2);
      } else {
        return (storageValue * 0.01 + transferValue * 0.01).toFixed(2);
      }
    }
  };

  const lowestPrice = Math.min(
    countPrice("backblaze"),
    countPrice("bunny"),
    countPrice("scaleway"),
    countPrice("vultr")
  );

  return (
    <div className="App">
      <div className="inputs-wrapper">
        <div className="input-wrapper">
          <span>0</span>
          <input
            type="range"
            id="storage"
            name="storage"
            min="0"
            max="1000"
            step="1"
            value={storageValue}
            onChange={(e) => setStorageValue(e.target.value)}
          />
          <span>1000</span>
        </div>
        <label htmlFor="storage">Storage: {storageValue}GB</label>
        <div className="input-wrapper">
          <span>0</span>
          <input
            type="range"
            id="transfer"
            name="transfer"
            min="0"
            max="1000"
            step="1"
            value={transferValue}
            onChange={(e) => setTransferValue(e.target.value)}
          />
          <span>1000</span>
        </div>
        <label htmlFor="transfer">Transfer: {transferValue}GB</label>
      </div>
      <div className="chart-wrapper">
        <ul className="providers-list">
          <li className="providers-list-item">
            <span>backblaze</span>
            <img src={`${imgBackblaze}`} alt="scaleway" />
          </li>
          <li className="providers-list-item">
            <span>
              bunny
              <div>
                <span
                  className={`${bunnyProps === "HDD" ? "selectedOption" : ""}`}
                  onClick={setHDD}
                >
                  HDD
                </span>
                /
                <span
                  className={`${bunnyProps === "SSD" ? "selectedOption" : ""}`}
                  onClick={setSSD}
                >
                  SSD
                </span>
              </div>
            </span>
            <img src={`${imgBunny}`} alt="scaleway" />
          </li>
          <li className="providers-list-item">
            <span>
              scaleway
              <div>
                <span
                  className={`${
                    scalewayProps === "Multi" ? "selectedOption" : ""
                  }`}
                  onClick={setMulti}
                >
                  Multi
                </span>
                /
                <span
                  className={`${
                    scalewayProps === "Single" ? "selectedOption" : ""
                  }`}
                  onClick={setSingle}
                >
                  Single
                </span>
              </div>
            </span>
            <img src={`${imgScaleway}`} alt="scaleway" />
          </li>
          <li className="providers-list-item">
            <span>vultr</span>
            <img src={`${imgVultr}`} alt="scaleway" />
          </li>
        </ul>
        <div className="chart">
          <div
            ref={backblazeRef}
            className="backblaze"
            style={{
              backgroundColor:
                lowestPrice === Number(countPrice("backblaze"))
                  ? "rgba(255, 0, 0, 0.5)"
                  : "rgb(0, 0, 0, 0.3)",
              width: `${countPrice("backblaze")}%`,
            }}
          >
            {countPrice("backblaze")}$
          </div>
          <div
            ref={bunnyRef}
            className="bunny"
            style={{
              backgroundColor:
                lowestPrice === Number(countPrice("bunny"))
                  ? "rgba(255, 166, 0, 0.5)"
                  : "rgb(0, 0, 0, 0.3)",
              width: `${countPrice("bunny")}%`,
            }}
          >
            {countPrice("bunny")}$
          </div>
          <div
            ref={scalewayRef}
            className="scaleway"
            style={{
              backgroundColor:
                lowestPrice === Number(countPrice("scaleway"))
                  ? "rgba(255, 0, 221, 0.5)"
                  : "rgb(0, 0, 0, 0.3)",
              width: `${countPrice("scaleway")}%`,
            }}
          >
            {countPrice("scaleway")}$
          </div>
          <div
            ref={vultrRef}
            className="vultr"
            style={{
              backgroundColor:
                lowestPrice === Number(countPrice("vultr"))
                  ? "rgba(0, 119, 255, 0.5)"
                  : "rgb(0, 0, 0, 0.3)",
              width: `${countPrice("vultr")}%`,
            }}
          >
            {countPrice("vultr")}$
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
