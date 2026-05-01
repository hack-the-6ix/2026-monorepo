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
import Placeholder from './owo.png';
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
  img: StaticImageData;
};

// https://docs.google.com/spreadsheets/d/1Nl77IaHWL40b-hHousvzJLafl9INGjVta5KpMpfC8H4
export const members: MemberDetails[] = [
  {
    name: 'Winston Yu',
    role: 'Co-chair',
    img: Winston,
  },
  {
    name: 'Kelvin Nguyen',
    role: 'Co-chair',
    img: Kelvin,
  },
  {
    name: 'Andy Suri',
    role: 'Operations Exec',
    img: Andy,
  },
  {
    name: 'Halle Chan',
    role: 'Design Exec',
    img: Halle,
  },
  {
    name: 'Muskaan Opel',
    role: 'Operations Director',
    img: Muskaan,
  },
  {
    name: 'Sasha Boruk',
    role: 'Web Dev Exec',
    img: Sasha,
  },
  {
    name: 'Ferdinand Zhang',
    role: 'Web Dev Exec',
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
    img: Lucas,
  },
  {
    name: 'Maira Opel',
    role: 'BD Exec',
    img: Maira,
  },
  {
    name: 'Jeffrey Zang',
    role: 'BOD',
    img: Jeffrey,
  },
  {
    name: 'Antoinette Erin Manalo',
    role: 'Design Director',
    img: Antoinette,
  },
  {
    name: 'David Hui',
    role: 'Mentor/Advisor/Board',
    img: David,
  },
  {
    name: 'Jacklyn Biggin',
    role: 'Mentor/Advisor',
    img: Jacklyn,
  },
  {
    name: 'Sunni Xue',
    role: 'BD Exec',
    img: Sunni,
  },
  {
    name: 'Yanzi Guo',
    role: 'Mentor/Advisor/Board',
    img: Yanzi,
  },
  {
    name: 'Lindsay Xie',
    role: 'Web Dev Director',
    img: Lindsay,
  },
  {
    name: 'Kaiser Tam',
    role: 'Operations Director',
    img: Kaiser,
  },
  {
    name: 'Daniel Ganjali',
    role: 'Operations Exec',
    img: DanielG,
  },
  {
    name: 'James Liang',
    role: 'Finance Director',
    img: James,
  },
  {
    name: 'Justin Rui',
    role: 'BD Exec',
    img: JustinR,
  },
  {
    name: 'Kim Guo',
    role: 'Design Director',
    img: Kim,
  },
  {
    name: 'Janie Tong',
    role: 'Web Dev Exec',
    img: Placeholder,
  },
  {
    name: 'Annika Xu',
    role: 'Design Exec',
    img: Annika,
  },
  {
    name: 'Jessica Lu',
    role: 'Design Exec',
    img: Jessica,
  },
  {
    name: 'Emerson Ni',
    role: 'Marketing Exec',
    img: Emerson,
  },
  {
    name: 'Vienna Zhao',
    role: 'Operations Exec',
    img: Vienna,
  },
  {
    name: 'Karen Wang',
    role: 'BD Exec',
    img: Karen,
  },
  {
    name: 'Ansh Singh',
    role: 'Marketing Director',
    img: Ansh,
  },
  {
    name: 'Austin Jian',
    role: 'Web Dev Exec',
    img: Austin,
  },
  {
    name: 'Jason Der',
    role: 'Web Dev Exec',
    img: Jason,
  },
  {
    name: 'Sharisse Ji',
    role: 'Web Dev Exec',
    img: Sharisse,
  },
  {
    name: 'Mahek Patel',
    role: 'BD Exec',
    img: Mahek,
  },
  {
    name: 'Dorothy Zheng',
    role: 'Relationships Director',
    img: Dorothy,
  },
  {
    name: 'Daniel Ye',
    role: 'Operations Exec',
    img: DanielY,
  },
  {
    name: 'Parsa',
    role: 'Finance Exec',
    img: Parsa,
  },
  {
    name: 'Gordon Lin',
    role: 'Mentor/Advisor/Board',
    img: Gordon,
  },
  {
    name: 'Justin Xue',
    role: 'Web Dev Exec',
    img: JustinX,
  },
  {
    name: 'Daniel Pu',
    role: 'Web dev director',
    img: DanielP,
  },
  {
    name: 'Michael Zhang',
    role: 'Operations Exec',
    img: Michael,
  },
  {
    name: 'Shaoming Wu',
    role: 'BD Exec',
    img: Shaoming,
  },
  {
    name: 'Vickie Chen',
    role: 'Relationships Exec',
    img: Vickie,
  },
  {
    name: 'Elrich Chen',
    role: 'BD Exec',
    img: Elrich,
  },
];
