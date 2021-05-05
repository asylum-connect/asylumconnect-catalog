import React from 'react';
import PropTypes from 'prop-types';

const EditIcon = ({width, color}) => (
	<svg
		width={width}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			fill={color}
			d="M19.544 0C19.2107 0 18.864 0.133315 18.6107 0.386613L16.1711 2.82627L21.1704 7.82558L23.6101 5.38592C24.13 4.86599 24.13 4.02611 23.6101 3.50618L20.4905 0.386613C20.2239 0.119983 19.8906 0 19.544 0ZM14.7446 8.02483L15.9711 9.25133L3.89279 21.3297H2.6663V20.1032L14.7446 8.02483ZM0 18.9977L14.7446 4.25307L19.7439 9.25237L4.99931 23.997H0V18.9977Z"
		/>
	</svg>
);

EditIcon.defaultProps = {width: '100%', color: '#CC4747'};
EditIcon.propTypes = {width: PropTypes.string, color: PropTypes.string};

export default EditIcon;
