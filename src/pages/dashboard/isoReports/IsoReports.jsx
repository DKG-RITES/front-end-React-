// import React from 'react'

// const IsoReports = () => {
//   return (
//     <div>
//       ISO Reports
//     </div>
//   )
// }

// export default IsoReports

import React from "react";
import VerificationIso from "./sms/VerificationIso";
import {
  LineChartOutlined,
  EyeOutlined,
  ExperimentOutlined,
  ToolOutlined,
  DatabaseOutlined,
  CompassOutlined,
  DeploymentUnitOutlined,
  RadarChartOutlined,
  AuditOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const IsoReports = () => {
  const navigate = useNavigate();

  const dutyItemTabs = [
    {
      id: 1,
      title: "SMS",
      icon: <MessageOutlined />,
      link: "/iso/sms",
    },
    {
      id: 2,
      title: "Rolling Stage",
      icon: <AuditOutlined />,
      link: '/iso/rolling'
    },
    {
      id: 3,
      title: "Visual Inspection",
      icon: <DatabaseOutlined />,
      link: '/iso/vi'
    },
    {
      id: 4,
      title: "Welding",
      icon: <RadarChartOutlined />,
      link: '/iso/welding'
    },
    {
      id: 5,
      title: "Short Rail Inspection",
      icon: <ToolOutlined />,
      link: '/iso/sri'
    },
    // {
    //   id: 3,
    //   title: "NDT",
    //   icon: <RadarChartOutlined />,
    //   link: "/record/ndt",
    // },
    // {
    //   id: 4,
    //   title: 'Testing',
    //   icon: <ExperimentOutlined />,
    //   // link:  '/testing/home'
    // },
    // {
    //   id: 5,
    //   title: 'Visual Inspection',
    //   icon: <EyeOutlined />,
    //   link: '/record/vi'
    // },
    // {
    //   id: 6,
    //   title: 'Welding Inspection',
    //   icon: <DeploymentUnitOutlined />,
    //   link: '/record/welding'
    // },
    // {
    //   id: 7,
    //   title: 'Short Rail Inspection',
    //   icon: <CompassOutlined />,
    //   // link: '/srInspection'
    // },
    // {
    //   id: 8,
    //   title: 'QCT',
    //   icon: <DatabaseOutlined />,
    //   // link: '/qct/sampleList'
    // },
    // {
    //   id: 9,
    //   title: 'Calibration',
    //   icon: <ToolOutlined />,
    //   // link: '/calibration/list'
    // },
    // {
    //   id: 10,
    //   title: 'Info Record',
    //   icon: <LineChartOutlined />
    // },
  ];

  const renderRecordItemTabs = () =>
    dutyItemTabs.map((item) => {
      return (
        <div
          onClick={() => navigate(item.link)}
          className="flex justify-between items-center  border border-darkBlueHover w-full p-2 px-4 gap-4 rounded-lg shadow-lg bg-gray-200 cursor-pointer"
        >
          <span className="records-tab-icon">{item.icon}</span>
          <span className="font-medium">{item.title}</span>
        </div>
      );
    });
  return (
    // <div>
    // <VerificationIso />
    <section>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {renderRecordItemTabs()}
    </div>
  </section>

    // </div>
  );
};

export default IsoReports;
