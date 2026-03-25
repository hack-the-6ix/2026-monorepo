'use client';

import React, { useState } from 'react';
import styles from './FAQSection.module.css';
import { Typography } from '@hackthe6ix/ui';

const IMG_CHEVRON =
  'https://www.figma.com/api/mcp/asset/b200500b-b9a2-43f7-9f22-2cafa52bca68';

function Disclosure({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.col}>
      <div
        className={styles.questionRow}
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((v) => !v)}
      >
        <div style={{ flex: 1 }}>
          <Typography
            textSize="heading-sm"
            textColor="text-neutral-50"
            className={styles.heading}
          >
            {title}
          </Typography>
        </div>
        <div className={styles.chevron} aria-hidden>
          <img
            src={IMG_CHEVRON}
            alt=""
            style={{
              width: 24,
              height: 24,
              transform: open ? 'rotate(180deg)' : undefined,
            }}
          />
        </div>
      </div>

      <div
        className={styles.bodyText}
        aria-hidden={!open}
        style={{ display: open ? 'block' : 'none' }}
      >
        {open && (
          <Typography
            textSize="paragraph-sm"
            textColor="text-neutral-50"
            className="{styles.body}"
          >
            {children}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <div className="flex flex-col items-start gap-12 w-[1048px]">
      <div className={styles.row}>
        <Disclosure title="What is Hack the 6ix?">
          {`Hack the 6ix is an in-person hackathon where "hackers" (participants) design, develop, and pitch an innovative project built from scratch over the course of 36 hours. Over the course of the weekend, hackers will have opportunities to network, learn, and collaborate through workshops, panels, activities, and more.`}
        </Disclosure>

        <Disclosure title="What kind of workshops, talks, and activities will be at Hack the 6ix?">
          {`We'll be hosting a variety of workshops ranging from introductory to advanced topics facilitated by our amazing sponsors and mentors. In addition, there will also be interesting tech talks by industry leaders from different companies. For breaks, we'll have a ton of fun activities planned for you, such as games, contests, and more!

Hack the 6ix is much more than just a hackathon – we want it to be an event that you'll thoroughly enjoy while expanding your skillset and network.`}
        </Disclosure>
      </div>

      <div className={styles.row}>
        <Disclosure title="Do I need to know how to code?">{`Nope! Our mentors and workshops will help you develop the skills required to create something big. Regardless of where your strengths lie, our team is here to guide and help you throughout your project.`}</Disclosure>

        <Disclosure
          title={`What if I've never been to a hackathon before?`}
        >{`That's completely OK! Many participants attend Hack the 6ix as their first hackathon. We welcome hackers of all skill levels. We will provide resources, mentorship, and workshops to help you learn and develop your project.`}</Disclosure>
      </div>

      <div className={styles.row}>
        <Disclosure title="Are travel reimbursements provided?">{`No, unfortunately travel reimbursements will not be provided this year at Hack the 6ix.`}</Disclosure>

        <Disclosure
          title={`What if my question isn't answered here?`}
        >{`If you have any other questions, feel free to reach out to us by emailing hello@hackthe6ix.com. Our team would be happy to help you out.`}</Disclosure>
      </div>
    </div>
  );
}
