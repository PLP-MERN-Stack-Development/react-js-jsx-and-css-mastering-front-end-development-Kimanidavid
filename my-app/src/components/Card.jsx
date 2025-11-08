import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ children, className = '', hover = false }) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg shadow-md p-6 
        transition-all duration-200
        animate-bounce-in
        ${hover ? 'hover:shadow-xl hover:scale-[1.02]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool
}

export default Card