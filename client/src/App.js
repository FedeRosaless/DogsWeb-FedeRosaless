import './App.css';
import Home from './components/home';
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import newDog from './components/newDog';
import Detail from './components/details';
import LandingPage from './components/landing';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage}></Route>
        <Route exact path='/home' component={Home}></Route>
        <Route exact path='/dog' component={newDog}></Route>
        <Route exact path='/details/:id' component={Detail}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
