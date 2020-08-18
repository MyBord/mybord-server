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
                category: _cardEnums__WEBPACK_IMPORTED_MODULE_3__["default"].video,
                title: youtubeVideoData.channelTitle,
                url: args.data.videoUrl,
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


/***/ }),

/***/ "./src/schema/card/cardSchema.graphql":
/*!********************************************!*\
  !*** ./src/schema/card/cardSchema.graphql ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"CardCategory"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"Video"},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Filters"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"isFavorite"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"isToDo"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"FilteredUserCardsType"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"filters"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Filters"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userCards"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"InitialCardData"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"category"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CardCategory"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"url"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"youtubeCardData"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"YoutubeCardData"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"CardFilterInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"isFavorite"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"isToDo"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"CardIdInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"cardId"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"YoutubeCardInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"videoUrl"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Mutation"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"createYoutubeCard"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"YoutubeCardInput"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deleteUserCard"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CardIdInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"initiateYoutubeCard"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"YoutubeCardInput"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InitialCardData"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"toggleFavoriteUserCard"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CardIdInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"toggleToDoUserCard"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CardIdInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}},"directives":[]}]},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Subscription"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"deletedUserCard"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"filteredUserCards"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilteredUserCardsType"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userCard"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}},"directives":[]}]},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"userCards"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userCardsWithFilters"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CardFilterInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Card"}}}}},"directives":[]}]}],"loc":{"start":0,"end":1089}};
    doc.loc.source = {"body":"# ----- ENUMS ----- #\n\nenum CardCategory {\n  Video\n}\n\n# ----- TYPES ----- #\n\ntype Filters {\n  isFavorite: Boolean\n  isToDo: Boolean\n}\n\ntype FilteredUserCardsType {\n  filters: Filters!\n  userCards: [Card!]!\n}\n\ntype InitialCardData {\n  category: CardCategory!\n  title: String!\n  url: String!\n  youtubeCardData: YoutubeCardData!\n}\n\n# ----- INPUTS ----- #\n\ninput CardFilterInput {\n  isFavorite: Boolean\n  isToDo: Boolean\n}\n\ninput CardIdInput {\n  cardId: String!\n}\n\ninput YoutubeCardInput {\n  videoUrl: String!\n}\n\n# ----- MUTATION ----- #\n\nextend type Mutation {\n  createYoutubeCard(data: YoutubeCardInput!): Card!\n  deleteUserCard(data: CardIdInput): Card!\n  initiateYoutubeCard(data: YoutubeCardInput!): InitialCardData!\n  toggleFavoriteUserCard(data: CardIdInput): Card!\n  toggleToDoUserCard(data: CardIdInput): Card!\n}\n\n# ----- SUBSCRIPTION ----- #\n\nextend type Subscription {\n  deletedUserCard: Card!\n  filteredUserCards: FilteredUserCardsType!\n  userCard: Card!\n}\n\n# ----- QUERY ----- #\n\nextend type Query {\n  userCards: [Card!]!\n  userCardsWithFilters(data: CardFilterInput): [Card!]!\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZE11dGF0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFNjaGVtYS5ncmFwaHFsIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWEvcmVzb2x2ZXJzL211dGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QztBQUNXO0FBQ2xCO0FBQ0Y7QUFDRjtBQUVuQjtJQUNiLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3RFLElBQUk7WUFDRixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEMsTUFBTSxPQUFPLEdBQUcsdUVBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sdURBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVwRSxNQUFNLFNBQVMsR0FBRztnQkFDaEIsR0FBRyxJQUFJO2dCQUNQLElBQUksRUFBRTtvQkFDSixRQUFRLEVBQUU7d0JBQ1IsTUFBTSxFQUFFOzRCQUNOLGVBQWUsRUFBRTtnQ0FDZixNQUFNLEVBQUU7b0NBQ04sR0FBRyxnQkFBZ0I7aUNBQ3BCOzZCQUNGO3lCQUNGO3FCQUNGO29CQUNELFVBQVUsRUFBRSxLQUFLO29CQUNqQixNQUFNLEVBQUUsS0FBSztvQkFDYixJQUFJLEVBQUUsa0RBQVMsQ0FBQyxPQUFPO29CQUN2QixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFOzRCQUNQLEVBQUUsRUFBRSxNQUFNO3lCQUNYO3FCQUNGO2lCQUNGO2FBQ0YsQ0FBQztZQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxD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RUFBRSxxQ0FBcUMscUNBQXFDLDRDQUE0QyxpQ0FBaUMsd0NBQXdDLHdCQUF3Qiw2QkFBNkIsMkJBQTJCLCtCQUErQixpQkFBaUIsRUFBRSxpQ0FBaUMsMENBQTBDLHdCQUF3Qiw2QkFBNkIsMkJBQTJCLGdEQUFnRCxpQkFBaUIsRUFBRSxpQ0FBaUMsaUNBQWlDLHdCQUF3Qiw2QkFBNkIsMkJBQTJCLCtCQUErQixpQkFBaUIsRUFBRSxFQUFFLHFDQUFxQyw4QkFBOEIsNENBQTRDLGlDQUFpQyxrQ0FBa0Msd0JBQXdCLDZCQUE2QiwwQkFBMEIsNkJBQTZCLDJCQUEyQixpQ0FBaUMsaUJBQWlCLEVBQUUsaUNBQWlDLDZDQUE2QyxlQUFlLHNDQUFzQyw2QkFBNkIsU0FBUywyQkFBMkIseUNBQXlDLGlCQUFpQixVQUFVLDZCQUE2QiwwQkFBMEIsNkJBQTZCLDJCQUEyQixpQ0FBaUMsaUJBQWlCLEVBQUUsU0FBUztBQUN2b04sc0JBQXNCLG9EQUFvRCxZQUFZLDJDQUEyQyw2Q0FBNkMsZ0NBQWdDLCtDQUErQywwQkFBMEIscUdBQXFHLHFEQUFxRCw2Q0FBNkMsdUJBQXVCLHNCQUFzQiw0QkFBNEIsd0JBQXdCLHNEQUFzRCwwUUFBMFEsOERBQThELDZGQUE2RixnREFBZ0QsbUZBQW1GLCtDQUErQzs7O0FBRzVzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQUE7QUFBQTtBQUFrRDtBQUNBO0FBRW5DO0lBQ2IsR0FBRywyREFBYTtJQUNoQixHQUFHLDJEQUFhO0NBQ2pCLEVBQUMiLCJmaWxlIjoibWFpbi40OTBmNGQyZDY1NjVjOGRkZGY2Ny5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlcnZlckVycm9yIGZyb20gJ3NlcnZlci9zZXJ2ZXJFcnJvcic7XG5pbXBvcnQgZ2V0WW91dHViZVZpZGVvSWQgZnJvbSAndXRpbHMvZ2V0WW91dHViZVZpZGVvSWQnO1xuaW1wb3J0IHlvdXR1YmUgZnJvbSAneW91dHViZS95b3V0dWJlJztcbmltcG9ydCBjYXJkRW51bXMgZnJvbSAnLi9jYXJkRW51bXMnO1xuaW1wb3J0IGNhcmRJbmZvIGZyb20gJy4vY2FyZEluZm8nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZVlvdXR1YmVDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICAgICAgY29uc3QgdmlkZW9JZCA9IGdldFlvdXR1YmVWaWRlb0lkKGFyZ3MuZGF0YS52aWRlb1VybCk7XG4gICAgICBjb25zdCB5b3V0dWJlVmlkZW9EYXRhID0gYXdhaXQgeW91dHViZS5nZXRZb3V0dWJlVmlkZW9EYXRhKHZpZGVvSWQpO1xuXG4gICAgICBjb25zdCBmaW5hbEFyZ3MgPSB7XG4gICAgICAgIC4uLmFyZ3MsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjYXJkRGF0YToge1xuICAgICAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgICAgIHlvdXR1YmVDYXJkRGF0YToge1xuICAgICAgICAgICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgICAgICAgICAgLi4ueW91dHViZVZpZGVvRGF0YSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzRmF2b3JpdGU6IGZhbHNlLFxuICAgICAgICAgIGlzVG9EbzogZmFsc2UsXG4gICAgICAgICAgdHlwZTogY2FyZEVudW1zLnlvdXR1YmUsXG4gICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgY29ubmVjdDoge1xuICAgICAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgY2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5jcmVhdGVDYXJkKGZpbmFsQXJncywgY2FyZEluZm8pO1xuICAgICAgcHVic3ViLnB1Ymxpc2goJ3VzZXJDYXJkJywgeyB1c2VyQ2FyZDogY2FyZCB9KTtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG4gIH0sXG4gIGRlbGV0ZVVzZXJDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEsIHB1YnN1YiB9KSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gcGFzc3BvcnQuZ2V0VXNlcklkKCk7XG4gICAgY29uc3QgeyBjYXJkSWQgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IHF1ZXJ5QXJncyA9IHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlQXJncyA9IHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgY2FyZCB0aGF0IGlzIHRyeWluZyB0byBiZSBkZWxldGVkIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgICBjb25zdCB1c2VyQ2FyZCA9IGF3YWl0IHByaXNtYS5xdWVyeS5jYXJkcyhxdWVyeUFyZ3MsICd7IGlkIH0nKTtcblxuICAgIGlmICh1c2VyQ2FyZC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBkZWxldGVkQ2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi5kZWxldGVDYXJkKGRlbGV0ZUFyZ3MsIGNhcmRJbmZvKTtcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdkZWxldGVkVXNlckNhcmQnLCB7IGRlbGV0ZWRVc2VyQ2FyZDogZGVsZXRlZENhcmQgfSk7XG4gICAgICByZXR1cm4gZGVsZXRlZENhcmQ7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHtcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdGhpcyBjYXJkJyxcbiAgICAgIHN0YXR1czogNDAzLFxuICAgIH0pO1xuICB9LFxuICBpbml0aWF0ZVlvdXR1YmVDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZpZGVvSWQgPSBnZXRZb3V0dWJlVmlkZW9JZChhcmdzLmRhdGEudmlkZW9VcmwpO1xuICAgICAgY29uc3QgeW91dHViZVZpZGVvRGF0YSA9IGF3YWl0IHlvdXR1YmUuZ2V0WW91dHViZVZpZGVvRGF0YSh2aWRlb0lkKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2F0ZWdvcnk6IGNhcmRFbnVtcy52aWRlbyxcbiAgICAgICAgdGl0bGU6IHlvdXR1YmVWaWRlb0RhdGEuY2hhbm5lbFRpdGxlLFxuICAgICAgICB1cmw6IGFyZ3MuZGF0YS52aWRlb1VybCxcbiAgICAgICAgeW91dHViZUNhcmREYXRhOiB5b3V0dWJlVmlkZW9EYXRhLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICB9LFxuICB0b2dnbGVGYXZvcml0ZVVzZXJDYXJkOiBhc3luYyAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0LCBwcmlzbWEgfSkgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IHBhc3Nwb3J0LmdldFVzZXJJZCgpO1xuICAgIGNvbnN0IHsgY2FyZElkIH0gPSBhcmdzLmRhdGE7XG5cbiAgICBjb25zdCBxdWVyeUFyZ3MgPSB7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgaWQ6IHVzZXJJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBjYXJkIHRoYXQgaXMgdHJ5aW5nIHRvIGJlIGRlbGV0ZWQgYmVsb25ncyB0byB0aGUgdXNlclxuICAgIGNvbnN0IHVzZXJDYXJkID0gYXdhaXQgcHJpc21hLnF1ZXJ5LmNhcmRzKHF1ZXJ5QXJncywgJ3sgaWQgaXNGYXZvcml0ZSB9Jyk7XG5cbiAgICBpZiAodXNlckNhcmQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdXBkYXRlQXJncyA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGlzRmF2b3JpdGU6ICF1c2VyQ2FyZFswXS5pc0Zhdm9yaXRlLFxuICAgICAgICB9LFxuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGlkOiBjYXJkSWQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB1cGRhdGVkQ2FyZCA9IGF3YWl0IHByaXNtYS5tdXRhdGlvbi51cGRhdGVDYXJkKHVwZGF0ZUFyZ3MsIGNhcmRJbmZvKTtcbiAgICAgIHJldHVybiB1cGRhdGVkQ2FyZDtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3Ioe1xuICAgICAgbWVzc2FnZTogJ1RoZSB1c2VyIGRvZXMgbm90IGhhdmUgYWNjZXNzIHRvIGRlbGV0ZSB0aGlzIGNhcmQnLFxuICAgICAgc3RhdHVzOiA0MDMsXG4gICAgfSk7XG4gIH0sXG4gIHRvZ2dsZVRvRG9Vc2VyQ2FyZDogYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCwgcHJpc21hIH0pID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSBwYXNzcG9ydC5nZXRVc2VySWQoKTtcbiAgICBjb25zdCB7IGNhcmRJZCB9ID0gYXJncy5kYXRhO1xuXG4gICAgY29uc3QgcXVlcnlBcmdzID0ge1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgaWQ6IGNhcmRJZCxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgY2FyZCB0aGF0IGlzIHRyeWluZyB0byBiZSBkZWxldGVkIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgICBjb25zdCB1c2VyQ2FyZCA9IGF3YWl0IHByaXNtYS5xdWVyeS5jYXJkcyhxdWVyeUFyZ3MsICd7IGlkIGlzVG9EbyB9Jyk7XG5cbiAgICBpZiAodXNlckNhcmQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdXBkYXRlQXJncyA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGlzVG9EbzogIXVzZXJDYXJkWzBdLmlzVG9EbyxcbiAgICAgICAgfSxcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBpZDogY2FyZElkLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgdXBkYXRlZENhcmQgPSBhd2FpdCBwcmlzbWEubXV0YXRpb24udXBkYXRlQ2FyZCh1cGRhdGVBcmdzLCBjYXJkSW5mbyk7XG4gICAgICByZXR1cm4gdXBkYXRlZENhcmQ7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFNlcnZlckVycm9yKHtcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBkZWxldGUgdGhpcyBjYXJkJyxcbiAgICAgIHN0YXR1czogNDAzLFxuICAgIH0pO1xuICB9LFxufTtcbiIsIlxuICAgIHZhciBkb2MgPSB7XCJraW5kXCI6XCJEb2N1bWVudFwiLFwiZGVmaW5pdGlvbnNcIjpbe1wia2luZFwiOlwiRW51bVR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNhcmRDYXRlZ29yeVwifSxcImRpcmVjdGl2ZXNcIjpbXSxcInZhbHVlc1wiOlt7XCJraW5kXCI6XCJFbnVtVmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlZpZGVvXCJ9LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkZpbHRlcnNcIn0sXCJpbnRlcmZhY2VzXCI6W10sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImlzRmF2b3JpdGVcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQm9vbGVhblwifX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpc1RvRG9cIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQm9vbGVhblwifX0sXCJkaXJlY3RpdmVzXCI6W119XX0se1wia2luZFwiOlwiT2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiRmlsdGVyZWRVc2VyQ2FyZHNUeXBlXCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJmaWx0ZXJzXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiRmlsdGVyc1wifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidXNlckNhcmRzXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJMaXN0VHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNhcmRcIn19fX19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkluaXRpYWxDYXJkRGF0YVwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiY2F0ZWdvcnlcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkQ2F0ZWdvcnlcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInRpdGxlXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJ1cmxcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInlvdXR1YmVDYXJkRGF0YVwifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIllvdXR1YmVDYXJkRGF0YVwifX19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIklucHV0T2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZEZpbHRlcklucHV0XCJ9LFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImlzRmF2b3JpdGVcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkJvb2xlYW5cIn19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpc1RvRG9cIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkJvb2xlYW5cIn19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIklucHV0T2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZElkSW5wdXRcIn0sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiY2FyZElkXCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN0cmluZ1wifX19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIklucHV0T2JqZWN0VHlwZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiWW91dHViZUNhcmRJbnB1dFwifSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJ2aWRlb1VybFwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJTdHJpbmdcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJPYmplY3RUeXBlRXh0ZW5zaW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIk11dGF0aW9uXCJ9LFwiaW50ZXJmYWNlc1wiOltdLFwiZGlyZWN0aXZlc1wiOltdLFwiZmllbGRzXCI6W3tcImtpbmRcIjpcIkZpZWxkRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJjcmVhdGVZb3V0dWJlQ2FyZFwifSxcImFyZ3VtZW50c1wiOlt7XCJraW5kXCI6XCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJkYXRhXCJ9LFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIllvdXR1YmVDYXJkSW5wdXRcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX1dLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNhcmRcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImRlbGV0ZVVzZXJDYXJkXCJ9LFwiYXJndW1lbnRzXCI6W3tcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImRhdGFcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNhcmRJZElucHV0XCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNhcmRcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImluaXRpYXRlWW91dHViZUNhcmRcIn0sXCJhcmd1bWVudHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZGF0YVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJZb3V0dWJlQ2FyZElucHV0XCJ9fX0sXCJkaXJlY3RpdmVzXCI6W119XSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJJbml0aWFsQ2FyZERhdGFcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInRvZ2dsZUZhdm9yaXRlVXNlckNhcmRcIn0sXCJhcmd1bWVudHNcIjpbe1wia2luZFwiOlwiSW5wdXRWYWx1ZURlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZGF0YVwifSxcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZElkSW5wdXRcIn19LFwiZGlyZWN0aXZlc1wiOltdfV0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZFwifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwidG9nZ2xlVG9Eb1VzZXJDYXJkXCJ9LFwiYXJndW1lbnRzXCI6W3tcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImRhdGFcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNhcmRJZElucHV0XCJ9fSxcImRpcmVjdGl2ZXNcIjpbXX1dLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNhcmRcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX1dfSx7XCJraW5kXCI6XCJPYmplY3RUeXBlRXh0ZW5zaW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIlN1YnNjcmlwdGlvblwifSxcImludGVyZmFjZXNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXSxcImZpZWxkc1wiOlt7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZGVsZXRlZFVzZXJDYXJkXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZFwifX19LFwiZGlyZWN0aXZlc1wiOltdfSx7XCJraW5kXCI6XCJGaWVsZERlZmluaXRpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiZmlsdGVyZWRVc2VyQ2FyZHNcIn0sXCJhcmd1bWVudHNcIjpbXSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJGaWx0ZXJlZFVzZXJDYXJkc1R5cGVcIn19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInVzZXJDYXJkXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZFwifX19LFwiZGlyZWN0aXZlc1wiOltdfV19LHtcImtpbmRcIjpcIk9iamVjdFR5cGVFeHRlbnNpb25cIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiUXVlcnlcIn0sXCJpbnRlcmZhY2VzXCI6W10sXCJkaXJlY3RpdmVzXCI6W10sXCJmaWVsZHNcIjpbe1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInVzZXJDYXJkc1wifSxcImFyZ3VtZW50c1wiOltdLFwidHlwZVwiOntcImtpbmRcIjpcIk5vbk51bGxUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTGlzdFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIk5hbWVkVHlwZVwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJDYXJkXCJ9fX19fSxcImRpcmVjdGl2ZXNcIjpbXX0se1wia2luZFwiOlwiRmllbGREZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcInVzZXJDYXJkc1dpdGhGaWx0ZXJzXCJ9LFwiYXJndW1lbnRzXCI6W3tcImtpbmRcIjpcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImRhdGFcIn0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTmFtZWRUeXBlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIkNhcmRGaWx0ZXJJbnB1dFwifX0sXCJkaXJlY3RpdmVzXCI6W119XSxcInR5cGVcIjp7XCJraW5kXCI6XCJOb25OdWxsVHlwZVwiLFwidHlwZVwiOntcImtpbmRcIjpcIkxpc3RUeXBlXCIsXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiQ2FyZFwifX19fX0sXCJkaXJlY3RpdmVzXCI6W119XX1dLFwibG9jXCI6e1wic3RhcnRcIjowLFwiZW5kXCI6MTA4OX19O1xuICAgIGRvYy5sb2Muc291cmNlID0ge1wiYm9keVwiOlwiIyAtLS0tLSBFTlVNUyAtLS0tLSAjXFxuXFxuZW51bSBDYXJkQ2F0ZWdvcnkge1xcbiAgVmlkZW9cXG59XFxuXFxuIyAtLS0tLSBUWVBFUyAtLS0tLSAjXFxuXFxudHlwZSBGaWx0ZXJzIHtcXG4gIGlzRmF2b3JpdGU6IEJvb2xlYW5cXG4gIGlzVG9EbzogQm9vbGVhblxcbn1cXG5cXG50eXBlIEZpbHRlcmVkVXNlckNhcmRzVHlwZSB7XFxuICBmaWx0ZXJzOiBGaWx0ZXJzIVxcbiAgdXNlckNhcmRzOiBbQ2FyZCFdIVxcbn1cXG5cXG50eXBlIEluaXRpYWxDYXJkRGF0YSB7XFxuICBjYXRlZ29yeTogQ2FyZENhdGVnb3J5IVxcbiAgdGl0bGU6IFN0cmluZyFcXG4gIHVybDogU3RyaW5nIVxcbiAgeW91dHViZUNhcmREYXRhOiBZb3V0dWJlQ2FyZERhdGEhXFxufVxcblxcbiMgLS0tLS0gSU5QVVRTIC0tLS0tICNcXG5cXG5pbnB1dCBDYXJkRmlsdGVySW5wdXQge1xcbiAgaXNGYXZvcml0ZTogQm9vbGVhblxcbiAgaXNUb0RvOiBCb29sZWFuXFxufVxcblxcbmlucHV0IENhcmRJZElucHV0IHtcXG4gIGNhcmRJZDogU3RyaW5nIVxcbn1cXG5cXG5pbnB1dCBZb3V0dWJlQ2FyZElucHV0IHtcXG4gIHZpZGVvVXJsOiBTdHJpbmchXFxufVxcblxcbiMgLS0tLS0gTVVUQVRJT04gLS0tLS0gI1xcblxcbmV4dGVuZCB0eXBlIE11dGF0aW9uIHtcXG4gIGNyZWF0ZVlvdXR1YmVDYXJkKGRhdGE6IFlvdXR1YmVDYXJkSW5wdXQhKTogQ2FyZCFcXG4gIGRlbGV0ZVVzZXJDYXJkKGRhdGE6IENhcmRJZElucHV0KTogQ2FyZCFcXG4gIGluaXRpYXRlWW91dHViZUNhcmQoZGF0YTogWW91dHViZUNhcmRJbnB1dCEpOiBJbml0aWFsQ2FyZERhdGEhXFxuICB0b2dnbGVGYXZvcml0ZVVzZXJDYXJkKGRhdGE6IENhcmRJZElucHV0KTogQ2FyZCFcXG4gIHRvZ2dsZVRvRG9Vc2VyQ2FyZChkYXRhOiBDYXJkSWRJbnB1dCk6IENhcmQhXFxufVxcblxcbiMgLS0tLS0gU1VCU0NSSVBUSU9OIC0tLS0tICNcXG5cXG5leHRlbmQgdHlwZSBTdWJzY3JpcHRpb24ge1xcbiAgZGVsZXRlZFVzZXJDYXJkOiBDYXJkIVxcbiAgZmlsdGVyZWRVc2VyQ2FyZHM6IEZpbHRlcmVkVXNlckNhcmRzVHlwZSFcXG4gIHVzZXJDYXJkOiBDYXJkIVxcbn1cXG5cXG4jIC0tLS0tIFFVRVJZIC0tLS0tICNcXG5cXG5leHRlbmQgdHlwZSBRdWVyeSB7XFxuICB1c2VyQ2FyZHM6IFtDYXJkIV0hXFxuICB1c2VyQ2FyZHNXaXRoRmlsdGVycyhkYXRhOiBDYXJkRmlsdGVySW5wdXQpOiBbQ2FyZCFdIVxcbn1cXG5cIixcIm5hbWVcIjpcIkdyYXBoUUwgcmVxdWVzdFwiLFwibG9jYXRpb25PZmZzZXRcIjp7XCJsaW5lXCI6MSxcImNvbHVtblwiOjF9fTtcbiAgXG5cbiAgICB2YXIgbmFtZXMgPSB7fTtcbiAgICBmdW5jdGlvbiB1bmlxdWUoZGVmcykge1xuICAgICAgcmV0dXJuIGRlZnMuZmlsdGVyKFxuICAgICAgICBmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgICBpZiAoZGVmLmtpbmQgIT09ICdGcmFnbWVudERlZmluaXRpb24nKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB2YXIgbmFtZSA9IGRlZi5uYW1lLnZhbHVlXG4gICAgICAgICAgaWYgKG5hbWVzW25hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgXG5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gZG9jO1xuICAgIFxuIiwiaW1wb3J0IGNhcmRNdXRhdGlvbnMgZnJvbSAnLi4vY2FyZC9jYXJkTXV0YXRpb25zJztcbmltcG9ydCB1c2VyTXV0YXRpb25zIGZyb20gJy4uL3VzZXIvdXNlck11dGF0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4uY2FyZE11dGF0aW9ucyxcbiAgLi4udXNlck11dGF0aW9ucyxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9