import React from 'react';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { createQuiz } from '../../actions/quizActions';
import QuizForm from './QuizForm';



class CreateQuiz extends React.Component {

  //calls action creator 'createQuiz' when QuizForm is submitted
  onSubmit = (formValues) => {
    this.props.createQuiz(formValues)
  }

  // render QuizForm
  render() {
    return (
      <div>
        <h3>Create a Quiz</h3>
        <QuizForm initialValues={{questionAmount: "1"}} onSubmit={this.onSubmit} currentValues={this.props.currentValues}/>
      </div>
    );
  }
}

// allows you to pass current values of QuizForm to the component
const mapStateToProps = (state) => {
  return ({ currentValues: getFormValues("quizForm")(state) })
}


export default connect(mapStateToProps, {createQuiz})(CreateQuiz);
