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
        console.log('*****************');
        console.log('*****************');
        const password = await Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["hashPassword"])(args.data.password);
        const finalArgs = {
            ...args,
            data: {
                ...args.data,
                password,
            },
        };
        console.log('1');
        const user = await prisma.mutation.createUser(finalArgs, info);
        console.log('2');
        passport.login({ authenticateOptions: args.data, user });
        console.log('3');
        return Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["restrictUserData"])(user);
    }
    catch (error) {
        if (error.message.includes('unique constraint')) {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: 'duplicate user', status: 400 });
        }
        if (error.message === 'password is weak') {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: error.message, status: 400 });
        }
        throw new Error(error);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyTXV0YXRpb25zL2NyZWF0ZVVzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS91c2VyL3VzZXJSZXNvbHZlcnMvdXNlck11dGF0aW9ucy91c2VyTXV0YXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FBQzhCO0FBRTVELG9FQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNoRSxJQUFJO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqQyxNQUFNLFFBQVEsR0FBRyxNQUFNLHlFQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxNQUFNLFNBQVMsR0FBRztZQUNoQixHQUFHLElBQUk7WUFDUCxJQUFJLEVBQUU7Z0JBQ0osR0FBRyxJQUFJLENBQUMsSUFBSTtnQkFDWixRQUFRO2FBQ1Q7U0FDRixDQUFDO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUvRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixPQUFPLDZFQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQy9CO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDL0MsTUFBTSxJQUFJLDBEQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDbkU7UUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssa0JBQWtCLEVBQUU7WUFDeEMsTUFBTSxJQUFJLDBEQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNoRTtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDeEI7QUFDSCxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNqQ0Y7QUFBQTtBQUFBO0FBQXNDO0FBQ0Y7QUFFckI7SUFDYiwrREFBVTtJQUNWLDZEQUFTO0NBQ1YsRUFBQyIsImZpbGUiOiJtYWluLmQwMDJlYTg3MDMwZDRhZDc3OTI2LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCB7IGhhc2hQYXNzd29yZCwgcmVzdHJpY3RVc2VyRGF0YSB9IGZyb20gJy4uLy4uL3VzZXJVdGlscy91c2VyVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEgfSwgaW5mbykgPT4ge1xuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKCcqKioqKioqKioqKioqKioqKicpO1xuICAgIGNvbnNvbGUubG9nKCcqKioqKioqKioqKioqKioqKicpO1xuICAgIGNvbnN0IHBhc3N3b3JkID0gYXdhaXQgaGFzaFBhc3N3b3JkKGFyZ3MuZGF0YS5wYXNzd29yZCk7XG4gICAgY29uc3QgZmluYWxBcmdzID0ge1xuICAgICAgLi4uYXJncyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLi4uYXJncy5kYXRhLFxuICAgICAgICBwYXNzd29yZCxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKCcxJyk7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5jcmVhdGVVc2VyKGZpbmFsQXJncywgaW5mbyk7XG5cbiAgICBjb25zb2xlLmxvZygnMicpO1xuICAgIHBhc3Nwb3J0LmxvZ2luKHsgYXV0aGVudGljYXRlT3B0aW9uczogYXJncy5kYXRhLCB1c2VyIH0pO1xuXG4gICAgY29uc29sZS5sb2coJzMnKTtcbiAgICByZXR1cm4gcmVzdHJpY3RVc2VyRGF0YSh1c2VyKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IubWVzc2FnZS5pbmNsdWRlcygndW5pcXVlIGNvbnN0cmFpbnQnKSkge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogJ2R1cGxpY2F0ZSB1c2VyJywgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICAgIGlmIChlcnJvci5tZXNzYWdlID09PSAncGFzc3dvcmQgaXMgd2VhaycpIHtcbiAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICB9XG59O1xuIiwiaW1wb3J0IGNyZWF0ZVVzZXIgZnJvbSAnLi9jcmVhdGVVc2VyJztcbmltcG9ydCBsb2dpblVzZXIgZnJvbSAnLi9sb2dpblVzZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVVzZXIsXG4gIGxvZ2luVXNlcixcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9