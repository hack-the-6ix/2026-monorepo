import { ElementType, ReactNode, useId } from 'react';
import cn from 'classnames';

import { PolymorphicProps, Typography } from '..';

import './index.css';

export const inputGroupStatuses = ['error', 'warning', 'success'] as const;
export type InputGroupStatus = (typeof inputGroupStatuses)[number];
const statusToModifier: Record<InputGroupStatus, string> = {
  error: 'input-group--error',
  warning: 'input-group--warning',
  success: 'input-group--success',
};

export type InputGroupProps<T extends ElementType> = PolymorphicProps<
  {
    label: ReactNode;
    hideLabel?: boolean;
    required?: boolean;
    disabled?: boolean;
    info?: {
      type: InputGroupStatus;
      message?: ReactNode;
    };
    name: string;
  },
  T
>;
export function InputGroup<T extends ElementType = 'div'>({
  label,
  info,
  hideLabel,
  required,
  disabled,
  name,
  ...props
}: InputGroupProps<T>) {
  const id = useId();

  return (
    <div
      {...props}
      className={cn(
        'input-group',
        info?.type && statusToModifier[info.type],
        disabled && 'input-group--disabled',
        props.className,
      )}
    >
      <Typography
        className="input-group__text"
        textColor={disabled ? 'text-neutral-400' : 'text-indigo-700'}
        textSize="paragraph-sm"
        textWeight="semi-bold"
        hidden={hideLabel}
        htmlFor={name}
        as="label"
      >
        {label}
        {required && (
          <span className={cn(!disabled && 'text-error-500')}>*</span>
        )}
      </Typography>
      {props.children}
      {info?.message && (
        <Typography
          id={`${id}--${name}--status`}
          className="input-group__text"
          textColor="text-(--input-group-status)"
          textWeight="semi-bold"
          textSize="label"
          as="p"
        >
          {info.message}
        </Typography>
      )}
    </div>
  );
}
