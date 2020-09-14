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
/* harmony import */ var youtube_youtube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! youtube/youtube */ "./src/thirdParty/youtube/youtube.ts");
/* harmony import */ var _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cardUtils/cardInfo */ "./src/schema/card/cardUtils/cardInfo.ts");
/* harmony import */ var _cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../cardUtils/cardUtils */ "./src/schema/card/cardUtils/cardUtils.ts");




/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma, pubsub }) => {
    try {
        const { category, isFavorite, isToDo, title, url, } = args.data;
        const type = Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_3__["getCardType"])(url);
        const userId = passport.getUserId();
        let createArgs;
        if (type === 'Youtube') {
            const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_1__["default"].getYoutubeVideoData(url);
            createArgs = {
                youtubeCardData: {
                    create: {
                        ...youtubeVideoData,
                    },
                },
            };
        }
        else {
            throw new Error('invalid card type');
        }
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
        const card = await prisma.mutation.createCard(finalArgs, _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_2__["default"]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NyZWF0ZVVzZXJDYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvY2FyZC9jYXJkUmVzb2x2ZXJzL2NhcmRNdXRhdGlvbnMvaW5pdGlhdGVVc2VyQ2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNkM7QUFDUDtBQUNVO0FBQytCO0FBRWhFLG9FQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtJQUNsRSxJQUFJO1FBQ0YsTUFBTSxFQUNKLFFBQVEsRUFDUixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxHQUFHLEdBQ0osR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRWQsTUFBTSxJQUFJLEdBQUcsd0VBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU5QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEMsSUFBSSxVQUFrQixDQUFDO1FBRXZCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUN0QixNQUFNLGdCQUFnQixHQUFHLE1BQU0sdURBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoRSxVQUFVLEdBQUc7Z0JBQ1gsZUFBZSxFQUFFO29CQUNmLE1BQU0sRUFBRTt3QkFDTixHQUFHLGdCQUFnQjtxQkFDcEI7aUJBQ0Y7YUFDRixDQUFDO1NBQ0g7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUN0QztRQUVELE1BQU0sU0FBUyxHQUFHO1lBQ2hCLEdBQUcsSUFBSTtZQUNQLElB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QUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUMiLCJmaWxlIjoibWFpbi5hNTFlOTAzMmE5NzY2ZTQzMzVlNi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeW91dHViZSBmcm9tICd5b3V0dWJlL3lvdXR1YmUnO1xuaW1wb3J0IGNhcmRJbmZvIGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkSW5mbyc7XG5pbXBvcnQgeyBnZXRDYXJkVHlwZSwgZ2V0VXNlckNhcmRDcmVhdGVBcmdzIH0gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSwgcHVic3ViIH0pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7XG4gICAgICBjYXRlZ29yeSxcbiAgICAgIGlzRmF2b3JpdGUsXG4gICAgICBpc1RvRG8sXG4gICAgICB0aXRsZSxcbiAgICAgIHVybCxcbiAgICB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgdHlwZSA9IGdldENhcmRUeXBlKHVybCk7XG5cbiAgICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgICBsZXQgY3JlYXRlQXJnczogb2JqZWN0O1xuXG4gICAgaWYgKHR5cGUgPT09ICdZb3V0dWJlJykge1xuICAgICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh1cmwpO1xuICAgICAgY3JlYXRlQXJncyA9IHtcbiAgICAgICAgeW91dHViZUNhcmREYXRhOiB7XG4gICAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgICAuLi55b3V0dWJlVmlkZW9EYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY2FyZCB0eXBlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZmluYWxBcmdzID0ge1xuICAgICAgLi4uYXJncyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY2FyZERhdGE6IHtcbiAgICAgICAgICBjcmVhdGU6IHsgLi4uY3JlYXRlQXJncyB9LFxuICAgICAgICB9LFxuICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgaXNGYXZvcml0ZSxcbiAgICAgICAgaXNUb0RvLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgdHlwZSxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGNvbm5lY3Q6IHtcbiAgICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IGNhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24uY3JlYXRlQ2FyZChmaW5hbEFyZ3MsIGNhcmRJbmZvKTtcbiAgICBwdWJzdWIucHVibGlzaCgndXNlckNhcmQnLCB7IHVzZXJDYXJkOiBjYXJkIH0pO1xuICAgIHJldHVybiBjYXJkO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeyB0eXBlIH0gZnJvbSAnc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRFbnVtcyc7XG5pbXBvcnQgeyBnZXRDYXJkVHlwZSwgZ2V0SW5pdGlhbEltYWdlRGF0YSwgZ2V0SW5pdGlhbFlvdXR1YmVEYXRhIH0gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVybCB9ID0gYXJncy5kYXRhO1xuICAgIGNvbnN0IGNhcmRUeXBlID0gZ2V0Q2FyZFR5cGUoYXJncy5kYXRhLnVybCk7XG5cbiAgICBpZiAoY2FyZFR5cGUgPT09IHR5cGUuaW1hZ2UpIHtcbiAgICAgIHJldHVybiBnZXRJbml0aWFsSW1hZ2VEYXRhKGFyZ3MuZGF0YS51cmwpO1xuICAgIH1cblxuICAgIGlmIChjYXJkVHlwZSA9PT0gdHlwZS55b3V0dWJlKSB7XG4gICAgICBjb25zdCBpbml0aWFsWW91dHViZURhdGEgPSBhd2FpdCBnZXRJbml0aWFsWW91dHViZURhdGEodXJsKTtcbiAgICAgIHJldHVybiBpbml0aWFsWW91dHViZURhdGE7XG4gICAgfVxuXG4gICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkZXRlY3QgYSB2YWxpZCBjYXJkIHR5cGUnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgfVxufTtcbiIsImltcG9ydCB5b3V0dWJlIGZyb20gJ3lvdXR1YmUveW91dHViZSc7XG5pbXBvcnQgeyBjYXRlZ29yeSwgdHlwZSB9IGZyb20gJ3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkRW51bXMnO1xuaW1wb3J0IHtcbiAgQ2FyZENyZWF0ZUFyZ3MsXG4gIENhcmREYXRhLFxuICBDYXJkVHlwZSxcbiAgSW1hZ2VEYXRhLFxuICBJbml0aWFsQ2FyZERhdGFTY2hlbWEsXG59IGZyb20gJy4vY2FyZFR5cGVzJztcblxuLy8gLS0tLS0gQ0FSRCBUWVBFIC0tLS0tIC8vXG5cbmV4cG9ydCBjb25zdCBnZXRDYXJkVHlwZSA9ICh1cmw6IHN0cmluZyk6IENhcmRUeXBlID0+IHtcbiAgaWYgKFxuICAgIHVybC5pbmNsdWRlcygneW91dHViZS5jb20nKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHUuYmUnKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHViZS1ub2Nvb2tpZS5jb20nKVxuICApIHtcbiAgICByZXR1cm4gdHlwZS55b3V0dWJlO1xuICB9XG5cbiAgaWYgKHVybC5lbmRzV2l0aCgnLmpwZWcnKSB8fCB1cmwuZW5kc1dpdGgoJy5qcGcnKSB8fCB1cmwuZW5kc1dpdGgoJy5wbmcnKSkge1xuICAgIHJldHVybiB0eXBlLmltYWdlO1xuICB9XG5cbiAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkZXRlY3QgYSB2YWxpZCBjYXJkIHR5cGUnKTtcbn07XG5cbi8vIC0tLS0tIElNQUdFIERBVEEgLS0tLSAvL1xuXG5jb25zdCBnZXRJbWFnZURhdGEgPSAodXJsOiBzdHJpbmcpOiBJbWFnZURhdGEgPT4gKHtcbiAgaW1hZ2VVcmw6IHVybCxcbn0pO1xuXG4vLyAtLS0tLSBJTklUSUFMIERBVEEgLS0tLS0gLy9cblxuZXhwb3J0IGNvbnN0IGdldEluaXRpYWxJbWFnZURhdGEgPSAodXJsOiBzdHJpbmcpOiBJbml0aWFsQ2FyZERhdGFTY2hlbWEgPT4ge1xuICBjb25zdCBpbWFnZURhdGEgPSBnZXRJbWFnZURhdGEodXJsKTtcblxuICByZXR1cm4ge1xuICAgIGNhcmREYXRhOiB7XG4gICAgICBpbWFnZUNhcmREYXRhOiB7IC4uLmltYWdlRGF0YSB9LFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IGNhdGVnb3J5LmltYWdlLFxuICAgIHVybCxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRJbml0aWFsWW91dHViZURhdGEgPSBhc3luYyAodXJsOiBzdHJpbmcpOiBQcm9taXNlPEluaXRpYWxDYXJkRGF0YVNjaGVtYT4gPT4ge1xuICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKHVybCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjYXJkRGF0YToge1xuICAgICAgeW91dHViZUNhcmREYXRhOiB5b3V0dWJlVmlkZW9EYXRhLFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IGNhdGVnb3J5LnZpZGVvLFxuICAgIHRpdGxlOiB5b3V0dWJlVmlkZW9EYXRhLnZpZGVvVGl0bGUsXG4gICAgdXJsLFxuICB9O1xufTtcblxuLy8gLS0tLS0gQ1JFQVRFIENBUkQgLS0tLS0gLy9cblxuZXhwb3J0IGNvbnN0IGdldFVzZXJDYXJkQ3JlYXRlQXJncyA9IGFzeW5jICh1cmw6IHN0cmluZyk6IFByb21pc2U8Q2FyZENyZWF0ZUFyZ3M+ID0+IHtcbiAgY29uc3QgY2FyZFR5cGUgPSBnZXRDYXJkVHlwZSh1cmwpO1xuXG4gIGlmIChjYXJkVHlwZSA9PT0gdHlwZS5pbWFnZSkge1xuICAgIGNvbnN0IGltYWdlRGF0YSA9IGdldEltYWdlRGF0YSh1cmwpO1xuICAgIHJldHVybiB7XG4gICAgICBpbWFnZUNhcmREYXRhOiB7XG4gICAgICAgIGNyZWF0ZTogeyAuLi5pbWFnZURhdGEgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChjYXJkVHlwZSA9PT0gdHlwZS55b3V0dWJlKSB7XG4gICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh1cmwpO1xuICAgIHJldHVybiB7XG4gICAgICB5b3V0dWJlQ2FyZERhdGE6IHtcbiAgICAgICAgY3JlYXRlOiB7IC4uLnlvdXR1YmVWaWRlb0RhdGEgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHRocm93IEVycm9yKCdDYW5ub3QgZGV0ZWN0IGEgdmFsaWQgY2FyZCB0eXBlJyk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==