import { useState } from 'react';

import preview from '#/preview';
import { Typography } from '../Typography';
import { Modal as component, ModalProps } from '.';

const meta = preview.type<{ args: ModalProps<'dialog'> }>().meta({
  title: 'Modules/Modal',
  component,
  argTypes: {
    destructive: { control: 'boolean' },
    isOpen: { control: 'boolean' },
  },
});

export const Default = meta.story({
  render: (args) => {
    const Component = component;
    const [open, setOpen] = useState(args.isOpen);
    return (
      <Component {...args} isOpen={open} onClose={() => setOpen(false)}>
        <Typography
          textSize="paragraph-sm"
          textColor="text-white"
          className="text-center"
        >
          She wanted to tell him. She wanted to tell him what those bastards of
          Constellations did in this place, but…. <br /> “I know, Hui-Won-ssi.”
          <br />
          <span className="text-warning-400">
            [Demon King, ‘Demon King of Salvation’, has joined the great
            battlefield.]
          </span>
        </Typography>
      </Component>
    );
  },
  args: {
    label: 'ORV Ch398',
    actionButtonMessage: 'Delete',
    destructive: true,
    isOpen: true,
    backgroundColor:
      'bg-[linear-gradient(to_bottom,rgba(10,7,51,0.85),rgba(23,21,51,0.85))]',
  },
});

export default meta;
