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
    description?: ReactNode;
    hideLabel?: boolean;
    required?: boolean;
    disabled?: boolean;
    status?: {
      type: InputGroupStatus;
      message?: ReactNode;
    };
    name: string;
  },
  T
>;
export function InputGroup<T extends ElementType = 'div'>({
  label,
  description,
  hideLabel,
  required,
  disabled,
  status,
  name,
  ...props
}: InputGroupProps<T>) {
  const id = useId();

  return (
    <div
      {...props}
      className={cn(
        'input-group',
        status?.type && statusToModifier[status.type],
        disabled && 'input-group--disabled',
        props.className,
      )}
    >
      <Typography
        className="input-group__text"
        textColor="text-indigo-700"
        textSize="paragraph-sm"
        textWeight="semi-bold"
        hidden={hideLabel}
        htmlFor={name}
        as="label"
      >
        {label}
        {required && <span className="text-error-500">*</span>}
      </Typography>
      {props.children}
      {description && (
        <Typography
          id={`${id}--${name}--description`}
          className="input-group__text"
          textColor="text-indigo-700"
          textSize="label"
          textWeight="semi-bold"
          as="p"
        >
          {description}
        </Typography>
      )}
      {status?.message && (
        <Typography
          id={`${id}--${name}--status`}
          textColor="text-(--input-group-status)"
          textWeight="semi-bold"
          textSize="label"
          as="p"
        >
          {status.message}
        </Typography>
      )}
    </div>
  );
}
