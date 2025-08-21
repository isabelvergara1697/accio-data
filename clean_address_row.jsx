{/* Address Row - Clean Layout */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                        flexWrap: "nowrap",
                        width: "100%",
                      }}
                    >
                      {/* Address (Street Number and Name) */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: "1 1 auto",
                          minWidth: "200px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          <label
                            style={{
                              color: "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Address (Street Number and Name)
                          </label>
                          <div
                            style={{
                              display: "flex",
                              width: "16px",
                              height: "16px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                              }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_6183_45474)">
                                <path
                                  d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_6183_45474">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "6px 8px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border: focusedField === "address" ? "2px solid #34479A" : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            onFocus={() => setFocusedField("address")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Apt Number with Checkbox */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "4px",
                          width: "140px",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          <label
                            style={{
                              color: "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Apt Number
                          </label>
                          <div
                            style={{
                              display: "flex",
                              width: "16px",
                              height: "16px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                              }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_6187_5434)">
                                <path
                                  d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_6187_5434">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "6px 8px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border: focusedField === "aptNumber" && !formData.aptNotApplicable ? "2px solid #34479A" : "1px solid #D5D7DA",
                            background: formData.aptNotApplicable ? "#F5F5F5" : "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.aptNumber}
                            onChange={(e) => handleInputChange("aptNumber", e.target.value)}
                            onFocus={() => setFocusedField("aptNumber")}
                            onBlur={() => setFocusedField(null)}
                            disabled={formData.aptNotApplicable}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              paddingTop: "2px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Checkbox
                              checked={formData.aptNotApplicable}
                              onCheckedChange={(checked) => {
                                handleInputChange("aptNotApplicable", checked);
                                if (checked) {
                                  handleInputChange("aptNumber", "");
                                }
                              }}
                              style={{
                                backgroundColor: formData.aptNotApplicable ? "#344698" : "transparent",
                                borderColor: formData.aptNotApplicable ? "#344698" : "#D5D7DA",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                color: "var(--colors-text-text-secondary-700, #414651)",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                              }}
                            >
                              Check if not applicable
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* City or Town */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          width: "140px",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          <label
                            style={{
                              color: "var(--colors-text-text-secondary-700, #414651)",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            City or Town
                          </label>
                          <div
                            style={{
                              display: "flex",
                              width: "16px",
                              height: "16px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                              }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_6187_5592)">
                                <path
                                  d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_6187_5592">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "6px 8px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border: focusedField === "cityOrTown" ? "2px solid #34479A" : "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <input
                            type="text"
                            value={formData.cityOrTown}
                            onChange={(e) => handleInputChange("cityOrTown", e.target.value)}
                            onFocus={() => setFocusedField("cityOrTown")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              flex: "1 0 0",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
