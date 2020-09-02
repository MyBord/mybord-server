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
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var youtube_youtube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! youtube/youtube */ "./src/thirdParty/youtube/youtube.ts");
/* harmony import */ var _cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cardUtils/cardEnums */ "./src/schema/card/cardUtils/cardEnums.ts");
/* harmony import */ var _cardUtils_cardInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../cardUtils/cardInfo */ "./src/schema/card/cardUtils/cardInfo.ts");
/* harmony import */ var _cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../cardUtils/cardUtils */ "./src/schema/card/cardUtils/cardUtils.ts");
/* harmony import */ var _createUserCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createUserCard */ "./src/schema/card/cardResolvers/cardMutations/createUserCard.ts");






/* harmony default export */ __webpack_exports__["default"] = ({
    createUserCard: _createUserCard__WEBPACK_IMPORTED_MODULE_5__["default"],
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


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NhcmRNdXRhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9yb290UmVzb2x2ZXJzL211dGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FBQ1A7QUFDWTtBQUNGO0FBQzJCO0FBQzdCO0FBRS9CO0lBQ2IsdUVBQWM7SUFDZCxjQUFjLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDbkUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRTdCLE1BQU0sU0FBUyxHQUFHO1lBQ2hCLEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsTUFBTTtnQkFDVixJQUFJLEVBQUU7b0JBQ0osRUFBRSxFQUFFLE1BQU07aUJBQ1g7YUFDRjtTQUNGLENBQUM7UUFFRixNQUFNLFVBQVUsR0FBRztZQUNqQixLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLE1BQU07YUFDWDtTQUNGLENBQUM7UUFFRiwyRUFBMkU7UUFDM0UsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFL0QsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixNQUFNLFdBQVcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSwyREFBUSxDQUFDLENBQUM7WUFDM0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFB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ZSxDQUFDLENBQUM7UUFFdEUsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixNQUFNLFVBQVUsR0FBRztnQkFDakIsSUFBSSxFQUFFO29CQUNKLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO2lCQUM1QjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLE1BQU07aUJBQ1g7YUFDRixDQUFDO1lBRUYsTUFBTSxXQUFXLEdBQUcsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsMkRBQVEsQ0FBQyxDQUFDO1lBQzNFLE9BQU8sV0FBVyxDQUFDO1NBQ3BCO1FBRUQsTUFBTSxJQUFJLDBEQUFXLENBQUM7WUFDcEIsT0FBTyxFQUFFLG1EQUFtRDtZQUM1RCxNQUFNLEVBQUUsR0FBRztTQUNaLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixFQUFDOzs7Ozs7Ozs7Ozs7O0FDL0hGO0FBQUE7QUFBQTtBQUE4RTtBQUNBO0FBRS9EO0lBQ2IsR0FBRyx1RkFBYTtJQUNoQixHQUFHLHVGQUFhO0NBQ2pCLEVBQUMiLCJmaWxlIjoibWFpbi5mZWVhOTc4OGQwODM0YmQ3NzUxNy5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgeW91dHViZSBmcm9tICd5b3V0dWJlL3lvdXR1YmUnO1xuaW1wb3J0IGNhcmRFbnVtcyBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZEVudW1zJztcbmltcG9ydCBjYXJkSW5mbyBmcm9tICcuLi8uLi9jYXJkVXRpbHMvY2FyZEluZm8nO1xuaW1wb3J0IHsgZ2V0Q2FyZFR5cGUsIGdldFlvdXR1YmVWaWRlb0lkIH0gZnJvbSAnLi4vLi4vY2FyZFV0aWxzL2NhcmRVdGlscyc7XG5pbXBvcnQgY3JlYXRlVXNlckNhcmQgZnJvbSAnLi9jcmVhdGVVc2VyQ2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3JlYXRlVXNlckNhcmQsXG4gIGRlbGV0ZVVzZXJDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9KSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gICAgY29uc3QgeyBjYXJkSWQgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IHF1ZXJ5QXJncyA9IHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlQXJncyA9IHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgY2FyZCB0aGF0IGlzIHRyeWluZyB0byBiZSBkZWxldGVkIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgICBjb25zdCB1c2VyQ2FyZCA9IGF3YWl0IHByaXNtYS5xdWVyeS5jYXJkcyhxdWVyeUFyZ3MsICd7IGlkIH0nKTtcblxuICAgIGlmICh1c2VyQ2FyZC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBkZWxldGVkQ2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5kZWxldGVDYXJkKGRlbGV0ZUFyZ3MsIGNhcmRJbmZvKTtcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdkZWxldGVkVXNlckNhcmQnLCB7IGRlbGV0ZWRVc2VyQ2FyZDogZGVsZXRlZENhcmQgfSk7XG4gICAgICByZXR1cm4gZGVsZXRlZENhcmQ7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHtcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdGhpcyBjYXJkJyxcbiAgICAgIHN0YXR1czogNDAzLFxuICAgIH0pO1xuICB9LFxuICBpbml0aWF0ZVVzZXJDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZpZGVvSWQgPSBnZXRZb3V0dWJlVmlkZW9JZChhcmdzLmRhdGEudXJsKTtcbiAgICAgIGNvbnN0IHlvdXR1YmVWaWRlb0RhdGEgPSBhd2FpdCB5b3V0dWJlLmdldFlvdXR1YmVWaWRlb0RhdGEodmlkZW9JZCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNhdGVnb3J5OiBjYXJkRW51bXMudmlkZW8sXG4gICAgICAgIHRpdGxlOiB5b3V0dWJlVmlkZW9EYXRhLnZpZGVvVGl0bGUsXG4gICAgICAgIHVybDogYXJncy5kYXRhLnVybCxcbiAgICAgICAgeW91dHViZUNhcmREYXRhOiB5b3V0dWJlVmlkZW9EYXRhLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICB9LFxuICB0b2dnbGVGYXZvcml0ZVVzZXJDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEgfSkgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICAgIGNvbnN0IHsgY2FyZElkIH0gPSBhcmdzLmRhdGE7XG5cbiAgICBjb25zdCBxdWVyeUFyZ3MgPSB7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBjYXJkIHRoYXQgaXMgdHJ5aW5nIHRvIGJlIGRlbGV0ZWQgYmVsb25ncyB0byB0aGUgdXNlclxuICAgIGNvbnN0IHVzZXJDYXJkID0gYXdhaXQgcHJpc21hLnF1ZXJ5LmNhcmRzKHF1ZXJ5QXJncywgJ3sgaWQgaXNGYXZvcml0ZSB9Jyk7XG5cbiAgICBpZiAodXNlckNhcmQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdXBkYXRlQXJncyA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGlzRmF2b3JpdGU6ICF1c2VyQ2FyZFswXS5pc0Zhdm9yaXRlLFxuICAgICAgICB9LFxuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB1cGRhdGVkQ2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi51cGRhdGVDYXJkKHVwZGF0ZUFyZ3MsIGNhcmRJbmZvKTtcbiAgICAgIHJldHVybiB1cGRhdGVkQ2FyZDtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3Ioe1xuICAgICAgbWVzc2FnZTogJ1RoZSB1c2VyIGRvZXMgbm90IGhhdmUgYWNjZXNzIHRvIGRlbGV0ZSB0aGlzIGNhcmQnLFxuICAgICAgc3RhdHVzOiA0MDMsXG4gICAgfSk7XG4gIH0sXG4gIHRvZ2dsZVRvRG9Vc2VyQ2FyZDogYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hIH0pID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgICBjb25zdCB7IGNhcmRJZCB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgcXVlcnlBcmdzID0ge1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgY2FyZCB0aGF0IGlzIHRyeWluZyB0byBiZSBkZWxldGVkIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgICBjb25zdCB1c2VyQ2FyZCA9IGF3YWl0IHByaXNtYS5xdWVyeS5jYXJkcyhxdWVyeUFyZ3MsICd7IGlkIGlzVG9EbyB9Jyk7XG5cbiAgICBpZiAodXNlckNhcmQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdXBkYXRlQXJncyA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGlzVG9EbzogIXVzZXJDYXJkWzBdLmlzVG9EbyxcbiAgICAgICAgfSxcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgdXBkYXRlZENhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24udXBkYXRlQ2FyZCh1cGRhdGVBcmdzLCBjYXJkSW5mbyk7XG4gICAgICByZXR1cm4gdXBkYXRlZENhcmQ7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHtcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdGhpcyBjYXJkJyxcbiAgICAgIHN0YXR1czogNDAzLFxuICAgIH0pO1xuICB9LFxufTtcbiIsImltcG9ydCBjYXJkTXV0YXRpb25zIGZyb20gJy4uL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NhcmRNdXRhdGlvbnMnO1xuaW1wb3J0IHVzZXJNdXRhdGlvbnMgZnJvbSAnLi4vdXNlci91c2VyUmVzb2x2ZXJzL3VzZXJNdXRhdGlvbnMvdXNlck11dGF0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4uY2FyZE11dGF0aW9ucyxcbiAgLi4udXNlck11dGF0aW9ucyxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9