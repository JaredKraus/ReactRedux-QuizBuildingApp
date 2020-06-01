import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history'
import { fetchQuiz, deleteQuiz } from '../../actions/quizActions';

class ResultsQuiz extends React.Component {


  renderActions() {
    // render cancel button
    return(
      <React.Fragment>
        <Link to='/quizzes' className="ui primary button">Done</Link>
      </React.Fragment>
    )
  }

  // calculate the percentage scored on the quiz
  score() {
    const { results } = this.props
    let correct = 0;
    for(let i=0; i < results.original.questionAmount; i++) {
      if(results[i+1].isCorrect === true){
        correct++
      }
    }
    console.log(correct)
    return Math.round((correct / results.original.questionAmount)*100)
  }


  render() {
    // render Modal component
    return (
      <Modal
        title={this.props.results ? `${this.props.results.original.title} Quiz Results` : 'Quiz Results'}
        description={this.props.results ? `You Scored ${this.score()}% on the Quiz.` : 'Loading Score...'}
        actions={this.renderActions()}
        onDismiss={() => history.push('/quizzes')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {results: state.quizResults }
}

export default connect(mapStateToProps, {})(ResultsQuiz);
