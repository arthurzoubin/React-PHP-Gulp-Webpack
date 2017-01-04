# React-PHP-Gulp-Webpack
React-PHP-Gulp-Webpack is an library that uses the power of Facebook's React library to render UI components on the server-side with PHP as well as on the client-side.

## Prerequisites
* Node & NPM

If you want to do server-side render
* Server running PHP 5.3.3+
* [V8Js PHP extension](http://php.net/v8js)

For a walkthrough how to setup V8Js PHP extension, use the links below:

- [On Linux](https://github.com/preillyme/v8js/blob/master/README.Linux.md)
- [On MacOS](https://github.com/preillyme/v8js/blob/master/README.MacOS.md)
- [On Windows](https://github.com/preillyme/v8js/blob/master/README.Win32.md)

## Install
* Clone the project
* Go to the project document
* Install dependencies: 

  ```
  npm install
  ```

## Usage

### Only React
* Run command: npm run local
* Open http://127.0.0.1:8888/

### PHP Server-side render
* Run command: npm run devandserver
* Create a example.php file
  
  ```php
  //Include library
  require_once ('./lib/ReactJS.php');
  
  //Server vendor
  $react_svendor = file_get_contents('/dist/server/svendor.js');
  
  //Server
  $react_server = file_get_contents('/dist/server/server.js');
  
  //Page
  $react_page = file_get_contents('/dist/server/pages/test.js');

  $reactJS = new ReactJS($react_svendor, $react_server, $react_page);
  
  //Props
  $props = array(
      "name"=>"React PHP"
  );
  
  $reactJS->setComponent("Test", $props);
  $react_page_string = $reactJS->getMarkup();

  ob_start();
  require("/dist/app/index.html");
  $html = ob_get_contents();
  ob_end_clean();
  
  echo $html
  ```

* If you want to create page, you should add {PAGE}.js in src/server/pages folder, this JS file need include the component and set it go global.page.

