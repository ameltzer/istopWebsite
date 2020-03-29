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

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}