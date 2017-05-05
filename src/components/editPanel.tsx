import * as React from "react";
import {Helper, IWebPartInfo} from "./helper";
import {
    Panel,
    PrimaryButton,
    TextField
} from "office-ui-fabric-react";

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
    visible: boolean;
}

/**
 * Edit Panel
 */
export class EditPanel extends React.Component<Props, State> {
    // Constructor
    constructor() {
        super();

        // Set the state
        this.state = {
            visible: false
        };
    }

    // Method to render the component
    render() {
        return (
            <div>
                <PrimaryButton text="Edit Configuration" onClick={this.updatePanel} />
                <Panel
                    headerText="WebPart Configuration"
                    isLightDismiss={true}
                    isOpen={this.state.visible}
                    onDismiss={this.updatePanel}>
                    <TextField id="tbListName" label="List Name" value={this.props.listName} />
                    <PrimaryButton text="Save" onClick={this.saveConfiguration} />
                </Panel>
            </div>
        );
    }

    // Method to save the configuration
    private saveConfiguration = () => {
        // Get the target webpart
        Helper.getWebPart("dev_myContactsCfg").then((wpInfo:IWebPartInfo) => {
            // Ensure it exists
            if(wpInfo) {
                // Get the content property
                let content:HTMLDivElement = document.createElement("div");
                content.innerHTML = wpInfo.Properties.get_item("Content");

                // Get the list name
                let listName = (document.querySelector("#tbListName") as HTMLInputElement).value;                

                // Get the configuration
                let cfg:HTMLDivElement = content.querySelector("#dev_myContactsCfg") as HTMLDivElement;
                cfg.innerText = JSON.stringify({
                    ListName: listName
                });

                // Update the webpart
                wpInfo.Properties.set_item("Content", content.innerHTML);
                wpInfo.WebPartDefinition.saveWebPartChanges();
                wpInfo.Context.load(wpInfo.WebPartDefinition);

                // Execute the request
                wpInfo.Context.executeQueryAsync(() => {
                    // Refresh the page
                    document.location.href = document.location.href;
                });
            } else {
                // Log
                console.log("Error - The target webpart was not found.");
            }
        });
    };

    // Method to update the panel
    private updatePanel = (ev?:React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev ? ev.preventDefault() : null;

        // Update the visibility of the panel
        this.setState({
            visible: this.state.visible ? false : true
        });
    }
}