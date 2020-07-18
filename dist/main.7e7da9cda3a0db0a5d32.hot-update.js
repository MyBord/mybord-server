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
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! express-session */ "express-session");
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid/v4 */ "uuid/v4");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var graphql_subscriptions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! graphql-subscriptions */ "graphql-subscriptions");
/* harmony import */ var graphql_subscriptions__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(graphql_subscriptions__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _passport_localStrategy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./passport/localStrategy */ "./src/passport/localStrategy.ts");
/* harmony import */ var _passport_buildPassportContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./passport/buildPassportContext */ "./src/passport/buildPassportContext.ts");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./resolvers */ "./src/resolvers.ts");
/* harmony import */ var _typeDefs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./typeDefs */ "./src/typeDefs.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./users */ "./src/users.ts");













// ----- INITIALIZE PASSPORT ----- //
passport__WEBPACK_IMPORTED_MODULE_3___default.a.serializeUser((user, done) => done(null, user.id));
passport__WEBPACK_IMPORTED_MODULE_3___default.a.deserializeUser((id, done) => {
    const matchingUser = _users__WEBPACK_IMPORTED_MODULE_12__["default"].find((user) => user.id === id);
    done(null, matchingUser);
});
passport__WEBPACK_IMPORTED_MODULE_3___default.a.use(new _passport_localStrategy__WEBPACK_IMPORTED_MODULE_8__["default"]((email, password, done) => {
    const matchingUser = _users__WEBPACK_IMPORTED_MODULE_12__["default"].find((user) => email === user.email && password === user.password);
    const error = matchingUser ? null : new Error('no matching user');
    done(error, matchingUser);
}));
const passportMiddleware = passport__WEBPACK_IMPORTED_MODULE_3___default.a.initialize();
const passportSessionMiddleware = passport__WEBPACK_IMPORTED_MODULE_3___default.a.session();
// ----- INITIALIZE EXPRESS ----- //
const expressMiddleware = express__WEBPACK_IMPORTED_MODULE_1___default()();
const expressSessionMiddleware = express_session__WEBPACK_IMPORTED_MODULE_4___default()({
    genid: (request) => uuid_v4__WEBPACK_IMPORTED_MODULE_5___default()(),
    resave: false,
    saveUninitialized: false,
    secret: 'sample_session_secret',
});
expressMiddleware.use(cors__WEBPACK_IMPORTED_MODULE_0___default()({
    credentials: true,
    origin: 'http://localhost:8080',
}));
expressMiddleware.use(expressSessionMiddleware);
expressMiddleware.use(passportMiddleware);
expressMiddleware.use(passportSessionMiddleware);
// ----- INITIALIZE OUR SERVER ----- //
const pubsub = new graphql_subscriptions__WEBPACK_IMPORTED_MODULE_7__["PubSub"]();
const server = new apollo_server_express__WEBPACK_IMPORTED_MODULE_6__["ApolloServer"]({
    context: (request) => ({
        passport: Object(_passport_buildPassportContext__WEBPACK_IMPORTED_MODULE_9__["default"])({ request: request.req, response: request.res }),
        pubsub,
    }),
    playground: {
        settings: {
            'request.credentials': 'same-origin',
        },
    },
    resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_10__["default"],
    typeDefs: _typeDefs__WEBPACK_IMPORTED_MODULE_11__["default"],
});
server.applyMiddleware({
    app: expressMiddleware,
    cors: false,
    path: '/graphql',
});
// ----- RUNNING THE SERVER ----- //
const httpServer = http__WEBPACK_IMPORTED_MODULE_2___default.a.createServer(expressMiddleware);
server.installSubscriptionHandlers(httpServer);
httpServer.listen(process.env.PORT, () => {
    console.log(`Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    console.log(`Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`);
});
if (true) {
    module.hot.accept();
    module.hot.dispose(() => server.stop());
}


/***/ }),

/***/ "./src/middleware/corsOptions.ts":
false,

/***/ "./src/middleware/expressSessionOptions.ts":
false,

/***/ "./src/middleware/initializeMiddleware.ts":
false,

/***/ "./src/middleware/passport/buildPassportContext.ts":
false,

/***/ "./src/middleware/passport/initializePassport.ts":
false,

/***/ "./src/middleware/passport/strategies/localStrategy/localStrategy.ts":
false,

/***/ "./src/middleware/passport/strategies/localStrategy/localStrategyAuthentication.ts":
false,

/***/ "./src/passport/buildPassportContext.ts":
/*!**********************************************!*\
  !*** ./src/passport/buildPassportContext.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);

const promisifiedAuthenticate = ({ authenticateOptions, request, response, strategyName, }) => (new Promise((resolve, reject) => {
    const done = (error, user, info) => {
        if (error)
            reject(error);
        else
            resolve({ user, info });
    };
    const authenticateFunction = passport__WEBPACK_IMPORTED_MODULE_0___default.a.authenticate(strategyName, authenticateOptions, done);
    return authenticateFunction(request, response);
}));
const promisifiedLogin = ({ authenticateOptions, request, user, }) => new Promise((resolve, reject) => {
    const done = (err) => {
        if (err)
            reject(err);
        else
            resolve();
    };
    request.login(user, authenticateOptions, done);
});
/* harmony default export */ __webpack_exports__["default"] = (({ request, response }) => {
    const authenticate = ({ authenticateOptions, strategyName }) => (promisifiedAuthenticate({
        authenticateOptions,
        request,
        response,
        strategyName,
    }));
    const isAuthenticated = () => request.isAuthenticated();
    const getUserId = () => {
        if (isAuthenticated()) {
            // @ts-ignore
            return request.user.id;
        }
        throw Error('Passport Context getUserId error: User is not authenticated');
    };
    const login = ({ authenticateOptions, user }) => (promisifiedLogin({ authenticateOptions, request, user }));
    const logout = () => request.logout();
    return {
        authenticate,
        getUserId,
        isAuthenticated,
        login,
        logout,
    };
});


/***/ }),

/***/ "./src/passport/localStrategy.ts":
/*!***************************************!*\
  !*** ./src/passport/localStrategy.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var passport_strategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport-strategy */ "passport-strategy");
/* harmony import */ var passport_strategy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport_strategy__WEBPACK_IMPORTED_MODULE_0__);

class LocalStrategy extends passport_strategy__WEBPACK_IMPORTED_MODULE_0__["Strategy"] {
    constructor(cb) {
        super();
        this.verify = cb;
        this.name = 'local';
    }
    authenticate(req, options) {
        const { email, password } = options;
        const done = (error, user, info) => {
            if (error) {
                // @ts-ignore
                return this.error(error);
            }
            if (!user) {
                // @ts-ignore
                return this.fail(info, 401);
            }
            // @ts-ignore
            return this.success(user, info);
        };
        this.verify(email, password, done);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (LocalStrategy);


/***/ }),

/***/ "./src/prisma/initializePrisma.ts":
false,

/***/ "./src/resolvers.ts":
/*!**************************!*\
  !*** ./src/resolvers.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const resolvers = {
    Query: {
        isAuthenticated: (parent, args, { passport }) => passport.isAuthenticated(),
    },
    Mutation: {
        loginUser: async (parent, args, { passport }) => {
            const { user } = await passport.authenticate({
                authenticateOptions: args.data,
                strategyName: 'local',
            });
            passport.login({ authenticateOptions: args.data, user });
            return user;
        },
    },
};
/* harmony default export */ __webpack_exports__["default"] = (resolvers);


/***/ }),

/***/ "./src/schema/card/cardInfo.ts":
false,

/***/ "./src/schema/card/cardMutations.ts":
false,

/***/ "./src/schema/card/cardQueries.ts":
false,

/***/ "./src/schema/card/cardSchema.graphql":
false,

/***/ "./src/schema/card/cardSubscriptions.ts":
false,

/***/ "./src/schema/resolvers/mutations.ts":
false,

/***/ "./src/schema/resolvers/queries.ts":
false,

/***/ "./src/schema/resolvers/resolvers.ts":
false,

/***/ "./src/schema/resolvers/subscriptions.ts":
false,

/***/ "./src/schema/typeDefs/prismaSchema.graphql":
false,

/***/ "./src/schema/typeDefs/schema.graphql":
false,

/***/ "./src/schema/typeDefs/typeDefs.ts":
false,

/***/ "./src/schema/user/userMutations.ts":
false,

/***/ "./src/schema/user/userQueries.ts":
false,

/***/ "./src/schema/user/userSchema.graphql":
false,

/***/ "./src/server/initializeServer.ts":
false,

/***/ "./src/server/serverError.ts":
false,

/***/ "./src/thirdParty/youtube/youtube.ts":
false,

/***/ "./src/thirdParty/youtube/youtubeUtils.ts":
false,

/***/ "./src/typeDefs.ts":
/*!*************************!*\
  !*** ./src/typeDefs.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

const typeDefs = apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"] `
  type User {
    id: String
    firstName: String
    lastName: String
    email: String
  }
  input LoginUserInput {
    email: String!
    password: String!
  }
  type Query {
    isAuthenticated: Boolean
  }
  type Mutation {
    loginUser(data: LoginUserInput): User!
  }
`;
/* harmony default export */ __webpack_exports__["default"] = (typeDefs);


/***/ }),

/***/ "./src/users.ts":
/*!**********************!*\
  !*** ./src/users.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
    {
        id: '1',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@gmail.com',
        password: 'abc',
    },
]);


/***/ }),

/***/ "./src/utils/getYoutubeVideoId.ts":
false,

/***/ "./src/utils/hashPassword.ts":
false,

/***/ "./src/utils/restrictUserData.ts":
false,

/***/ "./src/utils/testPasswordStrength.ts":
false,

/***/ "bcryptjs":
false,

/***/ "googleapis":
false,

/***/ "moment":
false,

/***/ "numeral":
false,

/***/ "prisma-binding":
false

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bhc3Nwb3J0L2J1aWxkUGFzc3BvcnRDb250ZXh0LnRzIiwid2VicGFjazovLy8uL3NyYy9wYXNzcG9ydC9sb2NhbFN0cmF0ZWd5LnRzIiwid2VicGFjazovLy8uL3NyYy9yZXNvbHZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R5cGVEZWZzLnRzIiwid2VicGFjazovLy8uL3NyYy91c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXdCO0FBQ007QUFDTjtBQUNRO0FBQ007QUFDWDtBQUMwQjtBQUNOO0FBQ007QUFDYztBQUMvQjtBQUNGO0FBQ047QUFFNUIscUNBQXFDO0FBRXJDLCtDQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVqRSwrQ0FBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNwQyxNQUFNLFlBQVksR0FBRywrQ0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMxRCxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQyxDQUFDO0FBRUgsK0NBQVEsQ0FBQyxHQUFHLENBQ1YsSUFBSSwrREFBYSxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUMxQyxNQUFNLFlBQVksR0FB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RSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFFekQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQ0Y7Q0FDRixDQUFDO0FBRWEsd0VBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCekI7QUFBQTtBQUFBO0FBQTRDO0FBRTVDLE1BQU0sUUFBUSxHQUFHLHlEQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztDQWlCbkIsQ0FBQztBQUVhLHVFQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNyQnhCO0FBQWU7SUFDYjtRQUNFLEVBQUUsRUFBRSxHQUFHO1FBQ1AsU0FBUyxFQUFFLE1BQU07UUFDakIsUUFBUSxFQUFFLE9BQU87UUFDakIsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixRQUFRLEVBQUUsS0FBSztLQUNoQjtDQUNGLEVBQUMiLCJmaWxlIjoibWFpbi43ZTdkYTljZGEzYTBkYjBhNWQzMi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IHBhc3Nwb3J0IGZyb20gJ3Bhc3Nwb3J0JztcbmltcG9ydCBzZXNzaW9uIGZyb20gJ2V4cHJlc3Mtc2Vzc2lvbic7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkL3Y0JztcbmltcG9ydCB7IEFwb2xsb1NlcnZlciB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgeyBQdWJTdWIgfSBmcm9tICdncmFwaHFsLXN1YnNjcmlwdGlvbnMnO1xuaW1wb3J0IExvY2FsU3RyYXRlZ3kgZnJvbSAnLi9wYXNzcG9ydC9sb2NhbFN0cmF0ZWd5JztcbmltcG9ydCBidWlsZFBhc3Nwb3J0Q29udGV4dCBmcm9tICcuL3Bhc3Nwb3J0L2J1aWxkUGFzc3BvcnRDb250ZXh0JztcbmltcG9ydCByZXNvbHZlcnMgZnJvbSAnLi9yZXNvbHZlcnMnO1xuaW1wb3J0IHR5cGVEZWZzIGZyb20gJy4vdHlwZURlZnMnO1xuaW1wb3J0IHVzZXJzIGZyb20gJy4vdXNlcnMnO1xuXG4vLyAtLS0tLSBJTklUSUFMSVpFIFBBU1NQT1JUIC0tLS0tIC8vXG5cbnBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoKHVzZXI6IGFueSwgZG9uZSkgPT4gZG9uZShudWxsLCB1c2VyLmlkKSk7XG5cbnBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcigoaWQsIGRvbmUpID0+IHtcbiAgY29uc3QgbWF0Y2hpbmdVc2VyID0gdXNlcnMuZmluZCgodXNlcikgPT4gdXNlci5pZCA9PT0gaWQpO1xuICBkb25lKG51bGwsIG1hdGNoaW5nVXNlcik7XG59KTtcblxucGFzc3BvcnQudXNlKFxuICBuZXcgTG9jYWxTdHJhdGVneSgoZW1haWwsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgY29uc3QgbWF0Y2hpbmdVc2VyID0gdXNlcnMuZmluZCgodXNlcikgPT4gZW1haWwgPT09IHVzZXIuZW1haWwgJiYgcGFzc3dvcmQgPT09IHVzZXIucGFzc3dvcmQpO1xuICAgIGNvbnN0IGVycm9yID0gbWF0Y2hpbmdVc2VyID8gbnVsbCA6IG5ldyBFcnJvcignbm8gbWF0Y2hpbmcgdXNlcicpO1xuICAgIGRvbmUoZXJyb3IsIG1hdGNoaW5nVXNlcik7XG4gIH0pLFxuKTtcblxuY29uc3QgcGFzc3BvcnRNaWRkbGV3YXJlID0gcGFzc3BvcnQuaW5pdGlhbGl6ZSgpO1xuY29uc3QgcGFzc3BvcnRTZXNzaW9uTWlkZGxld2FyZSA9IHBhc3Nwb3J0LnNlc3Npb24oKTtcblxuLy8gLS0tLS0gSU5JVElBTElaRSBFWFBSRVNTIC0tLS0tIC8vXG5cbmNvbnN0IGV4cHJlc3NNaWRkbGV3YXJlID0gZXhwcmVzcygpO1xuY29uc3QgZXhwcmVzc1Nlc3Npb25NaWRkbGV3YXJlID0gc2Vzc2lvbih7XG4gIGdlbmlkOiAocmVxdWVzdCkgPT4gdXVpZCgpLFxuICByZXNhdmU6IGZhbHNlLFxuICBzYXZlVW5pbml0aWFsaXplZDogZmFsc2UsXG4gIHNlY3JldDogJ3NhbXBsZV9zZXNzaW9uX3NlY3JldCcsXG59KTtcblxuZXhwcmVzc01pZGRsZXdhcmUudXNlKGNvcnMoe1xuICBjcmVkZW50aWFsczogdHJ1ZSxcbiAgb3JpZ2luOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwJyxcbn0pKTtcblxuZXhwcmVzc01pZGRsZXdhcmUudXNlKGV4cHJlc3NTZXNzaW9uTWlkZGxld2FyZSk7XG5leHByZXNzTWlkZGxld2FyZS51c2UocGFzc3BvcnRNaWRkbGV3YXJlKTtcbmV4cHJlc3NNaWRkbGV3YXJlLnVzZShwYXNzcG9ydFNlc3Npb25NaWRkbGV3YXJlKTtcblxuLy8gLS0tLS0gSU5JVElBTElaRSBPVVIgU0VSVkVSIC0tLS0tIC8vXG5cbmNvbnN0IHB1YnN1YiA9IG5ldyBQdWJTdWIoKTtcblxuY29uc3Qgc2VydmVyID0gbmV3IEFwb2xsb1NlcnZlcih7XG4gIGNvbnRleHQ6IChyZXF1ZXN0KSA9PiAoe1xuICAgIHBhc3Nwb3J0OiBidWlsZFBhc3Nwb3J0Q29udGV4dCh7IHJlcXVlc3Q6IHJlcXVlc3QucmVxLCByZXNwb25zZTogcmVxdWVzdC5yZXMgfSksXG4gICAgcHVic3ViLFxuICB9KSxcbiAgcGxheWdyb3VuZDoge1xuICAgIHNldHRpbmdzOiB7XG4gICAgICAncmVxdWVzdC5jcmVkZW50aWFscyc6ICdzYW1lLW9yaWdpbicsXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZXJzLFxuICB0eXBlRGVmcyxcbn0pO1xuXG5zZXJ2ZXIuYXBwbHlNaWRkbGV3YXJlKHtcbiAgYXBwOiBleHByZXNzTWlkZGxld2FyZSxcbiAgY29yczogZmFsc2UsXG4gIHBhdGg6ICcvZ3JhcGhxbCcsXG59KTtcblxuLy8gLS0tLS0gUlVOTklORyBUSEUgU0VSVkVSIC0tLS0tIC8vXG5cbmNvbnN0IGh0dHBTZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihleHByZXNzTWlkZGxld2FyZSk7XG5zZXJ2ZXIuaW5zdGFsbFN1YnNjcmlwdGlvbkhhbmRsZXJzKGh0dHBTZXJ2ZXIpO1xuXG5odHRwU2VydmVyLmxpc3Rlbihwcm9jZXNzLmVudi5QT1JULCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBTZXJ2ZXIgcmVhZHkgYXQgaHR0cDovL2xvY2FsaG9zdDoke3Byb2Nlc3MuZW52LlBPUlR9JHtzZXJ2ZXIuZ3JhcGhxbFBhdGh9YCk7XG4gIGNvbnNvbGUubG9nKGBTdWJzY3JpcHRpb25zIHJlYWR5IGF0IHdzOi8vbG9jYWxob3N0OiR7cHJvY2Vzcy5lbnYuUE9SVH0ke3NlcnZlci5zdWJzY3JpcHRpb25zUGF0aH1gKTtcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdQUk9EJyAmJiBtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiBzZXJ2ZXIuc3RvcCgpKTtcbn1cbiIsImltcG9ydCBwYXNzcG9ydCBmcm9tICdwYXNzcG9ydCc7XG5pbXBvcnQge1xuICBBdXRoZW50aWNhdGVQYXJhbXMsXG4gIEF1dGhlbnRpY2F0ZVJldHVybixcbiAgQnVpbGRQYXNzcG9ydENvbnRleHRQYXJhbXMsXG4gIERvbmUsXG4gIEV4cHJlc3NQYXJhbXMsXG4gIEluZm8sXG4gIExvZ2luUGFyYW1zLFxuICBQcm9taXNpZmllZEF1dGhlbnRpY2F0ZVBhcmFtcyxcbiAgUHJvbWlzaWZpZWRMb2dpblBhcmFtcyxcbn0gZnJvbSAnLi9wYXNzcG9ydFR5cGVzJztcblxuY29uc3QgcHJvbWlzaWZpZWRBdXRoZW50aWNhdGUgPSAoe1xuICBhdXRoZW50aWNhdGVPcHRpb25zLFxuICByZXF1ZXN0LFxuICByZXNwb25zZSxcbiAgc3RyYXRlZ3lOYW1lLFxufTogUHJvbWlzaWZpZWRBdXRoZW50aWNhdGVQYXJhbXMpOiBQcm9taXNlPEF1dGhlbnRpY2F0ZVJldHVybj4gPT4gKFxuICBuZXcgUHJvbWlzZTxBdXRoZW50aWNhdGVSZXR1cm4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBkb25lOiBEb25lID0gKFxuICAgICAgZXJyb3I6IEVycm9yIHwgdW5kZWZpbmVkLFxuICAgICAgdXNlcjogb2JqZWN0IHwgdW5kZWZpbmVkLFxuICAgICAgaW5mbz86IEluZm8gfCB1bmRlZmluZWQsXG4gICAgKTogdm9pZCA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHJlamVjdChlcnJvcik7XG4gICAgICBlbHNlIHJlc29sdmUoeyB1c2VyLCBpbmZvIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBhdXRoZW50aWNhdGVGdW5jdGlvbiA9IHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShzdHJhdGVneU5hbWUsIGF1dGhlbnRpY2F0ZU9wdGlvbnMsIGRvbmUpO1xuICAgIHJldHVybiBhdXRoZW50aWNhdGVGdW5jdGlvbihyZXF1ZXN0LCByZXNwb25zZSk7XG4gIH0pKTtcblxuY29uc3QgcHJvbWlzaWZpZWRMb2dpbiA9ICh7XG4gIGF1dGhlbnRpY2F0ZU9wdGlvbnMsXG4gIHJlcXVlc3QsXG4gIHVzZXIsXG59OiBQcm9taXNpZmllZExvZ2luUGFyYW1zKTogUHJvbWlzZTx2b2lkPiA9PiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGNvbnN0IGRvbmUgPSAoZXJyOiBFcnJvciB8IHVuZGVmaW5lZCk6IHZvaWQgPT4ge1xuICAgIGlmIChlcnIpIHJlamVjdChlcnIpO1xuICAgIGVsc2UgcmVzb2x2ZSgpO1xuICB9O1xuXG4gIHJlcXVlc3QubG9naW4odXNlciwgYXV0aGVudGljYXRlT3B0aW9ucywgZG9uZSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgKHsgcmVxdWVzdCwgcmVzcG9uc2UgfTogRXhwcmVzc1BhcmFtcyk6IEJ1aWxkUGFzc3BvcnRDb250ZXh0UGFyYW1zID0+IHtcbiAgY29uc3QgYXV0aGVudGljYXRlID0gKFxuICAgIHsgYXV0aGVudGljYXRlT3B0aW9ucywgc3RyYXRlZ3lOYW1lIH06IEF1dGhlbnRpY2F0ZVBhcmFtcyxcbiAgKTogUHJvbWlzZTxBdXRoZW50aWNhdGVSZXR1cm4+ID0+IChcbiAgICBwcm9taXNpZmllZEF1dGhlbnRpY2F0ZSh7XG4gICAgICBhdXRoZW50aWNhdGVPcHRpb25zLFxuICAgICAgcmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlLFxuICAgICAgc3RyYXRlZ3lOYW1lLFxuICAgIH0pXG4gICk7XG5cbiAgY29uc3QgaXNBdXRoZW50aWNhdGVkID0gKCk6IGJvb2xlYW4gPT4gcmVxdWVzdC5pc0F1dGhlbnRpY2F0ZWQoKTtcblxuICBjb25zdCBnZXRVc2VySWQgPSAoKTogc3RyaW5nID0+IHtcbiAgICBpZiAoaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHJldHVybiByZXF1ZXN0LnVzZXIuaWQ7XG4gICAgfVxuICAgIHRocm93IEVycm9yKCdQYXNzcG9ydCBDb250ZXh0IGdldFVzZXJJZCBlcnJvcjogVXNlciBpcyBub3QgYXV0aGVudGljYXRlZCcpO1xuICB9O1xuXG4gIGNvbnN0IGxvZ2luID0gKHsgYXV0aGVudGljYXRlT3B0aW9ucywgdXNlciB9OiBMb2dpblBhcmFtcyk6IFByb21pc2U8dm9pZD4gPT4gKFxuICAgIHByb21pc2lmaWVkTG9naW4oeyBhdXRoZW50aWNhdGVPcHRpb25zLCByZXF1ZXN0LCB1c2VyIH0pXG4gICk7XG5cbiAgY29uc3QgbG9nb3V0ID0gKCk6IHZvaWQgPT4gcmVxdWVzdC5sb2dvdXQoKTtcblxuICByZXR1cm4ge1xuICAgIGF1dGhlbnRpY2F0ZSxcbiAgICBnZXRVc2VySWQsXG4gICAgaXNBdXRoZW50aWNhdGVkLFxuICAgIGxvZ2luLFxuICAgIGxvZ291dCxcbiAgfTtcbn07XG4iLCJpbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBTdHJhdGVneSB9IGZyb20gJ3Bhc3Nwb3J0LXN0cmF0ZWd5JztcbmltcG9ydCB7IERvbmUsIEluZm8sIFZlcmlmeUZ1bmN0aW9uIH0gZnJvbSAnLi9wYXNzcG9ydFR5cGVzJztcblxuY2xhc3MgTG9jYWxTdHJhdGVneSBleHRlbmRzIFN0cmF0ZWd5IHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKGNiOiBWZXJpZnlGdW5jdGlvbikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy52ZXJpZnkgPSBjYjtcbiAgICB0aGlzLm5hbWUgPSAnbG9jYWwnO1xuICB9XG5cbiAgcHVibGljIHZlcmlmeTogVmVyaWZ5RnVuY3Rpb247XG5cbiAgcHVibGljIG5hbWU6IHN0cmluZztcblxuICBwdWJsaWMgYXV0aGVudGljYXRlKHJlcTogUmVxdWVzdCwgb3B0aW9uczogeyBlbWFpbDogc3RyaW5nOyBwYXNzd29yZDogc3RyaW5nIH0pOiB2b2lkIHtcbiAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gb3B0aW9ucztcblxuICAgIGNvbnN0IGRvbmU6IERvbmUgPSAoZXJyb3I6IEVycm9yLCB1c2VyOiBvYmplY3QsIGluZm8/OiBJbmZvKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcihlcnJvcik7XG4gICAgICB9XG4gICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gdGhpcy5mYWlsKGluZm8sIDQwMSk7XG4gICAgICB9XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICByZXR1cm4gdGhpcy5zdWNjZXNzKHVzZXIsIGluZm8pO1xuICAgIH07XG5cbiAgICB0aGlzLnZlcmlmeShlbWFpbCwgcGFzc3dvcmQsIGRvbmUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvY2FsU3RyYXRlZ3k7XG4iLCJjb25zdCByZXNvbHZlcnMgPSB7XG4gIFF1ZXJ5OiB7XG4gICAgaXNBdXRoZW50aWNhdGVkOiAocGFyZW50LCBhcmdzLCB7IHBhc3Nwb3J0IH0pID0+IHBhc3Nwb3J0LmlzQXV0aGVudGljYXRlZCgpLFxuICB9LFxuICBNdXRhdGlvbjoge1xuICAgIGxvZ2luVXNlcjogYXN5bmMgKHBhcmVudCwgYXJncywgeyBwYXNzcG9ydCB9KSA9PiB7XG4gICAgICBjb25zdCB7IHVzZXIgfSA9IGF3YWl0IHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSh7XG4gICAgICAgIGF1dGhlbnRpY2F0ZU9wdGlvbnM6IGFyZ3MuZGF0YSxcbiAgICAgICAgc3RyYXRlZ3lOYW1lOiAnbG9jYWwnLFxuICAgICAgfSk7XG5cbiAgICAgIHBhc3Nwb3J0LmxvZ2luKHsgYXV0aGVudGljYXRlT3B0aW9uczogYXJncy5kYXRhLCB1c2VyIH0pO1xuXG4gICAgICByZXR1cm4gdXNlcjtcbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVzb2x2ZXJzO1xuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJztcblxuY29uc3QgdHlwZURlZnMgPSBncWxgXG4gIHR5cGUgVXNlciB7XG4gICAgaWQ6IFN0cmluZ1xuICAgIGZpcnN0TmFtZTogU3RyaW5nXG4gICAgbGFzdE5hbWU6IFN0cmluZ1xuICAgIGVtYWlsOiBTdHJpbmdcbiAgfVxuICBpbnB1dCBMb2dpblVzZXJJbnB1dCB7XG4gICAgZW1haWw6IFN0cmluZyFcbiAgICBwYXNzd29yZDogU3RyaW5nIVxuICB9XG4gIHR5cGUgUXVlcnkge1xuICAgIGlzQXV0aGVudGljYXRlZDogQm9vbGVhblxuICB9XG4gIHR5cGUgTXV0YXRpb24ge1xuICAgIGxvZ2luVXNlcihkYXRhOiBMb2dpblVzZXJJbnB1dCk6IFVzZXIhXG4gIH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVEZWZzO1xuIiwiZXhwb3J0IGRlZmF1bHQgW1xuICB7XG4gICAgaWQ6ICcxJyxcbiAgICBmaXJzdE5hbWU6ICdKb2huJyxcbiAgICBsYXN0TmFtZTogJ1NtaXRoJyxcbiAgICBlbWFpbDogJ2pvaG5AZ21haWwuY29tJyxcbiAgICBwYXNzd29yZDogJ2FiYycsXG4gIH0sXG5dO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==