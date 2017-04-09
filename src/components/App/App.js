import React from 'react';
import styles from './App.css';
import {observer} from "mobx-react";
import Alert from 'react-bootstrap/lib/Alert';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import img from '../../images/webpack-react.png';
const imgEx = '<img src={img} style={{width: "100%", marginBottom: 20}} alt=""/></pre>';

@observer
export default class App extends React.Component {
  render() {
    const navbarInstance = (
      <Navbar inverse collapseOnSelect fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Webpack-react</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem href="#">Home</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem href="#">GitHub</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    return <div className={styles.app}>
      {navbarInstance}
      <div className="container" style={{marginTop: 80, marginBottom: 80}}>
        <div className="row">
          <div className="col-md-3">
            <ListGroup>
              <ListGroupItem href="#yarn">yarn</ListGroupItem>
              <ListGroupItem href="#scripts">yarn (npm) scripts</ListGroupItem>
              <ListGroupItem href="#config">Project config</ListGroupItem>
              <ListGroupItem href="#babel">Babel (ES6)</ListGroupItem>
              <ListGroupItem href="#postcss">PostCSS</ListGroupItem>
              <ListGroupItem href="#images">Images</ListGroupItem>
              <ListGroupItem href="#pug">Pug (jade)</ListGroupItem>
              <ListGroupItem href="#react">React</ListGroupItem>
              <ListGroupItem href="#mobx">MobX</ListGroupItem>
              <ListGroupItem href="#hmr">HMR</ListGroupItem>
              <ListGroupItem href="#tests">Tests</ListGroupItem>
              <ListGroupItem href="#vendors">Vendors</ListGroupItem>
              <ListGroupItem href="#env">Dev & Prod environments</ListGroupItem>
              <ListGroupItem href="#practices">Best practices</ListGroupItem>
            </ListGroup>
          </div>
          <div className="col-md-9">

            <div id="yarn">
              <h2>Yarn</h2>
              <p>FAST, RELIABLE, AND SECURE DEPENDENCY MANAGEMENT.</p>
              <a href="https://yarnpkg.com/en/" target="_blank">View WebSite</a>
              <h4>Installation</h4>
              <code>brew install yarn</code>
              <h4>Test that Yarn is installed by running</h4>
              <code>yarn --version</code><br/><br/>
              <Alert bsStyle="warning">
                <strong>Install project dependencies</strong>
                To install project dependencies run <code>yarn</code> or <code>yarn install</code> command from project <b><i>/root</i></b>
              </Alert>
            </div>

            <div id="scripts">
              <h2>yarn scripts</h2>
              <pre>{JSON.stringify({
                  "test": "jest --watch",
                  "dashboard": "webpack-dashboard webpack-dev-server",
                  "dev": "webpack-dev-server",
                  "prod": "webpack --env=production",
                  "flow": "flow"
              }, null, 2)}</pre>
              <table className="table table-bordered">
                <tbody>
                  <tr><td><code>yarn run test</code></td><td>runs unit tests (jest, enzyme)</td></tr>
                  <tr><td><code>yarn run dashboard</code></td><td>runs dev server and uses <a href="https://github.com/FormidableLabs/webpack-dashboard" target="_blank">webpack-dashboard plugin</a> to show console outputs</td></tr>
                  <tr><td><code>yarn run dev</code></td><td>runs dev server with HMR</td></tr>
                  <tr><td><code>yarn run prod</code></td><td>compiles all files for production</td></tr>
                  <tr><td><code>yarn run flow</code></td><td>runs <a href="https://flow.org/" target="_blank">flow</a> type checker</td></tr>
                </tbody>
              </table>
            </div>

            <div id="config">
              <h2>Project config</h2>
              <p>Project configuration file is: "/root/project/config.js"</p>
              <pre>{JSON.stringify({
                  dev: {
                      host: "http://localhost",
                      port: 8080
                  }
              }, null, 2)}</pre>
              <p>You can define dev server port there. Also you can add your own parameters and use them in webpack config file and etc.</p>
            </div>

            <div id="babel">
              <h2>Babel</h2>
              <p>We use ES6 syntax for whole project even for webpack config :)</p>
              <p>You can get more info about babel there: <a href="https://babeljs.io/" target="_blank">babeljs.io</a></p>
              <p>The babel config file (.babelrc) is located in "/root" directory. The only required plugin there is - "transform-es2015-modules-commonjs".</p>
              <p>This plugin is required for using ES6 syntax in webpack config file ("/root/webpack.config.babel.js")</p>
              <p>Also "babel-register" is required for this.</p>
              <p>Other babel configs (react preset, es2015 preset etc.) are defined in webpack config file.</p>
            </div>

            <div id="postcss">
              <h2>PostCSS</h2>
              <p>We are using <a href="http://postcss.org/" target="_blank">PostCSSp</a> in our projects.</p>
              <p>You can use all its features in your project (autoprefixer for ex.).</p>
            </div>

            <div id="images">
              <h2>Images</h2>
              <p>All necessary loaders for images are also configured for your project (webpack config).</p>
              <p>You can add images to your project with <code>img(src)</code> tag or by require them.</p>
              <p>Two examples are shown below.</p>
              <h4>Add image with <code>img</code> tag</h4>
              <pre>img(src="../images/webpack-react.png", alt="pug image example")</pre>
              <h4>Require image</h4>
              <pre>import img from '../../images/webpack-react.png'; <br/>
              {imgEx}
              </pre>
              <img src={img} style={{width: '100%', marginBottom: 20}} alt=""/>
            </div>

            <div id="pug">
              <h2>Pug</h2>
              <p>You can use ".pug" files as templates for HtmlWebpackPlugin plugin. </p>
            </div>

            <div id="react">
              <h2>React</h2>
              <p>React is the core of our project :D</p>
              <p>You can create your own components in ES6 syntax or include external components to your project. We are using <a href="https://react-bootstrap.github.io/" target="_blank">react-bootstrap</a> front-end framework for this doc.</p>
            </div>

            <div id="mobx">
              <h2>MobX</h2>
              <p>As a state manager we have selected <a href="https://mobx.js.org/" target="_blank">MobX</a></p>
              <p>But you can easily add Redux to your project. The only thing you must to do - add redux to your dependencies.</p>
              <p>MobX example is shown below</p>
              <div className="well">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td><b>Title</b></td>
                      <td>{this.props.store.title}</td>
                    </tr>
                    <tr>
                      <td><b>Author</b></td>
                      <td>{this.props.store.author}</td>
                    </tr>
                    <tr>
                      <td><b>Age</b></td>
                      <td>{this.props.store.age}</td>
                    </tr>
                  </tbody>
                </table>
                <Alert bsStyle="info">
                  Open console and set data object properties (title, author and age) <br/>
                  <code>data.age=30;</code> for ex.
                </Alert>
              </div>
              <p>For using MobX DevTools (only for dev) you must: </p>
              <ul>
                <li>Import DevTools <code>import DevTools from 'mobx-react-devtools';</code></li>
                <li>Render <a href="https://github.com/mobxjs/mobx-react-devtools" target="_blank">DevTools</a></li>
              </ul>
            </div>
              
            <div id="hmr">
              <h2>Hot Module Replacement</h2>
              <p>You can get more info about HMR <a href="https://webpack.js.org/guides/hmr-react/" target="_blank">here</a>.</p>
              <p>Webpack is watching for changes to all of your styles, components etc. and refreshes them in browser without reloading it.</p>
              <p>You can see the using example in "/root/entries/index.js" file.</p>
            </div>

            <div id="hmr">
              <h2>Tests</h2>
              <p><a href="https://facebook.github.io/jest/" target="_blank">Jest</a> (unit tests) and <a href="https://github.com/airbnb/enzyme" target="_blank">Enzyme</a> (to test react compunents) are using in this project.</p>
              <p>You can also use other testing platforms.</p>
              <p>Examples <a href="https://medium.com/airbnb-engineering/enzyme-javascript-testing-utilities-for-react-a417e5e5090f">here.</a></p>
              <p>To run the tests use the command below: </p>
              <code>yarn run test</code>
            </div>

            <div id="vendors">
              <h2>Vendors</h2>
              <p>You can include any script, stylesheet files and etc. from everywhere also from cdn.</p>
              <p>For this purpose you can require files you need and must declare them in webpack config file (<b>webpack.ProvidePlugin</b>)</p>
              <p>You can see the jquery example in webpack config file.</p>
            </div>

            <div>
              <h2>Dev & Prod environments</h2>
            </div>

          </div>
        </div>
      </div>
    </div>
  }
}