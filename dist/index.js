"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var cors_1 = __importDefault(require("cors"));
var verifier = require('email-verify');
var firebaseConfig = {
    apiKey: "AIzaSyBF6gLujJZq6aW37hLGaEj_eDiqJckEoI4",
    authDomain: "scraper-c87bd.firebaseapp.com",
    projectId: "scraper-c87bd",
    storageBucket: "scraper-c87bd.firebasestorage.app",
    messagingSenderId: "941117050458",
    appId: "1:941117050458:web:8a516eb7e723b317ed1263"
};
// Initialize Firebase
var fb = (0, app_1.initializeApp)(firebaseConfig);
var db = (0, firestore_1.getFirestore)(fb);
function getStoredParameters() {
    return __awaiter(this, void 0, void 0, function () {
        var docRef, docSnap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    docRef = (0, firestore_1.doc)(db, "parameters", "current");
                    return [4 /*yield*/, (0, firestore_1.getDoc)(docRef)];
                case 1:
                    docSnap = _a.sent();
                    if (docSnap.exists()) {
                        return [2 /*return*/, docSnap.data()];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getStoredParameters()];
            case 1:
                data = _a.sent();
                res.json(data);
                return [2 /*return*/];
        }
    });
}); });
app.get('/verify-email/:email', function (req, res) {
    // const { email } = req.body;
    var email = req.params.email;
    // console.log(email);
    if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
    }
    verifier.verify(email, function (err, info) {
        if (err) {
            console.log(err);
            res.json({ success: false, info: err });
        }
        else {
            // console.log( "Success (T/F): " + info.success );
            // console.log( "Info: " + info.info );
        }
        return res.json({ success: info.success, info: info.info });
    });
});
var port = parseInt(process.env.PORT || '3000');
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
//# sourceMappingURL=index.js.map