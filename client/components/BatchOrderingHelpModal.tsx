import React from "react";

interface BatchOrderingHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BatchOrderingHelpModal: React.FC<BatchOrderingHelpModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(10, 13, 18, 0.7)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        style={{
          position: "relative",
          width: "400px",
          maxWidth: "100vw",
          height: "100vh",
          background: "#FFF",
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow:
            "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            padding: "24px",
            alignItems: "flex-start",
            gap: "8px",
            alignSelf: "stretch",
            background: "#FFF",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flex: "1 0 0",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "44px",
                height: "44px",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                aspectRatio: "1/1",
                borderRadius: "9999px",
                background: "#D9DEF2",
                position: "relative",
              }}
            >
              <svg
                style={{
                  width: "20px",
                  height: "20px",
                  flexShrink: 0,
                  position: "absolute",
                  left: "12px",
                  top: "12px",
                }}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 11.6667V8.75M10 5.83333H10.0083M8.25 16L9.46667 17.6222C9.6476 17.8635 9.73807 17.9841 9.84897 18.0272C9.94611 18.065 10.0539 18.065 10.151 18.0272C10.2619 17.9841 10.3524 17.8635 10.5333 17.6222L11.75 16C11.9943 15.6743 12.1164 15.5114 12.2654 15.3871C12.4641 15.2213 12.6986 15.104 12.9504 15.0446C13.1393 15 13.3429 15 13.75 15C14.9149 15 15.4973 15 15.9567 14.8097C16.5693 14.556 17.056 14.0693 17.3097 13.4567C17.5 12.9973 17.5 12.4149 17.5 11.25V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V11.25C2.5 12.4149 2.5 12.9973 2.6903 13.4567C2.94404 14.0693 3.43072 14.556 4.04329 14.8097C4.50272 15 5.08515 15 6.25 15C6.65715 15 6.86072 15 7.04959 15.0446C7.30141 15.104 7.53593 15.2213 7.73458 15.3871C7.88357 15.5114 8.00571 15.6743 8.25 16Z"
                  stroke="#344698"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2px",
                flex: "1 0 0",
                position: "relative",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#181D27",
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "24px",
                  position: "relative",
                }}
              >
                Batch Ordering Help
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#535862",
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                  position: "relative",
                }}
              >
                Get Support and understand how Batch Upload works.
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              display: "flex",
              width: "40px",
              height: "40px",
              padding: "8px",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              right: "12px",
              top: "12px",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <svg
              style={{
                width: "24px",
                height: "24px",
                flexShrink: 0,
                position: "relative",
              }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="#A4A7AE"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            padding: "0 24px 20px 24px",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            alignSelf: "stretch",
            position: "relative",
            overflowY: "auto",
            flex: "1 0 0",
          }}
        >
          {/* Introduction */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                color: "#414651",
                fontFamily:
                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "18px",
                position: "relative",
              }}
            >
              Through this interface you can upload a batch of orders. Orders
              are uploaded via an Excel spreadsheet or CSV file. For more
              instructions on the upload process, click "start a new batch".
            </div>
            <div
              style={{
                alignSelf: "stretch",
                color: "#414651",
                fontFamily:
                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "18px",
                position: "relative",
              }}
            >
              This screen lists the batches that have been previously uploaded.
              By default, the list contains batches from the last 7 days. To see
              additional batch runs beyond the last 7 days you can change the
              date range at the top and click "Go".
            </div>
            <div
              style={{
                alignSelf: "stretch",
                color: "#414651",
                fontFamily:
                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "18px",
                position: "relative",
              }}
            >
              The following information is displayed for each batch:
            </div>
          </div>

          {/* Batch Information Table */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "94px",
                  color: "#717680",
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                Key
              </div>
              <div
                style={{
                  width: "146px",
                  color: "#717680",
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                Description
              </div>
            </div>

            {/* Table Rows */}
            {[
              {
                key: "Batch Number",
                description: "A unique number assigned by the system",
              },
              {
                key: "Uploaded By",
                description:
                  "The account and user name of the person who uploaded the file",
              },
              {
                key: "Uploaded On",
                description:
                  "The date and time the batch was uploaded to the system",
              },
              {
                key: "Ordered By",
                description:
                  "The account and user name of the user who will be listed as the requester of the uploaded orders",
              },
            ].map((row, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "94px",
                    color: "#414651",
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  {row.key}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  {row.description}
                </div>
              </div>
            ))}

            {/* Status Section */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "94px",
                  color: "#414651",
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                Status
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#414651",
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  There are five possible statuses:
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  {/* Status badges */}
                  {[
                    {
                      status: "Success",
                      color: "#067647",
                      bg: "#ECFDF3",
                      border: "#ABEFC6",
                      description: "The batch has finished processing",
                    },
                    {
                      status: "Processing",
                      color: "#175CD3",
                      bg: "#EFF8FF",
                      border: "#B2DDFF",
                      description: "The batch has started processing",
                    },
                    {
                      status: "Error",
                      color: "#B42318",
                      bg: "#FEF3F2",
                      border: "#FECDCA",
                      description:
                        'The batch has stopped and will not continue until re-started by clicking "start" link to the right',
                    },
                    {
                      status: "Failed",
                      color: "#B54708",
                      bg: "#FFFAEB",
                      border: "#FEDF89",
                      description:
                        'The batch has stopped and will not continue until re-started by clicking "start" link to the right',
                    },
                  ].map((status, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        width: "242px",
                        alignItems: "flex-start",
                        gap: "16px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: "2px 8px",
                          alignItems: "center",
                          borderRadius: "9999px",
                          border: `1px solid ${status.border}`,
                          background: status.bg,
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: status.color,
                            textAlign: "center",
                            fontFamily:
                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "18px",
                            position: "relative",
                          }}
                        >
                          {status.status}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: "1 0 0",
                          color: "#414651",
                          fontFamily:
                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "18px",
                          position: "relative",
                        }}
                      >
                        {status.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional rows */}
            {[
              {
                key: "Count",
                description: "The total number of orders in the batch",
              },
              {
                key: "Failed",
                description: "The number of orders that failed from this batch",
              },
              {
                key: "Combined",
                description:
                  "Y or N, If Y, then multiple rows in the order which match on PII are combined into a single order. If N, each row is its own order",
              },
              {
                key: "Start At",
                description: "The time the orders will start processing",
              },
              {
                key: "Default FCRA",
                description:
                  "The default FCRA purpose selected when the batch was uploaded. Used if no FCRA purpose is supplied in the individual order",
              },
              {
                key: "Default Package",
                description:
                  "The default package specified when the batch was uploaded and used as the package for an order if no package is specified on the individual order",
              },
            ].map((row, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "94px",
                    color: "#414651",
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  {row.key}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  {row.description}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              alignSelf: "stretch",
              background: "#E9EAEB",
              position: "relative",
            }}
          />

          {/* Divider */}
          <div
            style={{
              height: "1px",
              alignSelf: "stretch",
              background: "#E9EAEB",
              position: "relative",
            }}
          />

          {/* Batch Operations */}
          <div
            style={{
              alignSelf: "stretch",
              color: "#414651",
              fontFamily:
                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "18px",
              position: "relative",
            }}
          >
            On the far right of each row is a list of operations currently
            available for the batch, they are:
          </div>

          {/* Operations Table */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "94px",
                  color: "#717680",
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                Key
              </div>
              <div
                style={{
                  width: "146px",
                  color: "#717680",
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                Description
              </div>
            </div>

            {/* Operations */}
            {[
              {
                key: "Data",
                description:
                  "Downloads a .CSV file of the data used in creating the batch",
              },
              {
                key: "Details",
                description:
                  "Display a list of the orders contained in the batch",
              },
              {
                key: "Stop",
                description:
                  'Stop in batch from further processing. This option is only available if the batch has a status of either "Loaded" or "Processing"',
              },
              {
                key: "Start",
                description:
                  'Restarts the batch. This option resets the status of the batch to "Loaded" processing will resume once the start time is reached. This is only an option when the batch is stopped',
              },
              {
                key: "Reschedule",
                description:
                  "Changes the start time for the batch. Only available when the batch is stopped.",
              },
              {
                key: "Failed",
                description:
                  "This option is available when at least one order from a batch has failed while processing. Click this option to download the CSV data associated with the failed orders",
              },
            ].map((row, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "94px",
                    color: "#414651",
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  {row.key}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  {row.description}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div
            style={{
              alignSelf: "stretch",
              color: "#414651",
              fontFamily:
                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "18px",
              position: "relative",
            }}
          >
            Note: If a batch has already started processing, stopping,
            rescheduling and starting the batch will cause the system to delay
            processing until the currently specified start time is reached
            regardless of the original start time
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              alignSelf: "stretch",
              background: "#E9EAEB",
              position: "relative",
            }}
          />

          {/* Batch Order Details Section */}
          <div
            style={{
              alignSelf: "stretch",
              color: "#181D27",
              fontFamily:
                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "24px",
              position: "relative",
            }}
          >
            Batch Order Details
          </div>

          <div
            style={{
              alignSelf: "stretch",
              color: "#414651",
              fontFamily:
                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "18px",
              position: "relative",
            }}
          >
            If the "Details" option for a batch is clicked a dialog containing a
            list of the orders with the batch is displayed. The list contains
            the following information for each order:
          </div>

          {/* Batch Order Details Table */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "94px",
                  color: "#717680",
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                Key
              </div>
              <div
                style={{
                  width: "146px",
                  color: "#717680",
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                Description
              </div>
            </div>

            {/* Batch Order Details Rows */}
            {[
              { key: "Index", description: "Unique identifier for the order" },
              {
                key: "Processed On",
                description: "When the order was processed",
              },
              {
                key: "Order #",
                description:
                  "The resulting order number, click link to access the HTML order report",
              },
              {
                key: "First",
                description: "The first name of the order subject",
              },
              { key: "Last", description: "The last name of the subject" },
              { key: "SSN", description: "The masked SSN of the subject" },
            ].map((row, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "94px",
                    color: "#414651",
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  {row.key}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  {row.description}
                </div>
              </div>
            ))}

            {/* Status Section for Orders */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "94px",
                  color: "#414651",
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                Status
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#414651",
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  There are four possible statuses:
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  {[
                    {
                      status: "Success",
                      color: "#067647",
                      bg: "#ECFDF3",
                      border: "#ABEFC6",
                      description: "The batch has finished processing",
                    },
                    {
                      status: "Processing",
                      color: "#175CD3",
                      bg: "#EFF8FF",
                      border: "#B2DDFF",
                      description: "The batch has started processing",
                    },
                    {
                      status: "Error",
                      color: "#B42318",
                      bg: "#FEF3F2",
                      border: "#FECDCA",
                      description:
                        'The batch has stopped and will not continue until re-started by clicking "start" link to the right',
                    },
                    {
                      status: "Failed",
                      color: "#B54708",
                      bg: "#FFFAEB",
                      border: "#FEDF89",
                      description:
                        'The batch has stopped and will not continue until re-started by clicking "start" link to the right',
                    },
                  ].map((status, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        width: "242px",
                        alignItems: "flex-start",
                        gap: "16px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: "2px 8px",
                          alignItems: "center",
                          borderRadius: "9999px",
                          border: `1px solid ${status.border}`,
                          background: status.bg,
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color: status.color,
                            textAlign: "center",
                            fontFamily:
                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "18px",
                            position: "relative",
                          }}
                        >
                          {status.status}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: "1 0 0",
                          color: "#414651",
                          fontFamily:
                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "18px",
                          position: "relative",
                        }}
                      >
                        {status.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Operations Description */}
          <div
            style={{
              alignSelf: "stretch",
              color: "#414651",
              fontFamily:
                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "18px",
              position: "relative",
            }}
          >
            On the far right of each row is a list of operations currently
            available for the order, they are.
          </div>

          {/* Order Operations Table */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "94px",
                  color: "#717680",
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                Key
              </div>
              <div
                style={{
                  width: "146px",
                  color: "#717680",
                  fontFamily:
                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                Description
              </div>
            </div>

            {/* Order Operations */}
            {[
              {
                key: "Data",
                description:
                  "Download a copy of the data related to this order",
              },
              {
                key: "Delete",
                description:
                  "This option is only available if the order is unprocessed, and the batch is in a stopped state.",
              },
            ].map((row, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "94px",
                    color: "#414651",
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  {row.key}
                </div>
                <div
                  style={{
                    flex: "1 0 0",
                    color: "#414651",
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  {row.description}
                </div>
              </div>
            ))}
          </div>

          {/* Final Link */}
          <div
            style={{
              alignSelf: "stretch",
              color: "#344698",
              fontFamily:
                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "18px",
              textDecorationLine: "underline",
              position: "relative",
            }}
          >
            For instructions on the uploading process click{" "}
            <span
              style={{
                color: "#344698",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchOrderingHelpModal;
