# Personal Portfolio

## Deployment

### Frontend

The frontend stack is based on Vue.js and on Firebase. Commands to init the project:
```bash
npm create vue@latest app
cd app
npm install
npm install firebase
npm install -g firebase-tools
firebase login
```

Afterwards, one can simply deploy the changes by running 
```bash
npm run build
firebase deploy
```

## Architecture