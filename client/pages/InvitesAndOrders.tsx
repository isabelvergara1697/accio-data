import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Checkbox } from "../components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  SimpleTooltip,
} from "../components/ui/tooltip";
import InformationDrawer from "../components/ui/information-drawer";
import { AdvancedSearchDropdown } from "../components/AdvancedSearchDropdown";
import FiltersPanel from "../components/FiltersPanel";
import { MobileFiltersModal } from "../components/MobileFiltersModal";
import { OrdersFiltersDropdown } from "../components/OrdersFiltersDropdown";
import { StatusFiltersDropdown } from "../components/StatusFiltersDropdown";
import { FiltersSelectedDropdown } from "../components/FiltersSelectedDropdown";
import { EwsFiltersDropdown } from "../components/EwsFiltersDropdown";
import { DispositionFiltersDropdown } from "../components/DispositionFiltersDropdown";
import { FlagsFiltersDropdown } from "../components/FlagsFiltersDropdown";
import { CustomizeColumnsModal } from "../components/CustomizeColumnsModal";
import { DownloadDropdown } from "../components/DownloadDropdown";
import {
  TableViewsDropdown,
  TableView,
} from "../components/ui/table-views-dropdown";
import { ActionsPanel } from "../components/ActionsPanel";
import { SelectionBadge } from "../components/SelectionBadge";
import { OrderSummaryModal } from "../components/OrderSummaryModal";
import { InviteSummaryModal } from "../components/InviteSummaryModal";
import { ManageInvitationModal } from "../components/ManageInvitationModal";

interface InviteData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status:
    | "waiting"
    | "unsolicited"
    | "canceled"
    | "expired"
    | "waiting-for-recruitee"
    | "expires-today"
    | "reviewed"
    | "archived";
  completion: number;
  lastEmail: string;
  i9Filled: boolean;
  activated: boolean;
  ews: boolean;
  packageType: string;
}

interface OrderData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  newQuote: string;
  status:
    | "processing"
    | "pending-review"
    | "approved"
    | "rejected"
    | "on-hold"
    | "completed"
    | "canceled"
    | "expired";
  completion: number;
  lastUpdate: string;
  eta: string;
  ews: boolean;
  userId: string;
  dispositionByComponent: {
    mvr: "success" | "error" | "pending";
    criminal: "success" | "error" | "pending";
    verification: "success" | "error" | "pending";
  };
  flags: string[];
}

// Flag Component with tooltips
const FlagBadge: React.FC<{
  type: string;
}> = ({ type }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const flagRef = useRef<HTMLDivElement>(null);

  if (!type) {
    console.warn("FlagBadge: Missing type", { type });
    return null;
  }

  useEffect(() => {
    if (showTooltip && flagRef.current) {
      const rect = flagRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom + 4,
      });
    }
  }, [showTooltip]);

  const getFlagConfig = (flagType: string) => {
    switch (flagType.toLowerCase()) {
      case "flag":
      case "criminal":
        return {
          bg: "#FEE4E2",
          tooltip: "Report contains discrepancies or derogatory information",
          icon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.6665 14L2.6665 2.66667M2.6665 8.66667H7.59984C7.97321 8.66667 8.15989 8.66667 8.3025 8.594C8.42794 8.53009 8.52993 8.4281 8.59384 8.30266C8.6665 8.16005 8.6665 7.97337 8.6665 7.6V3.06667C8.6665 2.6933 8.6665 2.50661 8.59384 2.36401C8.52993 2.23856 8.42794 2.13658 8.3025 2.07266C8.15989 2 7.97321 2 7.59984 2H3.73317C3.3598 2 3.17312 2 3.03051 2.07266C2.90507 2.13658 2.80308 2.23856 2.73917 2.36401C2.6665 2.50661 2.6665 2.6933 2.6665 3.06667V8.66667ZM8.6665 3.33333H12.9332C13.3065 3.33333 13.4932 3.33333 13.6358 3.406C13.7613 3.46991 13.8633 3.5719 13.9272 3.69734C13.9998 3.83995 13.9998 4.02663 13.9998 4.4V8.93333C13.9998 9.3067 13.9998 9.49339 13.9272 9.63599C13.8633 9.76144 13.7613 9.86342 13.6358 9.92734C13.4932 10 13.3065 10 12.9332 10H9.73317C9.3598 10 9.17312 10 9.03051 9.92734C8.90507 9.86342 8.80308 9.76144 8.73917 9.63599C8.6665 9.49339 8.6665 9.3067 8.6665 8.93333V3.33333Z"
                stroke="#D92D20"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      case "warning":
      case "alert":
        return {
          bg: "#FEF0C7",
          tooltip: "Report requires review for final evaluation",
          icon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 6.00015V8.66682M8 11.3335H8.00667M7.07688 2.59464L1.59362 12.0657C1.28948 12.591 1.13742 12.8537 1.15989 13.0693C1.1795 13.2573 1.27801 13.4282 1.43091 13.5394C1.60622 13.6668 1.90973 13.6668 2.51674 13.6668H13.4833C14.0903 13.6668 14.3938 13.6668 14.5691 13.5394C14.722 13.4282 14.8205 13.2573 14.8401 13.0693C14.8626 12.8537 14.7105 12.591 14.4064 12.0657L8.92312 2.59463C8.62007 2.07119 8.46855 1.80947 8.27087 1.72157C8.09843 1.64489 7.90157 1.64489 7.72913 1.72157C7.53145 1.80947 7.37992 2.07119 7.07688 2.59464Z"
                stroke="#DC6803"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      case "archive":
        return {
          bg: "#F5F5F5",
          tooltip: "Report is archived",
          icon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.66683 5.33106C2.55749 5.32824 2.47809 5.32191 2.40671 5.30771C1.87779 5.2025 1.46432 4.78904 1.35912 4.26012C1.3335 4.13132 1.3335 3.97644 1.3335 3.66667C1.3335 3.3569 1.3335 3.20201 1.35912 3.07321C1.46432 2.54429 1.87779 2.13083 2.40671 2.02562C2.53551 2 2.69039 2 3.00016 2H13.0002C13.3099 2 13.4648 2 13.5936 2.02562C14.1225 2.13083 14.536 2.54429 14.6412 3.07321C14.6668 3.20201 14.6668 3.3569 14.6668 3.66667C14.6668 3.97644 14.6668 4.13132 14.6412 4.26012C14.536 4.78904 14.1225 5.2025 13.5936 5.30771C13.5222 5.32191 13.4428 5.32824 13.3335 5.33106M6.66683 8.66667H9.3335M2.66683 5.33333H13.3335V10.8C13.3335 11.9201 13.3335 12.4802 13.1155 12.908C12.9238 13.2843 12.6178 13.5903 12.2415 13.782C11.8137 14 11.2536 14 10.1335 14H5.86683C4.74672 14 4.18667 14 3.75885 13.782C3.38252 13.5903 3.07656 13.2843 2.88482 12.908C2.66683 12.4802 2.66683 11.9201 2.66683 10.8V5.33333Z"
                stroke="#717680"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      case "drug test":
      case "medical":
      case "mvr":
        return {
          bg: "#B9E6FE",
          tooltip: "Report is a drug test",
          icon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3.06667C10 2.6933 10 2.50661 9.92734 2.36401C9.86342 2.23856 9.76144 2.13658 9.63599 2.07266C9.49339 2 9.3067 2 8.93333 2H7.06667C6.6933 2 6.50661 2 6.36401 2.07266C6.23857 2.13658 6.13658 2.23856 6.07266 2.36401C6 2.50661 6 2.6933 6 3.06667V4.93333C6 5.3067 6 5.49339 5.92734 5.63599C5.86342 5.76143 5.76144 5.86342 5.63599 5.92734C5.49339 6 5.3067 6 4.93333 6H3.06667C2.6933 6 2.50661 6 2.36401 6.07266C2.23856 6.13658 2.13658 6.23856 2.07266 6.36401C2 6.50661 2 6.6933 2 7.06667V8.93333C2 9.3067 2 9.49339 2.07266 9.63599C2.13658 9.76144 2.23856 9.86342 2.36401 9.92734C2.50661 10 2.6933 10 3.06667 10H4.93333C5.3067 10 5.49339 10 5.63599 10.0727C5.76144 10.1366 5.86342 10.2386 5.92734 10.364C6 10.5066 6 10.6933 6 11.0667V12.9333C6 13.3067 6 13.4934 6.07266 13.636C6.13658 13.7614 6.23857 13.8634 6.36401 13.9273C6.50661 14 6.6933 14 7.06667 14H8.93333C9.3067 14 9.49339 14 9.63599 13.9273C9.76144 13.8634 9.86342 13.7614 9.92734 13.636C10 13.4934 10 13.3067 10 12.9333V11.0667C10 10.6933 10 10.5066 10.0727 10.364C10.1366 10.2386 10.2386 10.1366 10.364 10.0727C10.5066 10 10.6933 10 11.0667 10H12.9333C13.3067 10 13.4934 10 13.636 9.92734C13.7614 9.86342 13.8634 9.76144 13.9273 9.63599C14 9.49339 14 9.3067 14 8.93333V7.06667C14 6.6933 14 6.50661 13.9273 6.36401C13.8634 6.23857 13.7614 6.13658 13.636 6.07266C13.4934 6 13.3067 6 12.9333 6L11.0667 6C10.6933 6 10.5066 6 10.364 5.92734C10.2386 5.86342 10.1366 5.76143 10.0727 5.63599C10 5.49339 10 5.3067 10 4.93333V3.06667Z"
                stroke="#0BA5EC"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      case "monitoring":
      case "chart":
      case "analytics":
        return {
          bg: "#DCFAE6",
          tooltip: "Report contains monitoring",
          icon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 14H3.06667C2.6933 14 2.50661 14 2.36401 13.9273C2.23856 13.8634 2.13658 13.7614 2.07266 13.636C2 13.4934 2 13.3067 2 12.9333V2M13.3333 5.33333L10.7208 8.12177C10.6217 8.22745 10.5722 8.28029 10.5125 8.3076C10.4598 8.3317 10.4017 8.34164 10.344 8.33644C10.2786 8.33055 10.2143 8.29718 10.0858 8.23045L7.91421 7.10288C7.78569 7.03615 7.72143 7.00278 7.65602 6.99689C7.59829 6.99169 7.54021 7.00163 7.48749 7.02574C7.42777 7.05305 7.37826 7.10589 7.27925 7.21156L4.66667 10"
                stroke="#079455"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      case "rescreening":
      case "refresh":
        return {
          bg: "#D9DEF2",
          tooltip: "Report contains components registered for rescreening",
          icon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0002 6.66667C14.0002 6.66667 12.6635 4.84548 11.5776 3.75883C10.4917 2.67218 8.9911 2 7.3335 2C4.01979 2 1.3335 4.68629 1.3335 8C1.3335 11.3137 4.01979 14 7.3335 14C10.0689 14 12.3768 12.1695 13.099 9.66667M14.0002 6.66667V2.66667M14.0002 6.66667H10.0002"
                stroke="#344698"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      default:
        return {
          bg: "#F5F5F5",
          tooltip: type,
          icon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.66683 5.33106C2.55749 5.32824 2.47809 5.32191 2.40671 5.30771C1.87779 5.2025 1.46432 4.78904 1.35912 4.26012C1.3335 4.13132 1.3335 3.97644 1.3335 3.66667C1.3335 3.3569 1.3335 3.20201 1.35912 3.07321C1.46432 2.54429 1.87779 2.13083 2.40671 2.02562C2.53551 2 2.69039 2 3.00016 2H13.0002C13.3099 2 13.4648 2 13.5936 2.02562C14.1225 2.13083 14.536 2.54429 14.6412 3.07321C14.6668 3.20201 14.6668 3.3569 14.6668 3.66667C14.6668 3.97644 14.6668 4.13132 14.6412 4.26012C14.536 4.78904 14.1225 5.2025 13.5936 5.30771C13.5222 5.32191 13.4428 5.32824 13.3335 5.33106M6.66683 8.66667H9.3335M2.66683 5.33333H13.3335V10.8C13.3335 11.9201 13.3335 12.4802 13.1155 12.908C12.9238 13.2843 12.6178 13.5903 12.2415 13.782C11.8137 14 11.2536 14 10.1335 14H5.86683C4.74672 14 4.18667 14 3.75885 13.782C3.38252 13.5903 3.07656 13.2843 2.88482 12.908C2.66683 12.4802 2.66683 11.9201 2.66683 10.8V5.33333Z"
                stroke="#717680"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
    }
  };

  const flagConfig = getFlagConfig(type);

  useEffect(() => {
    if (!showTooltip) return;
    const tooltip = document.createElement("div");
    tooltip.textContent = flagConfig.tooltip;
    tooltip.style.cssText = `
      position: fixed;
      left: ${tooltipPosition.x}px;
      top: ${tooltipPosition.y}px;
      transform: translateX(-50%);
      background: #181D27;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-family: 'Public Sans', sans-serif;
      font-weight: 500;
      white-space: nowrap;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(tooltip);
    return () => {
      if (document.body.contains(tooltip)) {
        document.body.removeChild(tooltip);
      }
    };
  }, [showTooltip, tooltipPosition.x, tooltipPosition.y, flagConfig.tooltip]);

  return (
    <div
      ref={flagRef}
      style={
        {
          display: "flex",
          width: "28px",
          height: "28px",
          padding: "6px",
          justifyContent: "center",
          alignItems: "center",
          aspectRatio: "1/1",
          borderRadius: "9999px",
          background: flagConfig.bg,
          position: "relative",
          flexShrink: 0,
          cursor: "pointer",
        } as React.CSSProperties
      }
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {flagConfig.icon}
    </div>
  );
};

// Function to generate random flag combinations for each row
const getRandomFlags = (rowIndex: number) => {
  // First row always shows all flags
  if (rowIndex === 0) {
    return {
      icons: [
        "flag",
        "warning",
        "archive",
        "drug test",
        "monitoring",
        "rescreening",
      ],
      labels: ["AA", "PA", "CA"],
    };
  }

  // Define possible combinations based on the Figma design
  const flagCombinations = [
    { icons: ["flag"], labels: ["CA"] },
    { icons: ["warning", "archive"], labels: ["CA"] },
    { icons: ["drug test", "rescreening"], labels: ["CA"] },
    { icons: ["flag"], labels: ["PA"] },
    { icons: ["warning"], labels: ["CA"] },
    { icons: ["archive", "drug test"], labels: ["CA"] },
    { icons: ["monitoring", "rescreening"], labels: ["AA", "CA"] },
    { icons: ["archive"], labels: [] },
    { icons: ["rescreening"], labels: ["CA"] },
  ];

  // Use rowIndex to deterministically select a combination (pseudo-random but consistent)
  const combinationIndex = (rowIndex - 1) % flagCombinations.length;
  return flagCombinations[combinationIndex];
};

// Text Label Component for flags
const TextLabel: React.FC<{
  text: string;
  tooltip: string;
}> = ({ text, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showTooltip && labelRef.current) {
      const rect = labelRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom + 4,
      });
    }
  }, [showTooltip]);

  useEffect(() => {
    if (!showTooltip) return;
    const tooltipEl = document.createElement("div");
    tooltipEl.textContent = tooltip;
    tooltipEl.style.cssText = `
      position: fixed;
      left: ${tooltipPosition.x}px;
      top: ${tooltipPosition.y}px;
      transform: translateX(-50%);
      background: #181D27;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-family: 'Public Sans', sans-serif;
      font-weight: 500;
      white-space: nowrap;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(tooltipEl);
    return () => {
      if (document.body.contains(tooltipEl)) {
        document.body.removeChild(tooltipEl);
      }
    };
  }, [showTooltip, tooltipPosition.x, tooltipPosition.y, tooltip]);

  return (
    <div
      ref={labelRef}
      style={{
        color: "#535862",
        fontFamily: "Public Sans",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "20px",
        cursor: "pointer",
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {text}
    </div>
  );
};

// Disposition Badge Component
const DispositionBadge: React.FC<{
  type: "mvr" | "criminal" | "verification";
  status: "success" | "error" | "pending";
}> = ({ type, status }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const badgeRef = useRef<HTMLDivElement>(null);

  // Add safety check
  if (!type || !status) {
    console.warn("DispositionBadge: Missing type or status", { type, status });
    return null;
  }

  useEffect(() => {
    if (showTooltip && badgeRef.current) {
      const rect = badgeRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom + 4,
      });
    }
  }, [showTooltip]);

  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          bg: "#ECFDF3",
          border: "#ABEFC6",
          text: "#067647",
          icon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_check)">
                <path
                  d="M5.00016 8.00065L7.00016 10.0007L11.0002 6.00065M14.6668 8.00065C14.6668 11.6826 11.6821 14.6673 8.00016 14.6673C4.31826 14.6673 1.3335 11.6826 1.3335 8.00065C1.3335 4.31875 4.31826 1.33398 8.00016 1.33398C11.6821 1.33398 14.6668 4.31875 14.6668 8.00065Z"
                  stroke="#17B26A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_check">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ),
        };
      case "error":
        return {
          bg: "#FEF3F2",
          border: "#FECDCA",
          text: "#B42318",
          icon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_x)">
                <path
                  d="M10.0002 6.00065L6.00016 10.0007M6.00016 6.00065L10.0002 10.0007M14.6668 8.00065C14.6668 11.6826 11.6821 14.6673 8.00016 14.6673C4.31826 14.6673 1.3335 11.6826 1.3335 8.00065C1.3335 4.31875 4.31826 1.33398 8.00016 1.33398C11.6821 1.33398 14.6668 4.31875 14.6668 8.00065Z"
                  stroke="#F04438"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_x">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ),
        };
      case "pending":
        return {
          bg: "#FAFAFA",
          border: "#E9EAEB",
          text: "#414651",
          icon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_help)">
                <path
                  d="M6.06016 6.00065C6.2169 5.5551 6.52626 5.17939 6.93347 4.94007C7.34067 4.70076 7.81943 4.61328 8.28495 4.69313C8.75047 4.77297 9.17271 5.015 9.47688 5.37634C9.78106 5.73767 9.94753 6.195 9.94683 6.66732C9.94683 8.00065 7.94683 8.66732 7.94683 8.66732M8.00016 11.334H8.00683M14.6668 8.00065C14.6668 11.6826 11.6821 14.6673 8.00016 14.6673C4.31826 14.6673 1.3335 11.6826 1.3335 8.00065C1.3335 4.31875 4.31826 1.33398 8.00016 1.33398C11.6821 1.33398 14.6668 4.31875 14.6668 8.00065Z"
                  stroke="#717680"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_help">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ),
        };
    }
  };

  const config = getStatusConfig();
  const getLabel = () => {
    switch (type) {
      case "mvr":
        return "MVR";
      case "criminal":
        return "Criminal";
      case "verification":
        return "Verification";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  const label = getLabel();

  const getTooltipText = () => {
    switch (status) {
      case "success":
        return "Complete";
      case "error":
        return "Incomplete";
      case "pending":
        return "Unknown";
      default:
        return "";
    }
  };

  const tooltipText = getTooltipText();

  useEffect(() => {
    if (!showTooltip) return;

    // Create tooltip element and append to body
    const tooltip = document.createElement("div");
    tooltip.textContent = tooltipText;
    tooltip.style.cssText = `
      position: fixed;
      left: ${tooltipPosition.x}px;
      top: ${tooltipPosition.y}px;
      transform: translateX(-50%);
      background: #0A0D12;
      color: white;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      font-family: 'Public Sans', -apple-system, Roboto, Helvetica, sans-serif;
      z-index: 999999;
      pointer-events: none;
      white-space: nowrap;
      box-shadow: 0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04);
    `;

    document.body.appendChild(tooltip);

    return () => {
      if (document.body.contains(tooltip)) {
        document.body.removeChild(tooltip);
      }
    };
  }, [showTooltip, tooltipPosition.x, tooltipPosition.y, tooltipText]);

  return (
    <div
      ref={badgeRef}
      style={{
        display: "flex",
        padding: "2px 6px 2px 8px",
        alignItems: "center",
        gap: "2px",
        borderRadius: "9999px",
        border: `1px solid ${config.border}`,
        background: config.bg,
        cursor: "pointer",
        position: "relative",
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        style={{
          color: config.text,
          textAlign: "center",
          fontFamily: "Public Sans",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "18px",
        }}
      >
        {label}
      </div>
      {config.icon}
    </div>
  );
};

// Component to handle text truncation with tooltip
const TruncatedText: React.FC<{
  text: string;
  style?: React.CSSProperties;
  maxWidth?: string;
  highlightedText?: React.ReactNode;
}> = ({ text, style = {}, maxWidth, highlightedText }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const checkTruncation = useCallback(() => {
    if (textRef.current) {
      const element = textRef.current;
      setIsTruncated(element.scrollWidth > element.offsetWidth);
    }
  }, []);

  useEffect(() => {
    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [checkTruncation, text]);

  const textElement = (
    <div
      ref={textRef}
      style={{
        ...style,
        maxWidth: maxWidth || "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      <span
        style={{
          fontFamily:
            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          color: "rgba(24,29,39,1)",
        }}
      >
        {highlightedText || text}
      </span>
    </div>
  );

  if (isTruncated) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{textElement}</TooltipTrigger>
        <TooltipContent
          side="top"
          align="start"
          sideOffset={5}
          style={{
            maxWidth: "300px",
            wordWrap: "break-word",
            backgroundColor: "#0A0D12",
            color: "#FFF",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: "18px",
            boxShadow:
              "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
          }}
        >
          {text}
        </TooltipContent>
      </Tooltip>
    );
  }

  return textElement;
};

const InvitesAndOrders: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isLargeDesktop, setIsLargeDesktop] = useState(
    window.innerWidth >= 1440,
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Auto-minimize sidebar after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarCollapsed(true);
    }, 30000); // 30 seconds

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Handle initial navigation state from I9Order page
  useEffect(() => {
    const navState = location.state as {
      activeTab?: "orders" | "invites";
      showActionsPanel?: boolean;
      selectedItems?: string[];
    };
    if (navState?.selectedItems && navState.selectedItems.length > 0) {
      setShowActionsPanel(true);
    }
  }, [location.state]);
  const [activeTab, setActiveTab] = useState<"invites" | "orders">(
    (
      location.state as {
        activeTab?: "orders" | "invites";
        showActionsPanel?: boolean;
        selectedItems?: string[];
      }
    )?.activeTab || "invites",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    (
      location.state as {
        activeTab?: "orders" | "invites";
        showActionsPanel?: boolean;
        selectedItems?: string[];
      }
    )?.selectedItems || [],
  );
  const [showNotification] = useState(false);
  const [sortField, setSortField] = useState<
    keyof (InviteData | OrderData) | null
  >(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null,
  );
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoveredPaginationButton, setHoveredPaginationButton] = useState<
    string | null
  >(null);
  const [showInformationDrawer, setShowInformationDrawer] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [showMobileDotsMenu, setShowMobileDotsMenu] = useState(false);
  const [tableView, setTableView] = useState<"table" | "rows">("table");
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedSearchForm, setAdvancedSearchForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [focusedAdvancedField, setFocusedAdvancedField] = useState<
    string | null
  >(null);
  const [goToInputValue, setGoToInputValue] = useState("");
  const [hoveredSearchButton, setHoveredSearchButton] = useState<string | null>(
    null,
  );
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showMobileFiltersModal, setShowMobileFiltersModal] = useState(false);
  const [showOrdersFiltersDropdown, setShowOrdersFiltersDropdown] =
    useState(false);
  const [showStatusFiltersDropdown, setShowStatusFiltersDropdown] =
    useState(false);
  const [selectedStatusFilters, setSelectedStatusFilters] = useState<string[]>(
    [],
  );
  const [showFiltersSelectedDropdown, setShowFiltersSelectedDropdown] =
    useState(false);

  // EWS filter state
  const [showEwsFiltersDropdown, setShowEwsFiltersDropdown] = useState(false);
  const [selectedEwsFilters, setSelectedEwsFilters] = useState<string[]>([]);
  const ewsFilterButtonRef = useRef<HTMLButtonElement>(null);

  // Disposition filter state
  const [showDispositionFiltersDropdown, setShowDispositionFiltersDropdown] =
    useState(false);
  const [selectedDispositionFilters, setSelectedDispositionFilters] = useState<
    string[]
  >([]);
  const dispositionFilterButtonRef = useRef<HTMLButtonElement>(null);

  // Flags filter state
  const [showFlagsFiltersDropdown, setShowFlagsFiltersDropdown] =
    useState(false);
  const [selectedFlagsFilters, setSelectedFlagsFilters] = useState<string[]>(
    [],
  );

  // Status filter for invites tab
  const [activeInviteStatusFilter, setActiveInviteStatusFilter] =
    useState<string>("all");
  const flagsFilterButtonRef = useRef<HTMLButtonElement>(null);
  const [showCustomizeColumnsModal, setShowCustomizeColumnsModal] =
    useState(false);
  const [showActionsPanel, setShowActionsPanel] = useState(
    (
      location.state as {
        activeTab?: "orders" | "invites";
        showActionsPanel?: boolean;
        selectedItems?: string[];
      }
    )?.showActionsPanel || false,
  );
  const [showOrderSummaryModal, setShowOrderSummaryModal] = useState(false);
  const [selectedOrderData, setSelectedOrderData] = useState<OrderData | null>(
    null,
  );
  const [showInviteSummaryModal, setShowInviteSummaryModal] = useState(false);
  const [showManageInvitationModal, setShowManageInvitationModal] =
    useState(false);
  const [selectedInviteData, setSelectedInviteData] =
    useState<InviteData | null>(null);

  // Column ordering configuration - different for invites vs orders
  const getDefaultColumnOrder = () => {
    if (activeTab === "orders") {
      return [
        { id: "status", name: "Status", order: 1, isSelected: true },
        { id: "firstName", name: "First Name", order: 2, isSelected: true },
        { id: "lastName", name: "Last Name", order: 3, isSelected: true },
        { id: "email", name: "Applicant Email", order: 4, isSelected: true },
        { id: "phone", name: "Phone", order: 5, isSelected: true },
        { id: "completed", name: "Completed", order: 6, isSelected: true },
        { id: "eta", name: "ETA", order: 7, isSelected: true },
        { id: "ews", name: "EWS", order: 8, isSelected: true },
        { id: "userId", name: "User ID", order: 9, isSelected: true },
        {
          id: "dispositionByComponent",
          name: "Disposition by Component",
          order: 10,
          isSelected: true,
        },
        { id: "flags", name: "Flags", order: 11, isSelected: true },
      ];
    } else {
      return [
        { id: "status", name: "Status", order: 1, isSelected: true },
        { id: "firstName", name: "First Name", order: 2, isSelected: true },
        { id: "lastName", name: "Last Name", order: 3, isSelected: true },
        { id: "invtEmail", name: "Invt Email", order: 4, isSelected: true },
        { id: "completed", name: "Completed", order: 5, isSelected: true },
        { id: "i9Filled", name: "I-9 Filled", order: 6, isSelected: true },
        { id: "activate", name: "Activate", order: 7, isSelected: true },
        { id: "ews", name: "EWS", order: 8, isSelected: true },
        { id: "package", name: "Package", order: 9, isSelected: true },
      ];
    }
  };

  const defaultColumnOrder = getDefaultColumnOrder();

  const [columnOrder, setColumnOrder] = useState(defaultColumnOrder);

  // Update column order and close filter modals when tab changes
  useEffect(() => {
    setColumnOrder(getDefaultColumnOrder());

    // Close any open filter modals when switching tabs
    if (activeTab === "orders") {
      setShowFiltersModal(false);
      setShowMobileFiltersModal(false);
    } else {
      setShowOrdersFiltersDropdown(false);
      setShowStatusFiltersDropdown(false);
      setShowFiltersSelectedDropdown(false);
      setShowEwsFiltersDropdown(false);
      setShowDispositionFiltersDropdown(false);
      setShowFlagsFiltersDropdown(false);
    }
  }, [activeTab]);

  // Function to get column configuration for rendering
  const getColumnConfig = (columnId: string) => {
    if (activeTab === "orders") {
      const ordersConfigs = {
        status: {
          width: "120px",
          label: "Status",
          sortField: "status",
        },
        firstName: {
          width: "108px",
          label: "First\u00A0Name",
          sortField: "firstName",
        },
        lastName: {
          width: "108px",
          label: "Last\u00A0Name",
          sortField: "lastName",
        },
        email: {
          width: "200px",
          label: "Applicant Email",
          sortField: "email",
        },
        phone: {
          width: "140px",
          label: "Phone",
          sortField: "phone",
        },
        completed: {
          width: "120px",
          label: "Completed",
          sortField: "completion",
        },
        eta: {
          width: "103px",
          label: "ETA",
          sortField: "eta",
        },
        ews: {
          width: "80px",
          label: "EWS",
          sortField: "ews",
        },
        userId: {
          width: "160px",
          label: "User ID",
          sortField: "userId",
        },
        dispositionByComponent: {
          width: "280px",
          label: "Disposition\u00A0by\u00A0Component",
          sortField: "dispositionByComponent",
        },
        flags: {
          width: "300px",
          label: "Flags",
          sortField: "flags",
        },
      };
      return ordersConfigs[columnId as keyof typeof ordersConfigs];
    } else {
      const invitesConfigs = {
        status: {
          width: "118px",
          label: "Status",
          sortField: "status",
        },
        firstName: {
          width: "108px",
          label: "First\u00A0Name",
          sortField: "firstName",
        },
        lastName: {
          width: "108px",
          label: "Last\u00A0Name",
          sortField: "lastName",
        },
        invtEmail: {
          width: "flexible",
          label: "Invitation Email",
          sortField: "email",
        },
        completed: {
          width: "113px",
          label: "Completed",
          sortField: "completion",
        },
        i9Filled: {
          width: "110px",
          label: "I-9 Filled",
          sortField: "i9Filled",
        },
        activate: {
          width: "110px",
          label: "Activate",
          sortField: "activated",
        },
        ews: {
          width: "110px",
          label: "EWS",
          sortField: "ews",
        },
        package: {
          width: "140px",
          label: "Package",
          sortField: "packageType",
        },
      };
      return invitesConfigs[columnId as keyof typeof invitesConfigs];
    }
  };

  // Get visible columns in order
  const visibleColumns = columnOrder
    .filter((col) => col.isSelected)
    .sort((a, b) => a.order - b.order);

  // Component for rendering a table cell
  const TableCell: React.FC<{
    columnId: string;
    invite: InviteData | OrderData;
    rowIndex?: number;
  }> = ({ columnId, invite, rowIndex = 0 }) => {
    const config = getColumnConfig(columnId);
    if (!config) return null;

    const renderCellContent = () => {
      if (activeTab === "orders") {
        const orderData = invite as OrderData;
        switch (columnId) {
          case "status":
            return <StatusBadge status={orderData.status} />;
          case "firstName":
            return (
              <TruncatedText
                text={orderData.firstName}
                highlightedText={highlightText(
                  orderData.firstName,
                  searchQuery,
                )}
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              />
            );
          case "lastName":
            return (
              <TruncatedText
                text={orderData.lastName}
                highlightedText={highlightText(orderData.lastName, searchQuery)}
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              />
            );
          case "email":
            return (
              <div style={{ position: "relative", width: "100%" }}>
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontFamily: "Public Sans",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#181D27",
                    lineHeight: "20px",
                    width: "100%",
                  }}
                >
                  {highlightText(orderData.email, searchQuery)}
                </div>
              </div>
            );
          case "phone":
            return (
              <div
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {highlightText(orderData.phone, searchQuery) || orderData.phone}
              </div>
            );
          case "completed":
            return <ProgressBar percentage={orderData.completion} />;
          case "eta":
            return (
              <TruncatedText
                text={orderData.eta}
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              />
            );
          case "ews":
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                {orderData.ews && <CheckIcon />}
              </div>
            );
          case "userId":
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#181D27",
                    fontFamily: "'Public Sans'",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    position: "relative",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                  }}
                >
                  {orderData.firstName} {orderData.lastName}
                </div>
                <div
                  style={{
                    color: "#535862",
                    fontFamily: "'Public Sans'",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Accio Data
                </div>
              </div>
            );
          case "dispositionByComponent":
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  flexWrap: "nowrap",
                  width: "280px",
                  minWidth: "280px",
                  maxWidth: "280px",
                  overflow: "hidden",
                  justifyContent: "flex-start",
                }}
              >
                {orderData.dispositionByComponent && (
                  <>
                    <DispositionBadge
                      type="mvr"
                      status={orderData.dispositionByComponent.mvr}
                    />
                    <DispositionBadge
                      type="criminal"
                      status={orderData.dispositionByComponent.criminal}
                    />
                    <DispositionBadge
                      type="verification"
                      status={orderData.dispositionByComponent.verification}
                    />
                  </>
                )}
              </div>
            );
          case "flags":
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  flexWrap: "nowrap",
                  width: "300px",
                  minWidth: "300px",
                  maxWidth: "300px",
                  minHeight: "28px",
                  justifyContent: "flex-start",
                  overflow: "hidden",
                }}
              >
                {orderData.flags && orderData.flags.length > 0 ? (
                  (() => {
                    const randomFlags = getRandomFlags(rowIndex);
                    return (
                      <>
                        {/* Render Random Flag Icons */}
                        {randomFlags.icons.map((flagType, index) => (
                          <FlagBadge key={index} type={flagType} />
                        ))}

                        {/* Render Random Text Labels */}
                        {randomFlags.labels.map((labelText, index) => {
                          const tooltipMap: Record<string, string> = {
                            AA: "Applicant has received Adverse Action Notice",
                            PA: "Applicant has received Pre-Adverse Action Notice",
                            CA: "Adverse Notice is in the Client Activation Queue",
                          };
                          return (
                            <TextLabel
                              key={index}
                              text={labelText}
                              tooltip={tooltipMap[labelText]}
                            />
                          );
                        })}
                      </>
                    );
                  })()
                ) : (
                  <div
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      fontStyle: "italic",
                    }}
                  >
                    No flags
                  </div>
                )}
              </div>
            );
          default:
            return null;
        }
      } else {
        const inviteData = invite as InviteData;
        switch (columnId) {
          case "status":
            return <StatusBadge status={inviteData.status} />;
          case "firstName":
            return (
              <TruncatedText
                text={inviteData.firstName}
                highlightedText={highlightText(
                  inviteData.firstName,
                  searchQuery,
                )}
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              />
            );
          case "lastName":
            return (
              <TruncatedText
                text={inviteData.lastName}
                highlightedText={highlightText(
                  inviteData.lastName,
                  searchQuery,
                )}
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              />
            );
          case "invtEmail":
            return (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                }}
              >
                <div
                  onMouseEnter={(e) => {
                    // Clear any existing tooltip first
                    if (e.target._tooltip) {
                      document.body.removeChild(e.target._tooltip);
                      delete e.target._tooltip;
                    }

                    const tooltip = document.createElement("div");
                    tooltip.textContent = inviteData.email;
                    tooltip.style.cssText = `
                      position: fixed;
                      background: #0A0D12;
                      color: white;
                      padding: 8px 12px;
                      border-radius: 8px;
                      font-size: 12px;
                      font-weight: 600;
                      z-index: 999999;
                      pointer-events: none;
                      max-width: 300px;
                      word-break: break-all;
                    `;
                    const rect = e.target.getBoundingClientRect();
                    tooltip.style.left = rect.left + "px";
                    tooltip.style.top = rect.top - 40 + "px";
                    document.body.appendChild(tooltip);
                    e.target._tooltip = tooltip;

                    // Auto-hide tooltip after 3 seconds as backup
                    setTimeout(() => {
                      if (
                        e.target._tooltip &&
                        document.body.contains(e.target._tooltip)
                      ) {
                        document.body.removeChild(e.target._tooltip);
                        delete e.target._tooltip;
                      }
                    }, 3000);
                  }}
                  onMouseLeave={(e) => {
                    if (e.target._tooltip) {
                      try {
                        document.body.removeChild(e.target._tooltip);
                        delete e.target._tooltip;
                      } catch (error) {
                        // Tooltip might already be removed
                        delete e.target._tooltip;
                      }
                    }
                  }}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "rgba(24,29,39,1)",
                    lineHeight: "20px",
                    width: "100%",
                    cursor: "default",
                  }}
                >
                  {highlightText(inviteData.email, searchQuery)}
                </div>
              </div>
            );
          case "completed":
            return <ProgressBar percentage={inviteData.completion} />;
          case "i9Filled":
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {inviteData.i9Filled && <CheckIcon />}
              </div>
            );
          case "activate":
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {inviteData.activated && <CheckIcon />}
              </div>
            );
          case "ews":
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {inviteData.ews && <CheckIcon />}
              </div>
            );
          case "package":
            return (
              <TruncatedText
                text={inviteData.packageType}
                highlightedText={highlightText(
                  inviteData.packageType,
                  searchQuery,
                )}
                maxWidth="116px"
                style={{
                  color: "#181D27",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              />
            );
          default:
            return null;
        }
      }
    };

    // Handle flexible width for email column (only for invites)
    const getCellStyle = () => {
      const isInviteEmailColumn =
        activeTab === "invites" && columnId === "invtEmail";

      if (isInviteEmailColumn) {
        return {
          display: "flex",
          ...(showFiltersModal
            ? { flex: "1 1 120px", minWidth: "120px" }
            : isLargeDesktop
              ? { flex: "1 1 200px", minWidth: "180px" }
              : { flex: "1 1 160px", minWidth: "140px" }),
          height: "52px",
          padding: "12px",
          alignItems: "center",
          borderBottom: "1px solid #E9EAEB",
          position: "relative",
          minWidth: 0,
        };
      }

      return {
        display: "flex",
        width: config.width,
        minWidth: config.width,
        maxWidth: config.width,
        height: "52px",
        padding: "12px",
        alignItems: "center",
        borderBottom: "1px solid #E9EAEB",
        position: "relative",
        boxSizing: "border-box",
        ...(columnId === "completed" ? { gap: "12px" } : {}),
        ...(columnId === "status" ? { justifyContent: "flex-start" } : {}),
      };
    };

    return (
      <div style={getCellStyle()}>
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            display: "flex",
            alignItems: "center",
            ...(columnId === "completed" ? { gap: "4px" } : {}),
          }}
        >
          {renderCellContent()}
        </div>
      </div>
    );
  };

  // Component for rendering a table header column
  const TableHeaderColumn: React.FC<{ columnId: string }> = ({ columnId }) => {
    const config = getColumnConfig(columnId);
    if (!config) return null;

    // Check if this is a filterable column in Orders tab
    const isOrdersStatusColumn =
      activeTab === "orders" && columnId === "status";
    const isOrdersEwsColumn = activeTab === "orders" && columnId === "ews";
    const isOrdersDispositionColumn =
      activeTab === "orders" && columnId === "dispositionByComponent";
    const isOrdersFlagsColumn = activeTab === "orders" && columnId === "flags";

    // Handle flexible width for email column (only for invites)
    const getColumnStyle = () => {
      const isInviteEmailColumn =
        activeTab === "invites" && columnId === "invtEmail";

      if (isInviteEmailColumn) {
        return {
          display: "flex",
          ...(showFiltersModal
            ? { flex: "1 1 120px", minWidth: "120px" }
            : isLargeDesktop
              ? { flex: "1 1 200px", minWidth: "180px" }
              : { flex: "1 1 160px", minWidth: "140px" }),
          height: "36px",
          padding: "6px 12px",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid #E9EAEB",
          background: "#FFF",
          position: "relative",
        };
      }

      return {
        display: "flex",
        width: config.width,
        minWidth: config.width,
        maxWidth: config.width,
        height: "36px",
        padding: "6px 12px",
        alignItems: "center",
        gap: "12px",
        borderBottom: "1px solid #E9EAEB",
        background: "#FFF",
        position: "relative",
        boxSizing: "border-box",
      };
    };

    return (
      <div style={getColumnStyle()}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            position: "relative",
          }}
        >
          <div
            style={{
              color:
                sortField === config.sortField ||
                (isOrdersStatusColumn && selectedStatusFilters.length > 0) ||
                (isOrdersEwsColumn && selectedEwsFilters.length > 0) ||
                (isOrdersDispositionColumn &&
                  selectedDispositionFilters.length > 0) ||
                (isOrdersFlagsColumn && selectedFlagsFilters.length > 0)
                  ? "#273572"
                  : "#717680",
              fontFamily: "Public Sans",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "18px",
              position: "relative",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span
              style={{
                fontFamily:
                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                color:
                  sortField === config.sortField ||
                  (isOrdersStatusColumn && selectedStatusFilters.length > 0) ||
                  (isOrdersEwsColumn && selectedEwsFilters.length > 0) ||
                  (isOrdersDispositionColumn &&
                    selectedDispositionFilters.length > 0) ||
                  (isOrdersFlagsColumn && selectedFlagsFilters.length > 0)
                    ? "rgba(39,53,114,1)"
                    : "rgba(113,118,128,1)",
                whiteSpace: "nowrap",
              }}
            >
              {config.label}
            </span>
          </div>

          {/* Add filter icon for Status column in Orders tab */}
          {isOrdersStatusColumn && (
            <button
              ref={statusFilterButtonRef}
              onClick={() =>
                setShowStatusFiltersDropdown(!showStatusFiltersDropdown)
              }
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "4px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 8H12M2 4H14M6 12H10"
                  stroke={
                    selectedStatusFilters.length > 0 ? "#344698" : "#A4A7AE"
                  }
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {/* Add filter icon for EWS column in Orders tab */}
          {isOrdersEwsColumn && (
            <button
              ref={ewsFilterButtonRef}
              onClick={() => setShowEwsFiltersDropdown(!showEwsFiltersDropdown)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "4px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 8H12M2 4H14M6 12H10"
                  stroke={selectedEwsFilters.length > 0 ? "#344698" : "#A4A7AE"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {/* Add filter icon for Disposition column in Orders tab */}
          {isOrdersDispositionColumn && (
            <button
              ref={dispositionFilterButtonRef}
              onClick={() =>
                setShowDispositionFiltersDropdown(
                  !showDispositionFiltersDropdown,
                )
              }
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "4px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 8H12M2 4H14M6 12H10"
                  stroke={
                    selectedDispositionFilters.length > 0
                      ? "#344698"
                      : "#A4A7AE"
                  }
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {/* Add filter icon for Flags column in Orders tab */}
          {isOrdersFlagsColumn && (
            <button
              ref={flagsFilterButtonRef}
              onClick={() =>
                setShowFlagsFiltersDropdown(!showFlagsFiltersDropdown)
              }
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "4px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 8H12M2 4H14M6 12H10"
                  stroke={
                    selectedFlagsFilters.length > 0 ? "#344698" : "#A4A7AE"
                  }
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
            }}
          >
            <button
              onClick={() => {
                if (sortField === config.sortField && sortDirection === "asc") {
                  setSortField(null);
                  setSortDirection(null);
                } else {
                  setSortField(config.sortField);
                  setSortDirection("asc");
                }
              }}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                  stroke={
                    sortField === config.sortField && sortDirection === "asc"
                      ? "#34479A"
                      : "#A4A7AE"
                  }
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                if (
                  sortField === config.sortField &&
                  sortDirection === "desc"
                ) {
                  setSortField(null);
                  setSortDirection(null);
                } else {
                  setSortField(config.sortField);
                  setSortDirection("desc");
                }
              }}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: "rotate(180deg)" }}
              >
                <path
                  d="M1.6001 5.03353L4.93343 1.7002L8.26676 5.03353"
                  stroke={
                    sortField === config.sortField && sortDirection === "desc"
                      ? "#34479A"
                      : "#A4A7AE"
                  }
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };
  const [tableViewsDropdownOpen, setTableViewsDropdownOpen] = useState(false);
  const [currentTableView, setCurrentTableView] = useState("default");
  const [tableViews, setTableViews] = useState<TableView[]>([
    { id: "default", name: "Default", isDefault: true },
  ]);
  const [appliedFilters, setAppliedFilters] = useState({
    status: [] as string[], // Clear test filters - start with empty state
    typeOfPackage: [] as string[],
    i9Filled: [] as string[],
    activate: [] as string[],
    ews: [] as string[],
    dateRange: {
      start: null, // Clear test date range - start with no date filter
      end: null,
    },
  });

  // Helper function to check if all options are selected for a filter
  const areAllOptionsSelected = (
    filterKey: string,
    selectedValues: string[],
  ) => {
    const optionCounts = {
      status: 6,
      typeOfPackage: 22,
      i9Filled: 2,
      activate: 2,
      ews: 2,
    };

    if (filterKey in optionCounts) {
      const totalOptions = optionCounts[filterKey as keyof typeof optionCounts];
      return selectedValues.length === totalOptions;
    }
    return false;
  };

  // Get count of applied filters (excluding those where all options are selected)
  const getAppliedFiltersCount = () => {
    let count = 0;

    Object.keys(appliedFilters).forEach((key) => {
      if (key === "dateRange") {
        // Only count date range as applied if both start and end dates are set
        if (
          appliedFilters.dateRange.start !== null &&
          appliedFilters.dateRange.end !== null
        ) {
          count++;
        }
      } else {
        const values = appliedFilters[
          key as keyof typeof appliedFilters
        ] as string[];
        if (values.length > 0 && !areAllOptionsSelected(key, values)) {
          count += values.length;
        }
      }
    });

    return count;
  };

  const hasAppliedFilters = () => {
    return getAppliedFiltersCount() > 0;
  };

  // Helper function for orders filters
  const getOrdersFiltersCount = () => {
    return (
      selectedStatusFilters.length +
      selectedEwsFilters.length +
      selectedDispositionFilters.length +
      selectedFlagsFilters.length
    );
  };

  const hasOrdersFilters = () => {
    return getOrdersFiltersCount() > 0;
  };

  // Handlers for orders filters
  const handleRemoveStatusFilter = (statusToRemove: string) => {
    setSelectedStatusFilters((prev) =>
      prev.filter((status) => status !== statusToRemove),
    );
  };

  const handleRemoveEwsFilter = (ewsToRemove: string) => {
    setSelectedEwsFilters((prev) => prev.filter((ews) => ews !== ewsToRemove));
  };

  const handleRemoveDispositionFilter = (dispositionToRemove: string) => {
    setSelectedDispositionFilters((prev) =>
      prev.filter((disposition) => disposition !== dispositionToRemove),
    );
  };

  const handleRemoveFlagsFilter = (flagToRemove: string) => {
    setSelectedFlagsFilters((prev) =>
      prev.filter((flag) => flag !== flagToRemove),
    );
  };

  const handleClearAllOrdersFilters = () => {
    setSelectedStatusFilters([]);
    setSelectedEwsFilters([]);
    setSelectedDispositionFilters([]);
    setSelectedFlagsFilters([]);
    setShowFiltersSelectedDropdown(false);
  };

  const downloadDropdownRef = useRef<HTMLDivElement>(null);
  const advancedSearchRef = useRef<HTMLDivElement>(null);
  const mobileAdvancedSearchRef = useRef<HTMLDivElement>(null);
  const tabletAdvancedSearchRef = useRef<HTMLDivElement>(null);
  const advancedSearchButtonRef = useRef<HTMLButtonElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);
  const mobileDotsMenuRef = useRef<HTMLDivElement>(null);
  const tableViewsDropdownRef = useRef<HTMLDivElement>(null);
  const filtersButtonRef = useRef<HTMLButtonElement>(null);
  const statusFilterButtonRef = useRef<HTMLButtonElement>(null);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newIsDesktop = width >= 1024;
      const newIsLargeDesktop = width >= 1440;
      const newIsMobile = width < 768;
      const newIsTablet = width >= 768 && width < 1024;

      setIsDesktop(newIsDesktop);
      setIsLargeDesktop(newIsLargeDesktop);
      setIsMobile(newIsMobile);
      setIsTablet(newIsTablet);

      // Remove automatic view switching - let users control the view
    };

    // Call immediately on mount to set initial values
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        downloadDropdownRef.current &&
        !downloadDropdownRef.current.contains(event.target as Node)
      ) {
        setShowDownloadDropdown(false);
      }
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setShowActionMenu(null);
      }
      if (
        mobileDotsMenuRef.current &&
        !mobileDotsMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileDotsMenu(false);
      }
      if (
        tableViewsDropdownRef.current &&
        !tableViewsDropdownRef.current.contains(event.target as Node)
      ) {
        setTableViewsDropdownOpen(false);
      }
      if (showAdvancedSearch) {
        const target = event.target as Node;
        const isClickInsideDesktop =
          advancedSearchRef.current &&
          advancedSearchRef.current.contains(target);
        const isClickInsideMobile =
          mobileAdvancedSearchRef.current &&
          mobileAdvancedSearchRef.current.contains(target);
        const isClickInsideTablet =
          tabletAdvancedSearchRef.current &&
          tabletAdvancedSearchRef.current.contains(target);

        const isClickOutside =
          !isClickInsideDesktop && !isClickInsideMobile && !isClickInsideTablet;

        if (isClickOutside) {
          setShowAdvancedSearch(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    console.log("Sign out");
  };

  const getUserMenuStyles = () => {
    if (userMenuHovered || userMenuOpen) {
      return {
        border: "1px solid #E9EAEB",
        background: "#F5F5F5",
      };
    }
    return {};
  };

  // Sample data for invites
  const invitesData: InviteData[] = [
    {
      id: "1",
      firstName: "Isabella",
      lastName: "Young",
      email: "isabella.miller@example.com",
      status: "waiting",
      completion: 80,
      lastEmail: "07/19/22",
      i9Filled: true,
      activated: true,
      ews: true,
      packageType: "CSD Standard",
    },
    {
      id: "2",
      firstName: "Ava",
      lastName: "Lewis",
      email: "ava.jones@example.com",
      status: "expired",
      completion: 60,
      lastEmail: "09/05/23",
      i9Filled: true,
      activated: false,
      ews: false,
      packageType: "Executive",
    },
    {
      id: "3",
      firstName: "Emma",
      lastName: "Walker",
      email: "emma.garcia@example.com",
      status: "canceled",
      completion: 80,
      lastEmail: "02/14/25",
      i9Filled: false,
      activated: true,
      ews: true,
      packageType: "A La Carte",
    },
    {
      id: "4",
      firstName: "Sophia",
      lastName: "Mitchell",
      email: "sophia.williams@example.com",
      status: "expired",
      completion: 60,
      lastEmail: "08/15/25",
      i9Filled: true,
      activated: true,
      ews: false,
      packageType: "Retail",
    },
    {
      id: "5",
      firstName: "Noah",
      lastName: "Clark",
      email: "noah.davis@example.com",
      status: "waiting-for-recruitee",
      completion: 60,
      lastEmail: "12/01/24",
      i9Filled: true,
      activated: true,
      ews: true,
      packageType: "MVR",
    },
    {
      id: "6",
      firstName: "Mason",
      lastName: "Carter",
      email: "mason.johnson@example.com",
      status: "waiting",
      completion: 40,
      lastEmail: "11/30/23",
      i9Filled: false,
      activated: false,
      ews: true,
      packageType: "Operations",
    },
    {
      id: "7",
      firstName: "Oliver",
      lastName: "Harris",
      email: "liam.smith@example.com",
      status: "expires-today",
      completion: 70,
      lastEmail: "05/22/24",
      i9Filled: false,
      activated: false,
      ews: true,
      packageType: "Hourly",
    },
    {
      id: "8",
      firstName: "Liam",
      lastName: "Anderson",
      email: "oliver.brown@example.com",
      status: "expired",
      completion: 10,
      lastEmail: "03/10/23",
      i9Filled: true,
      activated: true,
      ews: false,
      packageType: "DOT",
    },
    {
      id: "9",
      firstName: "Noah",
      lastName: "Mitchell",
      email: "noah.davis@example.com",
      status: "unsolicited",
      completion: 80,
      lastEmail: "02/14/25",
      i9Filled: false,
      activated: true,
      ews: true,
      packageType: "Sales",
    },
    {
      id: "10",
      firstName: "Mason",
      lastName: "Carter",
      email: "mason.johnson@example.com",
      status: "canceled",
      completion: 60,
      lastEmail: "03/10/23",
      i9Filled: true,
      activated: true,
      ews: false,
      packageType: "CBSV",
    },
    // Second page content (page 2)
    {
      id: "11",
      firstName: "Lucas",
      lastName: "Thompson",
      email: "lucas.thompson@example.com",
      status: "waiting",
      completion: 75,
      lastEmail: "01/15/24",
      i9Filled: true,
      activated: true,
      ews: true,
      packageType: "New York",
    },
    {
      id: "12",
      firstName: "Mia",
      lastName: "Rodriguez",
      email: "mia.rodriguez@example.com",
      status: "expired",
      completion: 45,
      lastEmail: "11/20/23",
      i9Filled: false,
      activated: false,
      ews: false,
      packageType: "Volunteer Application",
    },
    {
      id: "13",
      firstName: "Ethan",
      lastName: "Davis",
      email: "ethan.davis@example.com",
      status: "waiting-for-recruitee",
      completion: 90,
      lastEmail: "03/08/24",
      i9Filled: true,
      activated: true,
      ews: true,
      packageType: "Just MVR",
    },
    {
      id: "14",
      firstName: "Charlotte",
      lastName: "Wilson",
      email: "charlotte.wilson@example.com",
      status: "expires-today",
      completion: 65,
      lastEmail: "02/28/24",
      i9Filled: true,
      activated: false,
      ews: true,
      packageType: "Immunization Records",
    },
    {
      id: "15",
      firstName: "James",
      lastName: "Moore",
      email: "james.moore@example.com",
      status: "unsolicited",
      completion: 30,
      lastEmail: "12/10/23",
      i9Filled: false,
      activated: false,
      ews: false,
      packageType: "HASC Contractor",
    },
    {
      id: "16",
      firstName: "Amelia",
      lastName: "Taylor",
      email: "amelia.taylor@example.com",
      status: "waiting",
      completion: 85,
      lastEmail: "01/22/24",
      i9Filled: true,
      activated: true,
      ews: true,
      packageType: "Employment Only",
    },
    {
      id: "17",
      firstName: "Benjamin",
      lastName: "Anderson",
      email: "benjamin.anderson@example.com",
      status: "canceled",
      completion: 50,
      lastEmail: "10/15/23",
      i9Filled: false,
      activated: false,
      ews: false,
      packageType: "SAP 10",
    },
    {
      id: "18",
      firstName: "Harper",
      lastName: "Thomas",
      email: "harper.thomas@example.com",
      status: "expired",
      completion: 70,
      lastEmail: "09/30/23",
      i9Filled: true,
      activated: false,
      ews: true,
      packageType: "Identity Check Package",
    },
    {
      id: "19",
      firstName: "Alexander",
      lastName: "Jackson",
      email: "alexander.jackson@example.com",
      status: "waiting",
      completion: 95,
      lastEmail: "02/14/24",
      i9Filled: true,
      activated: true,
      ews: true,
      packageType: "Standard with EDU and EMP",
    },
    {
      id: "20",
      firstName: "Evelyn",
      lastName: "White",
      email: "evelyn.white@example.com",
      status: "expires-today",
      completion: 55,
      lastEmail: "01/05/24",
      i9Filled: false,
      activated: false,
      ews: false,
      packageType: "Executive Plus",
    },
  ];

  // Sample data for orders
  const ordersData: OrderData[] = [
    {
      id: "ord1",
      firstName: "Isabella",
      lastName: "Young",
      email: "isabella.miller@acme.com",
      phone: "(555) 890-7234",
      newQuote: "80%",
      status: "processing",
      completion: 80,
      lastUpdate: "07/19/22",
      eta: "08/29/23",
      ews: true,
      userId: "Verification",
      dispositionByComponent: {
        mvr: "error",
        criminal: "success",
        verification: "pending",
      },
      flags: ["Warning", "AA"],
    },
    {
      id: "ord2",
      firstName: "Noah",
      lastName: "Watts",
      email: "noah.watts@acme.com",
      phone: "(555) 555-1234",
      newQuote: "80%",
      status: "pending-review",
      completion: 60,
      lastUpdate: "09/30/23",
      eta: "10/30/24",
      ews: false,
      userId: "Criminal",
      dispositionByComponent: {
        mvr: "error",
        criminal: "success",
        verification: "pending",
      },
      flags: ["PA", "Criminal"],
    },
    {
      id: "ord3",
      firstName: "Emma",
      lastName: "Garcia",
      email: "emma.garcia@acme.com",
      phone: "(555) 678-9012",
      newQuote: "40%",
      status: "approved",
      completion: 80,
      lastUpdate: "02/14/25",
      eta: "03/22/26",
      ews: true,
      userId: "Optional",
      dispositionByComponent: {
        mvr: "success",
        criminal: "error",
        verification: "success",
      },
      flags: ["CA", "Optional"],
    },
    {
      id: "ord4",
      firstName: "Sophia",
      lastName: "Mitchell",
      email: "sophia.williams@acme.com",
      phone: "(555) 901-2345",
      newQuote: "70%",
      status: "expired",
      completion: 60,
      lastUpdate: "08/15/25",
      eta: "09/10/26",
      ews: false,
      userId: "Criminal",
      dispositionByComponent: {
        mvr: "error",
        criminal: "pending",
        verification: "success",
      },
      flags: ["Employment", "Criminal"],
    },
    {
      id: "ord5",
      firstName: "Noah",
      lastName: "Clark",
      email: "noah.davis@acme.com",
      phone: "(555) 567-8901",
      newQuote: "10%",
      status: "on-hold",
      completion: 60,
      lastUpdate: "12/01/24",
      eta: "01/15/26",
      ews: true,
      userId: "Criminal",
      dispositionByComponent: {
        mvr: "success",
        criminal: "error",
        verification: "success",
      },
      flags: ["Document", "Verification"],
    },
    {
      id: "ord6",
      firstName: "Mason",
      lastName: "Carter",
      email: "mason.johnson@acme.com",
      phone: "(555) 234-5678",
      newQuote: "60%",
      status: "processing",
      completion: 40,
      lastUpdate: "11/30/23",
      eta: "12/05/25",
      ews: false,
      userId: "Criminal",
      dispositionByComponent: {
        mvr: "success",
        criminal: "error",
        verification: "success",
      },
      flags: ["Chart", "Pending"],
    },
    {
      id: "ord7",
      firstName: "Oliver",
      lastName: "Harris",
      email: "liam.smith@acme.com",
      phone: "(555) 345-6789",
      newQuote: "60%",
      status: "completed",
      completion: 70,
      lastUpdate: "05/22/24",
      eta: "12/05/25",
      ews: true,
      userId: "Criminal",
      dispositionByComponent: {
        mvr: "success",
        criminal: "error",
        verification: "success",
      },
      flags: ["MVR", "Criminal"],
    },
    {
      id: "ord8",
      firstName: "Liam",
      lastName: "Anderson",
      email: "oliver.brown@acme.com",
      phone: "(555) 456-7890",
      newQuote: "60%",
      status: "rejected",
      completion: 10,
      lastUpdate: "03/10/23",
      eta: "06/18/25",
      ews: false,
      userId: "Criminal",
      dispositionByComponent: {
        mvr: "success",
        criminal: "pending",
        verification: "success",
      },
      flags: ["MVR", "Criminal"],
    },
    {
      id: "ord9",
      firstName: "Noah",
      lastName: "Mitchell",
      email: "noah.davis@acme.com",
      phone: "(555) 567-8901",
      newQuote: "80%",
      status: "pending-review",
      completion: 80,
      lastUpdate: "02/14/25",
      eta: "06/18/25",
      ews: true,
      userId: "Criminal",
      dispositionByComponent: {
        mvr: "error",
        criminal: "pending",
        verification: "success",
      },
      flags: ["MVR", "Criminal"],
    },
    {
      id: "ord10",
      firstName: "Mason",
      lastName: "Carter",
      email: "mason.johnson@acme.com",
      phone: "(555) 234-5678",
      newQuote: "60%",
      status: "canceled",
      completion: 60,
      lastUpdate: "03/10/23",
      eta: "04/12/25",
      ews: false,
      userId: "Criminal",
      dispositionByComponent: {
        mvr: "pending",
        criminal: "success",
        verification: "pending",
      },
      flags: ["MVR", "Criminal"],
    },
    {
      id: "ord11",
      firstName: "Ava",
      lastName: "Thompson",
      email: "ava.thompson@acme.com",
      phone: "(555) 123-4567",
      newQuote: "75%",
      status: "processing",
      completion: 85,
      lastUpdate: "01/15/25",
      eta: "02/20/25",
      ews: true,
      userId: "Education",
      dispositionByComponent: {
        mvr: "success",
        criminal: "success",
        verification: "pending",
      },
      flags: ["Education", "Verification"],
    },
    {
      id: "ord12",
      firstName: "Ethan",
      lastName: "Rodriguez",
      email: "ethan.rodriguez@acme.com",
      phone: "(555) 987-6543",
      newQuote: "90%",
      status: "approved",
      completion: 95,
      lastUpdate: "12/20/24",
      eta: "01/25/25",
      ews: false,
      userId: "Verification",
      dispositionByComponent: {
        mvr: "success",
        criminal: "success",
        verification: "success",
      },
      flags: ["Chart", "Analytics"],
    },
    {
      id: "ord13",
      firstName: "Charlotte",
      lastName: "Lewis",
      email: "charlotte.lewis@acme.com",
      phone: "(555) 246-8135",
      newQuote: "65%",
      status: "expired",
      completion: 45,
      lastUpdate: "11/10/24",
      eta: "12/15/24",
      ews: true,
      userId: "Criminal",
      dispositionByComponent: {
        mvr: "error",
        criminal: "pending",
        verification: "success",
      },
      flags: ["Warning", "Archive"],
    },
    {
      id: "ord14",
      firstName: "James",
      lastName: "Walker",
      email: "james.walker@acme.com",
      phone: "(555) 369-2580",
      newQuote: "55%",
      status: "rejected",
      completion: 30,
      lastUpdate: "10/05/24",
      eta: "11/10/24",
      ews: false,
      userId: "Employment",
      dispositionByComponent: {
        mvr: "error",
        criminal: "error",
        verification: "pending",
      },
      flags: ["Employment", "Criminal"],
    },
    {
      id: "ord15",
      firstName: "Amelia",
      lastName: "Hall",
      email: "amelia.hall@acme.com",
      phone: "(555) 147-2583",
      newQuote: "85%",
      status: "completed",
      completion: 100,
      lastUpdate: "09/25/24",
      eta: "10/30/24",
      ews: true,
      userId: "Verification",
      dispositionByComponent: {
        mvr: "success",
        criminal: "success",
        verification: "success",
      },
      flags: ["Monitoring", "Chart"],
    },
    {
      id: "ord16",
      firstName: "Benjamin",
      lastName: "Allen",
      email: "benjamin.allen@acme.com",
      phone: "(555) 852-9630",
      newQuote: "70%",
      status: "on-hold",
      completion: 50,
      lastUpdate: "08/15/24",
      eta: "09/20/24",
      ews: false,
      userId: "Criminal",
      dispositionByComponent: {
        mvr: "pending",
        criminal: "success",
        verification: "error",
      },
      flags: ["Drug Test", "MVR"],
    },
    {
      id: "ord17",
      firstName: "Harper",
      lastName: "Young",
      email: "harper.young@acme.com",
      phone: "(555) 741-8520",
      newQuote: "95%",
      status: "processing",
      completion: 90,
      lastUpdate: "07/30/24",
      eta: "08/25/24",
      ews: true,
      userId: "Education",
      dispositionByComponent: {
        mvr: "success",
        criminal: "success",
        verification: "pending",
      },
      flags: ["Education", "Rescreening"],
    },
    {
      id: "ord18",
      firstName: "Lucas",
      lastName: "King",
      email: "lucas.king@acme.com",
      phone: "(555) 963-7410",
      newQuote: "40%",
      status: "canceled",
      completion: 25,
      lastUpdate: "06/20/24",
      eta: "07/25/24",
      ews: false,
      userId: "Criminal",
      dispositionByComponent: {
        mvr: "error",
        criminal: "pending",
        verification: "error",
      },
      flags: ["Warning", "Criminal"],
    },
    {
      id: "ord19",
      firstName: "Evelyn",
      lastName: "Wright",
      email: "evelyn.wright@acme.com",
      phone: "(555) 159-7530",
      newQuote: "80%",
      status: "pending-review",
      completion: 75,
      lastUpdate: "05/10/24",
      eta: "06/15/24",
      ews: true,
      userId: "Verification",
      dispositionByComponent: {
        mvr: "success",
        criminal: "pending",
        verification: "success",
      },
      flags: ["Monitoring", "Archive"],
    },
    {
      id: "ord20",
      firstName: "Alexander",
      lastName: "Lopez",
      email: "alexander.lopez@acme.com",
      phone: "(555) 753-9514",
      newQuote: "60%",
      status: "approved",
      completion: 80,
      lastUpdate: "04/25/24",
      eta: "05/30/24",
      ews: false,
      userId: "Optional",
      dispositionByComponent: {
        mvr: "success",
        criminal: "success",
        verification: "success",
      },
      flags: ["Optional", "Chart"],
    },
  ];

  // StatusBadge component with different configs for invites vs orders
  const StatusBadge: React.FC<{
    status: InviteData["status"] | OrderData["status"];
  }> = ({ status }) => {
    // Order-specific status configuration
    const orderStatusConfig = {
      processing: {
        label: "Processing",
        bg: "#ECFDF3",
        border: "#A7F3D0",
        text: "#047857",
      },
      "pending-review": {
        label: "Pending Review",
        bg: "#F0F4FF",
        border: "#C7D2FE",
        text: "#3730A3",
      },
      approved: {
        label: "Approved",
        bg: "#ECFDF3",
        border: "#A7F3D0",
        text: "#047857",
      },
      rejected: {
        label: "Rejected",
        bg: "#FEF2F2",
        border: "#FECACA",
        text: "#DC2626",
      },
      "on-hold": {
        label: "On Hold",
        bg: "#FEF3C7",
        border: "#FCD34D",
        text: "#D97706",
      },
      completed: {
        label: "Completed",
        bg: "#DBEAFE",
        border: "#93C5FD",
        text: "#1D4ED8",
      },
      canceled: {
        label: "Canceled",
        bg: "#FCE7F3",
        border: "#F9A8D4",
        text: "#BE185D",
      },
      expired: {
        label: "Expired",
        bg: "#F9FAFB",
        border: "#E5E7EB",
        text: "#6B7280",
      },
    };

    // Invite-specific status configuration
    const inviteStatusConfig = {
      waiting: {
        label: "Waiting",
        bg: "#ECFDF3",
        border: "#A7F3D0",
        text: "#047857",
      },
      unsolicited: {
        label: "Unsolicited",
        bg: "#F0F4FF",
        border: "#C7D2FE",
        text: "#3730A3",
      },
      canceled: {
        label: "Canceled",
        bg: "#ECFDF3",
        border: "#A7F3D0",
        text: "#047857",
      },
      expired: {
        label: "Expired",
        bg: "#F9FAFB",
        border: "#E5E7EB",
        text: "#6B7280",
      },
      "waiting-for-recruitee": {
        label: "Waiting for Recruitee",
        bg: "#FEF3C7",
        border: "#FCD34D",
        text: "#D97706",
      },
      "expires-today": {
        label: "Expires Today",
        bg: "#DBEAFE",
        border: "#93C5FD",
        text: "#1D4ED8",
      },
      reviewed: {
        label: "Reviewed",
        bg: "#FCE7F3",
        border: "#F9A8D4",
        text: "#BE185D",
      },
      archived: {
        label: "Archived",
        bg: "#F9FAFB",
        border: "#E5E7EB",
        text: "#6B7280",
      },
    };

    // Use appropriate config based on current tab
    const statusConfig =
      activeTab === "orders" ? orderStatusConfig : inviteStatusConfig;

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    // Determine if this status needs truncation and flex layout (for longer statuses)
    const needsFlexLayout =
      activeTab === "orders"
        ? status === "pending-review" || status === "on-hold"
        : status === "waiting-for-recruitee" ||
          status === "expires-today" ||
          status === "unsolicited";
    const needsTooltip = needsFlexLayout; // Only long statuses get tooltips

    const badgeElement = needsFlexLayout ? (
      // For long statuses: use flex layout with proper truncation
      <div
        style={{
          display: "flex",
          padding: "2px 8px",
          alignItems: "center",
          flex: "1 0 0",
          borderRadius: "9999px",
          border: `1px solid ${config.border}`,
          background: config.bg,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            flex: "1 0 0",
            overflow: "hidden",
            color: config.text,
            textAlign: "center",
            textOverflow: "ellipsis",
            fontFamily: "Public Sans",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "18px",
            position: "relative",
          }}
        >
          {config.label}
        </div>
      </div>
    ) : (
      // For short statuses: simple inline layout - no truncation needed
      <div
        style={{
          display: "inline-flex",
          padding: "2px 8px",
          alignItems: "center",
          borderRadius: "9999px",
          border: `1px solid ${config.border}`,
          background: config.bg,
          position: "relative",
        }}
      >
        <div
          style={{
            color: config.text,
            fontFamily: "Public Sans",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "18px",
            position: "relative",
          }}
        >
          {config.label}
        </div>
      </div>
    );

    // Add tooltip only for long status names that get truncated
    if (needsTooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              style={{
                position: "relative",
                display: "flex",
                flex: "1 0 0",
                minWidth: 0, // Allow shrinking
              }}
            >
              {badgeElement}
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="start"
            sideOffset={5}
            style={{
              backgroundColor: "#0A0D12",
              color: "#FFF",
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 600,
              maxWidth: "200px",
              zIndex: 99999,
            }}
          >
            {config.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return badgeElement;
  };

  const ProgressBar = ({ percentage }: { percentage: number }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flex: "1 0 0",
        alignSelf: "stretch",
        position: "relative",
      }}
    >
      <div style={{ height: "8px", flex: "1 0 0", position: "relative" }}>
        <div
          style={{
            width: "100%",
            height: "8px",
            borderRadius: "9999px",
            background: "#D5D7DA",
            position: "absolute",
            left: "0px",
            top: "0px",
          }}
        />
        <div
          style={{
            width: `${percentage}%`,
            height: "8px",
            borderRadius: "9999px",
            background: "#344698",
            position: "absolute",
            left: "0px",
            top: "0px",
          }}
        />
      </div>
      <div
        style={{
          color: "#414651",
          fontFamily: "Public Sans",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "20px",
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily:
              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            color: "rgba(65,70,81,1)",
          }}
        >
          {percentage}%
        </span>
      </div>
    </div>
  );

  const CheckIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3334 4L6.00002 11.3333L2.66669 8"
        stroke="#A4A7AE"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Card Component for Rows View with responsive design
  const InviteCard: React.FC<{
    invite: InviteData | OrderData;
    isExpanded: boolean;
    onToggleExpand: () => void;
    onToggleSelect: (checked: boolean) => void;
    isSelected: boolean;
  }> = ({ invite, isExpanded, onToggleExpand, onToggleSelect, isSelected }) => {
    // Determine if we're in mobile or tablet view
    const cardLayout = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

    return (
      <div
        onClick={() => {
          // Navigate to order details page
          navigate(`/order-details/${invite.id}`);
        }}
        style={{
          display: "flex",
          padding: cardLayout === "mobile" ? "12px 4px" : "12px 8px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: isExpanded ? "8px" : cardLayout === "mobile" ? "12px" : "0px",
          alignSelf: "stretch",
          borderRadius: "8px",
          border: isExpanded ? "1px solid #E9EAEB" : "1px solid #F5F5F5",
          background: isExpanded ? "#F5F5F5" : "#FFF",
          position: "relative",
          width: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Card Top Row - Mobile Layout */}
        {cardLayout === "mobile" ? (
          // Mobile: Vertical stack layout
          <>
            {/* Top section: Checkbox, Status, First Name, Actions */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: cardLayout === "mobile" ? "8px" : "12px",
                alignSelf: "stretch",
                position: "relative",
                width: "100%",
                overflow: "hidden",
              }}
            >
              {/* Checkbox */}
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "flex",
                  width: "18px",
                  height: "18px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  position: "relative",
                }}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={onToggleSelect}
                  className="h-4 w-4 rounded border border-[#D5D7DA] data-[state=checked]:bg-[#344698] data-[state=checked]:border-[#344698] data-[state=checked]:text-white"
                />
              </div>

              {/* Status Container */}
              <div
                style={{
                  display: "flex",
                  minWidth: cardLayout === "mobile" ? "65px" : "70px",
                  maxWidth: cardLayout === "mobile" ? "85px" : "90px",
                  flex: "0 0 auto",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 700,
                      fontSize: "12px",
                      color: "rgba(113,118,128,1)",
                    }}
                  >
                    Status
                  </span>
                </div>
                <StatusBadge status={invite.status} />
              </div>

              {/* First Name Container */}
              <div
                style={{
                  display: "flex",
                  minWidth: cardLayout === "mobile" ? "60px" : "70px",
                  flex: "1 1 auto",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  position: "relative",
                  overflow: "hidden",
                  maxWidth: cardLayout === "mobile" ? "120px" : "none",
                }}
              >
                <div
                  style={{
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 700,
                      fontSize: "12px",
                      color: "rgba(113,118,128,1)",
                    }}
                  >
                    First Name
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "rgba(24,29,39,1)",
                      }}
                    >
                      {invite.firstName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button Container */}
              <div
                style={{
                  display: "flex",
                  height: "42px",
                  alignItems: "center",
                  gap: "4px",
                  marginLeft: "auto",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                {/* Expand/Collapse Button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleExpand();
                    }}
                    style={{
                      display: "flex",
                      padding: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      border: "none",
                      background: isExpanded ? "#FDFDFD" : "transparent",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isExpanded) {
                        e.currentTarget.style.background = "#F5F5F5";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isExpanded) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {isExpanded ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 10L8 6L4 10"
                          stroke="#717680"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Dots Menu Button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowActionMenu(
                        showActionMenu === invite.id ? null : invite.id,
                      );
                    }}
                    style={{
                      display: "flex",
                      padding: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <ActionDotsIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom section: Last Name, Completed, Invitation Email */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: cardLayout === "mobile" ? "8px" : "12px",
                alignSelf: "stretch",
                position: "relative",
                width: "100%",
                overflow: "hidden",
              }}
            >
              {/* Last Name Container */}
              <div
                style={{
                  display: "flex",
                  minWidth: cardLayout === "mobile" ? "60px" : "70px",
                  flex: "1 1 auto",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  position: "relative",
                  overflow: "hidden",
                  maxWidth: cardLayout === "mobile" ? "100px" : "none",
                }}
              >
                <div
                  style={{
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 700,
                      fontSize: "12px",
                      color: "rgba(113,118,128,1)",
                    }}
                  >
                    Last Name
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#181D27",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "rgba(24,29,39,1)",
                      }}
                    >
                      {invite.lastName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Completed Container */}
              <div
                style={{
                  display: "flex",
                  minWidth: cardLayout === "mobile" ? "75px" : "85px",
                  maxWidth: cardLayout === "mobile" ? "95px" : "none",
                  flex: "0 0 auto",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 700,
                      fontSize: "12px",
                      color: "rgba(113,118,128,1)",
                    }}
                  >
                    Completed
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    maxWidth: cardLayout === "mobile" ? "75px" : "88px",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <ProgressBar percentage={invite.completion} />
                </div>
              </div>

              {/* Invitation Email Container */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  flex: cardLayout === "mobile" ? "2 1 auto" : "2 1 auto",
                  minWidth: cardLayout === "mobile" ? "100px" : "120px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    color: "#717680",
                    fontFamily: "Public Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "18px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 700,
                      fontSize: "12px",
                      color: "rgba(113,118,128,1)",
                    }}
                  >
                    Invitation Email
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
                      flex: "1 0 0",
                      overflow: "hidden",
                      color: "#181D27",
                      textOverflow: "ellipsis",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "rgba(24,29,39,1)",
                      }}
                    >
                      {invite.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Tablet/Desktop: Horizontal layout
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: isExpanded ? "12px" : "13px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            {/* Checkbox */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex",
                width: "18px",
                height: "18px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                position: "relative",
              }}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={onToggleSelect}
                className="h-4 w-4 rounded border border-[#D5D7DA] data-[state=checked]:bg-[#344698] data-[state=checked]:border-[#344698] data-[state=checked]:text-white"
              />
            </div>

            {/* Status Container */}
            <div
              style={{
                display: "flex",
                width: "80px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "rgba(113,118,128,1)",
                  }}
                >
                  Status
                </span>
              </div>
              <StatusBadge status={invite.status} />
            </div>

            {/* First Name Container */}
            <div
              style={{
                display: "flex",
                width: "80px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "rgba(113,118,128,1)",
                  }}
                >
                  First Name
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "rgba(24,29,39,1)",
                    }}
                  >
                    {invite.firstName}
                  </span>
                </div>
              </div>
            </div>

            {/* Last Name Container */}
            <div
              style={{
                display: "flex",
                width: "80px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "rgba(113,118,128,1)",
                  }}
                >
                  Last Name
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "rgba(24,29,39,1)",
                    }}
                  >
                    {invite.lastName}
                  </span>
                </div>
              </div>
            </div>

            {/* Invitation Email Container */}
            <div
              style={{
                display: "flex",
                width: isTablet ? "136px" : "136px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "rgba(113,118,128,1)",
                  }}
                >
                  Invitation Email
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    flex: "1 0 0",
                    overflow: "hidden",
                    color: "#181D27",
                    textOverflow: "ellipsis",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "rgba(24,29,39,1)",
                    }}
                  >
                    {invite.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Completed Container */}
            <div
              style={{
                display: "flex",
                width: "93px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "rgba(113,118,128,1)",
                  }}
                >
                  Completed
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <ProgressBar percentage={invite.completion} />
              </div>
            </div>

            {/* Action Button Container */}
            <div
              style={{
                display: "flex",
                height: "42px",
                alignItems: "center",
                gap: "8px",
                position: "relative",
              }}
            >
              {/* Expand/Collapse Button */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleExpand();
                  }}
                  style={{
                    display: "flex",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    border: "none",
                    background: isExpanded ? "#FDFDFD" : "transparent",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isExpanded) {
                      e.currentTarget.style.background = "#F5F5F5";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isExpanded) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {isExpanded ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 10L8 6L4 10"
                        stroke="#717680"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Dots Menu Button */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowActionMenu(
                      showActionMenu === invite.id ? null : invite.id,
                    );
                  }}
                  style={{
                    display: "flex",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <ActionDotsIcon />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Expanded Content */}
        {isExpanded && (
          <div
            style={{
              display: "flex",
              paddingLeft: cardLayout === "mobile" ? "18px" : "31px",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
              position: "relative",
              flexWrap: cardLayout === "mobile" ? "wrap" : "nowrap",
            }}
          >
            {/* I-9 Filled Container */}
            <div
              style={{
                display: "flex",
                width: cardLayout === "mobile" ? "auto" : "80px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                position: "relative",
                flex: cardLayout === "mobile" ? "1 1 auto" : "none",
                minWidth: cardLayout === "mobile" ? "60px" : "80px",
              }}
            >
              <div
                style={{
                  color: "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "rgba(113,118,128,1)",
                  }}
                >
                  I-9 Filled
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {invite.i9Filled && <CheckIcon />}
              </div>
            </div>

            {/* Activate Container */}
            <div
              style={{
                display: "flex",
                width: cardLayout === "mobile" ? "auto" : "80px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                position: "relative",
                flex: cardLayout === "mobile" ? "1 1 auto" : "none",
                minWidth: cardLayout === "mobile" ? "60px" : "80px",
              }}
            >
              <div
                style={{
                  color: "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "rgba(113,118,128,1)",
                  }}
                >
                  Activate
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {invite.activated && <CheckIcon />}
              </div>
            </div>

            {/* EWS Container */}
            <div
              style={{
                display: "flex",
                width: cardLayout === "mobile" ? "auto" : "80px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                position: "relative",
                flex: cardLayout === "mobile" ? "1 1 auto" : "none",
                minWidth: cardLayout === "mobile" ? "60px" : "80px",
              }}
            >
              <div
                style={{
                  color: "#717680",
                  fontFamily: "Public Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "rgba(113,118,128,1)",
                  }}
                >
                  EWS
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {invite.ews && <CheckIcon />}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ActionDotsIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        stroke="#A4A7AE"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
        stroke="#A4A7AE"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
        stroke="#A4A7AE"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = currentData.map((item) => item.id);
      setSelectedItems(allIds);
      setShowActionsPanel(true);
    } else {
      setSelectedItems([]);
      setShowActionsPanel(false);
    }
  };

  const handleSelectItem = (id: string) => {
    return (checked: boolean) => {
      let newSelectedItems: string[];
      if (checked) {
        newSelectedItems = [...selectedItems, id];
      } else {
        newSelectedItems = selectedItems.filter((item) => item !== id);
      }
      setSelectedItems(newSelectedItems);
      setShowActionsPanel(newSelectedItems.length > 0);
    };
  };

  const handleClearSelection = () => {
    setSelectedItems([]);
    setShowActionsPanel(false);
  };

  const handleAction = (action: string) => {
    console.log(
      `Action ${action} clicked for ${selectedItems.length} items:`,
      selectedItems,
    );
    // Here you would implement the actual action logic
  };

  const handleSort = (field: keyof (InviteData | OrderData)) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get current data based on active tab
  const currentData = React.useMemo(() => {
    return activeTab === "invites" ? invitesData : ordersData;
  }, [activeTab]);

  // Calculate status counts for invites
  const inviteStatusCounts = React.useMemo(() => {
    const counts = {
      all: invitesData.length,
      expired: 0,
      "expires-today": 0,
      canceled: 0,
      unsolicited: 0,
      waiting: 0,
      "waiting-for-recruitee": 0,
    } as Record<string, number>;

    invitesData.forEach((invite) => {
      if (invite.status === "expired") counts.expired++;
      else if (invite.status === "expires-today") counts["expires-today"]++;
      else if (invite.status === "canceled") counts.canceled++;
      else if (invite.status === "unsolicited") counts.unsolicited++;
      else if (invite.status === "waiting") counts.waiting++;
      else if (invite.status === "waiting-for-recruitee")
        counts["waiting-for-recruitee"]++;
    });

    return counts;
  }, [invitesData]);

  // Status filter tabs configuration
  const inviteStatusTabs = [
    { key: "all", label: "All", count: inviteStatusCounts.all },
    { key: "expired", label: "Expired", count: inviteStatusCounts.expired },
    {
      key: "expires-today",
      label: "Expires Today",
      count: inviteStatusCounts["expires-today"],
    },
    { key: "canceled", label: "Canceled", count: inviteStatusCounts.canceled },
    {
      key: "unsolicited",
      label: "Unsolicited",
      count: inviteStatusCounts.unsolicited,
    },
    { key: "waiting", label: "Waiting", count: inviteStatusCounts.waiting },
    {
      key: "waiting-for-recruitee",
      label: "Waiting for Recruitee",
      count: inviteStatusCounts["waiting-for-recruitee"],
    },
  ];

  // Calculate status counts for orders
  const ordersStatusCounts = React.useMemo(() => {
    const counts: Record<string, number> = {
      all: ordersData.length,
      processing: 0,
      "pending-review": 0,
      approved: 0,
      expired: 0,
      "on-hold": 0,
      completed: 0,
      rejected: 0,
      canceled: 0,
    };
    ordersData.forEach((order) => {
      if (counts[order.status] !== undefined) counts[order.status]++;
    });
    return counts;
  }, [ordersData]);

  // Orders status tabs configuration
  const ordersStatusTabs = [
    { key: "all", label: "All", count: ordersStatusCounts.all },
    {
      key: "processing",
      label: "Processing",
      count: ordersStatusCounts.processing,
    },
    {
      key: "pending-review",
      label: "Pending Review",
      count: ordersStatusCounts["pending-review"],
    },
    { key: "approved", label: "Approved", count: ordersStatusCounts.approved },
    { key: "expired", label: "Expired", count: ordersStatusCounts.expired },
    { key: "on-hold", label: "On Hold", count: ordersStatusCounts["on-hold"] },
    {
      key: "completed",
      label: "Completed",
      count: ordersStatusCounts.completed,
    },
    { key: "rejected", label: "Rejected", count: ordersStatusCounts.rejected },
    { key: "canceled", label: "Canceled", count: ordersStatusCounts.canceled },
  ];

  // Filter data based on search query and applied filters
  const filteredData = React.useMemo(() => {
    let data = [...currentData];

    // Apply search filter
    if (searchQuery.trim()) {
      data = data.filter(
        (item) =>
          item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply different filters based on the active tab
    if (activeTab === "invites") {
      // Apply status filter for invites (using activeInviteStatusFilter)
      if (activeInviteStatusFilter !== "all") {
        data = data.filter(
          (invite) => invite.status === activeInviteStatusFilter,
        );
      }

      // Apply additional filters from FiltersPanel (using appliedFilters)
      if (appliedFilters.status.length > 0) {
        data = data.filter((invite) =>
          appliedFilters.status.includes(invite.status),
        );
      }

      // Apply I-9 Filled filter
      if (appliedFilters.i9Filled.length > 0) {
        data = data.filter((invite) => {
          const i9Status = (invite as InviteData).i9Filled ? "yes" : "no";
          return appliedFilters.i9Filled.includes(i9Status);
        });
      }

      // Apply Activate filter
      if (appliedFilters.activate.length > 0) {
        data = data.filter((invite) => {
          const activateStatus = (invite as InviteData).activated
            ? "yes"
            : "no";
          return appliedFilters.activate.includes(activateStatus);
        });
      }

      // Apply EWS filter
      if (appliedFilters.ews.length > 0) {
        data = data.filter((invite) => {
          const ewsStatus = (invite as InviteData).ews ? "yes" : "no";
          return appliedFilters.ews.includes(ewsStatus);
        });
      }
    } else if (activeTab === "orders") {
      // Apply status filter for orders (using selectedStatusFilters)
      if (selectedStatusFilters.length > 0) {
        data = data.filter((order) =>
          selectedStatusFilters.includes(order.status),
        );
      }

      // Apply EWS filter for orders (Yes: rows with icons, No: rows without icons)
      if (selectedEwsFilters.length > 0) {
        data = data.filter((order) => {
          const orderData = order as OrderData;
          const hasIcon = orderData.ews; // Yes means has icon (ews: true), No means no icon (ews: false)
          const ewsStatus = hasIcon ? "yes" : "no";
          return selectedEwsFilters.includes(ewsStatus);
        });
      }

      // Apply Disposition filter for orders (based on component status icons)
      if (selectedDispositionFilters.length > 0) {
        data = data.filter((order) => {
          const orderData = order as OrderData;
          return selectedDispositionFilters.some((disposition) => {
            // Parse the disposition filter (e.g., "mvr-complete", "criminal-incomplete", etc.)
            const [component, statusType] = disposition.split("-");

            // Get the actual status from the order data
            let actualStatus: string;
            switch (component) {
              case "mvr":
                actualStatus = orderData.dispositionByComponent.mvr;
                break;
              case "criminal":
                actualStatus = orderData.dispositionByComponent.criminal;
                break;
              case "verification":
                actualStatus = orderData.dispositionByComponent.verification;
                break;
              default:
                return false;
            }

            // Map the status to the filter type
            // success = complete (green checkmark), error = incomplete (red X), pending = unknown (grey ?)
            switch (statusType) {
              case "complete":
                return actualStatus === "success"; // Green badge with checkmark
              case "incomplete":
                return actualStatus === "error"; // Red badge with X
              case "unknown":
                return actualStatus === "pending"; // Grey badge with ?
              default:
                return false;
            }
          });
        });
      }

      // Apply Flags filter for orders
      if (selectedFlagsFilters.length > 0) {
        data = data.filter((order) => {
          const orderData = order as OrderData;
          // Convert flag filter values to match actual flag names in data
          const flagMapping: { [key: string]: string[] } = {
            "derogatory-information": ["Warning", "Criminal"], // Flag Red
            alert: ["Warning"], // Alert Yellow
            archive: ["Archive"], // Archive Grey
            "drug-test": ["Drug Test", "Medical"], // Cross Blue
            monitoring: ["Monitoring", "Chart"], // Monitoring Green
            rescreening: ["Rescreening"], // Arrow Dark Blue
            "adverse-action-notice": ["AA", "Warning"], // AA
            "pre-adverse-action-notice": ["PA", "Warning"], // PA
            "client-activation-queue": ["CA", "Pending"], // CA
          };

          return selectedFlagsFilters.some((filterFlag) => {
            const matchingFlags = flagMapping[filterFlag] || [filterFlag];
            return orderData.flags.some((flag) =>
              matchingFlags.some((matchFlag) =>
                flag.toLowerCase().includes(matchFlag.toLowerCase()),
              ),
            );
          });
        });
      }
    }

    // Note: Type of Package filter would need to be implemented when package type data is added to the invite records
    // Note: Date Range filter would need to be implemented when date fields are clarified

    return data;
  }, [
    currentData,
    searchQuery,
    appliedFilters,
    activeTab,
    activeInviteStatusFilter,
    selectedStatusFilters,
    selectedEwsFilters,
    selectedDispositionFilters,
    selectedFlagsFilters,
  ]);

  // Update sortedData to use filteredData instead of invitesData
  const sortedData = React.useMemo(() => {
    let data = [...filteredData];

    if (sortField && sortDirection) {
      data.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
        }
        if (typeof bValue === "string") {
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [filteredData, sortField, sortDirection]);

  // Pagination constants
  const pageSize = 10;
  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Paginated data
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - halfVisible);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Search handling functions
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearchActive(value.length > 0);
    setCurrentPage(1); // Reset to first page when searching
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
    setCurrentPage(1);
  };

  const handleAdvancedSearchChange = (field: string, value: string) => {
    setAdvancedSearchForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearAdvancedSearch = () => {
    setAdvancedSearchForm({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    });
  };

  const handleAdvancedSearch = () => {
    // Combine all form fields into a single search query
    const searchTerms = Object.values(advancedSearchForm).filter((term) =>
      term.trim(),
    );
    const combinedQuery = searchTerms.join(" ");
    setSearchQuery(combinedQuery);
    setIsSearchActive(combinedQuery.length > 0);
    setShowAdvancedSearch(false);
    setCurrentPage(1);
  };

  // Helper function to highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <span
            key={index}
            style={{
              color: "#344698",
              fontWeight: 700,
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Table views handlers
  const handleViewChange = (viewId: string) => {
    setCurrentTableView(viewId);
    // Apply the view configuration here
    const view = tableViews.find((v) => v.id === viewId);
    console.log("Switching to table view:", view);
  };

  const handleSaveTableView = (name: string) => {
    const newView: TableView = {
      id: Date.now().toString(),
      name,
      config: {
        // Save current table state (filters, sort, columns, etc.)
        sortField,
        sortDirection,
        searchQuery,
        // Add more table configuration as needed
      },
    };
    setTableViews([...tableViews, newView]);
    setCurrentTableView(newView.id);
    console.log("Saved new table view:", newView);
  };

  const handleCreateNewTableView = () => {
    // Reset to default state for new view
    setSortField(null);
    setSortDirection(null);
    setSearchQuery("");
    setIsSearchActive(false);
    setCurrentPage(1);
    console.log("Created new table view");
  };

  const handleDeleteTableView = (viewId: string) => {
    const filteredViews = tableViews.filter((view) => view.id !== viewId);
    setTableViews(filteredViews);
    if (currentTableView === viewId) {
      setCurrentTableView(filteredViews[0]?.id || "default");
    }
    console.log("Deleted table view:", viewId);
  };

  const handleRenameTableView = (viewId: string, newName: string) => {
    const updatedViews = tableViews.map((view) =>
      view.id === viewId ? { ...view, name: newName } : view,
    );
    setTableViews(updatedViews);
    console.log("Renamed table view:", viewId, "to:", newName);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#FAFAFA",
        position: "relative",
      }}
    >
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="invites-orders"
        showMobileUserMenu={showMobileUserMenu}
        setShowMobileUserMenu={setShowMobileUserMenu}
        setMobileMenuOpen={setMobileMenuOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        userMenuHovered={userMenuHovered}
        setUserMenuHovered={setUserMenuHovered}
        handleSignOut={handleSignOut}
        getUserMenuStyles={getUserMenuStyles}
        showNotification={showNotification}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          alignSelf: "stretch",
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          position: "relative",
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          minHeight: "100vh",
          height: "auto",
          overflow: "visible",
          boxSizing: "border-box",
        }}
      >
        <Header
          isDesktop={isDesktop}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
          showMobileUserMenu={showMobileUserMenu}
          sidebarCollapsed={sidebarCollapsed}
        />

        <MobileHeader
          isDesktop={isDesktop}
          isMobile={isMobile}
          setMobileMenuOpen={setMobileMenuOpen}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
          showMobileUserMenu={showMobileUserMenu}
        />

        <main
          className="responsive-main-container"
          style={{
            marginTop: isDesktop ? "80px" : "64px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            flex: "1 1 auto",
            alignSelf: "stretch",
            borderRadius: "40px 0 0 0",
            background: "#FAFAFA",
            position: "relative",
            minWidth: 0,
            minHeight: "calc(100vh - 80px)",
            height: "auto",
            paddingTop: "32px",
            paddingBottom: isMobile ? "64px" : isTablet ? "72px" : "80px",
            paddingLeft: isMobile ? "16px" : "32px",
            paddingRight: isMobile ? "16px" : "32px",
            marginBottom: isMobile ? "32px" : isTablet ? "40px" : "48px",
            boxSizing: "border-box",
            overflow: "visible",
          }}
        >
          {/* Header section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            <div className="page-header-container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    gap: isMobile ? "16px" : "20px",
                    alignSelf: "stretch",
                    position: "relative",
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <div className="page-title-group">
                    <h1 className="page-title">Invites & Orders</h1>
                    <div className="page-subtitle supporting-text">
                      Track pending invites and submitted orders in one place.
                      Use filters and tools to sort, review, and manage activity
                      easily.
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: isMobile ? "flex-start" : "center",
                      gap: "12px",
                      position: "relative",
                      ...(isMobile ? { alignSelf: "stretch" } : {}),
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        position: "relative",
                      }}
                    >
                      {[
                        {
                          key: "invites",
                          label: "Invites",
                          count: invitesData.length.toString(),
                        },
                        {
                          key: "orders",
                          label: "Orders",
                          count: ordersData.length.toString(),
                        },
                      ].map((tab, index, array) => (
                        <div
                          key={tab.key}
                          onClick={() => {
                            setActiveTab(tab.key as typeof activeTab);
                            setSelectedItems([]);
                            setShowActionsPanel(false);
                            setCurrentPage(1);
                            // Reset all filters when switching tabs
                            setActiveInviteStatusFilter("all");
                            setSelectedStatusFilters([]);
                            setSelectedEwsFilters([]);
                            setSelectedDispositionFilters([]);
                            setSelectedFlagsFilters([]);
                            setShowStatusFiltersDropdown(false);
                            setShowFiltersSelectedDropdown(false);
                            setShowEwsFiltersDropdown(false);
                            setShowDispositionFiltersDropdown(false);
                            setShowFlagsFiltersDropdown(false);
                          }}
                          style={{
                            display: "flex",
                            minHeight: "40px",
                            padding: "8px 16px 8px 14px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "6px",
                            borderRight:
                              index < array.length - 1
                                ? "1px solid #D5D7DA"
                                : "none",
                            borderTopLeftRadius: index === 0 ? "8px" : "0",
                            borderBottomLeftRadius: index === 0 ? "8px" : "0",
                            borderTopRightRadius:
                              index === array.length - 1 ? "8px" : "0",
                            borderBottomRightRadius:
                              index === array.length - 1 ? "8px" : "0",
                            background:
                              activeTab === tab.key ? "#ECEEF9" : "#FFF",
                            cursor: "pointer",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              color:
                                activeTab === tab.key ? "#273572" : "#414651",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                fontWeight: 600,
                                fontSize: "14px",
                                color:
                                  activeTab === tab.key
                                    ? "rgba(39,53,114,1)"
                                    : "rgba(65,70,81,1)",
                              }}
                            >
                              {tab.label}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              padding: "2px 8px",
                              alignItems: "center",
                              borderRadius: "9999px",
                              border:
                                activeTab === tab.key
                                  ? "1px solid #B3BCE5"
                                  : "1px solid #E9EAEB",
                              background:
                                activeTab === tab.key ? "#ECEEF9" : "#FAFAFA",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                color:
                                  activeTab === tab.key ? "#273572" : "#414651",
                                textAlign: "center",
                                fontFamily: "Public Sans",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "18px",
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontWeight: 400,
                                  fontSize: "12px",
                                  color:
                                    activeTab === tab.key
                                      ? "rgba(39,53,114,1)"
                                      : "rgba(65,70,81,1)",
                                }}
                              >
                                {tab.count}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div
            style={{
              display: "flex",
              flexDirection:
                showFiltersModal || showActionsPanel ? "row" : "column",
              alignItems: "flex-start",
              gap: showFiltersModal || showActionsPanel ? "16px" : "24px",
              flex: "1 0 auto",
              alignSelf: "stretch",
              position: "relative",
              maxWidth: "100%",
              overflow: "visible",
              boxSizing: "border-box",
              minHeight: "600px",
              height: "auto",
            }}
          >
            {/* Filters Panel - Only for invites tab */}
            {showFiltersModal &&
              !showActionsPanel &&
              (isDesktop || isTablet) &&
              activeTab === "invites" && (
                <FiltersPanel
                  isVisible={showFiltersModal}
                  onClose={() => setShowFiltersModal(false)}
                  onFiltersChange={setAppliedFilters}
                  filters={appliedFilters}
                />
              )}

            {/* Actions Panel */}
            {showActionsPanel && (isDesktop || isTablet) && (
              <ActionsPanel
                isVisible={showActionsPanel}
                onClose={handleClearSelection}
                selectedCount={selectedItems.length}
                onAction={handleAction}
              />
            )}

            {/* Table Container */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "24px",
                flex: "1 0 auto",
                alignSelf: "stretch",
                position: "relative",
                minWidth: 0, // Allow container to shrink below content size
                minHeight: "600px",
                height: "auto",
                width:
                  (showFiltersModal || showActionsPanel) &&
                  (isDesktop || isTablet)
                    ? `calc(100% - 268px - 16px)`
                    : "100%",
                maxWidth:
                  (showFiltersModal || showActionsPanel) &&
                  (isDesktop || isTablet)
                    ? `calc(100% - 268px - 16px)`
                    : "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "20px",
                  flex: "1 0 auto",
                  alignSelf: "stretch",
                  position: "relative",
                  maxWidth: "100%",
                  overflow: "visible",
                  boxSizing: "border-box",
                  minHeight: "500px",
                  height: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    flex: "1 0 auto",
                    alignSelf: "stretch",
                    position: "relative",
                    maxWidth: "100%",
                    overflow: "visible",
                    boxSizing: "border-box",
                    minHeight: "auto",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      borderRadius: "12px",
                      border: "1px solid #E9EAEB",
                      borderBottom: "none",
                      background: "#FFF",
                      position: "relative",
                      width: "100%",
                      maxWidth: "100%",
                      boxSizing: "border-box",
                      overflow: "visible",
                      minHeight: tableView === "rows" ? "auto" : "500px",
                      height: "auto",
                    }}
                  >
                    {/* Table Header */}
                    <div
                      style={{
                        display: "flex",
                        padding: "16px 16px 0 16px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                        position: "relative",
                      }}
                    >
                      {/* Top Section - Responsive Layout */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection:
                            (isDesktop || isTablet) && !isMobile
                              ? "row"
                              : "column",
                          gap: isTablet ? "12px" : "16px",
                          alignItems:
                            (isDesktop || isTablet) && !isMobile
                              ? "center"
                              : "flex-start",
                          alignSelf: "stretch",
                          position: "relative",
                          width: "100%",
                          maxWidth: "100%",
                          overflow: isTablet ? "hidden" : "visible",
                          boxSizing: "border-box",
                        }}
                      >
                        {(isDesktop || isTablet) && !isMobile ? (
                          <>
                            {/* Desktop: Title and Selection Badge - Spaced apart */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flex: "1 0 0",
                                position: "relative",
                                width: "100%",
                              }}
                            >
                              {/* Title - Left side */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "flex-start",
                                  gap: "2px",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#181D27",
                                      fontFamily: "Public Sans",
                                      fontSize: "18px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "28px",
                                      position: "relative",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 600,
                                        fontSize: "18px",
                                        color: "rgba(24,29,39,1)",
                                      }}
                                    >
                                      {activeTab === "invites"
                                        ? "Invites"
                                        : "Orders"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Selection Badge - Right side with spacing */}
                              {selectedItems.length > 0 && (
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "3px 4px 3px 8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "3px",
                                    borderRadius: "6px",
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      position: "relative",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        textAlign: "center",
                                        fontFamily: "Public Sans",
                                        fontSize: "12px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "18px",
                                        position: "relative",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "12px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        {selectedItems.length} Invite
                                        {selectedItems.length !== 1
                                          ? "s"
                                          : ""}{" "}
                                        Selected
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "18px",
                                      padding: "2px",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      borderRadius: "3px",
                                      position: "relative",
                                    }}
                                  >
                                    <button
                                      onClick={handleClearSelection}
                                      style={{
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: "0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "14px",
                                        height: "14px",
                                      }}
                                    >
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                                          stroke="#A4A7AE"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Desktop: Search */}
                            {!showFiltersModal && !showActionsPanel && (
                              <div
                                className="search-container"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  flex: isTablet ? "0 0 180px" : "0 0 234px",
                                  maxWidth: isTablet ? "180px" : "234px",
                                  minWidth: isTablet ? "160px" : "200px",
                                  height: "40px",
                                  borderRadius: "8px",
                                  border: isSearchActive
                                    ? "2px solid #34479A"
                                    : "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  padding: isSearchActive ? "7px" : "8px",
                                  position: "relative",
                                  boxSizing: "border-box",
                                }}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7963 10.7963 13.3333 7.66667 13.3333C4.53705 13.3333 2 10.7963 2 7.66667C2 4.53705 4.53705 2 7.66667 2C10.7963 2 13.3333 4.53705 13.3333 7.66667Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <input
                                  type="text"
                                  placeholder={
                                    isSearchActive
                                      ? ""
                                      : "Search by Name, SSN, State.."
                                  }
                                  value={searchQuery}
                                  onChange={handleSearchChange}
                                  onFocus={() => setIsSearchActive(true)}
                                  onBlur={() =>
                                    setIsSearchActive(
                                      searchQuery.length > 0 ||
                                        showAdvancedSearch,
                                    )
                                  }
                                  style={{
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    flex: "1 0 0",
                                    color: isSearchActive
                                      ? "#181D27"
                                      : "#717680",
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontWeight: isSearchActive ? 500 : 400,
                                    lineHeight: "20px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                />
                                {isSearchActive && (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "2px",
                                    }}
                                  >
                                    {/* X Button */}
                                    <button
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        clearSearch();
                                      }}
                                      onMouseEnter={() =>
                                        setHoveredSearchButton("clear")
                                      }
                                      onMouseLeave={() =>
                                        setHoveredSearchButton(null)
                                      }
                                      style={{
                                        display: "flex",
                                        width: "24px",
                                        height: "24px",
                                        padding: "4px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "6px",
                                        border: "none",
                                        background:
                                          hoveredSearchButton === "clear"
                                            ? "#F5F5F5"
                                            : "transparent",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M11.3333 4.66675L4.66666 11.3334M4.66666 4.66675L11.3333 11.3334"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.66667"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>

                                    {/* Divider */}
                                    <div
                                      style={{
                                        width: "1px",
                                        height: "24px",
                                        background: "#E9EAEB",
                                      }}
                                    />
                                  </div>
                                )}

                                {/* Advanced Search Button - Working Pattern */}
                                <div style={{ position: "relative" }}>
                                  <button
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      setShowAdvancedSearch(
                                        !showAdvancedSearch,
                                      );
                                    }}
                                    style={{
                                      display: "flex",
                                      width: "24px",
                                      height: "24px",
                                      padding: "4px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      borderRadius: "6px",
                                      border: "none",
                                      background: showAdvancedSearch
                                        ? "#F5F5F5"
                                        : "transparent",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M2 5.33325L10 5.33325M10 5.33325C10 6.43782 10.8954 7.33325 12 7.33325C13.1046 7.33325 14 6.43782 14 5.33325C14 4.22868 13.1046 3.33325 12 3.33325C10.8954 3.33325 10 4.22868 10 5.33325ZM6 10.6666L14 10.6666M6 10.6666C6 11.7712 5.10457 12.6666 4 12.6666C2.89543 12.6666 2 11.7712 2 10.6666C2 9.56202 2.89543 8.66659 4 8.66659C5.10457 8.66659 6 9.56202 6 10.6666Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                  <AdvancedSearchDropdown
                                    showAdvancedSearch={showAdvancedSearch}
                                    advancedSearchForm={advancedSearchForm}
                                    focusedAdvancedField={focusedAdvancedField}
                                    onFieldChange={handleAdvancedSearchChange}
                                    onFieldFocus={setFocusedAdvancedField}
                                    onClear={clearAdvancedSearch}
                                    onSearch={handleAdvancedSearch}
                                    dropdownRef={advancedSearchRef}
                                    style={
                                      !isMobile
                                        ? {
                                            right: "-8px",
                                            width: "234px",
                                            top: "calc(100% + 12px)",
                                          }
                                        : undefined
                                    }
                                  />
                                </div>
                              </div>
                            )}

                            {/* Desktop: Filters Button with X - when filters are open */}
                            {showFiltersModal && (
                              <button
                                onClick={() => setShowFiltersModal(false)}
                                onMouseEnter={() =>
                                  setHoveredButton("close-filters")
                                }
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
                                  background: "#F5F5F5",
                                  boxShadow:
                                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                  flex: "0 0 auto",
                                }}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.33333 14L3.33333 10M3.33333 10C4.06971 10 4.66667 9.40305 4.66667 8.66667C4.66667 7.93029 4.06971 7.33333 3.33333 7.33333C2.59695 7.33333 2 7.93029 2 8.66667C2 9.40305 2.59695 10 3.33333 10ZM3.33333 4.66667V2M8 14V10M8 4.66667V2M8 4.66667C7.26362 4.66667 6.66667 5.26362 6.66667 6C6.66667 6.73638 7.26362 7.33333 8 7.33333C8.73638 7.33333 9.33333 6.73638 9.33333 6C9.33333 5.26362 8.73638 4.66667 8 4.66667ZM12.6667 14V11.3333M12.6667 11.3333C13.403 11.3333 14 10.7364 14 10C14 9.26362 13.403 8.66667 12.6667 8.66667C11.9303 8.66667 11.3333 9.26362 11.3333 10C11.3333 10.7364 11.9303 11.3333 12.6667 11.3333ZM12.6667 6V2"
                                    stroke="#717680"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "0 2px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "Public Sans",
                                      fontSize: "14px",
                                      fontWeight: 600,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        color: "rgba(65,70,81,1)",
                                      }}
                                    >
                                      Filters
                                    </span>
                                  </div>
                                </div>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.3333 4.66675L4.66666 11.3334M4.66666 4.66675L11.3333 11.3334"
                                    stroke="#717680"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            )}

                            {/* Desktop: Action Buttons */}
                            <div
                              style={{
                                display:
                                  showFiltersModal || showActionsPanel
                                    ? "none"
                                    : "flex",
                                alignItems: "center",
                                gap: "12px",
                                position: "relative",
                                flexShrink: isTablet ? 1 : 0,
                                minWidth: 0,
                              }}
                            >
                              {/* Filters Button Container */}
                              <div
                                style={{
                                  position: "relative",
                                  display: "inline-flex",
                                }}
                              >
                                <button
                                  ref={filtersButtonRef}
                                  onClick={() => {
                                    if (activeTab === "invites") {
                                      setShowFiltersModal(!showFiltersModal);
                                    } else if (activeTab === "orders") {
                                      if (hasOrdersFilters()) {
                                        setShowFiltersSelectedDropdown(
                                          !showFiltersSelectedDropdown,
                                        );
                                      } else {
                                        setShowOrdersFiltersDropdown(
                                          !showOrdersFiltersDropdown,
                                        );
                                      }
                                    }
                                  }}
                                  onMouseEnter={() =>
                                    setHoveredButton("filters")
                                  }
                                  onMouseLeave={() => setHoveredButton(null)}
                                  style={{
                                    display: "flex",
                                    minHeight: "36px",
                                    padding: "6px 8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    borderRadius: "8px",
                                    border:
                                      (activeTab === "invites" &&
                                        hasAppliedFilters() &&
                                        !showFiltersModal) ||
                                      (activeTab === "orders" &&
                                        hasOrdersFilters() &&
                                        !showOrdersFiltersDropdown)
                                        ? "1px solid #34479A"
                                        : "1px solid #D5D7DA",
                                    background:
                                      (activeTab === "invites" &&
                                        hasAppliedFilters() &&
                                        !showFiltersModal) ||
                                      (activeTab === "orders" &&
                                        hasOrdersFilters() &&
                                        !showOrdersFiltersDropdown)
                                        ? "#ECEEF9"
                                        : hoveredButton === "filters" ||
                                            (activeTab === "invites" &&
                                              showFiltersModal) ||
                                            (activeTab === "orders" &&
                                              (showOrdersFiltersDropdown ||
                                                showFiltersSelectedDropdown))
                                          ? "#F5F5F5"
                                          : "#FFF",
                                    boxShadow:
                                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                  }}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3.33333 14L3.33333 10M3.33333 10C4.06971 10 4.66667 9.40305 4.66667 8.66667C4.66667 7.93029 4.06971 7.33333 3.33333 7.33333C2.59695 7.33333 2 7.93029 2 8.66667C2 9.40305 2.59695 10 3.33333 10ZM3.33333 4.66667V2M8 14V10M8 4.66667V2M8 4.66667C7.26362 4.66667 6.66667 5.26362 6.66667 6C6.66667 6.73638 7.26362 7.33333 8 7.33333C8.73638 7.33333 9.33333 6.73638 9.33333 6C9.33333 5.26362 8.73638 4.66667 8 4.66667ZM12.6667 14V11.3333M12.6667 11.3333C13.403 11.3333 14 10.7364 14 10C14 9.26362 13.403 8.66667 12.6667 8.66667C11.9303 8.66667 11.3333 9.26362 11.3333 10C11.3333 10.7364 11.9303 11.3333 12.6667 11.3333ZM12.6667 6V2"
                                      stroke={
                                        (activeTab === "invites" &&
                                          hasAppliedFilters() &&
                                          !showFiltersModal) ||
                                        (activeTab === "orders" &&
                                          hasOrdersFilters() &&
                                          !showOrdersFiltersDropdown)
                                          ? "#344698"
                                          : (activeTab === "invites" &&
                                                showFiltersModal) ||
                                              (activeTab === "orders" &&
                                                (showOrdersFiltersDropdown ||
                                                  showFiltersSelectedDropdown))
                                            ? "#717680"
                                            : "#A4A7AE"
                                      }
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "0 2px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color:
                                          (activeTab === "invites" &&
                                            hasAppliedFilters() &&
                                            !showFiltersModal) ||
                                          (activeTab === "orders" &&
                                            hasOrdersFilters() &&
                                            !showOrdersFiltersDropdown)
                                            ? "#344698"
                                            : (activeTab === "invites" &&
                                                  showFiltersModal) ||
                                                (activeTab === "orders" &&
                                                  (showOrdersFiltersDropdown ||
                                                    showFiltersSelectedDropdown))
                                              ? "#252B37"
                                              : "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight:
                                            (activeTab === "invites" &&
                                              hasAppliedFilters() &&
                                              !showFiltersModal) ||
                                            (activeTab === "orders" &&
                                              hasOrdersFilters() &&
                                              !showOrdersFiltersDropdown)
                                              ? 700
                                              : (activeTab === "invites" &&
                                                    showFiltersModal) ||
                                                  (activeTab === "orders" &&
                                                    (showOrdersFiltersDropdown ||
                                                      showFiltersSelectedDropdown))
                                                ? 700
                                                : 600,
                                          fontSize: "14px",
                                          color:
                                            (activeTab === "invites" &&
                                              hasAppliedFilters() &&
                                              !showFiltersModal) ||
                                            (activeTab === "orders" &&
                                              hasOrdersFilters() &&
                                              !showOrdersFiltersDropdown)
                                              ? "rgba(52,70,152,1)"
                                              : (activeTab === "invites" &&
                                                    showFiltersModal) ||
                                                  (activeTab === "orders" &&
                                                    (showOrdersFiltersDropdown ||
                                                      showFiltersSelectedDropdown))
                                                ? "rgba(37,43,55,1)"
                                                : "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Filters
                                      </span>
                                    </div>
                                  </div>
                                  {((activeTab === "invites" &&
                                    showFiltersModal) ||
                                    (activeTab === "orders" &&
                                      (showOrdersFiltersDropdown ||
                                        showFiltersSelectedDropdown))) && (
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M11.3333 4.66675L4.66663 11.3334M4.66663 4.66675L11.3333 11.3334"
                                        stroke="#717680"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  )}
                                </button>
                                {/* Filter Count Badge */}
                                {((activeTab === "invites" &&
                                  hasAppliedFilters() &&
                                  !showFiltersModal) ||
                                  (activeTab === "orders" &&
                                    hasOrdersFilters() &&
                                    !showOrdersFiltersDropdown)) && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "-6px",
                                      right: "-10px",
                                      display: "flex",
                                      padding: "2px 8px",
                                      alignItems: "center",
                                      borderRadius: "9999px",
                                      border: "1px solid #B3BCE5",
                                      background: "#ECEEF9",
                                      minWidth: "20px",
                                      justifyContent: "center",
                                      zIndex: 10,
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#273572",
                                        textAlign: "center",
                                        fontFamily: "Public Sans",
                                        fontSize: "12px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "18px",
                                      }}
                                    >
                                      {activeTab === "invites"
                                        ? getAppliedFiltersCount()
                                        : getOrdersFiltersCount()}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {
                                <>
                                  {/* Customize Button */}
                                  <button
                                    onClick={() =>
                                      setShowCustomizeColumnsModal(true)
                                    }
                                    onMouseEnter={() =>
                                      setHoveredButton("customize")
                                    }
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
                                      background:
                                        hoveredButton === "customize"
                                          ? "#FDFDFD"
                                          : "#FFF",
                                      boxShadow:
                                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                      cursor: "pointer",
                                      transition: "background-color 0.2s ease",
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M4.53333 2H4.13333C3.3866 2 3.01323 2 2.72801 2.14532C2.47713 2.27316 2.27316 2.47713 2.14532 2.72801C2 3.01323 2 3.3866 2 4.13333V11.8667C2 12.6134 2 12.9868 2.14532 13.272C2.27316 13.5229 2.47713 13.7268 2.72801 13.8547C3.01323 14 3.3866 14 4.13333 14H4.53333C5.28007 14 5.65344 14 5.93865 13.8547C6.18954 13.7268 6.39351 13.5229 6.52134 13.272C6.66667 12.9868 6.66667 12.6134 6.66667 11.8667V4.13333C6.66667 3.3866 6.66667 3.01323 6.52134 2.72801C6.39351 2.47713 6.18954 2.27316 5.93865 2.14532C5.65344 2 5.28007 2 4.53333 2Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M11.8667 2H11.4667C10.7199 2 10.3466 2 10.0613 2.14532C9.81046 2.27316 9.60649 2.47713 9.47866 2.72801C9.33333 3.01323 9.33333 3.3866 9.33333 4.13333V11.8667C9.33333 12.6134 9.33333 12.9868 9.47866 13.272C9.60649 13.5229 9.81046 13.7268 10.0613 13.8547C10.3466 14 10.7199 14 11.4667 14H11.8667C12.6134 14 12.9868 14 13.272 13.8547C13.5229 13.7268 13.7268 13.5229 13.8547 13.272C14 12.9868 14 12.6134 14 11.8667V4.13333C14 3.3866 14 3.01323 13.8547 2.72801C13.7268 2.47713 13.5229 2.27316 13.272 2.14532C12.9868 2 12.6134 2 11.8667 2Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "0 2px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(65,70,81,1)",
                                          }}
                                        >
                                          Customize
                                        </span>
                                      </div>
                                    </div>
                                  </button>

                                  {/* Table Views Dropdown */}
                                  {tableViewsDropdownOpen && (
                                    <div ref={tableViewsDropdownRef}>
                                      <TableViewsDropdown
                                        currentView={currentTableView}
                                        views={tableViews}
                                        onViewChange={handleViewChange}
                                        onSaveTableView={handleSaveTableView}
                                        onCreateNewView={
                                          handleCreateNewTableView
                                        }
                                        onDeleteTableView={
                                          handleDeleteTableView
                                        }
                                        onRenameTableView={
                                          handleRenameTableView
                                        }
                                        isOpen={tableViewsDropdownOpen}
                                        onToggle={() =>
                                          setTableViewsDropdownOpen(
                                            !tableViewsDropdownOpen,
                                          )
                                        }
                                        onClose={() =>
                                          setTableViewsDropdownOpen(false)
                                        }
                                        isMobile={isMobile}
                                      />
                                    </div>
                                  )}

                                  {/* Download Button */}
                                  <div style={{ position: "relative" }}>
                                    <button
                                      onClick={() =>
                                        setShowDownloadDropdown(
                                          !showDownloadDropdown,
                                        )
                                      }
                                      onMouseEnter={() =>
                                        setHoveredButton("download")
                                      }
                                      onMouseLeave={() =>
                                        setHoveredButton(null)
                                      }
                                      style={{
                                        display: "flex",
                                        minHeight: "36px",
                                        padding: "6px 8px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "4px",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background:
                                          hoveredButton === "download" ||
                                          showDownloadDropdown
                                            ? "#FDFDFD"
                                            : "#FFF",
                                        boxShadow:
                                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        cursor: "pointer",
                                        transition:
                                          "background-color 0.2s ease",
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 6.66667L8 10M8 10L4.66667 6.66667M8 10V2"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.66667"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "0 2px",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#414651",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontFamily:
                                                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                              fontWeight: 600,
                                              fontSize: "14px",
                                              color: "rgba(65,70,81,1)",
                                            }}
                                          >
                                            Download
                                          </span>
                                        </div>
                                      </div>
                                    </button>
                                    {showDownloadDropdown && (
                                      <DownloadDropdown
                                        downloadDropdownRef={
                                          downloadDropdownRef
                                        }
                                        onDownloadCSV={() => {
                                          console.log("Download CSV");
                                          setShowDownloadDropdown(false);
                                        }}
                                        onDownloadXLSX={() => {
                                          console.log("Download XLSX");
                                          setShowDownloadDropdown(false);
                                        }}
                                      />
                                    )}
                                  </div>

                                  {/* Key Stats Button */}
                                  <button
                                    onClick={() =>
                                      setShowInformationDrawer(true)
                                    }
                                    onMouseEnter={() =>
                                      setHoveredButton("information")
                                    }
                                    onMouseLeave={() => setHoveredButton(null)}
                                    style={{
                                      display: "flex",
                                      minHeight: "36px",
                                      padding: "6px 8px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "4px",
                                      borderRadius: "8px",
                                      background:
                                        hoveredButton === "information"
                                          ? "#F5F5F5"
                                          : "transparent",
                                      cursor: "pointer",
                                      transition: "background-color 0.2s ease",
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M8 9.33333V7M8 4.66667H8.00667M6.6 12.8L7.57333 14.0978C7.71808 14.2908 7.79045 14.3873 7.87918 14.4218C7.95689 14.452 8.04311 14.452 8.12082 14.4218C8.20955 14.3873 8.28192 14.2908 8.42667 14.0978L9.4 12.8C9.59543 12.5394 9.69315 12.4091 9.81234 12.3097C9.97126 12.177 10.1589 12.0832 10.3603 12.0357C10.5114 12 10.6743 12 11 12C11.9319 12 12.3978 12 12.7654 11.8478C13.2554 11.6448 13.6448 11.2554 13.8478 10.7654C14 10.3978 14 9.93188 14 9V5.2C14 4.07989 14 3.51984 13.782 3.09202C13.5903 2.71569 13.2843 2.40973 12.908 2.21799C12.4802 2 11.9201 2 10.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V9C2 9.93188 2 10.3978 2.15224 10.7654C2.35523 11.2554 2.74458 11.6448 3.23463 11.8478C3.60218 12 4.06812 12 5 12C5.32572 12 5.48858 12 5.63967 12.0357C5.84113 12.0832 6.02874 12.177 6.18766 12.3097C6.30685 12.4091 6.40457 12.5394 6.6 12.8Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "0 2px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#535862",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(83,88,98,1)",
                                          }}
                                        >
                                          Key Stats
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                </>
                              }
                            </div>
                          </>
                        ) : isMobile ? (
                          <>
                            {/* Mobile: Title + Dots Action Button Row */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                alignSelf: "stretch",
                                position: "relative",
                              }}
                            >
                              {/* Title */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "flex-start",
                                  gap: "2px",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#181D27",
                                    fontFamily: "Public Sans",
                                    fontSize: "18px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "28px",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 600,
                                      fontSize: "18px",
                                      color: "rgba(24,29,39,1)",
                                    }}
                                  >
                                    {activeTab === "invites"
                                      ? "Invites"
                                      : "Orders"}
                                  </span>
                                </div>
                              </div>

                              {/* Mobile Dots Menu */}
                              <div style={{ position: "relative" }}>
                                <button
                                  onClick={() =>
                                    setShowMobileDotsMenu(!showMobileDotsMenu)
                                  }
                                  style={{
                                    display: "flex",
                                    minHeight: "36px",
                                    padding: "8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background: showMobileDotsMenu
                                      ? "#FDFDFD"
                                      : "#FFF",
                                    boxShadow:
                                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                  }}
                                >
                                  <ActionDotsIcon />
                                </button>

                                {/* Mobile Dots Menu Dropdown */}
                                {showMobileDotsMenu && (
                                  <div
                                    ref={mobileDotsMenuRef}
                                    style={{
                                      position: "absolute",
                                      top: "calc(100% + 4px)",
                                      left: "calc(-100vw + 100px)",
                                      right: "0",
                                      borderRadius: "8px",
                                      border:
                                        "1px solid rgba(10, 13, 18, 0.04)",
                                      background: "rgba(255, 255, 255, 1)",
                                      boxShadow:
                                        "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                      zIndex: 9999,
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "4px 0",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        alignSelf: "stretch",
                                      }}
                                    >
                                      {/* Customize Option */}
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "0px",
                                          alignItems: "center",
                                          alignSelf: "stretch",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          console.log("Customize clicked");
                                          setShowMobileDotsMenu(false);
                                        }}
                                      >
                                        <div
                                          className="content"
                                          style={{
                                            display: "flex",
                                            minHeight: "36px",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "4px",
                                            flex: "1 0 0",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "#FFF",
                                            boxShadow:
                                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            transition:
                                              "background-color 0.2s ease",
                                          }}
                                        >
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M4.53333 2H4.13333C3.3866 2 3.01323 2 2.72801 2.14532C2.47713 2.27316 2.27316 2.47713 2.14532 2.72801C2 3.01323 2 3.3866 2 4.13333V11.8667C2 12.6134 2 12.9868 2.14532 13.272C2.27316 13.5229 2.47713 13.7268 2.72801 13.8547C3.01323 14 3.3866 14 4.13333 14H4.53333C5.28007 14 5.65344 14 5.93865 13.8547C6.18954 13.7268 6.39351 13.5229 6.52134 13.272C6.66667 12.9868 6.66667 12.6134 6.66667 11.8667V4.13333C6.66667 3.3866 6.66667 3.01323 6.52134 2.72801C6.39351 2.47713 6.18954 2.27316 5.93865 2.14532C5.65344 2 5.28007 2 4.53333 2Z"
                                              stroke="#A4A7AE"
                                              strokeWidth="1.66667"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M11.8667 2H11.4667C10.7199 2 10.3466 2 10.0613 2.14532C9.81046 2.27316 9.60649 2.47713 9.47866 2.72801C9.33333 3.01323 9.33333 3.3866 9.33333 4.13333V11.8667C9.33333 12.6134 9.33333 12.9868 9.47866 13.272C9.60649 13.5229 9.81046 13.7268 10.0613 13.8547C10.3466 14 10.7199 14 11.4667 14H11.8667C12.6134 14 12.9868 14 13.272 13.8547C13.5229 13.7268 13.7268 13.5229 13.8547 13.272C14 12.9868 14 12.6134 14 11.8667V4.13333C14 3.3866 14 3.01323 13.8547 2.72801C13.7268 2.47713 13.5229 2.27316 13.272 2.14532C12.9868 2 12.6134 2 11.8667 2Z"
                                              stroke="#A4A7AE"
                                              strokeWidth="1.66667"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          <span
                                            style={{
                                              fontFamily:
                                                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                              fontWeight: 600,
                                              fontSize: "14px",
                                              color: "rgba(65,70,81,1)",
                                            }}
                                          >
                                            Customize
                                          </span>
                                        </div>
                                      </div>

                                      {/* Default Option */}
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "0px",
                                          alignItems: "center",
                                          alignSelf: "stretch",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          console.log("Default clicked");
                                          setShowMobileDotsMenu(false);
                                        }}
                                      >
                                        <div
                                          className="content"
                                          style={{
                                            display: "flex",
                                            minHeight: "36px",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "4px",
                                            flex: "1 0 0",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background: "#FFF",
                                            boxShadow:
                                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            transition:
                                              "background-color 0.2s ease",
                                          }}
                                        >
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M2 6L14 6M6 2L6 14M5.2 2H10.8C11.9201 2 12.4802 2 12.908 2.21799C13.2843 2.40973 13.5903 2.71569 13.782 3.09202C14 3.51984 14 4.0799 14 5.2V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2Z"
                                              stroke="#A4A7AE"
                                              strokeWidth="1.66667"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          <span
                                            style={{
                                              fontFamily:
                                                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                              fontWeight: 600,
                                              fontSize: "14px",
                                              color: "rgba(65,70,81,1)",
                                            }}
                                          >
                                            Default
                                          </span>
                                        </div>
                                      </div>

                                      {/* Key Stats Option */}
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "1px 4px",
                                          alignItems: "center",
                                          alignSelf: "stretch",
                                          cursor: "pointer",
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.querySelector(
                                            ".content",
                                          ).style.backgroundColor = "#F5F5F5";
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.querySelector(
                                            ".content",
                                          ).style.backgroundColor =
                                            "transparent";
                                        }}
                                        onClick={() => {
                                          console.log("Key Stats clicked");
                                          setShowInformationDrawer(true);
                                          setShowMobileDotsMenu(false);
                                        }}
                                      >
                                        <div
                                          className="content"
                                          style={{
                                            display: "flex",
                                            padding: "8px 12px",
                                            alignItems: "center",
                                            gap: "12px",
                                            flex: "1 0 0",
                                            borderRadius: "6px",
                                            transition:
                                              "background-color 0.2s ease",
                                          }}
                                        >
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M8 9.33333V7M8 4.66667H8.00667M6.6 12.8L7.57333 14.0978C7.71808 14.2908 7.79045 14.3873 7.87918 14.4218C7.95689 14.452 8.04311 14.452 8.12082 14.4218C8.20955 14.3873 8.28192 14.2908 8.42667 14.0978L9.4 12.8C9.59543 12.5394 9.69315 12.4091 9.81234 12.3097C9.97126 12.177 10.1589 12.0832 10.3603 12.0357C10.5114 12 10.6743 12 11 12C11.9319 12 12.3978 12 12.7654 11.8478C13.2554 11.6448 13.6448 11.2554 13.8478 10.7654C14 10.3978 14 9.93188 14 9V5.2C14 4.07989 14 3.51984 13.782 3.09202C13.5903 2.71569 13.2843 2.40973 12.908 2.21799C12.4802 2 11.9201 2 10.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V9C2 9.93188 2 10.3978 2.15224 10.7654C2.35523 11.2554 2.74458 11.6448 3.23463 11.8478C3.60218 12 4.06812 12 5 12C5.32572 12 5.48858 12 5.63967 12.0357C5.84113 12.0832 6.02874 12.177 6.18766 12.3097C6.30685 12.4091 6.40457 12.5394 6.6 12.8Z"
                                              stroke="#A4A7AE"
                                              strokeWidth="1.66667"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          <span
                                            style={{
                                              fontFamily:
                                                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                              fontWeight: 600,
                                              fontSize: "14px",
                                              color: "rgba(83,88,98,1)",
                                            }}
                                          >
                                            Key Stats
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Mobile: View Toggle + Search Row */}
                            {!showActionsPanel && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  alignSelf: "stretch",
                                  position: "relative",
                                  width: "100%",
                                  maxWidth: "100%",
                                  overflow: "visible",
                                  boxSizing: "border-box",
                                }}
                              >
                                {/* View Toggle */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    boxShadow:
                                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    position: "relative",
                                    minWidth: "88px",
                                    flexShrink: 0,
                                  }}
                                >
                                  {/* Table View Button */}
                                  <button
                                    onClick={() => setTableView("table")}
                                    style={{
                                      display: "flex",
                                      minHeight: "40px",
                                      padding: "8px 12px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "6px",
                                      borderRight: "1px solid #D5D7DA",
                                      background:
                                        tableView === "table"
                                          ? "#ECEEF9"
                                          : "#FFF",
                                      borderTopLeftRadius: "8px",
                                      borderBottomLeftRadius: "8px",
                                      cursor: "pointer",
                                      position: "relative",
                                    }}
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3 9L21 9M9 3L9 21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
                                        stroke={
                                          tableView === "table"
                                            ? "#344698"
                                            : "#A4A7AE"
                                        }
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>

                                  {/* Rows View Button */}
                                  <button
                                    onClick={() => setTableView("rows")}
                                    style={{
                                      display: "flex",
                                      minHeight: "40px",
                                      padding: "8px 12px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "6px",
                                      background:
                                        tableView === "rows"
                                          ? "#ECEEF9"
                                          : "#FFF",
                                      borderTopRightRadius: "8px",
                                      borderBottomRightRadius: "8px",
                                      cursor: "pointer",
                                      position: "relative",
                                    }}
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M17.8 10C18.9201 10 19.4802 10 19.908 9.78201C20.2843 9.59027 20.5903 9.28431 20.782 8.90798C21 8.48016 21 7.92011 21 6.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.7157 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3L6.2 3C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2L3 6.8C3 7.9201 3 8.48016 3.21799 8.90798C3.40973 9.28431 3.71569 9.59027 4.09202 9.78201C4.51984 10 5.07989 10 6.2 10L17.8 10Z"
                                        stroke={
                                          tableView === "rows"
                                            ? "#344698"
                                            : "#A4A7AE"
                                        }
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M17.8 21C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V17.2C21 16.0799 21 15.5198 20.782 15.092C20.5903 14.7157 20.2843 14.4097 19.908 14.218C19.4802 14 18.9201 14 17.8 14L6.2 14C5.0799 14 4.51984 14 4.09202 14.218C3.71569 14.4097 3.40973 14.7157 3.21799 15.092C3 15.5198 3 16.0799 3 17.2L3 17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8Z"
                                        stroke={
                                          tableView === "rows"
                                            ? "#344698"
                                            : "#A4A7AE"
                                        }
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </div>

                                {/* Search Input */}
                                <div
                                  className="search-container"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    flex: "1 0 0",
                                    minWidth: 0,
                                    height: "40px",
                                    borderRadius: "8px",
                                    border: isSearchActive
                                      ? "2px solid #34479A"
                                      : "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    padding: isSearchActive ? "7px" : "8px",
                                    position: "relative",
                                    boxSizing: "border-box",
                                    maxWidth: "100%",
                                    overflow: "visible",
                                  }}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7963 10.7963 13.3333 7.66667 13.3333C4.53705 13.3333 2 10.7963 2 7.66667C2 4.53705 4.53705 2 7.66667 2C10.7963 2 13.3333 4.53705 13.3333 7.66667Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <input
                                    type="text"
                                    placeholder={
                                      isSearchActive
                                        ? ""
                                        : "Search by Name, SSN, State.."
                                    }
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => setIsSearchActive(true)}
                                    onBlur={() =>
                                      setIsSearchActive(
                                        searchQuery.length > 0 ||
                                          showAdvancedSearch,
                                      )
                                    }
                                    style={{
                                      border: "none",
                                      outline: "none",
                                      background: "transparent",
                                      flex: "1 1 auto",
                                      minWidth: 0,
                                      maxWidth: "calc(100% - 32px)",
                                      color: isSearchActive
                                        ? "#181D27"
                                        : "#717680",
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontSize: "14px",
                                      fontWeight: isSearchActive ? 500 : 400,
                                      lineHeight: "20px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  />

                                  {/* Mobile: Advanced Search Button - Only show when search is not active */}
                                  {!isSearchActive && (
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        console.log(
                                          "Mobile advanced search clicked, current state:",
                                          showAdvancedSearch,
                                        );
                                        setShowAdvancedSearch(
                                          !showAdvancedSearch,
                                        );
                                      }}
                                      style={{
                                        display: "flex",
                                        width: "24px",
                                        height: "24px",
                                        padding: "2px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "4px",
                                        border: "none",
                                        background: showAdvancedSearch
                                          ? "#F5F5F5"
                                          : "transparent",
                                        cursor: "pointer",
                                        touchAction: "manipulation",
                                        flexShrink: 0,
                                        minWidth: "24px",
                                        minHeight: "24px",
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M2 5.33325L10 5.33325M10 5.33325C10 6.43782 10.8954 7.33325 12 7.33325C13.1046 7.33325 14 6.43782 14 5.33325C14 4.22868 13.1046 3.33325 12 3.33325C10.8954 3.33325 10 4.22868 10 5.33325ZM6 10.6666L14 10.6666M6 10.6666C6 11.7712 5.10457 12.6666 4 12.6666C2.89543 12.6666 2 11.7712 2 10.6666C2 9.56202 2.89543 8.66659 4 8.66659C5.10457 8.66659 6 9.56202 6 10.6666Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.66667"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>
                                  )}

                                  {isSearchActive && (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "2px",
                                      }}
                                    >
                                      {/* X Button */}
                                      <button
                                        onMouseDown={(e) => {
                                          e.preventDefault();
                                          clearSearch();
                                        }}
                                        onMouseEnter={() =>
                                          setHoveredSearchButton("clear")
                                        }
                                        onMouseLeave={() =>
                                          setHoveredSearchButton(null)
                                        }
                                        style={{
                                          display: "flex",
                                          width: "24px",
                                          height: "24px",
                                          padding: "4px",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          borderRadius: "6px",
                                          border: "none",
                                          background:
                                            hoveredSearchButton === "clear"
                                              ? "#F5F5F5"
                                              : "transparent",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M11.3333 4.66675L4.66666 11.3334M4.66666 4.66675L11.3333 11.3334"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>

                                      {/* Divider */}
                                      <div
                                        style={{
                                          width: "1px",
                                          height: "24px",
                                          background: "#E9EAEB",
                                        }}
                                      />

                                      {/* Advanced Search Button */}
                                      <div style={{ position: "relative" }}>
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setShowAdvancedSearch(
                                              !showAdvancedSearch,
                                            );
                                          }}
                                          style={{
                                            display: "flex",
                                            width: "24px",
                                            height: "24px",
                                            padding: "2px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "4px",
                                            border: "none",
                                            background: showAdvancedSearch
                                              ? "#F5F5F5"
                                              : "transparent",
                                            cursor: "pointer",
                                            touchAction: "manipulation",
                                            flexShrink: 0,
                                            minWidth: "24px",
                                            minHeight: "24px",
                                          }}
                                        >
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M2 5.33325L10 5.33325M10 5.33325C10 6.43782 10.8954 7.33325 12 7.33325C13.1046 7.33325 14 6.43782 14 5.33325C14 4.22868 13.1046 3.33325 12 3.33325C10.8954 3.33325 10 4.22868 10 5.33325ZM6 10.6666L14 10.6666M6 10.6666C6 11.7712 5.10457 12.6666 4 12.6666C2.89543 12.6666 2 11.7712 2 10.6666C2 9.56202 2.89543 8.66659 4 8.66659C5.10457 8.66659 6 9.56202 6 10.6666Z"
                                              stroke="#A4A7AE"
                                              strokeWidth="1.66667"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  {/* Mobile Advanced Search Dropdown - positioned relative to search bar */}
                                  <AdvancedSearchDropdown
                                    showAdvancedSearch={showAdvancedSearch}
                                    advancedSearchForm={advancedSearchForm}
                                    focusedAdvancedField={focusedAdvancedField}
                                    onFieldChange={handleAdvancedSearchChange}
                                    onFieldFocus={setFocusedAdvancedField}
                                    onClear={clearAdvancedSearch}
                                    onSearch={handleAdvancedSearch}
                                    dropdownRef={mobileAdvancedSearchRef}
                                    style={{
                                      right: "0",
                                      left: "0",
                                      width: "auto",
                                    }}
                                  />
                                </div>
                              </div>
                            )}

                            <div style={{ position: "relative" }}>
                              {false && (
                                <div
                                  style={{
                                    display: "none",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(10, 13, 18, 0.04)",
                                    background: "rgba(255, 255, 255, 1)",
                                    boxShadow:
                                      "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                    zIndex: 9999,
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "12px",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "12px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    {/* Title */}
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        alignSelf: "stretch",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        Advanced Search
                                      </div>
                                      <button
                                        onClick={clearAdvancedSearch}
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#273572",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        Clear
                                      </button>
                                    </div>

                                    {/* Form */}
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: "8px",
                                        alignSelf: "stretch",
                                      }}
                                    >
                                      {/* First Name */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          alignSelf: "stretch",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#414651",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          First Name
                                        </div>
                                        <input
                                          type="text"
                                          value={advancedSearchForm.firstName}
                                          onChange={(e) =>
                                            handleAdvancedSearchChange(
                                              "firstName",
                                              e.target.value,
                                            )
                                          }
                                          placeholder="Enter first name"
                                          style={{
                                            display: "flex",
                                            height: "32px",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background:
                                              "rgba(255, 255, 255, 1)",
                                            boxShadow:
                                              "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            color: "#717680",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                            outline: "none",
                                          }}
                                        />
                                      </div>

                                      {/* Last Name */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          alignSelf: "stretch",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#414651",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          Last Name
                                        </div>
                                        <input
                                          type="text"
                                          value={advancedSearchForm.lastName}
                                          onChange={(e) =>
                                            handleAdvancedSearchChange(
                                              "lastName",
                                              e.target.value,
                                            )
                                          }
                                          placeholder="Enter last name"
                                          style={{
                                            display: "flex",
                                            height: "32px",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background:
                                              "rgba(255, 255, 255, 1)",
                                            boxShadow:
                                              "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            color: "#717680",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                            outline: "none",
                                          }}
                                        />
                                      </div>

                                      {/* Social Security Trace */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          alignSelf: "stretch",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#414651",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          Social Security Trace
                                        </div>
                                        <input
                                          type="text"
                                          value={
                                            advancedSearchForm.socialSecurityTrace
                                          }
                                          onChange={(e) =>
                                            handleAdvancedSearchChange(
                                              "socialSecurityTrace",
                                              e.target.value,
                                            )
                                          }
                                          placeholder="000-00-0000"
                                          style={{
                                            display: "flex",
                                            height: "32px",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background:
                                              "rgba(255, 255, 255, 1)",
                                            boxShadow:
                                              "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            color: "#717680",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                            outline: "none",
                                          }}
                                        />
                                      </div>

                                      {/* Order Number */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          gap: "6px",
                                          alignSelf: "stretch",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#414651",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          Order Number
                                        </div>
                                        <input
                                          type="text"
                                          value={""}
                                          onChange={(e) =>
                                            handleAdvancedSearchChange(
                                              "orderNumber",
                                              e.target.value,
                                            )
                                          }
                                          placeholder="REMOVE_THIS_FIELD"
                                          style={{
                                            display: "flex",
                                            height: "32px",
                                            padding: "6px 8px",
                                            alignItems: "center",
                                            gap: "8px",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",
                                            border: "1px solid #D5D7DA",
                                            background:
                                              "rgba(255, 255, 255, 1)",
                                            boxShadow:
                                              "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                            color: "#717680",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                            outline: "none",
                                          }}
                                        />
                                      </div>

                                      {/* Search Button */}
                                      <button
                                        onClick={handleAdvancedSearch}
                                        style={{
                                          display: "flex",
                                          height: "32px",
                                          padding: "6px 12px",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          gap: "4px",
                                          alignSelf: "stretch",
                                          borderRadius: "8px",
                                          border: "1px solid #273572",
                                          background: "#273572",
                                          cursor: "pointer",
                                          color: "rgba(255, 255, 255, 1)",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontStyle: "normal",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        Search
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Mobile: Download + Filters Buttons Row */}
                            <div
                              style={{
                                display: showActionsPanel ? "none" : "flex",
                                alignItems: "center",
                                gap: "12px",
                                alignSelf: "stretch",
                                position: "relative",
                              }}
                            >
                              {/* Filters Button */}
                              <div
                                style={{
                                  position: "relative",
                                  flex: "1 0 0",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    if (activeTab === "invites") {
                                      setShowMobileFiltersModal(
                                        !showMobileFiltersModal,
                                      );
                                    } else if (activeTab === "orders") {
                                      if (hasOrdersFilters()) {
                                        setShowFiltersSelectedDropdown(
                                          !showFiltersSelectedDropdown,
                                        );
                                      } else {
                                        setShowOrdersFiltersDropdown(
                                          !showOrdersFiltersDropdown,
                                        );
                                      }
                                    }
                                  }}
                                  onMouseEnter={() =>
                                    setHoveredButton("filters")
                                  }
                                  onMouseLeave={() => setHoveredButton(null)}
                                  style={{
                                    display: "flex",
                                    minHeight: "36px",
                                    padding: "6px 8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    borderRadius: "8px",
                                    border:
                                      activeTab === "invites" &&
                                      hasAppliedFilters() &&
                                      !showMobileFiltersModal
                                        ? "1px solid #34479A"
                                        : "1px solid #D5D7DA",
                                    background:
                                      activeTab === "invites" &&
                                      hasAppliedFilters() &&
                                      !showMobileFiltersModal
                                        ? "#ECEEF9"
                                        : hoveredButton === "filters" ||
                                            (activeTab === "invites" &&
                                              showMobileFiltersModal)
                                          ? "#FDFDFD"
                                          : "#FFF",
                                    width: "100%",
                                    boxShadow:
                                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                  }}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3.83333 14L3.83333 10M3.83333 10C4.56971 10 5.16667 9.40305 5.16667 8.66667C5.16667 7.93029 4.56971 7.33333 3.83333 7.33333C3.09695 7.33333 2.5 7.93029 2.5 8.66667C2.5 9.40305 3.09695 10 3.83333 10ZM3.83333 4.66667V2M8.5 14V10M8.5 4.66667V2M8.5 4.66667C7.76362 4.66667 7.16667 5.26362 7.16667 6C7.16667 6.73638 7.76362 7.33333 8.5 7.33333C9.23638 7.33333 9.83333 6.73638 9.83333 6C9.83333 5.26362 9.23638 4.66667 8.5 4.66667ZM13.1667 14V11.3333M13.1667 11.3333C13.903 11.3333 14.5 10.7364 14.5 10C14.5 9.26362 13.903 8.66667 13.1667 8.66667C12.4303 8.66667 11.8333 9.26362 11.8333 10C11.8333 10.7364 12.4303 11.3333 13.1667 11.3333ZM13.1667 6V2"
                                      stroke={
                                        activeTab === "invites" &&
                                        hasAppliedFilters() &&
                                        !showMobileFiltersModal
                                          ? "#344698"
                                          : "#A4A7AE"
                                      }
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "0 2px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color:
                                          activeTab === "invites" &&
                                          hasAppliedFilters() &&
                                          !showMobileFiltersModal
                                            ? "#273572"
                                            : "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontWeight:
                                          activeTab === "invites" &&
                                          hasAppliedFilters() &&
                                          !showMobileFiltersModal
                                            ? 600
                                            : 600,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 600,
                                          fontSize: "14px",
                                          color:
                                            activeTab === "invites" &&
                                            hasAppliedFilters() &&
                                            !showMobileFiltersModal
                                              ? "rgba(39,53,114,1)"
                                              : "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Filters
                                      </span>
                                    </div>
                                  </div>
                                </button>

                                {/* Filter Count Badge */}
                                {((activeTab === "invites" &&
                                  hasAppliedFilters() &&
                                  !showMobileFiltersModal) ||
                                  (activeTab === "orders" &&
                                    hasOrdersFilters())) && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "-6px",
                                      right: "-10px",
                                      display: "flex",
                                      padding: "2px 8px",
                                      alignItems: "center",
                                      borderRadius: "9999px",
                                      border: "1px solid #B3BCE5",
                                      background: "#ECEEF9",
                                      minWidth: "20px",
                                      justifyContent: "center",
                                      zIndex: 10,
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#273572",
                                        textAlign: "center",
                                        fontFamily: "Public Sans",
                                        fontSize: "12px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "18px",
                                      }}
                                    >
                                      {activeTab === "invites"
                                        ? getAppliedFiltersCount()
                                        : getOrdersFiltersCount()}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Download Button */}
                              <div
                                style={{
                                  position: "relative",
                                  flex: "1 0 0",
                                }}
                              >
                                <button
                                  onClick={() =>
                                    setShowDownloadDropdown(
                                      !showDownloadDropdown,
                                    )
                                  }
                                  onMouseEnter={() =>
                                    setHoveredButton("download")
                                  }
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
                                    background:
                                      hoveredButton === "download" ||
                                      showDownloadDropdown
                                        ? "#FDFDFD"
                                        : "#FFF",
                                    width: "100%",
                                    boxShadow:
                                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                  }}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M14.25 10V10.8C14.25 11.9201 14.25 12.4802 14.032 12.908C13.8403 13.2843 13.5343 13.5903 13.158 13.782C12.7302 14 12.1701 14 11.05 14H5.45C4.32989 14 3.76984 14 3.34202 13.782C2.96569 13.5903 2.65973 13.2843 2.46799 12.908C2.25 12.4802 2.25 11.9201 2.25 10.8V10M11.5833 6.66667L8.25 10M8.25 10L4.91667 6.66667M8.25 10V2"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "0 2px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#414651",
                                        fontFamily: "Public Sans",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontFamily:
                                            "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                          fontWeight: 600,
                                          fontSize: "14px",
                                          color: "rgba(65,70,81,1)",
                                        }}
                                      >
                                        Download
                                      </span>
                                    </div>
                                  </div>
                                </button>
                                {showDownloadDropdown && (
                                  <DownloadDropdown
                                    downloadDropdownRef={downloadDropdownRef}
                                    onDownloadCSV={() => {
                                      console.log("Download CSV");
                                      setShowDownloadDropdown(false);
                                    }}
                                    onDownloadXLSX={() => {
                                      console.log("Download XLSX");
                                      setShowDownloadDropdown(false);
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Tablet: Title + Right-aligned Toggle + Search Row */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                alignSelf: "stretch",
                                position: "relative",
                              }}
                            >
                              {/* Title */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "flex-start",
                                  gap: "2px",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#181D27",
                                    fontFamily: "Public Sans",
                                    fontSize: "18px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "28px",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 600,
                                      fontSize: "18px",
                                      color: "rgba(24,29,39,1)",
                                    }}
                                  >
                                    {activeTab === "invites"
                                      ? "Invites"
                                      : "Orders"}
                                  </span>
                                </div>
                              </div>

                              {/* Right-aligned: View Toggle + Search */}
                              {!showActionsPanel && (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    position: "relative",
                                  }}
                                >
                                  {/* View Toggle */}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      borderRadius: "8px",
                                      border: "1px solid #D5D7DA",
                                      boxShadow:
                                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                      position: "relative",
                                      minWidth: "88px",
                                      flexShrink: 0,
                                    }}
                                  >
                                    {/* Table View Button */}
                                    <button
                                      onClick={() => setTableView("table")}
                                      style={{
                                        display: "flex",
                                        minHeight: "40px",
                                        padding: "8px 12px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "6px",
                                        borderRight: "1px solid #D5D7DA",
                                        background:
                                          tableView === "table"
                                            ? "#ECEEF9"
                                            : "#FFF",
                                        borderTopLeftRadius: "8px",
                                        borderBottomLeftRadius: "8px",
                                        cursor: "pointer",
                                        position: "relative",
                                      }}
                                    >
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M3 9L21 9M9 3L9 21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
                                          stroke={
                                            tableView === "table"
                                              ? "#344698"
                                              : "#A4A7AE"
                                          }
                                          strokeWidth="1.66667"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>

                                    {/* Rows View Button */}
                                    <button
                                      onClick={() => setTableView("rows")}
                                      style={{
                                        display: "flex",
                                        minHeight: "40px",
                                        padding: "8px 12px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "6px",
                                        background:
                                          tableView === "rows"
                                            ? "#ECEEF9"
                                            : "#FFF",
                                        borderTopRightRadius: "8px",
                                        borderBottomRightRadius: "8px",
                                        cursor: "pointer",
                                        position: "relative",
                                      }}
                                    >
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M17.8 10C18.9201 10 19.4802 10 19.908 9.78201C20.2843 9.59027 20.5903 9.28431 20.782 8.90798C21 8.48016 21 7.92011 21 6.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.7157 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3L6.2 3C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2L3 6.8C3 7.9201 3 8.48016 3.21799 8.90798C3.40973 9.28431 3.71569 9.59027 4.09202 9.78201C4.51984 10 5.07989 10 6.2 10L17.8 10Z"
                                          stroke={
                                            tableView === "rows"
                                              ? "#344698"
                                              : "#A4A7AE"
                                          }
                                          strokeWidth="1.66667"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M17.8 21C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V17.2C21 16.0799 21 15.5198 20.782 15.092C20.5903 14.7157 20.2843 14.4097 19.908 14.218C19.4802 14 18.9201 14 17.8 14L6.2 14C5.0799 14 4.51984 14 4.09202 14.218C3.71569 14.4097 3.40973 14.7157 3.21799 15.092C3 15.5198 3 16.0799 3 17.2L3 17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8Z"
                                          stroke={
                                            tableView === "rows"
                                              ? "#344698"
                                              : "#A4A7AE"
                                          }
                                          strokeWidth="1.66667"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>
                                  </div>

                                  {/* Search Input */}
                                  <div
                                    className="search-container"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                      height: "40px",
                                      borderRadius: "8px",
                                      border: isSearchActive
                                        ? "2px solid #34479A"
                                        : "1px solid #D5D7DA",
                                      background: "#FFF",
                                      boxShadow:
                                        "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                      padding: isSearchActive ? "7px" : "8px",
                                      position: "relative",
                                      boxSizing: "border-box",
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7963 10.7963 13.3333 7.66667 13.3333C4.53705 13.3333 2 10.7963 2 7.66667C2 4.53705 4.53705 2 7.66667 2C10.7963 2 13.3333 4.53705 13.3333 7.66667Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <input
                                      type="text"
                                      placeholder={
                                        isSearchActive
                                          ? ""
                                          : "Search by Name, SSN, State.."
                                      }
                                      value={searchQuery}
                                      onChange={handleSearchChange}
                                      onFocus={() => setIsSearchActive(true)}
                                      onBlur={() =>
                                        setIsSearchActive(
                                          searchQuery.length > 0 ||
                                            showAdvancedSearch,
                                        )
                                      }
                                      style={{
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        flex: "1 0 0",
                                        color: isSearchActive
                                          ? "#181D27"
                                          : "#717680",
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontSize: "14px",
                                        fontWeight: isSearchActive ? 500 : 400,
                                        lineHeight: "20px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    />
                                    {isSearchActive && (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "2px",
                                        }}
                                      >
                                        {/* X Button */}
                                        <button
                                          onMouseDown={(e) => {
                                            e.preventDefault();
                                            clearSearch();
                                          }}
                                          onMouseEnter={() =>
                                            setHoveredSearchButton("clear")
                                          }
                                          onMouseLeave={() =>
                                            setHoveredSearchButton(null)
                                          }
                                          style={{
                                            display: "flex",
                                            width: "24px",
                                            height: "24px",
                                            padding: "4px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "6px",
                                            border: "none",
                                            background:
                                              hoveredSearchButton === "clear"
                                                ? "#F5F5F5"
                                                : "transparent",
                                            cursor: "pointer",
                                          }}
                                        >
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M11.3333 4.66675L4.66666 11.3334M4.66666 4.66675L11.3333 11.3334"
                                              stroke="#A4A7AE"
                                              strokeWidth="1.66667"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </button>

                                        {/* Divider */}
                                        <div
                                          style={{
                                            width: "1px",
                                            height: "24px",
                                            background: "#E9EAEB",
                                          }}
                                        />

                                        {/* Advanced Search Button */}
                                        <div style={{ position: "relative" }}>
                                          <button
                                            onMouseDown={(e) => {
                                              e.preventDefault();
                                              setShowAdvancedSearch(
                                                !showAdvancedSearch,
                                              );
                                            }}
                                            onMouseEnter={() =>
                                              setHoveredSearchButton("advanced")
                                            }
                                            onMouseLeave={() =>
                                              setHoveredSearchButton(null)
                                            }
                                            style={{
                                              display: "flex",
                                              width: "24px",
                                              height: "24px",
                                              padding: "4px",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              borderRadius: "6px",
                                              border: "none",
                                              background:
                                                showAdvancedSearch ||
                                                hoveredSearchButton ===
                                                  "advanced"
                                                  ? "#F5F5F5"
                                                  : "transparent",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M2 5.33325L10 5.33325M10 5.33325C10 6.43782 10.8954 7.33325 12 7.33325C13.1046 7.33325 14 6.43782 14 5.33325C14 4.22868 13.1046 3.33325 12 3.33325C10.8954 3.33325 10 4.22868 10 5.33325ZM6 10.6666L14 10.6666M6 10.6666C6 11.7712 5.10457 12.6666 4 12.6666C2.89543 12.6666 2 11.7712 2 10.6666C2 9.56202 2.89543 8.66659 4 8.66659C5.10457 8.66659 6 9.56202 6 10.6666Z"
                                                stroke="#A4A7AE"
                                                strokeWidth="1.66667"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                          </button>
                                        </div>

                                        {/* Tablet Advanced Search Dropdown - positioned relative to search bar */}
                                        <AdvancedSearchDropdown
                                          showAdvancedSearch={
                                            showAdvancedSearch
                                          }
                                          advancedSearchForm={
                                            advancedSearchForm
                                          }
                                          focusedAdvancedField={
                                            focusedAdvancedField
                                          }
                                          onFieldChange={
                                            handleAdvancedSearchChange
                                          }
                                          onFieldFocus={setFocusedAdvancedField}
                                          onClear={clearAdvancedSearch}
                                          onSearch={handleAdvancedSearch}
                                          dropdownRef={tabletAdvancedSearchRef}
                                          style={{
                                            right: "0",
                                            left: "0",
                                            width: "auto",
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Tablet: Action Buttons Row */}
                            <div
                              style={{
                                display: showActionsPanel ? "none" : "flex",
                                alignItems: "center",
                                gap: "12px",
                                alignSelf: "stretch",
                                position: "relative",
                                flexWrap: "wrap",
                                justifyContent: "flex-start",
                                width: "100%",
                                maxWidth: "100%",
                                overflow: "visible",
                                boxSizing: "border-box",
                              }}
                            >
                              {/* Mobile: Show only primary buttons + dots menu */}
                              {isMobile ? (
                                <>
                                  {/* Filters Button */}
                                  <button
                                    onClick={() =>
                                      console.log("Filters clicked")
                                    }
                                    onMouseEnter={() =>
                                      setHoveredButton("filters")
                                    }
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
                                      background:
                                        hoveredButton === "filters" ||
                                        showFiltersModal
                                          ? "#F5F5F5"
                                          : "#FFF",
                                      flex: "1 0 0",
                                      minWidth: "0",
                                      boxShadow:
                                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                      cursor: "pointer",
                                      transition: "background-color 0.2s ease",
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 17 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3.83333 14L3.83333 10M3.83333 10C4.56971 10 5.16667 9.40305 5.16667 8.66667C5.16667 7.93029 4.56971 7.33333 3.83333 7.33333C3.09695 7.33333 2.5 7.93029 2.5 8.66667C2.5 9.40305 3.09695 10 3.83333 10ZM3.83333 4.66667V2M8.5 14V10M8.5 4.66667V2M8.5 4.66667C7.76362 4.66667 7.16667 5.26362 7.16667 6C7.16667 6.73638 7.76362 7.33333 8.5 7.33333C9.23638 7.33333 9.83333 6.73638 9.83333 6C9.83333 5.26362 9.23638 4.66667 8.5 4.66667ZM13.1667 14V11.3333M13.1667 11.3333C13.903 11.3333 14.5 10.7364 14.5 10C14.5 9.26362 13.903 8.66667 13.1667 8.66667C12.4303 8.66667 11.8333 9.26362 11.8333 10C11.8333 10.7364 12.4303 11.3333 13.1667 11.3333ZM13.1667 6V2"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "0 2px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(65,70,81,1)",
                                          }}
                                        >
                                          Filters
                                        </span>
                                      </div>
                                    </div>
                                  </button>

                                  {/* Download Button */}
                                  <div
                                    style={{
                                      position: "relative",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <button
                                      onClick={() =>
                                        setShowDownloadDropdown(
                                          !showDownloadDropdown,
                                        )
                                      }
                                      onMouseEnter={() =>
                                        setHoveredButton("download")
                                      }
                                      onMouseLeave={() =>
                                        setHoveredButton(null)
                                      }
                                      style={{
                                        display: "flex",
                                        minHeight: "36px",
                                        padding: "6px 8px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "4px",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background:
                                          hoveredButton === "download" ||
                                          showDownloadDropdown
                                            ? "#FDFDFD"
                                            : "#FFF",
                                        width: "100%",
                                        boxShadow:
                                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        cursor: "pointer",
                                        transition:
                                          "background-color 0.2s ease",
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 6.66667L8 10M8 10L4.66667 6.66667M8 10V2"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.66667"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "0 2px",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#414651",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontFamily:
                                                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                              fontWeight: 600,
                                              fontSize: "14px",
                                              color: "rgba(65,70,81,1)",
                                            }}
                                          >
                                            Download
                                          </span>
                                        </div>
                                      </div>
                                    </button>
                                    {showDownloadDropdown && (
                                      <DownloadDropdown
                                        downloadDropdownRef={
                                          downloadDropdownRef
                                        }
                                        onDownloadCSV={() => {
                                          console.log("Download CSV");
                                          setShowDownloadDropdown(false);
                                        }}
                                        onDownloadXLSX={() => {
                                          console.log("Download XLSX");
                                          setShowDownloadDropdown(false);
                                        }}
                                      />
                                    )}
                                  </div>

                                  {/* Mobile Dots Menu */}
                                  <div style={{ position: "relative" }}>
                                    <button
                                      onClick={() =>
                                        setShowMobileDotsMenu(
                                          !showMobileDotsMenu,
                                        )
                                      }
                                      style={{
                                        display: "flex",
                                        minHeight: "36px",
                                        padding: "8px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background: showMobileDotsMenu
                                          ? "#FDFDFD"
                                          : "#FFF",
                                        boxShadow:
                                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        cursor: "pointer",
                                        transition:
                                          "background-color 0.2s ease",
                                      }}
                                    >
                                      <ActionDotsIcon />
                                    </button>

                                    {/* Mobile Dots Menu Dropdown */}
                                    {showMobileDotsMenu && (
                                      <div
                                        ref={mobileDotsMenuRef}
                                        style={{
                                          position: "absolute",
                                          top: "calc(100% + 4px)",
                                          right: "0",
                                          width: "200px",
                                          borderRadius: "8px",
                                          border:
                                            "1px solid rgba(10, 13, 18, 0.04)",
                                          background: "rgba(255, 255, 255, 1)",
                                          boxShadow:
                                            "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                          zIndex: 9999999,
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            padding: "4px 0",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            alignSelf: "stretch",
                                          }}
                                        >
                                          {/* Customize Option */}
                                          <div
                                            style={{
                                              display: "flex",
                                              padding: "1px 4px",
                                              alignItems: "center",
                                              alignSelf: "stretch",
                                              cursor: "pointer",
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.querySelector(
                                                ".content",
                                              ).style.backgroundColor =
                                                "#F5F5F5";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.querySelector(
                                                ".content",
                                              ).style.backgroundColor =
                                                "transparent";
                                            }}
                                            onClick={() => {
                                              console.log("Customize clicked");
                                              setShowMobileDotsMenu(false);
                                            }}
                                          >
                                            <div
                                              className="content"
                                              style={{
                                                display: "flex",
                                                padding: "8px 12px",
                                                alignItems: "center",
                                                gap: "12px",
                                                flex: "1 0 0",
                                                borderRadius: "6px",
                                                transition:
                                                  "background-color 0.2s ease",
                                              }}
                                            >
                                              <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M4.53333 2H4.13333C3.3866 2 3.01323 2 2.72801 2.14532C2.47713 2.27316 2.27316 2.47713 2.14532 2.72801C2 3.01323 2 3.3866 2 4.13333V11.8667C2 12.6134 2 12.9868 2.14532 13.272C2.27316 13.5229 2.47713 13.7268 2.72801 13.8547C3.01323 14 3.3866 14 4.13333 14H4.53333C5.28007 14 5.65344 14 5.93865 13.8547C6.18954 13.7268 6.39351 13.5229 6.52134 13.272C6.66667 12.9868 6.66667 12.6134 6.66667 11.8667V4.13333C6.66667 3.3866 6.66667 3.01323 6.52134 2.72801C6.39351 2.47713 6.18954 2.27316 5.93865 2.14532C5.65344 2 5.28007 2 4.53333 2Z"
                                                  stroke="#A4A7AE"
                                                  strokeWidth="1.66667"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M11.8667 2H11.4667C10.7199 2 10.3466 2 10.0613 2.14532C9.81046 2.27316 9.60649 2.47713 9.47866 2.72801C9.33333 3.01323 9.33333 3.3866 9.33333 4.13333V11.8667C9.33333 12.6134 9.33333 12.9868 9.47866 13.272C9.60649 13.5229 9.81046 13.7268 10.0613 13.8547C10.3466 14 10.7199 14 11.4667 14H11.8667C12.6134 14 12.9868 14 13.272 13.8547C13.5229 13.7268 13.7268 13.5229 13.8547 13.272C14 12.9868 14 12.6134 14 11.8667V4.13333C14 3.3866 14 3.01323 13.8547 2.72801C13.7268 2.47713 13.5229 2.27316 13.272 2.14532C12.9868 2 12.6134 2 11.8667 2Z"
                                                  stroke="#A4A7AE"
                                                  strokeWidth="1.66667"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                              <span
                                                style={{
                                                  fontFamily:
                                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                  fontWeight: 600,
                                                  fontSize: "14px",
                                                  color: "rgba(65,70,81,1)",
                                                }}
                                              >
                                                Customize
                                              </span>
                                            </div>
                                          </div>

                                          {/* Default Option */}
                                          <div
                                            style={{
                                              display: "flex",
                                              padding: "1px 4px",
                                              alignItems: "center",
                                              alignSelf: "stretch",
                                              cursor: "pointer",
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.querySelector(
                                                ".content",
                                              ).style.backgroundColor =
                                                "#F5F5F5";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.querySelector(
                                                ".content",
                                              ).style.backgroundColor =
                                                "transparent";
                                            }}
                                            onClick={() => {
                                              console.log("Default clicked");
                                              setShowMobileDotsMenu(false);
                                            }}
                                          >
                                            <div
                                              className="content"
                                              style={{
                                                display: "flex",
                                                padding: "8px 12px",
                                                alignItems: "center",
                                                gap: "12px",
                                                flex: "1 0 0",
                                                borderRadius: "6px",
                                                transition:
                                                  "background-color 0.2s ease",
                                              }}
                                            >
                                              <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M2 6L14 6M6 2L6 14M5.2 2H10.8C11.9201 2 12.4802 2 12.908 2.21799C13.2843 2.40973 13.5903 2.71569 13.782 3.09202C14 3.51984 14 4.0799 14 5.2V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2Z"
                                                  stroke="#A4A7AE"
                                                  strokeWidth="1.66667"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                              <span
                                                style={{
                                                  fontFamily:
                                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                  fontWeight: 600,
                                                  fontSize: "14px",
                                                  color: "rgba(65,70,81,1)",
                                                }}
                                              >
                                                Default
                                              </span>
                                            </div>
                                          </div>

                                          {/* Key Stats Option */}
                                          <div
                                            style={{
                                              display: "flex",
                                              padding: "1px 4px",
                                              alignItems: "center",
                                              alignSelf: "stretch",
                                              cursor: "pointer",
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.querySelector(
                                                ".content",
                                              ).style.backgroundColor =
                                                "#F5F5F5";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.querySelector(
                                                ".content",
                                              ).style.backgroundColor =
                                                "transparent";
                                            }}
                                            onClick={() => {
                                              console.log("Key Stats clicked");
                                              setShowInformationDrawer(true);
                                              setShowMobileDotsMenu(false);
                                            }}
                                          >
                                            <div
                                              className="content"
                                              style={{
                                                display: "flex",
                                                padding: "8px 12px",
                                                alignItems: "center",
                                                gap: "12px",
                                                flex: "1 0 0",
                                                borderRadius: "6px",
                                                transition:
                                                  "background-color 0.2s ease",
                                              }}
                                            >
                                              <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M8 9.33333V7M8 4.66667H8.00667M6.6 12.8L7.57333 14.0978C7.71808 14.2908 7.79045 14.3873 7.87918 14.4218C7.95689 14.452 8.04311 14.452 8.12082 14.4218C8.20955 14.3873 8.28192 14.2908 8.42667 14.0978L9.4 12.8C9.59543 12.5394 9.69315 12.4091 9.81234 12.3097C9.97126 12.177 10.1589 12.0832 10.3603 12.0357C10.5114 12 10.6743 12 11 12C11.9319 12 12.3978 12 12.7654 11.8478C13.2554 11.6448 13.6448 11.2554 13.8478 10.7654C14 10.3978 14 9.93188 14 9V5.2C14 4.07989 14 3.51984 13.782 3.09202C13.5903 2.71569 13.2843 2.40973 12.908 2.21799C12.4802 2 11.9201 2 10.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V9C2 9.93188 2 10.3978 2.15224 10.7654C2.35523 11.2554 2.74458 11.6448 3.23463 11.8478C3.60218 12 4.06812 12 5 12C5.32572 12 5.48858 12 5.63967 12.0357C5.84113 12.0832 6.02874 12.177 6.18766 12.3097C6.30685 12.4091 6.40457 12.5394 6.6 12.8Z"
                                                  stroke="#A4A7AE"
                                                  strokeWidth="1.66667"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                              <span
                                                style={{
                                                  fontFamily:
                                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                                  fontWeight: 600,
                                                  fontSize: "14px",
                                                  color: "rgba(83,88,98,1)",
                                                }}
                                              >
                                                Key Stats
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </>
                              ) : (
                                /* Tablet: Show all buttons as before */
                                <>
                                  {/* Filters Button */}
                                  <button
                                    onClick={() =>
                                      console.log("Filters clicked")
                                    }
                                    onMouseEnter={() =>
                                      setHoveredButton("filters")
                                    }
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
                                      background:
                                        hoveredButton === "filters" ||
                                        showFiltersModal
                                          ? "#F5F5F5"
                                          : "#FFF",
                                      flex: "1 0 0",
                                      minWidth: "90px",
                                      boxShadow:
                                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                      cursor: "pointer",
                                      transition: "background-color 0.2s ease",
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 17 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3.83333 14L3.83333 10M3.83333 10C4.56971 10 5.16667 9.40305 5.16667 8.66667C5.16667 7.93029 4.56971 7.33333 3.83333 7.33333C3.09695 7.33333 2.5 7.93029 2.5 8.66667C2.5 9.40305 3.09695 10 3.83333 10ZM3.83333 4.66667V2M8.5 14V10M8.5 4.66667V2M8.5 4.66667C7.76362 4.66667 7.16667 5.26362 7.16667 6C7.16667 6.73638 7.76362 7.33333 8.5 7.33333C9.23638 7.33333 9.83333 6.73638 9.83333 6C9.83333 5.26362 9.23638 4.66667 8.5 4.66667ZM13.1667 14V11.3333M13.1667 11.3333C13.903 11.3333 14.5 10.7364 14.5 10C14.5 9.26362 13.903 8.66667 13.1667 8.66667C12.4303 8.66667 11.8333 9.26362 11.8333 10C11.8333 10.7364 12.4303 11.3333 13.1667 11.3333ZM13.1667 6V2"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "0 2px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(65,70,81,1)",
                                          }}
                                        >
                                          Filters
                                        </span>
                                      </div>
                                    </div>
                                  </button>

                                  {/* Customize Button */}
                                  <button
                                    onClick={() =>
                                      setShowCustomizeColumnsModal(true)
                                    }
                                    onMouseEnter={() =>
                                      setHoveredButton("customize")
                                    }
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
                                      background:
                                        hoveredButton === "customize"
                                          ? "#FDFDFD"
                                          : "#FFF",
                                      flex: "1 0 0",
                                      minWidth: "120px",
                                      boxShadow:
                                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                      cursor: "pointer",
                                      transition: "background-color 0.2s ease",
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M4.53333 2H4.13333C3.3866 2 3.01323 2 2.72801 2.14532C2.47713 2.27316 2.27316 2.47713 2.14532 2.72801C2 3.01323 2 3.3866 2 4.13333V11.8667C2 12.6134 2 12.9868 2.14532 13.272C2.27316 13.5229 2.47713 13.7268 2.72801 13.8547C3.01323 14 3.3866 14 4.13333 14H4.53333C5.28007 14 5.65344 14 5.93865 13.8547C6.18954 13.7268 6.39351 13.5229 6.52134 13.272C6.66667 12.9868 6.66667 12.6134 6.66667 11.8667V4.13333C6.66667 3.3866 6.66667 3.01323 6.52134 2.72801C6.39351 2.47713 6.18954 2.27316 5.93865 2.14532C5.65344 2 5.28007 2 4.53333 2Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M11.8667 2H11.4667C10.7199 2 10.3466 2 10.0613 2.14532C9.81046 2.27316 9.60649 2.47713 9.47866 2.72801C9.33333 3.01323 9.33333 3.3866 9.33333 4.13333V11.8667C9.33333 12.6134 9.33333 12.9868 9.47866 13.272C9.60649 13.5229 9.81046 13.7268 10.0613 13.8547C10.3466 14 10.7199 14 11.4667 14H11.8667C12.6134 14 12.9868 14 13.272 13.8547C13.5229 13.7268 13.7268 13.5229 13.8547 13.272C14 12.9868 14 12.6134 14 11.8667V4.13333C14 3.3866 14 3.01323 13.8547 2.72801C13.7268 2.47713 13.5229 2.27316 13.272 2.14532C12.9868 2 12.6134 2 11.8667 2Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "0 2px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(65,70,81,1)",
                                          }}
                                        >
                                          Customize
                                        </span>
                                      </div>
                                    </div>
                                  </button>

                                  {/* Default Button */}
                                  <button
                                    onClick={() =>
                                      console.log("Default clicked")
                                    }
                                    onMouseEnter={() =>
                                      setHoveredButton("default")
                                    }
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
                                      background:
                                        hoveredButton === "default"
                                          ? "#FDFDFD"
                                          : "#FFF",
                                      flex: "1 0 0",
                                      minWidth: "100px",
                                      boxShadow:
                                        "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                      cursor: "pointer",
                                      transition: "background-color 0.2s ease",
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M2 6L14 6M6 2L6 14M5.2 2H10.8C11.9201 2 12.4802 2 12.908 2.21799C13.2843 2.40973 13.5903 2.71569 13.782 3.09202C14 3.51984 14 4.0799 14 5.2V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V5.2C2 4.07989 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "0 2px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#414651",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(65,70,81,1)",
                                          }}
                                        >
                                          Default
                                        </span>
                                      </div>
                                    </div>
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M4 6L8 10L12 6"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>

                                  {/* Download Button */}
                                  <div style={{ position: "relative" }}>
                                    <button
                                      onClick={() =>
                                        setShowDownloadDropdown(
                                          !showDownloadDropdown,
                                        )
                                      }
                                      onMouseEnter={() =>
                                        setHoveredButton("download")
                                      }
                                      onMouseLeave={() =>
                                        setHoveredButton(null)
                                      }
                                      style={{
                                        display: "flex",
                                        minHeight: "36px",
                                        padding: "6px 8px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "4px",
                                        borderRadius: "8px",
                                        border: "1px solid #D5D7DA",
                                        background:
                                          hoveredButton === "download" ||
                                          showDownloadDropdown
                                            ? "#FDFDFD"
                                            : "#FFF",
                                        flex: "1 0 0",
                                        minWidth: "120px",
                                        boxShadow:
                                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                        cursor: "pointer",
                                        transition:
                                          "background-color 0.2s ease",
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 6.66667L8 10M8 10L4.66667 6.66667M8 10V2"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.66667"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "0 2px",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#414651",
                                            fontFamily: "Public Sans",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            lineHeight: "20px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontFamily:
                                                "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                              fontWeight: 600,
                                              fontSize: "14px",
                                              color: "rgba(65,70,81,1)",
                                            }}
                                          >
                                            Download
                                          </span>
                                        </div>
                                      </div>
                                    </button>
                                    {showDownloadDropdown && (
                                      <DownloadDropdown
                                        downloadDropdownRef={
                                          downloadDropdownRef
                                        }
                                        onDownloadCSV={() => {
                                          console.log("Download CSV");
                                          setShowDownloadDropdown(false);
                                        }}
                                        onDownloadXLSX={() => {
                                          console.log("Download XLSX");
                                          setShowDownloadDropdown(false);
                                        }}
                                      />
                                    )}
                                  </div>

                                  {/* Key Stats Button */}
                                  <button
                                    onClick={() =>
                                      setShowInformationDrawer(true)
                                    }
                                    onMouseEnter={() =>
                                      setHoveredButton("information")
                                    }
                                    onMouseLeave={() => setHoveredButton(null)}
                                    style={{
                                      display: "flex",
                                      minHeight: "36px",
                                      padding: "6px 8px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "4px",
                                      borderRadius: "8px",
                                      background:
                                        hoveredButton === "information"
                                          ? "#F5F5F5"
                                          : "transparent",
                                      cursor: "pointer",
                                      flex: "0 0 auto",
                                      minWidth: "100px",
                                      transition: "background-color 0.2s ease",
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M8 9.33333V7M8 4.66667H8.00667M6.6 12.8L7.57333 14.0978C7.71808 14.2908 7.79045 14.3873 7.87918 14.4218C7.95689 14.452 8.04311 14.452 8.12082 14.4218C8.20955 14.3873 8.28192 14.2908 8.42667 14.0978L9.4 12.8C9.59543 12.5394 9.69315 12.4091 9.81234 12.3097C9.97126 12.177 10.1589 12.0832 10.3603 12.0357C10.5114 12 10.6743 12 11 12C11.9319 12 12.3978 12 12.7654 11.8478C13.2554 11.6448 13.6448 11.2554 13.8478 10.7654C14 10.3978 14 9.93188 14 9V5.2C14 4.07989 14 3.51984 13.782 3.09202C13.5903 2.71569 13.2843 2.40973 12.908 2.21799C12.4802 2 11.9201 2 10.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V9C2 9.93188 2 10.3978 2.15224 10.7654C2.35523 11.2554 2.74458 11.6448 3.23463 11.8478C3.60218 12 4.06812 12 5 12C5.32572 12 5.48858 12 5.63967 12.0357C5.84113 12.0832 6.02874 12.177 6.18766 12.3097C6.30685 12.4091 6.40457 12.5394 6.6 12.8Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "0 2px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#535862",
                                          fontFamily: "Public Sans",
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          lineHeight: "20px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontFamily:
                                              "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            color: "rgba(83,88,98,1)",
                                          }}
                                        >
                                          Key Stats
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Internal Divider */}
                    <div
                      style={{
                        height: "1px",
                        alignSelf: "stretch",
                        background: "#E9EAEB",
                        margin: "12px 0 0 0",
                      }}
                    />

                    {/* Status Filter Tabs - Only for invites tab */}
                    {activeTab === "invites" && (
                      <div
                        style={{
                          display: "flex",
                          padding: "8px 16px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          borderRadius: "0px",
                          borderRight: "1px solid #E9EAEB",
                          borderBottom: "1px solid #E9EAEB",
                          borderLeft: "1px solid #E9EAEB",
                          background: "#FFF",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          {inviteStatusTabs.map((tab) => (
                            <div
                              key={tab.key}
                              onClick={() =>
                                setActiveInviteStatusFilter(tab.key)
                              }
                              style={{
                                display: "flex",
                                padding: "4px 8px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "8px",
                                borderRadius: "6px",
                                border:
                                  activeInviteStatusFilter === tab.key
                                    ? "1px solid #B3BCE5"
                                    : "none",
                                background:
                                  activeInviteStatusFilter === tab.key
                                    ? "#ECEEF9"
                                    : "transparent",
                                boxShadow:
                                  activeInviteStatusFilter === tab.key
                                    ? "0 1px 3px 0 rgba(10, 13, 18, 0.10), 0 1px 2px -1px rgba(10, 13, 18, 0.10)"
                                    : "none",
                                cursor: "pointer",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color:
                                    activeInviteStatusFilter === tab.key
                                      ? "#273572"
                                      : "#717680",
                                  fontFamily: "Public Sans",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                  position: "relative",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                    fontWeight: 700,
                                    fontSize: "12px",
                                    color:
                                      activeInviteStatusFilter === tab.key
                                        ? "rgba(39,53,114,1)"
                                        : "rgba(113,118,128,1)",
                                  }}
                                >
                                  {tab.label}
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "2px 8px",
                                  alignItems: "center",
                                  borderRadius: "9999px",
                                  border:
                                    activeInviteStatusFilter === tab.key
                                      ? "1px solid #B3BCE5"
                                      : "1px solid #E9EAEB",
                                  background:
                                    activeInviteStatusFilter === tab.key
                                      ? "#ECEEF9"
                                      : "#FAFAFA",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color:
                                      activeInviteStatusFilter === tab.key
                                        ? "#273572"
                                        : "#414651",
                                    textAlign: "center",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "18px",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 400,
                                      fontSize: "12px",
                                      color:
                                        activeInviteStatusFilter === tab.key
                                          ? "rgba(39,53,114,1)"
                                          : "rgba(65,70,81,1)",
                                    }}
                                  >
                                    {tab.count}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Status Filter Tabs - Only for orders tab */}
                    {activeTab === "orders" && (
                      <div
                        style={{
                          display: "flex",
                          padding: "8px 16px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          borderRadius: "0px",
                          borderRight: "1px solid #E9EAEB",
                          borderBottom: "1px solid #E9EAEB",
                          borderLeft: "1px solid #E9EAEB",
                          background: "#FFF",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            alignSelf: "stretch",
                            position: "relative",
                          }}
                        >
                          {ordersStatusTabs.map((tab) => {
                            const isActive =
                              (selectedStatusFilters.length === 0 &&
                                tab.key === "all") ||
                              (selectedStatusFilters.length === 1 &&
                                selectedStatusFilters[0] === tab.key);
                            return (
                              <div
                                key={tab.key}
                                onClick={() =>
                                  tab.key === "all"
                                    ? setSelectedStatusFilters([])
                                    : setSelectedStatusFilters([tab.key])
                                }
                                style={{
                                  display: "flex",
                                  padding: "4px 8px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "8px",
                                  borderRadius: "6px",
                                  border: isActive
                                    ? "1px solid #B3BCE5"
                                    : "none",
                                  background: isActive
                                    ? "#ECEEF9"
                                    : "transparent",
                                  boxShadow: isActive
                                    ? "0 1px 3px 0 rgba(10, 13, 18, 0.10), 0 1px 2px -1px rgba(10, 13, 18, 0.10)"
                                    : "none",
                                  cursor: "pointer",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: isActive ? "#273572" : "#717680",
                                    fontFamily: "Public Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "18px",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight: 700,
                                      fontSize: "12px",
                                      color: isActive
                                        ? "rgba(39,53,114,1)"
                                        : "rgba(113,118,128,1)",
                                    }}
                                  >
                                    {tab.label}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "2px 8px",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    border: isActive
                                      ? "1px solid #B3BCE5"
                                      : "1px solid #E9EAEB",
                                    background: isActive
                                      ? "#ECEEF9"
                                      : "#FAFAFA",
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: isActive ? "#273572" : "#414651",
                                      textAlign: "center",
                                      fontFamily: "Public Sans",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "18px",
                                      position: "relative",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "12px",
                                        color: isActive
                                          ? "rgba(39,53,114,1)"
                                          : "rgba(65,70,81,1)",
                                      }}
                                    >
                                      {tab.count}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Table Content */}
                    <div
                      style={{
                        display: "flex",
                        padding: "0",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                        background: "#FFF",
                        boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        position: "relative",
                        borderRadius: "0px 0px 12px 12px",
                        overflow: "hidden",
                      }}
                    >
                      {tableView === "table" ? (
                        /* Table Container with Horizontal Scroll */
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            position: "relative",
                            width: "100%",
                            maxWidth:
                              showFiltersModal && isDesktop
                                ? `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"} - 258px - 80px)` // Subtracting sidebar, filters panel, margins, and padding
                                : "100%",
                            overflowX: "auto",
                            overflowY: "hidden",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#D5D7DA #F9FAFB",
                            WebkitOverflowScrolling: "touch",
                            padding:
                              isMobile || isTablet
                                ? "12px 0 0 16px"
                                : "12px 16px 0 16px",
                          }}
                        >
                          {/* Table Content */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              position: "relative",
                              minWidth:
                                activeTab === "orders"
                                  ? showFiltersModal
                                    ? isMobile
                                      ? "1400px" // Orders need more width due to more columns
                                      : isTablet
                                        ? "1450px"
                                        : isLargeDesktop
                                          ? "1500px"
                                          : "1400px"
                                    : isMobile
                                      ? "1600px" // Full width for orders table
                                      : isTablet
                                        ? "1650px"
                                        : isLargeDesktop
                                          ? "1700px"
                                          : "1600px"
                                  : showFiltersModal
                                    ? isMobile
                                      ? "800px" // Original invites table width with filters
                                      : isTablet
                                        ? "830px"
                                        : isLargeDesktop
                                          ? "900px"
                                          : "800px"
                                    : isMobile
                                      ? "1140px" // Original invites table width
                                      : isTablet
                                        ? "1130px"
                                        : isLargeDesktop
                                          ? "1220px"
                                          : "1100px",
                              width: "100%",
                              height: "556px", // Fixed height for header (36px) + 10 rows (10 × 52px)
                              overflow: "visible",
                            }}
                          >
                            {/* Table Header */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                alignSelf: "stretch",
                                position: "relative",
                              }}
                            >
                              {/* Checkbox Column */}
                              <div
                                style={{
                                  display: "flex",
                                  width: "40px",
                                  height: "36px",
                                  padding: "6px 12px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "12px",
                                  borderBottom: "1px solid #E9EAEB",
                                  background: "#FFF",
                                  position: "relative",
                                }}
                              >
                                <Checkbox
                                  checked={
                                    selectedItems.length === currentData.length
                                  }
                                  onCheckedChange={handleSelectAll}
                                  className="h-4 w-4 rounded border border-[#D5D7DA] data-[state=checked]:bg-[#344698] data-[state=checked]:border-[#344698] data-[state=checked]:text-white"
                                />
                              </div>

                              {/* Dynamic Columns */}
                              {visibleColumns.map((column) => (
                                <TableHeaderColumn
                                  key={column.id}
                                  columnId={column.id}
                                />
                              ))}

                              {/* Actions Column */}
                              <div
                                style={{
                                  display: "flex",
                                  width: "88px",
                                  minWidth: "88px",
                                  maxWidth: "88px",
                                  height: "36px",
                                  padding: "6px 12px",
                                  alignItems: "center",
                                  gap: "12px",
                                  borderBottom: "1px solid #E9EAEB",
                                  background: "#FFF",
                                  position:
                                    isMobile || isTablet
                                      ? "sticky"
                                      : "relative",
                                  right: isMobile || isTablet ? "0" : "auto",
                                  zIndex: isMobile || isTablet ? 5 : "auto",
                                  boxShadow:
                                    isMobile || isTablet
                                      ? "-4px 0 8px rgba(0, 0, 0, 0.1)"
                                      : "none",
                                  borderLeft:
                                    isMobile || isTablet
                                      ? "1px solid #E9EAEB"
                                      : "none",
                                  boxSizing: "border-box",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#717680",
                                      fontFamily: "Public Sans",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "18px",
                                      position: "relative",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily:
                                          "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                        fontWeight: 700,
                                        fontSize: "12px",
                                        color: "rgba(113,118,128,1)",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      Actions
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Table Rows */}
                            {paginatedData.map((invite, index) => {
                              const isFirstRow = index === 0;
                              const isSecondRow = index === 1;
                              const isDisabled = !isFirstRow && !isSecondRow;
                              const handleRowClick = () => {
                                if (isFirstRow) {
                                  navigate("/order-details/123456");
                                } else if (isSecondRow) {
                                  navigate("/order-details/999");
                                }
                              };
                              return (
                                <div
                                  key={invite.id}
                                  onMouseEnter={() =>
                                    setHoveredRowId(invite.id)
                                  }
                                  onMouseLeave={() => setHoveredRowId(null)}
                                  onClick={handleRowClick}
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    alignSelf: "stretch",
                                    position: "relative",
                                    background: selectedItems.includes(
                                      invite.id,
                                    )
                                      ? "#F5F5F5"
                                      : hoveredRowId === invite.id
                                        ? "#F5F5F5"
                                        : "transparent",
                                    transition: "background-color 0.15s ease",
                                    cursor: isDisabled
                                      ? "not-allowed"
                                      : "pointer",
                                    pointerEvents: "auto",
                                    opacity: isDisabled ? 0.5 : 1,
                                    zIndex: 10,
                                    isolation: "isolate",
                                  }}
                                >
                                  {/* Checkbox Cell */}
                                  <div
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                      display: "flex",
                                      width: "40px",
                                      height: "52px",
                                      padding: "12px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "12px",
                                      borderBottom: "1px solid #E9EAEB",
                                      position: "relative",
                                      pointerEvents: "auto", // Ensure events bubble up
                                    }}
                                  >
                                    <Checkbox
                                      checked={selectedItems.includes(
                                        invite.id,
                                      )}
                                      onCheckedChange={handleSelectItem(
                                        invite.id,
                                      )}
                                      className="h-4 w-4 rounded border border-[#D5D7DA] data-[state=checked]:bg-[#344698] data-[state=checked]:border-[#344698] data-[state=checked]:text-white"
                                    />
                                  </div>

                                  {/* Dynamic Cells */}
                                  {visibleColumns.map((column) => (
                                    <TableCell
                                      key={column.id}
                                      columnId={column.id}
                                      invite={invite}
                                      rowIndex={index}
                                    />
                                  ))}

                                  {/* Actions Cell */}
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "88px",
                                      height: "52px",
                                      padding: "12px",
                                      alignItems: "center",
                                      gap: "12px",
                                      borderBottom: "1px solid #E9EAEB",
                                      position:
                                        isMobile || isTablet
                                          ? "sticky"
                                          : "relative",
                                      right:
                                        isMobile || isTablet ? "0" : "auto",
                                      zIndex: isMobile || isTablet ? 5 : "auto",
                                      background: selectedItems.includes(
                                        invite.id,
                                      )
                                        ? "#F5F5F5"
                                        : hoveredRowId === invite.id
                                          ? "#F5F5F5"
                                          : "#FFF",
                                      boxShadow:
                                        isMobile || isTablet
                                          ? "-4px 0 8px rgba(0, 0, 0, 0.1)"
                                          : "none",
                                      borderLeft:
                                        isMobile || isTablet
                                          ? "1px solid #E9EAEB"
                                          : "none",
                                    }}
                                  >
                                    <div
                                      style={{
                                        position: "relative",
                                      }}
                                    >
                                      <div
                                        style={{
                                          cursor: "pointer",
                                          padding: "4px",
                                          borderRadius: "4px",
                                          transition:
                                            "background-color 0.2s ease",
                                          background:
                                            showActionMenu === invite.id
                                              ? "#FDFDFD"
                                              : "transparent",
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setShowActionMenu(
                                            showActionMenu === invite.id
                                              ? null
                                              : invite.id,
                                          );
                                        }}
                                      >
                                        <ActionDotsIcon />
                                      </div>

                                      {/* Action Menu Dropdown */}
                                      {showActionMenu === invite.id && (
                                        <div
                                          ref={actionMenuRef}
                                          style={{
                                            position: "absolute",
                                            top: "100%",
                                            right:
                                              isMobile || isTablet
                                                ? "24px"
                                                : "0",
                                            marginTop: "4px",
                                            width: isMobile ? "200px" : "248px",
                                            borderRadius: "8px",
                                            border:
                                              "1px solid rgba(10, 13, 18, 0.04)",
                                            background:
                                              "rgba(255, 255, 255, 1)",
                                            boxShadow:
                                              "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                                            zIndex: 9999999,
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              padding: "4px 0",
                                              flexDirection: "column",
                                              alignItems: "flex-start",
                                              alignSelf: "stretch",
                                            }}
                                          >
                                            {/* Order Summary */}
                                            <div
                                              style={{
                                                display: "flex",
                                                padding: "1px 4px",
                                                alignItems: "center",
                                                alignSelf: "stretch",
                                                cursor: "pointer",
                                              }}
                                              onMouseEnter={(e) => {
                                                const content =
                                                  e.currentTarget.querySelector(
                                                    ".content",
                                                  ) as HTMLElement;
                                                if (content)
                                                  content.style.backgroundColor =
                                                    "#F5F5F5";
                                              }}
                                              onMouseLeave={(e) => {
                                                const content =
                                                  e.currentTarget.querySelector(
                                                    ".content",
                                                  ) as HTMLElement;
                                                if (content)
                                                  content.style.backgroundColor =
                                                    "transparent";
                                              }}
                                              onClick={() => {
                                                if (activeTab === "orders") {
                                                  setSelectedOrderData(
                                                    invite as OrderData,
                                                  );
                                                  setShowOrderSummaryModal(
                                                    true,
                                                  );
                                                } else {
                                                  setSelectedInviteData(
                                                    invite as InviteData,
                                                  );
                                                  setShowInviteSummaryModal(
                                                    true,
                                                  );
                                                }
                                                setShowActionMenu(null);
                                              }}
                                            >
                                              <div
                                                className="content"
                                                style={{
                                                  display: "flex",
                                                  padding: "6px 6px",
                                                  alignItems: "center",
                                                  gap: "12px",
                                                  flex: "1 0 0",
                                                  borderRadius: "6px",
                                                  transition:
                                                    "background-color 0.2s ease",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                    flex: "1 0 0",
                                                  }}
                                                >
                                                  <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M14 11H8M10 15H8M16 7H8M20 10.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H11.5M22 22L20.5 20.5M21.5 18C21.5 19.933 19.933 21.5 18 21.5C16.067 21.5 14.5 19.933 14.5 18C14.5 16.067 16.067 14.5 18 14.5C19.933 14.5 21.5 16.067 21.5 18Z"
                                                      stroke="#A4A7AE"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                  <div
                                                    style={{
                                                      flex: "1 0 0",
                                                      color: "#414651",
                                                      fontFamily: "Public Sans",
                                                      fontSize: "14px",
                                                      fontWeight: 600,
                                                      lineHeight: "20px",
                                                    }}
                                                  >
                                                    {activeTab === "orders"
                                                      ? "Order Summary"
                                                      : "Invite Summary"}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            {/* Manage Invitation - Only for Invites */}
                                            {activeTab === "invites" && (
                                              <div
                                                style={{
                                                  display: "flex",
                                                  padding: "1px 4px",
                                                  alignItems: "center",
                                                  alignSelf: "stretch",
                                                  cursor: "pointer",
                                                }}
                                                onMouseEnter={(e) => {
                                                  const content =
                                                    e.currentTarget.querySelector(
                                                      ".content",
                                                    ) as HTMLElement;
                                                  if (content)
                                                    content.style.backgroundColor =
                                                      "#F5F5F5";
                                                }}
                                                onMouseLeave={(e) => {
                                                  const content =
                                                    e.currentTarget.querySelector(
                                                      ".content",
                                                    ) as HTMLElement;
                                                  if (content)
                                                    content.style.backgroundColor =
                                                      "transparent";
                                                }}
                                                onClick={() => {
                                                  setSelectedInviteData(
                                                    invite as InviteData,
                                                  );
                                                  setShowManageInvitationModal(
                                                    true,
                                                  );
                                                  setShowActionMenu(null);
                                                }}
                                              >
                                                <div
                                                  className="content"
                                                  style={{
                                                    display: "flex",
                                                    padding: "6px 6px",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                    flex: "1 0 0",
                                                    borderRadius: "6px",
                                                    transition:
                                                      "background-color 0.2s ease",
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      gap: "8px",
                                                      flex: "1 0 0",
                                                    }}
                                                  >
                                                    <svg
                                                      width="24"
                                                      height="24"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <path
                                                        d="M2.87604 18.1159C2.92198 17.7024 2.94496 17.4957 3.00751 17.3025C3.06301 17.131 3.14143 16.9679 3.24064 16.8174C3.35246 16.6478 3.49955 16.5008 3.79373 16.2066L17 3.0003C18.1046 1.89573 19.8955 1.89573 21 3.0003C22.1046 4.10487 22.1046 5.89573 21 7.0003L7.79373 20.2066C7.49955 20.5008 7.35245 20.6479 7.18289 20.7597C7.03245 20.8589 6.86929 20.9373 6.69785 20.9928C6.5046 21.0553 6.29786 21.0783 5.88437 21.1243L2.5 21.5003L2.87604 18.1159Z"
                                                        stroke="#A4A7AE"
                                                        strokeWidth="1.66667"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                      />
                                                    </svg>
                                                    <div
                                                      style={{
                                                        flex: "1 0 0",
                                                        color: "#414651",
                                                        fontFamily:
                                                          "Public Sans",
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                        lineHeight: "20px",
                                                      }}
                                                    >
                                                      Manage Invitation
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            )}

                                            {/* HTML */}
                                            <div
                                              style={{
                                                display: "flex",
                                                padding: "1px 4px",
                                                alignItems: "center",
                                                alignSelf: "stretch",
                                                cursor: "pointer",
                                              }}
                                              onMouseEnter={(e) => {
                                                const content =
                                                  e.currentTarget.querySelector(
                                                    ".content",
                                                  ) as HTMLElement;
                                                if (content)
                                                  content.style.backgroundColor =
                                                    "#F5F5F5";
                                              }}
                                              onMouseLeave={(e) => {
                                                const content =
                                                  e.currentTarget.querySelector(
                                                    ".content",
                                                  ) as HTMLElement;
                                                if (content)
                                                  content.style.backgroundColor =
                                                    "transparent";
                                              }}
                                              onClick={() => {
                                                console.log(
                                                  "HTML clicked for:",
                                                  invite.id,
                                                );
                                                setShowActionMenu(null);
                                              }}
                                            >
                                              <div
                                                className="content"
                                                style={{
                                                  display: "flex",
                                                  padding: "6px 6px",
                                                  alignItems: "center",
                                                  gap: "12px",
                                                  flex: "1 0 0",
                                                  borderRadius: "6px",
                                                  transition:
                                                    "background-color 0.2s ease",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                    flex: "1 0 0",
                                                  }}
                                                >
                                                  <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M14 17.5L16.5 15L14 12.5M10 12.5L7.5 15L10 17.5M20 9.98822V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H12.0118C12.7455 2 13.1124 2 13.4577 2.08289C13.7638 2.15638 14.0564 2.27759 14.3249 2.44208C14.6276 2.6276 14.887 2.88703 15.4059 3.40589L18.5941 6.59411C19.113 7.11297 19.3724 7.3724 19.5579 7.67515C19.7224 7.94356 19.8436 8.2362 19.9171 8.5423C20 8.88757 20 9.25445 20 9.98822Z"
                                                      stroke="#A4A7AE"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                  <div
                                                    style={{
                                                      flex: "1 0 0",
                                                      color: "#414651",
                                                      fontFamily: "Public Sans",
                                                      fontSize: "14px",
                                                      fontWeight: 600,
                                                      lineHeight: "20px",
                                                    }}
                                                  >
                                                    HTML
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            {/* PDF */}
                                            <div
                                              style={{
                                                display: "flex",
                                                padding: "1px 4px",
                                                alignItems: "center",
                                                alignSelf: "stretch",
                                                cursor: "pointer",
                                              }}
                                              onMouseEnter={(e) => {
                                                const content =
                                                  e.currentTarget.querySelector(
                                                    ".content",
                                                  ) as HTMLElement;
                                                if (content)
                                                  content.style.backgroundColor =
                                                    "#F5F5F5";
                                              }}
                                              onMouseLeave={(e) => {
                                                const content =
                                                  e.currentTarget.querySelector(
                                                    ".content",
                                                  ) as HTMLElement;
                                                if (content)
                                                  content.style.backgroundColor =
                                                    "transparent";
                                              }}
                                              onClick={() => {
                                                console.log(
                                                  "PDF clicked for:",
                                                  invite.id,
                                                );
                                                setShowActionMenu(null);
                                              }}
                                            >
                                              <div
                                                className="content"
                                                style={{
                                                  display: "flex",
                                                  padding: "6px 6px",
                                                  alignItems: "center",
                                                  gap: "12px",
                                                  flex: "1 0 0",
                                                  borderRadius: "6px",
                                                  transition:
                                                    "background-color 0.2s ease",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                    flex: "1 0 0",
                                                  }}
                                                >
                                                  <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M9 15L12 18M12 18L15 15M12 18L12 12M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z"
                                                      stroke="#A4A7AE"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                  <div
                                                    style={{
                                                      flex: "1 0 0",
                                                      color: "#414651",
                                                      fontFamily: "Public Sans",
                                                      fontSize: "14px",
                                                      fontWeight: 600,
                                                      lineHeight: "20px",
                                                    }}
                                                  >
                                                    PDF
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        /* Cards Container */
                        <div
                          style={{
                            display: "flex",
                            padding: isMobile
                              ? "12px 8px 16px 8px"
                              : "12px 16px 16px 16px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            flex: "1 0 auto",
                            alignSelf: "stretch",
                            position: "relative",
                            gap: "12px",
                            overflow: "visible",
                            width: "100%",
                            minHeight: "200px",
                            boxSizing: "border-box",
                          }}
                        >
                          {paginatedData.map((invite) => (
                            <InviteCard
                              key={invite.id}
                              invite={invite}
                              isExpanded={expandedCardId === invite.id}
                              onToggleExpand={() =>
                                setExpandedCardId(
                                  expandedCardId === invite.id
                                    ? null
                                    : invite.id,
                                )
                              }
                              onToggleSelect={handleSelectItem(invite.id)}
                              isSelected={selectedItems.includes(invite.id)}
                            />
                          ))}
                        </div>
                      )}

                      {/* Pagination - moved outside scroll container */}
                      <div
                        style={{
                          display: "flex",
                          padding: isMobile ? "16px" : "12px 16px",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignSelf: "stretch",
                          borderTop: "1px solid #E9EAEB",
                          borderBottom: "1px solid #E9EAEB",
                          borderLeft: "1px solid #E9EAEB",
                          borderRight: "1px solid #E9EAEB",
                          position: "relative",
                          background: "#FFF",
                          minHeight: isMobile ? "64px" : "48px",
                          borderRadius: "0px 0px 12px 12px",
                          flexWrap: isMobile ? "wrap" : "nowrap",
                          gap: isMobile ? "12px" : "0",
                        }}
                      >
                        {/* Left Side - Showing text */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              color: "#414651",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "20px",
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                fontWeight: 400,
                                fontSize: "14px",
                                color: "rgba(65,70,81,1)",
                              }}
                            >
                              Showing {(currentPage - 1) * pageSize + 1} to{" "}
                              {Math.min(
                                currentPage * pageSize,
                                sortedData.length,
                              )}{" "}
                              of {sortedData.length}
                            </span>
                          </div>
                        </div>

                        {/* Center - Pagination Controls */}
                        {!isMobile && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              position: "relative",
                            }}
                          >
                            {/* Previous Button */}
                            <button
                              onClick={() =>
                                setCurrentPage(Math.max(1, currentPage - 1))
                              }
                              disabled={currentPage === 1}
                              onMouseEnter={() =>
                                setHoveredPaginationButton("prev")
                              }
                              onMouseLeave={() =>
                                setHoveredPaginationButton(null)
                              }
                              style={{
                                display: "flex",
                                padding: "8px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor:
                                  currentPage === 1 ? "default" : "pointer",
                                opacity: currentPage === 1 ? 0.5 : 1,
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19.5 12H5.5M5.5 12L12.5 19M5.5 12L12.5 5"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>

                            {/* Page Numbers */}
                            {getPageNumbers().map((page, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  typeof page === "number" &&
                                  setCurrentPage(page)
                                }
                                disabled={page === "..."}
                                style={{
                                  display: "flex",
                                  width: "32px",
                                  height: "32px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "8px",
                                  border:
                                    page === currentPage
                                      ? "1px solid #E9EAEB"
                                      : "1px solid #E9EAEB",
                                  background:
                                    page === currentPage ? "#F5F5F5" : "#FFF",
                                  cursor:
                                    page !== "..." ? "pointer" : "default",
                                  position: "relative",
                                  transition: "all 0.2s ease",
                                  boxShadow:
                                    page === currentPage
                                      ? "0 1px 2px 0 rgba(10, 13, 18, 0.05)"
                                      : "none",
                                  outline: "none",
                                }}
                                onMouseEnter={(e) => {
                                  if (page !== "..." && page !== currentPage) {
                                    e.currentTarget.style.background =
                                      "#F5F5F5";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (page !== "..." && page !== currentPage) {
                                    e.currentTarget.style.background = "#FFF";
                                  }
                                }}
                              >
                                <div
                                  style={{
                                    color:
                                      page === currentPage
                                        ? "#414651"
                                        : "#717680",
                                    textAlign: "center",
                                    fontFamily: "Public Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight:
                                      page === currentPage ? 500 : 500,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily:
                                        "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                      fontWeight:
                                        page === currentPage ? 500 : 500,
                                      fontSize: "14px",
                                      color:
                                        page === currentPage
                                          ? "rgba(65,70,81,1)"
                                          : "rgba(113,118,128,1)",
                                    }}
                                  >
                                    {page}
                                  </span>
                                </div>
                              </button>
                            ))}

                            {/* Next Button */}
                            <button
                              onClick={() =>
                                setCurrentPage(
                                  Math.min(totalPages, currentPage + 1),
                                )
                              }
                              disabled={currentPage === totalPages}
                              onMouseEnter={() =>
                                setHoveredPaginationButton("next")
                              }
                              onMouseLeave={() =>
                                setHoveredPaginationButton(null)
                              }
                              style={{
                                display: "flex",
                                padding: "8px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor:
                                  currentPage === totalPages
                                    ? "default"
                                    : "pointer",
                                opacity: currentPage === totalPages ? 0.5 : 1,
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5.5 12H19.5M19.5 12L12.5 5M19.5 12L12.5 19"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        )}

                        {/* Mobile pagination - simple version */}
                        {isMobile && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              position: "relative",
                            }}
                          >
                            <button
                              onClick={() =>
                                setCurrentPage(Math.max(1, currentPage - 1))
                              }
                              disabled={currentPage === 1}
                              style={{
                                display: "flex",
                                padding: "12px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor:
                                  currentPage === 1 ? "default" : "pointer",
                                opacity: currentPage === 1 ? 0.5 : 1,
                              }}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19 12H5M5 12L12 19M5 12L12 5"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>

                            <span
                              style={{
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                color: "#414651",
                              }}
                            >
                              {currentPage} of {totalPages}
                            </span>

                            <button
                              onClick={() =>
                                setCurrentPage(
                                  Math.min(totalPages, currentPage + 1),
                                )
                              }
                              disabled={currentPage === totalPages}
                              style={{
                                display: "flex",
                                padding: "12px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor:
                                  currentPage === totalPages
                                    ? "default"
                                    : "pointer",
                                opacity: currentPage === totalPages ? 0.5 : 1,
                              }}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 12H19M19 12L12 5M19 12L12 19"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        )}

                        {/* Right Side - Go to input */}
                        {!isMobile && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                              gap: "12px",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                color: "#414651",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "20px",
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily:
                                    "Public Sans, -apple-system, Roboto, Helvetica, sans-serif",
                                  fontWeight: 400,
                                  fontSize: "14px",
                                  color: "rgba(65,70,81,1)",
                                }}
                              >
                                Go to
                              </span>
                            </div>
                            <input
                              type="text"
                              placeholder="1010"
                              value={goToInputValue}
                              onChange={(e) => {
                                // Only allow numbers
                                const value = e.target.value.replace(
                                  /[^0-9]/g,
                                  "",
                                );
                                setGoToInputValue(value);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  const page = parseInt(goToInputValue);
                                  if (page >= 1 && page <= totalPages) {
                                    setCurrentPage(page);
                                    setGoToInputValue("");
                                  }
                                }
                              }}
                              onBlur={() => {
                                const page = parseInt(goToInputValue);
                                if (page >= 1 && page <= totalPages) {
                                  setCurrentPage(page);
                                }
                                setGoToInputValue("");
                              }}
                              style={{
                                display: "flex",
                                width: "72px",
                                height: "32px",
                                padding: "6px 8px",
                                alignItems: "center",
                                gap: "8px",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                color: "#717680",
                                textAlign: "center",
                                fontFamily: "Public Sans",
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "20px",
                                outline: "none",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Spacer */}
          <div
            style={{
              height: isMobile ? "64px" : isTablet ? "72px" : "80px",
              width: "100%",
              flexShrink: 0,
            }}
          />
        </main>
      </div>

      {/* Information Drawer */}
      <InformationDrawer
        isOpen={showInformationDrawer}
        onClose={() => setShowInformationDrawer(false)}
      />

      {/* Filters Panel will be inline in the layout */}

      {/* Mobile Filters Modal - Only for invites tab */}
      {activeTab === "invites" && (
        <MobileFiltersModal
          isOpen={showMobileFiltersModal}
          onClose={() => setShowMobileFiltersModal(false)}
          filters={appliedFilters}
          onFiltersChange={setAppliedFilters}
        />
      )}

      {/* Customize Columns Modal */}
      <CustomizeColumnsModal
        isOpen={showCustomizeColumnsModal}
        onClose={() => setShowCustomizeColumnsModal(false)}
        columnOrder={columnOrder}
        onColumnOrderChange={setColumnOrder}
        onResetToDefault={() => setColumnOrder(defaultColumnOrder)}
      />

      {/* Order Summary Modal */}
      <OrderSummaryModal
        isOpen={showOrderSummaryModal}
        onClose={() => setShowOrderSummaryModal(false)}
        orderData={
          selectedOrderData
            ? {
                orderNumber: selectedOrderData.id,
                date: selectedOrderData.lastUpdate.split(" ")[0] || "00/00/00",
                time: "11:41 AM Central",
                package: "I-9",
                timeFirstCompleted: "00/00/00",
                userName: `${selectedOrderData.firstName}, ${selectedOrderData.lastName}`,
                components: {
                  i9Form: {
                    lastUpdate: "00/00/00",
                    status: "Waiting",
                    statusId: "2839/4949",
                  },
                  eVerify: {
                    lastUpdate: "00/00/00",
                    status: "Waiting",
                    statusId: "2839/4949",
                  },
                },
              }
            : undefined
        }
      />

      {/* Invite Summary Modal */}
      <InviteSummaryModal
        isOpen={showInviteSummaryModal}
        onClose={() => setShowInviteSummaryModal(false)}
        inviteData={selectedInviteData}
      />

      {/* Manage Invitation Modal */}
      <ManageInvitationModal
        isOpen={showManageInvitationModal}
        onClose={() => setShowManageInvitationModal(false)}
        inviteData={selectedInviteData}
      />

      {/* Orders Filters Dropdown */}
      <OrdersFiltersDropdown
        isOpen={showOrdersFiltersDropdown}
        onClose={() => setShowOrdersFiltersDropdown(false)}
        triggerRef={filtersButtonRef}
      />

      {/* Status Filters Dropdown for Orders */}
      <StatusFiltersDropdown
        isOpen={showStatusFiltersDropdown}
        onClose={() => setShowStatusFiltersDropdown(false)}
        triggerRef={statusFilterButtonRef}
        selectedStatuses={selectedStatusFilters}
        onStatusChange={setSelectedStatusFilters}
      />

      {/* Filters Selected Dropdown for Orders */}
      <FiltersSelectedDropdown
        isOpen={showFiltersSelectedDropdown}
        onClose={() => setShowFiltersSelectedDropdown(false)}
        triggerRef={filtersButtonRef}
        selectedStatusFilters={selectedStatusFilters}
        selectedEwsFilters={selectedEwsFilters}
        selectedDispositionFilters={selectedDispositionFilters}
        selectedFlagsFilters={selectedFlagsFilters}
        onStatusFilterRemove={handleRemoveStatusFilter}
        onEwsFilterRemove={handleRemoveEwsFilter}
        onDispositionFilterRemove={handleRemoveDispositionFilter}
        onFlagsFilterRemove={handleRemoveFlagsFilter}
        onClearAllFilters={handleClearAllOrdersFilters}
      />

      {/* EWS Filters Dropdown for Orders */}
      <EwsFiltersDropdown
        isOpen={showEwsFiltersDropdown}
        onClose={() => setShowEwsFiltersDropdown(false)}
        triggerRef={ewsFilterButtonRef}
        selectedOptions={selectedEwsFilters}
        onOptionsChange={setSelectedEwsFilters}
      />

      {/* Disposition Filters Dropdown for Orders */}
      <DispositionFiltersDropdown
        isOpen={showDispositionFiltersDropdown}
        onClose={() => setShowDispositionFiltersDropdown(false)}
        triggerRef={dispositionFilterButtonRef}
        selectedOptions={selectedDispositionFilters}
        onOptionsChange={setSelectedDispositionFilters}
      />

      {/* Flags Filters Dropdown for Orders */}
      <FlagsFiltersDropdown
        isOpen={showFlagsFiltersDropdown}
        onClose={() => setShowFlagsFiltersDropdown(false)}
        triggerRef={flagsFilterButtonRef}
        selectedOptions={selectedFlagsFilters}
        onOptionsChange={setSelectedFlagsFilters}
      />
    </div>
  );
};

export default InvitesAndOrders;
