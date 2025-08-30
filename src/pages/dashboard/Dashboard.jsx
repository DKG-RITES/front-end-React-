import React, { useContext } from 'react'
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import {HomeOutlined, IdcardOutlined, FileTextOutlined, RobotOutlined, LineChartOutlined, ProfileOutlined, UserOutlined} from '@ant-design/icons';
import Home from './home/Home';
import Duty from './duty/Duty';
import Records from './records/Records';
import AiSystem from './aiSystem/AiSystem';
import DataAnalysis from './dataAnalysis/DataAnalysis';
import IsoReports from './isoReports/IsoReports';
import Admin from './admin/Admin';
import { ActiveTabContext } from '../../context/dashboardActiveTabContext';

const { Search } = Input;


const dashboardTabItems = [
  {
    id: 1,
    title: 'Home',
    icon: <HomeOutlined />,
    roles: ['INSPECTING_ENGINEER', 'MANAGER', 'LOCAL_ADMIN', 'MAIN_ADMIN']
  },
  {
    id: 2,
    title: 'Duty',
    icon: <IdcardOutlined />,
    roles: ['INSPECTING_ENGINEER', 'MANAGER', 'LOCAL_ADMIN', 'MAIN_ADMIN']
  },
  {
    id: 3,
    title: 'Records',
    icon: <FileTextOutlined />,
    roles: ['MANAGER', 'LOCAL_ADMIN', 'MAIN_ADMIN']
  },
  {
    id: 4,
    title: 'AI System',
    icon: <RobotOutlined />,
    roles: ['LOCAL_ADMIN', 'MAIN_ADMIN']
  },
  {
    id: 5,
    title: 'Data Analysis',
    icon: <LineChartOutlined />,
    roles: ['MANAGER', 'LOCAL_ADMIN', 'MAIN_ADMIN']
  },
  {
    id: 6,
    title: 'ISO Reports',
    icon: <ProfileOutlined />,
    roles: ['INSPECTING_ENGINEER', 'MANAGER', 'LOCAL_ADMIN', 'MAIN_ADMIN']
  },
  {
    id: 7,
    title: 'Admin',
    icon: <UserOutlined />,
    roles: ['LOCAL_ADMIN', 'MAIN_ADMIN']
  },
]

const Dashboard = () => {
  const {activeTab, setActiveTab} = useContext(ActiveTabContext)
  const { userType } = useSelector(state => state.auth);

  // Filter tabs based on user role
  const getAccessibleTabs = () => {
    if (!userType) return [];

    return dashboardTabItems.filter(item => {
      // Main Admin has access to all tabs
      if (userType === 'MAIN_ADMIN') return true;

      // Check if user's role is in the allowed roles for this tab
      return item.roles.includes(userType);
    });
  };

  const accessibleTabs = getAccessibleTabs();

  const renderDashboardTabItems = () =>
    accessibleTabs.map(item=> {
      return (
        <div
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`cursor-pointer ${activeTab === item.id ? 'border-b-2 border-pink' : ''}`}
        >
          <div className="flex flex-col items-center gap-1">
            <span className='dashboard-tab-icon'>{item.icon}</span>
            <span className='text-center w-full'>{item.title}</span>
          </div>
          </div>
      )
    })

    const renderTab = () => {
      switch (activeTab){
        case 1:
          return <Home />
        case 2:
          return <Duty />
        case 3:
          return <Records />
        case 4:
          return <AiSystem />
        case 5:
          return <DataAnalysis />
        case 6:
          return <IsoReports />
        case 7:
          return <Admin />
        default:
          break
      }
    }

  return (
    <div className='flex flex-col gap-4 md:gap-8 bg-white p-4 w-full md:w-4/5 mx-auto h-[100vh] md:h-fit'>
    <section>
      <Search placeholder='Search' className='dashboard-search' />
    </section>
    <section>
    <div className={`dashboard-tabs grid gap-4 bg-darkBlue rounded text-offWhite p-4 ${
      accessibleTabs.length <= 3 ? 'grid-cols-3' :
      accessibleTabs.length <= 4 ? 'grid-cols-4' :
      accessibleTabs.length <= 6 ? 'grid-cols-3 md:grid-cols-6' :
      'grid-cols-2 md:grid-cols-4 lg:grid-cols-7'
    }`}>
      {renderDashboardTabItems()}
    </div>
    </section>
    <section>
      {renderTab()}
    </section>
    </div>
  )
}

export default Dashboard