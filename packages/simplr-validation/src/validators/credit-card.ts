import * as Validator from "validator";
import { FieldValue } from "simplr-forms/contracts";

import { BaseFieldValidator, BaseFieldValidatorProps } from "../abstractions/base-field-validator";
import { ValidationResult } from "../contracts";

export interface CreditCardValidatorProps extends BaseFieldValidatorProps {}

export class CreditCardValidator extends BaseFieldValidator<CreditCardValidatorProps> {
    Validate(value: FieldValue): ValidationResult {
        if (this.SkipValidation(value)) {
            return this.ValidSync();
        }

        if (!Validator.isCreditCard(value)) {
            return this.InvalidSync(this.props.error);
        }

        return this.ValidSync();
    }
}