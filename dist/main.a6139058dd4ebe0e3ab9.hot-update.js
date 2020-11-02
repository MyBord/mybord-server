exports.id = "main";
exports.modules = {

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
    if (categories && categories.length > 0) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkUXVlcmllcy91c2VyQ2FyZHNXaXRoRmlsdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBO0FBQWUsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUN4RSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFcEMsTUFBTSxTQUFTLEdBQWtCO1FBQy9CLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRTtnQkFDSixFQUFFLEVBQUUsTUFBTTthQUNYO1NBQ0Y7S0FDRixDQUFDO0lBRUYsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUVyRCxNQUFNLE9BQU8sR0FBWSxFQUFFLENBQUM7SUFFNUIsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDdkMsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0tBQ2pDO0lBRUQsSUFBSSxVQUFVLEVBQUU7UUFDZCxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDeEMsT0FBTyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FDakM7SUFFRCxJQUFJLE1BQU0sRUFBRTtRQUNWLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNoQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN6QjtJQUVELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25GLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsRUFBQyIsImZpbGUiOiJtYWluLmE2MTM5MDU4ZGQ0ZWJlMGUzYWI5LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYXJkUXVlcnlBcmdzLCBGaWx0ZXJzIH0gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRUeXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSwgcHVic3ViIH0sIGluZm8pID0+IHtcbiAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG5cbiAgY29uc3QgZmluYWxBcmdzOiBDYXJkUXVlcnlBcmdzID0ge1xuICAgIHdoZXJlOiB7XG4gICAgICB1c2VyOiB7XG4gICAgICAgIGlkOiB1c2VySWQsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3QgeyBjYXRlZ29yaWVzLCBpc0Zhdm9yaXRlLCBpc1RvRG8gfSA9IGFyZ3MuZGF0YTtcblxuICBjb25zdCBmaWx0ZXJzOiBGaWx0ZXJzID0ge307XG5cbiAgaWYgKGNhdGVnb3JpZXMgJiYgY2F0ZWdvcmllcy5sZW5ndGggPiAwKSB7XG4gICAgZmluYWxBcmdzLndoZXJlLmNhdGVnb3J5X2luID0gY2F0ZWdvcmllcztcbiAgICBmaWx0ZXJzLmNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzO1xuICB9XG5cbiAgaWYgKGlzRmF2b3JpdGUpIHtcbiAgICBmaW5hbEFyZ3Mud2hlcmUuaXNGYXZvcml0ZSA9IGlzRmF2b3JpdGU7XG4gICAgZmlsdGVycy5pc0Zhdm9yaXRlID0gaXNGYXZvcml0ZTtcbiAgfVxuXG4gIGlmIChpc1RvRG8pIHtcbiAgICBmaW5hbEFyZ3Mud2hlcmUuaXNUb0RvID0gaXNUb0RvO1xuICAgIGZpbHRlcnMuaXNUb0RvID0gaXNUb0RvO1xuICB9XG5cbiAgY29uc3QgdXNlckNhcmRzID0gcHJpc21hLnF1ZXJ5LmNhcmRzKGZpbmFsQXJncywgaW5mbyk7XG4gIHB1YnN1Yi5wdWJsaXNoKCdmaWx0ZXJlZFVzZXJDYXJkcycsIHsgZmlsdGVyZWRVc2VyQ2FyZHM6IHsgZmlsdGVycywgdXNlckNhcmRzIH0gfSk7XG4gIHJldHVybiB1c2VyQ2FyZHM7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==