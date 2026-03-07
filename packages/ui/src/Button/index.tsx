import { ComponentPropsWithRef, ElementType } from 'react';
import cn from 'classnames';

import { PolymorphicProps, Typography } from '..';

import './index.css';

export const buttonTypes = ['primary', 'secondary', 'tertiary'] as const;
export type ButtonType = (typeof buttonTypes)[number];

export type ButtonProps<T extends ElementType> = PolymorphicProps<
  {
    destructive?: boolean;
    type?: ButtonType;
  },
  T
>;
export function Button<T extends ElementType = 'button'>({
  destructive,
  type = 'primary',
  as,
  ...props
}: ButtonProps<T>) {
  return (
    <Typography<T>
      {...(props as ComponentPropsWithRef<T>)}
      className={cn(
        'button',
        type,
        destructive && 'button--destructive',
        props.disabled && 'disabled',
        props.className,
      )}
      textSize="paragraph-sm"
      textWeight="semi-bold"
      as={as ?? 'button'}
    />
  );
}
