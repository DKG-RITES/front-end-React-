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
import { CENTER_LINE_RSH, FATIGUE, FCGR, FRACTURE_TOUGHNESS, HARDNESS, qctTestList, RESIDUAL } from "../../../../../utils/Constants";
import { apiCall } from "../../../../../utils/CommonFunctions";
import { useSelector } from "react-redux";
import IconBtn from "../../../../../components/DKG_IconBtn";

const {
  millDropdownList,
  qctGeneralInfo,
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
  });

  const handleRowClick = (row) => {
    console.log("ROW: ", row)

    if(row.qctType === FATIGUE){
      navigate(`/qct/fatigue/${row.qctId}`)
    }
    if(row.qctType === RESIDUAL){
      navigate(`/qct/residual/${row.qctId}`)
    }
    if(row.qctType === FRACTURE_TOUGHNESS){
      navigate(`/qct/fracture/${row.qctId}`)
    }
    if(row.qctType === FCGR){
      navigate(`/qct/fcgr/${row.qctId}`)
    }
    if(row.qctType === CENTER_LINE_RSH){
      navigate(`/qct/centerLine/${row.qctId}`)
    }
  }

  const columns = [
    {
      title: "S. No.",
      dataIndex: "serialNo",
      render: (_, __, index) => index+1
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
      title: "Action",
      render: (_, row) => (
        <Btn onClick={() => handleRowClick(row)} text="Edit" />
      )
    }
  ]
  

  const handleChange = (fieldName, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  // const handleChange = (fieldName, value) => {
  //   console.log("FieldName: ", fieldName, value)
  // }

  const qctGeneralInfo = useSelector((state) => state.qctDuty);
  const { token } = useSelector((state) => state.auth);

  const declareNewSample = async () => {
    try {
      await apiCall("POST", "/qct/saveNewTestSample", token, {
        ...formData,
        dutyId: qctGeneralInfo.dutyId,
      });
      message.success("Data saved successfully.");
      setModalOpen(false);
      setFormData({
        strandNo: "",
        qctType: "",
        heatNo: "",
        sampleId: "",
      });
      populateTableData();
    } catch (error) {}
  };

  const handleFormSubmit = () => {
    navigate("/qct/sampleList");
  };

  const populateTableData = async () => {
    try{
      const {data} = await apiCall("GET", `/qct/getQctDtlByDutyId?dutyId=${qctGeneralInfo.dutyId}`, token)
      console.log(data.responseData)
      setTableData(data?.responseData || []);
    }
    catch(error){}
    
  }

  useEffect(() => {
    populateTableData();
  },  [])

  return (
    <FormContainer>
      <SubHeader title="QCT - Sample Declaration" link="/qct/sampleList" />
      <GeneralInfo data={qctGeneralInfo} />

      <FormBody initialValues={formData} onFinish={handleFormSubmit}>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4">
          <FormDropdownItem
            label="Mill"
            name="mill"
            dropdownArray={millDropdownList}
            valueField="key"
            visibleField="value"
            onChange={handleChange}
            className="w-full"
            required
          />
          <FormDropdownItem
            label="Rail Section"
            name="railSection"
            dropdownArray={railSectionList}
            valueField="key"
            visibleField="value"
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4">
          <FormDropdownItem
            label="Rail Grade"
            name="railGrade"
            dropdownArray={railGradeList}
            valueField="key"
            visibleField="value"
            onChange={handleChange}
            className="w-full"
            required
          />
          {(formData.railGrade === "R350HT" ||
            formData.railGrade === "1080HH") && (
            <FormDropdownItem
              label="QCT"
              name="qct"
              dropdownArray={qctList}
              valueField="key"
              visibleField="value"
              onChange={handleChange}
              className="w-full"
              required
            />
          )}
          {(formData.railGrade === "R260" || formData.railGrade === "880") && (
            <FormDropdownItem
              label="QCT"
              name="qct"
              dropdownArray={qctSecList}
              valueField="key"
              visibleField="value"
              onChange={handleChange}
              className="w-full"
              required
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4">
          <CustomDatePicker
            label="Date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <FormInputItem
            label="No. of Samples"
            name="numberSamples"
            onChange={handleChange}
            required
          />
        </div> */}

        <Divider>Samples Declared for Testing</Divider>

        {/* <DKG_InteractionTable /> */}
        <div className="relative">

        <Table dataSource={tableData} columns={columns} />
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
          <Form layout="vertical" onFinish={declareNewSample} className="grid grid-cols-2 gap-x-4">
            <FormInputItem
              name="heatNo"
              label="Heat number"
              onChange={handleChange}
            />
            <FormInputItem
              name="strandNo"
              label="Strand"
              onChange={handleChange}
            />
            <FormInputItem
              name="sampleId"
              label="Sample ID"
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
              label="Rail Section"
              name="railSection"
              formField="railSection"
              dropdownArray={railSectionList}
              visibleField="value"
              valueField="key"
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
            <div className="col-span-2 flex mx-auto">
            <Btn htmlType="submit" text="Submit" />
            </div>
          </Form>
        </Modal>
      )}
    </FormContainer>
  );
};

export default QctSampleDeclarationForm;
