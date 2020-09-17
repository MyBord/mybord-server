exports.id = "main";
exports.modules = {

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
        const cardType = await Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_2__["getCardType"])(url);
        const userId = passport.getUserId();
        const createArgs = await Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_2__["getUserCardCreateArgs"])(cardType, url);
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
                type: cardType,
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
    const contentType = response.headers['content-type'];
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
const getUserCardCreateArgs = async (cardType, url) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NyZWF0ZVVzZXJDYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvY2FyZC9jYXJkUmVzb2x2ZXJzL2NhcmRNdXRhdGlvbnMvaW5pdGlhdGVVc2VyQ2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FBQ0c7QUFDK0I7QUFFaEUsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQ2xFLElBQUk7UUFDRixNQUFNLEVBQ0osUUFBUSxFQUNSLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLEdBQUcsR0FDSixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFZCxNQUFNLFFBQVEsR0FBRyxNQUFNLHdFQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXBDLE1BQU0sVUFBVSxHQUFHLE1BQU0sa0ZBQXFCLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTlELE1BQU0sU0FBUyxHQUFHO1lBQ2hCLEdBQUcsSUFBSTtZQUNQLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUU7b0JBQ1IsTUFBTSxFQUFFLEVBQUUsR0FBRyxVQUFVLEVBQUU7aUJBQzFCO2dCQUNELFFBQVE7Z0JBQ1IsVUFBVTtnQkFDVixNQUFNO2dCQUNOLEtBQUs7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRTt3QkFDUCxFQUFFLEVBQUUsTUFBTTtxQkFDWDtpQkFDRjthQUNGO1NBQ0Ys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ZGRkYjBlMzQ4ZWVkMGVkYzlkLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCBjYXJkSW5mbyBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZEluZm8nO1xuaW1wb3J0IHsgZ2V0Q2FyZFR5cGUsIGdldFVzZXJDYXJkQ3JlYXRlQXJncyB9IGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qge1xuICAgICAgY2F0ZWdvcnksXG4gICAgICBpc0Zhdm9yaXRlLFxuICAgICAgaXNUb0RvLFxuICAgICAgdGl0bGUsXG4gICAgICB1cmwsXG4gICAgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IGNhcmRUeXBlID0gYXdhaXQgZ2V0Q2FyZFR5cGUodXJsKTtcblxuICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuXG4gICAgY29uc3QgY3JlYXRlQXJncyA9IGF3YWl0IGdldFVzZXJDYXJkQ3JlYXRlQXJncyhjYXJkVHlwZSwgdXJsKTtcblxuICAgIGNvbnN0IGZpbmFsQXJncyA9IHtcbiAgICAgIC4uLmFyZ3MsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGNhcmREYXRhOiB7XG4gICAgICAgICAgY3JlYXRlOiB7IC4uLmNyZWF0ZUFyZ3MgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgIGlzRmF2b3JpdGUsXG4gICAgICAgIGlzVG9EbyxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHR5cGU6IGNhcmRUeXBlLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgY29ubmVjdDoge1xuICAgICAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgY2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5jcmVhdGVDYXJkKGZpbmFsQXJncywgY2FyZEluZm8pO1xuICAgIHB1YnN1Yi5wdWJsaXNoKCd1c2VyQ2FyZCcsIHsgdXNlckNhcmQ6IGNhcmQgfSk7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeyB0eXBlIH0gZnJvbSAnc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRFbnVtcyc7XG5pbXBvcnQgeyBnZXRDYXJkVHlwZSwgZ2V0SW5pdGlhbEltYWdlRGF0YSwgZ2V0SW5pdGlhbFlvdXR1YmVEYXRhIH0gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVybCB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgY2FyZFR5cGUgPSBhd2FpdCBnZXRDYXJkVHlwZShhcmdzLmRhdGEudXJsKTtcblxuICAgIGlmIChjYXJkVHlwZSA9PT0gdHlwZS5pbWFnZSkge1xuICAgICAgcmV0dXJuIGdldEluaXRpYWxJbWFnZURhdGEoYXJncy5kYXRhLnVybCk7XG4gICAgfVxuXG4gICAgaWYgKGNhcmRUeXBlID09PSB0eXBlLnlvdXR1YmUpIHtcbiAgICAgIGNvbnN0IGluaXRpYWxZb3V0dWJlRGF0YSA9IGF3YWl0IGdldEluaXRpYWxZb3V0dWJlRGF0YSh1cmwpO1xuICAgICAgcmV0dXJuIGluaXRpYWxZb3V0dWJlRGF0YTtcbiAgICB9XG5cbiAgICB0aHJvdyBFcnJvcignQ2Fubm90IGRldGVjdCBhIHZhbGlkIGNhcmQgdHlwZScpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB5b3V0dWJlIGZyb20gJ3lvdXR1YmUveW91dHViZSc7XG5pbXBvcnQgeyBjYXRlZ29yeSwgdHlwZSB9IGZyb20gJ3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkRW51bXMnO1xuaW1wb3J0IHtcbiAgQ2FyZENyZWF0ZUFyZ3MsXG4gIENhcmRUeXBlLFxuICBJbWFnZURhdGEsXG4gIEluaXRpYWxDYXJkRGF0YVNjaGVtYSxcbn0gZnJvbSAnLi9jYXJkVHlwZXMnO1xuXG4vLyAtLS0tLSBDQVJEIFRZUEUgLS0tLS0gLy9cblxuZXhwb3J0IGNvbnN0IGdldENhcmRUeXBlID0gYXN5bmMgKHVybDogc3RyaW5nKTogUHJvbWlzZTxDYXJkVHlwZT4gPT4ge1xuICBpZiAoXG4gICAgdXJsLmluY2x1ZGVzKCd5b3V0dWJlLmNvbScpXG4gICAgfHwgdXJsLmluY2x1ZGVzKCd5b3V0dS5iZScpXG4gICAgfHwgdXJsLmluY2x1ZGVzKCd5b3V0dWJlLW5vY29va2llLmNvbScpXG4gICkge1xuICAgIHJldHVybiB0eXBlLnlvdXR1YmU7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmhlYWQodXJsKTtcbiAgY29uc3QgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzWydjb250ZW50LXR5cGUnXTtcblxuICBpZiAoWydpbWFnZS9qcGVnJywgJ2ltYWdlL3BuZycsICdpbWFnZS9naWYnXS5pbmNsdWRlcyhjb250ZW50VHlwZSkpIHtcbiAgICByZXR1cm4gdHlwZS5pbWFnZTtcbiAgfVxuXG4gIHRocm93IEVycm9yKCdDYW5ub3QgZGV0ZWN0IGEgdmFsaWQgY2FyZCB0eXBlJyk7XG59O1xuXG4vLyAtLS0tLSBJTUFHRSBEQVRBIC0tLS0tIC8vXG5cbmNvbnN0IGdldEltYWdlRGF0YSA9ICh1cmw6IHN0cmluZyk6IEltYWdlRGF0YSA9PiAoe1xuICBpbWFnZVVybDogdXJsLFxufSk7XG5cbi8vIC0tLS0tIElOSVRJQUwgREFUQSAtLS0tLSAvL1xuXG5leHBvcnQgY29uc3QgZ2V0SW5pdGlhbEltYWdlRGF0YSA9ICh1cmw6IHN0cmluZyk6IEluaXRpYWxDYXJkRGF0YVNjaGVtYSA9PiB7XG4gIGNvbnN0IGltYWdlRGF0YSA9IGdldEltYWdlRGF0YSh1cmwpO1xuXG4gIHJldHVybiB7XG4gICAgY2FyZERhdGE6IHtcbiAgICAgIGltYWdlQ2FyZERhdGE6IHsgLi4uaW1hZ2VEYXRhIH0sXG4gICAgfSxcbiAgICBjYXRlZ29yeTogY2F0ZWdvcnkuaW1hZ2UsXG4gICAgdHlwZTogdHlwZS5pbWFnZSxcbiAgICB1cmwsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0SW5pdGlhbFlvdXR1YmVEYXRhID0gYXN5bmMgKHVybDogc3RyaW5nKTogUHJvbWlzZTxJbml0aWFsQ2FyZERhdGFTY2hlbWE+ID0+IHtcbiAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh1cmwpO1xuXG4gIHJldHVybiB7XG4gICAgY2FyZERhdGE6IHtcbiAgICAgIHlvdXR1YmVDYXJkRGF0YTogeW91dHViZVZpZGVvRGF0YSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBjYXRlZ29yeS52aWRlbyxcbiAgICB0aXRsZTogeW91dHViZVZpZGVvRGF0YS52aWRlb1RpdGxlLFxuICAgIHR5cGU6IHR5cGUueW91dHViZSxcbiAgICB1cmwsXG4gIH07XG59O1xuXG4vLyAtLS0tLSBDUkVBVEUgQ0FSRCAtLS0tLSAvL1xuXG5leHBvcnQgY29uc3QgZ2V0VXNlckNhcmRDcmVhdGVBcmdzID0gYXN5bmMgKFxuICBjYXJkVHlwZTogQ2FyZFR5cGUsXG4gIHVybDogc3RyaW5nLFxuKTogUHJvbWlzZTxDYXJkQ3JlYXRlQXJncz4gPT4ge1xuICBpZiAoY2FyZFR5cGUgPT09IHR5cGUuaW1hZ2UpIHtcbiAgICBjb25zdCBpbWFnZURhdGEgPSBnZXRJbWFnZURhdGEodXJsKTtcblxuICAgIHJldHVybiB7XG4gICAgICBpbWFnZUNhcmREYXRhOiB7XG4gICAgICAgIGNyZWF0ZTogeyAuLi5pbWFnZURhdGEgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChjYXJkVHlwZSA9PT0gdHlwZS55b3V0dWJlKSB7XG4gICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh1cmwpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHlvdXR1YmVDYXJkRGF0YToge1xuICAgICAgICBjcmVhdGU6IHsgLi4ueW91dHViZVZpZGVvRGF0YSB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNhcmQgdHlwZScpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=