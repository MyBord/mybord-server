exports.id = "main";
exports.modules = {

/***/ "./src/schema/card/cardMutations.ts":
/*!******************************************!*\
  !*** ./src/schema/card/cardMutations.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var youtube_youtube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! youtube/youtube */ "./src/thirdParty/youtube/youtube.ts");
/* harmony import */ var _cardEnums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cardEnums */ "./src/schema/card/cardEnums.ts");
/* harmony import */ var _cardInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cardInfo */ "./src/schema/card/cardInfo.ts");
/* harmony import */ var _cardUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cardUtils */ "./src/schema/card/cardUtils.ts");





/* harmony default export */ __webpack_exports__["default"] = ({
    createUserCard: async (parent, args, { passport, prisma, pubsub }) => {
        try {
            const { category, isFavorite, isToDo, title, url, } = args.data;
            const userId = passport.getUserId();
            let createArgs;
            if (type === _cardEnums__WEBPACK_IMPORTED_MODULE_2__["default"].youtube) {
                const videoId = Object(_cardUtils__WEBPACK_IMPORTED_MODULE_4__["getYoutubeVideoId"])(url);
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
            const card = await prisma.mutation.createCard(finalArgs, _cardInfo__WEBPACK_IMPORTED_MODULE_3__["default"]);
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
            const deletedCard = await prisma.mutation.deleteCard(deleteArgs, _cardInfo__WEBPACK_IMPORTED_MODULE_3__["default"]);
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
            const videoId = Object(_cardUtils__WEBPACK_IMPORTED_MODULE_4__["getYoutubeVideoId"])(args.data.url);
            const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_1__["default"].getYoutubeVideoData(videoId);
            return {
                category: _cardEnums__WEBPACK_IMPORTED_MODULE_2__["default"].video,
                title: youtubeVideoData.channelTitle,
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
            const updatedCard = await prisma.mutation.updateCard(updateArgs, _cardInfo__WEBPACK_IMPORTED_MODULE_3__["default"]);
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
            const updatedCard = await prisma.mutation.updateCard(updateArgs, _cardInfo__WEBPACK_IMPORTED_MODULE_3__["default"]);
            return updatedCard;
        }
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({
            message: 'The user does not have access to delete this card',
            status: 403,
        });
    },
});


/***/ }),

/***/ "./src/schema/card/cardUtils.ts":
/*!**************************************!*\
  !*** ./src/schema/card/cardUtils.ts ***!
  \**************************************/
/*! exports provided: getYoutubeVideoId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getYoutubeVideoId", function() { return getYoutubeVideoId; });
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

/***/ "./src/schema/resolvers/mutations.ts":
/*!*******************************************!*\
  !*** ./src/schema/resolvers/mutations.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _card_cardMutations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../card/cardMutations */ "./src/schema/card/cardMutations.ts");
/* harmony import */ var _user_userMutations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user/userMutations */ "./src/schema/user/userMutations.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    ..._card_cardMutations__WEBPACK_IMPORTED_MODULE_0__["default"],
    ..._user_userMutations__WEBPACK_IMPORTED_MODULE_1__["default"],
});


/***/ }),

/***/ "./src/schema/user/userMutations.ts":
/*!******************************************!*\
  !*** ./src/schema/user/userMutations.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var _userUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userUtils */ "./src/schema/user/userUtils.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    createUser: async (parent, args, { passport, prisma }, info) => {
        try {
            const password = await Object(_userUtils__WEBPACK_IMPORTED_MODULE_1__["hashPassword"])(args.data.password);
            const finalArgs = {
                ...args,
                data: {
                    ...args.data,
                    password,
                },
            };
            const user = await prisma.mutation.createUser(finalArgs, info);
            passport.login({ authenticateOptions: args.data, user });
            return Object(_userUtils__WEBPACK_IMPORTED_MODULE_1__["restrictUserData"])(user);
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
            return Object(_userUtils__WEBPACK_IMPORTED_MODULE_1__["restrictUserData"])(user);
        }
        catch (error) {
            throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({ message: 'Unable to login', status: 401 });
        }
    },
});


/***/ }),

/***/ "./src/schema/user/userQueries.ts":
/*!****************************************!*\
  !*** ./src/schema/user/userQueries.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _userUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userUtils */ "./src/schema/user/userUtils.ts");

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
        return users.map(async (user) => Object(_userUtils__WEBPACK_IMPORTED_MODULE_0__["restrictUserData"])(user));
    },
});


/***/ }),

/***/ "./src/schema/user/userUtils.ts":
/*!**************************************!*\
  !*** ./src/schema/user/userUtils.ts ***!
  \**************************************/
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

/***/ "./src/utils/getYoutubeVideoId.ts":
false,

/***/ "./src/utils/hashPassword.ts":
false,

/***/ "./src/utils/restrictUserData.ts":
false

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZE11dGF0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvcmVzb2x2ZXJzL211dGF0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlck11dGF0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3VzZXIvdXNlclF1ZXJpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS91c2VyL3VzZXJVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QztBQUNQO0FBQ0Y7QUFDRjtBQUNjO0FBRWpDO0lBQ2IsY0FBYyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ25FLElBQUk7WUFDRixNQUFNLEVBQ0osUUFBUSxFQUNSLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLEdBQUcsR0FDSixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFZCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEMsSUFBSSxVQUFrQixDQUFDO1lBRXZCLElBQUksSUFBSSxLQUFLLGtEQUFTLENBQUMsT0FBTyxFQUFFO2dCQUM5QixNQUFNLE9BQU8sR0FBRyxvRUFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLHVEQUFPLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BFLFVBQVUsR0FBRztvQkFDWCxlQUFlLEVBQUU7d0JBQ2YsTUFBTSxFQUFFOzRCQUNOLEdBQUcsZ0JBQWdCO3lCQUNwQjtxQkFDRjtpQkFD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QUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXpDLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5RCxNQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sRUFBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVqRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sb0JBQW9CLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEYsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFFekMsTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLElBQUksb0JBQW9CLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQztJQUUzRixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0tBQ3JDO0FBQ0gsQ0FBQyxDQUFDO0FBRUssTUFBTSxZQUFZLEdBQUcsQ0FBQyxRQUFnQixFQUFtQixFQUFFO0lBQ2hFLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRS9CLE9BQU8sK0NBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmJjZDgxMzMyZDJjOTliZmYzYjI2LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCB5b3V0dWJlIGZyb20gJ3lvdXR1YmUveW91dHViZSc7XG5pbXBvcnQgY2FyZEVudW1zIGZyb20gJy4vY2FyZEVudW1zJztcbmltcG9ydCBjYXJkSW5mbyBmcm9tICcuL2NhcmRJbmZvJztcbmltcG9ydCB7IGdldFlvdXR1YmVWaWRlb0lkIH0gZnJvbSAnLi9jYXJkVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVVzZXJDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgIGlzRmF2b3JpdGUsXG4gICAgICAgIGlzVG9EbyxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHVybCxcbiAgICAgIH0gPSBhcmdzLmRhdGE7XG5cbiAgICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICAgICAgbGV0IGNyZWF0ZUFyZ3M6IG9iamVjdDtcblxuICAgICAgaWYgKHR5cGUgPT09IGNhcmRFbnVtcy55b3V0dWJlKSB7XG4gICAgICAgIGNvbnN0IHZpZGVvSWQgPSBnZXRZb3V0dWJlVmlkZW9JZCh1cmwpO1xuICAgICAgICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKHZpZGVvSWQpO1xuICAgICAgICBjcmVhdGVBcmdzID0ge1xuICAgICAgICAgIHlvdXR1YmVDYXJkRGF0YToge1xuICAgICAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgICAgIC4uLnlvdXR1YmVWaWRlb0RhdGEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY2FyZCB0eXBlJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpbmFsQXJncyA9IHtcbiAgICAgICAgLi4uYXJncyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGNhcmREYXRhOiB7XG4gICAgICAgICAgICBjcmVhdGU6IHsgLi4uY3JlYXRlQXJncyB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgICAgaXNGYXZvcml0ZSxcbiAgICAgICAgICBpc1RvRG8sXG4gICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgdHlwZSxcbiAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICBjb25uZWN0OiB7XG4gICAgICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjYXJkID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLmNyZWF0ZUNhcmQoZmluYWxBcmdzLCBjYXJkSW5mbyk7XG4gICAgICBwdWJzdWIucHVibGlzaCgndXNlckNhcmQnLCB7IHVzZXJDYXJkOiBjYXJkIH0pO1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICAgIH1cbiAgfSxcbiAgZGVsZXRlVXNlckNhcmQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSwgcHVic3ViIH0pID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgICBjb25zdCB7IGNhcmRJZCB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgcXVlcnlBcmdzID0ge1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVBcmdzID0ge1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBjYXJkIHRoYXQgaXMgdHJ5aW5nIHRvIGJlIGRlbGV0ZWQgYmVsb25ncyB0byB0aGUgdXNlclxuICAgIGNvbnN0IHVzZXJDYXJkID0gYXdhaXQgcHJpc21hLnF1ZXJ5LmNhcmRzKHF1ZXJ5QXJncywgJ3sgaWQgfScpO1xuXG4gICAgaWYgKHVzZXJDYXJkLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGRlbGV0ZWRDYXJkID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLmRlbGV0ZUNhcmQoZGVsZXRlQXJncywgY2FyZEluZm8pO1xuICAgICAgcHVic3ViLnB1Ymxpc2goJ2RlbGV0ZWRVc2VyQ2FyZCcsIHsgZGVsZXRlZFVzZXJDYXJkOiBkZWxldGVkQ2FyZCB9KTtcbiAgICAgIHJldHVybiBkZWxldGVkQ2FyZDtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3Ioe1xuICAgICAgbWVzc2FnZTogJ1RoZSB1c2VyIGRvZXMgbm90IGhhdmUgYWNjZXNzIHRvIGRlbGV0ZSB0aGlzIGNhcmQnLFxuICAgICAgc3RhdHVzOiA0MDMsXG4gICAgfSk7XG4gIH0sXG4gIGluaXRpYXRlVXNlckNhcmQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmlkZW9JZCA9IGdldFlvdXR1YmVWaWRlb0lkKGFyZ3MuZGF0YS51cmwpO1xuICAgICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh2aWRlb0lkKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2F0ZWdvcnk6IGNhcmRFbnVtcy52aWRlbyxcbiAgICAgICAgdGl0bGU6IHlvdXR1YmVWaWRlb0RhdGEuY2hhbm5lbFRpdGxlLFxuICAgICAgICB1cmw6IGFyZ3MuZGF0YS51cmwsXG4gICAgICAgIHlvdXR1YmVDYXJkRGF0YTogeW91dHViZVZpZGVvRGF0YSxcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICAgIH1cbiAgfSxcbiAgdG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZDogYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hIH0pID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgICBjb25zdCB7IGNhcmRJZCB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgcXVlcnlBcmdzID0ge1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgY2FyZCB0aGF0IGlzIHRyeWluZyB0byBiZSBkZWxldGVkIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgICBjb25zdCB1c2VyQ2FyZCA9IGF3YWl0IHByaXNtYS5xdWVyeS5jYXJkcyhxdWVyeUFyZ3MsICd7IGlkIGlzRmF2b3JpdGUgfScpO1xuXG4gICAgaWYgKHVzZXJDYXJkLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHVwZGF0ZUFyZ3MgPSB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpc0Zhdm9yaXRlOiAhdXNlckNhcmRbMF0uaXNGYXZvcml0ZSxcbiAgICAgICAgfSxcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgdXBkYXRlZENhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24udXBkYXRlQ2FyZCh1cGRhdGVBcmdzLCBjYXJkSW5mbyk7XG4gICAgICByZXR1cm4gdXBkYXRlZENhcmQ7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHtcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdGhpcyBjYXJkJyxcbiAgICAgIHN0YXR1czogNDAzLFxuICAgIH0pO1xuICB9LFxuICB0b2dnbGVUb0RvVXNlckNhcmQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSB9KSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gICAgY29uc3QgeyBjYXJkSWQgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IHF1ZXJ5QXJncyA9IHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGNhcmQgdGhhdCBpcyB0cnlpbmcgdG8gYmUgZGVsZXRlZCBiZWxvbmdzIHRvIHRoZSB1c2VyXG4gICAgY29uc3QgdXNlckNhcmQgPSBhd2FpdCBwcmlzbWEucXVlcnkuY2FyZHMocXVlcnlBcmdzLCAneyBpZCBpc1RvRG8gfScpO1xuXG4gICAgaWYgKHVzZXJDYXJkLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHVwZGF0ZUFyZ3MgPSB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpc1RvRG86ICF1c2VyQ2FyZFswXS5pc1RvRG8sXG4gICAgICAgIH0sXG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWRDYXJkID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLnVwZGF0ZUNhcmQodXBkYXRlQXJncywgY2FyZEluZm8pO1xuICAgICAgcmV0dXJuIHVwZGF0ZWRDYXJkO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7XG4gICAgICBtZXNzYWdlOiAnVGhlIHVzZXIgZG9lcyBub3QgaGF2ZSBhY2Nlc3MgdG8gZGVsZXRlIHRoaXMgY2FyZCcsXG4gICAgICBzdGF0dXM6IDQwMyxcbiAgICB9KTtcbiAgfSxcbn07XG4iLCIvLyBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNzcyODQxNy83NDYwNDY3XG5leHBvcnQgY29uc3QgZ2V0WW91dHViZVZpZGVvSWQgPSAodXJsKTogc3RyaW5nID0+IHtcbiAgaWYgKFxuICAgIHVybC5pbmNsdWRlcygneW91dHViZS5jb20nKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHUuYmUnKVxuICAgIHx8IHVybC5pbmNsdWRlcygneW91dHViZS1ub2Nvb2tpZS5jb20nKVxuICApIHtcbiAgICBjb25zdCByZWdFeHAgPSAvXi4qKD86KD86eW91dHVcXC5iZVxcL3x2XFwvfHZpXFwvfHVcXC9cXHdcXC98ZW1iZWRcXC8pfCg/Oig/OndhdGNoKT9cXD92KD86aSk/PXxcXCZ2KD86aSk/PSkpKFteI1xcJlxcP10qKS4qLztcbiAgICBjb25zdCBtYXRjaCA9IHVybC5tYXRjaChyZWdFeHApO1xuICAgIGlmIChtYXRjaCAmJiBtYXRjaFsxXSkge1xuICAgICAgcmV0dXJuIG1hdGNoWzFdO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcignWW91ciB5b3V0dWJlIHVybCBpcyBub3QgdmFsaWQnKTtcbiAgfVxuICB0aHJvdyBFcnJvcignWW91IG11c3QgcHJvdmlkZSBhIHlvdXR1YmUgdXJsJyk7XG59O1xuIiwiaW1wb3J0IGNhcmRNdXRhdGlvbnMgZnJvbSAnLi4vY2FyZC9jYXJkTXV0YXRpb25zJztcbmltcG9ydCB1c2VyTXV0YXRpb25zIGZyb20gJy4uL3VzZXIvdXNlck11dGF0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4uY2FyZE11dGF0aW9ucyxcbiAgLi4udXNlck11dGF0aW9ucyxcbn07XG4iLCJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCB7IGhhc2hQYXNzd29yZCwgcmVzdHJpY3RVc2VyRGF0YSB9IGZyb20gJy4vdXNlclV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjcmVhdGVVc2VyOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEgfSwgaW5mbykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXNzd29yZCA9IGF3YWl0IGhhc2hQYXNzd29yZChhcmdzLmRhdGEucGFzc3dvcmQpO1xuICAgICAgY29uc3QgZmluYWxBcmdzID0ge1xuICAgICAgICAuLi5hcmdzLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgLi4uYXJncy5kYXRhLFxuICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5jcmVhdGVVc2VyKGZpbmFsQXJncywgaW5mbyk7XG5cbiAgICAgIHBhc3Nwb3J0LmxvZ2luKHsgYXV0aGVudGljYXRlT3B0aW9uczogYXJncy5kYXRhLCB1c2VyIH0pO1xuXG4gICAgICByZXR1cm4gcmVzdHJpY3RVc2VyRGF0YSh1c2VyKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoJ3VuaXF1ZSBjb25zdHJhaW50JykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogJ2R1cGxpY2F0ZSB1c2VyJywgc3RhdHVzOiA0MDAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3IubWVzc2FnZSA9PT0gJ3Bhc3N3b3JkIGlzIHdlYWsnKSB7XG4gICAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbG9naW5Vc2VyOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0IH0pID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyB1c2VyIH0gPSBhd2FpdCBwYXNzcG9ydC5hdXRoZW50aWNhdGUoe1xuICAgICAgICBhdXRoZW50aWNhdGVPcHRpb25zOiBhcmdzLmRhdGEsXG4gICAgICAgIHN0cmF0ZWd5TmFtZTogJ2xvY2FsJyxcbiAgICAgIH0pO1xuXG4gICAgICBwYXNzcG9ydC5sb2dpbih7IGF1dGhlbnRpY2F0ZU9wdGlvbnM6IGFyZ3MuZGF0YSwgdXNlciB9KTtcblxuICAgICAgcmV0dXJuIHJlc3RyaWN0VXNlckRhdGEodXNlcik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6ICdVbmFibGUgdG8gbG9naW4nLCBzdGF0dXM6IDQwMSB9KTtcbiAgICB9XG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgcmVzdHJpY3RVc2VyRGF0YSB9IGZyb20gJy4vdXNlclV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0F1dGhlbnRpY2F0ZWQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQgfSkgPT4gKFxuICAgIHBhc3Nwb3J0LmlzQXV0aGVudGljYXRlZCgpXG4gICksXG4gIGxvZ291dFVzZXI6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQgfSkgPT4gcGFzc3BvcnQubG9nb3V0KCksXG4gIHVzZXJzOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHByaXNtYSB9LCBpbmZvKSA9PiB7XG4gICAgY29uc3QgZmluYWxBcmdzID0ge1xuICAgICAgLi4uYXJncyxcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIC4uLmFyZ3Mud2hlcmUsXG4gICAgICB9LFxuICAgIH07XG4gICAgaWYgKGFyZ3MgJiYgYXJncy53aGVyZSAmJiBhcmdzLndoZXJlLmVtYWlsKSB7XG4gICAgICBkZWxldGUgZmluYWxBcmdzLndoZXJlLmVtYWlsO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgcHJpc21hLnF1ZXJ5LnVzZXJzKGZpbmFsQXJncywgaW5mbyk7XG5cbiAgICByZXR1cm4gdXNlcnMubWFwKGFzeW5jICh1c2VyKSA9PiByZXN0cmljdFVzZXJEYXRhKHVzZXIpKTtcbiAgfSxcbn07XG4iLCJpbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXJUeXBlcyc7XG5cbmV4cG9ydCBjb25zdCByZXN0cmljdFVzZXJEYXRhID0gKHVzZXIpOiBVc2VyID0+ICh7XG4gIC4uLnVzZXIsXG4gIGVtYWlsOiAnbnVsbCcsXG4gIHBhc3N3b3JkOiAnbnVsbCcsXG59KTtcblxuY29uc3QgdGVzdFBhc3N3b3JkU3RyZW5ndGggPSAocGFzc3dvcmQpOiB2b2lkID0+IHtcbiAgY29uc3QgcGFzc3dvcmRBcnJheSA9IHBhc3N3b3JkLnNwbGl0KCcnKTtcblxuICBjb25zdCBzcGVjaWFsQ2hhcmFjdGVycyA9IFsnIScsICdAJywgJyMnLCAnJCcsICcmJywgJyonLCAnLSddO1xuICBjb25zdCBpc1VwcGVyQ2FzZSA9IChzdHJpbmcpOiBib29sZWFuID0+IC9eW0EtWl0qJC8udGVzdChzdHJpbmcpO1xuXG4gIGNvbnN0IGhhc051bWJlciA9IC9cXGQvLnRlc3QocGFzc3dvcmQpO1xuICBjb25zdCBoYXNTcGVjaWFsQ2hhcmFjdGVycyA9IHBhc3N3b3JkQXJyYXkuc29tZSgoaSkgPT4gc3BlY2lhbENoYXJhY3RlcnMuaW5jbHVkZXMoaSkpO1xuICBjb25zdCBoYXNVcHBlckNhc2UgPSBwYXNzd29yZEFycmF5LnNvbWUoKGkpID0+IGlzVXBwZXJDYXNlKGkpKTtcbiAgY29uc3QgaXNMb25nRW5vdWdoID0gcGFzc3dvcmQubGVuZ3RoID4gNztcblxuICBjb25zdCBpc1Bhc3N3b3JkU3Ryb25nID0gaGFzTnVtYmVyICYmIGhhc1NwZWNpYWxDaGFyYWN0ZXJzICYmIGhhc1VwcGVyQ2FzZSAmJiBpc0xvbmdFbm91Z2g7XG5cbiAgaWYgKCFpc1Bhc3N3b3JkU3Ryb25nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwYXNzd29yZCBpcyB3ZWFrJyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBoYXNoUGFzc3dvcmQgPSAocGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIHRlc3RQYXNzd29yZFN0cmVuZ3RoKHBhc3N3b3JkKTtcblxuICByZXR1cm4gYmNyeXB0Lmhhc2gocGFzc3dvcmQsIDEwKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9