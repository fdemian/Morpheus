import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import storeCreator from './store/configureStore';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

// Route components.
import App from './App/App'; // Main application.
import Category from './Category/Container';
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
import loadConfig from './App/Actions';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Required by material-ui.
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = storeCreator();
const browserHistory = createBrowserHistory();

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
     <Provider store={store}>
       <Router history={browserHistory} >
	    <MuiThemeProvider>
	     <div>
		   <Route path="/" component={App}/>
		   <Route exact path="/" component={Home}/>
		   <Route exact path="/login" component={Login} onEnter={redirectFromLogin} />
		   <Route exact path="/auth" component={Authentication} />
		   <Route exact path="/register" component={Register} />
           <Route exact path="/users/:userId/:userName" component={User}/>
           <Route exact path="/stories" component={Stories} />
           <Route exact path="/stories/new" component={StoryComposer} onEnter={requireAuthExtra} />
           <Route exact path="/stories/:storyId/:storyName" component={Story} />
           <Route exact path="/categories" component={Categories} />
           <Route exact path="/categories/:categoryId/:categoryName" component={Category} />
           <Route exact path="/activation/:code" component={Activation} />           
	     </div>
		</MuiThemeProvider>
       </Router>
      </Provider>
    );
  }
}

//<Route exact path="*" component={NotFound} />
ReactDOM.render(<Root />, document.getElementById('root'));
