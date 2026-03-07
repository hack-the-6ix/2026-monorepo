import preview from '#/preview';
import { Button, buttonTypes } from '.';

const meta = preview.meta({ component: Button });

export const Primary = meta.story({
  argTypes: {
    type: {
      control: 'select',
      options: buttonTypes,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
  args: {
    children: 'owo wats dis?',
    destructive: false,
    disabled: false,
    type: 'primary',
  },
});

export default meta;
