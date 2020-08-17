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
/* harmony import */ var utils_getYoutubeVideoId__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/getYoutubeVideoId */ "./src/utils/getYoutubeVideoId.ts");
/* harmony import */ var youtube_youtube__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! youtube/youtube */ "./src/thirdParty/youtube/youtube.ts");
/* harmony import */ var _cardEnums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cardEnums */ "./src/schema/card/cardEnums.ts");
/* harmony import */ var _cardInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cardInfo */ "./src/schema/card/cardInfo.ts");





/* harmony default export */ __webpack_exports__["default"] = ({
    createYoutubeCard: async (parent, args, { passport, prisma, pubsub }) => {
        try {
            const userId = passport.getUserId();
            const videoId = Object(utils_getYoutubeVideoId__WEBPACK_IMPORTED_MODULE_1__["default"])(args.data.videoUrl);
            const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_2__["default"].getYoutubeVideoData(videoId);
            const finalArgs = {
                ...args,
                data: {
                    cardData: {
                        create: {
                            youtubeCardData: {
                                create: {
                                    ...youtubeVideoData,
                                },
                            },
                        },
                    },
                    isFavorite: false,
                    isToDo: false,
                    type: _cardEnums__WEBPACK_IMPORTED_MODULE_3__["default"].youtube,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            };
            const card = await prisma.mutation.createCard(finalArgs, _cardInfo__WEBPACK_IMPORTED_MODULE_4__["default"]);
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
            const deletedCard = await prisma.mutation.deleteCard(deleteArgs, _cardInfo__WEBPACK_IMPORTED_MODULE_4__["default"]);
            pubsub.publish('deletedUserCard', { deletedUserCard: deletedCard });
            return deletedCard;
        }
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({
            message: 'The user does not have access to delete this card',
            status: 403,
        });
    },
    initiateYoutubeCard: async (parent, args) => {
        try {
            const videoId = Object(utils_getYoutubeVideoId__WEBPACK_IMPORTED_MODULE_1__["default"])(args.data.videoUrl);
            const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_2__["default"].getYoutubeVideoData(videoId);
            return {
                title: youtubeVideoData.channelTitle,
                type: _cardEnums__WEBPACK_IMPORTED_MODULE_3__["default"].youtube,
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
            const updatedCard = await prisma.mutation.updateCard(updateArgs, _cardInfo__WEBPACK_IMPORTED_MODULE_4__["default"]);
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
            const updatedCard = await prisma.mutation.updateCard(updateArgs, _cardInfo__WEBPACK_IMPORTED_MODULE_4__["default"]);
            return updatedCard;
        }
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_0__["default"]({
            message: 'The user does not have access to delete this card',
            status: 403,
        });
    },
});


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZE11dGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QztBQUNXO0FBQ2xCO0FBQ0Y7QUFDRjtBQUVuQjtJQUNiLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3RFLElBQUk7WUFDRixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEMsTUFBTSxPQUFPLEdBQUcsdUVBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sdURBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVwRSxNQUFNLFNBQVMsR0FBRztnQkFDaEIsR0FBRyxJQUFJO2dCQUNQLElBQUksRUFBRTtvQkFDSixRQUFRLEVBQUU7d0JBQ1IsTUFBTSxFQUFFOzRCQUNOLGVBQWUsRUFBRTtnQ0FDZixNQUFNLEVBQUU7b0NBQ04sR0FBRyxnQkFBZ0I7aUNBQ3BCOzZCQUNGO3lCQUNGO3FCQUNGO29CQUNELFVBQVUsRUFBRSxLQUFLO29CQUNqQixNQUFNLEVBQUUsS0FBSztvQkFDYixJQUFJLEVBQUUsa0RBQVMsQ0FBQyxPQUFPO29CQUN2QixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFOzRCQUNQLEVBQUUsRUFBRSxNQUFNO3lCQUNYO3FCQUNGO2lCQUNGO2FBQ0YsQ0FBQztZQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLGlEQUFRLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFB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TTtpQkFDNUI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxNQUFNO2lCQUNYO2FBQ0YsQ0FBQztZQUVGLE1BQU0sV0FBVyxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLGlEQUFRLENBQUMsQ0FBQztZQUMzRSxPQUFPLFdBQVcsQ0FBQztTQUNwQjtRQUVELE1BQU0sSUFBSSwwREFBVyxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxtREFBbUQ7WUFDNUQsTUFBTSxFQUFFLEdBQUc7U0FDWixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsRUFBQyIsImZpbGUiOiJtYWluLjM2MWQyZDU5ZTI0NzllODE0OGU1LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCBnZXRZb3V0dWJlVmlkZW9JZCBmcm9tICd1dGlscy9nZXRZb3V0dWJlVmlkZW9JZCc7XG5pbXBvcnQgeW91dHViZSBmcm9tICd5b3V0dWJlL3lvdXR1YmUnO1xuaW1wb3J0IGNhcmRFbnVtcyBmcm9tICcuL2NhcmRFbnVtcyc7XG5pbXBvcnQgY2FyZEluZm8gZnJvbSAnLi9jYXJkSW5mbyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3JlYXRlWW91dHViZUNhcmQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSwgcHVic3ViIH0pID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gICAgICBjb25zdCB2aWRlb0lkID0gZ2V0WW91dHViZVZpZGVvSWQoYXJncy5kYXRhLnZpZGVvVXJsKTtcbiAgICAgIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodmlkZW9JZCk7XG5cbiAgICAgIGNvbnN0IGZpbmFsQXJncyA9IHtcbiAgICAgICAgLi4uYXJncyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGNhcmREYXRhOiB7XG4gICAgICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICAgICAgeW91dHViZUNhcmREYXRhOiB7XG4gICAgICAgICAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgICAgICAgICAuLi55b3V0dWJlVmlkZW9EYXRhLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNGYXZvcml0ZTogZmFsc2UsXG4gICAgICAgICAgaXNUb0RvOiBmYWxzZSxcbiAgICAgICAgICB0eXBlOiBjYXJkRW51bXMueW91dHViZSxcbiAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICBjb25uZWN0OiB7XG4gICAgICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjYXJkID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLmNyZWF0ZUNhcmQoZmluYWxBcmdzLCBjYXJkSW5mbyk7XG4gICAgICBwdWJzdWIucHVibGlzaCgndXNlckNhcmQnLCB7IHVzZXJDYXJkOiBjYXJkIH0pO1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICAgIH1cbiAgfSxcbiAgZGVsZXRlVXNlckNhcmQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSwgcHVic3ViIH0pID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgICBjb25zdCB7IGNhcmRJZCB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgcXVlcnlBcmdzID0ge1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVBcmdzID0ge1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBjYXJkIHRoYXQgaXMgdHJ5aW5nIHRvIGJlIGRlbGV0ZWQgYmVsb25ncyB0byB0aGUgdXNlclxuICAgIGNvbnN0IHVzZXJDYXJkID0gYXdhaXQgcHJpc21hLnF1ZXJ5LmNhcmRzKHF1ZXJ5QXJncywgJ3sgaWQgfScpO1xuXG4gICAgaWYgKHVzZXJDYXJkLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGRlbGV0ZWRDYXJkID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLmRlbGV0ZUNhcmQoZGVsZXRlQXJncywgY2FyZEluZm8pO1xuICAgICAgcHVic3ViLnB1Ymxpc2goJ2RlbGV0ZWRVc2VyQ2FyZCcsIHsgZGVsZXRlZFVzZXJDYXJkOiBkZWxldGVkQ2FyZCB9KTtcbiAgICAgIHJldHVybiBkZWxldGVkQ2FyZDtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3Ioe1xuICAgICAgbWVzc2FnZTogJ1RoZSB1c2VyIGRvZXMgbm90IGhhdmUgYWNjZXNzIHRvIGRlbGV0ZSB0aGlzIGNhcmQnLFxuICAgICAgc3RhdHVzOiA0MDMsXG4gICAgfSk7XG4gIH0sXG4gIGluaXRpYXRlWW91dHViZUNhcmQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmlkZW9JZCA9IGdldFlvdXR1YmVWaWRlb0lkKGFyZ3MuZGF0YS52aWRlb1VybCk7XG4gICAgICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKHZpZGVvSWQpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogeW91dHViZVZpZGVvRGF0YS5jaGFubmVsVGl0bGUsXG4gICAgICAgIHR5cGU6IGNhcmRFbnVtcy55b3V0dWJlLFxuICAgICAgICB5b3V0dWJlQ2FyZERhdGE6IHlvdXR1YmVWaWRlb0RhdGEsXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gIH0sXG4gIHRvZ2dsZUZhdm9yaXRlVXNlckNhcmQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSB9KSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gICAgY29uc3QgeyBjYXJkSWQgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IHF1ZXJ5QXJncyA9IHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGNhcmQgdGhhdCBpcyB0cnlpbmcgdG8gYmUgZGVsZXRlZCBiZWxvbmdzIHRvIHRoZSB1c2VyXG4gICAgY29uc3QgdXNlckNhcmQgPSBhd2FpdCBwcmlzbWEucXVlcnkuY2FyZHMocXVlcnlBcmdzLCAneyBpZCBpc0Zhdm9yaXRlIH0nKTtcblxuICAgIGlmICh1c2VyQ2FyZC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB1cGRhdGVBcmdzID0ge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgaXNGYXZvcml0ZTogIXVzZXJDYXJkWzBdLmlzRmF2b3JpdGUsXG4gICAgICAgIH0sXG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWRDYXJkID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLnVwZGF0ZUNhcmQodXBkYXRlQXJncywgY2FyZEluZm8pO1xuICAgICAgcmV0dXJuIHVwZGF0ZWRDYXJkO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7XG4gICAgICBtZXNzYWdlOiAnVGhlIHVzZXIgZG9lcyBub3QgaGF2ZSBhY2Nlc3MgdG8gZGVsZXRlIHRoaXMgY2FyZCcsXG4gICAgICBzdGF0dXM6IDQwMyxcbiAgICB9KTtcbiAgfSxcbiAgdG9nZ2xlVG9Eb1VzZXJDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEgfSkgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICAgIGNvbnN0IHsgY2FyZElkIH0gPSBhcmdzLmRhdGE7XG5cbiAgICBjb25zdCBxdWVyeUFyZ3MgPSB7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBjYXJkIHRoYXQgaXMgdHJ5aW5nIHRvIGJlIGRlbGV0ZWQgYmVsb25ncyB0byB0aGUgdXNlclxuICAgIGNvbnN0IHVzZXJDYXJkID0gYXdhaXQgcHJpc21hLnF1ZXJ5LmNhcmRzKHF1ZXJ5QXJncywgJ3sgaWQgaXNUb0RvIH0nKTtcblxuICAgIGlmICh1c2VyQ2FyZC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB1cGRhdGVBcmdzID0ge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgaXNUb0RvOiAhdXNlckNhcmRbMF0uaXNUb0RvLFxuICAgICAgICB9LFxuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB1cGRhdGVkQ2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi51cGRhdGVDYXJkKHVwZGF0ZUFyZ3MsIGNhcmRJbmZvKTtcbiAgICAgIHJldHVybiB1cGRhdGVkQ2FyZDtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3Ioe1xuICAgICAgbWVzc2FnZTogJ1RoZSB1c2VyIGRvZXMgbm90IGhhdmUgYWNjZXNzIHRvIGRlbGV0ZSB0aGlzIGNhcmQnLFxuICAgICAgc3RhdHVzOiA0MDMsXG4gICAgfSk7XG4gIH0sXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==