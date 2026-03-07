import { ElementType } from 'react';
import cn from 'classnames';

import type { PolymorphicProps } from '../index';

import './index.css';

export const textSizes = {
  display: 'typography-5xl',
  'heading-lg': 'typography-4xl',
  'heading-sm': 'typography-3xl',
  'subtitle-lg': 'typography-2xl',
  'subtitle-sm': 'typography-xl',
  'paragraph-lg': 'typography-lg',
  'paragraph-sm': 'typography-sm',
  label: 'typography-xs',
} as const;
export type TextSize = keyof typeof textSizes;

export const textWeights = {
  regular: 'font-normal',
  medium: 'font-medium',
  'semi-bold': 'font-semibold',
  bold: 'font-bold',
  'extra-bold': 'font-extrabold',
} as const;
export type TextWeight = keyof typeof textWeights;

export type TypographyProps<T extends ElementType> = PolymorphicProps<
  {
    textSize?: TextSize;
    textWeight?: TextWeight;
  },
  T
>;

export function Typography<T extends ElementType = 'span'>({
  textSize = 'paragraph-sm',
  textWeight,
  className,
  as,
  ...props
}: TypographyProps<T>) {
  const Component = as || 'span';

  return (
    <Component
      {...props}
      className={cn(
        'typography',
        textWeight && textWeights[textWeight],
        textSizes[textSize],
        className,
      )}
    />
  );
}
