import React, { useState, useEffect } from "react";
import './App.css';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProfileUpdate from '../ProfileUpdate/ProfileUpdate';
import apiMovies from '../../utils/MoviesApi';
import apiMain from '../../utils/MainApi';

function App() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchQuerySaveMovies, setSearchQuerySaveMovies] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [preloader, setPreloader] = useState(false);
  const [notFoundMovie, setNotFoundMovie] = useState(false);
  const [widthOfWindow, setWidthOfWindow] = useState(window.innerWidth);
  const [isSearched, setIsSearched] = useState(false);
  const [countOfAddMovies, setCountOfAddMovies] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [btnElse, setBtnElse] = useState(false);
  const [countOfMovies, setCountOfMovies] = useState(0);
  const [isActiveCheckbox, setIsActiveCheckbox] = useState(false);
  const [isActiveCheckboxSave, setIsActiveCheckboxSave] = useState(false);
  const [shortMoviesList, setShortMoviesList] = useState([]);
  const [searchSaveMovies, setSearchSaveMovies] = useState([]);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const history = useHistory();

function filterShortMovies() {
  setIsActiveCheckbox(!isActiveCheckbox);
}

function filterShortSaveMovies() {
  setIsActiveCheckboxSave(!isActiveCheckboxSave);
}
  
function handleSearchMovies(searchQuery) {
  setShortMoviesList([]);
  setSearchMovies([]);
  setPreloader(true);
  setIsSearched(true);
  setNotFoundMovie(false);
  apiMovies.getAllMovies()
  .then((movies) => {
    if (movies) {
      if (isActiveCheckbox === true) {
        const shortMovies = movies.filter((movie) => {  
          if (movie.nameRU.toLowerCase().includes(searchQuery.toString().toLowerCase()) && movie.duration <= 40) {
            return movie.nameRU;
          } else {
            return null;
          }
        })
        if (shortMovies.length === 0) {
          setNotFoundMovie(true);       
        } else if (shortMovies.length <= 2) {
          setBtnElse(false);
        } else if (shortMovies.length > 3) {
          setBtnElse(true);
        } else if (countOfMovies < countOfAddMovies) {
          setBtnElse(false);
        }
        setShortMoviesList(shortMovies);
        localStorage.setItem('search-movies', JSON.stringify(shortMovies));
        localStorage.setItem('search-word', searchQuery);
        localStorage.setItem('checkbox', isActiveCheckbox);
      } else {
        // eslint-disable-next-line array-callback-return
        const longMovies = movies.filter((movie) => {  
          if (movie.nameRU.toLowerCase().includes(searchQuery.toString().toLowerCase())) {
            return movie.nameRU;
          } else if (movie.nameEN.toLowerCase().includes(searchQuery.toString().toLowerCase())) {
            return movie.nameEN;
          }
        })
        if (longMovies.length === 0) {
          setNotFoundMovie(true);
          setBtnElse(false);
        } else if (longMovies.length <= 2) {
          setBtnElse(false);
        } else if (longMovies.length > 3) {
          setBtnElse(true);
        } else if (countOfMovies < countOfAddMovies) {
          setBtnElse(false);
        }
        setSearchMovies(longMovies);
        localStorage.setItem('search-movies', JSON.stringify(longMovies));
        localStorage.setItem('search-word', searchQuery);
        localStorage.setItem('checkbox', isActiveCheckbox);
      }
    } else {
      setSearchMovies([]);
    }
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setPreloader(false);
  })
}

function handleSearchSaveMovies(searchQuery) {
  setSearchQuerySaveMovies(searchQuery);
  setIsSearched(true);
  setNotFoundMovie(false);
  setSearchSaveMovies([]);
  setPreloader(true);
    apiMain.getSavedMovies()
    .then((movies) => {
      if (isActiveCheckboxSave === true) {
        const shortMovies = movies.filter((movie) => {
          if (movie.nameRU.toLowerCase().includes(searchQuery.toString().toLowerCase()) && movie.duration <= 40) {
            return movie.nameRU;
          } else {
            return null;
          }
        });
      if (shortMovies.length === 0) {
        setNotFoundMovie(true);
      }
      setSearchSaveMovies(shortMovies);
      } else {
        const longMovies = movies.filter((movie) => {
          if (movie.nameRU.toLowerCase().includes(searchQuery.toString().toLowerCase())) {
            return movie.nameRU;
          } else {
            return null;
          }
        });
        if (longMovies.length === 0) {
          setNotFoundMovie(true);
        }
        setSearchSaveMovies(longMovies);
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setPreloader(false);
    })
}

function showMovies() {
  if (widthOfWindow >= 1280) {
    setCountOfMovies(12); 
    setCountOfAddMovies(3);
  } else if (widthOfWindow >= 768) {
    setCountOfMovies(8);
    setCountOfAddMovies(2);
  } else if (widthOfWindow <= 480) {
    setCountOfMovies(5);
    setCountOfAddMovies(5);
  }
}

window.onresize = (() => {
  setTimeout(() => {
    setWidthOfWindow(window.innerWidth);
    showMovies();
  }, 700)
})

useEffect(() => {
  showMovies();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [widthOfWindow]);

window.onresize = (() => {
  setTimeout(() => {
    setWidthOfWindow(window.innerWidth);
    showMovies();
  }, 500)
})

function addCard() {
  if(searchMovies.length > countOfMovies) {
    setCountOfMovies(countOfMovies + countOfAddMovies);
  } else {
    setBtnElse(false);
    setCountOfMovies(searchMovies.length);
  }
}

function handleRegister(data) {
  apiMain.register(data)
  .then((res) => {
    handleLogin({email: data.email, password: data.password});
    return res;   
  })
  .catch((err) => {
    setIsErrorMessage(true);
    setErrorMessage((err === 409) ? "Пользователь с таким email уже существует." : "При регистрации пользователя произошла ошибка.");
  })
  .finally(() => {
    setTimeout(() => {
    setIsErrorMessage(false);
    setErrorMessage("");
    }, 5000);
  })
}

function handleLogin(data) {
  apiMain.authorize(data)
  .then(() => {
    setLoggedIn(true);
    history.push("/movies"); 
  })
  .catch((err) => {
    setIsErrorMessage(true);
    setErrorMessage("Вы ввели неправильный логин или пароль");
  })
  .finally(() => {
    setTimeout(() => {
    setIsErrorMessage(false);
    setErrorMessage("");
    }, 5000)
  })
}

useEffect(() => {
  if (loggedIn) {
    apiMain
    .getContent()
    .then((data) => {
      if (data) {
        setCurrentUser(data);
        setLoggedIn(true);
      }
    })
    .catch((err) => {
      console.log(err.name);
    })
  }
}, [loggedIn]);

function checkToken() {
  apiMain
  .getContent()
  .then((data) => {
    if (data) {
      setCurrentUser(data);
      setLoggedIn(true);
    }
  })
  .catch((err) => {
    setCurrentUser({
      id: '',
      name: '',
      email: '',
      isLoggedIn: false,
    })
    localStorage.removeItem('search-movies');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('search-word');
    console.log(`Error ${err.status}: ${err.text}`)
  })
  .finally(() => setIsChecked(true));
}

useEffect(() => {
  checkToken();
}, []);

function onUpdateUserData(data) {
  apiMain.changeUser(data)
  .then((res) => {
    setCurrentUser(res);
    setIsErrorMessage(true);
    setErrorMessage("Данные пользователя успешно обновлены.");
  })
  .catch((err) => {
    setIsErrorMessage(true);
    setErrorMessage("При обновлении профиля произошла ошибка.");
  })
  .finally(() => {
    setTimeout(() => {
    setIsErrorMessage(false);
    setErrorMessage("");
    }, 5000)
  })
}

function handleRemove(id) {
  setSavedMovies([
    ...savedMovies.filter(item => id !== item.movieId)
  ])
}
  
function handleSavedMovies(currentMovie) {
  const isLiked = savedMovies.some(i => (i.movieId === currentMovie.movieId)) || currentMovie.owner;
    if (isLiked) {
      const id = currentMovie._id || currentMovie.movieId;
      apiMain.deleteMovie(id)
      .then(() => {
        handleRemove(id);
        console.log('карточка удалена');
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      apiMain.likeMovie(currentMovie)
      .then(() => {
        apiMain.getSavedMovies()
      .then((data) => {
        setSavedMovies(data);
        console.log('карточка добавлена');
      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err.name);
    });
  }
}

useEffect(() => {
  if (loggedIn) {
    if (localStorage.getItem('checkbox')) {
      setIsActiveCheckbox(JSON.parse(localStorage.getItem('checkbox')));
    }
  }
}, [loggedIn]);

useEffect(() => {
  if (loggedIn) {
    if (localStorage.getItem('search-word')) {
      handleSearchMovies(localStorage.getItem('search-word'));
    }
  }
}, [isActiveCheckbox]);

useEffect(() => {
  handleSearchMovies(searchWord);
}, [isActiveCheckbox]);

useEffect(() => {
  handleSearchSaveMovies(searchQuerySaveMovies);
}, [isActiveCheckboxSave]);

useEffect(() => {
  setSavedMovies(savedMovies);
}, [searchSaveMovies, isActiveCheckboxSave, savedMovies]);

useEffect(() => {
  const searchedMovies = JSON.parse(localStorage.getItem('search-movies'));
  const searchWord = localStorage.getItem('search-word');
  setSearchWord(searchWord);
  if (searchedMovies && searchedMovies !== []) {
    setSearchMovies(searchedMovies);
  }
}, [loggedIn, shortMoviesList, searchSaveMovies]);

useEffect(() => {
  if (loggedIn) {
    apiMain.getSavedMovies()
    .then((data) => {
      setSavedMovies(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}, [loggedIn])

function signOut() {
  apiMain
  .signOut()
    .then(() => {
    history.push('/');
    setSearchMovies([]);
    isActiveCheckbox(false);
    isActiveCheckboxSave(false);
    setSearchMovies([]);
    setCountOfMovies(0);
    setSavedMovies([]);
    setSearchSaveMovies([]);
    setLoggedIn(false);
    setSearchWord('');
    setNotFoundMovie(false);
    localStorage.removeItem('search-movies');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('search-word');
    localStorage.clear();
  })
  .catch((err) => {
    console.log(err.name);
  });
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          {isChecked && <Route path ="/" exact>
            <Main loggedIn={loggedIn} />
          </Route>}
          <Route path="/signin">
            {loggedIn ? <Redirect to="/" /> : <Login onLogin={handleLogin} errorMessage={errorMessage} isErrorMessage={isErrorMessage} />}
          </Route>
          <Route path="/signup">
            {loggedIn ? <Redirect to="/" /> : <Register onRegister={handleRegister} errorMessage={errorMessage} isErrorMessage={isErrorMessage} />}
          </Route>
          {isChecked && <ProtectedRoute path="/profile" loggedIn={loggedIn} component={Profile} onSignOut={signOut} userName={currentUser.name} userEmail={currentUser.email} />}

          {isChecked && <ProtectedRoute path="/profile-update" loggedIn={loggedIn} onUpdateUserData={onUpdateUserData} component={ProfileUpdate} errorMessage={errorMessage} isErrorMessage={isErrorMessage} />}
          
          {isChecked && <ProtectedRoute path="/movies" moviesCards={searchMovies.slice(0, countOfMovies)} searchMovies={handleSearchMovies} preloader={preloader} handleSavedMovies={handleSavedMovies} loggedIn={loggedIn} component={Movies} filterShortMovies={filterShortMovies} addCard={addCard} btnElse={btnElse} moviesSavedCards={savedMovies} isActiveCheckbox={isActiveCheckbox} notFoundMovie={notFoundMovie} searchWord={searchWord} />}

          {isChecked && <ProtectedRoute path="/saved-movies" handleSavedMovies={handleSavedMovies} isSearched={isSearched} searchMovies={handleSearchSaveMovies} filterShortMovies={filterShortSaveMovies} moviesSavedCards={savedMovies || ''} searchSaveMovies={searchSaveMovies} loggedIn={loggedIn} component={SavedMovies} isActiveCheckbox={isActiveCheckboxSave} notFoundMovie={notFoundMovie} searchWord={searchWord} />}
                 
          {isChecked && 
          <Route path="*">
            <NotFoundPage />
          </Route>}

        </Switch> 
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
