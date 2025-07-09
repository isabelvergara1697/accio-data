import { useState } from "react";
import {
  Search,
  Plus,
  Bell,
  ChevronDown,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function Index() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex relative"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? "w-16" : "w-74"
        } transition-all duration-300 flex flex-col fixed lg:fixed z-50 ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          width: "296px",
          padding: "8px 0 24px 8px",
          height: "calc(100vh - 24px)",
          top: 0,
          left: 0,
        }}
      >
        <div
          className="flex-1 flex flex-col justify-between bg-white rounded-xl"
          style={{
            border: "1px solid #E9EAEB",
            boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
          }}
        >
          <div className="flex-1 flex flex-col">
            {/* Logo */}
            <div className="px-5 pt-5 pb-5">
              <div className="flex items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/876fe16651091c38ad5eb9e1c4c54f44055b43e1?width=274"
                  alt="Acio Data Logo"
                  className="h-6 w-auto"
                  style={{ height: "24px", width: "137px" }}
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4">
              <ul className="space-y-1">
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-md font-semibold text-sm"
                    style={{ backgroundColor: "#ECEEF9", color: "#273572" }}
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.97756 13.0829V14.8273M10.4663 9.59414V14.8273M13.9551 6.10536V14.8273M6.80312 18.3161H14.1296C15.595 18.3161 16.3277 18.3161 16.8874 18.0309C17.3798 17.7801 17.7801 17.3798 18.0309 16.8874C18.3161 16.3277 18.3161 15.595 18.3161 14.1296V6.80312C18.3161 5.33769 18.3161 4.60498 18.0309 4.04526C17.7801 3.55292 17.3798 3.15263 16.8874 2.90177C16.3277 2.61658 15.595 2.61658 14.1296 2.61658H6.80312C5.33769 2.61658 4.60498 2.61658 4.04526 2.90177C3.55292 3.15263 3.15263 3.55292 2.90177 4.04526C2.61658 4.60498 2.61658 5.33769 2.61658 6.80312V14.1296C2.61658 15.595 2.61658 16.3277 2.90177 16.8874C3.15263 17.3798 3.55292 17.7801 4.04526 18.0309C4.60498 18.3161 5.33769 18.3161 6.80312 18.3161Z"
                        stroke="#344698"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {!sidebarCollapsed && <span>Dashboard</span>}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-md font-semibold text-sm hover:bg-gray-50 transition-colors"
                    style={{ color: "#414651" }}
                  >
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.8333 9.26607C15.7668 9.26607 16.2335 9.26607 16.59 9.08442C16.9036 8.92463 17.1586 8.66966 17.3183 8.35606C17.5 7.99954 17.5 7.53283 17.5 6.59941V6.09941C17.5 5.16599 17.5 4.69928 17.3183 4.34276C17.1586 4.02915 16.9036 3.77418 16.59 3.6144C16.2335 3.43274 15.7668 3.43274 14.8333 3.43274L5.16667 3.43274C4.23325 3.43274 3.76654 3.43274 3.41002 3.61439C3.09641 3.77418 2.84144 4.02915 2.68166 4.34275C2.5 4.69927 2.5 5.16598 2.5 6.09941L2.5 6.59941C2.5 7.53283 2.5 7.99954 2.68166 8.35606C2.84144 8.66966 3.09641 8.92463 3.41002 9.08442C3.76654 9.26607 4.23325 9.26607 5.16667 9.26607L14.8333 9.26607Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.8333 18.4327C15.7668 18.4327 16.2335 18.4327 16.59 18.2511C16.9036 18.0913 17.1586 17.8363 17.3183 17.5227C17.5 17.1662 17.5 16.6995 17.5 15.7661V15.2661C17.5 14.3327 17.5 13.8659 17.3183 13.5094C17.1586 13.1958 16.9036 12.9409 16.59 12.7811C16.2335 12.5994 15.7668 12.5994 14.8333 12.5994L5.16667 12.5994C4.23325 12.5994 3.76654 12.5994 3.41002 12.7811C3.09641 12.9408 2.84144 13.1958 2.68166 13.5094C2.5 13.8659 2.5 14.3327 2.5 15.2661L2.5 15.7661C2.5 16.6995 2.5 17.1662 2.68166 17.5227C2.84144 17.8363 3.09641 18.0913 3.41002 18.2511C3.76654 18.4327 4.23325 18.4327 5.16667 18.4327H14.8333Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {!sidebarCollapsed && (
                      <>
                        <span>Tools</span>
                        <ChevronDown
                          className="w-6 h-6 ml-auto"
                          style={{ color: "#A4A7AE" }}
                        />
                      </>
                    )}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-md font-semibold text-sm hover:bg-gray-50 transition-colors"
                    style={{ color: "#414651" }}
                  >
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 8.43274L17.5 8.43274M7.5 3.43274L7.5 18.4327M6.5 3.43274H13.5C14.9001 3.43274 15.6002 3.43274 16.135 3.70522C16.6054 3.94491 16.9878 4.32736 17.2275 4.79776C17.5 5.33254 17.5 6.03261 17.5 7.43274V14.4327C17.5 15.8329 17.5 16.5329 17.2275 17.0677C16.9878 17.5381 16.6054 17.9206 16.135 18.1603C15.6002 18.4327 14.9001 18.4327 13.5 18.4327H6.5C5.09987 18.4327 4.3998 18.4327 3.86502 18.1603C3.39462 17.9206 3.01217 17.5381 2.77248 17.0677C2.5 16.5329 2.5 15.8329 2.5 14.4327V7.43274C2.5 6.03261 2.5 5.33254 2.77248 4.79776C3.01217 4.32736 3.39462 3.94491 3.86502 3.70522C4.3998 3.43274 5.09987 3.43274 6.5 3.43274Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {!sidebarCollapsed && (
                      <>
                        <span>Screening</span>
                        <div className="ml-auto flex items-center gap-2">
                          <div
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: "#FAFAFA",
                              color: "#414651",
                              border: "1px solid #E9EAEB",
                            }}
                          >
                            8
                          </div>
                          <ChevronDown
                            className="w-6 h-6"
                            style={{ color: "#A4A7AE" }}
                          />
                        </div>
                      </>
                    )}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-md font-semibold text-sm hover:bg-gray-50 transition-colors"
                    style={{ color: "#414651" }}
                  >
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8334 6.76607L9.90374 4.90684C9.63619 4.37174 9.50241 4.10418 9.30283 3.90871C9.12634 3.73585 8.91362 3.60438 8.68008 3.52383C8.41599 3.43274 8.11686 3.43274 7.5186 3.43274H4.33335C3.39993 3.43274 2.93322 3.43274 2.5767 3.6144C2.2631 3.77418 2.00813 4.02915 1.84834 4.34276C1.66669 4.69927 1.66669 5.16599 1.66669 6.09941V6.76607M1.66669 6.76607H14.3334C15.7335 6.76607 16.4336 6.76607 16.9683 7.03856C17.4387 7.27824 17.8212 7.66069 18.0609 8.1311C18.3334 8.66588 18.3334 9.36594 18.3334 10.7661V14.4327C18.3334 15.8329 18.3334 16.5329 18.0609 17.0677C17.8212 17.5381 17.4387 17.9206 16.9683 18.1603C16.4336 18.4327 15.7335 18.4327 14.3334 18.4327H5.66669C4.26656 18.4327 3.56649 18.4327 3.03171 18.1603C2.56131 17.9206 2.17885 17.5381 1.93917 17.0677C1.66669 16.5329 1.66669 15.8329 1.66669 14.4327V6.76607Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {!sidebarCollapsed && (
                      <>
                        <span>Reporting</span>
                        <ChevronDown
                          className="w-6 h-6 ml-auto"
                          style={{ color: "#A4A7AE" }}
                        />
                      </>
                    )}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-md font-semibold text-sm hover:bg-gray-50 transition-colors"
                    style={{ color: "#414651" }}
                  >
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 12.5994V9.68274M10 6.76607H10.0083M8.25 16.9327L9.46667 18.555C9.6476 18.7962 9.73807 18.9168 9.84897 18.96C9.94611 18.9977 10.0539 18.9977 10.151 18.96C10.2619 18.9168 10.3524 18.7962 10.5333 18.555L11.75 16.9327C11.9943 16.607 12.1164 16.4442 12.2654 16.3198C12.4641 16.154 12.6986 16.0368 12.9504 15.9773C13.1393 15.9327 13.3429 15.9327 13.75 15.9327C14.9149 15.9327 15.4973 15.9327 15.9567 15.7424C16.5693 15.4887 17.056 15.002 17.3097 14.3894C17.5 13.93 17.5 13.3476 17.5 12.1827V7.43274C17.5 6.03261 17.5 5.33254 17.2275 4.79776C16.9878 4.32736 16.6054 3.94491 16.135 3.70522C15.6002 3.43274 14.9001 3.43274 13.5 3.43274H6.5C5.09987 3.43274 4.3998 3.43274 3.86502 3.70522C3.39462 3.94491 3.01217 4.32736 2.77248 4.79776C2.5 5.33254 2.5 6.03261 2.5 7.43274V12.1827C2.5 13.3476 2.5 13.93 2.6903 14.3894C2.94404 15.002 3.43072 15.4887 4.04329 15.7424C4.50272 15.9327 5.08515 15.9327 6.25 15.9327C6.65715 15.9327 6.86072 15.9327 7.04959 15.9773C7.30141 16.0368 7.53593 16.154 7.73458 16.3198C7.88357 16.4442 8.00571 16.607 8.25 16.9327Z"
                        stroke="#A4A7AE"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {!sidebarCollapsed && (
                      <>
                        <span>Support & Resources</span>
                        <ChevronDown
                          className="w-6 h-6 ml-auto"
                          style={{ color: "#A4A7AE" }}
                        />
                      </>
                    )}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-0">
        {/* Mobile Header Bar */}
        <div className="lg:hidden bg-background border-b border-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <div className="w-5 h-5 flex flex-col justify-between">
              <div className="w-full h-0.5 bg-foreground"></div>
              <div className="w-full h-0.5 bg-foreground"></div>
              <div className="w-full h-0.5 bg-foreground"></div>
            </div>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="font-semibold text-lg text-foreground">
              Acio Data
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-foreground" />
            </button>
            <div className="w-8 h-8 bg-primary rounded-full"></div>
          </div>
        </div>
        {/* Header */}
        <header
          className="px-8 py-4 hidden lg:flex"
          style={{
            background:
              "linear-gradient(180deg, #FAFAFA 43.75%, rgba(255, 255, 255, 0.00) 100%)",
            height: "72px",
            border: "1px none rgb(233, 234, 235)",
          }}
        >
          <div className="flex items-center justify-between w-full">
            {/* Search */}
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <svg
                  className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-6 h-6"
                  style={{ color: "#A4A7AE" }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
                    stroke="#A4A7AE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-11 pr-16 py-2.5 w-full bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  style={{
                    border: "1px solid #D5D7DA",
                    boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                    color: "#717680",
                  }}
                />
                <div
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs"
                  style={{ color: "#717680", border: "1px solid #E9EAEB" }}
                >
                  ⌘K
                </div>
              </div>
            </div>

            {/* Center Buttons */}
            <div className="flex items-center gap-5">
              <button
                className="flex items-center gap-1 px-3 py-3 rounded-lg font-semibold text-sm text-white"
                style={{
                  background: "#344698",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  boxShadow:
                    "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                }}
              >
                <span style={{ padding: "0 2px" }}>Quick Create</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99996 6.66663V13.3333M6.66663 9.99996H13.3333M18.3333 9.99996C18.3333 14.6023 14.6023 18.3333 9.99996 18.3333C5.39759 18.3333 1.66663 14.6023 1.66663 9.99996C1.66663 5.39759 5.39759 1.66663 9.99996 1.66663C14.6023 1.66663 18.3333 5.39759 18.3333 9.99996Z"
                    stroke="#8D9BD8"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className="w-px h-10"
                style={{ background: "#E9EAEB" }}
              ></div>

              <div className="flex items-center gap-3">
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  style={{ width: "40px" }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.35419 21C10.0593 21.6224 10.9856 22 12 22C13.0145 22 13.9407 21.6224 14.6458 21M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z"
                      stroke="#A4A7AE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  className="flex items-center gap-2 p-2 rounded-xl"
                  style={{ width: "200px" }}
                >
                  <div
                    className="w-10 h-10 rounded-full"
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.10)",
                      background:
                        "url(https://cdn.builder.io/api/v1/image/assets%2F12e25815771d451cabe0d7bd4c9ecb10%2F754e82e5620a450f95d1173ecb4f8ae5?format=webp&width=800) lightgray 50% / cover no-repeat",
                    }}
                  ></div>
                  <div className="flex flex-col">
                    <div
                      className="font-semibold text-sm"
                      style={{
                        color: "#181D27",
                        fontFamily: "Public Sans",
                        lineHeight: "20px",
                      }}
                    >
                      Alexandra Fitzwilliam
                    </div>
                    <div
                      className="text-sm"
                      style={{
                        color: "#535862",
                        fontFamily: "Public Sans",
                        lineHeight: "20px",
                      }}
                    >
                      [User Role]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-4 sm:p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              View recent activity, task progress, and key data to stay informed
              and organized
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-6">
              <button className="px-3 sm:px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm sm:text-base">
                Customize
              </button>
              <button className="px-3 sm:px-4 py-2 bg-background border border-input text-foreground rounded-lg font-medium hover:bg-accent transition-colors flex items-center gap-2 text-sm sm:text-base">
                Default
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="text-xs sm:text-sm text-muted-foreground bg-muted px-2 sm:px-3 py-2 rounded-lg">
                <span className="hidden sm:inline">
                  Jan 10, 2025 – Jan 16, 2025
                </span>
                <span className="sm:hidden">Jan 10 – 16, 2025</span>
              </div>
            </div>
          </div>

          {/* Quick Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Metric Card 1 */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    [Metric]
                  </span>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">347</span>
                  <div className="flex items-center gap-1 text-success">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+100%</span>
                  </div>
                </div>
                <div className="mt-3 h-8 bg-muted rounded flex items-end gap-1 px-2">
                  <div className="w-2 bg-chart-1 h-2 rounded-sm"></div>
                  <div className="w-2 bg-chart-1 h-4 rounded-sm"></div>
                  <div className="w-2 bg-chart-1 h-3 rounded-sm"></div>
                  <div className="w-2 bg-chart-1 h-6 rounded-sm"></div>
                  <div className="w-2 bg-chart-1 h-5 rounded-sm"></div>
                </div>
              </div>

              {/* Metric Card 2 */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    [Metric]
                  </span>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">482</span>
                  <div className="flex items-center gap-1 text-destructive">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm font-medium">-50%</span>
                  </div>
                </div>
                <div className="mt-3 h-8 bg-muted rounded flex items-end gap-1 px-2">
                  <div className="w-2 bg-chart-2 h-6 rounded-sm"></div>
                  <div className="w-2 bg-chart-2 h-4 rounded-sm"></div>
                  <div className="w-2 bg-chart-2 h-3 rounded-sm"></div>
                  <div className="w-2 bg-chart-2 h-2 rounded-sm"></div>
                  <div className="w-2 bg-chart-2 h-3 rounded-sm"></div>
                </div>
              </div>

              {/* Metric Card 3 */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    [Metric]
                  </span>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">391</span>
                  <div className="flex items-center gap-1 text-success">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+100%</span>
                  </div>
                </div>
                <div className="mt-3 h-8 bg-muted rounded flex items-end gap-1 px-2">
                  <div className="w-2 bg-chart-3 h-3 rounded-sm"></div>
                  <div className="w-2 bg-chart-3 h-5 rounded-sm"></div>
                  <div className="w-2 bg-chart-3 h-4 rounded-sm"></div>
                  <div className="w-2 bg-chart-3 h-6 rounded-sm"></div>
                  <div className="w-2 bg-chart-3 h-5 rounded-sm"></div>
                </div>
              </div>

              {/* Metric Card 4 */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    [Metric]
                  </span>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">482</span>
                  <div className="flex items-center gap-1 text-destructive">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm font-medium">-50%</span>
                  </div>
                </div>
                <div className="mt-3 h-8 bg-muted rounded flex items-end gap-1 px-2">
                  <div className="w-2 bg-chart-4 h-5 rounded-sm"></div>
                  <div className="w-2 bg-chart-4 h-3 rounded-sm"></div>
                  <div className="w-2 bg-chart-4 h-4 rounded-sm"></div>
                  <div className="w-2 bg-chart-4 h-2 rounded-sm"></div>
                  <div className="w-2 bg-chart-4 h-4 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Latest Reports Widget */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Latest Reports</h3>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="hidden sm:grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b border-border">
                    <span>Order</span>
                    <span>Status</span>
                    <span>Requester</span>
                    <span>Progress</span>
                  </div>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="sm:grid sm:grid-cols-4 gap-4 text-sm space-y-2 sm:space-y-0"
                    >
                      <div className="sm:contents">
                        <span className="font-medium block sm:inline">
                          #2024-{String(i).padStart(3, "0")}
                        </span>
                        <span className="text-muted-foreground block sm:inline sm:before:content-[''] before:content-['Status:_'] before:font-medium before:text-foreground">
                          Pending
                        </span>
                        <span className="text-muted-foreground block sm:inline sm:before:content-[''] before:content-['Requester:_'] before:font-medium before:text-foreground">
                          User {i}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-foreground sm:hidden">
                            Progress:
                          </span>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div
                              className={`bg-primary h-2 rounded-full`}
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {Math.floor(Math.random() * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Turnaround Time Widget */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Turnaround Time</h3>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-end justify-between h-32 gap-2">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(
                    (month, i) => (
                      <div
                        key={month}
                        className="flex flex-col items-center gap-2 flex-1"
                      >
                        <div
                          className="bg-chart-1 rounded-t w-full"
                          style={{ height: `${(i + 1) * 15 + 20}px` }}
                        ></div>
                        <span className="text-xs text-muted-foreground">
                          {month}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Orders by Status Widget */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Orders by Status</h3>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-32 h-32 relative">
                    <div className="w-full h-full rounded-full border-8 border-chart-1"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">482</div>
                        <div className="text-xs text-muted-foreground">
                          Total
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 ml-6 space-y-3">
                    {[
                      { label: "Completed", value: 120, color: "bg-chart-1" },
                      { label: "Pending", value: 98, color: "bg-chart-2" },
                      { label: "Updated", value: 87, color: "bg-chart-3" },
                      { label: "Unordered", value: 65, color: "bg-chart-4" },
                      { label: "Reviewed", value: 54, color: "bg-chart-5" },
                      { label: "Archived", value: 58, color: "bg-chart-6" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${item.color}`}
                          ></div>
                          <span>{item.label}</span>
                        </div>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned Tasks Widget */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Assigned Tasks</h3>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      order: "#2024-001",
                      task: "Complete screening documentation for new client onboarding process",
                    },
                    {
                      order: "#2024-002",
                      task: "Review and update compliance procedures for Q1 audit",
                    },
                    {
                      order: "#2024-003",
                      task: "Process background check results and generate final reports",
                    },
                    {
                      order: "#2024-004",
                      task: "Coordinate with legal team on policy updates and implementations",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium text-sm">{item.order}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.task}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
