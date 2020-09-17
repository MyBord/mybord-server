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

/***/ "./src/schema/card/cardResolvers/cardMutations/createUserCard.ts":
/*!***********************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardMutations/createUserCard.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cardUtils/cardInfo */ "./src/schema/card/cardUtils/cardInfo.ts");
/* harmony import */ var _cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cardUtils/cardUtils */ "./src/schema/card/cardUtils/cardUtils.ts");



/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma, pubsub }) => {
    try {
        const { category, isFavorite, isToDo, title, url, } = args.data;
        const type = await Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_2__["getCardType"])(url);
        const userId = passport.getUserId();
        const createArgs = await Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_2__["getUserCardCreateArgs"])(url);
        const finalArgs = {
            ...args,
            data: {
                cardData: {
                    create: { ...createArgs },
                },
                category,
                isFavorite,
                isToDo,
                title,
                type,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        };
        const card = await prisma.mutation.createCard(finalArgs, _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__["default"]);
        pubsub.publish('userCard', { userCard: card });
        return card;
    }
    catch (error) {
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: error.message, status: 400 });
    }
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
/* harmony import */ var schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! schema/card/cardUtils/cardEnums */ "./src/schema/card/cardUtils/cardEnums.ts");
/* harmony import */ var _cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cardUtils/cardUtils */ "./src/schema/card/cardUtils/cardUtils.ts");



/* harmony default export */ __webpack_exports__["default"] = (async (parent, args) => {
    try {
        const { url } = args.data;
        const cardType = await Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_2__["getCardType"])(args.data.url);
        if (cardType === schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["type"].image) {
            return Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_2__["getInitialImageData"])(args.data.url);
        }
        if (cardType === schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["type"].youtube) {
            const initialYoutubeData = await Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_2__["getInitialYoutubeData"])(url);
            return initialYoutubeData;
        }
        throw Error('Cannot detect a valid card type');
    }
    catch (error) {
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: error.message, status: 400 });
    }
});


/***/ }),

/***/ "./src/schema/card/cardUtils/cardUtils.ts":
/*!************************************************!*\
  !*** ./src/schema/card/cardUtils/cardUtils.ts ***!
  \************************************************/
/*! exports provided: getCardType, getInitialImageData, getInitialYoutubeData, getUserCardCreateArgs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCardType", function() { return getCardType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInitialImageData", function() { return getInitialImageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInitialYoutubeData", function() { return getInitialYoutubeData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserCardCreateArgs", function() { return getUserCardCreateArgs; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var youtube_youtube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! youtube/youtube */ "./src/thirdParty/youtube/youtube.ts");
/* harmony import */ var schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! schema/card/cardUtils/cardEnums */ "./src/schema/card/cardUtils/cardEnums.ts");



// ----- CARD TYPE ----- //
const getCardType = async (url) => {
    if (url.includes('youtube.com')
        || url.includes('youtu.be')
        || url.includes('youtube-nocookie.com')) {
        return schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["type"].youtube;
    }
    const response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.head(url);
    const contentType = console.log(response.headers['content-type']);
    if (['image/jpeg', 'image/png', 'image/gif'].includes(contentType)) {
        return schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["type"].image;
    }
    throw Error('Cannot detect a valid card type');
};
// ----- IMAGE DATA ----- //
const getImageData = (url) => ({
    imageUrl: url,
});
// ----- INITIAL DATA ----- //
const getInitialImageData = (url) => {
    const imageData = getImageData(url);
    return {
        cardData: {
            imageCardData: { ...imageData },
        },
        category: schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["category"].image,
        type: schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["type"].image,
        url,
    };
};
const getInitialYoutubeData = async (url) => {
    const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_1__["default"].getYoutubeVideoData(url);
    return {
        cardData: {
            youtubeCardData: youtubeVideoData,
        },
        category: schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["category"].video,
        title: youtubeVideoData.videoTitle,
        type: schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["type"].youtube,
        url,
    };
};
// ----- CREATE CARD ----- //
const getUserCardCreateArgs = async (url) => {
    const cardType = getCardType(url);
    if (cardType === schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["type"].image) {
        const imageData = getImageData(url);
        return {
            imageCardData: {
                create: { ...imageData },
            },
        };
    }
    if (cardType === schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["type"].youtube) {
        const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_1__["default"].getYoutubeVideoData(url);
        return {
            youtubeCardData: {
                create: { ...youtubeVideoData },
            },
        };
    }
    throw new Error('invalid card type');
};


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NhcmRNdXRhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZE11dGF0aW9ucy9jcmVhdGVVc2VyQ2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2luaXRpYXRlVXNlckNhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDQTtBQUNJO0FBQ1k7QUFDUjtBQUV2QztJQUNiLHVFQUFjO0lBQ2QsdUVBQWM7SUFDZCwyRUFBZ0I7SUFDaEIsdUZBQXNCO0lBQ3RCLCtFQUFrQjtDQUNuQixFQUFDOzs7Ozs7Ozs7Ozs7O0FDWkY7QUFBQTtBQUFBO0FBQUE7QUFBNkM7QUFDRztBQUMrQjtBQUVoRSxvRUFBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7SUFDbEUsSUFBSTtRQUNGLE1BQU0sRUFDSixRQUFRLEVBQ1IsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsR0FBRyxHQUNKLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUVkLE1BQU0sSUFBSSxHQUFHLE1BQU0sd0VBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVwQyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFcEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxrRkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVwRCxNQUFNLFNBQVMsR0FBRztZQUNoQixHQUFHLElBQUk7WUFD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QUFJLFFBQVEsS0FBSyxvRUFBSSxDQUFDLE9BQU8sRUFBRTtRQUM3QixNQUFNLGdCQUFnQixHQUFHLE1BQU0sdURBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVoRSxPQUFPO1lBQ0wsZUFBZSxFQUFFO2dCQUNmLE1BQU0sRUFBRSxFQUFFLEdBQUcsZ0JBQWdCLEVBQUU7YUFDaEM7U0FDRixDQUFDO0tBQ0g7SUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uMzM3ZGY0MzEyOTBhMTk4YjhkZTQuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVVc2VyQ2FyZCBmcm9tICcuL2NyZWF0ZVVzZXJDYXJkJztcbmltcG9ydCBkZWxldGVVc2VyQ2FyZCBmcm9tICcuL2RlbGV0ZVVzZXJDYXJkJztcbmltcG9ydCBpbml0aWF0ZVVzZXJDYXJkIGZyb20gJy4vaW5pdGlhdGVVc2VyQ2FyZCc7XG5pbXBvcnQgdG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZCBmcm9tICcuL3RvZ2dsZUZhdm9yaXRlVXNlckNhcmQnO1xuaW1wb3J0IHRvZ2dsZVRvRG9Vc2VyQ2FyZCBmcm9tICcuL3RvZ2dsZVRvRG9Vc2VyQ2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3JlYXRlVXNlckNhcmQsXG4gIGRlbGV0ZVVzZXJDYXJkLFxuICBpbml0aWF0ZVVzZXJDYXJkLFxuICB0b2dnbGVGYXZvcml0ZVVzZXJDYXJkLFxuICB0b2dnbGVUb0RvVXNlckNhcmQsXG59O1xuIiwiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgY2FyZEluZm8gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRJbmZvJztcbmltcG9ydCB7IGdldENhcmRUeXBlLCBnZXRVc2VyQ2FyZENyZWF0ZUFyZ3MgfSBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZFV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hLCBwdWJzdWIgfSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNhdGVnb3J5LFxuICAgICAgaXNGYXZvcml0ZSxcbiAgICAgIGlzVG9EbyxcbiAgICAgIHRpdGxlLFxuICAgICAgdXJsLFxuICAgIH0gPSBhcmdzLmRhdGE7XG5cbiAgICBjb25zdCB0eXBlID0gYXdhaXQgZ2V0Q2FyZFR5cGUodXJsKTtcblxuICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuXG4gICAgY29uc3QgY3JlYXRlQXJncyA9IGF3YWl0IGdldFVzZXJDYXJkQ3JlYXRlQXJncyh1cmwpO1xuXG4gICAgY29uc3QgZmluYWxBcmdzID0ge1xuICAgICAgLi4uYXJncyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY2FyZERhdGE6IHtcbiAgICAgICAgICBjcmVhdGU6IHsgLi4uY3JlYXRlQXJncyB9LFxuICAgICAgICB9LFxuICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgaXNGYXZvcml0ZSxcbiAgICAgICAgaXNUb0RvLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgdHlwZSxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGNvbm5lY3Q6IHtcbiAgICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IGNhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24uY3JlYXRlQ2FyZChmaW5hbEFyZ3MsIGNhcmRJbmZvKTtcbiAgICBwdWJzdWIucHVibGlzaCgndXNlckNhcmQnLCB7IHVzZXJDYXJkOiBjYXJkIH0pO1xuICAgIHJldHVybiBjYXJkO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHsgdHlwZSB9IGZyb20gJ3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkRW51bXMnO1xuaW1wb3J0IHsgZ2V0Q2FyZFR5cGUsIGdldEluaXRpYWxJbWFnZURhdGEsIGdldEluaXRpYWxZb3V0dWJlRGF0YSB9IGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB1cmwgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IGNhcmRUeXBlID0gYXdhaXQgZ2V0Q2FyZFR5cGUoYXJncy5kYXRhLnVybCk7XG5cbiAgICBpZiAoY2FyZFR5cGUgPT09IHR5cGUuaW1hZ2UpIHtcbiAgICAgIHJldHVybiBnZXRJbml0aWFsSW1hZ2VEYXRhKGFyZ3MuZGF0YS51cmwpO1xuICAgIH1cblxuICAgIGlmIChjYXJkVHlwZSA9PT0gdHlwZS55b3V0dWJlKSB7XG4gICAgICBjb25zdCBpbml0aWFsWW91dHViZURhdGEgPSBhd2FpdCBnZXRJbml0aWFsWW91dHViZURhdGEodXJsKTtcbiAgICAgIHJldHVybiBpbml0aWFsWW91dHViZURhdGE7XG4gICAgfVxuXG4gICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkZXRlY3QgYSB2YWxpZCBjYXJkIHR5cGUnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgfVxufTtcbiIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgeW91dHViZSBmcm9tICd5b3V0dWJlL3lvdXR1YmUnO1xuaW1wb3J0IHsgY2F0ZWdvcnksIHR5cGUgfSBmcm9tICdzY2hlbWEvY2FyZC9jYXJkVXRpbHMvY2FyZEVudW1zJztcbmltcG9ydCB7XG4gIENhcmRDcmVhdGVBcmdzLFxuICBDYXJkVHlwZSxcbiAgSW1hZ2VEYXRhLFxuICBJbml0aWFsQ2FyZERhdGFTY2hlbWEsXG59IGZyb20gJy4vY2FyZFR5cGVzJztcblxuLy8gLS0tLS0gQ0FSRCBUWVBFIC0tLS0tIC8vXG5cbmV4cG9ydCBjb25zdCBnZXRDYXJkVHlwZSA9IGFzeW5jICh1cmw6IHN0cmluZyk6IFByb21pc2U8Q2FyZFR5cGU+ID0+IHtcbiAgaWYgKFxuICAgIHVybC5pbmNsdWRlcygneW91dHViZS5jb20nKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHUuYmUnKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHViZS1ub2Nvb2tpZS5jb20nKVxuICApIHtcbiAgICByZXR1cm4gdHlwZS55b3V0dWJlO1xuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5oZWFkKHVybCk7XG4gIGNvbnN0IGNvbnRlbnRUeXBlID0gY29uc29sZS5sb2cocmVzcG9uc2UuaGVhZGVyc1snY29udGVudC10eXBlJ10pO1xuXG4gIGlmIChbJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL2dpZiddLmluY2x1ZGVzKGNvbnRlbnRUeXBlKSkge1xuICAgIHJldHVybiB0eXBlLmltYWdlO1xuICB9XG5cbiAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkZXRlY3QgYSB2YWxpZCBjYXJkIHR5cGUnKTtcbn07XG5cbi8vIC0tLS0tIElNQUdFIERBVEEgLS0tLS0gLy9cblxuY29uc3QgZ2V0SW1hZ2VEYXRhID0gKHVybDogc3RyaW5nKTogSW1hZ2VEYXRhID0+ICh7XG4gIGltYWdlVXJsOiB1cmwsXG59KTtcblxuLy8gLS0tLS0gSU5JVElBTCBEQVRBIC0tLS0tIC8vXG5cbmV4cG9ydCBjb25zdCBnZXRJbml0aWFsSW1hZ2VEYXRhID0gKHVybDogc3RyaW5nKTogSW5pdGlhbENhcmREYXRhU2NoZW1hID0+IHtcbiAgY29uc3QgaW1hZ2VEYXRhID0gZ2V0SW1hZ2VEYXRhKHVybCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjYXJkRGF0YToge1xuICAgICAgaW1hZ2VDYXJkRGF0YTogeyAuLi5pbWFnZURhdGEgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBjYXRlZ29yeS5pbWFnZSxcbiAgICB0eXBlOiB0eXBlLmltYWdlLFxuICAgIHVybCxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRJbml0aWFsWW91dHViZURhdGEgPSBhc3luYyAodXJsOiBzdHJpbmcpOiBQcm9taXNlPEluaXRpYWxDYXJkRGF0YVNjaGVtYT4gPT4ge1xuICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKHVybCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjYXJkRGF0YToge1xuICAgICAgeW91dHViZUNhcmREYXRhOiB5b3V0dWJlVmlkZW9EYXRhLFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IGNhdGVnb3J5LnZpZGVvLFxuICAgIHRpdGxlOiB5b3V0dWJlVmlkZW9EYXRhLnZpZGVvVGl0bGUsXG4gICAgdHlwZTogdHlwZS55b3V0dWJlLFxuICAgIHVybCxcbiAgfTtcbn07XG5cbi8vIC0tLS0tIENSRUFURSBDQVJEIC0tLS0tIC8vXG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyQ2FyZENyZWF0ZUFyZ3MgPSBhc3luYyAodXJsOiBzdHJpbmcpOiBQcm9taXNlPENhcmRDcmVhdGVBcmdzPiA9PiB7XG4gIGNvbnN0IGNhcmRUeXBlID0gZ2V0Q2FyZFR5cGUodXJsKTtcblxuICBpZiAoY2FyZFR5cGUgPT09IHR5cGUuaW1hZ2UpIHtcbiAgICBjb25zdCBpbWFnZURhdGEgPSBnZXRJbWFnZURhdGEodXJsKTtcblxuICAgIHJldHVybiB7XG4gICAgICBpbWFnZUNhcmREYXRhOiB7XG4gICAgICAgIGNyZWF0ZTogeyAuLi5pbWFnZURhdGEgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChjYXJkVHlwZSA9PT0gdHlwZS55b3V0dWJlKSB7XG4gICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh1cmwpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHlvdXR1YmVDYXJkRGF0YToge1xuICAgICAgICBjcmVhdGU6IHsgLi4ueW91dHViZVZpZGVvRGF0YSB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNhcmQgdHlwZScpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=