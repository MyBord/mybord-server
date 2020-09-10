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
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var middleware_initializeMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! middleware/initializeMiddleware */ "./src/middleware/initializeMiddleware.ts");
/* harmony import */ var server_initializeServer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! server/initializeServer */ "./src/server/initializeServer.ts");



// We initialize our middleware
const { expressMiddleware, expressSessionMiddleware, passportMiddleware, passportSessionMiddleware, prisma, } = Object(middleware_initializeMiddleware__WEBPACK_IMPORTED_MODULE_1__["default"])();
// We initialize our Apollo Server
const server = Object(server_initializeServer__WEBPACK_IMPORTED_MODULE_2__["default"])(expressSessionMiddleware, passportMiddleware, passportSessionMiddleware, prisma);
// We apply the express middleware to our server
server.applyMiddleware({
    app: expressMiddleware,
    cors: false,
    path: '/graphql',
});
// We create an http server and then add subscriptions
// https://www.apollographql.com/docs/apollo-server/data/subscriptions/#subscriptions-with-additional-middleware
const httpServer = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(expressMiddleware);
server.installSubscriptionHandlers(httpServer);
// We declare what port our server will run on.
const PORT = process.env.PORT || 4000;
// We run our http server.
httpServer.listen(PORT, () => {
    if (process.env.MODE === 'LOCAL') {
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
        console.log(`Client ready at http://localhost:${PORT}`);
    }
});
// Using webpack's hot module replacement, if needed.
if (process.env.MODE === 'LOCAL' && module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.stop());
}


/***/ }),

/***/ "./src/middleware/initializeMiddleware.ts":
/*!************************************************!*\
  !*** ./src/middleware/initializeMiddleware.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express_sslify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-sslify */ "express-sslify");
/* harmony import */ var express_sslify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_sslify__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! express-session */ "express-session");
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _corsOptions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./corsOptions */ "./src/middleware/corsOptions.ts");
/* harmony import */ var _expressSessionOptions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./expressSessionOptions */ "./src/middleware/expressSessionOptions.ts");
/* harmony import */ var _passport_initializePassport__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./passport/initializePassport */ "./src/middleware/passport/initializePassport.ts");
/* harmony import */ var _prisma_initializePrisma__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../prisma/initializePrisma */ "./src/prisma/initializePrisma.ts");









/* harmony default export */ __webpack_exports__["default"] = (() => {
    // We initialize our Prisma db instance
    const prisma = Object(_prisma_initializePrisma__WEBPACK_IMPORTED_MODULE_8__["default"])();
    // initializes passport
    Object(_passport_initializePassport__WEBPACK_IMPORTED_MODULE_7__["default"])(prisma);
    // initializes our middleware
    const expressMiddleware = express__WEBPACK_IMPORTED_MODULE_2___default()();
    const expressSessionMiddleware = express_session__WEBPACK_IMPORTED_MODULE_4___default()(_expressSessionOptions__WEBPACK_IMPORTED_MODULE_6__["default"]);
    const passportMiddleware = passport__WEBPACK_IMPORTED_MODULE_3___default.a.initialize();
    const passportSessionMiddleware = passport__WEBPACK_IMPORTED_MODULE_3___default.a.session();
    // implements our middleware into express
    expressMiddleware.use(cors__WEBPACK_IMPORTED_MODULE_0___default()(_corsOptions__WEBPACK_IMPORTED_MODULE_5__["default"]));
    expressMiddleware.use(expressSessionMiddleware);
    expressMiddleware.use(passportMiddleware);
    expressMiddleware.use(passportSessionMiddleware);
    // enforces HTTPS for our production server
    // https://help.heroku.com/J2R1S4T8/can-heroku-force-an-application-to-use-ssl-tls
    if (process.env.MODE === 'PROD') {
        expressMiddleware.use(express_sslify__WEBPACK_IMPORTED_MODULE_1___default.a.HTTPS({ trustProtoHeader: true }));
    }
    // We serve our public client application
    expressMiddleware.use(express__WEBPACK_IMPORTED_MODULE_2___default.a.static('public'));
    expressMiddleware.get('*', (request, response) => {
        response.sendFile('public/index.html', { root: '.' });
    });
    // returns our middleware
    return {
        expressMiddleware,
        expressSessionMiddleware,
        passportMiddleware,
        passportSessionMiddleware,
        prisma,
    };
});


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pZGRsZXdhcmUvaW5pdGlhbGl6ZU1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXdCO0FBQzJDO0FBQ1o7QUFFdkQsK0JBQStCO0FBQy9CLE1BQU0sRUFDSixpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLGtCQUFrQixFQUNsQix5QkFBeUIsRUFDekIsTUFBTSxHQUNQLEdBQUcsK0VBQW9CLEVBQUUsQ0FBQztBQUUzQixrQ0FBa0M7QUFDbEMsTUFBTSxNQUFNLEdBQUcsdUVBQWdCLENBQzdCLHdCQUF3QixFQUN4QixrQkFBa0IsRUFDbEIseUJBQXlCLEVBQ3pCLE1BQU0sQ0FDUCxDQUFDO0FBRUYsZ0RBQWdEO0FBQ2hELE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDckIsR0FBRyxFQUFFLGlCQUFpQjtJQUN0QixJQUFJLEVBQUUsS0FBSztJQUNYLElBQUksRUFBRSxVQUFVO0NBQ2pCLENBQUMsQ0FBQztBQUVILHNEQUFzRDtBQUN0RCxnSEFBZ0g7QUFDaEgsTUFBTSxVQUFVLEdBQUcsMkNBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN4RCxNQUFNLENBQUMsMkJBQTJCLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFL0MsK0NBQStDO0FBQy9DLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUV0QywwQkFBMEI7QUFDMUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQzNCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxJQUFJLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUN4RixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3pEO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxxREFBcUQ7QUFDckQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtJQUM5QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0NBQ3pDOzs7Ozs7Ozs7Ozs7O0FDakREO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF3QjtBQUNhO0FBQ007QUFDWDtBQUNNO0FBRUU7QUFDb0I7QUFDRztBQUNMO0FBVTNDLGtFQUFlLEVBQUU7SUFDOUIsdUNBQXVDO0lBQ3ZDLE1BQU0sTUFBTSxHQUFHLHdFQUFnQixFQUFFLENBQUM7SUFFbEMsdUJBQXVCO0lBQ3ZCLDRFQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTNCLDZCQUE2QjtJQUM3QixNQUFNLGlCQUFpQixHQUFHLDhDQUFPLEVBQUUsQ0FBQztJQUNwQyxNQUFNLHdCQUF3QixHQUFHLHNEQUFPLENBQUMsOERBQXFCLENBQUMsQ0FBQztJQUNoRSxNQUFNLGtCQUFrQixHQUFHLCtDQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakQsTUFBTSx5QkFBeUIsR0FBRywrQ0FBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRXJELHlDQUF5QztJQUN6QyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsMkNBQUksQ0FBQyxvREFBVyxDQUFDLENBQUMsQ0FBQztJQUN6QyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUNoRCxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMxQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUVqRCwyQ0FBMkM7SUFDM0Msa0ZBQWtGO0lBQ2xGLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQy9CLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxxREFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNsRTtJQUVELHlDQUF5QztJQUN6QyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsOENBQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNoRCxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQy9DLFFBQVEsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUMsQ0FBQztJQUVILHlCQUF5QjtJQUN6QixPQUFPO1FBQ0wsaUJBQWlCO1FBQ2pCLHdCQUF3QjtRQUN4QixrQkFBa0I7UUFDbEIseUJBQXlCO1FBQ3pCLE1BQU07S0FDUCxDQUFDO0FBQ0osQ0FBQyxFQUFDIiwiZmlsZSI6Im1haW4uMGUyNDgxNDBmNjliZmJlMzI0ZWYuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IGluaXRpYWxpemVNaWRkbGV3YXJlIGZyb20gJ21pZGRsZXdhcmUvaW5pdGlhbGl6ZU1pZGRsZXdhcmUnO1xuaW1wb3J0IGluaXRpYWxpemVTZXJ2ZXIgZnJvbSAnc2VydmVyL2luaXRpYWxpemVTZXJ2ZXInO1xuXG4vLyBXZSBpbml0aWFsaXplIG91ciBtaWRkbGV3YXJlXG5jb25zdCB7XG4gIGV4cHJlc3NNaWRkbGV3YXJlLFxuICBleHByZXNzU2Vzc2lvbk1pZGRsZXdhcmUsXG4gIHBhc3Nwb3J0TWlkZGxld2FyZSxcbiAgcGFzc3BvcnRTZXNzaW9uTWlkZGxld2FyZSxcbiAgcHJpc21hLFxufSA9IGluaXRpYWxpemVNaWRkbGV3YXJlKCk7XG5cbi8vIFdlIGluaXRpYWxpemUgb3VyIEFwb2xsbyBTZXJ2ZXJcbmNvbnN0IHNlcnZlciA9IGluaXRpYWxpemVTZXJ2ZXIoXG4gIGV4cHJlc3NTZXNzaW9uTWlkZGxld2FyZSxcbiAgcGFzc3BvcnRNaWRkbGV3YXJlLFxuICBwYXNzcG9ydFNlc3Npb25NaWRkbGV3YXJlLFxuICBwcmlzbWEsXG4pO1xuXG4vLyBXZSBhcHBseSB0aGUgZXhwcmVzcyBtaWRkbGV3YXJlIHRvIG91ciBzZXJ2ZXJcbnNlcnZlci5hcHBseU1pZGRsZXdhcmUoe1xuICBhcHA6IGV4cHJlc3NNaWRkbGV3YXJlLFxuICBjb3JzOiBmYWxzZSxcbiAgcGF0aDogJy9ncmFwaHFsJyxcbn0pO1xuXG4vLyBXZSBjcmVhdGUgYW4gaHR0cCBzZXJ2ZXIgYW5kIHRoZW4gYWRkIHN1YnNjcmlwdGlvbnNcbi8vIGh0dHBzOi8vd3d3LmFwb2xsb2dyYXBocWwuY29tL2RvY3MvYXBvbGxvLXNlcnZlci9kYXRhL3N1YnNjcmlwdGlvbnMvI3N1YnNjcmlwdGlvbnMtd2l0aC1hZGRpdGlvbmFsLW1pZGRsZXdhcmVcbmNvbnN0IGh0dHBTZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihleHByZXNzTWlkZGxld2FyZSk7XG5zZXJ2ZXIuaW5zdGFsbFN1YnNjcmlwdGlvbkhhbmRsZXJzKGh0dHBTZXJ2ZXIpO1xuXG4vLyBXZSBkZWNsYXJlIHdoYXQgcG9ydCBvdXIgc2VydmVyIHdpbGwgcnVuIG9uLlxuY29uc3QgUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgNDAwMDtcblxuLy8gV2UgcnVuIG91ciBodHRwIHNlcnZlci5cbmh0dHBTZXJ2ZXIubGlzdGVuKFBPUlQsICgpID0+IHtcbiAgaWYgKHByb2Nlc3MuZW52Lk1PREUgPT09ICdMT0NBTCcpIHtcbiAgICBjb25zb2xlLmxvZyhgU2VydmVyIHJlYWR5IGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JHtQT1JUfSR7c2VydmVyLmdyYXBocWxQYXRofWApO1xuICAgIGNvbnNvbGUubG9nKGBTdWJzY3JpcHRpb25zIHJlYWR5IGF0IHdzOi8vbG9jYWxob3N0OiR7UE9SVH0ke3NlcnZlci5zdWJzY3JpcHRpb25zUGF0aH1gKTtcbiAgICBjb25zb2xlLmxvZyhgQ2xpZW50IHJlYWR5IGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JHtQT1JUfWApO1xuICB9XG59KTtcblxuLy8gVXNpbmcgd2VicGFjaydzIGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQsIGlmIG5lZWRlZC5cbmlmIChwcm9jZXNzLmVudi5NT0RFID09PSAnTE9DQUwnICYmIG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHNlcnZlci5zdG9wKCkpO1xufVxuIiwiaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5pbXBvcnQgZW5mb3JjZSBmcm9tICdleHByZXNzLXNzbGlmeSc7XG5pbXBvcnQgZXhwcmVzcywgeyBFeHByZXNzIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnO1xuaW1wb3J0IHNlc3Npb24gZnJvbSAnZXhwcmVzcy1zZXNzaW9uJztcbmltcG9ydCB7IFByaXNtYSB9IGZyb20gJ3ByaXNtYS1iaW5kaW5nJztcbmltcG9ydCBjb3JzT3B0aW9ucyBmcm9tICcuL2NvcnNPcHRpb25zJztcbmltcG9ydCBleHByZXNzU2Vzc2lvbk9wdGlvbnMgZnJvbSAnLi9leHByZXNzU2Vzc2lvbk9wdGlvbnMnO1xuaW1wb3J0IGluaXRpYWxpemVQYXNzcG9ydCBmcm9tICcuL3Bhc3Nwb3J0L2luaXRpYWxpemVQYXNzcG9ydCc7XG5pbXBvcnQgaW5pdGlhbGl6ZVByaXNtYSBmcm9tICcuLi9wcmlzbWEvaW5pdGlhbGl6ZVByaXNtYSc7XG5cbmludGVyZmFjZSBNaWRkbGV3YXJlIHtcbiAgZXhwcmVzc01pZGRsZXdhcmU6IEV4cHJlc3M7XG4gIGV4cHJlc3NTZXNzaW9uTWlkZGxld2FyZTogZXhwcmVzcy5SZXF1ZXN0SGFuZGxlcjtcbiAgcGFzc3BvcnRNaWRkbGV3YXJlOiBleHByZXNzLkhhbmRsZXI7XG4gIHBhc3Nwb3J0U2Vzc2lvbk1pZGRsZXdhcmU6IGV4cHJlc3MuUmVxdWVzdEhhbmRsZXI7XG4gIHByaXNtYTogUHJpc21hO1xufVxuXG5leHBvcnQgZGVmYXVsdCAoKTogTWlkZGxld2FyZSA9PiB7XG4gIC8vIFdlIGluaXRpYWxpemUgb3VyIFByaXNtYSBkYiBpbnN0YW5jZVxuICBjb25zdCBwcmlzbWEgPSBpbml0aWFsaXplUHJpc21hKCk7XG5cbiAgLy8gaW5pdGlhbGl6ZXMgcGFzc3BvcnRcbiAgaW5pdGlhbGl6ZVBhc3Nwb3J0KHByaXNtYSk7XG5cbiAgLy8gaW5pdGlhbGl6ZXMgb3VyIG1pZGRsZXdhcmVcbiAgY29uc3QgZXhwcmVzc01pZGRsZXdhcmUgPSBleHByZXNzKCk7XG4gIGNvbnN0IGV4cHJlc3NTZXNzaW9uTWlkZGxld2FyZSA9IHNlc3Npb24oZXhwcmVzc1Nlc3Npb25PcHRpb25zKTtcbiAgY29uc3QgcGFzc3BvcnRNaWRkbGV3YXJlID0gcGFzc3BvcnQuaW5pdGlhbGl6ZSgpO1xuICBjb25zdCBwYXNzcG9ydFNlc3Npb25NaWRkbGV3YXJlID0gcGFzc3BvcnQuc2Vzc2lvbigpO1xuXG4gIC8vIGltcGxlbWVudHMgb3VyIG1pZGRsZXdhcmUgaW50byBleHByZXNzXG4gIGV4cHJlc3NNaWRkbGV3YXJlLnVzZShjb3JzKGNvcnNPcHRpb25zKSk7XG4gIGV4cHJlc3NNaWRkbGV3YXJlLnVzZShleHByZXNzU2Vzc2lvbk1pZGRsZXdhcmUpO1xuICBleHByZXNzTWlkZGxld2FyZS51c2UocGFzc3BvcnRNaWRkbGV3YXJlKTtcbiAgZXhwcmVzc01pZGRsZXdhcmUudXNlKHBhc3Nwb3J0U2Vzc2lvbk1pZGRsZXdhcmUpO1xuXG4gIC8vIGVuZm9yY2VzIEhUVFBTIGZvciBvdXIgcHJvZHVjdGlvbiBzZXJ2ZXJcbiAgLy8gaHR0cHM6Ly9oZWxwLmhlcm9rdS5jb20vSjJSMVM0VDgvY2FuLWhlcm9rdS1mb3JjZS1hbi1hcHBsaWNhdGlvbi10by11c2Utc3NsLXRsc1xuICBpZiAocHJvY2Vzcy5lbnYuTU9ERSA9PT0gJ1BST0QnKSB7XG4gICAgZXhwcmVzc01pZGRsZXdhcmUudXNlKGVuZm9yY2UuSFRUUFMoeyB0cnVzdFByb3RvSGVhZGVyOiB0cnVlIH0pKTtcbiAgfVxuXG4gIC8vIFdlIHNlcnZlIG91ciBwdWJsaWMgY2xpZW50IGFwcGxpY2F0aW9uXG4gIGV4cHJlc3NNaWRkbGV3YXJlLnVzZShleHByZXNzLnN0YXRpYygncHVibGljJykpO1xuICBleHByZXNzTWlkZGxld2FyZS5nZXQoJyonLCAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICByZXNwb25zZS5zZW5kRmlsZSgncHVibGljL2luZGV4Lmh0bWwnLCB7IHJvb3Q6ICcuJyB9KTtcbiAgfSk7XG5cbiAgLy8gcmV0dXJucyBvdXIgbWlkZGxld2FyZVxuICByZXR1cm4ge1xuICAgIGV4cHJlc3NNaWRkbGV3YXJlLFxuICAgIGV4cHJlc3NTZXNzaW9uTWlkZGxld2FyZSxcbiAgICBwYXNzcG9ydE1pZGRsZXdhcmUsXG4gICAgcGFzc3BvcnRTZXNzaW9uTWlkZGxld2FyZSxcbiAgICBwcmlzbWEsXG4gIH07XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==