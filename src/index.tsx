import * as React from "react";
import {render} from "react-dom";
import {Configuration} from "./scripts/cfg";
import {
    ContactTabs,
    EditPanel,
    Helper
} from "./components";

// Add a load event
window.addEventListener("load", () => {
    // Get the target element
    let elTarget = document.querySelector("#dev_myContacts");
    if(elTarget == null) {
        // Log
        console.log("Error - The target webpart element was not found.");
        return;
    }

    // Get the configuration for this webpart
    let cfg:HTMLDivElement | any = document.querySelector("#dev_myContactsCfg") as HTMLDivElement;
    if(cfg) {
        // Ensure the configuration exists
        if(cfg.innerText.trim().length == 0) {
            // Log
            console.log("Warning - The 'My Contacts' webpart has not been configured.");
        } else {
            // Try to parse the configuration
            try { cfg = JSON.parse(cfg.innerText); }
            catch(ex) {
                // Log
                console.log("Error - The 'My Contacts' webpart configuration is not in the correct JSON format.");
            }
        }
    } else {
        // Log
        console.log("Error - The configuration for 'My Contacts' was not found.");
    }

    // See if the page is currently being edited
    if(Helper.isInEditMode()) {
        // Render the edit panel
        render(<EditPanel listName={cfg ? cfg.ListName : ""} />, elTarget);
    } else {
        // Ensure the configuration exists
        if(cfg && cfg.ListName) {
            // Render the component
            render(<ContactTabs listName={cfg.ListName} />, elTarget);
        } else {
            // Render a message
            render(<h3>Please edit the page and configure this webpart.</h3>, elTarget);
        }
    }
});

// Create the global variable
window["WPDemo"] = {
    Configuration
};