import { Button, Input, Radio, Space, Table, Form } from 'antd'
import React, { useRef, useState } from 'react'
import CustomDatePicker from '../../../components/DKG_CustomDatePicker'
import Btn from '../../../components/DKG_Btn'
import moment from 'moment'
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import FormDropdownItem from '../../../components/DKG_FormDropdownItem'
import info from '../../../utils/frontSharedData/VisualInspection/VI.json'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCall } from '../../../utils/CommonFunctions';

const { shiftList } = info;

const AiSystem = () => {
  const [timePeriod, setTimePeriod] = useState('shift')
  const [startDate, setStartDate] =useState('')
  const [weekStartDate, setWeekStartDate] = useState('')
  const [weekEndDate, setWeekEndDate] = useState('')
  const [monthStartDate, setMonthStartDate] = useState('')
  const [monthEndDate, setMonthEndDate] = useState('')
  const [yearStartDate, setYearStartDate] = useState('')
  const [yearEndDate, setYearEndDate] = useState('')
  const [inspectionShift, setInspectionShift] = useState('')
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { token } = useSelector((state) => state.auth);
  const [dataSource, setDataSource] = useState([]);

  const handleShiftChange = (fieldName, value) => {
    if (fieldName === 'startDate') {
      setStartDate(value)
    } else {
      setInspectionShift(value)
    }
  }

  console.log(inspectionShift)

  const handleWeekEndChange = (_, value) => {
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    date.setTime(date.getTime() - (7 * 24 * 60 * 60 * 1000));
    const newDay = String(date.getDate()).padStart(2, '0');
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newYear = date.getFullYear();
    const weekStartDate = `${newDay}/${newMonth}/${newYear}`
    setWeekStartDate(weekStartDate)
    setWeekEndDate(value)
  }

  const handleMonthEndChange = (_, value) => {
    const date = moment(value, 'DD/MM/YYYY', true);
    if (!date.isValid()) {
      throw new Error('Invalid date format. Please use DD/MM/YYYY.');
    }
    const oneMonthBefore = date.subtract(1, 'months');
    const formattedValue = oneMonthBefore.format('DD/MM/YYYY');
    setMonthStartDate(formattedValue)
    setMonthEndDate(value)
  }

  const handleYearEndChange = (_, value) => {
    const date = moment(value, 'DD/MM/YYYY', true);
    if (!date.isValid()) {
      throw new Error('Invalid date format. Please use DD/MM/YYYY.');
    }
    const oneYearBefore = date.subtract(1, 'years');
    const formattedValue = oneYearBefore.format('DD/MM/YYYY');
    setYearStartDate(formattedValue)
    setYearEndDate(value)
  }

  const searchInput = useRef(null);
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Rail ID',
      dataIndex: 'railId',
      key: 'railId',
      align: 'center',
      ...getColumnSearchProps('railId'),
      render: (railId) => (
        <a onClick={() => navigate(`/railDetails/${railId}`)}>{railId}</a>
      )
    },
    {
      title: 'Surface Defect Detection',
      key: 'surfaceDefectDetection',
      align: 'center',
      items: [
        {
          title: 'Precision',
          dataIndex: ['surfaceDefectDetection', 'precision'],
          key: 'surfaceDefectDetectionPrecision',
          align: 'center'
        },
        {
          title: 'Recall',
          dataIndex: ['surfaceDefectDetection', 'recall'],
          key: 'surfaceDefectDetectionRecall',
          align: 'center'
        },
      ],
    },
    {
      title: 'Dimensional Variation Detection',
      key: 'dimensionalVariationDetection',
      align: 'center',
      items: [
        {
          title: 'Precision',
          dataIndex: ['dimensionalVariationDetection', 'precision'],
          key: 'dimensionalVariationDetectionPrecision',
          align: 'center'
        },
        {
          title: 'Recall',
          dataIndex: ['dimensionalVariationDetection', 'recall'],
          key: 'dimensionalVariationDetectionRecall',
          align: 'center',
        },
      ],
    },
    {
      title: 'OCR',
      dataIndex: 'ocr',
      key: 'ocr',
      align: 'center',
      filters: [
        {
          text: "True",
          value: "True"
        },
        {
          text: "False",
          value: "False"
        },
      ],
      onFilter: (value, record) => record?.ocr?.indexOf(value) === 0,
    },
  ];

  const tabColorList = [
    "#004B4D", // Deep Teal
    "#2E1A47", // Midnight Purple
    "#2B3A70", // Slate Blue
    "#3B3C36", // Dark Olive Green
    "#4A0C0C", // Crimson Red
    "#1E1A78", // Indigo Night
    "#003B5C", // Deep Sea Blue
    "#4A5A3D"  // Moss Green
  ];

  const tabs = [
    {
      title: ["Total", "Rail IDs"],
      value: "10",
    },
    {
      title: ["Avg. Precision", "Surface Defect"],
      value: "0.91",
    },
    {
      title: ["Avg. Recall", "Surface Defect"],
      value: "0.87",
    },
    {
      title: ["Avg. Precision", "Dim. Variation"],
      value: "0.54",
    },
    {
      title: ["Avg. Recall", "Dim. Variation"],
      value: "0.45",
    },
    {
      title: ["True", "OCR"],
      value: "93%",
    },
  ]

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <div key={index} className='p-4 border shadow-lg rounded-lg' 
        style={{ backgroundColor: tabColorList[index] }}
      >
        <div className='!text-4xl font-bold text-white text-center'>{tab.value}</div> <br />
        <div className='text-white text-center'>{tab.title[0]}</div>
        <div className='text-white text-center !text-2xl'>{tab.title[1]}</div>
      </div>
    ));
  };

  const populateData = async () => {
    let payload;
  
    if (timePeriod === 'shift') {
      payload = { startDate, endDate: null, shift: inspectionShift };
    } else if (timePeriod === 'weekly') {
      payload = { startDate: weekStartDate, endDate: weekEndDate, shift: null };
    } else if (timePeriod === 'monthly') {
      payload = { startDate: monthStartDate, endDate: monthEndDate, shift: null };
    } else {
      payload = { startDate: yearStartDate, endDate: yearEndDate, shift: null };
    }
  
    try {
      const [dimensionalRes, surfaceRes] = await Promise.all([
        apiCall("POST", "/dashboard/getDimensionalInspectionDtls", token, payload),
        apiCall("POST", "/dashboard/getSurfaceInspectionDtls", token, payload),
      ]);
  
      const arr1 = dimensionalRes.data?.responseData?.railIdList || [];
      const arr2 = surfaceRes.data?.responseData?.railIdList || [];
      const combinedArr = [...arr1, ...arr2];
  
      const uniqueData = Array.from(new Set(combinedArr)).map((railId) => ({
        railId,
      }));
  
      setDataSource(uniqueData);
    } catch (error) {
      console.error("Error fetching data:", error, payload);
    }
  };  
  
  return (
    <>
      <Form initialValues={{ timePeriod, startDate, weekStartDate, weekEndDate, monthStartDate, monthEndDate, yearStartDate, yearEndDate, inspectionShift}} form={form} layout='vertical' onFinish={populateData}>
        <h1 className='font-semibold mb-4 md:!text-2xl -mt-2 text-center'>AI System Accuracy Dashboard</h1> 

        <div>
          <h2 className='font-medium md:!text-xl underline'>
            Time Period
          </h2>

          <Radio.Group value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className='grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-8 mb-4'>
            <Radio value='shift'>Shift</Radio>
            <Radio value='weekly'>Weekly</Radio>
            <Radio value='monthly'>Monthly</Radio>
            <Radio value='yearly'>Annually</Radio>
          </Radio.Group>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          {
            timePeriod === 'shift' &&
            <>
              <FormDropdownItem label="Shift" name="inspectionShift" formField="inspectionShift" dropdownArray={shiftList} visibleField="value" valueField="key" onChange={handleShiftChange} required />
              <CustomDatePicker label='Start Date' defaultValue={startDate} name='startDate' onChange={handleShiftChange} required/>
            </>
          }

          {
            timePeriod === 'weekly' && 
            <>
              <CustomDatePicker label='Week End Date' name='weekEndDate' defaultValue={weekEndDate} onChange={handleWeekEndChange} required />
              <CustomDatePicker label='Week Start Date' name='weekStartDate' defaultValue={weekStartDate} disabled />
            </>
          }
          {
            timePeriod === 'monthly' &&
            <>
              <CustomDatePicker label='Month End Date' name='monthEndDate' defaultValue={monthEndDate} onChange={handleMonthEndChange} required/>
              <CustomDatePicker label='Month Start Date' name='monthStartDate' defaultValue={monthStartDate} disabled />
            </>
          }
          {
            timePeriod === 'yearly' &&
            <>
              <CustomDatePicker label='Year End Date' name='yearEndDate' defaultValue={yearEndDate} onChange={handleYearEndChange} required/>
              <CustomDatePicker label='Year Start Date' name='weekStartDate' defaultValue={yearStartDate} disabled />
            </>
          }

          <Btn htmlType='submit' className='mt-0 sm:mt-8'> Search </Btn>
        </div>
      </Form>

      <section className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 md:gap-x-8 mb-8'>
        {renderTabs()}
      </section>

      <Table
        columns={columns}
        scroll={{ x: true }}
        rowKey={(record) => record.railId}
        dataSource={dataSource}
        bordered
        pagination={{
          pageSize: 5,
          showSizeChanger: true, 
          pageSizeOptions: ['5', '10', '20'],
        }}
      />
    </>
  )
}

export default AiSystem