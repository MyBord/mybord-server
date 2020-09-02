exports.id = "main";
exports.modules = {

/***/ "./src/schema/card/cardResolvers/cardMutations/cardMutations.ts":
/*!**********************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardMutations/cardMutations.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createUserCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createUserCard */ "./src/schema/card/cardResolvers/cardMutations/createUserCard.ts");
/* harmony import */ var _deleteUserCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deleteUserCard */ "./src/schema/card/cardResolvers/cardMutations/deleteUserCard.ts");
/* harmony import */ var _initiateUserCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initiateUserCard */ "./src/schema/card/cardResolvers/cardMutations/initiateUserCard.ts");
/* harmony import */ var _toggleFavoriteUserCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toggleFavoriteUserCard */ "./src/schema/card/cardResolvers/cardMutations/toggleFavoriteUserCard.ts");
/* harmony import */ var _toggleToDoUserCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toggleToDoUserCard */ "./src/schema/card/cardResolvers/cardMutations/toggleToDoUserCard.ts");





/* harmony default export */ __webpack_exports__["default"] = ({
    createUserCard: _createUserCard__WEBPACK_IMPORTED_MODULE_0__["default"],
    deleteUserCard: _deleteUserCard__WEBPACK_IMPORTED_MODULE_1__["default"],
    initiateUserCard: _initiateUserCard__WEBPACK_IMPORTED_MODULE_2__["default"],
    toggleFavoriteUserCard: _toggleFavoriteUserCard__WEBPACK_IMPORTED_MODULE_3__["default"],
    toggleToDoUserCard: _toggleToDoUserCard__WEBPACK_IMPORTED_MODULE_4__["default"],
});


/***/ }),

/***/ "./src/schema/card/cardResolvers/cardMutations/deleteUserCard.ts":
/*!***********************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardMutations/deleteUserCard.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cardUtils/cardInfo */ "./src/schema/card/cardUtils/cardInfo.ts");


/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma, pubsub }) => {
    const userId = passport.getUserId();
    const { cardId } = args.data;
    const queryArgs = {
        where: {
            id: cardId,
            user: {
                id: userId,
            },
        },
    };
    const deleteArgs = {
        where: {
            id: cardId,
        },
    };
    // Make sure that the card that is trying to be deleted belongs to the user
    const userCard = await prisma.query.cards(queryArgs, '{ id }');
    if (userCard.length > 0) {
        const deletedCard = await prisma.mutation.deleteCard(deleteArgs, _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__["default"]);
        pubsub.publish('deletedUserCard', { deletedUserCard: deletedCard });
        return deletedCard;
    }
    throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({
        message: 'The user does not have access to delete this card',
        status: 403,
    });
});


/***/ }),

/***/ "./src/schema/card/cardResolvers/cardMutations/initiateUserCard.ts":
/*!*************************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardMutations/initiateUserCard.ts ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var youtube_youtube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! youtube/youtube */ "./src/thirdParty/youtube/youtube.ts");
/* harmony import */ var _cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cardUtils/cardEnums */ "./src/schema/card/cardUtils/cardEnums.ts");
/* harmony import */ var _cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../cardUtils/cardUtils */ "./src/schema/card/cardUtils/cardUtils.ts");




/* harmony default export */ __webpack_exports__["default"] = (async (parent, args) => {
    try {
        const videoId = Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_3__["getYoutubeVideoId"])(args.data.url);
        const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_1__["default"].getYoutubeVideoData(videoId);
        return {
            category: _cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["default"].video,
            title: youtubeVideoData.videoTitle,
            url: args.data.url,
            youtubeCardData: youtubeVideoData,
        };
    }
    catch (error) {
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: error.message, status: 400 });
    }
});


/***/ }),

/***/ "./src/schema/card/cardResolvers/cardMutations/toggleFavoriteUserCard.ts":
/*!*******************************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardMutations/toggleFavoriteUserCard.ts ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cardUtils/cardInfo */ "./src/schema/card/cardUtils/cardInfo.ts");


/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma }) => {
    const userId = passport.getUserId();
    const { cardId } = args.data;
    const queryArgs = {
        where: {
            id: cardId,
            user: {
                id: userId,
            },
        },
    };
    // Make sure that the card that is trying to be deleted belongs to the user
    const userCard = await prisma.query.cards(queryArgs, '{ id isFavorite }');
    if (userCard.length > 0) {
        const updateArgs = {
            data: {
                isFavorite: !userCard[0].isFavorite,
            },
            where: {
                id: cardId,
            },
        };
        const updatedCard = await prisma.mutation.updateCard(updateArgs, _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__["default"]);
        return updatedCard;
    }
    throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({
        message: 'The user does not have access to delete this card',
        status: 403,
    });
});


/***/ }),

/***/ "./src/schema/card/cardResolvers/cardMutations/toggleToDoUserCard.ts":
/*!***************************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardMutations/toggleToDoUserCard.ts ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cardUtils/cardInfo */ "./src/schema/card/cardUtils/cardInfo.ts");


/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma }) => {
    const userId = passport.getUserId();
    const { cardId } = args.data;
    const queryArgs = {
        where: {
            id: cardId,
            user: {
                id: userId,
            },
        },
    };
    // Make sure that the card that is trying to be deleted belongs to the user
    const userCard = await prisma.query.cards(queryArgs, '{ id isToDo }');
    if (userCard.length > 0) {
        const updateArgs = {
            data: {
                isToDo: !userCard[0].isToDo,
            },
            where: {
                id: cardId,
            },
        };
        const updatedCard = await prisma.mutation.updateCard(updateArgs, _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__["default"]);
        return updatedCard;
    }
    throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({
        message: 'The user does not have access to delete this card',
        status: 403,
    });
});


/***/ }),

/***/ "./src/schema/rootResolvers/mutations.ts":
/*!***********************************************!*\
  !*** ./src/schema/rootResolvers/mutations.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _card_cardResolvers_cardMutations_cardMutations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../card/cardResolvers/cardMutations/cardMutations */ "./src/schema/card/cardResolvers/cardMutations/cardMutations.ts");
/* harmony import */ var _user_userResolvers_userMutations_userMutations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user/userResolvers/userMutations/userMutations */ "./src/schema/user/userResolvers/userMutations/userMutations.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    ..._card_cardResolvers_cardMutations_cardMutations__WEBPACK_IMPORTED_MODULE_0__["default"],
    ..._user_userResolvers_userMutations_userMutations__WEBPACK_IMPORTED_MODULE_1__["default"],
});


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NhcmRNdXRhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZE11dGF0aW9ucy9kZWxldGVVc2VyQ2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2luaXRpYXRlVXNlckNhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZE11dGF0aW9ucy90b2dnbGVGYXZvcml0ZVVzZXJDYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvY2FyZC9jYXJkUmVzb2x2ZXJzL2NhcmRNdXRhdGlvbnMvdG9nZ2xlVG9Eb1VzZXJDYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvcm9vdFJlc29sdmVycy9tdXRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDQTtBQUNJO0FBQ1k7QUFDUjtBQUV2QztJQUNiLHVFQUFjO0lBQ2QsdUVBQWM7SUFDZCwyRUFBZ0I7SUFDaEIsdUZBQXNCO0lBQ3RCLCtFQUFrQjtDQUNuQixFQUFDOzs7Ozs7Ozs7Ozs7O0FDWkY7QUFBQTtBQUFBO0FBQTZDO0FBQ0c7QUFFakMsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQ2xFLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNwQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUU3QixNQUFNLFNBQVMsR0FBRztRQUNoQixLQUFLLEVBQUU7WUFD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Q0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDckNGO0FBQUE7QUFBQTtBQUE4RTtBQUNBO0FBRS9EO0lBQ2IsR0FBRyx1RkFBYTtJQUNoQixHQUFHLHVGQUFhO0NBQ2pCLEVBQUMiLCJmaWxlIjoibWFpbi5lNmM1ZDlkMGU5NTIwYTZlMTRmMi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZVVzZXJDYXJkIGZyb20gJy4vY3JlYXRlVXNlckNhcmQnO1xuaW1wb3J0IGRlbGV0ZVVzZXJDYXJkIGZyb20gJy4vZGVsZXRlVXNlckNhcmQnO1xuaW1wb3J0IGluaXRpYXRlVXNlckNhcmQgZnJvbSAnLi9pbml0aWF0ZVVzZXJDYXJkJztcbmltcG9ydCB0b2dnbGVGYXZvcml0ZVVzZXJDYXJkIGZyb20gJy4vdG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZCc7XG5pbXBvcnQgdG9nZ2xlVG9Eb1VzZXJDYXJkIGZyb20gJy4vdG9nZ2xlVG9Eb1VzZXJDYXJkJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjcmVhdGVVc2VyQ2FyZCxcbiAgZGVsZXRlVXNlckNhcmQsXG4gIGluaXRpYXRlVXNlckNhcmQsXG4gIHRvZ2dsZUZhdm9yaXRlVXNlckNhcmQsXG4gIHRvZ2dsZVRvRG9Vc2VyQ2FyZCxcbn07XG4iLCJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCBjYXJkSW5mbyBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZEluZm8nO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9KSA9PiB7XG4gIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICBjb25zdCB7IGNhcmRJZCB9ID0gYXJncy5kYXRhO1xuXG4gIGNvbnN0IHF1ZXJ5QXJncyA9IHtcbiAgICB3aGVyZToge1xuICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBkZWxldGVBcmdzID0ge1xuICAgIHdoZXJlOiB7XG4gICAgICBpZDogY2FyZElkLFxuICAgIH0sXG4gIH07XG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGNhcmQgdGhhdCBpcyB0cnlpbmcgdG8gYmUgZGVsZXRlZCBiZWxvbmdzIHRvIHRoZSB1c2VyXG4gIGNvbnN0IHVzZXJDYXJkID0gYXdhaXQgcHJpc21hLnF1ZXJ5LmNhcmRzKHF1ZXJ5QXJncywgJ3sgaWQgfScpO1xuXG4gIGlmICh1c2VyQ2FyZC5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZGVsZXRlZENhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24uZGVsZXRlQ2FyZChkZWxldGVBcmdzLCBjYXJkSW5mbyk7XG4gICAgcHVic3ViLnB1Ymxpc2goJ2RlbGV0ZWRVc2VyQ2FyZCcsIHsgZGVsZXRlZFVzZXJDYXJkOiBkZWxldGVkQ2FyZCB9KTtcbiAgICByZXR1cm4gZGVsZXRlZENhcmQ7XG4gIH1cblxuICB0aHJvdyBuZXcgU2VydmVyRXJyb3Ioe1xuICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdGhpcyBjYXJkJyxcbiAgICBzdGF0dXM6IDQwMyxcbiAgfSk7XG59O1xuIiwiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeW91dHViZSBmcm9tICd5b3V0dWJlL3lvdXR1YmUnO1xuaW1wb3J0IGNhcmRFbnVtcyBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZEVudW1zJztcbmltcG9ydCB7IGdldFlvdXR1YmVWaWRlb0lkIH0gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2aWRlb0lkID0gZ2V0WW91dHViZVZpZGVvSWQoYXJncy5kYXRhLnVybCk7XG4gICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh2aWRlb0lkKTtcblxuICAgIHJldHVybiB7XG4gICAgICBjYXRlZ29yeTogY2FyZEVudW1zLnZpZGVvLFxuICAgICAgdGl0bGU6IHlvdXR1YmVWaWRlb0RhdGEudmlkZW9UaXRsZSxcbiAgICAgIHVybDogYXJncy5kYXRhLnVybCxcbiAgICAgIHlvdXR1YmVDYXJkRGF0YTogeW91dHViZVZpZGVvRGF0YSxcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgY2FyZEluZm8gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRJbmZvJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hIH0pID0+IHtcbiAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gIGNvbnN0IHsgY2FyZElkIH0gPSBhcmdzLmRhdGE7XG5cbiAgY29uc3QgcXVlcnlBcmdzID0ge1xuICAgIHdoZXJlOiB7XG4gICAgICBpZDogY2FyZElkLFxuICAgICAgdXNlcjoge1xuICAgICAgICBpZDogdXNlcklkLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBjYXJkIHRoYXQgaXMgdHJ5aW5nIHRvIGJlIGRlbGV0ZWQgYmVsb25ncyB0byB0aGUgdXNlclxuICBjb25zdCB1c2VyQ2FyZCA9IGF3YWl0IHByaXNtYS5xdWVyeS5jYXJkcyhxdWVyeUFyZ3MsICd7IGlkIGlzRmF2b3JpdGUgfScpO1xuXG4gIGlmICh1c2VyQ2FyZC5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgdXBkYXRlQXJncyA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgaXNGYXZvcml0ZTogIXVzZXJDYXJkWzBdLmlzRmF2b3JpdGUsXG4gICAgICB9LFxuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZWRDYXJkID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLnVwZGF0ZUNhcmQodXBkYXRlQXJncywgY2FyZEluZm8pO1xuICAgIHJldHVybiB1cGRhdGVkQ2FyZDtcbiAgfVxuXG4gIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7XG4gICAgbWVzc2FnZTogJ1RoZSB1c2VyIGRvZXMgbm90IGhhdmUgYWNjZXNzIHRvIGRlbGV0ZSB0aGlzIGNhcmQnLFxuICAgIHN0YXR1czogNDAzLFxuICB9KTtcbn07XG4iLCJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCBjYXJkSW5mbyBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZEluZm8nO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEgfSkgPT4ge1xuICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgY29uc3QgeyBjYXJkSWQgfSA9IGFyZ3MuZGF0YTtcblxuICBjb25zdCBxdWVyeUFyZ3MgPSB7XG4gICAgd2hlcmU6IHtcbiAgICAgIGlkOiBjYXJkSWQsXG4gICAgICB1c2VyOiB7XG4gICAgICAgIGlkOiB1c2VySWQsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGNhcmQgdGhhdCBpcyB0cnlpbmcgdG8gYmUgZGVsZXRlZCBiZWxvbmdzIHRvIHRoZSB1c2VyXG4gIGNvbnN0IHVzZXJDYXJkID0gYXdhaXQgcHJpc21hLnF1ZXJ5LmNhcmRzKHF1ZXJ5QXJncywgJ3sgaWQgaXNUb0RvIH0nKTtcblxuICBpZiAodXNlckNhcmQubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHVwZGF0ZUFyZ3MgPSB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGlzVG9EbzogIXVzZXJDYXJkWzBdLmlzVG9EbyxcbiAgICAgIH0sXG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogY2FyZElkLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgdXBkYXRlZENhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24udXBkYXRlQ2FyZCh1cGRhdGVBcmdzLCBjYXJkSW5mbyk7XG4gICAgcmV0dXJuIHVwZGF0ZWRDYXJkO1xuICB9XG5cbiAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHtcbiAgICBtZXNzYWdlOiAnVGhlIHVzZXIgZG9lcyBub3QgaGF2ZSBhY2Nlc3MgdG8gZGVsZXRlIHRoaXMgY2FyZCcsXG4gICAgc3RhdHVzOiA0MDMsXG4gIH0pO1xufTtcbiIsImltcG9ydCBjYXJkTXV0YXRpb25zIGZyb20gJy4uL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NhcmRNdXRhdGlvbnMnO1xuaW1wb3J0IHVzZXJNdXRhdGlvbnMgZnJvbSAnLi4vdXNlci91c2VyUmVzb2x2ZXJzL3VzZXJNdXRhdGlvbnMvdXNlck11dGF0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4uY2FyZE11dGF0aW9ucyxcbiAgLi4udXNlck11dGF0aW9ucyxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9