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

/***/ "./src/schema/card/cardResolvers/cardMutations/deleteUserCard.ts":
/*!***********************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardMutations/deleteUserCard.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cardUtils/cardInfo */ "./src/schema/card/cardUtils/cardInfo.ts");


/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma, pubsub }) => {
    const userId = passport.getUserId();
    const { cardId } = args.data;
    const queryArgs = {
        where: {
            id: cardId,
            user: {
                id: userId,
            },
        },
    };
    const deleteArgs = {
        where: {
            id: cardId,
        },
    };
    // Make sure that the card that is trying to be deleted belongs to the user
    const userCard = await prisma.query.cards(queryArgs, '{ id }');
    if (userCard.length > 0) {
        const deletedCard = await prisma.mutation.deleteCard(deleteArgs, _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__["default"]);
        pubsub.publish('deletedUserCard', { deletedUserCard: deletedCard });
        return deletedCard;
    }
    throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({
        message: 'The user does not have access to delete this card',
        status: 403,
    });
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
            category: _cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["default"].video,
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

/***/ "./src/schema/card/cardResolvers/cardMutations/toggleFavoriteUserCard.ts":
/*!*******************************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardMutations/toggleFavoriteUserCard.ts ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cardUtils/cardInfo */ "./src/schema/card/cardUtils/cardInfo.ts");


/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma }) => {
    const userId = passport.getUserId();
    const { cardId } = args.data;
    const queryArgs = {
        where: {
            id: cardId,
            user: {
                id: userId,
            },
        },
    };
    // Make sure that the card that is trying to be deleted belongs to the user
    const userCard = await prisma.query.cards(queryArgs, '{ id isFavorite }');
    if (userCard.length > 0) {
        const updateArgs = {
            data: {
                isFavorite: !userCard[0].isFavorite,
            },
            where: {
                id: cardId,
            },
        };
        const updatedCard = await prisma.mutation.updateCard(updateArgs, _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__["default"]);
        return updatedCard;
    }
    throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({
        message: 'The user does not have access to delete this card',
        status: 403,
    });
});


/***/ }),

/***/ "./src/schema/card/cardResolvers/cardMutations/toggleToDoUserCard.ts":
/*!***************************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardMutations/toggleToDoUserCard.ts ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cardUtils/cardInfo */ "./src/schema/card/cardUtils/cardInfo.ts");


/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma }) => {
    const userId = passport.getUserId();
    const { cardId } = args.data;
    const queryArgs = {
        where: {
            id: cardId,
            user: {
                id: userId,
            },
        },
    };
    // Make sure that the card that is trying to be deleted belongs to the user
    const userCard = await prisma.query.cards(queryArgs, '{ id isToDo }');
    if (userCard.length > 0) {
        const updateArgs = {
            data: {
                isToDo: !userCard[0].isToDo,
            },
            where: {
                id: cardId,
            },
        };
        const updatedCard = await prisma.mutation.updateCard(updateArgs, _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_1__["default"]);
        return updatedCard;
    }
    throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({
        message: 'The user does not have access to delete this card',
        status: 403,
    });
});


/***/ }),

/***/ "./src/schema/card/cardResolvers/cardQueries/cardQueries.ts":
/*!******************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardQueries/cardQueries.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _userCards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userCards */ "./src/schema/card/cardResolvers/cardQueries/userCards.ts");
/* harmony import */ var _userCardsWithFilters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userCardsWithFilters */ "./src/schema/card/cardResolvers/cardQueries/userCardsWithFilters.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    userCards: _userCards__WEBPACK_IMPORTED_MODULE_0__["default"],
    userCardsWithFilters: _userCardsWithFilters__WEBPACK_IMPORTED_MODULE_1__["default"],
});


/***/ }),

/***/ "./src/schema/card/cardResolvers/cardQueries/userCards.ts":
/*!****************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardQueries/userCards.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma }, info) => {
    const userId = passport.getUserId();
    const finalArgs = {
        ...args,
        where: {
            user: {
                id: userId,
            },
        },
    };
    return prisma.query.cards(finalArgs, info);
});


/***/ }),

/***/ "./src/schema/card/cardResolvers/cardQueries/userCardsWithFilters.ts":
/*!***************************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardQueries/userCardsWithFilters.ts ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma, pubsub }, info) => {
    const userId = passport.getUserId();
    const finalArgs = {
        where: {
            user: {
                id: userId,
            },
        },
    };
    const { isFavorite, isToDo } = args.data;
    const filters = {};
    if (isFavorite) {
        finalArgs.where.isFavorite = isFavorite;
        filters.isFavorite = isFavorite;
    }
    if (isToDo) {
        finalArgs.where.isToDo = isToDo;
        filters.isToDo = isToDo;
    }
    const userCards = prisma.query.cards(finalArgs, info);
    pubsub.publish('filteredUserCards', { filteredUserCards: { filters, userCards } });
    return userCards;
});


/***/ }),

/***/ "./src/schema/card/cardResolvers/cardSubscriptions/cardSubscriptions.ts":
/*!******************************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardSubscriptions/cardSubscriptions.ts ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    deletedUserCard: {
        subscribe: (parent, args, { pubsub }, info) => pubsub.asyncIterator('deletedUserCard'),
    },
    userCard: {
        subscribe: (parent, args, { pubsub }, info) => pubsub.asyncIterator('userCard'),
    },
    filteredUserCards: {
        subscribe: (parent, args, { pubsub }, info) => pubsub.asyncIterator('filteredUserCards'),
    },
});


/***/ }),

/***/ "./src/schema/card/cardUtils/cardEnums.ts":
/*!************************************************!*\
  !*** ./src/schema/card/cardUtils/cardEnums.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    video: 'Video',
    youtube: 'Youtube',
});


/***/ }),

/***/ "./src/schema/card/cardUtils/cardInfo.ts":
/*!***********************************************!*\
  !*** ./src/schema/card/cardUtils/cardInfo.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (`
{
  id
  category
  isFavorite
  isToDo
  title
  type
  cardData{
    youtubeCardData{
      channelThumbnail
      channelTitle
      duration
      likes
      publishedAt
      videoId
      videoThumbnail
      videoTitle
      views
    }
  }
}
`);


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


/***/ }),

/***/ "./src/schema/rootResolvers/mutations.ts":
/*!***********************************************!*\
  !*** ./src/schema/rootResolvers/mutations.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _card_cardResolvers_cardMutations_cardMutations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../card/cardResolvers/cardMutations/cardMutations */ "./src/schema/card/cardResolvers/cardMutations/cardMutations.ts");
/* harmony import */ var _user_userResolvers_userMutations_userMutations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user/userResolvers/userMutations/userMutations */ "./src/schema/user/userResolvers/userMutations/userMutations.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    ..._card_cardResolvers_cardMutations_cardMutations__WEBPACK_IMPORTED_MODULE_0__["default"],
    ..._user_userResolvers_userMutations_userMutations__WEBPACK_IMPORTED_MODULE_1__["default"],
});


/***/ }),

/***/ "./src/schema/rootResolvers/queries.ts":
/*!*********************************************!*\
  !*** ./src/schema/rootResolvers/queries.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _card_cardResolvers_cardQueries_cardQueries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../card/cardResolvers/cardQueries/cardQueries */ "./src/schema/card/cardResolvers/cardQueries/cardQueries.ts");
/* harmony import */ var _user_userResolvers_userQueries_userQueries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user/userResolvers/userQueries/userQueries */ "./src/schema/user/userResolvers/userQueries/userQueries.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    ..._card_cardResolvers_cardQueries_cardQueries__WEBPACK_IMPORTED_MODULE_0__["default"],
    ..._user_userResolvers_userQueries_userQueries__WEBPACK_IMPORTED_MODULE_1__["default"],
});


/***/ }),

/***/ "./src/schema/rootResolvers/rootResolvers.ts":
/*!***************************************************!*\
  !*** ./src/schema/rootResolvers/rootResolvers.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mutations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mutations */ "./src/schema/rootResolvers/mutations.ts");
/* harmony import */ var _queries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./queries */ "./src/schema/rootResolvers/queries.ts");
/* harmony import */ var _subscriptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subscriptions */ "./src/schema/rootResolvers/subscriptions.ts");



/* harmony default export */ __webpack_exports__["default"] = ({
    Mutation: {
        ..._mutations__WEBPACK_IMPORTED_MODULE_0__["default"],
    },
    Query: {
        ..._queries__WEBPACK_IMPORTED_MODULE_1__["default"],
    },
    Subscription: {
        ..._subscriptions__WEBPACK_IMPORTED_MODULE_2__["default"],
    },
    Node: {
        __resolveType() {
            return null;
        },
    },
});


/***/ }),

/***/ "./src/schema/rootResolvers/subscriptions.ts":
/*!***************************************************!*\
  !*** ./src/schema/rootResolvers/subscriptions.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _card_cardResolvers_cardSubscriptions_cardSubscriptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../card/cardResolvers/cardSubscriptions/cardSubscriptions */ "./src/schema/card/cardResolvers/cardSubscriptions/cardSubscriptions.ts");

/* harmony default export */ __webpack_exports__["default"] = ({
    ..._card_cardResolvers_cardSubscriptions_cardSubscriptions__WEBPACK_IMPORTED_MODULE_0__["default"],
});


/***/ }),

/***/ "./src/schema/user/userResolvers/userMutations/createUser.ts":
/*!*******************************************************************!*\
  !*** ./src/schema/user/userResolvers/userMutations/createUser.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../userUtils/userUtils */ "./src/schema/user/userUtils/userUtils.ts");


/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport, prisma }, info) => {
    try {
        const password = await Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["hashPassword"])(args.data.password);
        const finalArgs = {
            ...args,
            data: {
                ...args.data,
                password,
            },
        };
        const user = await prisma.mutation.createUser(finalArgs, info);
        passport.login({ authenticateOptions: args.data, user });
        return Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["restrictUserData"])(user);
    }
    catch (error) {
        if (error.message.includes('unique constraint')) {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: 'duplicate user', status: 400 });
        }
        if (error.message === 'password is weak') {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: error.message, status: 400 });
        }
    }
});


/***/ }),

/***/ "./src/schema/user/userResolvers/userMutations/loginUser.ts":
/*!******************************************************************!*\
  !*** ./src/schema/user/userResolvers/userMutations/loginUser.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../userUtils/userUtils */ "./src/schema/user/userUtils/userUtils.ts");


/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport }) => {
    try {
        const { user } = await passport.authenticate({
            authenticateOptions: args.data,
            strategyName: 'local',
        });
        passport.login({ authenticateOptions: args.data, user });
        return Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__["restrictUserData"])(user);
    }
    catch (error) {
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: 'Unable to login', status: 401 });
    }
});


/***/ }),

/***/ "./src/schema/user/userResolvers/userMutations/userMutations.ts":
/*!**********************************************************************!*\
  !*** ./src/schema/user/userResolvers/userMutations/userMutations.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createUser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createUser */ "./src/schema/user/userResolvers/userMutations/createUser.ts");
/* harmony import */ var _loginUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loginUser */ "./src/schema/user/userResolvers/userMutations/loginUser.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    createUser: _createUser__WEBPACK_IMPORTED_MODULE_0__["default"],
    loginUser: _loginUser__WEBPACK_IMPORTED_MODULE_1__["default"],
});


/***/ }),

/***/ "./src/schema/user/userResolvers/userQueries/isAuthenticated.ts":
/*!**********************************************************************!*\
  !*** ./src/schema/user/userResolvers/userQueries/isAuthenticated.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport }) => passport.isAuthenticated());


/***/ }),

/***/ "./src/schema/user/userResolvers/userQueries/logoutUser.ts":
/*!*****************************************************************!*\
  !*** ./src/schema/user/userResolvers/userQueries/logoutUser.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { passport }) => passport.logout());


/***/ }),

/***/ "./src/schema/user/userResolvers/userQueries/userQueries.ts":
/*!******************************************************************!*\
  !*** ./src/schema/user/userResolvers/userQueries/userQueries.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isAuthenticated__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isAuthenticated */ "./src/schema/user/userResolvers/userQueries/isAuthenticated.ts");
/* harmony import */ var _logoutUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logoutUser */ "./src/schema/user/userResolvers/userQueries/logoutUser.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users */ "./src/schema/user/userResolvers/userQueries/users.ts");



/* harmony default export */ __webpack_exports__["default"] = ({
    isAuthenticated: _isAuthenticated__WEBPACK_IMPORTED_MODULE_0__["default"],
    logoutUser: _logoutUser__WEBPACK_IMPORTED_MODULE_1__["default"],
    users: _users__WEBPACK_IMPORTED_MODULE_2__["default"],
});


/***/ }),

/***/ "./src/schema/user/userResolvers/userQueries/users.ts":
/*!************************************************************!*\
  !*** ./src/schema/user/userResolvers/userQueries/users.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _userUtils_userUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../userUtils/userUtils */ "./src/schema/user/userUtils/userUtils.ts");

/* harmony default export */ __webpack_exports__["default"] = (async (parent, args, { prisma }, info) => {
    const finalArgs = {
        ...args,
        where: {
            ...args.where,
        },
    };
    if (args && args.where && args.where.email) {
        delete finalArgs.where.email;
    }
    const users = await prisma.query.users(finalArgs, info);
    return users.map(async (user) => Object(_userUtils_userUtils__WEBPACK_IMPORTED_MODULE_0__["restrictUserData"])(user));
});


/***/ }),

/***/ "./src/schema/user/userUtils/userUtils.ts":
/*!************************************************!*\
  !*** ./src/schema/user/userUtils/userUtils.ts ***!
  \************************************************/
/*! exports provided: restrictUserData, hashPassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "restrictUserData", function() { return restrictUserData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hashPassword", function() { return hashPassword; });
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);

const restrictUserData = (user) => ({
    ...user,
    email: 'null',
    password: 'null',
});
const testPasswordStrength = (password) => {
    const passwordArray = password.split('');
    const specialCharacters = ['!', '@', '#', '$', '&', '*', '-'];
    const isUpperCase = (string) => /^[A-Z]*$/.test(string);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacters = passwordArray.some((i) => specialCharacters.includes(i));
    const hasUpperCase = passwordArray.some((i) => isUpperCase(i));
    const isLongEnough = password.length > 7;
    const isPasswordStrong = hasNumber && hasSpecialCharacters && hasUpperCase && isLongEnough;
    if (!isPasswordStrong) {
        throw new Error('password is weak');
    }
};
const hashPassword = (password) => {
    testPasswordStrength(password);
    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default.a.hash(password, 10);
};


/***/ }),

/***/ "./src/server/serverError.ts":
/*!***********************************!*\
  !*** ./src/server/serverError.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class ServerError extends Error {
    constructor(error) {
        super();
        this.message = error.message;
        this.status = error.status;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ServerError);


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
// Returns all necessary information about a particular youtube video given its video id
const getYoutubeVideoData = async (videoId) => {
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


/***/ }),

/***/ "./src/thirdParty/youtube/youtubeUtils.ts":
/*!************************************************!*\
  !*** ./src/thirdParty/youtube/youtubeUtils.ts ***!
  \************************************************/
/*! exports provided: formatDuration, formatNumber, formatPublishedAt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDuration", function() { return formatDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatNumber", function() { return formatNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatPublishedAt", function() { return formatPublishedAt; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var numeral__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! numeral */ "numeral");
/* harmony import */ var numeral__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(numeral__WEBPACK_IMPORTED_MODULE_1__);


// Prefixes an integer with 0 if less than 10
const formatInt = (int) => {
    if (int < 10) {
        return `0${int}`;
    }
    return `${int}`;
};
// Creates a consistent time string format
const formatDuration = (time) => {
    const seconds = moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(time).seconds();
    const minutes = moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(time).minutes();
    const hours = moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(time).hours();
    if (hours > 0) {
        return `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`;
    }
    if (minutes > 0) {
        return `${formatInt(minutes)}:${formatInt(seconds)}`;
    }
    return `00:${formatInt(seconds)}`;
};
// Formats a number to the best approximation
const formatNumber = (number) => {
    if (Number(number) > 999999) {
        return numeral__WEBPACK_IMPORTED_MODULE_1___default()(number).format('0.0a');
    }
    return numeral__WEBPACK_IMPORTED_MODULE_1___default()(number).format('0,0');
};
// Formats the date and time a video was published at
const formatPublishedAt = (date) => {
    moment__WEBPACK_IMPORTED_MODULE_0___default.a.updateLocale('en', {
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            ss: '%d seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: '1h',
            hh: '%dh',
            d: '1d',
            dd: '%dd',
            M: '1m',
            MM: '%dm',
            y: '1y',
            yy: '%dy',
        },
    });
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).fromNow();
};


/***/ }),

/***/ "googleapis":
/*!*****************************!*\
  !*** external "googleapis" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("googleapis");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "numeral":
/*!**************************!*\
  !*** external "numeral" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("numeral");

/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NhcmRNdXRhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZE11dGF0aW9ucy9jcmVhdGVVc2VyQ2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2RlbGV0ZVVzZXJDYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvY2FyZC9jYXJkUmVzb2x2ZXJzL2NhcmRNdXRhdGlvbnMvaW5pdGlhdGVVc2VyQ2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL3RvZ2dsZUZhdm9yaXRlVXNlckNhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZE11dGF0aW9ucy90b2dnbGVUb0RvVXNlckNhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZFF1ZXJpZXMvY2FyZFF1ZXJpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZFF1ZXJpZXMvdXNlckNhcmRzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvY2FyZC9jYXJkUmVzb2x2ZXJzL2NhcmRRdWVyaWVzL3VzZXJDYXJkc1dpdGhGaWx0ZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvY2FyZC9jYXJkUmVzb2x2ZXJzL2NhcmRTdWJzY3JpcHRpb25zL2NhcmRTdWJzY3JpcHRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvY2FyZC9jYXJkVXRpbHMvY2FyZEVudW1zLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvY2FyZC9jYXJkVXRpbHMvY2FyZEluZm8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9yb290UmVzb2x2ZXJzL211dGF0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3Jvb3RSZXNvbHZlcnMvcXVlcmllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3Jvb3RSZXNvbHZlcnMvcm9vdFJlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3Jvb3RSZXNvbHZlcnMvc3Vic2NyaXB0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyTXV0YXRpb25zL2NyZWF0ZVVzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS91c2VyL3VzZXJSZXNvbHZlcnMvdXNlck11dGF0aW9ucy9sb2dpblVzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS91c2VyL3VzZXJSZXNvbHZlcnMvdXNlck11dGF0aW9ucy91c2VyTXV0YXRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvdXNlci91c2VyUmVzb2x2ZXJzL3VzZXJRdWVyaWVzL2lzQXV0aGVudGljYXRlZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyUXVlcmllcy9sb2dvdXRVc2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvdXNlci91c2VyUmVzb2x2ZXJzL3VzZXJRdWVyaWVzL3VzZXJRdWVyaWVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvdXNlci91c2VyUmVzb2x2ZXJzL3VzZXJRdWVyaWVzL3VzZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvdXNlci91c2VyVXRpbHMvdXNlclV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvc2VydmVyRXJyb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RoaXJkUGFydHkveW91dHViZS95b3V0dWJlLnRzIiwid2VicGFjazovLy8uL3NyYy90aGlyZFBhcnR5L3lvdXR1YmUveW91dHViZVV0aWxzLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImdvb2dsZWFwaXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJudW1lcmFsXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDQTtBQUNJO0FBQ1k7QUFDUjtBQUV2QztJQUNiLHVFQUFjO0lBQ2QsdUVBQWM7SUFDZCwyRUFBZ0I7SUFDaEIsdUZBQXNCO0lBQ3RCLCtFQUFrQjtDQUNuQixFQUFDOzs7Ozs7Ozs7Ozs7O0FDWkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QztBQUNQO0FBQ1U7QUFDMkI7QUFFNUQsb0VBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQ2xFLElBQUk7UUFDRixNQUFNLEVBQ0osUUFBUSxFQUNSLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLEdBQUcsR0FDSixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFZCxNQUFNLElBQUksR0FBRyx3RUFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwQyxJQUFJLFVBQWtCLENBQUM7UUFFdkIsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3RCLE1BQU0sT0FBTyxHQUFHLDhFQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSx1REFBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BFLFVBQVUsR0FBRztnQkFDWCxlQUFlLEVBQUU7b0JBQ2Ys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TztZQUNmLElBQUksRUFBRSxRQUFRO1lBQ2QsQ0FBQyxFQUFFLGVBQWU7WUFDbEIsRUFBRSxFQUFFLFlBQVk7WUFDaEIsQ0FBQyxFQUFFLFVBQVU7WUFDYixFQUFFLEVBQUUsWUFBWTtZQUNoQixDQUFDLEVBQUUsSUFBSTtZQUNQLEVBQUUsRUFBRSxLQUFLO1lBQ1QsQ0FBQyxFQUFFLElBQUk7WUFDUCxFQUFFLEVBQUUsS0FBSztZQUNULENBQUMsRUFBRSxJQUFJO1lBQ1AsRUFBRSxFQUFFLEtBQUs7WUFDVCxDQUFDLEVBQUUsSUFBSTtZQUNQLEVBQUUsRUFBRSxLQUFLO1NBQ1Y7S0FDRixDQUFDLENBQUM7SUFDSCxPQUFPLDZDQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUN0REYsdUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsb0MiLCJmaWxlIjoibWFpbi4wNmQyZWEyOTUxYjM4M2RiMDJjNC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZVVzZXJDYXJkIGZyb20gJy4vY3JlYXRlVXNlckNhcmQnO1xuaW1wb3J0IGRlbGV0ZVVzZXJDYXJkIGZyb20gJy4vZGVsZXRlVXNlckNhcmQnO1xuaW1wb3J0IGluaXRpYXRlVXNlckNhcmQgZnJvbSAnLi9pbml0aWF0ZVVzZXJDYXJkJztcbmltcG9ydCB0b2dnbGVGYXZvcml0ZVVzZXJDYXJkIGZyb20gJy4vdG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZCc7XG5pbXBvcnQgdG9nZ2xlVG9Eb1VzZXJDYXJkIGZyb20gJy4vdG9nZ2xlVG9Eb1VzZXJDYXJkJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjcmVhdGVVc2VyQ2FyZCxcbiAgZGVsZXRlVXNlckNhcmQsXG4gIGluaXRpYXRlVXNlckNhcmQsXG4gIHRvZ2dsZUZhdm9yaXRlVXNlckNhcmQsXG4gIHRvZ2dsZVRvRG9Vc2VyQ2FyZCxcbn07XG4iLCJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCB5b3V0dWJlIGZyb20gJ3lvdXR1YmUveW91dHViZSc7XG5pbXBvcnQgY2FyZEluZm8gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRJbmZvJztcbmltcG9ydCB7IGdldENhcmRUeXBlLCBnZXRZb3V0dWJlVmlkZW9JZCB9IGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qge1xuICAgICAgY2F0ZWdvcnksXG4gICAgICBpc0Zhdm9yaXRlLFxuICAgICAgaXNUb0RvLFxuICAgICAgdGl0bGUsXG4gICAgICB1cmwsXG4gICAgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IHR5cGUgPSBnZXRDYXJkVHlwZSh1cmwpO1xuXG4gICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gICAgbGV0IGNyZWF0ZUFyZ3M6IG9iamVjdDtcblxuICAgIGlmICh0eXBlID09PSAnWW91dHViZScpIHtcbiAgICAgIGNvbnN0IHZpZGVvSWQgPSBnZXRZb3V0dWJlVmlkZW9JZCh1cmwpO1xuICAgICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh2aWRlb0lkKTtcbiAgICAgIGNyZWF0ZUFyZ3MgPSB7XG4gICAgICAgIHlvdXR1YmVDYXJkRGF0YToge1xuICAgICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgICAgLi4ueW91dHViZVZpZGVvRGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNhcmQgdHlwZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbmFsQXJncyA9IHtcbiAgICAgIC4uLmFyZ3MsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGNhcmREYXRhOiB7XG4gICAgICAgICAgY3JlYXRlOiB7IC4uLmNyZWF0ZUFyZ3MgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgIGlzRmF2b3JpdGUsXG4gICAgICAgIGlzVG9EbyxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBjb25uZWN0OiB7XG4gICAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBjYXJkID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLmNyZWF0ZUNhcmQoZmluYWxBcmdzLCBjYXJkSW5mbyk7XG4gICAgcHVic3ViLnB1Ymxpc2goJ3VzZXJDYXJkJywgeyB1c2VyQ2FyZDogY2FyZCB9KTtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgfVxufTtcbiIsImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IGNhcmRJbmZvIGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkSW5mbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSwgcHVic3ViIH0pID0+IHtcbiAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gIGNvbnN0IHsgY2FyZElkIH0gPSBhcmdzLmRhdGE7XG5cbiAgY29uc3QgcXVlcnlBcmdzID0ge1xuICAgIHdoZXJlOiB7XG4gICAgICBpZDogY2FyZElkLFxuICAgICAgdXNlcjoge1xuICAgICAgICBpZDogdXNlcklkLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZUFyZ3MgPSB7XG4gICAgd2hlcmU6IHtcbiAgICAgIGlkOiBjYXJkSWQsXG4gICAgfSxcbiAgfTtcblxuICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgY2FyZCB0aGF0IGlzIHRyeWluZyB0byBiZSBkZWxldGVkIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgY29uc3QgdXNlckNhcmQgPSBhd2FpdCBwcmlzbWEucXVlcnkuY2FyZHMocXVlcnlBcmdzLCAneyBpZCB9Jyk7XG5cbiAgaWYgKHVzZXJDYXJkLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBkZWxldGVkQ2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5kZWxldGVDYXJkKGRlbGV0ZUFyZ3MsIGNhcmRJbmZvKTtcbiAgICBwdWJzdWIucHVibGlzaCgnZGVsZXRlZFVzZXJDYXJkJywgeyBkZWxldGVkVXNlckNhcmQ6IGRlbGV0ZWRDYXJkIH0pO1xuICAgIHJldHVybiBkZWxldGVkQ2FyZDtcbiAgfVxuXG4gIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7XG4gICAgbWVzc2FnZTogJ1RoZSB1c2VyIGRvZXMgbm90IGhhdmUgYWNjZXNzIHRvIGRlbGV0ZSB0aGlzIGNhcmQnLFxuICAgIHN0YXR1czogNDAzLFxuICB9KTtcbn07XG4iLCJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCB5b3V0dWJlIGZyb20gJ3lvdXR1YmUveW91dHViZSc7XG5pbXBvcnQgY2FyZEVudW1zIGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkRW51bXMnO1xuaW1wb3J0IHsgZ2V0WW91dHViZVZpZGVvSWQgfSBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZFV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHZpZGVvSWQgPSBnZXRZb3V0dWJlVmlkZW9JZChhcmdzLmRhdGEudXJsKTtcbiAgICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKHZpZGVvSWQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNhdGVnb3J5OiBjYXJkRW51bXMudmlkZW8sXG4gICAgICB0aXRsZTogeW91dHViZVZpZGVvRGF0YS52aWRlb1RpdGxlLFxuICAgICAgdXJsOiBhcmdzLmRhdGEudXJsLFxuICAgICAgeW91dHViZUNhcmREYXRhOiB5b3V0dWJlVmlkZW9EYXRhLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCBjYXJkSW5mbyBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZEluZm8nO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEgfSkgPT4ge1xuICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgY29uc3QgeyBjYXJkSWQgfSA9IGFyZ3MuZGF0YTtcblxuICBjb25zdCBxdWVyeUFyZ3MgPSB7XG4gICAgd2hlcmU6IHtcbiAgICAgIGlkOiBjYXJkSWQsXG4gICAgICB1c2VyOiB7XG4gICAgICAgIGlkOiB1c2VySWQsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGNhcmQgdGhhdCBpcyB0cnlpbmcgdG8gYmUgZGVsZXRlZCBiZWxvbmdzIHRvIHRoZSB1c2VyXG4gIGNvbnN0IHVzZXJDYXJkID0gYXdhaXQgcHJpc21hLnF1ZXJ5LmNhcmRzKHF1ZXJ5QXJncywgJ3sgaWQgaXNGYXZvcml0ZSB9Jyk7XG5cbiAgaWYgKHVzZXJDYXJkLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB1cGRhdGVBcmdzID0ge1xuICAgICAgZGF0YToge1xuICAgICAgICBpc0Zhdm9yaXRlOiAhdXNlckNhcmRbMF0uaXNGYXZvcml0ZSxcbiAgICAgIH0sXG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogY2FyZElkLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgdXBkYXRlZENhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24udXBkYXRlQ2FyZCh1cGRhdGVBcmdzLCBjYXJkSW5mbyk7XG4gICAgcmV0dXJuIHVwZGF0ZWRDYXJkO1xuICB9XG5cbiAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHtcbiAgICBtZXNzYWdlOiAnVGhlIHVzZXIgZG9lcyBub3QgaGF2ZSBhY2Nlc3MgdG8gZGVsZXRlIHRoaXMgY2FyZCcsXG4gICAgc3RhdHVzOiA0MDMsXG4gIH0pO1xufTtcbiIsImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IGNhcmRJbmZvIGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkSW5mbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSB9KSA9PiB7XG4gIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICBjb25zdCB7IGNhcmRJZCB9ID0gYXJncy5kYXRhO1xuXG4gIGNvbnN0IHF1ZXJ5QXJncyA9IHtcbiAgICB3aGVyZToge1xuICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgY2FyZCB0aGF0IGlzIHRyeWluZyB0byBiZSBkZWxldGVkIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgY29uc3QgdXNlckNhcmQgPSBhd2FpdCBwcmlzbWEucXVlcnkuY2FyZHMocXVlcnlBcmdzLCAneyBpZCBpc1RvRG8gfScpO1xuXG4gIGlmICh1c2VyQ2FyZC5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgdXBkYXRlQXJncyA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgaXNUb0RvOiAhdXNlckNhcmRbMF0uaXNUb0RvLFxuICAgICAgfSxcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVkQ2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi51cGRhdGVDYXJkKHVwZGF0ZUFyZ3MsIGNhcmRJbmZvKTtcbiAgICByZXR1cm4gdXBkYXRlZENhcmQ7XG4gIH1cblxuICB0aHJvdyBuZXcgU2VydmVyRXJyb3Ioe1xuICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdGhpcyBjYXJkJyxcbiAgICBzdGF0dXM6IDQwMyxcbiAgfSk7XG59O1xuIiwiaW1wb3J0IHVzZXJDYXJkcyBmcm9tICcuL3VzZXJDYXJkcyc7XG5pbXBvcnQgdXNlckNhcmRzV2l0aEZpbHRlcnMgZnJvbSAnLi91c2VyQ2FyZHNXaXRoRmlsdGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdXNlckNhcmRzLFxuICB1c2VyQ2FyZHNXaXRoRmlsdGVycyxcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEgfSwgaW5mbykgPT4ge1xuICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcblxuICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgLi4uYXJncyxcbiAgICB3aGVyZToge1xuICAgICAgdXNlcjoge1xuICAgICAgICBpZDogdXNlcklkLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuICByZXR1cm4gcHJpc21hLnF1ZXJ5LmNhcmRzKGZpbmFsQXJncywgaW5mbyk7XG59O1xuIiwiaW1wb3J0IHsgQ2FyZFF1ZXJ5QXJncywgRmlsdGVycyB9IGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkVHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9LCBpbmZvKSA9PiB7XG4gIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuXG4gIGNvbnN0IGZpbmFsQXJnczogQ2FyZFF1ZXJ5QXJncyA9IHtcbiAgICB3aGVyZToge1xuICAgICAgdXNlcjoge1xuICAgICAgICBpZDogdXNlcklkLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IHsgaXNGYXZvcml0ZSwgaXNUb0RvIH0gPSBhcmdzLmRhdGE7XG5cbiAgY29uc3QgZmlsdGVyczogRmlsdGVycyA9IHt9O1xuICBpZiAoaXNGYXZvcml0ZSkge1xuICAgIGZpbmFsQXJncy53aGVyZS5pc0Zhdm9yaXRlID0gaXNGYXZvcml0ZTtcbiAgICBmaWx0ZXJzLmlzRmF2b3JpdGUgPSBpc0Zhdm9yaXRlO1xuICB9XG5cbiAgaWYgKGlzVG9Ebykge1xuICAgIGZpbmFsQXJncy53aGVyZS5pc1RvRG8gPSBpc1RvRG87XG4gICAgZmlsdGVycy5pc1RvRG8gPSBpc1RvRG87XG4gIH1cblxuICBjb25zdCB1c2VyQ2FyZHMgPSBwcmlzbWEucXVlcnkuY2FyZHMoZmluYWxBcmdzLCBpbmZvKTtcbiAgcHVic3ViLnB1Ymxpc2goJ2ZpbHRlcmVkVXNlckNhcmRzJywgeyBmaWx0ZXJlZFVzZXJDYXJkczogeyBmaWx0ZXJzLCB1c2VyQ2FyZHMgfSB9KTtcbiAgcmV0dXJuIHVzZXJDYXJkcztcbn07XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGRlbGV0ZWRVc2VyQ2FyZDoge1xuICAgIHN1YnNjcmliZTogKHBhcmVudCwgYXJncywgeyBwdWJzdWIgfSwgaW5mbykgPT4gcHVic3ViLmFzeW5jSXRlcmF0b3IoJ2RlbGV0ZWRVc2VyQ2FyZCcpLFxuICB9LFxuICB1c2VyQ2FyZDoge1xuICAgIHN1YnNjcmliZTogKHBhcmVudCwgYXJncywgeyBwdWJzdWIgfSwgaW5mbykgPT4gcHVic3ViLmFzeW5jSXRlcmF0b3IoJ3VzZXJDYXJkJyksXG4gIH0sXG4gIGZpbHRlcmVkVXNlckNhcmRzOiB7XG4gICAgc3Vic2NyaWJlOiAocGFyZW50LCBhcmdzLCB7IHB1YnN1YiB9LCBpbmZvKSA9PiBwdWJzdWIuYXN5bmNJdGVyYXRvcignZmlsdGVyZWRVc2VyQ2FyZHMnKSxcbiAgfSxcbn07XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIHZpZGVvOiAnVmlkZW8nLFxuICB5b3V0dWJlOiAnWW91dHViZScsXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgYFxue1xuICBpZFxuICBjYXRlZ29yeVxuICBpc0Zhdm9yaXRlXG4gIGlzVG9Eb1xuICB0aXRsZVxuICB0eXBlXG4gIGNhcmREYXRhe1xuICAgIHlvdXR1YmVDYXJkRGF0YXtcbiAgICAgIGNoYW5uZWxUaHVtYm5haWxcbiAgICAgIGNoYW5uZWxUaXRsZVxuICAgICAgZHVyYXRpb25cbiAgICAgIGxpa2VzXG4gICAgICBwdWJsaXNoZWRBdFxuICAgICAgdmlkZW9JZFxuICAgICAgdmlkZW9UaHVtYm5haWxcbiAgICAgIHZpZGVvVGl0bGVcbiAgICAgIHZpZXdzXG4gICAgfVxuICB9XG59XG5gO1xuIiwiaW1wb3J0IHsgQ2FyZFR5cGUgfSBmcm9tICcuL2NhcmRUeXBlcyc7XG5cbmV4cG9ydCBjb25zdCBnZXRDYXJkVHlwZSA9ICh1cmw6IHN0cmluZyk6IENhcmRUeXBlID0+IHtcbiAgaWYgKFxuICAgIHVybC5pbmNsdWRlcygneW91dHViZS5jb20nKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHUuYmUnKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHViZS1ub2Nvb2tpZS5jb20nKVxuICApIHtcbiAgICByZXR1cm4gJ1lvdXR1YmUnO1xuICB9XG5cbiAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkZXRlY3QgYSB2YWxpZCBjYXJkIHR5cGUnKTtcbn07XG5cbi8vIHNvdXJjZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI3NzI4NDE3Lzc0NjA0NjdcbmV4cG9ydCBjb25zdCBnZXRZb3V0dWJlVmlkZW9JZCA9ICh1cmwpOiBzdHJpbmcgPT4ge1xuICBpZiAoXG4gICAgdXJsLmluY2x1ZGVzKCd5b3V0dWJlLmNvbScpXG4gICAgfHwgdXJsLmluY2x1ZGVzKCd5b3V0dS5iZScpXG4gICAgfHwgdXJsLmluY2x1ZGVzKCd5b3V0dWJlLW5vY29va2llLmNvbScpXG4gICkge1xuICAgIGNvbnN0IHJlZ0V4cCA9IC9eLiooPzooPzp5b3V0dVxcLmJlXFwvfHZcXC98dmlcXC98dVxcL1xcd1xcL3xlbWJlZFxcLyl8KD86KD86d2F0Y2gpP1xcP3YoPzppKT89fFxcJnYoPzppKT89KSkoW14jXFwmXFw/XSopLiovO1xuICAgIGNvbnN0IG1hdGNoID0gdXJsLm1hdGNoKHJlZ0V4cCk7XG4gICAgaWYgKG1hdGNoICYmIG1hdGNoWzFdKSB7XG4gICAgICByZXR1cm4gbWF0Y2hbMV07XG4gICAgfVxuICAgIHRocm93IEVycm9yKCdZb3VyIHlvdXR1YmUgdXJsIGlzIG5vdCB2YWxpZCcpO1xuICB9XG4gIHRocm93IEVycm9yKCdZb3UgbXVzdCBwcm92aWRlIGEgeW91dHViZSB1cmwnKTtcbn07XG5cbiIsImltcG9ydCBjYXJkTXV0YXRpb25zIGZyb20gJy4uL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NhcmRNdXRhdGlvbnMnO1xuaW1wb3J0IHVzZXJNdXRhdGlvbnMgZnJvbSAnLi4vdXNlci91c2VyUmVzb2x2ZXJzL3VzZXJNdXRhdGlvbnMvdXNlck11dGF0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4uY2FyZE11dGF0aW9ucyxcbiAgLi4udXNlck11dGF0aW9ucyxcbn07XG4iLCJpbXBvcnQgY2FyZFF1ZXJpZXMgZnJvbSAnLi4vY2FyZC9jYXJkUmVzb2x2ZXJzL2NhcmRRdWVyaWVzL2NhcmRRdWVyaWVzJztcbmltcG9ydCB1c2VyUXVlcmllcyBmcm9tICcuLi91c2VyL3VzZXJSZXNvbHZlcnMvdXNlclF1ZXJpZXMvdXNlclF1ZXJpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC4uLmNhcmRRdWVyaWVzLFxuICAuLi51c2VyUXVlcmllcyxcbn07XG4iLCJpbXBvcnQgbXV0YXRpb25zIGZyb20gJy4vbXV0YXRpb25zJztcbmltcG9ydCBxdWVyaWVzIGZyb20gJy4vcXVlcmllcyc7XG5pbXBvcnQgc3Vic2NyaXB0aW9ucyBmcm9tICcuL3N1YnNjcmlwdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIE11dGF0aW9uOiB7XG4gICAgLi4ubXV0YXRpb25zLFxuICB9LFxuICBRdWVyeToge1xuICAgIC4uLnF1ZXJpZXMsXG4gIH0sXG4gIFN1YnNjcmlwdGlvbjoge1xuICAgIC4uLnN1YnNjcmlwdGlvbnMsXG4gIH0sXG4gIE5vZGU6IHtcbiAgICBfX3Jlc29sdmVUeXBlKCkgeyAvLyBodHRwczovL2dpdGh1Yi5jb20vYXBvbGxvZ3JhcGhxbC9hcG9sbG8tc2VydmVyL2lzc3Vlcy8xMDc1XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICB9LFxufTtcbiIsImltcG9ydCBjYXJkU3Vic2NyaXB0aW9ucyBmcm9tICcuLi9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZFN1YnNjcmlwdGlvbnMvY2FyZFN1YnNjcmlwdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC4uLmNhcmRTdWJzY3JpcHRpb25zLFxufTtcbiIsImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHsgaGFzaFBhc3N3b3JkLCByZXN0cmljdFVzZXJEYXRhIH0gZnJvbSAnLi4vLi4vdXNlclV0aWxzL3VzZXJVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSB9LCBpbmZvKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQoYXJncy5kYXRhLnBhc3N3b3JkKTtcbiAgICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgICAuLi5hcmdzLFxuICAgICAgZGF0YToge1xuICAgICAgICAuLi5hcmdzLmRhdGEsXG4gICAgICAgIHBhc3N3b3JkLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5jcmVhdGVVc2VyKGZpbmFsQXJncywgaW5mbyk7XG5cbiAgICBwYXNzcG9ydC5sb2dpbih7IGF1dGhlbnRpY2F0ZU9wdGlvbnM6IGFyZ3MuZGF0YSwgdXNlciB9KTtcblxuICAgIHJldHVybiByZXN0cmljdFVzZXJEYXRhKHVzZXIpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChlcnJvci5tZXNzYWdlLmluY2x1ZGVzKCd1bmlxdWUgY29uc3RyYWludCcpKSB7XG4gICAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiAnZHVwbGljYXRlIHVzZXInLCBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gICAgaWYgKGVycm9yLm1lc3NhZ2UgPT09ICdwYXNzd29yZCBpcyB3ZWFrJykge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeyByZXN0cmljdFVzZXJEYXRhIH0gZnJvbSAnLi4vLi4vdXNlclV0aWxzL3VzZXJVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQgfSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXNlciB9ID0gYXdhaXQgcGFzc3BvcnQuYXV0aGVudGljYXRlKHtcbiAgICAgIGF1dGhlbnRpY2F0ZU9wdGlvbnM6IGFyZ3MuZGF0YSxcbiAgICAgIHN0cmF0ZWd5TmFtZTogJ2xvY2FsJyxcbiAgICB9KTtcblxuICAgIHBhc3Nwb3J0LmxvZ2luKHsgYXV0aGVudGljYXRlT3B0aW9uczogYXJncy5kYXRhLCB1c2VyIH0pO1xuXG4gICAgcmV0dXJuIHJlc3RyaWN0VXNlckRhdGEodXNlcik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogJ1VuYWJsZSB0byBsb2dpbicsIHN0YXR1czogNDAxIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IGNyZWF0ZVVzZXIgZnJvbSAnLi9jcmVhdGVVc2VyJztcbmltcG9ydCBsb2dpblVzZXIgZnJvbSAnLi9sb2dpblVzZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVVzZXIsXG4gIGxvZ2luVXNlcixcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0IH0pID0+IHBhc3Nwb3J0LmlzQXV0aGVudGljYXRlZCgpO1xuIiwiZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCB9KSA9PiBwYXNzcG9ydC5sb2dvdXQoKTtcbiIsImltcG9ydCBpc0F1dGhlbnRpY2F0ZWQgZnJvbSAnLi9pc0F1dGhlbnRpY2F0ZWQnO1xuaW1wb3J0IGxvZ291dFVzZXIgZnJvbSAnLi9sb2dvdXRVc2VyJztcbmltcG9ydCB1c2VycyBmcm9tICcuL3VzZXJzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0F1dGhlbnRpY2F0ZWQsXG4gIGxvZ291dFVzZXIsXG4gIHVzZXJzLFxufTtcbiIsImltcG9ydCB7IHJlc3RyaWN0VXNlckRhdGEgfSBmcm9tICcuLi8uLi91c2VyVXRpbHMvdXNlclV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBhcmVudCwgYXJncywgeyBwcmlzbWEgfSwgaW5mbykgPT4ge1xuICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgLi4uYXJncyxcbiAgICB3aGVyZToge1xuICAgICAgLi4uYXJncy53aGVyZSxcbiAgICB9LFxuICB9O1xuICBpZiAoYXJncyAmJiBhcmdzLndoZXJlICYmIGFyZ3Mud2hlcmUuZW1haWwpIHtcbiAgICBkZWxldGUgZmluYWxBcmdzLndoZXJlLmVtYWlsO1xuICB9XG5cbiAgY29uc3QgdXNlcnMgPSBhd2FpdCBwcmlzbWEucXVlcnkudXNlcnMoZmluYWxBcmdzLCBpbmZvKTtcblxuICByZXR1cm4gdXNlcnMubWFwKGFzeW5jICh1c2VyKSA9PiByZXN0cmljdFVzZXJEYXRhKHVzZXIpKTtcbn07XG4iLCJpbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXJUeXBlcyc7XG5cbmV4cG9ydCBjb25zdCByZXN0cmljdFVzZXJEYXRhID0gKHVzZXIpOiBVc2VyID0+ICh7XG4gIC4uLnVzZXIsXG4gIGVtYWlsOiAnbnVsbCcsXG4gIHBhc3N3b3JkOiAnbnVsbCcsXG59KTtcblxuY29uc3QgdGVzdFBhc3N3b3JkU3RyZW5ndGggPSAocGFzc3dvcmQpOiB2b2lkID0+IHtcbiAgY29uc3QgcGFzc3dvcmRBcnJheSA9IHBhc3N3b3JkLnNwbGl0KCcnKTtcblxuICBjb25zdCBzcGVjaWFsQ2hhcmFjdGVycyA9IFsnIScsICdAJywgJyMnLCAnJCcsICcmJywgJyonLCAnLSddO1xuICBjb25zdCBpc1VwcGVyQ2FzZSA9IChzdHJpbmcpOiBib29sZWFuID0+IC9eW0EtWl0qJC8udGVzdChzdHJpbmcpO1xuXG4gIGNvbnN0IGhhc051bWJlciA9IC9cXGQvLnRlc3QocGFzc3dvcmQpO1xuICBjb25zdCBoYXNTcGVjaWFsQ2hhcmFjdGVycyA9IHBhc3N3b3JkQXJyYXkuc29tZSgoaSkgPT4gc3BlY2lhbENoYXJhY3RlcnMuaW5jbHVkZXMoaSkpO1xuICBjb25zdCBoYXNVcHBlckNhc2UgPSBwYXNzd29yZEFycmF5LnNvbWUoKGkpID0+IGlzVXBwZXJDYXNlKGkpKTtcbiAgY29uc3QgaXNMb25nRW5vdWdoID0gcGFzc3dvcmQubGVuZ3RoID4gNztcblxuICBjb25zdCBpc1Bhc3N3b3JkU3Ryb25nID0gaGFzTnVtYmVyICYmIGhhc1NwZWNpYWxDaGFyYWN0ZXJzICYmIGhhc1VwcGVyQ2FzZSAmJiBpc0xvbmdFbm91Z2g7XG5cbiAgaWYgKCFpc1Bhc3N3b3JkU3Ryb25nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwYXNzd29yZCBpcyB3ZWFrJyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBoYXNoUGFzc3dvcmQgPSAocGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIHRlc3RQYXNzd29yZFN0cmVuZ3RoKHBhc3N3b3JkKTtcblxuICByZXR1cm4gYmNyeXB0Lmhhc2gocGFzc3dvcmQsIDEwKTtcbn07XG4iLCJpbnRlcmZhY2UgRXJyb3Ige1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5jbGFzcyBTZXJ2ZXJFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcHVibGljIHN0YXR1czogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihlcnJvcjogRXJyb3IpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgdGhpcy5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VydmVyRXJyb3I7XG4iLCJpbXBvcnQgeyBnb29nbGUgfSBmcm9tICdnb29nbGVhcGlzJztcbmltcG9ydCB7IFlvdXR1YmVWaWRlb0RhdGEgfSBmcm9tICd0eXBlcy95b3V0dWJlVHlwZXMnO1xuaW1wb3J0IHsgZm9ybWF0RHVyYXRpb24sIGZvcm1hdE51bWJlciwgZm9ybWF0UHVibGlzaGVkQXQgfSBmcm9tICcuL3lvdXR1YmVVdGlscyc7XG5cbi8vIGluaXRpYWxpemVzIHRoZSBZb3V0dWJlIERhdGEgQVBJXG5jb25zdCB5b3V0dWJlID0gZ29vZ2xlLnlvdXR1YmUoe1xuICB2ZXJzaW9uOiAndjMnLFxuICBhdXRoOiBwcm9jZXNzLmVudi5HQVBJX0tFWSxcbn0pO1xuXG4vLyBSZXR1cm5zIHRoZSB0aHVtYm5haWwgZm9yIGEgcGFydGljdWxhciB5b3V0dWJlIGNoYW5uZWxcbmNvbnN0IGdldFlvdXR1YmVDaGFubmVsVGh1bWJuYWlsID0gYXN5bmMgKGNoYW5uZWxJZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjaGFubmVsRGF0YSA9IGF3YWl0IHlvdXR1YmUuY2hhbm5lbHMubGlzdCh7XG4gICAgICBwYXJ0OiAnc25pcHBldCcsXG4gICAgICBpZDogY2hhbm5lbElkLFxuICAgIH0pO1xuICAgIHJldHVybiBjaGFubmVsRGF0YS5kYXRhLml0ZW1zWzBdLnNuaXBwZXQudGh1bWJuYWlscy5tZWRpdW0udXJsO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IEVycm9yKGBFcnJvciBsb2FkaW5nIHRoZSB5b3V0dWJlIGNoYW5uZWwgdGh1bWJuYWlsOiAke2Vycm9yfWApO1xuICB9XG59O1xuXG4vLyBSZXR1cm5zIGFsbCBuZWNlc3NhcnkgaW5mb3JtYXRpb24gYWJvdXQgYSBwYXJ0aWN1bGFyIHlvdXR1YmUgdmlkZW8gZ2l2ZW4gaXRzIHZpZGVvIGlkXG5jb25zdCBnZXRZb3V0dWJlVmlkZW9EYXRhID0gYXN5bmMgKHZpZGVvSWQ6IHN0cmluZyk6IFByb21pc2U8WW91dHViZVZpZGVvRGF0YT4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLnZpZGVvcy5saXN0KHtcbiAgICAgIHBhcnQ6ICdjb250ZW50RGV0YWlscyxzbmlwcGV0LHN0YXRpc3RpY3MnLFxuICAgICAgaWQ6IHZpZGVvSWQsXG4gICAgfSk7XG4gICAgY29uc3Qge1xuICAgICAgY29udGVudERldGFpbHMsXG4gICAgICBpZCxcbiAgICAgIHNuaXBwZXQsXG4gICAgICBzdGF0aXN0aWNzLFxuICAgIH0gPSB5b3V0dWJlVmlkZW9EYXRhLmRhdGEuaXRlbXNbMF07XG4gICAgY29uc3QgY2hhbm5lbFRodW1ibmFpbCA9IGF3YWl0IGdldFlvdXR1YmVDaGFubmVsVGh1bWJuYWlsKHNuaXBwZXQuY2hhbm5lbElkKTtcbiAgICByZXR1cm4ge1xuICAgICAgY2hhbm5lbFRodW1ibmFpbCxcbiAgICAgIGNoYW5uZWxUaXRsZTogc25pcHBldC5jaGFubmVsVGl0bGUsXG4gICAgICBkdXJhdGlvbjogZm9ybWF0RHVyYXRpb24oY29udGVudERldGFpbHMuZHVyYXRpb24pLFxuICAgICAgbGlrZXM6IGZvcm1hdE51bWJlcihzdGF0aXN0aWNzLmxpa2VDb3VudCksXG4gICAgICBwdWJsaXNoZWRBdDogZm9ybWF0UHVibGlzaGVkQXQoc25pcHBldC5wdWJsaXNoZWRBdCksXG4gICAgICB2aWRlb0lkOiBpZCxcbiAgICAgIHZpZGVvVGh1bWJuYWlsOiBzbmlwcGV0LnRodW1ibmFpbHMubWVkaXVtLnVybCxcbiAgICAgIHZpZGVvVGl0bGU6IHNuaXBwZXQudGl0bGUsXG4gICAgICB2aWV3czogZm9ybWF0TnVtYmVyKHN0YXRpc3RpY3Mudmlld0NvdW50KSxcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IEVycm9yKGBFcnJvciBnZXR0aW5nIHlvdXR1YmUgdmlkZW8gZGF0YTogJHtlcnJvcn1gKTtcbiAgfVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldFlvdXR1YmVWaWRlb0RhdGEsXG59O1xuIiwiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCc7XG5cbi8vIFByZWZpeGVzIGFuIGludGVnZXIgd2l0aCAwIGlmIGxlc3MgdGhhbiAxMFxuY29uc3QgZm9ybWF0SW50ID0gKGludDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgaWYgKGludCA8IDEwKSB7XG4gICAgcmV0dXJuIGAwJHtpbnR9YDtcbiAgfVxuICByZXR1cm4gYCR7aW50fWA7XG59O1xuXG4vLyBDcmVhdGVzIGEgY29uc2lzdGVudCB0aW1lIHN0cmluZyBmb3JtYXRcbmV4cG9ydCBjb25zdCBmb3JtYXREdXJhdGlvbiA9ICh0aW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzZWNvbmRzID0gbW9tZW50LmR1cmF0aW9uKHRpbWUpLnNlY29uZHMoKTtcbiAgY29uc3QgbWludXRlcyA9IG1vbWVudC5kdXJhdGlvbih0aW1lKS5taW51dGVzKCk7XG4gIGNvbnN0IGhvdXJzID0gbW9tZW50LmR1cmF0aW9uKHRpbWUpLmhvdXJzKCk7XG4gIGlmIChob3VycyA+IDApIHtcbiAgICByZXR1cm4gYCR7Zm9ybWF0SW50KGhvdXJzKX06JHtmb3JtYXRJbnQobWludXRlcyl9OiR7Zm9ybWF0SW50KHNlY29uZHMpfWA7XG4gIH1cbiAgaWYgKG1pbnV0ZXMgPiAwKSB7XG4gICAgcmV0dXJuIGAke2Zvcm1hdEludChtaW51dGVzKX06JHtmb3JtYXRJbnQoc2Vjb25kcyl9YDtcbiAgfVxuICByZXR1cm4gYDAwOiR7Zm9ybWF0SW50KHNlY29uZHMpfWA7XG59O1xuXG4vLyBGb3JtYXRzIGEgbnVtYmVyIHRvIHRoZSBiZXN0IGFwcHJveGltYXRpb25cbmV4cG9ydCBjb25zdCBmb3JtYXROdW1iZXIgPSAobnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoTnVtYmVyKG51bWJlcikgPiA5OTk5OTkpIHtcbiAgICByZXR1cm4gbnVtZXJhbChudW1iZXIpLmZvcm1hdCgnMC4wYScpO1xuICB9XG4gIHJldHVybiBudW1lcmFsKG51bWJlcikuZm9ybWF0KCcwLDAnKTtcbn07XG5cbi8vIEZvcm1hdHMgdGhlIGRhdGUgYW5kIHRpbWUgYSB2aWRlbyB3YXMgcHVibGlzaGVkIGF0XG5leHBvcnQgY29uc3QgZm9ybWF0UHVibGlzaGVkQXQgPSAoZGF0ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgbW9tZW50LnVwZGF0ZUxvY2FsZSgnZW4nLCB7XG4gICAgcmVsYXRpdmVUaW1lOiB7XG4gICAgICBmdXR1cmU6ICdpbiAlcycsXG4gICAgICBwYXN0OiAnJXMgYWdvJyxcbiAgICAgIHM6ICdhIGZldyBzZWNvbmRzJyxcbiAgICAgIHNzOiAnJWQgc2Vjb25kcycsXG4gICAgICBtOiAnYSBtaW51dGUnLFxuICAgICAgbW06ICclZCBtaW51dGVzJyxcbiAgICAgIGg6ICcxaCcsXG4gICAgICBoaDogJyVkaCcsXG4gICAgICBkOiAnMWQnLFxuICAgICAgZGQ6ICclZGQnLFxuICAgICAgTTogJzFtJyxcbiAgICAgIE1NOiAnJWRtJyxcbiAgICAgIHk6ICcxeScsXG4gICAgICB5eTogJyVkeScsXG4gICAgfSxcbiAgfSk7XG4gIHJldHVybiBtb21lbnQoZGF0ZSkuZnJvbU5vdygpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdvb2dsZWFwaXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm51bWVyYWxcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==