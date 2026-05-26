'use client';
import type { ReactNode } from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from 'react';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { usePathname, useRouter } from 'next/navigation';
import z from 'zod';

import { getResponse, upsertFormResponse } from '@/client';
import {
  characterSheetSchema,
  initialCharacterSheet,
} from '@/lib/schemas/character';

export const FormDataSchema = z.object({
  characterSheet: characterSheetSchema,
  aboutYou: z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string().refine((val) => isValidPhoneNumber(val), {
      message:
        'Please enter a valid phone number (including country code starting with +)',
    }),
    age: z.number(),
    // email: z.email(),
    city: z.string(),
    province: z.string().optional(),
    country: z.string(),
    gender: z.string().optional(),
    ethnicity: z.string().optional(),
  }),
  experiences: z.object({
    school: z.string(),
    program: z.string(),
    yearOfStudy: z.string(),
    resumeId: z.guid(),
    resumeName: z.string(),
    sponsorPermission: z.boolean().optional(),
    github: z.string(),
    linkedin: z.string(),
    portfolio: z.string(),
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
    emailPermission: z.boolean().optional(),
    mlhEmailPermission: z.boolean().optional(),
  }),
});

export type FormData = z.infer<typeof FormDataSchema>;

interface ApplicationContextType {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: unknown) => void;
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined,
);

export const ApplicationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    characterSheet: initialCharacterSheet,
    aboutYou: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      age: 0,
      // email: '',
      city: '',
      province: '',
      country: '',
      gender: '',
      ethnicity: '',
    },
    experiences: {
      school: '',
      program: '',
      yearOfStudy: '',
      resumeId: '',
      resumeName: '',
      sponsorPermission: false,
      github: '',
      linkedin: '',
      portfolio: '',
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
      emailPermission: false,
      mlhEmailPermission: false,
    },
  });

  const updateFormData = (section: keyof FormData, data: unknown) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  const loadSavedData = useEffectEvent(
    (savedData: string | Record<string, unknown> | null) => {
      try {
        if (typeof savedData === 'string') {
          setFormData(JSON.parse(savedData));
        } else {
          setFormData(savedData as FormData);
        }
      } catch (e) {
        console.error('Failed to parse saved form data', e);
      }
    },
  );

  useEffect(() => {
    const savedData = localStorage.getItem('application_data');
    if (savedData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadSavedData(savedData);
    }

    getResponse()
      .then((res) => {
        const currentResponse = res.data?.[0];
        if (currentResponse) {
          loadSavedData(currentResponse.responseJson);
        }
        if (currentResponse?.isSubmitted) {
          setIsSubmitted(true);
        }
      })
      .catch((err) =>
        console.error('Failed to fetch existing application status', err),
      );
  }, []);

  useEffect(() => {
    if (isSubmitted && pathname !== '/review' && pathname !== '/thank-you') {
      router.replace('/review');
    }
  }, [isSubmitted, pathname, router]);

  useEffect(() => {
    localStorage.setItem('application_data', JSON.stringify(formData));
  }, [formData]);

  // -------- UPSERT TO DB WHEN USER LEAVES WINDOW --------
  const onLeaveSave = useEffectEvent(async () => {
    if (isSubmitted) return;

    try {
      await upsertFormResponse({
        responseJson: formData as unknown as Record<string, unknown>,
        isSubmitted: false,
      });
    } catch (error) {
      console.error('Background window-leave save failed:', error);
    }
  });
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        onLeaveSave();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isSubmitted]);

  return (
    <ApplicationContext.Provider
      value={{
        formData,
        updateFormData,
        isSubmitted,
        setIsSubmitted,
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
