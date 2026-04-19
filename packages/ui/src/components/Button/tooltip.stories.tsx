import { CircleCheck, Info } from 'lucide-react';

import preview from '#/preview';
import { Merge } from '../..';
import { IconButtonProps, TooltipButton as component } from '.';

const iconMap = {
  Info: <Info />,
  InfoFilled: <Info className="fill-warning-400 stroke-indigo-800" />,
  Checkmark: <CircleCheck />,
};

type TooltipStoryArgs = Merge<
  IconButtonProps<'button'>,
  {
    iconName: keyof typeof iconMap;
  }
>;

const meta = preview
  .type<{ args: TooltipStoryArgs }>()
  .meta({ title: 'Modules/Buttons/Tooltip', component });

export const TooltipButton = meta.story({
  argTypes: {
    kind: { table: { disable: true } },
    disabled: { control: 'boolean' },
    bgColor: { control: 'color' },
    textColor: { control: 'color' },
    iconName: {
      control: 'select',
      options: Object.keys(iconMap),
    },
  },
  render: ({ iconName, ...args }) => {
    const Component = component;
    return (
      <div className="flex items-center gap-2 px-10 pt-5">
        <Component {...args} icon={iconMap[iconName]} />
      </div>
    );
  },
  args: {
    disabled: false,
    description:
      'Tooltip description and more. whats gna happen to us mommy im scared - random kid',
    bgColor: '#F9FAFB',
    textColor: '#333559',
    iconName: 'Info',
  },
});

export default meta;
