import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchUserQuiz } from '../../actions/quizActions';


class MyQuiz extends React.Component {

  componentDidMount() {
    this.props.fetchUserQuiz(this.props.match.params.userId);
  }

  renderOwner(quiz) {
    if (quiz.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/quizzes/edit/${quiz.id}`} className="ui button primary">Edit</Link>
          <Link to={`/quizzes/delete/${quiz.id}`} className="ui button negative">Delete</Link>
        </div>
      );
    }
  }

  renderOutput() {
    return this.props.quizzes.map(quiz => {
      return (
        <div className="item" key={quiz.id}>
          {this.renderOwner(quiz)}
          <i className="large middle aligned icon clipboard outline" />
          <div className="content">
            {quiz.title}
            <div className="Number of Questions">
              {`Number of Questions: ${quiz.questionAmount}`}
            </div>
          </div>
        </div>
      );
    })
  }


  render() {
    if (this.props.isSignedIn === null) {
      return <h5>Loading...</h5>
    } else if (this.props.match.params.userId !== this.props.currentUserId) {
      return <h4>Please Sign-in</h4>
    }

    return (
      <div>
        <h2>My Quizzes</h2>
        <div className="ui celled list">
          {this.renderOutput()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUserId: state.gauth.userId,
    isSignedIn: state.gauth.isSignedIn,
    quizzes: Object.values(state.quizzes).filter(quiz => quiz.userId === ownProps.match.params.userId)
  }
}

export default connect(mapStateToProps, { fetchUserQuiz })(MyQuiz);
