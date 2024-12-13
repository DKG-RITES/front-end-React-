import { Button, Form, message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { apiCall } from "../../../utils/CommonFunctions";
import TableComponent from "../../../components/DKG_Table";
import { CloseCircleOutlined } from "@ant-design/icons";
import CustomDatePicker from "../../../components/DKG_CustomDatePicker";
import Btn from "../../../components/DKG_Btn";
import SubHeader from "../../../components/DKG_SubHeader";

const SmsHeatReport = () => {
  const [form] = Form.useForm();
  const columns = [
    // Filterable Columns
    { title: "Heat No", dataIndex: "heatNo", key: "heatNo", filterable: true },
    { title: "SMS", dataIndex: "sms", key: "sms", filterable: true },
    {
      title: "Caster No",
      dataIndex: "casterNo",
      key: "casterNo",
      filterable: true,
    },
    {
      title: "Rail Grade",
      dataIndex: "railGrade",
      key: "railGrade",
      filterable: true,
    },
    {
      title: "Date & Shift of Casting",
      dataIndex: "dateAndShiftOfCasting",
      key: "dateAndShiftOfCasting",
      filterable: true,
    },
    {
      title: "Probe Make Name",
      dataIndex: "probeMakeName",
      key: "probeMakeName",
      filterable: true,
    },
    {
      title: "Make of Casting Powder",
      dataIndex: "makeOfCastingPowder",
      key: "makeOfCastingPowder",
      filterable: true,
    },

    // Boolean Filterable Columns
    {
      title: "Hydris Measured (80-100m)",
      dataIndex: "isHydrisMeasuredBw80To100mOfCasting",
      key: "isHydrisMeasuredBw80To100mOfCasting",
      filterable: true,
    },
    {
      title: "Probe Dipped (Below 300mm)",
      dataIndex: "isProbeDippedBelow300mmFromSlagMetalInterface",
      key: "isProbeDippedBelow300mmFromSlagMetalInterface",
      filterable: true,
    },
    {
      title: "EMS Functioning",
      dataIndex: "isEmsFunctioning",
      key: "isEmsFunctioning",
      filterable: true,
    },
    {
      title: "Slag Detector Functioning",
      dataIndex: "isSlagDetectorFunctioning",
      key: "isSlagDetectorFunctioning",
      filterable: true,
    },
    {
      title: "AMLC Functioning",
      dataIndex: "isAmlcFunctioning",
      key: "isAmlcFunctioning",
      filterable: true,
    },
    {
      title: "Hydrogen Measurement Automatic",
      dataIndex: "isHydrogenMeasurementAutomatic",
      key: "isHydrogenMeasurementAutomatic",
      filterable: true,
    },
    {
      title: "Ladle to Tundish Used",
      dataIndex: "isLadleToTundishUsed",
      key: "isLadleToTundishUsed",
      filterable: true,
    },
    {
      title: "Tundish to Mould Used",
      dataIndex: "isTundishToMouldUsed",
      key: "isTundishToMouldUsed",
      filterable: true,
    },

    // Non-Filterable Columns
    { title: "Sequence No", dataIndex: "sequenceNo", key: "sequenceNo" },
    {
      title: "Turn Down Temp (°C)",
      dataIndex: "turnDownTemp",
      key: "turnDownTemp",
    },
    {
      title: "Degassing Vacuum",
      dataIndex: "degassingVacuum",
      key: "degassingVacuum",
    },
    {
      title: "Degassing Duration (min)",
      dataIndex: "degassingDuration",
      key: "degassingDuration",
    },
    {
      title: "Casting Temp (°C)",
      dataIndex: "castingTemp",
      key: "castingTemp",
    },
    { title: "Hydrogen", dataIndex: "hydrogen", key: "hydrogen" },
    { title: "Nitrogen", dataIndex: "nitrogen", key: "nitrogen" },
    { title: "Oxygen", dataIndex: "oxygen", key: "oxygen" },
    // { title: 'Chemical', dataIndex: 'chemical', key: 'chemical' },
    {
      title: "No. of Prime Blooms",
      dataIndex: "noOfPrimeBlooms",
      key: "noOfPrimeBlooms",
    },
    {
      title: "No. of Co Blooms",
      dataIndex: "noOfCoBlooms",
      key: "noOfCoBlooms",
    },
    {
      title: "No. of Rejected Blooms",
      dataIndex: "noOfRejectedBlooms",
      key: "noOfRejectedBlooms",
    },
    { title: "Total Cast Wt", dataIndex: "totalCastWt", key: "totalCastWt" },
    { title: "Heat Remark", dataIndex: "heatRemark", key: "heatRemark" },
    {
      title: "Reason for Rejection",
      dataIndex: "reasonForRejection",
      key: "reasonForRejection",

      render: (_, record) => record.hydrogen > 1.6 ? "Rejected for Hydrogen" : (record.oxygen > 20 ? "Rejected for Oxygen" : (record.nitrogen > 0.009 ? "Rejected for Nitrogen" : "N/A"))
    },
  ];

  const [filter, setFilter] = useState({
    startDate: null,
    endDate: null,
  });

  const [dataSource, setDataSource] = useState([]);

  const { token } = useSelector((state) => state.auth);

  const populateData = async () => {
    if (!filter.startDate || !filter.endDate) {
      message.error("Please enter start date and end date both.");
      return;
    }
    try {
      const { data } = await apiCall(
        "POST",
        "/sms/getHeatSummary",
        token,
        filter
      );
      setDataSource(data?.responseData);
    } catch (error) {}
  };

  const handleChange = (fieldName, value) => {
    setFilter((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div className="flex flex-col gap-4 md:gap-2 bg-white p-4 w-full md:w-4/5 mx-auto h-[100vh] md:h-fit">
      <SubHeader title="SMS Heat Summary" link="/record/sms" />

      <div className="mt-4 border border-darkBlueHover p-2 py-4">
        <div>
          <Form
            form={form}
            initialValues={filter}
            onFinish={populateData}
            className="grid md:grid-cols-4 grid-cols-2 gap-x-2 items-center p-2 pt-0"
          >
            <CustomDatePicker
              className="no-border"
              defaultValue={filter.startDate}
              placeholder="From date"
              name="startDate"
              onChange={handleChange}
              required
            />
            <CustomDatePicker
              className="no-border"
              defaultValue={filter.endDate}
              placeholder="To date"
              name="endDate"
              onChange={handleChange}
              required
            />
            <Btn htmlType="submit" className="w-full">
              {" "}
              Search{" "}
            </Btn>
            <Button
              className="flex gap-2 items-center border-darkBlue text-darkBlue"
              onClick={() => window.location.reload()}
            >
              <span>
                <CloseCircleOutlined />
              </span>
              <span>Reset</span>
            </Button>
          </Form>
        </div>

        <TableComponent dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default SmsHeatReport;
