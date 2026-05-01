import { StaticImageData } from 'next/image';

import Andy from './Andy.jpg';
import Annika from './Annika.jpg';
import Ansh from './Ansh.jpg';
import Austin from './Austin.png';
import DanielP from './Daniel P.jpg';
import DanielG from './DanielG.jpg';
import DanielY from './DanielY.jpg';
import David from './David.png';
import Dawoud from './Dawoud.png';
import Dorothy from './Dorothy.png';
import Elrich from './Elrich.png';
import Emerson from './Emerson.jpg';
import Antoinette from './Erin.png';
import Ferdinand from './Ferdinand.jpg';
import Frederic from './Frederic.png';
import Gordon from './Gordon.png';
import Halle from './Halle.png';
import Jacklyn from './Jacklyn.png';
import James from './James.jpg';
import Jason from './Jason.jpg';
import Jeffrey from './Jeffrey.png';
import Jessica from './Jessica.png';
import JustinR from './Justin Rui - Headshot.jpg';
import JustinX from './Justin.png';
import Kaiser from './Kaiser.png';
import Karen from './Karen.png';
import Kelvin from './Kelvin.jpg';
import Kim from './Kim.jpg';
import Lindsay from './Lindsay.png';
import Lucas from './Lucas.jpg';
import Mahek from './Mahek.png';
import Maira from './Maira.png';
import Michael from './Michael.jpg';
import Muskaan from './Muskaan.jpg';
import Parsa from './Parsa.png';
import Sasha from './Sasha.png';
import Shaoming from './Shaoming.jpg';
import Sharisse from './Sharisse.jpg';
import Sunni from './Sunni.jpg';
import Vickie from './Vickie.jpg';
import Vienna from './Vienna.jpg';
import Winston from './Winston.jpg';
import Yanzi from './Yanzi.png';

export type MemberDetails = {
  name: string;
  role: string;
  linkedin?: string;
  img: StaticImageData;
};

// https://docs.google.com/spreadsheets/d/1Nl77IaHWL40b-hHousvzJLafl9INGjVta5KpMpfC8H4
export const members: MemberDetails[] = [
  {
    name: 'Winston Yu',
    role: 'Co-chair',
    linkedin: 'https://www.linkedin.com/in/winstonyou/',
    img: Winston,
  },
  {
    name: 'Kelvin Nguyen',
    role: 'Co-chair',
    linkedin: 'https://www.linkedin.com/in/nguyen-kelvin/',
    img: Kelvin,
  },
  {
    name: 'Frederick Pu',
    role: 'Mentor/Advisor/Board',
    linkedin: 'https://www.linkedin.com/in/fpunny/',
    img: Frederic,
  },
  {
    name: 'Andy Suri',
    role: 'Operations Exec',
    linkedin: 'https://www.linkedin.com/in/andy-suri-645bb531a/',
    img: Andy,
  },
  {
    name: 'Halle Chan',
    role: 'Design Exec',
    linkedin: 'https://www.linkedin.com/in/hallechan/',
    img: Halle,
  },
  {
    name: 'Muskaan Opel',
    role: 'Operations Director',
    linkedin: 'https://www.linkedin.com/in/muskaan-opel/',
    img: Muskaan,
  },
  {
    name: 'Sasha Boruk',
    role: 'Web Dev Exec',
    linkedin: 'https://www.linkedin.com/in/sashaboruk/',
    img: Sasha,
  },
  {
    name: 'Ferdinand Zhang',
    role: 'Web Dev Exec',
    linkedin: 'https://www.linkedin.com/in/ferdinand-simmons-zhang-39ba62297/',
    img: Ferdinand,
  },
  {
    name: 'Dawoud Opel',
    role: 'Design Exec',
    img: Dawoud,
  },
  {
    name: 'Lucas Jin',
    role: 'BD Exec',
    linkedin: 'https://www.linkedin.com/in/lucas--jin/',
    img: Lucas,
  },
  {
    name: 'Maira Opel',
    role: 'BD Director',
    linkedin: 'https://www.linkedin.com/in/maira-opel-a8a072296/',
    img: Maira,
  },
  {
    name: 'Jeffrey Zang',
    role: 'BOD',
    linkedin: 'https://www.linkedin.com/in/jeffreyzang/',
    img: Jeffrey,
  },
  {
    name: 'Antoinette Erin Manalo',
    role: 'Design Director',
    linkedin: 'https://www.linkedin.com/in/erin-manalo/',
    img: Antoinette,
  },
  {
    name: 'David Hui',
    role: 'Mentor/Advisor/Board',
    linkedin: 'https://www.linkedin.com/in/d1h/',
    img: David,
  },
  {
    name: 'Jacklyn Biggin',
    role: 'Mentor/Advisor',
    linkedin: 'https://www.linkedin.com/in/jacklynbiggin/',
    img: Jacklyn,
  },
  {
    name: 'Sunni Xue',
    role: 'BD Exec',
    linkedin: 'https://www.linkedin.com/in/sunni-xue/',
    img: Sunni,
  },
  {
    name: 'Yanzi Guo',
    role: 'Mentor/Advisor/Board',
    linkedin: 'https://www.linkedin.com/in/yanzig/',
    img: Yanzi,
  },
  {
    name: 'Lindsay Xie',
    role: 'Web Dev Director',
    linkedin: 'https://www.linkedin.com/in/lindsayxie/',
    img: Lindsay,
  },
  {
    name: 'Kaiser Tam',
    role: 'Operations Director',
    linkedin: 'https://www.linkedin.com/in/kaisertam/',
    img: Kaiser,
  },
  {
    name: 'Daniel Ganjali',
    role: 'Operations Exec',
    linkedin: 'https://www.linkedin.com/in/daniel-ganjali-792bab30a/',
    img: DanielG,
  },
  {
    name: 'James Liang',
    role: 'Finance Director',
    linkedin: 'https://www.linkedin.com/in/james-liang-/',
    img: James,
  },
  {
    name: 'Justin Rui',
    role: 'BD Exec',
    linkedin: 'https://www.linkedin.com/in/justin-rui-801375355/',
    img: JustinR,
  },
  {
    name: 'Kim Guo',
    role: 'Design Director',
    linkedin: 'https://www.linkedin.com/in/kbrqin/',
    img: Kim,
  },
  {
    name: 'Annika Xu',
    role: 'Design Exec',
    linkedin: 'https://www.linkedin.com/in/annika-h-xu/',
    img: Annika,
  },
  {
    name: 'Jessica Lu',
    role: 'Design Exec',
    linkedin: 'https://www.linkedin.com/in/jessica-lu-677672351/',
    img: Jessica,
  },
  {
    name: 'Emerson Ni',
    role: 'Marketing Exec',
    linkedin: 'https://www.linkedin.com/in/emerson-ni/',
    img: Emerson,
  },
  {
    name: 'Vienna Zhao',
    role: 'Operations Exec',
    linkedin: 'https://www.linkedin.com/in/vienna-zhao-207b402b5/',
    img: Vienna,
  },
  {
    name: 'Karen Wang',
    role: 'BD Exec',
    linkedin: 'https://www.linkedin.com/in/karen-wang-12b471227/',
    img: Karen,
  },
  {
    name: 'Ansh Singh',
    role: 'Marketing Director',
    linkedin: 'https://www.linkedin.com/in/anshsinghh/',
    img: Ansh,
  },
  {
    name: 'Austin Jian',
    role: 'Web Dev Exec',
    linkedin: 'https://www.linkedin.com/in/austin-jian/',
    img: Austin,
  },
  {
    name: 'Jason Der',
    role: 'Web Dev Exec',
    linkedin: 'https://www.linkedin.com/in/jason-der/',
    img: Jason,
  },
  {
    name: 'Sharisse Ji',
    role: 'Web Dev Exec',
    linkedin: 'https://www.linkedin.com/in/sharisseji/',
    img: Sharisse,
  },
  {
    name: 'Mahek Patel',
    role: 'BD Exec',
    linkedin: 'https://www.linkedin.com/in/mahekp/',
    img: Mahek,
  },
  {
    name: 'Dorothy Zheng',
    role: 'Relationships Director',
    linkedin: 'https://www.linkedin.com/in/dorothy-zheng07/',
    img: Dorothy,
  },
  {
    name: 'Daniel Ye',
    role: 'Operations Exec',
    linkedin: 'https://www.linkedin.com/in/daniel-ye-b5954b215/',
    img: DanielY,
  },
  {
    name: 'Parsa',
    role: 'Finance Exec',
    linkedin: 'https://www.linkedin.com/in/parsameshkini/',
    img: Parsa,
  },
  {
    name: 'Gordon Lin',
    role: 'Mentor/Advisor/Board',
    linkedin: 'https://www.linkedin.com/in/gordon-lin/',
    img: Gordon,
  },
  {
    name: 'Justin Xue',
    role: 'Web Dev Exec',
    linkedin: 'https://www.linkedin.com/in/justin-xue5/',
    img: JustinX,
  },
  {
    name: 'Daniel Pu',
    role: 'Web dev director',
    linkedin: 'https://www.linkedin.com/in/dtpu/',
    img: DanielP,
  },
  {
    name: 'Michael Zhang',
    role: 'Operations Exec',
    linkedin: 'https://www.linkedin.com/in/fangjing-michael-zhang/',
    img: Michael,
  },
  {
    name: 'Shaoming Wu',
    role: 'BD Exec',
    linkedin: 'https://www.linkedin.com/in/shaoming-wu/',
    img: Shaoming,
  },
  {
    name: 'Vickie Chen',
    role: 'Relationships Exec',
    linkedin: 'https://www.linkedin.com/in/vickiecchen/',
    img: Vickie,
  },
  {
    name: 'Elrich Chen',
    role: 'BD Exec',
    linkedin: 'https://www.linkedin.com/in/elrich-chen/',
    img: Elrich,
  },
];
