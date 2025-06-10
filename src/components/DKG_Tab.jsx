import React from 'react'

const Tab = ({icon, title, onClick, key}) => {
  return (
    <div 
          key={key} 
          onClick={onClick}
          className={`cursor-pointer bg-darkBlue text-offWhite px-4 py-4 rounded-t-3xl rounded-l-3xl text-center`}
        >
          <span className='duty-tab-icon'>{icon}</span>
          <div className="mt-2">{title}</div> {/* Adjust margin as needed */}
        </div>
  )
}

export default Tab
