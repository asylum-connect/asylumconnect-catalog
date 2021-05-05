import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const relativeSize = 1;

const defaultIconSize = {
  height: relativeSize + 'rem',
  width: relativeSize + 'rem',
};

const styles = (theme) => ({
  root: {
    marginLeft: '0',
    color: theme.palette.common.lightBlack, //fix this for non-resource-type checkboxes
    '&:hover': {
      color: theme.palette.secondary[500],
    },
  },
  checkboxDefault: {
    color: 'inherit',
    width: relativeSize * 2 + 'rem',
    height: relativeSize * 2 + 'rem',
  },
  checkboxChecked: {
    color: theme.palette.secondary[500],
    width: relativeSize * 2 + 'rem',
    height: relativeSize * 2 + 'rem',
  },
  checkboxDisabled: {
    color: theme.palette.common.lightBlack,
  },
  labelClass: {},
});

const AsylumConnectCheckbox = (props) => {
  const classes = Object.assign(props.classes, props.overrideClasses);

  const rootClass = classNames(
    classes.root,
    props.additionalClasses ? props.additionalClasses.root : null
  );
  const labelClass = classNames(
    classes.labelClass,
    props.additionalClasses ? props.additionalClasses.label : null
  );
  const checkboxDefault = classNames(
    classes.checkboxDefault,
    props.additionalClasses ? props.additionalClasses.checkboxDefault : null
  );
  const checkboxChecked = classNames(
    classes.checkboxChecked,
    props.additionalClasses ? props.additionalClasses.checkboxChecked : null
  );
  const checkboxDisabled = classNames(
    classes.checkboxDisabled,
    props.additionalClasses ? props.additionalClasses.checkboxDisabled : null
  );

  const iconSize = Object.assign({}, defaultIconSize, props.iconSize);

  return (
    <FormControlLabel
      control={
        <Checkbox
          value={props.value}
          name={props.name ? props.name : props.label}
          icon={<CheckBoxOutlineBlankIcon style={iconSize} />}
          checkedIcon={<CheckBoxIcon style={iconSize} />}
          checked={props.checked}
          classes={{
            root: checkboxDefault,
            checked: checkboxChecked,
            disabled: checkboxDisabled,
          }}
          onChange={props.onChange}
          disabled={props.disabled ? true : false}
        />
      }
      label={props.label}
      classes={{
        root: rootClass,
        label: labelClass,
      }}
    />
  );
};

AsylumConnectCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
};

export default withStyles(styles)(AsylumConnectCheckbox);
