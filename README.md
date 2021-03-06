# React Shopping Cart
Simple React Shopping Cart without using Redux

## Setup

Goto the project folder and install required dependencies:
```
npm install
```

And run Webpack to watch for code changes and bundle js and scss files:
```
webpack
```

For production build:

```
webpack -p
```

Now open **index.html** in your browser to view the live page.

### Additional Info
* You may get **CORS** error, when running this app in your local machine. Open index.js and use **products.json** as url.

* I used localhost of my Wamp server to run this app, you can even use [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) to  create a handy *http* server or any other of your choice.
