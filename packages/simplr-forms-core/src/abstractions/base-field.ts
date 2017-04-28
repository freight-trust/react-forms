import {
    FieldValue,
    FieldProps
} from "../contracts/field";
import { CoreField, CoreFieldState } from "./core-field";

export interface BaseFieldState extends CoreFieldState {

}

export abstract class BaseField<TProps extends FieldProps, TState extends BaseFieldState> extends CoreField<TProps, TState> {
    protected abstract get RawDefaultValue(): FieldValue;

    protected get RawInitialValue(): FieldValue {
        return this.props.initialValue;
    }

    protected get RawValue(): FieldValue {
        return this.props.value;
    }
}
