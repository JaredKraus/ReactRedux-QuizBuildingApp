import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import CreateQuiz from './quizzes/CreateQuiz';
import EditQuiz from './quizzes/EditQuiz';
import DeleteQuiz from './quizzes/DeleteQuiz';
import ListQuiz from './quizzes/ListQuiz';
import MyQuiz from './quizzes/MyQuiz';
import TakeQuiz from './quizzes/TakeQuiz';
import HomeScreen from './HomeScreen';
import history from '../history';

class App extends React.Component {

  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" component={HomeScreen} exact />
              <Route path="/quizzes" component={ListQuiz} exact />
              <Route path="/quizzes/create" component={CreateQuiz} exact />
              <Route path="/quizzes/edit/:id" component={EditQuiz} exact />
              <Route path="/quizzes/delete/:id" component={DeleteQuiz} exact />
              <Route path="/quizzes/take/:id" component={TakeQuiz} exact />
              <Route path="/quizzes/my/:userId" component={MyQuiz} exact />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
