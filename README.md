# Resource Overview
This is learning project about:
 1. [Sass](https://sass-lang.com/)
 2. [gulpjs](http://gulpjs.com/) 
 3. [nodejs](https://nodejs.org/en/)
 4. [npm](https://www.npmjs.com/)
 5. HTML 

 ### What is Sass?
  - CSS Extension that adds functionality to the CSS language.
  - Pre-processed language. Sass commands have to be translated into CSS, 
    so browsers can be understood.
  - Extensible and has been expanded through the use of plug-ins like 
    [Compass](http://compass-style.org/), [Bourbon](https://www.bourbon.io/) 
    and [Susy](http://oddbird.net/susy/).
  - Written in [Ruby](https://www.ruby-lang.org/en/).

### Sass Features: Variables
   ```
   $main_color: #333333;
   
   .navbar {
     background: $main_color;
   }
   
   h1, h2, h3 {
     background: darken($main_color, 20);
   }
   ```

### Sass Features: Nesting
   ```
   .pixgrid {
     ul {
       margin: 0;
       padding: 0;
       list-style: none;
       li {
         float: left;
         width: 96px;
         height: 96px;
         padding: 0 5px 5px 0;
       }
     }

   }
   ```

### Sass Features: Partials 
   ```
   // Core Partial
   @import "variables";
   @import "mixins";
   @import "base";
   @import "layout";
   
   // Import Modules
   @import "modules/intro";
   @import "modules/nav";
   @import "modules/welcome";
   @import "modules/events";
   ```

### Sass Features: Extend
   ```
   .btn {
     padding: 6px 12px;
     line-height: 140%;
     text-align: center;
     vertical-align: middle;
     border: 1px solid transparent;
     border-radius: 4px;
     background: #C61C6F;
     color: #FCF4DC;
   }
   .btn-reverse {
     @extend .btn;
     background: #FCF4DC;
     color: #C61C6F;
   }
   ```

### Sass Features: Extend
   ```
   $border_thickness: 1px;
   $thicker: $border_thickness * 5;
   
   .siderbar {
     @if ($border_thickness <= 1) {
       background-color: red;
     } @else {
       background-color: yellow;
     }
   }
   ```

### Sass can write in two different ways that are:
   1. Old way `.sass` extension.
   2. Newer syntax `.scss` extensio.

## Analyzing Sass installation options:
 - Sass has 3 types of release implementions:
   1. [Ruby Sass](https://sass-lang.com/ruby-sass) has been written in 
      [Ruby](https://www.ruby-lang.org/en/) and it was original implementation 
      of Sass, but it's since been deprecated. 
   2. [Dart Sass](https://sass-lang.com/dart-sass) is now primary implementation 
      which means it gets new features before any other implementation. It's fast, easy 
      to install, and it compiles to pure JavaScript which makes it easy to integrate 
      into modern web development workflows.
   3. [LibSass](https://sass-lang.com/libsass) is a C/C++ port of the Sass engine. 
      The point is to be simple, faster, and easy to integrate. It is just a library. 
      To run the code locally (i.e. to compile your stylesheets), we need an implementer, 
      or "wrapper". [LibSass](https://sass-lang.com/libsass) has many number of wrappers 
      that are written in different languages. Just few of them named here: 
      [node-sass](https://github.com/sass/node-sass), [sass.js](https://github.com/medialize/sass.js),
      [libsass-net](https://github.com/sass/libsass-net), [SassPHP](https://github.com/sensational/sassphp),
      [libsass-python](https://github.com/sass/libsass-python).

 - [Dart Sass](https://sass-lang.com/dart-sass) has been installed and implemented in this project.

## Working on automation workflow:
 - Browsers don't understand Sass by default, it has to be processed into CSS. 
   That means, we need to think about how Sass is going to fit into our workflow.
   There are some options available for processing Sass in CSS. We also need a 
   template where process going to be fit and that will take care of things automatically.
 - [Gulp.js](https://gulpjs.com/) is a workflow tool that allows us to create comprehensive workflows, that will 
   do things like minimize JavaScript, process Sass, and combine different files to reduce the number of calls
   that we have to make to a server.
 - So, template building process as following:
   1. Install [node.js](https://nodejs.org/en/) (*If don't install before*)
   2. Run command inside terminal `> npm init` (*Note: check before run command that directory has been whether point to project folder.*)
   3. Run `> npm install --global gulp-cli` [(*gulp js installation project*)](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/getting-started.md)
 - Dependencies:
   1. [jquery](): Run `> npm install --save jquery`
 - Dev Dependencies:
   1. [gulp v4.0.0](https://github.com/gulpjs/gulp#installation): Run `> npm install --save-dev gulp@next`
      or [gulp v3.9.1](https://github.com/gulpjs/gulp): Run `> npm install --save-dev gulp` and Create `gulpfile.js` file.
      gulp v3.9.1 and gulp v4.0.0 are different in configuration syntax. In this project, we use [gulp v4.0.0 and its configurations](https://github.com/gulpjs/gulp/blob/master/docs/getting-started/3-creating-tasks.md).
   2. [gulp-jshint](https://www.npmjs.com/package/gulp-jshint): Run `> npm install --save-dev jshint gulp-jshint`
   3. [gulp-dart-sass](https://www.npmjs.com/package/gulp-dart-sass): Run `> npm install --save-dev gulp-dart-sass`
   4. [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps): Run `> npm install --save-dev gulp-sourcemaps`
   5. [gulp-uglify](https://www.npmjs.com/package/gulp-uglify): Run `> npm install --save-dev gulp-uglify`
   6. [gulp-connect](https://www.npmjs.com/package/gulp-connect): Run `> npm install --save-dev gulp-connect`
   7. [browserify](https://www.npmjs.com/package/browserify): Run `> npm install --save-dev browserify`
   8. [jshint](https://www.npmjs.com/package/jshint): Run `> npm install --save-dev jshint`
   9. [vinyl-buffer](https://www.npmjs.com/package/vinyl-buffer): Run `> npm install --save-dev vinyl-buffer`
   10. [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream): Run `> npm install --save-dev vinyl-source-stream`
   11. [del](https://www.npmjs.com/package/del): Run `> npm install --save-dev del`
   12. [jshint-stylish](https://www.npmjs.com/package/jshint-stylish) Run `> npm install --save-dev jshint-stylish`
- Run gulp task command: `gulp`

## Setting up a folder structure:
   ```
   |- sass-codearx
      |- assets
         |- js
            |- scripts.js
         |- scss
            |- styles.scss
      |- dist
         |- css
            |- styles.css
         |- js
            |- bundle.js
      |- index.html
   ```
   
## License
 Single license MIT
