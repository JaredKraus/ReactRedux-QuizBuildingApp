import React from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';

class QuizForm extends React.Component {

  //------------ QUESTIONS FIELD OF FORM ------------

  // renders a single question input
  renderQuestion = ({input, label, meta}) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label><h3>{label}</h3></label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  }

  //renders a single answer input
  renderAnswer = ({input, label, meta}) => {
    return (
      <div className="item">
        {this.renderSpecialError(meta)}
        <label>{label}</label>
        <input {...input} />
      </div>
    );
  }

  //renders a single checkbox to mark correct answer
  renderCorrect = ({input, label, meta, type}) => {
    return (
      <div className="item">
        <label>{label}</label>
        <input {...input} type={type}/>
      </div>
    );
  }

  //renders the number of questions inputted into the questionAmount input
  // renders 4 answers and 4 correct answer checkboxes for each question
  renderQuestions = () => {
    const arr = Array(this.props.currentValues && Number(this.props.currentValues.questionAmount) > 0 ? Number(this.props.currentValues.questionAmount) : 1)
    const answers = ['A', 'B', 'C', 'D']
    return [...arr].map((v, i) => {
      return (
        <div key={i+1} style={{marginBottom: '40px'}}>
            <Field name={`q${i+1}`} component={this.renderQuestion} label={`Question ${i+1}`}/>
          {answers.map((v2) => {
              return (
                <div style={{marginBottom: '20px'}}>
                  <div className="inline field">
                    <Field name={`q${i+1}${v2}`} component={this.renderAnswer} label={v2}/>
                    <Field name={`q${i+1}${v2}Corr`} component={this.renderCorrect} type="checkbox" label="Correct Answer:"/>
                  </div>
                </div>
              );
            })
          }
        </div>
      );
    })
  }

  //------------ INFORMATION FIELD OF FORM ------------

  //renders the title of the quiz
  renderTitle = ({input, label, meta}) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className} style={{marginBottom: '25px', marginTop: '30px'}}>
        <label><h3>{label}</h3></label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  }
  //renders the description of the quiz
  renderDescription({input, label, rows}) {
    return (
      <div className="field" >
        <label><h5>{label}</h5></label>
        <textarea {...input} rows={rows}/>
      </div>
    );
  }
  // renders the number of questions that will be presented in the form
  renderQuestionAmount = ({input, label, type, meta}) => {
    const className = `inline field ${meta.error ? 'error' : ''}`
    return (
      <div className={className} >
        <label><h5>{label}</h5></label>
        <input {...input} type={type} />
        {this.renderSpecialError(meta)}
      </div>
    );
  }

  //------------ VALIDATE ERRORS ------------

// errors only after field is touched
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

// Does not care if field is touched or not
  renderSpecialError({error}) {
    if (error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  //------------ ON SUBMIT ------------

  //calls action creator 'createQuiz'
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  }


  //------------ RENDER METHOD ------------

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <div style={{ marginBottom: '40px'}} >
          <Field
            name="title"
            component={this.renderTitle}
            label="Title:"
          />
          <Field
            name="description"
            component={this.renderDescription}
            label="Description:"
            rows="2"
          />
          <Field
            name="questionAmount"
            component={this.renderQuestionAmount}
            type="number"
            label="Number of Questions:"
          />
        </div>
        <div className="field">
          {this.renderQuestions()}
        </div>

        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// const mapStateToProps = (state) => {
//   return ({ currentValues: getFormValues('quizForm')(state) })
// }

const validate = (formValues) => {
  const errors = {};
  if(!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if(formValues.questionAmount < 1){
    errors.questionAmount = 'Your quiz must have at least one question'
  }
  const arr = formValues.questionAmount && Number(formValues.questionAmount) > 0 ? Array(Number(formValues.questionAmount)) : Array(1)
  console.log(arr)
  for(let i=0; i < arr.length; i++) {
    if(!formValues[`q${i+1}`]) {
      errors[`q${i+1}`] = `Question ${i+1} must ask a question`
    }

    if(!formValues[`q${i+1}ACorr`] && !formValues[`q${i+1}BCorr`] && !formValues[`q${i+1}CCorr`] && !formValues[`q${i+1}DCorr`]) {
      errors[`q${i+1}A`] = 'At least one answer must be correct'
    }
  }
  return errors;
}


export default reduxForm({
  form: 'quizForm',
  validate: validate
})(QuizForm);
