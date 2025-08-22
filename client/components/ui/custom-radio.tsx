import * as React from "react";

interface CustomRadioProps {
  value: string;
  name?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const CustomRadio = React.forwardRef<HTMLInputElement, CustomRadioProps>(
  ({ value, name = "", checked = false, onChange, children, className = "", ...props }, ref) => {
    // Debug: log the checked state
    if (value === "permanent_resident") {
      console.log(`CustomRadio ${value}: checked=${checked}, name=${name}`);
    }

    const handleChange = (newValue: string) => {
      if (onChange && typeof onChange === "function") {
        onChange(newValue);
      }
    };

    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "8px",
          alignSelf: "stretch",
        }}
        className={className}
      >
        <div
          style={{
            display: "flex",
            paddingTop: "2px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label
            style={{
              position: "relative",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              ref={ref}
              type="radio"
              name={name}
              value={value}
              checked={checked}
              onChange={(e) => handleChange(e.target.value)}
              style={{
                position: "absolute",
                opacity: 0,
                width: 0,
                height: 0,
              }}
              {...props}
            />
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                border: checked ? "none" : "1px solid #D5D7DA",
                background: checked ? "#344698" : "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                transition: "all 0.2s ease",
              }}
            >
              {checked && (
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#FFF",
                  }}
                />
              )}
            </div>
          </label>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: "1 0 0",
          }}
        >
          <label
            style={{
              color: "var(--colors-text-text-secondary-700, #414651)",
              fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
              fontSize: "var(--Font-size-text-sm, 14px)",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "var(--Line-height-text-sm, 20px)",
              cursor: "pointer",
            }}
            onClick={() => handleChange(value)}
          >
            {children}
          </label>
        </div>
      </div>
    );
  }
);

CustomRadio.displayName = "CustomRadio";

interface CustomRadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  name: string;
  children: React.ReactNode;
  className?: string;
}

const CustomRadioGroup = React.forwardRef<HTMLDivElement, CustomRadioGroupProps>(
  ({ value, onValueChange, name, children, className = "", ...props }, ref) => {
    const handleValueChange = (newValue: string) => {
      if (onValueChange && typeof onValueChange === "function") {
        onValueChange(newValue);
      }
    };

    return (
      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "8px",
          alignSelf: "stretch",
        }}
        className={className}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === CustomRadio) {
            return React.cloneElement(child as React.ReactElement<CustomRadioProps>, {
              ...child.props,
              name,
              checked: child.props.value === value,
              onChange: handleValueChange,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

CustomRadioGroup.displayName = "CustomRadioGroup";

export { CustomRadio, CustomRadioGroup };
