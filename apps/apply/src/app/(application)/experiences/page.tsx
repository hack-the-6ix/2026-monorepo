'use client';
import { Input } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import FormStep from '@/components/FormStep';
import { useApplicationContext } from '@/context/ApplicationContext';

export default function Experiences() {
  const router = useRouter();

  const handlePrevSection = () => {
    router.push('/about-you');
  };
  const handleNextSection = () => {
    router.push('/long-answer');
  };

  const { formData, updateFormData } = useApplicationContext();

  const updateField = (fieldName: string, value: string) => {
    updateFormData('experiences', {
      ...formData.experiences,
      [fieldName]: value,
    });
  };

  return (
    <FormStep
      handlePrevSection={handlePrevSection}
      handleNextSection={handleNextSection}
      current={1}
      total={2}
      label="Your Experience"
      required={true}
    >
      <Input
        label="Test4"
        hideLabel={true}
        name="test4"
        id="test4"
        controlled={{
          value: formData.experiences.test4 || '',
          onValueChange: (val) => updateField('test4', val),
        }}
        input={{ placeholder: 'placeholder' }}
      />
    </FormStep>
  );
}
