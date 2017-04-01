import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import storeCreator from './store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Route components.
import App from './App/App'; // Main application.
import Categories from './Categories/Container';
import Activation from './Activation/Container';
import User from  './User/Container';
import Stories from './Stories/Container';
import Story from './Story/Container';
import StoryComposer from './StoryComposer/Container';
import Login from './Login/ConnectedLogin';
import Authentication from './Authentication/Container';
import Register from './Register/Container';
import Home from './App/Home'; // Home
import NotFound from './Errors/NotFound'; // 404
import loadConfig, {initializeNotifications} from './App/Actions';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = storeCreator();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Load configuration.
store.dispatch(loadConfig());

function requireAuth(nextState, replace) {
  const state = store.getState();
  const loggedIn = state.session.loggedIn;

  if (!loggedIn) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function requireAuthExtra(nextState, replace){

  const state = store.getState();
  const loggedIn = state.session.loggedIn;
  const role = state.session.user.role;

  if (!loggedIn || role != "author") {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }

}

function redirectFromLogin(nextState, replace) {

  const state = store.getState();
  const loggedIn = state.session.loggedIn;

  if (loggedIn) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

class Root extends React.Component {

 render() {

   return (
   <div>
     <Provider store={store}>
       <Router history={browserHistory} >
         <Route path="/" component={App}>
           <IndexRoute component={Home} />
           <Route path="/login" component={Login} onEnter={redirectFromLogin} />
           <Route path="/auth" component={Authentication} />
           <Route path="/register" component={Register} />
           <Route path="/users/:userId/:userName" component={User}/>
           <Route path="/stories" component={Stories} />
           <Route path="/stories/new" component={StoryComposer} onEnter={requireAuthExtra} />
           <Route path="/stories/:storyId/:storyName" component={Story} />
           <Route path="/categories" component={Categories} />
           <Route path="/activation/:code" component={Activation} />
           <Route path="*" component={NotFound} />
         </Route>
       </Router>
      </Provider>
    </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
