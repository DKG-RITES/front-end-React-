import React, { useEffect, useState } from "react";
import FormContainer from "../../../../../components/DKG_FormContainer";
import { Divider, Form, message } from "antd";
import { useSelector } from "react-redux";
import SubHeader from "../../../../../components/DKG_SubHeader";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import FormInputItem from "../../../../../components/DKG_FormInputItem";
import IconBtn from "../../../../../components/DKG_IconBtn";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";
import Btn from "../../../../../components/DKG_Btn";
import { apiCall } from "../../../../../utils/CommonFunctions";

const satUnsatDropdown = [
  {
    key: true,
    value: "Satisfactory",
  },
  {
    key: false,
    value: "Unsatisfactory",
  },
];

const FinishingVerification = () => {
  const [form] = Form.useForm();

  const rollingGeneralInfo = useSelector((state) => state.rollingDuty);
  const { mill } = rollingGeneralInfo;
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    hotStampingList: [
      {
        heatNo: null,
        branding: null,
      },
    ],
    preCamberingList: [
      {
        heatNo: null,
        isSatisfactory: null,
        isSatisfactoryDesc: null,
      },
    ],

    straightnessRemarks: null,
    remarks: null,

    smR1Hrsm: null,
    smR4Hrsm: null,
    smR6Hrsm: null,
    smR8Hrsm: null,
    smR1Vrsm: null,
    smR4Vrsm: null,
    smR6Vrsm: null,
    smR8Vrsm: null,
    smIsSatisfactory: null,
    smIsSatisfactoryDesc: null,

    smSrR1Hrsm: null,
    smSrR2Hrsm: null,
    smSrR3Hrsm: null,
    smSrR4Hrsm: null,
    smSrR1Vrsm: null,
    smSrR2Vrsm: null,
    smSrR3Vrsm: null,
    smSrR4Vrsm: null,
    smSrIsSatisfactory: null,
    smSrIsSatisfactoryDesc: null,

    smLrR1Hrsm: null,
    smLrR2Hrsm: null,
    smLrR3Hrsm: null,
    smLrR4Hrsm: null,
    smLrR1Vrsm: null,
    smLrR2Vrsm: null,
    smLrR3Vrsm: null,
    smLrR4Vrsm: null,
    smLrIsSatisfactory: null,
    smLrIsSatisfactoryDesc: null,
  });

  const addHotStamping = () => {
    setFormData((prev) => {
      const hotStampingListUpdated = [
        ...prev.hotStampingList,
        {
          heatNo: null,
          branding: null,
        },
      ];

      return {
        ...prev,
        hotStampingList: hotStampingListUpdated,
      };
    });
  };

  const deleteHotStamping = (index) => {
    setFormData((prev) => {
      const hotStampingListUpdated = prev.hotStampingList;
      hotStampingListUpdated.splice(index, 1);

      return {
        ...prev,
        hotStampingList: hotStampingListUpdated,
      };
    });
  };

  const addPreCambering = () => {
    setFormData((prev) => {
      const preCamberingListUpdated = [
        ...prev.preCamberingList,
        {
          heatNo: null,
          isSatisfactory: null,
          isSatisfactoryDesc: null,
        },
      ];

      return {
        ...prev,
        preCamberingList: preCamberingListUpdated,
      };
    });
  };

  const deletePreCambering = (index) => {
    setFormData((prev) => {
      const preCamberingListUpdated = prev.preCamberingList;
      preCamberingListUpdated.splice(index, 1);
      return {
        ...prev,
        preCamberingList: preCamberingListUpdated,
      };
    });
  };

  const handleChange = (fieldName, value) => {
    setFormData((prev) => {
      if (
        fieldName === "smIsSatisfactory" ||
        fieldName === "smSrIsSatisfactory" ||
        fieldName === "smLrIsSatisfactory"
      ) {
        const isSatisfactoryDesc =
          value === true ? "Satisfactory" : "Unsatisfactory";
        return {
          ...prev,
          [fieldName]: value,
          [fieldName + "Desc"]: isSatisfactoryDesc,
        };
      }
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  const handlePreCamberingDtlChange = (fieldName, value, index) => {
    console.log("fieldname, index, value: ", fieldName, index, value);
    setFormData((prev) => {
      const preCamberingListUpdated = prev.preCamberingList;
      console.log(": ", preCamberingListUpdated);
      preCamberingListUpdated[index][fieldName] = value;

      if (fieldName === "isSatisfactory") {
        preCamberingListUpdated[index]["isSatisfactoryDesc"] =
          value === true ? "Satisfactory" : "Unsatisfactory";
      }
      return {
        ...prev,
        preCamberingList: preCamberingListUpdated,
      };
    });
  };

  const handleHotStampingDtlChange = (fieldName, value, index) => {
    setFormData((prev) => {
      const hotStampingListUpdated = prev.hotStampingList;
      hotStampingListUpdated[index][fieldName] = value;
      return {
        ...prev,
        hotStampingList: hotStampingListUpdated,
      };
    });
  };

  const onFinish = async () => {
    const payload = {...formData}

    const hotStampingList = payload.hotStampingList || [];
    const preCamberingList = payload.preCamberingList || [];

    const hotStampingListUpdated = hotStampingList.filter((record) => {
      return record.heatNo && record.heatNo.trim() !== '';
    });

    const preCamberingListUpdated = preCamberingList.filter((record) => {
      return record.heatNo && record.heatNo.trim() !== '';
    });

    payload.hotStampingList = hotStampingListUpdated;
    payload.preCamberingList = preCamberingListUpdated;

    try {
      await apiCall("POST", "/rolling/finishingVerification/save", token, {
        ...payload,
        dutyId: rollingGeneralInfo.dutyId,
      });
      message.success("Data saved successfully.");
    } catch (error) {
      message.error("Failed to save data.");
    }
  };

  // Section save handlers
  const saveHotStamping = async () => {
    const hotStampingList = formData.hotStampingList || [];
    const hotStampingListFiltered = hotStampingList.filter((record) => {
      return record.heatNo && record.heatNo.trim() !== '';
    });

    if (hotStampingListFiltered.length === 0) {
      message.warning("Please add at least one Hot Stamping entry with Heat Number.");
      return;
    }

    // Always send both arrays to prevent null pointer exceptions on backend
    const preCamberingList = formData.preCamberingList || [];
    const preCamberingListFiltered = preCamberingList.filter((record) => {
      return record.heatNo && record.heatNo.trim() !== '';
    });

    try {
      await apiCall("POST", "/rolling/finishingVerification/save", token, {
        dutyId: rollingGeneralInfo.dutyId,
        hotStampingList: hotStampingListFiltered,
        preCamberingList: preCamberingListFiltered, // Always send as array (empty if no data)
      });
      message.success("Hot Stamping data saved.");
    } catch (error) {
      message.error("Failed to save Hot Stamping data.");
    }
  };

  const savePreCambering = async () => {
    const preCamberingList = formData.preCamberingList || [];
    const preCamberingListFiltered = preCamberingList.filter((record) => {
      return record.heatNo && record.heatNo.trim() !== '';
    });

    if (preCamberingListFiltered.length === 0) {
      message.warning("Please add at least one Pre-Cambering entry with Heat Number.");
      return;
    }

    // Always send both arrays to prevent null pointer exceptions on backend
    const hotStampingList = formData.hotStampingList || [];
    const hotStampingListFiltered = hotStampingList.filter((record) => {
      return record.heatNo && record.heatNo.trim() !== '';
    });

    try {
      await apiCall("POST", "/rolling/finishingVerification/save", token, {
        dutyId: rollingGeneralInfo.dutyId,
        hotStampingList: hotStampingListFiltered, // Always send as array (empty if no data)
        preCamberingList: preCamberingListFiltered,
      });
      message.success("Pre-Cambering data saved.");
    } catch (error) {
      message.error("Failed to save Pre-Cambering data.");
    }
  };

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  return (
    <FormContainer>
      <SubHeader
        title={`Rail Finishing Verification - ${mill}`}
        link="/stage/home"
      />

      <GeneralInfo data={rollingGeneralInfo} />

      <Divider className="m-0" />

      <Form
        form={form}
        layout="vertical"
        initialValues={formData}
        onFinish={onFinish}
      >
        <div className="relative">
          <h3 className="font-semibold !text-xl mb-2">
            Hot Stamping of Rails / Cooling Bed
          </h3>
          <h4 className="font-semibold !text-md mb-2">(Visual Branding)</h4>
          {formData.hotStampingList?.map((record, index) => (
            <div className="relative grid grid-cols-2 gap-x-4 border p-4 pb-0" key={index}>
              <FormInputItem
                name={["hotStampingList", index, "heatNo"]}
                placeholder="Heat Number"
                onChange={(name, value) =>
                  handleHotStampingDtlChange(name, value, index)
                }
              />
              <FormInputItem
                name={["hotStampingList", index, "branding"]}
                placeholder="Branding"
                onChange={(name, value) =>
                  handleHotStampingDtlChange(name, value, index)
                }
              />
              <IconBtn
                icon={DeleteOutlined}
                className="shadow-none absolute right-0"
                onClick={() => deleteHotStamping(index)}
              />
            </div>
          ))}

          <IconBtn
            icon={PlusOutlined}
            text="add"
            className="absolute right-0 bottom--2"
            onClick={addHotStamping}
          />
          {formData.hotStampingList && formData.hotStampingList.length > 0 && (
            <Btn className="mt-2" onClick={saveHotStamping} type="button">
              Save Hot Stampings
            </Btn>
          )}
        </div>

        <div className="relative">
          <h3 className="font-semibold !text-xl mb-2 mt-6">
            Pre-Cambering of Long Rail
          </h3>
          <h4 className="font-semibold !text-md mb-2">(Branding)</h4>
          {formData.preCamberingList?.map((record, index) => (
            <div className="relative grid grid-cols-2 gap-x-4 border p-4 pb-0" key={index}>
              <FormInputItem
                name={["preCamberingList", index, "heatNo"]}
                placeholder="Heat Number"
                onChange={(fName, value) =>
                  handlePreCamberingDtlChange(fName, value, index)
                }
              />

              <FormDropdownItem
                placeholder="satisfactory / unsatisfactory"
                formField="isSatisfactory"
                name={["preCamberingList", index, "isSatisfactoryDesc"]}
                dropdownArray={satUnsatDropdown}
                visibleField="value"
                valueField="key"
                required
                onChange={(fName, value) =>
                  handlePreCamberingDtlChange(fName, value, index)
                }
              />

              <IconBtn
                icon={DeleteOutlined}
                className="shadow-none absolute right-0"
                onClick={() => deletePreCambering(index)}
              />
            </div>
          ))}

          <IconBtn
            icon={PlusOutlined}
            text="add"
            className="absolute right-0 bottom--2"
            onClick={addPreCambering}
          />
          {formData.preCamberingList && formData.preCamberingList.length > 0 && (
            <Btn className="mt-2" onClick={savePreCambering} type="button">
              Save Pre-Camberings
            </Btn>
          )}
        </div>

        {/* DO NOT REMOVE: Straightening Machine Table */}
        <Divider className="mb-3 mt-10" />
        {mill === "URM" && (
          <>
            <h3 className="font-semibold !text-xl mb-2">
              Straightening Machine
            </h3>
            <h4 className="font-semibold !text-md mb-2">(Pressure Triangle / Roll Deflection)</h4>
            <div className="border grid grid-cols-5 divide-x divide-y divide-gray-300 mb-4">
              <div className="p-2">Rolls</div>
              <div className="p-2">R1</div>
              <div className="p-2">R4</div>
              <div className="p-2">R6</div>
              <div className="p-2">R8</div>

              <div className="p-2">HRSM</div>
              <FormInputItem
                className="no-border"
                name="smR1Hrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smR4Hrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smR6Hrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smR8Hrsm"
                onChange={handleChange}
              />

              <div className="p-2">VRSM</div>
              <FormInputItem
                className="no-border"
                name="smR1Vrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smR4Vrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smR6Vrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smR8Vrsm"
                onChange={handleChange}
              />

              <FormDropdownItem
                className="no-border col-span-5"
                placeholder="satisfactory / unsatisfactory"
                formField="smIsSatisfactory"
                name="smIsSatisfactoryDesc"
                dropdownArray={satUnsatDropdown}
                visibleField="value"
                valueField="key"
                required
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {mill === "RSM" && (
          <>
            <h3 className="font-semibold !text-xl mb-2">
            Straightening Machine - SR
            </h3>
            <h4 className="font-semibold !text-md mb-2">(Pressure Triangle / Roll Deflection)</h4>
            <div className="border grid grid-cols-5 divide-x divide-y divide-gray-300 mb-4">
              <div className="p-2">Rolls</div>
              <div className="p-2">R1</div>
              <div className="p-2">R2</div>
              <div className="p-2">R3</div>
              <div className="p-2">R4</div>

              <div className="p-2">HRSM</div>
              <FormInputItem
                className="no-border"
                name="smSrR1Hrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smSrR2Hrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smSrR3Hrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smSrR4Hrsm"
                onChange={handleChange}
              />

              <div className="p-2">VRSM</div>
              <FormInputItem
                className="no-border"
                name="smSrR1Vrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smSrR2Vrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smSrR3Vrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smSrR4Vrsm"
                onChange={handleChange}
              />

              <FormDropdownItem
                className="no-border col-span-5"
                placeholder="satisfactory / unsatisfactory"
                formField="smSrIsSatisfactory"
                name="smSrIsSatisfactoryDesc"
                dropdownArray={satUnsatDropdown}
                visibleField="value"
                valueField="key"
                // required
                onChange={handleChange}
              />
            </div>
            <h3 className="font-semibold !text-xl mb-2">
              Straightening Machine - LR
            </h3>
            <h4 className="font-semibold !text-md mb-2">(Pressure Triangle / Roll Deflection)</h4>
            <div className="border grid grid-cols-5 divide-x divide-y divide-gray-300 mb-4">
              <div className="p-2">Rolls</div>
              <div className="p-2">R1</div>
              <div className="p-2">R2</div>
              <div className="p-2">R3</div>
              <div className="p-2">R4</div>

              <div className="p-2">HRSM</div>
              <FormInputItem
                className="no-border"
                name="smLrR1Hrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smLrR2Hrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smLrR3Hrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smLrR4Hrsm"
                onChange={handleChange}
              />

              <div className="p-2">VRSM</div>
              <FormInputItem
                className="no-border"
                name="smLrR1Vrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smLrR2Vrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smLrR3Vrsm"
                onChange={handleChange}
              />
              <FormInputItem
                className="no-border"
                name="smLrR4Vrsm"
                onChange={handleChange}
              />

              <FormDropdownItem
                className="no-border col-span-5"
                placeholder="satisfactory / unsatisfactory"
                formField="smLrIsSatisfactory"
                name="smLrIsSatisfactoryDesc"
                dropdownArray={satUnsatDropdown}
                visibleField="value"
                valueField="key"
                // required
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <FormInputItem
          label="Straightness Remarks(Straightness of Rails)"
          name="straightnessRemarks"
          required
          onChange={handleChange}
        />
        <FormInputItem
          label="Remarks"
          name="remarks"
          // required
          onChange={handleChange}
        />

        <Btn htmlType="submit" className="flex mx-auto">
          {" "}
          Save{" "}
        </Btn>
      </Form>
    </FormContainer>
  );
};

export default FinishingVerification;
