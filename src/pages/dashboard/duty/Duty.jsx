import React from 'react'
import {HomeOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Tab from '../../../components/DKG_Tab';
const dutyItemTabs = [
  {
    id: 1,
    title: 'SMS',
    icon: <MessageOutlined />,
    link: '/sms/dutyStart'
  },
  {
    id: 2,
    title: 'Rolling Stage',
    icon: <AuditOutlined />,
    link: 'stage/startDuty'
  },
  {
    id: 3,
    title: 'NDT',
    icon: <RadarChartOutlined />,
    link: 'ndt/startDuty'
  },
  {
    id: 4,
    title: 'Testing',
    icon: <DoubleRightOutlined />
  },
  {
    id: 5,
    title: 'Visual Inspection',
    icon: <HddOutlined />,
    link: '/visual/startDuty'
  },
  {
    id: 6,
    title: 'Welding Inspection',
    icon: <DeploymentUnitOutlined />
  },
  {
    id: 7,
    title: 'Short Rail Inspection',
    icon: <CompassOutlined />,
    link: 'srInspection'
  },
  {
    id: 8,
    title: 'QCT',
    icon: <DatabaseOutlined />,
    link: 'qct/sampleList'
  },
  {
    id: 9,
    title: 'Calibration',
    icon: <ToolOutlined />,
    link: 'calibration/list'
  },
  {
    id: 10,
    title: 'Info',
    icon: <TeamOutlined />
  },
]

const Duty = () => {
  const navigate = useNavigate()
  const renderDutyItemTabs = () =>
    dutyItemTabs.map(item => {
      return (
        <Tab  title={item.title} icon={item.icon} onClick={()=> navigate(item.link)} />
      )
    })
  return (
    <section>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {renderDutyItemTabs()}
      </div>
    </section>
  )
}

export default Duty
