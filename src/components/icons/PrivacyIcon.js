import React from 'react';
import PropTypes from 'prop-types';

const PrivacyIcon = ({width, color}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <path
        fill={color}
        d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
      />
      <path d="M0 0h24v24H0z" />
    </g>
  </svg>
);

PrivacyIcon.defaultProps = {width: '100%', color: '#1D1F23'};
PrivacyIcon.propTypes = {width: PropTypes.string, color: PropTypes.string};

export default PrivacyIcon;
