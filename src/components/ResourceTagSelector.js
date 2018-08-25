import React from 'react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

import AsylumConnectSelector from './AsylumConnectSelector';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import ACBadge from './Badge';
import { searchInput, searchInputMobile } from '../theme/sharedClasses';
import ResourceTypes from '../helpers/ResourceTypes';
import withWidth from './withWidth';
import breakpoints from '../theme/breakpoints';

const resourceTypes = ResourceTypes.types;

const styles = theme => ({
  searchInput: Object.assign(searchInput(theme), {
    borderLeft: "1px solid "+theme.palette.common.lightGrey,
    cursor: 'pointer',
    position: 'relative',
    marginBottom: '0px',
    [theme.breakpoints.down('sm')]: searchInputMobile(theme)
  }),
  sectionHeader: {
    color: theme.palette.common.darkBlack
  },
  sectionTitle: {
    fontWeight: '600',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  resourceList: {
    padding: '2rem',
    right: '0',
    maxHeight: '420px',
  }
});

const FilterCollection = (props) => (
  <div>
    {props.index > 0 ? <Divider /> : null}
    <Typography type="body2" className={props.classes.sectionHeader}>
      <ACBadge type={props.type} width='45px' height='45px' /> 
      <AsylumConnectCheckbox label={props.category + ' > ' + (props.title ? props.title + ' > ': '') + props.odTag} value={props.odTag} onChange={props.onChange} checked={(props.selectedResourceTags.indexOf(props.odTag) >= 0)} />
    </Typography>
  </div>
);

class ResourceTagSelector extends React.Component {

  render() {
    const {
      searchInput,
      sectionHeader, 
      sectionTitle, 
      resourceList
    } = this.props.classes;
    const { onChange, selectedResourceTags }= this.props;
    const isMobile = this.props.width < breakpoints['sm'];
    const containerWidth = (isMobile ? '100%' : this.props.containerWidth+'px');

    return (
      <AsylumConnectSelector label="Resource Types" selected={selectedResourceTags} containerWidth={containerWidth} containerClass={searchInput} listContainerClass={resourceList} >
        {resourceTypes.map((filter, i) => (
            <FilterCollection key={i} index={i} classes={{sectionHeader, sectionTitle}} onChange={onChange} selectedResourceTags={selectedResourceTags} {...filter} />
          )
        )}
      </AsylumConnectSelector>
      
    );
  }
};

export default withWidth(withStyles(styles)(ResourceTagSelector));