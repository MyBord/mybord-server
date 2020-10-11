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
        const { password, username } = args.data;
        await Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["validateUsername"])(prisma, username);
        const hashedPassword = await Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["hashPassword"])(password);
        const finalArgs = {
            ...args,
            data: {
                ...args.data,
                password: hashedPassword,
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
        if (error.message === 'duplicate username') {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: error.message, status: 400 });
        }
        if (error.message.includes('unique constraint')) {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: 'duplicate email', status: 400 });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyTXV0YXRpb25zL2NyZWF0ZVVzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS91c2VyL3VzZXJSZXNvbHZlcnMvdXNlck11dGF0aW9ucy91c2VyTXV0YXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FBQ2dEO0FBRTlFLG9FQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNoRSxJQUFJO1FBQ0YsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRXpDLE1BQU0sNkVBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXpDLE1BQU0sY0FBYyxHQUFHLE1BQU0seUVBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxNQUFNLFNBQVMsR0FBRztZQUNoQixHQUFHLElBQUk7WUFDUCxJQUFJLEVBQUU7Z0JBQ0osR0FBRyxJQUFJLENBQUMsSUFBSTtnQkFDWixRQUFRLEVBQUUsY0FBYzthQUN6QjtTQUNGLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUvRCxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXpELE9BQU8sNkVBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDL0I7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxrQkFBa0IsRUFBRTtZQUN4QyxNQUFNLElBQUksMERBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLG9CQUFvQixFQUFFO1lBQzFDLE1BQU0sSUFBSSwwREFBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDaEU7UUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDL0MsTUFBTSxJQUFJLDBEQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDcEU7UUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssZUFBZSxFQUFFO1lBQ3JDLE1BQU0sSUFBSSwwREFBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDaEU7UUFDRCxNQUFNLElBQUksMERBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM5QjtBQUNILENBQUMsRUFBQzs7Ozs7Ozs7Ozs7OztBQ3RDRjtBQUFBO0FBQUE7QUFBc0M7QUFDRjtBQUVyQjtJQUNiLCtEQUFVO0lBQ1YsNkRBQVM7Q0FDVixFQUFDIiwiZmlsZSI6Im1haW4uYjQ2NzNhMWYzZTUzNDRhY2FhOTYuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHsgaGFzaFBhc3N3b3JkLCByZXN0cmljdFVzZXJEYXRhLCB2YWxpZGF0ZVVzZXJuYW1lIH0gZnJvbSAnLi4vLi4vdXNlclV0aWxzL3VzZXJVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSB9LCBpbmZvKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBwYXNzd29yZCwgdXNlcm5hbWUgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGF3YWl0IHZhbGlkYXRlVXNlcm5hbWUocHJpc21hLCB1c2VybmFtZSk7XG5cbiAgICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGhhc2hQYXNzd29yZChwYXNzd29yZCk7XG4gICAgY29uc3QgZmluYWxBcmdzID0ge1xuICAgICAgLi4uYXJncyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLi4uYXJncy5kYXRhLFxuICAgICAgICBwYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLmNyZWF0ZVVzZXIoZmluYWxBcmdzLCBpbmZvKTtcblxuICAgIHBhc3Nwb3J0LmxvZ2luKHsgYXV0aGVudGljYXRlT3B0aW9uczogYXJncy5kYXRhLCB1c2VyIH0pO1xuXG4gICAgcmV0dXJuIHJlc3RyaWN0VXNlckRhdGEodXNlcik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yLm1lc3NhZ2UgPT09ICdpbnZhbGlkIHVzZXJuYW1lJykge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICAgIGlmIChlcnJvci5tZXNzYWdlID09PSAnZHVwbGljYXRlIHVzZXJuYW1lJykge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICAgIGlmIChlcnJvci5tZXNzYWdlLmluY2x1ZGVzKCd1bmlxdWUgY29uc3RyYWludCcpKSB7XG4gICAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiAnZHVwbGljYXRlIGVtYWlsJywgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICAgIGlmIChlcnJvci5tZXNzYWdlID09PSAnd2VhayBwYXNzd29yZCcpIHtcbiAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoZXJyb3IpO1xuICB9XG59O1xuIiwiaW1wb3J0IGNyZWF0ZVVzZXIgZnJvbSAnLi9jcmVhdGVVc2VyJztcbmltcG9ydCBsb2dpblVzZXIgZnJvbSAnLi9sb2dpblVzZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVVzZXIsXG4gIGxvZ2luVXNlcixcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9