import { useContext } from 'react'
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
import { hasPermission } from '../../utils/permissions';

const { Search } = Input;


const dashboardTabItems = [
  {
    id: 1,
    title: 'Home',
    icon: <HomeOutlined />,
    permission: 'home'
  },
  {
    id: 2,
    title: 'Duty',
    icon: <IdcardOutlined />,
    permission: 'duty'
  },
  {
    id: 3,
    title: 'Records',
    icon: <FileTextOutlined />,
    permission: 'records'
  },
  {
    id: 4,
    title: 'AI System',
    icon: <RobotOutlined />,
    permission: 'ai-system'
  },
  {
    id: 5,
    title: 'Data Analysis',
    icon: <LineChartOutlined />,
    permission: 'data-analysis'
  },
  {
    id: 6,
    title: 'ISO Reports',
    icon: <ProfileOutlined />,
    permission: 'iso-reports'
  },
  {
    id: 7,
    title: 'Admin',
    icon: <UserOutlined />,
    permission: 'admin'
  },
]

const Dashboard = () => {
  const {activeTab, setActiveTab} = useContext(ActiveTabContext)
  const { userType } = useSelector(state => state.auth);

  // Filter tabs based on user permissions
  const getAccessibleTabs = () => {
    if (!userType) return [];

    return dashboardTabItems.filter(item => {
      return hasPermission(userType, item.permission);
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