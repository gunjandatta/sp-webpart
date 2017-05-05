import {Promise} from "es6-promise";
import {List, Types} from "gd-sprest";

/**
 * My Contact
 */
export interface IMyContact {
    MCCategory: string;
    MCPhoneNumber: string;
    ID: number;
    Title: string;
}

/**
 * Data Source
 */
export class DataSource {
    static loadData(listName:string) {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the list
            (new List(listName))
                // Get the items
                .Items()
                // Set the query
                .query({
                    OrderBy: ["MCCategory", "Title"],
                    Select: ["MCCategory", "MCPhoneNumber", "Title"],
                    Top: 500
                })
                // Execute the request
                .execute((items:Types.IListItems) => {
                    let contacts:Array<IMyContact> = [];

                    // Ensure the items exists
                    if(items.existsFl) {
                        // Parse the items
                        for(let i=0; i<items.results.length; i++) {
                            let item = items.results[i];

                            // Add the contact
                            contacts.push({
                                ID: item.Id,
                                MCCategory: item["MCCategory"],
                                MCPhoneNumber: item["MCPhoneNumber"],
                                Title: item["Title"]
                            });
                        }
                    }

                    // Resolve the promise
                    resolve(contacts);
                });
        });
    }
}