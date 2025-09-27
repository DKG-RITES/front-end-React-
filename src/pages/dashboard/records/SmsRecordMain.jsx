import React from 'react'
import {LineChartOutlined, EyeOutlined, ExperimentOutlined, ToolOutlined, DatabaseOutlined, CompassOutlined, DeploymentUnitOutlined, RadarChartOutlined, AuditOutlined, MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Tab from '../../../components/DKG_Tab';
import SubHeader from '../../../components/DKG_SubHeader';

const SmsRecordMain = () => {
    const smsRecordTabs = [
        {
            id: 1,
            title: 'SMS Summary',
            icon: <MessageOutlined />,
            link: '/record/sms/summary'
          },
          {
            id: 2,
            title: 'Heat Summary',
            icon: <AuditOutlined />,
            link: '/record/sms/heat'
          },
    ]
    const navigate = useNavigate()
  const renderRecordItemTabs = () =>
    smsRecordTabs.map(item => {
      return (
        <>
        {/* // <Tab  title={item.title} icon={item.icon} onClick={()=> navigate(item.link)} /> */}

        <div onClick={() => navigate(item.link)} className="flex justify-between items-center  border border-darkBlueHover w-full p-2 px-4 gap-4 rounded-lg shadow-lg bg-gray-200">
        <span className="records-tab-icon">{item.icon}</span>
        <span className="font-medium">
          {item.title}
        </span>
      </div>
        </>
      )
    })


  return (
    <div className='flex flex-col gap-4 md:gap-2 bg-white p-4 w-full md:w-4/5 mx-auto h-[100vh] md:h-fit'>
    <section>
        <SubHeader title="SMS Records" link="/" />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {renderRecordItemTabs()}
    </div>
  </section>
    </div>
  )
}

export default SmsRecordMain
