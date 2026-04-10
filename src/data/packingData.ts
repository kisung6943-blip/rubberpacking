export type Brand = 'fissler' | 'wmf' | 'silit' | 'other';
export type FisslerModel = 'A' | 'B';
export type LidCap = 'small' | 'medium' | 'large';

export interface SizeOption {
  volume: string;
  innerDiameter: string;
  innerDiameterMm: string;
  note?: string;
  warning?: string;
  links?: {
    naver?: string;
    coupang?: string;
    esLiving?: string;
  };
}

export interface LidCapOption {
  id: LidCap;
  label: string;
  subtitle: string;
}

export const BRANDS = [
  {
    id: 'fissler' as Brand,
    name: '휘슬러',
    subtitle: 'Fissler',
    hasModel: true,
  },
  {
    id: 'wmf' as Brand,
    name: 'WMF · 타파웨어',
    subtitle: '단일 모델',
    hasModel: false,
  },
  {
    id: 'silit' as Brand,
    name: '실리트',
    subtitle: 'Silit · 단일 모델',
    hasModel: false,
  },
  {
    id: 'other' as Brand,
    name: '타브랜드 압력솥',
    subtitle: '브랜드 모름 · 구매 불가',
    hasModel: false,
    unavailable: true,
  },
];

export const FISSLER_MODELS = [
  {
    id: 'A' as FisslerModel,
    name: '구형 (A모델)',
    tag: '구형',
    color: 'orange',
    warning: '구형(A모델) 패킹은 신형(B모델)과 호환되지 않습니다. 모델을 꼭 확인 후 구매하세요.',
  },
  {
    id: 'B' as FisslerModel,
    name: '신형 (B모델)',
    tag: '신형',
    color: 'green',
  },
];

export const LID_CAP_OPTIONS: LidCapOption[] = [
  { id: 'small', label: '소형캡', subtitle: '18cm용' },
  { id: 'medium', label: '중형캡', subtitle: '22cm용' },
  { id: 'large', label: '대형캡', subtitle: '26cm용' },
];

export const SIZE_DATA: Record<string, SizeOption[]> = {
  'fissler-A': [
    { 
      volume: '2.5L', 
      innerDiameter: '18cm', 
      innerDiameterMm: '180mm',
      links: {
        naver: "https://smartstore.naver.com/esliving/products/7167828060",
        coupang: "https://www.coupang.com/vp/products/8643938492?vendorItemId=92091565347",
        esLiving: "https://es-living.com/product/%ED%98%B8%ED%99%98-%ED%9C%98%EC%8A%AC%EB%9F%AC-%EC%95%95%EB%A0%A5%EC%86%A5-%EA%B3%A0%EB%AC%B4%ED%8C%A8%ED%82%B9-%EA%B5%AC%ED%98%95-18cm-%EB%B6%80%ED%92%88/5152/category/458/display/1/"
      }
    },
    { 
      volume: '4.5L', 
      innerDiameter: '22cm', 
      innerDiameterMm: '220mm',
      links: {
        naver: "https://smartstore.naver.com/esliving/products/132550304",
        coupang: "https://www.coupang.com/vp/products/7208650431"
      }
    },
    { 
      volume: '6L', 
      innerDiameter: '26cm', 
      innerDiameterMm: '260mm',
      links: {
        naver: "https://smartstore.naver.com/esliving/products/7167831938",
        coupang: "https://www.coupang.com/vp/products/8643938492",
        esLiving: "https://es-living.com/product/%ED%98%B8%ED%99%98-%ED%9C%98%EC%8A%AC%EB%9F%AC-%EC%95%95%EB%A0%A5%EC%86%A5-%EA%B3%A0%EB%AC%B4%ED%8C%A8%ED%82%B9-%EA%B5%AC%ED%98%95-26cm-%EB%B6%80%ED%92%88/5153/category/458/display/1/"
      }
    },
  ],
  'fissler-B': [
    { 
      volume: '2.5L', 
      innerDiameter: '18cm', 
      innerDiameterMm: '180mm',
      links: {
        naver: "https://smartstore.naver.com/esliving/products/7435346318",
        esLiving: "https://es-living.com/product/%ED%98%B8%ED%99%98-%ED%9C%98%EC%8A%AC%EB%9F%AC%EC%95%95%EB%A0%A5%EB%B0%A5%EC%86%A5-%EB%B6%80%ED%92%88-%ED%94%84%EB%A6%AC%EB%AF%B8%EC%97%84-%EA%B3%A0%EB%AC%B4%ED%8C%A8%ED%82%B9-18cm-%EC%95%95%EB%A0%A5%EB%B0%A5/4009/category/458/display/1/"
      }
    },
    { 
      volume: '4.5L', 
      innerDiameter: '22cm', 
      innerDiameterMm: '220mm',
      links: {
        naver: "https://smartstore.naver.com/esliving/products/7426646580",
        coupang: "https://www.coupang.com/vp/products/4971258047",
        esLiving: "https://es-living.com/product/%ED%98%B8%ED%99%98-%ED%9C%98%EC%8A%AC%EB%9F%AC%EC%95%95%EB%A0%A5%EB%B0%A5%EC%86%A5-%EB%B6%80%ED%92%88-%ED%94%84%EB%A6%AC%EB%AF%B8%EC%97%84-%EA%B3%A0%EB%AC%B4%ED%8C%A8%ED%82%B9-22cm-%EC%95%95%EB%A0%A5%EB%B0%A5%EC%86%A5as/4008/category/458/display/1/"
      }
    },
  ],
  wmf: [
    { volume: '2.5L', innerDiameter: '18cm', innerDiameterMm: '180mm', note: '전 모델' },
    {
      volume: '3L (익스프레스)',
      innerDiameter: '20cm',
      innerDiameterMm: '200mm',
      note: '퍼펙트/플러스와 다름',
      warning: '3L 익스프레스 모델은 3L 퍼펙트/플러스와 패킹 사이즈가 다릅니다. 모델명을 꼭 확인하세요.',
      links: {
        naver: "https://smartstore.naver.com/esliving/products/7167765165",
        coupang: "https://www.coupang.com/vp/products/8650960951?itemId=25088593741",
        esLiving: "https://es-living.com/product/wmf-%EC%9D%B5%EC%8A%A4%ED%94%84%EB%A0%88%EC%8A%A4-%EC%95%95%EB%A0%A5%EC%86%A5-%ED%98%B8%ED%99%98%EA%B3%A0%EB%AC%B4%ED%8C%A8%ED%82%B9-20cm/3680/category/459/display/1/"
      }
    },
    {
      volume: '3L (퍼펙트/플러스)',
      innerDiameter: '22cm',
      innerDiameterMm: '220mm',
      note: '익스프레스와 다름',
      warning: '3L 퍼펙트/플러스 모델은 3L 익스프레스와 패킹 사이즈가 다릅니다. 모델명을 꼭 확인하세요.',
      links: {
        naver: "https://smartstore.naver.com/esliving/products/2372539641",
        coupang: "https://www.coupang.com/vp/products/5270184487",
        esLiving: "https://es-living.com/product/%ED%98%B8%ED%99%98-wmf%EC%95%95%EB%A0%A5%EB%B0%A5%EC%86%A5%ED%8C%A8%ED%82%B9-%EB%B6%80%ED%92%88-%EA%B3%A0%EB%AC%B4%ED%8C%A8%ED%82%B9-22cm/3359/category/448/display/1/"
      }
    },
  ],
  silit: [
    { 
      volume: '2.5L', 
      innerDiameter: '18cm', 
      innerDiameterMm: '180mm',
      links: {
        naver: "https://smartstore.naver.com/esliving/products/7167545891",
        coupang: "https://www.coupang.com/vp/products/8519729599?itemId=24667152462&vendorItemId=81267540320",
        esLiving: "https://es-living.com/product/%ED%98%B8%ED%99%98-%EC%8B%A4%EB%A6%AC%ED%8A%B8-%EC%95%95%EB%A0%A5%EB%B0%A5%EC%86%A5-%EA%B3%A0%EB%AC%B4%ED%8C%A8%ED%82%B9-%EB%B6%80%ED%92%88-as-18cm/4018/category/293/display/1/"
      }
    },
    { 
      volume: '3.0L', 
      innerDiameter: '22cm', 
      innerDiameterMm: '220mm',
      links: {
        naver: "https://smartstore.naver.com/esliving/products/350056177",
        coupang: "https://www.coupang.com/vp/products/8643646057?itemId=24885752928",
        esLiving: "https://es-living.com/product/%ED%98%B8%ED%99%98-%EC%8B%A4%EB%A6%AC%ED%8A%B8-%EC%95%95%EB%A0%A5%EB%B0%A5%EC%86%A5-%EA%B3%A0%EB%AC%B4%ED%8C%A8%ED%82%B9-%EB%B6%80%ED%92%88-as-22cm/2965/category/293/display/1/"
      }
    },
  ],
  other: [],
};
