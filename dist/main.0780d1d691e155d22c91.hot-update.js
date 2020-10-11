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


/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma }, info) => {
    try {
        Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["validateUsername"])(args.data.username);
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
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: error.message, status: 400 });
        }
        if (error.message.includes('unique constraint')) {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: 'duplicate user', status: 400 });
        }
        if (error.message === 'weak password') {
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


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyTXV0YXRpb25zL2NyZWF0ZVVzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS91c2VyL3VzZXJSZXNvbHZlcnMvdXNlck11dGF0aW9ucy91c2VyTXV0YXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FBQ2dEO0FBRTlFLG9FQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNoRSxJQUFJO1FBQ0YsNkVBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxNQUFNLFFBQVEsR0FBRyxNQUFNLHlFQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxNQUFNLFNBQVMsR0FBRztZQUNoQixHQUFHLElBQUk7WUFDUCxJQUFJLEVBQUU7Z0JBQ0osR0FBRyxJQUFJLENBQUMsSUFBSTtnQkFDWixRQUFRO2FBQ1Q7U0FDRixDQUFDO1FBRUYsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFL0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV6RCxPQUFPLDZFQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQy9CO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssa0JBQWtCLEVBQUU7WUFDeEMsTUFBTSxJQUFJLDBEQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNoRTtRQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUMvQyxNQUFNLElBQUksMERBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNuRTtRQUNELElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxlQUFlLEVBQUU7WUFDckMsTUFBTSxJQUFJLDBEQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNoRTtRQUNELE1BQU0sSUFBSSwwREFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlCO0FBQ0gsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDaENGO0FBQUE7QUFBQTtBQUFzQztBQUNGO0FBRXJCO0lBQ2IsK0RBQVU7SUFDViw2REFBUztDQUNWLEVBQUMiLCJmaWxlIjoibWFpbi4wNzgwZDFkNjkxZTE1NWQyMmM5MS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeyBoYXNoUGFzc3dvcmQsIHJlc3RyaWN0VXNlckRhdGEsIHZhbGlkYXRlVXNlcm5hbWUgfSBmcm9tICcuLi8uLi91c2VyVXRpbHMvdXNlclV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hIH0sIGluZm8pID0+IHtcbiAgdHJ5IHtcbiAgICB2YWxpZGF0ZVVzZXJuYW1lKGFyZ3MuZGF0YS51c2VybmFtZSk7XG4gICAgY29uc3QgcGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQoYXJncy5kYXRhLnBhc3N3b3JkKTtcbiAgICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgICAuLi5hcmdzLFxuICAgICAgZGF0YToge1xuICAgICAgICAuLi5hcmdzLmRhdGEsXG4gICAgICAgIHBhc3N3b3JkLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5jcmVhdGVVc2VyKGZpbmFsQXJncywgaW5mbyk7XG5cbiAgICBwYXNzcG9ydC5sb2dpbih7IGF1dGhlbnRpY2F0ZU9wdGlvbnM6IGFyZ3MuZGF0YSwgdXNlciB9KTtcblxuICAgIHJldHVybiByZXN0cmljdFVzZXJEYXRhKHVzZXIpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChlcnJvci5tZXNzYWdlID09PSAnaW52YWxpZCB1c2VybmFtZScpIHtcbiAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICAgIH1cbiAgICBpZiAoZXJyb3IubWVzc2FnZS5pbmNsdWRlcygndW5pcXVlIGNvbnN0cmFpbnQnKSkge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogJ2R1cGxpY2F0ZSB1c2VyJywgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICAgIGlmIChlcnJvci5tZXNzYWdlID09PSAnd2VhayBwYXNzd29yZCcpIHtcbiAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoZXJyb3IpO1xuICB9XG59O1xuIiwiaW1wb3J0IGNyZWF0ZVVzZXIgZnJvbSAnLi9jcmVhdGVVc2VyJztcbmltcG9ydCBsb2dpblVzZXIgZnJvbSAnLi9sb2dpblVzZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVVzZXIsXG4gIGxvZ2luVXNlcixcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9