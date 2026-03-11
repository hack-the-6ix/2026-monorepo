import preview from '#/preview';
import '#/index.css';

import { textSizes, textWeights, Typography as component } from '.';

const meta = preview.meta({
  title: 'Atoms/Typography',
  component,
});

export const Typography = meta.story({
  argTypes: {
    textSize: {
      control: 'select',
      options: Object.keys(textSizes),
    },
    textWeight: {
      control: 'select',
      options: Object.keys(textWeights),
    },
  },
  args: {
    textColor: 'text-neutral-900',
    textSize: 'paragraph-sm',
    children: 'owo wats dis?',
  },
});

export default meta;
