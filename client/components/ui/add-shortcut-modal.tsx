import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import CustomShortcutForm from "./custom-shortcut-form";
import DeleteShortcutModal from "./delete-shortcut-modal";
import { toast } from "@/hooks/use-toast";

export interface AddShortcutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShortcutSelect?: (
    shortcutType: string,
    shortcutLabel: string,
    options?: { url?: string; iconId?: string },
  ) => void;
  onShortcutRemove?: (shortcutId: string) => void;
  onCustomShortcutCreate?: (name: string, url: string, icon: string) => void;
  onSavedCustomShortcutDelete?: (shortcutId: string) => void;
  selectedShortcuts?: Array<{ id: string; type: string; label: string }>;
  savedCustomShortcuts?: Array<{
    id: string;
    label: string;
    iconId: string;
    url: string;
  }>;
}

interface ShortcutOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  type?: string;
  url?: string;
  iconId?: string;
}

const shortcutOptions: ShortcutOption[] = [
  {
    id: "online-ordering",
    label: "Online Ordering",
    icon: (
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
  },
];

export default function AddShortcutModal({
  isOpen,
  onClose,
  onShortcutSelect,
  onShortcutRemove,
  onCustomShortcutCreate,
  onSavedCustomShortcutDelete,
  selectedShortcuts = [],
  savedCustomShortcuts = [],
}: AddShortcutModalProps) {
  // Responsive detection
  const [isDesktop, setIsDesktop] = React.useState(true);

  // Form state management
  const [showCustomForm, setShowCustomForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    url: "",
    selectedIcon: "folder",
  });
  const [formErrors, setFormErrors] = React.useState<{
    name?: string;
    url?: string;
  }>({});

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [shortcutToDelete, setShortcutToDelete] =
    React.useState<ShortcutOption | null>(null);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowCustomForm(false);
      setFormData({ name: "", url: "", selectedIcon: "folder" });
      setFormErrors({});
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleShortcutClick = (shortcut: ShortcutOption) => {
    const targetType = shortcut.type || shortcut.id;
    const isSelected = selectedShortcuts.some((s) => s.type === targetType);

    if (isSelected) {
      // Remove shortcut
      const selectedShortcut = selectedShortcuts.find(
        (s) => s.type === targetType,
      );
      if (selectedShortcut && onShortcutRemove) {
        onShortcutRemove(selectedShortcut.id);
      }
    } else {
      // Add shortcut
      if (selectedShortcuts.length >= 4) {
        toast({
          title: "You can only have 4 shortcuts",
          description: "Remove one to add a new shortcut.",
          variant: "destructive",
        });
        return;
      }
      if (onShortcutSelect) {
        if (
          (shortcut.type === "custom" || targetType === "custom") &&
          shortcut.url
        ) {
          onShortcutSelect("custom", shortcut.label, {
            url: shortcut.url,
            iconId: shortcut.iconId,
          });
        } else {
          onShortcutSelect(targetType, shortcut.label);
        }
      }
    }
    console.log(
      isSelected ? "Shortcut removed:" : "Shortcut added:",
      shortcut.label,
    );
  };

  const isShortcutSelected = (shortcut: ShortcutOption) => {
    const targetType = shortcut.type || shortcut.id;
    if (targetType !== "custom") {
      return selectedShortcuts.some((s) => s.type === targetType);
    }
    return selectedShortcuts.some(
      (s) => s.type === "custom" && s.label === shortcut.label,
    );
  };

  const getCustomIconById = (id: string): React.ReactNode => {
    switch (id) {
      case "folder":
        return (
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
        );
      case "document":
        return (
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
        );
      case "link":
        return (
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
        );
      case "video":
        return (
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
        );
      case "image":
        return (
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
        );
      default:
        return null;
    }
  };

  const handleCustomShortcutClick = () => {
    setShowCustomForm(true);
  };

  const handleBackToList = () => {
    setShowCustomForm(false);
    setFormData({ name: "", url: "", selectedIcon: "folder" });
    setFormErrors({});
  };

  const handleFormSubmit = () => {
    const errors: { name?: string; url?: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Shortcut name is required";
    }

    if (!formData.url.trim()) {
      errors.url = "Website URL is required";
    } else {
      // Basic URL validation
      const urlPattern = /^[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/.*)?$/;
      if (!urlPattern.test(formData.url.trim())) {
        errors.url = "Please enter a valid website URL";
      }
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Form is valid, create the custom shortcut
      if (onCustomShortcutCreate) {
        onCustomShortcutCreate(
          formData.name.trim(),
          `http://${formData.url.trim()}`,
          formData.selectedIcon,
        );
      }
      // Reset form and close modal
      handleBackToList();
      onClose();
    }
  };

  const handleDeleteClick = (shortcut: ShortcutOption) => {
    setShortcutToDelete(shortcut);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setShortcutToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (
      shortcutToDelete &&
      (shortcutToDelete.type === "custom" ||
        shortcutToDelete.id?.startsWith("saved-"))
    ) {
      // Extract the actual ID from saved-{id} format
      const actualId = shortcutToDelete.id?.startsWith("saved-")
        ? shortcutToDelete.id.replace("saved-", "")
        : shortcutToDelete.id;

      if (actualId && onSavedCustomShortcutDelete) {
        onSavedCustomShortcutDelete(actualId);

        toast({
          title: "Shortcut deleted",
          description: `${shortcutToDelete.label} has been permanently deleted.`,
        });
      }
    }
  };

  const iconOptions = [
    {
      id: "folder",
      name: "Folder",
      svg: (
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
    },
    {
      id: "document",
      name: "Document",
      svg: (
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
    },
    {
      id: "link",
      name: "Link",
      svg: (
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
    },
    {
      id: "video",
      name: "Video",
      svg: (
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
    },
    {
      id: "image",
      name: "Image",
      svg: (
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
    },
  ];

  const modalContent = !isOpen ? null : (
    <>
      <style>{`
        @media (max-width: 767px) {
          .shortcut-modal-container {
            width: 85% !important;
            left: 15% !important;
            padding: 24px !important;
          }
        }
        
        @media (min-width: 768px) and (max-width: 991px) {
          .shortcut-modal-container {
            width: 400px !important;
            right: 0 !important;
            padding: 24px !important;
          }
        }
        
        @media (min-width: 992px) {
          .shortcut-modal-container {
            width: 400px !important;
            right: 0 !important;
            padding: 24px !important;
          }
        }
      `}</style>

      {/* Background Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(10, 13, 18, 0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 10000,
          transition: "opacity 0.3s ease",
        }}
        onClick={handleBackdropClick}
      >
        {/* Modal Container */}
        <div
          className="shortcut-modal-container"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "400px",
            right: 0,
            backgroundColor: "#FFF",
            boxShadow:
              "0 20px 24px -4px rgba(10, 13, 18, 0.08), 0 8px 8px -4px rgba(10, 13, 18, 0.03), 0 3px 3px -1.5px rgba(10, 13, 18, 0.04)",
            overflowY: "auto",
            padding: "24px",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease",
            boxSizing: "border-box",
            borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              padding: "0",
              alignItems: "flex-start",
              gap: "8px",
              alignSelf: "stretch",
              background: "#FFF",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                flex: "1 0 0",
              }}
            >
              {/* Featured icon */}
              <div
                style={{
                  display: "flex",
                  width: "44px",
                  height: "44px",
                  padding: "12px",
                  justifyContent: "center",
                  alignItems: "center",
                  aspectRatio: "1/1",
                  borderRadius: "9999px",
                  background: "#D9DEF2",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 6.66602L12.5 6.66602M12.5 6.66602C12.5 8.04673 13.6193 9.16602 15 9.16602C16.3807 9.16602 17.5 8.04673 17.5 6.66602C17.5 5.2853 16.3807 4.16602 15 4.16602C13.6193 4.16602 12.5 5.2853 12.5 6.66602ZM7.5 13.3327L17.5 13.3327M7.5 13.3327C7.5 14.7134 6.38071 15.8327 5 15.8327C3.61929 15.8327 2.5 14.7134 2.5 13.3327C2.5 11.952 3.61929 10.8327 5 10.8327C6.38071 10.8327 7.5 11.952 7.5 13.3327Z"
                    stroke="#344698"
                    strokeWidth="1.66667"
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
                  gap: "2px",
                  flex: "1 0 0",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#181D27",
                    fontFamily: "Public Sans",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "28px",
                  }}
                >
                  {showCustomForm ? "Custom Shortcut" : "Add Quick Shortcut"}
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#535862",
                    fontFamily: "Public Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "20px",
                  }}
                >
                  {showCustomForm
                    ? "Add quick links to internal, external links, whether they are websites, document, videos."
                    : "Add up to 4 shortcuts to internal pages or external links you use daily."}
                </div>
              </div>
            </div>
            {/* Close button (always visible) */}
            <button
              onClick={onClose}
              style={{
                display: "flex",
                width: "40px",
                height: "40px",
                padding: "8px",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                borderRadius: "8px",
                position: "relative",
                right: "12px",
                top: "12px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
              aria-label="Close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#A4A7AE"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          {showCustomForm ? (
            <CustomShortcutForm
              formData={formData}
              formErrors={formErrors}
              onFormDataChange={setFormData}
              onFormErrorsChange={setFormErrors}
              onSubmit={handleFormSubmit}
              onGoBack={handleBackToList}
            />
          ) : (
            <div
              style={{
                display: "flex",
                padding: "0",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
                flex: "1 0 0",
                alignSelf: "stretch",
              }}
            >
              {/* Shortcut Options */}
              {[
                ...shortcutOptions,
                ...savedCustomShortcuts.map((s) => ({
                  id: `saved-${s.id}`,
                  label: s.label,
                  type: "custom",
                  url: s.url,
                  iconId: s.iconId,
                  icon: getCustomIconById(s.iconId),
                })),
              ].map((shortcut) => {
                const isSelected = isShortcutSelected(shortcut);
                const isLimitReached = selectedShortcuts.length >= 4;
                const isDisabled = isLimitReached && !isSelected;

                return (
                  <div
                    key={shortcut.id}
                    style={{
                      display: "flex",
                      padding: "16px 12px",
                      alignItems: "flex-start",
                      gap: "12px",
                      alignSelf: "stretch",
                      borderRadius: "12px",
                      border: isDisabled
                        ? "1px solid #D5D7DA"
                        : "1px solid #E9EAEB",
                      background: isSelected ? "#F5F5F5" : "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      cursor: isDisabled ? "not-allowed" : "pointer",
                      opacity: isDisabled ? 0.7 : 1,
                      transition: "background-color 0.2s ease",
                    }}
                    onClick={() => !isDisabled && handleShortcutClick(shortcut)}
                    onMouseEnter={(e) => {
                      if (!isSelected && !isDisabled) {
                        e.currentTarget.style.background = "#F5F5F5";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected && !isDisabled) {
                        e.currentTarget.style.background = "#FFF";
                      }
                    }}
                  >
                    {/* Icon */}
                    <div
                      style={{
                        display: "flex",
                        padding: "10px",
                        alignItems: "center",
                        gap: "10px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      }}
                    >
                      {shortcut.icon}
                    </div>
                    {/* Label */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        gap: "2px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: isDisabled ? "#717680" : "#414651",
                          fontFamily: "Public Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          lineHeight: "24px",
                        }}
                      >
                        {shortcut.label}
                      </div>
                    </div>
                    {/* Action buttons */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      {/* Custom shortcuts show trash icon for permanent deletion */}
                      {(shortcut.type === "custom" ||
                        shortcut.id?.startsWith("saved-")) && (
                        <div
                          style={{
                            display: "flex",
                            width: "32px",
                            height: "32px",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "6px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(shortcut);
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.6667 4.00065V3.46732C10.6667 2.72058 10.6667 2.34721 10.5213 2.062C10.3935 1.81111 10.1895 1.60714 9.93865 1.47931C9.65344 1.33398 9.28007 1.33398 8.53333 1.33398H7.46667C6.71993 1.33398 6.34656 1.33398 6.06135 1.47931C5.81046 1.60714 5.60649 1.81111 5.47866 2.062C5.33333 2.34721 5.33333 2.72058 5.33333 3.46732V4.00065M2 4.00065H14M12.6667 4.00065V11.4673C12.6667 12.5874 12.6667 13.1475 12.4487 13.5753C12.2569 13.9516 11.951 14.2576 11.5746 14.4493C11.1468 14.6673 10.5868 14.6673 9.46667 14.6673H6.53333C5.41323 14.6673 4.85318 14.6673 4.42535 14.4493C4.04903 14.2576 3.74307 13.9516 3.55132 13.5753C3.33333 13.1475 3.33333 12.5874 3.33333 11.4673V4.00065"
                              stroke="#A4A7AE"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Add/Remove from dashboard button */}
                      <div
                        style={{
                          display: "flex",
                          width: "32px",
                          height: "32px",
                          padding: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "6px",
                        }}
                      >
                        {isSelected ? (
                          // Minus icon for removal from dashboard
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.33398 8H12.6673"
                              stroke="#A4A7AE"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          // Plus icon for addition to dashboard
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.00065 3.33398V12.6673M3.33398 8.00065H12.6673"
                              stroke={isDisabled ? "#A4A7AE" : "#A4A7AE"}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Divider */}
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
                    height: "1px",
                    flex: "1 0 0",
                    background: "#E9EAEB",
                  }}
                />
              </div>

              {/* Create Custom Shortcut */}
              <div
                style={{
                  display: "flex",
                  padding: "16px 12px",
                  alignItems: "flex-start",
                  gap: "12px",
                  alignSelf: "stretch",
                  borderRadius: "12px",
                  border: "1px dashed #34479A",
                  background: "#ECEEF9",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onClick={handleCustomShortcutClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#D9DEF2";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#ECEEF9";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    display: "flex",
                    padding: "10px",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "8px",
                    border: "1px solid #34479A",
                    background: "#D9DEF2",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 6.66667V13.3333M6.66667 10H13.3333M6.5 17.5H13.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5Z"
                      stroke="#34479A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {/* Label */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "2px",
                    flex: "1 0 0",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#273572",
                      fontFamily: "Public Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "24px",
                    }}
                  >
                    Create Custom Shortcut
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {modalContent && createPortal(modalContent, document.body)}
      <DeleteShortcutModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirmDelete={handleConfirmDelete}
        shortcutName={shortcutToDelete?.label}
      />
    </>
  );
}
