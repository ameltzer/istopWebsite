import * as React from "react";
import { TopLevelWebsite } from "./containers/TopLevelWebsite";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PubSub, API } from 'aws-amplify'
import awsconfig from './aws-exports'

API.configure(awsconfig)
PubSub.configure(awsconfig)

export const App: React.FC<{}> = () => {
  return (<TopLevelWebsite />);
};