import { Divider, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  RobotOutlined,
  LineChartOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import IconBtn from "./DKG_IconBtn";
import { useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { ActiveTabContext } from "../context/dashboardActiveTabContext";

const items = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: "Home",
    activeTab: 1,
    path: "/",
  },
  {
    key: "2",
    icon: <BellOutlined />,
    label: "Duty",
    children: [
      {
        key: "2.1",
        icon: <BellOutlined />,
        label: "Duty Home",
        activeTab: 2,
        path: "/",
      },
      {
        key: "2.2",
        icon: <BellOutlined />,
        label: "SMS",
        children: [
          {
            key: "2.2.1",
            icon: <BellOutlined />,
            label: "SMS Duty Start",
            path: "/sms/dutyStart",
          },
          {
            key: "2.2.2",
            icon: <BellOutlined />,
            label: "SMS Duty End",
            path: "/sms/dutyEnd",
            children: [
              {
                key: "2.2.2.1",
                icon: <BellOutlined />,
                label: "SMS Duty End Home",
                path: "/sms/dutyEnd",
              },
              {
                key: "2.2.2.2",
                icon: <BellOutlined />,
                label: "SMS Summary",
                path: "/sms/heatSummary",
              },
              {
                key: "2.2.2.3",
                icon: <BellOutlined />,
                label: "Bloom Inspection",
                path: "/sms/bloomInspection",
              },
              {
                key: "2.2.2.1",
                icon: <BellOutlined />,
                label: "Shift Reports",
                children: [
                  {
                    key: "2.2.2.1.1",
                    icon: <BellOutlined />,
                    label: "Shift Reports Home",
                    path: "/sms/shiftReports",
                  },
                  {
                    key: "2.2.2.1.2",
                    icon: <BellOutlined />,
                    label: "Heat List",
                    path: "/sms/shiftReports/heatList",
                  },
                  {
                    key: "2.2.2.1.3",
                    icon: <BellOutlined />,
                    label: "Check List",
                    path: "/sms/shiftReports/checkList",
                  },
                  {
                    key: "2.2.2.1.4",
                    icon: <BellOutlined />,
                    label: "Verification",
                    path: "/sms/shiftReports/verification",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: '2.3',
        icon: <BellOutlined />,
        label: 'Rolling Stage',
        children: [
          {
            key: '2.3.1',
            icon: <HomeOutlined />,
            label: 'Start Duty',
            path: '/stage/startDuty',
          },
          {
            key: '2.3.2',
            icon: <HomeOutlined />,
            label: 'Stage Home',
            path: '/stage/home',
          },
        ],
      },
      {
        key: '2.4',
        icon: <BellOutlined />,
        label: 'NDT',
        children: [
          {
            key: '2.4.1',
            icon: <HomeOutlined />,
            label: 'Start Duty',
            path: '/ndt/startDuty',
          },
          {
            key: '2.4.2',
            icon: <HomeOutlined />,
            label: 'NDT Home',
            path: '/ndt/home',
          },
          {
            key: '2.4.3',
            icon: <HomeOutlined />,
            label: 'Calibration',
            path: '/ndt/calibration',
          },
          // {
          //   key: '2.3.4',
          //   icon: <HomeOutlined />,
          //   label: 'Shift Summary',
          //   path: '/ndt/shiftSummary',
          // },
          {
            key: '2.4.5',
            icon: <HomeOutlined />,
            label: 'Report',
            path: '/ndt/report',
          },
          // {
          //   key: '2.3.6',
          //   icon: <HomeOutlined />,
          //   label: 'Test Sample Marking',
          //   path: '/ndt/testSampleMarking',
          // },
        ],
      },
      {
        key: "2.6",
        icon: <BellOutlined />,
        label: "Visual Inspection",
        children: [
          {
            key: "2.6.1",
            icon: <HomeOutlined />,
            label: "VI Duty Start",
            path: "/visual/startDuty",
          },
          {
            key: "2.6.2",
            icon: <HomeOutlined />,
            label: "VI Duty End",
            children: [
              {
                key: "2.6.2.1",
                icon: <HomeOutlined />,
                label: "VI Duty End Home",
                path: "/visual/home",
              },
              {
                key: "2.6.2.3",
                icon: <HomeOutlined />,
                label: "Inspection",
                path: "/visual/inspection",
              },
              {
                key: "2.6.2.4",
                icon: <HomeOutlined />,
                label: "Shift Inspection Summary",
                path: "/visual/summary",
              },
              // {
              //   key: "2.6.2.5",
              //   icon: <HomeOutlined />,
              //   label: "Test Sample Marking",
              //   path: "/visual/summary",
              // },
            ]
          },
        ],
      },
    ],
  },
  {
    key: "3",
    icon: <FileTextOutlined />,
    label: "Record",
    activeTab: 3,
    path: "/",
  },
  {
    key: "4",
    icon: <RobotOutlined />,
    label: "AI System",
    activeTab: 4,
    path: "/",
  },
  {
    key: "5",
    icon: <LineChartOutlined />,
    label: "Data Analysis",
    activeTab: 5,
    path: "/",
  },
  {
    key: "6",
    icon: <ProfileOutlined />,
    label: "ISO Reports",
    activeTab: 6,
    path: "/",
  },
  {
    key: "7",
    icon: <UserOutlined />,
    label: "Admin",
    activeTab: 7,
    path: "/",
  },
];

const SideNav = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { setActiveTab, activeTab } = useContext(ActiveTabContext);
  const dispatch = useDispatch();

  const getSelectedKey = (item) => {
    if (item.path === currentPath) {
      return item.key;
    }

    if (item.children) {
      for (const child of item.children) {
        const key = getSelectedKey(child);
        if (key) {
          return key;
        }
      }
    }
    return null;
  };

  const selectedKey = items.reduce((acc, item) => {
    return acc || getSelectedKey(item);
  }, null);

  const handleMenuItemClick = (activeTab = null) => {
    setActiveTab(activeTab);
    if (window.innerWidth <= 768) {
      toggleCollapse();
    }
  };

  const displaySideNavItems = (item) => {
    if (!item.children) {
      return (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={() => handleMenuItemClick(item.activeTab)}
          className={`${
            activeTab === item.activeTab ? "ant-menu-item-selected" : ""
          } `}
        >
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      );
    }

    return (
      <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
        {item.children.map((child) => displaySideNavItems(child))}
      </Menu.SubMenu>
    );
  };
  const menuItems = items.map(displaySideNavItems);

  return (
    <Layout
      style={{ flex: 0 }}
      className={`absolute md:static h-full w-fit bg-offWhite z-10 !flex !flex-col transition-all duration-150 ${
        collapsed ? "-translate-x-full md:-translate-x-0" : ""
      }`}
    >
      <Sider
        width={360}
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapse}
        className="overflow-y-auto !bg-offWhite !w-[100vw] !flex-1 custom-sider-css"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={selectedKey ? [selectedKey] : []}
          className="!bg-offWhite"
        >
          {menuItems}
        </Menu>
      </Sider>
      <Divider className="m-0 w-4" />
      <IconBtn
        text="Logout"
        icon={LogoutOutlined}
        className="bg-offWhite overflow-hidden"
        onClick={() => dispatch(logout())}
      />
    </Layout>
  );
};

export default SideNav;