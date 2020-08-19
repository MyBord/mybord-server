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
            const type = Object(_cardUtils__WEBPACK_IMPORTED_MODULE_4__["getCardType"])(url);
            const userId = passport.getUserId();
            let createArgs;
            if (type === 'Youtube') {
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


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZE11dGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QztBQUNQO0FBQ0Y7QUFDRjtBQUMyQjtBQUU5QztJQUNiLGNBQWMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUNuRSxJQUFJO1lBQ0YsTUFBTSxFQUNKLFFBQVEsRUFDUixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxHQUFHLEdBQ0osR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRWQsTUFBTSxJQUFJLEdBQUcsOERBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUU5QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEMsSUFBSSxVQUFrQixDQUFDO1lBRXZCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDdEIsTUFBTSxPQUFPLEdBQUcsb0VBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSx1REFBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwRSxVQUFVLEdBQUc7b0JBQ1gsZUFBZSxFQUFFO3dCQUNmLE1BQU0sRUFBRTs0QkFDTixHQUFHLGdCQUFnQjt5QkFDcEI7cUJBQ0Y7aUJBQ0YsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUN0QztZQUVELE1BQU0sU0FBUyxHQUFHO2dCQUNoQixHQUFHLElBQUk7Z0JBQ1AsSUFBSSxFQUFFO29CQUNKLFFBQVEsRUFBRTt3QkFDUixNQUFNLEVBQUUsRUFBRSxHQUFHLFVBQVUsRUFBRTtxQkFDMUI7b0JBQ0QsUUFBUTtvQkFD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QUFFLEVBQUUsTUFBTTtnQkFDVixJQUFJLEVBQUU7b0JBQ0osRUFBRSxFQUFFLE1BQU07aUJBQ1g7YUFDRjtTQUNGLENBQUM7UUFFRiwyRUFBMkU7UUFDM0UsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFdEUsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixNQUFNLFVBQVUsR0FBRztnQkFDakIsSUFBSSxFQUFFO29CQUNKLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO2lCQUM1QjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLE1BQU07aUJBQ1g7YUFDRixDQUFDO1lBRUYsTUFBTSxXQUFXLEdBQUcsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsaURBQVEsQ0FBQyxDQUFDO1lBQzNFLE9BQU8sV0FBVyxDQUFDO1NBQ3BCO1FBRUQsTUFBTSxJQUFJLDBEQUFXLENBQUM7WUFDcEIsT0FBTyxFQUFFLG1EQUFtRDtZQUM1RCxNQUFNLEVBQUUsR0FBRztTQUNaLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixFQUFDIiwiZmlsZSI6Im1haW4uNTFiZWVjMGY4MzgyZjAwMThjYTAuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHlvdXR1YmUgZnJvbSAneW91dHViZS95b3V0dWJlJztcbmltcG9ydCBjYXJkRW51bXMgZnJvbSAnLi9jYXJkRW51bXMnO1xuaW1wb3J0IGNhcmRJbmZvIGZyb20gJy4vY2FyZEluZm8nO1xuaW1wb3J0IHsgZ2V0Q2FyZFR5cGUsIGdldFlvdXR1YmVWaWRlb0lkIH0gZnJvbSAnLi9jYXJkVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVVzZXJDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgIGlzRmF2b3JpdGUsXG4gICAgICAgIGlzVG9EbyxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHVybCxcbiAgICAgIH0gPSBhcmdzLmRhdGE7XG5cbiAgICAgIGNvbnN0IHR5cGUgPSBnZXRDYXJkVHlwZSh1cmwpO1xuXG4gICAgICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgICAgIGxldCBjcmVhdGVBcmdzOiBvYmplY3Q7XG5cbiAgICAgIGlmICh0eXBlID09PSAnWW91dHViZScpIHtcbiAgICAgICAgY29uc3QgdmlkZW9JZCA9IGdldFlvdXR1YmVWaWRlb0lkKHVybCk7XG4gICAgICAgIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodmlkZW9JZCk7XG4gICAgICAgIGNyZWF0ZUFyZ3MgPSB7XG4gICAgICAgICAgeW91dHViZUNhcmREYXRhOiB7XG4gICAgICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICAgICAgLi4ueW91dHViZVZpZGVvRGF0YSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjYXJkIHR5cGUnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmluYWxBcmdzID0ge1xuICAgICAgICAuLi5hcmdzLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY2FyZERhdGE6IHtcbiAgICAgICAgICAgIGNyZWF0ZTogeyAuLi5jcmVhdGVBcmdzIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICBpc0Zhdm9yaXRlLFxuICAgICAgICAgIGlzVG9EbyxcbiAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICB0eXBlLFxuICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgIGNvbm5lY3Q6IHtcbiAgICAgICAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24uY3JlYXRlQ2FyZChmaW5hbEFyZ3MsIGNhcmRJbmZvKTtcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCd1c2VyQ2FyZCcsIHsgdXNlckNhcmQ6IGNhcmQgfSk7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICB9LFxuICBkZWxldGVVc2VyQ2FyZDogYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hLCBwdWJzdWIgfSkgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICAgIGNvbnN0IHsgY2FyZElkIH0gPSBhcmdzLmRhdGE7XG5cbiAgICBjb25zdCBxdWVyeUFyZ3MgPSB7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZUFyZ3MgPSB7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogY2FyZElkLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGNhcmQgdGhhdCBpcyB0cnlpbmcgdG8gYmUgZGVsZXRlZCBiZWxvbmdzIHRvIHRoZSB1c2VyXG4gICAgY29uc3QgdXNlckNhcmQgPSBhd2FpdCBwcmlzbWEucXVlcnkuY2FyZHMocXVlcnlBcmdzLCAneyBpZCB9Jyk7XG5cbiAgICBpZiAodXNlckNhcmQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZGVsZXRlZENhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24uZGVsZXRlQ2FyZChkZWxldGVBcmdzLCBjYXJkSW5mbyk7XG4gICAgICBwdWJzdWIucHVibGlzaCgnZGVsZXRlZFVzZXJDYXJkJywgeyBkZWxldGVkVXNlckNhcmQ6IGRlbGV0ZWRDYXJkIH0pO1xuICAgICAgcmV0dXJuIGRlbGV0ZWRDYXJkO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7XG4gICAgICBtZXNzYWdlOiAnVGhlIHVzZXIgZG9lcyBub3QgaGF2ZSBhY2Nlc3MgdG8gZGVsZXRlIHRoaXMgY2FyZCcsXG4gICAgICBzdGF0dXM6IDQwMyxcbiAgICB9KTtcbiAgfSxcbiAgaW5pdGlhdGVVc2VyQ2FyZDogYXN5bmMgKHBhcmVudCwgYXJncykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB2aWRlb0lkID0gZ2V0WW91dHViZVZpZGVvSWQoYXJncy5kYXRhLnVybCk7XG4gICAgICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKHZpZGVvSWQpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBjYXRlZ29yeTogY2FyZEVudW1zLnZpZGVvLFxuICAgICAgICB0aXRsZTogeW91dHViZVZpZGVvRGF0YS52aWRlb1RpdGxlLFxuICAgICAgICB1cmw6IGFyZ3MuZGF0YS51cmwsXG4gICAgICAgIHlvdXR1YmVDYXJkRGF0YTogeW91dHViZVZpZGVvRGF0YSxcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogNDAwIH0pO1xuICAgIH1cbiAgfSxcbiAgdG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZDogYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hIH0pID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgICBjb25zdCB7IGNhcmRJZCB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgcXVlcnlBcmdzID0ge1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgY2FyZCB0aGF0IGlzIHRyeWluZyB0byBiZSBkZWxldGVkIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgICBjb25zdCB1c2VyQ2FyZCA9IGF3YWl0IHByaXNtYS5xdWVyeS5jYXJkcyhxdWVyeUFyZ3MsICd7IGlkIGlzRmF2b3JpdGUgfScpO1xuXG4gICAgaWYgKHVzZXJDYXJkLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHVwZGF0ZUFyZ3MgPSB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpc0Zhdm9yaXRlOiAhdXNlckNhcmRbMF0uaXNGYXZvcml0ZSxcbiAgICAgICAgfSxcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgdXBkYXRlZENhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24udXBkYXRlQ2FyZCh1cGRhdGVBcmdzLCBjYXJkSW5mbyk7XG4gICAgICByZXR1cm4gdXBkYXRlZENhcmQ7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHtcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdGhpcyBjYXJkJyxcbiAgICAgIHN0YXR1czogNDAzLFxuICAgIH0pO1xuICB9LFxuICB0b2dnbGVUb0RvVXNlckNhcmQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSB9KSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gICAgY29uc3QgeyBjYXJkSWQgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IHF1ZXJ5QXJncyA9IHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGNhcmQgdGhhdCBpcyB0cnlpbmcgdG8gYmUgZGVsZXRlZCBiZWxvbmdzIHRvIHRoZSB1c2VyXG4gICAgY29uc3QgdXNlckNhcmQgPSBhd2FpdCBwcmlzbWEucXVlcnkuY2FyZHMocXVlcnlBcmdzLCAneyBpZCBpc1RvRG8gfScpO1xuXG4gICAgaWYgKHVzZXJDYXJkLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHVwZGF0ZUFyZ3MgPSB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpc1RvRG86ICF1c2VyQ2FyZFswXS5pc1RvRG8sXG4gICAgICAgIH0sXG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWRDYXJkID0gYXdhaXQgcHJpc21hLm11dGF0aW9uLnVwZGF0ZUNhcmQodXBkYXRlQXJncywgY2FyZEluZm8pO1xuICAgICAgcmV0dXJuIHVwZGF0ZWRDYXJkO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7XG4gICAgICBtZXNzYWdlOiAnVGhlIHVzZXIgZG9lcyBub3QgaGF2ZSBhY2Nlc3MgdG8gZGVsZXRlIHRoaXMgY2FyZCcsXG4gICAgICBzdGF0dXM6IDQwMyxcbiAgICB9KTtcbiAgfSxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9