import { CircleCheck, Info } from 'lucide-react';

import preview from '#/preview';
import { Tooltip as component, Tooltip, TooltipProps } from '.';

const iconMap = {
  Info: <Info />,
  InfoFilled: <Info className="fill-warning-400 stroke-indigo-800" />,
  Checkmark: <CircleCheck />,
};

const meta = preview
  .type<{ args: TooltipProps<'div'> & { iconName: keyof typeof iconMap } }>()
  .meta({
    title: 'Modules/Tooltip',
    component,
    argTypes: {
      bgColor: { control: 'color' },
      textColor: { control: 'color' },
      iconName: {
        control: 'select',
        options: Object.keys(iconMap),
      },
    },
  });

export const TooltipButton = meta.story({
  render: ({ iconName, ...args }) => {
    return <Tooltip {...args} icon={iconMap[iconName]} />;
  },
  args: {
    description:
      'Tooltip description and more. whats gna happen to us mommy im scared - random kid',
    bgColor: '#F9FAFB',
    textColor: '#333559',
    iconName: 'Info',
  },
});
