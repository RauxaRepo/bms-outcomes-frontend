# BMS Outcomes - Front-end Build


## make sure to update graceful-fs and minimatch ( mac specific )
`yarn upgrade graceful-fs` or `npm upgrade graceful-fs`
`yarn upgrade minimatch` or `npm upgrade graceful-fs`

## GETTING STARTED
I prefer Yarn but you can also use NPM   ( i would like you better if you use Yarn )  
`yarn install` or `npm install`.  

These will install all dependencies.  

*when running Yarn/Npm it will generate yarn.lock/package-lock.json, when running Npm you cannot have yarn.lock, when running Yarn you cannot have package-lock.json. Based on package manager, please delete the necessary lock file.  

## SCSS LINT
Quick note, you will get sass-lint hints only for the contents of certain style folders under `src/styles/_includes/` to mitigate false positives on the outer, global(ugly) files, such as resets, mixins, tool classes etc. Please try and apply these suggestions as soon as you get any. Build will not fail on error.

## ES LINT
All of the `.js` files under `src/scripts/` will be evaluated for ES lint suggestions using airbnb guidelines. Please try and apply these suggestions as soon as you get any. Build will not fail on error.

## RUNNING PROJECT
### Development Mode
cd to the project root, and run `npm run dev`, this will spin up your local server, and show dev logs, sourcemaps, unminify code, provide linting suggestions etc. 

When finished deving and you're ready to create a PR to merge into develop, re-rerun the project in prod mode, this way we only have prod ready assets and files on the repo.

### Production Mode
Once you're ready to hand off you can run `npm run prod` or `yarn run prod`  
this will recompile, not launch browser and will remove sourcemaps and minified code.
When pushing code to staging please make sure to push the production compiled code.

## FOLDER STRUCTURE
```
.projectRoot
|---- .starterKit | contains build bootstrapper files
|
|---- dist        | directory holds compiled and js/scss, images, and html
|
|---- src
|       |---- images       | contains image assets
|       |---- scripts      | contains raw js 
|       |---- styles       | contains scss files
|       |---- templates    | contains html and handlebars files
|
```


