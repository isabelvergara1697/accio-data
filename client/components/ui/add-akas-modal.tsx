import React, { useState } from "react";
import { User, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
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

const DEFAULT_AKA: Omit<AkaEntry, 'id'> = {
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
  { name: "John Bod", lastSeen: "06/01/2001" },
  { name: "Johnny B", lastSeen: "06/01/2001" },
  { name: "Johnny B Bird Sr.", lastSeen: "06/01/2001" },
];

export function AddAkasModal({ isOpen, onClose, onSave, initialAkas }: AddAkasModalProps) {
  const [akas, setAkas] = useState<AkaEntry[]>(() => {
    if (initialAkas && initialAkas.length > 0) {
      return initialAkas;
    }
    // Initialize with 10 empty rows
    return Array.from({ length: 10 }, (_, index) => ({
      id: `aka-${index + 1}`,
      ...DEFAULT_AKA,
    }));
  });

  const handleAkaChange = (id: string, field: keyof AkaEntry, value: any) => {
    setAkas(prev => prev.map(aka => 
      aka.id === id ? { ...aka, [field]: value } : aka
    ));
  };

  const handleSave = () => {
    // Filter out empty rows before saving
    const validAkas = akas.filter(aka => 
      aka.first.trim() !== "" || aka.last.trim() !== ""
    );
    onSave(validAkas);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[870px] h-[90vh] p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-gray-200">
          <div className="flex w-11 h-11 p-3 justify-center items-center rounded-full bg-blue-100">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <DialogTitle className="text-lg font-semibold text-gray-900 mb-1">
              Add AKAs
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Manage and add known aliases for this individual.
            </DialogDescription>
          </div>
          <button
            onClick={onClose}
            className="flex w-10 h-10 p-2 justify-center items-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Table Container */}
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            {/* Table Header */}
            <div className="grid grid-cols-6 bg-white border-b border-gray-200">
              <div className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                First
              </div>
              <div className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Middle
              </div>
              <div className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                No Middle Name
              </div>
              <div className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Last
              </div>
              <div className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Suffix
              </div>
              <div className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Name Type
              </div>
            </div>

            {/* Table Rows */}
            <div className="max-h-96 overflow-y-auto">
              {akas.map((aka, index) => (
                <div 
                  key={aka.id}
                  className={`grid grid-cols-6 hover:bg-gray-50 transition-colors ${
                    index < akas.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  {/* First Name */}
                  <div className="p-3">
                    <Input
                      value={aka.first}
                      onChange={(e) => handleAkaChange(aka.id, 'first', e.target.value)}
                      className="h-8 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder=""
                    />
                  </div>

                  {/* Middle Name */}
                  <div className="p-3">
                    <Input
                      value={aka.middle}
                      onChange={(e) => handleAkaChange(aka.id, 'middle', e.target.value)}
                      className="h-8 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder=""
                      disabled={aka.noMiddleName}
                    />
                  </div>

                  {/* No Middle Name Checkbox */}
                  <div className="p-3 flex justify-center items-center">
                    <Checkbox
                      checked={aka.noMiddleName}
                      onCheckedChange={(checked) => {
                        handleAkaChange(aka.id, 'noMiddleName', checked);
                        if (checked) {
                          handleAkaChange(aka.id, 'middle', '');
                        }
                      }}
                      className="w-4 h-4"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="p-3">
                    <Input
                      value={aka.last}
                      onChange={(e) => handleAkaChange(aka.id, 'last', e.target.value)}
                      className="h-8 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder=""
                    />
                  </div>

                  {/* Suffix */}
                  <div className="p-3">
                    <Input
                      value={aka.suffix}
                      onChange={(e) => handleAkaChange(aka.id, 'suffix', e.target.value)}
                      className="h-8 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder=""
                    />
                  </div>

                  {/* Name Type */}
                  <div className="p-3">
                    <Select
                      value={aka.nameType}
                      onValueChange={(value) => handleAkaChange(aka.id, 'nameType', value)}
                    >
                      <SelectTrigger className="h-8 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500">
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
          </div>

          {/* Other Identified AKAs Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Other Identified AKA's
            </h3>
            <div className="space-y-2">
              {OTHER_IDENTIFIED_AKAS.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-900 font-medium">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    Last Seen: {item.lastSeen}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Add AKAs
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddAkasModal;
