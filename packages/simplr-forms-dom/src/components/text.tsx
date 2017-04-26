import * as React from "react";
import { FieldProps, FieldValue } from "simplr-forms-core/contracts";

import { BaseDomField, BaseDomFieldState } from "../abstractions/base-dom-field";
import { FieldOnChangeCallback } from "../contracts/field";

/**
 * Override the differences between extended interfaces.
 *
 * @export
 * @interface Props
 * @extends {CoreContracts.FieldProps}
 * @extends {React.HTMLProps<HTMLInputElement>}
 */
export interface TextProps extends FieldProps, React.HTMLProps<HTMLInputElement> {
    name: string;
    onFocus?: React.EventHandler<React.FocusEvent<HTMLInputElement>>;
    onBlur?: React.EventHandler<React.FocusEvent<HTMLInputElement>>;
    onChange?: FieldOnChangeCallback<HTMLInputElement>;
    ref?: any;
}

export class Text extends BaseDomField<TextProps, BaseDomFieldState> {
    protected GetValueFromEvent(event: React.FormEvent<HTMLInputElement>): FieldValue {
        return event.currentTarget.value;
    }

    protected OnChangeHandler: React.FormEventHandler<HTMLInputElement> = (event) => {
        this.OnValueChange(this.GetValueFromEvent(event));

        const newValue = this.FormStore.GetField(this.FieldId).Value;

        if (this.props.onChange != null) {
            this.props.onChange(event, newValue, this.FieldId, this.FormId);
        }

        // TODO: FormProps.OnFieldChange
    }


    protected get RawInitialValue(): FieldValue {
        if (this.props != null && this.props.value != null) {
            return this.props.value;
        }
        return this.DefaultValue;
    }

    protected get DefaultValue(): FieldValue {
        if (this.props != null && this.props.defaultValue != null) {
            return this.props.defaultValue;
        }
        return "";
    }

    protected get IsDisabled() {
        let disabled: boolean | undefined;

        // TODO: FormProps.Disabled and FieldsGroupProps.Disabled

        if (this.props.disabled != null) {
            disabled = this.props.disabled;
        }

        return disabled;
    }

    renderField(): JSX.Element | null {
        return <input
            type="text"
            name={this.FieldId}
            value={this.Value}
            onChange={this.OnChangeHandler}
            disabled={this.IsDisabled}
        />;
    }
}
