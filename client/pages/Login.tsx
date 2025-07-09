import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      return "Please enter your email address.";
    }
    if (!emailRegex.test(emailValue)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const validatePassword = (passwordValue: string) => {
    if (!passwordValue) {
      return "Please enter your password.";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (hasAttemptedSubmit) {
      setEmailError(validateEmail(value));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (hasAttemptedSubmit) {
      setPasswordError(validatePassword(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (!emailErr && !passwordErr) {
      // Valid credentials, redirect to dashboard
      navigate("/dashboard");
    }
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log("Google sign in clicked");
  };

  const handleSignUp = () => {
    // Handle sign up navigation
    console.log("Sign up clicked");
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log("Forgot password clicked");
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        minHeight: "100vh",
        padding: "96px 0px 48px 0px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
        background: "linear-gradient(90deg, #F7F8FD 0%, #D9DEF2 100%)",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "460px",
          padding: "0px 32px",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "32px 40px",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            borderRadius: "16px",
            background: "#FFF",
            boxShadow:
              "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            position: "relative",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                width: "208.5px",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "208.5px",
                  height: "48px",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/65d5334313478562412cafc5ec1cd27f229c04a3?width=412"
                  style={{
                    width: "206px",
                    height: "36px",
                    flexShrink: 0,
                    fill: "#34479A",
                    position: "absolute",
                    left: "1px",
                    top: "6px",
                  }}
                  alt="Acio Data Logo"
                />
              </div>
            </div>

            {/* Header Text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#181D27",
                  textAlign: "center",
                  fontFamily: "Public Sans",
                  fontSize: "30px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "38px",
                  position: "relative",
                }}
              >
                Welcome Back
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#535862",
                  textAlign: "center",
                  fontFamily: "Public Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "24px",
                  position: "relative",
                }}
              >
                Welcome back! Please enter your details.
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              alignSelf: "stretch",
              borderRadius: "12px",
              position: "relative",
            }}
          >
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              {/* Email Field */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "2px",
                      position: "relative",
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
                        position: "relative",
                      }}
                    >
                      Email
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "10px 14px",
                      alignItems: "center",
                      gap: "8px",
                      alignSelf: "stretch",
                      borderRadius: "8px",
                      border: emailError
                        ? "1px solid #FDA29B"
                        : focusedField === "email"
                          ? "2px solid #34479A"
                          : "1px solid #D5D7DA",
                      background: "#FFF",
                      boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flex: "1 0 0",
                        position: "relative",
                      }}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          flex: "1 0 0",
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          color: email ? "#181D27" : "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                        placeholder="janedoe@gmail.com"
                      />
                    </div>
                    {emailError && (
                      <svg
                        style={{
                          width: "24px",
                          height: "24px",
                          position: "relative",
                        }}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                          stroke="#F04438"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                {emailError && (
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#D92D20",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    {emailError}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "2px",
                      position: "relative",
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
                        position: "relative",
                      }}
                    >
                      Password
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "10px 14px",
                      alignItems: "center",
                      gap: "8px",
                      alignSelf: "stretch",
                      borderRadius: "8px",
                      border: passwordError
                        ? "1px solid #FDA29B"
                        : focusedField === "password"
                          ? "2px solid #34479A"
                          : "1px solid #D5D7DA",
                      background: "#FFF",
                      boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flex: "1 0 0",
                        position: "relative",
                      }}
                    >
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          flex: "1 0 0",
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          color: password ? "#181D27" : "#717680",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                        placeholder="Your Password"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        display: "flex",
                        padding: "4px",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "6px",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F5F5F5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {showPassword ? (
                        <svg
                          style={{
                            width: "16px",
                            height: "16px",
                            position: "relative",
                          }}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.16196 3.39488C7.4329 3.35482 7.7124 3.33333 8.00028 3.33333C11.4036 3.33333 13.6369 6.33656 14.3871 7.52455C14.4779 7.66833 14.5233 7.74023 14.5488 7.85112C14.5678 7.93439 14.5678 8.06578 14.5487 8.14905C14.5233 8.25993 14.4776 8.3323 14.3861 8.47705C14.1862 8.79343 13.8814 9.23807 13.4777 9.7203M4.48288 4.47669C3.0415 5.45447 2.06297 6.81292 1.61407 7.52352C1.52286 7.66791 1.47725 7.74011 1.45183 7.85099C1.43273 7.93426 1.43272 8.06563 1.45181 8.14891C1.47722 8.25979 1.52262 8.33168 1.61342 8.47545C2.36369 9.66344 4.59694 12.6667 8.00028 12.6667C9.37255 12.6667 10.5546 12.1784 11.5259 11.5177M2.00028 2L14.0003 14M6.58606 6.58579C6.22413 6.94772 6.00028 7.44772 6.00028 8C6.00028 9.10457 6.89571 10 8.00028 10C8.55256 10 9.05256 9.77614 9.41449 9.41421"
                            stroke="#717680"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          style={{
                            width: "16px",
                            height: "16px",
                            position: "relative",
                          }}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.61342 8.47537C1.52262 8.33161 1.47723 8.25973 1.45182 8.14886C1.43273 8.06559 1.43273 7.93425 1.45182 7.85097C1.47723 7.74011 1.52262 7.66823 1.61341 7.52447C2.36369 6.33648 4.59693 3.33325 8.00027 3.33325C11.4036 3.33325 13.6369 6.33648 14.3871 7.52447C14.4779 7.66823 14.5233 7.74011 14.5487 7.85097C14.5678 7.93425 14.5678 8.06559 14.5487 8.14886C14.5233 8.25973 14.4779 8.33161 14.3871 8.47537C13.6369 9.66336 11.4036 12.6666 8.00027 12.6666C4.59693 12.6666 2.36369 9.66336 1.61342 8.47537Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.00027 9.99992C9.10484 9.99992 10.0003 9.10449 10.0003 7.99992C10.0003 6.89535 9.10484 5.99992 8.00027 5.99992C6.8957 5.99992 6.00027 6.89535 6.00027 7.99992C6.00027 9.10449 6.8957 9.99992 8.00027 9.99992Z"
                            stroke="#A4A7AE"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                    {passwordError && (
                      <svg
                        style={{
                          width: "24px",
                          height: "24px",
                          position: "relative",
                        }}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                          stroke="#F04438"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                {passwordError && (
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#D92D20",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    {passwordError}
                  </div>
                )}
              </div>
            </form>

            {/* Remember Me & Forgot Password Row */}
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
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  flex: "1 0 0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    paddingTop: "2px",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "4px",
                      border: rememberMe ? "none" : "1px solid #D5D7DA",
                      background: rememberMe ? "#344698" : "transparent",
                      position: "relative",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => setRememberMe(!rememberMe)}
                  >
                    {rememberMe && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.6668 3.5L5.25016 9.91667L2.3335 7"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    flex: "1 0 0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      position: "relative",
                    }}
                  >
                    Remember for 30 days
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#273572",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Forgot password
                </div>
              </button>
            </div>

            {/* Actions */}
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
              {/* Sign In Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                style={{
                  display: "flex",
                  padding: "12px 16px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.12)",
                  background: "#344698",
                  boxShadow:
                    "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "0px 2px",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#FFF",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "24px",
                      position: "relative",
                    }}
                  >
                    Sign in
                  </div>
                </div>
              </button>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    height: "1px",
                    flex: "1 0 0",
                    background: "#E9EAEB",
                    position: "relative",
                  }}
                ></div>
                <div
                  style={{
                    color: "#535862",
                    textAlign: "center",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  OR
                </div>
                <div
                  style={{
                    height: "1px",
                    flex: "1 0 0",
                    background: "#E9EAEB",
                    position: "relative",
                  }}
                ></div>
              </div>

              {/* Google Sign In Button */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                  alignSelf: "stretch",
                  position: "relative",
                }}
              >
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  style={{
                    display: "flex",
                    padding: "10px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "12px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow:
                      "0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    style={{
                      width: "24px",
                      height: "24px",
                      position: "relative",
                    }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_502_135393)">
                      <path
                        d="M23.7663 12.2765C23.7663 11.4608 23.7001 10.6406 23.559 9.83813H12.2402V14.4591H18.722C18.453 15.9495 17.5888 17.2679 16.3233 18.1056V21.104H20.1903C22.4611 19.014 23.7663 15.9274 23.7663 12.2765Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8626 19.252 12.2444 19.252C9.11376 19.252 6.45934 17.1399 5.50693 14.3003H1.51648V17.3912C3.55359 21.4434 7.70278 24.0008 12.24 24.0008V24.0008Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.50277 14.3002C5.00011 12.8099 5.00011 11.196 5.50277 9.70569V6.61475H1.51674C-0.185266 10.0055 -0.185266 14.0004 1.51674 17.3912L5.50277 14.3002V14.3002Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M12.24 4.74966C13.9508 4.7232 15.6043 5.36697 16.8433 6.54867L20.2694 3.12262C18.1 1.0855 15.2207 -0.034466 12.24 0.000808666C7.70277 0.000808666 3.55359 2.55822 1.51648 6.61481L5.50252 9.70575C6.45052 6.86173 9.10935 4.74966 12.24 4.74966V4.74966Z"
                        fill="#EA4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_502_135393">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div
                    style={{
                      color: "#414651",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "24px",
                      position: "relative",
                    }}
                  >
                    Sign in with Google
                  </div>
                </button>
              </div>
            </div>

            {/* Sign Up Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                gap: "4px",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  color: "#535862",
                  fontFamily: "Public Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                  position: "relative",
                }}
              >
                Don't have an account?
              </div>
              <button
                type="button"
                onClick={handleSignUp}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#273572",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px",
                    position: "relative",
                  }}
                >
                  Sign up
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
