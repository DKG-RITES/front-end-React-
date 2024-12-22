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

  const { state } = location;
  const id = state?.id || null;
  const weldingGeneralInfo = useSelector((state) => state.weldingDuty);

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

  const handleFormSubmit = async () => {
    try {
      await apiCall("POST", "welding/saveWeldInspection", token, {
        ...formData,
        dutyId: weldingGeneralInfo.dutyId,
      });
      message.success("Data saved successfully.");
      navigate("/welding/home");
    } catch (error) {}
  };

  const handleChange = (fieldName, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev };
      updatedData[fieldName] = value;
      if (
        fieldName === "frontRemark" ||
        fieldName === "backRemark" ||
        fieldName === "frontResult" ||
        fieldName === "backResult"
      ) {
        updatedData[`${fieldName}Desc`] = value ? "OK" : "NOT OK";
      }

      return updatedData;
      // return {
      //   ...prev,
      //   [fieldName]: value,
      // };
    });
  };

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
    setFormData((prev) => {
      const updatedWeldList = [];
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

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  useEffect(() => {
    if (id) {
      populatedData();
    }
  }, [id]);

  console.log("Fromdata joins: ", formData);

  const handleWeldListChange = (fieldName, value, index) => {
    setFormData((prev) => {
      const updatedWeldList = prev.weldList || [];
      console.log("prev.weldList: ", prev.weldList);
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

  const updateData = async () => {
    console.log("Update data called")
    try {
      await apiCall("POST", "/welding/updateWeldInspection", token, {
        ...formData,
        dutyId: weldingGeneralInfo.dutyId,
        // id: formData.inspectionMasterId
      });
      message.success("Data updated successfully.");
      navigate("/welding/home");
    } catch (error) {}
  };

  return (
    <FormContainer>
      <SubHeader
        title={
          id ? "Update Weld Joint Inspection" : "New Weld Joint Inspection"
        }
        link= {id ? "/welding/heldRejectedPanel" : "/welding/home"}
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
            required
            readOnly={id ? true : false}
          />
          <FormInputItem
            label="No. of Joints"
            name="noOfJoints"
            onChange={(name, value) => handleNoOfJointsChange(name, value)}
            required
            readOnly={id ? true : false}
          />
        </div>

        {formData.weldList.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-x-2 md:gap-x-8 border p-4"
          >
            <FormInputItem
              label="Joint No."
              name={["weldList", index, "jointNo"]}
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
              required
            />
            <FormInputItem
              label="Rail ID 1 Length"
              name={["weldList", index, "railId1Length"]}
              onChange={(name, value) =>
                handleWeldListChange(name, value, index)
              }
              required
            />
            <FormInputItem
              label="Rail ID 2"
              name={["weldList", index, "railId2"]}
              onChange={(name, value) =>
                handleWeldListChange(name, value, index)
              }
              required
            />
            <FormInputItem
              label="Rail ID 2 Length"
              name={["weldList", index, "railId2Length"]}
              onChange={(name, value) =>
                handleWeldListChange(name, value, index)
              }
              required
            />
          </div>
        ))}

        <Divider />

        <div className="border grid grid-cols-4 divide-x divide-y divide-gray-300">
          <div className="p-2 text-center font-semibold">End</div>
          <div className="p-2 text-center font-semibold">Result</div>
          <div className="p-2 text-center font-semibold">Reason for NOT OK</div>
          <div className="p-2 text-center font-semibold">Remark</div>

          <div className="text-center">Front</div>
          <FormDropdownItem
            name="frontResultDesc"
            formField="frontResult"
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
          />
          <FormInputItem
            name="frontRemark"
            onChange={handleChange}
            className="no-border"
          />

          <div className="text-center">Back</div>
          <FormDropdownItem
            name="backResultDesc"
            formField="backResult"
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
            Save
          </Btn>
        </div>
      </Form>
    </FormContainer>
  );
};

export default NewWeldInspection;
