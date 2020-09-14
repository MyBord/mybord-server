exports.id = "main";
exports.modules = {

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
/*! exports provided: getCardType, getInitialImageData, getInitialYoutubeData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCardType", function() { return getCardType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInitialImageData", function() { return getInitialImageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInitialYoutubeData", function() { return getInitialYoutubeData; });
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
    imageCardData: {
        imageUrl: url,
    },
});
// ----- INITIAL DATA ----- //
const getInitialImageData = (url) => {
    const imageData = getImageData(url);
    return {
        cardData: { ...imageData },
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


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2luaXRpYXRlVXNlckNhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QztBQUNVO0FBQzZDO0FBRXJGLG9FQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3BDLElBQUk7UUFDRixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMxQixNQUFNLFFBQVEsR0FBRyx3RUFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFNUMsSUFBSSxRQUFRLEtBQUssb0VBQUksQ0FBQyxLQUFLLEVBQUU7WUFDM0IsT0FBTyxnRkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNDO1FBRUQsSUFBSSxRQUFRLEtBQUssb0VBQUksQ0FBQyxPQUFPLEVBQUU7WUFDN0IsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLGtGQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVELE9BQU8sa0JBQWtCLENBQUM7U0FDM0I7UUFFRCxNQUFNLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0tBQ2hEO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxNQUFNLElBQUksMERBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ2hFO0FBQ0gsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDdEJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzQztBQUMyQjtBQUdqRSwyQkFBMkI7QUFFcEIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFXLEVBQVksRUFBRTtJQUNuRCxJQUNFLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1dBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1dBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFDdkM7UUFDQSxPQUFPLG9FQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3JCO0lBRUQsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN6RSxPQUFPLG9FQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25CO0lBRUQsTUFBTSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUM7QUFFRiwyQkFBMkI7QUFFM0IsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFXLEVBQVksRUFBRSxDQUFDLENBQUM7SUFDL0MsYUFBYSxFQUFFO1FBQ2IsUUFBUSxFQUFFLEdBQUc7S0FDZDtDQUNGLENBQUMsQ0FBQztBQUVILDhCQUE4QjtBQUV2QixNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBVyxFQUF5QixFQUFFO0lBQ3hFLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVwQyxPQUFPO1FBQ0wsUUFBUSxFQUFFLEVBQUUsR0FBRyxTQUFTLEVBQUU7UUFDMUIsUUFBUSxFQUFFLHdFQUFRLENBQUMsS0FBSztRQUN4QixHQUFHO0tBQ0osQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVLLE1BQU0scUJBQXFCLEdBQUcsS0FBSyxFQUFFLEdBQVcsRUFBa0MsRUFBRTtJQUN6RixNQUFNLGdCQUFnQixHQUFHLE1BQU0sdURBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVoRSxPQUFPO1FBQ0wsUUFBUSxFQUFFO1lBQ1IsZUFBZSxFQUFFLGdCQUFnQjtTQUNsQztRQUNELFFBQVEsRUFBRSx3RUFBUSxDQUFDLEtBQUs7UUFDeEIsS0FBSyxFQUFFLGdCQUFnQixDQUFDLFVBQVU7UUFDbEMsR0FBRztLQUNKLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRiw2QkFBNkIiLCJmaWxlIjoibWFpbi5lY2YwNzViNTg4ZDU1OTNhNjViMy5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeyB0eXBlIH0gZnJvbSAnc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRFbnVtcyc7XG5pbXBvcnQgeyBnZXRDYXJkVHlwZSwgZ2V0SW5pdGlhbEltYWdlRGF0YSwgZ2V0SW5pdGlhbFlvdXR1YmVEYXRhIH0gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVybCB9ID0gYXJncy5kYXRhO1xuICAgIGNvbnN0IGNhcmRUeXBlID0gZ2V0Q2FyZFR5cGUoYXJncy5kYXRhLnVybCk7XG5cbiAgICBpZiAoY2FyZFR5cGUgPT09IHR5cGUuaW1hZ2UpIHtcbiAgICAgIHJldHVybiBnZXRJbml0aWFsSW1hZ2VEYXRhKGFyZ3MuZGF0YS51cmwpO1xuICAgIH1cblxuICAgIGlmIChjYXJkVHlwZSA9PT0gdHlwZS55b3V0dWJlKSB7XG4gICAgICBjb25zdCBpbml0aWFsWW91dHViZURhdGEgPSBhd2FpdCBnZXRJbml0aWFsWW91dHViZURhdGEodXJsKTtcbiAgICAgIHJldHVybiBpbml0aWFsWW91dHViZURhdGE7XG4gICAgfVxuXG4gICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkZXRlY3QgYSB2YWxpZCBjYXJkIHR5cGUnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgfVxufTtcbiIsImltcG9ydCB5b3V0dWJlIGZyb20gJ3lvdXR1YmUveW91dHViZSc7XG5pbXBvcnQgeyBjYXRlZ29yeSwgdHlwZSB9IGZyb20gJ3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkRW51bXMnO1xuaW1wb3J0IHsgQ2FyZERhdGEsIENhcmRUeXBlLCBJbml0aWFsQ2FyZERhdGFTY2hlbWEgfSBmcm9tICcuL2NhcmRUeXBlcyc7XG5cbi8vIC0tLS0tIENBUkQgVFlQRSAtLS0tLSAvL1xuXG5leHBvcnQgY29uc3QgZ2V0Q2FyZFR5cGUgPSAodXJsOiBzdHJpbmcpOiBDYXJkVHlwZSA9PiB7XG4gIGlmIChcbiAgICB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUuY29tJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1LmJlJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUtbm9jb29raWUuY29tJylcbiAgKSB7XG4gICAgcmV0dXJuIHR5cGUueW91dHViZTtcbiAgfVxuXG4gIGlmICh1cmwuZW5kc1dpdGgoJy5qcGVnJykgfHwgdXJsLmVuZHNXaXRoKCcuanBnJykgfHwgdXJsLmVuZHNXaXRoKCcucG5nJykpIHtcbiAgICByZXR1cm4gdHlwZS5pbWFnZTtcbiAgfVxuXG4gIHRocm93IEVycm9yKCdDYW5ub3QgZGV0ZWN0IGEgdmFsaWQgY2FyZCB0eXBlJyk7XG59O1xuXG4vLyAtLS0tLSBJTUFHRSBEQVRBIC0tLS0gLy9cblxuY29uc3QgZ2V0SW1hZ2VEYXRhID0gKHVybDogc3RyaW5nKTogQ2FyZERhdGEgPT4gKHtcbiAgaW1hZ2VDYXJkRGF0YToge1xuICAgIGltYWdlVXJsOiB1cmwsXG4gIH0sXG59KTtcblxuLy8gLS0tLS0gSU5JVElBTCBEQVRBIC0tLS0tIC8vXG5cbmV4cG9ydCBjb25zdCBnZXRJbml0aWFsSW1hZ2VEYXRhID0gKHVybDogc3RyaW5nKTogSW5pdGlhbENhcmREYXRhU2NoZW1hID0+IHtcbiAgY29uc3QgaW1hZ2VEYXRhID0gZ2V0SW1hZ2VEYXRhKHVybCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjYXJkRGF0YTogeyAuLi5pbWFnZURhdGEgfSxcbiAgICBjYXRlZ29yeTogY2F0ZWdvcnkuaW1hZ2UsXG4gICAgdXJsLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEluaXRpYWxZb3V0dWJlRGF0YSA9IGFzeW5jICh1cmw6IHN0cmluZyk6IFByb21pc2U8SW5pdGlhbENhcmREYXRhU2NoZW1hPiA9PiB7XG4gIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodXJsKTtcblxuICByZXR1cm4ge1xuICAgIGNhcmREYXRhOiB7XG4gICAgICB5b3V0dWJlQ2FyZERhdGE6IHlvdXR1YmVWaWRlb0RhdGEsXG4gICAgfSxcbiAgICBjYXRlZ29yeTogY2F0ZWdvcnkudmlkZW8sXG4gICAgdGl0bGU6IHlvdXR1YmVWaWRlb0RhdGEudmlkZW9UaXRsZSxcbiAgICB1cmwsXG4gIH07XG59O1xuXG4vLyAtLS0tLSBDUkVBVEUgQ0FSRCAtLS0tLSAvL1xuIl0sInNvdXJjZVJvb3QiOiIifQ==