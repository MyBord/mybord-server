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
    else {
        filters.categories = [];
    }
    if (isFavorite) {
        finalArgs.where.isFavorite = isFavorite;
        filters.isFavorite = isFavorite;
    }
    else {
        filters.isFavorite = false;
    }
    if (isToDo) {
        finalArgs.where.isToDo = isToDo;
        filters.isToDo = isToDo;
    }
    else {
        filters.isToDo = false;
    }
    const userCards = prisma.query.cards(finalArgs, info);
    pubsub.publish('filteredUserCards', { filteredUserCards: { filters, userCards } });
    return userCards;
});


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkUXVlcmllcy91c2VyQ2FyZHNXaXRoRmlsdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBO0FBQWUsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUN4RSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFcEMsTUFBTSxTQUFTLEdBQWtCO1FBQy9CLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRTtnQkFDSixFQUFFLEVBQUUsTUFBTTthQUNYO1NBQ0Y7S0FDRixDQUFDO0lBRUYsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUVyRCxNQUFNLE9BQU8sR0FBWSxFQUFFLENBQUM7SUFFNUIsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDdkMsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0tBQ2pDO1NBQU07UUFDTCxPQUFPLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztLQUN6QjtJQUVELElBQUksVUFBVSxFQUFFO1FBQ2QsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0tBQ2pDO1NBQU07UUFDTCxPQUFPLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztLQUM1QjtJQUVELElBQUksTUFBTSxFQUFFO1FBQ1YsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3pCO1NBQU07UUFDTCxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztLQUN4QjtJQUVELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25GLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsRUFBQyIsImZpbGUiOiJtYWluLjRiOWUyMmU4MTc1NzliN2IyYTE0LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYXJkUXVlcnlBcmdzLCBGaWx0ZXJzIH0gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRUeXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSwgcHVic3ViIH0sIGluZm8pID0+IHtcbiAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG5cbiAgY29uc3QgZmluYWxBcmdzOiBDYXJkUXVlcnlBcmdzID0ge1xuICAgIHdoZXJlOiB7XG4gICAgICB1c2VyOiB7XG4gICAgICAgIGlkOiB1c2VySWQsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3QgeyBjYXRlZ29yaWVzLCBpc0Zhdm9yaXRlLCBpc1RvRG8gfSA9IGFyZ3MuZGF0YTtcblxuICBjb25zdCBmaWx0ZXJzOiBGaWx0ZXJzID0ge307XG5cbiAgaWYgKGNhdGVnb3JpZXMgJiYgY2F0ZWdvcmllcy5sZW5ndGggPiAwKSB7XG4gICAgZmluYWxBcmdzLndoZXJlLmNhdGVnb3J5X2luID0gY2F0ZWdvcmllcztcbiAgICBmaWx0ZXJzLmNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzO1xuICB9IGVsc2Uge1xuICAgIGZpbHRlcnMuY2F0ZWdvcmllcyA9IFtdO1xuICB9XG5cbiAgaWYgKGlzRmF2b3JpdGUpIHtcbiAgICBmaW5hbEFyZ3Mud2hlcmUuaXNGYXZvcml0ZSA9IGlzRmF2b3JpdGU7XG4gICAgZmlsdGVycy5pc0Zhdm9yaXRlID0gaXNGYXZvcml0ZTtcbiAgfSBlbHNlIHtcbiAgICBmaWx0ZXJzLmlzRmF2b3JpdGUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc1RvRG8pIHtcbiAgICBmaW5hbEFyZ3Mud2hlcmUuaXNUb0RvID0gaXNUb0RvO1xuICAgIGZpbHRlcnMuaXNUb0RvID0gaXNUb0RvO1xuICB9IGVsc2Uge1xuICAgIGZpbHRlcnMuaXNUb0RvID0gZmFsc2U7XG4gIH1cblxuICBjb25zdCB1c2VyQ2FyZHMgPSBwcmlzbWEucXVlcnkuY2FyZHMoZmluYWxBcmdzLCBpbmZvKTtcbiAgcHVic3ViLnB1Ymxpc2goJ2ZpbHRlcmVkVXNlckNhcmRzJywgeyBmaWx0ZXJlZFVzZXJDYXJkczogeyBmaWx0ZXJzLCB1c2VyQ2FyZHMgfSB9KTtcbiAgcmV0dXJuIHVzZXJDYXJkcztcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9