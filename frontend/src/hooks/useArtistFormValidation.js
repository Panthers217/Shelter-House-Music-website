import { useState, useCallback, useMemo, } from "react";

export function useArtistFormValidation(
  fields,
  fieldValues,
  handleUploadNewRecord,
  handleUpdateRecord
) {
  

  

  // Stable callback to get the current mode

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Helper to format date as yyyy-mm-dd
  const formatDate = useCallback((date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  }, []);

  // Restriction: block input for 'id'
  const isRestrictedField = useCallback(
    (field) => field === "id" ,
    []
  );

  // Fields that require boolean dropdown
  const booleanFields = useMemo(
    () => [
      "demos",
      "top_track",
      "featured_track",
      "activate",
      "activate_video",
      "featured_artists",
      "is_active",
      "promote_track",
      "promo",
      "church_partner",
    ],
    []
  );
  // Fields that are required
  const requiredFields = useMemo(
    () => ["name", "release_date", "title", "email ", "phone_number", ...booleanFields],
    [booleanFields]
  );

  // Helper to check if a field is required
  const isRequired = useCallback(
    (field) => requiredFields.includes(field),
    [requiredFields]
  );

  // Email validation
  const isEmailvalid = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // Phone validation
  const isPhoneValid = useCallback((phone) => {
    if (!phone) return false;
    const digits = phone.replace(/\D/g, "");
    return digits.length === 10;
  }, []);

  // Custom submit handler to validate email/phone before calling the correct handler based on actionType
  const handleLocalSubmit = useCallback(
    (e, actionType, fieldsArg, fieldValuesArg,mode) => {
      e.preventDefault();
      const fieldsToCheck = fieldsArg || fields;
      const valuesToCheck = fieldValuesArg || fieldValues;
      if (fieldsToCheck.includes("email") && !isEmailvalid(valuesToCheck.email)) {
        setEmailError("Please enter a valid email address.");
        return;
      }
      if (fieldsToCheck.includes("phone_number")) {
        if (!isPhoneValid(valuesToCheck.phone_number)) {
          setPhoneError("Please enter a valid 10-digit phone number.");
          return;
        }
      }
      setEmailError("");
      setPhoneError("");
      // Switch statement for dynamic action
      switch (actionType) {
        case "upload":
          handleUploadNewRecord(e, valuesToCheck,mode);
          // console.log("Uploading new record with values:", valuesToCheck);
          // console.log("Mode:", mode);
          break;
        case "update":
          handleUpdateRecord(e, valuesToCheck, mode);
          // console.log("Mode:", mode);
          // console.log("Updating record with values:", valuesToCheck, mode);
          break;
        default:
          // Optionally handle unknown action
          break;
      }
    },
    [
      fields,
      fieldValues,
      isEmailvalid,
      isPhoneValid,
      handleUploadNewRecord,
      handleUpdateRecord,
    ]
  );

  return {
    emailError,
    phoneError,
    setEmailError,
    setPhoneError,
    formatDate,
    booleanFields,
    requiredFields,
    isRequired,
    isEmailvalid,
    isPhoneValid,
    handleLocalSubmit,
    isRestrictedField,
    };
    
  }
  