# Development steps

## Create a new version

## Create new npm package
* Use `npm pack` to create a tarball from a package (WARNING: make sure that the package.json file is updated)

## Install package from tarball
* Create a new temporary directory and change to it
* Use `npm install <tarball file>` to install from tarball file (e.g. `npm install node_plsql-0.0.12.tgz`)

## Deploy new npm package
* Use `npm publish` to publish a package (WARNING: cannot be undone)
* Use `npm pack` to create a package

## Deploy new prebuild binary
* Set `node_pre_gyp_accessKeyId` and `node_pre_gyp_secretAccessKey` environment variables
* Use `./node_modules/.bin/node-pre-gyp rebuild package publish` to publish the binaries on AWS S3

## Debugging
* Set the environment variable DEBUG to the module to debug or * for all modules before starting the server.

MacOS/Linux:
```bash
export DEBUG=*
```

Windows:
```bat
set DEBUG=*
```

## Linting
* `gulp lint`


## Unit test
* `gulp test`
