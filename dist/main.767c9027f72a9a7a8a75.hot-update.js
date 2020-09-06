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


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXdCO0FBQzJDO0FBQ1o7QUFFdkQsK0JBQStCO0FBQy9CLE1BQU0sRUFDSixpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLGtCQUFrQixFQUNsQix5QkFBeUIsRUFDekIsTUFBTSxHQUNQLEdBQUcsK0VBQW9CLEVBQUUsQ0FBQztBQUUzQixrQ0FBa0M7QUFDbEMsTUFBTSxNQUFNLEdBQUcsdUVBQWdCLENBQzdCLHdCQUF3QixFQUN4QixrQkFBa0IsRUFDbEIseUJBQXlCLEVBQ3pCLE1BQU0sQ0FDUCxDQUFDO0FBRUYsZ0RBQWdEO0FBQ2hELE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDckIsR0FBRyxFQUFFLGlCQUFpQjtJQUN0QixJQUFJLEVBQUUsS0FBSztJQUNYLElBQUksRUFBRSxVQUFVO0NBQ2pCLENBQUMsQ0FBQztBQUVILHNEQUFzRDtBQUN0RCxnSEFBZ0g7QUFDaEgsTUFBTSxVQUFVLEdBQUcsMkNBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN4RCxNQUFNLENBQUMsMkJBQTJCLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFL0MsK0NBQStDO0FBQy9DLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUV0QywwQkFBMEI7QUFDMUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQzNCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxJQUFJLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUN4RixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3pEO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxxREFBcUQ7QUFDckQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtJQUM5QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0NBQ3pDIiwiZmlsZSI6Im1haW4uNzY3YzkwMjdmNzJhOWE3YThhNzUuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IGluaXRpYWxpemVNaWRkbGV3YXJlIGZyb20gJ21pZGRsZXdhcmUvaW5pdGlhbGl6ZU1pZGRsZXdhcmUnO1xuaW1wb3J0IGluaXRpYWxpemVTZXJ2ZXIgZnJvbSAnc2VydmVyL2luaXRpYWxpemVTZXJ2ZXInO1xuXG4vLyBXZSBpbml0aWFsaXplIG91ciBtaWRkbGV3YXJlXG5jb25zdCB7XG4gIGV4cHJlc3NNaWRkbGV3YXJlLFxuICBleHByZXNzU2Vzc2lvbk1pZGRsZXdhcmUsXG4gIHBhc3Nwb3J0TWlkZGxld2FyZSxcbiAgcGFzc3BvcnRTZXNzaW9uTWlkZGxld2FyZSxcbiAgcHJpc21hLFxufSA9IGluaXRpYWxpemVNaWRkbGV3YXJlKCk7XG5cbi8vIFdlIGluaXRpYWxpemUgb3VyIEFwb2xsbyBTZXJ2ZXJcbmNvbnN0IHNlcnZlciA9IGluaXRpYWxpemVTZXJ2ZXIoXG4gIGV4cHJlc3NTZXNzaW9uTWlkZGxld2FyZSxcbiAgcGFzc3BvcnRNaWRkbGV3YXJlLFxuICBwYXNzcG9ydFNlc3Npb25NaWRkbGV3YXJlLFxuICBwcmlzbWEsXG4pO1xuXG4vLyBXZSBhcHBseSB0aGUgZXhwcmVzcyBtaWRkbGV3YXJlIHRvIG91ciBzZXJ2ZXJcbnNlcnZlci5hcHBseU1pZGRsZXdhcmUoe1xuICBhcHA6IGV4cHJlc3NNaWRkbGV3YXJlLFxuICBjb3JzOiBmYWxzZSxcbiAgcGF0aDogJy9ncmFwaHFsJyxcbn0pO1xuXG4vLyBXZSBjcmVhdGUgYW4gaHR0cCBzZXJ2ZXIgYW5kIHRoZW4gYWRkIHN1YnNjcmlwdGlvbnNcbi8vIGh0dHBzOi8vd3d3LmFwb2xsb2dyYXBocWwuY29tL2RvY3MvYXBvbGxvLXNlcnZlci9kYXRhL3N1YnNjcmlwdGlvbnMvI3N1YnNjcmlwdGlvbnMtd2l0aC1hZGRpdGlvbmFsLW1pZGRsZXdhcmVcbmNvbnN0IGh0dHBTZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihleHByZXNzTWlkZGxld2FyZSk7XG5zZXJ2ZXIuaW5zdGFsbFN1YnNjcmlwdGlvbkhhbmRsZXJzKGh0dHBTZXJ2ZXIpO1xuXG4vLyBXZSBkZWNsYXJlIHdoYXQgcG9ydCBvdXIgc2VydmVyIHdpbGwgcnVuIG9uLlxuY29uc3QgUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgNDAwMDtcblxuLy8gV2UgcnVuIG91ciBodHRwIHNlcnZlci5cbmh0dHBTZXJ2ZXIubGlzdGVuKFBPUlQsICgpID0+IHtcbiAgaWYgKHByb2Nlc3MuZW52Lk1PREUgPT09ICdMT0NBTCcpIHtcbiAgICBjb25zb2xlLmxvZyhgU2VydmVyIHJlYWR5IGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JHtQT1JUfSR7c2VydmVyLmdyYXBocWxQYXRofWApO1xuICAgIGNvbnNvbGUubG9nKGBTdWJzY3JpcHRpb25zIHJlYWR5IGF0IHdzOi8vbG9jYWxob3N0OiR7UE9SVH0ke3NlcnZlci5zdWJzY3JpcHRpb25zUGF0aH1gKTtcbiAgICBjb25zb2xlLmxvZyhgQ2xpZW50IHJlYWR5IGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JHtQT1JUfWApO1xuICB9XG59KTtcblxuLy8gVXNpbmcgd2VicGFjaydzIGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQsIGlmIG5lZWRlZC5cbmlmIChwcm9jZXNzLmVudi5NT0RFID09PSAnTE9DQUwnICYmIG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHNlcnZlci5zdG9wKCkpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==