import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'

import { Header } from './components/Header';
import Sidebar from './components/Sidebar';
import PlayBar from './components/PlayBar';
import Home from './pages/Home';
import Genres from './pages/Genres';
import AllReleases from './pages/AllReleases';
import AlbumPage from './pages/AlbumPage';
import { requestCategories, setHasDownloadError } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import PremiumPage from './pages/Premium';
import AccountPage from './pages/Account';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';
import { selectDownloadErrorMessage, selectHasDownloadError } from './redux/selectors';

export default function App() {
  const dispatch = useDispatch();
  const hasDownloadError = useSelector(selectHasDownloadError);
  const downloadErrorMessage = useSelector(selectDownloadErrorMessage);
  const { addToast } = useToasts();
  useEffect(() => {
    if (!hasDownloadError) return;
    addToast(downloadErrorMessage, {
      appearance: 'error',
      autoDismiss: true,
    });
    setTimeout(() => dispatch(setHasDownloadError(false)), 1000);
  }, [downloadErrorMessage, hasDownloadError, addToast, dispatch]);
  dispatch(requestCategories());
  return (
    <Router>
      <Sidebar/>
      <LoginPage/>
      <Header/>
      <div className="custom-container pl-5 pr-5">
        <Switch>
          <Route path="/genres/:slug">
            <Genres/>
          </Route>
          <Route path="/genres">
            <Genres/>
          </Route>
          <Route path="/all-releases/:publisherSlug">
            <AllReleases/>
          </Route>
          <Route path="/all-releases">
            <AllReleases/>
          </Route>
          <Route path="/album/:slug">
            <AlbumPage/>
          </Route>
          <Route path="/premium">
            <PremiumPage/>
          </Route>
          <Route path="/account">
            <AccountPage/>
          </Route>
          <Route path="/contact">
            <ContactPage/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
      <PlayBar/>
    </Router>
  );
}
