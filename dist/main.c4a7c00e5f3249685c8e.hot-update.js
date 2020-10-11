exports.id = "main";
exports.modules = {

/***/ "./src/schema/user/userResolvers/userMutations/createUser.ts":
/*!*******************************************************************!*\
  !*** ./src/schema/user/userResolvers/userMutations/createUser.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../userUtils/userUtils */ "./src/schema/user/userUtils/userUtils.ts");
/* harmony import */ var _userUtils_validateUsername__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../userUtils/validateUsername */ "./src/schema/user/userUtils/validateUsername.ts");



/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma }, info) => {
    try {
        Object(_userUtils_validateUsername__WEBPACK_IMPORTED_MODULE_2__["default"])(args.data.username);
        const password = await Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["hashPassword"])(args.data.password);
        const finalArgs = {
            ...args,
            data: {
                ...args.data,
                password,
            },
        };
        const user = await prisma.mutation.createUser(finalArgs, info);
        passport.login({ authenticateOptions: args.data, user });
        return Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["restrictUserData"])(user);
    }
    catch (error) {
        if (error.message === 'invalid username') {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: 'invalid username', status: 400 });
        }
        if (error.message.includes('unique constraint')) {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: 'duplicate user', status: 400 });
        }
        if (error.message === 'password is weak') {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: error.message, status: 400 });
        }
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"](error);
    }
});


/***/ }),

/***/ "./src/schema/user/userResolvers/userMutations/userMutations.ts":
/*!**********************************************************************!*\
  !*** ./src/schema/user/userResolvers/userMutations/userMutations.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createUser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createUser */ "./src/schema/user/userResolvers/userMutations/createUser.ts");
/* harmony import */ var _loginUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loginUser */ "./src/schema/user/userResolvers/userMutations/loginUser.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    createUser: _createUser__WEBPACK_IMPORTED_MODULE_0__["default"],
    loginUser: _loginUser__WEBPACK_IMPORTED_MODULE_1__["default"],
});


/***/ }),

/***/ "./src/schema/user/userUtils/validateUsername.ts":
/*!*******************************************************!*\
  !*** ./src/schema/user/userUtils/validateUsername.ts ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((username) => {
    const regex = RegExp(/^[\w\d_.-]+$/g);
    if (!regex.test(username)) {
        throw new Error('invalid username');
    }
});


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyTXV0YXRpb25zL2NyZWF0ZVVzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS91c2VyL3VzZXJSZXNvbHZlcnMvdXNlck11dGF0aW9ucy91c2VyTXV0YXRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvdXNlci91c2VyVXRpbHMvdmFsaWRhdGVVc2VybmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FBQzhCO0FBQ1g7QUFFakQsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2hFLElBQUk7UUFDRiwyRUFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sUUFBUSxHQUFHLE1BQU0seUVBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sU0FBUyxHQUFHO1lBQ2hCLEdBQUcsSUFBSTtZQUNQLElBQUksRUFBRTtnQkFDSixHQUFHLElBQUksQ0FBQyxJQUFJO2dCQUNaLFFBQVE7YUFDVDtTQUNGLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUvRCxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXpELE9BQU8sNkVBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDL0I7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxrQkFBa0IsRUFBRTtZQUN4QyxNQUFNLElBQUksMERBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNyRTtRQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUMvQyxNQUFNLElBQUksMERBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNuRTtRQUNELElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxrQkFBa0IsRUFBRTtZQUN4QyxNQUFNLElBQUksMERBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsTUFBTSxJQUFJLDBEQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUI7QUFDSCxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNqQ0Y7QUFBQTtBQUFBO0FBQXNDO0FBQ0Y7QUFFckI7SUFDYiwrREFBVTtJQUNWLDZEQUFTO0NBQ1YsRUFBQzs7Ozs7Ozs7Ozs7OztBQ05GO0FBQWUsZ0VBQUMsUUFBZ0IsRUFBUSxFQUFFO0lBQ3hDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUV0QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDckM7QUFDSCxDQUFDLEVBQUMiLCJmaWxlIjoibWFpbi5jNGE3YzAwZTVmMzI0OTY4NWM4ZS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeyBoYXNoUGFzc3dvcmQsIHJlc3RyaWN0VXNlckRhdGEgfSBmcm9tICcuLi8uLi91c2VyVXRpbHMvdXNlclV0aWxzJztcbmltcG9ydCB2YWxpZGF0ZVVzZXJuYW1lIGZyb20gJy4uLy4uL3VzZXJVdGlscy92YWxpZGF0ZVVzZXJuYW1lJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hIH0sIGluZm8pID0+IHtcbiAgdHJ5IHtcbiAgICB2YWxpZGF0ZVVzZXJuYW1lKGFyZ3MuZGF0YS51c2VybmFtZSk7XG4gICAgY29uc3QgcGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQoYXJncy5kYXRhLnBhc3N3b3JkKTtcbiAgICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgICAuLi5hcmdzLFxuICAgICAgZGF0YToge1xuICAgICAgICAuLi5hcmdzLmRhdGEsXG4gICAgICAgIHBhc3N3b3JkLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5jcmVhdGVVc2VyKGZpbmFsQXJncywgaW5mbyk7XG5cbiAgICBwYXNzcG9ydC5sb2dpbih7IGF1dGhlbnRpY2F0ZU9wdGlvbnM6IGFyZ3MuZGF0YSwgdXNlciB9KTtcblxuICAgIHJldHVybiByZXN0cmljdFVzZXJEYXRhKHVzZXIpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChlcnJvci5tZXNzYWdlID09PSAnaW52YWxpZCB1c2VybmFtZScpIHtcbiAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6ICdpbnZhbGlkIHVzZXJuYW1lJywgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICAgIGlmIChlcnJvci5tZXNzYWdlLmluY2x1ZGVzKCd1bmlxdWUgY29uc3RyYWludCcpKSB7XG4gICAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiAnZHVwbGljYXRlIHVzZXInLCBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gICAgaWYgKGVycm9yLm1lc3NhZ2UgPT09ICdwYXNzd29yZCBpcyB3ZWFrJykge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcihlcnJvcik7XG4gIH1cbn07XG4iLCJpbXBvcnQgY3JlYXRlVXNlciBmcm9tICcuL2NyZWF0ZVVzZXInO1xuaW1wb3J0IGxvZ2luVXNlciBmcm9tICcuL2xvZ2luVXNlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3JlYXRlVXNlcixcbiAgbG9naW5Vc2VyLFxufTtcbiIsImV4cG9ydCBkZWZhdWx0ICh1c2VybmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gUmVnRXhwKC9eW1xcd1xcZF8uLV0rJC9nKTtcblxuICBpZiAoIXJlZ2V4LnRlc3QodXNlcm5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHVzZXJuYW1lJyk7XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9