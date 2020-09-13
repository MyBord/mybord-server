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
/* harmony import */ var _cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cardUtils/cardUtils */ "./src/schema/card/cardUtils/cardUtils.ts");


/* harmony default export */ __webpack_exports__["default"] = (async (parent, args) => {
    try {
        const initialCardData = await Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_1__["getInitialCardData"])(args.data.url);
        return initialCardData;
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
    if (url.endsWith('.jpeg') || url.endsWith('.jpg') || url.endsWith('.png')) {
        return schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["type"].image;
    }
    throw Error('Cannot detect a valid card type');
};
const getInitialImageData = (url) => ({
    cardData: {
        imageCardData: {
            imageUrl: url,
        },
    },
    // category: category.image,
    category: 'foo',
    url,
});
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
    if (cardType === schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["type"].image) {
        return getInitialImageData(url);
    }
    if (cardType === schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["type"].youtube) {
        const initialYoutubeData = await getInitialYoutubeData(url);
        return initialYoutubeData;
    }
    throw Error('Cannot detect a valid card type');
};


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2luaXRpYXRlVXNlckNhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBNkM7QUFDa0I7QUFFaEQsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDcEMsSUFBSTtRQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sK0VBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRSxPQUFPLGVBQWUsQ0FBQztLQUN4QjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsTUFBTSxJQUFJLDBEQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztLQUNoRTtBQUNILENBQUMsRUFBQzs7Ozs7Ozs7Ozs7OztBQ1ZGO0FBQUE7QUFBQTtBQUFBO0FBQXNDO0FBQzJCO0FBR2pFLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBVyxFQUFZLEVBQUU7SUFDNUMsSUFDRSxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztXQUN4QixHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztXQUN4QixHQUFHLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQ3ZDO1FBQ0EsT0FBTyxvRUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNyQjtJQUVELElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDekUsT0FBTyxvRUFBSSxDQUFDLEtBQUssQ0FBQztLQUNuQjtJQUVELE1BQU0sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDO0FBRUYsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEdBQVcsRUFBeUIsRUFBRSxDQUFDLENBQUM7SUFDbkUsUUFBUSxFQUFFO1FBQ1IsYUFBYSxFQUFFO1lBQ2IsUUFBUSxFQUFFLEdBQUc7U0FDZDtLQUNGO0lBQ0QsNEJBQTRCO0lBQzVCLFFBQVEsRUFBRSxLQUFLO0lBQ2YsR0FBRztDQUNKLENBQUMsQ0FBQztBQUVILE1BQU0scUJBQXFCLEdBQUcsS0FBSyxFQUFFLEdBQVcsRUFBa0MsRUFBRTtJQUNsRixNQUFNLGdCQUFnQixHQUFHLE1BQU0sdURBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVoRSxPQUFPO1FBQ0wsUUFBUSxFQUFFO1lBQ1IsZUFBZSxFQUFFLGdCQUFnQjtTQUNsQztRQUNELFFBQVEsRUFBRSx3RUFBUSxDQUFDLEtBQUs7UUFDeEIsS0FBSyxFQUFFLGdCQUFnQixDQUFDLFVBQVU7UUFDbEMsR0FBRztLQUNKLENBQUM7QUFDSixDQUFDLENBQUM7QUFFSyxNQUFNLGtCQUFrQixHQUFHLEtBQUssRUFBRSxHQUFXLEVBQWtDLEVBQUU7SUFDdEYsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxDLElBQUksUUFBUSxLQUFLLG9FQUFJLENBQUMsS0FBSyxFQUFFO1FBQzNCLE9BQU8sbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakM7SUFFRCxJQUFJLFFBQVEsS0FBSyxvRUFBSSxDQUFDLE9BQU8sRUFBRTtRQUM3QixNQUFNLGtCQUFrQixHQUFHLE1BQU0scUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUQsT0FBTyxrQkFBa0IsQ0FBQztLQUMzQjtJQUVELE1BQU0sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uNGVkOTk4ODA5NmVlY2IzMjQxYTIuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHsgZ2V0SW5pdGlhbENhcmREYXRhIH0gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBpbml0aWFsQ2FyZERhdGEgPSBhd2FpdCBnZXRJbml0aWFsQ2FyZERhdGEoYXJncy5kYXRhLnVybCk7XG4gICAgcmV0dXJuIGluaXRpYWxDYXJkRGF0YTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgfVxufTtcbiIsImltcG9ydCB5b3V0dWJlIGZyb20gJ3lvdXR1YmUveW91dHViZSc7XG5pbXBvcnQgeyBjYXRlZ29yeSwgdHlwZSB9IGZyb20gJ3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkRW51bXMnO1xuaW1wb3J0IHsgQ2FyZFR5cGUsIEluaXRpYWxDYXJkRGF0YVNjaGVtYSB9IGZyb20gJy4vY2FyZFR5cGVzJztcblxuY29uc3QgZ2V0Q2FyZFR5cGUgPSAodXJsOiBzdHJpbmcpOiBDYXJkVHlwZSA9PiB7XG4gIGlmIChcbiAgICB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUuY29tJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1LmJlJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUtbm9jb29raWUuY29tJylcbiAgKSB7XG4gICAgcmV0dXJuIHR5cGUueW91dHViZTtcbiAgfVxuXG4gIGlmICh1cmwuZW5kc1dpdGgoJy5qcGVnJykgfHwgdXJsLmVuZHNXaXRoKCcuanBnJykgfHwgdXJsLmVuZHNXaXRoKCcucG5nJykpIHtcbiAgICByZXR1cm4gdHlwZS5pbWFnZTtcbiAgfVxuXG4gIHRocm93IEVycm9yKCdDYW5ub3QgZGV0ZWN0IGEgdmFsaWQgY2FyZCB0eXBlJyk7XG59O1xuXG5jb25zdCBnZXRJbml0aWFsSW1hZ2VEYXRhID0gKHVybDogc3RyaW5nKTogSW5pdGlhbENhcmREYXRhU2NoZW1hID0+ICh7XG4gIGNhcmREYXRhOiB7XG4gICAgaW1hZ2VDYXJkRGF0YToge1xuICAgICAgaW1hZ2VVcmw6IHVybCxcbiAgICB9LFxuICB9LFxuICAvLyBjYXRlZ29yeTogY2F0ZWdvcnkuaW1hZ2UsXG4gIGNhdGVnb3J5OiAnZm9vJyxcbiAgdXJsLFxufSk7XG5cbmNvbnN0IGdldEluaXRpYWxZb3V0dWJlRGF0YSA9IGFzeW5jICh1cmw6IHN0cmluZyk6IFByb21pc2U8SW5pdGlhbENhcmREYXRhU2NoZW1hPiA9PiB7XG4gIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodXJsKTtcblxuICByZXR1cm4ge1xuICAgIGNhcmREYXRhOiB7XG4gICAgICB5b3V0dWJlQ2FyZERhdGE6IHlvdXR1YmVWaWRlb0RhdGEsXG4gICAgfSxcbiAgICBjYXRlZ29yeTogY2F0ZWdvcnkudmlkZW8sXG4gICAgdGl0bGU6IHlvdXR1YmVWaWRlb0RhdGEudmlkZW9UaXRsZSxcbiAgICB1cmwsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0SW5pdGlhbENhcmREYXRhID0gYXN5bmMgKHVybDogc3RyaW5nKTogUHJvbWlzZTxJbml0aWFsQ2FyZERhdGFTY2hlbWE+ID0+IHtcbiAgY29uc3QgY2FyZFR5cGUgPSBnZXRDYXJkVHlwZSh1cmwpO1xuXG4gIGlmIChjYXJkVHlwZSA9PT0gdHlwZS5pbWFnZSkge1xuICAgIHJldHVybiBnZXRJbml0aWFsSW1hZ2VEYXRhKHVybCk7XG4gIH1cblxuICBpZiAoY2FyZFR5cGUgPT09IHR5cGUueW91dHViZSkge1xuICAgIGNvbnN0IGluaXRpYWxZb3V0dWJlRGF0YSA9IGF3YWl0IGdldEluaXRpYWxZb3V0dWJlRGF0YSh1cmwpO1xuICAgIHJldHVybiBpbml0aWFsWW91dHViZURhdGE7XG4gIH1cblxuICB0aHJvdyBFcnJvcignQ2Fubm90IGRldGVjdCBhIHZhbGlkIGNhcmQgdHlwZScpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=