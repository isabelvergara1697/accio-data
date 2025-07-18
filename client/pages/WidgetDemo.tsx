import React from "react";
import { LatestReportsWidget } from "../components/ui/latest-reports-widget";
import { TurnaroundTimeWidget } from "../components/ui/turnaround-time-widget";

const WidgetDemo: React.FC = () => {
  return (
    <div
      style={{
        padding: "32px",
        background: "#FAFAFA",
        minHeight: "100vh",
        fontFamily:
          "Public Sans, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Page Header */}
        <div
          style={{
            marginBottom: "32px",
          }}
        >
          <h1
            style={{
              color: "#181D27",
              fontFamily: "Public Sans",
              fontSize: "24px",
              fontWeight: "600",
              lineHeight: "32px",
              margin: "0 0 8px 0",
            }}
          >
            Widget Container Demo
          </h1>
          <p
            style={{
              color: "#535862",
              fontFamily: "Public Sans",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
              margin: "0",
            }}
          >
            Demonstrating reusable widget containers with different content
            types
          </p>
        </div>

        {/* Widgets Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
            gap: "16px",
            width: "100%",
          }}
        >
          {/* Latest Reports Widget */}
          <div style={{ gridColumn: "1", gridRow: "1" }}>
            <LatestReportsWidget />
          </div>

          {/* Turnaround Time Widget */}
          <div style={{ gridColumn: "2", gridRow: "1" }}>
            <TurnaroundTimeWidget />
          </div>
        </div>

        {/* Features Showcase */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #E9EAEB",
            background: "#FFF",
          }}
        >
          <h2
            style={{
              color: "#181D27",
              fontFamily: "Public Sans",
              fontSize: "18px",
              fontWeight: "600",
              lineHeight: "24px",
              margin: "0 0 16px 0",
            }}
          >
            Widget Container Features
          </h2>
          <ul
            style={{
              color: "#535862",
              fontFamily: "Public Sans",
              fontSize: "14px",
              lineHeight: "20px",
              margin: "0",
              paddingLeft: "20px",
            }}
          >
            <li style={{ marginBottom: "8px" }}>
              <strong>Drag & Drop:</strong> Hidden drag button appears on widget
              hover with visual feedback
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Border Resize:</strong> Hover near widget borders for
              resize cursor and visual feedback
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Menu Dropdown:</strong> Three-dot menu with customizable
              actions and hover states
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Universal Hover:</strong> Consistent light grey hover
              states across all interactive elements
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Reusable Container:</strong> Drop in any content while
              maintaining all interactions
            </li>
            <li>
              <strong>Responsive Design:</strong> Adapts to different screen
              sizes and content types
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WidgetDemo;
