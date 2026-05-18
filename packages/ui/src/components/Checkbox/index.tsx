'use client';

import { ComponentPropsWithRef } from 'react';
import cn from 'classnames';
import { Check } from 'lucide-react';

import { InputGroup, InputGroupProps } from '../InputGroup';
import { Typography } from '../Typography';

import './index.css';

export interface CheckboxProps extends Omit<InputGroupProps<'div'>, 'ref'> {
  input?: Omit<ComponentPropsWithRef<'input'>, 'required' | 'disabled'>;
  controlled?: {
    onValueChange: (value: boolean) => void;
    value: boolean;
  };
  option: {
    label: string;
    value: string;
  };
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}

export const Checkbox = ({
  ref,
  input,
  controlled,
  option,
  className,
  ...props
}: CheckboxProps) => {
  const isChecked =
    controlled?.value ?? input?.checked ?? input?.defaultChecked;

  return (
    <InputGroup {...props} ref={ref}>
      <Typography
        className={cn(
          'checkbox__box dark:text-white dark:font-normal',
          className,
        )}
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
          checked={isChecked}
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
            isChecked && 'checkbox__ui--filled',
            props.disabled && 'checkbox__ui--disabled',
            props.info?.type === 'error' &&
              !props.disabled &&
              'checkbox__ui--error',
          )}
        >
          {isChecked && (
            <Check size={12} strokeWidth={3} className="text-primary-100" />
          )}
        </div>
        <span>{option.label}</span>
      </Typography>
    </InputGroup>
  );
};
