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
  const [countOfShowMovies, setCountOfShowMovies] = useState(0);
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

function handleMovies(movies, searchQuery) {
  setShortMoviesList([]);
  setSearchMovies([]);
  setIsSearched(true);
  setNotFoundMovie(false);
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
    }
    setSearchMovies(longMovies);
    localStorage.setItem('search-movies', JSON.stringify(longMovies));
    localStorage.setItem('search-word', searchQuery);
    localStorage.setItem('checkbox', isActiveCheckbox);
  }
}

function handleSearchMovies(searchQuery) {
  setPreloader(true);
  const searchMovies = localStorage.getItem('all-movies') ? JSON.parse(localStorage.getItem('all-movies')) : null;
  if (searchMovies) {
    handleMovies(searchMovies, searchQuery);
    setPreloader(false);
  } else {
    apiMovies.getAllMovies()
      .then((movies) => {
        if (movies) {
          localStorage.setItem('all-movies', JSON.stringify(movies));
          handleMovies(movies, searchQuery);
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
}

function handleSearchSaveMovies(searchQuery) {
  setSearchQuerySaveMovies(searchQuery);
  setIsSearched(true);
  setNotFoundMovie(false);
  setSearchSaveMovies([]);
    if (isActiveCheckboxSave === true) {
      const shortMovies = savedMovies.filter((movie) => {
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
      const longMovies = savedMovies.filter((movie) => {
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
}

function showMovies() {
  if (widthOfWindow >= 1280) {
    setCountOfShowMovies(12); 
    setCountOfAddMovies(3);
  } else if (widthOfWindow >= 768) {
    setCountOfShowMovies(8);
    setCountOfAddMovies(2);
  } else if (widthOfWindow <= 480) {
    setCountOfShowMovies(5);
    setCountOfAddMovies(5);
  }
}

function checkedButtonElse() {
  if (countOfMovies > 3 && countOfShowMovies < countOfMovies) {
    setBtnElse(true);
  } else {
    setBtnElse(false);
  }
}

function addCard() {
  if(searchMovies.length - countOfShowMovies > countOfAddMovies) {
    setCountOfShowMovies(countOfShowMovies + countOfAddMovies);
  } else {
    setBtnElse(false);
    setCountOfShowMovies(searchMovies.length);
  }
}
  useEffect(() => {
    if (loggedIn) {
      setCountOfMovies(searchMovies.length);
    }
  }, [searchMovies])


useEffect(() => {
  if (loggedIn) {
    checkedButtonElse();
  }
}, [countOfMovies]);

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

function handleRegister(data) {
  apiMain.register(data)
  .then((res) => {
    handleLogin({email: data.email, password: data.password});
    return res;   
  })
  .catch((err) => {
    setIsErrorMessage(true);
    setErrorMessage((err === 409) ? "???????????????????????? ?? ?????????? email ?????? ????????????????????." : "?????? ?????????????????????? ???????????????????????? ?????????????????? ????????????.");
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
    setErrorMessage("???? ?????????? ???????????????????????? ?????????? ?????? ????????????");
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
    console.log(`Error ${err.status}: ${err.text}`)
  })
  .finally(() => setIsChecked(true));
}

useEffect(() => {
  checkToken();
}, []);

// eslint-disable-next-line react-hooks/exhaustive-deps
function onUpdateUserData(data) {
  apiMain.changeUser(data)
  .then((res) => {
    setCurrentUser(res);
    setIsErrorMessage(true);
    setErrorMessage("???????????? ???????????????????????? ?????????????? ??????????????????.");
  })
  .catch(() => {
    setIsErrorMessage(true);
    setErrorMessage("?????? ???????????????????? ?????????????? ?????????????????? ????????????.");
  })
  .finally(() => {
    setTimeout(() => {
    setIsErrorMessage(false);
    setErrorMessage("");
    }, 5000)
  })
}

function handleSavedMovies(currentMovie) {
  const isLiked = savedMovies.some(i => (i.movieId === currentMovie.movieId)) || currentMovie.owner;
    if (!isLiked) {
      apiMain.likeMovie(currentMovie)
      .then((card) => {
        setSavedMovies([...savedMovies, card]);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      const id = currentMovie._id || currentMovie.movieId;
      apiMain.deleteMovie(id)
      .then(() => {
        const arr = savedMovies.filter(item => id !== item._id);     
        setSavedMovies([...arr]);
      })
      .catch((err) => {
        console.log(err)
      })
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
      const searchWord = localStorage.getItem('search-word');
      handleSearchMovies(searchWord);
    }
}, [isActiveCheckbox]);

useEffect(() => {
  handleSearchSaveMovies(searchQuerySaveMovies);
}, [isActiveCheckboxSave, savedMovies]);

useEffect(() => {
  const searchedMovies = JSON.parse(localStorage.getItem('search-movies'));
  const searchWord = localStorage.getItem('search-word');
  setSearchWord(searchWord);
  if (searchedMovies && searchedMovies !== []) {
    setSearchMovies(searchedMovies);
  }
}, [loggedIn, shortMoviesList]);

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
    setCountOfMovies(0);
    setShortMoviesList([]);
    setLoggedIn(false);
    setSearchWord('');
    setNotFoundMovie(false);
    localStorage.removeItem('search-movies');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('search-word');
    localStorage.removeItem('all-movies');
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
          {isChecked && <ProtectedRoute path="/profile" loggedIn={loggedIn} component={Profile} onSignOut={signOut} userName={currentUser.name} userEmail={currentUser.email} setCurrentUser={checkToken} />}

          {isChecked && <ProtectedRoute path="/profile-update" loggedIn={loggedIn} onUpdateUserData={onUpdateUserData} component={ProfileUpdate} errorMessage={errorMessage} isErrorMessage={isErrorMessage} />}
          
          {isChecked && <ProtectedRoute path="/movies" moviesCards={searchMovies.slice(0, countOfShowMovies)} searchMovies={handleSearchMovies} preloader={preloader} handleSavedMovies={handleSavedMovies} loggedIn={loggedIn} component={Movies} filterShortMovies={filterShortMovies} addCard={addCard} btnElse={btnElse} moviesSavedCards={savedMovies} isActiveCheckbox={isActiveCheckbox} notFoundMovie={notFoundMovie} searchWord={searchWord} />}

          {isChecked && <ProtectedRoute path="/saved-movies" handleSavedMovies={handleSavedMovies} isSearched={isSearched} searchMovies={handleSearchSaveMovies} filterShortMovies={filterShortSaveMovies} moviesSavedCards={savedMovies || []} searchSaveMovies={searchSaveMovies} loggedIn={loggedIn} component={SavedMovies} isActiveCheckbox={isActiveCheckboxSave} notFoundMovie={notFoundMovie} searchWord={searchQuerySaveMovies} />}
                 
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
