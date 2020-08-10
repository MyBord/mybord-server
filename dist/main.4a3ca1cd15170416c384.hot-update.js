exports.id = "main";
exports.modules = {

/***/ "./src/middleware/corsOptions.ts":
/*!***************************************!*\
  !*** ./src/middleware/corsOptions.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// See https://github.com/jimmy-e/mybord-server/blob/master/docs/applicationSummary.md#ii-cors-configuration
const corsOptions = {
    credentials: true,
};
if (['DEV', 'LOCAL'].includes(process.env.MODE)) {
    corsOptions.origin = `http://localhost:${process.env.EXTERNAL_PORT}`;
}
/* harmony default export */ __webpack_exports__["default"] = (corsOptions);


/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWlkZGxld2FyZS9jb3JzT3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUEsNEdBQTRHO0FBSTVHLE1BQU0sV0FBVyxHQUFnQjtJQUMvQixXQUFXLEVBQUUsSUFBSTtDQUNsQixDQUFDO0FBRUYsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUMvQyxXQUFXLENBQUMsTUFBTSxHQUFHLG9CQUFvQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0NBQ3RFO0FBRWMsMEVBQVcsRUFBQyIsImZpbGUiOiJtYWluLjRhM2NhMWNkMTUxNzA0MTZjMzg0LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ppbW15LWUvbXlib3JkLXNlcnZlci9ibG9iL21hc3Rlci9kb2NzL2FwcGxpY2F0aW9uU3VtbWFyeS5tZCNpaS1jb3JzLWNvbmZpZ3VyYXRpb25cblxuaW1wb3J0IHsgQ29yc09wdGlvbnMgfSBmcm9tICdjb3JzJztcblxuY29uc3QgY29yc09wdGlvbnM6IENvcnNPcHRpb25zID0ge1xuICBjcmVkZW50aWFsczogdHJ1ZSxcbn07XG5cbmlmIChbJ0RFVicsICdMT0NBTCddLmluY2x1ZGVzKHByb2Nlc3MuZW52Lk1PREUpKSB7XG4gIGNvcnNPcHRpb25zLm9yaWdpbiA9IGBodHRwOi8vbG9jYWxob3N0OiR7cHJvY2Vzcy5lbnYuRVhURVJOQUxfUE9SVH1gO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3JzT3B0aW9ucztcbiJdLCJzb3VyY2VSb290IjoiIn0=