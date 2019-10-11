import { Dictionary, JsonValue, NestedDictionary } from "./helpers";

export interface FieldData<TValue = unknown, TRenderValue = unknown> {
    currentValue: TValue;
    initialValue: TValue;
    defaultValue: TValue;
    transientValue?: TRenderValue;
}

export interface FormStatus {
    focused: boolean;
    touched: boolean;
    pristine: boolean;
    disabled: boolean;
    readonly: boolean;
}

// TODO: THydrationValue example with DraftJS: TValue = DraftJsState, THydrationValue = object.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FieldState<TData extends object = FieldData<unknown, unknown>, THydrationValue extends JsonValue = JsonValue> {
    id: string;
    name: string;

    dehydrate: (state: this) => THydrationValue;
    hydrate: (value: THydrationValue) => FieldState<TData>;

    status: FormStatus;
    data: TData;

    fields: Dictionary<FieldState>;
}

export interface FormStoreData {
    submitCallback?: () => void;
    dehydratedState: NestedDictionary<unknown>;
}

export interface FormState<TData extends object = FormStoreData> extends FieldState<TData> {}
