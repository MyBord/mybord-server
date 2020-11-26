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


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyTXV0YXRpb25zL2NyZWF0ZVVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBNkM7QUFDOEI7QUFFNUQsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2hFLElBQUk7UUFDRixNQUFNLGNBQWMsR0FBRyxNQUFNLHlFQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RCxNQUFNLFNBQVMsR0FBRztZQUNoQixHQUFHLElBQUk7WUFDUCxJQUFJLEVBQUU7Z0JBQ0osR0FBRyxJQUFJLENBQUMsSUFBSTtnQkFDWixRQUFRLEVBQUUsY0FBYzthQUN6QjtTQUNGLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUvRCxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXpELE9BQU8sNkVBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDL0I7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE1BQU0sSUFBSSwwREFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlCO0FBQ0gsQ0FBQyxFQUFDIiwiZmlsZSI6Im1haW4uMTUzODc5NjVjZGVhMTI0NDA3NDkuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHsgaGFzaFBhc3N3b3JkLCByZXN0cmljdFVzZXJEYXRhIH0gZnJvbSAnLi4vLi4vdXNlclV0aWxzL3VzZXJVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSB9LCBpbmZvKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQoYXJncy5kYXRhLnBhc3N3b3JkKTtcbiAgICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgICAuLi5hcmdzLFxuICAgICAgZGF0YToge1xuICAgICAgICAuLi5hcmdzLmRhdGEsXG4gICAgICAgIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZCxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24uY3JlYXRlVXNlcihmaW5hbEFyZ3MsIGluZm8pO1xuXG4gICAgcGFzc3BvcnQubG9naW4oeyBhdXRoZW50aWNhdGVPcHRpb25zOiBhcmdzLmRhdGEsIHVzZXIgfSk7XG5cbiAgICByZXR1cm4gcmVzdHJpY3RVc2VyRGF0YSh1c2VyKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoZXJyb3IpO1xuICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==