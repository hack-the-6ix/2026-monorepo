import { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import cn from 'classnames';

import { PolymorphicProps } from '../..';
import { Typography } from '../Typography';

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
  iconLeft,
  iconRight,
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
      {iconLeft && <span className="button__icon">{iconLeft}</span>}
      <span>{props.icon ?? props.children}</span>
      {iconRight && (
        <span className="button__icon">{iconRight}</span>
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
  icon,
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
      <span className="button__icon">{icon}</span>
    </Typography>
  );
}

export type HyperLinkProps<T extends ElementType> = PolymorphicProps<
  Omit<SharedButtonProps<{ href: string }>, 'destructive'>,
  T
>;
export function HyperLink<T extends ElementType = 'a'>({
  kind = 'tertiary',
  as,
  ...props
}: HyperLinkProps<T>) {
  return (
    <Typography<T>
      {...(props as ComponentPropsWithRef<T>)}
      className={cn(
        props.disabled && 'button--disabled',
        buttonKindMap[kind],
        'button button--link',
        props.className,
      )}
      textSize="paragraph-sm"
      textWeight="semi-bold"
      as={as ?? 'a'}
    />
  );
}
