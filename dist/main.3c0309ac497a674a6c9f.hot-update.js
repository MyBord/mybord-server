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
    console.log(' -- getting axios head response -- ');
    const response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.head(url);
    const contentType = response.headers['content-type'];
    console.log(contentType);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NyZWF0ZVVzZXJDYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvY2FyZC9jYXJkUmVzb2x2ZXJzL2NhcmRNdXRhdGlvbnMvaW5pdGlhdGVVc2VyQ2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FBQ0c7QUFDK0I7QUFFaEUsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQ2xFLElBQUk7UUFDRixNQUFNLEVBQ0osUUFBUSxFQUNSLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLEdBQUcsR0FDSixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFZCxNQUFNLElBQUksR0FBRyxNQUFNLHdFQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXBDLE1BQU0sVUFBVSxHQUFHLE1BQU0sa0ZBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEQsTUFBTSxTQUFTLEdBQUc7WUFDaEIsR0FBRyxJQUFJO1lBQ1AsSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRTtvQkFDUixNQUFNLEVBQUUsRUFBRSxHQUFHLFVBQVUsRUFBRTtpQkFDMUI7Z0JBQ0QsUUFBUTtnQkFDUixVQUFVO2dCQUNWLE1BQU07Z0JBQ04sS0FBSztnQkFDTCxJQUFJO2dCQUNKLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUU7d0JBQ1AsRUFBRSxFQUFFLE1BQU07cUJBQ1g7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7UUFFRixNQUFNLElBQUks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QUU7YUFDaEM7U0FDRixDQUFDO0tBQ0g7SUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uM2MwMzA5YWM0OTdhNjc0YTZjOWYuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IGNhcmRJbmZvIGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkSW5mbyc7XG5pbXBvcnQgeyBnZXRDYXJkVHlwZSwgZ2V0VXNlckNhcmRDcmVhdGVBcmdzIH0gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSwgcHVic3ViIH0pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7XG4gICAgICBjYXRlZ29yeSxcbiAgICAgIGlzRmF2b3JpdGUsXG4gICAgICBpc1RvRG8sXG4gICAgICB0aXRsZSxcbiAgICAgIHVybCxcbiAgICB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgdHlwZSA9IGF3YWl0IGdldENhcmRUeXBlKHVybCk7XG5cbiAgICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcblxuICAgIGNvbnN0IGNyZWF0ZUFyZ3MgPSBhd2FpdCBnZXRVc2VyQ2FyZENyZWF0ZUFyZ3ModXJsKTtcblxuICAgIGNvbnN0IGZpbmFsQXJncyA9IHtcbiAgICAgIC4uLmFyZ3MsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGNhcmREYXRhOiB7XG4gICAgICAgICAgY3JlYXRlOiB7IC4uLmNyZWF0ZUFyZ3MgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgIGlzRmF2b3JpdGUsXG4gICAgICAgIGlzVG9EbyxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBjb25uZWN0OiB7XG4gICAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBjYXJkID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLmNyZWF0ZUNhcmQoZmluYWxBcmdzLCBjYXJkSW5mbyk7XG4gICAgcHVic3ViLnB1Ymxpc2goJ3VzZXJDYXJkJywgeyB1c2VyQ2FyZDogY2FyZCB9KTtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgfVxufTtcbiIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCB7IHR5cGUgfSBmcm9tICdzY2hlbWEvY2FyZC9jYXJkVXRpbHMvY2FyZEVudW1zJztcbmltcG9ydCB7IGdldENhcmRUeXBlLCBnZXRJbml0aWFsSW1hZ2VEYXRhLCBnZXRJbml0aWFsWW91dHViZURhdGEgfSBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZFV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXJsIH0gPSBhcmdzLmRhdGE7XG5cbiAgICBjb25zdCBjYXJkVHlwZSA9IGF3YWl0IGdldENhcmRUeXBlKGFyZ3MuZGF0YS51cmwpO1xuXG4gICAgaWYgKGNhcmRUeXBlID09PSB0eXBlLmltYWdlKSB7XG4gICAgICByZXR1cm4gZ2V0SW5pdGlhbEltYWdlRGF0YShhcmdzLmRhdGEudXJsKTtcbiAgICB9XG5cbiAgICBpZiAoY2FyZFR5cGUgPT09IHR5cGUueW91dHViZSkge1xuICAgICAgY29uc3QgaW5pdGlhbFlvdXR1YmVEYXRhID0gYXdhaXQgZ2V0SW5pdGlhbFlvdXR1YmVEYXRhKHVybCk7XG4gICAgICByZXR1cm4gaW5pdGlhbFlvdXR1YmVEYXRhO1xuICAgIH1cblxuICAgIHRocm93IEVycm9yKCdDYW5ub3QgZGV0ZWN0IGEgdmFsaWQgY2FyZCB0eXBlJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHlvdXR1YmUgZnJvbSAneW91dHViZS95b3V0dWJlJztcbmltcG9ydCB7IGNhdGVnb3J5LCB0eXBlIH0gZnJvbSAnc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRFbnVtcyc7XG5pbXBvcnQge1xuICBDYXJkQ3JlYXRlQXJncyxcbiAgQ2FyZFR5cGUsXG4gIEltYWdlRGF0YSxcbiAgSW5pdGlhbENhcmREYXRhU2NoZW1hLFxufSBmcm9tICcuL2NhcmRUeXBlcyc7XG5cbi8vIC0tLS0tIENBUkQgVFlQRSAtLS0tLSAvL1xuXG5leHBvcnQgY29uc3QgZ2V0Q2FyZFR5cGUgPSBhc3luYyAodXJsOiBzdHJpbmcpOiBQcm9taXNlPENhcmRUeXBlPiA9PiB7XG4gIGlmIChcbiAgICB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUuY29tJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1LmJlJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUtbm9jb29raWUuY29tJylcbiAgKSB7XG4gICAgcmV0dXJuIHR5cGUueW91dHViZTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKCcgLS0gZ2V0dGluZyBheGlvcyBoZWFkIHJlc3BvbnNlIC0tICcpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmhlYWQodXJsKTtcbiAgY29uc3QgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzWydjb250ZW50LXR5cGUnXTtcbiAgY29uc29sZS5sb2coY29udGVudFR5cGUpO1xuXG4gIGlmIChbJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL2dpZiddLmluY2x1ZGVzKGNvbnRlbnRUeXBlKSkge1xuICAgIHJldHVybiB0eXBlLmltYWdlO1xuICB9XG5cbiAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkZXRlY3QgYSB2YWxpZCBjYXJkIHR5cGUnKTtcbn07XG5cbi8vIC0tLS0tIElNQUdFIERBVEEgLS0tLS0gLy9cblxuY29uc3QgZ2V0SW1hZ2VEYXRhID0gKHVybDogc3RyaW5nKTogSW1hZ2VEYXRhID0+ICh7XG4gIGltYWdlVXJsOiB1cmwsXG59KTtcblxuLy8gLS0tLS0gSU5JVElBTCBEQVRBIC0tLS0tIC8vXG5cbmV4cG9ydCBjb25zdCBnZXRJbml0aWFsSW1hZ2VEYXRhID0gKHVybDogc3RyaW5nKTogSW5pdGlhbENhcmREYXRhU2NoZW1hID0+IHtcbiAgY29uc3QgaW1hZ2VEYXRhID0gZ2V0SW1hZ2VEYXRhKHVybCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjYXJkRGF0YToge1xuICAgICAgaW1hZ2VDYXJkRGF0YTogeyAuLi5pbWFnZURhdGEgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBjYXRlZ29yeS5pbWFnZSxcbiAgICB0eXBlOiB0eXBlLmltYWdlLFxuICAgIHVybCxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRJbml0aWFsWW91dHViZURhdGEgPSBhc3luYyAodXJsOiBzdHJpbmcpOiBQcm9taXNlPEluaXRpYWxDYXJkRGF0YVNjaGVtYT4gPT4ge1xuICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKHVybCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjYXJkRGF0YToge1xuICAgICAgeW91dHViZUNhcmREYXRhOiB5b3V0dWJlVmlkZW9EYXRhLFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IGNhdGVnb3J5LnZpZGVvLFxuICAgIHRpdGxlOiB5b3V0dWJlVmlkZW9EYXRhLnZpZGVvVGl0bGUsXG4gICAgdHlwZTogdHlwZS55b3V0dWJlLFxuICAgIHVybCxcbiAgfTtcbn07XG5cbi8vIC0tLS0tIENSRUFURSBDQVJEIC0tLS0tIC8vXG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyQ2FyZENyZWF0ZUFyZ3MgPSBhc3luYyAodXJsOiBzdHJpbmcpOiBQcm9taXNlPENhcmRDcmVhdGVBcmdzPiA9PiB7XG4gIGNvbnN0IGNhcmRUeXBlID0gZ2V0Q2FyZFR5cGUodXJsKTtcblxuICBpZiAoY2FyZFR5cGUgPT09IHR5cGUuaW1hZ2UpIHtcbiAgICBjb25zdCBpbWFnZURhdGEgPSBnZXRJbWFnZURhdGEodXJsKTtcblxuICAgIHJldHVybiB7XG4gICAgICBpbWFnZUNhcmREYXRhOiB7XG4gICAgICAgIGNyZWF0ZTogeyAuLi5pbWFnZURhdGEgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChjYXJkVHlwZSA9PT0gdHlwZS55b3V0dWJlKSB7XG4gICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh1cmwpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHlvdXR1YmVDYXJkRGF0YToge1xuICAgICAgICBjcmVhdGU6IHsgLi4ueW91dHViZVZpZGVvRGF0YSB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNhcmQgdHlwZScpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=