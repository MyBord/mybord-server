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
            const videoId = Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_3__["getYoutubeVideoId"])(url);
            const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_1__["default"].getYoutubeVideoData(videoId);
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
/* harmony import */ var youtube_youtube__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! youtube/youtube */ "./src/thirdParty/youtube/youtube.ts");

const getCardType = (url) => {
    if (url.includes('youtube.com')
        || url.includes('youtu.be')
        || url.includes('youtube-nocookie.com')) {
        return 'Youtube';
    }
    if (url.endsWith('.jpg') || url.endsWith('.png')) {
        return 'Image';
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
const getYoutubeData = async (url) => {
    const videoId = getYoutubeVideoId(url);
    const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_0__["default"].getYoutubeVideoData(videoId);
};
// const getCardData = (url: string): void => {
//   const cardType = getCardType(url);
//
//   if (cardType === 'Youtube')
//
// }
//


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NhcmRNdXRhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZE11dGF0aW9ucy9jcmVhdGVVc2VyQ2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2luaXRpYXRlVXNlckNhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDQTtBQUNJO0FBQ1k7QUFDUjtBQUV2QztJQUNiLHVFQUFjO0lBQ2QsdUVBQWM7SUFDZCwyRUFBZ0I7SUFDaEIsdUZBQXNCO0lBQ3RCLCtFQUFrQjtDQUNuQixFQUFDOzs7Ozs7Ozs7Ozs7O0FDWkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QztBQUNQO0FBQ1U7QUFDMkI7QUFFNUQsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQ2xFLElBQUk7UUFDRixNQUFNLEVBQ0osUUFBUSxFQUNSLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLEdBQUcsR0FDSixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFZCxNQUFNLElBQUksR0FBRyx3RUFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwQyxJQUFJLFVBQWtCLENBQUM7UUFFdkIsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3RCLE1BQU0sT0FBTyxHQUFHLDhFQUFpQixDQUFDLEdB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eEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7V0FDeEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUN2QztRQUNBLE1BQU0sTUFBTSxHQUFHLGtHQUFrRyxDQUFDO1FBQ2xILE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsTUFBTSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztLQUM5QztJQUNELE1BQU0sS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFDaEQsQ0FBQyxDQUFDO0FBRUYsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLEdBQVcsRUFBaUIsRUFBRTtJQUMxRCxNQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sdURBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0RSxDQUFDLENBQUM7QUFFRiwrQ0FBK0M7QUFDL0MsdUNBQXVDO0FBQ3ZDLEVBQUU7QUFDRixnQ0FBZ0M7QUFDaEMsRUFBRTtBQUNGLElBQUk7QUFDSixFQUFFIiwiZmlsZSI6Im1haW4uN2E3YzhjYTlmZmM2N2NhY2MzNzMuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVVc2VyQ2FyZCBmcm9tICcuL2NyZWF0ZVVzZXJDYXJkJztcbmltcG9ydCBkZWxldGVVc2VyQ2FyZCBmcm9tICcuL2RlbGV0ZVVzZXJDYXJkJztcbmltcG9ydCBpbml0aWF0ZVVzZXJDYXJkIGZyb20gJy4vaW5pdGlhdGVVc2VyQ2FyZCc7XG5pbXBvcnQgdG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZCBmcm9tICcuL3RvZ2dsZUZhdm9yaXRlVXNlckNhcmQnO1xuaW1wb3J0IHRvZ2dsZVRvRG9Vc2VyQ2FyZCBmcm9tICcuL3RvZ2dsZVRvRG9Vc2VyQ2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3JlYXRlVXNlckNhcmQsXG4gIGRlbGV0ZVVzZXJDYXJkLFxuICBpbml0aWF0ZVVzZXJDYXJkLFxuICB0b2dnbGVGYXZvcml0ZVVzZXJDYXJkLFxuICB0b2dnbGVUb0RvVXNlckNhcmQsXG59O1xuIiwiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeW91dHViZSBmcm9tICd5b3V0dWJlL3lvdXR1YmUnO1xuaW1wb3J0IGNhcmRJbmZvIGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkSW5mbyc7XG5pbXBvcnQgeyBnZXRDYXJkVHlwZSwgZ2V0WW91dHViZVZpZGVvSWQgfSBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZFV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hLCBwdWJzdWIgfSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNhdGVnb3J5LFxuICAgICAgaXNGYXZvcml0ZSxcbiAgICAgIGlzVG9EbyxcbiAgICAgIHRpdGxlLFxuICAgICAgdXJsLFxuICAgIH0gPSBhcmdzLmRhdGE7XG5cbiAgICBjb25zdCB0eXBlID0gZ2V0Q2FyZFR5cGUodXJsKTtcblxuICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICAgIGxldCBjcmVhdGVBcmdzOiBvYmplY3Q7XG5cbiAgICBpZiAodHlwZSA9PT0gJ1lvdXR1YmUnKSB7XG4gICAgICBjb25zdCB2aWRlb0lkID0gZ2V0WW91dHViZVZpZGVvSWQodXJsKTtcbiAgICAgIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodmlkZW9JZCk7XG4gICAgICBjcmVhdGVBcmdzID0ge1xuICAgICAgICB5b3V0dWJlQ2FyZERhdGE6IHtcbiAgICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICAgIC4uLnlvdXR1YmVWaWRlb0RhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjYXJkIHR5cGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgICAuLi5hcmdzLFxuICAgICAgZGF0YToge1xuICAgICAgICBjYXJkRGF0YToge1xuICAgICAgICAgIGNyZWF0ZTogeyAuLi5jcmVhdGVBcmdzIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNhdGVnb3J5LFxuICAgICAgICBpc0Zhdm9yaXRlLFxuICAgICAgICBpc1RvRG8sXG4gICAgICAgIHRpdGxlLFxuICAgICAgICB0eXBlLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgY29ubmVjdDoge1xuICAgICAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgY2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5jcmVhdGVDYXJkKGZpbmFsQXJncywgY2FyZEluZm8pO1xuICAgIHB1YnN1Yi5wdWJsaXNoKCd1c2VyQ2FyZCcsIHsgdXNlckNhcmQ6IGNhcmQgfSk7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCB5b3V0dWJlIGZyb20gJ3lvdXR1YmUveW91dHViZSc7XG5pbXBvcnQgeyBjYXRlZ29yeSB9IGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkRW51bXMnO1xuaW1wb3J0IHsgZ2V0Q2FyZFR5cGUsIGdldFlvdXR1YmVWaWRlb0lkIH0gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2aWRlb0lkID0gZ2V0WW91dHViZVZpZGVvSWQoYXJncy5kYXRhLnVybCk7XG4gICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh2aWRlb0lkKTtcblxuICAgIHJldHVybiB7XG4gICAgICBjYXRlZ29yeTogY2F0ZWdvcnkudmlkZW8sXG4gICAgICB0aXRsZTogeW91dHViZVZpZGVvRGF0YS52aWRlb1RpdGxlLFxuICAgICAgdXJsOiBhcmdzLmRhdGEudXJsLFxuICAgICAgeW91dHViZUNhcmREYXRhOiB5b3V0dWJlVmlkZW9EYXRhLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgeW91dHViZSBmcm9tICd5b3V0dWJlL3lvdXR1YmUnO1xuaW1wb3J0IHsgQ2FyZFR5cGUgfSBmcm9tICcuL2NhcmRUeXBlcyc7XG5cbmV4cG9ydCBjb25zdCBnZXRDYXJkVHlwZSA9ICh1cmw6IHN0cmluZyk6IENhcmRUeXBlID0+IHtcbiAgaWYgKFxuICAgIHVybC5pbmNsdWRlcygneW91dHViZS5jb20nKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHUuYmUnKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHViZS1ub2Nvb2tpZS5jb20nKVxuICApIHtcbiAgICByZXR1cm4gJ1lvdXR1YmUnO1xuICB9XG5cbiAgaWYgKHVybC5lbmRzV2l0aCgnLmpwZycpIHx8IHVybC5lbmRzV2l0aCgnLnBuZycpKSB7XG4gICAgcmV0dXJuICdJbWFnZSc7XG4gIH1cblxuICB0aHJvdyBFcnJvcignQ2Fubm90IGRldGVjdCBhIHZhbGlkIGNhcmQgdHlwZScpO1xufTtcblxuLy8gc291cmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjc3Mjg0MTcvNzQ2MDQ2N1xuZXhwb3J0IGNvbnN0IGdldFlvdXR1YmVWaWRlb0lkID0gKHVybCk6IHN0cmluZyA9PiB7XG4gIGlmIChcbiAgICB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUuY29tJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1LmJlJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUtbm9jb29raWUuY29tJylcbiAgKSB7XG4gICAgY29uc3QgcmVnRXhwID0gL14uKig/Oig/OnlvdXR1XFwuYmVcXC98dlxcL3x2aVxcL3x1XFwvXFx3XFwvfGVtYmVkXFwvKXwoPzooPzp3YXRjaCk/XFw/dig/OmkpPz18XFwmdig/OmkpPz0pKShbXiNcXCZcXD9dKikuKi87XG4gICAgY29uc3QgbWF0Y2ggPSB1cmwubWF0Y2gocmVnRXhwKTtcbiAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMV0pIHtcbiAgICAgIHJldHVybiBtYXRjaFsxXTtcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoJ1lvdXIgeW91dHViZSB1cmwgaXMgbm90IHZhbGlkJyk7XG4gIH1cbiAgdGhyb3cgRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgYSB5b3V0dWJlIHVybCcpO1xufTtcblxuY29uc3QgZ2V0WW91dHViZURhdGEgPSBhc3luYyAodXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgY29uc3QgdmlkZW9JZCA9IGdldFlvdXR1YmVWaWRlb0lkKHVybCk7XG4gIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodmlkZW9JZCk7XG59O1xuXG4vLyBjb25zdCBnZXRDYXJkRGF0YSA9ICh1cmw6IHN0cmluZyk6IHZvaWQgPT4ge1xuLy8gICBjb25zdCBjYXJkVHlwZSA9IGdldENhcmRUeXBlKHVybCk7XG4vL1xuLy8gICBpZiAoY2FyZFR5cGUgPT09ICdZb3V0dWJlJylcbi8vXG4vLyB9XG4vL1xuIl0sInNvdXJjZVJvb3QiOiIifQ==