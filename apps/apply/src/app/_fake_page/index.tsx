import { Button, Input } from '@hackthe6ix/ui';

export default function StepOne() {
  return (
    <div className="w-full p-8 mt-40 ml-40 rounded-2xl backdrop-blur-sm shadow-sm">
      <form className="space-y-4">
        <Input
          label=""
          hideLabel={true}
          name="username"
          id="username"
          input={{
            placeholder: 'Username',
          }}
        ></Input>
        <Button className="px-4 py-2 rounded">Next</Button>
      </form>
    </div>
  );
}
