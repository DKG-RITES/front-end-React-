// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import FormContainer from "../../../../../components/DKG_FormContainer";
// import { Checkbox, Divider, Form, message, Modal } from "antd";
// import { ArrowLeftOutlined } from "@ant-design/icons";
// import FormSearchItem from "../../../../../components/DKG_FormSearchItem";
// import { apiCall, handleChange } from "../../../../../utils/CommonFunctions";
// import FormInputItem from "../../../../../components/DKG_FormInputItem";
// import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";
// import Btn from "../../../../../components/DKG_Btn";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import IconBtn from "../../../../../components/DKG_IconBtn";
// import { regexMatch } from "../../../../../utils/Constants";

// const wvDropDown = [
//   {
//     key: "Witnessed",
//     value: "Witnessed",
//   },
//   {
//     key: "Verified",
//     value: "Verified",
//   },
// ];

// const ladleChemDropDown = [
//   {
//     key: "Send To Lab",
//     value: "Send To Lab",
//   },
//   {
//     key: "Pass",
//     value: "Pass",
//   },
//   {
//     key: "Reject",
//     value: "Reject",
//   },
// ];

// const casterNoDropDownSms2 = [
//   {
//     key: "M/c IV",
//     value: "M/c IV",
//   },
//   {
//     key: "M/c V",
//     value: "M/c V",
//   },
// ];
// const casterNoDropDownSms3 = [
//   {
//     key: "CV1",
//     value: "CV1",
//   },
//   {
//     key: "CV2",
//     value: "CV2",
//   },
// ];

// const heatStageObj = {
//   Converter: 1,
//   Degassing: 2,
//   Casting: 3,
//   "Chemical Analysis": 4,
//   "Bloom Cutting": 5,
// };

// const HeatDtl = () => {
//   const { token } = useSelector((state) => state.auth);
//   const [form] = Form.useForm();
//   const { dutyId } = useSelector((state) => state.smsDuty);
//   const [completedHeatStage, setCompletedHeatStage] = useState(0);
//   const [currentStage, setCurrentStage] = useState(1);
//   const [isOutOfRange, setIsOutOfRange] = useState(false);

//   const { sms } = useSelector((state) => state.smsDuty);

//   const navigate = useNavigate();

//   const { state } = useLocation();
//   const heatNo = state?.heatNo || null;

//   const [formData, setFormData] = useState({
//     heatNo: null,
//     turnDownTemp: null,
//     turnDownTempWv: null,
//     degassingVacuum: null,
//     degassingDuration: null,
//     degassingVacuumWv: null,
//     degassingDurationWv: null,
//     castingTempOne: null,
//     castingTempTwo: null,
//     casterNo: null,
//     sequenceNo: null,
//     sequenceNo1: null,
//     sequenceNo2: null,
//     hydris: null,
//     isProbeDipped: false,
//     isHydrogenBw80And100: false,
//     nitrogen: null,
//     oxygen: null,
//     sentToLadle: null,
//     noOfPrimeBlooms: null,
//     primeBloomsLength: null,
//     primeBloomsTotalLength: null,
//     noOfCoBlooms: null,
//     coBloomsLength: null,
//     coBloomsTotalLength: null,
//     noOfRejectedBlooms: null,
//     rejectedBloomsLength: null,
//     rejectedBloomsTotalLength: null,
//     weightOfPrimeBlooms: null,
//     weightOfCoBlooms: null,
//     weightOfRejectedBlooms: null,
//     totalCastWt: null,
//     isDiverted: false,
//     heatRemark: null,
//   });

//   const stageValidationRules = useMemo(
//     () => ({
//       stage1: ["turnDownTemp", "turnDownTempWv"],
//       stage2: [
//         "degassingVacuum",
//         "degassingVacuumWv",
//         "degassingDuration",
//         "degassingDurationWv",
//       ],
//       stage3: ["castingTemp", "castingTemp2", "casterNo", "sequenceNo1", "sequenceNo2", "hydris"],
//       stage4: ["nitrogen", "oxygen", "sentToLadle"],
//       stage5: [
//         "weightOfPrimeBlooms",
//         "weightOfCoBlooms",
//         "weightOfRejectedBlooms",
//         "totalCastWt",
//       ],
//     }),
//     []
//   );

//   const csVal =
//     sms === "SMS 3"
//       ? 0.1005
//       : sms === "SMS 3" && formData.casterNo === "M/c IV"
//         ? 0.1088
//         : 0.102;

//   const validateStage = useCallback(
//     (stage) => {
//       const fields = stageValidationRules[`stage${stage}`];
//       for (let field of fields) {
//         if (!formData[field]) {
//           return false; // Incomplete stage
//         }
//       }
//       return true; // Stage is complete
//     },
//     [formData, stageValidationRules]
//   );


//   const [editableStage, setEditableStage] = useState({
//     heatProcurementStageCode: null,
//     heatProcurementStage: null,
//     heatSurrenderStage: null,
//     heatSurrenderStageCode: null,
//   });

//   const isFieldDisabled = (stage) => {
//     const procurementStage = editableStage.heatProcurementStageCode || null;
//     const surrenderStage = editableStage.heatSurrenderStageCode || null;

//     // Always enable currentStage
//     if (stage === currentStage) {
//       return false; // Enabled
//     }

//     // If both procurement and surrender are null, disable others
//     if (procurementStage === null && surrenderStage === null) {
//       return true; // Disabled
//     }

//     // Use raw values directly
//     const effectiveProcurementStage = procurementStage !== null ? procurementStage : 1;
//     const effectiveSurrenderStage = surrenderStage !== null ? surrenderStage : currentStage + 1;

//     // Enable if stage <= currentStage AND within procurementStage <= stage <= surrenderStage
//     if (stage <= currentStage && stage >= effectiveProcurementStage && stage <= effectiveSurrenderStage) {
//       return false; // Enabled
//     }

//     return true; // Disabled
//   };

//   const handleHeatNoSearch = useCallback(
//     async (heatNo = null) => {
//       try {
//         const { data } = await apiCall(
//           "GET",
//           `/sms/getHeatDtls?heatNo=${heatNo ? heatNo : formData.heatNo}&dutyId=${dutyId}`,
//           token
//         );
//         const { responseData } = data;

//         setFormData({
//           heatNo: responseData?.heatNo || null,
//           turnDownTemp: responseData?.turnDownTemp || null,
//           turnDownTempWv: responseData?.turnDownTempWv || null,
//           degassingVacuum: responseData?.degassingVacuum || null,
//           degassingDuration: responseData?.degassingDuration || null,
//           degassingVacuumWv: responseData?.degassingVacuumWv || null,
//           degassingDurationWv: responseData?.degassingDurationWv || null,
//           castingTemp: responseData?.castingTemp || null,
//           castingTemp2: responseData?.castingTemp2 || null,
//           casterNo: responseData?.casterNo || null,
//           sequenceNo1: responseData?.sequenceNo?.split("/")?.[0] || null,
//           sequenceNo2: responseData?.sequenceNo?.split("/")?.[1] || null,
//           // sequenceNo2: responseData?.sequenceNo,
//           hydris: responseData?.hydris || null,
//           isProbeDipped: responseData?.isProbeDipped || false,
//           isHydrogenBw80And100: responseData?.isHydrogenBw80And100 || false,
//           nitrogen: responseData?.nitrogen || null,
//           oxygen: responseData?.oxygen || null,
//           sentToLadle: responseData?.sentToLadle || null,
//           noOfPrimeBlooms: responseData?.noOfPrimeBlooms || null,
//           primeBloomsLength: responseData?.primeBloomsLength || null,
//           primeBloomsTotalLength: responseData?.primeBloomsTotalLength || null,
//           noOfCoBlooms: responseData?.noOfCoBlooms || null,
//           coBloomsLength: responseData?.coBloomsLength || null,
//           coBloomsTotalLength: responseData?.coBloomsTotalLength || null,
//           noOfRejectedBlooms: responseData?.noOfRejectedBlooms || null,
//           rejectedBloomsLength: responseData?.rejectedBloomsLength || null,
//           rejectedBloomsTotalLength:
//             responseData?.rejectedBloomsTotalLength || null,
//           weightOfPrimeBlooms: responseData?.weightOfPrimeBlooms || null,
//           weightOfCoBlooms: responseData?.weightOfCoBlooms || null,
//           weightOfRejectedBlooms: responseData?.weightOfRejectedBlooms || null,
//           totalCastWt: responseData?.totalCastWt || null,
//           isDiverted: responseData?.isDiverted || false,
//           heatRemark: responseData?.heatRemark || null,
//         });

//         const heatStageNum = heatStageObj[responseData?.heatStage];
//         setCompletedHeatStage(heatStageNum);
//       } catch (error) { }
//     },
//     [token, formData.heatNo, dutyId]
//   );

//   const onFinish = async () => {

//     const payload = {
//       ...formData,
//       dutyId,
//       sequenceNo: formData?.sequenceNo1 + "/" + formData?.sequenceNo2
//     }
//     console.log("CURRENSTAGE: ", currentStage)
//     const fields = stageValidationRules[`stage${currentStage - 1}`];
//     if (currentStage === 5) {
//       const isStageFiveFilled = 
//         formData.weightOfPrimeBlooms ||
//         formData.weightOfCoBlooms ||
//         formData.weightOfRejectedBlooms ||
//         formData.totalCastWt;
      
//       if (isStageFiveFilled && (!formData.weightOfPrimeBlooms || !formData.weightOfCoBlooms || !formData.weightOfRejectedBlooms || !formData.totalCastWt)) {
//         message.error(`Please fill all the fields for Stage ${currentStage}`);
//         return;
//       }
//     } else if (currentStage === 3) {
//       const isStageThreeFilled = formData.castingTempOne || formData.castingTempTwo || formData.casterNo || formData.sequenceNo || formData.hydris;
//       if (isStageThreeFilled && (!formData.castingTempOne || !formData.castingTempTwo || !formData.casterNo || !formData.sequenceNo || !formData.hydris)) {
//         message.error(`Please fill all the fields for Stage ${currentStage}`);
//         return;
//       }
//     } else if (currentStage === 4) {
//       const isStageFourFilled = formData.nitrogen || formData.oxygen || formData.sentToLadle;
//       if (isStageFourFilled && (!formData.nitrogen || !formData.oxygen || !formData.sentToLadle)) {
//         message.error(`Please fill all the fields for Stage ${currentStage}`);
//         return;
//       }
//     } else {
//       for (let field of fields) {
//         if (!formData[field]) {
//           message.error(`Please fill all the fields for Stage ${currentStage}`);
//           return;
//         }

//         const fields2 = stageValidationRules[`stage${currentStage}`];
//         for (let field of fields2) {
//           if (formData[field]) {
//             message.error(`Please fill all the fields for Stage ${currentStage}`);
//             return;
//           }
//         }
//       }
//     }

//     if (isOutOfRange) {
//       Modal.confirm({
//         title: "Warning",
//         content: "You are saving some values outside the range, are you sure to continue?",
//         onOk: async () => {
//           try {
//             await apiCall("POST", "/sms/updateHeatDtls", token, payload);
//             message.success("SMS heat details updated successfully.");
//             navigate("/sms/heatSummary");
//           } catch (error) {
//             message.error("Failed to update heat details.");
//           }
//         },
//       });
//     } else {
//       try {
//         await apiCall("POST", "/sms/updateHeatDtls", token, payload);
//         message.success("SMS heat details updated successfully.");
//         navigate("/sms/heatSummary");
//       } catch (error) { }
//     }
//   };

//   const [primeBloomsFieldState, setPrimeBloomsFieldState] = useState({
//     noOfPrimeBlooms: false,
//     primeBloomsLength: false,
//     primeBloomsTotalLength: false,
//   });

//   const [coBloomsFieldState, setCoBloomsFieldState] = useState({
//     noOfCoBlooms: false,
//     coBloomsLength: false,
//     coBloomsTotalLength: false,
//   });

//   const [rejectedBloomsFieldState, setRejectedBloomsFieldState] = useState({
//     noOfRejectedBlooms: false,
//     rejectedBloomsLength: false,
//     rejectedBloomsTotalLength: false,
//   });

//   const handlePrimeBloomDtlChange = (fieldName, value) => {
//     let primeBloomWt = 0;

//     const { noOfPrimeBlooms, primeBloomsLength } = formData;

//     if (fieldName === "noOfPrimeBlooms" || fieldName === "primeBloomsLength") {
//       const isOtherFieldEmpty =
//         (fieldName === "noOfPrimeBlooms" && !primeBloomsLength) ||
//         (fieldName === "primeBloomsLength" && !noOfPrimeBlooms);

//       if (!value && isOtherFieldEmpty) {
//         setPrimeBloomsFieldState({
//           noOfPrimeBlooms: false,
//           primeBloomsLength: false,
//           primeBloomsTotalLength: false,
//         });
//       } else {
//         setPrimeBloomsFieldState({
//           noOfPrimeBlooms: false,
//           primeBloomsLength: false,
//           primeBloomsTotalLength: true,
//         });
//       }
//       primeBloomWt =
//         (fieldName === "noOfPrimeBlooms" ? value : noOfPrimeBlooms) *
//         (fieldName === "primeBloomsLength" ? value : primeBloomsLength) *
//         csVal * 7.85;
//     } else if (fieldName === "primeBloomsTotalLength") {
//       if (!value) {
//         setPrimeBloomsFieldState({
//           noOfPrimeBlooms: false,
//           primeBloomsLength: false,
//           primeBloomsTotalLength: false,
//         });
//       } else {
//         setPrimeBloomsFieldState({
//           noOfPrimeBlooms: true,
//           primeBloomsLength: true,
//           primeBloomsTotalLength: false,
//         });
//       }
//       primeBloomWt = value * csVal * 7.85;
//     }

//     // Update form data
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: value,
//       weightOfPrimeBlooms: primeBloomWt,
//       totalCastWt:
//         primeBloomWt + prev.weightOfCoBlooms + prev.weightOfRejectedBlooms,
//     }));
//   };

//   const handleCoBloomDtlChange = (fieldName, value) => {
//     let coBloomWt = 0;

//     const { noOfCoBlooms, coBloomsLength } = formData;

//     if (fieldName === "noOfCoBlooms" || fieldName === "coBloomsLength") {
//       const isOtherFieldEmpty =
//         (fieldName === "noOfCoBlooms" && !coBloomsLength) ||
//         (fieldName === "coBloomsLength" && !noOfCoBlooms);

//       if (!value && isOtherFieldEmpty) {
//         setCoBloomsFieldState({
//           noOfCoBlooms: false,
//           coBloomsLength: false,
//           coBloomsTotalLength: false,
//         });
//       } else {
//         setCoBloomsFieldState({
//           noOfCoBlooms: false,
//           coBloomsLength: false,
//           coBloomsTotalLength: true,
//         });
//       }
//       coBloomWt =
//         (fieldName === "noOfCoBlooms" ? value : noOfCoBlooms) *
//         (fieldName === "coBloomsLength" ? value : coBloomsLength) *
//         csVal * 7.85;
//     } else if (fieldName === "coBloomsTotalLength") {
//       if (!value) {
//         setCoBloomsFieldState({
//           noOfCoBlooms: false,
//           coBloomsLength: false,
//           coBloomsTotalLength: false,
//         });
//       } else {
//         setCoBloomsFieldState({
//           noOfCoBlooms: true,
//           coBloomsLength: true,
//           coBloomsTotalLength: false,
//         });
//       }
//       coBloomWt = value * csVal * 7.85;
//     }

//     // Update form data
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: value,
//       weightOfCoBlooms: coBloomWt,
//       totalCastWt:
//         coBloomWt + prev.weightOfPrimeBlooms + prev.weightOfRejectedBlooms,
//     }));
//   };

//   const [showLabCheckbox, setShowLabCheckbox] = useState(false);

//   const handleChemChange = (fieldName, value) => {
//     console.log("Called: ", value);
//     if (value === "Send To Lab") {
//       console.log("INSIDEEEE");
//       setShowLabCheckbox(true);
//     } else {
//       setShowLabCheckbox(false);
//     }

//     setFormData((prev) => ({ ...prev, [fieldName]: value }));
//   };

//   const handleRejectedBloomDtlChange = (fieldName, value) => {
//     let rejectedBloomWt = 0;

//     const { noOfRejectedBlooms, rejectedBloomsLength } = formData;

//     if (
//       fieldName === "noOfRejectedBlooms" ||
//       fieldName === "rejectedBloomsLength"
//     ) {
//       const isOtherFieldEmpty =
//         (fieldName === "noOfRejectedBlooms" && !rejectedBloomsLength) ||
//         (fieldName === "rejectedBloomsLength" && !noOfRejectedBlooms);

//       if (!value && isOtherFieldEmpty) {
//         setRejectedBloomsFieldState({
//           noOfRejectedBlooms: false,
//           rejectedBloomsLength: false,
//           rejectedBloomsTotalLength: false,
//         });
//       } else {
//         setRejectedBloomsFieldState({
//           noOfRejectedBlooms: false,
//           rejectedBloomsLength: false,
//           rejectedBloomsTotalLength: true,
//         });
//       }
//       rejectedBloomWt =
//         (fieldName === "noOfRejectedBlooms" ? value : noOfRejectedBlooms) *
//         (fieldName === "rejectedBloomsLength" ? value : rejectedBloomsLength) *
//         csVal * 7.85;
//     } else if (fieldName === "rejectedBloomsTotalLength") {
//       if (!value) {
//         setRejectedBloomsFieldState({
//           noOfRejectedBlooms: false,
//           rejectedBloomsLength: false,
//           rejectedBloomsTotalLength: false,
//         });
//       } else {
//         setRejectedBloomsFieldState({
//           noOfRejectedBlooms: true,
//           rejectedBloomsLength: true,
//           rejectedBloomsTotalLength: false,
//         });
//       }
//       rejectedBloomWt = value * csVal * 7.85;
//     }

//     // Update form data
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: value,
//       weightOfRejectedBlooms: rejectedBloomWt,
//       totalCastWt:
//         rejectedBloomWt + prev.weightOfCoBlooms + prev.weightOfPrimeBlooms,
//     }));
//   };

//   const [hydrisRuleObj, setHydrisRuleObj] = useState([]);

//   useEffect(() => {
//     form.setFieldsValue(formData);
//   }, [formData, form]);

//   useEffect(() => {
//     if (validateStage(currentStage) && currentStage < 5) {
//       setCurrentStage(currentStage + 1);
//     }
//   }, [currentStage, formData, validateStage]);

//   useEffect(() => {
//     if (heatNo !== null) {
//       setFormData((prev) => ({ ...prev, heatNo: heatNo }));
//       handleHeatNoSearch(heatNo);
//     }
//   }, [handleHeatNoSearch, heatNo]);

//   const populateEditableStage = useCallback(async () => {
//     try {
//       const { data } = await apiCall("POST", "/sms/getStageDtl", token, { dutyId, heatNo: heatNo || null })
//       setEditableStage(data?.responseData || {})

//     }
//     catch (error) { }
//   }, [token, heatNo, dutyId])

//   useEffect(() => {
//     populateEditableStage()
//   }, [populateEditableStage]);

//   const [degVacRule, setDegVacRule] = useState([]);
//   const [degDurRule, setDegDurRule] = useState([]);
//   const [castTempRule, setCastTempRule] = useState([]);

//   const handleCastTempChange = (fieldName, value) => {
//     const isInteger = regexMatch.intRegex.test(value);

//     if (!isInteger) {
//       setCastTempRule([
//         {
//           validator: (_, value) =>
//             Promise.reject(
//               new Error("Temperature must not contain decimal values.")
//             ),
//         },
//       ]);
//     } else if (isInteger && parseInt(value) < 1480) {
//       setCastTempRule([
//         {
//           validator: (_, value) =>
//             Promise.reject(
//               new Error("Temperature must be greater than or equal to 1480.")
//             ),
//         },
//       ]);
//     } else {
//       setCastTempRule([]);
//     }

//     setFormData(prev => ({ ...prev, [fieldName]: value }))
//   };

//   const handleDegVacChange = (fieldName, value) => {
//     const isFloat = regexMatch.floatRegex.test(value);

//     if (!isFloat) {
//       setDegVacRule([
//         {
//           validator: (_, value) =>
//             Promise.reject(new Error("Value must be numeric.")),
//         },
//       ]);
//     } else if (isFloat && parseFloat(value) > 3) {
//       setDegVacRule([
//         {
//           validator: (_, value) =>
//             Promise.reject(new Error("Value must be smaller than 3.0 ")),
//         },
//       ]);
//     } else {
//       setDegVacRule([]);
//     }

//     setFormData((prev) => ({ ...prev, [fieldName]: value }));
//   };

//   const [heatRemarkDisabled, setHeatRemarkDisabled] = useState(false);

//   const handleDegDurChange = (fieldName, value) => {
//     const isFloat = /^-?\d+(\.\d+)?$/.test(value);

//     if (!isFloat) {
//       setDegDurRule([
//         {
//           validator: (_, value) =>
//             Promise.reject(new Error("Value must be numeric.")),
//         },
//       ]);
//     } else if (isFloat && parseFloat(value) > 10.0) {
//       setDegDurRule([
//         {
//           validator: (_, value) =>
//             Promise.reject(new Error("Value must be smaller than 10.0")),
//         },
//       ]);
//     } else {
//       setDegDurRule([]);
//     }
//     setFormData((prev) => ({ ...prev, [fieldName]: value }));
//   };
//   const handleHydrisChange = (fieldName, value) => {
//     const isFloat = regexMatch.floatRegex.test(value);

//     if (!isFloat) {
//       setHydrisRuleObj([
//         {
//           validator: (_, value) =>
//             Promise.reject(new Error("Value must be numeric.")),
//         },
//       ]);
//     } else {
//       setHydrisRuleObj([]);

//       if (parseFloat(value) > 1.6) {
//         message.warning("Value must be smaller or equal to 1.6");
//         setFormData((prev) => ({
//           ...prev,
//           heatRemark: "Reject for hydrogen.",
//           hydris: value,
//         }));
//         setHeatRemarkDisabled(true);
//         setIsOutOfRange(true);
//       }
//       else {
//         setHeatRemarkDisabled(false);
//         setFormData((prev) => ({
//           ...prev,
//           heatRemark: null,
//           hydris: value,
//         }));
//         setIsOutOfRange(false);
//       }
//     }
//     setFormData((prev) => ({ ...prev, [fieldName]: value }));
//   };

//   const [nitrogenRule, setNitrogenRule] = useState([]);

//   const handleNitrogenChange = (fieldName, value) => {
//     const isFloat = regexMatch.floatRegex.test(value);

//     if (!isFloat) {
//       setNitrogenRule([
//         {
//           validator: (_, value) =>
//             Promise.reject(new Error("Value must be numeric.")),

//         },
//       ]);
//     }
//     else {
//       setNitrogenRule([]);

//       if (parseFloat(value) > 0.009) {
//         message.warning("Value must be less than 0.009");

//         setFormData((prev) => ({
//           ...prev,
//           heatRemark: "Reject for nitrogen.",
//           nitrogen: value,
//         }));
//         setHeatRemarkDisabled(true);
//         setIsOutOfRange(true);
//       }
//       else {
//         setHeatRemarkDisabled(false);
//         setFormData((prev) => ({
//           ...prev,
//           heatRemark: null,
//           nitrogen: value,
//         }));
//         setIsOutOfRange(false);
//       }
//     }

//     setFormData((prev) => ({ ...prev, [fieldName]: value }));

//   }

//   const [oxygenRule, setOxygenRule] = useState([]);

//   const handleOxygenChange = (fieldName, value) => {
//     const isFloat = regexMatch.floatRegex.test(value)

//     if (!isFloat) {
//       setOxygenRule([
//         {
//           validator: (_, value) =>
//             Promise.reject(new Error("Value must be numeric.")),

//         },
//       ]);
//     }
//     else {
//       setOxygenRule([]);
//       if (parseFloat(value) > 20) {
//         message.warning("Value must be less than or equal to 20.0");

//         setFormData((prev) => ({
//           ...prev,
//           heatRemark: "Reject for oxygen.",
//           oxygen: value,
//         }));
//         setHeatRemarkDisabled(true);
//         setIsOutOfRange(true);
//       }
//       else {
//         setHeatRemarkDisabled(false);
//         setFormData((prev) => ({
//           ...prev,
//           heatRemark: null,
//           oxygen: value,
//         }));
//         setIsOutOfRange(false);
//       }
//     }
//     setFormData((prev) => ({ ...prev, [fieldName]: value }));
//   }

//   return (
//     <FormContainer>
//       <div className="relative">
//         <IconBtn
//           icon={ArrowLeftOutlined}
//           onClick={() => navigate("/sms/heatSummary")}
//           className="absolute left-0 shadow-none bg-inherit"
//         />
//         <h1 className="font-semibold !text-xl text-center">Heat Detail</h1>
//       </div>
//       <Form
//         layout="vertical"
//         initialValues={formData}
//         form={form}
//         onFinish={onFinish}
//       // onValuesChange={handleBloomDtlChange}
//       >
//         <FormSearchItem
//           label="Enter Heat Number"
//           name="heatNo"
//           onSearch={handleHeatNoSearch}
//           onChange={(fieldName, value) =>
//             handleChange(fieldName, value, setFormData)
//           }
//         />

//         <Divider />

//         <h3 className="font-semibold">Stage 1: Converter</h3>

//         <div className="grid grid-cols-2 gap-8">
//           <FormInputItem
//             label="Turn Down Temp. (&deg;C)"
//             name="turnDownTemp"
//             onChange={(fieldName, value) =>
//               handleChange(fieldName, value, setFormData)
//             }
//             // disabled={currentStage !== 1}
//             disabled={isFieldDisabled(1)}
//           />
//           <FormDropdownItem
//             label="Witnessed / Verified"
//             name="turnDownTempWv"
//             formField="turnDownTempWv"
//             dropdownArray={wvDropDown}
//             visibleField="value"
//             valueField="key"
//             onChange={(fieldName, value) =>
//               handleChange(fieldName, value, setFormData)
//             }
//             // disabled = {editableStage.heatProcurementStageCode + 1 > 0 && editableStage.heatSurrenderStage >= 0 }
//             // disabled={currentStage !== 1}
//             // disabled={isFieldDisabled(1)}
//             disabled={isFieldDisabled(1)}
//           />
//         </div>

//         <Divider />
//         <h3 className="font-semibold">Stage 2: Degassing</h3>
//         <div className="grid grid-cols-2 gap-x-4">
//           <FormInputItem
//             label="Degassing Vacuum(m bar)"
//             name="degassingVacuum"
//             placeholder="2.5"
//             rules={degVacRule}
//             onChange={handleDegVacChange}
//             disabled={isFieldDisabled(2)}
//           />
//           <FormDropdownItem
//             label=""
//             name="degassingVacuumWv"
//             className="mt-14 sm:mt-8"
//             formField="degassingVacuumWv"
//             dropdownArray={wvDropDown}
//             visibleField="value"
//             valueField="key"
//             onChange={(fieldName, value) =>
//               handleChange(fieldName, value, setFormData)
//             }
//             disabled={isFieldDisabled(2)}
//           />
//           <FormInputItem
//             label="Degassing Duration(min)"
//             name="degassingDuration"
//             placeholder="10.0"
//             rules={degDurRule}
//             onChange={handleDegDurChange}
//             disabled={isFieldDisabled(2)}
//           />
//           <FormDropdownItem
//             label=""
//             name="degassingDurationWv"
//             className="mt-14 sm:mt-8"
//             formField="degassingDurationWv"
//             dropdownArray={wvDropDown}
//             visibleField="value"
//             valueField="key"
//             onChange={(fieldName, value) =>
//               handleChange(fieldName, value, setFormData)
//             }
//             disabled={isFieldDisabled(2)}
//           />
//         </div>

//         <Divider />

//         <h3 className="font-semibold">Stage 3: Casting</h3>
//         <div className="grid grid-cols-2 gap-x-4">
//           <FormInputItem
//             label="Casting Temperature (&deg;C)"
//             name="castingTemp"
//             onChange={handleCastTempChange}
//             rules={castTempRule}
//             disabled={isFieldDisabled(3)}
//           />
//           <FormInputItem
//             label="Casting Temperature (&deg;C) - 2"
//             name="castingTemp2"
//             onChange={handleCastTempChange}
//             rules={castTempRule}
//             disabled={isFieldDisabled(3)}
//           />
//           {/* <FormInputItem
//             label="Caster Number "
//             name="casterNo"
//             onChange={(fieldName, value) =>
//               handleChange(fieldName, value, setFormData)
//             }
//             disabled={isFieldDisabled(3)}
//           /> */}

//           <FormDropdownItem
//             label="Caster Number"
//             name="casterNo"
//             formField="casterNo"
//             dropdownArray={
//               sms === "SMS 2" ? casterNoDropDownSms2 : casterNoDropDownSms3
//             }
//             visibleField="value"
//             valueField="key"
//             onChange={(fieldName, value) =>
//               handleChange(fieldName, value, setFormData)
//             }
//             disabled={isFieldDisabled(3)}
//           />

//           <div>
//             <div className="font-medium mb-1">
//               Sequence Number
//             </div>
//             <div className="flex gap-2">

//               <FormInputItem
//                 // label="Sequence Number 1"
//                 name="sequenceNo1"
//                 onChange={(fieldName, value) =>
//                   handleChange(fieldName, value, setFormData)
//                 }
//                 disabled={isFieldDisabled(3)}
//               />
//               <div className="text-4xl font-semibold">

//                 /
//               </div>
//               <FormInputItem
//                 // label="Sequence Number 2"
//                 name="sequenceNo2"
//                 onChange={(fieldName, value) =>
//                   handleChange(fieldName, value, setFormData)
//                 }
//                 disabled={isFieldDisabled(3)}
//               />
//             </div>

//           </div>
//           {/* <FormInputItem
//             label="Sequence Number "
//             name="sequenceNo"
//             onChange={(fieldName, value) =>
//               handleChange(fieldName, value, setFormData)
//             }
//             disabled={isFieldDisabled(3)}
//           /> */}
//           <FormInputItem
//             label="Hydris"
//             name="hydris"
//             rules={hydrisRuleObj}
//             onChange={handleHydrisChange}
//             disabled={isFieldDisabled(3)}
//           />
//         </div>

//         <Divider />

//         <Checkbox
//           checked={formData.isProbeDipped}
//           onChange={(e) =>
//             setFormData((prev) => ({
//               ...prev,
//               isProbeDipped: e.target.checked,
//             }))
//           }
//         >
//           Is probe dipped below 300mm from slag - metal surface
//         </Checkbox>
//         <Checkbox
//           checked={formData.isHydrogenBw80And100}
//           onChange={(e) =>
//             setFormData((prev) => ({
//               ...prev,
//               isHydrogenBw80And100: e.target.checked,
//             }))
//           }
//         >
//           Is measurement of hydrogen between 80-100m of Casting
//         </Checkbox>

//         <Divider />
//         <h3 className="font-semibold">Stage 4: Chemical Analysis</h3>
//         <div className="grid grid-cols-2 gap-x-4">
//           <FormInputItem
//             label="Nitrogen (ppm)"
//             name="nitrogen"
//             rules={nitrogenRule}
//             onChange={handleNitrogenChange}
//             disabled={isFieldDisabled(4)}
//           />
//           <FormInputItem
//             label="Oxygen (ppm)"
//             name="oxygen"
//             rules={oxygenRule}
//             onChange={handleOxygenChange}
//             disabled={isFieldDisabled(4)}
//           />

//           <FormDropdownItem
//             label="Ladle Chemistry"
//             name="sentToLadle"
//             formField="sentToLadle"
//             dropdownArray={ladleChemDropDown}
//             visibleField="value"
//             valueField="key"
//             onChange={handleChemChange}
//             disabled={isFieldDisabled(4)}
//           />

//           {showLabCheckbox && (
//             <div className="flex flex-col">
//               <Checkbox className="">Chemical</Checkbox>
//               <Checkbox className="">Nitrogen</Checkbox>
//               <Checkbox className="">Oxygen</Checkbox>
//             </div>
//           )}
//         </div>

//         <Divider />

//         <h3 className="font-semibold">Stage 5: Bloom Details</h3>
//         <div className="border grid grid-cols-5 divide-x divide-y divide-gray-300">
//           <div></div>
//           <h3 className="p-2">Number</h3>
//           <h3 className="p-2">Length</h3>
//           <h3 className="p-2">Tot. Len.</h3>
//           <h3 className="p-2">Weight</h3>

//           <h3 className="text-center p-2">Prime</h3>
//           <FormInputItem
//             className="no-border"
//             name="noOfPrimeBlooms"
//             onChange={handlePrimeBloomDtlChange}
//             disabled={
//               isFieldDisabled(5) || primeBloomsFieldState.noOfPrimeBlooms
//             }
//           />
//           <FormInputItem
//             className="no-border"
//             name="primeBloomsLength"
//             onChange={handlePrimeBloomDtlChange}
//             disabled={
//               isFieldDisabled(5) || primeBloomsFieldState.primeBloomsLength
//             }
//           />
//           <FormInputItem
//             className="no-border"
//             name="primeBloomsTotalLength"
//             onChange={handlePrimeBloomDtlChange}
//             disabled={
//               isFieldDisabled(5) || primeBloomsFieldState.primeBloomsTotalLength
//             }
//           />
//           <FormInputItem
//             className="no-border"
//             name="weightOfPrimeBlooms"
//             disabled
//           />

//           <h3 className="text-center p-2">CO</h3>
//           <FormInputItem
//             className="no-border"
//             name="noOfCoBlooms"
//             onChange={handleCoBloomDtlChange}
//             disabled={isFieldDisabled(5) || coBloomsFieldState.noOfCoBlooms}
//           />
//           <FormInputItem
//             className="no-border"
//             name="coBloomsLength"
//             onChange={handleCoBloomDtlChange}
//             disabled={isFieldDisabled(5) || coBloomsFieldState.coBloomsLength}
//           />
//           <FormInputItem
//             className="no-border"
//             name="coBloomsTotalLength"
//             onChange={handleCoBloomDtlChange}
//             disabled={
//               isFieldDisabled(5) || coBloomsFieldState.coBloomsTotalLength
//             }
//           />
//           <FormInputItem
//             className="no-border"
//             name="weightOfCoBlooms"
//             disabled
//           />

//           <h3 className="text-center p-2">Rejected</h3>
//           <FormInputItem
//             className="no-border"
//             name="noOfRejectedBlooms"
//             onChange={handleRejectedBloomDtlChange}
//             disabled={
//               isFieldDisabled(5) || rejectedBloomsFieldState.noOfRejectedBlooms
//             }
//           />
//           <FormInputItem
//             className="no-border"
//             name="rejectedBloomsLength"
//             onChange={handleRejectedBloomDtlChange}
//             disabled={
//               isFieldDisabled(5) ||
//               rejectedBloomsFieldState.rejectedBloomsLength
//             }
//           />
//           <FormInputItem
//             className="no-border"
//             name="rejectedBloomsTotalLength"
//             onChange={handleRejectedBloomDtlChange}
//             disabled={
//               isFieldDisabled(5) ||
//               rejectedBloomsFieldState.rejectedBloomsTotalLength
//             }
//           />
//           <FormInputItem
//             className="no-border"
//             name="weightOfRejectedBlooms"
//             disabled
//           />

//           <h3 className="text-center p-2 col-span-4">Total Cast Weight</h3>
//           <FormInputItem className="no-border" name="totalCastWt" disabled />
//         </div>

//         <Checkbox
//           className="my-4"
//           checked={formData.isDiverted}
//           onChange={(e) =>
//             setFormData((prev) => ({
//               ...prev,
//               isDiverted: e.target.checked,
//               heatRemark: e.target.checked ? "Diverted" : null,
//             }))
//           }
//         >
//           Mark as diverted heat.
//         </Checkbox>

//         <FormInputItem
//           name="heatRemark"
//           placeholder="Heat Remark"
//           disabled={heatRemarkDisabled}
//           onChange={(name, value) => handleChange(name, value, setFormData)}
//         />
//         <Btn htmlType="submit" className="flex mx-auto">
//           {" "}
//           Save{" "}
//         </Btn>
//       </Form>
//     </FormContainer>
//   );
// };

// export default HeatDtl;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import FormContainer from "../../../../../components/DKG_FormContainer";
import { Checkbox, Divider, Form, message, Modal } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import FormSearchItem from "../../../../../components/DKG_FormSearchItem";
import { apiCall, handleChange } from "../../../../../utils/CommonFunctions";
import FormInputItem from "../../../../../components/DKG_FormInputItem";
import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";
import Btn from "../../../../../components/DKG_Btn";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import IconBtn from "../../../../../components/DKG_IconBtn";
import { regexMatch } from "../../../../../utils/Constants";

const wvDropDown = [
  {
    key: "Witnessed",
    value: "Witnessed",
  },
  {
    key: "Verified",
    value: "Verified",
  },
];

const ladleChemDropDown = [
  {
    key: "Send To Lab",
    value: "Send To Lab",
  },
  {
    key: "Pass",
    value: "Pass",
  },
  {
    key: "Reject",
    value: "Reject",
  },
];

const casterNoDropDownSms2 = [
  {
    key: "M/c IV",
    value: "M/c IV",
  },
  {
    key: "M/c V",
    value: "M/c V",
  },
];
const casterNoDropDownSms3 = [
  {
    key: "CV1",
    value: "CV1",
  },
  {
    key: "CV2",
    value: "CV2",
  },
];

const heatStageObj = {
  Converter: 1,
  Degassing: 2,
  Casting: 3,
  "Chemical Analysis": 4,
  "Bloom Cutting": 5,
};

const HeatDtl = () => {
  const { token } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const { dutyId } = useSelector((state) => state.smsDuty);
  const [completedHeatStage, setCompletedHeatStage] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [isOutOfRange, setIsOutOfRange] = useState(false);

  const { sms } = useSelector((state) => state.smsDuty);

  const navigate = useNavigate();

  const { state } = useLocation();
  const heatNo = state?.heatNo || null;

  const [formData, setFormData] = useState({
    heatNo: null,
    turnDownTemp: null,
    turnDownTempWv: null,
    degassingVacuum: null,
    degassingDuration: null,
    degassingVacuumWv: null,
    degassingDurationWv: null,
    castingTempOne: null,
    castingTempTwo: null,
    casterNo: null,
    sequenceNo: null,
    hydris: null,
    isProbeDipped: false,
    isHydrogenBw80And100: false,
    nitrogen: null,
    oxygen: null,
    sentToLadle: null,
    noOfPrimeBlooms: null,
    primeBloomsLength: null,
    primeBloomsTotalLength: null,
    noOfCoBlooms: null,
    coBloomsLength: null,
    coBloomsTotalLength: null,
    noOfRejectedBlooms: null,
    rejectedBloomsLength: null,
    rejectedBloomsTotalLength: null,
    weightOfPrimeBlooms: null,
    weightOfCoBlooms: null,
    weightOfRejectedBlooms: null,
    totalCastWt: null,
    isDiverted: false,
    heatRemark: null,
  });
  console.log("FormcasterL ", formData.casterNo);

  const stageValidationRules = useMemo(
    () => ({
      stage1: ["turnDownTemp", "turnDownTempWv"],
      stage2: [
        "degassingVacuum",
        "degassingVacuumWv",
        "degassingDuration",
        "degassingDurationWv",
      ],
      stage3: ["castingTempOne", "castingTempTwo",  "casterNo", "sequenceNo", "hydris"],
      stage4: ["nitrogen", "oxygen", "sentToLadle"],
      stage5: [
        "weightOfPrimeBlooms",
        "weightOfCoBlooms",
        "weightOfRejectedBlooms",
        "totalCastWt",
      ],
    }),
    []
  );

  const csVal =
    sms === "SMS 3"
      ? 0.1005
      : sms === "SMS 3" && formData.casterNo === "M/c IV"
      ? 0.1088
      : 0.102;

  const validateStage = useCallback(
    (stage) => {
      const fields = stageValidationRules[`stage${stage}`];
      for (let field of fields) {
        if (!formData[field]) {
          return false; // Incomplete stage
        }
      }
      return true; // Stage is complete
    },
    [formData, stageValidationRules]
  );

  const isFieldDisabled = (stage) => {
    return stage <= completedHeatStage || stage > currentStage
    // return stage !== currentStage;
  };

  const handleHeatNoSearch = useCallback(
    async (heatNo = null) => {
      try {
        const { data } = await apiCall(
          "GET",
          `/sms/getHeatDtls?heatNo=${heatNo ? heatNo : formData.heatNo}&dutyId=${dutyId}`,
          token
        );
        const { responseData } = data;

        setFormData({
          heatNo: responseData?.heatNo || null,
          turnDownTemp: responseData?.turnDownTemp || null,
          turnDownTempWv: responseData?.turnDownTempWv || null,
          degassingVacuum: responseData?.degassingVacuum || null,
          degassingDuration: responseData?.degassingDuration || null,
          degassingVacuumWv: responseData?.degassingVacuumWv || null,
          degassingDurationWv: responseData?.degassingDurationWv || null,
          castingTempOne: responseData?.castingTempOne || null,
          castingTempTwo: responseData?.castingTempTwo || null,
          casterNo: responseData?.casterNo || null,
          sequenceNo: responseData?.sequenceNo || null,
          hydris: responseData?.hydris || null,
          isProbeDipped: responseData?.isProbeDipped || false,
          isHydrogenBw80And100: responseData?.isHydrogenBw80And100 || false,
          nitrogen: responseData?.nitrogen || null,
          oxygen: responseData?.oxygen || null,
          sentToLadle: responseData?.sentToLadle || null,
          noOfPrimeBlooms: responseData?.noOfPrimeBlooms || null,
          primeBloomsLength: responseData?.primeBloomsLength || null,
          primeBloomsTotalLength: responseData?.primeBloomsTotalLength || null,
          noOfCoBlooms: responseData?.noOfCoBlooms || null,
          coBloomsLength: responseData?.coBloomsLength || null,
          coBloomsTotalLength: responseData?.coBloomsTotalLength || null,
          noOfRejectedBlooms: responseData?.noOfRejectedBlooms || null,
          rejectedBloomsLength: responseData?.rejectedBloomsLength || null,
          rejectedBloomsTotalLength:
            responseData?.rejectedBloomsTotalLength || null,
          weightOfPrimeBlooms: responseData?.weightOfPrimeBlooms || null,
          weightOfCoBlooms: responseData?.weightOfCoBlooms || null,
          weightOfRejectedBlooms: responseData?.weightOfRejectedBlooms || null,
          totalCastWt: responseData?.totalCastWt || null,
          isDiverted: responseData?.isDiverted || false,
          heatRemark: responseData?.heatRemark || null,
        });

        const heatStageNum = heatStageObj[responseData?.heatStage];
        setCompletedHeatStage(heatStageNum);
      } catch (error) {}
    },
    [token, formData.heatNo]
  );

  const onFinish = async () => {
    const fields = stageValidationRules[`stage${currentStage}`];
    // if (currentStage === 5) {
    //   if (
    //     !formData.weightOfPrimeBlooms ||
    //     !formData.weightOfCoBlooms ||
    //     !formData.weightOfRejectedBlooms ||
    //     !formData.totalCastWt
    //   ) {
    //     message.error(`Please fill all the fields for Stage ${currentStage}`);
    //     return;
    //   }
    // } else{
    //   for (let field of fields) {
    //     if (formData[field]) {
    //       message.error(`Please fill all the fields for Stage ${currentStage}`);
    //       return;
    //     }
    //   }
    // }

    if (currentStage === 5) {
      const isStageFiveFilled = 
        formData.weightOfPrimeBlooms ||
        formData.weightOfCoBlooms ||
        formData.weightOfRejectedBlooms ||
        formData.totalCastWt;
      
      if (isStageFiveFilled && (!formData.weightOfPrimeBlooms || !formData.weightOfCoBlooms || !formData.weightOfRejectedBlooms || !formData.totalCastWt)) {
        message.error(`Please fill all the fields for Stage ${currentStage}`);
        return;
      }
    } else if (currentStage === 3) {
      const isStageThreeFilled = formData.castingTempOne || formData.castingTempTwo || formData.casterNo || formData.sequenceNo || formData.hydris;
      if (isStageThreeFilled && (!formData.castingTempOne || !formData.castingTempTwo || !formData.casterNo || !formData.sequenceNo || !formData.hydris)) {
        message.error(`Please fill all the fields for Stage ${currentStage}`);
        return;
      }
    } else if (currentStage === 4) {
      const isStageFourFilled = formData.nitrogen || formData.oxygen || formData.sentToLadle;
      if (isStageFourFilled && (!formData.nitrogen || !formData.oxygen || !formData.sentToLadle)) {
        message.error(`Please fill all the fields for Stage ${currentStage}`);
        return;
      }
    } else {
      for (let field of fields) {
        if (!formData[field]) {
          message.error(`Please fill all the fields for Stage ${currentStage}`);
          return;
        }
      }
    }

    if (isOutOfRange) {
      Modal.confirm({
        title: "Warning",
        content: "You are saving some values outside the range, are you sure to continue?",
        onOk: async () => {
          try {
            await apiCall("POST", "/sms/updateHeatDtls", token, {
              ...formData,
              dutyId,
            });
            message.success("SMS heat details updated successfully.");
            navigate("/sms/heatSummary");
          } catch (error) {
            message.error("Failed to update heat details.");
          }
        },
      });
    } else {
      try {
        await apiCall("POST", "/sms/updateHeatDtls", token, {
          ...formData,
          dutyId,
        });
        message.success("SMS heat details updated successfully.");
        navigate("/sms/heatSummary");
      } catch (error) {}
    }
  };

  const [primeBloomsFieldState, setPrimeBloomsFieldState] = useState({
    noOfPrimeBlooms: false,
    primeBloomsLength: false,
    primeBloomsTotalLength: false,
  });

  const [coBloomsFieldState, setCoBloomsFieldState] = useState({
    noOfCoBlooms: false,
    coBloomsLength: false,
    coBloomsTotalLength: false,
  });

  const [rejectedBloomsFieldState, setRejectedBloomsFieldState] = useState({
    noOfRejectedBlooms: false,
    rejectedBloomsLength: false,
    rejectedBloomsTotalLength: false,
  });

  const handlePrimeBloomDtlChange = (fieldName, value) => {
    let primeBloomWt = 0;

    const { noOfPrimeBlooms, primeBloomsLength } = formData;

    if (fieldName === "noOfPrimeBlooms" || fieldName === "primeBloomsLength") {
      const isOtherFieldEmpty =
        (fieldName === "noOfPrimeBlooms" && !primeBloomsLength) ||
        (fieldName === "primeBloomsLength" && !noOfPrimeBlooms);

      if (!value && isOtherFieldEmpty) {
        setPrimeBloomsFieldState({
          noOfPrimeBlooms: false,
          primeBloomsLength: false,
          primeBloomsTotalLength: false,
        });
      } else {
        setPrimeBloomsFieldState({
          noOfPrimeBlooms: false,
          primeBloomsLength: false,
          primeBloomsTotalLength: true,
        });
      }
      primeBloomWt =
        (fieldName === "noOfPrimeBlooms" ? value : noOfPrimeBlooms) *
        (fieldName === "primeBloomsLength" ? value : primeBloomsLength) *
        csVal * 7.85;
    } else if (fieldName === "primeBloomsTotalLength") {
      if (!value) {
        setPrimeBloomsFieldState({
          noOfPrimeBlooms: false,
          primeBloomsLength: false,
          primeBloomsTotalLength: false,
        });
      } else {
        setPrimeBloomsFieldState({
          noOfPrimeBlooms: true,
          primeBloomsLength: true,
          primeBloomsTotalLength: false,
        });
      }
      primeBloomWt = value * csVal * 7.85;
    }

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
      weightOfPrimeBlooms: primeBloomWt,
      totalCastWt:
        primeBloomWt + prev.weightOfCoBlooms + prev.weightOfRejectedBlooms,
    }));
  };

  const handleCoBloomDtlChange = (fieldName, value) => {
    let coBloomWt = 0;

    const { noOfCoBlooms, coBloomsLength } = formData;

    if (fieldName === "noOfCoBlooms" || fieldName === "coBloomsLength") {
      const isOtherFieldEmpty =
        (fieldName === "noOfCoBlooms" && !coBloomsLength) ||
        (fieldName === "coBloomsLength" && !noOfCoBlooms);

      if (!value && isOtherFieldEmpty) {
        setCoBloomsFieldState({
          noOfCoBlooms: false,
          coBloomsLength: false,
          coBloomsTotalLength: false,
        });
      } else {
        setCoBloomsFieldState({
          noOfCoBlooms: false,
          coBloomsLength: false,
          coBloomsTotalLength: true,
        });
      }
      coBloomWt =
        (fieldName === "noOfCoBlooms" ? value : noOfCoBlooms) *
        (fieldName === "coBloomsLength" ? value : coBloomsLength) *
        csVal * 7.85;
    } else if (fieldName === "coBloomsTotalLength") {
      if (!value) {
        setCoBloomsFieldState({
          noOfCoBlooms: false,
          coBloomsLength: false,
          coBloomsTotalLength: false,
        });
      } else {
        setCoBloomsFieldState({
          noOfCoBlooms: true,
          coBloomsLength: true,
          coBloomsTotalLength: false,
        });
      }
      coBloomWt = value * csVal * 7.85;
    }

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
      weightOfCoBlooms: coBloomWt,
      totalCastWt:
        coBloomWt + prev.weightOfPrimeBlooms + prev.weightOfRejectedBlooms,
    }));
  };

  const [showLabCheckbox, setShowLabCheckbox] = useState(false);

  const handleChemChange = (fieldName, value) => {
    console.log("Called: ", value);
    if (value === "Send To Lab") {
      console.log("INSIDEEEE");
      setShowLabCheckbox(true);
    } else {
      setShowLabCheckbox(false);
    }

    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleRejectedBloomDtlChange = (fieldName, value) => {
    let rejectedBloomWt = 0;

    const { noOfRejectedBlooms, rejectedBloomsLength } = formData;

    if (
      fieldName === "noOfRejectedBlooms" ||
      fieldName === "rejectedBloomsLength"
    ) {
      const isOtherFieldEmpty =
        (fieldName === "noOfRejectedBlooms" && !rejectedBloomsLength) ||
        (fieldName === "rejectedBloomsLength" && !noOfRejectedBlooms);

      if (!value && isOtherFieldEmpty) {
        setRejectedBloomsFieldState({
          noOfRejectedBlooms: false,
          rejectedBloomsLength: false,
          rejectedBloomsTotalLength: false,
        });
      } else {
        setRejectedBloomsFieldState({
          noOfRejectedBlooms: false,
          rejectedBloomsLength: false,
          rejectedBloomsTotalLength: true,
        });
      }
      rejectedBloomWt =
        (fieldName === "noOfRejectedBlooms" ? value : noOfRejectedBlooms) *
        (fieldName === "rejectedBloomsLength" ? value : rejectedBloomsLength) *
        csVal * 7.85;
    } else if (fieldName === "rejectedBloomsTotalLength") {
      if (!value) {
        setRejectedBloomsFieldState({
          noOfRejectedBlooms: false,
          rejectedBloomsLength: false,
          rejectedBloomsTotalLength: false,
        });
      } else {
        setRejectedBloomsFieldState({
          noOfRejectedBlooms: true,
          rejectedBloomsLength: true,
          rejectedBloomsTotalLength: false,
        });
      }
      rejectedBloomWt = value * csVal * 7.85;
    }

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
      weightOfRejectedBlooms: rejectedBloomWt,
      totalCastWt:
        rejectedBloomWt + prev.weightOfCoBlooms + prev.weightOfPrimeBlooms,
    }));
  };

  const [hydrisRuleObj, setHydrisRuleObj] = useState([]);

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  useEffect(() => {
    if (validateStage(currentStage) && currentStage < 5) {
      setCurrentStage(currentStage + 1);
    }
  }, [currentStage, formData, validateStage]);

  useEffect(() => {
    if (heatNo !== null) {
      setFormData((prev) => ({ ...prev, heatNo: heatNo }));
      handleHeatNoSearch(heatNo);
    }
  }, [handleHeatNoSearch, heatNo]);

  const [degVacRule, setDegVacRule] = useState([]);
  const [castTempRule, setCastTempRule] = useState([]);

  const handleCastTempChange = (fieldName, value) => {
    const isInteger = regexMatch.intRegex.test(value);

    if (!isInteger) {
      setCastTempRule([
        {
          validator: (_, value) =>
            Promise.reject(
              new Error("Temperature must not contain decimal values.")
            ),
        },
      ]);
    } else if (isInteger && parseInt(value) < 1480) {
      setCastTempRule([
        {
          validator: (_, value) =>
            Promise.reject(
              new Error("Temperature must be greater than or equal to 1480.")
            ),
        },
      ]);
    } else {
      setCastTempRule([]);
    }

    setFormData(prev => ({...prev, [fieldName]: value}))
  };

  const handleDegVacChange = (fieldName, value) => {
    const isFloat = regexMatch.floatRegex.test(value);

    if (!isFloat) {
      setDegVacRule([
        {
          validator: (_, value) =>
            Promise.reject(new Error("Value must be numeric.")),
        },
      ]);
    } else if (isFloat && parseFloat(value) > 3) {
      setDegVacRule([
        {
          validator: (_, value) =>
            Promise.reject(new Error("Value must be smaller than 3.0 ")),
        },
      ]);
    } else {
      setDegVacRule([]);
    }

    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const [heatRemarkDisabled, setHeatRemarkDisabled] = useState(false);

  // const handleDegDurChange = (fieldName, value) => {
  //   const isFloat = /^-?\d+(\.\d+)?$/.test(value);

  //   if (!isFloat) {
  //     setDegDurRule([
  //       {
  //         validator: (_, value) =>
  //           Promise.reject(new Error("Value must be numeric.")),
  //       },
  //     ]);
  //   } else if (isFloat && parseFloat(value) > 10.0) {
  //     setDegDurRule([
  //       {
  //         validator: (_, value) =>
  //           Promise.reject(new Error("Value must be smaller than 10.0")),
  //       },
  //     ]);
  //   } else {
  //     setDegDurRule([]);
  //   }
  //   setFormData((prev) => ({ ...prev, [fieldName]: value }));
  // };

  const [degDurRule, setDegDurRule] = useState([]);

  const handleDegDurChange = (fieldName, value) => {
    const isFloat = regexMatch.floatRegex.test(value)

    if(!isFloat){
      setDegDurRule([
        {
          validator: (_, value) =>
            Promise.reject(new Error("Value must be numeric.")),
          
        },
      ]);
    }
    else{
      setDegDurRule([]);
      if(parseFloat(value) < 10){
        message.warning("Value must be greater than or equal to 10.0");

        setFormData((prev) => ({
          ...prev,
          degassingDuration: value,
        }));
        setHeatRemarkDisabled(true);
        setIsOutOfRange(true);
      }
      else{
        setHeatRemarkDisabled(false);
        setFormData((prev) => ({
          ...prev,
          degassingDuration: value,
        }));
        setIsOutOfRange(false);
      }
    }
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  }

  const handleHydrisChange = (fieldName, value) => {
    const isFloat = regexMatch.floatRegex.test(value);

    if (!isFloat) {
      setHydrisRuleObj([
        {
          validator: (_, value) =>
            Promise.reject(new Error("Value must be numeric.")),
        },
      ]);
    } else {
      setHydrisRuleObj([]);

      if (parseFloat(value) > 1.6) {
        message.warning("Value must be smaller or equal to 1.6");
        setFormData((prev) => ({
          ...prev,
          heatRemark: "Reject for hydrogen.",
          hydris: value,
        }));
        setHeatRemarkDisabled(true);
        setIsOutOfRange(true);
      }
      else{
        setHeatRemarkDisabled(false);
        setFormData((prev) => ({
          ...prev,
          heatRemark: null,
          hydris: value,
        }));
        setIsOutOfRange(false);
      }
    }
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const [nitrogenRule, setNitrogenRule] = useState([]);

  const handleNitrogenChange = (fieldName, value) => {
    const isFloat = regexMatch.floatRegex.test(value);

    if(!isFloat){
      setNitrogenRule([
        {
          validator: (_, value) =>
            Promise.reject(new Error("Value must be numeric.")),
          
        },
      ]);
    }
    else{
      setNitrogenRule([]);

      if(parseFloat(value) > 0.009){
        message.warning("Value must be less than 0.009");

        setFormData((prev) => ({
          ...prev,
          heatRemark: "Reject for nitrogen.",
          nitrogen: value,
        }));
        setHeatRemarkDisabled(true);
        setIsOutOfRange(true);
      }
      else{
        setHeatRemarkDisabled(false);
        setFormData((prev) => ({
          ...prev,
          heatRemark: null,
          nitrogen: value,
        }));
        setIsOutOfRange(false);
      }
    }

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

  }

  const [oxygenRule, setOxygenRule] = useState([]);

  const handleOxygenChange = (fieldName, value) => {
    const isFloat = regexMatch.floatRegex.test(value)

    if(!isFloat){
      setOxygenRule([
        {
          validator: (_, value) =>
            Promise.reject(new Error("Value must be numeric.")),
          
        },
      ]);
    }
    else{
      setOxygenRule([]);
      if(parseFloat(value) > 20){
        message.warning("Value must be less than or equal to 20.0");

        setFormData((prev) => ({
          ...prev,
          heatRemark: "Reject for oxygen.",
          oxygen: value,
        }));
        setHeatRemarkDisabled(true);
        setIsOutOfRange(true);
      }
      else{
        setHeatRemarkDisabled(false);
        setFormData((prev) => ({
          ...prev,
          heatRemark: null,
          oxygen: value,
        }));
        setIsOutOfRange(false);
      }
    }
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  }

  return (
    <FormContainer>
      <div className="relative">
        <IconBtn
          icon={ArrowLeftOutlined}
          onClick={() => navigate("/sms/heatSummary")}
          className="absolute left-0 shadow-none bg-inherit"
        />
        <h1 className="font-semibold !text-xl text-center">Heat Detail</h1>
      </div>
      <Form
        layout="vertical"
        initialValues={formData}
        form={form}
        onFinish={onFinish}
        // onValuesChange={handleBloomDtlChange}
      >
        <FormSearchItem
          label="Enter Heat Number"
          name="heatNo"
          onSearch={handleHeatNoSearch}
          onChange={(fieldName, value) =>
            handleChange(fieldName, value, setFormData)
          }
        />

        <Divider />

        <h3 className="font-semibold">Stage 1: Converter</h3>

        <div className="grid grid-cols-2 gap-8">
          <FormInputItem
            label="Turn Down Temp. (&deg;C)"
            name="turnDownTemp"
            onChange={(fieldName, value) =>
              handleChange(fieldName, value, setFormData)
            }
            // disabled={currentStage !== 1}
            disabled={isFieldDisabled(1)}
          />
          <FormDropdownItem
            label="Witnessed / Verified"
            name="turnDownTempWv"
            formField="turnDownTempWv"
            dropdownArray={wvDropDown}
            visibleField="value"
            valueField="key"
            onChange={(fieldName, value) =>
              handleChange(fieldName, value, setFormData)
            }
            disabled
            // disabled={currentStage !== 1}
            // disabled={isFieldDisabled(1)}
          />
        </div>

        <Divider />
        <h3 className="font-semibold">Stage 2: Degassing</h3>
        <div className="grid grid-cols-2 gap-x-4">
          <FormInputItem
            label="Degassing Vacuum(m bar)"
            name="degassingVacuum"
            placeholder="2.5"
            rules={degVacRule}
            onChange={handleDegVacChange}
            disabled={isFieldDisabled(2)}
          />
          <FormDropdownItem
            label=""
            name="degassingVacuumWv"
            className="mt-14 sm:mt-8"
            formField="degassingVacuumWv"
            dropdownArray={wvDropDown}
            visibleField="value"
            valueField="key"
            onChange={(fieldName, value) =>
              handleChange(fieldName, value, setFormData)
            }
            disabled={isFieldDisabled(2)}
          />
          <FormInputItem
            label="Degassing Duration(min)"
            name="degassingDuration"
            placeholder="10.0"
            rules={degDurRule}
            onChange={handleDegDurChange}
            disabled={isFieldDisabled(2)}
          />
          <FormDropdownItem
            label=""
            name="degassingDurationWv"
            className="mt-14 sm:mt-8"
            formField="degassingDurationWv"
            dropdownArray={wvDropDown}
            visibleField="value"
            valueField="key"
            onChange={(fieldName, value) =>
              handleChange(fieldName, value, setFormData)
            }
            disabled={isFieldDisabled(2)}
          />
        </div>

        <Divider />

        <h3 className="font-semibold">Stage 3: Casting</h3>
        <div className="grid grid-cols-2 gap-x-4">
          <FormInputItem
            label="1st Casting Temp (&deg;C)"
            name="castingTempOne"
            onChange={handleCastTempChange}
            rules={castTempRule}
            disabled={isFieldDisabled(3)}
          />
          <FormInputItem
            label="2nd Casting Temp(&deg;C)"
            name="castingTempTwo"
            onChange={handleCastTempChange}
            rules={castTempRule}
            disabled={isFieldDisabled(3)}
          />
          {/* <FormInputItem
            label="Caster Number "
            name="casterNo"
            onChange={(fieldName, value) =>
              handleChange(fieldName, value, setFormData)
            }
            disabled={isFieldDisabled(3)}
          /> */}

          <FormDropdownItem
            label="Caster Number"
            name="casterNo"
            formField="casterNo"
            dropdownArray={
              sms === "SMS 2" ? casterNoDropDownSms2 : casterNoDropDownSms3
            }
            visibleField="value"
            valueField="key"
            onChange={(fieldName, value) =>
              handleChange(fieldName, value, setFormData)
            }
            disabled={isFieldDisabled(3)}
          />
          <FormInputItem
            label="Sequence Number "
            name="sequenceNo"
            onChange={(fieldName, value) =>
              handleChange(fieldName, value, setFormData)
            }
            disabled={isFieldDisabled(3)}
          />
          <FormInputItem
            label="Hydris"
            name="hydris"
            rules={hydrisRuleObj}
            onChange={handleHydrisChange}
            disabled={isFieldDisabled(3)}
          />
        </div>

        <Divider />

        <Checkbox
          checked={formData.isProbeDipped}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              isProbeDipped: e.target.checked,
            }))
          }
        >
          Is probe dipped below 300mm from slag - metal surface
        </Checkbox>
        <Checkbox
          checked={formData.isHydrogenBw80And100}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              isHydrogenBw80And100: e.target.checked,
            }))
          }
        >
          Is measurement of hydrogen between 80-100m of Casting
        </Checkbox>

        <Divider />
        <h3 className="font-semibold">Stage 4: Chemical Analysis</h3>
        <div className="grid grid-cols-2 gap-x-4">
          <FormInputItem
            label="Nitrogen (ppm)"
            name="nitrogen"
            rules={nitrogenRule}
            onChange={handleNitrogenChange}
            disabled={isFieldDisabled(4)}
          />
          <FormInputItem
            label="Oxygen (ppm)"
            name="oxygen"
            rules={oxygenRule}
            onChange={handleOxygenChange}
            disabled={isFieldDisabled(4)}
          />

          <FormDropdownItem
            label="Ladle Chemistry"
            name="sentToLadle"
            formField="sentToLadle"
            dropdownArray={ladleChemDropDown}
            visibleField="value"
            valueField="key"
            onChange={handleChemChange}
            disabled={isFieldDisabled(4)}
          />

          {showLabCheckbox && (
            <div className="flex flex-col">
              <Checkbox className="">Chemical</Checkbox>
              <Checkbox className="">Nitrogen</Checkbox>
              <Checkbox className="">Oxygen</Checkbox>
            </div>
          )}
        </div>

        <Divider />

        <h3 className="font-semibold">Stage 5: Bloom Details</h3>
        <div className="border grid grid-cols-5 divide-x divide-y divide-gray-300">
          <div></div>
          <h3 className="p-2">Number</h3>
          <h3 className="p-2">Length</h3>
          <h3 className="p-2">Tot. Len.</h3>
          <h3 className="p-2">Weight</h3>

          <h3 className="text-center p-2">Prime</h3>
          <FormInputItem
            className="no-border"
            name="noOfPrimeBlooms"
            onChange={handlePrimeBloomDtlChange}
            disabled={
              isFieldDisabled(5) || primeBloomsFieldState.noOfPrimeBlooms
            }
          />
          <FormInputItem
            className="no-border"
            name="primeBloomsLength"
            onChange={handlePrimeBloomDtlChange}
            disabled={
              isFieldDisabled(5) || primeBloomsFieldState.primeBloomsLength
            }
          />
          <FormInputItem
            className="no-border"
            name="primeBloomsTotalLength"
            onChange={handlePrimeBloomDtlChange}
            disabled={
              isFieldDisabled(5) || primeBloomsFieldState.primeBloomsTotalLength
            }
          />
          <FormInputItem
            className="no-border"
            name="weightOfPrimeBlooms"
            disabled
          />

          <h3 className="text-center p-2">CO</h3>
          <FormInputItem
            className="no-border"
            name="noOfCoBlooms"
            onChange={handleCoBloomDtlChange}
            disabled={isFieldDisabled(5) || coBloomsFieldState.noOfCoBlooms}
          />
          <FormInputItem
            className="no-border"
            name="coBloomsLength"
            onChange={handleCoBloomDtlChange}
            disabled={isFieldDisabled(5) || coBloomsFieldState.coBloomsLength}
          />
          <FormInputItem
            className="no-border"
            name="coBloomsTotalLength"
            onChange={handleCoBloomDtlChange}
            disabled={
              isFieldDisabled(5) || coBloomsFieldState.coBloomsTotalLength
            }
          />
          <FormInputItem
            className="no-border"
            name="weightOfCoBlooms"
            disabled
          />

          <h3 className="text-center p-2">Rejected</h3>
          <FormInputItem
            className="no-border"
            name="noOfRejectedBlooms"
            onChange={handleRejectedBloomDtlChange}
            disabled={
              isFieldDisabled(5) || rejectedBloomsFieldState.noOfRejectedBlooms
            }
          />
          <FormInputItem
            className="no-border"
            name="rejectedBloomsLength"
            onChange={handleRejectedBloomDtlChange}
            disabled={
              isFieldDisabled(5) ||
              rejectedBloomsFieldState.rejectedBloomsLength
            }
          />
          <FormInputItem
            className="no-border"
            name="rejectedBloomsTotalLength"
            onChange={handleRejectedBloomDtlChange}
            disabled={
              isFieldDisabled(5) ||
              rejectedBloomsFieldState.rejectedBloomsTotalLength
            }
          />
          <FormInputItem
            className="no-border"
            name="weightOfRejectedBlooms"
            disabled
          />

          <h3 className="text-center p-2 col-span-4">Total Cast Weight</h3>
          <FormInputItem className="no-border" name="totalCastWt" disabled />
        </div>

        <Checkbox
          className="my-4"
          checked={formData.isDiverted}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              isDiverted: e.target.checked,
              heatRemark: e.target.checked ? "Diverted" : null,
            }))
          }
        >
          Mark as diverted heat.
        </Checkbox>

        <FormInputItem
          name="heatRemark"
          placeholder="Heat Remark"
          disabled={heatRemarkDisabled}
          onChange={(name, value) => handleChange(name, value, setFormData)}
        />
        <Btn htmlType="submit" className="flex mx-auto">
          {" "}
          Save{" "}
        </Btn>
      </Form>
    </FormContainer>
  );
};

export default HeatDtl;