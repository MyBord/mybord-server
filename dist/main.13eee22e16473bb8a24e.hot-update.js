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

/***/ "./src/schema/card/cardResolvers/cardMutations/initiateUserCard.ts":
/*!*************************************************************************!*\
  !*** ./src/schema/card/cardResolvers/cardMutations/initiateUserCard.ts ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var server_serverError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! server/serverError */ "./src/server/serverError.ts");
/* harmony import */ var schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! schema/card/cardUtils/cardEnums */ "./src/schema/card/cardUtils/cardEnums.ts");
/* harmony import */ var _cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../cardUtils/cardUtils */ "./src/schema/card/cardUtils/cardUtils.ts");




/* harmony default export */ __webpack_exports__["default"] = (async (parent, args) => {
    try {
        const { url } = args.data;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.head(url);
        console.log('---------------------');
        console.log('---------------------');
        console.log(response.headers['content-type']);
        console.log('---------------------');
        console.log('---------------------');
        const cardType = Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_3__["getCardType"])(args.data.url);
        if (cardType === schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["type"].image) {
            return Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_3__["getInitialImageData"])(args.data.url);
        }
        if (cardType === schema_card_cardUtils_cardEnums__WEBPACK_IMPORTED_MODULE_2__["type"].youtube) {
            const initialYoutubeData = await Object(_cardUtils_cardUtils__WEBPACK_IMPORTED_MODULE_3__["getInitialYoutubeData"])(url);
            return initialYoutubeData;
        }
        throw Error('Cannot detect a valid card type');
    }
    catch (error) {
        throw new server_serverError__WEBPACK_IMPORTED_MODULE_1__["default"]({ message: error.message, status: 400 });
    }
});


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hL2NhcmQvY2FyZFJlc29sdmVycy9jYXJkTXV0YXRpb25zL2NhcmRNdXRhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYS9jYXJkL2NhcmRSZXNvbHZlcnMvY2FyZE11dGF0aW9ucy9pbml0aWF0ZVVzZXJDYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThDO0FBQ0E7QUFDSTtBQUNZO0FBQ1I7QUFFdkM7SUFDYix1RUFBYztJQUNkLHVFQUFjO0lBQ2QsMkVBQWdCO0lBQ2hCLHVGQUFzQjtJQUN0QiwrRUFBa0I7Q0FDbkIsRUFBQzs7Ozs7Ozs7Ozs7OztBQ1pGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwQjtBQUNtQjtBQUNVO0FBQzZDO0FBRXJGLG9FQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3BDLElBQUk7UUFDRixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUUxQixNQUFNLFFBQVEsR0FBRyxNQUFNLDRDQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUVyQyxNQUFNLFFBQVEsR0FBRyx3RUFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFNUMsSUFBSSxRQUFRLEtBQUssb0VBQUksQ0FBQyxLQUFLLEVBQUU7WUFDM0IsT0FBTyxnRkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNDO1FBRUQsSUFBSSxRQUFRLEtBQUssb0VBQUksQ0FBQyxPQUFPLEVBQUU7WUFDN0IsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLGtGQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVELE9BQU8sa0JBQWtCLENBQUM7U0FDM0I7UUFFRCxNQUFNLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0tBQ2hEO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxNQUFNLElBQUksMERBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ2hFO0FBQ0gsQ0FBQyxFQUFDIiwiZmlsZSI6Im1haW4uMTNlZWUyMmUxNjQ3M2JiOGEyNGUuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVVc2VyQ2FyZCBmcm9tICcuL2NyZWF0ZVVzZXJDYXJkJztcbmltcG9ydCBkZWxldGVVc2VyQ2FyZCBmcm9tICcuL2RlbGV0ZVVzZXJDYXJkJztcbmltcG9ydCBpbml0aWF0ZVVzZXJDYXJkIGZyb20gJy4vaW5pdGlhdGVVc2VyQ2FyZCc7XG5pbXBvcnQgdG9nZ2xlRmF2b3JpdGVVc2VyQ2FyZCBmcm9tICcuL3RvZ2dsZUZhdm9yaXRlVXNlckNhcmQnO1xuaW1wb3J0IHRvZ2dsZVRvRG9Vc2VyQ2FyZCBmcm9tICcuL3RvZ2dsZVRvRG9Vc2VyQ2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY3JlYXRlVXNlckNhcmQsXG4gIGRlbGV0ZVVzZXJDYXJkLFxuICBpbml0aWF0ZVVzZXJDYXJkLFxuICB0b2dnbGVGYXZvcml0ZVVzZXJDYXJkLFxuICB0b2dnbGVUb0RvVXNlckNhcmQsXG59O1xuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBTZXJ2ZXJFcnJvciBmcm9tICdzZXJ2ZXIvc2VydmVyRXJyb3InO1xuaW1wb3J0IHsgdHlwZSB9IGZyb20gJ3NjaGVtYS9jYXJkL2NhcmRVdGlscy9jYXJkRW51bXMnO1xuaW1wb3J0IHsgZ2V0Q2FyZFR5cGUsIGdldEluaXRpYWxJbWFnZURhdGEsIGdldEluaXRpYWxZb3V0dWJlRGF0YSB9IGZyb20gJy4uLy4uL2NhcmRVdGlscy9jYXJkVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocGFyZW50LCBhcmdzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB1cmwgfSA9IGFyZ3MuZGF0YTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuaGVhZCh1cmwpO1xuXG4gICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xuICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSk7XG4gICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xuICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcblxuICAgIGNvbnN0IGNhcmRUeXBlID0gZ2V0Q2FyZFR5cGUoYXJncy5kYXRhLnVybCk7XG5cbiAgICBpZiAoY2FyZFR5cGUgPT09IHR5cGUuaW1hZ2UpIHtcbiAgICAgIHJldHVybiBnZXRJbml0aWFsSW1hZ2VEYXRhKGFyZ3MuZGF0YS51cmwpO1xuICAgIH1cblxuICAgIGlmIChjYXJkVHlwZSA9PT0gdHlwZS55b3V0dWJlKSB7XG4gICAgICBjb25zdCBpbml0aWFsWW91dHViZURhdGEgPSBhd2FpdCBnZXRJbml0aWFsWW91dHViZURhdGEodXJsKTtcbiAgICAgIHJldHVybiBpbml0aWFsWW91dHViZURhdGE7XG4gICAgfVxuXG4gICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkZXRlY3QgYSB2YWxpZCBjYXJkIHR5cGUnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IDQwMCB9KTtcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=