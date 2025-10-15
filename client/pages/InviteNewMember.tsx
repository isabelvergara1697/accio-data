import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Home, ChevronRight, User, XCircle } from "lucide-react";

interface Permission {
  name: string;
  enabled: boolean;
}

export default function InviteNewMember() {
  const navigate = useNavigate();
  const [passwordOption, setPasswordOption] = useState<"auto" | "manual">("auto");
  const [reportViewOption, setReportViewOption] = useState<"own" | "any" | "select">("select");
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([
    { id: 1, name: "[First Name Last Name]" },
    { id: 2, name: "[First Name Last Name]" },
    { id: 3, name: "[First Name Last Name]" },
    { id: 4, name: "[First Name Last Name]" },
  ]);

  const [permissions, setPermissions] = useState<Permission[]>([
    { name: "Olivia Rhye", enabled: true },
    { name: "Olivia Rhye", enabled: true },
    { name: "Ordering Enabled", enabled: false },
    { name: "Partial Reports Viewable", enabled: false },
    { name: "Non-DOT Drug Results Viewable", enabled: false },
    { name: "DOT Drug Results Viewable", enabled: false },
    { name: "View Sub Accounts", enabled: false },
    { name: "View Billing", enabled: false },
    { name: "Can Edit Billing ID Lists", enabled: false },
    { name: "Hide Social Security Number", enabled: false },
    { name: "Hide Date of Birth", enabled: false },
    { name: "Hide Gender", enabled: false },
    { name: "Hide Race", enabled: false },
  ]);

  const togglePermission = (index: number) => {
    if (index < 2) return; // First two are disabled
    const newPermissions = [...permissions];
    newPermissions[index].enabled = !newPermissions[index].enabled;
    setPermissions(newPermissions);
  };

  const removeTeamMember = (id: number) => {
    setSelectedTeamMembers(selectedTeamMembers.filter(m => m.id !== id));
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#FAFAFA" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <Header />
        <div style={{ flex: 1, overflowY: "auto", padding: "0 32px 24px 32px" }}>
          {/* Breadcrumbs */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", paddingTop: "20px" }}>
            <button onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
              <Home size={24} color="#A4A7AE" />
            </button>
            <ChevronRight size={24} color="#A4A7AE" />
            <button onClick={() => navigate("/company-settings")} style={{ color: "#717680", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              Company settings
            </button>
            <ChevronRight size={24} color="#A4A7AE" />
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
          <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "24px", borderRadius: "12px", border: "1px solid #E9EAEB", background: "#FFF", overflow: "hidden" }}>
            <div style={{ padding: "16px 16px 12px 16px" }}>
              <h2 style={{ color: "#181D27", fontFamily: "Public Sans", fontSize: "18px", fontWeight: 600, lineHeight: "28px", margin: 0 }}>Access</h2>
            </div>
            <div style={{ padding: "12px 16px 40px 16px", borderTop: "1px solid #E9EAEB" }}>
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
                  <label style={{ display: "flex", gap: "8px", cursor: "pointer" }} onClick={() => setPasswordOption("auto")}>
                    <div style={{ display: "flex", paddingTop: "2px" }}>
                      <div style={{ width: "16px", height: "16px", borderRadius: "9999px", border: passwordOption === "auto" ? "5px solid #344698" : "1px solid #D5D7DA", background: passwordOption === "auto" ? "#344698" : "transparent" }} />
                    </div>
                    <div>
                      <div style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Automatically generate a secure 16-character password</div>
                      <div style={{ color: "#535862", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}>It will be emailed to the user</div>
                    </div>
                  </label>
                  <label style={{ display: "flex", gap: "8px", cursor: "pointer" }} onClick={() => setPasswordOption("manual")}>
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
          <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "24px", borderRadius: "12px", border: "1px solid #E9EAEB", background: "#FFF", overflow: "hidden" }}>
            <div style={{ padding: "16px 16px 12px 16px" }}>
              <h2 style={{ color: "#181D27", fontFamily: "Public Sans", fontSize: "18px", fontWeight: 600, lineHeight: "28px", margin: 0 }}>Basic Information</h2>
            </div>
            <div style={{ padding: "12px 16px 40px 16px", borderTop: "1px solid #E9EAEB" }}>
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
                <div>
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
                  <select style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "16px", color: "#717680", outline: "none", boxSizing: "border-box", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}>
                    <option>Select</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>City</label>
                  <select style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "16px", color: "#717680", outline: "none", boxSizing: "border-box", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}>
                    <option>Select</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Account Options Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "24px", borderRadius: "12px", border: "1px solid #E9EAEB", background: "#FFF", overflow: "hidden" }}>
            <div style={{ padding: "16px 16px 12px 16px" }}>
              <h2 style={{ color: "#181D27", fontFamily: "Public Sans", fontSize: "18px", fontWeight: 600, lineHeight: "28px", margin: 0 }}>Account Options</h2>
              <div style={{ color: "#535862", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 400, lineHeight: "20px", marginTop: "2px" }}>This configuration will over rule user's permissions and roles</div>
            </div>
            <div style={{ padding: "12px 16px 40px 16px", borderTop: "1px solid #E9EAEB" }}>
              <div style={{ marginBottom: "16px" }}>
                <h3 style={{ color: "#181D27", fontFamily: "Public Sans", fontSize: "16px", fontWeight: 500, lineHeight: "24px", margin: "0 0 8px 0" }}>Permissions</h3>
                <div style={{ display: "flex", gap: "0" }}>
                  <div style={{ flex: 1, borderTop: "1px solid #E9EAEB" }}>
                    <div style={{ padding: "6px 12px", background: "#FFF", borderBottom: "1px solid #E9EAEB" }}>
                      <span style={{ color: "#717680", fontFamily: "Public Sans", fontSize: "12px", fontWeight: 600, lineHeight: "18px" }}>Configuration</span>
                    </div>
                    {permissions.map((permission, index) => (
                      <div key={index} style={{ padding: "12px", borderBottom: "1px solid #E9EAEB", minHeight: index < 2 ? "64px" : "36px", display: "flex", alignItems: "center" }}>
                        <div>
                          <div style={{ color: "#181D27", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>{permission.name}</div>
                          {index < 2 && <div style={{ color: "#535862", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}>Cannot be turned off for admin User ID</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ flex: 1, borderTop: "1px solid #E9EAEB", borderLeft: "1px solid #E9EAEB" }}>
                    <div style={{ padding: "6px 12px", background: "#FFF", borderBottom: "1px solid #E9EAEB", height: "36px" }}></div>
                    {permissions.map((permission, index) => (
                      <div key={index} style={{ padding: "12px", borderBottom: "1px solid #E9EAEB", minHeight: index < 2 ? "64px" : "36px", display: "flex", alignItems: "center" }}>
                        <button
                          onClick={() => togglePermission(index)}
                          disabled={index < 2}
                          style={{
                            display: "flex",
                            width: "36px",
                            height: "20px",
                            padding: "2px",
                            justifyContent: permission.enabled ? "flex-end" : "flex-start",
                            alignItems: "center",
                            borderRadius: "9999px",
                            background: permission.enabled ? "#344698" : "#F5F5F5",
                            border: permission.enabled ? "none" : "1px solid #E9EAEB",
                            cursor: index < 2 ? "not-allowed" : "pointer",
                            transition: "all 0.2s",
                            opacity: index < 2 ? 0.6 : 1,
                          }}
                        >
                          <div style={{ width: "16px", height: "16px", borderRadius: "9999px", background: "#FFF", boxShadow: "0 1px 3px 0 rgba(10, 13, 18, 0.10), 0 1px 2px -1px rgba(10, 13, 18, 0.10)" }} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB", margin: "16px 0" }} />

              <div style={{ marginBottom: "16px" }}>
                <h3 style={{ color: "#181D27", fontFamily: "Public Sans", fontSize: "16px", fontWeight: 500, lineHeight: "24px", margin: "0 0 16px 0" }}>Option to View Other User's Reports</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <label style={{ display: "flex", gap: "8px", cursor: "pointer" }} onClick={() => setReportViewOption("own")}>
                    <div style={{ display: "flex", paddingTop: "2px" }}>
                      <div style={{ width: "16px", height: "16px", borderRadius: "9999px", border: reportViewOption === "own" ? "5px solid #344698" : "1px solid #D5D7DA", background: reportViewOption === "own" ? "#344698" : "transparent" }} />
                    </div>
                    <div style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Only this user's reports</div>
                  </label>
                  <label style={{ display: "flex", gap: "8px", cursor: "pointer" }} onClick={() => setReportViewOption("any")}>
                    <div style={{ display: "flex", paddingTop: "2px" }}>
                      <div style={{ width: "16px", height: "16px", borderRadius: "9999px", border: reportViewOption === "any" ? "5px solid #344698" : "1px solid #D5D7DA", background: reportViewOption === "any" ? "#344698" : "transparent" }} />
                    </div>
                    <div style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Reports ordered by any user in this account</div>
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "12px 8px", borderRadius: "8px", background: "#FAFAFA" }}>
                    <label style={{ display: "flex", gap: "8px", cursor: "pointer" }} onClick={() => setReportViewOption("select")}>
                      <div style={{ display: "flex", paddingTop: "2px" }}>
                        <div style={{ width: "16px", height: "16px", borderRadius: "9999px", border: reportViewOption === "select" ? "5px solid #344698" : "1px solid #D5D7DA", background: reportViewOption === "select" ? "#344698" : "transparent" }} />
                      </div>
                      <div style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Select from existing users</div>
                    </label>
                    
                    <div style={{ height: "1px", background: "#E9EAEB" }} />

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "2px", marginBottom: "6px" }}>
                        <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Select Team Member</label>
                        <span style={{ color: "#344698", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500 }}>*</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "2px" }}>
                          <path d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z" stroke="#A4A7AE" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", maxWidth: "330px" }}>
                        <User size={16} color="#A4A7AE" />
                        <span style={{ flex: 1, color: "#717680", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}>Select Team Member</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6L8 10L12 6" stroke="#A4A7AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      <div style={{ marginTop: "16px" }}>
                        <div style={{ color: "#717680", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 400, lineHeight: "20px", marginBottom: "6px" }}>Visible reports From</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                          {selectedTeamMembers.map(member => (
                            <div key={member.id} style={{ display: "flex", alignItems: "center", gap: "3px", padding: "2px 4px 2px 5px", borderRadius: "6px", border: "1px solid #D5D7DA", background: "#FFF" }}>
                              <div style={{ width: "16px", height: "16px", borderRadius: "9999px", border: "0.667px solid rgba(0, 0, 0, 0.10)", background: "#D6CFB7" }} />
                              <span style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}>{member.name}</span>
                              <button onClick={() => removeTeamMember(member.id)} style={{ display: "flex", padding: "2px", background: "none", border: "none", cursor: "pointer", borderRadius: "3px" }}>
                                <XCircle size={24} color="#A4A7AE" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB", margin: "16px 0" }} />

              <div style={{ marginBottom: "16px" }}>
                <h3 style={{ color: "#181D27", fontFamily: "Public Sans", fontSize: "16px", fontWeight: 500, lineHeight: "24px", margin: "0 0 16px 0" }}>Report Visibility</h3>
                <div style={{ marginBottom: "16px", maxWidth: "358px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "2px", marginBottom: "6px" }}>
                    <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>What Reports Can this User View?</label>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "2px" }}>
                      <path d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z" stroke="#A4A7AE" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <select style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "16px", color: "#717680", outline: "none", boxSizing: "border-box", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23A4A7AE' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}>
                    <option>Select</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "16px" }}>Reports this user can see by adjudication status</label>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <label style={{ display: "flex", gap: "8px", cursor: "pointer" }}>
                      <div style={{ display: "flex", paddingTop: "2px" }}>
                        <div style={{ width: "16px", height: "16px", borderRadius: "4px", border: "1px solid #D5D7DA" }} />
                      </div>
                      <div style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>All</div>
                    </label>
                    <label style={{ display: "flex", gap: "8px", cursor: "pointer" }}>
                      <div style={{ display: "flex", paddingTop: "2px" }}>
                        <div style={{ width: "16px", height: "16px", borderRadius: "4px", border: "1px solid #D5D7DA" }} />
                      </div>
                      <div style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Does not Meet Hiring Requirements</div>
                    </label>
                    <label style={{ display: "flex", gap: "8px", cursor: "pointer" }}>
                      <div style={{ display: "flex", paddingTop: "2px" }}>
                        <div style={{ width: "16px", height: "16px", borderRadius: "4px", border: "1px solid #D5D7DA" }} />
                      </div>
                      <div style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Meet Hiring Requirements</div>
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ height: "1px", background: "#E9EAEB", margin: "16px 0" }} />

              <div>
                <h3 style={{ color: "#181D27", fontFamily: "Public Sans", fontSize: "16px", fontWeight: 500, lineHeight: "24px", margin: "0 0 8px 0" }}>iCIMS Configuration</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>iCIMS Customer ID</label>
                    <input type="text" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>iCIMS User ID</label>
                    <input type="text" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>iCIMS User name</label>
                    <input type="text" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ color: "#414651", fontFamily: "Public Sans", fontSize: "14px", fontWeight: 500, lineHeight: "20px", display: "block", marginBottom: "6px" }}>iCIMS Password</label>
                    <input type="password" style={{ width: "100%", height: "40px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #D5D7DA", background: "#FFF", boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)", fontFamily: "Public Sans", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                  </div>
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
