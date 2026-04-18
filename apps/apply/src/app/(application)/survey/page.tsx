'use client';
import { Input } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import FormStep from '@/components/FormStep';
import { useApplicationContext } from '@/context/ApplicationContext';

export default function Survey() {
  const router = useRouter();

  const handlePrevSection = () => {
    router.push('/long-answer');
  };
  const handleNextSection = () => {
    router.push('/review');
  };

  const { formData, updateFormData } = useApplicationContext();

  const updateField = (fieldName: string, value: string) => {
    updateFormData('survey', {
      ...formData.survey,
      [fieldName]: value,
    });
  };

  return (
    <FormStep
      handlePrevSection={handlePrevSection}
      handleNextSection={handleNextSection}
      current={1}
      total={2}
      label="Survey"
    >
      <Input
        label="Test6"
        hideLabel={true}
        name="test6"
        id="test6"
        controlled={{
          value: formData.survey.test6 || '',
          onValueChange: (val) => updateField('test5', val),
        }}
        input={{ placeholder: 'placeholder' }}
      />
    </FormStep>
  );
}
