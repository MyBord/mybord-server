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
    initiateCard: async (parent, args) => {
        try {
            if (args.data.type === _cardEnums__WEBPACK_IMPORTED_MODULE_3__["default"].youtube) {
                const videoId = Object(utils_getYoutubeVideoId__WEBPACK_IMPORTED_MODULE_1__["default"])(args.data.url);
                const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_2__["default"].getYoutubeVideoData(videoId);
                return {
                    category: _cardEnums__WEBPACK_IMPORTED_MODULE_3__["default"].video,
                    title: youtubeVideoData.channelTitle,
                    url: args.data.url,
                    youtubeCardData: youtubeVideoData,
                };
            }
            throw new Error('invalid card type');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZE11dGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QztBQUNXO0FBQ2xCO0FBQ0Y7QUFDRjtBQUVuQjtJQUNiLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3RFLElBQUk7WUFDRixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEMsTUFBTSxPQUFPLEdBQUcsdUVBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sdURBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVwRSxNQUFNLFNBQVMsR0FBRztnQkFDaEIsR0FBRyxJQUFJO2dCQUNQLElBQUksRUFBRTtvQkFDSixRQUFRLEVBQUU7d0JBQ1IsTUFBTSxFQUFFOzRCQUNOLGVBQWUsRUFBRTtnQ0FDZixNQUFNLEVBQUU7b0NBQ04sR0FBRyxnQkFBZ0I7aUNBQ3BCOzZCQUNGO3lCQUNGO3FCQUNGO29CQUNELFVBQVUsRUFBRSxLQUFLO29CQUNqQixNQUFNLEVBQUUsS0FBSztvQkFDYixJQUFJLEVBQUUsa0RBQVMsQ0FBQyxPQUFPO29CQUN2QixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFOzRCQUNQLEVBQUUsRUFBRSxNQUFNO3lCQUNYO3FCQUNGO2lCQUNGO2FBQ0YsQ0FBQztZQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLGlEQUFRLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFB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LFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUV0RSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLE1BQU0sVUFBVSxHQUFHO2dCQUNqQixJQUFJLEVBQUU7b0JBQ0osTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07aUJBQzVCO2dCQUNELEtBQUssRUFBRTtvQkFDTCxFQUFFLEVBQUUsTUFBTTtpQkFDWDthQUNGLENBQUM7WUFFRixNQUFNLFdBQVcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxpREFBUSxDQUFDLENBQUM7WUFDM0UsT0FBTyxXQUFXLENBQUM7U0FDcEI7UUFFRCxNQUFNLElBQUksMERBQVcsQ0FBQztZQUNwQixPQUFPLEVBQUUsbURBQW1EO1lBQzVELE1BQU0sRUFBRSxHQUFHO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLEVBQUMiLCJmaWxlIjoibWFpbi42NjJiZmI1MDhkNGFmZWRiYjAyNC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgZ2V0WW91dHViZVZpZGVvSWQgZnJvbSAndXRpbHMvZ2V0WW91dHViZVZpZGVvSWQnO1xuaW1wb3J0IHlvdXR1YmUgZnJvbSAneW91dHViZS95b3V0dWJlJztcbmltcG9ydCBjYXJkRW51bXMgZnJvbSAnLi9jYXJkRW51bXMnO1xuaW1wb3J0IGNhcmRJbmZvIGZyb20gJy4vY2FyZEluZm8nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVlvdXR1YmVDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICAgICAgY29uc3QgdmlkZW9JZCA9IGdldFlvdXR1YmVWaWRlb0lkKGFyZ3MuZGF0YS52aWRlb1VybCk7XG4gICAgICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKHZpZGVvSWQpO1xuXG4gICAgICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgICAgIC4uLmFyZ3MsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjYXJkRGF0YToge1xuICAgICAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgICAgIHlvdXR1YmVDYXJkRGF0YToge1xuICAgICAgICAgICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgICAgICAgICAgLi4ueW91dHViZVZpZGVvRGF0YSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzRmF2b3JpdGU6IGZhbHNlLFxuICAgICAgICAgIGlzVG9EbzogZmFsc2UsXG4gICAgICAgICAgdHlwZTogY2FyZEVudW1zLnlvdXR1YmUsXG4gICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgY29ubmVjdDoge1xuICAgICAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgY2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5jcmVhdGVDYXJkKGZpbmFsQXJncywgY2FyZEluZm8pO1xuICAgICAgcHVic3ViLnB1Ymxpc2goJ3VzZXJDYXJkJywgeyB1c2VyQ2FyZDogY2FyZCB9KTtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gIH0sXG4gIGRlbGV0ZVVzZXJDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9KSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gICAgY29uc3QgeyBjYXJkSWQgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IHF1ZXJ5QXJncyA9IHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlQXJncyA9IHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgY2FyZCB0aGF0IGlzIHRyeWluZyB0byBiZSBkZWxldGVkIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgICBjb25zdCB1c2VyQ2FyZCA9IGF3YWl0IHByaXNtYS5xdWVyeS5jYXJkcyhxdWVyeUFyZ3MsICd7IGlkIH0nKTtcblxuICAgIGlmICh1c2VyQ2FyZC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBkZWxldGVkQ2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5kZWxldGVDYXJkKGRlbGV0ZUFyZ3MsIGNhcmRJbmZvKTtcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdkZWxldGVkVXNlckNhcmQnLCB7IGRlbGV0ZWRVc2VyQ2FyZDogZGVsZXRlZENhcmQgfSk7XG4gICAgICByZXR1cm4gZGVsZXRlZENhcmQ7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHtcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdGhpcyBjYXJkJyxcbiAgICAgIHN0YXR1czogNDAzLFxuICAgIH0pO1xuICB9LFxuICBpbml0aWF0ZUNhcmQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKGFyZ3MuZGF0YS50eXBlID09PSBjYXJkRW51bXMueW91dHViZSkge1xuICAgICAgICBjb25zdCB2aWRlb0lkID0gZ2V0WW91dHViZVZpZGVvSWQoYXJncy5kYXRhLnVybCk7XG4gICAgICAgIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodmlkZW9JZCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjYXRlZ29yeTogY2FyZEVudW1zLnZpZGVvLFxuICAgICAgICAgIHRpdGxlOiB5b3V0dWJlVmlkZW9EYXRhLmNoYW5uZWxUaXRsZSxcbiAgICAgICAgICB1cmw6IGFyZ3MuZGF0YS51cmwsXG4gICAgICAgICAgeW91dHViZUNhcmREYXRhOiB5b3V0dWJlVmlkZW9EYXRhLFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY2FyZCB0eXBlJyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICAgIH1cbiAgfSxcbiAgdG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZDogYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hIH0pID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgICBjb25zdCB7IGNhcmRJZCB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgcXVlcnlBcmdzID0ge1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgY2FyZCB0aGF0IGlzIHRyeWluZyB0byBiZSBkZWxldGVkIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgICBjb25zdCB1c2VyQ2FyZCA9IGF3YWl0IHByaXNtYS5xdWVyeS5jYXJkcyhxdWVyeUFyZ3MsICd7IGlkIGlzRmF2b3JpdGUgfScpO1xuXG4gICAgaWYgKHVzZXJDYXJkLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHVwZGF0ZUFyZ3MgPSB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpc0Zhdm9yaXRlOiAhdXNlckNhcmRbMF0uaXNGYXZvcml0ZSxcbiAgICAgICAgfSxcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgdXBkYXRlZENhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24udXBkYXRlQ2FyZCh1cGRhdGVBcmdzLCBjYXJkSW5mbyk7XG4gICAgICByZXR1cm4gdXBkYXRlZENhcmQ7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHtcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdGhpcyBjYXJkJyxcbiAgICAgIHN0YXR1czogNDAzLFxuICAgIH0pO1xuICB9LFxuICB0b2dnbGVUb0RvVXNlckNhcmQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSB9KSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gICAgY29uc3QgeyBjYXJkSWQgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IHF1ZXJ5QXJncyA9IHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGNhcmQgdGhhdCBpcyB0cnlpbmcgdG8gYmUgZGVsZXRlZCBiZWxvbmdzIHRvIHRoZSB1c2VyXG4gICAgY29uc3QgdXNlckNhcmQgPSBhd2FpdCBwcmlzbWEucXVlcnkuY2FyZHMocXVlcnlBcmdzLCAneyBpZCBpc1RvRG8gfScpO1xuXG4gICAgaWYgKHVzZXJDYXJkLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHVwZGF0ZUFyZ3MgPSB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpc1RvRG86ICF1c2VyQ2FyZFswXS5pc1RvRG8sXG4gICAgICAgIH0sXG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWRDYXJkID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLnVwZGF0ZUNhcmQodXBkYXRlQXJncywgY2FyZEluZm8pO1xuICAgICAgcmV0dXJuIHVwZGF0ZWRDYXJkO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7XG4gICAgICBtZXNzYWdlOiAnVGhlIHVzZXIgZG9lcyBub3QgaGF2ZSBhY2Nlc3MgdG8gZGVsZXRlIHRoaXMgY2FyZCcsXG4gICAgICBzdGF0dXM6IDQwMyxcbiAgICB9KTtcbiAgfSxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9