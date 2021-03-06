import {Reset} from 'styled-reset';
import styled, {createGlobalStyle} from 'styled-components';
import Header from './Header';
import QuestionsPage from './QuestionsPage';
import AskQuestionPage from './AskQuestionPage';
import {useState, useEffect} from 'react';
import UserContext from './UserContext';
import LoginPage from './LoginPage';
import axios from 'axios';
import SignUpPage from './SignUpPage';
import AccountPage from './AccountPage';
import SpecificQuestionPage from './SpecificQuestionPage';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300,400;700&display=swap');

  body {
    background: EDF8F8;
    color: #fff;
    font-family: Roboto, sans-serif;
  }
`;

function App() {

    const [user, setUser] = useState(null);


    function checkAuth() {
        return new Promise(((resolve, reject) => {
            axios.get('http://localhost:3030/profile', {withCredentials: true})
                .then(response => {
                    setUser({email: response.data});
                    resolve(response.data);
                })
                .catch(() => {
                    setUser(null);
                    reject(null);
                })
        }))


    }


    useEffect(() => {
        checkAuth();
    }, []);


    return (
        <div>
            <Reset/>
            <GlobalStyles/>

            <Router>
                <UserContext.Provider value={{user, checkAuth}}>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={QuestionsPage}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/ask" component={AskQuestionPage}/>
                        <Route exact path="/signup" component={SignUpPage}/>
                        <Route exact path="/account" component={AccountPage}/>

                        <Route exact path="/question/:questionid" component={SpecificQuestionPage}/>
                    </Switch>
                </UserContext.Provider>
            </Router>
        </div>
    );
}

export default App;
