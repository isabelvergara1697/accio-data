import { ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

type InfoField = {
  label: string;
  value: ReactNode;
  colSpan?: number;
};

type InfoGridProps = {
  fields: InfoField[];
  columns?: 1 | 2 | 3;
  className?: string;
};

type EVerifySectionProps = {
  expanded: boolean;
  onToggle: () => void;
};

const ACTION_BUTTON_CLASS =
  "text-sm font-semibold leading-5 text-[#273572] transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#344698]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const CARD_SHADOW =
  "shadow-[0_0_0_1px_rgba(10,13,18,0.18)_inset,0_-2px_0_0_rgba(10,13,18,0.05)_inset,0_1px_2px_rgba(10,13,18,0.05)]";

function StatusPill({
  variant,
  children,
}: {
  variant: "warning" | "muted";
  children: ReactNode;
}) {
  const variantClasses =
    variant === "warning"
      ? "border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815]"
      : "border-[#E9EAEB] bg-[#FAFAFA] text-[#414651]";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium leading-[18px]",
        variantClasses,
      )}
    >
      {children}
    </span>
  );
}

function IconButton({
  children,
  className,
  "aria-label": ariaLabel,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[#D5D7DA] bg-white",
        CARD_SHADOW,
        "transition hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#344698]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        className,
      )}
    >
      {children}
    </button>
  );
}

function InfoGrid({ fields, columns = 3, className }: InfoGridProps) {
  const columnClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-3";

  return (
    <div className={cn("grid gap-4 sm:gap-5", columnClass, className)}>
      {fields.map((field, index) => (
        <div
          key={`${field.label}-${index}`}
          className={cn(
            "flex flex-col gap-1",
            field.colSpan ? `md:col-span-${field.colSpan}` : undefined,
          )}
        >
          <span className="text-sm font-medium leading-5 text-[#717680]">
            {field.label}
          </span>
          <div className="text-base font-normal leading-6 text-[#181D27]">
            {field.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionDivider() {
  return <div className="h-px w-full bg-[#E9EAEB]" />;
}

const SUMMARY_FIELDS: InfoField[] = [
  { label: "Original ETA", value: "05/15/2025" },
  { label: "Revised ETA", value: "05/15/2025" },
  { label: "Revised ETA Reason", value: "-" },
];

const EMPLOYEE_DATA_FIELDS: InfoField[] = [
  { label: "Hire Date", value: "05/15/2025" },
  { label: "Citizenship Status", value: "A citizen of the United States" },
  {
    label: "Overdue Reason",
    value: (
      <button type="button" className={ACTION_BUTTON_CLASS}>
        Edit
      </button>
    ),
  },
  {
    label: "Add'l Overdue Info",
    value: (
      <button type="button" className={ACTION_BUTTON_CLASS}>
        Edit
      </button>
    ),
  },
  { label: "Document Type", value: "List B and C Documents" },
  { label: "Document Expiration Date", value: "02/02/2026" },
  { label: "I94 Number", value: "-" },
  { label: "Alien Number", value: "-" },
  { label: "Card Number", value: "-" },
  { label: "Visa Number", value: "-" },
  { label: "Passport Number", value: "-" },
  { label: "Country of Issue", value: "-" },
  { label: "List C", value: "Social Security Card" },
  { label: "List B Supporting", value: "Driver's license" },
  { label: "List B Number", value: "10119988" },
  { label: "List B State", value: "TX" },
  {
    label: "List B",
    value:
      "Driver's license or ID card issued by a U.S. state or outlying possession",
    colSpan: 2,
  },
];

const INITIAL_RESPONSE_FIELDS: InfoField[] = [
  { label: "Eligibility Text", value: "-" },
  { label: "Eligibility Details", value: "A citizen of the United States" },
];

const INITIAL_VERIFICATION_FIELDS: InfoField[] = [
  { label: "Case Number", value: "-" },
  { label: "Eligibility Code", value: "-" },
  { label: "Secondary Verification", value: "No" },
  { label: "Last Name", value: "No" },
  { label: "Last Name", value: "-" },
  { label: "Eligibility Text", value: "-" },
  { label: "Eligibility Details", value: "-", colSpan: 3 },
];

const ADDITIONAL_VERIFICATION_FIELDS: InfoField[] = [
  { label: "Initiated Date", value: "-" },
  { label: "Resolve Date", value: "-" },
  { label: "Resolve Code", value: "-" },
  { label: "Eligibility Text", value: "-", colSpan: 2 },
  { label: "Comments", value: "-" },
];

const SSA_REFERRAL_FIELDS: InfoField[] = [
  { label: "Initiated Date", value: "-" },
  { label: "Contact By Date", value: "-" },
  { label: "Due Date", value: "-" },
  { label: "Eligibility Code", value: "-" },
  { label: "Resolve Date", value: "-" },
  { label: "Eligibility Text", value: "-" },
];

const SSA_RESUBMITTAL_PRIMARY_FIELDS: InfoField[] = [
  { label: "Initiated Date", value: "-" },
  { label: "Last Name", value: "-" },
  { label: "Middle Name", value: "-" },
  { label: "First Name", value: "-" },
  { label: "Other Name", value: "-" },
  { label: "DOB", value: "-" },
];

const SSA_RESUBMITTAL_SECONDARY_FIELDS: InfoField[] = [
  { label: "Last Name", value: "-" },
  { label: "First Name", value: "-" },
  { label: "Eligibility Code", value: "-" },
  { label: "Eligibility Text", value: "-", colSpan: 3 },
];

const DHS_REFERRAL_FIELDS: InfoField[] = [
  { label: "Primary Referral", value: "-" },
  { label: "Additional Referral", value: "-" },
  { label: "Contacted By Date", value: "-" },
  { label: "Due Date", value: "-" },
  { label: "Resolve Code", value: "-" },
  { label: "Eligibility Text", value: "-" },
  { label: "Resolve Date", value: "-" },
  { label: "Initiated Date", value: "-" },
  { label: "Resolve Code", value: "-" },
  { label: "Eligibility Text", value: "-", colSpan: 3 },
];

export function EVerifySection({ expanded, onToggle }: EVerifySectionProps) {
  return (
    <section
      id="e-verify"
      className={cn(
        "w-full self-stretch rounded-xl border border-[#E9EAEB] bg-white shadow-sm",
        !expanded && "pb-5",
      )}
    >
      <div className="px-4 pt-5 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:items-center md:flex-nowrap">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3 md:flex-nowrap md:items-center md:gap-4">
            <h2 className="text-lg font-semibold leading-7 text-[#181D27]">
              E-Verify
            </h2>
            <StatusPill variant="warning">Pending</StatusPill>
            <StatusPill variant="muted">1</StatusPill>
          </div>
          <IconButton
            onClick={onToggle}
            aria-label={expanded ? "Collapse E-Verify" : "Expand E-Verify"}
            className="h-9 w-9"
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 text-[#A4A7AE] transition-transform",
                expanded && "rotate-180",
              )}
            />
          </IconButton>
        </div>
      </div>

      {expanded && (
        <div className="space-y-5 px-4 pb-5 pt-3 sm:px-6">
          <div
            className={cn(
              "rounded-xl border border-[#E9EAEB] bg-white px-4 py-4 sm:px-5 sm:py-5",
              CARD_SHADOW,
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-base font-medium leading-6 text-[#181D27]">
                  E-Verify
                </span>
                <StatusPill variant="warning">Pending</StatusPill>
              </div>
              <IconButton
                aria-label="More E-Verify actions"
                className="h-9 w-9"
              >
                <ChevronDown className="h-4 w-4 text-[#A4A7AE]" />
              </IconButton>
            </div>

            <div className="mt-5">
              <InfoGrid fields={SUMMARY_FIELDS} />
            </div>

            <div className="mt-5 space-y-5">
              <SectionDivider />

              <div className="space-y-4">
                <h3 className="text-base font-medium leading-6 text-[#181D27]">
                  Employee Data
                </h3>
                <InfoGrid fields={EMPLOYEE_DATA_FIELDS} />
              </div>

              <SectionDivider />

              <div className="space-y-4">
                <h3 className="text-base font-medium leading-6 text-[#181D27]">
                  Initial Response
                </h3>
                <InfoGrid fields={INITIAL_RESPONSE_FIELDS} columns={2} />
              </div>

              <SectionDivider />

              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 text-sm font-semibold leading-5 text-[#273572] transition hover:underline",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#344698]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                )}
              >
                Case Details
                <ChevronUp className="h-4 w-4 text-[#34479A]" />
              </button>

              <div className="space-y-5 rounded-md bg-[#FAFAFA] p-4 sm:p-5">
                <div className="text-base font-medium leading-6 text-[#181D27]">
                  Case Details
                </div>

                <div className="text-base font-medium leading-6 text-[#181D27]">
                  Response Information
                </div>

                <SectionDivider />

                <div className="space-y-4">
                  <div className="text-base font-medium leading-6 text-[#181D27]">
                    Initial Verification
                  </div>
                  <InfoGrid fields={INITIAL_VERIFICATION_FIELDS} />
                </div>

                <SectionDivider />

                <div className="space-y-4">
                  <div className="text-base font-medium leading-6 text-[#181D27]">
                    Additional Verification
                  </div>
                  <InfoGrid fields={ADDITIONAL_VERIFICATION_FIELDS} />
                </div>

                <SectionDivider />

                <div className="space-y-4">
                  <div className="text-base font-medium leading-6 text-[#181D27]">
                    SSA Referral
                  </div>
                  <InfoGrid fields={SSA_REFERRAL_FIELDS} />
                </div>

                <SectionDivider />

                <div className="space-y-4">
                  <div className="text-base font-medium leading-6 text-[#181D27]">
                    SSA Resubmittal
                  </div>
                  <InfoGrid fields={SSA_RESUBMITTAL_PRIMARY_FIELDS} />
                  <InfoGrid fields={SSA_RESUBMITTAL_SECONDARY_FIELDS} />
                </div>

                <SectionDivider />

                <div className="space-y-4">
                  <div className="text-base font-medium leading-6 text-[#181D27]">
                    DHS Referral
                  </div>
                  <InfoGrid fields={DHS_REFERRAL_FIELDS} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
