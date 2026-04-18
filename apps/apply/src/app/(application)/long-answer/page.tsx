'use client';
import { Input } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import FormStep from '@/components/FormStep';
import { useApplicationContext } from '@/context/ApplicationContext';

export default function LongAnswer() {
  const router = useRouter();

  const handlePrevSection = () => {
    router.push('/experiences');
  };
  const handleNextSection = () => {
    router.push('/survey');
  };

  const { formData, updateFormData } = useApplicationContext();

  const updateField = (fieldName: string, value: string) => {
    updateFormData('longAnswer', {
      ...formData.longAnswer,
      [fieldName]: value,
    });
  };

  return (
    <FormStep
      handlePrevSection={handlePrevSection}
      handleNextSection={handleNextSection}
      current={1}
      total={2}
      label="Long Answer"
    >
      <Input
        label="Test5"
        hideLabel={true}
        name="test5"
        id="test5"
        controlled={{
          value: formData.longAnswer.test5 || '',
          onValueChange: (val) => updateField('test5', val),
        }}
        input={{ placeholder: 'placeholder' }}
      />
    </FormStep>
  );
}
