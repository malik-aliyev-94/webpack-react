import React from 'react';
import styles from './App.css';
import {observer} from "mobx-react";

@observer
export default class App extends React.Component {
  render() {
    return <div className={styles.app}>
      <h1> --- Test MobX Dev Tools --- </h1>
      <p>{this.props.store.title}</p>
      <i>{this.props.store.author}</i>
      <br/>
      <b>{this.props.store.age}</b>
    </div>
  }
}