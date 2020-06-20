# House Language

This project is frontend part of House Language([https://house-language.com](https://house-language.com), [https://house-language.me](https://house-language.me)) website. <br/>
Backend can be found in [https://github.com/captain328/music-album](https://github.com/captain328/music-album).

## Available Scripts

In the project directory, you can run:

### `yarn start`
Runs the app in the development mode.<br />
Backend API: [http://localhost:8000](http://localhost:8000) <br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br />

### `yarn start:com`
Runs the app in the development mode.<br />
Backend API: [http://house-language.com](http://house-language.com) <br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br />

### `yarn start:me`
Runs the app in the development mode.<br />
Backend API: [http://house-language.me](http://house-language.me) <br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br />

### `yarn build:com`
Builds the app for production to the `build` folder.<br />
Backend API: [http://house-language.com](http://house-language.com) <br />
It is post-processed for laravel deploy. 

### `yarn build:me`
Builds the app for production to the `build` folder.<br />
Backend API: [http://house-language.me](http://house-language.me) <br />
It is post-processed for laravel deploy.

### `yarn transform-index`
Transform build/index.html to be used for laravel deploy. (replace static url content)

### `yarn test`
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


### Note
Python 3.6 or above must be installed and `py` must be found in system path.<br/>
<br/>
In linux you can do like this.<br/>
```bash
sudo ln -s /path/to/python3 /usr/bin/py
```

### Deployment Guide
1. Make production files ready with one of the following build scripts.
```
yarn build:me
```
or
```
yarn build:com
```
This will generate build directory.
```
build
  |----static
  |      |----css
  |      |----js
  |----index.html
...
```
2. Use ftp to copy `build/static/*` to `/var/www/vhosts/house-language.com/httpdocs/public/assets/spa/` in server.
3. Replace the content of `/var/www/vhosts/house-language.com/httpdocs/app/views/spa/index.blade.php` with `build/index.html`.
