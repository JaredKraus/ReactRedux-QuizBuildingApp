import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchQuiz } from '../../actions/quizActions';

class TakeQuiz extends React.Component {

  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.id)
  }

  renderAnswer = ({input, label, answer, meta}) => {
    console.log(meta)
    return(
      <div className="inline field">
        <input {...input} type="checkbox" />
        <p>{answer}</p>
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

  render() {
    const { quiz } = this.props
    if(!quiz) {
      return <div><h4>Loading...</h4></div>
    }
    return (
      <div className="ui form">
        <div className="field" style={{marginBottom: '40px'}}>
          <h2 style={{textAlign: 'center'}}>{quiz.title}</h2>
          <p>{quiz.description}</p>
        </div>
        {this.renderQuestion()}

        <button style={{marginTop: '20px'}} className="ui button primary">Submit</button>
      </div>
    );
  }
}

 const mapStateToProps = (state, ownProps) => {
   return { quiz: state.quizzes[ownProps.match.params.id] }
 }

 const validate = (formValues, ownProps) => {
   const errors = {}
   const questionArr = ownProps.quiz ? Array(Number(ownProps.quiz.questionAmount)) : Array(1)
   for(let i=0; i < questionArr.length; i++) {
     if(!formValues[`q${i+1}AAns`] && !formValues[`q${i+1}BAns`] && !formValues[`q${i+1}CAns`] && !formValues[`q${i+1}DAns`]) {
       errors[`q${i+1}AAns`] = 'At least one answer must be selected'
     }
   }
   return errors;
 }

 const wrappedForm = reduxForm({
   form: 'takeQuizForm',
   validate: validate
 })(TakeQuiz);

export default connect(mapStateToProps, {fetchQuiz})(wrappedForm);
