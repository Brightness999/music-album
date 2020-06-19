import React, { useEffect, useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import LoadingBar from 'react-top-loading-bar';

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
import { selectDownloadErrorMessage, selectHasDownloadError, selectLoadingState } from './redux/selectors';
import { LoadingState } from './redux/store';
import history from './history';
import SearchPage from './pages/SearchPage';
import { environment } from './environments/envrionment';
import PickedReleases from './pages/PickedReleases';

export default function App() {
  const dispatch = useDispatch();
  const hasDownloadError = useSelector(selectHasDownloadError);
  const downloadErrorMessage = useSelector(selectDownloadErrorMessage);
  const [loadProgress, setLoadProgress] = useState(50);
  const loadingState = useSelector(selectLoadingState);
  const { addToast } = useToasts();
  useEffect(() => {
    if (!hasDownloadError) return;
    addToast(downloadErrorMessage, {
      appearance: 'error',
      autoDismiss: true,
    });
    setTimeout(() => dispatch(setHasDownloadError(false)), 1000);
  }, [downloadErrorMessage, hasDownloadError, addToast, dispatch]);
  useEffect(() => {
    dispatch(requestCategories());
  });
  useEffect(() => {
    if (loadingState === LoadingState.LOADING) {
      setLoadProgress(20);
    } else {
      setLoadProgress(100);
    }
  }, [loadingState]);
  return (
    <Router history={history}>
      <LoadingBar
          progress={loadProgress}
          height={3}
          color='white'
          onLoaderFinished={() => setLoadProgress(0)}
      />
      <Sidebar/>
      {
        !environment.TEST_MODE && <LoginPage/>
      }
      <Header/>
      <div className="custom-container pl-5 pr-5">
        <Switch>
          <Route path="/genres/:slug/s/:showMode/p/:page">
            <Genres/>
          </Route>
          <Route path="/all-releases/s/:showMode/p/:page">
            <AllReleases/>
          </Route>
          <Route path="/vinyl/s/:showMode/p/:page">
            <PickedReleases type='vinyl'/>
          </Route>
          <Route path="/bandcamp/s/:showMode/p/:page">
            <PickedReleases type='bandcamp'/>
          </Route>
          <Route path="/all-releases/:publisherSlug/s/:showMode/p/:page">
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
          <Route path="/search/:keyword/p/:page">
            <SearchPage/>
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
