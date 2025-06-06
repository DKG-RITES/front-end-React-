import React from 'react'
import {LineChartOutlined, EyeOutlined, ExperimentOutlined, ToolOutlined, DatabaseOutlined, CompassOutlined, DeploymentUnitOutlined, RadarChartOutlined, AuditOutlined, MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Tab from '../../../components/DKG_Tab';

const dutyItemTabs = [
  {
    id: 1,
    title: 'SMS Record',
    icon: <MessageOutlined />,
    link: '/record/sms'
  },
  // {
  //   id: 2,
  //   title: 'Rolling Stage Record',
  //   icon: <AuditOutlined />,
  //   // link: '/stage/startDuty'
  // },
  {
    id: 3,
    title: 'NDT Record',
    icon: <RadarChartOutlined />,
    link: '/record/ndt'
  },
  // {
  //   id: 4,
  //   title: 'Testing Record',
  //   icon: <ExperimentOutlined />,
  //   // link:  '/testing/home'
  // },
  {
    id: 5,
    title: 'Visual Inspection Record',
    icon: <EyeOutlined />,
    link: '/record/vi'
  },
  {
    id: 6,
    title: 'Welding Inspection Record',
    icon: <DeploymentUnitOutlined />,
    link: '/record/welding'
  },
  // {
  //   id: 7,
  //   title: 'Short Rail Inspection Record',
  //   icon: <CompassOutlined />,
  //   // link: '/srInspection'
  // },
  {
    id: 8,
    title: 'QCT Record',
    icon: <DatabaseOutlined />,
    link: '/record/qct'
  },
  // {
  //   id: 9,
  //   title: 'Calibration Record',
  //   icon: <ToolOutlined />,
  //   // link: '/calibration/list'
  // },
  // {
  //   id: 10,
  //   title: 'Info Record',
  //   icon: <LineChartOutlined />
  // },
]


const Records = () => {
  const navigate = useNavigate()
  const renderRecordItemTabs = () =>
    dutyItemTabs.map(item => {
      return (
        <div onClick={() => navigate(item.link)} className="flex justify-between items-center  border border-darkBlueHover w-full p-2 px-4 gap-4 rounded-lg shadow-lg bg-gray-200">
        <span className="records-tab-icon">{item.icon}</span>
        <span className="font-medium">
          {item.title}
        </span>
      </div>
      )
    })
  return (
    <section>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {renderRecordItemTabs()}
    </div>
  </section>
  )
}

export default Records
