import React, { useEffect, useState } from "react";
import FormContainer from "../../../../../components/DKG_FormContainer";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import FormBody from "../../../../../components/DKG_FormBody";
import data from "../../../../../utils/frontSharedData/qct/qct.json";
import FormInputItem from "../../../../../components/DKG_FormInputItem";
import SubHeader from "../../../../../components/DKG_SubHeader";
import Btn from "../../../../../components/DKG_Btn";
import { useNavigate } from "react-router-dom";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";
import CustomDatePicker from "../../../../../components/DKG_CustomDatePicker";
import { Divider, Form, message, Modal, Table } from "antd";
import DKG_InteractionTable from "../../../../../components/DKG_QCTSampleDecTable";
import {
  CENTER_LINE_RSH,
  FATIGUE,
  FCGR,
  FRACTURE_TOUGHNESS,
  HARDNESS,
  qctTestList,
  RESIDUAL,
} from "../../../../../utils/Constants";
import { apiCall } from "../../../../../utils/CommonFunctions";
import { useSelector } from "react-redux";
import IconBtn from "../../../../../components/DKG_IconBtn";
import { use } from "react";

const {
  millDropdownList,
  railSectionList,
  railGradeList,
  qctList,
  sampleDeclarationColumns,
  sampleDeclarationData,
  qctSecList,
} = data;

const QctSampleDeclarationForm = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    strandNo: "",
    qctType: "",
    heatNo: "",
    sampleId: "",
    noOfSamples: 1, // Add this line
  });
  const [sampleFields, setSampleFields] = useState([
    { strandNo: "", sampleId: "" },
  ]); // Add this line

  const handleUpdateClick = (row) => {
    setFormData(row);
    setUpdateModalOpen(true)
    form.setFieldsValue(row)
  }

  const handleRowClick = (row) => {

    if (row.qctType === FATIGUE) {
      navigate(`/qct/fatigue/${row.qctId}`);
    }
    if (row.qctType === RESIDUAL) {
      navigate(`/qct/residual/${row.qctId}`);
    }
    if (row.qctType === FRACTURE_TOUGHNESS) {
      navigate(`/qct/fracture/${row.qctId}`);
    }
    if (row.qctType === FCGR) {
      navigate(`/qct/fcgr/${row.qctId}`);
    }
    if (row.qctType === CENTER_LINE_RSH) {
      navigate(`/qct/centerLine/${row.qctId}`);
    }
  };

  const columns = [
    {
      title: "S. No.",
      dataIndex: "serialNo",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Heat Number",
      dataIndex: "heatNo",
    },
    {
      title: "Strand",
      dataIndex: "strandNo",
    },
    {
      title: "Sample ID",
      dataIndex: "sampleId",
    },
    {
      title: "Test Type",
      dataIndex: "qctType",
    },
    {
      title: "Action",
      render: (_, row) => (
        <div className="flex gap-x-2">
        <Btn onClick={() => handleUpdateClick(row)} text="Update Sample" />
        <Btn onClick={() => handleDelete(row)} text="Delete Sample" />
        <Btn onClick={() => handleRowClick(row)} text={`Update ${row.qctType}`} />
        </div>
      ),
    },
  ];

  const handleDelete = async (row) => {
    try {
      await apiCall("POST", `/qct/deleteTestSample?qctId=${row.qctId}`, token);
      message.success("Sample deleted successfully.");
      populateTableData();
    } catch (error) {
      message.error("Error deleting data.");
    }
  };

  const [form] = Form.useForm();

  const handleChange = (fieldName, value) => {
    console.log("F: ", fieldName, value);
    setFormData((prev) => {
      // If changing number of samples, update the sample fields array
      if (fieldName === "noOfSamples") {
        const numSamples = parseInt(value) || 1;
        const newSampleFields = Array(numSamples)
          .fill()
          .map((_, i) => sampleFields[i] || { strandNo: "", sampleId: "" });
        setSampleFields(newSampleFields);
      }

      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  const { token } = useSelector((state) => state.auth);
  const qctGeneralInfo = useSelector((state) => state.qctDuty);

  // Add this function to handle sample field changes
  const handleSampleFieldChange = (index, field, value) => {
    const newSampleFields = [...sampleFields];
    newSampleFields[index] = {
      ...newSampleFields[index],
      [field]: value,
    };
    setSampleFields(newSampleFields);
  };

  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const declareNewSample = async () => {
    try {
      // Create an array of samples to save
      const samples = sampleFields.map((sample) => ({
        ...formData,
        strandNo: sample.strandNo,
        sampleId: sample.sampleId,
        dutyId: qctGeneralInfo.dutyId,
      }));

      // Save each sample
      for (const sample of samples) {
        await apiCall("POST", "/qct/saveNewTestSample", token, sample);
      }

      message.success("Data saved successfully.");
      setModalOpen(false);
      setFormData({
        strandNo: "",
        qctType: "",
        heatNo: "",
        sampleId: "",
        noOfSamples: 1,
      });
      setSampleFields([{ strandNo: "", sampleId: "" }]);
      populateTableData();
    } catch (error) {}
  };

  const handleFormSubmit = () => {
    navigate("/qct/sampleList");
  };

  const populateTableData = async () => {
    try {
      const { data } = await apiCall(
        "GET",
        `/qct/getQctDtlByDutyId?dutyId=${qctGeneralInfo.dutyId}`,
        token
      );
      console.log(data.responseData);
      setTableData(data?.responseData || []);
    } catch (error) {}
  };

  const updateSample = async () => {
    console.log("FormData: ", formData)
    // return
    try {
      await apiCall("POST", "/qct/updateTestSample", token, {...formData, dutyId: qctGeneralInfo.dutyId});
      message.success("Data updated successfully.");
      setUpdateModalOpen(false);
      populateTableData();
    } catch (error) {
      message.error("Error updating data.");
    }
  };

  useEffect(() => {
    populateTableData();
  }, []);

  return (
    <FormContainer>
      <SubHeader title="QCT - Sample Declaration" link="/qct/sampleList" />
      <GeneralInfo data={qctGeneralInfo} />

      <FormBody initialValues={formData} onFinish={handleFormSubmit}>
        <Divider>Samples Declared for Testing</Divider>

        <div className="relative">
          <Table dataSource={tableData} columns={columns} scroll={{x:true}} />
          <IconBtn
            icon={PlusOutlined}
            text="declare new test"
            className="absolute left-0 bottom-4"
            onClick={() => setModalOpen(true)}
          />
        </div>

        <Divider className="mt-2 mb-2" />

        <FormInputItem
          label="Remarks"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          required
        />

        <div className="flex justify-center mt-4">
          <Btn htmlType="submit">Save</Btn>
        </div>
      </FormBody>
      {modalOpen && (
        <Modal
          title="New Test Declaration"
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={declareNewSample}
            className="grid grid-cols-2 gap-x-4"
          >
            <FormInputItem
              name="heatNo"
              label="Heat number"
              onChange={handleChange}
            />
            <FormDropdownItem
              dropdownArray={qctTestList}
              name="qctType"
              formField="qctType"
              visibleField="value"
              valueField="key"
              label="Type"
              onChange={handleChange}
            />
            <FormDropdownItem
              label="Mill"
              name="mill"
              formField="mill"
              dropdownArray={millDropdownList}
              valueField="key"
              visibleField="value"
              onChange={handleChange}
              required
            />
            <FormDropdownItem
              label="Rail Grade"
              name="railGrade"
              formField="railGrade"
              dropdownArray={railGradeList}
              visibleField="value"
              valueField="key"
              onChange={handleChange}
              required
            />
            <FormDropdownItem
              label="Rail Section"
              name="railSection"
              formField="railSection"
              dropdownArray={railSectionList}
              visibleField="value"
              valueField="key"
              onChange={handleChange}
              required
            />
            <FormInputItem
              name="noOfSamples"
              label="Number of Samples"
              onChange={handleChange}
            />

            {/* Dynamic sample fields */}
            <Divider className="col-span-2">Sample Details</Divider>

            {sampleFields.map((field, index) => (
              <React.Fragment key={index}>
                <FormInputItem
                  name={`strandNo_${index}`}
                  label={`Strand ${index + 1}`}
                  value={field.strandNo}
                  onChange={(_, value) =>
                    handleSampleFieldChange(index, "strandNo", value)
                  }
                />
                <FormInputItem
                  name={`sampleId_${index}`}
                  label={`Sample ID ${index + 1}`}
                  value={field.sampleId}
                  onChange={(_, value) =>
                    handleSampleFieldChange(index, "sampleId", value)
                  }
                />
              </React.Fragment>
            ))}

            <div className="col-span-2 flex mx-auto">
              <Btn htmlType="submit" text="Submit" />
            </div>
          </Form>
        </Modal>
      )}

      <Modal
        open={updateModalOpen}
        onCancel={() => setUpdateModalOpen(false)}
        footer={null}
        title="Update Sample Declaration"
      >
        <Form form={form} layout="vertical" onFinish={updateSample}>
          <FormInputItem
            name="heatNo"
            label="Heat number"
            onChange={handleChange}
          />

          <FormDropdownItem
            label="Mill"
            name="mill"
            formField="mill"
            dropdownArray={millDropdownList}
            valueField="key"
            visibleField="value"
            onChange={handleChange}
            required
          />
          <FormDropdownItem
            label="Rail Grade"
            name="railGrade"
            formField="railGrade"
            dropdownArray={railGradeList}
            visibleField="value"
            valueField="key"
            onChange={handleChange}
            required
          />
          <FormDropdownItem
            label="Rail Section"
            name="railSection"
            formField="railSection"
            dropdownArray={railSectionList}
            visibleField="value"
            valueField="key"
            onChange={handleChange}
            required
          />
          <FormInputItem 
            name="sampleId"
            label="Sample ID"
            onChange={handleChange}
          />
          <FormInputItem
            name="strandNo"
            label="Strand No"
            onChange={handleChange}
          />
          <Btn htmlType="submit" text="Update" />
        </Form>
      </Modal>
    </FormContainer>
  );
};

export default QctSampleDeclarationForm;
