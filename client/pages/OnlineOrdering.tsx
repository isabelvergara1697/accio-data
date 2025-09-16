import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput, FormSelect } from "../components/FormInput";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { QuickNavigation } from "../components/QuickNavigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";

const OnlineOrdering = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuHovered, setUserMenuHovered] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(
    undefined,
  );
  const [packageCheckboxes, setPackageCheckboxes] = useState<
    Record<string, boolean>
  >({});
  const [packageQuantities, setPackageQuantities] = useState<
    Record<string, number>
  >({});
  const [sectionsCollapsed, setSectionsCollapsed] = useState({
    orderInfo: false,
    packageAndProducts: false,
    subject: false,
    education: false,
    employment: false,
    professionalReferences: false,
    credentialsProfessionalLicense: false,
    motorVehicleDriving: false,
  });
  const [showAKAForm, setShowAKAForm] = useState(false);
  const [employmentCollapsedMap, setEmploymentCollapsedMap] = useState<
    Record<number, boolean>
  >({ 1: false });
  const [educationCollapsedMap, setEducationCollapsedMap] = useState<
    Record<number, boolean>
  >({ 1: false });
  const [
    professionalReferencesCollapsedMap,
    setProfessionalReferencesCollapsedMap,
  ] = useState<Record<number, boolean>>({ 1: false });
  const [
    credentialsProfessionalLicenseCollapsedMap,
    setCredentialsProfessionalLicenseCollapsedMap,
  ] = useState<Record<number, boolean>>({ 1: false });
  const [subjectFirstName, setSubjectFirstName] = useState("");
  const [subjectMiddleName, setSubjectMiddleName] = useState("");
  const [subjectLastName, setSubjectLastName] = useState("");
  const allExpanded =
    !sectionsCollapsed.packageAndProducts &&
    !sectionsCollapsed.subject &&
    !sectionsCollapsed.education &&
    !sectionsCollapsed.employment &&
    !sectionsCollapsed.professionalReferences &&
    !sectionsCollapsed.credentialsProfessionalLicense &&
    !sectionsCollapsed.motorVehicleDriving;
  const subjectFullName = [subjectFirstName, subjectMiddleName, subjectLastName]
    .filter(Boolean)
    .join(" ");
  const [authorizationChecked, setAuthorizationChecked] = useState(false);
  // Track if each Education entry has any data entered (heuristic for progress)
  const [educationFilledMap, setEducationFilledMap] = useState<Record<number, boolean>>({});
  const [employmentFilledMap, setEmploymentFilledMap] = useState<Record<number, boolean>>({});
  const [professionalRefsFilledMap, setProfessionalRefsFilledMap] = useState<Record<number, boolean>>({});
  const [credentialsFilledMap, setCredentialsFilledMap] = useState<Record<number, boolean>>({});
  const [mvrFilled, setMvrFilled] = useState(false);

  // Track specific required fields for Subject section
  const [subjectFields, setSubjectFields] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    zipCode: "",
    address: "",
    country: "",
    state: "",
    city: "",
    phone: "",
    email: "",
    fcra: "",
    criminalRecords: ""
  });

  // Track AKA fields (optional)
  const [akaFields, setAkaFields] = useState({
    otherFirstName: "",
    otherMiddleName: "",
    otherLastName: ""
  });

  // Track education fields per entry
  const [educationFields, setEducationFields] = useState<Record<number, {
    university: string;
    degreeType: string;
    major: string;
    country: string;
    state: string;
    city: string;
    gpaScale: string;
    studentId: string;
    transcript: string;
    degreeYear: string;
  }>>({});

  // Track employment fields per entry
  const [employmentFields, setEmploymentFields] = useState<Record<number, {
    positionName: string;
    companyName: string;
    startDate: string;
    endDate: string;
    supervisorName: string;
    supervisorPhone: string;
    salary: string;
    reasonForLeaving: string;
  }>>({});

  // Track professional reference fields per entry
  const [professionalRefFields, setProfessionalRefFields] = useState<Record<number, {
    name: string;
    title: string;
    company: string;
    phone: string;
    email: string;
    relationship: string;
  }>>({});

  // Track credentials fields per entry
  const [credentialsFields, setCredentialsFields] = useState<Record<number, {
    licenseType: string;
    licenseNumber: string;
    issueDate: string;
    expirationDate: string;
    licensingAuthority: string;
    state: string;
  }>>({});

  // Track MVR fields
  const [mvrFields, setMvrFields] = useState({
    licenseNumber: "",
    licenseState: "",
    expirationDate: ""
  });

  // Global completion state for all sections (excluding Authorization)
  const [formSectionsCompleted, setFormSectionsCompleted] = useState(false);

  // Track if validation has been attempted (for showing validation errors)
  const [validationAttempted, setValidationAttempted] = useState(false);

  // Quick Navigation state
  const [showQuickNavigation, setShowQuickNavigation] = useState(true);

  const packageLabelMap: Record<string, string> = {
    "csd-standard": "CSD Standard",
    portal: "Portal",
  };

  // Initialize checkboxes and quantities when CSD Standard is selected
  useEffect(() => {
    if (selectedPackage === "csd-standard") {
      setPackageCheckboxes({
        "social-security-trace": false,
        employment: false,
        education: false,
        "professional-references": false,
        "credentials-professional-license": false,
        mjd: true, // pre-checked and disabled
        "data-collection": false,
        "dot-drug-test": true, // pre-checked and disabled
        "county-criminal-history": false,
        "motor-vehicle-driving": false,
        "court-criminal-monitoring": true, // pre-checked and disabled
      });
      setPackageQuantities({
        employment: 1,
        education: 1,
        "professional-references": 1,
        "credentials-professional-license": 1,
        "motor-vehicle-driving": 1,
      });
    }
  }, [selectedPackage]);

  useEffect(() => {
    const qty = packageQuantities["employment"] || 0;
    setEmploymentCollapsedMap((prev) => {
      const next: Record<number, boolean> = {};
      for (let i = 1; i <= qty; i++) {
        next[i] = prev[i] ?? (i === 1 ? false : true);
      }
      return next;
    });
    // Keep employment filled map in sync
    setEmploymentFilledMap((prev) => {
      const next: Record<number, boolean> = { ...prev };
      for (let i = 1; i <= qty; i++) if (next[i] === undefined) next[i] = false;
      Object.keys(next).forEach((k) => {
        const n = parseInt(k, 10);
        if (n > qty) delete next[n];
      });
      return next;
    });
  }, [packageQuantities["employment"]]);

  useEffect(() => {
    const qty = packageQuantities["education"] || 0;
    setEducationCollapsedMap((prev) => {
      const next: Record<number, boolean> = {};
      for (let i = 1; i <= qty; i++) {
        next[i] = prev[i] ?? (i === 1 ? false : true);
      }
      return next;
    });
    // Ensure filled map has keys up to qty
    setEducationFilledMap((prev) => {
      const next: Record<number, boolean> = { ...prev };
      for (let i = 1; i <= qty; i++) {
        if (next[i] === undefined) next[i] = false;
      }
      Object.keys(next).forEach((k) => {
        const n = parseInt(k, 10);
        if (n > qty) delete next[n];
      });
      return next;
    });
  }, [packageQuantities["education"]]);

  // Heuristic: mark an Education entry as filled when any child input/select/textarea has a value
  const markEducationFilled = (index: number, hasValue: boolean) => {
    if (!hasValue) return;
    setEducationFilledMap((prev) => (prev[index] ? prev : { ...prev, [index]: true }));
  };
  const markEmploymentFilled = (index: number, hasValue: boolean) => {
    if (!hasValue) return;
    setEmploymentFilledMap((prev) => (prev[index] ? prev : { ...prev, [index]: true }));
  };
  const markProfessionalRefFilled = (index: number, hasValue: boolean) => {
    if (!hasValue) return;
    setProfessionalRefsFilledMap((prev) => (prev[index] ? prev : { ...prev, [index]: true }));
  };
  const markCredentialsFilled = (index: number, hasValue: boolean) => {
    if (!hasValue) return;
    setCredentialsFilledMap((prev) => (prev[index] ? prev : { ...prev, [index]: true }));
  };

  // Check if subject section is fully completed (align with tabs logic)
  const isSubjectCompleted = () => {
    return (
      subjectFields.firstName.trim() &&
      subjectFields.lastName.trim() &&
      subjectFields.dob.trim() &&
      subjectFields.zipCode.trim() &&
      subjectFields.address.trim() &&
      subjectFields.phone.trim() &&
      subjectFields.email.trim() &&
      subjectFields.fcra.trim() &&
      subjectFields.criminalRecords.trim()
    );
  };

  // Check if education entry is fully completed
  const isEducationEntryCompleted = (index: number) => {
    const entry = educationFields[index];
    if (!entry) return false;
    return (
      entry.university.trim() &&
      entry.degreeType.trim() &&
      entry.major.trim() &&
      entry.country.trim() &&
      entry.state.trim() &&
      entry.city.trim() &&
      entry.gpaScale.trim() &&
      entry.studentId.trim() &&
      entry.transcript.trim() &&
      entry.degreeYear.trim()
    );
  };

  // Check if employment entry is fully completed
  const isEmploymentEntryCompleted = (index: number) => {
    const entry = employmentFields[index];
    if (!entry) return false;
    return (
      entry.positionName.trim() &&
      entry.companyName.trim() &&
      entry.startDate.trim() &&
      entry.endDate.trim() &&
      entry.supervisorName.trim() &&
      entry.supervisorPhone.trim() &&
      entry.salary.trim() &&
      entry.reasonForLeaving.trim()
    );
  };

  // Check if professional reference entry is fully completed
  const isProfessionalRefEntryCompleted = (index: number) => {
    const entry = professionalRefFields[index];
    if (!entry) return false;
    return (
      entry.name.trim() &&
      entry.title.trim() &&
      entry.company.trim() &&
      entry.phone.trim() &&
      entry.email.trim() &&
      entry.relationship.trim()
    );
  };

  // Check if credentials entry is fully completed
  const isCredentialsEntryCompleted = (index: number) => {
    const entry = credentialsFields[index];
    if (!entry) return false;
    return (
      entry.licenseType.trim() &&
      entry.licenseNumber.trim() &&
      entry.issueDate.trim() &&
      entry.expirationDate.trim() &&
      entry.licensingAuthority.trim() &&
      entry.state.trim()
    );
  };

  // Check if MVR section is fully completed
  const isMvrCompleted = () => {
    return (
      mvrFields.licenseNumber.trim() &&
      mvrFields.licenseState.trim() &&
      mvrFields.expirationDate.trim()
    );
  };

  // Wrapper: check if all employment entries are completed
  const isEmploymentCompleted = () => {
    if (!packageCheckboxes["employment"]) return false;
    const qty = packageQuantities["employment"] || 0;
    if (qty === 0) return false;
    for (let i = 1; i <= qty; i++) {
      if (!isEmploymentEntryCompleted(i)) return false;
    }
    return true;
  };

  // Wrapper: check if all education entries are completed
  const isEducationCompleted = () => {
    if (!packageCheckboxes["education"]) return false;
    const qty = packageQuantities["education"] || 0;
    if (qty === 0) return false;
    for (let i = 1; i <= qty; i++) {
      if (!isEducationEntryCompleted(i)) return false;
    }
    return true;
  };

  // Wrapper: check if all professional references entries are completed
  const isProfessionalReferencesCompleted = () => {
    if (!packageCheckboxes["professional-references"]) return false;
    const qty = packageQuantities["professional-references"] || 0;
    if (qty === 0) return false;
    for (let i = 1; i <= qty; i++) {
      if (!isProfessionalRefEntryCompleted(i)) return false;
    }
    return true;
  };

  // Wrapper: check if all credentials entries are completed
  const isCredentialsCompleted = () => {
    if (!packageCheckboxes["credentials-professional-license"]) return false;
    const qty = packageQuantities["credentials-professional-license"] || 0;
    if (qty === 0) return false;
    for (let i = 1; i <= qty; i++) {
      if (!isCredentialsEntryCompleted(i)) return false;
    }
    return true;
  };

  const getProgressStats = () => {
    let completed = 0;
    let total = 0;

    // Package
    total += 1;
    if (selectedPackage) completed += 1;

    // Subject (all required fields)
    total += 1;
    if (isSubjectCompleted()) completed += 1;

    // Authorization
    total += 1;
    if (authorizationChecked) completed += 1;

    // Employment
    if (packageCheckboxes["employment"]) {
      const qty = packageQuantities["employment"] || 0;
      total += qty;
      for (let i = 1; i <= qty; i++) {
        if (isEmploymentEntryCompleted(i)) completed += 1;
      }
    }

    // Education
    if (packageCheckboxes["education"]) {
      const qty = packageQuantities["education"] || 0;
      total += qty;
      for (let i = 1; i <= qty; i++) {
        if (isEducationEntryCompleted(i)) completed += 1;
      }
    }

    // Professional References
    if (packageCheckboxes["professional-references"]) {
      const qty = packageQuantities["professional-references"] || 0;
      total += qty;
      for (let i = 1; i <= qty; i++) {
        if (isProfessionalRefEntryCompleted(i)) completed += 1;
      }
    }

    // Credentials / Professional License
    if (packageCheckboxes["credentials-professional-license"]) {
      const qty = packageQuantities["credentials-professional-license"] || 0;
      total += qty;
      for (let i = 1; i <= qty; i++) {
        if (isCredentialsEntryCompleted(i)) completed += 1;
      }
    }

    // Motor Vehicle Driving (single section)
    if (packageCheckboxes["motor-vehicle-driving"]) {
      total += 1;
      if (isMvrCompleted()) completed += 1;
    }

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percent };
  };

  // Check if all active sections (based on user's selections) are completed, excluding Authorization
  const areActiveSectionsCompletedExcludingAuthorization = () => {
    if (!selectedPackage) return false;
    if (!isSubjectCompleted()) return false;

    if (packageCheckboxes["employment"]) {
      const qty = packageQuantities["employment"] || 0;
      for (let i = 1; i <= qty; i++) if (!isEmploymentEntryCompleted(i)) return false;
    }

    if (packageCheckboxes["education"]) {
      const qty = packageQuantities["education"] || 0;
      for (let i = 1; i <= qty; i++) if (!isEducationEntryCompleted(i)) return false;
    }

    if (packageCheckboxes["professional-references"]) {
      const qty = packageQuantities["professional-references"] || 0;
      for (let i = 1; i <= qty; i++) if (!isProfessionalRefEntryCompleted(i)) return false;
    }

    if (packageCheckboxes["credentials-professional-license"]) {
      const qty = packageQuantities["credentials-professional-license"] || 0;
      for (let i = 1; i <= qty; i++) if (!isCredentialsEntryCompleted(i)) return false;
    }

    if (packageCheckboxes["motor-vehicle-driving"]) {
      if (!isMvrCompleted()) return false;
    }

    return true;
  };

  // Check if form is ready for submission (including authorization when required)
  const isFormReadyForSubmission = () => {
    const sectionsComplete = areActiveSectionsCompletedExcludingAuthorization();
    // Only require authorization if it's been checked or if all other sections are complete
    // This allows form to be submitted without authorization if user hasn't interacted with it
    return sectionsComplete;
  };

  // Handle Submit Order button click
  const handleSubmitOrder = () => {
    setValidationAttempted(true);

    if (!isFormReadyForSubmission()) {
      // Scroll to first incomplete section
      scrollToFirstIncompleteSection();
      return;
    }

    // Form is complete, proceed with submission
    console.log("Submitting order...");
    // Add actual submission logic here
  };

  // Quick Navigation helpers
  const handleNavigateToSection = (sectionId: string) => {
    // Handle subsection navigation (e.g., "employment-1", "education-2")
    if (sectionId.includes('-') && /\d+$/.test(sectionId)) {
      const [sectionType, entryNumber] = sectionId.split('-');
      let selector = '';

      if (sectionType === 'employment') {
        selector = `[data-section="employment"] [data-employment-entry="${entryNumber}"]`;
      } else if (sectionType === 'education') {
        selector = `[data-section="education"] [data-education-entry="${entryNumber}"]`;
      } else if (sectionType === 'professional') {
        selector = `[data-section="professional-references"] [data-professional-ref-entry="${entryNumber}"]`;
      } else if (sectionType === 'credentials') {
        selector = `[data-section="credentials-professional-license"] [data-credentials-entry="${entryNumber}"]`;
      }

      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    // Handle main section navigation
    const element = document.querySelector(`[data-section="${sectionId}"]`) as HTMLElement;
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Define navigation sections based on active packages
  const getNavigationSections = () => {
    const sections = [];

    // Always show Package & Products and Subject
    if (selectedPackage) {
      sections.push({
        id: "package-and-products",
        label: "Package & Products",
        completed: !!selectedPackage,
        hasErrors: validationAttempted && !selectedPackage,
      });
    }

    if (selectedPackage) {
      sections.push({
        id: "subject",
        label: "Subject",
        completed: isSubjectCompleted(),
        hasErrors: validationAttempted && !isSubjectCompleted(),
      });
    }

    // Add sections based on selected packages
    if (packageCheckboxes["employment"]) {
      const employmentQty = packageQuantities["employment"] || 1;
      const employmentSubsections = [];

      for (let i = 1; i <= employmentQty; i++) {
        employmentSubsections.push({
          id: `employment-${i}`,
          label: `Employment No.${i}`,
          completed: isEmploymentEntryCompleted(i),
          hasErrors: validationAttempted && !isEmploymentEntryCompleted(i),
        });
      }

      sections.push({
        id: "employment",
        label: "Employment",
        completed: isEmploymentCompleted(),
        hasErrors: validationAttempted && !isEmploymentCompleted(),
        count: employmentQty,
        subsections: employmentQty > 1 ? employmentSubsections : undefined,
      });
    }

    if (packageCheckboxes["education"]) {
      const educationQty = packageQuantities["education"] || 1;
      const educationSubsections = [];

      for (let i = 1; i <= educationQty; i++) {
        educationSubsections.push({
          id: `education-${i}`,
          label: `Education No.${i}`,
          completed: isEducationEntryCompleted(i),
          hasErrors: validationAttempted && !isEducationEntryCompleted(i),
        });
      }

      sections.push({
        id: "education",
        label: "Education",
        completed: isEducationCompleted(),
        hasErrors: validationAttempted && !isEducationCompleted(),
        count: educationQty,
        subsections: educationQty > 1 ? educationSubsections : undefined,
      });
    }

    if (packageCheckboxes["professional-references"]) {
      const professionalRefsQty = packageQuantities["professional-references"] || 1;
      const professionalRefsSubsections = [];

      for (let i = 1; i <= professionalRefsQty; i++) {
        professionalRefsSubsections.push({
          id: `professional-references-${i}`,
          label: `Professional References No.${i}`,
          completed: isProfessionalRefEntryCompleted(i),
          hasErrors: validationAttempted && !isProfessionalRefEntryCompleted(i),
        });
      }

      sections.push({
        id: "professional-references",
        label: "Professional References",
        completed: isProfessionalReferencesCompleted(),
        hasErrors: validationAttempted && !isProfessionalReferencesCompleted(),
        count: professionalRefsQty,
        subsections: professionalRefsQty > 1 ? professionalRefsSubsections : undefined,
      });
    }

    if (packageCheckboxes["credentials-professional-license"]) {
      const credentialsQty = packageQuantities["credentials-professional-license"] || 1;
      const credentialsSubsections = [];

      for (let i = 1; i <= credentialsQty; i++) {
        credentialsSubsections.push({
          id: `credentials-professional-license-${i}`,
          label: `Credentials No.${i}`,
          completed: isCredentialsEntryCompleted(i),
          hasErrors: validationAttempted && !isCredentialsEntryCompleted(i),
        });
      }

      sections.push({
        id: "credentials-professional-license",
        label: "Credentials - Professional License",
        completed: isCredentialsCompleted(),
        hasErrors: validationAttempted && !isCredentialsCompleted(),
        count: credentialsQty,
        subsections: credentialsQty > 1 ? credentialsSubsections : undefined,
      });
    }

    if (packageCheckboxes["motor-vehicle-driving"]) {
      sections.push({
        id: "motor-vehicle-driving",
        label: "MVR",
        completed: isMvrCompleted(),
        hasErrors: validationAttempted && !isMvrCompleted(),
      });
    }

    // Always show Authorization at the end
    sections.push({
      id: "authorization",
      label: "Authorization",
      completed: authorizationChecked,
      hasErrors: validationAttempted && !authorizationChecked,
    });

    return sections;
  };

  // Check if there are any validation errors
  const hasValidationErrors = () => {
    if (!validationAttempted) return false;
    return !isFormReadyForSubmission() || !authorizationChecked;
  };

  // Scroll to the first incomplete section users need to finish
  const scrollToFirstIncompleteSection = () => {
    const scrollTo = (selector: string) => {
      const el = document.querySelector(selector) as HTMLElement | null;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (!selectedPackage) return scrollTo('[data-section="package-and-products"]');
    if (!isSubjectCompleted()) return scrollTo('[data-section="subject"]');

    if (packageCheckboxes["employment"]) {
      const qty = packageQuantities["employment"] || 0;
      for (let i = 1; i <= qty; i++) {
        if (!isEmploymentEntryCompleted(i)) return scrollTo('[data-section="employment"]');
      }
    }

    if (packageCheckboxes["education"]) {
      const qty = packageQuantities["education"] || 0;
      for (let i = 1; i <= qty; i++) {
        if (!isEducationEntryCompleted(i)) return scrollTo('[data-section="education"]');
      }
    }

    if (packageCheckboxes["professional-references"]) {
      const qty = packageQuantities["professional-references"] || 0;
      for (let i = 1; i <= qty; i++) {
        if (!isProfessionalRefEntryCompleted(i)) return scrollTo('[data-section="professional-references"]');
      }
    }

    if (packageCheckboxes["credentials-professional-license"]) {
      const qty = packageQuantities["credentials-professional-license"] || 0;
      for (let i = 1; i <= qty; i++) {
        if (!isCredentialsEntryCompleted(i)) return scrollTo('[data-section="credentials-professional-license"]');
      }
    }

    if (packageCheckboxes["motor-vehicle-driving"]) {
      if (!isMvrCompleted()) return scrollTo('[data-section="motor-vehicle-driving"]');
    }
  };

  // Auto-fill helpers for each section
  const autofillSubject = () => {
    setSubjectFields((prev) => ({
      ...prev,
      firstName: prev.firstName || "Alex",
      middleName: prev.middleName || "J",
      lastName: prev.lastName || "Smith",
      dob: prev.dob || "12/12/1991",
      zipCode: prev.zipCode || "080102",
      address: prev.address || "Street 123",
      country: prev.country || "usa",
      state: prev.state || "tx",
      city: prev.city || "el-paso",
      phone: prev.phone || "+1 (555) 000-0000",
      email: prev.email || "alexsmith@gmail.com",
      fcra: prev.fcra || "employment",
      criminalRecords: prev.criminalRecords || "no",
    }));
  };

  const ensureCount = (qty?: number) => (qty && qty > 0 ? qty : 1);

  const autofillEmployment = () => {
    if (!packageCheckboxes["employment"]) return;
    const qty = ensureCount(packageQuantities["employment"]);
    setEmploymentFields((prev) => {
      const next = { ...prev } as typeof prev;
      for (let i = 1; i <= qty; i++) {
        next[i] = next[i] || {
          positionName: "Senior Director",
          companyName: "Acme Company",
          startDate: "12/12/2023",
          endDate: "12/12/2025",
          supervisorName: "Jhon Doe",
          supervisorPhone: "+1 (555) 000-0000",
          salary: "123456",
          reasonForLeaving: "Change of career",
        };
      }
      return next;
    });
  };

  const autofillEducation = () => {
    if (!packageCheckboxes["education"]) return;
    const qty = ensureCount(packageQuantities["education"]);
    setEducationFields((prev) => {
      const next = { ...prev } as typeof prev;
      for (let i = 1; i <= qty; i++) {
        next[i] = next[i] || {
          university: "Brown Community College",
          degreeType: "Bachelor",
          major: "Physiology",
          country: "usa",
          state: "tx",
          city: "el-paso",
          gpaScale: "4.0",
          studentId: "121512",
          transcript: "yes",
          degreeYear: "2025",
        };
      }
      return next;
    });
  };

  const autofillProfessionalRefs = () => {
    if (!packageCheckboxes["professional-references"]) return;
    const qty = ensureCount(packageQuantities["professional-references"]);
    setProfessionalRefFields((prev) => {
      const next = { ...prev } as typeof prev;
      for (let i = 1; i <= qty; i++) {
        next[i] = next[i] || {
          name: "Janine Claude",
          title: "Personal",
          company: "Acme Company",
          phone: "+1 (555) 000-0000",
          email: "jhon.doe@example.com",
          relationship: "Friend",
        };
      }
      return next;
    });
  };

  const autofillCredentials = () => {
    if (!packageCheckboxes["credentials-professional-license"]) return;
    const qty = ensureCount(packageQuantities["credentials-professional-license"]);
    setCredentialsFields((prev) => {
      const next = { ...prev } as typeof prev;
      for (let i = 1; i <= qty; i++) {
        next[i] = next[i] || {
          licenseType: "Security License",
          licenseNumber: "123456",
          issueDate: "12/12/2025",
          expirationDate: "12/12/2025",
          licensingAuthority: "Acme Company",
          state: "tx",
        };
      }
      return next;
    });
  };

  const autofillMvr = () => {
    if (!packageCheckboxes["motor-vehicle-driving"]) return;
    setMvrFields((prev) => ({
      licenseNumber: prev.licenseNumber || "ABCD12345",
      licenseState: prev.licenseState || "tx",
      expirationDate: prev.expirationDate || "12/12/2025",
    }));
  };

  const autofillActiveSections = () => {
    if (!selectedPackage) return;
    autofillSubject();
    autofillEmployment();
    autofillEducation();
    autofillProfessionalRefs();
    autofillCredentials();
    autofillMvr();
  };

  // Imperative DOM autofill for uncontrolled inputs so the UI reflects the values
  const autofillUncontrolledInputs = (sectionSelector: string) => {
    const root = document.querySelector(sectionSelector) as HTMLElement | null;
    if (!root) return;
    const inputs = root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="date"], textarea'
    );
    inputs.forEach((el, idx) => {
      if ((el as HTMLInputElement).type === 'date' || el.placeholder?.includes('dd') || el.placeholder?.includes('mm')) {
        (el as HTMLInputElement).value = (el as HTMLInputElement).value || '12/12/2025';
      } else if ((el as HTMLInputElement).type === 'email') {
        (el as HTMLInputElement).value = (el as HTMLInputElement).value || `user${idx}@example.com`;
      } else if ((el as HTMLInputElement).type === 'tel') {
        (el as HTMLInputElement).value = (el as HTMLInputElement).value || '+1 (555) 000-0000';
      } else {
        el.value = el.value || 'Sample';
      }
      const evt = new Event('input', { bubbles: true });
      el.dispatchEvent(evt);
      const changeEvt = new Event('change', { bubbles: true });
      el.dispatchEvent(changeEvt);
    });
  };

  // Click handler for the Complete Form button
  const handleCompleteForm = () => {
    autofillActiveSections();
    // Update uncontrolled inputs for visible sections
    autofillUncontrolledInputs('[data-section="employment"]');
    autofillUncontrolledInputs('[data-section="education"]');
    autofillUncontrolledInputs('[data-section="professional-references"]');
    autofillUncontrolledInputs('[data-section="credentials-professional-license"]');
    autofillUncontrolledInputs('[data-section="motor-vehicle-driving"]');

    // Re-check after state updates flush
    setTimeout(() => {
      const ready = areActiveSectionsCompletedExcludingAuthorization();
      if (ready) {
        setFormSectionsCompleted(true);
        setSectionsCollapsed((prev) => ({
          ...prev,
          packageAndProducts: true,
          subject: true,
          education: true,
          employment: true,
          professionalReferences: true,
          credentialsProfessionalLicense: true,
          motorVehicleDriving: true,
        }));
      } else {
        setFormSectionsCompleted(false);
        scrollToFirstIncompleteSection();
      }
    }, 0);
  };

  useEffect(() => {
    const qty = packageQuantities["professional-references"] || 0;
    setProfessionalReferencesCollapsedMap((prev) => {
      const next: Record<number, boolean> = {};
      for (let i = 1; i <= qty; i++) {
        next[i] = prev[i] ?? (i === 1 ? false : true);
      }
      return next;
    });
    setProfessionalRefsFilledMap((prev) => {
      const next: Record<number, boolean> = { ...prev };
      for (let i = 1; i <= qty; i++) if (next[i] === undefined) next[i] = false;
      Object.keys(next).forEach((k) => {
        const n = parseInt(k, 10);
        if (n > qty) delete next[n];
      });
      return next;
    });
  }, [packageQuantities["professional-references"]]);

  useEffect(() => {
    const qty = packageQuantities["credentials-professional-license"] || 0;
    setCredentialsProfessionalLicenseCollapsedMap((prev) => {
      const next: Record<number, boolean> = {};
      for (let i = 1; i <= qty; i++) {
        next[i] = prev[i] ?? (i === 1 ? false : true);
      }
      return next;
    });
    setCredentialsFilledMap((prev) => {
      const next: Record<number, boolean> = { ...prev };
      for (let i = 1; i <= qty; i++) if (next[i] === undefined) next[i] = false;
      Object.keys(next).forEach((k) => {
        const n = parseInt(k, 10);
        if (n > qty) delete next[n];
      });
      return next;
    });
  }, [packageQuantities["credentials-professional-license"]]);

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setPackageCheckboxes((prev) => ({ ...prev, [key]: checked }));
  };

  const handleQuantityChange = (key: string, quantity: number) => {
    setPackageQuantities((prev) => ({ ...prev, [key]: quantity }));
  };

  // Auto-minimize sidebar after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarCollapsed(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = () => {
    console.log("Sign out");
  };

  const getUserMenuStyles = () => {
    if (userMenuHovered || userMenuOpen) {
      return {
        border: "1px solid #E9EAEB",
        background: "#F5F5F5",
      };
    }
    return {};
  };

  // Helper: consistent tab styling for completed sections (matches "Package" look)
  const tabContainerStyle = (completed: boolean) =>
    ({
      display: "flex",
      height: "36px",
      padding: "8px 6px 8px 12px",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      borderRadius: "6px",
      border: completed ? "1px solid #D5D7DA" : "none",
      background: completed ? "#F9F9F9" : "transparent",
      cursor: "pointer",
    }) as React.CSSProperties;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Sidebar */}
      <Sidebar
        isDesktop={isDesktop}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        currentPage="online-ordering"
        showMobileUserMenu={showMobileUserMenu}
        setShowMobileUserMenu={setShowMobileUserMenu}
        setMobileMenuOpen={setMobileMenuOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        userMenuHovered={userMenuHovered}
        setUserMenuHovered={setUserMenuHovered}
        handleSignOut={handleSignOut}
        getUserMenuStyles={getUserMenuStyles}
        showNotification={showNotification}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && !isDesktop && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          marginLeft: isDesktop ? (sidebarCollapsed ? "80px" : "296px") : "0",
          width: isDesktop
            ? `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`
            : "100vw",
          maxWidth: isDesktop
            ? `calc(100vw - ${sidebarCollapsed ? "80px" : "296px"})`
            : "100vw",
          overflow: "hidden",
          transition:
            "margin-left 0.3s ease, width 0.3s ease, max-width 0.3s ease",
        }}
      >
        {/* Header */}
        {isDesktop ? (
          <Header
            isDesktop={isDesktop}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            userMenuHovered={userMenuHovered}
            setUserMenuHovered={setUserMenuHovered}
            handleSignOut={handleSignOut}
            getUserMenuStyles={getUserMenuStyles}
            showMobileUserMenu={showMobileUserMenu}
            showNotification={showNotification}
            sidebarCollapsed={sidebarCollapsed}
          />
        ) : (
          <MobileHeader
            isDesktop={isDesktop}
            isMobile={isMobile}
            setMobileMenuOpen={setMobileMenuOpen}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            userMenuHovered={userMenuHovered}
            setUserMenuHovered={setUserMenuHovered}
            handleSignOut={handleSignOut}
            getUserMenuStyles={getUserMenuStyles}
            showMobileUserMenu={showMobileUserMenu}
          />
        )}

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            paddingBottom: "24px",
            paddingTop:
              showNotification && isDesktop
                ? "136px"
                : isDesktop
                  ? "104px"
                  : "88px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            flex: "1 0 0",
            alignSelf: "stretch",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            {/* Container */}
            <div
              style={{
                display: "flex",
                padding: isDesktop ? "0 32px" : "0 20px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                alignSelf: "stretch",
              }}
            >
              {/* Page header */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    gap: "20px 16px",
                    alignSelf: "stretch",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      minWidth: isDesktop ? "320px" : "auto",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: "1 0 0",
                    }}
                  >
                    {/* Title */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "var(--colors-text-text-primary-900, #181D27)",
                        fontFamily:
                          "var(--Font-family-font-family-display, 'Public Sans')",
                        fontSize: isDesktop
                          ? "var(--Font-size-display-xs, 24px)"
                          : "20px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: isDesktop
                          ? "var(--Line-height-display-xs, 32px)"
                          : "30px",
                      }}
                    >
                      Create New Order
                    </div>
                    {/* Supporting text */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "var(--colors-text-text-tertiary-600, #535862)",
                        fontFamily:
                          "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "var(--Font-size-text-md, 16px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "var(--Line-height-text-md, 24px)",
                      }}
                    >
                      Track pending invites and submitted orders in one place.
                      Use filters and tools to sort, review, and manage activity
                      easily.
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: isMobile ? "stretch" : "center",
                      gap: "12px",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    {/* Expand/Collapse All Button */}
                    <button
                      onClick={() => {
                        const anyCollapsed =
                          sectionsCollapsed.packageAndProducts ||
                          sectionsCollapsed.subject ||
                          sectionsCollapsed.education ||
                          sectionsCollapsed.employment ||
                          sectionsCollapsed.professionalReferences ||
                          sectionsCollapsed.credentialsProfessionalLicense ||
                          sectionsCollapsed.motorVehicleDriving;
                        if (anyCollapsed) {
                          setSectionsCollapsed((prev) => ({
                            ...prev,
                            packageAndProducts: false,
                            subject: false,
                            education: false,
                            employment: false,
                            professionalReferences: false,
                            credentialsProfessionalLicense: false,
                            motorVehicleDriving: false,
                          }));
                        } else {
                          setSectionsCollapsed((prev) => ({
                            ...prev,
                            packageAndProducts: true,
                            subject: true,
                            education: true,
                            employment: true,
                            professionalReferences: true,
                            credentialsProfessionalLicense: true,
                            motorVehicleDriving: true,
                          }));
                        }
                      }}
                      style={{
                        display: "flex",
                        minHeight: "36px",
                        padding: "6px 8px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        cursor: "pointer",
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
                            color: "#414651",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          {allExpanded ? "Collapse All" : "Expand All"}
                        </div>
                      </div>
                      <svg
                        style={{
                          width: "16px",
                          height: "16px",
                        }}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.66675 10L8.00008 13.3333L11.3334 10M4.66675 6L8.00008 2.66667L11.3334 6"
                          stroke="#A4A7AE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Save as Draft Button */}
                    <button
                      style={{
                        display: "flex",
                        minHeight: "36px",
                        padding: "6px 8px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        cursor: "pointer",
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
                            color: "#414651",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Save as Draft
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            {/* Container */}
            <div
              style={{
                display: "flex",
                padding: isDesktop ? "0 32px" : "0 20px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                flex: "1 0 0",
                alignSelf: "stretch",
              }}
            >
              {/* Order Information Container */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderRadius: "12px",
                  border: "1px solid #E9EAEB",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  overflow: "hidden",
                }}
              >
                {/* Section Header */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "20px",
                    alignSelf: "stretch",
                    background: "#FFF",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "20px 24px 0 24px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "4px",
                          flex: "1 0 0",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            gap: "2px",
                            flex: "1 0 0",
                          }}
                        >
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
                                color: "#181D27",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-lg, 18px)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-lg, 28px)",
                              }}
                            >
                              Order Information
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  style={{
                    display: "flex",
                    padding: "12px 24px 16px 24px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  {/* Information Row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "stretch",
                      flexWrap: "wrap",
                      gap: "16px",
                    }}
                  >
                    {/* Package Info */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "4px",
                        minWidth: "120px",
                      }}
                    >
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Package
                      </div>
                      <div
                        style={{
                          color: selectedPackage ? "#181D27" : "#717680",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-md, 16px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-md, 24px)",
                        }}
                      >
                        {selectedPackage
                          ? (packageLabelMap[selectedPackage] ??
                            selectedPackage)
                          : "—"}
                      </div>
                    </div>

                    {/* Subject Info */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "4px",
                        minWidth: "120px",
                      }}
                    >
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Subject
                      </div>
                      <div
                        style={{
                          color: subjectFullName ? "#181D27" : "#717680",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-md, 16px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-md, 24px)",
                        }}
                      >
                        {subjectFullName || "No Info Yet"}
                      </div>
                    </div>

                    {/* Requester Info */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "4px",
                        minWidth: "120px",
                      }}
                    >
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Requester
                      </div>
                      <div
                        style={{
                          color: "#181D27",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-md, 16px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-md, 24px)",
                        }}
                      >
                        Alexandra Fitzwilliam
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div
                      style={{
                        display: "flex",
                        width: isDesktop ? "320px" : "100%",
                        alignItems: "center",
                        gap: "12px",
                        minWidth: "200px",
                      }}
                    >
                      {(() => {
                        const { percent } = getProgressStats();
                        return (
                          <>
                            <div style={{ height: "8px", flex: "1 0 0", position: "relative" }}>
                              <div
                                style={{
                                  width: "100%",
                                  height: "8px",
                                  borderRadius: "9999px",
                                  background: "#D5D7DA",
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                }}
                              />
                              <div
                                style={{
                                  width: `${percent}%`,
                                  height: "8px",
                                  borderRadius: "9999px",
                                  background: "#344698",
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                  transition: "width 200ms ease",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                color: "#414651",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {percent}% Complete
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      display: "flex",
                      padding: "4px 0",
                      alignItems: "center",
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

                  {/* Service Categories - only show if CSD Standard is selected */}
                  {selectedPackage === "csd-standard" && (
                    <>
                      {/* Service Categories Container */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignSelf: "stretch",
                          flexWrap: "wrap",
                          gap: "16px",
                        }}
                      >
                        {/* Background */}
                        <div
                          style={{
                            display: packageCheckboxes["social-security-trace"]
                              ? "flex"
                              : "none",
                            width: isDesktop ? "350px" : "100%",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                            minWidth: "200px",
                          }}
                        >
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Background
                          </div>
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-md, 16px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-md, 24px)",
                            }}
                          >
                            Social Security Trace
                          </div>
                        </div>

                        {/* Database Services */}
                        <div
                          style={{
                            display: packageCheckboxes["mjd"] ? "flex" : "none",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                            minWidth: "120px",
                          }}
                        >
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Database Services
                          </div>
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-md, 16px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-md, 24px)",
                            }}
                          >
                            MJD
                          </div>
                        </div>

                        {/* Additional Services */}
                        <div
                          style={{
                            display:
                              packageCheckboxes["motor-vehicle-driving"] ||
                              packageCheckboxes["court-criminal-monitoring"]
                                ? "flex"
                                : "none",
                            width: isDesktop ? "400px" : "100%",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                            minWidth: "300px",
                          }}
                        >
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Additional Services
                          </div>
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-md, 16px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-md, 24px)",
                            }}
                          >
                            {[
                              packageCheckboxes["motor-vehicle-driving"]
                                ? "MVR History"
                                : null,
                              packageCheckboxes["court-criminal-monitoring"]
                                ? "Court Criminal Monitoring"
                                : null,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </div>
                        </div>
                      </div>

                      {/* Second row of service categories */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignSelf: "stretch",
                          flexWrap: "wrap",
                          gap: "16px",
                        }}
                      >
                        {/* Public Records */}
                        <div
                          style={{
                            display: packageCheckboxes[
                              "county-criminal-history"
                            ]
                              ? "flex"
                              : "none",
                            width: isDesktop ? "400px" : "100%",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                            minWidth: "300px",
                          }}
                        >
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Public Records
                          </div>
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-md, 16px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-md, 24px)",
                            }}
                          >
                            County/Statewide Criminal History 7yr
                          </div>
                        </div>

                        {/* Other Products */}
                        <div
                          style={{
                            display:
                              packageCheckboxes["data-collection"] ||
                              packageCheckboxes["dot-drug-test"]
                                ? "flex"
                                : "none",
                            width: isDesktop ? "400px" : "100%",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "4px",
                            minWidth: "300px",
                          }}
                        >
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Other Products
                          </div>
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-md, 16px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-md, 24px)",
                            }}
                          >
                            {[
                              packageCheckboxes["data-collection"]
                                ? "Data Collection"
                                : null,
                              packageCheckboxes["dot-drug-test"]
                                ? "DOT Drug Test and Physical"
                                : null,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div
                        style={{
                          display: "flex",
                          padding: "4px 0",
                          alignItems: "center",
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
                    </>
                  )}

                  {/* Status Tabs - show Package and Subject always, other tabs only if checked */}
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      padding: "4px",
                      alignItems: "flex-start",
                      alignContent: "flex-start",
                      gap: "4px",
                      flexWrap: "wrap",
                      borderRadius: "10px",
                      border: "1px solid #E9EAEB",
                      background: "#FFF",
                    }}
                  >
                    {/* Package Tab - always show */}
                    <div
                      onClick={() => {
                        // Scroll to package section when clicked
                        const packageSection = document.querySelector(
                          '[data-section="package-and-products"]',
                        );
                        if (packageSection) {
                          packageSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }}
                      style={tabContainerStyle(!!selectedPackage)}
                    >
                      <div
                        style={{
                          color: selectedPackage ? "#414651" : "#717680",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Package
                      </div>
                      {/* Checkmark Icon - only show when package is selected */}
                      {selectedPackage && (
                        <div
                          style={{
                            display: "flex",
                            width: "24px",
                            height: "24px",
                            padding: "6px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "9999px",
                            background: "#DCFAE6",
                          }}
                        >
                          <svg
                            style={{
                              width: "12px",
                              height: "12px",
                              flexShrink: 0,
                            }}
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="#079455"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Subject Tab - show only when a package is selected */}
                    {selectedPackage && (
                      <div
                        onClick={() => {
                          const subjectSection = document.querySelector(
                            '[data-section="subject"]',
                          );
                          if (subjectSection) {
                            subjectSection.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }}
                        style={tabContainerStyle(isSubjectCompleted())}
                      >
                        <div
                          style={{
                            color: isSubjectCompleted() ? "#414651" : "#717680",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Subject
                        </div>
                        {isSubjectCompleted() && (
                          <div
                            style={{
                              display: "flex",
                              width: "24px",
                              height: "24px",
                              padding: "6px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "9999px",
                              background: "#DCFAE6",
                            }}
                          >
                            <svg
                              style={{
                                width: "12px",
                                height: "12px",
                                flexShrink: 0,
                              }}
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="#079455"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Employment Tab - only show if checked */}
                    {packageCheckboxes["employment"] && (
                      <div
                        onClick={() => {
                          const employmentSection = document.querySelector(
                            '[data-section="employment"]',
                          );
                          if (employmentSection) {
                            employmentSection.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }}
                        style={tabContainerStyle(isEmploymentCompleted())}
                      >
                        <div
                          style={{
                            color: isEmploymentCompleted() ? "#414651" : "#717680",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Employment
                        </div>
                        {isEmploymentCompleted() ? (
                          <div style={{ display: "flex", width: "24px", height: "24px", padding: "6px", justifyContent: "center", alignItems: "center", borderRadius: "9999px", background: "#DCFAE6" }}>
                            <svg style={{ width: "12px", height: "12px", flexShrink: 0 }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        ) : (
                          <div style={{ display: "flex", padding: "2px 8px", alignItems: "center", borderRadius: "9999px", border: "1px solid #E9EAEB", background: "#FAFAFA" }}>
                            <div style={{ color: "#414651", textAlign: "center", fontFamily: "var(--Font-family-font-family-body, 'Public Sans')", fontSize: "12px", fontStyle: "normal", fontWeight: 500, lineHeight: "18px" }}>
                              {packageQuantities["employment"] || 1}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Education Tab - only show if checked */}
                    {packageCheckboxes["education"] && (
                      <div
                        onClick={() => {
                          const el = document.querySelector(
                            '[data-section="education"]',
                          );
                          if (el)
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }}
                        style={tabContainerStyle(isEducationCompleted())}
                      >
                        <div
                          style={{
                            color: isEducationCompleted() ? "#414651" : "#717680",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Education
                        </div>
                        {isEducationCompleted() ? (
                          <div style={{ display: "flex", width: "24px", height: "24px", padding: "6px", justifyContent: "center", alignItems: "center", borderRadius: "9999px", background: "#DCFAE6" }}>
                            <svg style={{ width: "12px", height: "12px", flexShrink: 0 }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        ) : (
                          <div style={{ display: "flex", padding: "2px 8px", alignItems: "center", borderRadius: "9999px", border: "1px solid #E9EAEB", background: "#FAFAFA" }}>
                            <div style={{ color: "#414651", textAlign: "center", fontFamily: "var(--Font-family-font-family-body, 'Public Sans')", fontSize: "12px", fontStyle: "normal", fontWeight: 500, lineHeight: "18px" }}>
                              {packageQuantities["education"] || 1}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Professional References Tab - only show if checked */}
                    {packageCheckboxes["professional-references"] && (
                      <div
                        onClick={() => {
                          const el = document.querySelector(
                            '[data-section="professional-references"]',
                          );
                          if (el)
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }}
                        style={tabContainerStyle(isProfessionalReferencesCompleted())}
                      >
                        <div
                          style={{
                            color: isProfessionalReferencesCompleted() ? "#414651" : "#717680",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Professional References
                        </div>
                        {isProfessionalReferencesCompleted() ? (
                          <div style={{ display: "flex", width: "24px", height: "24px", padding: "6px", justifyContent: "center", alignItems: "center", borderRadius: "9999px", background: "#DCFAE6" }}>
                            <svg style={{ width: "12px", height: "12px", flexShrink: 0 }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        ) : (
                          <div style={{ display: "flex", padding: "2px 8px", alignItems: "center", borderRadius: "9999px", border: "1px solid #E9EAEB", background: "#FAFAFA" }}>
                            <div style={{ color: "#414651", textAlign: "center", fontFamily: "var(--Font-family-font-family-body, 'Public Sans')", fontSize: "12px", fontStyle: "normal", fontWeight: 500, lineHeight: "18px" }}>
                              {packageQuantities["professional-references"] || 1}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Credentials-Professional License Tab - only show if checked */}
                    {packageCheckboxes["credentials-professional-license"] && (
                      <div
                        onClick={() => {
                          const el = document.querySelector(
                            '[data-section="credentials-professional-license"]',
                          );
                          if (el)
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }}
                        style={tabContainerStyle(isCredentialsCompleted())}
                      >
                        <div
                          style={{
                            color: isCredentialsCompleted() ? "#414651" : "#717680",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Credentials-Professional License
                        </div>
                        {isCredentialsCompleted() ? (
                          <div style={{ display: "flex", width: "24px", height: "24px", padding: "6px", justifyContent: "center", alignItems: "center", borderRadius: "9999px", background: "#DCFAE6" }}>
                            <svg style={{ width: "12px", height: "12px", flexShrink: 0 }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        ) : (
                          <div style={{ display: "flex", padding: "2px 8px", alignItems: "center", borderRadius: "9999px", border: "1px solid #E9EAEB", background: "#FAFAFA" }}>
                            <div style={{ color: "#414651", textAlign: "center", fontFamily: "var(--Font-family-font-family-body, 'Public Sans')", fontSize: "12px", fontStyle: "normal", fontWeight: 500, lineHeight: "18px" }}>
                              {packageQuantities["credentials-professional-license"] || 1}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* MVR History Tab - only show if checked */}
                    {packageCheckboxes["motor-vehicle-driving"] && (
                      <div
                        onClick={() => {
                          const el = document.querySelector(
                            '[data-section="motor-vehicle-driving"]',
                          );
                          if (el)
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }}
                        style={tabContainerStyle(isMvrCompleted())}
                      >
                        <div
                          style={{
                            color: isMvrCompleted() ? "#414651" : "#717680",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          MVR History
                        </div>
                        {isMvrCompleted() ? (
                          <div style={{ display: "flex", width: "24px", height: "24px", padding: "6px", justifyContent: "center", alignItems: "center", borderRadius: "9999px", background: "#DCFAE6" }}>
                            <svg style={{ width: "12px", height: "12px", flexShrink: 0 }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        ) : (
                          <div style={{ display: "flex", padding: "2px 8px", alignItems: "center", borderRadius: "9999px", border: "1px solid #E9EAEB", background: "#FAFAFA" }}>
                            <div style={{ color: "#414651", textAlign: "center", fontFamily: "var(--Font-family-font-family-body, 'Public Sans')", fontSize: "12px", fontStyle: "normal", fontWeight: 500, lineHeight: "18px" }}>
                              {packageQuantities["motor-vehicle-driving"] || 1}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Authorization Tab - always show */}
                    <div
                      onClick={() => {
                        const el = document.querySelector(
                          '[data-section="authorization"]',
                        );
                        if (el)
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }}
                      style={{
                        ...tabContainerStyle(authorizationChecked),
                        display: selectedPackage ? "flex" : "none",
                      }}
                    >
                      <div
                        style={{
                          color: authorizationChecked ? "#414651" : "#717680",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Authorization
                      </div>
                      {authorizationChecked && (
                        <div
                          style={{
                            display: "flex",
                            width: "24px",
                            height: "24px",
                            padding: "6px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "9999px",
                            background: "#DCFAE6",
                          }}
                        >
                          <svg
                            style={{
                              width: "12px",
                              height: "12px",
                              flexShrink: 0,
                            }}
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="#079455"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Package and Products Container */}
              <div
                data-section="package-and-products"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderRadius: "12px",
                  border: "1px solid #E9EAEB",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  overflow: "hidden",
                }}
              >
                {/* Section Header */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "20px",
                    alignSelf: "stretch",
                    background: "#FFF",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "20px 24px 0 24px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "4px",
                          flex: "1 0 0",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            gap: "2px",
                            flex: "1 0 0",
                          }}
                        >
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
                                color: "#181D27",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-lg, 18px)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-lg, 28px)",
                              }}
                            >
                              Package and Products
                            </div>
                            {/* Completed Badge - only show when CSD Standard is selected */}
                            {selectedPackage === "csd-standard" && (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "2px 8px",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    border: "1px solid #ABEFC6",
                                    background: "#ECFDF3",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#067647",
                                      textAlign: "center",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "18px",
                                    }}
                                  >
                                    Completed
                                  </div>
                                </div>

                                {/* Featured Icon with Checkmark */}
                                <div
                                  style={{
                                    display: "flex",
                                    width: "28px",
                                    height: "28px",
                                    padding: "6px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    background: "#DCFAE6",
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M13.3327 4L5.99935 11.3333L2.66602 8"
                                      stroke="#079455"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Actions */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <button
                          onClick={() =>
                            setSectionsCollapsed((prev) => ({
                              ...prev,
                              packageAndProducts: !prev.packageAndProducts,
                            }))
                          }
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            style={{
                              width: "16px",
                              height: "16px",
                              transform: sectionsCollapsed.packageAndProducts
                                ? "none"
                                : "rotate(180deg)",
                              transition: "transform 0.2s ease",
                            }}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 10L8 6L4 10"
                              stroke="#A4A7AE"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {sectionsCollapsed.packageAndProducts && (
                  <div
                    style={{
                      padding: "0 24px 20px 24px",
                      alignSelf: "stretch",
                    }}
                  />
                )}
                {/* Content */}
                <div
                  style={{
                    display: sectionsCollapsed.packageAndProducts
                      ? "none"
                      : "flex",
                    padding: "12px 24px 16px 24px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  {/* Section Title */}
                  <div
                    style={{
                      color: "#181D27",
                      fontFamily:
                        "var(--Font-family-font-family-body, 'Public Sans')",
                      fontSize: "var(--Font-size-text-md, 16px)",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "var(--Line-height-text-md, 24px)",
                    }}
                  >
                    Package and Products
                  </div>

                  {/* Select Component */}
                  <div
                    style={{
                      display: "flex",
                      width: isDesktop ? "470px" : "100%",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "6px",
                      maxWidth: "100%",
                    }}
                  >
                    {/* Input with label */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* Label wrapper */}
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
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Choose Package
                        </div>
                      </div>

                      {/* Select Component */}
                      <Select
                        value={selectedPackage}
                        onValueChange={setSelectedPackage}
                      >
                        <SelectTrigger
                          style={{
                            display: "flex",
                            padding: "8px 12px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontWeight: 400,
                            lineHeight: "var(--Line-height-text-md, 24px)",
                            color: "#181D27",
                            height: "48px",
                          }}
                        >
                          <SelectValue placeholder="Select a package" />
                        </SelectTrigger>
                        <SelectContent
                          style={{
                            maxHeight: "256px",
                            padding: "4px 0",
                            borderRadius: "8px",
                            border: "1px solid rgba(0, 0, 0, 0.08)",
                            background: "#FFF",
                            boxShadow:
                              "0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03), 0 2px 2px -1px rgba(10, 13, 18, 0.04)",
                            zIndex: 50,
                          }}
                        >
                          <SelectItem
                            value="csd-standard"
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#181D27",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  CSD Standard
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="option-1"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  [Option]
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="option-2"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  [Option]
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="option-3"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  [Option]
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="option-4"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  [Option]
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="option-5"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  [Option]
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="option-6"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  [Option]
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="orlando-diggs"
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#181D27",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Orlando Diggs
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="retail"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Retail
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="mvr"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  MVR
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="sales"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Sales
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="executive"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Executive
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="operations"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Operations
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="hourly"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Hourly
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="cbsv"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  CBSV
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="dot"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  DOT
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="new-york"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  New York
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="immunization-records"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Immunization Records
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="just-mvr"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Just MVR
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="hasc-contractor"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  HASC Contractor
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="applicant-provided-address-only"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Applicant provided address only
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="employment-only"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Employment Only
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="sap-10"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  SAP 10
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="identity-check-package"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Identity Check Package
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="identity-check-test-package-includes-product"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Identity Check Test Package Includes Product
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="standard-with-edu-and-emp"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Standard with EDU and EMP
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="test"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Test
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="executive-plus"
                            disabled
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "default",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#717680",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Executive Plus
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="portal"
                            style={{
                              display: "flex",
                              padding: "1px 6px",
                              alignItems: "center",
                              alignSelf: "stretch",
                              position: "relative",
                              margin: 0,
                              borderRadius: 0,
                              background: "transparent",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                                borderRadius: "6px",
                                position: "relative",
                              }}
                            >
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
                                    color: "#181D27",
                                    fontFamily:
                                      "'Public Sans', -apple-system, Roboto, Helvetica, sans-serif",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    position: "relative",
                                  }}
                                >
                                  Portal
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Hint text */}
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#535862",
                        fontFamily:
                          "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "var(--Font-size-text-sm, 14px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "var(--Line-height-text-sm, 20px)",
                      }}
                    >
                      Pre-checked items are your most commonly ordered services.
                      Any additional items you order will be added to your bill.
                    </div>
                  </div>

                  {/* Conditional CSD Standard Content */}
                  {selectedPackage === "csd-standard" && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                        flexWrap: "wrap",
                        gap: "20px",
                      }}
                    >
                      {/* Left Column */}
                      <div
                        style={{
                          display: "flex",
                          width: isDesktop ? "324px" : "100%",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          minWidth: isDesktop ? "300px" : "100%",
                        }}
                      >
                        {/* Background Section */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "8px",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Background
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Checkbox
                                checked={
                                  packageCheckboxes["social-security-trace"] ||
                                  false
                                }
                                onCheckedChange={(checked) =>
                                  handleCheckboxChange(
                                    "social-security-trace",
                                    !!checked,
                                  )
                                }
                                className="h-4 w-4 rounded-[4px] border border-[#D5D7DA] data-[state=checked]:bg-[#34479A] data-[state=checked]:border-transparent data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#34479A]"
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Social Security Trace
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Verification Services Section */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "8px",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              color: "#000",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Verification Services
                          </div>

                          {/* Employment */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  paddingTop: "2px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Checkbox
                                  checked={
                                    packageCheckboxes["employment"] || false
                                  }
                                  onCheckedChange={(checked) =>
                                    handleCheckboxChange(
                                      "employment",
                                      !!checked,
                                    )
                                  }
                                  className="h-4 w-4 rounded-[4px] border border-[#D5D7DA] data-[state=checked]:bg-[#34479A] data-[state=checked]:border-transparent data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#34479A]"
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: "4px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "'Public Sans'",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Employment
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_help2)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_help2">
                                          <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Select
                              value={
                                packageQuantities["employment"]?.toString() ||
                                "1"
                              }
                              onValueChange={(value) =>
                                handleQuantityChange(
                                  "employment",
                                  parseInt(value),
                                )
                              }
                              disabled={!packageCheckboxes["employment"]}
                            >
                              <SelectTrigger
                                style={{
                                  display: "flex",
                                  height: "32px",
                                  padding: "6px 8px",
                                  alignItems: "center",
                                  gap: "8px",
                                  width: "55px",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: packageCheckboxes["employment"]
                                    ? "#FFF"
                                    : "#FAFAFA",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  fontSize: "14px",
                                  color: "#717680",
                                  cursor: packageCheckboxes["employment"]
                                    ? "pointer"
                                    : "not-allowed",
                                  opacity: packageCheckboxes["employment"]
                                    ? 1
                                    : 0.6,
                                }}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              {packageCheckboxes["employment"] && (
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                              )}
                            </Select>
                          </div>

                          {/* Education */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  paddingTop: "2px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Checkbox
                                  checked={
                                    packageCheckboxes["education"] || false
                                  }
                                  onCheckedChange={(checked) =>
                                    handleCheckboxChange("education", !!checked)
                                  }
                                  className="h-4 w-4 rounded-[4px] border border-[#D5D7DA] data-[state=checked]:bg-[#34479A] data-[state=checked]:border-transparent data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#34479A]"
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: "4px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "'Public Sans'",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Education
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_help3)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_help3">
                                          <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Select
                              value={
                                packageQuantities["education"]?.toString() ||
                                "1"
                              }
                              onValueChange={(value) =>
                                handleQuantityChange(
                                  "education",
                                  parseInt(value),
                                )
                              }
                              disabled={!packageCheckboxes["education"]}
                            >
                              <SelectTrigger
                                style={{
                                  display: "flex",
                                  height: "32px",
                                  padding: "6px 8px",
                                  alignItems: "center",
                                  gap: "8px",
                                  width: "55px",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: packageCheckboxes["education"]
                                    ? "#FFF"
                                    : "#FAFAFA",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  fontSize: "14px",
                                  color: "#717680",
                                  cursor: packageCheckboxes["education"]
                                    ? "pointer"
                                    : "not-allowed",
                                  opacity: packageCheckboxes["education"]
                                    ? 1
                                    : 0.6,
                                }}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              {packageCheckboxes["education"] && (
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                              )}
                            </Select>
                          </div>

                          {/* Professional References */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  paddingTop: "2px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Checkbox
                                  checked={
                                    packageCheckboxes[
                                      "professional-references"
                                    ] || false
                                  }
                                  onCheckedChange={(checked) =>
                                    handleCheckboxChange(
                                      "professional-references",
                                      !!checked,
                                    )
                                  }
                                  className="h-4 w-4 rounded-[4px] border border-[#D5D7DA] data-[state=checked]:bg-[#34479A] data-[state=checked]:border-transparent data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#34479A]"
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: "4px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "'Public Sans'",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Professional References
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_help4)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_help4">
                                          <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Select
                              value={
                                packageQuantities[
                                  "professional-references"
                                ]?.toString() || "1"
                              }
                              onValueChange={(value) =>
                                handleQuantityChange(
                                  "professional-references",
                                  parseInt(value),
                                )
                              }
                              disabled={
                                !packageCheckboxes["professional-references"]
                              }
                            >
                              <SelectTrigger
                                style={{
                                  display: "flex",
                                  height: "32px",
                                  padding: "6px 8px",
                                  alignItems: "center",
                                  gap: "8px",
                                  width: "55px",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: packageCheckboxes[
                                    "professional-references"
                                  ]
                                    ? "#FFF"
                                    : "#FAFAFA",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  fontSize: "14px",
                                  color: "#717680",
                                  cursor: packageCheckboxes[
                                    "professional-references"
                                  ]
                                    ? "pointer"
                                    : "not-allowed",
                                  opacity: packageCheckboxes[
                                    "professional-references"
                                  ]
                                    ? 1
                                    : 0.6,
                                }}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              {packageCheckboxes["professional-references"] && (
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                              )}
                            </Select>
                          </div>

                          {/* Credentials-Professional License */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  paddingTop: "2px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Checkbox
                                  checked={
                                    packageCheckboxes[
                                      "credentials-professional-license"
                                    ] || false
                                  }
                                  onCheckedChange={(checked) =>
                                    handleCheckboxChange(
                                      "credentials-professional-license",
                                      !!checked,
                                    )
                                  }
                                  className="h-4 w-4 rounded-[4px] border border-[#D5D7DA] data-[state=checked]:bg-[#34479A] data-[state=checked]:border-transparent data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#34479A]"
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: "4px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#414651",
                                      fontFamily: "'Public Sans'",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Credentials-Professional License
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_help5)">
                                        <path
                                          d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_help5">
                                          <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Select
                              value={
                                packageQuantities[
                                  "credentials-professional-license"
                                ]?.toString() || "1"
                              }
                              onValueChange={(value) =>
                                handleQuantityChange(
                                  "credentials-professional-license",
                                  parseInt(value),
                                )
                              }
                              disabled={
                                !packageCheckboxes[
                                  "credentials-professional-license"
                                ]
                              }
                            >
                              <SelectTrigger
                                style={{
                                  display: "flex",
                                  height: "32px",
                                  padding: "6px 8px",
                                  alignItems: "center",
                                  gap: "8px",
                                  width: "55px",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: packageCheckboxes[
                                    "credentials-professional-license"
                                  ]
                                    ? "#FFF"
                                    : "#FAFAFA",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  fontSize: "14px",
                                  color: "#717680",
                                  cursor: packageCheckboxes[
                                    "credentials-professional-license"
                                  ]
                                    ? "pointer"
                                    : "not-allowed",
                                  opacity: packageCheckboxes[
                                    "credentials-professional-license"
                                  ]
                                    ? 1
                                    : 0.6,
                                }}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              {packageCheckboxes[
                                "credentials-professional-license"
                              ] && (
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                              )}
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Middle Column */}
                      <div
                        style={{
                          display: "flex",
                          width: isDesktop ? "324px" : "100%",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "13px",
                          minWidth: isDesktop ? "300px" : "100%",
                        }}
                      >
                        {/* Data Base Services Section */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "8px",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              color: "#000",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Data Base Services
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "16px",
                                  height: "16px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                  background: "#F5F5F5",
                                }}
                              >
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    flexShrink: 0,
                                  }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.3332 4L5.99984 11.3333L2.6665 8"
                                    stroke="#D5D7DA"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  MJD
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help6)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help6">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Other Products Section */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "8px",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              color: "#000",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Other Products
                          </div>

                          {/* Data Collection */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Checkbox
                                checked={
                                  packageCheckboxes["data-collection"] || false
                                }
                                onCheckedChange={(checked) =>
                                  handleCheckboxChange(
                                    "data-collection",
                                    !!checked,
                                  )
                                }
                                className="h-4 w-4 rounded-[4px] border border-[#D5D7DA] data-[state=checked]:bg-[#34479A] data-[state=checked]:border-transparent data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#34479A]"
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Data Collection
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help7)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help7">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* DOT Drug Test and Physical */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "16px",
                                  height: "16px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                  background: "#F5F5F5",
                                }}
                              >
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    flexShrink: 0,
                                  }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.3332 4L5.99984 11.3333L2.6665 8"
                                    stroke="#D5D7DA"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  DOT Drug Test and Physical
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help8)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help8">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div
                        style={{
                          display: "flex",
                          width: isDesktop ? "324px" : "100%",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          minWidth: isDesktop ? "300px" : "100%",
                        }}
                      >
                        {/* Public Records Section */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "8px",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Public Records
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Checkbox
                                checked={
                                  packageCheckboxes[
                                    "county-criminal-history"
                                  ] || false
                                }
                                onCheckedChange={(checked) =>
                                  handleCheckboxChange(
                                    "county-criminal-history",
                                    !!checked,
                                  )
                                }
                                className="h-4 w-4 rounded-[4px] border border-[#D5D7DA] data-[state=checked]:bg-[#34479A] data-[state=checked]:border-transparent data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#34479A]"
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  County/Statewide Criminal History 7yr
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help9)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help9">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Additional Services Section */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "8px",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              alignSelf: "stretch",
                              color: "#181D27",
                              fontFamily: "'Public Sans'",
                              fontSize: "14px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Additional Services
                          </div>

                          {/* Motor Vehicle Driving History */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Checkbox
                                checked={
                                  packageCheckboxes["motor-vehicle-driving"] ||
                                  false
                                }
                                onCheckedChange={(checked) =>
                                  handleCheckboxChange(
                                    "motor-vehicle-driving",
                                    !!checked,
                                  )
                                }
                                className="h-4 w-4 rounded-[4px] border border-[#D5D7DA] data-[state=checked]:bg-[#34479A] data-[state=checked]:border-transparent data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#34479A]"
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Motor Vehicle Driving History
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help10)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help10">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Court Criminal Monitoring */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "16px",
                                  height: "16px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                  background: "#F5F5F5",
                                }}
                              >
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    flexShrink: 0,
                                  }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.3332 4L5.99984 11.3333L2.6665 8"
                                    stroke="#D5D7DA"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#717680",
                                    fontFamily: "'Public Sans'",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Court Criminal Monitoring
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help11)">
                                      <path
                                        d="M6.06016 5.99992C6.2169 5.55436 6.52626 5.17866 6.93347 4.93934C7.34067 4.70002 7.81943 4.61254 8.28495 4.69239C8.75047 4.77224 9.17271 5.01427 9.47688 5.3756C9.78106 5.73694 9.94753 6.19427 9.94683 6.66659C9.94683 7.99992 7.94683 8.66659 7.94683 8.66659M8.00016 11.3333H8.00683M14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help11">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  <div
                    style={{
                      display: "flex",
                      padding: "4px 0",
                      alignItems: "center",
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

                  {/* Requester */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        color: "#181D27",
                        fontFamily:
                          "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "var(--Font-size-text-md, 16px)",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "var(--Line-height-text-md, 24px)",
                      }}
                    >
                      Requester
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                        flexWrap: isDesktop ? "nowrap" : "wrap",
                      }}
                    >
                      {/* Requester Select */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: "1 0 0",
                          minWidth: isDesktop ? "auto" : "100%",
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Requester
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "8px 12px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <div
                            style={{
                              flex: "1 0 0",
                              color: "#181D27",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-md, 16px)",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "var(--Line-height-text-md, 24px)",
                            }}
                          >
                            Alexandra Fitzwilliam
                          </div>
                          <svg
                            style={{
                              width: "24px",
                              height: "24px",
                            }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="#A4A7AE"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Fax Input */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: "1 0 0",
                          minWidth: isDesktop ? "auto" : "100%",
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Fax
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "8px 12px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <div
                            style={{
                              flex: "1 0 0",
                              color: "#717680",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-md, 16px)",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "var(--Line-height-text-md, 24px)",
                            }}
                          >
                            000-0000
                          </div>
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: "1 0 0",
                          minWidth: isDesktop ? "auto" : "100%",
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-sm, 14px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-sm, 20px)",
                          }}
                        >
                          Phone
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "8px 12px",
                            alignItems: "center",
                            gap: "8px",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          }}
                        >
                          <div
                            style={{
                              flex: "1 0 0",
                              color: "#717680",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-md, 16px)",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "var(--Line-height-text-md, 24px)",
                            }}
                          >
                            (000) 000 - 0000
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider (old, hidden) */}
              <div
                style={{
                  display: "none",
                  padding: "4px 0",
                  alignItems: "center",
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

              {/* Requester Section (old, hidden) */}
              <div
                style={{
                  display: "none",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderRadius: "12px",
                  border: "1px solid #E9EAEB",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  overflow: "hidden",
                }}
              >
                {/* Content */}
                <div
                  style={{
                    display: "flex",
                    padding: "12px 24px 16px 24px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  {/* Section Title */}
                  <div
                    style={{
                      color: "#181D27",
                      fontFamily:
                        "var(--Font-family-font-family-body, 'Public Sans')",
                      fontSize: "var(--Font-size-text-md, 16px)",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "var(--Line-height-text-md, 24px)",
                    }}
                  >
                    Requester
                  </div>

                  {/* Input Fields Row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                      flexWrap: isDesktop ? "nowrap" : "wrap",
                    }}
                  >
                    {/* Requester Select */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                        flex: "1 0 0",
                        minWidth: isDesktop ? "auto" : "100%",
                      }}
                    >
                      {/* Label */}
                      <div
                        style={{
                          color: "#414651",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Requester
                      </div>
                      {/* Select Input */}
                      <div
                        style={{
                          display: "flex",
                          padding: "8px 12px",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      >
                        <div
                          style={{
                            flex: "1 0 0",
                            color: "#181D27",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-md, 24px)",
                          }}
                        >
                          Alexandra Fitzwilliam
                        </div>
                        <svg
                          style={{
                            width: "24px",
                            height: "24px",
                          }}
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="#A4A7AE"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Fax Input */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                        flex: "1 0 0",
                        minWidth: isDesktop ? "auto" : "100%",
                      }}
                    >
                      {/* Label */}
                      <div
                        style={{
                          color: "#414651",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Fax
                      </div>
                      {/* Input */}
                      <div
                        style={{
                          display: "flex",
                          padding: "8px 12px",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      >
                        <div
                          style={{
                            flex: "1 0 0",
                            color: "#717680",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "var(--Line-height-text-md, 24px)",
                          }}
                        >
                          000-0000
                        </div>
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                        flex: "1 0 0",
                        minWidth: isDesktop ? "auto" : "100%",
                      }}
                    >
                      {/* Label */}
                      <div
                        style={{
                          color: "#414651",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Phone
                      </div>
                      {/* Input */}
                      <div
                        style={{
                          display: "flex",
                          padding: "8px 12px",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        }}
                      >
                        <div
                          style={{
                            flex: "1 0 0",
                            color: "#717680",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "var(--Line-height-text-md, 24px)",
                          }}
                        >
                          (000) 000 - 0000
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedPackage && (
                <>
                  {/* Subject Section */}
                  <div
                    data-section="subject"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      borderRadius: "12px",
                      border: "1px solid #E9EAEB",
                      background: "#FFF",
                      boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Section Header */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "20px",
                        alignSelf: "stretch",
                        background: "#FFF",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: "20px 24px 0 24px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "4px",
                              flex: "1 0 0",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                gap: "2px",
                                flex: "1 0 0",
                              }}
                            >
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
                                    color: "#181D27",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-lg, 18px)",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight:
                                      "var(--Line-height-text-lg, 28px)",
                                  }}
                                >
                                  Subject
                                </div>
                                {isSubjectCompleted() && (
                                  <>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "2px 8px",
                                        alignItems: "center",
                                        borderRadius: "9999px",
                                        border: "1px solid #ABEFC6",
                                        background: "#ECFDF3",
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#067647",
                                          textAlign: "center",
                                          fontFamily:
                                            "var(--Font-family-font-family-body, 'Public Sans')",
                                          fontSize: "12px",
                                          fontStyle: "normal",
                                          fontWeight: 500,
                                          lineHeight: "18px",
                                        }}
                                      >
                                        Completed
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        width: "28px",
                                        height: "28px",
                                        padding: "6px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "9999px",
                                        background: "#DCFAE6",
                                      }}
                                    >
                                      <svg
                                        style={{
                                          width: "16px",
                                          height: "16px",
                                          flexShrink: 0,
                                        }}
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M13.3327 4L5.99935 11.3333L2.66602 8"
                                          stroke="#079455"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <button
                              onClick={() =>
                                setSectionsCollapsed((prev) => ({
                                  ...prev,
                                  subject: !prev.subject,
                                }))
                              }
                              style={{
                                display: "flex",
                                padding: "8px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor: "pointer",
                              }}
                            >
                              <svg
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  transform: sectionsCollapsed.subject
                                    ? "none"
                                    : "rotate(180deg)",
                                  transition: "transform 0.2s ease",
                                }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 6L8 10L12 6"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {sectionsCollapsed.subject && (
                      <div
                        style={{
                          padding: "0 24px 20px 24px",
                          alignSelf: "stretch",
                        }}
                      />
                    )}

                    {/* Content */}
                    <div
                      style={{
                        display: sectionsCollapsed.subject ? "none" : "flex",
                        padding: "12px 24px 16px 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      {/* General Setup Section */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-md, 24px)",
                          }}
                        >
                          General Setup
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            alignContent: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                            flexWrap: "wrap",
                          }}
                        >
                          {/* Checkbox 1 */}
                          <div
                            style={{
                              display: "flex",
                              width: "505px",
                              alignItems: "flex-start",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Checkbox className="h-4 w-4 rounded-[4px] border border-[#D5D7DA] data-[state=checked]:bg-[#34479A] data-[state=checked]:border-transparent data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#34479A]" />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "320px",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
                                  }}
                                >
                                  Collect PII (SSN and/or DOB) from applicant?
                                </div>
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    flexShrink: 0,
                                  }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_6334_1458)">
                                    <path
                                      d="M6.05992 6.00004C6.21665 5.55449 6.52602 5.17878 6.93322 4.93946C7.34042 4.70015 7.81918 4.61267 8.2847 4.69252C8.75022 4.77236 9.17246 5.01439 9.47664 5.37573C9.78081 5.73706 9.94729 6.19439 9.94659 6.66671C9.94659 8.00004 7.94659 8.66671 7.94659 8.66671M7.99992 11.3334H8.00659M14.6666 8.00004C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8.00004C1.33325 4.31814 4.31802 1.33337 7.99992 1.33337C11.6818 1.33337 14.6666 4.31814 14.6666 8.00004Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_6334_1458">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                          </div>
                          {/* Checkbox 2 */}
                          <div
                            style={{
                              display: "flex",
                              width: "505px",
                              alignItems: "flex-start",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Checkbox className="h-4 w-4 rounded-[4px] border border-[#D5D7DA] data-[state=checked]:bg-[#34479A] data-[state=checked]:border-transparent data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#34479A]" />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "320px",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
                                  }}
                                >
                                  Send order to applicant to complete?
                                </div>
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    flexShrink: 0,
                                  }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_6334_1468)">
                                    <path
                                      d="M6.05992 6.00004C6.21665 5.55449 6.52602 5.17878 6.93322 4.93946C7.34042 4.70015 7.81918 4.61267 8.2847 4.69252C8.75022 4.77236 9.17246 5.01439 9.47664 5.37573C9.78081 5.73706 9.94729 6.19439 9.94659 6.66671C9.94659 8.00004 7.94659 8.66671 7.94659 8.66671M7.99992 11.3334H8.00659M14.6666 8.00004C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8.00004C1.33325 4.31814 4.31802 1.33337 7.99992 1.33337C11.6818 1.33337 14.6666 4.31814 14.6666 8.00004Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_6334_1468">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                          </div>
                          {/* Checkbox 3 */}
                          <div
                            style={{
                              display: "flex",
                              width: "505px",
                              alignItems: "flex-start",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Checkbox className="h-4 w-4 rounded-[4px] border border-[#D5D7DA] data-[state=checked]:bg-[#34479A] data-[state=checked]:border-transparent data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#34479A]" />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "320px",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
                                  }}
                                >
                                  Require applicant to electronically sign a
                                  release?
                                </div>
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    flexShrink: 0,
                                  }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_6334_1478)">
                                    <path
                                      d="M6.05992 6.00004C6.21665 5.55449 6.52602 5.17878 6.93322 4.93946C7.34042 4.70015 7.81918 4.61267 8.2847 4.69252C8.75022 4.77236 9.17246 5.01439 9.47664 5.37573C9.78081 5.73706 9.94729 6.19439 9.94659 6.66671C9.94659 8.00004 7.94659 8.66671 7.94659 8.66671M7.99992 11.3334H8.00659M14.6666 8.00004C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8.00004C1.33325 4.31814 4.31802 1.33337 7.99992 1.33337C11.6818 1.33337 14.6666 4.31814 14.6666 8.00004Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_6334_1478">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                          </div>
                          {/* Checkbox 4 */}
                          <div
                            style={{
                              display: "flex",
                              width: "505px",
                              alignItems: "flex-start",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Checkbox className="h-4 w-4 rounded-[4px] border border-[#D5D7DA] data-[state=checked]:bg-[#34479A] data-[state=checked]:border-transparent data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#34479A]" />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "320px",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
                                  }}
                                >
                                  Require applicant to pay for their order?
                                </div>
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    flexShrink: 0,
                                  }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_6334_1488)">
                                    <path
                                      d="M6.05992 6.00004C6.21665 5.55449 6.52602 5.17878 6.93322 4.93946C7.34042 4.70015 7.81918 4.61267 8.2847 4.69252C8.75022 4.77236 9.17246 5.01439 9.47664 5.37573C9.78081 5.73706 9.94729 6.19439 9.94659 6.66671C9.94659 8.00004 7.94659 8.66671 7.94659 8.66671M7.99992 11.3334H8.00659M14.6666 8.00004C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8.00004C1.33325 4.31814 4.31802 1.33337 7.99992 1.33337C11.6818 1.33337 14.6666 4.31814 14.6666 8.00004Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_6334_1488">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div
                        style={{
                          alignSelf: "stretch",
                          height: "1px",
                          background: "#E9EAEB",
                        }}
                      />

                      {/* Requester Information Section */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-md, 24px)",
                          }}
                        >
                          Requester Information
                        </div>
                        {/* Name fields row */}
                        <div
                          className="stack-mobile-row"
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                          }}
                        >
                          {/* First Name */}
                          <FormInput
                            label="First Name"
                            value={subjectFields.firstName}
                            onChange={(value) => {
                              setSubjectFields(prev => ({ ...prev, firstName: value }));
                              setSubjectFirstName(value); // Keep legacy state in sync
                            }}
                            required
                            style={{ flex: "1 0 0" }}
                          />
                          {/* Middle Name */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Middle Name
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "6px 8px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                value={subjectFields.middleName || subjectMiddleName}
                                onChange={(e) => {
                                  setSubjectFields(prev => ({ ...prev, middleName: e.target.value }));
                                  setSubjectMiddleName(e.target.value);
                                }}
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#717680",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>
                          {/* Last Name */}
                          <FormInput
                            label="Last Name"
                            value={subjectFields.lastName}
                            onChange={(value) => {
                              setSubjectFields(prev => ({ ...prev, lastName: value }));
                              setSubjectLastName(value);
                            }}
                            required
                            style={{ flex: "1 0 0" }}
                          />
                        </div>
                        {/* Add More AKAs Button */}
                        <button
                          onClick={() => setShowAKAForm(true)}
                          style={{
                            display: "flex",
                            minHeight: "36px",
                            padding: "6px 8px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "4px",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
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
                                color: "#414651",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-sm, 14px)",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "var(--Line-height-text-sm, 20px)",
                              }}
                            >
                              Add More AKAs
                            </div>
                          </div>
                        </button>

                        {/* Inline AKA Form - shows when Add More AKAs is clicked */}
                        {showAKAForm && (
                          <div
                            style={{
                              display: "flex",
                              padding: "8px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "4px",
                              alignSelf: "stretch",
                              borderRadius: "10px",
                              border: "1px solid #E9EAEB",
                              background: "#FAFAFA",
                            }}
                          >
                            {/* Title with minus button */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                alignSelf: "stretch",
                              }}
                            >
                              <div
                                style={{
                                  color: "#181D27",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              >
                                AKA's
                              </div>
                              <button
                                onClick={() => setShowAKAForm(false)}
                                style={{
                                  display: "flex",
                                  padding: "8px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  cursor: "pointer",
                                }}
                              >
                                <svg
                                  style={{ width: "16px", height: "16px" }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_minus_circle)">
                                    <path
                                      d="M5.33331 8.00004H10.6666M14.6666 8.00004C14.6666 11.6819 11.6819 14.6667 7.99998 14.6667C4.31808 14.6667 1.33331 11.6819 1.33331 8.00004C1.33331 4.31814 4.31808 1.33337 7.99998 1.33337C11.6819 1.33337 14.6666 4.31814 14.6666 8.00004Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_minus_circle">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </div>

                            {/* AKA Input Fields */}
                            <div
                              style={{
                                display: "flex",
                                height: "92px",
                                alignItems: "center",
                                gap: "16px",
                                alignSelf: "stretch",
                              }}
                            >
                              {/* Other First Name */}
                              <div
                                style={{
                                  display: "flex",
                                  height: "66px",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
                                  }}
                                >
                                  Other First Name
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "8px 12px",
                                    alignItems: "center",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <input
                                    type="text"
                                    defaultValue="Alexander"
                                    style={{
                                      flex: "1 0 0",
                                      border: "none",
                                      outline: "none",
                                      background: "transparent",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize:
                                        "var(--Font-size-text-md, 16px)",
                                      fontWeight: 400,
                                      color: "#181D27",
                                      lineHeight:
                                        "var(--Line-height-text-md, 24px)",
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Other Middle Name */}
                              <div
                                style={{
                                  display: "flex",
                                  height: "66px",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
                                  }}
                                >
                                  Other Middle Name
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "8px 12px",
                                    alignItems: "center",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <input
                                    type="text"
                                    defaultValue="J"
                                    style={{
                                      flex: "1 0 0",
                                      border: "none",
                                      outline: "none",
                                      background: "transparent",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize:
                                        "var(--Font-size-text-md, 16px)",
                                      fontWeight: 400,
                                      color: "#181D27",
                                      lineHeight:
                                        "var(--Line-height-text-md, 24px)",
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Other Last Name */}
                              <div
                                style={{
                                  display: "flex",
                                  height: "66px",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
                                  }}
                                >
                                  Other Last Name
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "8px 12px",
                                    alignItems: "center",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <input
                                    type="text"
                                    defaultValue="Smith T"
                                    style={{
                                      flex: "1 0 0",
                                      border: "none",
                                      outline: "none",
                                      background: "transparent",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize:
                                        "var(--Font-size-text-md, 16px)",
                                      fontWeight: 400,
                                      color: "#181D27",
                                      lineHeight:
                                        "var(--Line-height-text-md, 24px)",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Divider */}
                        <div
                          style={{
                            alignSelf: "stretch",
                            height: "1px",
                            background: "#E9EAEB",
                          }}
                        />

                        {/* Address Grid */}
                        <div
                          className="stack-mobile tablet-two"
                          style={{
                            display: "grid",
                            rowGap: "16px",
                            columnGap: "16px",
                            alignSelf: "stretch",
                            gridTemplateRows: "repeat(2, minmax(0, 1fr))",
                            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                          }}
                        >
                          {/* DOB */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              gridRow: "1 / span 1",
                              gridColumn: "1 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                DOB (MM/DD/YYYY)
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
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
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <svg
                                style={{ width: "24px", height: "24px" }}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <input
                                type="text"
                                value={subjectFields.dob}
                                onChange={(e) => setSubjectFields(prev => ({ ...prev, dob: e.target.value }))}
                                placeholder="dd/mm/yyyy"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: subjectFields.dob ? "#181D27" : "#717680",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>
                          {/* Zip Code */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              gridRow: "1 / span 1",
                              gridColumn: "2 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Zip Code
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
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
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                value={subjectFields.zipCode}
                                onChange={(e) => setSubjectFields(prev => ({ ...prev, zipCode: e.target.value }))}
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: subjectFields.zipCode ? "#181D27" : "#717680",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>
                          {/* Address */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              gridRow: "1 / span 1",
                              gridColumn: "3 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Address
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
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
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                value={subjectFields.address}
                                onChange={(e) => setSubjectFields(prev => ({ ...prev, address: e.target.value }))}
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: subjectFields.address ? "#181D27" : "#717680",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>
                          {/* Country */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              gridRow: "2 / span 1",
                              gridColumn: "1 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Country
                              </div>
                            </div>
                            <Select value={subjectFields.country} onValueChange={(v) => setSubjectFields(prev => ({ ...prev, country: v }))}>
                              <SelectTrigger
                                style={{
                                  display: "flex",
                                  padding: "8px 12px",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              >
                                <SelectValue placeholder="USA" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="usa">USA</SelectItem>
                                <SelectItem value="canada">Canada</SelectItem>
                                <SelectItem value="mexico">Mexico</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {/* State */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              gridRow: "2 / span 1",
                              gridColumn: "2 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                State
                              </div>
                            </div>
                            <Select value={subjectFields.state} onValueChange={(v) => setSubjectFields(prev => ({ ...prev, state: v }))}>
                              <SelectTrigger
                                style={{
                                  display: "flex",
                                  padding: "8px 12px",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#717680",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              >
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="california">
                                  California
                                </SelectItem>
                                <SelectItem value="texas">Texas</SelectItem>
                                <SelectItem value="florida">Florida</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {/* City */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              gridRow: "2 / span 1",
                              gridColumn: "3 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                City
                              </div>
                            </div>
                            <Select value={subjectFields.city} onValueChange={(v) => setSubjectFields(prev => ({ ...prev, city: v }))}>
                              <SelectTrigger
                                style={{
                                  display: "flex",
                                  padding: "8px 12px",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#717680",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              >
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="los-angeles">
                                  Los Angeles
                                </SelectItem>
                                <SelectItem value="san-francisco">
                                  San Francisco
                                </SelectItem>
                                <SelectItem value="san-diego">
                                  San Diego
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Divider */}
                        <div
                          style={{
                            alignSelf: "stretch",
                            height: "1px",
                            background: "#E9EAEB",
                          }}
                        />

                        {/* FCRA Purpose and Criminal Records Grid */}
                        <div
                          className="stack-mobile"
                          style={{
                            display: "grid",
                            rowGap: "16px",
                            columnGap: "16px",
                            alignSelf: "stretch",
                            gridTemplateRows: "repeat(1, minmax(0, 1fr))",
                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                          }}
                        >
                          {/* FCRA Purpose */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              gridRow: "1 / span 1",
                              gridColumn: "1 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                FCRA Purpose
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_6339_77348)">
                                  <path
                                    d="M6.05992 6.00004C6.21665 5.55449 6.52602 5.17878 6.93322 4.93946C7.34042 4.70015 7.81918 4.61267 8.2847 4.69252C8.75022 4.77236 9.17246 5.01439 9.47664 5.37573C9.78081 5.73706 9.94729 6.19439 9.94659 6.66671C9.94659 8.00004 7.94659 8.66671 7.94659 8.66671M7.99992 11.3334H8.00659M14.6666 8.00004C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8.00004C1.33325 4.31814 4.31802 1.33337 7.99992 1.33337C11.6818 1.33337 14.6666 4.31814 14.6666 8.00004Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_6339_77348">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <Select value={subjectFields.fcra} onValueChange={(v) => setSubjectFields(prev => ({ ...prev, fcra: v }))}>
                              <SelectTrigger
                                style={{
                                  display: "flex",
                                  padding: "8px 12px",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              >
                                <SelectValue placeholder="Employment by Hire or Contract" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="employment">
                                  Employment by Hire or Contract
                                </SelectItem>
                                <SelectItem value="tenant">
                                  Tenant Screening
                                </SelectItem>
                                <SelectItem value="volunteer">
                                  Volunteer Screening
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {/* Criminal Records */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              gridRow: "1 / span 1",
                              gridColumn: "2 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Applicant has know Criminal Records?
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_6339_77362)">
                                  <path
                                    d="M6.05992 6.00004C6.21665 5.55449 6.52602 5.17878 6.93322 4.93946C7.34042 4.70015 7.81918 4.61267 8.2847 4.69252C8.75022 4.77236 9.17246 5.01439 9.47664 5.37573C9.78081 5.73706 9.94729 6.19439 9.94659 6.66671C9.94659 8.00004 7.94659 8.66671 7.94659 8.66671M7.99992 11.3334H8.00659M14.6666 8.00004C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8.00004C1.33325 4.31814 4.31802 1.33337 7.99992 1.33337C11.6818 1.33337 14.6666 4.31814 14.6666 8.00004Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_6339_77362">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <Select value={subjectFields.criminalRecords} onValueChange={(v) => setSubjectFields(prev => ({ ...prev, criminalRecords: v }))}>
                              <SelectTrigger
                                style={{
                                  display: "flex",
                                  padding: "8px 12px",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#717680",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              >
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="unknown">Unknown</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Divider */}
                        <div
                          style={{
                            alignSelf: "stretch",
                            height: "1px",
                            background: "#E9EAEB",
                          }}
                        />

                        {/* Phone and Email Grid */}
                        <div
                          className="stack-mobile"
                          style={{
                            display: "grid",
                            rowGap: "16px",
                            columnGap: "16px",
                            alignSelf: "stretch",
                            gridTemplateRows: "repeat(1, minmax(0, 1fr))",
                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                          }}
                        >
                          {/* Phone */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              gridRow: "1 / span 1",
                              gridColumn: "1 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Applicant Phone
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
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
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  padding: "8px 0 8px 12px",
                                  alignItems: "center",
                                  gap: "2px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#535862",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-md, 16px)",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight:
                                      "var(--Line-height-text-md, 24px)",
                                  }}
                                >
                                  US
                                </div>
                                <svg
                                  style={{ width: "24px", height: "24px" }}
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6 9L12 15L18 9"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "8px 12px 8px 10px",
                                  alignItems: "center",
                                  gap: "8px",
                                  flex: "1 0 0",
                                }}
                              >
                                <input
                                  type="tel"
                                  value={subjectFields.phone}
                                  onChange={(e) => setSubjectFields(prev => ({ ...prev, phone: e.target.value }))}
                                  placeholder="+1 (555) 000-0000"
                                  style={{
                                    flex: "1 0 0",
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-md, 16px)",
                                    fontWeight: 400,
                                    color: subjectFields.phone ? "#181D27" : "#717680",
                                    lineHeight:
                                      "var(--Line-height-text-md, 24px)",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          {/* Email */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              gridRow: "1 / span 1",
                              gridColumn: "2 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Applicant Email
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
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
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="email"
                                value={subjectFields.email}
                                onChange={(e) => setSubjectFields(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="name@example.com"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: subjectFields.email ? "#181D27" : "#717680",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Next Section Button */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            alignSelf: "stretch",
                          }}
                        >
                          <button
                            style={{
                              display: "flex",
                              minHeight: "36px",
                              padding: "6px 8px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
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
                                  color: "#414651",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Next Section
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Employment Section */}
              {packageCheckboxes["employment"] && (
                <div
                  data-section="employment"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 24px 0 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "4px",
                            flex: "1 0 0",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-start",
                              gap: "2px",
                              flex: "1 0 0",
                            }}
                          >
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
                                  color: "#181D27",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-lg, 18px)",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight:
                                    "var(--Line-height-text-lg, 28px)",
                                }}
                              >
                                Employment
                              </div>
                              {isEmploymentCompleted() && (
                                <>
                                  <div style={{ display: "flex", padding: "2px 8px", alignItems: "center", borderRadius: "9999px", border: "1px solid #ABEFC6", background: "#ECFDF3" }}>
                                    <div style={{ color: "#067647", textAlign: "center", fontFamily: "var(--Font-family-font-family-body, 'Public Sans')", fontSize: "12px", fontStyle: "normal", fontWeight: 500, lineHeight: "18px" }}>Completed</div>
                                  </div>
                                  <div style={{ display: "flex", width: "28px", height: "28px", padding: "6px", justifyContent: "center", alignItems: "center", borderRadius: "9999px", background: "#DCFAE6" }}>
                                    <svg style={{ width: "16px", height: "16px", flexShrink: 0 }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke="#079455" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <button
                            onClick={() =>
                              setSectionsCollapsed((prev) => ({
                                ...prev,
                                employment: !prev.employment,
                              }))
                            }
                            style={{
                              display: "flex",
                              padding: "8px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
                            }}
                          >
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                                transform: sectionsCollapsed.employment
                                  ? "none"
                                  : "rotate(180deg)",
                                transition: "transform 0.2s ease",
                              }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 6L8 10L12 6"
                                stroke="#A4A7AE"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {sectionsCollapsed.employment && (
                    <div
                      style={{
                        padding: "0 24px 20px 24px",
                        alignSelf: "stretch",
                      }}
                    />
                  )}

                  {/* Content */}
                  <div
                    style={{
                      display: sectionsCollapsed.employment ? "none" : "flex",
                      padding: "12px 24px 16px 24px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    {/* Employment #1 Container */}
                    <div
                      data-employment-entry="1"
                      style={{
                        display: "flex",
                        padding: "12px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                        borderRadius: "10px",
                        border: "1px solid #E9EAEB",
                        background: "#FAFAFA",
                      }}
                    >
                      {/* Title and Actions */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-md, 24px)",
                          }}
                        >
                          Employment #1
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <button
                            onClick={() => {
                              setPackageCheckboxes((prev) => ({
                                ...prev,
                                employment: false,
                              }));
                              setPackageQuantities((prev) => {
                                const next = { ...prev };
                                delete next["employment"];
                                return next;
                              });
                              setSectionsCollapsed((prev) => ({
                                ...prev,
                                employment: false,
                              }));
                            }}
                            style={{
                              display: "flex",
                              height: "32px",
                              padding: "6px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
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
                                  color: "#414651",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                }}
                              >
                                Remove
                              </div>
                            </div>
                            <svg
                              style={{ width: "16px", height: "16px" }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_minus_circle_employment)">
                                <path
                                  d="M5.33325 7.99992H10.6666M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_minus_circle_employment">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              setEmploymentCollapsedMap((prev) => ({
                                ...prev,
                                1: !prev[1],
                              }))
                            }
                            style={{
                              display: "flex",
                              padding: "8px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
                            }}
                          >
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                                transform: employmentCollapsedMap[1]
                                  ? "none"
                                  : "rotate(180deg)",
                                transition: "transform 0.2s ease",
                              }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 6L8 10L12 6"
                                stroke="#A4A7AE"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Collapsible content for Employment #1 */}
                      <div
                        onChangeCapture={(e) => {
                          const t = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                          if (t && ("value" in t ? String((t as any).value ?? "").trim().length > 0 : false)) {
                            markEmploymentFilled(1, true);
                          }
                        }}
                        style={{
                          display: employmentCollapsedMap[1] ? "none" : "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          alignSelf: "stretch",
                        }}
                      >
                        {/* Disclaimer Checkbox */}
                        <div
                          style={{
                            display: "flex",
                            width: "505px",
                            alignItems: "flex-start",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              paddingTop: "2px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "16px",
                                height: "16px",
                                borderRadius: "4px",
                                border: "1px solid #D5D7DA",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                width: "320px",
                                alignItems: "flex-end",
                                gap: "4px",
                              }}
                            >
                              <div
                                style={{
                                  color: "#414651",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                "Position" listed below is in reference to the
                                subject applicants position. Does Not Apply -
                                check if this item does not apply to you
                              </div>
                              <svg
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  flexShrink: 0,
                                }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_employment)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_employment">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Form Fields Grid */}
                        <div
                          style={{
                            display: "grid",
                            height: "312px",
                            rowGap: "16px",
                            columnGap: "16px",
                            alignSelf: "stretch",
                            gridTemplateRows:
                              "fit-content(100%) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
                            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                          }}
                        >
                          {/* Position Name */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "1 / span 1",
                              gridColumn: "1 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Position Name
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_position)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_position">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>

                          {/* Company Name */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "1 / span 1",
                              gridColumn: "2 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Company Name
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                *
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_company)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_company">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>

                          {/* Income Type */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "1 / span 1",
                              gridColumn: "3 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Income Type
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_income)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_income">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <div
                                style={{
                                  flex: "1 0 0",
                                  color: "#181D27",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              >
                                Hourly
                              </div>
                              <svg
                                style={{ width: "24px", height: "24px" }}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 9L12 15L18 9"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Address 1 */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "2 / span 1",
                              gridColumn: "1 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Address 1
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                *
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_address1)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_address1">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>

                          {/* Address 2 */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "2 / span 1",
                              gridColumn: "2 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Address 2
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_address2)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_address2">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>

                          {/* Zip */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "2 / span 1",
                              gridColumn: "3 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Zip
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                *
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_zip)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_zip">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>

                          {/* State */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "3 / span 1",
                              gridColumn: "1 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                State
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                *
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_state)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_state">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <div
                                style={{
                                  flex: "1 0 0",
                                  color: "#717680",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              >
                                Select
                              </div>
                              <svg
                                style={{ width: "24px", height: "24px" }}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 9L12 15L18 9"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* City */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "3 / span 1",
                              gridColumn: "2 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                City
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                *
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_city)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_city">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <div
                                style={{
                                  flex: "1 0 0",
                                  color: "#717680",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              >
                                Select
                              </div>
                              <svg
                                style={{ width: "24px", height: "24px" }}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 9L12 15L18 9"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Military Position */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "3 / span 1",
                              gridColumn: "3 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Is this a Military Position Y/N?
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_military)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_military">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <svg
                                style={{ width: "24px", height: "24px" }}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 9L12 15L18 9"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* FMCSA Standards */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "4 / span 1",
                              gridColumn: "1 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Were you subject to FMCSA Standards
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_fmcsa)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_fmcsa">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <svg
                                style={{ width: "24px", height: "24px" }}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 9L12 15L18 9"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Employee ID */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "4 / span 1",
                              gridColumn: "2 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Employee ID
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_employee_id)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_employee_id">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>

                          {/* Salary Key */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "4 / span 1",
                              gridColumn: "3 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Salary Key
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_salary)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_salary">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Same as current employer checkbox */}
                        <div
                          style={{
                            display: "flex",
                            width: "505px",
                            alignItems: "flex-start",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              paddingTop: "2px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "16px",
                                height: "16px",
                                borderRadius: "4px",
                                border: "1px solid #D5D7DA",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                width: "320px",
                                alignItems: "flex-end",
                                gap: "4px",
                              }}
                            >
                              <div
                                style={{
                                  color: "#414651",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Same as current employer?
                              </div>
                              <svg
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  flexShrink: 0,
                                }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_same_employer)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_same_employer">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div
                          style={{
                            display: "flex",
                            padding: "4px 0",
                            alignItems: "center",
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

                        {/* Contact Information Row */}
                        <div
                          style={{
                            display: "flex",
                            height: "66px",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                          }}
                        >
                          {/* Contact */}
                          <div
                            style={{
                              display: "flex",
                              height: "66px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Contact
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                *
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_contact)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_contact">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div
                            style={{
                              display: "flex",
                              height: "66px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Email
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_email)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_email">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="email"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>

                          {/* EXT */}
                          <div
                            style={{
                              display: "flex",
                              width: "84px",
                              height: "66px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                EXT
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_ext)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_ext">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>

                          {/* Phone */}
                          <div
                            style={{
                              display: "flex",
                              width: "322px",
                              height: "66px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Phone
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
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
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  padding: "8px 0 8px 12px",
                                  alignItems: "center",
                                  gap: "2px",
                                  alignSelf: "stretch",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#535862",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-md, 16px)",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight:
                                      "var(--Line-height-text-md, 24px)",
                                  }}
                                >
                                  US
                                </div>
                                <svg
                                  style={{ width: "24px", height: "24px" }}
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6 9L12 15L18 9"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "8px 12px 8px 10px",
                                  alignItems: "center",
                                  gap: "8px",
                                  flex: "1 0 0",
                                  alignSelf: "stretch",
                                }}
                              >
                                <input
                                  type="tel"
                                  placeholder="+1"
                                  style={{
                                    flex: "1 0 0",
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-md, 16px)",
                                    fontWeight: 400,
                                    color: "#717680",
                                    lineHeight:
                                      "var(--Line-height-text-md, 24px)",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div
                          style={{
                            display: "flex",
                            padding: "4px 0",
                            alignItems: "center",
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

                        {/* Date Fields and Checkboxes */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                          }}
                        >
                          {/* Date Fields Row */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "16px",
                              alignSelf: "stretch",
                            }}
                          >
                            {/* Start Date */}
                            <div
                              style={{
                                display: "flex",
                                height: "66px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
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
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
                                  }}
                                >
                                  Start Date
                                </div>
                                <div
                                  style={{
                                    color: "#344698",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
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
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    flex: "1 0 0",
                                  }}
                                >
                                  <svg
                                    style={{ width: "24px", height: "24px" }}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            {/* End Date */}
                            <div
                              style={{
                                display: "flex",
                                height: "66px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
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
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
                                  }}
                                >
                                  End Date
                                </div>
                                <div
                                  style={{
                                    color: "#344698",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
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
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    flex: "1 0 0",
                                  }}
                                >
                                  <svg
                                    style={{ width: "24px", height: "24px" }}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Current employer checkbox */}
                          <div
                            style={{
                              display: "flex",
                              width: "505px",
                              alignItems: "flex-start",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "320px",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "var(--Font-size-text-sm, 14px)",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight:
                                      "var(--Line-height-text-sm, 20px)",
                                  }}
                                >
                                  Current employer
                                </div>
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    flexShrink: 0,
                                  }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_help_current_employer)">
                                    <path
                                      d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_help_current_employer">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Reason for Leaving */}
                          <div
                            style={{
                              display: "flex",
                              height: "66px",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Reason for Leaving
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                *
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_reason_leaving)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_reason_leaving">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>

                          {/* Eligible for Rehire */}
                          <div
                            style={{
                              display: "flex",
                              height: "66px",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                Eligible for Rehire
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-sm, 14px)",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight:
                                    "var(--Line-height-text-sm, 20px)",
                                }}
                              >
                                *
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_eligible_rehire)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_eligible_rehire">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-md, 16px)",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight:
                                    "var(--Line-height-text-md, 24px)",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Employment entries (collapsed) */}
                    {Array.from({
                      length: Math.max(
                        0,
                        (packageQuantities["employment"] || 1) - 1,
                      ),
                    }).map((_, i) => {
                      const num = i + 2;
                      return (
                        <div
                          key={`employment-collapsed-${num}`}
                          data-employment-entry={num}
                          style={{
                            display: "flex",
                            padding: "12px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                            borderRadius: "10px",
                            border: "1px solid #E9EAEB",
                            background: "#FAFAFA",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-md, 16px)",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "var(--Line-height-text-md, 24px)",
                              }}
                            >
                              {`Employment #${num}`}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              <button
                                style={{
                                  display: "flex",
                                  padding: "8px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  cursor: "default",
                                }}
                              >
                                <svg
                                  style={{ width: "16px", height: "16px" }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4 6L8 10L12 6"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Action Buttons */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        alignSelf: "stretch",
                      }}
                    >
                      <button
                        onClick={() =>
                          setPackageQuantities((prev) => ({
                            ...prev,
                            employment: (prev["employment"] || 1) + 1,
                          }))
                        }
                        style={{
                          display: "flex",
                          minHeight: "36px",
                          padding: "6px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.12)",
                          background: "#344698",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
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
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Add Another Employee
                          </div>
                        </div>
                      </button>
                      <button
                        style={{
                          display: "flex",
                          minHeight: "36px",
                          padding: "6px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
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
                              color: "#414651",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "var(--Font-size-text-sm, 14px)",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "var(--Line-height-text-sm, 20px)",
                            }}
                          >
                            Next Section
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Education Section */}
              {packageCheckboxes["education"] && (
                <div
                  data-section="education"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 24px 0 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "4px",
                            flex: "1 0 0",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-start",
                              gap: "2px",
                              flex: "1 0 0",
                            }}
                          >
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
                                  color: "#181D27",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "var(--Font-size-text-lg, 18px)",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight:
                                    "var(--Line-height-text-lg, 28px)",
                                }}
                              >
                                Education
                              </div>
                              {isEducationCompleted() && (
                                <>
                                  <div style={{ display: "flex", padding: "2px 8px", alignItems: "center", borderRadius: "9999px", border: "1px solid #ABEFC6", background: "#ECFDF3" }}>
                                    <div style={{ color: "#067647", textAlign: "center", fontFamily: "var(--Font-family-font-family-body, 'Public Sans')", fontSize: "12px", fontStyle: "normal", fontWeight: 500, lineHeight: "18px" }}>Completed</div>
                                  </div>
                                  <div style={{ display: "flex", width: "28px", height: "28px", padding: "6px", justifyContent: "center", alignItems: "center", borderRadius: "9999px", background: "#DCFAE6" }}>
                                    <svg style={{ width: "16px", height: "16px", flexShrink: 0 }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke="#079455" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <button
                              onClick={() =>
                                setSectionsCollapsed((prev) => ({
                                  ...prev,
                                  education: !prev.education,
                                }))
                              }
                              style={{
                                display: "flex",
                                padding: "8px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor: "pointer",
                              }}
                            >
                              <svg
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  transform: sectionsCollapsed.education
                                    ? "none"
                                    : "rotate(180deg)",
                                  transition: "transform 0.2s ease",
                                }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 6L8 10L12 6"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Collapsed State Padding */}
                  {sectionsCollapsed.education && (
                    <div
                      style={{
                        padding: "0 24px 20px 24px",
                        alignSelf: "stretch",
                      }}
                    />
                  )}

                  {/* Main Content */}
                  <div
                    style={{
                      display: sectionsCollapsed.education ? "none" : "flex",
                      padding: "12px 24px 16px 24px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    {/* Education Entry */}
                    <div
                      style={{
                        display: "flex",
                        padding: "12px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                        borderRadius: "10px",
                        border: "1px solid #E9EAEB",
                        background: "#FAFAFA",
                      }}
                    >
                      {/* Header with Remove Button */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            color: "#181D27",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "var(--Font-size-text-md, 16px)",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "var(--Line-height-text-md, 24px)",
                          }}
                        >
                          Education #1
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <button
                            onClick={() => {
                              setPackageCheckboxes((prev) => ({
                                ...prev,
                                education: false,
                              }));
                              setPackageQuantities((prev) => {
                                const next = { ...prev };
                                delete next["education"];
                                return next;
                              });
                              setSectionsCollapsed((prev) => ({
                                ...prev,
                                education: false,
                              }));
                            }}
                            style={{
                              display: "flex",
                              height: "32px",
                              padding: "6px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
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
                                  color: "#414651",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "18px",
                                }}
                              >
                                Remove
                              </div>
                            </div>
                            <svg
                              style={{ width: "16px", height: "16px" }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_minus_circle_education)">
                                <path
                                  d="M5.33325 7.99992H10.6666M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_minus_circle_education">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              setEducationCollapsedMap((prev) => ({
                                ...prev,
                                1: !prev[1],
                              }))
                            }
                            style={{
                              display: "flex",
                              padding: "8px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
                            }}
                          >
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                                transform: educationCollapsedMap[1]
                                  ? "none"
                                  : "rotate(180deg)",
                                transition: "transform 0.2s ease",
                              }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 6L8 10L12 6"
                                stroke="#A4A7AE"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Collapsible content for Education #1 */}
                      <div
                        onChangeCapture={(e) => {
                          const t = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                          if (t && ("value" in t ? String((t as any).value ?? "").trim().length > 0 : false)) {
                            markEducationFilled(1, true);
                          }
                        }}
                        style={{
                          display: educationCollapsedMap[1] ? "none" : "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          alignSelf: "stretch",
                        }}
                      >
                        {/* Does Not Apply Checkbox */}
                        <div
                          style={{
                            display: "flex",
                            width: "505px",
                            alignItems: "flex-start",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              paddingTop: "2px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              style={{
                                width: "16px",
                                height: "16px",
                                borderRadius: "4px",
                                border: "1px solid #D5D7DA",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                width: "320px",
                                alignItems: "flex-end",
                                gap: "4px",
                              }}
                            >
                              <div
                                style={{
                                  color: "#414651",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Does Not Apply - check if this item does not
                                apply to you
                              </div>
                              <svg
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  flexShrink: 0,
                                }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_does_not_apply)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_does_not_apply">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Type of Education Dropdown */}
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
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              Type of Education
                            </div>
                            <div
                              style={{
                                color: "#344698",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              *
                            </div>
                            <svg
                              style={{ width: "16px", height: "16px" }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_help_type_education)">
                                <path
                                  d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_help_type_education">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              padding: "8px 12px",
                              alignItems: "center",
                              gap: "8px",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  flex: "1 0 0",
                                  color: "#181D27",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "24px",
                                }}
                              >
                                University
                              </div>
                            </div>
                            <svg
                              style={{ width: "24px", height: "24px" }}
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 9L12 15L18 9"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Main Grid Container */}
                        <div
                          style={{
                            display: "grid",
                            height: "394px",
                            rowGap: "16px",
                            columnGap: "16px",
                            alignSelf: "stretch",
                            gridTemplateRows:
                              "fit-content(100%) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
                            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                          }}
                        >
                          {/* Row 1 - University, Degree Type, Major */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "1 / span 1",
                              gridColumn: "1 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                University
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                *
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_university)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_university">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight: "24px",
                                }}
                              />
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "1 / span 1",
                              gridColumn: "2 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Deegree Type
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.39317 5.99992C6.54991 5.55436 6.85927 5.17866 7.26647 4.93934C7.67368 4.70002 8.15243 4.61254 8.61796 4.69239C9.08348 4.77224 9.50572 5.01427 9.80989 5.3756C10.1141 5.73694 10.2805 6.19427 10.2798 6.66659C10.2798 7.99992 8.27984 8.66659 8.27984 8.66659M8.33317 11.3333H8.33984M14.9998 7.99992C14.9998 11.6818 12.0151 14.6666 8.33317 14.6666C4.65127 14.6666 1.6665 11.6818 1.6665 7.99992C1.6665 4.31802 4.65127 1.33325 8.33317 1.33325C12.0151 1.33325 14.9998 4.31802 14.9998 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight: "24px",
                                }}
                              />
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "1 / span 1",
                              gridColumn: "3 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Major
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.72667 5.99992C6.8834 5.55436 7.19277 5.17866 7.59997 4.93934C8.00717 4.70002 8.48593 4.61254 8.95145 4.69239C9.41697 4.77224 9.83921 5.01427 10.1434 5.3756C10.4476 5.73694 10.614 6.19427 10.6133 6.66659C10.6133 7.99992 8.61333 8.66659 8.61333 8.66659M8.66667 11.3333H8.67333M15.3333 7.99992C15.3333 11.6818 12.3486 14.6666 8.66667 14.6666C4.98477 14.6666 2 11.6818 2 7.99992C2 4.31802 4.98477 1.33325 8.66667 1.33325C12.3486 1.33325 15.3333 4.31802 15.3333 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight: "24px",
                                }}
                              />
                            </div>
                          </div>

                          {/* Row 2 - Address 1, Address 2, Zip */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "2 / span 1",
                              gridColumn: "1 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Address 1
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_address1)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_address1">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight: "24px",
                                }}
                              />
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "2 / span 1",
                              gridColumn: "2 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Address 2
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.39317 5.99992C6.54991 5.55436 6.85927 5.17866 7.26647 4.93934C7.67368 4.70002 8.15243 4.61254 8.61796 4.69239C9.08348 4.77224 9.50572 5.01427 9.80989 5.3756C10.1141 5.73694 10.2805 6.19427 10.2798 6.66659C10.2798 7.99992 8.27984 8.66659 8.27984 8.66659M8.33317 11.3333H8.33984M14.9998 7.99992C14.9998 11.6818 12.0151 14.6666 8.33317 14.6666C4.65127 14.6666 1.6665 11.6818 1.6665 7.99992C1.6665 4.31802 4.65127 1.33325 8.33317 1.33325C12.0151 1.33325 14.9998 4.31802 14.9998 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight: "24px",
                                }}
                              />
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "2 / span 1",
                              gridColumn: "3 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Zip
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.72667 5.99992C6.8834 5.55436 7.19277 5.17866 7.59997 4.93934C8.00717 4.70002 8.48593 4.61254 8.95145 4.69239C9.41697 4.77224 9.83921 5.01427 10.1434 5.3756C10.4476 5.73694 10.614 6.19427 10.6133 6.66659C10.6133 7.99992 8.61333 8.66659 8.61333 8.66659M8.66667 11.3333H8.67333M15.3333 7.99992C15.3333 11.6818 12.3486 14.6666 8.66667 14.6666C4.98477 14.6666 2 11.6818 2 7.99992C2 4.31802 4.98477 1.33325 8.66667 1.33325C12.3486 1.33325 15.3333 4.31802 15.3333 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight: "24px",
                                }}
                              />
                            </div>
                          </div>

                          {/* Row 3 - Country, State, City */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "3 / span 1",
                              gridColumn: "1 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Country
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                *
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_country)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_country">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                    flex: "1 0 0",
                                    overflow: "hidden",
                                    color: "#717680",
                                    textOverflow: "ellipsis",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                  }}
                                >
                                  Select
                                </div>
                              </div>
                              <svg
                                style={{ width: "24px", height: "24px" }}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.33325 9L12.3333 15L18.3333 9"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "3 / span 1",
                              gridColumn: "2 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                State
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                *
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.39317 5.99992C6.54991 5.55436 6.85927 5.17866 7.26647 4.93934C7.67368 4.70002 8.15243 4.61254 8.61796 4.69239C9.08348 4.77224 9.50572 5.01427 9.80989 5.3756C10.1141 5.73694 10.2805 6.19427 10.2798 6.66659C10.2798 7.99992 8.27984 8.66659 8.27984 8.66659M8.33317 11.3333H8.33984M14.9998 7.99992C14.9998 11.6818 12.0151 14.6666 8.33317 14.6666C4.65127 14.6666 1.6665 11.6818 1.6665 7.99992C1.6665 4.31802 4.65127 1.33325 8.33317 1.33325C12.0151 1.33325 14.9998 4.31802 14.9998 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                    flex: "1 0 0",
                                    overflow: "hidden",
                                    color: "#717680",
                                    textOverflow: "ellipsis",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                  }}
                                >
                                  Select
                                </div>
                              </div>
                              <svg
                                style={{ width: "24px", height: "24px" }}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.6665 9L12.6665 15L18.6665 9"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "3 / span 1",
                              gridColumn: "3 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                City
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                *
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.72667 5.99992C6.8834 5.55436 7.19277 5.17866 7.59997 4.93934C8.00717 4.70002 8.48593 4.61254 8.95145 4.69239C9.41697 4.77224 9.83921 5.01427 10.1434 5.3756C10.4476 5.73694 10.614 6.19427 10.6133 6.66659C10.6133 7.99992 8.61333 8.66659 8.61333 8.66659M8.66667 11.3333H8.67333M15.3333 7.99992C15.3333 11.6818 12.3486 14.6666 8.66667 14.6666C4.98477 14.6666 2 11.6818 2 7.99992C2 4.31802 4.98477 1.33325 8.66667 1.33325C12.3486 1.33325 15.3333 4.31802 15.3333 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                    flex: "1 0 0",
                                    overflow: "hidden",
                                    color: "#717680",
                                    textOverflow: "ellipsis",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                  }}
                                >
                                  Select
                                </div>
                              </div>
                              <svg
                                style={{ width: "24px", height: "24px" }}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 9L12 15L18 9"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Row 4 - GPA Scale, Student ID, Transcript Y/N */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "4 / span 1",
                              gridColumn: "1 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                GPA Scale
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_gpa)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_gpa">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight: "24px",
                                }}
                              />
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "4 / span 1",
                              gridColumn: "2 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Student ID
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.39317 5.99992C6.54991 5.55436 6.85927 5.17866 7.26647 4.93934C7.67368 4.70002 8.15243 4.61254 8.61796 4.69239C9.08348 4.77224 9.50572 5.01427 9.80989 5.3756C10.1141 5.73694 10.2805 6.19427 10.2798 6.66659C10.2798 7.99992 8.27984 8.66659 8.27984 8.66659M8.33317 11.3333H8.33984M14.9998 7.99992C14.9998 11.6818 12.0151 14.6666 8.33317 14.6666C4.65127 14.6666 1.6665 11.6818 1.6665 7.99992C1.6665 4.31802 4.65127 1.33325 8.33317 1.33325C12.0151 1.33325 14.9998 4.31802 14.9998 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight: "24px",
                                }}
                              />
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "4 / span 1",
                              gridColumn: "3 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Transcript Y/N
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.72667 5.99992C6.8834 5.55436 7.19277 5.17866 7.59997 4.93934C8.00717 4.70002 8.48593 4.61254 8.95145 4.69239C9.41697 4.77224 9.83921 5.01427 10.1434 5.3756C10.4476 5.73694 10.614 6.19427 10.6133 6.66659C10.6133 7.99992 8.61333 8.66659 8.61333 8.66659M8.66667 11.3333H8.67333M15.3333 7.99992C15.3333 11.6818 12.3486 14.6666 8.66667 14.6666C4.98477 14.6666 2 11.6818 2 7.99992C2 4.31802 4.98477 1.33325 8.66667 1.33325C12.3486 1.33325 15.3333 4.31802 15.3333 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                    flex: "1 0 0",
                                    overflow: "hidden",
                                    color: "#717680",
                                    textOverflow: "ellipsis",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                  }}
                                >
                                  Select
                                </div>
                              </div>
                              <svg
                                style={{ width: "24px", height: "24px" }}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 9L12 15L18 9"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Row 5 - Graduated Y/N, Highest Achieved Y/N */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "5 / span 1",
                              gridColumn: "1 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Graduated Y/N
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_graduated)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_graduated">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                    flex: "1 0 0",
                                    overflow: "hidden",
                                    color: "#717680",
                                    textOverflow: "ellipsis",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                  }}
                                >
                                  Select
                                </div>
                              </div>
                              <svg
                                style={{ width: "24px", height: "24px" }}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.33325 9L12.3333 15L18.3333 9"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              gridRow: "5 / span 1",
                              gridColumn: "2 / span 1",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Highest Achieved Y/N
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.39317 5.99992C6.54991 5.55436 6.85927 5.17866 7.26647 4.93934C7.67368 4.70002 8.15243 4.61254 8.61796 4.69239C9.08348 4.77224 9.50572 5.01427 9.80989 5.3756C10.1141 5.73694 10.2805 6.19427 10.2798 6.66659C10.2798 7.99992 8.27984 8.66659 8.27984 8.66659M8.33317 11.3333H8.33984M14.9998 7.99992C14.9998 11.6818 12.0151 14.6666 8.33317 14.6666C4.65127 14.6666 1.6665 11.6818 1.6665 7.99992C1.6665 4.31802 4.65127 1.33325 8.33317 1.33325C12.0151 1.33325 14.9998 4.31802 14.9998 7.99992Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                    flex: "1 0 0",
                                    overflow: "hidden",
                                    color: "#717680",
                                    textOverflow: "ellipsis",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                  }}
                                >
                                  Select
                                </div>
                              </div>
                              <svg
                                style={{ width: "24px", height: "24px" }}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.6665 9L12.6665 15L18.6665 9"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div
                          style={{
                            display: "flex",
                            padding: "4px 0",
                            alignItems: "center",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "1px",
                              background: "#E9EAEB",
                            }}
                          ></div>
                        </div>

                        {/* Name Fields Container */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              height: "66px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                First Name while Attending
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
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
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight: "24px",
                                }}
                              />
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              height: "66px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Last Name while Attending
                              </div>
                              <div
                                style={{
                                  color: "#344698",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
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
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight: "24px",
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Another Divider */}
                        <div
                          style={{
                            display: "flex",
                            padding: "4px 0",
                            alignItems: "center",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "1px",
                              background: "#E9EAEB",
                            }}
                          ></div>
                        </div>

                        {/* Contact Fields Container */}
                        <div
                          style={{
                            display: "flex",
                            height: "66px",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              height: "66px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Email
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_email)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_email">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="email"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight: "24px",
                                }}
                              />
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              width: "322px",
                              height: "66px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Phone
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  padding: "8px 0 8px 12px",
                                  alignItems: "center",
                                  gap: "2px",
                                  alignSelf: "stretch",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#535862",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                  }}
                                >
                                  US
                                </div>
                                <svg
                                  style={{ width: "24px", height: "24px" }}
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6 9L12 15L18 9"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "8px 12px 8px 10px",
                                  alignItems: "center",
                                  gap: "8px",
                                  flex: "1 0 0",
                                  alignSelf: "stretch",
                                }}
                              >
                                <input
                                  type="tel"
                                  placeholder="+1"
                                  style={{
                                    flex: "1 0 0",
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    color: "#717680",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              height: "66px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Fax
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_fax)">
                                  <path
                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_fax">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px 12px",
                                alignItems: "center",
                                gap: "8px",
                                alignSelf: "stretch",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <input
                                type="tel"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight: "24px",
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Another Divider */}
                        <div
                          style={{
                            display: "flex",
                            padding: "4px 0",
                            alignItems: "center",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "1px",
                              background: "#E9EAEB",
                            }}
                          ></div>
                        </div>

                        {/* Date Fields Container */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "16px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                height: "66px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
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
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Attended From
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
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    flex: "1 0 0",
                                  }}
                                >
                                  <svg
                                    style={{ width: "24px", height: "24px" }}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <input
                                    type="date"
                                    style={{
                                      flex: "1 0 0",
                                      border: "none",
                                      outline: "none",
                                      background: "transparent",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "16px",
                                      fontWeight: 400,
                                      color: "#181D27",
                                      lineHeight: "24px",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                height: "66px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
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
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Attended To
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
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    flex: "1 0 0",
                                  }}
                                >
                                  <svg
                                    style={{ width: "24px", height: "24px" }}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M21.3333 10H3.33325M16.3333 2V6M8.33325 2V6M8.13325 22H16.5333C18.2134 22 19.0535 22 19.6952 21.673C20.2597 21.3854 20.7187 20.9265 21.0063 20.362C21.3333 19.7202 21.3333 18.8802 21.3333 17.2V8.8C21.3333 7.11984 21.3333 6.27976 21.0063 5.63803C20.7187 5.07354 20.2597 4.6146 19.6952 4.32698C19.0535 4 18.2134 4 16.5333 4H8.13325C6.45309 4 5.61302 4 4.97128 4.32698C4.40679 4.6146 3.94785 5.07354 3.66023 5.63803C3.33325 6.27976 3.33325 7.11984 3.33325 8.8V17.2C3.33325 18.8802 3.33325 19.7202 3.66023 20.362C3.94785 20.9265 4.40679 21.3854 4.97128 21.673C5.61302 22 6.45309 22 8.13325 22Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <input
                                    type="date"
                                    style={{
                                      flex: "1 0 0",
                                      border: "none",
                                      outline: "none",
                                      background: "transparent",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "16px",
                                      fontWeight: 400,
                                      color: "#181D27",
                                      lineHeight: "24px",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                height: "66px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
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
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Degree Year
                                </div>
                                <div
                                  style={{
                                    color: "#344698",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
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
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    flex: "1 0 0",
                                  }}
                                >
                                  <svg
                                    style={{ width: "24px", height: "24px" }}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M21.6665 10H3.6665M16.6665 2V6M8.6665 2V6M8.4665 22H16.8665C18.5467 22 19.3867 22 20.0285 21.673C20.593 21.3854 21.0519 20.9265 21.3395 20.362C21.6665 19.7202 21.6665 18.8802 21.6665 17.2V8.8C21.6665 7.11984 21.6665 6.27976 21.3395 5.63803C21.0519 5.07354 20.593 4.6146 20.0285 4.32698C19.3867 4 18.5467 4 16.8665 4H8.4665C6.78635 4 5.94627 4 5.30453 4.32698C4.74005 4.6146 4.2811 5.07354 3.99348 5.63803C3.6665 6.27976 3.6665 7.11984 3.6665 8.8V17.2C3.6665 18.8802 3.6665 19.7202 3.99348 20.362C4.2811 20.9265 4.74005 21.3854 5.30453 21.673C5.94627 22 6.78635 22 8.4665 22Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <input
                                    type="date"
                                    style={{
                                      flex: "1 0 0",
                                      border: "none",
                                      outline: "none",
                                      background: "transparent",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "16px",
                                      fontWeight: 400,
                                      color: "#181D27",
                                      lineHeight: "24px",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Current Enrolled Checkbox */}
                          <div
                            style={{
                              display: "flex",
                              width: "505px",
                              alignItems: "flex-start",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <input
                                type="checkbox"
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "320px",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Current enrolled
                                </div>
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    flexShrink: 0,
                                  }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_help_current_enrolled)">
                                    <path
                                      d="M6.05992 6.00016C6.21665 5.55461 6.52602 5.1789 6.93322 4.93958C7.34042 4.70027 7.81918 4.61279 8.2847 4.69264C8.75022 4.77249 9.17246 5.01451 9.47664 5.37585C9.78081 5.73718 9.94729 6.19451 9.94659 6.66683C9.94659 8.00016 7.94659 8.66683 7.94659 8.66683M7.99992 11.3335H8.00659M14.6666 8.00016C14.6666 11.6821 11.6818 14.6668 7.99992 14.6668C4.31802 14.6668 1.33325 11.6821 1.33325 8.00016C1.33325 4.31826 4.31802 1.3335 7.99992 1.3335C11.6818 1.3335 14.6666 4.31826 14.6666 8.00016Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_help_current_enrolled">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Final Divider */}
                        <div
                          style={{
                            display: "flex",
                            padding: "4px 0",
                            alignItems: "center",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "1px",
                              background: "#E9EAEB",
                            }}
                          ></div>
                        </div>

                        {/* Comments Textarea */}
                        <div
                          style={{
                            display: "flex",
                            height: "123px",
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
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              Comments
                            </div>
                            <svg
                              style={{ width: "16px", height: "16px" }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_help_comments)">
                                <path
                                  d="M6.05992 6.00016C6.21665 5.55461 6.52602 5.1789 6.93322 4.93958C7.34042 4.70027 7.81918 4.61279 8.2847 4.69264C8.75022 4.77249 9.17246 5.01451 9.47664 5.37585C9.78081 5.73718 9.94729 6.19451 9.94659 6.66683C9.94659 8.00016 7.94659 8.66683 7.94659 8.66683M7.99992 11.3335H8.00659M14.6666 8.00016C14.6666 11.6821 11.6818 14.6668 7.99992 14.6668C4.31802 14.6668 1.33325 11.6821 1.33325 8.00016C1.33325 4.31826 4.31802 1.3335 7.99992 1.3335C11.6818 1.3335 14.6666 4.31826 14.6666 8.00016Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_help_comments">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              padding: "12px 14px",
                              alignItems: "flex-start",
                              gap: "8px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            }}
                          >
                            <textarea
                              placeholder="Enter a description..."
                              style={{
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                color: "#717680",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "24px",
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                resize: "none",
                              }}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Education entries (collapsed) */}
                    {Array.from({
                      length: Math.max(
                        0,
                        (packageQuantities["education"] || 1) - 1,
                      ),
                    }).map((_, i) => {
                      const num = i + 2;
                      return (
                        <div
                          key={`education-collapsed-${num}`}
                          style={{
                            display: "flex",
                            padding: "12px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                            borderRadius: "10px",
                            border: "1px solid #E9EAEB",
                            background: "#FAFAFA",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-md, 16px)",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "var(--Line-height-text-md, 24px)",
                              }}
                            >
                              {`Education #${num}`}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              <button
                                style={{
                                  display: "flex",
                                  padding: "8px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  cursor: "default",
                                }}
                              >
                                <svg
                                  style={{ width: "16px", height: "16px" }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4 6L8 10L12 6"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Action Buttons */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        alignSelf: "stretch",
                      }}
                    >
                      <button
                        onClick={() =>
                          setPackageQuantities((prev) => ({
                            ...prev,
                            education: (prev["education"] || 1) + 1,
                          }))
                        }
                        style={{
                          display: "flex",
                          minHeight: "36px",
                          padding: "6px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.12)",
                          background: "#344698",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
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
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                            }}
                          >
                            Add Another
                          </div>
                        </div>
                      </button>
                      <button
                        style={{
                          display: "flex",
                          minHeight: "36px",
                          padding: "6px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
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
                              color: "#414651",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                            }}
                          >
                            Next Section
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Professional References Section */}
              {packageCheckboxes["professional-references"] && (
                <div
                  data-section="professional-references"
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 24px 0 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "4px",
                            flex: "1 0 0",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-start",
                              gap: "2px",
                              flex: "1 0 0",
                            }}
                          >
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
                                  color: "#181D27",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "18px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "28px",
                                }}
                              >
                                Professional References
                              </div>
                              {isProfessionalReferencesCompleted() && (
                                <>
                                  <div style={{ display: "flex", padding: "2px 8px", alignItems: "center", borderRadius: "9999px", border: "1px solid #ABEFC6", background: "#ECFDF3" }}>
                                    <div style={{ color: "#067647", textAlign: "center", fontFamily: "var(--Font-family-font-family-body, 'Public Sans')", fontSize: "12px", fontStyle: "normal", fontWeight: 500, lineHeight: "18px" }}>Completed</div>
                                  </div>
                                  <div style={{ display: "flex", width: "28px", height: "28px", padding: "6px", justifyContent: "center", alignItems: "center", borderRadius: "9999px", background: "#DCFAE6" }}>
                                    <svg style={{ width: "16px", height: "16px", flexShrink: 0 }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke="#079455" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setSectionsCollapsed((prev) => ({
                              ...prev,
                              professionalReferences:
                                !prev.professionalReferences,
                            }))
                          }
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            style={{
                              width: "16px",
                              height: "16px",
                              transform:
                                sectionsCollapsed.professionalReferences
                                  ? "none"
                                  : "rotate(180deg)",
                              transition: "transform 0.2s ease",
                            }}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 6L8 10L12 6"
                              stroke="#A4A7AE"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Collapsed State Padding */}
                  {sectionsCollapsed.professionalReferences && (
                    <div
                      style={{
                        padding: "0 24px 20px 24px",
                        alignSelf: "stretch",
                      }}
                    />
                  )}

                  {/* Main Content */}
                  <div
                    style={{
                      display: sectionsCollapsed.professionalReferences
                        ? "none"
                        : "flex",
                      padding: "12px 24px 16px 24px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    {/* Professional Reference #1 */}
                    <div
                      style={{
                        display: "flex",
                        padding: "12px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                        borderRadius: "10px",
                        border: "1px solid #E9EAEB",
                        background: "#FAFAFA",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "24px",
                            }}
                          >
                            Professional Reference #1
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <button
                              onClick={() => {
                                setPackageCheckboxes((prev) => ({
                                  ...prev,
                                  "professional-references": false,
                                }));
                                setPackageQuantities((prev) => {
                                  const next = { ...prev };
                                  delete next["professional-references"];
                                  return next;
                                });
                                setSectionsCollapsed((prev) => ({
                                  ...prev,
                                  professionalReferences: false,
                                }));
                              }}
                              style={{
                                display: "flex",
                                height: "32px",
                                padding: "6px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "4px",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor: "pointer",
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
                                    color: "#414651",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "18px",
                                  }}
                                >
                                  Remove
                                </div>
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_minus_circle_prof_ref)">
                                  <path
                                    d="M5.33325 7.99992H10.6666M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_minus_circle_prof_ref">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                setProfessionalReferencesCollapsedMap(
                                  (prev) => ({ ...prev, 1: !prev[1] }),
                                )
                              }
                              style={{
                                display: "flex",
                                padding: "8px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor: "pointer",
                              }}
                            >
                              <svg
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  transform:
                                    professionalReferencesCollapsedMap[1]
                                      ? "none"
                                      : "rotate(180deg)",
                                  transition: "transform 0.2s ease",
                                }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 6L8 10L12 6"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Collapsible content for Professional Reference #1 */}
                        <div
                          onChangeCapture={(e) => {
                            const t = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                            if (t && ("value" in t ? String((t as any).value ?? "").trim().length > 0 : false)) {
                              markProfessionalRefFilled(1, true);
                            }
                          }}
                          style={{
                            display: professionalReferencesCollapsedMap[1]
                              ? "none"
                              : "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                          }}
                        >
                          {/* Does Not Apply Checkbox */}
                          <div
                            style={{
                              display: "flex",
                              width: "505px",
                              alignItems: "flex-start",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                }}
                              ></div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "320px",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Does Not Apply - check if this item does not
                                  apply to you
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help_professional_references)">
                                      <path
                                        d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help_professional_references">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Form Fields Grid */}
                          <div
                            style={{
                              display: "grid",
                              height: "230px",
                              rowGap: "16px",
                              columnGap: "16px",
                              alignSelf: "stretch",
                              gridTemplateRows:
                                "fit-content(100%) minmax(0, 1fr) minmax(0, 1fr)",
                              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                            }}
                          >
                            {/* Contact Name */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "1 / span 1",
                                gridColumn: "1 / span 1",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Contact Name
                                  </div>
                                  <div
                                    style={{
                                      color: "#344698",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    *
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_help_contact_name)">
                                        <path
                                          d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_help_contact_name">
                                          <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
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
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      height: "24px",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      style={{
                                        flex: "1 0 0",
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        color: "#181D27",
                                        lineHeight: "24px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Phone */}
                            <div
                              style={{
                                display: "flex",
                                width: "322px",
                                height: "66px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flexShrink: 0,
                                alignSelf: "start",
                                gridRow: "1 / span 1",
                                gridColumn: "2 / span 1",
                                justifySelf: "start",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Phone
                                  </div>
                                  <div
                                    style={{
                                      color: "#344698",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
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
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "8px 0 8px 12px",
                                      alignItems: "center",
                                      gap: "2px",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#535862",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "24px",
                                      }}
                                    >
                                      US
                                    </div>
                                    <svg
                                      style={{ width: "24px", height: "24px" }}
                                      width="25"
                                      height="24"
                                      viewBox="0 0 25 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.3335 9L12.3335 15L18.3335 9"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.75"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "8px 12px 8px 10px",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                      alignSelf: "stretch",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      placeholder="+1"
                                      style={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 1,
                                        flex: "1 0 0",
                                        overflow: "hidden",
                                        color: "#717680",
                                        textOverflow: "ellipsis",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "24px",
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Reference Type */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "1 / span 1",
                                gridColumn: "3 / span 1",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Reference Type
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="17"
                                      height="16"
                                      viewBox="0 0 17 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.72667 5.99992C6.8834 5.55436 7.19277 5.17866 7.59997 4.93934C8.00717 4.70002 8.48593 4.61254 8.95145 4.69239C9.41697 4.77224 9.83921 5.01427 10.1434 5.3756C10.4476 5.73694 10.614 6.19427 10.6133 6.66659C10.6133 7.99992 8.61333 8.66659 8.61333 8.66659M8.66667 11.3333H8.67333M15.3333 7.99992C15.3333 11.6818 12.3486 14.6666 8.66667 14.6666C4.98477 14.6666 2 11.6818 2 7.99992C2 4.31802 4.98477 1.33325 8.66667 1.33325C12.3486 1.33325 15.3333 4.31802 15.3333 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "8px 12px",
                                    alignItems: "center",
                                    gap: "8px",
                                    flex: "1 0 0",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      height: "24px",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      style={{
                                        flex: "1 0 0",
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        color: "#181D27",
                                        lineHeight: "24px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Relationship */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "2 / span 1",
                                gridColumn: "1 / span 1",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Relationship
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_help_relationship)">
                                        <path
                                          d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_help_relationship">
                                          <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
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
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      height: "24px",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      style={{
                                        flex: "1 0 0",
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        color: "#181D27",
                                        lineHeight: "24px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Address */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "2 / span 1",
                                gridColumn: "2 / span 1",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Address
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="17"
                                      height="16"
                                      viewBox="0 0 17 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.39366 5.99992C6.5504 5.55436 6.85976 5.17866 7.26696 4.93934C7.67416 4.70002 8.15292 4.61254 8.61844 4.69239C9.08396 4.77224 9.5062 5.01427 9.81038 5.3756C10.1146 5.73694 10.281 6.19427 10.2803 6.66659C10.2803 7.99992 8.28033 8.66659 8.28033 8.66659M8.33366 11.3333H8.34033M15.0003 7.99992C15.0003 11.6818 12.0156 14.6666 8.33366 14.6666C4.65176 14.6666 1.66699 11.6818 1.66699 7.99992C1.66699 4.31802 4.65176 1.33325 8.33366 1.33325C12.0156 1.33325 15.0003 4.31802 15.0003 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
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
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      height: "24px",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      style={{
                                        flex: "1 0 0",
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        color: "#181D27",
                                        lineHeight: "24px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Zip */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "2 / span 1",
                                gridColumn: "3 / span 1",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Zip
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="17"
                                      height="16"
                                      viewBox="0 0 17 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.72667 5.99992C6.8834 5.55436 7.19277 5.17866 7.59997 4.93934C8.00717 4.70002 8.48593 4.61254 8.95145 4.69239C9.41697 4.77224 9.83921 5.01427 10.1434 5.3756C10.4476 5.73694 10.614 6.19427 10.6133 6.66659C10.6133 7.99992 8.61333 8.66659 8.61333 8.66659M8.66667 11.3333H8.67333M15.3333 7.99992C15.3333 11.6818 12.3486 14.6666 8.66667 14.6666C4.98477 14.6666 2 11.6818 2 7.99992C2 4.31802 4.98477 1.33325 8.66667 1.33325C12.3486 1.33325 15.3333 4.31802 15.3333 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
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
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      height: "24px",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      style={{
                                        flex: "1 0 0",
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        color: "#181D27",
                                        lineHeight: "24px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Country */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "3 / span 1",
                                gridColumn: "1 / span 1",
                              }}
                            >
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Country
                                  </div>
                                  <div
                                    style={{
                                      color: "#344698",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    *
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_help_country)">
                                        <path
                                          d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_help_country">
                                          <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
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
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 1,
                                        flex: "1 0 0",
                                        overflow: "hidden",
                                        color: "#717680",
                                        textOverflow: "ellipsis",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "24px",
                                      }}
                                    >
                                      Select
                                    </div>
                                  </div>
                                  <svg
                                    style={{ width: "24px", height: "24px" }}
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.3335 9L12.3335 15L18.3335 9"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            {/* State */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "3 / span 1",
                                gridColumn: "2 / span 1",
                              }}
                            >
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    State
                                  </div>
                                  <div
                                    style={{
                                      color: "#344698",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    *
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="17"
                                      height="16"
                                      viewBox="0 0 17 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.39366 5.99992C6.5504 5.55436 6.85976 5.17866 7.26696 4.93934C7.67416 4.70002 8.15292 4.61254 8.61844 4.69239C9.08396 4.77224 9.5062 5.01427 9.81038 5.3756C10.1146 5.73694 10.281 6.19427 10.2803 6.66659C10.2803 7.99992 8.28033 8.66659 8.28033 8.66659M8.33366 11.3333H8.34033M15.0003 7.99992C15.0003 11.6818 12.0156 14.6666 8.33366 14.6666C4.65176 14.6666 1.66699 11.6818 1.66699 7.99992C1.66699 4.31802 4.65176 1.33325 8.33366 1.33325C12.0156 1.33325 15.0003 4.31802 15.0003 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
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
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 1,
                                        flex: "1 0 0",
                                        overflow: "hidden",
                                        color: "#717680",
                                        textOverflow: "ellipsis",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "24px",
                                      }}
                                    >
                                      Select
                                    </div>
                                  </div>
                                  <svg
                                    style={{ width: "24px", height: "24px" }}
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.66699 9L12.667 15L18.667 9"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            {/* City */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "3 / span 1",
                                gridColumn: "3 / span 1",
                              }}
                            >
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    City
                                  </div>
                                  <div
                                    style={{
                                      color: "#344698",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    *
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="17"
                                      height="16"
                                      viewBox="0 0 17 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.72667 5.99992C6.8834 5.55436 7.19277 5.17866 7.59997 4.93934C8.00717 4.70002 8.48593 4.61254 8.95145 4.69239C9.41697 4.77224 9.83921 5.01427 10.1434 5.3756C10.4476 5.73694 10.614 6.19427 10.6133 6.66659C10.6133 7.99992 8.61333 8.66659 8.61333 8.66659M8.66667 11.3333H8.67333M15.3333 7.99992C15.3333 11.6818 12.3486 14.6666 8.66667 14.6666C4.98477 14.6666 2 11.6818 2 7.99992C2 4.31802 4.98477 1.33325 8.66667 1.33325C12.3486 1.33325 15.3333 4.31802 15.3333 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
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
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 1,
                                        flex: "1 0 0",
                                        overflow: "hidden",
                                        color: "#717680",
                                        textOverflow: "ellipsis",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "24px",
                                      }}
                                    >
                                      Select
                                    </div>
                                  </div>
                                  <svg
                                    style={{ width: "24px", height: "24px" }}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6 9L12 15L18 9"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Divider */}
                          <svg
                            style={{
                              display: "flex",
                              padding: "4px 0",
                              alignItems: "center",
                              alignSelf: "stretch",
                            }}
                            width="1008"
                            height="9"
                            viewBox="0 0 1008 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1008 5H0V4H1008V5"
                              fill="#E9EAEB"
                            />
                          </svg>

                          {/* Comments */}
                          <div
                            style={{
                              display: "flex",
                              height: "123px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
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
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Comments
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help_comments)">
                                      <path
                                        d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help_comments">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "12px 14px",
                                  alignItems: "flex-start",
                                  gap: "8px",
                                  flex: "1 0 0",
                                  alignSelf: "stretch",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                }}
                              >
                                <textarea
                                  placeholder="Enter a description..."
                                  style={{
                                    flex: "1 0 0",
                                    alignSelf: "stretch",
                                    color: "#717680",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    resize: "none",
                                  }}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Professional References entries (collapsed) */}
                    {Array.from({
                      length: Math.max(
                        0,
                        (packageQuantities["professional-references"] || 1) - 1,
                      ),
                    }).map((_, i) => {
                      const num = i + 2;
                      return (
                        <div
                          key={`professional-references-collapsed-${num}`}
                          style={{
                            display: "flex",
                            padding: "12px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                            borderRadius: "10px",
                            border: "1px solid #E9EAEB",
                            background: "#FAFAFA",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-md, 16px)",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "var(--Line-height-text-md, 24px)",
                              }}
                            >
                              {`Professional Reference #${num}`}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              <button
                                style={{
                                  display: "flex",
                                  padding: "8px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  cursor: "default",
                                }}
                              >
                                <svg
                                  style={{ width: "16px", height: "16px" }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4 6L8 10L12 6"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Action Buttons */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        alignSelf: "stretch",
                      }}
                    >
                      <button
                        onClick={() =>
                          setPackageQuantities((prev) => ({
                            ...prev,
                            "professional-references":
                              (prev["professional-references"] || 1) + 1,
                          }))
                        }
                        style={{
                          display: "flex",
                          minHeight: "36px",
                          padding: "6px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.12)",
                          background: "#344698",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
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
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                            }}
                          >
                            Add Another
                          </div>
                        </div>
                      </button>
                      <button
                        style={{
                          display: "flex",
                          minHeight: "36px",
                          padding: "6px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
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
                              color: "#414651",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                            }}
                          >
                            Next Section
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Credentials - Professional License Section */}
              {packageCheckboxes["credentials-professional-license"] && (
                <div
                  data-section="credentials-professional-license"
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 24px 0 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "4px",
                            flex: "1 0 0",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-start",
                              gap: "2px",
                              flex: "1 0 0",
                            }}
                          >
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
                                  color: "#181D27",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "18px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "28px",
                                }}
                              >
                                Credentials - Professional Licenses
                              </div>
                              {isCredentialsCompleted() && (
                                <>
                                  <div style={{ display: "flex", padding: "2px 8px", alignItems: "center", borderRadius: "9999px", border: "1px solid #ABEFC6", background: "#ECFDF3" }}>
                                    <div style={{ color: "#067647", textAlign: "center", fontFamily: "var(--Font-family-font-family-body, 'Public Sans')", fontSize: "12px", fontStyle: "normal", fontWeight: 500, lineHeight: "18px" }}>Completed</div>
                                  </div>
                                  <div style={{ display: "flex", width: "28px", height: "28px", padding: "6px", justifyContent: "center", alignItems: "center", borderRadius: "9999px", background: "#DCFAE6" }}>
                                    <svg style={{ width: "16px", height: "16px", flexShrink: 0 }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke="#079455" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setSectionsCollapsed((prev) => ({
                              ...prev,
                              credentialsProfessionalLicense:
                                !prev.credentialsProfessionalLicense,
                            }))
                          }
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D5D7DA",
                            background: "#FFF",
                            boxShadow:
                              "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            style={{
                              width: "16px",
                              height: "16px",
                              transform:
                                sectionsCollapsed.credentialsProfessionalLicense
                                  ? "none"
                                  : "rotate(180deg)",
                              transition: "transform 0.2s ease",
                            }}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 6L8 10L12 6"
                              stroke="#A4A7AE"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Collapsed State Padding */}
                  {sectionsCollapsed.credentialsProfessionalLicense && (
                    <div
                      style={{
                        padding: "0 24px 20px 24px",
                        alignSelf: "stretch",
                      }}
                    />
                  )}

                  {/* Main Content */}
                  <div
                    style={{
                      display: sectionsCollapsed.credentialsProfessionalLicense
                        ? "none"
                        : "flex",
                      padding: "12px 24px 16px 24px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    {/* Credentials Professional License #1 */}
                    <div
                      style={{
                        display: "flex",
                        padding: "12px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                        borderRadius: "10px",
                        border: "1px solid #E9EAEB",
                        background: "#FAFAFA",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              color: "#181D27",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "24px",
                            }}
                          >
                            Credentials - Professional License #1
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <button
                              onClick={() => {
                                setPackageCheckboxes((prev) => ({
                                  ...prev,
                                  "credentials-professional-license": false,
                                }));
                                setPackageQuantities((prev) => {
                                  const next = { ...prev };
                                  delete next[
                                    "credentials-professional-license"
                                  ];
                                  return next;
                                });
                                setSectionsCollapsed((prev) => ({
                                  ...prev,
                                  credentialsProfessionalLicense: false,
                                }));
                              }}
                              style={{
                                display: "flex",
                                height: "32px",
                                padding: "6px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "4px",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor: "pointer",
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
                                    color: "#414651",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "18px",
                                  }}
                                >
                                  Remove
                                </div>
                              </div>
                              <svg
                                style={{ width: "16px", height: "16px" }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_minus_circle_cred_license)">
                                  <path
                                    d="M5.33325 7.99992H10.6666M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_minus_circle_cred_license">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                setCredentialsProfessionalLicenseCollapsedMap(
                                  (prev) => ({ ...prev, 1: !prev[1] }),
                                )
                              }
                              style={{
                                display: "flex",
                                padding: "8px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow:
                                  "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                cursor: "pointer",
                              }}
                            >
                              <svg
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  transform:
                                    credentialsProfessionalLicenseCollapsedMap[1]
                                      ? "none"
                                      : "rotate(180deg)",
                                  transition: "transform 0.2s ease",
                                }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 6L8 10L12 6"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Collapsible content for Credentials Professional License #1 */}
                        <div
                          onChangeCapture={(e) => {
                            const t = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                            if (t && ("value" in t ? String((t as any).value ?? "").trim().length > 0 : false)) {
                              markCredentialsFilled(1, true);
                            }
                          }}
                          style={{
                            display:
                              credentialsProfessionalLicenseCollapsedMap[1]
                                ? "none"
                                : "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                          }}
                        >
                          {/* Does Not Apply Checkbox */}
                          <div
                            style={{
                              display: "flex",
                              width: "505px",
                              alignItems: "flex-start",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                paddingTop: "2px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "4px",
                                  border: "1px solid #D5D7DA",
                                }}
                              ></div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "320px",
                                  alignItems: "flex-end",
                                  gap: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#414651",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Does Not Apply - check if this item does not
                                  apply to you
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help_credentials_license)">
                                      <path
                                        d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help_credentials_license">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Form Fields Grid */}
                          <div
                            style={{
                              display: "grid",
                              height: "148px",
                              rowGap: "16px",
                              columnGap: "16px",
                              alignSelf: "stretch",
                              gridTemplateRows:
                                "fit-content(100%) minmax(0, 1fr)",
                              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                            }}
                          >
                            {/* Organization */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "1 / span 1",
                                gridColumn: "1 / span 1",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Organization
                                  </div>
                                  <div
                                    style={{
                                      color: "#344698",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    *
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_help_organization)">
                                        <path
                                          d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_help_organization">
                                          <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
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
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      height: "24px",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      style={{
                                        flex: "1 0 0",
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        color: "#181D27",
                                        lineHeight: "24px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <div
                              style={{
                                display: "flex",
                                width: "322px",
                                height: "66px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flexShrink: 0,
                                alignSelf: "start",
                                gridRow: "1 / span 1",
                                gridColumn: "2 / span 1",
                                justifySelf: "start",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    Description
                                  </div>
                                  <div
                                    style={{
                                      color: "#344698",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
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
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      height: "24px",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      style={{
                                        flex: "1 0 0",
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        color: "#181D27",
                                        lineHeight: "24px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* License Number */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "1 / span 1",
                                gridColumn: "3 / span 1",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    License Number
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="17"
                                      height="16"
                                      viewBox="0 0 17 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.72667 5.99992C6.8834 5.55436 7.19277 5.17866 7.59997 4.93934C8.00717 4.70002 8.48593 4.61254 8.95145 4.69239C9.41697 4.77224 9.83921 5.01427 10.1434 5.3756C10.4476 5.73694 10.614 6.19427 10.6133 6.66659C10.6133 7.99992 8.61333 8.66659 8.61333 8.66659M8.66667 11.3333H8.67333M15.3333 7.99992C15.3333 11.6818 12.3486 14.6666 8.66667 14.6666C4.98477 14.6666 2 11.6818 2 7.99992C2 4.31802 4.98477 1.33325 8.66667 1.33325C12.3486 1.33325 15.3333 4.31802 15.3333 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "8px 12px",
                                    alignItems: "center",
                                    gap: "8px",
                                    flex: "1 0 0",
                                    alignSelf: "stretch",
                                    borderRadius: "8px",
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      height: "24px",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      style={{
                                        flex: "1 0 0",
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        color: "#181D27",
                                        lineHeight: "24px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* License Status */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "2 / span 1",
                                gridColumn: "1 / span 1",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    License Status
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_help_license_status)">
                                        <path
                                          d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_help_license_status">
                                          <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
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
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      height: "24px",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      style={{
                                        flex: "1 0 0",
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        color: "#181D27",
                                        lineHeight: "24px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* License State */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
                                alignSelf: "stretch",
                                gridRow: "2 / span 1",
                                gridColumn: "2 / span 1",
                              }}
                            >
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
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    License State
                                  </div>
                                  <div
                                    style={{
                                      color: "#344698",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    *
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "16px",
                                      height: "16px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="17"
                                      height="16"
                                      viewBox="0 0 17 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.39366 5.99992C6.5504 5.55436 6.85976 5.17866 7.26696 4.93934C7.67416 4.70002 8.15292 4.61254 8.61844 4.69239C9.08396 4.77224 9.5062 5.01427 9.81038 5.3756C10.1146 5.73694 10.281 6.19427 10.2803 6.66659C10.2803 7.99992 8.28033 8.66659 8.28033 8.66659M8.33366 11.3333H8.34033M15.0003 7.99992C15.0003 11.6818 12.0156 14.6666 8.33366 14.6666C4.65176 14.6666 1.66699 11.6818 1.66699 7.99992C1.66699 4.31802 4.65176 1.33325 8.33366 1.33325C12.0156 1.33325 15.0003 4.31802 15.0003 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
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
                                    border: "1px solid #D5D7DA",
                                    background: "#FFF",
                                    boxShadow:
                                      "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                      flex: "1 0 0",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 1,
                                        flex: "1 0 0",
                                        overflow: "hidden",
                                        color: "#717680",
                                        textOverflow: "ellipsis",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "16px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "24px",
                                      }}
                                    >
                                      Select
                                    </div>
                                  </div>
                                  <svg
                                    style={{ width: "24px", height: "24px" }}
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.66699 9L12.667 15L18.667 9"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Divider */}
                          <svg
                            style={{
                              display: "flex",
                              padding: "4px 0",
                              alignItems: "center",
                              alignSelf: "stretch",
                            }}
                            width="1008"
                            height="9"
                            viewBox="0 0 1008 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1008 5H0V4H1008V5"
                              fill="#E9EAEB"
                            />
                          </svg>

                          {/* Date Fields Container */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "16px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "16px",
                                alignSelf: "stretch",
                              }}
                            >
                              {/* Date Received */}
                              <div
                                style={{
                                  display: "flex",
                                  height: "66px",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "6px",
                                    flex: "1 0 0",
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
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      Date Received
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        width: "16px",
                                        height: "16px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <svg
                                        style={{
                                          width: "16px",
                                          height: "16px",
                                          flexShrink: 0,
                                        }}
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clipPath="url(#clip0_help_date_received)">
                                          <path
                                            d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.33333"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_help_date_received">
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
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
                                      border: "1px solid #D5D7DA",
                                      background: "#FFF",
                                      boxShadow:
                                        "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        flex: "1 0 0",
                                      }}
                                    >
                                      <svg
                                        style={{
                                          width: "24px",
                                          height: "24px",
                                        }}
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.66667"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      <input
                                        type="text"
                                        placeholder="dd/mm/yyyy"
                                        style={{
                                          flex: "1 0 0",
                                          border: "none",
                                          outline: "none",
                                          background: "transparent",
                                          fontFamily:
                                            "var(--Font-family-font-family-body, 'Public Sans')",
                                          fontSize: "16px",
                                          fontWeight: 400,
                                          color: "#181D27",
                                          lineHeight: "24px",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Expiration Date */}
                              <div
                                style={{
                                  display: "flex",
                                  height: "66px",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "6px",
                                  flex: "1 0 0",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "6px",
                                    flex: "1 0 0",
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
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                      }}
                                    >
                                      Expiration Date
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        width: "16px",
                                        height: "16px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <svg
                                        style={{
                                          width: "16px",
                                          height: "16px",
                                          flexShrink: 0,
                                        }}
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clipPath="url(#clip0_help_expiration_date)">
                                          <path
                                            d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                            stroke="#A4A7AE"
                                            strokeWidth="1.33333"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_help_expiration_date">
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
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
                                      border: "1px solid #D5D7DA",
                                      background: "#FFF",
                                      boxShadow:
                                        "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        flex: "1 0 0",
                                      }}
                                    >
                                      <svg
                                        style={{
                                          width: "24px",
                                          height: "24px",
                                        }}
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                                          stroke="#A4A7AE"
                                          strokeWidth="1.66667"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      <input
                                        type="text"
                                        placeholder="dd/mm/yyyy"
                                        style={{
                                          flex: "1 0 0",
                                          border: "none",
                                          outline: "none",
                                          background: "transparent",
                                          fontFamily:
                                            "var(--Font-family-font-family-body, 'Public Sans')",
                                          fontSize: "16px",
                                          fontWeight: 400,
                                          color: "#181D27",
                                          lineHeight: "24px",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Divider */}
                          <svg
                            style={{
                              display: "flex",
                              padding: "4px 0",
                              alignItems: "center",
                              alignSelf: "stretch",
                            }}
                            width="1008"
                            height="9"
                            viewBox="0 0 1008 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1008 5H0V4H1008V5"
                              fill="#E9EAEB"
                            />
                          </svg>

                          {/* Comments */}
                          <div
                            style={{
                              display: "flex",
                              height: "123px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                                flex: "1 0 0",
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
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "20px",
                                  }}
                                >
                                  Comments
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "16px",
                                    height: "16px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_help_comments_cred)">
                                      <path
                                        d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                        stroke="#A4A7AE"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_help_comments_cred">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "12px 14px",
                                  alignItems: "flex-start",
                                  gap: "8px",
                                  flex: "1 0 0",
                                  alignSelf: "stretch",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                }}
                              >
                                <textarea
                                  placeholder="Enter a description..."
                                  style={{
                                    flex: "1 0 0",
                                    alignSelf: "stretch",
                                    color: "#717680",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    resize: "none",
                                  }}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Credentials Professional License entries (collapsed) */}
                    {Array.from({
                      length: Math.max(
                        0,
                        (packageQuantities[
                          "credentials-professional-license"
                        ] || 1) - 1,
                      ),
                    }).map((_, i) => {
                      const num = i + 2;
                      return (
                        <div
                          key={`credentials-professional-license-collapsed-${num}`}
                          style={{
                            display: "flex",
                            padding: "12px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "16px",
                            alignSelf: "stretch",
                            borderRadius: "10px",
                            border: "1px solid #E9EAEB",
                            background: "#FAFAFA",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                color: "#181D27",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "var(--Font-size-text-md, 16px)",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "var(--Line-height-text-md, 24px)",
                              }}
                            >
                              {`Credentials - Professional License #${num}`}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              <button
                                style={{
                                  display: "flex",
                                  padding: "8px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "8px",
                                  border: "1px solid #D5D7DA",
                                  background: "#FFF",
                                  boxShadow:
                                    "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                                  cursor: "default",
                                }}
                              >
                                <svg
                                  style={{ width: "16px", height: "16px" }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4 6L8 10L12 6"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Action Buttons */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        alignSelf: "stretch",
                      }}
                    >
                      <button
                        onClick={() =>
                          setPackageQuantities((prev) => ({
                            ...prev,
                            "credentials-professional-license":
                              (prev["credentials-professional-license"] || 1) +
                              1,
                          }))
                        }
                        style={{
                          display: "flex",
                          minHeight: "36px",
                          padding: "6px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.12)",
                          background: "#344698",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
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
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                            }}
                          >
                            Add Another
                          </div>
                        </div>
                      </button>
                      <button
                        style={{
                          display: "flex",
                          minHeight: "36px",
                          padding: "6px 8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "8px",
                          border: "1px solid #D5D7DA",
                          background: "#FFF",
                          boxShadow:
                            "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                          cursor: "pointer",
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
                              color: "#414651",
                              fontFamily:
                                "var(--Font-family-font-family-body, 'Public Sans')",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                            }}
                          >
                            Next Section
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Motor Vehicle Driving History Section */}
              {packageCheckboxes["motor-vehicle-driving"] && (
                <div
                  data-section="motor-vehicle-driving"
                  onChangeCapture={(e) => {
                    const t = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                    if (t && ("value" in t ? String((t as any).value ?? "").trim().length > 0 : false)) {
                      setMvrFilled(true);
                    }
                  }}
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    border: "1px solid #E9EAEB",
                    background: "#FFF",
                    boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    overflow: "hidden",
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "20px",
                      alignSelf: "stretch",
                      background: "#FFF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 24px 0 24px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "4px",
                            flex: "1 0 0",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-start",
                              gap: "2px",
                              flex: "1 0 0",
                            }}
                          >
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
                                  color: "#181D27",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "18px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "28px",
                                }}
                              >
                                Motor Vehicle Driving History
                              </div>
                              {isMvrCompleted() && (
                                <>
                                  <div style={{ display: "flex", padding: "2px 8px", alignItems: "center", borderRadius: "9999px", border: "1px solid #ABEFC6", background: "#ECFDF3" }}>
                                    <div style={{ color: "#067647", textAlign: "center", fontFamily: "var(--Font-family-font-family-body, 'Public Sans')", fontSize: "12px", fontStyle: "normal", fontWeight: 500, lineHeight: "18px" }}>Completed</div>
                                  </div>
                                  <div style={{ display: "flex", width: "28px", height: "28px", padding: "6px", justifyContent: "center", alignItems: "center", borderRadius: "9999px", background: "#DCFAE6" }}>
                                    <svg style={{ width: "16px", height: "16px", flexShrink: 0 }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke="#079455" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <button
                            onClick={() => {
                              setPackageCheckboxes((prev) => ({
                                ...prev,
                                "motor-vehicle-driving": false,
                              }));
                              setPackageQuantities((prev) => {
                                const next = { ...prev };
                                delete next["motor-vehicle-driving"];
                                return next;
                              });
                              setSectionsCollapsed((prev) => ({
                                ...prev,
                                motorVehicleDriving: false,
                              }));
                            }}
                            style={{
                              display: "flex",
                              minHeight: "36px",
                              padding: "6px 8px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
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
                                  color: "#414651",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "20px",
                                }}
                              >
                                Remove
                              </div>
                            </div>
                            <svg
                              style={{ width: "16px", height: "16px" }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_minus_circle_mvr)">
                                <path
                                  d="M5.33301 7.99967H10.6663M14.6663 7.99967C14.6663 11.6816 11.6816 14.6663 7.99967 14.6663C4.31778 14.6663 1.33301 11.6816 1.33301 7.99967C1.33301 4.31778 4.31778 1.33301 7.99967 1.33301C11.6816 1.33301 14.6663 4.31778 14.6663 7.99967Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_minus_circle_mvr">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              setSectionsCollapsed((prev) => ({
                                ...prev,
                                motorVehicleDriving: !prev.motorVehicleDriving,
                              }))
                            }
                            style={{
                              display: "flex",
                              minHeight: "36px",
                              padding: "6px 10px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow:
                                "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              cursor: "pointer",
                            }}
                          >
                            <svg
                              style={{ width: "16px", height: "16px", transform: sectionsCollapsed.motorVehicleDriving ? "none" : "rotate(180deg)", transition: "transform 0.2s ease" }}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 6L8 10L12 6"
                                stroke="#A4A7AE"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Collapsed State Padding */}
                  {sectionsCollapsed.motorVehicleDriving && (
                    <div
                      style={{
                        padding: "0 24px 20px 24px",
                        alignSelf: "stretch",
                      }}
                    />
                  )}

                  {/* Main Content */}
                  <div
                    style={{
                      display: sectionsCollapsed.motorVehicleDriving ? "none" : "flex",
                      padding: "12px 24px 16px 24px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    {/* Form Fields Grid */}
                    <div
                      style={{
                        display: "grid",
                        height: "66px",
                        rowGap: "16px",
                        columnGap: "16px",
                        alignSelf: "stretch",
                        gridTemplateRows: "fit-content(100%)",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                      }}
                    >
                      {/* Drives License Number */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                          gridRow: "1 / span 1",
                          gridColumn: "1 / span 1",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "6px",
                            flex: "1 0 0",
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
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              Drives License Number
                            </div>
                            <div
                              style={{
                                color: "#344698",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              *
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "16px",
                                height: "16px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <svg
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  flexShrink: 0,
                                }}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_help_drives_license)">
                                  <path
                                    d="M6.06065 5.99967C6.21739 5.55412 6.52675 5.17841 6.93395 4.9391C7.34116 4.69978 7.81991 4.6123 8.28544 4.69215C8.75096 4.772 9.1732 5.01402 9.47737 5.37536C9.78154 5.7367 9.94802 6.19402 9.94732 6.66634C9.94732 7.99967 7.94732 8.66634 7.94732 8.66634M8.00065 11.333H8.00732M14.6673 7.99967C14.6673 11.6816 11.6826 14.6663 8.00065 14.6663C4.31875 14.6663 1.33398 11.6816 1.33398 7.99967C1.33398 4.31778 4.31875 1.33301 8.00065 1.33301C11.6826 1.33301 14.6673 4.31778 14.6673 7.99967Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_help_drives_license">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              padding: "8px 12px",
                              alignItems: "center",
                              gap: "8px",
                              flex: "1 0 0",
                              alignSelf: "stretch",
                              borderRadius: "8px",
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                height: "24px",
                                alignItems: "center",
                                gap: "8px",
                                flex: "1 0 0",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  flex: "1 0 0",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#181D27",
                                  lineHeight: "24px",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Purpose for Order */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                          gridRow: "1 / span 1",
                          gridColumn: "2 / span 1",
                        }}
                      >
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
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              Purpose for Order
                            </div>
                            <div
                              style={{
                                color: "#344698",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              *
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "16px",
                                height: "16px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <svg
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  flexShrink: 0,
                                }}
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.39464 5.99967C6.55137 5.55412 6.86074 5.17841 7.26794 4.9391C7.67514 4.69978 8.1539 4.6123 8.61942 4.69215C9.08494 4.772 9.50718 5.01402 9.81135 5.37536C10.1155 5.7367 10.282 6.19402 10.2813 6.66634C10.2813 7.99967 8.2813 8.66634 8.2813 8.66634M8.33464 11.333H8.3413M15.0013 7.99967C15.0013 11.6816 12.0165 14.6663 8.33464 14.6663C4.65274 14.6663 1.66797 11.6816 1.66797 7.99967C1.66797 4.31778 4.65274 1.33301 8.33464 1.33301C12.0165 1.33301 15.0013 4.31778 15.0013 7.99967Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
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
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 1,
                                  flex: "1 0 0",
                                  overflow: "hidden",
                                  color: "#717680",
                                  textOverflow: "ellipsis",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                Select
                              </div>
                            </div>
                            <svg
                              style={{ width: "24px", height: "24px" }}
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.66797 9L12.668 15L18.668 9"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* MVR Type */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                          gridRow: "1 / span 1",
                          gridColumn: "3 / span 1",
                        }}
                      >
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
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              MVR Type
                            </div>
                            <div
                              style={{
                                color: "#344698",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "20px",
                              }}
                            >
                              *
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "16px",
                                height: "16px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <svg
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  flexShrink: 0,
                                }}
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.72667 5.99967C6.8834 5.55412 7.19277 5.17841 7.59997 4.9391C8.00717 4.69978 8.48593 4.6123 8.95145 4.69215C9.41697 4.772 9.83921 5.01402 10.1434 5.37536C10.4476 5.7367 10.614 6.19402 10.6133 6.66634C10.6133 7.99967 8.61333 8.66634 8.61333 8.66634M8.66667 11.333H8.67333M15.3333 7.99967C15.3333 11.6816 12.3486 14.6663 8.66667 14.6663C4.98477 14.6663 2 11.6816 2 7.99967C2 4.31778 4.98477 1.33301 8.66667 1.33301C12.3486 1.33301 15.3333 4.31778 15.3333 7.99967Z"
                                  stroke="#A4A7AE"
                                  strokeWidth="1.33333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
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
                              border: "1px solid #D5D7DA",
                              background: "#FFF",
                              boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                flex: "1 0 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 1,
                                  flex: "1 0 0",
                                  overflow: "hidden",
                                  color: "#717680",
                                  textOverflow: "ellipsis",
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "16px",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                Select
                              </div>
                            </div>
                            <svg
                              style={{ width: "24px", height: "24px" }}
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 9L12 15L18 9"
                                stroke="#A4A7AE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <svg
                      style={{
                        display: "flex",
                        padding: "4px 0",
                        alignItems: "center",
                        alignSelf: "stretch",
                      }}
                      width="1032"
                      height="9"
                      viewBox="0 0 1032 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1032 5H0V4H1032V5"
                        fill="#E9EAEB"
                      />
                    </svg>

                    {/* Expiration Date Container */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "325.33px",
                          alignItems: "flex-start",
                          gap: "16px",
                        }}
                      >
                        {/* Expiration Date */}
                        <div
                          style={{
                            display: "flex",
                            height: "66px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "6px",
                            flex: "1 0 0",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "6px",
                              flex: "1 0 0",
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
                                  fontFamily:
                                    "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "20px",
                                }}
                              >
                                Expiration Date
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  width: "16px",
                                  height: "16px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    flexShrink: 0,
                                  }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_help_expiration_mvr)">
                                    <path
                                      d="M6.06065 5.99967C6.21739 5.55412 6.52675 5.17841 6.93395 4.9391C7.34116 4.69978 7.81991 4.6123 8.28544 4.69215C8.75096 4.772 9.1732 5.01402 9.47737 5.37536C9.78154 5.7367 9.94802 6.19402 9.94732 6.66634C9.94732 7.99967 7.94732 8.66634 7.94732 8.66634M8.00065 11.333H8.00732M14.6673 7.99967C14.6673 11.6816 11.6826 14.6663 8.00065 14.6663C4.31875 14.6663 1.33398 11.6816 1.33398 7.99967C1.33398 4.31778 4.31875 1.33301 8.00065 1.33301C11.6826 1.33301 14.6673 4.31778 14.6673 7.99967Z"
                                      stroke="#A4A7AE"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_help_expiration_mvr">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
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
                                border: "1px solid #D5D7DA",
                                background: "#FFF",
                                boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  flex: "1 0 0",
                                }}
                              >
                                <svg
                                  style={{ width: "24px", height: "24px" }}
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                                    stroke="#A4A7AE"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <input
                                  type="text"
                                  placeholder="dd/mm/yyyy"
                                  style={{
                                    flex: "1 0 0",
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    fontFamily:
                                      "var(--Font-family-font-family-body, 'Public Sans')",
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    color: "#181D27",
                                    lineHeight: "24px",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Tabs removed */}
              {false && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  {/* Tabs Container */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      alignSelf: "stretch",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Package & Products Tab */}
                    <div
                      style={{
                        display: "flex",
                        height: "36px",
                        padding: "8px 6px 8px 12px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        borderRadius: "6px",
                        border: selectedPackage ? "1px solid #D5D7DA" : "none",
                        background: selectedPackage ? "#F9F9F9" : "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        const el = document.querySelector('[data-section="package-and-products"]') as HTMLElement;
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      <div
                        style={{
                          color: "#414651",
                          fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Package & Products
                      </div>
                      {selectedPackage && (
                        <div
                          style={{
                            display: "flex",
                            width: "24px",
                            height: "24px",
                            padding: "6px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "9999px",
                            background: "#DCFAE6",
                          }}
                        >
                          <svg
                            style={{ width: "12px", height: "12px", flexShrink: 0 }}
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="#079455"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Subject Tab */}
                    <div
                      style={{
                        display: "flex",
                        height: "36px",
                        padding: "8px 6px 8px 12px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        borderRadius: "6px",
                        border: validationAttempted && !isSubjectCompleted() ? "1px solid #D5D7DA" : isSubjectCompleted() ? "1px solid #D5D7DA" : "none",
                        background: validationAttempted && !isSubjectCompleted() ? "#F9F9F9" : isSubjectCompleted() ? "#F9F9F9" : "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        const el = document.querySelector('[data-section="subject"]') as HTMLElement;
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      <div
                        style={{
                          color: "#414651",
                          fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        Subject
                      </div>
                      {validationAttempted && !isSubjectCompleted() ? (
                        <>
                          <div
                            style={{
                              display: "flex",
                              padding: "2px 8px",
                              alignItems: "center",
                              borderRadius: "9999px",
                              border: "1px solid #FECDCA",
                              background: "#FEF3F2",
                            }}
                          >
                            <div
                              style={{
                                color: "#B42318",
                                textAlign: "center",
                                fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "18px",
                              }}
                            >
                              {(() => {
                                const requiredFields = ["firstName", "lastName", "dob", "zipCode", "address", "phone", "email", "fcra", "criminalRecords"];
                                const missingCount = requiredFields.filter(field => !subjectFields[field as keyof typeof subjectFields]?.trim()).length;
                                return missingCount;
                              })()}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              width: "24px",
                              height: "24px",
                              padding: "6px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "9999px",
                              background: "#FEE4E2",
                            }}
                          >
                            <svg
                              style={{ width: "12px", height: "12px", flexShrink: 0 }}
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_19230_100)">
                                <path
                                  d="M6 4V6M6 8H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
                                  stroke="#D92D20"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_19230_100">
                                  <rect width="12" height="12" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </>
                      ) : isSubjectCompleted() ? (
                        <div
                          style={{
                            display: "flex",
                            width: "24px",
                            height: "24px",
                            padding: "6px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "9999px",
                            background: "#DCFAE6",
                          }}
                        >
                          <svg
                            style={{ width: "12px", height: "12px", flexShrink: 0 }}
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="#079455"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      ) : null}
                    </div>

                    {/* Employment Tab */}
                    {packageCheckboxes["employment"] && (
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "8px 6px 8px 12px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                          borderRadius: "6px",
                          border: validationAttempted && !isEmploymentCompleted() ? "1px solid #D5D7DA" : isEmploymentCompleted() ? "1px solid #D5D7DA" : "none",
                          background: validationAttempted && !isEmploymentCompleted() ? "#F9F9F9" : isEmploymentCompleted() ? "#F9F9F9" : "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const el = document.querySelector('[data-section="employment"]') as HTMLElement;
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                          }}
                        >
                          Employment
                        </div>
                        {validationAttempted && !isEmploymentCompleted() ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                padding: "2px 8px",
                                alignItems: "center",
                                borderRadius: "9999px",
                                border: "1px solid #FECDCA",
                                background: "#FEF3F2",
                              }}
                            >
                              <div
                                style={{
                                  color: "#B42318",
                                  textAlign: "center",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "18px",
                                }}
                              >
                                {(() => {
                                  let missingCount = 0;
                                  const qty = packageQuantities["employment"] || 0;
                                  for (let i = 1; i <= qty; i++) {
                                    if (!isEmploymentEntryCompleted(i)) missingCount++;
                                  }
                                  return missingCount;
                                })()}
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "24px",
                                height: "24px",
                                padding: "6px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "9999px",
                                background: "#FEE4E2",
                              }}
                            >
                              <svg
                                style={{ width: "12px", height: "12px", flexShrink: 0 }}
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_19230_100)">
                                  <path
                                    d="M6 4V6M6 8H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
                                    stroke="#D92D20"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_19230_100">
                                    <rect width="12" height="12" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </>
                        ) : isEmploymentCompleted() ? (
                          <div
                            style={{
                              display: "flex",
                              width: "24px",
                              height: "24px",
                              padding: "6px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "9999px",
                              background: "#DCFAE6",
                            }}
                          >
                            <svg
                              style={{ width: "12px", height: "12px", flexShrink: 0 }}
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="#079455"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Education Tab */}
                    {packageCheckboxes["education"] && (
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "8px 6px 8px 12px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                          borderRadius: "6px",
                          border: validationAttempted && !isEducationCompleted() ? "1px solid #D5D7DA" : isEducationCompleted() ? "1px solid #D5D7DA" : "none",
                          background: validationAttempted && !isEducationCompleted() ? "#F9F9F9" : isEducationCompleted() ? "#F9F9F9" : "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const el = document.querySelector('[data-section="education"]') as HTMLElement;
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                          }}
                        >
                          Education
                        </div>
                        {validationAttempted && !isEducationCompleted() ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                padding: "2px 8px",
                                alignItems: "center",
                                borderRadius: "9999px",
                                border: "1px solid #FECDCA",
                                background: "#FEF3F2",
                              }}
                            >
                              <div
                                style={{
                                  color: "#B42318",
                                  textAlign: "center",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "18px",
                                }}
                              >
                                {(() => {
                                  let missingCount = 0;
                                  const qty = packageQuantities["education"] || 0;
                                  for (let i = 1; i <= qty; i++) {
                                    if (!isEducationEntryCompleted(i)) missingCount++;
                                  }
                                  return missingCount;
                                })()}
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "24px",
                                height: "24px",
                                padding: "6px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "9999px",
                                background: "#FEE4E2",
                              }}
                            >
                              <svg
                                style={{ width: "12px", height: "12px", flexShrink: 0 }}
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_19230_100)">
                                  <path
                                    d="M6 4V6M6 8H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
                                    stroke="#D92D20"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_19230_100">
                                    <rect width="12" height="12" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </>
                        ) : isEducationCompleted() ? (
                          <div
                            style={{
                              display: "flex",
                              width: "24px",
                              height: "24px",
                              padding: "6px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "9999px",
                              background: "#DCFAE6",
                            }}
                          >
                            <svg
                              style={{ width: "12px", height: "12px", flexShrink: 0 }}
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="#079455"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Professional References Tab */}
                    {packageCheckboxes["professional-references"] && (
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "8px 6px 8px 12px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                          borderRadius: "6px",
                          border: validationAttempted && !isProfessionalReferencesCompleted() ? "1px solid #D5D7DA" : isProfessionalReferencesCompleted() ? "1px solid #D5D7DA" : "none",
                          background: validationAttempted && !isProfessionalReferencesCompleted() ? "#F9F9F9" : isProfessionalReferencesCompleted() ? "#F9F9F9" : "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const el = document.querySelector('[data-section="professional-references"]') as HTMLElement;
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                          }}
                        >
                          References
                        </div>
                        {validationAttempted && !isProfessionalReferencesCompleted() ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                padding: "2px 8px",
                                alignItems: "center",
                                borderRadius: "9999px",
                                border: "1px solid #FECDCA",
                                background: "#FEF3F2",
                              }}
                            >
                              <div
                                style={{
                                  color: "#B42318",
                                  textAlign: "center",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "18px",
                                }}
                              >
                                {(() => {
                                  let missingCount = 0;
                                  const qty = packageQuantities["professional-references"] || 0;
                                  for (let i = 1; i <= qty; i++) {
                                    if (!isProfessionalRefEntryCompleted(i)) missingCount++;
                                  }
                                  return missingCount;
                                })()}
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "24px",
                                height: "24px",
                                padding: "6px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "9999px",
                                background: "#FEE4E2",
                              }}
                            >
                              <svg
                                style={{ width: "12px", height: "12px", flexShrink: 0 }}
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_19230_100)">
                                  <path
                                    d="M6 4V6M6 8H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
                                    stroke="#D92D20"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_19230_100">
                                    <rect width="12" height="12" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </>
                        ) : isProfessionalReferencesCompleted() ? (
                          <div
                            style={{
                              display: "flex",
                              width: "24px",
                              height: "24px",
                              padding: "6px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "9999px",
                              background: "#DCFAE6",
                            }}
                          >
                            <svg
                              style={{ width: "12px", height: "12px", flexShrink: 0 }}
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="#079455"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Credentials Tab */}
                    {packageCheckboxes["credentials-professional-license"] && (
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "8px 6px 8px 12px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                          borderRadius: "6px",
                          border: validationAttempted && !isCredentialsCompleted() ? "1px solid #D5D7DA" : isCredentialsCompleted() ? "1px solid #D5D7DA" : "none",
                          background: validationAttempted && !isCredentialsCompleted() ? "#F9F9F9" : isCredentialsCompleted() ? "#F9F9F9" : "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const el = document.querySelector('[data-section="credentials-professional-license"]') as HTMLElement;
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                          }}
                        >
                          Credentials
                        </div>
                        {validationAttempted && !isCredentialsCompleted() ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                padding: "2px 8px",
                                alignItems: "center",
                                borderRadius: "9999px",
                                border: "1px solid #FECDCA",
                                background: "#FEF3F2",
                              }}
                            >
                              <div
                                style={{
                                  color: "#B42318",
                                  textAlign: "center",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "18px",
                                }}
                              >
                                {(() => {
                                  let missingCount = 0;
                                  const qty = packageQuantities["credentials-professional-license"] || 0;
                                  for (let i = 1; i <= qty; i++) {
                                    if (!isCredentialsEntryCompleted(i)) missingCount++;
                                  }
                                  return missingCount;
                                })()}
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "24px",
                                height: "24px",
                                padding: "6px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "9999px",
                                background: "#FEE4E2",
                              }}
                            >
                              <svg
                                style={{ width: "12px", height: "12px", flexShrink: 0 }}
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_19230_100)">
                                  <path
                                    d="M6 4V6M6 8H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
                                    stroke="#D92D20"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_19230_100">
                                    <rect width="12" height="12" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </>
                        ) : isCredentialsCompleted() ? (
                          <div
                            style={{
                              display: "flex",
                              width: "24px",
                              height: "24px",
                              padding: "6px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "9999px",
                              background: "#DCFAE6",
                            }}
                          >
                            <svg
                              style={{ width: "12px", height: "12px", flexShrink: 0 }}
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="#079455"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* MVR Tab */}
                    {packageCheckboxes["motor-vehicle-driving"] && (
                      <div
                        style={{
                          display: "flex",
                          height: "36px",
                          padding: "8px 6px 8px 12px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                          borderRadius: "6px",
                          border: validationAttempted && !isMvrCompleted() ? "1px solid #D5D7DA" : isMvrCompleted() ? "1px solid #D5D7DA" : "none",
                          background: validationAttempted && !isMvrCompleted() ? "#F9F9F9" : isMvrCompleted() ? "#F9F9F9" : "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const el = document.querySelector('[data-section="motor-vehicle-driving"]') as HTMLElement;
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "20px",
                          }}
                        >
                          MVR
                        </div>
                        {validationAttempted && !isMvrCompleted() ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                padding: "2px 8px",
                                alignItems: "center",
                                borderRadius: "9999px",
                                border: "1px solid #FECDCA",
                                background: "#FEF3F2",
                              }}
                            >
                              <div
                                style={{
                                  color: "#B42318",
                                  textAlign: "center",
                                  fontFamily: "var(--Font-family-font-family-body, 'Public Sans')",
                                  fontSize: "12px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "18px",
                                }}
                              >
                                1
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "24px",
                                height: "24px",
                                padding: "6px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "9999px",
                                background: "#FEE4E2",
                              }}
                            >
                              <svg
                                style={{ width: "12px", height: "12px", flexShrink: 0 }}
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_19230_100)">
                                  <path
                                    d="M6 4V6M6 8H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
                                    stroke="#D92D20"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_19230_100">
                                    <rect width="12" height="12" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </>
                        ) : isMvrCompleted() ? (
                          <div
                            style={{
                              display: "flex",
                              width: "24px",
                              height: "24px",
                              padding: "6px",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "9999px",
                              background: "#DCFAE6",
                            }}
                          >
                            <svg
                              style={{ width: "12px", height: "12px", flexShrink: 0 }}
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="#079455"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Authorization Section - Always show */}
              <div
                data-section="authorization"
                style={{
                  display: selectedPackage ? "flex" : "none",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  borderRadius: "12px",
                  border: "1px solid #E9EAEB",
                  background: "#FFF",
                  boxShadow: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                  overflow: "hidden",
                }}
              >
                {/* Section Header */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "20px",
                    alignSelf: "stretch",
                    background: "#FFF",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "20px 24px 0 24px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "4px",
                          flex: "1 0 0",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            gap: "2px",
                            flex: "1 0 0",
                          }}
                        >
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
                                color: "#181D27",
                                fontFamily:
                                  "var(--Font-family-font-family-body, 'Public Sans')",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "28px",
                              }}
                            >
                              Authorize and Continue
                            </div>
                            {authorizationChecked ? (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "2px 8px",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    border: "1px solid #ABEFC6",
                                    background: "#ECFDF3",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#067647",
                                      textAlign: "center",
                                      fontFamily:
                                        "var(--Font-family-font-family-body, 'Public Sans')",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "18px",
                                    }}
                                  >
                                    Completed
                                  </div>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "28px",
                                    height: "28px",
                                    padding: "6px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    background: "#DCFAE6",
                                  }}
                                >
                                  <svg
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      flexShrink: 0,
                                    }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M13.3327 4L5.99935 11.3333L2.66602 8"
                                      stroke="#079455"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </>
                            ) : (
                              validationAttempted && (
                                <>
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "2px 8px",
                                      alignItems: "center",
                                      borderRadius: "9999px",
                                      border: "1px solid #FECDCA",
                                      background: "#FEF3F2",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#B42318",
                                        textAlign: "center",
                                        fontFamily:
                                          "var(--Font-family-font-family-body, 'Public Sans')",
                                        fontSize: "12px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "18px",
                                      }}
                                    >
                                      Missing Fields
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "28px",
                                      height: "28px",
                                      padding: "6px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      borderRadius: "9999px",
                                      background: "#FEE4E2",
                                    }}
                                  >
                                    <svg
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        flexShrink: 0,
                                      }}
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_6357_127030)">
                                        <path
                                          d="M8.00001 5.33337V8.00004M8.00001 10.6667H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
                                          stroke="#D92D20"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_6357_127030">
                                          <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div
                  style={{
                    display: "flex",
                    padding: "12px 24px 16px 24px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  {/* Authorization Checkbox */}
                  <div
                    style={{
                      display: "flex",
                      width: "505px",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "2px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        checked={authorizationChecked}
                        onCheckedChange={(c) => setAuthorizationChecked(!!c)}
                        className="h-4 w-4 rounded-[4px] border border-[#D5D7DA] data-[state=checked]:bg-[#34479A] data-[state=checked]:border-transparent data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[#34479A]"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "320px",
                          alignItems: "flex-end",
                          gap: "4px",
                        }}
                      >
                        <div
                          style={{
                            color: "#414651",
                            fontFamily:
                              "var(--Font-family-font-family-body, 'Public Sans')",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "20px",
                          }}
                        >
                          I have obtained candidate authorization.
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "16px",
                            height: "16px",
                            justifyContent: "center",
                            alignItems: "center",
                            flexShrink: 0,
                          }}
                        >
                          <svg
                            style={{
                              width: "16px",
                              height: "16px",
                              flexShrink: 0,
                            }}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_help_authorization)">
                              <path
                                d="M6.06065 5.99967C6.21739 5.55412 6.52675 5.17841 6.93395 4.9391C7.34116 4.69978 7.81991 4.6123 8.28544 4.69215C8.75096 4.772 9.1732 5.01402 9.47737 5.37536C9.78154 5.7367 9.94802 6.19402 9.94732 6.66634C9.94732 7.99967 7.94732 8.66634 7.94732 8.66634M8.00065 11.333H8.00732M14.6673 7.99967C14.6673 11.6816 11.6826 14.6663 8.00065 14.6663C4.31875 14.6663 1.33398 11.6816 1.33398 7.99967C1.33398 4.31778 4.31875 1.33301 8.00065 1.33301C11.6826 1.33301 14.6673 4.31778 14.6673 7.99967Z"
                                stroke="#A4A7AE"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_help_authorization">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      <div
                        style={{
                          alignSelf: "stretch",
                          color: "#535862",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "20px",
                        }}
                      >
                        Learn more about the Fair Credit Reporting Act (FCRA)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Form (excludes Authorization) */}
              <div
                style={{
                  display: selectedPackage ? "flex" : "none",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "8px 0 0 0",
                }}
              >
                {(() => {
                  const ready = areActiveSectionsCompletedExcludingAuthorization();
                  return (
                    <button
                      onClick={handleCompleteForm}
                      style={{
                        display: "flex",
                        minHeight: "32px",
                        padding: "6px 10px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "6px",
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        background: "#FFF",
                        boxShadow:
                          "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          color: "#414651",
                          fontFamily:
                            "var(--Font-family-font-family-body, 'Public Sans')",
                          fontSize: "var(--Font-size-text-sm, 14px)",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "var(--Line-height-text-sm, 20px)",
                        }}
                      >
                        Complete Form - Demo Only
                      </span>
                      {(ready || formSectionsCompleted) && (
                        <svg
                          style={{ width: 16, height: 16 }}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3332 4L5.99984 11.3333L2.6665 8"
                            stroke="#079455"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })()}
              </div>

              {/* CTA Order Section */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  alignSelf: "stretch",
                  padding: "24px 0",
                }}
              >
                {/* Save as Draft Button */}
                <button
                  style={{
                    display: "flex",
                    padding: "12px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6px",
                    borderRadius: "8px",
                    border: "1px solid #D5D7DA",
                    background: "#FFF",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F5F5F5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFF";
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
                        color: "#414651",
                        fontFamily:
                          "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "var(--Font-size-text-md, 16px)",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "var(--Line-height-text-md, 24px)",
                      }}
                    >
                      Save as a Draft
                    </div>
                  </div>
                </button>

                {/* Submit Order Button */}
                <button
                  onClick={handleSubmitOrder}
                  disabled={!isFormReadyForSubmission()}
                  style={{
                    display: "flex",
                    padding: "12px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6px",
                    borderRadius: "8px",
                    border: "2px solid rgba(255, 255, 255, 0.12)",
                    background: isFormReadyForSubmission() ? "#344698" : "#A4A7AE",
                    boxShadow:
                      "0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05)",
                    cursor: isFormReadyForSubmission() ? "pointer" : "not-allowed",
                    transition: "all 0.2s ease",
                    opacity: isFormReadyForSubmission() ? 1 : 0.6,
                  }}
                  onMouseEnter={(e) => {
                    if (isFormReadyForSubmission()) {
                      e.currentTarget.style.background = "#2D3985";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isFormReadyForSubmission()) {
                      e.currentTarget.style.background = "#344698";
                    } else {
                      e.currentTarget.style.background = "#A4A7AE";
                    }
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
                        fontFamily:
                          "var(--Font-family-font-family-body, 'Public Sans')",
                        fontSize: "var(--Font-size-text-md, 16px)",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "var(--Line-height-text-md, 24px)",
                      }}
                    >
                      Submit Order
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <QuickNavigation
          isVisible={showQuickNavigation && !!selectedPackage}
          hasValidationErrors={hasValidationErrors()}
          onNavigateToSection={handleNavigateToSection}
          sections={getNavigationSections()}
        />
      </main>
    </div>
  );
};

export default OnlineOrdering;
