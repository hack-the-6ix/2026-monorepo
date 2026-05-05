'use client';
import type { ReactNode } from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from 'react';
import z from 'zod';

export const FormDataSchema = z.object({
  characterSheet: z.object({
    test1: z.string(),
    test2: z.string().optional(),
  }),
  aboutYou: z.object({
    test3: z.string().optional(),
  }),
  experiences: z.object({
    test4: z.string(),
  }),
  longAnswer: z.object({
    test5: z.string(),
  }),
  survey: z.object({
    test6: z.string(),
  }),
});

export type FormData = z.infer<typeof FormDataSchema>;

interface ApplicationContextType {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: unknown) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined,
);

export const ApplicationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [formData, setFormData] = useState<FormData>({
    characterSheet: {
      test1: '',
      test2: '',
    },
    aboutYou: {
      test3: '',
    },
    experiences: {
      test4: '',
    },
    longAnswer: {
      test5: '',
    },
    survey: {
      test6: '',
    },
  });

  const updateFormData = (section: keyof FormData, data: unknown) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  const loadSavedData = useEffectEvent((savedData: string) => {
    try {
      setFormData(JSON.parse(savedData));
    } catch (e) {
      console.error('Failed to parse saved form data', e);
    }
  });

  useEffect(() => {
    const savedData = localStorage.getItem('application_data');
    if (savedData) {
      loadSavedData(savedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('application_data', JSON.stringify(formData));
  }, [formData]);

  return (
    <ApplicationContext.Provider
      value={{
        formData,
        updateFormData,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      'useApplicationContext must be used within an ApplicationContextProvider',
    );
  }
  return context;
};
