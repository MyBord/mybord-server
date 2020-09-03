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

/***/ "./src/schema/card/cardSchema.graphql":
/*!********************************************!*\
  !*** ./src/schema/card/cardSchema.graphql ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Filters"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"isFavorite"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"isToDo"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"FilteredUserCardsType"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"filters"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Filters"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userCards"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"InitialCardData"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"cardData"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardData"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"category"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardCategory"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"url"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"CardFilterInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"isFavorite"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"isToDo"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"CardIdInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"cardId"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"CardInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"category"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardCategory"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"isFavorite"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"isToDo"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"url"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"InitiateCardInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"url"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Mutation"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"createUserCard"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardInput"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deleteUserCard"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CardIdInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"initiateUserCard"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InitiateCardInput"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InitialCardData"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"toggleFavoriteUserCard"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CardIdInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"toggleToDoUserCard"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CardIdInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}},"directives":[]}]},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Subscription"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"deletedUserCard"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"filteredUserCards"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilteredUserCardsType"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userCard"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}},"directives":[]}]},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"userCards"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userCardsWithFilters"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CardFilterInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}}}},"directives":[]}]}],"loc":{"start":0,"end":1126}};
    doc.loc.source = {"body":"# ----- TYPES ----- #\n\ntype Filters {\n  isFavorite: Boolean\n  isToDo: Boolean\n}\n\ntype FilteredUserCardsType {\n  filters: Filters!\n  userCards: [Card!]!\n}\n\ntype InitialCardData {\n  cardData: CardData!\n  category: CardCategory!\n  title: String!\n  url: String!\n}\n\n# ----- INPUTS ----- #\n\ninput CardFilterInput {\n  isFavorite: Boolean\n  isToDo: Boolean\n}\n\ninput CardIdInput {\n  cardId: String!\n}\n\ninput CardInput {\n  category: CardCategory!\n  isFavorite: Boolean!\n  isToDo: Boolean!\n  title: String!\n  url: String!\n}\n\ninput InitiateCardInput {\n  url: String!\n}\n\n# ----- MUTATION ----- #\n\nextend type Mutation {\n  createUserCard(data: CardInput!): Card!\n  deleteUserCard(data: CardIdInput): Card!\n  initiateUserCard(data: InitiateCardInput!): InitialCardData!\n  toggleFavoriteUserCard(data: CardIdInput): Card!\n  toggleToDoUserCard(data: CardIdInput): Card!\n}\n\n# ----- SUBSCRIPTION ----- #\n\nextend type Subscription {\n  deletedUserCard: Card!\n  filteredUserCards: FilteredUserCardsType!\n  userCard: Card!\n}\n\n# ----- QUERY ----- #\n\nextend type Query {\n  userCards: [Card!]!\n  userCardsWithFilters(data: CardFilterInput): [Card!]!\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


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
        return 'Youtube';
    }
    if (url.endsWith('.jpg') || url.endsWith('.png')) {
        return 'Image';
    }
    throw Error('Cannot detect a valid card type');
};
const getInitialYoutubeData = async (url) => {
    const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_0__["default"].getYoutubeVideoData(url);
    return {
        category: schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_1__["category"].video,
        title: youtubeVideoData.videoTitle,
        url,
        cardData: {
            youtubeCardData: youtubeVideoData,
        },
    };
};
const getInitialCardData = async (url) => {
    const cardType = getCardType(url);
    if (cardType === 'Youtube') {
        const initialYoutubeData = await getInitialYoutubeData(url);
        return initialYoutubeData;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NhcmRNdXRhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZE11dGF0aW9ucy9jcmVhdGVVc2VyQ2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2luaXRpYXRlVXNlckNhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRTY2hlbWEuZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdGhpcmRQYXJ0eS95b3V0dWJlL3lvdXR1YmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDQTtBQUNJO0FBQ1k7QUFDUjtBQUV2QztJQUNiLHVFQUFjO0lBQ2QsdUVBQWM7SUFDZCwyRUFBZ0I7SUFDaEIsdUZBQXNCO0lBQ3RCLCtFQUFrQjtDQUNuQixFQUFDOzs7Ozs7Ozs7Ozs7O0FDWkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QztBQUNQO0FBQ1U7QUFDMkI7QUFFNUQsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQ2xFLElBQUk7UUFDRixNQUFNLEVBQ0osUUFBUSxFQUNSLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLEdBQUcsR0FDSixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFZCxNQUFNLElBQUksR0FBRyx3RUFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFT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OTljNzc3MGVjNGUzLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlVXNlckNhcmQgZnJvbSAnLi9jcmVhdGVVc2VyQ2FyZCc7XG5pbXBvcnQgZGVsZXRlVXNlckNhcmQgZnJvbSAnLi9kZWxldGVVc2VyQ2FyZCc7XG5pbXBvcnQgaW5pdGlhdGVVc2VyQ2FyZCBmcm9tICcuL2luaXRpYXRlVXNlckNhcmQnO1xuaW1wb3J0IHRvZ2dsZUZhdm9yaXRlVXNlckNhcmQgZnJvbSAnLi90b2dnbGVGYXZvcml0ZVVzZXJDYXJkJztcbmltcG9ydCB0b2dnbGVUb0RvVXNlckNhcmQgZnJvbSAnLi90b2dnbGVUb0RvVXNlckNhcmQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVVzZXJDYXJkLFxuICBkZWxldGVVc2VyQ2FyZCxcbiAgaW5pdGlhdGVVc2VyQ2FyZCxcbiAgdG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZCxcbiAgdG9nZ2xlVG9Eb1VzZXJDYXJkLFxufTtcbiIsImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHlvdXR1YmUgZnJvbSAneW91dHViZS95b3V0dWJlJztcbmltcG9ydCBjYXJkSW5mbyBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZEluZm8nO1xuaW1wb3J0IHsgZ2V0Q2FyZFR5cGUsIGdldFlvdXR1YmVWaWRlb0lkIH0gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSwgcHVic3ViIH0pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7XG4gICAgICBjYXRlZ29yeSxcbiAgICAgIGlzRmF2b3JpdGUsXG4gICAgICBpc1RvRG8sXG4gICAgICB0aXRsZSxcbiAgICAgIHVybCxcbiAgICB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgdHlwZSA9IGdldENhcmRUeXBlKHVybCk7XG5cbiAgICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgICBsZXQgY3JlYXRlQXJnczogb2JqZWN0O1xuXG4gICAgaWYgKHR5cGUgPT09ICdZb3V0dWJlJykge1xuICAgICAgY29uc3QgdmlkZW9JZCA9IGdldFlvdXR1YmVWaWRlb0lkKHVybCk7XG4gICAgICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKHZpZGVvSWQpO1xuICAgICAgY3JlYXRlQXJncyA9IHtcbiAgICAgICAgeW91dHViZUNhcmREYXRhOiB7XG4gICAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgICAuLi55b3V0dWJlVmlkZW9EYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY2FyZCB0eXBlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZmluYWxBcmdzID0ge1xuICAgICAgLi4uYXJncyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY2FyZERhdGE6IHtcbiAgICAgICAgICBjcmVhdGU6IHsgLi4uY3JlYXRlQXJncyB9LFxuICAgICAgICB9LFxuICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgaXNGYXZvcml0ZSxcbiAgICAgICAgaXNUb0RvLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgdHlwZSxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGNvbm5lY3Q6IHtcbiAgICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IGNhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24uY3JlYXRlQ2FyZChmaW5hbEFyZ3MsIGNhcmRJbmZvKTtcbiAgICBwdWJzdWIucHVibGlzaCgndXNlckNhcmQnLCB7IHVzZXJDYXJkOiBjYXJkIH0pO1xuICAgIHJldHVybiBjYXJkO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeyBnZXRJbml0aWFsQ2FyZERhdGEgfSBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZFV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGluaXRpYWxDYXJkRGF0YSA9IGF3YWl0IGdldEluaXRpYWxDYXJkRGF0YShhcmdzLmRhdGEudXJsKTtcbiAgICByZXR1cm4gaW5pdGlhbENhcmREYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICB9XG59O1xuIiwiXG4gICAgdmFyIGRvYyA9IHtcImtpbmRcIjpcIkRvY3VtZW50XCIsXCJkZWZpbml0aW9uc1wiOlt7XCJraW5kXCI6XCJPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJGaWx0ZXJzXCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpc0Zhdm9yaXRlXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkJvb2xlYW5cIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiaXNUb0RvXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkJvb2xlYW5cIn19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkZpbHRlcmVkVXNlckNhcmRzVHlwZVwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZmlsdGVyc1wifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkZpbHRlcnNcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInVzZXJDYXJkc1wifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTGlzdFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkXCJ9fX19fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJbml0aWFsQ2FyZERhdGFcIn0sXCJpbnRlcmZhY2VzXCI6W10sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImNhcmREYXRhXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZERhdGFcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImNhdGVnb3J5XCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZENhdGVnb3J5XCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJ0aXRsZVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidXJsXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiSW5wdXRPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkRmlsdGVySW5wdXRcIn0sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiaXNGYXZvcml0ZVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQm9vbGVhblwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImlzVG9Eb1wifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQm9vbGVhblwifX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiSW5wdXRPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkSWRJbnB1dFwifSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJjYXJkSWRcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiSW5wdXRPYmplY3RUeXBlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkSW5wdXRcIn0sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiY2F0ZWdvcnlcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZENhdGVnb3J5XCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImlzRmF2b3JpdGVcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQm9vbGVhblwifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpc1RvRG9cIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQm9vbGVhblwifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJ0aXRsZVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidXJsXCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIklucHV0T2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiSW5pdGlhdGVDYXJkSW5wdXRcIn0sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidXJsXCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVFeHRlbnNpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiTXV0YXRpb25cIn0sXCJpbnRlcmZhY2VzXCI6W10sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImNyZWF0ZVVzZXJDYXJkXCJ9LFwiYXJndW1lbnRzXCI6W3tcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImRhdGFcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZElucHV0XCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119XSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJkZWxldGVVc2VyQ2FyZFwifSxcImFyZ3VtZW50c1wiOlt7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJkYXRhXCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkSWRJbnB1dFwifX0sXCJkaXJlY3RpdmVzXCI6W119XSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpbml0aWF0ZVVzZXJDYXJkXCJ9LFwiYXJndW1lbnRzXCI6W3tcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImRhdGFcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiSW5pdGlhdGVDYXJkSW5wdXRcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX1dLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkluaXRpYWxDYXJkRGF0YVwifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZFwifSxcImFyZ3VtZW50c1wiOlt7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJkYXRhXCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkSWRJbnB1dFwifX0sXCJkaXJlY3RpdmVzXCI6W119XSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJ0b2dnbGVUb0RvVXNlckNhcmRcIn0sXCJhcmd1bWVudHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZGF0YVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZElkSW5wdXRcIn19LFwiZGlyZWN0aXZlc1wiOltdfV0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZFwifX19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVFeHRlbnNpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3Vic2NyaXB0aW9uXCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJkZWxldGVkVXNlckNhcmRcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJmaWx0ZXJlZFVzZXJDYXJkc1wifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkZpbHRlcmVkVXNlckNhcmRzVHlwZVwifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidXNlckNhcmRcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiT2JqZWN0VHlwZUV4dGVuc2lvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJRdWVyeVwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidXNlckNhcmRzXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJMaXN0VHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNhcmRcIn19fX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidXNlckNhcmRzV2l0aEZpbHRlcnNcIn0sXCJhcmd1bWVudHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZGF0YVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZEZpbHRlcklucHV0XCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTGlzdFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkXCJ9fX19fSxcImRpcmVjdGl2ZXNcIjpbXX1dfV0sXCJsb2NcIjp7XCJzdGFydFwiOjAsXCJlbmRcIjoxMTI2fX07XG4gICAgZG9jLmxvYy5zb3VyY2UgPSB7XCJib2R5XCI6XCIjIC0tLS0tIFRZUEVTIC0tLS0tICNcXG5cXG50eXBlIEZpbHRlcnMge1xcbiAgaXNGYXZvcml0ZTogQm9vbGVhblxcbiAgaXNUb0RvOiBCb29sZWFuXFxufVxcblxcbnR5cGUgRmlsdGVyZWRVc2VyQ2FyZHNUeXBlIHtcXG4gIGZpbHRlcnM6IEZpbHRlcnMhXFxuICB1c2VyQ2FyZHM6IFtDYXJkIV0hXFxufVxcblxcbnR5cGUgSW5pdGlhbENhcmREYXRhIHtcXG4gIGNhcmREYXRhOiBDYXJkRGF0YSFcXG4gIGNhdGVnb3J5OiBDYXJkQ2F0ZWdvcnkhXFxuICB0aXRsZTogU3RyaW5nIVxcbiAgdXJsOiBTdHJpbmchXFxufVxcblxcbiMgLS0tLS0gSU5QVVRTIC0tLS0tICNcXG5cXG5pbnB1dCBDYXJkRmlsdGVySW5wdXQge1xcbiAgaXNGYXZvcml0ZTogQm9vbGVhblxcbiAgaXNUb0RvOiBCb29sZWFuXFxufVxcblxcbmlucHV0IENhcmRJZElucHV0IHtcXG4gIGNhcmRJZDogU3RyaW5nIVxcbn1cXG5cXG5pbnB1dCBDYXJkSW5wdXQge1xcbiAgY2F0ZWdvcnk6IENhcmRDYXRlZ29yeSFcXG4gIGlzRmF2b3JpdGU6IEJvb2xlYW4hXFxuICBpc1RvRG86IEJvb2xlYW4hXFxuICB0aXRsZTogU3RyaW5nIVxcbiAgdXJsOiBTdHJpbmchXFxufVxcblxcbmlucHV0IEluaXRpYXRlQ2FyZElucHV0IHtcXG4gIHVybDogU3RyaW5nIVxcbn1cXG5cXG4jIC0tLS0tIE1VVEFUSU9OIC0tLS0tICNcXG5cXG5leHRlbmQgdHlwZSBNdXRhdGlvbiB7XFxuICBjcmVhdGVVc2VyQ2FyZChkYXRhOiBDYXJkSW5wdXQhKTogQ2FyZCFcXG4gIGRlbGV0ZVVzZXJDYXJkKGRhdGE6IENhcmRJZElucHV0KTogQ2FyZCFcXG4gIGluaXRpYXRlVXNlckNhcmQoZGF0YTogSW5pdGlhdGVDYXJkSW5wdXQhKTogSW5pdGlhbENhcmREYXRhIVxcbiAgdG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZChkYXRhOiBDYXJkSWRJbnB1dCk6IENhcmQhXFxuICB0b2dnbGVUb0RvVXNlckNhcmQoZGF0YTogQ2FyZElkSW5wdXQpOiBDYXJkIVxcbn1cXG5cXG4jIC0tLS0tIFNVQlNDUklQVElPTiAtLS0tLSAjXFxuXFxuZXh0ZW5kIHR5cGUgU3Vic2NyaXB0aW9uIHtcXG4gIGRlbGV0ZWRVc2VyQ2FyZDogQ2FyZCFcXG4gIGZpbHRlcmVkVXNlckNhcmRzOiBGaWx0ZXJlZFVzZXJDYXJkc1R5cGUhXFxuICB1c2VyQ2FyZDogQ2FyZCFcXG59XFxuXFxuIyAtLS0tLSBRVUVSWSAtLS0tLSAjXFxuXFxuZXh0ZW5kIHR5cGUgUXVlcnkge1xcbiAgdXNlckNhcmRzOiBbQ2FyZCFdIVxcbiAgdXNlckNhcmRzV2l0aEZpbHRlcnMoZGF0YTogQ2FyZEZpbHRlcklucHV0KTogW0NhcmQhXSFcXG59XFxuXCIsXCJuYW1lXCI6XCJHcmFwaFFMIHJlcXVlc3RcIixcImxvY2F0aW9uT2Zmc2V0XCI6e1wibGluZVwiOjEsXCJjb2x1bW5cIjoxfX07XG4gIFxuXG4gICAgdmFyIG5hbWVzID0ge307XG4gICAgZnVuY3Rpb24gdW5pcXVlKGRlZnMpIHtcbiAgICAgIHJldHVybiBkZWZzLmZpbHRlcihcbiAgICAgICAgZnVuY3Rpb24oZGVmKSB7XG4gICAgICAgICAgaWYgKGRlZi5raW5kICE9PSAnRnJhZ21lbnREZWZpbml0aW9uJykgcmV0dXJuIHRydWU7XG4gICAgICAgICAgdmFyIG5hbWUgPSBkZWYubmFtZS52YWx1ZVxuICAgICAgICAgIGlmIChuYW1lc1tuYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYW1lc1tuYW1lXSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIFxuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IGRvYztcbiAgICBcbiIsImltcG9ydCB5b3V0dWJlIGZyb20gJ3lvdXR1YmUveW91dHViZSc7XG5pbXBvcnQgeyBjYXRlZ29yeSB9IGZyb20gJ3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkRW51bXMnO1xuaW1wb3J0IHsgQ2FyZFR5cGUsIEluaXRpYWxDYXJkRGF0YVNjaGVtYSB9IGZyb20gJy4vY2FyZFR5cGVzJztcblxuY29uc3QgZ2V0Q2FyZFR5cGUgPSAodXJsOiBzdHJpbmcpOiBDYXJkVHlwZSA9PiB7XG4gIGlmIChcbiAgICB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUuY29tJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1LmJlJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUtbm9jb29raWUuY29tJylcbiAgKSB7XG4gICAgcmV0dXJuICdZb3V0dWJlJztcbiAgfVxuXG4gIGlmICh1cmwuZW5kc1dpdGgoJy5qcGcnKSB8fCB1cmwuZW5kc1dpdGgoJy5wbmcnKSkge1xuICAgIHJldHVybiAnSW1hZ2UnO1xuICB9XG5cbiAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkZXRlY3QgYSB2YWxpZCBjYXJkIHR5cGUnKTtcbn07XG5cblxuY29uc3QgZ2V0SW5pdGlhbFlvdXR1YmVEYXRhID0gYXN5bmMgKHVybDogc3RyaW5nKTogUHJvbWlzZTxJbml0aWFsQ2FyZERhdGFTY2hlbWE+ID0+IHtcbiAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh1cmwpO1xuXG4gIHJldHVybiB7XG4gICAgY2F0ZWdvcnk6IGNhdGVnb3J5LnZpZGVvLFxuICAgIHRpdGxlOiB5b3V0dWJlVmlkZW9EYXRhLnZpZGVvVGl0bGUsXG4gICAgdXJsLFxuICAgIGNhcmREYXRhOiB7XG4gICAgICB5b3V0dWJlQ2FyZERhdGE6IHlvdXR1YmVWaWRlb0RhdGEsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRJbml0aWFsQ2FyZERhdGEgPSBhc3luYyAodXJsOiBzdHJpbmcpOiBQcm9taXNlPEluaXRpYWxDYXJkRGF0YVNjaGVtYT4gPT4ge1xuICBjb25zdCBjYXJkVHlwZSA9IGdldENhcmRUeXBlKHVybCk7XG5cbiAgaWYgKGNhcmRUeXBlID09PSAnWW91dHViZScpIHtcbiAgICBjb25zdCBpbml0aWFsWW91dHViZURhdGEgPSBhd2FpdCBnZXRJbml0aWFsWW91dHViZURhdGEodXJsKTtcbiAgICByZXR1cm4gaW5pdGlhbFlvdXR1YmVEYXRhO1xuICB9XG5cbiAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkZXRlY3QgYSB2YWxpZCBjYXJkIHR5cGUnKTtcbn07XG4iLCJpbXBvcnQgeyBnb29nbGUgfSBmcm9tICdnb29nbGVhcGlzJztcbmltcG9ydCB7IFlvdXR1YmVWaWRlb0RhdGEgfSBmcm9tICd0eXBlcy95b3V0dWJlVHlwZXMnO1xuaW1wb3J0IHsgZm9ybWF0RHVyYXRpb24sIGZvcm1hdE51bWJlciwgZm9ybWF0UHVibGlzaGVkQXQgfSBmcm9tICcuL3lvdXR1YmVVdGlscyc7XG5cbi8vIGluaXRpYWxpemVzIHRoZSBZb3V0dWJlIERhdGEgQVBJXG5jb25zdCB5b3V0dWJlID0gZ29vZ2xlLnlvdXR1YmUoe1xuICB2ZXJzaW9uOiAndjMnLFxuICBhdXRoOiBwcm9jZXNzLmVudi5HQVBJX0tFWSxcbn0pO1xuXG4vLyBSZXR1cm5zIHRoZSB0aHVtYm5haWwgZm9yIGEgcGFydGljdWxhciB5b3V0dWJlIGNoYW5uZWxcbmNvbnN0IGdldFlvdXR1YmVDaGFubmVsVGh1bWJuYWlsID0gYXN5bmMgKGNoYW5uZWxJZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjaGFubmVsRGF0YSA9IGF3YWl0IHlvdXR1YmUuY2hhbm5lbHMubGlzdCh7XG4gICAgICBwYXJ0OiAnc25pcHBldCcsXG4gICAgICBpZDogY2hhbm5lbElkLFxuICAgIH0pO1xuICAgIHJldHVybiBjaGFubmVsRGF0YS5kYXRhLml0ZW1zWzBdLnNuaXBwZXQudGh1bWJuYWlscy5tZWRpdW0udXJsO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IEVycm9yKGBFcnJvciBsb2FkaW5nIHRoZSB5b3V0dWJlIGNoYW5uZWwgdGh1bWJuYWlsOiAke2Vycm9yfWApO1xuICB9XG59O1xuXG4vLyBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNzcyODQxNy83NDYwNDY3XG5jb25zdCBnZXRZb3V0dWJlVmlkZW9JZCA9ICh1cmwpOiBzdHJpbmcgPT4ge1xuICBpZiAoXG4gICAgdXJsLmluY2x1ZGVzKCd5b3V0dWJlLmNvbScpXG4gICAgfHwgdXJsLmluY2x1ZGVzKCd5b3V0dS5iZScpXG4gICAgfHwgdXJsLmluY2x1ZGVzKCd5b3V0dWJlLW5vY29va2llLmNvbScpXG4gICkge1xuICAgIGNvbnN0IHJlZ0V4cCA9IC9eLiooPzooPzp5b3V0dVxcLmJlXFwvfHZcXC98dmlcXC98dVxcL1xcd1xcL3xlbWJlZFxcLyl8KD86KD86d2F0Y2gpP1xcP3YoPzppKT89fFxcJnYoPzppKT89KSkoW14jXFwmXFw/XSopLiovO1xuICAgIGNvbnN0IG1hdGNoID0gdXJsLm1hdGNoKHJlZ0V4cCk7XG4gICAgaWYgKG1hdGNoICYmIG1hdGNoWzFdKSB7XG4gICAgICByZXR1cm4gbWF0Y2hbMV07XG4gICAgfVxuICAgIHRocm93IEVycm9yKCdZb3VyIHlvdXR1YmUgdXJsIGlzIG5vdCB2YWxpZCcpO1xuICB9XG4gIHRocm93IEVycm9yKCdZb3UgbXVzdCBwcm92aWRlIGEgeW91dHViZSB1cmwnKTtcbn07XG5cbi8vIFJldHVybnMgYWxsIG5lY2Vzc2FyeSBpbmZvcm1hdGlvbiBhYm91dCBhIHBhcnRpY3VsYXIgeW91dHViZSB2aWRlbyBnaXZlbiBpdHMgdmlkZW8gaWRcbmNvbnN0IGdldFlvdXR1YmVWaWRlb0RhdGEgPSBhc3luYyAodXJsOiBzdHJpbmcpOiBQcm9taXNlPFlvdXR1YmVWaWRlb0RhdGE+ID0+IHtcbiAgY29uc3QgdmlkZW9JZCA9IGdldFlvdXR1YmVWaWRlb0lkKHVybCk7XG4gIHRyeSB7XG4gICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUudmlkZW9zLmxpc3Qoe1xuICAgICAgcGFydDogJ2NvbnRlbnREZXRhaWxzLHNuaXBwZXQsc3RhdGlzdGljcycsXG4gICAgICBpZDogdmlkZW9JZCxcbiAgICB9KTtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZW50RGV0YWlscyxcbiAgICAgIGlkLFxuICAgICAgc25pcHBldCxcbiAgICAgIHN0YXRpc3RpY3MsXG4gICAgfSA9IHlvdXR1YmVWaWRlb0RhdGEuZGF0YS5pdGVtc1swXTtcbiAgICBjb25zdCBjaGFubmVsVGh1bWJuYWlsID0gYXdhaXQgZ2V0WW91dHViZUNoYW5uZWxUaHVtYm5haWwoc25pcHBldC5jaGFubmVsSWQpO1xuICAgIHJldHVybiB7XG4gICAgICBjaGFubmVsVGh1bWJuYWlsLFxuICAgICAgY2hhbm5lbFRpdGxlOiBzbmlwcGV0LmNoYW5uZWxUaXRsZSxcbiAgICAgIGR1cmF0aW9uOiBmb3JtYXREdXJhdGlvbihjb250ZW50RGV0YWlscy5kdXJhdGlvbiksXG4gICAgICBsaWtlczogZm9ybWF0TnVtYmVyKHN0YXRpc3RpY3MubGlrZUNvdW50KSxcbiAgICAgIHB1Ymxpc2hlZEF0OiBmb3JtYXRQdWJsaXNoZWRBdChzbmlwcGV0LnB1Ymxpc2hlZEF0KSxcbiAgICAgIHZpZGVvSWQ6IGlkLFxuICAgICAgdmlkZW9UaHVtYm5haWw6IHNuaXBwZXQudGh1bWJuYWlscy5tZWRpdW0udXJsLFxuICAgICAgdmlkZW9UaXRsZTogc25pcHBldC50aXRsZSxcbiAgICAgIHZpZXdzOiBmb3JtYXROdW1iZXIoc3RhdGlzdGljcy52aWV3Q291bnQpLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgRXJyb3IoYEVycm9yIGdldHRpbmcgeW91dHViZSB2aWRlbyBkYXRhOiAke2Vycm9yfWApO1xuICB9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0WW91dHViZVZpZGVvRGF0YSxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9