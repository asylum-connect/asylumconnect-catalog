import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const styles = (theme) => ({
  rootClass: {
    boxShadow: 'none',
  },
  containerClass: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  borderTop: {
    borderTop: '1px solid ' + theme.palette.common.separator,
  },
  borderBottom: {
    paddingBottom: '1px solid ' + theme.palette.common.separator,
  },
  detailsRootClass: {
    paddingTop: theme.spacing(2),
    paddingBottom: 0,
    paddingLeft: 0,
  },
  summaryRootClass: {
    minHeight: '0!important',
    paddingLeft: '0!important',
    paddingRight: '0!important',
  },
  summaryExpandedClass: {
    minHeight: '0!important',
    margin: '0!important',
  },
  summaryContentClass: {
    margin: '0!important',
  },
  iconClass: {
    color: theme.palette.common.darkBlack,
    right: 0,
  },
  titleClass: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

class AsylumConnectCollapsibleSection extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      expanded: props.expanded,
    };

    this.handleToggle = this.handleToggle.bind(this);
    /*this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.handlePaperClick = this.handlePaperClick.bind(this)*/
  }

  handleToggle(event, expanded) {
    this.setState({
      expanded: expanded,
    });
  }

  render() {
    const {content, title, borderTop, borderBottom, className, isEditing, renderEditButton } = this.props;
    const {expanded} = this.state;
    const {
      iconClass,
      containerClass,
      rootClass,
      summaryRootClass,
      summaryExpandedClass,
      summaryContentClass,
      detailsRootClass,
      titleClass,
    } = this.props.classes;
    const containerClasses =
      (borderTop ? this.props.classes.borderTop : '') +
      ' ' +
      (borderBottom ? this.props.classes.borderBottom : '') +
      ' ' +
      containerClass +
      ' ' +
      (className ? className : '');
    /*const listContainerClasses = (this.props.listContainerClass ? this.props.listContainerClass + ' ' : '') + selectList;*/
    //const rootClass = (this.props.rootClass ? this.props.rootClass + ' ' : '');

    return (
      <div className={containerClasses}>
        <ExpansionPanel
          className={rootClass}
          expanded={expanded}
          onChange={this.handleToggle}
        >
          <ExpansionPanelSummary
            classes={{
              root: summaryRootClass,
              content: summaryContentClass,
              expanded: summaryExpandedClass,
              expandIcon: iconClass,
            }}
            expandIcon={<KeyboardArrowDownIcon />}
          >
          <div className={titleClass}>
            <Typography variant="subtitle2">{title}</Typography>
            { isEditing && renderEditButton && renderEditButton() }
          </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            classes={{
              root: detailsRootClass,
            }}
          >
            {content}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

AsylumConnectCollapsibleSection.defaultProps = {
  borderTop: true,
  borderBottom: false,
  expanded: true,
  isEditing: false,
  renderEditButton: null,
};
AsylumConnectCollapsibleSection.propTypes = {
  borderTop: PropTypes.bool,
  borderBottom: PropTypes.bool,
  expanded: PropTypes.bool,
  isEditing: PropTypes.bool,
  renderEditButton: PropTypes.func,
};

export default withStyles(styles)(AsylumConnectCollapsibleSection);
