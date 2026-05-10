'use client';
import { Input } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import FormStep from '@/components/FormStep';
import { useApplicationContext } from '@/context/ApplicationContext';

export default function CharacterSheet() {
  const router = useRouter();

  const handleNextSection = () => {
    router.push('/about-you');
  };

  const { formData, updateFormData } = useApplicationContext();

  const updateField = (fieldName: string, value: string) => {
    updateFormData('characterSheet', {
      ...formData.characterSheet,
      [fieldName]: value,
    });
  };

  return (
    <FormStep
      handleNextSection={handleNextSection}
      current={1}
      total={2}
      label="Character Sheet"
    >
      <Input
        label="Test1"
        hideLabel={false}
        name="test1"
        id="test1"
        controlled={{
          value: formData.characterSheet.test1 || '',
          onValueChange: (val) => updateField('test1', val),
        }}
        input={{ placeholder: 'placeholder' }}
      />
      <Input
        label="Test2"
        hideLabel={false}
        name="test2"
        id="test2"
        controlled={{
          value: formData.characterSheet.test2 || '',
          onValueChange: (val) => updateField('test2', val),
        }}
        input={{ placeholder: 'placeholder' }}
      />
    </FormStep>
  );
}
