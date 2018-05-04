import * as React from "react";
import { DomFieldProps } from "../contracts/field";

import {
    BaseDomField,
    BaseDomFieldState
} from "../abstractions/base-dom-field";
import {
    FieldOnChangeCallback,
    HTMLElementProps
} from "../contracts/field";
import { FormProps } from "./form";

export type TextAreaOnChangeCallback = FieldOnChangeCallback<HTMLTextAreaElement>;

/**
 * Override the differences between extended interfaces.
 */
export interface TextAreaProps extends DomFieldProps, HTMLElementProps<HTMLTextAreaElement> {
    name: string;
    onFocus?: React.EventHandler<React.FocusEvent<HTMLTextAreaElement>>;
    onBlur?: React.EventHandler<React.FocusEvent<HTMLTextAreaElement>>;
    onChange?: TextAreaOnChangeCallback;

    defaultValue?: string;
    initialValue?: string;
    value?: string;
    ref?: React.Ref<TextArea>;
}

export class TextArea extends BaseDomField<TextAreaProps, BaseDomFieldState> {
    protected GetValueFromEvent(event: React.ChangeEvent<HTMLTextAreaElement>): string {
        return event.currentTarget.value;
    }

    protected OnChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
        let newValue: string | undefined;
        if (!this.IsControlled) {
            this.OnValueChange(this.GetValueFromEvent(event));
            newValue = this.FormStore.GetField(this.FieldId).Value;
        } else {
            newValue = this.GetValueFromEvent(event);
        }

        if (this.props.onChange != null) {
            event.persist();
            this.props.onChange(event, newValue, this.FieldId, this.FormStore);
        }

        const formStoreState = this.FormStore.GetState();
        const formProps = formStoreState.Form.Props as FormProps;
        if (formProps.onChange != null) {
            event.persist();
            formProps.onChange(event, newValue, this.FieldId, this.FormStore);
        }
    }

    protected GetRawDefaultValue(props: TextAreaProps): string {
        if (props.defaultValue != null) {
            return props.defaultValue;
        }
        return "";
    }

    public renderField(): JSX.Element {
        return <textarea
            ref={this.SetElementRef}
            {...this.GetHTMLProps(this.props) }
            name={this.FieldId}
            className={this.AddErrorClassName(this.props.className)}
            value={this.Value}
            onChange={this.OnChangeHandler}
            disabled={this.Disabled}
            onFocus={this.OnFocus}
            onBlur={this.OnBlur}
        />;
    }
}
