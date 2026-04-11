import { ComponentPropsWithRef, useId } from 'react';

import { Merge } from '../..';
import { InputGroup, InputLikeProps } from '../InputGroup';

export interface TextInputProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'value'
> {
  inputGroup: Merge<InputLikeProps, ComponentPropsWithRef<'div'>>;
  controlled?: {
    onInput: (value: string) => void;
    value: string;
  };
}

export function TextInput({
  inputGroup,
  controlled,
  ...props
}: TextInputProps) {
  const defaultName = useId();

  return (
    <InputGroup {...inputGroup} name={props.name ?? defaultName}>
      <input
        {...props}
        onChange={(event) => {
          controlled?.onInput(event.currentTarget.value);
          props.onChange?.(event);
        }}
        value={controlled?.value}
      />
    </InputGroup>
  );
}
