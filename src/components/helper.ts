import {Promise} from "es6-promise";
import {ContextInfo} from "gd-sprest";
declare var SP;

/**
 * WebPart
 */
export interface IWebPartInfo {
    Context: any;
    Properties: any;
    WebPart: any;
    WebPartDefinition: any;
}

/**
 * Helper Methods
 */
export class Helper {
    // Method to get a webpart containing a target element
    static getWebPart(elementId:string) {
        // Return a promise
        return new Promise((resolve, reject) => {
            let wpDefs = [];

            // Load the webpart definitions for the current page
            let context = SP.ClientContext.get_current();
            let page = context.get_web().getFileByServerRelativeUrl(ContextInfo.serverRequestPath);
            let wpMgr = page.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared)
            let wpDefinitions = wpMgr.get_webParts();
            context.load(wpDefinitions, "Include(WebPart)");

            // Execute the request
            context.executeQueryAsync(() => {
                // Parse the webpart definitions
                let enumerator = wpDefinitions.getEnumerator();
                while(enumerator.moveNext()) {
                    let wpDef = enumerator.get_current();
                    let wp = wpDef.get_webPart();

                    // Load the webpart properties
                    context.load(wp, "Properties");

                    // Save a reference to this webpart definition
                    wpDefs.push(wpDef);
                }

                // Execute the request
                context.executeQueryAsync(() => {
                    // Parse the webpart definitions
                    for(let i=0; i<wpDefs.length; i++) {
                        let wpDef = wpDefs[i];
                        let wp = wpDef.get_webPart();
                        let properties = wp.get_properties();

                        // See if this is the target webpart
                        let content:string = properties.get_fieldValues()["Content"];
                        if(content && content.indexOf(elementId) > 0) {
                            // Resolve the promise
                            resolve({
                                Context: context,
                                Properties: properties,
                                WebPart: wp,
                                WebPartDefinition: wpDef
                            })
                        }
                    }

                    // Target webpart was not found
                    resolve();
                });
            });
        });
    }

    // Method to determine if the page is being edited
    static isInEditMode() {
        // Get the design mode
        let designMode:any = document ? document.forms[0] : null;
        designMode = designMode ? designMode.elements["MSOLayout_InDesignMode"] : null;
        designMode = designMode ? designMode.value : "";

        // Get the wiki page mode
        let wikiPageMode:any = document ? document.forms[0] : null;
        wikiPageMode = wikiPageMode ? wikiPageMode.elements["_wikiPageMode"] : null;
        wikiPageMode = wikiPageMode ? wikiPageMode.value : "";

        // Determine if the page is being edited
        return wikiPageMode == "Edit" || designMode == "1";
    }
};