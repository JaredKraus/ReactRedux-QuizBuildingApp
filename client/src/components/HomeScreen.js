import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import GoogleAuth from './GoogleAuth';

class HomeScreen extends React.Component {

  renderCreate() {
    if(this.props.isSignedIn === null) {
      return <button className="fluid ui loading button">Loading...</button>
    } else if (this.props.isSignedIn === false) {
      return <div style={{textAlign: 'center', marginTop: '10px'}}>Sign-In to create a quiz!</div>;
    } else {
      return(
        <Link to="/quizzes/create" className="fluid ui button" style={{marginTop: '10px'}}>
          Create Quiz
        </Link>
      );
    }

  }

  render() {
    return (
      <div style={{marginTop: '100px'}}>
        <h1 style={{textAlign: "center", fontSize: "60px"}}>Kraus' Quiz Hub</h1>
        <h4 style={{textAlign: "center", fontSize: "20px"}}>Build or take MC quizzes</h4>
        <div style={{margin: 'auto', marginTop: '100px', width: '50%'}}>
          <GoogleAuth type="fluid ui red google button" />
          <Link to="/quizzes" className="fluid ui button" style={{marginTop: '10px'}}>
            Take Quiz
          </Link>
          {this.renderCreate()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.gauth.isSignedIn,
    currentUserId: state.gauth.userId

  }
}

export default connect(mapStateToProps, {})(HomeScreen);
