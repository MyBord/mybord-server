exports.id = "main";
exports.modules = {

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



/* harmony default export */ __webpack_exports__["default"] = ({
    getCurrentUser: _getCurrentUser__WEBPACK_IMPORTED_MODULE_0__["default"],
    logoutUser: _logoutUser__WEBPACK_IMPORTED_MODULE_1__["default"],
    users: _users__WEBPACK_IMPORTED_MODULE_2__["default"],
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


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyUXVlcmllcy91c2VyUXVlcmllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyUXVlcmllcy91c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThDO0FBQ1I7QUFDVjtBQUViO0lBQ2IsdUVBQWM7SUFDZCwrREFBVTtJQUNWLHFEQUFLO0NBQ04sRUFBQzs7Ozs7Ozs7Ozs7OztBQ1JGO0FBQUE7QUFBNkQ7QUFFOUMsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDdEQsTUFBTSxTQUFTLEdBQUc7UUFDaEIsR0FBRyxJQUFJO1FBQ1AsS0FBSyxFQUFFO1lBQ0wsR0FBRyxJQUFJLENBQUMsS0FBSztTQUNkO0tBQ0YsQ0FBQztJQUNGLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7UUFDMUMsT0FBTyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztLQUM5QjtJQUVELE1BQU0sS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRXhELE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyw2RUFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUMsRUFBQyIsImZpbGUiOiJtYWluLjNkM2I5ZmUwMDhmZmMyZGY3NjhhLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2V0Q3VycmVudFVzZXIgZnJvbSAnLi9nZXRDdXJyZW50VXNlcic7XG5pbXBvcnQgbG9nb3V0VXNlciBmcm9tICcuL2xvZ291dFVzZXInO1xuaW1wb3J0IHVzZXJzIGZyb20gJy4vdXNlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldEN1cnJlbnRVc2VyLFxuICBsb2dvdXRVc2VyLFxuICB1c2Vycyxcbn07XG4iLCJpbXBvcnQgeyByZXN0cmljdFVzZXJEYXRhIH0gZnJvbSAnLi4vLi4vdXNlclV0aWxzL3VzZXJVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcHJpc21hIH0sIGluZm8pID0+IHtcbiAgY29uc3QgZmluYWxBcmdzID0ge1xuICAgIC4uLmFyZ3MsXG4gICAgd2hlcmU6IHtcbiAgICAgIC4uLmFyZ3Mud2hlcmUsXG4gICAgfSxcbiAgfTtcbiAgaWYgKGFyZ3MgJiYgYXJncy53aGVyZSAmJiBhcmdzLndoZXJlLmVtYWlsKSB7XG4gICAgZGVsZXRlIGZpbmFsQXJncy53aGVyZS5lbWFpbDtcbiAgfVxuXG4gIGNvbnN0IHVzZXJzID0gYXdhaXQgcHJpc21hLnF1ZXJ5LnVzZXJzKGZpbmFsQXJncywgaW5mbyk7XG5cbiAgcmV0dXJuIHVzZXJzLm1hcChhc3luYyAodXNlcikgPT4gcmVzdHJpY3RVc2VyRGF0YSh1c2VyKSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==