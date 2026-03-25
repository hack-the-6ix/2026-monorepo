// 'use client';

import { Typography } from '@hackthe6ix/ui';
import Section from '../../components/Section';
import FooterArt from './components/FooterArt';
import FigmaFAQ from './components/figmaFAQ';
import CategoryPills from './components/CategoryPills';
import Image from 'next/image';

export default function FAQ() {
  return (
    <Section
      id="faq"
      backgroundColor="linear-gradient(to bottom, #D68D05, #BA6600)"
    >
      <div className="relative">
        <Image
          src="/assets/faq/faq-bg-triangle-1.png"
          alt=""
          width={3103}
          height={856}
        />
        <div className="flex flex-col items-center gap-9">
          <Typography textSize="heading-lg" textColor="text-neutral-50">
            FAQ
          </Typography>
          <div>
            <CategoryPills />
          </div>
          <div className="mt-12">
            <FigmaFAQ />
          </div>
          {/* Figma-exported artwork (inserted beneath existing content) */}
          <div className="mt-12">{/* <FigmaMaskGroup /> */}</div>
        </div>
      </div>
    </Section>
  );
}

// export default function FAQ() {
//   return (
//     <Section
//       id="faq"
//       backgroundColor="linear-gradient(180deg,#0e0b22 0%,#0a0720 100%)"
//     >
//       <Image
//         src="/assets/faq/faq-bg-triangle-1.png"
//         alt=""
//         width={3103}
//         height={856}
//       />
//       <div style={{ padding: '56px 24px' }}>
//         <div style={{ textAlign: 'center', marginBottom: 24 }}>
//           <Typography textSize="heading-lg" textColor="text-neutral-50">
//             FAQ
//           </Typography>
//           {/* <div style={{ marginTop: 16 }}>
//             <CategoryPills />
//           </div> */}
//         </div>

//         {/* <div className="mt-12">
//           <FigmaFAQ />
//         </div> */}
//         {/* <div className={`${styles.content} ${styles.contentOverlap}`} style={{ padding: '56px 24px' }}> */}
//         {/* <div className="mt-12">
//           <FooterArt />
//         </div> */}
//       </div>
//     </Section>
//   );
// }
