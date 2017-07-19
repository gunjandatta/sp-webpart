import * as React from "react";
import { List, Types } from "gd-sprest";
import { DetailsList, Pivot, PivotItem } from "office-ui-fabric-react";
import { IDemoWebPartCfg } from "./wpCfg";
import "./wpDemo.scss";

/**
 * Contact
 */
interface IContact extends Types.IListItemQueryResult {
    MCCategory: string;
    MCPhoneNumber: string;
    Title: string;
}

/**
 * Properties
 */
interface Props {
    cfg: IDemoWebPartCfg;
}

/**
 * State
 */
interface State {
    contacts: Array<IContact>;
    selectedTab: string;
}

/**
 * Contacts WebPart
 */
export class ContactsWebPart extends React.Component<Props, State> {
    // Constructor
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = {
            contacts: [],
            selectedTab: "Business"
        };

        // Load the list data
        this.load();
    }

    // Render the component
    render() {
        return (
            <Pivot onLinkClick={this.updateContacts}>
                <PivotItem linkText="Business">
                    {this.renderContacts()}
                </PivotItem>
                <PivotItem linkText="Family">
                    {this.renderContacts()}
                </PivotItem>
                <PivotItem linkText="Personal">
                    {this.renderContacts()}
                </PivotItem>
            </Pivot>
        );
    }

    /**
     * Methods
     */

    // Method to load the list data
    private load = () => {
        // Get the list
        (new List(this.props.cfg.ListName))
            // Get the items
            .Items()
            // Set the query
            .query({
                OrderBy: ["MCCategory", "Title"],
                Select: ["MCCategory", "MCPhoneNumber", "Title"],
                Top: 500
            })
            // Execute the request
            .execute((items) => {
                // Update the state
                this.setState({
                    contacts: items.results || [] as any
                });
            });
    }

    // Method to render the contacts
    private renderContacts = () => {
        let contacts = [];

        // Parse the contacts
        for (let i = 0; i < this.state.contacts.length; i++) {
            let contact = this.state.contacts[i];

            // See if this is a contact we are rendering
            if (contact.MCCategory == this.state.selectedTab) {
                // Add the contact
                contacts.push({
                    "Full Name": contact.Title,
                    "Phone Number": contact.MCPhoneNumber
                });
            }
        }

        // Return the contacts
        return (
            contacts.length == 0 ?
                <h3>No '{this.state.selectedTab}' contacts exist</h3>
                :
                <DetailsList className="contacts-list" items={contacts} />
        );
    }

    // Method to update the contacts
    private updateContacts = (link: PivotItem, ev: React.MouseEvent<HTMLElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Update the state
        this.setState({
            selectedTab: link.props.linkText
        });
    }
}