import preview from '#/preview';
import { Button } from '.';

const meta = preview.meta({ component: Button });

export const Primary = meta.story({
  args: {
    children: 'owo wats dis?',
  },
});

export default meta;
