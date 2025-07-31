{isDesktop ? (
                      /* DESKTOP LAYOUT - Single row with title, search, and all buttons */
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          alignSelf: "stretch",
                          position: "relative",
                        }}
                      >
                        {/* Title */}
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "18px",
                            fontWeight: 600,
                            lineHeight: "28px",
                          }}
                        >
                          Invites
                        </div>

                        {/* Search Input */}
                        <div
                          style={{
                            display: "flex",
                            height: "40px",
                            padding: "8px",
                            alignItems: "center",
                            gap: "8px",
                            width: "234px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7963 10.7963 13.3333 7.66667 13.3333C4.53705 13.3333 2 10.7963 2 7.66667C2 4.53705 4.53705 2 7.66667 2C10.7963 2 13.3333 4.53705 13.3333 7.66667Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <input
                            type="text"
                            placeholder="Search by Name, SSN, State.."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              flex: "1 0 0",
                              color: "#717680",
                              fontFamily: "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "20px",
                            }}
                          />
                        </div>

                        {/* Action Buttons - Desktop */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          {/* Filters Button */}
                          <button
                            onClick={() => console.log("Filters clicked")}
                            onMouseEnter={() => setHoveredButton("filters")}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{
                              display: "flex",
                              minHeight: "36px",
                              padding: "6px 8px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: hoveredButton === "filters" ? "#FDFDFD" : "#FFF",
                              boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
                              transition: "background-color 0.2s ease",
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.83333 14L3.83333 10M3.83333 10C4.56971 10 5.16667 9.40305 5.16667 8.66667C5.16667 7.93029 4.56971 7.33333 3.83333 7.33333C3.09695 7.33333 2.5 7.93029 2.5 8.66667C2.5 9.40305 3.09695 10 3.83333 10ZM3.83333 4.66667V2M8.5 14V10M8.5 4.66667V2M8.5 4.66667C7.76362 4.66667 7.16667 5.26362 7.16667 6C7.16667 6.73638 7.76362 7.33333 8.5 7.33333C9.23638 7.33333 9.83333 6.73638 9.83333 6C9.83333 5.26362 9.23638 4.66667 8.5 4.66667ZM13.1667 14V11.3333M13.1667 11.3333C13.903 11.3333 14.5 10.7364 14.5 10C14.5 9.26362 13.903 8.66667 13.1667 8.66667C12.4303 8.66667 11.8333 9.26362 11.8333 10C11.8333 10.7364 12.4303 11.3333 13.1667 11.3333ZM13.1667 6V2" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>
                              Filters
                            </div>
                          </button>

                          {/* Other buttons continue... */}
                        </div>
                      </div>
                    ) : (
                      /* TABLET/MOBILE LAYOUT - Existing complex layout */
                      <div>Tablet/Mobile Layout Here</div>
                    )}
