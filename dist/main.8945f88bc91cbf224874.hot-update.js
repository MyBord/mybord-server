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
/* harmony import */ var youtube_youtube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! youtube/youtube */ "./src/thirdParty/youtube/youtube.ts");
/* harmony import */ var _cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cardUtils/cardEnums */ "./src/schema/card/cardUtils/cardEnums.ts");
/* harmony import */ var _cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../cardUtils/cardUtils */ "./src/schema/card/cardUtils/cardUtils.ts");




/* harmony default export */ __webpack_exports__["default"] = (async (parent, args) => {
    try {
        const videoId = Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_3__["getYoutubeVideoId"])(args.data.url);
        const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_1__["default"].getYoutubeVideoData(videoId);
        return {
            category: _cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["category"].video,
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
    video: 'Video',
};
const type = {
    youtube: 'Youtube',
};


/***/ }),

/***/ "./src/schema/card/cardUtils/cardUtils.ts":
/*!************************************************!*\
  !*** ./src/schema/card/cardUtils/cardUtils.ts ***!
  \************************************************/
/*! exports provided: getCardType, getYoutubeVideoId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCardType", function() { return getCardType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getYoutubeVideoId", function() { return getYoutubeVideoId; });
const getCardType = (url) => {
    if (url.includes('youtube.com')
        || url.includes('youtu.be')
        || url.includes('youtube-nocookie.com')) {
        return 'Youtube';
    }
    throw Error('Cannot detect a valid card type');
};
// source: https://stackoverflow.com/a/27728417/7460467
const getYoutubeVideoId = (url) => {
    if (url.includes('youtube.com')
        || url.includes('youtu.be')
        || url.includes('youtube-nocookie.com')) {
        const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[1]) {
            return match[1];
        }
        throw Error('Your youtube url is not valid');
    }
    throw Error('You must provide a youtube url');
};


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2luaXRpYXRlVXNlckNhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkRW51bXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FBQ1A7QUFDZTtBQUNTO0FBRS9DLG9FQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3BDLElBQUk7UUFDRixNQUFNLE9BQU8sR0FBRyw4RUFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSx1REFBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXBFLE9BQU87WUFDTCxRQUFRLEVBQUUsNkRBQVEsQ0FBQyxLQUFLO1lBQ3hCLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO1lBQ2xDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDbEIsZUFBZSxFQUFFLGdCQUFnQjtTQUNsQyxDQUFDO0tBQ0g7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE1BQU0sSUFBSSwwREFBVyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDaEU7QUFDSCxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNqQkY7QUFBQTtBQUFBO0FBQU8sTUFBTSxRQUFRLEdBQWlDO0lBQ3BELEtBQUssRUFBRSxPQUFPO0NBQ2YsQ0FBQztBQUVLLE1BQU0sSUFBSSxHQUE2QjtJQUM1QyxPQUFPLEVBQUUsU0FBUztDQUNuQixDQUFDOzs7Ozs7Ozs7Ozs7O0FDTEY7QUFBQTtBQUFBO0FBQU8sTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFTLEVBQVksRUFBRTtJQUNqRCxJQUNFLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1dBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1dBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFDdkM7UUFDQSxPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUVELE1BQU0sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDO0FBRUYsdURBQXVEO0FBQ2hELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxHQUFHLEVBQVUsRUFBRTtJQUMvQyxJQUNFLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1dBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1dBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFDdkM7UUFDQSxNQUFNLE1BQU0sR0FBRyxrR0FBa0csQ0FBQztRQUNsSCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNyQixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQjtRQUNELE1BQU0sS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7S0FDOUM7SUFDRCxNQUFNLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQ2hELENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLjg5NDVmODhiYzkxY2JmMjI0ODc0LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCB5b3V0dWJlIGZyb20gJ3lvdXR1YmUveW91dHViZSc7XG5pbXBvcnQgeyBjYXRlZ29yeSB9IGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkRW51bXMnO1xuaW1wb3J0IHsgZ2V0WW91dHViZVZpZGVvSWQgfSBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZFV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHZpZGVvSWQgPSBnZXRZb3V0dWJlVmlkZW9JZChhcmdzLmRhdGEudXJsKTtcbiAgICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKHZpZGVvSWQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeS52aWRlbyxcbiAgICAgIHRpdGxlOiB5b3V0dWJlVmlkZW9EYXRhLnZpZGVvVGl0bGUsXG4gICAgICB1cmw6IGFyZ3MuZGF0YS51cmwsXG4gICAgICB5b3V0dWJlQ2FyZERhdGE6IHlvdXR1YmVWaWRlb0RhdGEsXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgfVxufTtcbiIsImltcG9ydCB7IENhcmRDYXRlZ29yeSwgQ2FyZFR5cGUgfSBmcm9tICcuL2NhcmRUeXBlcyc7XG5cbmV4cG9ydCBjb25zdCBjYXRlZ29yeTogUmVjb3JkPHN0cmluZywgQ2FyZENhdGVnb3J5PiA9IHtcbiAgdmlkZW86ICdWaWRlbycsXG59O1xuXG5leHBvcnQgY29uc3QgdHlwZTogUmVjb3JkPHN0cmluZywgQ2FyZFR5cGU+ID0ge1xuICB5b3V0dWJlOiAnWW91dHViZScsXG59O1xuIiwiaW1wb3J0IHsgQ2FyZFR5cGUgfSBmcm9tICcuL2NhcmRUeXBlcyc7XG5pbXBvcnQgeyB0eXBlIH0gZnJvbSAnLi9jYXJkRW51bXMnO1xuXG5leHBvcnQgY29uc3QgZ2V0Q2FyZFR5cGUgPSAodXJsOiB0eXBlKTogQ2FyZFR5cGUgPT4ge1xuICBpZiAoXG4gICAgdXJsLmluY2x1ZGVzKCd5b3V0dWJlLmNvbScpXG4gICAgfHwgdXJsLmluY2x1ZGVzKCd5b3V0dS5iZScpXG4gICAgfHwgdXJsLmluY2x1ZGVzKCd5b3V0dWJlLW5vY29va2llLmNvbScpXG4gICkge1xuICAgIHJldHVybiAnWW91dHViZSc7XG4gIH1cblxuICB0aHJvdyBFcnJvcignQ2Fubm90IGRldGVjdCBhIHZhbGlkIGNhcmQgdHlwZScpO1xufTtcblxuLy8gc291cmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjc3Mjg0MTcvNzQ2MDQ2N1xuZXhwb3J0IGNvbnN0IGdldFlvdXR1YmVWaWRlb0lkID0gKHVybCk6IHN0cmluZyA9PiB7XG4gIGlmIChcbiAgICB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUuY29tJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1LmJlJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUtbm9jb29raWUuY29tJylcbiAgKSB7XG4gICAgY29uc3QgcmVnRXhwID0gL14uKig/Oig/OnlvdXR1XFwuYmVcXC98dlxcL3x2aVxcL3x1XFwvXFx3XFwvfGVtYmVkXFwvKXwoPzooPzp3YXRjaCk/XFw/dig/OmkpPz18XFwmdig/OmkpPz0pKShbXiNcXCZcXD9dKikuKi87XG4gICAgY29uc3QgbWF0Y2ggPSB1cmwubWF0Y2gocmVnRXhwKTtcbiAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMV0pIHtcbiAgICAgIHJldHVybiBtYXRjaFsxXTtcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoJ1lvdXIgeW91dHViZSB1cmwgaXMgbm90IHZhbGlkJyk7XG4gIH1cbiAgdGhyb3cgRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgYSB5b3V0dWJlIHVybCcpO1xufTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==