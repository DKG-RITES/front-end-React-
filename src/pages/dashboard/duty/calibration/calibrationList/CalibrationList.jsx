import React, { useState, useEffect, useCallback } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../components/DKG_SubHeader'
import data from "../../../../../utils/frontSharedData/calibration/calibration.json";
import { Divider, Modal, Form } from 'antd';
import Btn from "../../../../../components/DKG_Btn"
import { useNavigate } from 'react-router-dom';
import { FilterFilled, EditOutlined } from '@ant-design/icons';
import IconBtn from '../../../../../components/DKG_IconBtn';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
import { useDispatch, useSelector } from 'react-redux';
import { endCalibrationDuty } from '../../../../../store/slice/calibrationDutySlice';
import { apiCall } from "../../../../../utils/CommonFunctions";
import GeneralInfo from '../../../../../components/DKG_GeneralInfo';
import TableComponent from '../../../../../components/DKG_Table';
import dayjs from "dayjs";
import { startCalibrationDuty } from '../../../../../store/slice/calibrationDutySlice';

const { instrumentMapping: sampleData } = data;

const CalibrationList = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [instrumentCategoryList, setInstrumentCategoryList] = useState([])
  const [instrumentList, setInstrumentList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate();

  const [formData, setFormData] = useState([])

  const determineShift = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 14) return 'A';
    if (currentHour >= 14 && currentHour < 22) return 'B';
    return 'C';
  };

  const calibrationGeneralInfo = useSelector((state) => state.calibrationDuty);
  const { token } = useSelector((state) => state.auth);


  useEffect(() => {
    const autoStartDuty = async () => {
      if (!calibrationGeneralInfo?.dutyId) {
        const currentDate = dayjs().format("DD/MM/YYYY");
        const shift = determineShift();
  
        try {
          await dispatch(startCalibrationDuty({
            startDate: currentDate,
            shift: shift
          })).unwrap();
        } catch (error) {
          console.error("Failed to start duty:", error);
        }
      }
    };
  
    autoStartDuty();
  }, [dispatch, calibrationGeneralInfo?.dutyId]);

  const populateData = useCallback(async () => {
    const instrumentCategoryList = Object.keys(sampleData).map(inst => {
      return {
        key: inst,
        value: inst
      }
    })

    setInstrumentCategoryList([...instrumentCategoryList]);

    try {
      const { data } = await apiCall(
        "GET",
        `/calibration/getAllLatestCalibrations`,
        token
      );
      const { responseData } = data;

      setFormData(responseData || [])
    } catch (error) {}
  }, [token, calibrationGeneralInfo.dutyId]);

  useEffect(()=> {
    populateData()
  }, [populateData])

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  useEffect(()=>{
    if(sampleData[formData.instrumentCategory]){
        const instrumentList = sampleData[formData.instrumentCategory].map(inst => {
        return {
            key: inst,
            value: inst
        }
        })
        setInstrumentList([...instrumentList])
    }
  }, [formData.instrumentCategory, instrumentCategoryList])

  const handleChange = (fieldName, value) => {
    setFormData(prev=>{
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleClick = () => {
    navigate('/calibration/bulkCalibration');
  }

  const handleClickSec = () => {
    navigate('/calibration/newModifyCalibration');
  }

  const handleClickTer = async () => {
    await dispatch(endCalibrationDuty(formData)).unwrap();
    navigate('/');
  }

  const columns = [
    {
        title: "S.No.",
        dataIndex: "serialNumber",
        key: "serialNumber",
        fixed: "left",
        align: "center",
        render: (_, __, index) => index+1
    },
    {
        title: "Instrument",
        dataIndex: "instrument",
        key: "instrument",
        align: "center",
        filterable: true
    },
    {
        title: "Detail",
        dataIndex: "detail",
        key: "detail",
        align: "center",
        filterable: true
    },
    {
        title: "Rail Section",
        dataIndex: "railSection",
        key: "railSection",
        align: "center",
        filterable: true
    },
    {
        title: "Serial Number",
        dataIndex: "serialNumber",
        key: "serialNumber",
        align: "center",
        searchable: true
    },
    // {
    //     title: "Gauge Status",
    //     dataIndex: "gaugeStatus",
    //     key: "gaugeStatus",
    //     align: "center",
    //     filterable: true
    // },
    {
        title: "Calibration Due Date",
        dataIndex: "calibrationValidUpto",
        key: "calibrationValidUpto",
        align: "center",
        filterable: true
    },
    {
        title: "Calibration Date",
        dataIndex: "calibrationDate",
        key: "calibrationDate",
        align: "center",
        filterable: true
    },
    {
        title: "Notification After Days",
        dataIndex: "notificationAfterDays",
        key: "notificationAfterDays",
        align: "center",
        filterable: true
    },
    {
        title: "Result",
        dataIndex: "result",
        key: "result",
        align: "center",
        filterable: true
    },
    {
      title: "Modify",
      fixed: "right",
      render: (_, record) => (
        <IconBtn 
          icon={EditOutlined} 
          onClick={() => navigate("/calibration/newModifyCalibration", 
            {
              state: {
                serialNumber: record.serialNumber
              }
            }
          )}
        />
      ),
    },
  ]

  return (
    <FormContainer>
      <SubHeader title="Calibration - List" link="/" />
      <GeneralInfo data={calibrationGeneralInfo} />

      <TableComponent dataSource={formData} columns={columns} />

      <Divider className='mt-0 mb-2' />

      <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2'>
        <div className='flex justify-center'>
          <Btn onClick={handleClick} className='sm:mt-0 md:mt-0'>Bulk Calibration</Btn>
        </div>

        <div className='flex justify-center'>
          <Btn onClick={handleClickSec} className='mt-2 sm:mt-0 md:mt-0'>Add New Calibration</Btn>
        </div>
      </div>
        <div className="mb-8"></div> {/* Add this for extra space after the button */}
              {/* </FormBody> */}



      

      <Modal title='Modify Calibration List' open={isModalOpen} onCancel={()=>setIsModalOpen(false)} footer={null}>
          <FormInputItem placeholder='Enter Heat Number' />
          <Btn>Add</Btn>
      </Modal>
    </FormContainer>
  )
}

export default CalibrationList