import type { DS1Vs2Row } from '../types';

export const DS1_VS_DS2: readonly DS1Vs2Row[] = [
  { param: 'Diameter', ds1: '120 km', ds2: '160 km' },
  { param: 'Presented surface', ds1: '45,200 km²', ds2: '80,400 km²' },
  { param: 'Volume', ds1: '9.05 × 10¹⁴ m³', ds2: '2.14 × 10¹⁵ m³' },
  { param: 'Superlaser recharge', ds1: '~24 hours', ds2: '~3–5 minutes' },
  { param: 'Superlaser architecture', ds1: '8 equal tributaries', ds2: '7 + 1 central large' },
  { param: 'Target classes', ds1: 'Planet only', ds2: 'Planet + capital ship' },
  { param: 'Reactor cores', ds1: '1 hypermatter', ds2: '3 hypermatter' },
  { param: 'Heavy turbolasers', ds1: '5,000', ds2: '15,000' },
  { param: 'Laser cannons', ds1: '2,500', ds2: '7,500' },
  { param: 'Ion cannons', ds1: '2,500', ds2: '5,000' },
  { param: 'Tractor beams', ds1: '768', ds2: '768' },
  { param: 'Military crew', ds1: '1.7 M', ds2: '637,835' },
  { param: 'Primary shield', ds1: 'On-station', ds2: 'Endor moon (SLD-26)' },
  { param: 'Exhaust venting', ds1: 'Single 2-m port', ds2: 'Millions of mm-scale tubes' },
  { param: 'Cost (program total)', ds1: '$6.6 × 10¹⁸', ds2: '~$1.5 × 10¹⁹ (estimated)' },
  { param: 'Build time', ds1: '19 years', ds2: '< 4 years (unfinished at loss)' },
];
