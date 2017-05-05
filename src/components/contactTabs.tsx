import * as React from "react";
import {DataSource, IMyContact} from "../data/ds";
import {
    DetailsList,
    Pivot, PivotItem
} from "office-ui-fabric-react";
import "../sass/grid.scss";

/**
 * Properties
 */
interface Props {
    listName: string;
}

/**
 * State
 */
interface State {
    contacts: Array<IMyContact>;
    selectedTab: string;
}

/**
 * Contact Tabs
 */
export class ContactTabs extends React.Component<Props, State> {
    // Constructor
    constructor(props:Props) {
        super(props);

        // Set the state
        this.state = {
            contacts: [],
            selectedTab: "Business"
        };

        // Load the data
        DataSource.loadData(props.listName).then((contacts:Array<IMyContact>) => {
            // Update the state
            this.setState({
                contacts: contacts
            })
        });
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

    // Method to render the contacts
    private renderContacts = () => {
        let contacts = [];

        // Parse the contacts
        for(let i=0; i<this.state.contacts.length; i++) {
            let contact = this.state.contacts[i];

            // See if this is a contact we are rendering
            if(contact.MCCategory == this.state.selectedTab) {
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
    private updateContacts = (link:PivotItem, ev:React.MouseEvent<HTMLElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Update the state
        this.setState({
            selectedTab: link.props.linkText
        });
    }
}