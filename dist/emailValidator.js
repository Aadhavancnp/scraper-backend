"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = void 0;
var verifier = require('email-verify');
function verifyEmail(email) {
    verifier.verify(email, function (err, info) {
        if (err)
            console.log(err);
        else {
            console.log("Success (T/F): " + info.success);
            console.log("Info: " + info.info);
        }
        return info.success;
    });
}
exports.verifyEmail = verifyEmail;
//# sourceMappingURL=emailValidator.js.map