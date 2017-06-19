import * as React from "react";

import {
    BaseFormButton,
    BaseFormButtonProps,
    BaseFormButtonStateRecord
} from "../abstractions/base-form-button";

export interface ResetProps extends BaseFormButtonProps {
    fieldIds?: string[];
}

export class Reset extends BaseFormButton<ResetProps, BaseFormButtonStateRecord> {
    protected OnButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event): void => {
        this.FormStore.ResetFields(this.props.fieldIds);

        if (this.props.onClick != null) {
            event.persist();
            this.props.onClick(event);
        }
    }

    public render(): JSX.Element {
        // TODO: Pass all other props.
        return <button
            type="button"
            className={this.ClassName}
            style={this.InlineStyles}
            disabled={this.Disabled}
            onClick={this.OnButtonClick}
        >
            {this.props.children}
        </button>;
    }
}