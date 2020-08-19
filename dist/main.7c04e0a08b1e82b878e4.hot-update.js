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
    createUserCard: async (parent, args, { passport, prisma, pubsub }) => {
        try {
            const { category, isFavorite, isToDo, title, type, url, } = args.data;
            const userId = passport.getUserId();
            let createArgs;
            if (type === _cardEnums__WEBPACK_IMPORTED_MODULE_3__["default"].youtube) {
                const videoId = Object(utils_getYoutubeVideoId__WEBPACK_IMPORTED_MODULE_1__["default"])(url);
                const youtubeVideoData = await youtube_youtube__WEBPACK_IMPORTED_MODULE_2__["default"].getYoutubeVideoData(videoId);
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
    initiateUserCard: async (parent, args) => {
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


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZE11dGF0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL3Jlc29sdmVycy9tdXRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNkM7QUFDVztBQUNsQjtBQUNGO0FBQ0Y7QUFFbkI7SUFDYixjQUFjLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDbkUsSUFBSTtZQUNGLE1BQU0sRUFDSixRQUFRLEVBQ1IsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsSUFBSSxFQUNKLEdBQUcsR0FDSixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFZCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEMsSUFBSSxVQUFrQixDQUFDO1lBRXZCLElBQUksSUFBSSxLQUFLLGtEQUFTLENBQUMsT0FBTyxFQUFFO2dCQUM5QixNQUFNLE9BQU8sR0FBRyx1RUFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLHVEQUFPLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BFLFVBQVUsR0FBRztvQkFDWCxlQUFlLEVBQUU7d0JBQ2YsTUFBTSxFQUFFOzRCQUNOLEdBQUcsZ0JBQWdCO3lCQUNwQjtxQkFDRjtpQkFDRixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ3RDO1lBRUQsTUFBTSxTQUFTLEdBQUc7Z0JBQ2hCLEdBQUcsSUFBSTtnQkFDUCxJQUFJLEVBQUU7b0JBQ0osUUFBUSxFQUFFO3dCQUNSLE1BQU0sRUFBRSxFQUFFLEdBQUcsVUFBVSxFQUFF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RCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFN0IsTUFBTSxTQUFTLEdBQUc7WUFDaEIsS0FBSyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxNQUFNO2dCQUNWLElBQUksRUFBRTtvQkFDSixFQUFFLEVBQUUsTUFBTTtpQkFDWDthQUNGO1NBQ0YsQ0FBQztRQUVGLDJFQUEyRTtRQUMzRSxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUV0RSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLE1BQU0sVUFBVSxHQUFHO2dCQUNqQixJQUFJLEVBQUU7b0JBQ0osTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07aUJBQzVCO2dCQUNELEtBQUssRUFBRTtvQkFDTCxFQUFFLEVBQUUsTUFBTTtpQkFDWDthQUNGLENBQUM7WUFFRixNQUFNLFdBQVcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxpREFBUSxDQUFDLENBQUM7WUFDM0UsT0FBTyxXQUFXLENBQUM7U0FDcEI7UUFFRCxNQUFNLElBQUksMERBQVcsQ0FBQztZQUNwQixPQUFPLEVBQUUsbURBQW1EO1lBQzVELE1BQU0sRUFBRSxHQUFHO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN2TEY7QUFBQTtBQUFBO0FBQWtEO0FBQ0E7QUFFbkM7SUFDYixHQUFHLDJEQUFhO0lBQ2hCLEdBQUcsMkRBQWE7Q0FDakIsRUFBQyIsImZpbGUiOiJtYWluLjdjMDRlMGEwOGIxZTgyYjg3OGU0LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmVyRXJyb3IgZnJvbSAnc2VydmVyL3NlcnZlckVycm9yJztcbmltcG9ydCBnZXRZb3V0dWJlVmlkZW9JZCBmcm9tICd1dGlscy9nZXRZb3V0dWJlVmlkZW9JZCc7XG5pbXBvcnQgeW91dHViZSBmcm9tICd5b3V0dWJlL3lvdXR1YmUnO1xuaW1wb3J0IGNhcmRFbnVtcyBmcm9tICcuL2NhcmRFbnVtcyc7XG5pbXBvcnQgY2FyZEluZm8gZnJvbSAnLi9jYXJkSW5mbyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3JlYXRlVXNlckNhcmQ6IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHsgcGFzc3BvcnQsIHByaXNtYSwgcHVic3ViIH0pID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgaXNGYXZvcml0ZSxcbiAgICAgICAgaXNUb0RvLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgdHlwZSxcbiAgICAgICAgdXJsLFxuICAgICAgfSA9IGFyZ3MuZGF0YTtcblxuICAgICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gICAgICBsZXQgY3JlYXRlQXJnczogb2JqZWN0O1xuXG4gICAgICBpZiAodHlwZSA9PT0gY2FyZEVudW1zLnlvdXR1YmUpIHtcbiAgICAgICAgY29uc3QgdmlkZW9JZCA9IGdldFlvdXR1YmVWaWRlb0lkKHVybCk7XG4gICAgICAgIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodmlkZW9JZCk7XG4gICAgICAgIGNyZWF0ZUFyZ3MgPSB7XG4gICAgICAgICAgeW91dHViZUNhcmREYXRhOiB7XG4gICAgICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICAgICAgLi4ueW91dHViZVZpZGVvRGF0YSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjYXJkIHR5cGUnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmluYWxBcmdzID0ge1xuICAgICAgICAuLi5hcmdzLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY2FyZERhdGE6IHtcbiAgICAgICAgICAgIGNyZWF0ZTogeyAuLi5jcmVhdGVBcmdzIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICBpc0Zhdm9yaXRlLFxuICAgICAgICAgIGlzVG9EbyxcbiAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICB0eXBlLFxuICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgIGNvbm5lY3Q6IHtcbiAgICAgICAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24uY3JlYXRlQ2FyZChmaW5hbEFyZ3MsIGNhcmRJbmZvKTtcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCd1c2VyQ2FyZCcsIHsgdXNlckNhcmQ6IGNhcmQgfSk7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICB9LFxuICBkZWxldGVVc2VyQ2FyZDogYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hLCBwdWJzdWIgfSkgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICAgIGNvbnN0IHsgY2FyZElkIH0gPSBhcmdzLmRhdGE7XG5cbiAgICBjb25zdCBxdWVyeUFyZ3MgPSB7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZUFyZ3MgPSB7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogY2FyZElkLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGNhcmQgdGhhdCBpcyB0cnlpbmcgdG8gYmUgZGVsZXRlZCBiZWxvbmdzIHRvIHRoZSB1c2VyXG4gICAgY29uc3QgdXNlckNhcmQgPSBhd2FpdCBwcmlzbWEucXVlcnkuY2FyZHMocXVlcnlBcmdzLCAneyBpZCB9Jyk7XG5cbiAgICBpZiAodXNlckNhcmQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZGVsZXRlZENhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24uZGVsZXRlQ2FyZChkZWxldGVBcmdzLCBjYXJkSW5mbyk7XG4gICAgICBwdWJzdWIucHVibGlzaCgnZGVsZXRlZFVzZXJDYXJkJywgeyBkZWxldGVkVXNlckNhcmQ6IGRlbGV0ZWRDYXJkIH0pO1xuICAgICAgcmV0dXJuIGRlbGV0ZWRDYXJkO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBTZXJ2ZXJFcnJvcih7XG4gICAgICBtZXNzYWdlOiAnVGhlIHVzZXIgZG9lcyBub3QgaGF2ZSBhY2Nlc3MgdG8gZGVsZXRlIHRoaXMgY2FyZCcsXG4gICAgICBzdGF0dXM6IDQwMyxcbiAgICB9KTtcbiAgfSxcbiAgaW5pdGlhdGVVc2VyQ2FyZDogYXN5bmMgKHBhcmVudCwgYXJncykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoYXJncy5kYXRhLnR5cGUgPT09IGNhcmRFbnVtcy55b3V0dWJlKSB7XG4gICAgICAgIGNvbnN0IHZpZGVvSWQgPSBnZXRZb3V0dWJlVmlkZW9JZChhcmdzLmRhdGEudXJsKTtcbiAgICAgICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh2aWRlb0lkKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNhdGVnb3J5OiBjYXJkRW51bXMudmlkZW8sXG4gICAgICAgICAgdGl0bGU6IHlvdXR1YmVWaWRlb0RhdGEuY2hhbm5lbFRpdGxlLFxuICAgICAgICAgIHVybDogYXJncy5kYXRhLnVybCxcbiAgICAgICAgICB5b3V0dWJlQ2FyZERhdGE6IHlvdXR1YmVWaWRlb0RhdGEsXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjYXJkIHR5cGUnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICB9LFxuICB0b2dnbGVGYXZvcml0ZVVzZXJDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEgfSkgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICAgIGNvbnN0IHsgY2FyZElkIH0gPSBhcmdzLmRhdGE7XG5cbiAgICBjb25zdCBxdWVyeUFyZ3MgPSB7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBjYXJkIHRoYXQgaXMgdHJ5aW5nIHRvIGJlIGRlbGV0ZWQgYmVsb25ncyB0byB0aGUgdXNlclxuICAgIGNvbnN0IHVzZXJDYXJkID0gYXdhaXQgcHJpc21hLnF1ZXJ5LmNhcmRzKHF1ZXJ5QXJncywgJ3sgaWQgaXNGYXZvcml0ZSB9Jyk7XG5cbiAgICBpZiAodXNlckNhcmQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdXBkYXRlQXJncyA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGlzRmF2b3JpdGU6ICF1c2VyQ2FyZFswXS5pc0Zhdm9yaXRlLFxuICAgICAgICB9LFxuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB1cGRhdGVkQ2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi51cGRhdGVDYXJkKHVwZGF0ZUFyZ3MsIGNhcmRJbmZvKTtcbiAgICAgIHJldHVybiB1cGRhdGVkQ2FyZDtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3Ioe1xuICAgICAgbWVzc2FnZTogJ1RoZSB1c2VyIGRvZXMgbm90IGhhdmUgYWNjZXNzIHRvIGRlbGV0ZSB0aGlzIGNhcmQnLFxuICAgICAgc3RhdHVzOiA0MDMsXG4gICAgfSk7XG4gIH0sXG4gIHRvZ2dsZVRvRG9Vc2VyQ2FyZDogYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hIH0pID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgICBjb25zdCB7IGNhcmRJZCB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgcXVlcnlBcmdzID0ge1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgY2FyZCB0aGF0IGlzIHRyeWluZyB0byBiZSBkZWxldGVkIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgICBjb25zdCB1c2VyQ2FyZCA9IGF3YWl0IHByaXNtYS5xdWVyeS5jYXJkcyhxdWVyeUFyZ3MsICd7IGlkIGlzVG9EbyB9Jyk7XG5cbiAgICBpZiAodXNlckNhcmQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdXBkYXRlQXJncyA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGlzVG9EbzogIXVzZXJDYXJkWzBdLmlzVG9EbyxcbiAgICAgICAgfSxcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgdXBkYXRlZENhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24udXBkYXRlQ2FyZCh1cGRhdGVBcmdzLCBjYXJkSW5mbyk7XG4gICAgICByZXR1cm4gdXBkYXRlZENhcmQ7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHtcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdGhpcyBjYXJkJyxcbiAgICAgIHN0YXR1czogNDAzLFxuICAgIH0pO1xuICB9LFxufTtcbiIsImltcG9ydCBjYXJkTXV0YXRpb25zIGZyb20gJy4uL2NhcmQvY2FyZE11dGF0aW9ucyc7XG5pbXBvcnQgdXNlck11dGF0aW9ucyBmcm9tICcuLi91c2VyL3VzZXJNdXRhdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC4uLmNhcmRNdXRhdGlvbnMsXG4gIC4uLnVzZXJNdXRhdGlvbnMsXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==