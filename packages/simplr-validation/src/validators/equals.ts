import * as Validator from "validator";
import { FieldValue } from "simplr-forms-core/contracts";

import { BaseValidator, ValidatorProps } from "../abstractions/base-validator";
import { ValidationResult } from "../contracts";

export interface EqualsValidatorProps extends ValidatorProps {
    value: string;
}

export class EqualsValidator extends BaseValidator<EqualsValidatorProps> {
    Validate(value: FieldValue): ValidationResult {
        if (this.SkipValidation(value)) {
            return this.ValidSync();
        }

        if (!Validator.equals(value, this.props.value)) {
            return this.InvalidSync(this.props.error);
        }

        return this.ValidSync();
    }
}
