import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Card, Typography, Divider, Row, Col } from 'antd'
import {
  UserOutlined,
  CalendarOutlined,
  HomeOutlined,
  IdcardOutlined,
  FileTextOutlined,
  RobotOutlined,
  LineChartOutlined,
  ProfileOutlined,
  SettingOutlined
} from '@ant-design/icons'
import TableComponent from '../../../components/DKG_Table'
import { ActiveTabContext } from '../../../context/dashboardActiveTabContext'
import { hasPermission } from '../../../utils/permissions'

const { Title, Text } = Typography;

const Home = () => {
  const { firstName, lastName, userType } = useSelector(state => state.auth);
  const { setActiveTab } = useContext(ActiveTabContext);

  // Combine first name and last name for display
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : 'User';

  // Get current date and time
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Navigation cards for LOCAL_ADMIN users
  const navigationCards = [
    {
      id: 1,
      title: 'Home',
      icon: <HomeOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      description: 'Dashboard Overview',
      tabId: 1,
      bgColor: '#f0f9ff',
      borderColor: '#1890ff'
    },
    {
      id: 2,
      title: 'Duty',
      icon: <IdcardOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
      description: 'Manage Duties',
      tabId: 2,
      bgColor: '#f6ffed',
      borderColor: '#52c41a'
    },
    {
      id: 3,
      title: 'Records',
      icon: <FileTextOutlined style={{ fontSize: '32px', color: '#fa8c16' }} />,
      description: 'View Records',
      tabId: 3,
      bgColor: '#fff7e6',
      borderColor: '#fa8c16'
    },
    {
      id: 4,
      title: 'AI System',
      icon: <RobotOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
      description: 'AI Analysis',
      tabId: 4,
      bgColor: '#f9f0ff',
      borderColor: '#722ed1'
    },
    {
      id: 5,
      title: 'Data Analysis',
      icon: <LineChartOutlined style={{ fontSize: '32px', color: '#eb2f96' }} />,
      description: 'Analytics Dashboard',
      tabId: 5,
      bgColor: '#fff0f6',
      borderColor: '#eb2f96'
    },
    {
      id: 6,
      title: 'ISO Reports',
      icon: <ProfileOutlined style={{ fontSize: '32px', color: '#13c2c2' }} />,
      description: 'Generate Reports',
      tabId: 6,
      bgColor: '#e6fffb',
      borderColor: '#13c2c2'
    },
    {
      id: 7,
      title: 'Admin',
      icon: <SettingOutlined style={{ fontSize: '32px', color: '#f5222d' }} />,
      description: 'User Management',
      tabId: 7,
      bgColor: '#fff1f0',
      borderColor: '#f5222d'
    }
  ];

  // Filter cards based on user permissions
  const getAccessibleCards = () => {
    if (!userType) return [];

    return navigationCards.filter(card => {
      // Map card IDs to permissions
      const cardPermissions = {
        1: 'home',
        2: 'duty',
        3: 'records',
        4: 'ai-system',
        5: 'data-analysis',
        6: 'iso-reports',
        7: 'admin'
      };

      const requiredPermission = cardPermissions[card.id];
      return hasPermission(userType, requiredPermission);
    });
  };

  const handleCardClick = (tabId) => {
    setActiveTab(tabId);
  };

  const dataSource = [
    {
      date: "2024-11-18",
      shift: "A",
      sms: "SMS2",
      casterNo: "Caster1",
      railGrade: "GradeA",
      noOfHeatsCasted: 5,
      noOfHeatsRejected: 1,
      noOfDivertedHeats: 2,
      rejectedHeatNumbers: "heat003",
      weightOfHeatsCasted: 50.0,
      weightOfPrimeBlooms: 40.0,
      weightOfCOBlooms: 8.0,
      weightOfAcceptedBlooms: 48.0,
      weightOfRejectedBlooms: 2.0,
    },
    {
      date: "2024-11-19",
      shift: "C",
      sms: "SMS3",
      casterNo: "Caster2",
      railGrade: "GradeB",
      noOfHeatsCasted: 6,
      noOfHeatsRejected: 2,
      noOfDivertedHeats: 1,
      rejectedHeatNumbers: "heat007",
      weightOfHeatsCasted: 60.0,
      weightOfPrimeBlooms: 45.0,
      weightOfCOBlooms: 10.0,
      weightOfAcceptedBlooms: 55.0,
      weightOfRejectedBlooms: 5.0,
    },
    {
      date: "2024-11-20",
      shift: "B",
      sms: "SMS1",
      casterNo: "Caster3",
      railGrade: "GradeC",
      noOfHeatsCasted: 4,
      noOfHeatsRejected: 0,
      noOfDivertedHeats: 1,
      rejectedHeatNumbers: null,
      weightOfHeatsCasted: 40.0,
      weightOfPrimeBlooms: 35.0,
      weightOfCOBlooms: 4.0,
      weightOfAcceptedBlooms: 39.0,
      weightOfRejectedBlooms: 1.0,
    },
    {
      date: "2024-11-21",
      shift: "A",
      sms: "SMS2",
      casterNo: "Caster4",
      railGrade: "GradeA",
      noOfHeatsCasted: 7,
      noOfHeatsRejected: 1,
      noOfDivertedHeats: 3,
      rejectedHeatNumbers: "heat012",
      weightOfHeatsCasted: 70.0,
      weightOfPrimeBlooms: 50.0,
      weightOfCOBlooms: 15.0,
      weightOfAcceptedBlooms: 65.0,
      weightOfRejectedBlooms: 5.0,
    },
    {
      date: "2024-11-22",
      shift: "C",
      sms: "SMS3",
      casterNo: "Caster5",
      railGrade: "GradeD",
      noOfHeatsCasted: 3,
      noOfHeatsRejected: 0,
      noOfDivertedHeats: 0,
      rejectedHeatNumbers: null,
      weightOfHeatsCasted: 30.0,
      weightOfPrimeBlooms: 28.0,
      weightOfCOBlooms: 1.5,
      weightOfAcceptedBlooms: 29.5,
      weightOfRejectedBlooms: 0.5,
    },
  ];
  

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      searchable: true, // Enable search
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
      filterable: true, // Enable filter
    },
    {
      title: 'SMS',
      dataIndex: 'sms',
      key: 'sms',
      filterable: true, // Enable filter
    },
    {
      title: 'Caster Number',
      dataIndex: 'casterNo',
      key: 'casterNo',
      searchable: true, // Enable search
    },
    {
      title: 'Rail Grade',
      dataIndex: 'railGrade',
      key: 'railGrade',
      filterable: true, // Enable filter
    },
    {
      title: 'Number of Heats Casted',
      dataIndex: 'noOfHeatsCasted',
      key: 'noOfHeatsCasted',
    },
    {
      title: 'Number of Heats Rejected',
      dataIndex: 'noOfHeatsRejected',
      key: 'noOfHeatsRejected',
    },
    {
      title: 'Number of Diverted Heats',
      dataIndex: 'noOfDivertedHeats',
      key: 'noOfDivertedHeats',
    },
    {
      title: 'Rejected Heat Numbers',
      dataIndex: 'rejectedHeatNumbers',
      key: 'rejectedHeatNumbers',
    },
    {
      title: 'Weight of Heats Casted',
      dataIndex: 'weightOfHeatsCasted',
      key: 'weightOfHeatsCasted',
    },
    {
      title: 'Weight of Prime Blooms',
      dataIndex: 'weightOfPrimeBlooms',
      key: 'weightOfPrimeBlooms',
    },
    {
      title: 'Weight of CO Blooms',
      dataIndex: 'weightOfCOBlooms',
      key: 'weightOfCOBlooms',
    },
    {
      title: 'Weight of Accepted Blooms',
      dataIndex: 'weightOfAcceptedBlooms',
      key: 'weightOfAcceptedBlooms',
    },
    {
      title: 'Weight of Rejected Blooms',
      dataIndex: 'weightOfRejectedBlooms',
      key: 'weightOfRejectedBlooms',
    },
  ];
  

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <Title level={2} className="mb-2 text-gray-800">
              <UserOutlined className="mr-3 text-blue-600" />
              Welcome, {fullName}!
            </Title>
            <Text className="text-gray-600 text-lg">
              {userType && userType.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
            </Text>
          </div>
          <div className="text-right">
            <div className="flex items-center text-gray-600 mb-1">
              <CalendarOutlined className="mr-2" />
              <Text>{currentDate}</Text>
            </div>
            <Text className="text-2xl font-bold text-blue-600">{currentTime}</Text>
          </div>
        </div>
      </Card>

      {/* Navigation Cards for LOCAL_ADMIN and MAIN_ADMIN */}
      {(userType === 'LOCAL_ADMIN' || userType === 'MAIN_ADMIN') && (
        <>
          <Divider orientation="left">
            <Title level={3}>Quick Access</Title>
          </Divider>

          <Row gutter={[16, 16]} className="mb-6">
            {getAccessibleCards().map(card => (
              <Col xs={12} sm={8} md={6} lg={6} xl={4} key={card.id}>
                <Card
                  hoverable
                  className="text-center h-full transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: card.bgColor,
                    borderColor: card.borderColor,
                    borderWidth: '2px'
                  }}
                  onClick={() => handleCardClick(card.tabId)}
                  bodyStyle={{ padding: '20px 16px' }}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="mb-3">
                      {card.icon}
                    </div>
                    <Title level={4} className="mb-2" style={{ color: card.borderColor }}>
                      {card.title}
                    </Title>
                    <Text className="text-gray-600 text-sm">
                      {card.description}
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      <Divider orientation="left">
        <Title level={3}>Dashboard Overview</Title>
      </Divider>

      {/* Dashboard content */}
      <Card>
        <Text className="text-gray-600">
          Welcome to the RITES Quality Assurance System.
          {(userType === 'LOCAL_ADMIN' || userType === 'MAIN_ADMIN')
            ? ' Use the quick access cards above or the navigation menu to access different modules based on your role permissions.'
            : ' Use the navigation menu to access different modules based on your role permissions.'
          }
        </Text>
      </Card>
    </div>
  )
}

export default Home
