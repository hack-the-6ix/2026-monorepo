import preview from '#/preview';
import { textSizes, textWeights, Typography } from '.';

const meta = preview.meta({ component: Typography });

export const Default = meta.story({
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
    textSize: 'paragraph-sm',
    children: 'owo wats dis?',
  },
});

export default meta;
