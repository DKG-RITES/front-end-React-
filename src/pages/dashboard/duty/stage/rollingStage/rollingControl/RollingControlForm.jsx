import React, { useCallback, useEffect, useState } from "react";
import SubHeader from "../../../../../../components/DKG_SubHeader";
import FormContainer from "../../../../../../components/DKG_FormContainer";
import GeneralInfo from "../../../../../../components/DKG_GeneralInfo";
import data from "../../../../../../utils/frontSharedData/rollingStage/Stage.json";
import FormDropdownItem from "../../../../../../components/DKG_FormDropdownItem";
import FormInputItem from "../../../../../../components/DKG_FormInputItem";
import { Divider, Form, Table, message, Checkbox } from "antd";
import Btn from "../../../../../../components/DKG_Btn";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../../../../components/DKG_IconBtn";
import { EditOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import CustomDatePicker from "../../../../../../components/DKG_CustomDatePicker";
import { apiCall } from "../../../../../../utils/CommonFunctions";
import { Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from "dayjs"; // Make sure you have dayjs installed


const { micrometerNumberList, vernierNumberList, weighingMachineList } = data;

const RollingControlForm = () => {

  const [micrometerNumberList, setMicrometerNumberList] = useState([])
  const [vernierNumberList, setVernierNumberList] = useState([])
  const [weighingMachineList, setWeighingMachineList] = useState([])

  const [form] = Form.useForm();
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    micrometerNo: null,
    vernierNo: null,
    weighingMachine: null,
    micrometerValidity: null,
    vernierValidity: null,
    weighingMachineValidity: null,
    branding: null,
    noOfGauges: null,
    railRollingHeatList: [
      // {
      //   heatNo: null,
      //   sampleNo: null,
      //   timing: null,
      //   result: null
      // }
    ],
  });
  const [showFields, setShowFields] = useState(false);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const rollingGeneralInfo = useSelector((state) => state.rollingDuty);
  const { token } = useSelector((state) => state.auth);

  const handleToggleFields = () => setShowFields(!showFields);

  const columns = [
    {
      title: "S.No.",
      dataIndex: "sNo",
      key: "sNo",
      render: (_, __, index) => index+1
    },
    {
      title: "Heat No.",
      dataIndex: "heatNo",
      key: "heatNo",
    },
    {
      title: "Timing",
      dataIndex: "timing",
      key: "timing",
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
    },
    {
      title: "Edit",
      fixed: "right",
      render: (_, record) => (
        <IconBtn
          icon={EditOutlined}
          onClick={() => navigate("/stage/rollingControl/rollingControlSample", {state: {heatNo: record.heatNo, sampleNo: record.sampleNo}})}
        />
      ),
    },
    {
    title: "Delete",
    key: "delete",
    fixed: "right",
    render: (_, record) => (
      <Popconfirm
        title="Are you sure you want to delete this entry?"
        onConfirm={() => handleDelete(record)}
        okText="Yes"
        cancelText="No"
      >
        <IconBtn icon={DeleteOutlined} />
      </Popconfirm>
    ),
  },
  ];

  const handlePageSizeChange = (value) => {
    setTablePageSize(value);
    setCurrentTablePage(1); // Reset to first page when page size changes
  };

  const handleChange = async (fieldName, value) => {
    if(fieldName === "micrometerNo" || fieldName === "vernierNo" || fieldName === "weighingMachine"){
      try{
        const {data} = await apiCall("GET", `/calibration/getCalibrationDtls?serialNumber=${value}`, token)
        const date = data?.responseData?.calibrationValidUpto;
        if(fieldName === "micrometerNo"){
          setFormData(prev => ({...prev, [fieldName] : value, micrometerValidity: date}))
        }
        else if(fieldName === "vernierNo"){
          setFormData(prev => ({...prev, [fieldName] : value, vernierValidity: date}))
        }
        else if(fieldName === "weighingMachine"){
          setFormData(prev => ({...prev, [fieldName] : value, weighingMachineValidity: date}))
        }
      }
      catch(error){}
    }
    setFormData((prev) => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  const handleFormSubmit = async () => {
    try{
      await apiCall("POST", "/rolling/saveControlDtls", token, {...formData, dutyId: rollingGeneralInfo.dutyId})
      message.success("Data saved successfully.");
      navigate("/stage/home");
    }
    catch(error){}
  };

 const handleDelete = async (recordToDelete) => {
  try {
await apiCall(
  "POST",
  "/rolling/deleteHeat",
  token,
  {
    heatNo: recordToDelete.heatNo,
    dutyId: recordToDelete.dutyId,
    sms: recordToDelete.sms
  }
);

    const updatedList = formData.railRollingHeatList.filter(
      (item) => !(item.heatNo === recordToDelete.heatNo && item.sampleNo === recordToDelete.sampleNo)
    );

    setFormData((prev) => ({
      ...prev,
      railRollingHeatList: updatedList,
    }));

    message.success(`Deleted heat number: ${recordToDelete.heatNo}`);
  } catch (error) {
    message.error("Failed to delete the entry. Please try again.");
  }
};

  const populateData = useCallback(async () => {
    try {
      const { data } = await apiCall(
        "GET",
        `/rolling/getControlDtls?dutyId=${rollingGeneralInfo.dutyId}`,
        token
      );

      const {data: instList} = await apiCall("GET", "/calibration/getVrnrMmWmcInstList", token)
      const mmList = instList.responseData.Micrometer?.map(item => ({key: item, value: item})) || []
      const vrnrList = instList.responseData?.Vernier?.map(item => ({key: item, value: item})) || []
      const wmcList = instList.responseData?.WeighingMachine?.map(item => ({key: item, value: item})) || []
      // console.log("LIST: ", lst)
      console.log("Setting ")
      console.log("MM LSITTT: ", mmList)
      setMicrometerNumberList(mmList)
      setVernierNumberList(vrnrList)
      setWeighingMachineList(wmcList)
      console.log("Setting done")


      const { responseData } = data;

      setFormData({
        micrometerNo: responseData?.micrometerNo,
        vernierNo: responseData?.vernierNo,
        weighingMachine: responseData?.weighingMachine,
        micrometerValidity: responseData?.micrometerValidity,
        vernierValidity: responseData?.vernierValidity,
        weighingMachineValidity: responseData?.weighingMachineValidity,
        branding: responseData?.branding,
        noOfGauges: responseData?.noOfGauges,
        railRollingHeatList: responseData?.railRollingHeatList?.map(
          (record) => record
        ),
      });
    } catch (error) {}
  }, [token, rollingGeneralInfo.dutyId]);

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  useEffect(() => {
    populateData();
  }, [populateData]);

  const instrumentOptions = [
    { key: "micrometer", label: "Micrometer" },
    { key: "vernier", label: "Vernier" },
    { key: "weighingMachine", label: "Weighing Machine" }
    // Removed "noOfGauges" and "branding"
  ];

  // Helper to check if a date is before today
  const isExpired = (dateStr) => {
    if (!dateStr) return false;
    const today = dayjs().startOf("day");
    const date = dayjs(dateStr).startOf("day");
    return date.isBefore(today);
  };

  return (
    <FormContainer>
      <SubHeader title="Rail Rolling Control" link="/stage/home" />
      <GeneralInfo data={rollingGeneralInfo} />

      <Btn onClick={handleToggleFields}>
        {showFields ? "Hide Fields" : "Click to fill details of instruments"}
      </Btn>

      {
        showFields && (
          <>
            {/* Instrument selection checkboxes */}
            <div className="mb-4 flex flex-wrap gap-4">
              {instrumentOptions.map(inst => (
                <label key={inst.key} className="flex items-center gap-1">
                  <Checkbox
                    checked={selectedInstruments.includes(inst.key)}
                    onChange={e => {
                      setSelectedInstruments(prev =>
                        e.target.checked
                          ? [...prev, inst.key]
                          : prev.filter(i => i !== inst.key)
                      );
                    }}
                  />
                  {inst.label}
                </label>
              ))}
            </div>
            <Form
              initialValues={formData}
              onFinish={handleFormSubmit}
              form={form}
              layout="vertical"
            >
              <div className="grid grid-cols-2 gap-x-2">
                {selectedInstruments.includes("micrometer") && (
                  <>
                    <FormDropdownItem
                      label="Micrometer No."
                      name="micrometerNo"
                      formField="micrometerNo"
                      dropdownArray={micrometerNumberList}
                      visibleField="value"
                      valueField="key"
                      onChange={handleChange}
                    />
                    <CustomDatePicker
                      label="Micrometer Validity"
                      name="micrometerValidity"
                      defaultValue={formData.micrometerValidity}
                      onChange={handleChange}
                      disabled
                      className={isExpired(formData.micrometerValidity) ? "border-red-500 text-red-600" : ""}
                    />
                  </>
                )}
                {selectedInstruments.includes("vernier") && (
                  <>
                    <FormDropdownItem
                      label="Vernier No."
                      name="vernierNo"
                      formField="vernierNo"
                      dropdownArray={vernierNumberList}
                      visibleField="value"
                      valueField="key"
                      onChange={handleChange}
                    />
                    <CustomDatePicker
                      label="Vernier Validity"
                      name="vernierValidity"
                      formField="vernierValidity"
                      defaultValue={formData.vernierValidity}
                      onChange={handleChange}
                      disabled
                      className={isExpired(formData.vernierValidity) ? "border-red-500 text-red-600" : ""}
                    />
                  </>
                )}
                {selectedInstruments.includes("weighingMachine") && (
                  <>
                    <FormDropdownItem
                      label="Weighing M/c"
                      name="weighingMachine"
                      formField="weighingMachine"
                      dropdownArray={weighingMachineList}
                      valueField="key"
                      visibleField="value"
                      onChange={handleChange}
                    />
                    <CustomDatePicker
                      label="Weighing Machine Validity"
                      name="weighingMachineValidity"
                      defaultValue={formData.weighingMachineValidity}
                      onChange={handleChange}
                      disabled
                      className={isExpired(formData.weighingMachineValidity) ? "border-red-500 text-red-600" : ""}
                    />
                  </>
                )}

                {/* Always show No. of Gauges and Branding as mandatory */}
                <FormInputItem
                  label="No. of Gauges"
                  name="noOfGauges"
                  onChange={handleChange}
                  rules={[{ required: true, message: "No. of Gauges is required" }]}
                />
                <FormInputItem
                  label="Branding"
                  name="branding"
                  onChange={handleChange}
                  rules={[{ required: true, message: "Branding is required" }]}
                />
              </div>
            </Form>
            <Divider className="mt-0 mb-0" />
          </>
        )
      }
      <Table
        columns={columns}
        dataSource={formData.railRollingHeatList}
        scroll={{ x: true }}
        pagination={{
          current: currentTablePage,
          pageSize: tablePageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          onChange: (page) => setCurrentTablePage(page),
          onShowSizeChange: (_, size) => handlePageSizeChange(size),
        }}
      />
      <IconBtn
        icon={PlusOutlined}
        text="add sample"
        onClick={() => navigate("/stage/rollingControl/rollingControlSample")}
      />
      <Btn htmlType="submit" className="flex justify-center mx-auto mt-6">
        Save
      </Btn>
    </FormContainer>
  );
};

export default RollingControlForm;
