'use client';

import {
  ComponentPropsWithRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';
import cn from 'classnames';

import { InputGroup, InputGroupProps } from '../InputGroup';
import { Typography } from '../Typography';

import './index.css';

export interface InputProps extends InputGroupProps<'div'> {
  input?: Omit<ComponentPropsWithRef<'input'>, 'required' | 'disabled'>;
  inputBoxClassName?: string; // so that glow can be used on rounded-full
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  controlled?: {
    onValueChange: (value: string) => void;
    value: string;
  };
}

export function Input({
  input,
  inputBoxClassName,
  leftAddon,
  rightAddon,
  controlled,
  ...props
}: InputProps) {
  const ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(props.ref, () => ref.current!);

  return (
    <InputGroup {...props} ref={ref}>
      <Typography
        className={cn(
          'input__box dark:text-white dark:font-normal',
          inputBoxClassName,
        )}
        textColor="text-indigo-700"
        textSize="paragraph-sm"
        textWeight="medium"
        as="div"
      >
        {leftAddon}
        <input
          {...input}
          className={cn('input__el', input?.className)}
          onChange={(e) => {
            controlled?.onValueChange?.(e.currentTarget.value);
            input?.onChange?.(e);
          }}
          aria-describedby={`${props.id}--${props.name}--status`}
          aria-invalid={props.info?.type === 'error'}
          value={controlled?.value ?? input?.value}
          required={props.required}
          disabled={props.disabled}
          id={`${props.id}--input`}
          name={props.name}
        />
        {rightAddon}
      </Typography>
    </InputGroup>
  );
}
