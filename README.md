[![Travis CI](https://api.travis-ci.org/binarious/meditation-plus-angular.svg)](https://travis-ci.org/binarious/meditation-plus-angular)
[![Dependency Status](https://david-dm.org/binarious/meditation-plus-angular.svg)](https://david-dm.org/binarious/meditation-plus-angular)

# Angular2 Client for Meditation+ REST API

## Quick Start

### Configuration
Add a `src/api.config.ts`:

```js
export let ApiConfig = {
  url: 'http://localhost:3002' // our REST endpoint
};
```
### Add required global libraries
```
  npm install typings webpack-dev-server rimraf webpack -g
```

### Install dependencies and run
```
npm install
typings install
npm run start:hmr
```

## TODO
- [x] Material Design
- [x] Meditations
- [x] Chats
- [x] Support Android 4.3 & iOS 8
- [x] Differentiate between finished and active meditation
- [x] Flags
- [x] Profiles
- [x] Schedules
- [x] Commitments
- [x] WebSockets
- [ ] WebRCT
- [x] Guide
- [ ] Quote
- [ ] Settings (?)
- [ ] Alarms (?)
- [x] Help
