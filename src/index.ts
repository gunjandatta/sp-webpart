export * from "./webpart";
import { WebPart } from "./webpart";

// Create the global variable
var $REST = window["$REST"] || {};
$REST.WebPart = WebPart;
window["$REST"] = $REST;