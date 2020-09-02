exports.id = "main";
exports.modules = {

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var middleware_initializeMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! middleware/initializeMiddleware */ "./src/middleware/initializeMiddleware.ts");
/* harmony import */ var server_initializeServer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! server/initializeServer */ "./src/server/initializeServer.ts");



// We initialize our middleware
const { expressMiddleware, expressSessionMiddleware, passportMiddleware, passportSessionMiddleware, prisma, } = Object(middleware_initializeMiddleware__WEBPACK_IMPORTED_MODULE_1__["default"])();
// We initialize our Apollo Server
const server = Object(server_initializeServer__WEBPACK_IMPORTED_MODULE_2__["default"])(expressSessionMiddleware, passportMiddleware, passportSessionMiddleware, prisma);
// We apply the express middleware to our server
server.applyMiddleware({
    app: expressMiddleware,
    cors: false,
    path: '/graphql',
});
// We create an http server and then add subscriptions
// https://www.apollographql.com/docs/apollo-server/data/subscriptions/#subscriptions-with-additional-middleware
const httpServer = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(expressMiddleware);
server.installSubscriptionHandlers(httpServer);
// We declare what port our server will run on.
const PORT = process.env.PORT || 4000;
// We run our http server.
httpServer.listen(PORT, () => {
    if (process.env.MODE === 'LOCAL') {
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
    }
});
// Using webpack's hot module replacement, if needed.
if (process.env.MODE === 'LOCAL' && module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.stop());
}


/***/ }),

/***/ "./src/schema/card/cardResolvers/cardMutations.ts":
/*!********************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardMutations.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var youtube_youtube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! youtube/youtube */ "./src/thirdParty/youtube/youtube.ts");
/* harmony import */ var _cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cardUtils/cardEnums */ "./src/schema/card/cardUtils/cardEnums.ts");
/* harmony import */ var _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cardUtils/cardInfo */ "./src/schema/card/cardUtils/cardInfo.ts");
/* harmony import */ var _cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cardUtils/cardUtils */ "./src/schema/card/cardUtils/cardUtils.ts");





/* harmony default export */ __webpack_exports__["default"] = ({
    createUserCard: async (parent, args, { passport, prisma, pubsub }) => {
        try {
            const { category, isFavorite, isToDo, title, url, } = args.data;
            const type = Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_4__["getCardType"])(url);
            const userId = passport.getUserId();
            let createArgs;
            if (type === 'Youtube') {
                const videoId = Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_4__["getYoutubeVideoId"])(url);
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
            const card = await prisma.mutation.createCard(finalArgs, _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_3__["default"]);
            pubsub.publish('userCard', { userCard: card });
            return card;
        }
        catch (error) {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: error.message, status: 400 });
        }
    },
    deleteUserCard: async (parent, args, { passport, prisma, pubsub }) => {
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
            const deletedCard = await prisma.mutation.deleteCard(deleteArgs, _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_3__["default"]);
            pubsub.publish('deletedUserCard', { deletedUserCard: deletedCard });
            return deletedCard;
        }
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({
            message: 'The user does not have access to delete this card',
            status: 403,
        });
    },
    initiateUserCard: async (parent, args) => {
        try {
            const videoId = Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_4__["getYoutubeVideoId"])(args.data.url);
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
    },
    toggleFavoriteUserCard: async (parent, args, { passport, prisma }) => {
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
            const updatedCard = await prisma.mutation.updateCard(updateArgs, _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_3__["default"]);
            return updatedCard;
        }
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({
            message: 'The user does not have access to delete this card',
            status: 403,
        });
    },
    toggleToDoUserCard: async (parent, args, { passport, prisma }) => {
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
            const updatedCard = await prisma.mutation.updateCard(updateArgs, _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_3__["default"]);
            return updatedCard;
        }
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({
            message: 'The user does not have access to delete this card',
            status: 403,
        });
    },
});


/***/ }),

/***/ "./src/schema/card/cardResolvers/cardQueries.ts":
/*!******************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardQueries.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    userCards: async (parent, args, { passport, prisma }, info) => {
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
    },
    userCardsWithFilters: async (parent, args, { passport, prisma, pubsub }, info) => {
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
    },
});


/***/ }),

/***/ "./src/schema/card/cardResolvers/cardSubscriptions.ts":
/*!************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardSubscriptions.ts ***!
  \************************************************************/
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
/* harmony import */ var _card_cardResolvers_cardMutations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../card/cardResolvers/cardMutations */ "./src/schema/card/cardResolvers/cardMutations.ts");
/* harmony import */ var _user_userResolvers_userMutations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user/userResolvers/userMutations */ "./src/schema/user/userResolvers/userMutations.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    ..._card_cardResolvers_cardMutations__WEBPACK_IMPORTED_MODULE_0__["default"],
    ..._user_userResolvers_userMutations__WEBPACK_IMPORTED_MODULE_1__["default"],
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
/* harmony import */ var _card_cardResolvers_cardQueries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../card/cardResolvers/cardQueries */ "./src/schema/card/cardResolvers/cardQueries.ts");
/* harmony import */ var _user_userResolvers_userQueries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user/userResolvers/userQueries */ "./src/schema/user/userResolvers/userQueries.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    ..._card_cardResolvers_cardQueries__WEBPACK_IMPORTED_MODULE_0__["default"],
    ..._user_userResolvers_userQueries__WEBPACK_IMPORTED_MODULE_1__["default"],
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
/* harmony import */ var _card_cardResolvers_cardSubscriptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../card/cardResolvers/cardSubscriptions */ "./src/schema/card/cardResolvers/cardSubscriptions.ts");

/* harmony default export */ __webpack_exports__["default"] = ({
    ..._card_cardResolvers_cardSubscriptions__WEBPACK_IMPORTED_MODULE_0__["default"],
});


/***/ }),

/***/ "./src/schema/user/userResolvers/userMutations.ts":
/*!********************************************************!*\
  !*** ./src/schema/user/userResolvers/userMutations.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _userUtils_userUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../userUtils/userUtils */ "./src/schema/user/userUtils/userUtils.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    createUser: async (parent, args, { passport, prisma }, info) => {
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
    },
    loginUser: async (parent, args, { passport }) => {
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
    },
});


/***/ }),

/***/ "./src/schema/user/userResolvers/userQueries.ts":
/*!******************************************************!*\
  !*** ./src/schema/user/userResolvers/userQueries.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _userUtils_userUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../userUtils/userUtils */ "./src/schema/user/userUtils/userUtils.ts");

/* harmony default export */ __webpack_exports__["default"] = ({
    isAuthenticated: async (parent, args, { passport }) => (passport.isAuthenticated()),
    logoutUser: async (parent, args, { passport }) => passport.logout(),
    users: async (parent, args, { prisma }, info) => {
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
    },
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

/***/ "./src/server/initializeServer.ts":
/*!****************************************!*\
  !*** ./src/server/initializeServer.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-subscriptions */ "graphql-subscriptions");
/* harmony import */ var graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var middleware_passport_buildPassportContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! middleware/passport/buildPassportContext */ "./src/middleware/passport/buildPassportContext.ts");
/* harmony import */ var schema_rootResolvers_rootResolvers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! schema/rootResolvers/rootResolvers */ "./src/schema/rootResolvers/rootResolvers.ts");
/* harmony import */ var schema_typeDefs_typeDefs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! schema/typeDefs/typeDefs */ "./src/schema/typeDefs/typeDefs.ts");





// creates new apollo server
const initializeServer = (expressSessionMiddleware, passportMiddleware, passportSessionMiddleware, prisma) => {
    const pubsub = new graphql_subscriptions__WEBPACK_IMPORTED_MODULE_1__["PubSub"]();
    return new apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["ApolloServer"]({
        context: (request) => ({
            passport: Object(middleware_passport_buildPassportContext__WEBPACK_IMPORTED_MODULE_2__["default"])({ request: request.req, response: request.res }),
            prisma,
            pubsub,
        }),
        playground: {
            settings: {
                'request.credentials': 'same-origin',
            },
        },
        resolvers: schema_rootResolvers_rootResolvers__WEBPACK_IMPORTED_MODULE_3__["default"],
        typeDefs: schema_typeDefs_typeDefs__WEBPACK_IMPORTED_MODULE_4__["default"],
    });
};
/* harmony default export */ __webpack_exports__["default"] = (initializeServer);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZE11dGF0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkUXVlcmllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkU3Vic2NyaXB0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRFbnVtcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFV0aWxzL2NhcmRJbmZvLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvY2FyZC9jYXJkVXRpbHMvY2FyZFV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvcm9vdFJlc29sdmVycy9tdXRhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9yb290UmVzb2x2ZXJzL3F1ZXJpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9yb290UmVzb2x2ZXJzL3Jvb3RSZXNvbHZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9yb290UmVzb2x2ZXJzL3N1YnNjcmlwdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS91c2VyL3VzZXJSZXNvbHZlcnMvdXNlck11dGF0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclJlc29sdmVycy91c2VyUXVlcmllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclV0aWxzL3VzZXJVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2luaXRpYWxpemVTZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9zZXJ2ZXJFcnJvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdGhpcmRQYXJ0eS95b3V0dWJlL3lvdXR1YmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RoaXJkUGFydHkveW91dHViZS95b3V0dWJlVXRpbHMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZ29vZ2xlYXBpc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm51bWVyYWxcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBd0I7QUFDMkM7QUFDWjtBQUV2RCwrQkFBK0I7QUFDL0IsTUFBTSxFQUNKLGlCQUFpQixFQUNqQix3QkFBd0IsRUFDeEIsa0JBQWtCLEVBQ2xCLHlCQUF5QixFQUN6QixNQUFNLEdBQ1AsR0FBRywrRUFBb0IsRUFBRSxDQUFDO0FBRTNCLGtDQUFrQztBQUNsQyxNQUFNLE1BQU0sR0FBRyx1RUFBZ0IsQ0FDN0Isd0JBQXdCLEVBQ3hCLGtCQUFrQixFQUNsQix5QkFBeUIsRUFDekIsTUFBTSxDQUNQLENBQUM7QUFFRixnREFBZ0Q7QUFDaEQsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUNyQixHQUFHLEVBQUUsaUJBQWlCO0lBQ3RCLElBQUksRUFBRSxLQUFLO0lBQ1gsSUFBSSxFQUFFLFVBQVU7Q0FDakIsQ0FBQyxDQUFDO0FBRUgsc0RBQXNEO0FBQ3RELGdIQUFnSDtBQUNoSCxNQUFNLFVBQVUsR0FBRywyQ0FBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3hELE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUUvQywrQ0FBK0M7QUFDL0MsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBRXRDLDBCQUEwQjtBQUMxQixVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDM0IsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxP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TSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZDO0lBQ0QsT0FBTyw4Q0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUM7QUFFRixxREFBcUQ7QUFDOUMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLElBQVksRUFBVSxFQUFFO0lBQ3hELDZDQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRTtRQUN4QixZQUFZLEVBQUU7WUFDWixNQUFNLEVBQUUsT0FBTztZQUNmLElBQUksRUFBRSxRQUFRO1lBQ2QsQ0FBQyxFQUFFLGVBQWU7WUFDbEIsRUFBRSxFQUFFLFlBQVk7WUFDaEIsQ0FBQyxFQUFFLFVBQVU7WUFDYixFQUFFLEVBQUUsWUFBWTtZQUNoQixDQUFDLEVBQUUsSUFBSTtZQUNQLEVBQUUsRUFBRSxLQUFLO1lBQ1QsQ0FBQyxFQUFFLElBQUk7WUFDUCxFQUFFLEVBQUUsS0FBSztZQUNULENBQUMsRUFBRSxJQUFJO1lBQ1AsRUFBRSxFQUFFLEtBQUs7WUFDVCxDQUFDLEVBQUUsSUFBSTtZQUNQLEVBQUUsRUFBRSxLQUFLO1NBQ1Y7S0FDRixDQUFDLENBQUM7SUFDSCxPQUFPLDZDQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUN0REYsdUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsb0MiLCJmaWxlIjoibWFpbi43MTRjYzRiNGQyZDJmNmU3ZWU3Zi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgaW5pdGlhbGl6ZU1pZGRsZXdhcmUgZnJvbSAnbWlkZGxld2FyZS9pbml0aWFsaXplTWlkZGxld2FyZSc7XG5pbXBvcnQgaW5pdGlhbGl6ZVNlcnZlciBmcm9tICdzZXJ2ZXIvaW5pdGlhbGl6ZVNlcnZlcic7XG5cbi8vIFdlIGluaXRpYWxpemUgb3VyIG1pZGRsZXdhcmVcbmNvbnN0IHtcbiAgZXhwcmVzc01pZGRsZXdhcmUsXG4gIGV4cHJlc3NTZXNzaW9uTWlkZGxld2FyZSxcbiAgcGFzc3BvcnRNaWRkbGV3YXJlLFxuICBwYXNzcG9ydFNlc3Npb25NaWRkbGV3YXJlLFxuICBwcmlzbWEsXG59ID0gaW5pdGlhbGl6ZU1pZGRsZXdhcmUoKTtcblxuLy8gV2UgaW5pdGlhbGl6ZSBvdXIgQXBvbGxvIFNlcnZlclxuY29uc3Qgc2VydmVyID0gaW5pdGlhbGl6ZVNlcnZlcihcbiAgZXhwcmVzc1Nlc3Npb25NaWRkbGV3YXJlLFxuICBwYXNzcG9ydE1pZGRsZXdhcmUsXG4gIHBhc3Nwb3J0U2Vzc2lvbk1pZGRsZXdhcmUsXG4gIHByaXNtYSxcbik7XG5cbi8vIFdlIGFwcGx5IHRoZSBleHByZXNzIG1pZGRsZXdhcmUgdG8gb3VyIHNlcnZlclxuc2VydmVyLmFwcGx5TWlkZGxld2FyZSh7XG4gIGFwcDogZXhwcmVzc01pZGRsZXdhcmUsXG4gIGNvcnM6IGZhbHNlLFxuICBwYXRoOiAnL2dyYXBocWwnLFxufSk7XG5cbi8vIFdlIGNyZWF0ZSBhbiBodHRwIHNlcnZlciBhbmQgdGhlbiBhZGQgc3Vic2NyaXB0aW9uc1xuLy8gaHR0cHM6Ly93d3cuYXBvbGxvZ3JhcGhxbC5jb20vZG9jcy9hcG9sbG8tc2VydmVyL2RhdGEvc3Vic2NyaXB0aW9ucy8jc3Vic2NyaXB0aW9ucy13aXRoLWFkZGl0aW9uYWwtbWlkZGxld2FyZVxuY29uc3QgaHR0cFNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGV4cHJlc3NNaWRkbGV3YXJlKTtcbnNlcnZlci5pbnN0YWxsU3Vic2NyaXB0aW9uSGFuZGxlcnMoaHR0cFNlcnZlcik7XG5cbi8vIFdlIGRlY2xhcmUgd2hhdCBwb3J0IG91ciBzZXJ2ZXIgd2lsbCBydW4gb24uXG5jb25zdCBQT1JUID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCA0MDAwO1xuXG4vLyBXZSBydW4gb3VyIGh0dHAgc2VydmVyLlxuaHR0cFNlcnZlci5saXN0ZW4oUE9SVCwgKCkgPT4ge1xuICBpZiAocHJvY2Vzcy5lbnYuTU9ERSA9PT0gJ0xPQ0FMJykge1xuICAgIGNvbnNvbGUubG9nKGBTZXJ2ZXIgcmVhZHkgYXQgaHR0cDovL2xvY2FsaG9zdDoke1BPUlR9JHtzZXJ2ZXIuZ3JhcGhxbFBhdGh9YCk7XG4gICAgY29uc29sZS5sb2coYFN1YnNjcmlwdGlvbnMgcmVhZHkgYXQgd3M6Ly9sb2NhbGhvc3Q6JHtQT1JUfSR7c2VydmVyLnN1YnNjcmlwdGlvbnNQYXRofWApO1xuICB9XG59KTtcblxuLy8gVXNpbmcgd2VicGFjaydzIGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQsIGlmIG5lZWRlZC5cbmlmIChwcm9jZXNzLmVudi5NT0RFID09PSAnTE9DQUwnICYmIG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHNlcnZlci5zdG9wKCkpO1xufVxuIiwiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeW91dHViZSBmcm9tICd5b3V0dWJlL3lvdXR1YmUnO1xuaW1wb3J0IGNhcmRFbnVtcyBmcm9tICcuLi9jYXJkVXRpbHMvY2FyZEVudW1zJztcbmltcG9ydCBjYXJkSW5mbyBmcm9tICcuLi9jYXJkVXRpbHMvY2FyZEluZm8nO1xuaW1wb3J0IHsgZ2V0Q2FyZFR5cGUsIGdldFlvdXR1YmVWaWRlb0lkIH0gZnJvbSAnLi4vY2FyZFV0aWxzL2NhcmRVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3JlYXRlVXNlckNhcmQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSwgcHVic3ViIH0pID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgaXNGYXZvcml0ZSxcbiAgICAgICAgaXNUb0RvLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgdXJsLFxuICAgICAgfSA9IGFyZ3MuZGF0YTtcblxuICAgICAgY29uc3QgdHlwZSA9IGdldENhcmRUeXBlKHVybCk7XG5cbiAgICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICAgICAgbGV0IGNyZWF0ZUFyZ3M6IG9iamVjdDtcblxuICAgICAgaWYgKHR5cGUgPT09ICdZb3V0dWJlJykge1xuICAgICAgICBjb25zdCB2aWRlb0lkID0gZ2V0WW91dHViZVZpZGVvSWQodXJsKTtcbiAgICAgICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh2aWRlb0lkKTtcbiAgICAgICAgY3JlYXRlQXJncyA9IHtcbiAgICAgICAgICB5b3V0dWJlQ2FyZERhdGE6IHtcbiAgICAgICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgICAgICAuLi55b3V0dWJlVmlkZW9EYXRhLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNhcmQgdHlwZScpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgICAgIC4uLmFyZ3MsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjYXJkRGF0YToge1xuICAgICAgICAgICAgY3JlYXRlOiB7IC4uLmNyZWF0ZUFyZ3MgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNhdGVnb3J5LFxuICAgICAgICAgIGlzRmF2b3JpdGUsXG4gICAgICAgICAgaXNUb0RvLFxuICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgY29ubmVjdDoge1xuICAgICAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgY2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5jcmVhdGVDYXJkKGZpbmFsQXJncywgY2FyZEluZm8pO1xuICAgICAgcHVic3ViLnB1Ymxpc2goJ3VzZXJDYXJkJywgeyB1c2VyQ2FyZDogY2FyZCB9KTtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gIH0sXG4gIGRlbGV0ZVVzZXJDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9KSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gICAgY29uc3QgeyBjYXJkSWQgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IHF1ZXJ5QXJncyA9IHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlQXJncyA9IHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgY2FyZCB0aGF0IGlzIHRyeWluZyB0byBiZSBkZWxldGVkIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgICBjb25zdCB1c2VyQ2FyZCA9IGF3YWl0IHByaXNtYS5xdWVyeS5jYXJkcyhxdWVyeUFyZ3MsICd7IGlkIH0nKTtcblxuICAgIGlmICh1c2VyQ2FyZC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBkZWxldGVkQ2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5kZWxldGVDYXJkKGRlbGV0ZUFyZ3MsIGNhcmRJbmZvKTtcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdkZWxldGVkVXNlckNhcmQnLCB7IGRlbGV0ZWRVc2VyQ2FyZDogZGVsZXRlZENhcmQgfSk7XG4gICAgICByZXR1cm4gZGVsZXRlZENhcmQ7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHtcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdGhpcyBjYXJkJyxcbiAgICAgIHN0YXR1czogNDAzLFxuICAgIH0pO1xuICB9LFxuICBpbml0aWF0ZVVzZXJDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZpZGVvSWQgPSBnZXRZb3V0dWJlVmlkZW9JZChhcmdzLmRhdGEudXJsKTtcbiAgICAgIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodmlkZW9JZCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNhdGVnb3J5OiBjYXJkRW51bXMudmlkZW8sXG4gICAgICAgIHRpdGxlOiB5b3V0dWJlVmlkZW9EYXRhLnZpZGVvVGl0bGUsXG4gICAgICAgIHVybDogYXJncy5kYXRhLnVybCxcbiAgICAgICAgeW91dHViZUNhcmREYXRhOiB5b3V0dWJlVmlkZW9EYXRhLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICB9LFxuICB0b2dnbGVGYXZvcml0ZVVzZXJDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEgfSkgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICAgIGNvbnN0IHsgY2FyZElkIH0gPSBhcmdzLmRhdGE7XG5cbiAgICBjb25zdCBxdWVyeUFyZ3MgPSB7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBjYXJkIHRoYXQgaXMgdHJ5aW5nIHRvIGJlIGRlbGV0ZWQgYmVsb25ncyB0byB0aGUgdXNlclxuICAgIGNvbnN0IHVzZXJDYXJkID0gYXdhaXQgcHJpc21hLnF1ZXJ5LmNhcmRzKHF1ZXJ5QXJncywgJ3sgaWQgaXNGYXZvcml0ZSB9Jyk7XG5cbiAgICBpZiAodXNlckNhcmQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdXBkYXRlQXJncyA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGlzRmF2b3JpdGU6ICF1c2VyQ2FyZFswXS5pc0Zhdm9yaXRlLFxuICAgICAgICB9LFxuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB1cGRhdGVkQ2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi51cGRhdGVDYXJkKHVwZGF0ZUFyZ3MsIGNhcmRJbmZvKTtcbiAgICAgIHJldHVybiB1cGRhdGVkQ2FyZDtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3Ioe1xuICAgICAgbWVzc2FnZTogJ1RoZSB1c2VyIGRvZXMgbm90IGhhdmUgYWNjZXNzIHRvIGRlbGV0ZSB0aGlzIGNhcmQnLFxuICAgICAgc3RhdHVzOiA0MDMsXG4gICAgfSk7XG4gIH0sXG4gIHRvZ2dsZVRvRG9Vc2VyQ2FyZDogYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hIH0pID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgICBjb25zdCB7IGNhcmRJZCB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgcXVlcnlBcmdzID0ge1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgY2FyZCB0aGF0IGlzIHRyeWluZyB0byBiZSBkZWxldGVkIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgICBjb25zdCB1c2VyQ2FyZCA9IGF3YWl0IHByaXNtYS5xdWVyeS5jYXJkcyhxdWVyeUFyZ3MsICd7IGlkIGlzVG9EbyB9Jyk7XG5cbiAgICBpZiAodXNlckNhcmQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdXBkYXRlQXJncyA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGlzVG9EbzogIXVzZXJDYXJkWzBdLmlzVG9EbyxcbiAgICAgICAgfSxcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgdXBkYXRlZENhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24udXBkYXRlQ2FyZCh1cGRhdGVBcmdzLCBjYXJkSW5mbyk7XG4gICAgICByZXR1cm4gdXBkYXRlZENhcmQ7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHtcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdGhpcyBjYXJkJyxcbiAgICAgIHN0YXR1czogNDAzLFxuICAgIH0pO1xuICB9LFxufTtcbiIsImltcG9ydCB7IENhcmRRdWVyeUFyZ3MsIEZpbHRlcnMgfSBmcm9tICcuLi9jYXJkVXRpbHMvY2FyZFR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB1c2VyQ2FyZHM6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSB9LCBpbmZvKSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG5cbiAgICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgICAuLi5hcmdzLFxuICAgICAgd2hlcmU6IHtcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIHByaXNtYS5xdWVyeS5jYXJkcyhmaW5hbEFyZ3MsIGluZm8pO1xuICB9LFxuICB1c2VyQ2FyZHNXaXRoRmlsdGVyczogYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hLCBwdWJzdWIgfSwgaW5mbykgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuXG4gICAgY29uc3QgZmluYWxBcmdzOiBDYXJkUXVlcnlBcmdzID0ge1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCB7IGlzRmF2b3JpdGUsIGlzVG9EbyB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgZmlsdGVyczogRmlsdGVycyA9IHt9O1xuICAgIGlmIChpc0Zhdm9yaXRlKSB7XG4gICAgICBmaW5hbEFyZ3Mud2hlcmUuaXNGYXZvcml0ZSA9IGlzRmF2b3JpdGU7XG4gICAgICBmaWx0ZXJzLmlzRmF2b3JpdGUgPSBpc0Zhdm9yaXRlO1xuICAgIH1cblxuICAgIGlmIChpc1RvRG8pIHtcbiAgICAgIGZpbmFsQXJncy53aGVyZS5pc1RvRG8gPSBpc1RvRG87XG4gICAgICBmaWx0ZXJzLmlzVG9EbyA9IGlzVG9EbztcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyQ2FyZHMgPSBwcmlzbWEucXVlcnkuY2FyZHMoZmluYWxBcmdzLCBpbmZvKTtcbiAgICBwdWJzdWIucHVibGlzaCgnZmlsdGVyZWRVc2VyQ2FyZHMnLCB7IGZpbHRlcmVkVXNlckNhcmRzOiB7IGZpbHRlcnMsIHVzZXJDYXJkcyB9IH0pO1xuICAgIHJldHVybiB1c2VyQ2FyZHM7XG4gIH0sXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBkZWxldGVkVXNlckNhcmQ6IHtcbiAgICBzdWJzY3JpYmU6IChwYXJlbnQsIGFyZ3MsIHsgcHVic3ViIH0sIGluZm8pID0+IHB1YnN1Yi5hc3luY0l0ZXJhdG9yKCdkZWxldGVkVXNlckNhcmQnKSxcbiAgfSxcbiAgdXNlckNhcmQ6IHtcbiAgICBzdWJzY3JpYmU6IChwYXJlbnQsIGFyZ3MsIHsgcHVic3ViIH0sIGluZm8pID0+IHB1YnN1Yi5hc3luY0l0ZXJhdG9yKCd1c2VyQ2FyZCcpLFxuICB9LFxuICBmaWx0ZXJlZFVzZXJDYXJkczoge1xuICAgIHN1YnNjcmliZTogKHBhcmVudCwgYXJncywgeyBwdWJzdWIgfSwgaW5mbykgPT4gcHVic3ViLmFzeW5jSXRlcmF0b3IoJ2ZpbHRlcmVkVXNlckNhcmRzJyksXG4gIH0sXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuICB2aWRlbzogJ1ZpZGVvJyxcbiAgeW91dHViZTogJ1lvdXR1YmUnLFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGBcbntcbiAgaWRcbiAgY2F0ZWdvcnlcbiAgaXNGYXZvcml0ZVxuICBpc1RvRG9cbiAgdGl0bGVcbiAgdHlwZVxuICBjYXJkRGF0YXtcbiAgICB5b3V0dWJlQ2FyZERhdGF7XG4gICAgICBjaGFubmVsVGh1bWJuYWlsXG4gICAgICBjaGFubmVsVGl0bGVcbiAgICAgIGR1cmF0aW9uXG4gICAgICBsaWtlc1xuICAgICAgcHVibGlzaGVkQXRcbiAgICAgIHZpZGVvSWRcbiAgICAgIHZpZGVvVGh1bWJuYWlsXG4gICAgICB2aWRlb1RpdGxlXG4gICAgICB2aWV3c1xuICAgIH1cbiAgfVxufVxuYDtcbiIsImltcG9ydCB7IENhcmRUeXBlIH0gZnJvbSAnLi9jYXJkVHlwZXMnO1xuXG5leHBvcnQgY29uc3QgZ2V0Q2FyZFR5cGUgPSAodXJsOiBzdHJpbmcpOiBDYXJkVHlwZSA9PiB7XG4gIGlmIChcbiAgICB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUuY29tJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1LmJlJylcbiAgICB8fCB1cmwuaW5jbHVkZXMoJ3lvdXR1YmUtbm9jb29raWUuY29tJylcbiAgKSB7XG4gICAgcmV0dXJuICdZb3V0dWJlJztcbiAgfVxuXG4gIHRocm93IEVycm9yKCdDYW5ub3QgZGV0ZWN0IGEgdmFsaWQgY2FyZCB0eXBlJyk7XG59O1xuXG4vLyBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNzcyODQxNy83NDYwNDY3XG5leHBvcnQgY29uc3QgZ2V0WW91dHViZVZpZGVvSWQgPSAodXJsKTogc3RyaW5nID0+IHtcbiAgaWYgKFxuICAgIHVybC5pbmNsdWRlcygneW91dHViZS5jb20nKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHUuYmUnKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHViZS1ub2Nvb2tpZS5jb20nKVxuICApIHtcbiAgICBjb25zdCByZWdFeHAgPSAvXi4qKD86KD86eW91dHVcXC5iZVxcL3x2XFwvfHZpXFwvfHVcXC9cXHdcXC98ZW1iZWRcXC8pfCg/Oig/OndhdGNoKT9cXD92KD86aSk/PXxcXCZ2KD86aSk/PSkpKFteI1xcJlxcP10qKS4qLztcbiAgICBjb25zdCBtYXRjaCA9IHVybC5tYXRjaChyZWdFeHApO1xuICAgIGlmIChtYXRjaCAmJiBtYXRjaFsxXSkge1xuICAgICAgcmV0dXJuIG1hdGNoWzFdO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcignWW91ciB5b3V0dWJlIHVybCBpcyBub3QgdmFsaWQnKTtcbiAgfVxuICB0aHJvdyBFcnJvcignWW91IG11c3QgcHJvdmlkZSBhIHlvdXR1YmUgdXJsJyk7XG59O1xuXG4iLCJpbXBvcnQgY2FyZE11dGF0aW9ucyBmcm9tICcuLi9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZE11dGF0aW9ucyc7XG5pbXBvcnQgdXNlck11dGF0aW9ucyBmcm9tICcuLi91c2VyL3VzZXJSZXNvbHZlcnMvdXNlck11dGF0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4uY2FyZE11dGF0aW9ucyxcbiAgLi4udXNlck11dGF0aW9ucyxcbn07XG4iLCJpbXBvcnQgY2FyZFF1ZXJpZXMgZnJvbSAnLi4vY2FyZC9jYXJkUmVzb2x2ZXJzL2NhcmRRdWVyaWVzJztcbmltcG9ydCB1c2VyUXVlcmllcyBmcm9tICcuLi91c2VyL3VzZXJSZXNvbHZlcnMvdXNlclF1ZXJpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC4uLmNhcmRRdWVyaWVzLFxuICAuLi51c2VyUXVlcmllcyxcbn07XG4iLCJpbXBvcnQgbXV0YXRpb25zIGZyb20gJy4vbXV0YXRpb25zJztcbmltcG9ydCBxdWVyaWVzIGZyb20gJy4vcXVlcmllcyc7XG5pbXBvcnQgc3Vic2NyaXB0aW9ucyBmcm9tICcuL3N1YnNjcmlwdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIE11dGF0aW9uOiB7XG4gICAgLi4ubXV0YXRpb25zLFxuICB9LFxuICBRdWVyeToge1xuICAgIC4uLnF1ZXJpZXMsXG4gIH0sXG4gIFN1YnNjcmlwdGlvbjoge1xuICAgIC4uLnN1YnNjcmlwdGlvbnMsXG4gIH0sXG4gIE5vZGU6IHtcbiAgICBfX3Jlc29sdmVUeXBlKCkgeyAvLyBodHRwczovL2dpdGh1Yi5jb20vYXBvbGxvZ3JhcGhxbC9hcG9sbG8tc2VydmVyL2lzc3Vlcy8xMDc1XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICB9LFxufTtcbiIsImltcG9ydCBjYXJkU3Vic2NyaXB0aW9ucyBmcm9tICcuLi9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZFN1YnNjcmlwdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC4uLmNhcmRTdWJzY3JpcHRpb25zLFxufTtcbiIsImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHsgaGFzaFBhc3N3b3JkLCByZXN0cmljdFVzZXJEYXRhIH0gZnJvbSAnLi4vdXNlclV0aWxzL3VzZXJVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3JlYXRlVXNlcjogYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hIH0sIGluZm8pID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQoYXJncy5kYXRhLnBhc3N3b3JkKTtcbiAgICAgIGNvbnN0IGZpbmFsQXJncyA9IHtcbiAgICAgICAgLi4uYXJncyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIC4uLmFyZ3MuZGF0YSxcbiAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24uY3JlYXRlVXNlcihmaW5hbEFyZ3MsIGluZm8pO1xuXG4gICAgICBwYXNzcG9ydC5sb2dpbih7IGF1dGhlbnRpY2F0ZU9wdGlvbnM6IGFyZ3MuZGF0YSwgdXNlciB9KTtcblxuICAgICAgcmV0dXJuIHJlc3RyaWN0VXNlckRhdGEodXNlcik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlLmluY2x1ZGVzKCd1bmlxdWUgY29uc3RyYWludCcpKSB7XG4gICAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6ICdkdXBsaWNhdGUgdXNlcicsIHN0YXR1czogNDAwIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UgPT09ICdwYXNzd29yZCBpcyB3ZWFrJykge1xuICAgICAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGxvZ2luVXNlcjogYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCB9KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgdXNlciB9ID0gYXdhaXQgcGFzc3BvcnQuYXV0aGVudGljYXRlKHtcbiAgICAgICAgYXV0aGVudGljYXRlT3B0aW9uczogYXJncy5kYXRhLFxuICAgICAgICBzdHJhdGVneU5hbWU6ICdsb2NhbCcsXG4gICAgICB9KTtcblxuICAgICAgcGFzc3BvcnQubG9naW4oeyBhdXRoZW50aWNhdGVPcHRpb25zOiBhcmdzLmRhdGEsIHVzZXIgfSk7XG5cbiAgICAgIHJldHVybiByZXN0cmljdFVzZXJEYXRhKHVzZXIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiAnVW5hYmxlIHRvIGxvZ2luJywgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuICB9LFxufTtcbiIsImltcG9ydCB7IHJlc3RyaWN0VXNlckRhdGEgfSBmcm9tICcuLi91c2VyVXRpbHMvdXNlclV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0F1dGhlbnRpY2F0ZWQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQgfSkgPT4gKFxuICAgIHBhc3Nwb3J0LmlzQXV0aGVudGljYXRlZCgpXG4gICksXG4gIGxvZ291dFVzZXI6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQgfSkgPT4gcGFzc3BvcnQubG9nb3V0KCksXG4gIHVzZXJzOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHByaXNtYSB9LCBpbmZvKSA9PiB7XG4gICAgY29uc3QgZmluYWxBcmdzID0ge1xuICAgICAgLi4uYXJncyxcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIC4uLmFyZ3Mud2hlcmUsXG4gICAgICB9LFxuICAgIH07XG4gICAgaWYgKGFyZ3MgJiYgYXJncy53aGVyZSAmJiBhcmdzLndoZXJlLmVtYWlsKSB7XG4gICAgICBkZWxldGUgZmluYWxBcmdzLndoZXJlLmVtYWlsO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgcHJpc21hLnF1ZXJ5LnVzZXJzKGZpbmFsQXJncywgaW5mbyk7XG5cbiAgICByZXR1cm4gdXNlcnMubWFwKGFzeW5jICh1c2VyKSA9PiByZXN0cmljdFVzZXJEYXRhKHVzZXIpKTtcbiAgfSxcbn07XG4iLCJpbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXJUeXBlcyc7XG5cbmV4cG9ydCBjb25zdCByZXN0cmljdFVzZXJEYXRhID0gKHVzZXIpOiBVc2VyID0+ICh7XG4gIC4uLnVzZXIsXG4gIGVtYWlsOiAnbnVsbCcsXG4gIHBhc3N3b3JkOiAnbnVsbCcsXG59KTtcblxuY29uc3QgdGVzdFBhc3N3b3JkU3RyZW5ndGggPSAocGFzc3dvcmQpOiB2b2lkID0+IHtcbiAgY29uc3QgcGFzc3dvcmRBcnJheSA9IHBhc3N3b3JkLnNwbGl0KCcnKTtcblxuICBjb25zdCBzcGVjaWFsQ2hhcmFjdGVycyA9IFsnIScsICdAJywgJyMnLCAnJCcsICcmJywgJyonLCAnLSddO1xuICBjb25zdCBpc1VwcGVyQ2FzZSA9IChzdHJpbmcpOiBib29sZWFuID0+IC9eW0EtWl0qJC8udGVzdChzdHJpbmcpO1xuXG4gIGNvbnN0IGhhc051bWJlciA9IC9cXGQvLnRlc3QocGFzc3dvcmQpO1xuICBjb25zdCBoYXNTcGVjaWFsQ2hhcmFjdGVycyA9IHBhc3N3b3JkQXJyYXkuc29tZSgoaSkgPT4gc3BlY2lhbENoYXJhY3RlcnMuaW5jbHVkZXMoaSkpO1xuICBjb25zdCBoYXNVcHBlckNhc2UgPSBwYXNzd29yZEFycmF5LnNvbWUoKGkpID0+IGlzVXBwZXJDYXNlKGkpKTtcbiAgY29uc3QgaXNMb25nRW5vdWdoID0gcGFzc3dvcmQubGVuZ3RoID4gNztcblxuICBjb25zdCBpc1Bhc3N3b3JkU3Ryb25nID0gaGFzTnVtYmVyICYmIGhhc1NwZWNpYWxDaGFyYWN0ZXJzICYmIGhhc1VwcGVyQ2FzZSAmJiBpc0xvbmdFbm91Z2g7XG5cbiAgaWYgKCFpc1Bhc3N3b3JkU3Ryb25nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwYXNzd29yZCBpcyB3ZWFrJyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBoYXNoUGFzc3dvcmQgPSAocGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIHRlc3RQYXNzd29yZFN0cmVuZ3RoKHBhc3N3b3JkKTtcblxuICByZXR1cm4gYmNyeXB0Lmhhc2gocGFzc3dvcmQsIDEwKTtcbn07XG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IEFwb2xsb1NlcnZlciB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgeyBQcmlzbWEgfSBmcm9tICdwcmlzbWEtYmluZGluZyc7XG5pbXBvcnQgeyBQdWJTdWIgfSBmcm9tICdncmFwaHFsLXN1YnNjcmlwdGlvbnMnO1xuaW1wb3J0IGJ1aWxkUGFzc3BvcnRDb250ZXh0IGZyb20gJ21pZGRsZXdhcmUvcGFzc3BvcnQvYnVpbGRQYXNzcG9ydENvbnRleHQnO1xuaW1wb3J0IHJlc29sdmVycyBmcm9tICdzY2hlbWEvcm9vdFJlc29sdmVycy9yb290UmVzb2x2ZXJzJztcbmltcG9ydCB0eXBlRGVmcyBmcm9tICdzY2hlbWEvdHlwZURlZnMvdHlwZURlZnMnO1xuXG4vLyBjcmVhdGVzIG5ldyBhcG9sbG8gc2VydmVyXG5jb25zdCBpbml0aWFsaXplU2VydmVyID0gKFxuICBleHByZXNzU2Vzc2lvbk1pZGRsZXdhcmU6IGV4cHJlc3MuUmVxdWVzdEhhbmRsZXIsXG4gIHBhc3Nwb3J0TWlkZGxld2FyZTogZXhwcmVzcy5IYW5kbGVyLFxuICBwYXNzcG9ydFNlc3Npb25NaWRkbGV3YXJlOiBleHByZXNzLlJlcXVlc3RIYW5kbGVyLFxuICBwcmlzbWE6IFByaXNtYSxcbik6IEFwb2xsb1NlcnZlciA9PiB7XG4gIGNvbnN0IHB1YnN1YiA9IG5ldyBQdWJTdWIoKTtcbiAgcmV0dXJuIG5ldyBBcG9sbG9TZXJ2ZXIoe1xuICAgIGNvbnRleHQ6IChyZXF1ZXN0KSA9PiAoe1xuICAgICAgcGFzc3BvcnQ6IGJ1aWxkUGFzc3BvcnRDb250ZXh0KHsgcmVxdWVzdDogcmVxdWVzdC5yZXEsIHJlc3BvbnNlOiByZXF1ZXN0LnJlcyB9KSxcbiAgICAgIHByaXNtYSxcbiAgICAgIHB1YnN1YixcbiAgICB9KSxcbiAgICBwbGF5Z3JvdW5kOiB7XG4gICAgICBzZXR0aW5nczoge1xuICAgICAgICAncmVxdWVzdC5jcmVkZW50aWFscyc6ICdzYW1lLW9yaWdpbicsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZXJzLFxuICAgIHR5cGVEZWZzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYWxpemVTZXJ2ZXI7XG4iLCJpbnRlcmZhY2UgRXJyb3Ige1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5jbGFzcyBTZXJ2ZXJFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcHVibGljIHN0YXR1czogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihlcnJvcjogRXJyb3IpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgdGhpcy5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VydmVyRXJyb3I7XG4iLCJpbXBvcnQgeyBnb29nbGUgfSBmcm9tICdnb29nbGVhcGlzJztcbmltcG9ydCB7IFlvdXR1YmVWaWRlb0RhdGEgfSBmcm9tICd0eXBlcy95b3V0dWJlVHlwZXMnO1xuaW1wb3J0IHsgZm9ybWF0RHVyYXRpb24sIGZvcm1hdE51bWJlciwgZm9ybWF0UHVibGlzaGVkQXQgfSBmcm9tICcuL3lvdXR1YmVVdGlscyc7XG5cbi8vIGluaXRpYWxpemVzIHRoZSBZb3V0dWJlIERhdGEgQVBJXG5jb25zdCB5b3V0dWJlID0gZ29vZ2xlLnlvdXR1YmUoe1xuICB2ZXJzaW9uOiAndjMnLFxuICBhdXRoOiBwcm9jZXNzLmVudi5HQVBJX0tFWSxcbn0pO1xuXG4vLyBSZXR1cm5zIHRoZSB0aHVtYm5haWwgZm9yIGEgcGFydGljdWxhciB5b3V0dWJlIGNoYW5uZWxcbmNvbnN0IGdldFlvdXR1YmVDaGFubmVsVGh1bWJuYWlsID0gYXN5bmMgKGNoYW5uZWxJZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjaGFubmVsRGF0YSA9IGF3YWl0IHlvdXR1YmUuY2hhbm5lbHMubGlzdCh7XG4gICAgICBwYXJ0OiAnc25pcHBldCcsXG4gICAgICBpZDogY2hhbm5lbElkLFxuICAgIH0pO1xuICAgIHJldHVybiBjaGFubmVsRGF0YS5kYXRhLml0ZW1zWzBdLnNuaXBwZXQudGh1bWJuYWlscy5tZWRpdW0udXJsO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IEVycm9yKGBFcnJvciBsb2FkaW5nIHRoZSB5b3V0dWJlIGNoYW5uZWwgdGh1bWJuYWlsOiAke2Vycm9yfWApO1xuICB9XG59O1xuXG4vLyBSZXR1cm5zIGFsbCBuZWNlc3NhcnkgaW5mb3JtYXRpb24gYWJvdXQgYSBwYXJ0aWN1bGFyIHlvdXR1YmUgdmlkZW8gZ2l2ZW4gaXRzIHZpZGVvIGlkXG5jb25zdCBnZXRZb3V0dWJlVmlkZW9EYXRhID0gYXN5bmMgKHZpZGVvSWQ6IHN0cmluZyk6IFByb21pc2U8WW91dHViZVZpZGVvRGF0YT4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLnZpZGVvcy5saXN0KHtcbiAgICAgIHBhcnQ6ICdjb250ZW50RGV0YWlscyxzbmlwcGV0LHN0YXRpc3RpY3MnLFxuICAgICAgaWQ6IHZpZGVvSWQsXG4gICAgfSk7XG4gICAgY29uc3Qge1xuICAgICAgY29udGVudERldGFpbHMsXG4gICAgICBpZCxcbiAgICAgIHNuaXBwZXQsXG4gICAgICBzdGF0aXN0aWNzLFxuICAgIH0gPSB5b3V0dWJlVmlkZW9EYXRhLmRhdGEuaXRlbXNbMF07XG4gICAgY29uc3QgY2hhbm5lbFRodW1ibmFpbCA9IGF3YWl0IGdldFlvdXR1YmVDaGFubmVsVGh1bWJuYWlsKHNuaXBwZXQuY2hhbm5lbElkKTtcbiAgICByZXR1cm4ge1xuICAgICAgY2hhbm5lbFRodW1ibmFpbCxcbiAgICAgIGNoYW5uZWxUaXRsZTogc25pcHBldC5jaGFubmVsVGl0bGUsXG4gICAgICBkdXJhdGlvbjogZm9ybWF0RHVyYXRpb24oY29udGVudERldGFpbHMuZHVyYXRpb24pLFxuICAgICAgbGlrZXM6IGZvcm1hdE51bWJlcihzdGF0aXN0aWNzLmxpa2VDb3VudCksXG4gICAgICBwdWJsaXNoZWRBdDogZm9ybWF0UHVibGlzaGVkQXQoc25pcHBldC5wdWJsaXNoZWRBdCksXG4gICAgICB2aWRlb0lkOiBpZCxcbiAgICAgIHZpZGVvVGh1bWJuYWlsOiBzbmlwcGV0LnRodW1ibmFpbHMubWVkaXVtLnVybCxcbiAgICAgIHZpZGVvVGl0bGU6IHNuaXBwZXQudGl0bGUsXG4gICAgICB2aWV3czogZm9ybWF0TnVtYmVyKHN0YXRpc3RpY3Mudmlld0NvdW50KSxcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IEVycm9yKGBFcnJvciBnZXR0aW5nIHlvdXR1YmUgdmlkZW8gZGF0YTogJHtlcnJvcn1gKTtcbiAgfVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldFlvdXR1YmVWaWRlb0RhdGEsXG59O1xuIiwiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IG51bWVyYWwgZnJvbSAnbnVtZXJhbCc7XG5cbi8vIFByZWZpeGVzIGFuIGludGVnZXIgd2l0aCAwIGlmIGxlc3MgdGhhbiAxMFxuY29uc3QgZm9ybWF0SW50ID0gKGludDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgaWYgKGludCA8IDEwKSB7XG4gICAgcmV0dXJuIGAwJHtpbnR9YDtcbiAgfVxuICByZXR1cm4gYCR7aW50fWA7XG59O1xuXG4vLyBDcmVhdGVzIGEgY29uc2lzdGVudCB0aW1lIHN0cmluZyBmb3JtYXRcbmV4cG9ydCBjb25zdCBmb3JtYXREdXJhdGlvbiA9ICh0aW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzZWNvbmRzID0gbW9tZW50LmR1cmF0aW9uKHRpbWUpLnNlY29uZHMoKTtcbiAgY29uc3QgbWludXRlcyA9IG1vbWVudC5kdXJhdGlvbih0aW1lKS5taW51dGVzKCk7XG4gIGNvbnN0IGhvdXJzID0gbW9tZW50LmR1cmF0aW9uKHRpbWUpLmhvdXJzKCk7XG4gIGlmIChob3VycyA+IDApIHtcbiAgICByZXR1cm4gYCR7Zm9ybWF0SW50KGhvdXJzKX06JHtmb3JtYXRJbnQobWludXRlcyl9OiR7Zm9ybWF0SW50KHNlY29uZHMpfWA7XG4gIH1cbiAgaWYgKG1pbnV0ZXMgPiAwKSB7XG4gICAgcmV0dXJuIGAke2Zvcm1hdEludChtaW51dGVzKX06JHtmb3JtYXRJbnQoc2Vjb25kcyl9YDtcbiAgfVxuICByZXR1cm4gYDAwOiR7Zm9ybWF0SW50KHNlY29uZHMpfWA7XG59O1xuXG4vLyBGb3JtYXRzIGEgbnVtYmVyIHRvIHRoZSBiZXN0IGFwcHJveGltYXRpb25cbmV4cG9ydCBjb25zdCBmb3JtYXROdW1iZXIgPSAobnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoTnVtYmVyKG51bWJlcikgPiA5OTk5OTkpIHtcbiAgICByZXR1cm4gbnVtZXJhbChudW1iZXIpLmZvcm1hdCgnMC4wYScpO1xuICB9XG4gIHJldHVybiBudW1lcmFsKG51bWJlcikuZm9ybWF0KCcwLDAnKTtcbn07XG5cbi8vIEZvcm1hdHMgdGhlIGRhdGUgYW5kIHRpbWUgYSB2aWRlbyB3YXMgcHVibGlzaGVkIGF0XG5leHBvcnQgY29uc3QgZm9ybWF0UHVibGlzaGVkQXQgPSAoZGF0ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgbW9tZW50LnVwZGF0ZUxvY2FsZSgnZW4nLCB7XG4gICAgcmVsYXRpdmVUaW1lOiB7XG4gICAgICBmdXR1cmU6ICdpbiAlcycsXG4gICAgICBwYXN0OiAnJXMgYWdvJyxcbiAgICAgIHM6ICdhIGZldyBzZWNvbmRzJyxcbiAgICAgIHNzOiAnJWQgc2Vjb25kcycsXG4gICAgICBtOiAnYSBtaW51dGUnLFxuICAgICAgbW06ICclZCBtaW51dGVzJyxcbiAgICAgIGg6ICcxaCcsXG4gICAgICBoaDogJyVkaCcsXG4gICAgICBkOiAnMWQnLFxuICAgICAgZGQ6ICclZGQnLFxuICAgICAgTTogJzFtJyxcbiAgICAgIE1NOiAnJWRtJyxcbiAgICAgIHk6ICcxeScsXG4gICAgICB5eTogJyVkeScsXG4gICAgfSxcbiAgfSk7XG4gIHJldHVybiBtb21lbnQoZGF0ZSkuZnJvbU5vdygpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdvb2dsZWFwaXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm51bWVyYWxcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==