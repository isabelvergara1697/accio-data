import React from "react";
import { Button } from "./button";

interface CustomShortcutFormProps {
  formData: {
    name: string;
    url: string;
    selectedIcon: string;
  };
  formErrors: {
    name?: string;
    url?: string;
  };
  onFormDataChange: (data: { name: string; url: string; selectedIcon: string }) => void;
  onFormErrorsChange: (errors: { name?: string; url?: string }) => void;
  onSubmit: () => void;
}

export default function CustomShortcutForm({
  formData,
  formErrors,
  onFormDataChange,
  onFormErrorsChange,
  onSubmit,
}: CustomShortcutFormProps) {
  const iconOptions = [
    { id: 'folder', name: 'Folder', svg: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.8327 5.83333L9.90306 3.9741C9.63552 3.439 9.50174 3.17144 9.30216 2.97597C9.12567 2.80311 8.91295 2.67164 8.67941 2.59109C8.41532 2.5 8.11619 2.5 7.51793 2.5H4.33268C3.39926 2.5 2.93255 2.5 2.57603 2.68166C2.26243 2.84144 2.00746 3.09641 1.84767 3.41002C1.66602 3.76654 1.66602 4.23325 1.66602 5.16667V5.83333M1.66602 5.83333H14.3327C15.7328 5.83333 16.4329 5.83333 16.9677 6.10582C17.4381 6.3455 17.8205 6.72795 18.0602 7.19836C18.3327 7.73314 18.3327 8.4332 18.3327 9.83333V13.5C18.3327 14.9001 18.3327 15.6002 18.0602 16.135C17.8205 16.6054 17.4381 16.9878 16.9677 17.2275C16.4329 17.5 15.7328 17.5 14.3327 17.5H5.66602C4.26588 17.5 3.56582 17.5 3.03104 17.2275C2.56063 16.9878 2.17818 16.6054 1.9385 16.135C1.66602 15.6002 1.66602 14.9001 1.66602 13.5V5.83333Z" stroke="#344698" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { id: 'document', name: 'Document', svg: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.6673 1.89063V5.33274C11.6673 5.79945 11.6673 6.03281 11.7581 6.21107C11.838 6.36787 11.9655 6.49535 12.1223 6.57525C12.3006 6.66608 12.5339 6.66608 13.0007 6.66608H16.4428M13.334 10.8327H6.66732M13.334 14.166H6.66732M8.33398 7.49935H6.66732M11.6673 1.66602H7.33398C5.93385 1.66602 5.23379 1.66602 4.69901 1.9385C4.2286 2.17818 3.84615 2.56063 3.60647 3.03104C3.33398 3.56582 3.33398 4.26588 3.33398 5.66602V14.3327C3.33398 15.7328 3.33398 16.4329 3.60647 16.9677C3.84615 17.4381 4.2286 17.8205 4.69901 18.0602C5.23379 18.3327 5.93385 18.3327 7.33398 18.3327H12.6673C14.0674 18.3327 14.7675 18.3327 15.3023 18.0602C15.7727 17.8205 16.1552 17.4381 16.3948 16.9677C16.6673 16.4329 16.6673 15.7328 16.6673 14.3327V6.66602L11.6673 1.66602Z" stroke="#414651" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { id: 'link', name: 'Link', svg: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.49935 14.1673H5.83268C3.5315 14.1673 1.66602 12.3018 1.66602 10.0007C1.66602 7.69946 3.5315 5.83398 5.83268 5.83398H7.49935M12.4993 14.1673H14.166C16.4672 14.1673 18.3327 12.3018 18.3327 10.0007C18.3327 7.69946 16.4672 5.83398 14.166 5.83398H12.4993M5.83268 10.0007L14.166 10.0007" stroke="#414651" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { id: 'video', name: 'Video', svg: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3327 7.44216C18.3327 6.93731 18.3327 6.68489 18.2329 6.568C18.1462 6.46658 18.0163 6.41276 17.8833 6.42322C17.7301 6.43528 17.5516 6.61377 17.1946 6.97075L14.166 9.99935L17.1946 13.0279C17.5516 13.3849 17.7301 13.5634 17.8833 13.5755C18.0163 13.5859 18.1462 13.5321 18.2329 13.4307C18.3327 13.3138 18.3327 13.0614 18.3327 12.5565V7.44216Z" stroke="#414651" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.66602 8.16602C1.66602 6.76588 1.66602 6.06582 1.9385 5.53104C2.17818 5.06063 2.56063 4.67818 3.03104 4.4385C3.56582 4.16602 4.26588 4.16602 5.66602 4.16602H10.166C11.5661 4.16602 12.2662 4.16602 12.801 4.4385C13.2714 4.67818 13.6538 5.06063 13.8935 5.53104C14.166 6.06582 14.166 6.76588 14.166 8.16602V11.8327C14.166 13.2328 14.166 13.9329 13.8935 14.4677C13.6538 14.9381 13.2714 15.3205 12.801 15.5602C12.2662 15.8327 11.5661 15.8327 10.166 15.8327H5.66602C4.26588 15.8327 3.56582 15.8327 3.03104 15.5602C2.56063 15.3205 2.17818 14.9381 1.9385 14.4677C1.66602 13.9329 1.66602 13.2328 1.66602 11.8327V8.16602Z" stroke="#414651" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { id: 'image', name: 'Image', svg: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 17.5H5.77614C5.2713 17.5 5.01887 17.5 4.90199 17.4002C4.80056 17.3135 4.74674 17.1836 4.75721 17.0506C4.76927 16.8974 4.94776 16.7189 5.30474 16.3619L12.3905 9.27614C12.7205 8.94613 12.8855 8.78112 13.0758 8.7193C13.2432 8.66492 13.4235 8.66492 13.5908 8.7193C13.7811 8.78112 13.9461 8.94613 14.2761 9.27614L17.5 12.5V13.5M13.5 17.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5M13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5M8.75 7.08333C8.75 8.00381 8.00381 8.75 7.08333 8.75C6.16286 8.75 5.41667 8.00381 5.41667 7.08333C5.41667 6.16286 6.16286 5.41667 7.08333 5.41667C8.00381 5.41667 8.75 6.16286 8.75 7.08333Z" stroke="#414651" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  ];

  return (
    <div
      style={{
        display: "flex",
        padding: "0 24px",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        flex: "1 0 0",
        alignSelf: "stretch",
      }}
    >
      {/* Shortcut Name Input */}
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
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <div
            style={{
              color: "#414651",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
            }}
          >
            Shortcut Name
          </div>
          <div
            style={{
              color: "#344698",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
            }}
          >
            *
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "8px 12px",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
            borderRadius: "8px",
            border: `1px solid ${formErrors.name ? '#F04438' : '#D5D7DA'}`,
            background: "#FFF",
            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
          }}
        >
          <input
            type="text"
            placeholder="e.g Company Report"
            value={formData.name}
            onChange={(e) => {
              onFormDataChange({ ...formData, name: e.target.value });
              if (formErrors.name) {
                onFormErrorsChange({ ...formErrors, name: undefined });
              }
            }}
            style={{
              flex: "1 0 0",
              border: "none",
              outline: "none",
              background: "transparent",
              color: formData.name ? "#181D27" : "#717680",
              fontFamily: "Public Sans",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
            }}
          />
        </div>
        {formErrors.name && (
          <div
            style={{
              color: "#F04438",
              fontFamily: "Public Sans",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
          >
            {formErrors.name}
          </div>
        )}
      </div>

      {/* Website URL Input */}
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
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <div
            style={{
              color: "#414651",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
            }}
          >
            Website URL
          </div>
          <div
            style={{
              color: "#344698",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
            }}
          >
            *
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            alignSelf: "stretch",
            borderRadius: "8px",
            border: `1px solid ${formErrors.url ? '#F04438' : '#D5D7DA'}`,
            background: "#FFF",
            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "8px 12px",
              alignItems: "center",
              borderRadius: "8px 0px 0px 8px",
              color: "#535862",
              fontFamily: "Public Sans",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
            }}
          >
            http://
          </div>
          <input
            type="text"
            placeholder="www.website.com"
            value={formData.url}
            onChange={(e) => {
              onFormDataChange({ ...formData, url: e.target.value });
              if (formErrors.url) {
                onFormErrorsChange({ ...formErrors, url: undefined });
              }
            }}
            style={{
              display: "flex",
              height: "44px",
              padding: "8px 12px",
              alignItems: "center",
              flex: "1 0 0",
              borderRadius: "0px 8px 8px 0px",
              border: "none",
              background: "#FFF",
              fontFamily: "Public Sans",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
              color: formData.url ? "#181D27" : "#717680",
              outline: "none",
            }}
          />
        </div>
        {formErrors.url && (
          <div
            style={{
              color: "#F04438",
              fontFamily: "Public Sans",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
          >
            {formErrors.url}
          </div>
        )}
      </div>

      {/* Icon Selection */}
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
            fontWeight: "500",
            lineHeight: "20px",
          }}
        >
          Icon
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {iconOptions.map((icon) => (
            <div
              key={icon.id}
              onClick={() => onFormDataChange({ ...formData, selectedIcon: icon.id })}
              style={{
                display: "flex",
                padding: "10px",
                alignItems: "center",
                gap: "10px",
                borderRadius: "8px",
                border: `1px solid ${formData.selectedIcon === icon.id ? '#34479A' : '#D5D7DA'}`,
                background: formData.selectedIcon === icon.id ? '#ECEEF9' : '#FFF',
                boxShadow:
                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (formData.selectedIcon !== icon.id) {
                  e.currentTarget.style.background = "#F5F5F5";
                }
              }}
              onMouseLeave={(e) => {
                if (formData.selectedIcon !== icon.id) {
                  e.currentTarget.style.background = "#FFF";
                }
              }}
            >
              {icon.svg}
            </div>
          ))}
        </div>
      </div>

      {/* Create Button */}
      <div
        style={{
          display: "flex",
          padding: "12px",
          justifyContent: "center",
          alignItems: "center",
          gap: "4px",
          alignSelf: "stretch",
          borderRadius: "8px",
          border: "2px solid rgba(255, 255, 255, 0.12)",
          background: "#344698",
          boxShadow:
            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
          cursor: "pointer",
          transition: "background-color 0.2s ease",
        }}
        onClick={onSubmit}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#273572";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#344698";
        }}
      >
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
              color: "#FFF",
              fontFamily: "Public Sans",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "20px",
            }}
          >
            Create Custom Shortcut
          </div>
        </div>
      </div>
    </div>
  );
}
