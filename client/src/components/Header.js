import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import GoogleAuth from './GoogleAuth';

class Header extends React.Component {

  renderMyQuiz() {
    if(this.props.isSignedIn) {
      return (
        <div>
          <Link to={`/quizzes/my/${this.props.currentUserId}`} className="item">
            My Quizzes
          </Link>
        </div>
      );
    }
  }

  renderCreateQuiz() {
    if(this.props.isSignedIn) {
      return (
        <div>
          <Link to="/quizzes/create" className="item">
            Create Quiz
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          Kraus' Quiz Hub
        </Link>
        <div className="right menu">
          <Link to="/quizzes" className="item">
            Take Quiz
          </Link>
          {this.renderCreateQuiz()}
          {this.renderMyQuiz()}
          <GoogleAuth type="ui red google button"/>
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

export default connect(mapStateToProps, {})(Header);
