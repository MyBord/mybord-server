exports.id = "main";
exports.modules = {

/***/ "./src/schema/rootResolvers/mutations.ts":
/*!***********************************************!*\
  !*** ./src/schema/rootResolvers/mutations.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _card_cardResolvers_cardMutations_cardMutations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../card/cardResolvers/cardMutations/cardMutations */ "./src/schema/card/cardResolvers/cardMutations/cardMutations.ts");
/* harmony import */ var _user_userResolvers_userMutations_userMutations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user/userResolvers/userMutations/userMutations */ "./src/schema/user/userResolvers/userMutations/userMutations.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    ..._card_cardResolvers_cardMutations_cardMutations__WEBPACK_IMPORTED_MODULE_0__["default"],
    ..._user_userResolvers_userMutations_userMutations__WEBPACK_IMPORTED_MODULE_1__["default"],
});


/***/ }),

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


/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma }, info) => {
    try {
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
        if (error.message.includes('unique constraint')) {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: 'duplicate user', status: 400 });
        }
        if (error.message === 'password is weak') {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: error.message, status: 400 });
        }
    }
});


/***/ }),

/***/ "./src/schema/user/userResolvers/userMutations/loginUser.ts":
/*!******************************************************************!*\
  !*** ./src/schema/user/userResolvers/userMutations/loginUser.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../userUtils/userUtils */ "./src/schema/user/userUtils/userUtils.ts");


/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport }) => {
    try {
        const { user } = await passport.authenticate({
            authenticateOptions: args.data,
            strategyName: 'local',
        });
        passport.login({ authenticateOptions: args.data, user });
        return Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["restrictUserData"])(user);
    }
    catch (error) {
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: 'Unable to login', status: 401 });
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


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3Jvb3RSZXNvbHZlcnMvbXV0YXRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvdXNlci91c2VyUmVzb2x2ZXJzL3VzZXJNdXRhdGlvbnMvY3JlYXRlVXNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyTXV0YXRpb25zL2xvZ2luVXNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyTXV0YXRpb25zL3VzZXJNdXRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBOEU7QUFDQTtBQUUvRDtJQUNiLEdBQUcsdUZBQWE7SUFDaEIsR0FBRyx1RkFBYTtDQUNqQixFQUFDOzs7Ozs7Ozs7Ozs7O0FDTkY7QUFBQTtBQUFBO0FBQTZDO0FBQzhCO0FBRTVELG9FQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNoRSxJQUFJO1FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSx5RUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEQsTUFBTSxTQUFTLEdBQUc7WUFDaEIsR0FBRyxJQUFJO1lBQ1AsSUFBSSxFQUFFO2dCQUNKLEdBQUcsSUFBSSxDQUFDLElBQUk7Z0JBQ1osUUFBUTthQUNUO1NBQ0YsQ0FBQztRQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRS9ELFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFekQsT0FBTyw2RUFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMvQjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQy9DLE1BQU0sSUFBSSwwREFBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ25FO1FBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLGtCQUFrQixFQUFFO1lBQ3hDLE1BQU0sSUFBSSwwREFBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDaEU7S0FDRjtBQUNILENBQUMsRUFBQzs7Ozs7Ozs7Ozs7OztBQzNCRjtBQUFBO0FBQUE7QUFBNkM7QUFDZ0I7QUFFOUMsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtJQUNsRCxJQUFJO1FBQ0YsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sUUFBUSxDQUFDLFlBQVksQ0FBQztZQUMzQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsSUFBSTtZQUM5QixZQUFZLEVBQUUsT0FBTztTQUN0QixDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXpELE9BQU8sNkVBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDL0I7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE1BQU0sSUFBSSwwREFBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ3BFO0FBQ0gsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDaEJGO0FBQUE7QUFBQTtBQUFzQztBQUNGO0FBRXJCO0lBQ2IsK0RBQVU7SUFDViw2REFBUztDQUNWLEVBQUMiLCJmaWxlIjoibWFpbi4xMTEzMzEzZmRlOGM5ZGZiOTg2OS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNhcmRNdXRhdGlvbnMgZnJvbSAnLi4vY2FyZC9jYXJkUmVzb2x2ZXJzL2NhcmRNdXRhdGlvbnMvY2FyZE11dGF0aW9ucyc7XG5pbXBvcnQgdXNlck11dGF0aW9ucyBmcm9tICcuLi91c2VyL3VzZXJSZXNvbHZlcnMvdXNlck11dGF0aW9ucy91c2VyTXV0YXRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAuLi5jYXJkTXV0YXRpb25zLFxuICAuLi51c2VyTXV0YXRpb25zLFxufTtcbiIsImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHsgaGFzaFBhc3N3b3JkLCByZXN0cmljdFVzZXJEYXRhIH0gZnJvbSAnLi4vLi4vdXNlclV0aWxzL3VzZXJVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSB9LCBpbmZvKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQoYXJncy5kYXRhLnBhc3N3b3JkKTtcbiAgICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgICAuLi5hcmdzLFxuICAgICAgZGF0YToge1xuICAgICAgICAuLi5hcmdzLmRhdGEsXG4gICAgICAgIHBhc3N3b3JkLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5jcmVhdGVVc2VyKGZpbmFsQXJncywgaW5mbyk7XG5cbiAgICBwYXNzcG9ydC5sb2dpbih7IGF1dGhlbnRpY2F0ZU9wdGlvbnM6IGFyZ3MuZGF0YSwgdXNlciB9KTtcblxuICAgIHJldHVybiByZXN0cmljdFVzZXJEYXRhKHVzZXIpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChlcnJvci5tZXNzYWdlLmluY2x1ZGVzKCd1bmlxdWUgY29uc3RyYWludCcpKSB7XG4gICAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiAnZHVwbGljYXRlIHVzZXInLCBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gICAgaWYgKGVycm9yLm1lc3NhZ2UgPT09ICdwYXNzd29yZCBpcyB3ZWFrJykge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeyByZXN0cmljdFVzZXJEYXRhIH0gZnJvbSAnLi4vLi4vdXNlclV0aWxzL3VzZXJVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQgfSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXNlciB9ID0gYXdhaXQgcGFzc3BvcnQuYXV0aGVudGljYXRlKHtcbiAgICAgIGF1dGhlbnRpY2F0ZU9wdGlvbnM6IGFyZ3MuZGF0YSxcbiAgICAgIHN0cmF0ZWd5TmFtZTogJ2xvY2FsJyxcbiAgICB9KTtcblxuICAgIHBhc3Nwb3J0LmxvZ2luKHsgYXV0aGVudGljYXRlT3B0aW9uczogYXJncy5kYXRhLCB1c2VyIH0pO1xuXG4gICAgcmV0dXJuIHJlc3RyaWN0VXNlckRhdGEodXNlcik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogJ1VuYWJsZSB0byBsb2dpbicsIHN0YXR1czogNDAxIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IGNyZWF0ZVVzZXIgZnJvbSAnLi9jcmVhdGVVc2VyJztcbmltcG9ydCBsb2dpblVzZXIgZnJvbSAnLi9sb2dpblVzZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVVzZXIsXG4gIGxvZ2luVXNlcixcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9