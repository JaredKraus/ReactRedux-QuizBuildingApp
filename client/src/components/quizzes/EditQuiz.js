import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { fetchQuiz, editQuiz } from '../../actions/quizActions';
import QuizForm from './QuizForm';

class EditQuiz extends React.Component {

  componentDidMount() {
    // using id fetch the quiz user is trying to edit
    this.props.fetchQuiz(this.props.match.params.id)
  }

  onSubmit = (formValues) => {
    // call editQuiz action creator on submittal
    this.props.editQuiz(this.props.match.params.id, formValues);
  }

  render() {
    // allow quiz to load
    if(!this.props.quiz) {
      return <div>Loading...</div>
    }
    // display Quiz form with original values
    // exclude id and userId from being updated
    return (
      <div>
        <h3>Edit Quiz</h3>
        <QuizForm initialValues={_.omit(this.props.quiz, 'id', 'userId')} onSubmit={this.onSubmit} currentValues={this.props.currentValues}/>
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
