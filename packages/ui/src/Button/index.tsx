import { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import cn from 'classnames';

import { PolymorphicProps, Typography } from '..';

import './index.css';

export const buttonKinds = ['primary', 'secondary', 'tertiary'] as const;
const buttonKindMap: Record<ButtonKind, string> = {
  primary: 'button--primary',
  secondary: 'button--secondary',
  tertiary: 'button--tertiary',
};
export type ButtonKind = (typeof buttonKinds)[number];

type SharedButtonProps<T> = {
  destructive?: boolean;
  kind?: ButtonKind;
} & T;

export type ButtonProps<T extends ElementType> = PolymorphicProps<
  SharedButtonProps<{ iconLeft?: ReactNode; iconRight?: ReactNode }>,
  T
>;
export function Button<T extends ElementType = 'button'>({
  destructive,
  kind = 'primary',
  as,
  ...props
}: ButtonProps<T>) {
  return (
    <Typography<T>
      {...(props as ComponentPropsWithRef<T>)}
      className={cn(
        props.disabled && 'button--disabled',
        destructive && 'button--destructive',
        buttonKindMap[kind],
        'button button--default',
        props.className,
      )}
      textSize="paragraph-sm"
      textWeight="semi-bold"
      as={as ?? 'button'}
    >
      {props.iconLeft && <span className="button__icon">{props.iconLeft}</span>}
      <span>{props.icon ?? props.children}</span>
      {props.iconRight && (
        <span className="button__icon">{props.iconRight}</span>
      )}
    </Typography>
  );
}

export type IconButtonProps<T extends ElementType> = PolymorphicProps<
  SharedButtonProps<{ icon: ReactNode; children: never }>,
  T
>;
export function IconButton<T extends ElementType = 'button'>({
  destructive,
  kind = 'primary',
  as,
  ...props
}: IconButtonProps<T>) {
  return (
    <Typography<T>
      {...(props as ComponentPropsWithRef<T>)}
      className={cn(
        props.disabled && 'button--disabled',
        destructive && 'button--destructive',
        buttonKindMap[kind],
        'button button--icon',
        props.className,
      )}
      textSize="paragraph-sm"
      textWeight="semi-bold"
      as={as ?? 'button'}
    >
      <span className="button__icon">{props.icon}</span>
    </Typography>
  );
}
