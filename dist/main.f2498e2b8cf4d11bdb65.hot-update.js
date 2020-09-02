exports.id = "main";
exports.modules = {

/***/ "./src/schema/card/cardResolvers/cardMutations.ts":
false,

/***/ "./src/schema/card/cardResolvers/cardQueries.ts":
false,

/***/ "./src/schema/card/cardResolvers/cardSubscriptions.ts":
false,

/***/ "./src/schema/card/cardUtils/cardEnums.ts":
false,

/***/ "./src/schema/card/cardUtils/cardInfo.ts":
false,

/***/ "./src/schema/card/cardUtils/cardUtils.ts":
false,

/***/ "./src/schema/rootResolvers/mutations.ts":
false,

/***/ "./src/schema/rootResolvers/queries.ts":
false,

/***/ "./src/schema/rootResolvers/rootResolvers.ts":
false,

/***/ "./src/schema/rootResolvers/subscriptions.ts":
false,

/***/ "./src/schema/user/userResolvers/userMutations.ts":
false,

/***/ "./src/schema/user/userResolvers/userQueries.ts":
false,

/***/ "./src/schema/user/userUtils/userUtils.ts":
false,

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
!(function webpackMissingModule() { var e = new Error("Cannot find module 'schema/resolvers/resolvers'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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
        resolvers: !(function webpackMissingModule() { var e = new Error("Cannot find module 'schema/resolvers/resolvers'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
        typeDefs: schema_typeDefs_typeDefs__WEBPACK_IMPORTED_MODULE_4__["default"],
    });
};
/* harmony default export */ __webpack_exports__["default"] = (initializeServer);


/***/ }),

/***/ "./src/server/serverError.ts":
false,

/***/ "./src/thirdParty/youtube/youtube.ts":
false,

/***/ "./src/thirdParty/youtube/youtubeUtils.ts":
false,

/***/ "googleapis":
false,

/***/ "moment":
false,

/***/ "numeral":
false

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2luaXRpYWxpemVTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXFEO0FBRU47QUFDNkI7QUFDekI7QUFDSDtBQUVoRCw0QkFBNEI7QUFDNUIsTUFBTSxnQkFBZ0IsR0FBRyxDQUN2Qix3QkFBZ0QsRUFDaEQsa0JBQW1DLEVBQ25DLHlCQUFpRCxFQUNqRCxNQUFjLEVBQ0EsRUFBRTtJQUNoQixNQUFNLE1BQU0sR0FBRyxJQUFJLDREQUFNLEVBQUUsQ0FBQztJQUM1QixPQUFPLElBQUksa0VBQVksQ0FBQztRQUN0QixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckIsUUFBUSxFQUFFLHdGQUFvQixDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMvRSxNQUFNO1lBQ04sTUFBTTtTQUNQLENBQUM7UUFDRixVQUFVLEVBQUU7WUFDVixRQUFRLEVBQUU7Z0JBQ1IscUJBQXFCLEVBQUUsYUFBYTthQUNyQztTQUNGO1FBQ0QsK0pBQVM7UUFDVCwwRUFBUTtLQUNULENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVhLCtFQUFnQixFQUFDIiwiZmlsZSI6Im1haW4uZjI0OThlMmI4Y2Y0ZDExYmRiNjUuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgQXBvbGxvU2VydmVyIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJztcbmltcG9ydCB7IFByaXNtYSB9IGZyb20gJ3ByaXNtYS1iaW5kaW5nJztcbmltcG9ydCB7IFB1YlN1YiB9IGZyb20gJ2dyYXBocWwtc3Vic2NyaXB0aW9ucyc7XG5pbXBvcnQgYnVpbGRQYXNzcG9ydENvbnRleHQgZnJvbSAnbWlkZGxld2FyZS9wYXNzcG9ydC9idWlsZFBhc3Nwb3J0Q29udGV4dCc7XG5pbXBvcnQgcmVzb2x2ZXJzIGZyb20gJ3NjaGVtYS9yZXNvbHZlcnMvcmVzb2x2ZXJzJztcbmltcG9ydCB0eXBlRGVmcyBmcm9tICdzY2hlbWEvdHlwZURlZnMvdHlwZURlZnMnO1xuXG4vLyBjcmVhdGVzIG5ldyBhcG9sbG8gc2VydmVyXG5jb25zdCBpbml0aWFsaXplU2VydmVyID0gKFxuICBleHByZXNzU2Vzc2lvbk1pZGRsZXdhcmU6IGV4cHJlc3MuUmVxdWVzdEhhbmRsZXIsXG4gIHBhc3Nwb3J0TWlkZGxld2FyZTogZXhwcmVzcy5IYW5kbGVyLFxuICBwYXNzcG9ydFNlc3Npb25NaWRkbGV3YXJlOiBleHByZXNzLlJlcXVlc3RIYW5kbGVyLFxuICBwcmlzbWE6IFByaXNtYSxcbik6IEFwb2xsb1NlcnZlciA9PiB7XG4gIGNvbnN0IHB1YnN1YiA9IG5ldyBQdWJTdWIoKTtcbiAgcmV0dXJuIG5ldyBBcG9sbG9TZXJ2ZXIoe1xuICAgIGNvbnRleHQ6IChyZXF1ZXN0KSA9PiAoe1xuICAgICAgcGFzc3BvcnQ6IGJ1aWxkUGFzc3BvcnRDb250ZXh0KHsgcmVxdWVzdDogcmVxdWVzdC5yZXEsIHJlc3BvbnNlOiByZXF1ZXN0LnJlcyB9KSxcbiAgICAgIHByaXNtYSxcbiAgICAgIHB1YnN1YixcbiAgICB9KSxcbiAgICBwbGF5Z3JvdW5kOiB7XG4gICAgICBzZXR0aW5nczoge1xuICAgICAgICAncmVxdWVzdC5jcmVkZW50aWFscyc6ICdzYW1lLW9yaWdpbicsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZXJzLFxuICAgIHR5cGVEZWZzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYWxpemVTZXJ2ZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9