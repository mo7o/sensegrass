import React from "react";
import "bulma/css/bulma.css";
import "./Dashboard.scss";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../../queries";
import Map from "../Map/Map";
import { observer, inject } from "mobx-react";

function Dashboard() {
  return (
    <div className="main" style={{ backgroundColor: "#EEEEEE" }}>
      <Query query={GET_CURRENT_USER}>
        {({ data, loading, error }) => {
          if (loading)
            return (
              <div
                style={{
                  backgroundColor: "#FFF",
                  height: "100vh",
                  padding: "15% 40%"
                }}
              >
                <img src={require("../../assets/images/spinner.gif")} alt="" />
              </div>
            );
          if (error) return <div>Error..</div>;
          console.log(data);

          return (
            <div className="container is-fluid container-main">
              <div className="columns">
                <div className="column">
                  <div className="field-block-1">
                    <h1 className="heading-3">Field Insights</h1>
                    <div className="columns is-mobile">
                      <div className="column">
                        <div className="text-block-2">
                          28.6<span className="subscript">%</span>
                        </div>
                        <div className="text-block">Avg.Moisture</div>
                      </div>
                      <div className="column">
                        <div className="text-block-2">
                          146<span className="subscript">bu/ac</span>
                        </div>
                        <div className="text-block">Avg.Yield</div>
                      </div>
                      <div className="column">
                        <div className="text-block-2">
                          93<span className="subscript">ac</span>
                        </div>
                        <div className="text-block">Total Harvest</div>
                      </div>
                    </div>
                  </div>
                  <div className="field-block-2">
                    <div className="columns">
                      <div className="column">
                        <div className="prescription">
                          <h1 className="heading-3">prescription</h1>
                          <div className="div-block-17">
                            <span className="link-block w-inline-block">
                              <div className="text-block-3">
                                <span role="img" aria-label="">
                                  💧
                                </span>
                              </div>
                              <p className="paragraph-3">
                                Based on forecasted weather its recommended to
                                pump 130Gallons by Today
                              </p>
                            </span>
                            <span className="link-block w-inline-block">
                              <div className="text-block-3">
                                <span role="img" aria-label="">
                                  🌽
                                </span>
                              </div>
                              <p className="paragraph-3">
                                Add Manure &amp; pest control in 3 block from
                                east
                              </p>
                            </span>
                            <span className="link-block w-inline-block">
                              <div className="text-block-3">
                                <span role="img" aria-label="">
                                  🚜
                                </span>
                              </div>
                              <p className="paragraph-3">
                                Start harvest planing for 2nd week of next month
                                for best yield and market rate
                              </p>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field-levels-container">
                          <div className="div-block-18">
                            <h1 className="heading-3">
                              <strong>potassium</strong> Level
                            </h1>
                            <div className="div-block-20">
                              <div>
                                <div className="text-block-2 senseval">120</div>
                                <div className="text-block senseval">
                                  Inc from last week
                                </div>
                              </div>
                              <img
                                src={require("../../assets/images/Group-2-min-1.png")}
                                width="67"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="div-block-18">
                            <h1 className="heading-3">
                              <strong>Nitrogen</strong> Level
                            </h1>
                            <div className="div-block-20">
                              <div>
                                <div className="text-block-2 senseval">40</div>
                                <div className="text-block senseval">
                                  Dec from last week
                                </div>
                              </div>
                              <img
                                src={require("../../assets/images/Group-2-Copy-min-1.png")}
                                width="67"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="div-block-18">
                            <h1 className="heading-3">
                              <strong>phosphorus</strong> Level
                            </h1>
                            <div className="div-block-20">
                              <div>
                                <div className="text-block-2 senseval">
                                  60<span className="subscript"></span>
                                </div>
                                <div className="text-block senseval">
                                  Inc from last week
                                </div>
                              </div>
                              <img
                                src={require("../../assets/images/Group-2-Copy-2-min.png")}
                                width="67"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="div-block-18">
                            <h1 className="heading-3">
                              <strong>soilmoisture</strong> Level
                            </h1>
                            <div className="div-block-20">
                              <div>
                                <div className="text-block-2 senseval">
                                  113<span className="subscript"></span>
                                </div>
                                <div className="text-block senseval">
                                  Inc from last week
                                </div>
                              </div>
                              <img
                                src={require("../../assets/images/Group-2-min-1.png")}
                                width="67"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="div-block-18">
                            <h1 className="heading-3">
                              <strong>temperature</strong> Level
                            </h1>
                            <div className="div-block-20">
                              <div>
                                <div className="text-block-2 senseval">
                                  29.2<span className="subscript"></span>
                                </div>
                                <div className="text-block senseval">
                                  Inc from last week
                                </div>
                              </div>
                              <img
                                src={require("../../assets/images/Group-2-Copy-min-1.png")}
                                width="67"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="div-block-18">
                            <h1 className="heading-3">
                              <strong>PH</strong> Level
                            </h1>
                            <div className="div-block-20">
                              <div>
                                <div className="text-block-2 senseval">
                                  12.9<span className="subscript"></span>
                                </div>
                                <div className="text-block senseval">
                                  Inc from last week
                                </div>
                              </div>
                              <img
                                src={require("../../assets/images/Group-2-Copy-2-min.png")}
                                width="67"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="div-block-embed" style={{ height: 615 }}>
                    <Map username={data.getCurrentUser.username} />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    </div>
  );
}

export default inject("mapStore")(observer(Dashboard));
