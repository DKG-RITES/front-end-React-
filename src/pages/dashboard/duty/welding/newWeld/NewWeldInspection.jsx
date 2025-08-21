import React, { useEffect, useState } from "react";
import SubHeader from "../../../../../components/DKG_SubHeader";
import FormContainer from "../../../../../components/DKG_FormContainer";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import data from "../../../../../utils/frontSharedData/weldingInspection/WeldingInspection.json";
import FormBody from "../../../../../components/DKG_FormBody";
import { Divider, Form, Table, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import FormInputItem from "../../../../../components/DKG_FormInputItem";
import FormInputNumberItem from "../../../../../components/DKG_FormInputNumberItem";
import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";
import Btn from "../../../../../components/DKG_Btn";
import { useSelector } from "react-redux";
import { apiCall } from "../../../../../utils/CommonFunctions";
import FormSearchItem from "../../../../../components/DKG_FormSearchItem";

const {
  weldParameterDropdownList,
  reasonDimensionDropdownList,
  reasonUSFDDropdownList,
  resultDropdownList,
  weldResultList,
  reasonForNotOkList,
  panelLengthDropdownList,
  panelDecisionDropdownList,
} = data;

const NewWeldInspection = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("LOCACTIO: ", location);

  const { state } = location;
  const id = state?.id || null;
  const weldingGeneralInfo = useSelector((state) => state.weldingDuty);
  const isPanelIdRequired = weldingGeneralInfo.mill !== "RSM";

  const [info, setInfo] = useState([
    {
      key: "1",
      end: "Front",
    },
    {
      key: "2",
      end: "Back",
    },
  ]);

  // const [formData, setFormData] = useState({
  //   panelID: "",
  //   weldParameter: "",
  //   visual: "",
  //   marking: "",
  //   dimension: "",
  //   reasonDimension: "",
  //   reasonUSFD: "",
  //   weldOperator: "",
  //   usfdOperator: "",
  //   result: "",
  //   remarks: "",
  //   railID: "",
  //   weldResult: "",
  //   reasonForNotOk: "",
  //   panelRemarks: "",
  // });

  const [formData, setFormData] = useState({
    // WeldingInspectionDto fields
    panelId: null,
    noOfJoints: null,
    panelLength: null,
    panelDecision: null,
    panelRemark: null,
    frontResult: null,
    frontResultDesc: null,
    backResult: null,
    backResultDesc: null,
    frontResultReasonForNotOk: null,
    backResultReasonForNotOk: null,
    frontRemark: null,
    backRemark: null,

    // WeldingInspectionDetailDto list
    weldList: [
      // {
      //   jointNumber: null,
      //   inspectionMasterId: null,
      //   weldParameter: null,
      //   weldParameterDesc: null,
      //   visual: null,
      //   visualDesc: null,
      //   marking: null,
      //   markingDesc: null,
      //   dimension: null,
      //   dimensionDesc:
      //   dimensionDetail: null,
      //   usfd: null,
      // usfdDesc: null
      //   usfdDetail: null,
      //   weldOperator: null,
      //   usfdOperator: null,
      //   result: null,
      //   railId1: null,
      //   railId2: null,
      //   railId1Length: null,
      //   railId2Length: null,
      //   remark: null,
      // },
    ],
  });

  const { token } = useSelector((state) => state.auth);

  // const handleFormSubmit = async () => {
  //   try {
  //     await apiCall("POST", "welding/saveWeldInspection", token, {
  //       ...formData,
  //       dutyId: weldingGeneralInfo.dutyId,
  //     });
  //     message.success("Data saved successfully.");
  //     navigate("/welding/home");
  //   } catch (error) {}
  // };

  // const updateData = async () => {
  //   console.log("Update data called")
  //   try {
  //     await apiCall("POST", "/welding/updateWeldInspection", token, {
  //       ...formData,
  //       dutyId: weldingGeneralInfo.dutyId,
  //       // id: formData.inspectionMasterId
  //     });
  //     message.success("Data updated successfully.");
  //     navigate("/welding/home");
  //   } catch (error) {}
  // };

  const handleFormSubmit = async () => {
    try {
      const adjustedNoOfJoints = calculateAdjustedJoints();
      await apiCall(
        "POST",
        location?.state?.edit ? "/welding/updateWeldInspection" : "welding/saveWeldInspection",
        token,
        {
          ...formData,
          dutyId: weldingGeneralInfo.dutyId,
          noOfJoints: adjustedNoOfJoints,
        }
      );
      message.success("Data saved successfully.");
      navigate("/welding/home");
    } catch (error) {}
  };

  const updateData = async () => {
    console.log("Update data called");
    try {
      const adjustedNoOfJoints = calculateAdjustedJoints();
      await apiCall("POST", "/welding/updateWeldInspection", token, {
        ...formData,
        dutyId: weldingGeneralInfo.dutyId,
        noOfJoints: adjustedNoOfJoints,
      });
      message.success("Data updated successfully.");
      navigate("/welding/home");
    } catch (error) {}
  };

  const calculateAdjustedJoints = () => {
    const totalJoints = formData.noOfJoints || 0;
    const cutAndReweldCount =
      formData.weldList?.filter((weld) => weld.result === "Cut & Reweld")
        .length || 0;
    return totalJoints - cutAndReweldCount;
  };

  const handleChange = (fieldName, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev };
      updatedData[fieldName] = value;
      if (
  fieldName === "frontResultDesc" ||
  fieldName === "backResultDesc"
) {
  const keyWithoutDesc = fieldName.replace("Desc", "");
  updatedData[keyWithoutDesc] = value;
}

      return updatedData;
      // return {
      //   ...prev,
      //   [fieldName]: value,
      // };
    });
  };

  console.log("FORMDTA: ", formData);

  const handleSelectChange = (value, key) => {
    const updatedData = info.map((row) => {
      if (row.key === key) {
        return {
          ...row,
          weldResult: value,
          reasonForNotOk: value,
          remarks: value,
        };
      }
      return row;
    });
    setInfo(updatedData);
  };

  const weldTableColumns = [
    {
      title: "End",
      dataIndex: "end",
      key: "end",
      align: "center",
      fixed: "left",
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      align: "center",
      render: (text, record) => (
        <FormDropdownItem
          name="weldResult"
          value={formData.weldResult}
          onChange={handleSelectChange}
          dropdownArray={weldResultList}
          valueField="key"
          visibleField="value"
          required
        />
      ),
    },
    {
      title: "Reason for Not OK",
      dataIndex: "reasonForNotOk",
      key: "reasonForNotOk",
      align: "center",
      render: (text, record) => (
        <FormDropdownItem
          name="reasonForNotOk"
          value={formData.reasonForNotOk}
          onChange={handleSelectChange}
          dropdownArray={reasonForNotOkList}
          valueField="key"
          visibleField="value"
          required
        />
      ),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      align: "center",
      fixed: "right",
      render: (text, record) => (
        <FormInputItem
          placeholder="Remarks"
          name="remarks"
          value={formData.remarks}
          required
        />
      ),
    },
  ];

  const handleNoOfJointsChange = (_, value) => {
    let weldList = formData.weldList;
    if(value < formData.weldList.length){
      weldList = formData.weldList.slice(0, value);
    }
    else {
      for (let i = formData.weldList.length; i < value; i++){
        weldList.push({})
      }
    }

    setFormData(prev => ({...prev, noOfJoints: value, weldList: weldList}))
    return
    setFormData((prev) => {
      const updatedWeldList = prev.weldList || [];
      for (let i = 0; i < value; i++) {
        let obj = {
          jointNumber: null,
          inspectionMasterId: null,
          weldParameter: null,
          weldParameterDesc: null,
          visual: null,
          visualDesc: null,
          marking: null,
          markingDesc: null,
          dimension: null,
          dimensionDesc: null,
          dimensionDetail: null,
          usfd: null,
          usfdDetail: null,
          weldOperator: null,
          usfdOperator: null,
          result: null,
          railId1: null,
          railId2: null,
          railId1Length: null,
          railId2Length: null,
          remark: null,
        };

        updatedWeldList.push(obj);
      }

      return {
        ...prev,
        noOfJoints: value,
        weldList: updatedWeldList,
      };
    });
  };

  const getDesc = (value) => (value ? "OK" : "NOT OK");

  const populatedData = async () => {
    try {
      const { data } = await apiCall(
        "GET",
        `/welding/getWeldingDtl?id=${id}`,
        token
      );

      if (data.responseData) {
        setFormData({
          ...data.responseData,
          frontResultDesc: getDesc(data.responseData.frontResult),
          backResultDesc: getDesc(data.responseData.backResult),

          weldList: data.responseData.weldList.map((record) => ({
            ...record,
            weldParameterDesc: getDesc(record.weldParameter),
            visualDesc: getDesc(record.visual),
            markingDesc: getDesc(record.marking),
            dimensionDesc: getDesc(record.dimension),
            usfdDesc: getDesc(record.usfd),
          })),
        });
      }
    } catch (error) {}
  };

  const populateForEdit = (record) => {
    setFormData({
      id: record.inspectionMasterId,
      panelId: record.panelId,
      noOfJoints: record.noOfJoints,
      panelDecision: record.panelDecision,
      panelRemark: record.panelRemark,
      panelLength: record.panelLength,
      frontRemark: record.frontRemark,
      backRemark: record.backRemark,
      frontResult: record.frontResult,
      backResult: record.backResult,
      frontResultDesc: record.frontResult,
      backResultDesc: record.backResult,
      frontResultReasonForNotOk: record.frontRemarkForNotOk,
      backResultReasonForNotOk: record.backRemarkForNotOk,
      weldList: record?.details?.map(item => (
        {
          jointNo: item.jointNo,
          weldParameter: item.weldParameter,
          weldParameterDesc: item.weldParameter ? "OK" : "Not OK",
          visual: item.visual,
          visualDesc: item.visual ? "OK" : "Not OK",
          marking: item.marking,
          markingDesc: item.marking ? "OK" : "Not OK",
          dimension: item.dimension,
          dimensionDesc: item.dimension ? "OK" : "Not OK",
          usfd: item.usfd,
          usfdDesc: item.usfd ? "OK" : "Not OK",
          usfdOperator: item.usfdOperator,
          weldOperator: item.weldOperator,
          result: item.result,
          remark: item.remark,
          railId1: item.railId1,
          railId2: item.railId2,
          railId1Length: item.railId1Length,
          railId2Length: item.railId2Length,
          dimensionDetail: item?.dimensionDetail,
          usfdDetail: item?.usfdDetail,
        }
      ))
    })
  }


  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  useEffect(() => {
    if (id) {
      populatedData();
    }
    else if(location?.state?.edit){
      populateForEdit(location?.state?.record)
    }
  }, [id]);

  console.log("Fromdata joins: ", formData);

  const getAcptLengthDtls = async (railId) => {
    try {
      const { data } = await apiCall(
        "GET",
        `/vi/getActOffLengthByRailId?railId=${railId}`,
        token
      );
      return data?.responseData?.length || 0;
    } catch (error) {}
  };

  const handleWeldListChange = async (fieldName, value, index) => {
    if (fieldName === "railId1" || fieldName === "railId2") {
      const length = await getAcptLengthDtls(value);

      setFormData((prev) => {
        const prevWeldList = prev.weldList || [];
        prevWeldList[index][fieldName] = value;
        prevWeldList[index][`${fieldName}Length`] = length;
        return {
          ...prev,
          weldList: prevWeldList,
        };
      });
      return;
    }
    setFormData((prev) => {
      const updatedWeldList = prev.weldList || [];
      updatedWeldList[index][fieldName] = value;

      if (
        fieldName === "weldParameter" ||
        fieldName === "visual" ||
        fieldName === "marking" ||
        fieldName === "dimension" ||
        fieldName === "usfd"
      ) {
        updatedWeldList[index][`${fieldName}Desc`] = getDesc(value);
      }

      return {
        ...prev,
        weldList: updatedWeldList,
      };
    });
  };

  const handleRailIdLengthSearch = async (name, index, value) => {
    try {
      const { data } = await apiCall(
        "GET",
        `/vi/getActOffLengthByRailId?railId=${value}`,
        token
      );
      console.log("Rail Id length: ", data?.responseData?.length);
    } catch (error) {}
  };

  return (
    <FormContainer>
      <SubHeader
        title={
          id ? "Update Weld Joint Inspection" : "New Weld Joint Inspection"
        }
        link={id ? "/welding/heldRejectedPanel" : "/welding/home"}
      />
      <GeneralInfo data={weldingGeneralInfo} />

      <Form
        layout="vertical"
        form={form}
        initialValues={formData}
        onFinish={id ? updateData : handleFormSubmit}
      >
        <div className="grid grid-cols-2 gap-x-2">
          <FormInputItem
            label="Panel ID"
            name="panelId"
            onChange={handleChange}
            disabled={location?.state?.edit}
            required={isPanelIdRequired}
            readOnly={id ? true : false}
          />
          <FormInputItem
            label="Joints Count(inc. 'cult & reweld')"
            name="noOfJoints"
            className=""
            onChange={(name, value) => handleNoOfJointsChange(name, value)}
            required
            readOnly={id ? true : false}
          />
        </div>

        {formData.weldList?.map((item, index) => (
          <>
            <h3 className="text-lg font-semibold mb-2">Joint No.{index + 1}</h3>
            <div
              key={index}
              className="grid grid-cols-2 gap-x-2 md:gap-x-8 border p-4"
            >
              <FormInputItem
                label="Joint No."
                name={["weldList", index, "jointNo"]}
                disabled={location?.state?.edit}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                valueField="key"
                visibleField="value"
                required
                readOnly={id ? true : false}
              />
              <FormDropdownItem
                label="Weld Parameters"
                name={["weldList", index, "weldParameterDesc"]}
                formField="weldParameter"
                dropdownArray={weldParameterDropdownList}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                valueField="key"
                visibleField="value"
                required
              />

              <FormDropdownItem
                label="Visual"
                name={["weldList", index, "visualDesc"]}
                formField="visual"
                dropdownArray={weldParameterDropdownList}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                valueField="key"
                visibleField="value"
              />
              <FormDropdownItem
                label="Marking"
                name={["weldList", index, "markingDesc"]}
                formField="marking"
                dropdownArray={weldParameterDropdownList}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                valueField="key"
                visibleField="value"
              />

              <FormDropdownItem
                label="Dimension"
                name={["weldList", index, "dimensionDesc"]}
                formField="dimension"
                dropdownArray={weldParameterDropdownList}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                valueField="key"
                visibleField="value"
              />
              {}
              {item.dimension ? (
                <div></div>
              ) : (
                <FormDropdownItem
                  label="Reason of Dim. NOT OK"
                  name={["weldList", index, "dimensionDetail"]}
                  formField="dimensionDetail"
                  dropdownArray={reasonDimensionDropdownList}
                  onChange={(name, value) =>
                    handleWeldListChange(name, value, index)
                  }
                  valueField="key"
                  visibleField="value"
                />
              )}

              <FormDropdownItem
                label="USFD"
                name={["weldList", index, "usfdDesc"]}
                formField="usfd"
                dropdownArray={weldParameterDropdownList}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                valueField="key"
                visibleField="value"
              />
              {item.usfd ? (
                <div></div>
              ) : (
                <FormDropdownItem
                  label="Reason of USFD for Not OK"
                  name={["weldList", index, "usfdDetail"]}
                  formField="usfdDetail"
                  dropdownArray={reasonUSFDDropdownList}
                  onChange={(name, value) =>
                    handleWeldListChange(name, value, index)
                  }
                  valueField="key"
                  visibleField="value"
                />
              )}

              <FormInputItem
                label="Weld Operator"
                name={["weldList", index, "weldOperator"]}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                valueField="key"
                visibleField="value"
              />
              <FormInputItem
                label="USFD Operator"
                name={["weldList", index, "usfdOperator"]}
                value={formData.usfdOperator}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                valueField="key"
                visibleField="value"
              />

              <FormDropdownItem
                label="Result"
                name={["weldList", index, "result"]}
                formField="result"
                dropdownArray={resultDropdownList}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                valueField="key"
                visibleField="value"
              />
              <FormInputItem
                label="Remarks"
                name={["weldList", index, "remark"]}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                valueField="key"
                visibleField="value"
              />
              <Divider className="col-span-2" />

              <FormInputItem
                label="Rail ID 1"
                name={["weldList", index, "railId1"]}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                // onSearch={(value) => handleRailIdLengthSearch("railId1", index, value)}
                required
              />
              <FormInputItem
                label="Rail ID 1 Length"
                name={["weldList", index, "railId1Length"]}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                // disabled
                required
              />
              {/* <FormInputItem
                label="Rail ID 2"
                name={["weldList", index, "railId2"]}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                required
              /> */}

              <FormInputItem
                label="Rail ID 2"
                name={["weldList", index, "railId2"]}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                // onSearch={(value) => handleRailIdLengthSearch("railId2", index, value)}
                required
              />
              <FormInputItem
                label="Rail ID 2 Length"
                name={["weldList", index, "railId2Length"]}
                onChange={(name, value) =>
                  handleWeldListChange(name, value, index)
                }
                // disabled
                required
              />
            </div>
            <Divider className="mt-10 mb-10" />
          </>
        ))}

        <div className="border grid grid-cols-4 divide-x divide-y divide-gray-300">
          <div className="p-2 text-center font-semibold">End</div>
          <div className="p-2 text-center font-semibold">Result</div>
          <div className="p-2 text-center font-semibold">Reason for NOT OK</div>
          <div className="p-2 text-center font-semibold">Remark</div>

          <div className="text-center">Front</div>
          <FormDropdownItem
            name="frontResultDesc"
            formField="frontResultDesc"
            dropdownArray={weldResultList}
            onChange={handleChange}
            visibleField="value"
            valueField="key"
            className="no-border"
          />
          <FormDropdownItem
            name="frontResultReasonForNotOk"
            formField="frontResultReasonForNotOk"
            dropdownArray={reasonForNotOkList}
            onChange={handleChange}
            visibleField="value"
            valueField="key"
            className="no-border"
            disabled={formData.frontResultDesc == "OK"}
          />
          <FormInputItem
            name="frontRemark"
            onChange={handleChange}
            className="no-border"
          />

          <div className="text-center">Back</div>
          <FormDropdownItem
            name="backResultDesc"
            formField="backResultDesc"
            dropdownArray={weldResultList}
            onChange={handleChange}
            visibleField="value"
            valueField="key"
            className="no-border"
          />
          <FormDropdownItem
            name="backResultReasonForNotOk"
            formField="backResultReasonForNotOk"
            dropdownArray={reasonForNotOkList}
            onChange={handleChange}
            visibleField="value"
            valueField="key"
            className="no-border"
            disabled={formData.backResultDesc == "OK"}
          />
          <FormInputItem
            name="backRemark"
            onChange={handleChange}
            className="no-border"
          />
        </div>

        <Divider />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2">
          <FormDropdownItem
            label="Panel Length (m)"
            name="panelLength"
            formField="panelLength"
            dropdownArray={panelLengthDropdownList}
            onChange={handleChange}
            valueField="key"
            visibleField="value"
            required
          />
          <FormDropdownItem
            label="Panel Decision"
            name="panelDecision"
            formField="panelDecision"
            dropdownArray={panelDecisionDropdownList}
            onChange={handleChange}
            valueField="key"
            visibleField="value"
            required
          />
        </div>

        <FormInputItem
          label="Panel Remarks"
          name="panelRemark"
          onChange={handleChange}
          valueField="key"
          visibleField="value"
          required
        />

        <div className="flex justify-center mt-8">
          <Btn htmlType="submit" className="w-[25%]">
            {
              location?.state?.edit ? "UPDATE" : "SAVE"
            }
          </Btn>
        </div>
      </Form>
    </FormContainer>
  );
};

export default NewWeldInspection;
