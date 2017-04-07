import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from '../components/App/App';
import AppStore from '../stores/AppStore';
import DevTools from 'mobx-react-devtools';

var store = new AppStore();
// console.log(process.env.env);
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <div>
        <Component store={data} />
        {/*<DevTools />*/}
      </div>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('../components/App/App', () => {
    render(App)
  });
}