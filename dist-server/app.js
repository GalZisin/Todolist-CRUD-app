'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var path_1 = __importDefault(require('path'));
var cors_1 = __importDefault(require('cors'));
var body_parser_1 = __importDefault(require('body-parser'));
var morgan_1 = __importDefault(require('morgan'));
var userRoute_1 = __importDefault(require('./routes/userRoute'));
var taskRoute_1 = __importDefault(require('./routes/taskRoute'));
var mongoose_1 = __importDefault(require('mongoose'));
var app = express_1.default();
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// var DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose_1.default
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(function () {
    return console.log('DB connection successful!');
  })
  .catch(function (err) {
    return console.log(err);
  });
app.use('/api/users', userRoute_1.default);
app.use('/api/tasks', taskRoute_1.default);
if (process.env.NODE_ENV === 'production') {
  app.use(express_1.default.static('client/build'));
  app.get('/*', function (req, res) {
    console.log('path.resolve == ' + path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
    var ret = path_1.default
      .resolve(__dirname, 'client', 'build', 'index.html')
      .replace('/dist-server', '')
      .replace('\\dist-server', '');
    res.sendFile(ret);
    console.log('path.resolve ret== ' + ret);
  });
}
exports.default = app;
