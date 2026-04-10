import preview from '#/preview';
import { InputGroupStatus, inputGroupStatuses } from '../InputGroup';
import { FileUpload as component } from '.';

interface FileUploadStoryArgs {
  status?: InputGroupStatus;
  disabled?: boolean;
  accept?: string;
  className?: string;
}

const meta = preview.type<{ args: FileUploadStoryArgs }>().meta({
  title: 'Modules/Inputs/FileUpload',
  component,
});

export const FileUpload = meta.story({
  argTypes: {
    status: {
      control: 'select',
      options: [undefined, ...inputGroupStatuses],
    },
    accept: { control: 'text' },
    className: { table: { disable: true } },
    onFileSelect: { table: { disable: true } },
  },
  render: ({ status, ...args }) => {
    const Component = component;
    return (
      <div className="w-100">
        <Component {...args} status={status} />
      </div>
    );
  },
  args: {
    accept: '.pdf',
    disabled: false,
    status: undefined,
  },
});

export default meta;
