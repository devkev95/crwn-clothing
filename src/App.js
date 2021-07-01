import { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth } from './firebase/firebase.utils'

function App() {
  const [ currentUser, changeCurrentUser ] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      const unsubscribeFromAuth = changeCurrentUser(user)
      return () => {
        unsubscribeFromAuth()
      }
    })
  }, [])

  return (
    <div>
     <Header currentUser={currentUser} />
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='/shop'>
          <ShopPage />
        </Route>
        <Route path='/signin'>
          <SignInAndSignUpPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
