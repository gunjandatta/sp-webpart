import { WebPart, IWebPart } from "../../build/sp-webpart";
import { Configuration } from "./cfg";

/**
 * Demo WebPart
 */
export class DemoWebPart {
    // Configuration
    static Configuration = Configuration;

    /**
     * Constructor
     */
    constructor() {
        // Create an instance of the webpart
        new WebPart({
            cfgElementId: "wp-demoCfg",
            elementId: "wp-demo",
            onRenderDisplay: this.renderDisplay,
            onRenderEditElement: this.renderEdit
        });
    }

    // Render the display component
    private renderDisplay = (wp: IWebPart) => {
        // Set the display content
        wp.el.innerHTML = "<h3>The page is being displayed.</h3>";
    }

    // Render the edit component
    private renderEdit = (wp: IWebPart) => {
        // Set the display content
        wp.el.innerHTML = "<h3>The page is being edited.</h3>";
    }
}

// Add the global variable
window["WebPartDemo"] = DemoWebPart;

// Let SharePoint know the script has been loaded
window["SP"].SOD.notifyScriptLoadedAndExecuteWaitingJobs("wpDemo.js");