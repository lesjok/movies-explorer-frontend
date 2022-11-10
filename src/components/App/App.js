import './App.css';
import { Route, Switch } from 'react-router-dom'
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProfileUpdate from '../ProfileUpdate/ProfileUpdate';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/profile-update">
          <ProfileUpdate />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path ="/" exact>
          <Main />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch> 
    </div>
  );
}

export default App;
