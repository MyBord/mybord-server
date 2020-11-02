exports.id = "main";
exports.modules = {

/***/ "./src/schema/card/cardResolvers/cardQueries/cardQueries.ts":
/*!******************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardQueries/cardQueries.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _userCards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userCards */ "./src/schema/card/cardResolvers/cardQueries/userCards.ts");
/* harmony import */ var _userCardsWithFilters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userCardsWithFilters */ "./src/schema/card/cardResolvers/cardQueries/userCardsWithFilters.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    userCards: _userCards__WEBPACK_IMPORTED_MODULE_0__["default"],
    userCardsWithFilters: _userCardsWithFilters__WEBPACK_IMPORTED_MODULE_1__["default"],
});


/***/ }),

/***/ "./src/schema/card/cardResolvers/cardQueries/userCardsWithFilters.ts":
/*!***************************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardQueries/userCardsWithFilters.ts ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma, pubsub }, info) => {
    const userId = passport.getUserId();
    const finalArgs = {
        where: {
            user: {
                id: userId,
            },
        },
    };
    const { categories, isFavorite, isToDo } = args.data;
    const filters = {};
    if (categories.length > 0) {
        finalArgs.where.category_in = categories;
        filters.categories = categories;
    }
    if (isFavorite) {
        finalArgs.where.isFavorite = isFavorite;
        filters.isFavorite = isFavorite;
    }
    if (isToDo) {
        finalArgs.where.isToDo = isToDo;
        filters.isToDo = isToDo;
    }
    const userCards = prisma.query.cards(finalArgs, info);
    pubsub.publish('filteredUserCards', { filteredUserCards: { filters, userCards } });
    return userCards;
});


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkUXVlcmllcy9jYXJkUXVlcmllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkUXVlcmllcy91c2VyQ2FyZHNXaXRoRmlsdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFvQztBQUNzQjtBQUUzQztJQUNiLDZEQUFTO0lBQ1QsbUZBQW9CO0NBQ3JCLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNKRjtBQUFlLG9FQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDeEUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXBDLE1BQU0sU0FBUyxHQUFrQjtRQUMvQixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUU7Z0JBQ0osRUFBRSxFQUFFLE1BQU07YUFDWDtTQUNGO0tBQ0YsQ0FBQztJQUVGLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFFckQsTUFBTSxPQUFPLEdBQVksRUFBRSxDQUFDO0lBRTVCLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDekIsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0tBQ2pDO0lBRUQsSUFBSSxVQUFVLEVBQUU7UUFDZCxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDeEMsT0FBTyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FDakM7SUFFRCxJQUFJLE1BQU0sRUFBRTtRQUNWLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNoQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN6QjtJQUVELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25GLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsRUFBQyIsImZpbGUiOiJtYWluLjhkYzRhMGQ4ZmFhN2JlNGEyYWI3LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXNlckNhcmRzIGZyb20gJy4vdXNlckNhcmRzJztcbmltcG9ydCB1c2VyQ2FyZHNXaXRoRmlsdGVycyBmcm9tICcuL3VzZXJDYXJkc1dpdGhGaWx0ZXJzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB1c2VyQ2FyZHMsXG4gIHVzZXJDYXJkc1dpdGhGaWx0ZXJzLFxufTtcbiIsImltcG9ydCB7IENhcmRRdWVyeUFyZ3MsIEZpbHRlcnMgfSBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZFR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hLCBwdWJzdWIgfSwgaW5mbykgPT4ge1xuICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcblxuICBjb25zdCBmaW5hbEFyZ3M6IENhcmRRdWVyeUFyZ3MgPSB7XG4gICAgd2hlcmU6IHtcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICBjb25zdCB7IGNhdGVnb3JpZXMsIGlzRmF2b3JpdGUsIGlzVG9EbyB9ID0gYXJncy5kYXRhO1xuXG4gIGNvbnN0IGZpbHRlcnM6IEZpbHRlcnMgPSB7fTtcblxuICBpZiAoY2F0ZWdvcmllcy5sZW5ndGggPiAwKSB7XG4gICAgZmluYWxBcmdzLndoZXJlLmNhdGVnb3J5X2luID0gY2F0ZWdvcmllcztcbiAgICBmaWx0ZXJzLmNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzO1xuICB9XG5cbiAgaWYgKGlzRmF2b3JpdGUpIHtcbiAgICBmaW5hbEFyZ3Mud2hlcmUuaXNGYXZvcml0ZSA9IGlzRmF2b3JpdGU7XG4gICAgZmlsdGVycy5pc0Zhdm9yaXRlID0gaXNGYXZvcml0ZTtcbiAgfVxuXG4gIGlmIChpc1RvRG8pIHtcbiAgICBmaW5hbEFyZ3Mud2hlcmUuaXNUb0RvID0gaXNUb0RvO1xuICAgIGZpbHRlcnMuaXNUb0RvID0gaXNUb0RvO1xuICB9XG5cbiAgY29uc3QgdXNlckNhcmRzID0gcHJpc21hLnF1ZXJ5LmNhcmRzKGZpbmFsQXJncywgaW5mbyk7XG4gIHB1YnN1Yi5wdWJsaXNoKCdmaWx0ZXJlZFVzZXJDYXJkcycsIHsgZmlsdGVyZWRVc2VyQ2FyZHM6IHsgZmlsdGVycywgdXNlckNhcmRzIH0gfSk7XG4gIHJldHVybiB1c2VyQ2FyZHM7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==