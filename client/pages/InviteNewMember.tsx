import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export default function InviteNewMember() {
  const navigate = useNavigate();
  const [passwordOption, setPasswordOption] = useState<"auto" | "manual">("auto");
  const [reportViewOption, setReportViewOption] = useState<"own" | "any" | "select">("select");

  return (
    <div style={{ display: "flex", height: "100vh", background: "#FAFAFA" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <Header />
        <div style={{ flex: 1, overflowY: "auto", padding: "0 32px 24px 32px" }}>
          {/* Breadcrumbs */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", paddingTop: "20px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 17.0002H16M11.0177 2.76424L4.23539 8.03937C3.78202 8.39199 3.55534 8.5683 3.39203 8.7891C3.24737 8.98469 3.1396 9.20503 3.07403 9.4393C3 9.70376 3 9.99094 3 10.5653V17.8002C3 18.9203 3 19.4804 3.21799 19.9082C3.40973 20.2845 3.71569 20.5905 4.09202 20.7822C4.51984 21.0002 5.0799 21.0002 6.2 21.0002H17.8C18.9201 21.0002 19.4802 21.0002 19.908 20.7822C20.2843 20.5905 20.5903 20.2845 20.782 19.9082C21 19.4804 21 18.9203 21 17.8002V10.5653C21 9.99094 21 9.70376 20.926 9.4393C20.8604 9.20503 20.7526 8.98469 20.608 8.7891C20.4447 8.5683 20.218 8.39199 19.7646 8.03937L12.9823 2.76424C12.631 2.49099 12.4553 2.35436 12.2613 2.30184C12.0902 2.2555 11.9098 2.2555 11.7387 2.30184C11.5447 2.35436 11.369 2.49099 11.0177 2.76424Z" stroke="#A4A7AE" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="#A4A7AE" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span onClick={() => navigate("/company-settings")} style={{ color: "#717680", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>Company settings</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="#A4A7AE" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ color: "#273572", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 600 }}>Invite New User</span>
          </div>

          {/* Page Header */}
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ color: "#181D27", fontFamily: "Public Sans", fontSize: "24px", fontWeight: 600, lineHeight: "32px", margin: 0 }}>Invite New Member</h1>
            <p style={{ color: "#535862", fontFamily: "Public Sans", fontSize: "16px", fontWeight: 400, lineHeight: "24px", margin: "4px 0 0 0" }}>
              Invite new users to your account, assign roles, and configure access permissions. Fill out the form below to set up user credentials, contact details, and report visibility settings.
            </p>
          </div>

          {/* Access Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "24px", borderRadius: "12px", border: "1px solid #E9EAEB", background: "#FFF", overflow: "hidden" }}>
            <div style={{ padding: "16px 16px 12px 16px", borderBottom: "1px solid #E9EAEB" }}>
              <h2 style={{ color: "#181D27", fontFamily: "Public Sans", fontSize: "18px", fontWeight: 600, lineHeight: "28px", margin: 0 }}>Access</h2>
            </div>
            <div style={{ padding: "12px 16px 40px 16px" }}>
              <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>Email</label>
                  <input type="email" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>User</label>
                  <input type="text" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB", margin: "16px 0" }} />

              <div style={{ marginBottom: "16px" }}>
                <h3 style={{ color: "#181D27", fontFamily: "Public Sans", fontSize: "16px", fontWeight: 500, lineHeight: "24px", margin: "0 0 16px 0" }}>Password</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <label style={{ display: "flex", gap: "8px", cursor: "pointer" }}>
                    <div style={{ display: "flex", paddingTop: "2px" }}>
                      <div style={{ width: "16px", height: "16px", borderRadius: "9999px", border: passwordOption === "auto" ? "5px solid #344698" : "1px solid #D5D7DA", background: passwordOption === "auto" ? "#344698" : "transparent" }} />
                    </div>
                    <div>
                      <div style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Automatically generate a secure 16-character password</div>
                      <div style={{ color: "#535862", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}>It will be emailed to the user</div>
                    </div>
                  </label>
                  <label style={{ display: "flex", gap: "8px", cursor: "pointer" }}>
                    <div style={{ display: "flex", paddingTop: "2px" }}>
                      <div style={{ width: "16px", height: "16px", borderRadius: "9999px", border: passwordOption === "manual" ? "5px solid #344698" : "1px solid #D5D7DA", background: passwordOption === "manual" ? "#344698" : "transparent" }} />
                    </div>
                    <div style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Create password</div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "24px", borderRadius: "12px", border: "1px solid #E9EAEB", background: "#FFF", overflow: "hidden" }}>
            <div style={{ padding: "16px 16px 12px 16px", borderBottom: "1px solid #E9EAEB" }}>
              <h2 style={{ color: "#181D27", fontFamily: "Public Sans", fontSize: "18px", fontWeight: 600, lineHeight: "28px", margin: 0 }}>Basic Information</h2>
            </div>
            <div style={{ padding: "12px 16px 40px 16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>First Name</label>
                  <input type="text" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>Last Name</label>
                  <input type="text" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>Role</label>
                  <input type="text" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>Telephone</label>
                  <input type="tel" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>Fax</label>
                  <input type="tel" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>Secondary Mail</label>
                  <input type="email" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                  <div style={{ color: "#535862", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 400, lineHeight: "20px", marginTop: "4px" }}>Optional. Used only for receiving system alerts or notification emails.</div>
                </div>
                <div>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>Zip</label>
                  <input type="text" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>Address</label>
                  <input type="text" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>State</label>
                  <select style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }}>
                    <option>Select</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>City</label>
                  <select style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }}>
                    <option>Select</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Create User Button */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <button style={{ display: "flex", padding: "12px", justifyContent: "center", alignItems: "center", gap: "4px", borderRadius: "8px", border: "2px solid rgba(255, 255, 255, 0.12)", background: "#344698", boxShadow: "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)", color: "#FFF", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 600, lineHeight: "20px", cursor: "pointer" }}>
              Create User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
