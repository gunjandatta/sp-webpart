import * as React from "react";
import { Web } from "gd-sprest";
import { WebPartCfgPanel, IWebPartCfg, IWebPartCfgProps, IWebPartCfgState } from "gd-sprest-react";
import { Dropdown, IDropdownOption, PrimaryButton, Spinner } from "office-ui-fabric-react";

/**
 * Demo WebPart Configuration
 */
export interface IDemoWebPartCfg extends IWebPartCfg {
    ListName: string;
}

/**
 * Properties
 */
interface Props extends IWebPartCfgProps {
    cfg: IDemoWebPartCfg;
}

/**
 * State
 */
interface State extends IWebPartCfgState {
    cfg: IDemoWebPartCfg;
    lists: Array<IDropdownOption>;
}

/**
 * WebPart Configuration
 */
export class WebPartCfg extends WebPartCfgPanel<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = {
            cfg: this.state.cfg,
            lists: null
        };

        // Load the lists
        this.load();
    }

    // Method to render the component
    onRenderContents = (cfg: IDemoWebPartCfg) => {
        // See if the lists have been loaded
        if (this.state.lists) {
            return (
                <div>
                    <Dropdown
                        label="List:"
                        onChanged={this.updateListName}
                        options={this.state.lists}
                        selectedKey={cfg ? cfg.ListName : ""}
                    />
                    <PrimaryButton text="Save" onMenuClick={this.save} />
                </div>
            );
        }

        // Return a loading image
        return (
            <Spinner label="Loading the lists..." />
        );
    }

    /**
     * Methods
     */

    // Method to load the lists from the current web
    private load = () => {
        // Get the current web
        (new Web())
            // Get the lists
            .Lists()
            // Execute the request
            .execute((lists) => {
                let options: Array<IDropdownOption> = [];

                // Parse the lists
                for (let i = 0; i < lists.results.length; i++) {
                    let list = lists.results[i];

                    // Add the option
                    options.push({
                        key: list.Title,
                        text: list.Title
                    });
                }

                // Update the state
                this.setState({
                    lists: options
                });
            });
    }

    // Method to save the configuration
    private save = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Save the webpart configuration
        this.saveConfiguration(this.state.cfg);
    };

    // Method to update the list name
    private updateListName = (option?: IDropdownOption) => {
        // Update the configuration
        let cfg = this.state.cfg;
        cfg.ListName = option.text;

        // Update the state
        this.setState({ cfg });
    }
}