"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./webpart"));
var webpart_1 = require("./webpart");
// Create the global variable
var $REST = window["$REST"] || {};
$REST.WebPart = webpart_1.WebPart;
window["$REST"] = $REST;
//# sourceMappingURL=index.js.map