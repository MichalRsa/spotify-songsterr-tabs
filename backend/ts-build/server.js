'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', function () {
  return console.log('siema');
});
app.listen(3000, function () {
  return console.log('Server is running');
});
