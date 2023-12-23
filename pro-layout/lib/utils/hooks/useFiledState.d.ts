import { SetStateAction } from 'react';
export interface FiledState<Value, OnChangeOtherArgs extends any[]> {
    value?: Value;
    defaultValue?: Value;
    onChange?: (val: Value, ...args: OnChangeOtherArgs) => void;
}
declare type SetFiledState<Value, OnChangeOtherArgs extends any[]> = (val: SetStateAction<Value>, ...args: OnChangeOtherArgs) => void;
export declare function useFiledState<Value = unknown, OnChangeOtherArgs extends any[] = []>(options: FiledState<Value, OnChangeOtherArgs>, isCtrl?: boolean): [Value, SetFiledState<Value, OnChangeOtherArgs>];
export {};
