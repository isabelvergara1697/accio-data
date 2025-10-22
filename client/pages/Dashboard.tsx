import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AlertNotification from "../components/ui/alert-notification";
import CustomizeDrawer from "../components/ui/customize-drawer";
import DatePickerCalendar from "../components/ui/date-picker-calendar";
import { DashboardViewsDropdown } from "../components/ui/dashboard-views-dropdown";
import { MetricCard } from "../components/ui/metric-card";
import { LatestReportsWidget } from "../components/ui/latest-reports-widget";
import { TurnaroundTimeWidget } from "../components/ui/turnaround-time-widget";
import { OrdersByStatusWidget } from "../components/ui/orders-by-status-widget";

import { AssignedTasksWidget } from "../components/ui/assigned-tasks-widget";
import { BasicWidget } from "../components/ui/basic-widget";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { Sidebar } from "../components/Sidebar";
import { toast } from "../hooks/use-toast";
import { Toaster } from "../components/ui/toaster";
import DesktopCalendar from "../components/ui/desktop-calendar";
import AddShortcutModal from "../components/ui/add-shortcut-modal";
import ShortcutCard from "../components/ui/shortcut-card";
import { DragDropProvider, WidgetInfo } from "../contexts/DragDropContext";
import {
  useResponsiveSVGEnhanced,
  useIconSizeEnhanced,
} from "../hooks/use-responsive-svg-enhanced";

// Add styles for mobile responsiveness and scroll behavior
const dashboardStyles = `
  @media (max-width: 767px) {
    /* Ensure proper mobile scrolling behavior */
    body {
      overflow-x: hidden;
      overflow-y: auto;
    }

    /* Mobile content scrolling */
    .mobile-container {
      -webkit-overflow-scrolling: touch !important;
      overflow-x: hidden !important;
      min-height: auto !important;
      height: auto !important;
    }

    /* Fix content areas that might have height issues */
    .mobile-content-area {
      -webkit-overflow-scrolling: touch !important;
      min-height: auto !important;
      height: auto !important;
      padding-bottom: 80px !important;
    }

    /* iPhone Safari specific viewport fixes */
    @supports (-webkit-touch-callout: none) {
      body {
        -webkit-overflow-scrolling: touch !important;
      }
    }

    /* Ensure viewport units work correctly on mobile */
    @supports (height: 100dvh) {
      .mobile-container {
        min-height: 100dvh !important;
      }
    }
  }

  /* Dashboard action buttons hover states */
    .dashboard-button {
    transition: background-color 0.2s ease-in-out;
  }

    .dashboard-button:hover {
    background-color: #F5F5F5;
  }

  .dashboard-button:active {
    background-color: #F2F4F7;
  }

  .dashboard-dropdown {
    position: relative;
  }

  .dashboard-dropdown-content {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #FFF;
    border: 1px solid #D5D7DA;
    border-radius: 8px;
    box-shadow: 0px 4px 6px -1px rgba(10, 13, 18, 0.1), 0px 2px 4px -1px rgba(10, 13, 18, 0.06);
    z-index: 10;
    margin-top: 4px;
    display: none;
  }

  .dashboard-dropdown.open .dashboard-dropdown-content {
    display: block;
  }

  .dashboard-dropdown-item {
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 400;
    color: #414651;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    transition: background-color 0.2s ease-in-out;
  }

  .dashboard-dropdown-item:hover {
    background-color: #F9FAFB;
  }

  .dashboard-dropdown-item:first-child {
    border-radius: 8px 8px 0 0;
  }

  .dashboard-dropdown-item:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

// Shortcut interface and icon definitions
interface Shortcut {
  id: string;
  label: string;
  type: string;
  icon: React.ReactNode;
  url?: string;
}

// Shortcut icon definitions
const shortcutIcons = {
  "online-ordering": (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.8333 8.33333C15.7668 8.33333 16.2335 8.33333 16.59 8.15168C16.9036 7.99189 17.1586 7.73692 17.3183 7.42332C17.5 7.0668 17.5 6.60009 17.5 5.66667V5.16667C17.5 4.23325 17.5 3.76654 17.3183 3.41002C17.1586 3.09641 16.9036 2.84145 16.59 2.68166C16.2335 2.5 15.7668 2.5 14.8333 2.5L5.16667 2.5C4.23325 2.5 3.76654 2.5 3.41002 2.68166C3.09641 2.84144 2.84144 3.09641 2.68166 3.41002C2.5 3.76654 2.5 4.23325 2.5 5.16667L2.5 5.66667C2.5 6.60009 2.5 7.0668 2.68166 7.42332C2.84144 7.73692 3.09641 7.99189 3.41002 8.15168C3.76654 8.33333 4.23325 8.33333 5.16667 8.33333L14.8333 8.33333Z"
        stroke="#414651"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.8333 17.5C15.7668 17.5 16.2335 17.5 16.59 17.3183C16.9036 17.1586 17.1586 16.9036 17.3183 16.59C17.5 16.2335 17.5 15.7668 17.5 14.8333V14.3333C17.5 13.3999 17.5 12.9332 17.3183 12.5767C17.1586 12.2631 16.9036 12.0081 16.59 11.8483C16.2335 11.6667 15.7668 11.6667 14.8333 11.6667L5.16667 11.6667C4.23325 11.6667 3.76654 11.6667 3.41002 11.8483C3.09641 12.0081 2.84144 12.2631 2.68166 12.5767C2.5 12.9332 2.5 13.3999 2.5 14.3333L2.5 14.8333C2.5 15.7668 2.5 16.2335 2.68166 16.59C2.84144 16.9036 3.09641 17.1586 3.41002 17.3183C3.76654 17.5 4.23325 17.5 5.16667 17.5H14.8333Z"
        stroke="#414651"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "i9-order": (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.3327 18.1805C3.83485 18.3327 4.51309 18.3327 5.66602 18.3327H14.3327C15.4856 18.3327 16.1638 18.3327 16.666 18.1805M3.3327 18.1805C3.22503 18.1479 3.12546 18.1083 3.03104 18.0602C2.56063 17.8205 2.17818 17.4381 1.9385 16.9677C1.66602 16.4329 1.66602 15.7328 1.66602 14.3327V5.66602C1.66602 4.26588 1.66602 3.56582 1.9385 3.03104C2.17818 2.56063 2.56063 2.17818 3.03104 1.9385C3.56582 1.66602 4.26588 1.66602 5.66602 1.66602H14.3327C15.7328 1.66602 16.4329 1.66602 16.9677 1.9385C17.4381 2.17818 17.8205 2.56063 18.0602 3.03104C18.3327 3.56582 18.3327 4.26588 18.3327 5.66602V14.3327C18.3327 15.7328 18.3327 16.4329 18.0602 16.9677C17.8205 17.4381 17.4381 17.8205 16.9677 18.0602C16.8732 18.1083 16.7737 18.1479 16.666 18.1805M3.3327 18.1805C3.33298 17.5061 3.33702 17.1492 3.39673 16.849C3.65975 15.5267 4.69341 14.4931 6.01571 14.2301C6.33771 14.166 6.72492 14.166 7.49935 14.166H12.4993C13.2738 14.166 13.661 14.166 13.983 14.2301C15.3053 14.4931 16.3389 15.5267 16.602 16.849C16.6617 17.1492 16.6657 17.5061 16.666 18.1805M13.3327 7.91602C13.3327 9.75697 11.8403 11.2493 9.99935 11.2493C8.1584 11.2493 6.66602 9.75697 6.66602 7.91602C6.66602 6.07507 8.1584 4.58268 9.99935 4.58268C11.8403 4.58268 13.3327 6.07507 13.3327 7.91602Z"
        stroke="#414651"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "batch-orders": (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.66602 10.0009L9.70121 14.0185C9.81053 14.0732 9.86518 14.1005 9.92252 14.1113C9.9733 14.1208 10.0254 14.1208 10.0762 14.1113C10.1335 14.1005 10.1882 14.0732 10.2975 14.0185L18.3327 10.0009M1.66602 14.1676L9.70121 18.1852C9.81053 18.2399 9.86518 18.2672 9.92252 18.278C9.9733 18.2875 10.0254 18.2875 10.0762 18.278C10.1335 18.2672 10.1882 18.2399 10.2975 18.1852L18.3327 14.1676M1.66602 5.83428L9.70121 1.81669C9.81053 1.76203 9.86518 1.7347 9.92252 1.72394C9.9733 1.71442 10.0254 1.71442 10.0762 1.72394C10.1335 1.7347 10.1882 1.76203 10.2975 1.81669L18.3327 5.83428L10.2975 9.85188C10.1882 9.90654 10.1335 9.93387 10.0762 9.94462C10.0254 9.95415 9.9733 9.95415 9.92252 9.94462C9.86518 9.93387 9.81053 9.90654 9.70121 9.85188L1.66602 5.83428Z"
        stroke="#414651"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "quick-order": (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 7.5L17.5 7.5M7.5 2.5L7.5 17.5M6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5Z"
        stroke="#414651"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "quick-court-order": (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 7.5H17.5M2.5 12.5H17.5M10 2.5V17.5M6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5Z"
        stroke="#414651"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

// Icon set for custom shortcuts (matches custom form options)
const customShortcutIcons: Record<string, React.ReactNode> = {
  folder: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.8327 5.83333L9.90306 3.9741C9.63552 3.439 9.50174 3.17144 9.30216 2.97597C9.12567 2.80311 8.91295 2.67164 8.67941 2.59109C8.41532 2.5 8.11619 2.5 7.51793 2.5H4.33268C3.39926 2.5 2.93255 2.5 2.57603 2.68166C2.26243 2.84144 2.00746 3.09641 1.84767 3.41002C1.66602 3.76654 1.66602 4.23325 1.66602 5.16667V5.83333M1.66602 5.83333H14.3327C15.7328 5.83333 16.4329 5.83333 16.9677 6.10582C17.4381 6.3455 17.8205 6.72795 18.0602 7.19836C18.3327 7.73314 18.3327 8.4332 18.3327 9.83333V13.5C18.3327 14.9001 18.3327 15.6002 18.0602 16.135C17.8205 16.6054 17.4381 16.9878 16.9677 17.2275C16.4329 17.5 15.7328 17.5 14.3327 17.5H5.66602C4.26588 17.5 3.56582 17.5 3.03104 17.2275C2.56063 16.9878 2.17818 16.6054 1.9385 16.135C1.66602 15.6002 1.66602 14.9001 1.66602 13.5V5.83333Z"
        stroke="#344698"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  document: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6673 1.89063V5.33274C11.6673 5.79945 11.6673 6.03281 11.7581 6.21107C11.838 6.36787 11.9655 6.49535 12.1223 6.57525C12.3006 6.66608 12.5339 6.66608 13.0007 6.66608H16.4428M13.334 10.8327H6.66732M13.334 14.166H6.66732M8.33398 7.49935H6.66732M11.6673 1.66602H7.33398C5.93385 1.66602 5.23379 1.66602 4.69901 1.9385C4.2286 2.17818 3.84615 2.56063 3.60647 3.03104C3.33398 3.56582 3.33398 4.26588 3.33398 5.66602V14.3327C3.33398 15.7328 3.33398 16.4329 3.60647 16.9677C3.84615 17.4381 4.2286 17.8205 4.69901 18.0602C5.23379 18.3327 5.93385 18.3327 7.33398 18.3327H12.6673C14.0674 18.3327 14.7675 18.3327 15.3023 18.0602C15.7727 17.8205 16.1552 17.4381 16.3948 16.9677C16.6673 16.4329 16.6673 15.7328 16.6673 14.3327V6.66602L11.6673 1.66602Z"
        stroke="#414651"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  link: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.49935 14.1673H5.83268C3.5315 14.1673 1.66602 12.3018 1.66602 10.0007C1.66602 7.69946 3.5315 5.83398 5.83268 5.83398H7.49935M12.4993 14.1673H14.166C16.4672 14.1673 18.3327 12.3018 18.3327 10.0007C18.3327 7.69946 16.4672 5.83398 14.166 5.83398H12.4993M5.83268 10.0007L14.166 10.0007"
        stroke="#414651"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  video: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3327 7.44216C18.3327 6.93731 18.3327 6.68489 18.2329 6.568C18.1462 6.46658 18.0163 6.41276 17.8833 6.42322C17.7301 6.43528 17.5516 6.61377 17.1946 6.97075L14.166 9.99935L17.1946 13.0279C17.5516 13.3849 17.7301 13.5634 17.8833 13.5755C18.0163 13.5859 18.1462 13.5321 18.2329 13.4307C18.3327 13.3138 18.3327 13.0614 18.3327 12.5565V7.44216Z"
        stroke="#414651"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66602 8.16602C1.66602 6.76588 1.66602 6.06582 1.9385 5.53104C2.17818 5.06063 2.56063 4.67818 3.03104 4.4385C3.56582 4.16602 4.26588 4.16602 5.66602 4.16602H10.166C11.5661 4.16602 12.2662 4.16602 12.801 4.4385C13.2714 4.67818 13.6538 5.06063 13.8935 5.53104C14.166 6.06582 14.166 6.76588 14.166 8.16602V11.8327C14.166 13.2328 14.166 13.9329 13.8935 14.4677C13.6538 14.9381 13.2714 15.3205 12.801 15.5602C12.2662 15.8327 11.5661 15.8327 10.166 15.8327H5.66602C4.26588 15.8327 3.56582 15.8327 3.03104 15.5602C2.56063 15.3205 2.17818 14.9381 1.9385 14.4677C1.66602 13.9329 1.66602 13.2328 1.66602 11.8327V8.16602Z"
        stroke="#414651"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  image: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 17.5H5.77614C5.2713 17.5 5.01887 17.5 4.90199 17.4002C4.80056 17.3135 4.74674 17.1836 4.75721 17.0506C4.76927 16.8974 4.94776 16.7189 5.30474 16.3619L12.3905 9.27614C12.7205 8.94613 12.8855 8.78112 13.0758 8.7193C13.2432 8.66492 13.4235 8.66492 13.5908 8.7193C13.7811 8.78112 13.9461 8.94613 14.2761 9.27614L17.5 12.5V13.5M13.5 17.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5M13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5M8.75 7.08333C8.75 8.00381 8.00381 8.75 7.08333 8.75C6.16286 8.75 5.41667 8.00381 5.41667 7.08333C5.41667 6.16286 6.16286 5.41667 7.08333 5.41667C8.00381 5.41667 8.75 6.16286 8.75 7.08333Z"
        stroke="#414651"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Dashboard view states
  const [dashboardViewsDropdownOpen, setDashboardViewsDropdownOpen] =
    useState(false);
  const [currentDashboardView, setCurrentDashboardView] = useState("default");
  const [dashboardViews, setDashboardViews] = useState([
    { id: "default", name: "Default", isDefault: true },
  ]);

  // Define widget orders for different views - use useRef to make it mutable
  const dashboardConfigurations = useRef({
    default: {
      firstRow: ["latest-reports", "turnaround-time"],
      secondRow: ["orders-by-status", "assigned-tasks"],
      customWidgets: [],
      customWidgetTypes: {},
      widgetSizes: {
        "latest-reports": "md",
        "turnaround-time": "md",
        "orders-by-status": "md",
        "assigned-tasks": "md",
      },
    },
  });

  // Widget management state - initialize based on current view
  const getCurrentConfiguration = () => {
    return (
      dashboardConfigurations.current[
        currentDashboardView as keyof typeof dashboardConfigurations.current
      ] || dashboardConfigurations.current.default
    );
  };

  const [widgetOrder, setWidgetOrder] = useState<string[]>(
    dashboardConfigurations.current.default.firstRow,
  );

  // Second row widgets
  const [secondRowWidgets, setSecondRowWidgets] = useState<string[]>(
    dashboardConfigurations.current.default.secondRow,
  );

  // Custom widgets that can be added by users (limited to 2)
  const [customWidgets, setCustomWidgets] = useState<string[]>([]);
  const [customWidgetTypes, setCustomWidgetTypes] = useState<
    Record<string, string>
  >({});

  // Widget sizes state - using flex-based sizes for 2x2 grid
  const [widgetSizes, setWidgetSizes] = useState<
    Record<string, "xs" | "sm" | "md" | "lg" | "xl">
  >({
    "latest-reports": "md",
    "turnaround-time": "md",
    "orders-by-status": "md",
    "assigned-tasks": "md",
  });

  // Initial widget configuration
  const initialWidgets: WidgetInfo[] = [
    { id: "latest-reports", title: "Latest Reports", position: 0 },
    { id: "turnaround-time", title: "Turnaround Time", position: 1 },
    { id: "orders-by-status", title: "Orders by Status", position: 2 },
    { id: "assigned-tasks", title: "Assigned Tasks", position: 3 },
  ];
  const [showNotification, setShowNotification] = useState(false);

  // Saved custom shortcuts (persist in-memory for this session)
  const [savedCustomShortcuts, setSavedCustomShortcuts] = useState<
    {
      id: string;
      label: string;
      iconId: string;
      url: string;
    }[]
  >([]);
  const [orderNotification, setOrderNotification] = useState<{
    show: boolean;
    title: string;
    description: string;
    orderNumber?: string;
  } | null>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Drawer states to coordinate with mobile menu
  const [quickOrderDrawerOpen, setQuickOrderDrawerOpen] = useState(false);
  const [ssnOrderDrawerOpen, setSSNOrderDrawerOpen] = useState(false);
  const [customizeDrawerOpen, setCustomizeDrawerOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [addShortcutModalOpen, setAddShortcutModalOpen] = useState(false);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(2025, 0, 10),
  ); // Jan 10, 2025
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(2025, 0, 16)); // Jan 16, 2025
  const [customizeButtonHovered, setCustomizeButtonHovered] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const [dateButtonHovered, setDateButtonHovered] = useState(false);
  const dateButtonRef = useRef<HTMLButtonElement>(null);
  const customWidgetsRef = useRef<HTMLDivElement>(null);

  // Enhanced responsive icon sizing with container awareness - fixed at 16px for dashboard buttons
  const iconSize = useIconSizeEnhanced(16, {
    containerAware: false,
    minSize: 16,
    maxSize: 16,
    breakpoints: {
      mobile: 768,
      tablet: 1200, // Match Dashboard breakpoint
    },
  });
  const helpIconSize = useIconSizeEnhanced(16, {
    containerAware: true,
    minSize: 12,
    maxSize: 18,
    breakpoints: {
      mobile: 768,
      tablet: 1200, // Match Dashboard breakpoint
    },
  });

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsDesktop(width >= 1200);
      setIsMobile(width < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Do not auto-seed shortcuts; allow empty state to be handled in Customize Drawer
  // If needed, shortcuts can be restored from persistence here.

  // Listen for widget reorder events
  useEffect(() => {
    const handleWidgetReorderEvent = (event: CustomEvent) => {
      const { sourceId, targetId, side } = event.detail;
      handleWidgetReorder(sourceId, targetId, side);
    };

    window.addEventListener(
      "widget-reorder",
      handleWidgetReorderEvent as EventListener,
    );
    return () => {
      window.removeEventListener(
        "widget-reorder",
        handleWidgetReorderEvent as EventListener,
      );
    };
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (userMenuOpen && !target.closest("[data-user-menu]")) {
        setUserMenuOpen(false);
      }
      if (
        dashboardViewsDropdownOpen &&
        !target.closest("[data-dashboard-views]")
      ) {
        setDashboardViewsDropdownOpen(false);
      }
      if (datePickerOpen && !target.closest("[data-date-picker]")) {
        setDatePickerOpen(false);
      }
    };

    if (userMenuOpen || dashboardViewsDropdownOpen || datePickerOpen) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [userMenuOpen, dashboardViewsDropdownOpen, datePickerOpen]);

  // Save state when component unmounts or when widget state changes
  useEffect(() => {
    return () => {
      // Save current state before component unmounts
      saveCurrentStateToConfig();
    };
  }, []);

  // Save state when widget arrays change (in addition to individual reorder/resize events)
  useEffect(() => {
    const timeoutId = setTimeout(() => saveCurrentStateToConfig(), 100);
    return () => clearTimeout(timeoutId);
  }, [
    widgetOrder,
    secondRowWidgets,
    customWidgets,
    customWidgetTypes,
    widgetSizes,
  ]);

  // Check for activation success parameter
  useEffect(() => {
    const activated = searchParams.get("activated");
    if (activated === "true") {
      setShowNotification(true);
      searchParams.delete("activated");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleNotificationDismiss = () => {
    setShowNotification(false);
  };

  // Drawer control functions that close mobile menu
  const handleOpenQuickOrderDrawer = () => {
    setMobileMenuOpen(false);
    setQuickOrderDrawerOpen(true);
  };

  const handleOpenSSNOrderDrawer = () => {
    setMobileMenuOpen(false);
    setSSNOrderDrawerOpen(true);
  };

  const handleOpenCustomizeDrawer = () => {
    setMobileMenuOpen(false);
    setCustomizeDrawerOpen(true);
  };

  const handleOpenNotificationModal = () => {
    setMobileMenuOpen(false);
    setNotificationModalOpen(true);
  };

  const handleOpenShortcutModal = () => {
    setMobileMenuOpen(false);
    setAddShortcutModalOpen(true);
  };

  const handleCloseAddShortcutModal = () => {
    setAddShortcutModalOpen(false);
  };

  const handleShortcutSelect = (
    shortcutType: string,
    shortcutLabel: string,
    options?: { url?: string; iconId?: string },
  ) => {
    // Check if we already have 4 shortcuts (max limit)
    if (shortcuts.length >= 4) {
      toast({
        title: "You can only have 4 shortcuts",
        description: "Remove one to add a new shortcut.",
        variant: "destructive",
      });
      return;
    }

    // Check if shortcut already exists
    if (shortcuts.some((shortcut) => shortcut.type === shortcutType)) {
      console.log("Shortcut already exists");
      return;
    }

    // Create new shortcut
    let newShortcut: Shortcut;
    if (shortcutType === "custom" && options?.url) {
      newShortcut = {
        id: `shortcut-custom-${Date.now()}`,
        label: shortcutLabel,
        type: "custom",
        icon: customShortcutIcons[options.iconId || "link"],
        url: options.url,
      };
    } else {
      newShortcut = {
        id: `shortcut-${Date.now()}`,
        label: shortcutLabel,
        type: shortcutType,
        icon:
          shortcutIcons[shortcutType as keyof typeof shortcutIcons] ||
          shortcutIcons["online-ordering"],
      };
    }

    // Add shortcut to state
    setShortcuts((prev) => [...prev, newShortcut]);
    handleCloseAddShortcutModal();
  };

  const handleCustomShortcutCreate = (
    name: string,
    url: string,
    icon: string,
  ) => {
    // Always save to saved list
    const saved = { id: `${Date.now()}`, label: name, iconId: icon, url };
    setSavedCustomShortcuts((prev) => [...prev, saved]);

    // Add to dashboard only if under limit
    if (shortcuts.length < 4) {
      const newShortcut: Shortcut = {
        id: `shortcut-custom-${Date.now()}`,
        label: name,
        type: "custom",
        icon: customShortcutIcons[icon] || customShortcutIcons["link"],
        url,
      };
      setShortcuts((prev) => [...prev, newShortcut]);
    } else {
      toast({
        title: "Shortcut saved",
        description:
          "You already have 4 shortcuts pinned. The new shortcut was saved in your list but not added to the dashboard.",
      });
    }

    handleCloseAddShortcutModal();
  };

  const handleRemoveShortcut = (shortcutId: string) => {
    setShortcuts((prev) =>
      prev.filter((shortcut) => shortcut.id !== shortcutId),
    );
  };

  const handleSavedCustomShortcutDelete = (shortcutId: string) => {
    // Remove from saved custom shortcuts list
    setSavedCustomShortcuts((prev) =>
      prev.filter((shortcut) => shortcut.id !== shortcutId),
    );

    // Also remove from active shortcuts if it's currently displayed
    setShortcuts((prev) =>
      prev.filter(
        (shortcut) =>
          !(shortcut.type === "custom" && shortcut.id.includes(shortcutId)),
      ),
    );
  };

  const handleShortcutClick = (shortcut: Shortcut) => {
    if (shortcut.type === "custom" && shortcut.url) {
      window.open(shortcut.url, "_blank", "noopener,noreferrer");
      return;
    }

    const routeMap: Record<string, string> = {
      "online-ordering": "/online-ordering",
    };

    const path = routeMap[shortcut.type];
    if (path) {
      navigate(path);
    } else {
      console.warn("No route mapped for shortcut type:", shortcut.type);
    }
  };

  const handleOpenDatePicker = () => {
    setMobileMenuOpen(false);
    setDatePickerOpen(true);
  };

  const formatDateRange = (startDate: Date, endDate: Date): string => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formatSingleDate = (date: Date) => {
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    return `${formatSingleDate(startDate)} – ${formatSingleDate(endDate)}`;
  };

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleUpdateAccount = () => {
    // Navigate to account settings or profile page
    console.log("Navigate to account settings");
  };

  const getNotificationPosition = () => {
    // Desktop: top, Tablet and Mobile: bottom
    return isDesktop ? "top" : "bottom";
  };

  const getNotificationBreakpoint = () => {
    if (isDesktop) return "desktop";
    if (isMobile) return "mobile";
    return "tablet";
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  // Save current widget state to the dashboard configuration
  const saveCurrentStateToConfig = () => {
    console.log(`💾 Saving current state to ${currentDashboardView} view`);

    const currentConfig = {
      firstRow: [...widgetOrder],
      secondRow: [...secondRowWidgets],
      customWidgets: [...customWidgets],
      customWidgetTypes: { ...customWidgetTypes },
      widgetSizes: { ...widgetSizes },
    };

    dashboardConfigurations.current[
      currentDashboardView as keyof typeof dashboardConfigurations.current
    ] = currentConfig;

    console.log(
      `✅ Saved configuration for ${currentDashboardView}:`,
      currentConfig,
    );
  };

  // Handle widget reordering
  const handleWidgetReorder = (
    sourceId: string,
    targetId: string,
    side: "left" | "right",
  ) => {
    console.log(
      `🔄 Dashboard reordering: ${sourceId} to ${side} of ${targetId}`,
    );

    // Determine which rows the source and target widgets are in
    const isSourceInFirstRow = widgetOrder.includes(sourceId);
    const isSourceInSecondRow = secondRowWidgets.includes(sourceId);
    const isSourceInCustomRow = customWidgets.includes(sourceId);
    const isTargetInFirstRow = widgetOrder.includes(targetId);
    const isTargetInSecondRow = secondRowWidgets.includes(targetId);
    const isTargetInCustomRow = customWidgets.includes(targetId);

    // Handle reordering within the first row
    if (isSourceInFirstRow && isTargetInFirstRow) {
      setWidgetOrder((prevOrder) => {
        const newOrder = [...prevOrder];
        const sourceIndex = newOrder.indexOf(sourceId);
        const targetIndex = newOrder.indexOf(targetId);

        if (sourceIndex === -1 || targetIndex === -1) return prevOrder;

        // Remove source widget
        newOrder.splice(sourceIndex, 1);

        // Find new target index after removal
        const newTargetIndex = newOrder.indexOf(targetId);

        // Insert source widget at appropriate position
        if (side === "left") {
          newOrder.splice(newTargetIndex, 0, sourceId);
        } else {
          newOrder.splice(newTargetIndex + 1, 0, sourceId);
        }

        console.log("📋 New first row order:", newOrder);
        // Save changes to current dashboard view
        setTimeout(() => saveCurrentStateToConfig(), 0);
        return newOrder;
      });
    }
    // Handle reordering within the second row
    else if (isSourceInSecondRow && isTargetInSecondRow) {
      setSecondRowWidgets((prevOrder) => {
        const newOrder = [...prevOrder];
        const sourceIndex = newOrder.indexOf(sourceId);
        const targetIndex = newOrder.indexOf(targetId);

        if (sourceIndex === -1 || targetIndex === -1) return prevOrder;

        // Remove source widget
        newOrder.splice(sourceIndex, 1);

        // Find new target index after removal
        const newTargetIndex = newOrder.indexOf(targetId);

        // Insert source widget at appropriate position
        if (side === "left") {
          newOrder.splice(newTargetIndex, 0, sourceId);
        } else {
          newOrder.splice(newTargetIndex + 1, 0, sourceId);
        }

        console.log("📋 New second row order:", newOrder);
        // Save changes to current dashboard view
        setTimeout(() => saveCurrentStateToConfig(), 0);
        return newOrder;
      });
    }
    // Handle moving between rows (first to second)
    else if (isSourceInFirstRow && isTargetInSecondRow) {
      // Remove from first row
      setWidgetOrder((prevOrder) => {
        const newOrder = prevOrder.filter((id) => id !== sourceId);
        console.log("📋 Removed from first row:", newOrder);
        return newOrder;
      });

      // Add to second row at appropriate position
      setSecondRowWidgets((prevOrder) => {
        const newOrder = [...prevOrder];
        const targetIndex = newOrder.indexOf(targetId);

        if (targetIndex === -1) return prevOrder;

        // Insert source widget at appropriate position
        if (side === "left") {
          newOrder.splice(targetIndex, 0, sourceId);
        } else {
          newOrder.splice(targetIndex + 1, 0, sourceId);
        }

        console.log("📋 Added to second row:", newOrder);
        // Save changes to current dashboard view
        setTimeout(() => saveCurrentStateToConfig(), 0);
        return newOrder;
      });
    }
    // Handle moving between rows (second to first)
    else if (isSourceInSecondRow && isTargetInFirstRow) {
      // Remove from second row
      setSecondRowWidgets((prevOrder) => {
        const newOrder = prevOrder.filter((id) => id !== sourceId);
        console.log("📋 Removed from second row:", newOrder);
        return newOrder;
      });

      // Add to first row at appropriate position
      setWidgetOrder((prevOrder) => {
        const newOrder = [...prevOrder];
        const targetIndex = newOrder.indexOf(targetId);

        if (targetIndex === -1) return prevOrder;

        // Insert source widget at appropriate position
        if (side === "left") {
          newOrder.splice(targetIndex, 0, sourceId);
        } else {
          newOrder.splice(targetIndex + 1, 0, sourceId);
        }

        console.log("���� Added to first row:", newOrder);
        return newOrder;
      });
    }
    // Handle reordering within custom widgets
    else if (isSourceInCustomRow && isTargetInCustomRow) {
      setCustomWidgets((prevOrder) => {
        const newOrder = [...prevOrder];
        const sourceIndex = newOrder.indexOf(sourceId);
        const targetIndex = newOrder.indexOf(targetId);

        if (sourceIndex === -1 || targetIndex === -1) return prevOrder;

        // Remove source widget
        newOrder.splice(sourceIndex, 1);

        // Find new target index after removal
        const newTargetIndex = newOrder.indexOf(targetId);

        // Insert source widget at appropriate position
        if (side === "left") {
          newOrder.splice(newTargetIndex, 0, sourceId);
        } else {
          newOrder.splice(newTargetIndex + 1, 0, sourceId);
        }

        console.log("📋 New custom row order:", newOrder);
        // Save changes to current dashboard view
        setTimeout(() => saveCurrentStateToConfig(), 0);
        return newOrder;
      });
    }
    // Handle moving from custom row to other rows
    else if (isSourceInCustomRow && isTargetInFirstRow) {
      // Remove from custom row
      setCustomWidgets((prevOrder) => {
        const newOrder = prevOrder.filter((id) => id !== sourceId);
        console.log("📋 Removed from custom row:", newOrder);
        return newOrder;
      });

      // Add to first row at appropriate position
      setWidgetOrder((prevOrder) => {
        const newOrder = [...prevOrder];
        const targetIndex = newOrder.indexOf(targetId);

        if (targetIndex === -1) return prevOrder;

        // Insert source widget at appropriate position
        if (side === "left") {
          newOrder.splice(targetIndex, 0, sourceId);
        } else {
          newOrder.splice(targetIndex + 1, 0, sourceId);
        }

        console.log("📋 Added to first row:", newOrder);
        // Save changes to current dashboard view
        setTimeout(() => saveCurrentStateToConfig(), 0);
        return newOrder;
      });
    } else if (isSourceInCustomRow && isTargetInSecondRow) {
      // Remove from custom row
      setCustomWidgets((prevOrder) => {
        const newOrder = prevOrder.filter((id) => id !== sourceId);
        console.log("📋 Removed from custom row:", newOrder);
        return newOrder;
      });

      // Add to second row at appropriate position
      setSecondRowWidgets((prevOrder) => {
        const newOrder = [...prevOrder];
        const targetIndex = newOrder.indexOf(targetId);

        if (targetIndex === -1) return prevOrder;

        // Insert source widget at appropriate position
        if (side === "left") {
          newOrder.splice(targetIndex, 0, sourceId);
        } else {
          newOrder.splice(targetIndex + 1, 0, sourceId);
        }

        console.log("📋 Added to second row:", newOrder);
        // Save changes to current dashboard view
        setTimeout(() => saveCurrentStateToConfig(), 0);
        return newOrder;
      });
    }
    // Handle moving from other rows to custom row
    else if (isSourceInFirstRow && isTargetInCustomRow) {
      // Remove from first row
      setWidgetOrder((prevOrder) => {
        const newOrder = prevOrder.filter((id) => id !== sourceId);
        console.log("📋 Removed from first row:", newOrder);
        return newOrder;
      });

      // Add to custom row at appropriate position
      setCustomWidgets((prevOrder) => {
        const newOrder = [...prevOrder];
        const targetIndex = newOrder.indexOf(targetId);

        if (targetIndex === -1) return prevOrder;

        // Insert source widget at appropriate position
        if (side === "left") {
          newOrder.splice(targetIndex, 0, sourceId);
        } else {
          newOrder.splice(targetIndex + 1, 0, sourceId);
        }

        console.log("📋 Added to custom row:", newOrder);
        // Save changes to current dashboard view
        setTimeout(() => saveCurrentStateToConfig(), 0);
        return newOrder;
      });
    } else if (isSourceInSecondRow && isTargetInCustomRow) {
      // Remove from second row
      setSecondRowWidgets((prevOrder) => {
        const newOrder = prevOrder.filter((id) => id !== sourceId);
        console.log("📋 Removed from second row:", newOrder);
        return newOrder;
      });

      // Add to custom row at appropriate position
      setCustomWidgets((prevOrder) => {
        const newOrder = [...prevOrder];
        const targetIndex = newOrder.indexOf(targetId);

        if (targetIndex === -1) return prevOrder;

        // Insert source widget at appropriate position
        if (side === "left") {
          newOrder.splice(targetIndex, 0, sourceId);
        } else {
          newOrder.splice(targetIndex + 1, 0, sourceId);
        }

        console.log("📋 Added to custom row:", newOrder);
        // Save changes to current dashboard view
        setTimeout(() => saveCurrentStateToConfig(), 0);
        return newOrder;
      });
    }
  };

  // Handle widget resizing
  const handleWidgetResize = (
    widgetId: string,
    newSize: "xs" | "sm" | "md" | "lg" | "xl",
  ) => {
    console.log(`📏 Resizing widget ${widgetId} to ${newSize}`);
    setWidgetSizes((prevSizes) => ({
      ...prevSizes,
      [widgetId]: newSize,
    }));

    // Save changes to current dashboard view
    setTimeout(() => saveCurrentStateToConfig(), 0);

    // Optional: Show a brief notification about the resize
    console.log(`✅ Widget ${widgetId} resized to ${newSize}`);
  };

  // Handle adding custom widgets
  const handleAddCustomWidget = (widgetType: string) => {
    if (customWidgets.length >= 2) {
      console.log("Maximum of 2 custom widgets allowed");
      return;
    }

    const widgetId = `custom-${Date.now()}`;
    setCustomWidgets((prev) => [...prev, widgetId]);
    setCustomWidgetTypes((prev) => ({ ...prev, [widgetId]: widgetType }));
    setWidgetSizes((prev) => ({ ...prev, [widgetId]: "md" }));

    // Save changes to current dashboard view
    setTimeout(() => saveCurrentStateToConfig(), 0);

    console.log(`✅ Added custom widget: ${widgetId} of type: ${widgetType}`);

    // Scroll to the custom widgets section after a brief delay
    setTimeout(() => {
      console.log("�� Attempting autoscroll to new widget");
      if (customWidgetsRef.current) {
        console.log("✅ customWidgetsRef found");
        // Get the main content container (the scrollable container)
        const mainContent = document.querySelector(
          'div[style*="overflow: auto"]',
        ) as HTMLElement;

        if (mainContent) {
          console.log("✅ Main content container found");
          // Calculate position relative to the scrollable container
          const containerRect = mainContent.getBoundingClientRect();
          const widgetRect = customWidgetsRef.current.getBoundingClientRect();
          const scrollTop = mainContent.scrollTop;

          // Calculate the target scroll position
          const targetScrollTop =
            scrollTop + (widgetRect.top - containerRect.top) - 100; // 100px padding from top

          console.log("������ Scrolling to position:", targetScrollTop);
          mainContent.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: "smooth",
          });
        } else {
          console.log(
            "⚠�� Main content container not found, using window scroll",
          );
          // Fallback to window scroll if main container not found
          const offsetTop = customWidgetsRef.current.offsetTop;
          const headerHeight = isDesktop ? 80 : 64;
          const notificationHeight =
            showNotification || orderNotification?.show ? 60 : 0;
          const scrollPosition =
            offsetTop - headerHeight - notificationHeight - 32;

          console.log("📍 Window scrolling to position:", scrollPosition);
          window.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        }
      } else {
        console.log("❌ customWidgetsRef not found");
      }
    }, 150); // Slightly longer delay to ensure DOM is updated
  };

  // Handle removing custom widgets
  const handleRemoveCustomWidget = (widgetId: string) => {
    setCustomWidgets((prev) => prev.filter((id) => id !== widgetId));
    setCustomWidgetTypes((prev) => {
      const newTypes = { ...prev };
      delete newTypes[widgetId];
      return newTypes;
    });
    setWidgetSizes((prev) => {
      const newSizes = { ...prev };
      delete newSizes[widgetId];
      return newSizes;
    });

    // Save changes to current dashboard view
    setTimeout(() => saveCurrentStateToConfig(), 0);

    console.log(`✅ Removed custom widget: ${widgetId}`);
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

  const renderCustomizeButton = () => (
    <button
      className="dashboard-button"
      onClick={handleOpenCustomizeDrawer}
      onMouseEnter={() => setCustomizeButtonHovered(true)}
      onMouseLeave={() => setCustomizeButtonHovered(false)}
      style={{
        display: "flex",
        minHeight: "36px",
        padding: "6px 8px",
        justifyContent: isMobile ? "flex-start" : "center",
        alignItems: "center",
        gap: "4px",
        borderRadius: "8px",
        border: "1px solid #D5D7DA",
        background: customizeButtonHovered ? "#F8F9FA" : "#FFF",
        boxShadow:
          "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
        cursor: "pointer",
        transition: "background-color 0.2s ease-in-out",
        ...(isMobile ? { alignSelf: "stretch", width: "100%" } : {}),
      }}
    >
      <svg
        width={iconSize.width}
        height={iconSize.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={iconSize.style}
        className={iconSize.className}
      >
        <path
          d="M2 5.3335L10 5.3335M10 5.3335C10 6.43807 10.8954 7.3335 12 7.3335C13.1046 7.3335 14 6.43807 14 5.3335C14 4.22893 13.1046 3.3335 12 3.3335C10.8954 3.3335 10 4.22893 10 5.3335ZM6 10.6668L14 10.6668M6 10.6668C6 11.7714 5.10457 12.6668 4 12.6668C2.89543 12.6668 2 11.7714 2 10.6668C2 9.56226 2.89543 8.66683 4 8.66683C5.10457 8.66683 6 9.56226 6 10.6668Z"
          stroke="#A4A7AE"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        style={{
          display: "flex",
          padding: "0px 2px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "#414651",
            fontFamily: "Public Sans",
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "20px",
          }}
        >
          Customize
        </div>
      </div>
    </button>
  );

  // Dashboard views handlers
  const handleViewChange = (viewId: string) => {
    console.log(`Switching to dashboard view: ${viewId}`);

    // Save current state before switching views
    saveCurrentStateToConfig();

    setCurrentDashboardView(viewId);
    setDashboardViewsDropdownOpen(false);

    // Load the widget configuration for the selected view
    const config =
      dashboardConfigurations.current[
        viewId as keyof typeof dashboardConfigurations.current
      ] || dashboardConfigurations.current.default;

    setWidgetOrder(config.firstRow || []);
    setSecondRowWidgets(config.secondRow || []);

    // Load custom widgets if they exist
    if (config.customWidgets) {
      setCustomWidgets(config.customWidgets);
    } else {
      setCustomWidgets([]);
    }

    // Load custom widget types if they exist
    if (config.customWidgetTypes) {
      setCustomWidgetTypes(config.customWidgetTypes);
    } else {
      setCustomWidgetTypes({});
    }

    // Load widget sizes if they exist
    if (config.widgetSizes) {
      setWidgetSizes(config.widgetSizes);
    } else {
      // Reset to default sizes
      setWidgetSizes({
        "latest-reports": "md",
        "turnaround-time": "md",
        "orders-by-status": "md",
        "assigned-tasks": "md",
      });
    }

    console.log(`✅ Switched to ${viewId} view:`, {
      firstRow: config.firstRow,
      secondRow: config.secondRow,
      customWidgets: config.customWidgets,
      customWidgetTypes: config.customWidgetTypes,
      widgetSizes: config.widgetSizes,
    });
  };

  const handleSaveDashboard = (viewName: string) => {
    console.log("Saving current dashboard state with name:", viewName);

    // Save current widget configuration
    const currentConfig = {
      firstRow: [...widgetOrder],
      secondRow: [...secondRowWidgets],
      customWidgets: [...customWidgets],
      customWidgetTypes: { ...customWidgetTypes },
      widgetSizes: { ...widgetSizes },
    };

    const newView = {
      id: `custom-${Date.now()}`,
      name: viewName.trim() || `Custom View ${dashboardViews.length}`,
      isDefault: false,
    };

    // Update dashboardConfigurations with the new view
    dashboardConfigurations.current[
      newView.id as keyof typeof dashboardConfigurations.current
    ] = currentConfig;

    setDashboardViews((prev) => [...prev, newView]);
    setCurrentDashboardView(newView.id);
    setDashboardViewsDropdownOpen(false);

    console.log("✅ Dashboard view saved successfully:", newView);
  };

  const handleCreateNewView = () => {
    console.log("Creating new dashboard view...");
    // Here you would implement the logic to create a new view
    setDashboardViewsDropdownOpen(false);
  };

  const handleDeleteDashboard = (viewId: string) => {
    console.log("Deleting dashboard view:", viewId);

    // Prevent deleting default views
    const viewToDelete = dashboardViews.find((view) => view.id === viewId);
    if (viewToDelete?.isDefault) {
      console.warn("Cannot delete default dashboard view");
      return;
    }

    // Remove from dashboardConfigurations
    delete dashboardConfigurations.current[
      viewId as keyof typeof dashboardConfigurations.current
    ];

    // Remove from views list
    setDashboardViews((prev) => prev.filter((view) => view.id !== viewId));

    // If we're deleting the current view, switch to default
    if (currentDashboardView === viewId) {
      setCurrentDashboardView("default");
      const defaultConfig = dashboardConfigurations.current.default;
      setWidgetOrder(defaultConfig.firstRow);
      setSecondRowWidgets(defaultConfig.secondRow);
    }

    console.log("✅ Dashboard view deleted successfully:", viewId);
  };

  const handleRenameDashboard = (viewId: string, newName: string) => {
    console.log("Renaming dashboard view:", viewId, "to:", newName);

    // Prevent renaming default views
    const viewToRename = dashboardViews.find((view) => view.id === viewId);
    if (viewToRename?.isDefault) {
      console.warn("Cannot rename default dashboard view");
      return;
    }

    // Update the view name
    setDashboardViews((prev) =>
      prev.map((view) =>
        view.id === viewId
          ? { ...view, name: newName.trim() || view.name }
          : view,
      ),
    );

    console.log(
      "✅ Dashboard view renamed successfully:",
      viewId,
      "to:",
      newName,
    );
  };

  const renderDashboardViewsDropdown = () => (
    <div
      data-dashboard-views
      style={{
        ...(isMobile ? { alignSelf: "stretch", width: "100%" } : {}),
      }}
    >
      <DashboardViewsDropdown
        currentView={currentDashboardView}
        views={dashboardViews}
        onViewChange={handleViewChange}
        onSaveDashboard={handleSaveDashboard}
        onCreateNewView={handleCreateNewView}
        onDeleteDashboard={handleDeleteDashboard}
        onRenameDashboard={handleRenameDashboard}
        isOpen={dashboardViewsDropdownOpen}
        onToggle={() =>
          setDashboardViewsDropdownOpen(!dashboardViewsDropdownOpen)
        }
        onClose={() => setDashboardViewsDropdownOpen(false)}
        isMobile={isMobile}
      />
    </div>
  );

  const renderDateButton = () => (
    <div
      data-date-picker
      style={{
        position: "relative",
        ...(isMobile ? { alignSelf: "stretch" } : {}),
      }}
    >
      <button
        ref={dateButtonRef}
        className="dashboard-button"
        onClick={handleOpenDatePicker}
        onMouseEnter={() => setDateButtonHovered(true)}
        onMouseLeave={() => setDateButtonHovered(false)}
        style={{
          display: "flex",
          minHeight: "36px",
          padding: "6px 8px",
          justifyContent: isMobile ? "flex-start" : "center",
          alignItems: "center",
          gap: "4px",
          borderRadius: "8px",
          border: "1px solid #D5D7DA",
          background: datePickerOpen
            ? "#F5F5F5"
            : dateButtonHovered
              ? "#F8F9FA"
              : "#FFF",
          boxShadow:
            "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
          cursor: "pointer",
          transition: "background-color 0.2s ease-in-out",
          ...(isMobile ? { alignSelf: "stretch", width: "100%" } : {}),
        }}
      >
        <svg
          width={iconSize.width}
          height={iconSize.height}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={iconSize.style}
          className={iconSize.className}
        >
          <path
            d="M14 6.66683H2M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M5.2 14.6668H10.8C11.9201 14.6668 12.4802 14.6668 12.908 14.4488C13.2843 14.2571 13.5903 13.9511 13.782 13.5748C14 13.147 14 12.5869 14 11.4668V5.86683C14 4.74672 14 4.18667 13.782 3.75885C13.5903 3.38252 13.2843 3.07656 12.908 2.88482C12.4802 2.66683 11.9201 2.66683 10.8 2.66683H5.2C4.0799 2.66683 3.51984 2.66683 3.09202 2.88482C2.71569 3.07656 2.40973 3.38252 2.21799 3.75885C2 4.18667 2 4.74672 2 5.86683V11.4668C2 12.5869 2 13.147 2.21799 13.5748C2.40973 13.9511 2.71569 14.2571 3.09202 14.4488C3.51984 14.6668 4.0799 14.6668 5.2 14.6668Z"
            stroke={datePickerOpen ? "#717680" : "#A4A7AE"}
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            display: "flex",
            padding: "0px 2px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: datePickerOpen ? "#252B37" : "#414651",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "20px",
            }}
          >
            {formatDateRange(selectedStartDate, selectedEndDate)}
          </div>
        </div>
      </button>
    </div>
  );

  return (
    <DragDropProvider initialWidgets={initialWidgets}>
      <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />

      {/* Success Notification - Positioned at the very top */}
      {showNotification && (
        <AlertNotification
          title="Account Activated Successfully"
          description="Manage your account and update your personal details in settings."
          variant="success"
          position={getNotificationPosition()}
          breakpoint={getNotificationBreakpoint()}
          onDismiss={handleNotificationDismiss}
          primaryAction={{
            label: "Update Account",
            onClick: handleUpdateAccount,
          }}
          secondaryAction={{
            label: "Dismiss",
            onClick: handleNotificationDismiss,
          }}
        />
      )}

      {/* Order Success Notification - Positioned at the very top */}
      {orderNotification?.show && (
        <AlertNotification
          title={orderNotification.title}
          description={orderNotification.description}
          variant="success"
          position={getNotificationPosition()}
          breakpoint={getNotificationBreakpoint()}
          onDismiss={() => setOrderNotification(null)}
          primaryAction={{
            label: "View Order",
            onClick: () => {
              console.log("View order:", orderNotification.orderNumber);
              setOrderNotification(null);
            },
          }}
          secondaryAction={{
            label: "Dismiss",
            onClick: () => setOrderNotification(null),
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          background: "#FAFAFA",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Mobile Menu Overlay - Only show when mobile menu is open and no drawers are active */}
        {mobileMenuOpen && !isDesktop && (
          <div
            className="fixed inset-0"
            style={{
              width: "100vw",
              height: "100vh",
              background: "rgba(10, 13, 18, 0.7)",
              backdropFilter: "blur(8px)",
              position: "fixed",
              left: 0,
              top: 0,
              zIndex: 999,
            }}
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}

        {/* Sidebar Navigation */}
        <Sidebar
          isDesktop={isDesktop}
          isMobile={isMobile}
          mobileMenuOpen={mobileMenuOpen}
          currentPage="dashboard"
          showMobileUserMenu={showMobileUserMenu}
          setShowMobileUserMenu={setShowMobileUserMenu}
          setMobileMenuOpen={setMobileMenuOpen}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
          userMenuHovered={userMenuHovered}
          setUserMenuHovered={setUserMenuHovered}
          handleSignOut={handleSignOut}
          getUserMenuStyles={getUserMenuStyles}
          showNotification={showNotification || orderNotification?.show}
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
          onboardingStep={onboardingStep}
          setOnboardingStep={setOnboardingStep}
          completedSteps={completedSteps}
          setCompletedSteps={setCompletedSteps}
        />

        {/* Main Content */}
        <div
          className={isMobile ? "mobile-container" : ""}
          style={{
            marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            background: "#FAFAFA",
            position: "relative",
            height: "100vh",
            overflow: "auto",
          }}
        >
          {/* Desktop Top Navigation Bar */}
          <Header
            isDesktop={isDesktop}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            userMenuHovered={userMenuHovered}
            setUserMenuHovered={setUserMenuHovered}
            handleSignOut={handleSignOut}
            getUserMenuStyles={getUserMenuStyles}
            showMobileUserMenu={showMobileUserMenu}
            showNotification={showNotification || orderNotification?.show}
            sidebarCollapsed={sidebarCollapsed}
            onOrderNotification={(notification) => {
              setOrderNotification({
                show: true,
                ...notification,
              });
            }}
            quickOrderDrawerOpen={quickOrderDrawerOpen}
            setQuickOrderDrawerOpen={setQuickOrderDrawerOpen}
            ssnOrderDrawerOpen={ssnOrderDrawerOpen}
            setSSNOrderDrawerOpen={setSSNOrderDrawerOpen}
            customizeDrawerOpen={customizeDrawerOpen}
            setCustomizeDrawerOpen={setCustomizeDrawerOpen}
            notificationModalOpen={notificationModalOpen}
            setNotificationModalOpen={setNotificationModalOpen}
            onOpenQuickOrderDrawer={handleOpenQuickOrderDrawer}
            onOpenSSNOrderDrawer={handleOpenSSNOrderDrawer}
            onOpenCustomizeDrawer={handleOpenCustomizeDrawer}
            onOpenNotificationModal={handleOpenNotificationModal}
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
            onOrderNotification={(notification) => {
              setOrderNotification({
                show: true,
                ...notification,
              });
            }}
            quickOrderDrawerOpen={quickOrderDrawerOpen}
            setQuickOrderDrawerOpen={setQuickOrderDrawerOpen}
            ssnOrderDrawerOpen={ssnOrderDrawerOpen}
            setSSNOrderDrawerOpen={setSSNOrderDrawerOpen}
            customizeDrawerOpen={customizeDrawerOpen}
            setCustomizeDrawerOpen={setCustomizeDrawerOpen}
            notificationModalOpen={notificationModalOpen}
            setNotificationModalOpen={setNotificationModalOpen}
            onOpenQuickOrderDrawer={handleOpenQuickOrderDrawer}
            onOpenSSNOrderDrawer={handleOpenSSNOrderDrawer}
            onOpenCustomizeDrawer={handleOpenCustomizeDrawer}
            onOpenNotificationModal={handleOpenNotificationModal}
          />

          {/* Main Content Area */}
          <div
            style={{
              marginTop: isDesktop
                ? showNotification || orderNotification?.show
                  ? "140px"
                  : "80px"
                : "64px",
              paddingBottom: isMobile
                ? showNotification || orderNotification?.show
                  ? "140px"
                  : "80px"
                : "32px",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              minHeight: "auto",
              height: "auto",
            }}
          >
            {/* Header Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "24px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: isMobile ? "32px 16px 0" : "32px 32px 0",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "20px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      ...(isMobile
                        ? {
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                          }
                        : {
                            alignItems: "flex-end",
                            alignContent: "flex-end",
                            gap: "20px 16px",
                            alignSelf: "stretch",
                            flexWrap: "wrap",
                          }),
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        ...(isMobile
                          ? {
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "2px",
                              alignSelf: "stretch",
                            }
                          : {
                              minWidth: "320px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                            }),
                      }}
                    >
                      <h1
                        className="page-title"
                        style={{ alignSelf: "stretch" }}
                      >
                        Dashboard
                      </h1>
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#535862",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontWeight: "400",
                          lineHeight: "24px",
                        }}
                      >
                        View recent activity, task progress, and key data to
                        stay informed and organized.
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div
                      style={{
                        display: "flex",
                        ...(isMobile
                          ? {
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-start",
                              gap: "12px",
                              alignSelf: "stretch",
                            }
                          : { alignItems: "center", gap: "12px" }),
                      }}
                    >
                      {renderCustomizeButton()}
                      {renderDashboardViewsDropdown()}
                      {renderDateButton()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shortcuts Section */}
            {shortcuts.length > 0 && (
              <div
                style={{
                  display: "flex",
                  padding: isMobile ? "0px 16px" : "0px 32px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
                {/* Section label */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      flex: "1 0 0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <div
                        style={{
                          color: "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          lineHeight: "24px",
                        }}
                      >
                        Shortcuts
                      </div>
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
                          width={helpIconSize.width}
                          height={helpIconSize.height}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            ...helpIconSize.style,
                            flexShrink: 0,
                          }}
                          className={helpIconSize.className}
                        >
                          <g clipPath="url(#clip0_help_circle_shortcuts)">
                            <path
                              d="M6.06016 6.00016C6.2169 5.55461 6.52626 5.1789 6.93347 4.93958C7.34067 4.70027 7.81943 4.61279 8.28495 4.69264C8.75047 4.77249 9.17271 5.01451 9.47688 5.37585C9.78106 5.73718 9.94753 6.19451 9.94683 6.66683C9.94683 8.00016 7.94683 8.66683 7.94683 8.66683M8.00016 11.3335H8.00683M14.6668 8.00016C14.6668 11.6821 11.6821 14.6668 8.00016 14.6668C4.31826 14.6668 1.3335 11.6821 1.3335 8.00016C1.3335 4.31826 4.31826 1.3335 8.00016 1.3335C11.6821 1.3335 14.6668 4.31826 14.6668 8.00016Z"
                              stroke="#A4A7AE"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_help_circle_shortcuts">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "6px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0",
                      }}
                      onClick={handleOpenShortcutModal}
                    >
                      <div
                        style={{
                          color: "#273572",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          lineHeight: "24px",
                        }}
                      >
                        Edit Shortcut
                      </div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="#34479A"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Container */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    alignSelf: "stretch",
                    ...(shortcuts.length === 0 ? { height: "98px" } : {}),
                  }}
                >
                  {shortcuts.length === 0 ? (
                    /* Empty State */
                    <div
                      style={{
                        display: "flex",
                        padding: "12px 12px 12px 16px",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                        gap: "12px",
                        flex: "1 0 0",
                        borderRadius: "12px",
                        border: "1px dashed #34479A",
                        background: "#ECEEF9",
                        boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                      }}
                      onClick={handleOpenShortcutModal}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#D9DEF2";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#ECEEF9";
                      }}
                    >
                      {/* Featured icon */}
                      <div
                        style={{
                          display: "flex",
                          width: "32px",
                          height: "32px",
                          padding: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          aspectRatio: "1/1",
                          borderRadius: "6px",
                          border: "1px solid #34479A",
                          background: "#ECEEF9",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            flexShrink: 0,
                          }}
                        >
                          <path
                            d="M8.47203 12.2427L7.52922 13.1855C6.22748 14.4872 4.11693 14.4872 2.81518 13.1855C1.51343 11.8837 1.51343 9.77317 2.81518 8.47142L3.75799 7.52861M12.2433 8.47142L13.1861 7.52861C14.4878 6.22687 14.4878 4.11632 13.1861 2.81457C11.8843 1.51282 9.77378 1.51282 8.47203 2.81457L7.52922 3.75738M5.66729 10.3333L10.334 5.66667"
                            stroke="#344698"
                            strokeWidth="1.33333"
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
                          gap: "4px",
                          flex: "1 0 0",
                        }}
                      >
                        <div
                          style={{
                            color: "#273572",
                            fontFamily: "Public Sans",
                            fontSize: "18px",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "28px",
                          }}
                        >
                          Get there faster
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              color: "#273572",
                              fontFamily: "Public Sans",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: "500",
                              lineHeight: "20px",
                            }}
                          >
                            Add up to 4 shortcuts and personalize your
                            experience
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Shortcuts Grid */
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: isMobile
                          ? "1fr"
                          : !isDesktop // Tablet view
                            ? "repeat(2, minmax(0, 1fr))"
                            : shortcuts.length === 1
                              ? "1.5fr 1fr 1fr 1fr"
                              : shortcuts.length === 2
                                ? "1fr 1fr"
                                : shortcuts.length === 3
                                  ? "repeat(3, 1fr)"
                                  : "repeat(4, 1fr)",
                        gridTemplateRows: isMobile
                          ? "auto"
                          : !isDesktop // Tablet view
                            ? "repeat(2, minmax(0, 1fr))"
                            : "auto",
                        gap: "16px",
                        alignSelf: "stretch",
                        width: "100%",
                        minWidth: 0,
                        ...(!isMobile && !isDesktop ? { height: "161px" } : {}),
                      }}
                    >
                      {shortcuts.map((shortcut) => (
                        <ShortcutCard
                          key={shortcut.id}
                          id={shortcut.id}
                          label={shortcut.label}
                          icon={shortcut.icon}
                          onClick={() => handleShortcutClick(shortcut)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Overview Section */}
            <div
              style={{
                display: "flex",
                padding: isMobile ? "0px 16px" : "0px 32px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {/* Section label */}
              <div
                style={{
                  display: "flex",
                  width: "280px",
                  minWidth: "240px",
                  maxWidth: "280px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "24px",
                    }}
                  >
                    Quick Overview
                  </div>
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
                      width={helpIconSize.width}
                      height={helpIconSize.height}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        ...helpIconSize.style,
                        flexShrink: 0,
                      }}
                      className={helpIconSize.className}
                    >
                      <g clipPath="url(#clip0_help_circle)">
                        <path
                          d="M6.06016 6.00016C6.2169 5.55461 6.52626 5.1789 6.93347 4.93958C7.34067 4.70027 7.81943 4.61279 8.28495 4.69264C8.75047 4.77249 9.17271 5.01451 9.47688 5.37585C9.78106 5.73718 9.94753 6.19451 9.94683 6.66683C9.94683 8.00016 7.94683 8.66683 7.94683 8.66683M8.00016 11.3335H8.00683M14.6668 8.00016C14.6668 11.6821 11.6821 14.6668 8.00016 14.6668C4.31826 14.6668 1.3335 11.6821 1.3335 8.00016C1.3335 4.31826 4.31826 1.3335 8.00016 1.3335C11.6821 1.3335 14.6668 4.31826 14.6668 8.00016Z"
                          stroke="#A4A7AE"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_help_circle">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Metric cards group */}
              <div
                style={{
                  display: isMobile ? "flex" : "grid",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                  width: "100%",
                  ...(isMobile
                    ? {
                        flexDirection: "column",
                      }
                    : isDesktop
                      ? {
                          gridTemplateColumns: "repeat(4, 1fr)",
                          maxWidth: "100%",
                        }
                      : {
                          // Tablet: 2x2 grid with proper sizing
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gridTemplateRows: "repeat(2, 1fr)",
                          gap: "16px",
                          width: "100%",
                          maxWidth: "100%",
                          minWidth: 0, // Allow shrinking
                        }),
                }}
                ref={(el) => {
                  if (el) {
                    console.log("📊 Metric cards layout:", {
                      isMobile,
                      isDesktop,
                      windowWidth,
                      gridTemplateColumns: isMobile
                        ? "flex-column"
                        : isDesktop
                          ? "repeat(4, 1fr)"
                          : "repeat(2, 1fr)",
                      elementWidth: el.getBoundingClientRect().width,
                    });
                  }
                }}
              >
                <MetricCard
                  label="[Metric]"
                  value="347"
                  trend={{
                    direction: "up",
                    percentage: "100%",
                  }}
                  chart={{
                    trend: "positive",
                    backgroundColor: "#344698",
                    lineColor: "#344698",
                    variant: "default",
                  }}
                  isMobile={isMobile}
                />

                <MetricCard
                  label="[Metric]"
                  value="482"
                  trend={{
                    direction: "down",
                    percentage: "50%",
                  }}
                  chart={{
                    trend: "positive",
                    backgroundColor: "#344698",
                    lineColor: "#344698",
                    variant: "variant1",
                  }}
                  isMobile={isMobile}
                />

                <MetricCard
                  label="[Metric]"
                  value="391"
                  trend={{
                    direction: "up",
                    percentage: "100%",
                  }}
                  chart={{
                    trend: "positive",
                    backgroundColor: "#344698",
                    lineColor: "#344698",
                    variant: "variant2",
                  }}
                  isMobile={isMobile}
                />

                <MetricCard
                  label="[Metric]"
                  value="482"
                  trend={{
                    direction: "down",
                    percentage: "50%",
                  }}
                  chart={{
                    trend: "positive",
                    backgroundColor: "#344698",
                    lineColor: "#344698",
                    variant: "variant3",
                  }}
                  isMobile={isMobile}
                />
              </div>
            </div>

            {/* Widgets Section */}
            <div
              style={{
                display: "flex",
                padding: isMobile ? "0px 16px" : "0px 32px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  ...(isMobile
                    ? {
                        flexDirection: "column",
                        gap: "16px",
                        alignSelf: "stretch",
                      }
                    : {
                        // Flexible row layout that keeps widgets side by side and adapts to their sizes
                        flexDirection: "row",
                        gap: "16px",
                        width: "100%",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        overflow: "hidden", // Prevent widgets from overflowing container
                        minWidth: 0, // Allow flex items to shrink below their natural size
                      }),
                }}
              >
                {widgetOrder.map((widgetId, index) => {
                  if (widgetId === "latest-reports") {
                    return (
                      <LatestReportsWidget
                        key={`${widgetId}-${currentDashboardView}`}
                        id={widgetId}
                        position={index}
                        size={widgetSizes[widgetId]}
                        onResize={handleWidgetResize}
                        isMobile={isMobile}
                        isTablet={!isMobile && !isDesktop}
                        windowWidth={windowWidth}
                      />
                    );
                  }
                  if (widgetId === "turnaround-time") {
                    return (
                      <TurnaroundTimeWidget
                        key={`${widgetId}-${currentDashboardView}`}
                        id={widgetId}
                        position={index}
                        size={widgetSizes[widgetId]}
                        onResize={handleWidgetResize}
                        isMobile={isMobile}
                        isTablet={!isMobile && !isDesktop}
                        windowWidth={windowWidth}
                      />
                    );
                  }
                  return null;
                })}
              </div>

              {/* Second Row - Orders by Status and Assigned Tasks Widgets */}
              <div
                style={{
                  display: "flex",
                  ...(isMobile
                    ? {
                        flexDirection: "column",
                        gap: "16px",
                        alignSelf: "stretch",
                      }
                    : {
                        // Flexible row layout for second row
                        flexDirection: "row",
                        gap: "16px",
                        width: "100%",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        overflow: "hidden",
                        minWidth: 0,
                      }),
                }}
              >
                {secondRowWidgets.map((widgetId, index) => {
                  if (widgetId === "orders-by-status") {
                    return (
                      <OrdersByStatusWidget
                        key={`${widgetId}-${currentDashboardView}`}
                        id={widgetId}
                        position={index + widgetOrder.length}
                        size={widgetSizes[widgetId]}
                        onResize={handleWidgetResize}
                        isMobile={isMobile}
                        isTablet={!isMobile && !isDesktop}
                        windowWidth={windowWidth}
                      />
                    );
                  }
                  if (widgetId === "assigned-tasks") {
                    return (
                      <AssignedTasksWidget
                        key={`${widgetId}-${currentDashboardView}`}
                        id={widgetId}
                        position={index + widgetOrder.length}
                        size={widgetSizes[widgetId]}
                        onResize={handleWidgetResize}
                        isMobile={isMobile}
                        isTablet={!isMobile && !isDesktop}
                        windowWidth={windowWidth}
                      />
                    );
                  }
                  return null;
                })}
              </div>

              {/* Third Row - Custom Widgets */}
              {customWidgets.length > 0 && (
                <div
                  ref={customWidgetsRef}
                  style={{
                    display: "flex",
                    ...(isMobile
                      ? {
                          flexDirection: "column",
                          gap: "16px",
                          alignSelf: "stretch",
                        }
                      : {
                          // Flexible row layout for custom widgets
                          flexDirection: "row",
                          gap: "16px",
                          width: "100%",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          overflow: "hidden",
                          minWidth: 0,
                        }),
                  }}
                >
                  {customWidgets.map((widgetId, index) => (
                    <BasicWidget
                      key={widgetId}
                      id={widgetId}
                      position={
                        index + widgetOrder.length + secondRowWidgets.length
                      }
                      size={widgetSizes[widgetId]}
                      onResize={handleWidgetResize}
                      onRemove={handleRemoveCustomWidget}
                      isMobile={isMobile}
                      isTablet={!isMobile && !isDesktop}
                      windowWidth={windowWidth}
                      widgetType={
                        customWidgetTypes[widgetId] as
                          | "chart"
                          | "stats"
                          | "activity"
                          | "notes"
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customize Drawer */}
      <CustomizeDrawer
        isOpen={customizeDrawerOpen}
        onClose={() => setCustomizeDrawerOpen(false)}
        onAddWidget={handleAddCustomWidget}
        shortcutsCount={shortcuts.length}
        onOpenShortcuts={handleOpenShortcutModal}
        customWidgetCount={customWidgets.length}
      />

      {/* Add Shortcut Modal */}
      <AddShortcutModal
        isOpen={addShortcutModalOpen}
        onClose={handleCloseAddShortcutModal}
        onShortcutSelect={handleShortcutSelect}
        onShortcutRemove={handleRemoveShortcut}
        onCustomShortcutCreate={handleCustomShortcutCreate}
        onSavedCustomShortcutDelete={handleSavedCustomShortcutDelete}
        selectedShortcuts={shortcuts}
        savedCustomShortcuts={savedCustomShortcuts}
      />
      <Toaster />

      {/* Date Picker Calendar - Desktop uses DesktopCalendar, Mobile/Tablet uses DatePickerCalendar */}
      {isDesktop ? (
        <DesktopCalendar
          isOpen={datePickerOpen}
          onClose={() => setDatePickerOpen(false)}
          triggerRef={dateButtonRef}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onDateChange={handleDateChange}
        />
      ) : (
        <DatePickerCalendar
          isOpen={datePickerOpen}
          onClose={() => setDatePickerOpen(false)}
          triggerRef={dateButtonRef}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onDateChange={handleDateChange}
        />
      )}
    </DragDropProvider>
  );
}
