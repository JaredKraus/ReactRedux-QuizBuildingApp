import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history'
import { fetchQuiz, deleteQuiz } from '../../actions/quizActions';

class DeleteQuiz extends React.Component {

  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.id)
  }

  renderActions() {
    return(
      <React.Fragment>
        <button onClick={() => this.props.deleteQuiz(this.props.match.params.id)} className="ui button negative">Delete</button>
        <Link to='/quizzes' className="ui button">Cancel</Link>
      </React.Fragment>
    )
  }

  render() {
    return (
      <Modal
        title="Delete Quiz"
        description={this.props.quiz ? `Are you sure you want to delete the quiz: ${this.props.quiz.title}` : "Are you sure you want to delete this quiz?"}
        actions={this.renderActions()}
        onDismiss={() => history.push('/quizzes')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { quiz: state.quizzes[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {fetchQuiz, deleteQuiz})(DeleteQuiz);
