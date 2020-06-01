import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchQuiz, takeQuiz } from '../../actions/quizActions';
import Modal from '../Modal';

class TakeQuiz extends React.Component {

  // fetch quiz to take
  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.id)
  }

  renderAnswer = ({input, label, answer, meta}) => {
    return(
      <div>
        <div className="inline field">
          <input {...input} type="checkbox" />
          <p>{answer}</p>
        </div>
      </div>
    )
  }

  renderQuestion() {
    const questionArr = Array(Number(this.props.quiz.questionAmount))
    const answers = ['A', 'B', 'C', 'D']
    return [...questionArr].map((v, i) => {
      return (
        <div className="field" key={i+1} style={{marginTop: '15px'}}>
          <h4>{`Question ${i+1}`}</h4>
          <p>{this.props.quiz[`q${i+1}`]}</p>
          { answers.map((v2) => {
            return(
              <div key={`${i+1}${v2}`}>
                <Field name={`q${i+1}${v2}Ans`} component={this.renderAnswer} answer={this.props.quiz[`q${i+1}${v2}`]}/>
              </div>
            );

          }) }
        </div>
    )
    })
  }

  // Does not care if field is touched or not
    renderSpecialError({error}) {
      if (error) {
        console.log(error)
        return (
          <div className="ui error message">
            <div className="header">{error}</div>
          </div>
        );
      }
    }

  onSubmit = formValues => {
    // turn undefined values into falses
    const { quiz } = this.props;
    const correct = {}
    const options = ['A', 'B', 'C', 'D']
    for(let i=0; i < quiz.questionAmount; i++) {
      correct[i+1] = {isCorrect: null, submittedAnswers:[], correctAnswers: []}
      for(let j=0; j < options.length; j++){
        if(!formValues[`q${i+1}${options[j]}Ans`]) {
          formValues[`q${i+1}${options[j]}Ans`] = false;
        } else if (formValues[`q${i+1}${options[j]}Ans`] === true) {
          correct[i+1].submittedAnswers.push(options[j]);
        }
        if(quiz[`q${i+1}${options[j]}Corr`] === true) {
          correct[i+1].correctAnswers.push(options[j]);
        }
      }
      if(
        formValues[`q${i+1}AAns`] === quiz[`q${i+1}ACorr`] &&
        formValues[`q${i+1}BAns`] === quiz[`q${i+1}BCorr`] &&
        formValues[`q${i+1}CAns`] === quiz[`q${i+1}CCorr`] &&
        formValues[`q${i+1}DAns`] === quiz[`q${i+1}DCorr`]
      ) {
        correct[i+1].isCorrect = true;
      } else {
        correct[i+1].isCorrect = false;
      }
    }
    correct.original = quiz

    this.props.takeQuiz(correct)
  }

  render() {
    const { quiz } = this.props
    if(!quiz) {
      return <div><h4>Loading...</h4></div>
    }
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
        <div className="field" style={{marginBottom: '40px'}}>
          <h2 style={{textAlign: 'center'}}>{quiz.title}</h2>
          <p>{quiz.description}</p>
        </div>
        {this.renderQuestion()}
        <button style={{marginTop: '20px'}} className="ui button primary">Submit</button>
      </form>
    );
  }
}

 const mapStateToProps = (state, ownProps) => {
   return { quiz: state.quizzes[ownProps.match.params.id] }
 }

 const validate = (formValues, ownProps) => {
   const errors = {}
   // const questionArr = ownProps.quiz ? Array(Number(ownProps.quiz.questionAmount)) : Array(1)
   // for(let i=0; i < questionArr.length; i++) {
   //   if(!formValues[`q${i+1}AAns`] && !formValues[`q${i+1}BAns`] && !formValues[`q${i+1}CAns`] && !formValues[`q${i+1}DAns`]) {
   //     errors[`q${i+1}AAns`] = 'At least one answer must be selected'
   //   }
   // }
   return errors;
 }

 const wrappedForm = reduxForm({
   form: 'takeQuizForm',
   validate: validate
 })(TakeQuiz);

export default connect(mapStateToProps, {fetchQuiz, takeQuiz})(wrappedForm);
