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
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.number(),
    age: z.number(),
    email: z.email(),
    emailPermission: z.boolean().optional(),
    city: z.string(),
    province: z.string().optional(),
    country: z.string(),
    gender: z.string().optional(),
    ethnicity: z.string().optional(),
  }),
  experiences: z.object({
    test4: z.string(),
  }),
  longAnswer: z.object({
    longEssay: z
      .string()
      .min(1)
      .refine((val) => val.trim().split(/\s+/).length <= 200),
    shortEssay: z
      .string()
      .min(1)
      .refine((val) => val.trim().split(/\s+/).length <= 50),
    oneSentenceEssay: z
      .string()
      .min(1)
      .refine((val) => val.trim().split(/\s+/).length <= 20),
  }),
  survey: z.object({
    hackathonsAttended: z.string().min(1),
    hackathonsAttendedList: z.string().optional(),
    hackathonCapacity: z.array(z.string()).optional(),
    previousHT6Experience: z.array(z.string()).optional(),
    howDidYouHearAboutHT6: z.array(z.string()).optional(),
    howDidYouHearAnotherHackathon: z.string().optional(),
    howDidYouHearOther: z.string().optional(),
    mlhCodeOfConduct: z.boolean(),
    mlhDataPermission: z.boolean(),
    mlhEmailPermission: z.boolean().optional(),
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
      firstName: '',
      lastName: '',
      phoneNumber: 0,
      age: 0,
      email: '',
      emailPermission: false,
      city: '',
      province: '',
      country: '',
      gender: '',
      ethnicity: '',
    },
    experiences: {
      test4: '',
    },
    longAnswer: {
      longEssay: '',
      shortEssay: '',
      oneSentenceEssay: '',
    },
    survey: {
      hackathonsAttended: '',
      hackathonsAttendedList: '',
      hackathonCapacity: [],
      previousHT6Experience: [],
      howDidYouHearAboutHT6: [],
      howDidYouHearAnotherHackathon: '',
      howDidYouHearOther: '',
      mlhCodeOfConduct: false,
      mlhDataPermission: false,
      mlhEmailPermission: false,
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
