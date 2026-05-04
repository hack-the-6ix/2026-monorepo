import { useEffect, useState } from 'react';

import preview from '#/preview';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { Modal as component, ModalProps } from '.';

const meta = preview.type<{ args: ModalProps<'dialog'> }>().meta({
  title: 'Modules/Modal',
  component,
  argTypes: {
    isOpen: { control: 'boolean' },
  },
});

export const Default = meta.story({
  render: (args) => {
    const Component = component;

    const [open, setOpen] = useState(args.isOpen);
    useEffect(() => {
      setOpen(args.isOpen);
    }, [args.isOpen]);

    const Actions = (
      <div className="flex flex-col gap-2 md:flex-row md:gap-4 w-full">
        <Button
          kind="secondary"
          destructive={true}
          onClick={() => setOpen(false)}
          className="w-full"
        >
          Cancel
        </Button>
        <Button
          kind="primary"
          destructive={true}
          onClick={() => console.log('Deleted')}
          className="w-full"
        >
          Delete
        </Button>
      </div>
    );

    return (
      <Component
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        actions={Actions}
      >
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
    isOpen: true,
    backgroundColor:
      'bg-[linear-gradient(to_bottom,rgba(10,7,51,0.85),rgba(23,21,51,0.85))]',
  },
});

export default meta;
