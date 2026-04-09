'use client';

import React, { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { Typography } from '@hackthe6ix/ui';

function Disclosure({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        type="button"
        className="flex items-center gap-2 cursor-pointer outline-none group w-full text-left focus-visible:ring-2 focus-visible:ring-white/20 rounded-md transition-shadow"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex-1">
          <Typography
            textSize="heading-sm"
            textColor="text-neutral-50"
            className="font-semibold md:text-[20px] md:leading-[24px] text-[18px] leading-[22px]"
          >
            {title}
          </Typography>
        </div>
        <div className="w-4 h-4 flex-none" aria-hidden>
          <FaChevronUp
            className="w-full h-full transition-transform duration-200 ease-in-out"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              color: 'white',
              transition: 'transform 0.2s ease-in-out',
            }}
          />
        </div>
      </button>

      <div
        className={`grid w-full transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        aria-hidden={!open}
      >
        <div className="overflow-hidden pb-4">
          <Typography
            textSize="paragraph-sm"
            textColor="text-neutral-50"
            className="font-medium md:text-[16px] md:leading-[20px] text-[14px] leading-[18px] opacity-90 whitespace-pre-line"
          >
            {children}
          </Typography>
        </div>
      </div>
    </div>
  );
}

const QUESTIONS = {
  General: [
    {
      title: 'What is Hack the 6ix?',
      content:
        'Hack the 6ix is an in-person hackathon where "hackers" (participants) design, develop, and pitch an innovative project built from scratch over the course of 36 hours. Over the course of the weekend, hackers will have opportunities to network, learn, and collaborate through workshops, panels, activities, and more.',
    },
    {
      title:
        'What kind of workshops, talks, and activities will be at Hack the 6ix?',
      content:
        "We'll be hosting a variety of workshops ranging from introductory to advanced topics facilitated by our amazing sponsors and mentors. In addition, there will also be interesting tech talks by industry leaders from different companies. For breaks, we'll have a ton of fun activities planned for you, such as games, contests, and more!\n\nHack the 6ix is much more than just a hackathon – we want it to be an event that you'll thoroughly enjoy while expanding your skillset and network.",
    },
    {
      title: 'Do I need to know how to code?',
      content:
        'Nope! Our mentors and workshops will help you develop the skills required to create something big. Regardless of where your strengths lie, our team is here to guide and help you throughout your project.',
    },
    {
      title: "What if I've never been to a hackathon before?",
      content:
        "That's completely OK! Many participants attend Hack the 6ix as their first hackathon. We welcome hackers of all skill levels. We will provide resources, mentorship, and workshops to help you learn and develop your project.",
    },
    {
      title: 'Are travel reimbursements provided?',
      content:
        'No, unfortunately travel reimbursements will not be provided this year at Hack the 6ix.',
    },
    {
      title: "What if my question isn't answered here?",
      content:
        'If you have any other questions, feel free to reach out to us by emailing hello@hackthe6ix.com. Our team would be happy to help you out.',
    },
  ],
  Application: [
    {
      title: 'When do hacker applications open?',
      content:
        'Hacker applications for Hack the 6ix 2026 will open in early June. Follow us on our social platforms to be the first to know when applications are released!',
    },
    {
      title: 'Am I eligible to participate?',
      content:
        'Any high-school students, post-secondary students or recent graduates (<1 years of graduating) are eligible to participate in Hack the 6ix.',
    },
    {
      title: "What if I don't have a team or idea?",
      content:
        "Don't sweat it - we will be coordinating team formation and idea generation events leading up to, as well as during the event.",
    },
  ],
  Event: [
    {
      title: 'Where will Hack the 6ix be held?',
      content:
        "As a non-university affiliated hackathon, Hack the 6ix takes place at a new location in Toronto every year! We've previously hosted at corporate offices and universities.\n\nThe door to our wonderland is opening soon, stay tuned!",
    },
    {
      title: 'What should I bring?',
      content:
        'Make sure to bring your laptop (or desktop) and a piece of valid student ID or government ID! You can also bring a pillow and blanket if you want to get comfy. A detailed packing list will be sent to hackers who successfully RSVP.',
    },
    {
      title: 'How much does it cost to attend?',
      content:
        'Absolutely nothing! Hack the 6ix is a completely free event run by a non-profit organization. All food, resources, and accommodations for hacking for the entire event will be provided free of charge.',
    },
  ],
};

export default function FAQSection({ category }: { category: string }) {
  const currentQuestions =
    QUESTIONS[category as keyof typeof QUESTIONS] || QUESTIONS.General;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-12 gap-x-12 md:gap-x-16 w-full max-w-[1048px] px-6 md:px-0">
      {currentQuestions.map((q) => (
        <Disclosure key={q.title} title={q.title}>
          {q.content}
        </Disclosure>
      ))}
    </div>
  );
}
