<img align="right" width="245" height="225" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/thirdParty.png">

# Third Party Tooling

This summarizes the third party tools and apis that are used in this codebase.

## Table of Contents

* [I. Architecture](#i-architecture)
* [II. Youtube](#ii-youtube)

## I. Architecture

The `thirdParty/` folder in the `src/` folder contains scripts used for handing third party
tooling and apis. It currently has the following folders:

```
thirdParty/
  |- youtube/
```

## II. Youtube

The youtube folder contains source code that communicates with Google's Youtube Data Api. Further
documentation can be found here:
  * [Summary of Google's Node.js Client Api](https://github.com/googleapis/google-api-nodejs-client#google-apis-nodejs-client)
    * [Implementation examples for the Youtube Api](https://github.com/googleapis/google-api-nodejs-client/tree/master/samples/youtube)
  * [Youtube Data Api Node.js quickstart guide](https://developers.google.com/youtube/v3/quickstart/nodejs)

Google also provides an api console to manage the our api resources and credentials, found
[here](https://console.developers.google.com/apis/credentials?showWizardSurvey=true&project=mybord).
