import { ComponentPropsWithRef, ElementType } from 'react';
import cn from 'classnames';
import { PolymorphicProps, Typography } from '..';
import './index.css';

export type ButtonProps<T extends ElementType> = PolymorphicProps<
  {
    destructive?: boolean;
  },
  T
>;
export function Button<T extends ElementType = 'button'>({
  destructive,
  as,
  ...props
}: ButtonProps<T>) {
  return (
    <Typography<T>
      {...(props as ComponentPropsWithRef<T>)}
      className={cn('button', destructive && 'button--destructive', props.className)}
      textSize="paragraph-sm"
      textWeight="semi-bold"
      as={as ?? 'button'}
    />
  );
}
