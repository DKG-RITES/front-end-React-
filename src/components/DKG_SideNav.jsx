import { Divider, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOutlined,
  ForkOutlined,
  RadarChartOutlined,
  BarChartOutlined,
  FilePdfOutlined,
  BuildOutlined,
  BranchesOutlined,
  CompassOutlined,
  DeploymentUnitOutlined,
  BarsOutlined,
  ToolOutlined,
  FundOutlined,
  DatabaseOutlined,
  AuditOutlined,
  ExperimentOutlined,
  ControlOutlined,
  CheckOutlined,
  FileDoneOutlined,
  EyeOutlined,
  FileSearchOutlined,
  FlagOutlined,
  SendOutlined,
  MessageOutlined,
  BankOutlined,
  InfoCircleOutlined,
  FireOutlined,
  HomeOutlined,
  LogoutOutlined,
  FileTextOutlined,
  RobotOutlined,
  LineChartOutlined,
  ProfileOutlined,
  UserOutlined,
  HourglassOutlined,
  AppstoreAddOutlined,
  IdcardOutlined,
  WarningOutlined
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
    path: "/",
  },
  {
    key: "2",
    icon: <IdcardOutlined />,
    label: "Duty",
    items: [
      {
        key: "2.1",
        icon: <BankOutlined />,
        label: "Duty Home",
        activeTab: 2,
        path: "/",
      },
      {
        key: "2.2",
        icon: <MessageOutlined />,
        label: "SMS",
        items: [
          {
            key: "2.2.1",
            icon: <SendOutlined />,
            label: "SMS Duty Start",
            path: "/sms/dutyStart",
          },
          {
            key: "2.2.2",
            icon: <FlagOutlined />,
            label: "SMS Duty End",
            path: "/sms/dutyEnd",
            items: [
              {
                key: "2.2.2.1",
                icon: <BankOutlined />,
                label: "SMS Duty End Home",
                path: "/sms/dutyEnd",
              },
              {
                key: "2.2.2.2",
                icon: <FileSearchOutlined />,
                label: "SMS Summary",
                path: "/sms/heatSummary",
              },
              {
                key: "2.2.2.3",
                icon: <EyeOutlined />,
                label: "Bloom Inspection",
                path: "/sms/bloomInspection",
              },
              {
                key: "2.2.2.4",
                icon: <BarChartOutlined />,
                label: "Shift Reports",
                items: [
                  {
                    key: "2.2.2.4.1",
                    icon: <ExperimentOutlined />,
                    label: "Shift Reports Home",
                    path: "/sms/shiftReports",
                  },
                  {
                    key: "2.2.2.4.2",
                    icon: <FireOutlined />,
                    label: "Heat List",
                    path: "/sms/shiftReports/heatList",
                  },
                  {
                    key: "2.2.2.4.3",
                    icon: <CheckOutlined />,
                    label: "Check List",
                    path: "/sms/shiftReports/checkList",
                  },
                  {
                    key: "2.2.2.4.4",
                    icon: <FileDoneOutlined />,
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
        key: "2.3",
        icon: <AuditOutlined />,
        label: "Rolling Stage",
        items: [
          {
            key: "2.3.1",
            icon: <SendOutlined />,
            label: "Stage Start Duty",
            path: "/stage/startDuty",
          },
          {
            key: "2.3.2",
            icon: <FlagOutlined />,
            label: "Stage Duty End",
            items: [
              {
                key: "2.3.2.1",
                icon: <BankOutlined />,
                label: "Stage Duty End Home",
                path: "/stage/home",
              },
              {
                key: "2.3.2.2",
                icon: <ControlOutlined />,
                label: "Rolling Stage Control",
                items: [
                  {
                    key: "2.3.2.2.1",
                    icon: <ControlOutlined />,
                    label: "Rail Control",
                    path: "/stage/rollingControl"
                  },
                  {
                    key: "2.3.2.2.2",
                    icon: <HourglassOutlined />,
                    label: "Control Sample",
                    path: "/stage/rollingControl/rollingControlSample"
                  },
                  // {
                  //   key: "2.3.2.2.3",
                  //   icon: <ExclamationCircleOutlined />,
                  //   label: "Control Sample for IRS52",
                  //   path: "/stage/rollingControl/rollingControlSampleIRS52"
                  // },
                  // {
                  //   key: "2.3.2.2.4",
                  //   icon: <ThunderboltOutlined />,
                  //   label: "Control Sample for 60E1A1",
                  //   path: "/stage/rollingControl/rollingControlSample60E1A1"
                  // },
                ]
              },
              {
                key: "2.3.2.5",
                icon: <ExperimentOutlined />,
                label: "Rolling Verification",
                path: "/stage/rollingVerification"
              },
              {
                key: "2.3.2.6",
                icon: <ExperimentOutlined />,
                label: "Finishing Verification",
                path: "/stage/finishingVerification"
              },
              {
                key: "2.3.2.3",
                icon: <ExperimentOutlined />,
                label: "Test Sample Marking",
                items: [
                  {
                    key: "2.3.2.3.1",
                    icon: <AppstoreAddOutlined />,
                    label: "Test Sample List",
                    path: "/stage/testSampleMarkingList"
                  },
                  {
                    key: "2.3.2.3.2",
                    icon: <BookOutlined />,
                    label: "New Sample Declaration",
                    path: "/stage/newTestSampleDeclaration"
                  }
                ]
              },
              {
                key: "2.3.2.4",
                icon: <ForkOutlined />,
                label: "HT Sequence",
                path: "/stage/htSequence",
              }
            ]
          },
        ],
      },
      {
        key: "2.4",
        icon: <RadarChartOutlined />,
        label: "NDT",
        items: [
          {
            key: "2.4.1",
            icon: <SendOutlined />,
            label: "NDT Start Duty",
            path: "/ndt/startDuty",
          },
          {
            key: "2.4.2",
            icon: <FlagOutlined />,
            label: "NDT Duty End",
            items: [
              {
                key: '2.4.2.1',
                label: "NDT Duty End Home",
                icon: <BankOutlined />,
                path: "/ndt/home",
              },
              {
                key: "2.4.2.2",
                icon: <BarChartOutlined />,
                label: "Calibration",
                path: "/ndt/calibration",
              },
              // {
              //   key: "2.4.2.3",
              //   icon: <FilePdfOutlined />,
              //   label: "Report",
              //   path: "/ndt/report",
              // },
              {
                key: '2.4.2.3',
                icon: <FileDoneOutlined />,
                label: 'Shift Summary',
                path: '/ndt/shiftSummary',
              },
            ]
          }
        ],
      },
      {
        key: "2.5",
        icon: <RadarChartOutlined />,
        label: "Testing",
        items: [
          {
            key: "2.5.17",
            icon: <FlagOutlined />,
            label: "Testing Start Duty",
            path: "/testing/startDuty"
          },
          {
            key: "2.5.1",
            icon: <FlagOutlined />,
            label: "Testing Home",
            items: [
              {
                key: '2.5.1.1',
                label: "Testing End Duty",
                icon: <BankOutlined />,
                path: "/testing/home",
              },
              {
                key: "2.5.1.2",
                icon: <BarChartOutlined />,
                label: "Pending Test Samples",
                path: "/testing/pendingTestSamples",
              },
              {
                key: "2.5.1.3",
                icon: <FilePdfOutlined />,
                label: "Shift Testing Report",
                path: "/testing/testingReport"
              },
              {
                key: "2.5.1.4",
                icon: <FilePdfOutlined />,
                label: "Heat Pending for Testing",
                path: "/testing/heatPending"
              }
            ]
          }
        ],
      },
      {
        key: "2.6",
        icon: <EyeOutlined />,
        label: "Visual Inspection",
        items: [
          {
            key: "2.6.1",
            icon: <SendOutlined />,
            label: "VI Duty Start",
            path: "/visual/startDuty",
          },
          {
            key: "2.6.2",
            icon: <FlagOutlined />,
            label: "VI Duty End",
            items: [
              {
                key: "2.6.2.1",
                icon: <BankOutlined />,
                label: "VI Duty End Home",
                path: "/visual/home",
              },
              {
                key: "2.6.2.3",
                icon: <BranchesOutlined />,
                label: "Inspection",
                path: "/visual/inspection",
              },
              {
                key: "2.6.2.4",
                icon: <FileSearchOutlined />,
                label: "Visual Inspection Summary",
                path: "/visual/summary",
              },
            ],
          },
        ],
      },
      {
        key: "2.7",
        icon: <BuildOutlined />,
        label: "Welding Inspection",
        items: [
          {
            key: "2.7.1",
            icon: <SendOutlined />,
            label: "Welding Duty Start",
            path: "/welding/startDuty",
          },
          {
            key: "2.7.2",
            icon: <FlagOutlined />,
            label: "Welding Duty End",
            items: [
              {
                key: "2.7.2.1",
                icon: <BankOutlined />,
                label: "Welding Duty End Home",
                path: "/welding/home",
              },
              {
                key: "2.7.2.2",
                icon: <BranchesOutlined />,
                label: "New Welding Inspection",
                path: "/welding/newWeldInspection",
              },
              {
                key: "2.7.2.3",
                icon: <WarningOutlined />,
                label: "Held or Rejected Panel Inspection",
                path: "/welding/heldRejectedPanel",
              },
              {
                key: "2.7.2.4",
                icon: <WarningOutlined />,
                label: "Weld Test Sample",
                path: "/welding/testSample",
              },
              {
                key: "2.7.2.5",
                icon: <FileSearchOutlined />,
                label: "Welding Inspection Summary",
                path: "/welding/shiftSummary",
              },
            ],
          },
        ],
      },
      {
        key: "2.8",
        icon: <CompassOutlined />,
        label: "Short Rail Inspection",
        items: [
          {
            key: "2.8.1",
            icon: <AppstoreAddOutlined />,
            label: "SRI Start Duty",
            path: "/srInspection",
          },
          {
            key: "2.8.2",
            icon: <FlagOutlined />,
            label: "Short Rail Inspection Home",
            items: [
              {
                key: "2.8.2.1",
                icon: <BankOutlined />,
                label: "SR Inspection Home",
                path: "/srInspection/home",
              },
              {
                key: "2.8.2.2",
                icon: <DeploymentUnitOutlined />,
                label: "New SR Inspection",
                path: "/srInspection/addNewInspection",
              },
              {
                key: "2.8.2.3",
                icon: <InfoCircleOutlined />,
                label: "Other WS Remarks",
                path: "/srInspection/wsRemarks",
              },
            ],
          },
        ],
      },
      {
        key: "2.9",
        icon: <DatabaseOutlined />,
        label: "QCT",
        items: [
          {
            key: "2.9.1",
            icon: <AppstoreAddOutlined />,
            label: "QCT Start Duty",
            path: "/qct/startDuty",
          },
          {
            key: "2.9.2",
            icon: <AppstoreAddOutlined />,
            label: "QCT Sample List",
            path: "/qct/sampleList",
          },
          {
            key: "2.9.3",
            icon: <BarsOutlined />,
            label: "New Sample Declaration",
            path: "/qct/newSampleDeclaration",
          },
        ],
      },
      {
        key: "2.10",
        icon: <ToolOutlined />,
        label: "Calibration",
        items: [
          // {
          //   key: "2.10.1",
          //   icon: <AppstoreAddOutlined />,
          //   label: "Calibration Start Duty",
          //   path: "/calibration/startDuty",
          // },
          {
            key: "2.10.1",
            icon: <AppstoreAddOutlined />,
            label: "Calibration List",
            path: "/calibration/list",
          },
          {
            key: "2.10.2",
            icon: <FundOutlined />,
            label: "New / Modify Calibration List",
            path: "/calibration/newModifyCalibration",
          },
          {
            key: "2.10.3",
            icon: <DatabaseOutlined />,
            label: "Bulk Calibration",
            path: "/calibration/bulkCalibration",
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

    if (item.items) {
      for (const child of item.items) {
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
    if (!item.items) {
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
        {item.items.map((child) => displaySideNavItems(child))}
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
        width={400}
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