exports.id = "main";
exports.modules = {

/***/ "./src/schema/card/cardUtils/cardEnums.ts":
/*!************************************************!*\
  !*** ./src/schema/card/cardUtils/cardEnums.ts ***!
  \************************************************/
/*! exports provided: category, type */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "category", function() { return category; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return type; });
const category = {
    image: 'Image',
    video: 'Video',
};
const type = {
    image: 'Image',
    youtube: 'Youtube',
};


/***/ }),

/***/ "./src/schema/card/cardUtils/cardUtils.ts":
/*!************************************************!*\
  !*** ./src/schema/card/cardUtils/cardUtils.ts ***!
  \************************************************/
/*! exports provided: getInitialCardData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInitialCardData", function() { return getInitialCardData; });
/* harmony import */ var youtube_youtube__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! youtube/youtube */ "./src/thirdParty/youtube/youtube.ts");
/* harmony import */ var schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! schema/card/cardUtils/cardEnums */ "./src/schema/card/cardUtils/cardEnums.ts");


const getCardType = (url) => {
    if (url.includes('youtube.com')
        || url.includes('youtu.be')
        || url.includes('youtube-nocookie.com')) {
        return schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["type"].youtube;
    }
    if (url.endsWith('.jpg') || url.endsWith('.png')) {
        return schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["type"].image;
    }
    throw Error('Cannot detect a valid card type');
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
const getInitialCardData = async (url) => {
    const cardType = getCardType(url);
    if (cardType === schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["type"].youtube) {
        const initialYoutubeData = await getInitialYoutubeData(url);
        return initialYoutubeData;
    }
    throw Error('Cannot detect a valid card type');
};


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRFbnVtcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBO0FBQUE7QUFBQTtBQUFPLE1BQU0sUUFBUSxHQUFpQztJQUNwRCxLQUFLLEVBQUUsT0FBTztJQUNkLEtBQUssRUFBRSxPQUFPO0NBQ2YsQ0FBQztBQUVLLE1BQU0sSUFBSSxHQUE2QjtJQUM1QyxLQUFLLEVBQUUsT0FBTztJQUNkLE9BQU8sRUFBRSxTQUFTO0NBQ25CLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNWRjtBQUFBO0FBQUE7QUFBQTtBQUFzQztBQUMyQjtBQUdqRSxNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQVcsRUFBWSxFQUFFO0lBQzVDLElBQ0UsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7V0FDeEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7V0FDeEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUN2QztRQUNBLE9BQU8sb0VBQUksQ0FBQyxPQUFPLENBQUM7S0FDckI7SUFFRCxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNoRCxPQUFPLG9FQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25CO0lBRUQsTUFBTSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUM7QUFHRixNQUFNLHFCQUFxQixHQUFHLEtBQUssRUFBRSxHQUFXLEVBQWtDLEVBQUU7SUFDbEYsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLHVEQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFaEUsT0FBTztRQUNMLFFBQVEsRUFBRTtZQUNSLGVBQWUsRUFBRSxnQkFBZ0I7U0FDbEM7UUFDRCxRQUFRLEVBQUUsd0VBQVEsQ0FBQyxLQUFLO1FBQ3hCLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO1FBQ2xDLEdBQUc7S0FDSixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUssTUFBTSxrQkFBa0IsR0FBRyxLQUFLLEVBQUUsR0FBVyxFQUFrQyxFQUFFO0lBQ3RGLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVsQyxJQUFJLFFBQVEsS0FBSyxvRUFBSSxDQUFDLE9BQU8sRUFBRTtRQUM3QixNQUFNLGtCQUFrQixHQUFHLE1BQU0scUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUQsT0FBTyxrQkFBa0IsQ0FBQztLQUMzQjtJQUVELE1BQU0sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uYmQzNDNiNzAzN2U2N2NjNThlYTEuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhcmRDYXRlZ29yeSwgQ2FyZFR5cGUgfSBmcm9tICcuL2NhcmRUeXBlcyc7XG5cbmV4cG9ydCBjb25zdCBjYXRlZ29yeTogUmVjb3JkPHN0cmluZywgQ2FyZENhdGVnb3J5PiA9IHtcbiAgaW1hZ2U6ICdJbWFnZScsXG4gIHZpZGVvOiAnVmlkZW8nLFxufTtcblxuZXhwb3J0IGNvbnN0IHR5cGU6IFJlY29yZDxzdHJpbmcsIENhcmRUeXBlPiA9IHtcbiAgaW1hZ2U6ICdJbWFnZScsXG4gIHlvdXR1YmU6ICdZb3V0dWJlJyxcbn07XG4iLCJpbXBvcnQgeW91dHViZSBmcm9tICd5b3V0dWJlL3lvdXR1YmUnO1xuaW1wb3J0IHsgY2F0ZWdvcnksIHR5cGUgfSBmcm9tICdzY2hlbWEvY2FyZC9jYXJkVXRpbHMvY2FyZEVudW1zJztcbmltcG9ydCB7IENhcmRUeXBlLCBJbml0aWFsQ2FyZERhdGFTY2hlbWEgfSBmcm9tICcuL2NhcmRUeXBlcyc7XG5cbmNvbnN0IGdldENhcmRUeXBlID0gKHVybDogc3RyaW5nKTogQ2FyZFR5cGUgPT4ge1xuICBpZiAoXG4gICAgdXJsLmluY2x1ZGVzKCd5b3V0dWJlLmNvbScpXG4gICAgfHwgdXJsLmluY2x1ZGVzKCd5b3V0dS5iZScpXG4gICAgfHwgdXJsLmluY2x1ZGVzKCd5b3V0dWJlLW5vY29va2llLmNvbScpXG4gICkge1xuICAgIHJldHVybiB0eXBlLnlvdXR1YmU7XG4gIH1cblxuICBpZiAodXJsLmVuZHNXaXRoKCcuanBnJykgfHwgdXJsLmVuZHNXaXRoKCcucG5nJykpIHtcbiAgICByZXR1cm4gdHlwZS5pbWFnZTtcbiAgfVxuXG4gIHRocm93IEVycm9yKCdDYW5ub3QgZGV0ZWN0IGEgdmFsaWQgY2FyZCB0eXBlJyk7XG59O1xuXG5cbmNvbnN0IGdldEluaXRpYWxZb3V0dWJlRGF0YSA9IGFzeW5jICh1cmw6IHN0cmluZyk6IFByb21pc2U8SW5pdGlhbENhcmREYXRhU2NoZW1hPiA9PiB7XG4gIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodXJsKTtcblxuICByZXR1cm4ge1xuICAgIGNhcmREYXRhOiB7XG4gICAgICB5b3V0dWJlQ2FyZERhdGE6IHlvdXR1YmVWaWRlb0RhdGEsXG4gICAgfSxcbiAgICBjYXRlZ29yeTogY2F0ZWdvcnkudmlkZW8sXG4gICAgdGl0bGU6IHlvdXR1YmVWaWRlb0RhdGEudmlkZW9UaXRsZSxcbiAgICB1cmwsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0SW5pdGlhbENhcmREYXRhID0gYXN5bmMgKHVybDogc3RyaW5nKTogUHJvbWlzZTxJbml0aWFsQ2FyZERhdGFTY2hlbWE+ID0+IHtcbiAgY29uc3QgY2FyZFR5cGUgPSBnZXRDYXJkVHlwZSh1cmwpO1xuXG4gIGlmIChjYXJkVHlwZSA9PT0gdHlwZS55b3V0dWJlKSB7XG4gICAgY29uc3QgaW5pdGlhbFlvdXR1YmVEYXRhID0gYXdhaXQgZ2V0SW5pdGlhbFlvdXR1YmVEYXRhKHVybCk7XG4gICAgcmV0dXJuIGluaXRpYWxZb3V0dWJlRGF0YTtcbiAgfVxuXG4gIHRocm93IEVycm9yKCdDYW5ub3QgZGV0ZWN0IGEgdmFsaWQgY2FyZCB0eXBlJyk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==