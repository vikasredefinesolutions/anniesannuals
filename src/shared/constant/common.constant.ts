import VISAImg from '@/assets/images/card-visa.png';
import MASTERCARDImg from '@/assets/images/card-master-card.png';
import AMEXCARDImg from '@/assets/images/card-american-express.png';
import DISCOVERCARDImg from '@/assets/images/card-discover.png';

export const cardType = [
  {
    name: 'VISA',
    url: VISAImg.src,
  },

  {
    name: 'MASTERCARD',
    url: MASTERCARDImg.src,
  },

  {
    name: 'AMEX',
    url: AMEXCARDImg.src,
  },

  {
    name: 'DISCOVER',
    url: DISCOVERCARDImg.src,
  },
];

export const PREV_ROUTE = 'prevRoute';
