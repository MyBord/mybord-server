exports.id = "main";
exports.modules = {

/***/ "./src/middleware/passport/initializePassport.ts":
/*!*******************************************************!*\
  !*** ./src/middleware/passport/initializePassport.ts ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _strategies_localStrategy_localStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strategies/localStrategy/localStrategy */ "./src/middleware/passport/strategies/localStrategy/localStrategy.ts");
/* harmony import */ var _strategies_localStrategy_localStrategyAuthentication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./strategies/localStrategy/localStrategyAuthentication */ "./src/middleware/passport/strategies/localStrategy/localStrategyAuthentication.ts");



const initializePassport = (prisma) => {
    passport__WEBPACK_IMPORTED_MODULE_0___default.a.use(
    // Adds local passport strategy so that users can authenticate with their local db
    // credentials.
    new _strategies_localStrategy_localStrategy__WEBPACK_IMPORTED_MODULE_1__["default"]((emailOrUsername, password, done) => (Object(_strategies_localStrategy_localStrategyAuthentication__WEBPACK_IMPORTED_MODULE_2__["default"])(emailOrUsername, password, done, prisma))));
    // We tell passport to save the user id's to the session
    passport__WEBPACK_IMPORTED_MODULE_0___default.a.serializeUser((user, done) => done(null, user.id));
    // We get back the matching user data from the session
    passport__WEBPACK_IMPORTED_MODULE_0___default.a.deserializeUser(async (id, done) => {
        const user = await prisma.query.user({ where: { id } });
        done(null, user);
    });
};
/* harmony default export */ __webpack_exports__["default"] = (initializePassport);


/***/ }),

/***/ "./src/middleware/passport/strategies/localStrategy/localStrategyAuthentication.ts":
/*!*****************************************************************************************!*\
  !*** ./src/middleware/passport/strategies/localStrategy/localStrategyAuthentication.ts ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (async (emailOrUsername, password, done, prisma) => {
    try {
        console.log('aaaaaaaa');
        console.log(emailOrUsername);
        const user = await prisma.query.user({
            where: { email },
        });
        console.log('bbbbbbbbbb');
        let doesPasswordMatch;
        if (user) {
            doesPasswordMatch = await bcryptjs__WEBPACK_IMPORTED_MODULE_0___default.a.compare(password, user.password);
        }
        const error = (!user || !doesPasswordMatch) ? new Error('Unable to login') : null;
        done(error, user);
    }
    catch (error) {
        throw new Error(error);
    }
});


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWlkZGxld2FyZS9wYXNzcG9ydC9pbml0aWFsaXplUGFzc3BvcnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pZGRsZXdhcmUvcGFzc3BvcnQvc3RyYXRlZ2llcy9sb2NhbFN0cmF0ZWd5L2xvY2FsU3RyYXRlZ3lBdXRoZW50aWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBZ0M7QUFFcUM7QUFDNEI7QUFFakcsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLE1BQWMsRUFBUSxFQUFFO0lBQ2xELCtDQUFRLENBQUMsR0FBRztJQUNWLGtGQUFrRjtJQUNsRixlQUFlO0lBQ2YsSUFBSSwrRUFBYSxDQUFDLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQ3JELHFHQUEyQixDQUFDLGVBQWUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUNyRSxDQUFDLENBQ0gsQ0FBQztJQUVGLHdEQUF3RDtJQUN4RCwrQ0FBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFakUsc0RBQXNEO0lBQ3RELCtDQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDMUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRWEsaUZBQWtCLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN4QmxDO0FBQUE7QUFBQTtBQUE4QjtBQUlmLG9FQUFLLEVBQ2xCLGVBQXVCLEVBQ3ZCLFFBQWdCLEVBQ2hCLElBQVUsRUFDVixNQUFjLEVBQ2QsRUFBRTtJQUNGLElBQUk7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNuQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUU7U0FDakIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUxQixJQUFJLGlCQUFpQixDQUFDO1FBQ3RCLElBQUksSUFBSSxFQUFFO1lBQ1IsaUJBQWlCLEdBQUcsTUFBTSwrQ0FBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25FO1FBRUQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVsRixJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ25CO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hCO0FBQ0gsQ0FBQyxFQUFDIiwiZmlsZSI6Im1haW4uNGZkNWY5MmNkNGIyODM4MmI5NjIuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXNzcG9ydCBmcm9tICdwYXNzcG9ydCc7XG5pbXBvcnQgeyBQcmlzbWEgfSBmcm9tICdwcmlzbWEtYmluZGluZyc7XG5pbXBvcnQgTG9jYWxTdHJhdGVneSBmcm9tICcuL3N0cmF0ZWdpZXMvbG9jYWxTdHJhdGVneS9sb2NhbFN0cmF0ZWd5JztcbmltcG9ydCBsb2NhbFN0cmF0ZWd5QXV0aGVudGljYXRpb24gZnJvbSAnLi9zdHJhdGVnaWVzL2xvY2FsU3RyYXRlZ3kvbG9jYWxTdHJhdGVneUF1dGhlbnRpY2F0aW9uJztcblxuY29uc3QgaW5pdGlhbGl6ZVBhc3Nwb3J0ID0gKHByaXNtYTogUHJpc21hKTogdm9pZCA9PiB7XG4gIHBhc3Nwb3J0LnVzZShcbiAgICAvLyBBZGRzIGxvY2FsIHBhc3Nwb3J0IHN0cmF0ZWd5IHNvIHRoYXQgdXNlcnMgY2FuIGF1dGhlbnRpY2F0ZSB3aXRoIHRoZWlyIGxvY2FsIGRiXG4gICAgLy8gY3JlZGVudGlhbHMuXG4gICAgbmV3IExvY2FsU3RyYXRlZ3koKGVtYWlsT3JVc2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IChcbiAgICAgIGxvY2FsU3RyYXRlZ3lBdXRoZW50aWNhdGlvbihlbWFpbE9yVXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lLCBwcmlzbWEpXG4gICAgKSksXG4gICk7XG5cbiAgLy8gV2UgdGVsbCBwYXNzcG9ydCB0byBzYXZlIHRoZSB1c2VyIGlkJ3MgdG8gdGhlIHNlc3Npb25cbiAgcGFzc3BvcnQuc2VyaWFsaXplVXNlcigodXNlcjogYW55LCBkb25lKSA9PiBkb25lKG51bGwsIHVzZXIuaWQpKTtcblxuICAvLyBXZSBnZXQgYmFjayB0aGUgbWF0Y2hpbmcgdXNlciBkYXRhIGZyb20gdGhlIHNlc3Npb25cbiAgcGFzc3BvcnQuZGVzZXJpYWxpemVVc2VyKGFzeW5jIChpZCwgZG9uZSkgPT4ge1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEucXVlcnkudXNlcih7IHdoZXJlOiB7IGlkIH0gfSk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbml0aWFsaXplUGFzc3BvcnQ7XG4iLCJpbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCB7IERvbmUgfSBmcm9tICd0eXBlcy9wYXNzcG9ydFR5cGVzJztcbmltcG9ydCB7IFByaXNtYSB9IGZyb20gJ3ByaXNtYS1iaW5kaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKFxuICBlbWFpbE9yVXNlcm5hbWU6IHN0cmluZyxcbiAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgZG9uZTogRG9uZSxcbiAgcHJpc21hOiBQcmlzbWEsXG4pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZygnYWFhYWFhYWEnKTtcbiAgICBjb25zb2xlLmxvZyhlbWFpbE9yVXNlcm5hbWUpO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEucXVlcnkudXNlcih7XG4gICAgICB3aGVyZTogeyBlbWFpbCB9LFxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coJ2JiYmJiYmJiYmInKTtcblxuICAgIGxldCBkb2VzUGFzc3dvcmRNYXRjaDtcbiAgICBpZiAodXNlcikge1xuICAgICAgZG9lc1Bhc3N3b3JkTWF0Y2ggPSBhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG4gICAgfVxuXG4gICAgY29uc3QgZXJyb3IgPSAoIXVzZXIgfHwgIWRvZXNQYXNzd29yZE1hdGNoKSA/IG5ldyBFcnJvcignVW5hYmxlIHRvIGxvZ2luJykgOiBudWxsO1xuXG4gICAgZG9uZShlcnJvciwgdXNlcik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=