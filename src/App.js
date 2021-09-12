import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import History from './components/HistoryComp';
import Launches from './components/LaunchesComp';
import Rockets from './components/RocketsComp';
import HistoryDetails from './components/HistoryDetailsComp';
import LaunchDetails from './components/LaunchDetailsComp';
import RocketDetails from './components/RocketDetailsComp';
import NavbarComp from './components/NavbarComp';

function App() {

    return (
        <div className="app-box">
            <Router>

                <NavbarComp />
                <Switch>
                    <Route exact path='/history'> <History /> </Route>
                    <Route exact path='/launches'> <Launches /> </Route>
                    <Route exact path='/rockets'> <Rockets /> </Route>
                    <Route exact path='/history/:id'> <HistoryDetails /> </Route>
                    <Route exact path='/launch/:id'> <LaunchDetails /> </Route>
                    <Route exact path='/rocket/:id'> <RocketDetails /> </Route>
                    <Route exact path='/'> <HomePage /> </Route>
                </Switch>

            </Router>
        </div>
    );
}
export default App;