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
/* harmony import */ var youtube_youtube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! youtube/youtube */ "./src/thirdParty/youtube/youtube.ts");
/* harmony import */ var _cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cardUtils/cardEnums */ "./src/schema/card/cardUtils/cardEnums.ts");



/* harmony default export */ __webpack_exports__["default"] = (async (parent, args) => {
    try {
        const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_1__["default"].getYoutubeVideoData(args.data.url);
        return {
            cardData: {
                youtubeCardData: youtubeVideoData,
            },
            category: _cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["default"].video,
            title: youtubeVideoData.videoTitle,
            url: args.data.url,
        };
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
/*! exports provided: getCardType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCardType", function() { return getCardType; });
const getCardType = (url) => {
    if (url.includes('youtube.com')
        || url.includes('youtu.be')
        || url.includes('youtube-nocookie.com')) {
        return 'Youtube';
    }
    throw Error('Cannot detect a valid card type');
};


/***/ }),

/***/ "./src/thirdParty/youtube/youtube.ts":
/*!*******************************************!*\
  !*** ./src/thirdParty/youtube/youtube.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! googleapis */ "googleapis");
/* harmony import */ var googleapis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(googleapis__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _youtubeUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./youtubeUtils */ "./src/thirdParty/youtube/youtubeUtils.ts");


// initializes the Youtube Data API
const youtube = googleapis__WEBPACK_IMPORTED_MODULE_0__["google"].youtube({
    version: 'v3',
    auth: process.env.GAPI_KEY,
});
// Returns the thumbnail for a particular youtube channel
const getYoutubeChannelThumbnail = async (channelId) => {
    try {
        const channelData = await youtube.channels.list({
            part: 'snippet',
            id: channelId,
        });
        return channelData.data.items[0].snippet.thumbnails.medium.url;
    }
    catch (error) {
        throw Error(`Error loading the youtube channel thumbnail: ${error}`);
    }
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
// Returns all necessary information about a particular youtube video given its video id
const getYoutubeVideoData = async (url) => {
    const videoId = getYoutubeVideoId(url);
    try {
        const youtubeVideoData = await youtube.videos.list({
            part: 'contentDetails,snippet,statistics',
            id: videoId,
        });
        const { contentDetails, id, snippet, statistics, } = youtubeVideoData.data.items[0];
        const channelThumbnail = await getYoutubeChannelThumbnail(snippet.channelId);
        return {
            channelThumbnail,
            channelTitle: snippet.channelTitle,
            duration: Object(_youtubeUtils__WEBPACK_IMPORTED_MODULE_1__["formatDuration"])(contentDetails.duration),
            likes: Object(_youtubeUtils__WEBPACK_IMPORTED_MODULE_1__["formatNumber"])(statistics.likeCount),
            publishedAt: Object(_youtubeUtils__WEBPACK_IMPORTED_MODULE_1__["formatPublishedAt"])(snippet.publishedAt),
            videoId: id,
            videoThumbnail: snippet.thumbnails.medium.url,
            videoTitle: snippet.title,
            views: Object(_youtubeUtils__WEBPACK_IMPORTED_MODULE_1__["formatNumber"])(statistics.viewCount),
        };
    }
    catch (error) {
        throw Error(`Error getting youtube video data: ${error}`);
    }
};
/* harmony default export */ __webpack_exports__["default"] = ({
    getYoutubeVideoData,
});


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NhcmRNdXRhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZE11dGF0aW9ucy9jcmVhdGVVc2VyQ2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2luaXRpYXRlVXNlckNhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RoaXJkUGFydHkveW91dHViZS95b3V0dWJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThDO0FBQ0E7QUFDSTtBQUNZO0FBQ1I7QUFFdkM7SUFDYix1RUFBYztJQUNkLHVFQUFjO0lBQ2QsMkVBQWdCO0lBQ2hCLHVGQUFzQjtJQUN0QiwrRUFBa0I7Q0FDbkIsRUFBQzs7Ozs7Ozs7Ozs7OztBQ1pGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNkM7QUFDUDtBQUNVO0FBQ1E7QUFFekMsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQ2xFLElBQUk7UUFDRixNQUFNLEVBQ0osUUFBUSxFQUNSLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLEdBQUcsR0FDSixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFZCxNQUFNLElBQUksR0FBRyx3RUFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwQyxJQUFJLFVBQWtCLENBQUM7UUFFdkIsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3RCLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSx1REFBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hFLFVBQVUsR0FBRztnQkFDWCxlQUFlLEVBQUU7b0JBQ2YsTUFBTSxFQUFFO3dCQUNOLEdBQUcsZ0JBQWdCO3FCQUNwQjtpQkFDRjthQUNGLENBQUM7U0FDSDthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsTUFBTSxTQUFTLEdBQUc7WUFDaEIsR0FBRyxJQUFJO1lBQ1AsSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRTtvQkFDUixNQUFNLEVBQUUsRUFBRSxHQUFHLFVBQVUsRUFBRTtpQkFDMUI7Z0JBQ0QsUUFBUTtnQkFDUixVQUFVO2dCQUNWLE1BQU07Z0JBQ04sS0FBSztnQkFDTCxJQUFJO2dCQUNKLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUU7d0JBQ1AsRUFBRSxFQUFFLE1BQU07cUJBQ1g7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSwyREFBUSxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQztLQUNiO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxNQUFNLElBQUksMERBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ2hFO0FBQ0gsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDMURGO0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FBQ1A7QUFDWTtBQUVuQyxvRUFBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNwQyxJQUFJO1FBQ0YsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLHVEQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxRSxPQUFPO1lBQ0wsUUFBUSxFQUFFO2dCQUNSLGVBQWUsRUFBRSxnQkFBZ0I7YUFDbEM7WUFDRCxRQUFRLEVBQUUsNERBQVMsQ0FBQyxLQUFLO1lBQ3pCLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO1lBQ2xDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7U0FDbkIsQ0FBQztLQUNIO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxNQUFNLElBQUksMERBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ2hFO0FBQ0gsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDakJGO0FBQUE7QUFBTyxNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQVcsRUFBWSxFQUFFO0lBQ25ELElBQ0UsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7V0FDeEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7V0FDeEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUN2QztRQUNBLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0lBRUQsTUFBTSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNaRjtBQUFBO0FBQUE7QUFBQTtBQUFvQztBQUU2QztBQUVqRixtQ0FBbUM7QUFDbkMsTUFBTSxPQUFPLEdBQUcsaURBQU0sQ0FBQyxPQUFPLENBQUM7SUFDN0IsT0FBTyxFQUFFLElBQUk7SUFDYixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRO0NBQzNCLENBQUMsQ0FBQztBQUVILHlEQUF5RDtBQUN6RCxNQUFNLDBCQUEwQixHQUFHLEtBQUssRUFBRSxTQUFpQixFQUFtQixFQUFFO0lBQzlFLElBQUk7UUFDRixNQUFNLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzlDLElBQUksRUFBRSxTQUFTO1lBQ2YsRUFBRSxFQUFFLFNBQVM7U0FDZCxDQUFDLENBQUM7UUFDSCxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUNoRTtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsTUFBTSxLQUFLLENBQUMsZ0RBQWdELEtBQUssRUFBRSxDQUFDLENBQUM7S0FDdEU7QUFDSCxDQUFDLENBQUM7QUFFRix1REFBdUQ7QUFDdkQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEdBQUcsRUFBVSxFQUFFO0lBQ3hDLElBQ0UsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7V0FDeEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7V0FDeEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUN2QztRQUNBLE1BQU0sTUFBTSxHQUFHLGtHQUFrRyxDQUFDO1FBQ2xILE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsTUFBTSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztLQUM5QztJQUNELE1BQU0sS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFDaEQsQ0FBQyxDQUFDO0FBRUYsd0ZBQXdGO0FBQ3hGLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxFQUFFLEdBQVcsRUFBNkIsRUFBRTtJQUMzRSxNQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxJQUFJO1FBQ0YsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2pELElBQUksRUFBRSxtQ0FBbUM7WUFDekMsRUFBRSxFQUFFLE9BQU87U0FDWixDQUFDLENBQUM7UUFDSCxNQUFNLEVBQ0osY0FBYyxFQUNkLEVBQUUsRUFDRixPQUFPLEVBQ1AsVUFBVSxHQUNYLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sMEJBQTBCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdFLE9BQU87WUFDTCxnQkFBZ0I7WUFDaEIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO1lBQ2xDLFFBQVEsRUFBRSxvRUFBYyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7WUFDakQsS0FBSyxFQUFFLGtFQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUN6QyxXQUFXLEVBQUUsdUVBQWlCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUNuRCxPQUFPLEVBQUUsRUFBRTtZQUNYLGNBQWMsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHO1lBQzdDLFVBQVUsRUFBRSxPQUFPLENBQUMsS0FBSztZQUN6QixLQUFLLEVBQUUsa0VBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1NBQzFDLENBQUM7S0FDSDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsTUFBTSxLQUFLLENBQUMscUNBQXFDLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDM0Q7QUFDSCxDQUFDLENBQUM7QUFHYTtJQUNiLG1CQUFtQjtDQUNwQixFQUFDIiwiZmlsZSI6Im1haW4uNmFhNjc2MTQyZDg2NjdhMThiNTcuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVVc2VyQ2FyZCBmcm9tICcuL2NyZWF0ZVVzZXJDYXJkJztcbmltcG9ydCBkZWxldGVVc2VyQ2FyZCBmcm9tICcuL2RlbGV0ZVVzZXJDYXJkJztcbmltcG9ydCBpbml0aWF0ZVVzZXJDYXJkIGZyb20gJy4vaW5pdGlhdGVVc2VyQ2FyZCc7XG5pbXBvcnQgdG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZCBmcm9tICcuL3RvZ2dsZUZhdm9yaXRlVXNlckNhcmQnO1xuaW1wb3J0IHRvZ2dsZVRvRG9Vc2VyQ2FyZCBmcm9tICcuL3RvZ2dsZVRvRG9Vc2VyQ2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3JlYXRlVXNlckNhcmQsXG4gIGRlbGV0ZVVzZXJDYXJkLFxuICBpbml0aWF0ZVVzZXJDYXJkLFxuICB0b2dnbGVGYXZvcml0ZVVzZXJDYXJkLFxuICB0b2dnbGVUb0RvVXNlckNhcmQsXG59O1xuIiwiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeW91dHViZSBmcm9tICd5b3V0dWJlL3lvdXR1YmUnO1xuaW1wb3J0IGNhcmRJbmZvIGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkSW5mbyc7XG5pbXBvcnQgeyBnZXRDYXJkVHlwZSB9IGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qge1xuICAgICAgY2F0ZWdvcnksXG4gICAgICBpc0Zhdm9yaXRlLFxuICAgICAgaXNUb0RvLFxuICAgICAgdGl0bGUsXG4gICAgICB1cmwsXG4gICAgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IHR5cGUgPSBnZXRDYXJkVHlwZSh1cmwpO1xuXG4gICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gICAgbGV0IGNyZWF0ZUFyZ3M6IG9iamVjdDtcblxuICAgIGlmICh0eXBlID09PSAnWW91dHViZScpIHtcbiAgICAgIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodXJsKTtcbiAgICAgIGNyZWF0ZUFyZ3MgPSB7XG4gICAgICAgIHlvdXR1YmVDYXJkRGF0YToge1xuICAgICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgICAgLi4ueW91dHViZVZpZGVvRGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNhcmQgdHlwZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbmFsQXJncyA9IHtcbiAgICAgIC4uLmFyZ3MsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGNhcmREYXRhOiB7XG4gICAgICAgICAgY3JlYXRlOiB7IC4uLmNyZWF0ZUFyZ3MgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgIGlzRmF2b3JpdGUsXG4gICAgICAgIGlzVG9EbyxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBjb25uZWN0OiB7XG4gICAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBjYXJkID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLmNyZWF0ZUNhcmQoZmluYWxBcmdzLCBjYXJkSW5mbyk7XG4gICAgcHVic3ViLnB1Ymxpc2goJ3VzZXJDYXJkJywgeyB1c2VyQ2FyZDogY2FyZCB9KTtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgfVxufTtcbiIsImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHlvdXR1YmUgZnJvbSAneW91dHViZS95b3V0dWJlJztcbmltcG9ydCBjYXJkRW51bXMgZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRFbnVtcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKGFyZ3MuZGF0YS51cmwpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNhcmREYXRhOiB7XG4gICAgICAgIHlvdXR1YmVDYXJkRGF0YTogeW91dHViZVZpZGVvRGF0YSxcbiAgICAgIH0sXG4gICAgICBjYXRlZ29yeTogY2FyZEVudW1zLnZpZGVvLFxuICAgICAgdGl0bGU6IHlvdXR1YmVWaWRlb0RhdGEudmlkZW9UaXRsZSxcbiAgICAgIHVybDogYXJncy5kYXRhLnVybCxcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgQ2FyZFR5cGUgfSBmcm9tICcuL2NhcmRUeXBlcyc7XG5cbmV4cG9ydCBjb25zdCBnZXRDYXJkVHlwZSA9ICh1cmw6IHN0cmluZyk6IENhcmRUeXBlID0+IHtcbiAgaWYgKFxuICAgIHVybC5pbmNsdWRlcygneW91dHViZS5jb20nKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHUuYmUnKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHViZS1ub2Nvb2tpZS5jb20nKVxuICApIHtcbiAgICByZXR1cm4gJ1lvdXR1YmUnO1xuICB9XG5cbiAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkZXRlY3QgYSB2YWxpZCBjYXJkIHR5cGUnKTtcbn07XG4iLCJpbXBvcnQgeyBnb29nbGUgfSBmcm9tICdnb29nbGVhcGlzJztcbmltcG9ydCB7IFlvdXR1YmVWaWRlb0RhdGEgfSBmcm9tICd0eXBlcy95b3V0dWJlVHlwZXMnO1xuaW1wb3J0IHsgZm9ybWF0RHVyYXRpb24sIGZvcm1hdE51bWJlciwgZm9ybWF0UHVibGlzaGVkQXQgfSBmcm9tICcuL3lvdXR1YmVVdGlscyc7XG5cbi8vIGluaXRpYWxpemVzIHRoZSBZb3V0dWJlIERhdGEgQVBJXG5jb25zdCB5b3V0dWJlID0gZ29vZ2xlLnlvdXR1YmUoe1xuICB2ZXJzaW9uOiAndjMnLFxuICBhdXRoOiBwcm9jZXNzLmVudi5HQVBJX0tFWSxcbn0pO1xuXG4vLyBSZXR1cm5zIHRoZSB0aHVtYm5haWwgZm9yIGEgcGFydGljdWxhciB5b3V0dWJlIGNoYW5uZWxcbmNvbnN0IGdldFlvdXR1YmVDaGFubmVsVGh1bWJuYWlsID0gYXN5bmMgKGNoYW5uZWxJZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjaGFubmVsRGF0YSA9IGF3YWl0IHlvdXR1YmUuY2hhbm5lbHMubGlzdCh7XG4gICAgICBwYXJ0OiAnc25pcHBldCcsXG4gICAgICBpZDogY2hhbm5lbElkLFxuICAgIH0pO1xuICAgIHJldHVybiBjaGFubmVsRGF0YS5kYXRhLml0ZW1zWzBdLnNuaXBwZXQudGh1bWJuYWlscy5tZWRpdW0udXJsO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IEVycm9yKGBFcnJvciBsb2FkaW5nIHRoZSB5b3V0dWJlIGNoYW5uZWwgdGh1bWJuYWlsOiAke2Vycm9yfWApO1xuICB9XG59O1xuXG4vLyBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNzcyODQxNy83NDYwNDY3XG5jb25zdCBnZXRZb3V0dWJlVmlkZW9JZCA9ICh1cmwpOiBzdHJpbmcgPT4ge1xuICBpZiAoXG4gICAgdXJsLmluY2x1ZGVzKCd5b3V0dWJlLmNvbScpXG4gICAgfHwgdXJsLmluY2x1ZGVzKCd5b3V0dS5iZScpXG4gICAgfHwgdXJsLmluY2x1ZGVzKCd5b3V0dWJlLW5vY29va2llLmNvbScpXG4gICkge1xuICAgIGNvbnN0IHJlZ0V4cCA9IC9eLiooPzooPzp5b3V0dVxcLmJlXFwvfHZcXC98dmlcXC98dVxcL1xcd1xcL3xlbWJlZFxcLyl8KD86KD86d2F0Y2gpP1xcP3YoPzppKT89fFxcJnYoPzppKT89KSkoW14jXFwmXFw/XSopLiovO1xuICAgIGNvbnN0IG1hdGNoID0gdXJsLm1hdGNoKHJlZ0V4cCk7XG4gICAgaWYgKG1hdGNoICYmIG1hdGNoWzFdKSB7XG4gICAgICByZXR1cm4gbWF0Y2hbMV07XG4gICAgfVxuICAgIHRocm93IEVycm9yKCdZb3VyIHlvdXR1YmUgdXJsIGlzIG5vdCB2YWxpZCcpO1xuICB9XG4gIHRocm93IEVycm9yKCdZb3UgbXVzdCBwcm92aWRlIGEgeW91dHViZSB1cmwnKTtcbn07XG5cbi8vIFJldHVybnMgYWxsIG5lY2Vzc2FyeSBpbmZvcm1hdGlvbiBhYm91dCBhIHBhcnRpY3VsYXIgeW91dHViZSB2aWRlbyBnaXZlbiBpdHMgdmlkZW8gaWRcbmNvbnN0IGdldFlvdXR1YmVWaWRlb0RhdGEgPSBhc3luYyAodXJsOiBzdHJpbmcpOiBQcm9taXNlPFlvdXR1YmVWaWRlb0RhdGE+ID0+IHtcbiAgY29uc3QgdmlkZW9JZCA9IGdldFlvdXR1YmVWaWRlb0lkKHVybCk7XG4gIHRyeSB7XG4gICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUudmlkZW9zLmxpc3Qoe1xuICAgICAgcGFydDogJ2NvbnRlbnREZXRhaWxzLHNuaXBwZXQsc3RhdGlzdGljcycsXG4gICAgICBpZDogdmlkZW9JZCxcbiAgICB9KTtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZW50RGV0YWlscyxcbiAgICAgIGlkLFxuICAgICAgc25pcHBldCxcbiAgICAgIHN0YXRpc3RpY3MsXG4gICAgfSA9IHlvdXR1YmVWaWRlb0RhdGEuZGF0YS5pdGVtc1swXTtcbiAgICBjb25zdCBjaGFubmVsVGh1bWJuYWlsID0gYXdhaXQgZ2V0WW91dHViZUNoYW5uZWxUaHVtYm5haWwoc25pcHBldC5jaGFubmVsSWQpO1xuICAgIHJldHVybiB7XG4gICAgICBjaGFubmVsVGh1bWJuYWlsLFxuICAgICAgY2hhbm5lbFRpdGxlOiBzbmlwcGV0LmNoYW5uZWxUaXRsZSxcbiAgICAgIGR1cmF0aW9uOiBmb3JtYXREdXJhdGlvbihjb250ZW50RGV0YWlscy5kdXJhdGlvbiksXG4gICAgICBsaWtlczogZm9ybWF0TnVtYmVyKHN0YXRpc3RpY3MubGlrZUNvdW50KSxcbiAgICAgIHB1Ymxpc2hlZEF0OiBmb3JtYXRQdWJsaXNoZWRBdChzbmlwcGV0LnB1Ymxpc2hlZEF0KSxcbiAgICAgIHZpZGVvSWQ6IGlkLFxuICAgICAgdmlkZW9UaHVtYm5haWw6IHNuaXBwZXQudGh1bWJuYWlscy5tZWRpdW0udXJsLFxuICAgICAgdmlkZW9UaXRsZTogc25pcHBldC50aXRsZSxcbiAgICAgIHZpZXdzOiBmb3JtYXROdW1iZXIoc3RhdGlzdGljcy52aWV3Q291bnQpLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgRXJyb3IoYEVycm9yIGdldHRpbmcgeW91dHViZSB2aWRlbyBkYXRhOiAke2Vycm9yfWApO1xuICB9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0WW91dHViZVZpZGVvRGF0YSxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9