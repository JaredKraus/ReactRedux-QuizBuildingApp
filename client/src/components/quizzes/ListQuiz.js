import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchQuizzes } from '../../actions/quizActions';
import history from '../../history'

class ListQuiz extends React.Component {

  componentDidMount() {
    this.props.fetchQuizzes();
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

  renderList() {
    return this.props.quizzes.map(quiz => {
      return (
          <div onClick={() => history.push(`/quizzes/take/${quiz.id}`)} to={`/quizzes/take/${quiz.id}`}  className="clickable item" key={quiz.id}>
            <div onClick={(e) => e.stopPropagation()}>
              {this.renderOwner(quiz)}
            </div>
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

  renderCreate = () => {
    if(this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/quizzes/create' className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>All Quizzes</h2>
        <div className="ui celled list">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizzes: Object.values(state.quizzes),
    currentUserId: state.gauth.userId,
    isSignedIn: state.gauth.isSignedIn
   }
}

export default connect(mapStateToProps, { fetchQuizzes })(ListQuiz);
