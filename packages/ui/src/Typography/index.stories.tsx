import preview from '#/preview';
 
import { Typography } from '.';
 
const meta = preview.meta({ component: Typography });
 
export const Primary = meta.story({
  args: {
    children: 'owo wats dis?'
  }
});

export default meta;