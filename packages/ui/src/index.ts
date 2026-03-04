import { ComponentPropsWithRef, ElementType } from 'react';

export type Merge<A, B> = Omit<A, keyof B> & B;
export type PolymorphicProps<Props, T extends ElementType> = Merge<
  ComponentPropsWithRef<T>,
  Merge<Props, { as?: T }>
>;

export * from './Typography';
