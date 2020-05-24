import React from 'react';
import { connect } from 'react-redux';
import { initAuth, changeAuth, trySignIn, trySignOut } from '../actions/gauthActions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    this.props.initAuth()
  }

  onSignInClick = () => {
    this.props.trySignIn()
  };

  onSignOutClick = () => {
    this.props.trySignOut()
  };

  renderAuthButton() {
      if(this.props.isSignedIn === null) {
        return null;
      } else if(this.props.isSignedIn) {
        return (
          <button onClick={this.onSignOutClick} className={this.props.type}>
            <i className="google icon" />
            Sign Out
          </button>
        );
      } else {
        return (
          <button onClick={this.onSignInClick} className={this.props.type}>
            <i className="google icon" />
            Sign In with Google
          </button>
        );
      }
    }


  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.gauth.isSignedIn }
}

export default connect(mapStateToProps, {initAuth, trySignIn, trySignOut, changeAuth} )(GoogleAuth);
