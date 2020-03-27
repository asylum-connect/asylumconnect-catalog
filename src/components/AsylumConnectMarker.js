import React from 'react';
import {Marker} from 'react-google-maps';

class AsylumConnectMarker extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleMarkerClick() {
    this.setState({
      open: !this.state.open
    });
  }

  handleCloseClick() {
    this.setState({
      open: false
    });
  }

  render() {
    const {children} = this.props;
    const markerURL =
      process.env.OD_API_ENV === 'development'
        ? window.location.protocol +
          '//asylum-connect-catalog-staging.herokuapp.com/img/icon-pinpoint.png'
        : window.location.origin + '/img/icon-pinpoint.png';
    return (
      <Marker
        {...this.props}
        icon={{
          url: markerURL,
          anchor: new window.google.maps.Point(11, 32),
          scaledSize: new window.google.maps.Size(22, 32)
        }}
        onClick={this.handleMarkerClick}
      >
        {this.state.open &&
          React.Children.map(children, (child, i) => {
            return React.cloneElement(child, {
              onCloseClick: this.handleCloseClick
            });
          })}
      </Marker>
    );
  }
}

export default AsylumConnectMarker;
