import React from "react";
import "bulma/css/bulma.css";
import "../App.scss";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../../queries";

function Data() {
  return (
    <div className="main" style={{ backgroundColor: "#EEEEEE" }}>
      {/* <h1 className="title">Home</h1> */}
      <Query query={GET_CURRENT_USER}>
        {({ data, loading, error }) => {
          if (loading)
            return (
              <div>
                <button
                  class="button is-warning is-loading is-large"
                  style={{
                    margin: "20% 47%",
                    backgroundColor: "#EEEEEE",
                    borderColor: "transparent"
                  }}
                ></button>
              </div>
            );
          if (error) return <div>Error Loading..</div>;
          console.log(data);

          return (
            <div className="container is-fluid container-main">
              <div className="columns">
                <div className="column is-9">
                  <div className="data-info div-block-30">
                    <div class="text-block-13">Sensor Data Set</div>
                    <div
                      data-hover="1"
                      data-delay="0"
                      class="dropdown w-dropdown"
                    >
                      <div class="dropdown-toggle w-dropdown-toggle">
                        <div class="w-icon-dropdown-toggle"></div>
                        <div class="text-block-14">Device 1</div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <div
                        id="w-node-e4b8170a64b2-9b85d80e"
                        class="div-block-28"
                      >
                        <div class="div-block-29">
                          <div class="text-block-10">Nitrogen (N)</div>
                          <div class="text-block-10 health">Good</div>
                        </div>
                        <div class="skill-wrapper splash">
                          <div class="text-block-11">Today - 92%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper d-strategy">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress"
                              ></div>
                            </div>
                          </div>
                          <div class="text-block-11">3 Days - 78%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper info-arch">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress bad"
                              ></div>
                            </div>
                          </div>
                          <div class="text-block-11">1 week - 92%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper strategy">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress"
                              ></div>
                            </div>
                          </div>
                          <div class="text-block-11">1 Month- 95%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper business-str">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress"
                              ></div>
                            </div>
                          </div>
                          <div class="text-block-11">3 Months - 95%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper business-str">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress"
                              ></div>
                            </div>
                          </div>

                          <div class="circle out-line">
                            <div class="amount">
                              92% <br />
                              Avg. Value
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div
                        id="w-node-a9eed7ad455f-9b85d80e"
                        class="div-block-28"
                      >
                        <div class="div-block-29">
                          <div class="text-block-10">Phosphorus (P)</div>
                          <div class="text-block-10 health bad">deficient</div>
                        </div>
                        <div class="skill-wrapper splash">
                          <div class="text-block-11">Today - 92%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper d-strategy bad">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress bad"
                              ></div>
                            </div>
                          </div>
                          <div class="text-block-11">3 Days - 78%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper info-arch">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress bad"
                              ></div>
                            </div>
                          </div>
                          <div class="text-block-11">1 week - 88%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper strategy ph">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress"
                              ></div>
                            </div>
                          </div>
                          <div class="text-block-11">1 Month- 58%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper business-str ph">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress bad ph"
                              ></div>
                            </div>
                          </div>
                          <div class="text-block-11">3 Months - 95%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper business-str">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress"
                              ></div>
                            </div>
                          </div>

                          <div class="circle out-line">
                            <div class="amount">
                              76% <br />
                              Avg. Value
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div
                        id="w-node-db17de2204f3-9b85d80e"
                        class="div-block-28"
                      >
                        <div class="div-block-29">
                          <div class="text-block-10">potassium (K)</div>
                          <div class="text-block-10 health">Good</div>
                        </div>
                        <div class="skill-wrapper splash">
                          <div class="text-block-11">Today - 92%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper d-strategy">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress"
                              ></div>
                            </div>
                          </div>
                          <div class="text-block-11">3 Days - 88%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper info-arch">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress"
                              ></div>
                            </div>
                          </div>
                          <div class="text-block-11">1 week - 92%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper strategy">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress"
                              ></div>
                            </div>
                          </div>
                          <div class="text-block-11">1 Month- 95%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper business-str">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress"
                              ></div>
                            </div>
                          </div>
                          <div class="text-block-11">3 Months - 95%</div>
                          <div class="skill-bar">
                            <div class="skill-progress-wrapper business-str">
                              <div
                                data-ix="skill-bar"
                                class="skill-progress"
                              ></div>
                            </div>
                          </div>

                          <div class="circle out-line">
                            <div class="amount">
                              88% <br />
                              Avg. Value
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-3">
                  <div class="div-block-24">
                    <div class="text-block-7">
                      View &amp; Generate
                      <br />
                      Agro-Maps
                    </div>
                  </div>

                  <div class="div-block-25">
                    <div class="text-block-8">Planting</div>
                    <br />
                    <div class="div-block-26">
                      <div class="div-block-27">
                        <div>---</div>
                        <div class="text-block-9">Planted</div>
                      </div>
                      <div class="div-block-27">
                        <div>---</div>
                        <div class="text-block-9">
                          Avg Population
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="div-block-25">
                    <div class="text-block-8">Harvest</div>
                    <br />
                    <div class="div-block-26">
                      <div class="div-block-27">
                        <div>---</div>
                        <div class="text-block-9">
                          Avg Yield
                          <br />
                        </div>
                      </div>
                      <div class="div-block-27">
                        <div>---</div>
                        <div class="text-block-9">
                          Moisture
                          <br />
                        </div>
                      </div>
                      <div class="div-block-27">
                        <div>---</div>
                        <div class="text-block-9">
                          Harvested
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="div-block-25">
                    <div class="text-block-8">Weather</div>
                    <br />
                    <div class="div-block-26">
                      <div class="div-block-27">
                        <div>---</div>
                        <div class="text-block-9">Temp</div>
                      </div>
                      <div class="div-block-27">
                        <div>---</div>
                        <div class="text-block-9">
                          Wind
                          <br />
                        </div>
                      </div>
                      <div class="div-block-27">
                        <div>---</div>
                        <div class="text-block-9">
                          Percipitation
                          <br />
                        </div>
                      </div>
                    </div>
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

export default Data;
