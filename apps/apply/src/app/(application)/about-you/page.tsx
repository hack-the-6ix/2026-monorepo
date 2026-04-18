'use client';
import { Input } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import FormStep from '@/components/FormStep';
import { useApplicationContext } from '@/context/ApplicationContext';

export default function AboutYou() {
  const router = useRouter();

  const handlePrevSection = () => {
    router.push('/about-you/character-sheet');
  };
  const handleNextSection = () => {
    router.push('/experiences');
  };

  const { formData, updateFormData } = useApplicationContext();

  const updateField = (fieldName: string, value: string) => {
    updateFormData('aboutYou', {
      ...formData.aboutYou,
      [fieldName]: value,
    });
  };

  return (
    <FormStep
      handlePrevSection={handlePrevSection}
      handleNextSection={handleNextSection}
      current={1}
      total={2}
      label="About You"
      required={true}
    >
      <Input
        label="Test3"
        hideLabel={false}
        name="test3"
        id="test3"
        controlled={{
          value: formData.aboutYou.test3 || '',
          onValueChange: (val) => updateField('test3', val),
        }}
        input={{ placeholder: 'placeholder' }}
      />
    </FormStep>
  );
}
