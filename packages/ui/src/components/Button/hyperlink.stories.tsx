import preview from '#/preview';
import { buttonKinds, HyperLink as component } from '.';

const meta = preview.meta({ title: 'Modules/Buttons/Hyperlink', component });

export const Hyperlink = meta.story({
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
  args: {
    children: 'owo wats dis?',
    disabled: false,
    href: '#',
  },
});

export default meta;
