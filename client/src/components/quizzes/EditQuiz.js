import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { fetchQuiz, editQuiz } from '../../actions/quizActions';
import QuizForm from './QuizForm';

class EditQuiz extends React.Component {

  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.id)
  }

  onSubmit = (formValues) => {

  }

  render() {

    if(!this.props.quiz) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>Edit Quiz</h3>
        <QuizForm initialValues={this.props.quiz} onSubmit={this.onSubmit} currentValues={this.props.currentValues}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    quiz: state.quizzes[ownProps.match.params.id],
    currentValues: getFormValues("quizForm")(state)
   }
}

export default connect(mapStateToProps, {fetchQuiz, editQuiz})(EditQuiz);
