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

export interface InputAreaProps extends InputGroupProps<'div'> {
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
}: InputAreaProps) {
  const ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(props.ref, () => ref.current!);
  const [localValue, setLocalValue] = useState(
    input?.defaultValue?.toString() ?? '',
  );

  const currentValue = (
    controlled?.value ??
    input?.value ??
    localValue
  ).toString();

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
          className={cn('input__area__el', input?.className)}
          onChange={(e) => {
            const val = e.currentTarget.value;
            const newWordCount =
              val.trim() === '' ? 0 : val.trim().split(/\s+/).length;

            if (newWordCount <= maxLength || val.length < currentValue.length) {
              if (
                controlled?.value === undefined &&
                input?.value === undefined
              ) {
                setLocalValue(val);
              }
              controlled?.onValueChange?.(val);
              input?.onChange?.(e);
            }
          }}
          aria-describedby={`${props.id}--${props.name}--status`}
          aria-invalid={props.info?.type === 'error'}
          value={currentValue}
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
            textColor={
              wordCount >= maxLength ? 'text-error-500' : 'text-neutral-500'
            }
            className={`font-light ${wordCount >= maxLength ? 'dark:text-error-500' : 'dark:text-white'}`}
          >
            {wordCount} / {maxLength} words
          </Typography>
        </div>
      )}
    </InputGroup>
  );
}
