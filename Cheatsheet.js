// Installation
npm install redux
npm install react-redux

// Dev Tools
npm install --save-dev redux-devtools-extension
npm install --save-dev redux-observable

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
);

// =============================================================

// Reducer(s)
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const toggler = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE":
      return !state;
    default:
      return state;
  }
};

// createStore()
import {createSore} from 'redux'
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => {
    return state;
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filder((l) => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
}

// combineReducers()
import { combineReducers } from 'redux'
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

// Provider
import { Provider } from 'react-redux'
class Provider extends Component {
	getChildContext() {
  	return {
    	store: this.props.store
    };
  }
  
  return () {
  	return this.props.children;
  }
}
Provider.childContextTypes = {
	store: React.PropTypes.object
};

{Component}.contextTypes = {
	store: React.PropTypes.object
}

// connect()
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  todo: state.todos[ownProps.id]
})
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTodoClick: () => {
      dispatch({
        type: 'TOGGLE',
      });
    }
  };
}
const connect(mapStateToProps, mapDispatchToProps) => {
  return function (WrappedComponent) {
    return class extends React.Component {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...mapStateToProps(store.getState(), this.props)}
            {...mapDispatchToProps(store.dispatch, this.props)}
          />
        )
      }
      componentDidMount() {
        this.unsubscribe = store.subscribe(this.handleChange.bind(this))
      }
      componentWillUnmount() {
        this.unsubscribe()
      }
      handleChange() {
        this.forceUpdate()
      }
    } 
  } 
}

const TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

// Init & Example
const store = createStore(combineReducers({ counter, toggler }));

store.subscribe(() => {
  document.getElementById("json").textContent = JSON.stringify(store.getState(), undefined, 2);
});

document.addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" });
});
