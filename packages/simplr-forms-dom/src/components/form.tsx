import * as React from "react";
import { BaseForm } from "simplr-forms";

import { FormProps } from "../contracts/form";

export class Form extends BaseForm<FormProps, {}> {
    public Element: HTMLFormElement;

    protected SetElementRef = (element: HTMLFormElement) => {
        this.Element = element;
        this.FormStore.SetFormSubmitCallback(() => {
            element.dispatchEvent(new Event("submit"));
        });
    }

    static defaultProps: FormProps = {
        ...BaseForm.defaultProps,
        preventSubmitDefaultAndPropagation: true
    };

    protected FormSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        if (this.props.preventSubmitDefaultAndPropagation) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (!this.ShouldFormSubmit()) {
            return;
        }

        this.FormStore.SetFieldsTouched();

        if (this.props.onSubmit == null) {
            return;
        }

        // Persist synthetic event, because it's passed into another method.
        event.persist();

        // Pass onSubmit result to FormStore for further processing.
        const result = this.props.onSubmit(event, this.FormStore);
        this.FormStore.SubmitForm(result);
    }

    render(): JSX.Element | null {
        return <form
            ref={this.SetElementRef}
            onSubmit={this.FormSubmitHandler}
        >
            {this.props.children}
        </form>;
    }
}
