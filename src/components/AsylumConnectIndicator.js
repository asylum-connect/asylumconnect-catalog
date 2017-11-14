import React from 'react';

import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
  primary: {
    backgroundColor: theme.palette.primary[500], //fix this for non-resource-type checkboxes
    '&:hover': {
      color: theme.palette.primary[500]
    }
  },
  secondary: {
    backgroundColor: theme.palette.primary[500]
  },
  circle: {
    borderRadius: '50%',
    border: 'none',
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '1rem',
    width: '1rem',
    textAlign: 'center',
    color: theme.palette.common.white,
    fontWeight: '700',
    lineHeight: '1rem',
    fontSize: '0.7rem',
    marginLeft: '0.2rem',
    marginRight: '0.2rem'
  }
});

class AsylumConnectIndicator extends React.Component {
  render() {
    const { primary, secondary, circle } = this.props.classes;

    return (
      <div className={
        (this.props.className ? this.props.className : circle) + ' ' + 
        (this.props.color == 'secondary' ? secondary : primary)}>
        {this.props.children}
      </div>
    );
  };
}

export default withStyles(styles)(AsylumConnectIndicator);
