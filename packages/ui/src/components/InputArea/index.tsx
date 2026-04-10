'use client';

import {
  ComponentPropsWithRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';

import { InputGroup, InputGroupProps } from '../InputGroup';
import { Typography } from '../Typography';

import './index.css';

export interface InputProps extends InputGroupProps<'div'> {
  input?: Omit<ComponentPropsWithRef<'textarea'>, 'required' | 'disabled'>;
  controlled?: {
    onValueChange: (value: string) => void;
    value: string;
  };
  showCounter?: boolean;
  maxLength?: number;
}

export function InputArea({
  input,
  controlled,
  showCounter,
  maxLength = 500,
  ...props
}: InputProps) {
  const ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(props.ref, () => ref.current!);
  const [localValue, setLocalValue] = useState(
    input?.defaultValue?.toString() ?? '',
  );
  const currentValue = controlled ? controlled.value : localValue;
  const wordCount =
    currentValue.trim() === '' ? 0 : currentValue.trim().split(/\s+/).length;

  return (
    <InputGroup {...props} ref={ref}>
      <Typography
        className="input__area dark:text-white dark:font-normal"
        textColor="text-indigo-700"
        textSize="paragraph-sm"
        textWeight="medium"
        as="div"
      >
        <textarea
          {...input}
          maxLength={maxLength}
          className={cn('input__area__el', input?.className)}
          onChange={(e) => {
            const val = e.currentTarget.value;
            if (!controlled) {
              setLocalValue(val);
            }
            controlled?.onValueChange?.(val);
            input?.onChange?.(e);
          }}
          aria-describedby={`${props.id}--${props.name}--status`}
          aria-invalid={props.info?.type === 'error'}
          value={controlled?.value ?? localValue}
          required={props.required}
          disabled={props.disabled}
          id={`${props.id}--input`}
          name={props.name}
        />
      </Typography>
      {showCounter && maxLength && (
        <div className="flex justify-end w-full">
          <Typography
            textSize="label"
            textColor="text-neutral-500"
            className="dark:text-white font-light"
          >
            {wordCount} / {maxLength} words
          </Typography>
        </div>
      )}
    </InputGroup>
  );
}
