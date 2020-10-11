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
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: 'invalid username', status: 400 });
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


/***/ }),

/***/ "./src/schema/user/userResolvers/userQueries/users.ts":
/*!************************************************************!*\
  !*** ./src/schema/user/userResolvers/userQueries/users.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _userUtils_userUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../userUtils/userUtils */ "./src/schema/user/userUtils/userUtils.ts");

/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { prisma }, info) => {
    const finalArgs = {
        ...args,
        where: {
            ...args.where,
        },
    };
    if (args && args.where && args.where.email) {
        delete finalArgs.where.email;
    }
    const users = await prisma.query.users(finalArgs, info);
    return users.map(async (user) => Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_0__["restrictUserData"])(user));
});


/***/ }),

/***/ "./src/schema/user/userUtils/userUtils.ts":
/*!************************************************!*\
  !*** ./src/schema/user/userUtils/userUtils.ts ***!
  \************************************************/
/*! exports provided: restrictUserData, hashPassword, validateUsername */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "restrictUserData", function() { return restrictUserData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hashPassword", function() { return hashPassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateUsername", function() { return validateUsername; });
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);

const restrictUserData = (user) => ({
    ...user,
    email: 'null',
    password: 'null',
});
const testPasswordStrength = (password) => {
    const passwordArray = password.split('');
    const specialCharacters = ['!', '@', '#', '$', '&', '*', '-'];
    const isUpperCase = (string) => /^[A-Z]*$/.test(string);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacters = passwordArray.some((i) => specialCharacters.includes(i));
    const hasUpperCase = passwordArray.some((i) => isUpperCase(i));
    const isLongEnough = password.length > 7;
    const isPasswordStrong = hasNumber && hasSpecialCharacters && hasUpperCase && isLongEnough;
    if (!isPasswordStrong) {
        throw new Error('weak password');
    }
};
const hashPassword = (password) => {
    testPasswordStrength(password);
    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default.a.hash(password, 10);
};
const validateUsername = (username) => {
    const regex = RegExp(/^[\w\d_.-]+$/g);
    if (!regex.test(username)) {
        throw new Error('invalid username');
    }
};


/***/ }),

/***/ "./src/schema/user/userUtils/validateUsername.ts":
false

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyTXV0YXRpb25zL2NyZWF0ZVVzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS91c2VyL3VzZXJSZXNvbHZlcnMvdXNlck11dGF0aW9ucy91c2VyTXV0YXRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvdXNlci91c2VyUmVzb2x2ZXJzL3VzZXJRdWVyaWVzL3VzZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvdXNlci91c2VyVXRpbHMvdXNlclV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FBQ2dEO0FBRTlFLG9FQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNoRSxJQUFJO1FBQ0YsNkVBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxNQUFNLFFBQVEsR0FBRyxNQUFNLHlFQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxNQUFNLFNBQVMsR0FBRztZQUNoQixHQUFHLElBQUk7WUFDUCxJQUFJLEVBQUU7Z0JBQ0osR0FBRyxJQUFJLENBQUMsSUFBSTtnQkFDWixRQUFRO2FBQ1Q7U0FDRixDQUFDO1FBRUYsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFL0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV6RCxPQUFPLDZFQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQy9CO0lBQUMsT0FBTyxLQUFLLEVB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LENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUV6QyxNQUFNLGdCQUFnQixHQUFHLFNBQVMsSUFBSSxvQkFBb0IsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDO0lBRTNGLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtRQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ2xDO0FBQ0gsQ0FBQyxDQUFDO0FBRUssTUFBTSxZQUFZLEdBQUcsQ0FBQyxRQUFnQixFQUFtQixFQUFFO0lBQ2hFLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRS9CLE9BQU8sK0NBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQztBQUVLLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxRQUFnQixFQUFRLEVBQUU7SUFDekQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXRDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQUNyQztBQUNILENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLjY5MjliOWU2MjdjZmI2NTk3ZDFhLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCB7IGhhc2hQYXNzd29yZCwgcmVzdHJpY3RVc2VyRGF0YSwgdmFsaWRhdGVVc2VybmFtZSB9IGZyb20gJy4uLy4uL3VzZXJVdGlscy91c2VyVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEgfSwgaW5mbykgPT4ge1xuICB0cnkge1xuICAgIHZhbGlkYXRlVXNlcm5hbWUoYXJncy5kYXRhLnVzZXJuYW1lKTtcbiAgICBjb25zdCBwYXNzd29yZCA9IGF3YWl0IGhhc2hQYXNzd29yZChhcmdzLmRhdGEucGFzc3dvcmQpO1xuICAgIGNvbnN0IGZpbmFsQXJncyA9IHtcbiAgICAgIC4uLmFyZ3MsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIC4uLmFyZ3MuZGF0YSxcbiAgICAgICAgcGFzc3dvcmQsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLmNyZWF0ZVVzZXIoZmluYWxBcmdzLCBpbmZvKTtcblxuICAgIHBhc3Nwb3J0LmxvZ2luKHsgYXV0aGVudGljYXRlT3B0aW9uczogYXJncy5kYXRhLCB1c2VyIH0pO1xuXG4gICAgcmV0dXJuIHJlc3RyaWN0VXNlckRhdGEodXNlcik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yLm1lc3NhZ2UgPT09ICdpbnZhbGlkIHVzZXJuYW1lJykge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogJ2ludmFsaWQgdXNlcm5hbWUnLCBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gICAgaWYgKGVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoJ3VuaXF1ZSBjb25zdHJhaW50JykpIHtcbiAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6ICdkdXBsaWNhdGUgdXNlcicsIHN0YXR1czogNDAwIH0pO1xuICAgIH1cbiAgICBpZiAoZXJyb3IubWVzc2FnZSA9PT0gJ3dlYWsgcGFzc3dvcmQnKSB7XG4gICAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKGVycm9yKTtcbiAgfVxufTtcbiIsImltcG9ydCBjcmVhdGVVc2VyIGZyb20gJy4vY3JlYXRlVXNlcic7XG5pbXBvcnQgbG9naW5Vc2VyIGZyb20gJy4vbG9naW5Vc2VyJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjcmVhdGVVc2VyLFxuICBsb2dpblVzZXIsXG59O1xuIiwiaW1wb3J0IHsgcmVzdHJpY3RVc2VyRGF0YSB9IGZyb20gJy4uLy4uL3VzZXJVdGlscy91c2VyVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHByaXNtYSB9LCBpbmZvKSA9PiB7XG4gIGNvbnN0IGZpbmFsQXJncyA9IHtcbiAgICAuLi5hcmdzLFxuICAgIHdoZXJlOiB7XG4gICAgICAuLi5hcmdzLndoZXJlLFxuICAgIH0sXG4gIH07XG4gIGlmIChhcmdzICYmIGFyZ3Mud2hlcmUgJiYgYXJncy53aGVyZS5lbWFpbCkge1xuICAgIGRlbGV0ZSBmaW5hbEFyZ3Mud2hlcmUuZW1haWw7XG4gIH1cblxuICBjb25zdCB1c2VycyA9IGF3YWl0IHByaXNtYS5xdWVyeS51c2VycyhmaW5hbEFyZ3MsIGluZm8pO1xuXG4gIHJldHVybiB1c2Vycy5tYXAoYXN5bmMgKHVzZXIpID0+IHJlc3RyaWN0VXNlckRhdGEodXNlcikpO1xufTtcbiIsImltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlclR5cGVzJztcblxuZXhwb3J0IGNvbnN0IHJlc3RyaWN0VXNlckRhdGEgPSAodXNlcik6IFVzZXIgPT4gKHtcbiAgLi4udXNlcixcbiAgZW1haWw6ICdudWxsJyxcbiAgcGFzc3dvcmQ6ICdudWxsJyxcbn0pO1xuXG5jb25zdCB0ZXN0UGFzc3dvcmRTdHJlbmd0aCA9IChwYXNzd29yZCk6IHZvaWQgPT4ge1xuICBjb25zdCBwYXNzd29yZEFycmF5ID0gcGFzc3dvcmQuc3BsaXQoJycpO1xuXG4gIGNvbnN0IHNwZWNpYWxDaGFyYWN0ZXJzID0gWychJywgJ0AnLCAnIycsICckJywgJyYnLCAnKicsICctJ107XG4gIGNvbnN0IGlzVXBwZXJDYXNlID0gKHN0cmluZyk6IGJvb2xlYW4gPT4gL15bQS1aXSokLy50ZXN0KHN0cmluZyk7XG5cbiAgY29uc3QgaGFzTnVtYmVyID0gL1xcZC8udGVzdChwYXNzd29yZCk7XG4gIGNvbnN0IGhhc1NwZWNpYWxDaGFyYWN0ZXJzID0gcGFzc3dvcmRBcnJheS5zb21lKChpKSA9PiBzcGVjaWFsQ2hhcmFjdGVycy5pbmNsdWRlcyhpKSk7XG4gIGNvbnN0IGhhc1VwcGVyQ2FzZSA9IHBhc3N3b3JkQXJyYXkuc29tZSgoaSkgPT4gaXNVcHBlckNhc2UoaSkpO1xuICBjb25zdCBpc0xvbmdFbm91Z2ggPSBwYXNzd29yZC5sZW5ndGggPiA3O1xuXG4gIGNvbnN0IGlzUGFzc3dvcmRTdHJvbmcgPSBoYXNOdW1iZXIgJiYgaGFzU3BlY2lhbENoYXJhY3RlcnMgJiYgaGFzVXBwZXJDYXNlICYmIGlzTG9uZ0Vub3VnaDtcblxuICBpZiAoIWlzUGFzc3dvcmRTdHJvbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dlYWsgcGFzc3dvcmQnKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGhhc2hQYXNzd29yZCA9IChwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgdGVzdFBhc3N3b3JkU3RyZW5ndGgocGFzc3dvcmQpO1xuXG4gIHJldHVybiBiY3J5cHQuaGFzaChwYXNzd29yZCwgMTApO1xufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlVXNlcm5hbWUgPSAodXNlcm5hbWU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBjb25zdCByZWdleCA9IFJlZ0V4cCgvXltcXHdcXGRfLi1dKyQvZyk7XG5cbiAgaWYgKCFyZWdleC50ZXN0KHVzZXJuYW1lKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB1c2VybmFtZScpO1xuICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==