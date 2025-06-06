import React, { useState } from "react";
import SubHeader from "../../../../../components/DKG_SubHeader";
import FormContainer from "../../../../../components/DKG_FormContainer";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import data from "../../../../../utils/frontSharedData/weldingInspection/WeldingInspection.json";
import { Table } from 'antd';
import FormBody from "../../../../../components/DKG_FormBody";
import Btn from "../../../../../components/DKG_Btn";
import { useNavigate } from 'react-router-dom'
import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";
import { FilterFilled } from "@ant-design/icons";

const { weldData: sampleData, weldColumns, weldingInspectionGeneralInfo, lineNumberList } = data;

const WeldingSummary = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lineNumber: ''
  })

  const handleChange = (fieldName, value) => {
    setFormData(prev=>{
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleClick = () => {
    navigate('/welding/home')
  }

  return (
    <FormContainer>
        <SubHeader title="Welding Inspection - Shift Summary" link="/welding/home" />
        <GeneralInfo data={weldingInspectionGeneralInfo} />

        <FormBody initialValues={formData}>
          <div className='flex justify-center'>
            <div className='flex items-center gap-x-2'>
              <FilterFilled />
              <FormDropdownItem label='Line Number' name='lineNumber' dropdownArray={lineNumberList} valueField={'key'} visibleField={'value'} onChange={handleChange} required />
            </div>
          </div>
        </FormBody>

        <Table
          dataSource={sampleData}
          columns={weldColumns}
          scroll={{ x: true }}
          bordered
          pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          }}
        />

        <div className='flex justify-center mt-2'>
          <Btn onClick={handleClick} className='w-[25%]'>Go Home</Btn>
        </div>
    </FormContainer>
  )
}

export default WeldingSummary