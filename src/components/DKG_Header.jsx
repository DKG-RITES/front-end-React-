import React from "react";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { MenuOutlined, IdcardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import IconBtn from "./DKG_IconBtn"

const Header = ({toggleCollapse}) => {
  const navigate = useNavigate();
  const { firstName, lastName, userType, userId, employeeId } = useSelector(state => state.auth);

  // Combine first name and last name for display
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : 'User';

  // Use employeeId if available, fallback to userId for backward compatibility
  const displayEmployeeId = employeeId || userId;

  return (
    <header className="bg-offWhite shadow-md py-4 px-4 flex justify-between items-center sticky top-0 w-full z-20">
      <div className="flex gap-4 items-center">
        <span>
          <IconBtn icon={MenuOutlined} className="shadow-none"  onClick={toggleCollapse}/>
        </span>
        <span onClick={() => navigate('/')}>
          <Logo height={40} width={100} />
        </span>
      </div>
      {/* Unified User Information Block */}
      <div className="flex items-center">
        {displayEmployeeId && (
          <div className="bg-white border border-gray-200 rounded-lg px-2 md:px-4 py-2 md:py-3 shadow-sm hover:shadow-md transition-all duration-200">
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center gap-4">
              {/* Employee ID Badge */}
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-md px-3 py-1.5">
                <IdcardOutlined className="text-blue-600 text-sm" />
                <div className="text-sm">
                  <span className="text-gray-600 font-medium">Employee ID:</span>
                  <span className="text-blue-700 font-bold ml-1">{displayEmployeeId}</span>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="w-px h-8 bg-gray-200"></div>

              {/* User Information */}
              <div className="text-right">
                <div className="font-semibold text-gray-800 text-base">
                  Hello, {fullName}!
                </div>
                {userType && (
                  <div className="text-sm text-gray-600 mt-0.5">
                    {userType.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="flex items-center gap-2 mb-1">
                <IdcardOutlined className="text-blue-600 text-xs" />
                <span className="text-xs text-gray-600 font-medium">ID:</span>
                <span className="text-xs text-blue-700 font-bold">{displayEmployeeId}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-800 text-sm">{fullName}</div>
                {userType && (
                  <div className="text-xs text-gray-600">
                    {userType.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
