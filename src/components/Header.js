import React from 'react';
import PropTypes from 'prop-types';

import NavDesktop from './navigation/NavDesktop';
import NavMobile from './navigation/NavMobile';
import NavTablet from './navigation/NavTablet';

import withWidth from './withWidth';
import breakpoints from '../theme/breakpoints';

const Header = ({
  handleRequestOpen,
  handleLogOut,
  session,
  user,
  width
}) => {
  const isMobile = width < breakpoints['sm'];
  const isTablet = width < breakpoints['md'];
  if (isMobile) {
    return (
      <NavMobile
        handleLogOut={handleLogOut}
        handleRequestOpen={handleRequestOpen}
        session={session}
      />
    );
  } else if (isTablet) {
    return (
      <NavTablet
        handleLogOut={handleLogOut}
        handleRequestOpen={handleRequestOpen}
        session={session}
        user={user}
      />
    );
  } else {
    return (
      <NavDesktop
        handleLogOut={handleLogOut}
        handleRequestOpen={handleRequestOpen}
        session={session}
        user={user}
      />
    );
  }
};

Header.defaultProps = {
  session: null,
  user: null,
};

Header.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
  width: PropTypes.number.isRequired,
};

export default withWidth(Header);