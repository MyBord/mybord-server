# Third Party tooling

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

The youtube folder contains source code that communicates with 
AnyChart is the third party tool used to create and implement charts into Archa. You can find
some resources below.

The anyChart folder has the following scripts / files:
```
anyChart/
  |- __tests__/ 
  |- anyChart.ts
  |- getSeriesData.ts
  |- sampleChartData.ts
  |- theme.ts
```

* **__tests__/:**
    * Contains test scripts for the other anyChart scripts.
* **`anyChart.ts`:**
    * takes a chart type and data, transforms it, and returns a react chart.
* **`getSeriesData.ts`:**
    * takes data and transforms it such that anyChart can use it in a graph / chart.
* **`sampleChartData.ts`:**
    * sample chart data that can be used when writing tests or stories.
* **`theme.ts`:**
    * a series of configurations that can then theme a chart instance according to archa's
     branding and styling.

Resources:

* [Main Website](https://www.anychart.com)
* [JS Source Code](https://github.com/AnyChart/AnyChart)
* [React Plugin Source Code](https://github.com/AnyChart/AnyChart-React)
* [Further documentation and resources](https://www.anychart.com/products/anychart/docs/)


## III. Google Analytics

Google Analytics is integrated into this app for various tracking purposes. We add the javascript
 tracking snippet, as outlined [here](https://developers.google.com/analytics/devguides/collection/analyticsjs/),
 in our googleAnalytics.js script, and we call analytics.js via the window function. For more 
 documentation, see [here](https://developers.google.com/analytics/devguides/collection/analyticsjs/how-analyticsjs-works).
 
## IV. LogRocket

LogRocket is used with Sentry to record and replay user sessions, in particular when an error 
occurs. LogRocket is initialized when the app is initialized.

Resources:

* [LogRocket Home](https://logrocket.com/)
* [Docs](https://docs.logrocket.com/docs)
* [LogRocket & Sentry](https://blog.logrocket.com/extending-sentry-with-logrocket-52e2f5b67d5a/)
* [LogRocket & Sentry Docs](https://docs.logrocket.com/docs/sentry)

## V. Sentry

Sentry is used to report errors across our application stack. It is initialized when the app is 
initialized, and is configured such that each exception log will tell us which user received 
which reception. Errors are dispatched to Sentry via the `captureException` function.

Resources:

* [Sentry and React](https://docs.sentry.io/platforms/javascript/react/)
* [Sentry and Fat Panda - front end](https://sentry.io/all-campus/fat-panda-frontend-staging/getting-started/javascript-react/)
* [Capturing the user](https://docs.sentry.io/enriching-error-data/context/?platform=browser#capturing-the-user)
 
## VI. Storybook

Documentation regarding storybook implementation can be found
[here](https://bitbucket.org/allcampus/bei-bei/src/master/docs/storybook.md).

## VII. Twilio

## VIII. Unlayer

Unlayer is the tool that we implement to create and edit email templates within our application.

* [Main Website](https://unlayer.com/)
* [Documenation](https://docs.unlayer.com/docs)
