exports.id = "main";
exports.modules = {

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


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyUXVlcmllcy92YWxpZGF0ZVVzZXJTaWdudXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBNkM7QUFLVjtBQUVwQixvRUFBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQ2hELElBQUk7UUFDRixNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRWhELGlGQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRS9CLE1BQU0sMEVBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFbkMsTUFBTSw2RUFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFekMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFDRTtZQUNFLGlCQUFpQjtZQUNqQixvQkFBb0I7WUFDcEIsa0JBQWtCO1lBQ2xCLGVBQWU7U0FDaEIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUN6QjtZQUNBLE1BQU0sSUFBSSwwREFBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDaEU7UUFDRCxNQUFNLElBQUksMERBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM5QjtBQUNILENBQUMsRUFBQyIsImZpbGUiOiJtYWluLmY4ZGIxMWI1MWQ1N2VkZDhiMGViLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCB7XG4gIHRlc3RQYXNzd29yZFN0cmVuZ3RoLFxuICB2YWxpZGF0ZUVtYWlsLFxuICB2YWxpZGF0ZVVzZXJuYW1lLFxufSBmcm9tICcuLi8uLi91c2VyVXRpbHMvdXNlclV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncywgeyBwcmlzbWEgfSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCB1c2VybmFtZSB9ID0gYXJncy5kYXRhO1xuXG4gICAgdGVzdFBhc3N3b3JkU3RyZW5ndGgocGFzc3dvcmQpO1xuXG4gICAgYXdhaXQgdmFsaWRhdGVFbWFpbChwcmlzbWEsIGVtYWlsKTtcblxuICAgIGF3YWl0IHZhbGlkYXRlVXNlcm5hbWUocHJpc21hLCB1c2VybmFtZSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoXG4gICAgICBbXG4gICAgICAgICdkdXBsaWNhdGUgZW1haWwnLFxuICAgICAgICAnZHVwbGljYXRlIHVzZXJuYW1lJyxcbiAgICAgICAgJ2ludmFsaWQgdXNlcm5hbWUnLFxuICAgICAgICAnd2VhayBwYXNzd29yZCcsXG4gICAgICBdLmluY2x1ZGVzKGVycm9yLm1lc3NhZ2UpXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKGVycm9yKTtcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=