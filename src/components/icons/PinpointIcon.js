import React from 'react';
import PropTypes from 'prop-types';

const PinpointIcon = ({width}) => (
  <svg id="44c0518c-d0f1-4282-b202-c94290dedc68" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={width}><defs><clipPath id="6eb3861f-72ac-45a7-95c3-8eea9935166c"><path d="M25,37.5q8.77-11.39,8.77-16.23a8.77,8.77,0,1,0-17.53,0Q16.23,26.11,25,37.5Z" fill="none" clipRule="evenodd"/></clipPath><clipPath id="4a6d89f4-10f9-4b3e-88ba-c82b23b6eeca"><rect x="9.23" y="9.5" width="31" height="31" fill="none"/></clipPath><clipPath id="30212220-4f5f-43d7-9692-6b4b68fab2ad"><circle cx="24.82" cy="22.09" r="2.59" fill="none"/></clipPath></defs><title>icon-pinpoint</title><g clipPath="url(#6eb3861f-72ac-45a7-95c3-8eea9935166c)"><g clipPath="url(#4a6d89f4-10f9-4b3e-88ba-c82b23b6eeca)"><rect x="11.23" y="7.5" width="27.53" height="35" fill="#6a88c0"/></g></g><g clipPath="url(#30212220-4f5f-43d7-9692-6b4b68fab2ad)"><g clipPath="url(#4a6d89f4-10f9-4b3e-88ba-c82b23b6eeca)"><rect x="17.23" y="14.5" width="15.18" height="15.18" fill="#fff"/></g></g></svg>
);

PinpointIcon.defaultProps = { width: '100%' }
PinpointIcon.propTypes = { width: PropTypes.string }

export default PinpointIcon;
