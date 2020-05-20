import React from 'react'
import { Field } from 'redux-form';

class Question extends React.Component {

  renderText = ({input, label}) => {
    return (
      <div className="inline field">
        <label>{label}</label>
        <input {...input} />
      </div>
    )
  }

  renderCorrect = ({input, label}) => {
    return (
      <div className="inline field">
        <label>{label}</label>
        <input type="checkbox" {...input} />
      </div>
    );
  }

  renderQuestion = ({input, label, meta}) => {
    console.log(meta)
    return (
      <div className="field">
        <label><h3>{label}</h3></label>
        <input {...input} />
      </div>
    );
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        <Field name={`q${id}`} component={this.renderQuestion} label={`Question ${id}`}/>
        <Field name={`q${id}A`} component={this.renderText} label="A" />
        <Field name={`q${id}ACorrect`} component={this.renderCorrect} label="Correct Answer: " />
        <Field name={`q${id}B`} component={this.renderText} label="B" />
        <Field name={`q${id}BCorrect`} component={this.renderCorrect} label="Correct Answer: " />
        <Field name={`q${id}C`} component={this.renderText} label="C" />
        <Field name={`q${id}CCorrect`} component={this.renderCorrect} label="Correct Answer: " />
        <Field name={`q${id}D`} component={this.renderText} label="D" />
        <Field name={`q${id}DCorrect`} component={this.renderCorrect} label="Correct Answer: " />
      </div>
    );
  }
}

export default Question;
