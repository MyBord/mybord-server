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
    category: schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["category"].image,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2luaXRpYXRlVXNlckNhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBNkM7QUFDa0I7QUFFaEQsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDcEMsSUFBSTtRQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sK0VBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRSxPQUFPLGVBQWUsQ0FBQztLQUN4QjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsTUFBTSxJQUFJLDBEQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztLQUNoRTtBQUNILENBQUMsRUFBQzs7Ozs7Ozs7Ozs7OztBQ1ZGO0FBQUE7QUFBQTtBQUFBO0FBQXNDO0FBQzJCO0FBR2pFLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBVyxFQUFZLEVBQUU7SUFDNUMsSUFDRSxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztXQUN4QixHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztXQUN4QixHQUFHLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQ3ZDO1FBQ0EsT0FBTyxvRUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNyQjtJQUVELElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDekUsT0FBTyxvRUFBSSxDQUFDLEtBQUssQ0FBQztLQUNuQjtJQUVELE1BQU0sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDO0FBRUYsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEdBQVcsRUFBeUIsRUFBRSxDQUFDLENBQUM7SUFDbkUsUUFBUSxFQUFFO1FBQ1IsYUFBYSxFQUFFO1lBQ2IsUUFBUSxFQUFFLEdBQUc7U0FDZDtLQUNGO0lBQ0QsUUFBUSxFQUFFLHdFQUFRLENBQUMsS0FBSztJQUN4QixHQUFHO0NBQ0osQ0FBQyxDQUFDO0FBRUgsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLEVBQUUsR0FBVyxFQUFrQyxFQUFFO0lBQ2xGLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSx1REFBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWhFLE9BQU87UUFDTCxRQUFRLEVBQUU7WUFDUixlQUFlLEVBQUUsZ0JBQWdCO1NBQ2xDO1FBQ0QsUUFBUSxFQUFFLHdFQUFRLENBQUMsS0FBSztRQUN4QixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtRQUNsQyxHQUFHO0tBQ0osQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVLLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxFQUFFLEdBQVcsRUFBa0MsRUFBRTtJQUN0RixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbEMsSUFBSSxRQUFRLEtBQUssb0VBQUksQ0FBQyxLQUFLLEVBQUU7UUFDM0IsT0FBTyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqQztJQUVELElBQUksUUFBUSxLQUFLLG9FQUFJLENBQUMsT0FBTyxFQUFFO1FBQzdCLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1RCxPQUFPLGtCQUFrQixDQUFDO0tBQzNCO0lBRUQsTUFBTSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUMiLCJmaWxlIjoibWFpbi5iOGRhODU2YmJkYTc1YzQzYzEwYS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeyBnZXRJbml0aWFsQ2FyZERhdGEgfSBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZFV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGluaXRpYWxDYXJkRGF0YSA9IGF3YWl0IGdldEluaXRpYWxDYXJkRGF0YShhcmdzLmRhdGEudXJsKTtcbiAgICByZXR1cm4gaW5pdGlhbENhcmREYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IHlvdXR1YmUgZnJvbSAneW91dHViZS95b3V0dWJlJztcbmltcG9ydCB7IGNhdGVnb3J5LCB0eXBlIH0gZnJvbSAnc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRFbnVtcyc7XG5pbXBvcnQgeyBDYXJkVHlwZSwgSW5pdGlhbENhcmREYXRhU2NoZW1hIH0gZnJvbSAnLi9jYXJkVHlwZXMnO1xuXG5jb25zdCBnZXRDYXJkVHlwZSA9ICh1cmw6IHN0cmluZyk6IENhcmRUeXBlID0+IHtcbiAgaWYgKFxuICAgIHVybC5pbmNsdWRlcygneW91dHViZS5jb20nKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHUuYmUnKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHViZS1ub2Nvb2tpZS5jb20nKVxuICApIHtcbiAgICByZXR1cm4gdHlwZS55b3V0dWJlO1xuICB9XG5cbiAgaWYgKHVybC5lbmRzV2l0aCgnLmpwZWcnKSB8fCB1cmwuZW5kc1dpdGgoJy5qcGcnKSB8fCB1cmwuZW5kc1dpdGgoJy5wbmcnKSkge1xuICAgIHJldHVybiB0eXBlLmltYWdlO1xuICB9XG5cbiAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkZXRlY3QgYSB2YWxpZCBjYXJkIHR5cGUnKTtcbn07XG5cbmNvbnN0IGdldEluaXRpYWxJbWFnZURhdGEgPSAodXJsOiBzdHJpbmcpOiBJbml0aWFsQ2FyZERhdGFTY2hlbWEgPT4gKHtcbiAgY2FyZERhdGE6IHtcbiAgICBpbWFnZUNhcmREYXRhOiB7XG4gICAgICBpbWFnZVVybDogdXJsLFxuICAgIH0sXG4gIH0sXG4gIGNhdGVnb3J5OiBjYXRlZ29yeS5pbWFnZSxcbiAgdXJsLFxufSk7XG5cbmNvbnN0IGdldEluaXRpYWxZb3V0dWJlRGF0YSA9IGFzeW5jICh1cmw6IHN0cmluZyk6IFByb21pc2U8SW5pdGlhbENhcmREYXRhU2NoZW1hPiA9PiB7XG4gIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodXJsKTtcblxuICByZXR1cm4ge1xuICAgIGNhcmREYXRhOiB7XG4gICAgICB5b3V0dWJlQ2FyZERhdGE6IHlvdXR1YmVWaWRlb0RhdGEsXG4gICAgfSxcbiAgICBjYXRlZ29yeTogY2F0ZWdvcnkudmlkZW8sXG4gICAgdGl0bGU6IHlvdXR1YmVWaWRlb0RhdGEudmlkZW9UaXRsZSxcbiAgICB1cmwsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0SW5pdGlhbENhcmREYXRhID0gYXN5bmMgKHVybDogc3RyaW5nKTogUHJvbWlzZTxJbml0aWFsQ2FyZERhdGFTY2hlbWE+ID0+IHtcbiAgY29uc3QgY2FyZFR5cGUgPSBnZXRDYXJkVHlwZSh1cmwpO1xuXG4gIGlmIChjYXJkVHlwZSA9PT0gdHlwZS5pbWFnZSkge1xuICAgIHJldHVybiBnZXRJbml0aWFsSW1hZ2VEYXRhKHVybCk7XG4gIH1cblxuICBpZiAoY2FyZFR5cGUgPT09IHR5cGUueW91dHViZSkge1xuICAgIGNvbnN0IGluaXRpYWxZb3V0dWJlRGF0YSA9IGF3YWl0IGdldEluaXRpYWxZb3V0dWJlRGF0YSh1cmwpO1xuICAgIHJldHVybiBpbml0aWFsWW91dHViZURhdGE7XG4gIH1cblxuICB0aHJvdyBFcnJvcignQ2Fubm90IGRldGVjdCBhIHZhbGlkIGNhcmQgdHlwZScpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=