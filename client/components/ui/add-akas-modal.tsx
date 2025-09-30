import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { User, X } from "lucide-react";

import { Checkbox } from "./checkbox";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Button } from "./button";

export interface AkaEntry {
  id: string;
  first: string;
  middle: string;
  noMiddleName: boolean;
  last: string;
  suffix: string;
  nameType: string;
}

export interface AddAkasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (akas: AkaEntry[]) => void;
  initialAkas?: AkaEntry[];
}

const DEFAULT_AKA_FIELDS: Omit<AkaEntry, "id"> = {
  first: "",
  middle: "",
  noMiddleName: false,
  last: "",
  suffix: "",
  nameType: "Current",
};

const NAME_TYPE_OPTIONS = [
  { value: "Current", label: "Current" },
  { value: "Previous", label: "Previous" },
  { value: "Alias", label: "Alias" },
  { value: "Maiden", label: "Maiden" },
  { value: "Nickname", label: "Nickname" },
];

const OTHER_IDENTIFIED_AKAS = [
  { id: "john-bod", name: "John Bod", lastSeen: "06/01/2001" },
  { id: "johnny-b", name: "Johnny B", lastSeen: "06/01/2001" },
  { id: "johnny-b-sr", name: "Johnny B Bad Sr.", lastSeen: "06/01/2001" },
];

const REQUIRED_ROW_COUNT = 10;
let uniqueIdCounter = 0;

const generateAkaId = () => {
  uniqueIdCounter += 1;
  return `aka-${Date.now()}-${uniqueIdCounter}`;
};

const ensureRowStructure = (rows: AkaEntry[]): AkaEntry[] => {
  const filled = [...rows];
  while (filled.length < REQUIRED_ROW_COUNT) {
    filled.push({ id: generateAkaId(), ...DEFAULT_AKA_FIELDS });
  }
  return filled;
};

const panelColumns = [
  { key: "first", label: "First" },
  { key: "middle", label: "Middle" },
  { key: "noMiddleName", label: "No Middle Name" },
  { key: "last", label: "Last" },
  { key: "suffix", label: "Suffix" },
  { key: "nameType", label: "Name Type" },
] as const;

type PanelColumnKey = (typeof panelColumns)[number]["key"];

export default function AddAkasModal({
  isOpen,
  onClose,
  onSave,
  initialAkas = [],
}: AddAkasModalProps) {
  const [akas, setAkas] = useState<AkaEntry[]>(() =>
    ensureRowStructure(initialAkas.length ? initialAkas : []),
  );
  const [selectedOtherAkas, setSelectedOtherAkas] = useState<
    Record<string, boolean>
  >({});

  // Reset panel content when it opens or initial data changes
  useEffect(() => {
    if (isOpen) {
      setAkas(ensureRowStructure(initialAkas.length ? initialAkas : []));
      const resetSelected: Record<string, boolean> = {};
      OTHER_IDENTIFIED_AKAS.forEach((aka) => {
        resetSelected[aka.id] = false;
      });
      setSelectedOtherAkas(resetSelected);
    }
  }, [initialAkas, isOpen]);

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    return undefined;
  }, [isOpen]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleAkaFieldChange = (
    id: string,
    field: Exclude<PanelColumnKey, "noMiddleName">,
    value: string,
  ) => {
    setAkas((prev) =>
      prev.map((aka) => (aka.id === id ? { ...aka, [field]: value } : aka)),
    );
  };

  const handleNoMiddleNameToggle = (id: string, checked: boolean) => {
    setAkas((prev) =>
      prev.map((aka) =>
        aka.id === id
          ? {
              ...aka,
              noMiddleName: checked,
              middle: checked ? "" : aka.middle,
            }
          : aka,
      ),
    );
  };

  const handleSave = () => {
    const sanitized = akas.filter(
      (aka) => aka.first.trim() !== "" || aka.last.trim() !== "",
    );
    onSave(sanitized);
    onClose();
  };

  const tableHeader = (
    <div
      className="grid items-center border-b border-[#E9EAEB] bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#717680]"
      style={{
        gridTemplateColumns:
          "minmax(110px, 1fr) minmax(110px, 1fr) 130px minmax(120px, 1fr) minmax(100px, 1fr) minmax(130px, 1fr)",
      }}
    >
      {panelColumns.map((column) => (
        <span key={column.key} className="truncate">
          {column.label}
        </span>
      ))}
    </div>
  );

  const tableRows = (
    <div className="divide-y divide-[#E9EAEB]">
      {akas.map((aka) => (
        <div
          key={aka.id}
          className="grid items-center px-4 py-3 transition-colors hover:bg-[#F5F7FB]"
          style={{
            gridTemplateColumns:
              "minmax(110px, 1fr) minmax(110px, 1fr) 130px minmax(120px, 1fr) minmax(100px, 1fr) minmax(130px, 1fr)",
          }}
        >
          <div className="pr-3">
            <Input
              value={aka.first}
              onChange={(event) =>
                handleAkaFieldChange(aka.id, "first", event.target.value)
              }
              className="h-9 rounded-lg border border-[#D5D7DA] bg-white px-3 text-sm text-[#181D27] placeholder:text-[#B5B8BE] focus:border-[#344698] focus:ring-[#344698]"
            />
          </div>
          <div className="pr-3">
            <Input
              value={aka.middle}
              onChange={(event) =>
                handleAkaFieldChange(aka.id, "middle", event.target.value)
              }
              disabled={aka.noMiddleName}
              className="h-9 rounded-lg border border-[#D5D7DA] bg-white px-3 text-sm text-[#181D27] placeholder:text-[#B5B8BE] focus:border-[#344698] focus:ring-[#344698] disabled:cursor-not-allowed disabled:bg-[#F6F6F7]"
            />
          </div>
          <div className="flex items-center justify-center">
            <Checkbox
              checked={aka.noMiddleName}
              onCheckedChange={(checked) =>
                handleNoMiddleNameToggle(aka.id, checked === true)
              }
              className="h-4 w-4 border-[#D5D7DA]"
            />
          </div>
          <div className="pr-3">
            <Input
              value={aka.last}
              onChange={(event) =>
                handleAkaFieldChange(aka.id, "last", event.target.value)
              }
              className="h-9 rounded-lg border border-[#D5D7DA] bg-white px-3 text-sm text-[#181D27] placeholder:text-[#B5B8BE] focus:border-[#344698] focus:ring-[#344698]"
            />
          </div>
          <div className="pr-3">
            <Input
              value={aka.suffix}
              onChange={(event) =>
                handleAkaFieldChange(aka.id, "suffix", event.target.value)
              }
              className="h-9 rounded-lg border border-[#D5D7DA] bg-white px-3 text-sm text-[#181D27] placeholder:text-[#B5B8BE] focus:border-[#344698] focus:ring-[#344698]"
            />
          </div>
          <div className="pr-3">
            <Select
              value={aka.nameType}
              onValueChange={(value) =>
                handleAkaFieldChange(aka.id, "nameType", value)
              }
            >
              <SelectTrigger className="h-9 w-full rounded-lg border border-[#D5D7DA] px-3 text-sm text-[#181D27] focus:border-[#344698] focus:ring-[#344698]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NAME_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  );

  const panel = (
    <div
      className="fixed inset-0 z-[11000] flex justify-end bg-[#0A0D12]/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="relative flex h-full w-full max-w-[720px] flex-col border-l border-[rgba(0,0,0,0.08)] bg-white shadow-[0_20px_24px_-4px_rgba(10,13,18,0.08),0_8px_8px_-4px_rgba(10,13,18,0.03),0_3px_3px_-1.5px_rgba(10,13,18,0.04)]"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start gap-4 border-b border-[#E9EAEB] px-6 py-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D9DEF2]">
            <User className="h-5 w-5 text-[#344698]" />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <h2 className="text-lg font-semibold text-[#181D27]">Add AKAs</h2>
            <p className="text-sm text-[#535862]">
              Manage and add known aliases for this individual.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#A4A7AE] transition-colors hover:bg-[#F5F6F7]"
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="rounded-xl border border-[#E9EAEB] bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
              {tableHeader}
              {tableRows}
            </div>

            <section className="mt-8">
              <h3 className="text-base font-semibold text-[#181D27]">
                Other Identified AKA's
              </h3>
              <div className="mt-3 space-y-3">
                {OTHER_IDENTIFIED_AKAS.map((otherAka) => (
                  <label
                    key={otherAka.id}
                    className="flex cursor-pointer items-start justify-between rounded-lg border border-transparent px-3 py-2 transition-colors hover:border-[#D5D7DA] hover:bg-[#F8F9FD]"
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedOtherAkas[otherAka.id] ?? false}
                        onCheckedChange={(checked) =>
                          setSelectedOtherAkas((prev) => ({
                            ...prev,
                            [otherAka.id]: checked === true,
                          }))
                        }
                        className="mt-1 h-4 w-4 border-[#D5D7DA]"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-[#181D27]">
                          {otherAka.name}
                        </span>
                        <span className="text-sm text-[#535862]">
                          Last Seen: {otherAka.lastSeen}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <footer className="flex items-center justify-end gap-3 border-t border-[#E9EAEB] px-6 py-5">
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-lg border-[#D5D7DA] px-5 text-sm font-semibold text-[#414651] hover:bg-[#F5F6F7]"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="h-10 rounded-lg bg-[#344698] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#273572]"
              onClick={handleSave}
            >
              Add AKAs
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );

  if (!isOpen) {
    return null;
  }

  return createPortal(panel, document.body);
}
