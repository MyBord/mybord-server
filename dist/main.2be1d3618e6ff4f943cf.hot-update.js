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
    console.log(['image/jpeg', 'image/png', 'image/gif'].includes(contentType));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NhcmRNdXRhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZE11dGF0aW9ucy9jcmVhdGVVc2VyQ2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2luaXRpYXRlVXNlckNhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDQTtBQUNJO0FBQ1k7QUFDUjtBQUV2QztJQUNiLHVFQUFjO0lBQ2QsdUVBQWM7SUFDZCwyRUFBZ0I7SUFDaEIsdUZBQXNCO0lBQ3RCLCtFQUFrQjtDQUNuQixFQUFDOzs7Ozs7Ozs7Ozs7O0FDWkY7QUFBQTtBQUFBO0FBQUE7QUFBNkM7QUFDRztBQUMrQjtBQUVoRSxvRUFBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7SUFDbEUsSUFBSTtRQUNGLE1BQU0sRUFDSixRQUFRLEVBQ1IsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsR0FBRyxHQUNKLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUVkLE1BQU0sUUFBUSxHQUFHLE1BQU0sd0VBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV4QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFcEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxrRkFBcUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFOUQsTUFBTSxTQUFTLEdBQUc7WUFDaEIsR0FB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RUFBRSxFQUFFLEdBQUcsU0FBUyxFQUFFO2FBQ3pCO1NBQ0YsQ0FBQztLQUNIO0lBRUQsSUFBSSxRQUFRLEtBQUssb0VBQUksQ0FBQyxPQUFPLEVBQUU7UUFDN0IsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLHVEQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFaEUsT0FBTztZQUNMLGVBQWUsRUFBRTtnQkFDZixNQUFNLEVBQUUsRUFBRSxHQUFHLGdCQUFnQixFQUFFO2FBQ2hDO1NBQ0YsQ0FBQztLQUNIO0lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLjJiZTFkMzYxOGU2ZmY0Zjk0M2NmLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlVXNlckNhcmQgZnJvbSAnLi9jcmVhdGVVc2VyQ2FyZCc7XG5pbXBvcnQgZGVsZXRlVXNlckNhcmQgZnJvbSAnLi9kZWxldGVVc2VyQ2FyZCc7XG5pbXBvcnQgaW5pdGlhdGVVc2VyQ2FyZCBmcm9tICcuL2luaXRpYXRlVXNlckNhcmQnO1xuaW1wb3J0IHRvZ2dsZUZhdm9yaXRlVXNlckNhcmQgZnJvbSAnLi90b2dnbGVGYXZvcml0ZVVzZXJDYXJkJztcbmltcG9ydCB0b2dnbGVUb0RvVXNlckNhcmQgZnJvbSAnLi90b2dnbGVUb0RvVXNlckNhcmQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVVzZXJDYXJkLFxuICBkZWxldGVVc2VyQ2FyZCxcbiAgaW5pdGlhdGVVc2VyQ2FyZCxcbiAgdG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZCxcbiAgdG9nZ2xlVG9Eb1VzZXJDYXJkLFxufTtcbiIsImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IGNhcmRJbmZvIGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkSW5mbyc7XG5pbXBvcnQgeyBnZXRDYXJkVHlwZSwgZ2V0VXNlckNhcmRDcmVhdGVBcmdzIH0gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSwgcHVic3ViIH0pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7XG4gICAgICBjYXRlZ29yeSxcbiAgICAgIGlzRmF2b3JpdGUsXG4gICAgICBpc1RvRG8sXG4gICAgICB0aXRsZSxcbiAgICAgIHVybCxcbiAgICB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgY2FyZFR5cGUgPSBhd2FpdCBnZXRDYXJkVHlwZSh1cmwpO1xuXG4gICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG5cbiAgICBjb25zdCBjcmVhdGVBcmdzID0gYXdhaXQgZ2V0VXNlckNhcmRDcmVhdGVBcmdzKGNhcmRUeXBlLCB1cmwpO1xuXG4gICAgY29uc3QgZmluYWxBcmdzID0ge1xuICAgICAgLi4uYXJncyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY2FyZERhdGE6IHtcbiAgICAgICAgICBjcmVhdGU6IHsgLi4uY3JlYXRlQXJncyB9LFxuICAgICAgICB9LFxuICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgaXNGYXZvcml0ZSxcbiAgICAgICAgaXNUb0RvLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgdHlwZTogY2FyZFR5cGUsXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBjb25uZWN0OiB7XG4gICAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBjYXJkID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLmNyZWF0ZUNhcmQoZmluYWxBcmdzLCBjYXJkSW5mbyk7XG4gICAgcHVic3ViLnB1Ymxpc2goJ3VzZXJDYXJkJywgeyB1c2VyQ2FyZDogY2FyZCB9KTtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgfVxufTtcbiIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCB7IHR5cGUgfSBmcm9tICdzY2hlbWEvY2FyZC9jYXJkVXRpbHMvY2FyZEVudW1zJztcbmltcG9ydCB7IGdldENhcmRUeXBlLCBnZXRJbml0aWFsSW1hZ2VEYXRhLCBnZXRJbml0aWFsWW91dHViZURhdGEgfSBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZFV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXJsIH0gPSBhcmdzLmRhdGE7XG5cbiAgICBjb25zdCBjYXJkVHlwZSA9IGF3YWl0IGdldENhcmRUeXBlKGFyZ3MuZGF0YS51cmwpO1xuXG4gICAgaWYgKGNhcmRUeXBlID09PSB0eXBlLmltYWdlKSB7XG4gICAgICByZXR1cm4gZ2V0SW5pdGlhbEltYWdlRGF0YShhcmdzLmRhdGEudXJsKTtcbiAgICB9XG5cbiAgICBpZiAoY2FyZFR5cGUgPT09IHR5cGUueW91dHViZSkge1xuICAgICAgY29uc3QgaW5pdGlhbFlvdXR1YmVEYXRhID0gYXdhaXQgZ2V0SW5pdGlhbFlvdXR1YmVEYXRhKHVybCk7XG4gICAgICByZXR1cm4gaW5pdGlhbFlvdXR1YmVEYXRhO1xuICAgIH1cblxuICAgIHRocm93IEVycm9yKCdDYW5ub3QgZGV0ZWN0IGEgdmFsaWQgY2FyZCB0eXBlJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHlvdXR1YmUgZnJvbSAneW91dHViZS95b3V0dWJlJztcbmltcG9ydCB7IGNhdGVnb3J5LCB0eXBlIH0gZnJvbSAnc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRFbnVtcyc7XG5pbXBvcnQge1xuICBDYXJkQ3JlYXRlQXJncyxcbiAgQ2FyZFR5cGUsXG4gIEltYWdlRGF0YSxcbiAgSW5pdGlhbENhcmREYXRhU2NoZW1hLFxufSBmcm9tICcuL2NhcmRUeXBlcyc7XG5cbi8vIC0tLS0tIENBUkQgVFlQRSAtLS0tLSAvL1xuXG5leHBvcnQgY29uc3QgZ2V0Q2FyZFR5cGUgPSBhc3luYyAodXJsOiBzdHJpbmcpOiBQcm9taXNlPENhcmRUeXBlPiA9PiB7XG4gIGlmIChcbiAgICB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUuY29tJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1LmJlJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUtbm9jb29raWUuY29tJylcbiAgKSB7XG4gICAgcmV0dXJuIHR5cGUueW91dHViZTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuaGVhZCh1cmwpO1xuICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddO1xuXG4gIGNvbnNvbGUubG9nKFsnaW1hZ2UvanBlZycsICdpbWFnZS9wbmcnLCAnaW1hZ2UvZ2lmJ10uaW5jbHVkZXMoY29udGVudFR5cGUpO1xuXG4gIGlmIChbJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL2dpZiddLmluY2x1ZGVzKGNvbnRlbnRUeXBlKSkge1xuICAgIHJldHVybiB0eXBlLmltYWdlO1xuICB9XG5cbiAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkZXRlY3QgYSB2YWxpZCBjYXJkIHR5cGUnKTtcbn07XG5cbi8vIC0tLS0tIElNQUdFIERBVEEgLS0tLS0gLy9cblxuY29uc3QgZ2V0SW1hZ2VEYXRhID0gKHVybDogc3RyaW5nKTogSW1hZ2VEYXRhID0+ICh7XG4gIGltYWdlVXJsOiB1cmwsXG59KTtcblxuLy8gLS0tLS0gSU5JVElBTCBEQVRBIC0tLS0tIC8vXG5cbmV4cG9ydCBjb25zdCBnZXRJbml0aWFsSW1hZ2VEYXRhID0gKHVybDogc3RyaW5nKTogSW5pdGlhbENhcmREYXRhU2NoZW1hID0+IHtcbiAgY29uc3QgaW1hZ2VEYXRhID0gZ2V0SW1hZ2VEYXRhKHVybCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjYXJkRGF0YToge1xuICAgICAgaW1hZ2VDYXJkRGF0YTogeyAuLi5pbWFnZURhdGEgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBjYXRlZ29yeS5pbWFnZSxcbiAgICB0eXBlOiB0eXBlLmltYWdlLFxuICAgIHVybCxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRJbml0aWFsWW91dHViZURhdGEgPSBhc3luYyAodXJsOiBzdHJpbmcpOiBQcm9taXNlPEluaXRpYWxDYXJkRGF0YVNjaGVtYT4gPT4ge1xuICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKHVybCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjYXJkRGF0YToge1xuICAgICAgeW91dHViZUNhcmREYXRhOiB5b3V0dWJlVmlkZW9EYXRhLFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IGNhdGVnb3J5LnZpZGVvLFxuICAgIHRpdGxlOiB5b3V0dWJlVmlkZW9EYXRhLnZpZGVvVGl0bGUsXG4gICAgdHlwZTogdHlwZS55b3V0dWJlLFxuICAgIHVybCxcbiAgfTtcbn07XG5cbi8vIC0tLS0tIENSRUFURSBDQVJEIC0tLS0tIC8vXG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyQ2FyZENyZWF0ZUFyZ3MgPSBhc3luYyAoXG4gIGNhcmRUeXBlOiBDYXJkVHlwZSxcbiAgdXJsOiBzdHJpbmcsXG4pOiBQcm9taXNlPENhcmRDcmVhdGVBcmdzPiA9PiB7XG4gIGlmIChjYXJkVHlwZSA9PT0gdHlwZS5pbWFnZSkge1xuICAgIGNvbnN0IGltYWdlRGF0YSA9IGdldEltYWdlRGF0YSh1cmwpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGltYWdlQ2FyZERhdGE6IHtcbiAgICAgICAgY3JlYXRlOiB7IC4uLmltYWdlRGF0YSB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGNhcmRUeXBlID09PSB0eXBlLnlvdXR1YmUpIHtcbiAgICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKHVybCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeW91dHViZUNhcmREYXRhOiB7XG4gICAgICAgIGNyZWF0ZTogeyAuLi55b3V0dWJlVmlkZW9EYXRhIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY2FyZCB0eXBlJyk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==