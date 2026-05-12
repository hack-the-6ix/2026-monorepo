'use client';

import {
  ComponentPropsWithRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import cn from 'classnames';

import { InputGroup, InputGroupProps } from '../InputGroup';
import { Typography } from '../Typography';

import './index.css';

export interface InputProps extends Omit<InputGroupProps<'div'>, 'ref'> {
  input?: Omit<ComponentPropsWithRef<'input'>, 'required' | 'disabled'>;
  controlled?: {
    onValueChange: (value: boolean) => void;
    value: boolean;
  };
  option: {
    label: string;
    value: string;
  };
}

export const Checkbox = forwardRef<HTMLDivElement, InputProps>(
  ({ input, controlled, option, ...props }, forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current!);

    return (
      <InputGroup {...props} ref={ref}>
        <Typography
          className={'checkbox__box dark:text-white dark:font-normal'}
          textColor={
            props.disabled ? 'text-neutral-400'
            : props.info?.type === 'error' ?
              'text-error-500'
            : 'text-indigo-700'
          }
          textSize="paragraph-sm"
          textWeight="medium"
          as="label"
        >
          <input
            {...input}
            type="checkbox"
            className={cn('checkbox__el', input?.className)}
            onChange={(e) => {
              controlled?.onValueChange?.(e.target.checked);
              input?.onChange?.(e);
            }}
            checked={controlled?.value ?? input?.defaultChecked}
            aria-describedby={`${props.id}--${props.name}--status`}
            aria-invalid={props.info?.type === 'error'}
            value={option.value}
            required={props.required}
            disabled={props.disabled}
            id={`${props.id}--input`}
            name={props.name}
          />
          <div
            className={cn(
              'checkbox__ui',
              (controlled?.value ?? input?.defaultChecked) &&
                'checkbox__ui--filled',
              props.disabled && 'checkbox__ui--disabled',
              props.info?.type === 'error' &&
                !props.disabled &&
                'checkbox__ui--error',
            )}
          >
            {(controlled?.value ?? input?.defaultChecked) && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span>{option.label}</span>
        </Typography>
      </InputGroup>
    );
  },
);
