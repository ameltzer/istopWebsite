import * as React from "react";
import { TopLevelWebsite } from "./containers/TopLevelWebsite";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PubSub, API} from 'aws-amplify'
import awsconfig from './aws-exports'
import Analytics from '@aws-amplify/analytics';
import Auth from '@aws-amplify/auth';

API.configure(awsconfig)
PubSub.configure(awsconfig)

const amplifyConfig = {
  Auth: {
    identityPoolId: 'us-east-1:7aa12aa0-4f3b-41bc-a9fa-93900e425546',
    region: 'us-east-1'
  }
}

//Initialize Amplify
Auth.configure(amplifyConfig);

const analyticsConfig = {
  AWSPinpoint: {
        // Amazon Pinpoint App Client ID
        appId: 'cfde2fbca1da41d9a3adb641ccf16268',
        // Amazon service region
        region: 'us-east-1',
        mandatorySignIn: false,
  }
}

Analytics.configure(analyticsConfig)

//Record an event
Analytics.record('some-event-name');

//Record a custom event
Analytics.record({
    name: 'Album',
    attributes: { genre: 'Rock', year: '1989' }
});
export const App: React.FC<{}> = () => {
  return (<TopLevelWebsite />);
};