import React, { useState } from "react";
import TableComponent from "../../../components/DKG_Table";
import SubHeader from "../../../components/DKG_SubHeader";
import { apiCall } from "../../../utils/CommonFunctions";
import { useSelector } from "react-redux";
import CustomDatePicker from "../../../components/DKG_CustomDatePicker";
import Btn from "../../../components/DKG_Btn";
import { Button, Form, message } from "antd";
import {
  CloseCircleOutlined,
} from "@ant-design/icons";
import FormDropdownItem from "../../../components/DKG_FormDropdownItem";

const shiftList = [
    {
      "key": "A",
      "value": "A"
    },
    {
      "key": "B",
      "value": "B"
    },
    {
      "key": "C",
      "value": "C"
    }
  ]

const SmsRecord = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      filterable: true, // Enable search
    },
    {
      title: "SMS & Caster No",
      dataIndex: "smsNumber",
      key: "smsNumber",
      filterable: true, // Enable filter
      render: (_, record) => record.smsNumber + " , " + record.casterNumber
    },
    // {
    //   title: "Caster Number",
    //   dataIndex: "casterNumber",
    //   key: "casterNumber",
    //   searchable: true, // Enable search
    // },
    {
      title: "Rail Grade",
      dataIndex: "railGrade",
      key: "railGrade",
      filterable: true, // Enable filter
    },
    {
      title: "Heat Casted Count",
      dataIndex: "numberOfHeatsCast",
      key: "numberOfHeatsCast",
    },
    {
      title: "Heat Rejected Count",
      dataIndex: "numberOfHeatsRejected",
      key: "numberOfHeatsRejected",
    },
    {
      title: "Diverted Heat Count",
      dataIndex: "numberOfDivertedHeats",
      key: "numberOfDivertedHeats",
    },
    {
      title: "Rejected Heat Numbers",
      dataIndex: "rejectedHeatNumbers",
      key: "rejectedHeatNumbers",
      render: (_, record) => record.rejectedHeatNumbers || "N/A"
    },
    {
      title: "Weight of Heats Casted",
      dataIndex: "weightOfHeatsCast",
      key: "weightOfHeatsCast",
    },
    {
      title: "Weight of Prime Blooms",
      dataIndex: "weightOfPrimeBlooms",
      key: "weightOfPrimeBlooms",
    },
    {
      title: "Weight of CO Blooms",
      dataIndex: "weightOfCOBlooms",
      key: "weightOfCOBlooms",
    },
    {
      title: "Weight of Accepted Blooms",
      dataIndex: "weightOfAcceptedBlooms",
      key: "weightOfAcceptedBlooms",
    },
    {
      title: "Weight of Rejected Blooms",
      dataIndex: "weightOfRejectedBlooms",
      key: "weightOfRejectedBlooms",
    },
    {
      title: "Reason for rejection",
      dataIndex: "reasonForRejection",
      key: "reasonForRejection",
    },
  ];

  const [filter, setFilter] = useState({
    startDate: null,
    endDate: null,
  });

  const [dataSource, setDataSource] = useState([]);
  console.log(dataSource)

  const { token } = useSelector((state) => state.auth);

  const populateData = async () => {
    if(!filter.startDate || !filter.endDate) {
      message.error("Please enter start date and end date both.")
      return;
    }
    try {
      const { data } = await apiCall(
        "POST",
        "/sms/getSmsSummary",
        token,
        filter
      );

      if(filter.shift){
        const resp = data.responseData.filter((item) => item.shift === filter.shift)
        setDataSource(resp)
      }
      else{
        setDataSource(data?.responseData);
      }
    } catch (error) {}
  };

  const handleChange = (fieldName, value) => {
    setFilter((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div className="flex flex-col gap-4 md:gap-2 bg-white p-4 w-full md:w-4/5 mx-auto h-[100vh] md:h-fit">
      <SubHeader title="SMS Summary" link="/record/sms" />

      <div className="mt-4 border border-darkBlueHover p-2 py-4">
        <div>
          <Form form={form} initialValues={filter} onFinish={populateData} className="grid md:grid-cols-3 grid-cols-2 gap-x-2 items-center p-2 pt-0">
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

              <FormDropdownItem
            placeholder="Shift"
            dropdownArray={shiftList}
            formField="shift"
            name="shift"
            onChange={handleChange}
            valueField="key"
            visibleField="value"
          />
            <Btn htmlType="submit" className="w-full">
              {" "}
              Search
              {" "}
            </Btn>
            <Button className="flex gap-2 items-center border-darkBlue text-darkBlue" onClick={() => window.location.reload()}>
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

export default SmsRecord;
