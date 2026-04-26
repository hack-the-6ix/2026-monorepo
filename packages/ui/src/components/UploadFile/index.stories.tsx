import preview from '#/preview';
import { InputGroupStatus, inputGroupStatuses } from '../InputGroup';
import { FileUpload as component } from '.';

interface FileUploadStoryArgs {
  onFileSelect?: (file: File) => void;
  accept?: string;
  className?: string;
  infoType?: InputGroupStatus;
  infoText?: string;
  disabled?: boolean;
  value?: string;
}

const meta = preview.type<{ args: FileUploadStoryArgs }>().meta({
  title: 'Modules/Inputs/FileUpload',
  component,
});

export const FileUpload = meta.story({
  argTypes: {
    accept: { control: 'text' },
    className: { table: { disable: true } },
    onFileSelect: { table: { disable: true } },
    name: { table: { disable: true } },
    id: { table: { disable: true } },
    infoText: { control: 'text' },
    infoType: {
      control: 'select',
      options: inputGroupStatuses,
    },
  },
  render: ({ infoType, infoText, ...args }) => {
    const Component = component;
    return (
      <div className="w-100">
        <Component
          info={
            infoType || infoText ?
              { type: infoType, message: infoText }
            : undefined
          }
          {...args}
        />
      </div>
    );
  },
  args: {
    accept: '.pdf',
    label: 'labelll',
    hideLabel: true,
    required: false,
    disabled: false,
    name: 'nameeee',
    id: 'idddd',
  },
});

export default meta;
