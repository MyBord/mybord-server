exports.id = "main";
exports.modules = {

/***/ "./src/schema/rootResolvers/queries.ts":
/*!*********************************************!*\
  !*** ./src/schema/rootResolvers/queries.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _card_cardResolvers_cardQueries_cardQueries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../card/cardResolvers/cardQueries/cardQueries */ "./src/schema/card/cardResolvers/cardQueries/cardQueries.ts");
/* harmony import */ var _user_userResolvers_userQueries_userQueries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user/userResolvers/userQueries/userQueries */ "./src/schema/user/userResolvers/userQueries/userQueries.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    ..._card_cardResolvers_cardQueries_cardQueries__WEBPACK_IMPORTED_MODULE_0__["default"],
    ..._user_userResolvers_userQueries_userQueries__WEBPACK_IMPORTED_MODULE_1__["default"],
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
        const hashedPassword = await Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["hashPassword"])(args.data.password);
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
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"](error);
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
/* harmony import */ var _deleteCurrentUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deleteCurrentUser */ "./src/schema/user/userResolvers/userMutations/deleteCurrentUser.ts");
/* harmony import */ var _loginUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loginUser */ "./src/schema/user/userResolvers/userMutations/loginUser.ts");



/* harmony default export */ __webpack_exports__["default"] = ({
    createUser: _createUser__WEBPACK_IMPORTED_MODULE_0__["default"],
    deleteCurrentUser: _deleteCurrentUser__WEBPACK_IMPORTED_MODULE_1__["default"],
    loginUser: _loginUser__WEBPACK_IMPORTED_MODULE_2__["default"],
});


/***/ }),

/***/ "./src/schema/user/userResolvers/userQueries/userQueries.ts":
/*!******************************************************************!*\
  !*** ./src/schema/user/userResolvers/userQueries/userQueries.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getCurrentUser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentUser */ "./src/schema/user/userResolvers/userQueries/getCurrentUser.ts");
/* harmony import */ var _logoutUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logoutUser */ "./src/schema/user/userResolvers/userQueries/logoutUser.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users */ "./src/schema/user/userResolvers/userQueries/users.ts");
/* harmony import */ var _validateUserSignup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validateUserSignup */ "./src/schema/user/userResolvers/userQueries/validateUserSignup.ts");




/* harmony default export */ __webpack_exports__["default"] = ({
    getCurrentUser: _getCurrentUser__WEBPACK_IMPORTED_MODULE_0__["default"],
    logoutUser: _logoutUser__WEBPACK_IMPORTED_MODULE_1__["default"],
    users: _users__WEBPACK_IMPORTED_MODULE_2__["default"],
    validateUserSignup: _validateUserSignup__WEBPACK_IMPORTED_MODULE_3__["default"],
});


/***/ }),

/***/ "./src/schema/user/userResolvers/userQueries/validateUserSignup.ts":
/*!*************************************************************************!*\
  !*** ./src/schema/user/userResolvers/userQueries/validateUserSignup.ts ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../userUtils/userUtils */ "./src/schema/user/userUtils/userUtils.ts");


/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { prisma }) => {
    try {
        const { email, password, username } = args.data;
        Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["testPasswordStrength"])(password);
        await Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["validateEmail"])(prisma, email);
        await Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["validateUsername"])(prisma, username);
        return true;
    }
    catch (error) {
        if ([
            'duplicate email',
            'duplicate username',
            'invalid username',
            'weak password',
        ].includes(error.message)) {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: error.message, status: 400 });
        }
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"](error);
    }
});


/***/ }),

/***/ "./src/schema/user/userSchema.graphql":
/*!********************************************!*\
  !*** ./src/schema/user/userSchema.graphql ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"LoginUserInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"emailOrUsername"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"password"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"UserSignupInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"email"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"password"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"username"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"CurrentUser"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"email"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"isAuthenticated"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"username"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Mutation"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"deleteCurrentUser"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}}},"directives":[]}]},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"getCurrentUser"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CurrentUser"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"logoutUser"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"validateUserSignup"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserSignupInput"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]}]}],"loc":{"start":0,"end":559}};
    doc.loc.source = {"body":"# ----- INPUTS ----- #\n\ninput LoginUserInput {\n  emailOrUsername: String!\n  password: String!\n}\n\ninput UserSignupInput {\n  email: String!\n  password: String!\n  username: String!\n}\n\n# ----- TYPES ----- #\n\ntype CurrentUser {\n  email: String\n  isAuthenticated: Boolean!\n  username: String\n}\n\n# ----- MUTATION ----- #\n\nextend type Mutation {\n  deleteCurrentUser: User\n  loginUser(data: LoginUserInput): User!\n}\n\n# ----- QUERY ----- #\n\nextend type Query {\n  getCurrentUser: CurrentUser!\n  logoutUser: Boolean\n  validateUserSignup(data: UserSignupInput): Boolean\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ "./src/schema/user/userUtils/userUtils.ts":
/*!************************************************!*\
  !*** ./src/schema/user/userUtils/userUtils.ts ***!
  \************************************************/
/*! exports provided: hashPassword, testPasswordStrength, validateEmail, validateUsername, restrictUserData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hashPassword", function() { return hashPassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testPasswordStrength", function() { return testPasswordStrength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEmail", function() { return validateEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateUsername", function() { return validateUsername; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "restrictUserData", function() { return restrictUserData; });
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);

// ----- PASSWORD UTILS ----- //
const hashPassword = (password) => bcryptjs__WEBPACK_IMPORTED_MODULE_0___default.a.hash(password, 10);
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
// ----- VALIDATION UTILS ----- //
const validateEmail = async (prisma, email) => {
    const usersArgs = {
        where: { email },
    };
    const users = await prisma.query.users(usersArgs, '{ email }');
    if (users.length > 0) {
        throw new Error('duplicate email');
    }
};
const validateUsername = async (prisma, username) => {
    const usersArgs = {
        where: { username },
    };
    const users = await prisma.query.users(usersArgs, '{ username }');
    if (users.length > 0) {
        throw new Error('duplicate username');
    }
    const regex = RegExp(/^[\w\d_.-]+$/g);
    if (!regex.test(username)) {
        throw new Error('invalid username');
    }
};
// ----- DATA RESTRICTION UTILS ----- //
const restrictUserData = (user) => ({
    ...user,
    email: 'null',
    password: 'null',
});


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3Jvb3RSZXNvbHZlcnMvcXVlcmllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyTXV0YXRpb25zL2NyZWF0ZVVzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS91c2VyL3VzZXJSZXNvbHZlcnMvdXNlck11dGF0aW9ucy9sb2dpblVzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS91c2VyL3VzZXJSZXNvbHZlcnMvdXNlck11dGF0aW9ucy91c2VyTXV0YXRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvdXNlci91c2VyUmVzb2x2ZXJzL3VzZXJRdWVyaWVzL3VzZXJRdWVyaWVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvdXNlci91c2VyUmVzb2x2ZXJzL3VzZXJRdWVyaWVzL3ZhbGlkYXRlVXNlclNpZ251cC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclNjaGVtYS5ncmFwaHFsIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvdXNlci91c2VyVXRpbHMvdXNlclV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQXdFO0FBQ0E7QUFFekQ7SUFDYixHQUFHLG1GQUFXO0lBQ2QsR0FBRyxtRkFBVztDQUNmLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNORjtBQUFBO0FBQUE7QUFBNkM7QUFDOEI7QUFFNUQsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2hFLElBQUk7UUFDRixNQUFNLGNBQWMsR0FBRyxNQUFNLHlFQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RCxNQUFNLFNBQVMsR0FBRztZQUNoQixHQUFHLElBQUk7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QUFHLENBQUMsSUFBSSxFQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLEdBQUcsSUFBSTtJQUNQLEtBQUssRUFBRSxNQUFNO0lBQ2IsUUFBUSxFQUFFLE1BQU07Q0FDakIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uZGIzYmE1ZmJjMTQ4NjQ1ZTIwZGQuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjYXJkUXVlcmllcyBmcm9tICcuLi9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZFF1ZXJpZXMvY2FyZFF1ZXJpZXMnO1xuaW1wb3J0IHVzZXJRdWVyaWVzIGZyb20gJy4uL3VzZXIvdXNlclJlc29sdmVycy91c2VyUXVlcmllcy91c2VyUXVlcmllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4uY2FyZFF1ZXJpZXMsXG4gIC4uLnVzZXJRdWVyaWVzLFxufTtcbiIsImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHsgaGFzaFBhc3N3b3JkLCByZXN0cmljdFVzZXJEYXRhIH0gZnJvbSAnLi4vLi4vdXNlclV0aWxzL3VzZXJVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSB9LCBpbmZvKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQoYXJncy5kYXRhLnBhc3N3b3JkKTtcbiAgICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgICAuLi5hcmdzLFxuICAgICAgZGF0YToge1xuICAgICAgICAuLi5hcmdzLmRhdGEsXG4gICAgICAgIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZCxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24uY3JlYXRlVXNlcihmaW5hbEFyZ3MsIGluZm8pO1xuXG4gICAgcGFzc3BvcnQubG9naW4oeyBhdXRoZW50aWNhdGVPcHRpb25zOiBhcmdzLmRhdGEsIHVzZXIgfSk7XG5cbiAgICByZXR1cm4gcmVzdHJpY3RVc2VyRGF0YSh1c2VyKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoZXJyb3IpO1xuICB9XG59O1xuIiwiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeyByZXN0cmljdFVzZXJEYXRhIH0gZnJvbSAnLi4vLi4vdXNlclV0aWxzL3VzZXJVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQgfSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXNlciB9ID0gYXdhaXQgcGFzc3BvcnQuYXV0aGVudGljYXRlKHtcbiAgICAgIGF1dGhlbnRpY2F0ZU9wdGlvbnM6IGFyZ3MuZGF0YSxcbiAgICAgIHN0cmF0ZWd5TmFtZTogJ2xvY2FsJyxcbiAgICB9KTtcblxuICAgIHBhc3Nwb3J0LmxvZ2luKHsgYXV0aGVudGljYXRlT3B0aW9uczogYXJncy5kYXRhLCB1c2VyIH0pO1xuXG4gICAgcmV0dXJuIHJlc3RyaWN0VXNlckRhdGEodXNlcik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogJ1VuYWJsZSB0byBsb2dpbicsIHN0YXR1czogNDAxIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IGNyZWF0ZVVzZXIgZnJvbSAnLi9jcmVhdGVVc2VyJztcbmltcG9ydCBkZWxldGVDdXJyZW50VXNlciBmcm9tICcuL2RlbGV0ZUN1cnJlbnRVc2VyJztcbmltcG9ydCBsb2dpblVzZXIgZnJvbSAnLi9sb2dpblVzZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVVzZXIsXG4gIGRlbGV0ZUN1cnJlbnRVc2VyLFxuICBsb2dpblVzZXIsXG59O1xuIiwiaW1wb3J0IGdldEN1cnJlbnRVc2VyIGZyb20gJy4vZ2V0Q3VycmVudFVzZXInO1xuaW1wb3J0IGxvZ291dFVzZXIgZnJvbSAnLi9sb2dvdXRVc2VyJztcbmltcG9ydCB1c2VycyBmcm9tICcuL3VzZXJzJztcbmltcG9ydCB2YWxpZGF0ZVVzZXJTaWdudXAgZnJvbSAnLi92YWxpZGF0ZVVzZXJTaWdudXAnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldEN1cnJlbnRVc2VyLFxuICBsb2dvdXRVc2VyLFxuICB1c2VycyxcbiAgdmFsaWRhdGVVc2VyU2lnbnVwLFxufTtcbiIsImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHtcbiAgdGVzdFBhc3N3b3JkU3RyZW5ndGgsXG4gIHZhbGlkYXRlRW1haWwsXG4gIHZhbGlkYXRlVXNlcm5hbWUsXG59IGZyb20gJy4uLy4uL3VzZXJVdGlscy91c2VyVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHByaXNtYSB9KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIHVzZXJuYW1lIH0gPSBhcmdzLmRhdGE7XG5cbiAgICB0ZXN0UGFzc3dvcmRTdHJlbmd0aChwYXNzd29yZCk7XG5cbiAgICBhd2FpdCB2YWxpZGF0ZUVtYWlsKHByaXNtYSwgZW1haWwpO1xuXG4gICAgYXdhaXQgdmFsaWRhdGVVc2VybmFtZShwcmlzbWEsIHVzZXJuYW1lKTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChcbiAgICAgIFtcbiAgICAgICAgJ2R1cGxpY2F0ZSBlbWFpbCcsXG4gICAgICAgICdkdXBsaWNhdGUgdXNlcm5hbWUnLFxuICAgICAgICAnaW52YWxpZCB1c2VybmFtZScsXG4gICAgICAgICd3ZWFrIHBhc3N3b3JkJyxcbiAgICAgIF0uaW5jbHVkZXMoZXJyb3IubWVzc2FnZSlcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoZXJyb3IpO1xuICB9XG59O1xuIiwiXG4gICAgdmFyIGRvYyA9IHtcImtpbmRcIjpcIkRvY3VtZW50XCIsXCJkZWZpbml0aW9uc1wiOlt7XCJraW5kXCI6XCJJbnB1dE9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkxvZ2luVXNlcklucHV0XCJ9LFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImVtYWlsT3JVc2VybmFtZVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwicGFzc3dvcmRcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiSW5wdXRPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJVc2VyU2lnbnVwSW5wdXRcIn0sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZW1haWxcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInBhc3N3b3JkXCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJ1c2VybmFtZVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDdXJyZW50VXNlclwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZW1haWxcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImlzQXV0aGVudGljYXRlZFwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkJvb2xlYW5cIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInVzZXJuYW1lXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiT2JqZWN0VHlwZUV4dGVuc2lvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJNdXRhdGlvblwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZGVsZXRlQ3VycmVudFVzZXJcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiVXNlclwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJsb2dpblVzZXJcIn0sXCJhcmd1bWVudHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZGF0YVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiTG9naW5Vc2VySW5wdXRcIn19LFwiZGlyZWN0aXZlc1wiOltdfV0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiVXNlclwifX19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVFeHRlbnNpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUXVlcnlcIn0sXCJpbnRlcmZhY2VzXCI6W10sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImdldEN1cnJlbnRVc2VyXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ3VycmVudFVzZXJcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImxvZ291dFVzZXJcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQm9vbGVhblwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJ2YWxpZGF0ZVVzZXJTaWdudXBcIn0sXCJhcmd1bWVudHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZGF0YVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiVXNlclNpZ251cElucHV0XCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJCb29sZWFuXCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dfV0sXCJsb2NcIjp7XCJzdGFydFwiOjAsXCJlbmRcIjo1NTl9fTtcbiAgICBkb2MubG9jLnNvdXJjZSA9IHtcImJvZHlcIjpcIiMgLS0tLS0gSU5QVVRTIC0tLS0tICNcXG5cXG5pbnB1dCBMb2dpblVzZXJJbnB1dCB7XFxuICBlbWFpbE9yVXNlcm5hbWU6IFN0cmluZyFcXG4gIHBhc3N3b3JkOiBTdHJpbmchXFxufVxcblxcbmlucHV0IFVzZXJTaWdudXBJbnB1dCB7XFxuICBlbWFpbDogU3RyaW5nIVxcbiAgcGFzc3dvcmQ6IFN0cmluZyFcXG4gIHVzZXJuYW1lOiBTdHJpbmchXFxufVxcblxcbiMgLS0tLS0gVFlQRVMgLS0tLS0gI1xcblxcbnR5cGUgQ3VycmVudFVzZXIge1xcbiAgZW1haWw6IFN0cmluZ1xcbiAgaXNBdXRoZW50aWNhdGVkOiBCb29sZWFuIVxcbiAgdXNlcm5hbWU6IFN0cmluZ1xcbn1cXG5cXG4jIC0tLS0tIE1VVEFUSU9OIC0tLS0tICNcXG5cXG5leHRlbmQgdHlwZSBNdXRhdGlvbiB7XFxuICBkZWxldGVDdXJyZW50VXNlcjogVXNlclxcbiAgbG9naW5Vc2VyKGRhdGE6IExvZ2luVXNlcklucHV0KTogVXNlciFcXG59XFxuXFxuIyAtLS0tLSBRVUVSWSAtLS0tLSAjXFxuXFxuZXh0ZW5kIHR5cGUgUXVlcnkge1xcbiAgZ2V0Q3VycmVudFVzZXI6IEN1cnJlbnRVc2VyIVxcbiAgbG9nb3V0VXNlcjogQm9vbGVhblxcbiAgdmFsaWRhdGVVc2VyU2lnbnVwKGRhdGE6IFVzZXJTaWdudXBJbnB1dCk6IEJvb2xlYW5cXG59XFxuXCIsXCJuYW1lXCI6XCJHcmFwaFFMIHJlcXVlc3RcIixcImxvY2F0aW9uT2Zmc2V0XCI6e1wibGluZVwiOjEsXCJjb2x1bW5cIjoxfX07XG4gIFxuXG4gICAgdmFyIG5hbWVzID0ge307XG4gICAgZnVuY3Rpb24gdW5pcXVlKGRlZnMpIHtcbiAgICAgIHJldHVybiBkZWZzLmZpbHRlcihcbiAgICAgICAgZnVuY3Rpb24oZGVmKSB7XG4gICAgICAgICAgaWYgKGRlZi5raW5kICE9PSAnRnJhZ21lbnREZWZpbml0aW9uJykgcmV0dXJuIHRydWU7XG4gICAgICAgICAgdmFyIG5hbWUgPSBkZWYubmFtZS52YWx1ZVxuICAgICAgICAgIGlmIChuYW1lc1tuYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYW1lc1tuYW1lXSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIFxuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IGRvYztcbiAgICBcbiIsImltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IHsgUHJpc21hIH0gZnJvbSAncHJpc21hLWJpbmRpbmcnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlclR5cGVzJztcblxuLy8gLS0tLS0gUEFTU1dPUkQgVVRJTFMgLS0tLS0gLy9cblxuZXhwb3J0IGNvbnN0IGhhc2hQYXNzd29yZCA9IChwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IGJjcnlwdC5oYXNoKHBhc3N3b3JkLCAxMCk7XG5cbmV4cG9ydCBjb25zdCB0ZXN0UGFzc3dvcmRTdHJlbmd0aCA9IChwYXNzd29yZCk6IHZvaWQgPT4ge1xuICBjb25zdCBwYXNzd29yZEFycmF5ID0gcGFzc3dvcmQuc3BsaXQoJycpO1xuXG4gIGNvbnN0IHNwZWNpYWxDaGFyYWN0ZXJzID0gWychJywgJ0AnLCAnIycsICckJywgJyYnLCAnKicsICctJ107XG4gIGNvbnN0IGlzVXBwZXJDYXNlID0gKHN0cmluZyk6IGJvb2xlYW4gPT4gL15bQS1aXSokLy50ZXN0KHN0cmluZyk7XG5cbiAgY29uc3QgaGFzTnVtYmVyID0gL1xcZC8udGVzdChwYXNzd29yZCk7XG4gIGNvbnN0IGhhc1NwZWNpYWxDaGFyYWN0ZXJzID0gcGFzc3dvcmRBcnJheS5zb21lKChpKSA9PiBzcGVjaWFsQ2hhcmFjdGVycy5pbmNsdWRlcyhpKSk7XG4gIGNvbnN0IGhhc1VwcGVyQ2FzZSA9IHBhc3N3b3JkQXJyYXkuc29tZSgoaSkgPT4gaXNVcHBlckNhc2UoaSkpO1xuICBjb25zdCBpc0xvbmdFbm91Z2ggPSBwYXNzd29yZC5sZW5ndGggPiA3O1xuXG4gIGNvbnN0IGlzUGFzc3dvcmRTdHJvbmcgPSBoYXNOdW1iZXIgJiYgaGFzU3BlY2lhbENoYXJhY3RlcnMgJiYgaGFzVXBwZXJDYXNlICYmIGlzTG9uZ0Vub3VnaDtcblxuICBpZiAoIWlzUGFzc3dvcmRTdHJvbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dlYWsgcGFzc3dvcmQnKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gVkFMSURBVElPTiBVVElMUyAtLS0tLSAvL1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFbWFpbCA9IGFzeW5jIChwcmlzbWE6IFByaXNtYSwgZW1haWw6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBjb25zdCB1c2Vyc0FyZ3MgPSB7XG4gICAgd2hlcmU6IHsgZW1haWwgfSxcbiAgfTtcblxuICBjb25zdCB1c2VycyA9IGF3YWl0IHByaXNtYS5xdWVyeS51c2Vycyh1c2Vyc0FyZ3MsICd7IGVtYWlsIH0nKTtcblxuICBpZiAodXNlcnMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignZHVwbGljYXRlIGVtYWlsJyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVVzZXJuYW1lID0gYXN5bmMgKHByaXNtYTogUHJpc21hLCB1c2VybmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGNvbnN0IHVzZXJzQXJncyA9IHtcbiAgICB3aGVyZTogeyB1c2VybmFtZSB9LFxuICB9O1xuXG4gIGNvbnN0IHVzZXJzID0gYXdhaXQgcHJpc21hLnF1ZXJ5LnVzZXJzKHVzZXJzQXJncywgJ3sgdXNlcm5hbWUgfScpO1xuXG4gIGlmICh1c2Vycy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdkdXBsaWNhdGUgdXNlcm5hbWUnKTtcbiAgfVxuXG4gIGNvbnN0IHJlZ2V4ID0gUmVnRXhwKC9eW1xcd1xcZF8uLV0rJC9nKTtcblxuICBpZiAoIXJlZ2V4LnRlc3QodXNlcm5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHVzZXJuYW1lJyk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIERBVEEgUkVTVFJJQ1RJT04gVVRJTFMgLS0tLS0gLy9cblxuZXhwb3J0IGNvbnN0IHJlc3RyaWN0VXNlckRhdGEgPSAodXNlcik6IFVzZXIgPT4gKHtcbiAgLi4udXNlcixcbiAgZW1haWw6ICdudWxsJyxcbiAgcGFzc3dvcmQ6ICdudWxsJyxcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==