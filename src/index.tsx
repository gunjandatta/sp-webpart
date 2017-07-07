import * as React from "react";
import { WebPart } from "gd-sprest-react";
import { Configuration } from "./cfg";
import { ContactsWebPart } from "./wp";
import { WebPartCfg } from "./wpCfg";

/**
 * WebPart Demo
 */
class WebPartDemo {
    // Configuration
    static Configuration = Configuration;

    /**
     * Constructor
     */
    constructor() {
        // Create an instance of the webpart
        new WebPart({
            cfgElementId: "wp-contactsCfg",
            displayElement: ContactsWebPart,
            editElement: WebPartCfg,
            targetElementId: "wp-contacts"
        });
    }
}

// Add the global variable
window["WebPartDemo"] = WebPartDemo;

// Let SharePoint know the script has been loaded
window["SP"].SOD.notifyScriptLoadedAndExecuteWaitingJobs("wpDemo.js");