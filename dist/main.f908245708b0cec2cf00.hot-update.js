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
        const type = Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_2__["getCardType"])(url);
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
        const cardType = Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_2__["getCardType"])(args.data.url);
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
/* harmony import */ var youtube_youtube__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! youtube/youtube */ "./src/thirdParty/youtube/youtube.ts");
/* harmony import */ var schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! schema/card/cardUtils/cardEnums */ "./src/schema/card/cardUtils/cardEnums.ts");


// ----- CARD TYPE ----- //
const getCardType = (url) => {
    if (url.includes('youtube.com')
        || url.includes('youtu.be')
        || url.includes('youtube-nocookie.com')) {
        return schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["type"].youtube;
    }
    if (url.endsWith('.jpeg') || url.endsWith('.jpg') || url.endsWith('.png')) {
        return schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["type"].image;
    }
    throw Error('Cannot detect a valid card type');
};
// ----- IMAGE DATA ---- //
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
        category: schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["category"].image,
        url,
    };
};
const getInitialYoutubeData = async (url) => {
    const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_0__["default"].getYoutubeVideoData(url);
    return {
        cardData: {
            youtubeCardData: youtubeVideoData,
        },
        category: schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["category"].video,
        title: youtubeVideoData.videoTitle,
        url,
    };
};
// ----- CREATE CARD ----- //
const getUserCardCreateArgs = async (url) => {
    const cardType = getCardType(url);
    if (cardType === schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["type"].image) {
        const imageData = getImageData(url);
        return {
            imageCardData: {
                create: { ...imageData },
            },
        };
    }
    if (cardType === schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["type"].youtube) {
        const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_0__["default"].getYoutubeVideoData(url);
        return {
            youtubeCardData: {
                create: { ...youtubeVideoData },
            },
        };
    }
    throw Error('Cannot detect a valid card type');
};


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NhcmRNdXRhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZE11dGF0aW9ucy9jcmVhdGVVc2VyQ2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2luaXRpYXRlVXNlckNhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDQTtBQUNJO0FBQ1k7QUFDUjtBQUV2QztJQUNiLHVFQUFjO0lBQ2QsdUVBQWM7SUFDZCwyRUFBZ0I7SUFDaEIsdUZBQXNCO0lBQ3RCLCtFQUFrQjtDQUNuQixFQUFDOzs7Ozs7Ozs7Ozs7O0FDWkY7QUFBQTtBQUFBO0FBQUE7QUFBNkM7QUFFRztBQUMrQjtBQUVoRSxvRUFBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7SUFDbEUsSUFBSTtRQUNGLE1BQU0sRUFDSixRQUFRLEVBQ1IsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsR0FBRyxHQUNKLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUVkLE1BQU0sSUFBSSxHQUFHLHdFQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXBDLE1BQU0sVUFBVSxHQUFHLE1BQU0sa0ZBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEQsTUFBTSxTQUFTLEdBQUc7WUFDaEIsR0FBRyxJQUFJO1lBQ1AsSUFB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QUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmY5MDgyNDU3MDhiMGNlYzJjZjAwLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlVXNlckNhcmQgZnJvbSAnLi9jcmVhdGVVc2VyQ2FyZCc7XG5pbXBvcnQgZGVsZXRlVXNlckNhcmQgZnJvbSAnLi9kZWxldGVVc2VyQ2FyZCc7XG5pbXBvcnQgaW5pdGlhdGVVc2VyQ2FyZCBmcm9tICcuL2luaXRpYXRlVXNlckNhcmQnO1xuaW1wb3J0IHRvZ2dsZUZhdm9yaXRlVXNlckNhcmQgZnJvbSAnLi90b2dnbGVGYXZvcml0ZVVzZXJDYXJkJztcbmltcG9ydCB0b2dnbGVUb0RvVXNlckNhcmQgZnJvbSAnLi90b2dnbGVUb0RvVXNlckNhcmQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVVzZXJDYXJkLFxuICBkZWxldGVVc2VyQ2FyZCxcbiAgaW5pdGlhdGVVc2VyQ2FyZCxcbiAgdG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZCxcbiAgdG9nZ2xlVG9Eb1VzZXJDYXJkLFxufTtcbiIsImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHlvdXR1YmUgZnJvbSAneW91dHViZS95b3V0dWJlJztcbmltcG9ydCBjYXJkSW5mbyBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZEluZm8nO1xuaW1wb3J0IHsgZ2V0Q2FyZFR5cGUsIGdldFVzZXJDYXJkQ3JlYXRlQXJncyB9IGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qge1xuICAgICAgY2F0ZWdvcnksXG4gICAgICBpc0Zhdm9yaXRlLFxuICAgICAgaXNUb0RvLFxuICAgICAgdGl0bGUsXG4gICAgICB1cmwsXG4gICAgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IHR5cGUgPSBnZXRDYXJkVHlwZSh1cmwpO1xuXG4gICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG5cbiAgICBjb25zdCBjcmVhdGVBcmdzID0gYXdhaXQgZ2V0VXNlckNhcmRDcmVhdGVBcmdzKHVybCk7XG5cbiAgICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgICAuLi5hcmdzLFxuICAgICAgZGF0YToge1xuICAgICAgICBjYXJkRGF0YToge1xuICAgICAgICAgIGNyZWF0ZTogeyAuLi5jcmVhdGVBcmdzIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNhdGVnb3J5LFxuICAgICAgICBpc0Zhdm9yaXRlLFxuICAgICAgICBpc1RvRG8sXG4gICAgICAgIHRpdGxlLFxuICAgICAgICB0eXBlLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgY29ubmVjdDoge1xuICAgICAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgY2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5jcmVhdGVDYXJkKGZpbmFsQXJncywgY2FyZEluZm8pO1xuICAgIHB1YnN1Yi5wdWJsaXNoKCd1c2VyQ2FyZCcsIHsgdXNlckNhcmQ6IGNhcmQgfSk7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCB7IHR5cGUgfSBmcm9tICdzY2hlbWEvY2FyZC9jYXJkVXRpbHMvY2FyZEVudW1zJztcbmltcG9ydCB7IGdldENhcmRUeXBlLCBnZXRJbml0aWFsSW1hZ2VEYXRhLCBnZXRJbml0aWFsWW91dHViZURhdGEgfSBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZFV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXJsIH0gPSBhcmdzLmRhdGE7XG4gICAgY29uc3QgY2FyZFR5cGUgPSBnZXRDYXJkVHlwZShhcmdzLmRhdGEudXJsKTtcblxuICAgIGlmIChjYXJkVHlwZSA9PT0gdHlwZS5pbWFnZSkge1xuICAgICAgcmV0dXJuIGdldEluaXRpYWxJbWFnZURhdGEoYXJncy5kYXRhLnVybCk7XG4gICAgfVxuXG4gICAgaWYgKGNhcmRUeXBlID09PSB0eXBlLnlvdXR1YmUpIHtcbiAgICAgIGNvbnN0IGluaXRpYWxZb3V0dWJlRGF0YSA9IGF3YWl0IGdldEluaXRpYWxZb3V0dWJlRGF0YSh1cmwpO1xuICAgICAgcmV0dXJuIGluaXRpYWxZb3V0dWJlRGF0YTtcbiAgICB9XG5cbiAgICB0aHJvdyBFcnJvcignQ2Fubm90IGRldGVjdCBhIHZhbGlkIGNhcmQgdHlwZScpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IHlvdXR1YmUgZnJvbSAneW91dHViZS95b3V0dWJlJztcbmltcG9ydCB7IGNhdGVnb3J5LCB0eXBlIH0gZnJvbSAnc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRFbnVtcyc7XG5pbXBvcnQge1xuICBDYXJkQ3JlYXRlQXJncyxcbiAgQ2FyZFR5cGUsXG4gIEltYWdlRGF0YSxcbiAgSW5pdGlhbENhcmREYXRhU2NoZW1hLFxufSBmcm9tICcuL2NhcmRUeXBlcyc7XG5cbi8vIC0tLS0tIENBUkQgVFlQRSAtLS0tLSAvL1xuXG5leHBvcnQgY29uc3QgZ2V0Q2FyZFR5cGUgPSAodXJsOiBzdHJpbmcpOiBDYXJkVHlwZSA9PiB7XG4gIGlmIChcbiAgICB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUuY29tJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1LmJlJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUtbm9jb29raWUuY29tJylcbiAgKSB7XG4gICAgcmV0dXJuIHR5cGUueW91dHViZTtcbiAgfVxuXG4gIGlmICh1cmwuZW5kc1dpdGgoJy5qcGVnJykgfHwgdXJsLmVuZHNXaXRoKCcuanBnJykgfHwgdXJsLmVuZHNXaXRoKCcucG5nJykpIHtcbiAgICByZXR1cm4gdHlwZS5pbWFnZTtcbiAgfVxuXG4gIHRocm93IEVycm9yKCdDYW5ub3QgZGV0ZWN0IGEgdmFsaWQgY2FyZCB0eXBlJyk7XG59O1xuXG4vLyAtLS0tLSBJTUFHRSBEQVRBIC0tLS0gLy9cblxuY29uc3QgZ2V0SW1hZ2VEYXRhID0gKHVybDogc3RyaW5nKTogSW1hZ2VEYXRhID0+ICh7XG4gIGltYWdlVXJsOiB1cmwsXG59KTtcblxuLy8gLS0tLS0gSU5JVElBTCBEQVRBIC0tLS0tIC8vXG5cbmV4cG9ydCBjb25zdCBnZXRJbml0aWFsSW1hZ2VEYXRhID0gKHVybDogc3RyaW5nKTogSW5pdGlhbENhcmREYXRhU2NoZW1hID0+IHtcbiAgY29uc3QgaW1hZ2VEYXRhID0gZ2V0SW1hZ2VEYXRhKHVybCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjYXJkRGF0YToge1xuICAgICAgaW1hZ2VDYXJkRGF0YTogeyAuLi5pbWFnZURhdGEgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBjYXRlZ29yeS5pbWFnZSxcbiAgICB1cmwsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0SW5pdGlhbFlvdXR1YmVEYXRhID0gYXN5bmMgKHVybDogc3RyaW5nKTogUHJvbWlzZTxJbml0aWFsQ2FyZERhdGFTY2hlbWE+ID0+IHtcbiAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh1cmwpO1xuXG4gIHJldHVybiB7XG4gICAgY2FyZERhdGE6IHtcbiAgICAgIHlvdXR1YmVDYXJkRGF0YTogeW91dHViZVZpZGVvRGF0YSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBjYXRlZ29yeS52aWRlbyxcbiAgICB0aXRsZTogeW91dHViZVZpZGVvRGF0YS52aWRlb1RpdGxlLFxuICAgIHVybCxcbiAgfTtcbn07XG5cbi8vIC0tLS0tIENSRUFURSBDQVJEIC0tLS0tIC8vXG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyQ2FyZENyZWF0ZUFyZ3MgPSBhc3luYyAodXJsOiBzdHJpbmcpOiBQcm9taXNlPENhcmRDcmVhdGVBcmdzPiA9PiB7XG4gIGNvbnN0IGNhcmRUeXBlID0gZ2V0Q2FyZFR5cGUodXJsKTtcblxuICBpZiAoY2FyZFR5cGUgPT09IHR5cGUuaW1hZ2UpIHtcbiAgICBjb25zdCBpbWFnZURhdGEgPSBnZXRJbWFnZURhdGEodXJsKTtcbiAgICByZXR1cm4ge1xuICAgICAgaW1hZ2VDYXJkRGF0YToge1xuICAgICAgICBjcmVhdGU6IHsgLi4uaW1hZ2VEYXRhIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoY2FyZFR5cGUgPT09IHR5cGUueW91dHViZSkge1xuICAgIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodXJsKTtcbiAgICByZXR1cm4ge1xuICAgICAgeW91dHViZUNhcmREYXRhOiB7XG4gICAgICAgIGNyZWF0ZTogeyAuLi55b3V0dWJlVmlkZW9EYXRhIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICB0aHJvdyBFcnJvcignQ2Fubm90IGRldGVjdCBhIHZhbGlkIGNhcmQgdHlwZScpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=