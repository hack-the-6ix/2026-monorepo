import { BananaIcon } from 'lucide-react';

import preview from '#/preview';
import { Merge } from '../..';
import { Button as component, buttonKinds, ButtonProps } from '.';

type ButtonStoryArgs = Merge<
  ButtonProps<'button'>,
  {
    leftIcon: boolean;
    rightIcon: boolean;
  }
>;

const meta = preview
  .type<{ args: ButtonStoryArgs }>()
  .meta({ title: 'Modules/Buttons/Button', component });

export const Button = meta.story({
  argTypes: {
    kind: {
      control: 'select',
      options: buttonKinds,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
  render: (args) => {
    const Component = component;
    return (
      <Component
        {...args}
        iconLeft={args.leftIcon ? <BananaIcon size="inherit" /> : undefined}
        iconRight={args.rightIcon ? <BananaIcon size="inherit" /> : undefined}
      />
    );
  },
  args: {
    children: 'owo wats dis?',
    destructive: false,
    disabled: false,
    kind: 'primary',
    leftIcon: false,
    rightIcon: false,
  },
});

export default meta;
