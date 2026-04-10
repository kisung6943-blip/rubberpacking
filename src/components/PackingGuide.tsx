'use client';

import { useState, useRef, useEffect } from 'react';
import {
  BRANDS,
  FISSLER_MODELS,
  LID_CAP_OPTIONS,
  SIZE_DATA,
  type Brand,
  type FisslerModel,
  type LidCap,
  type SizeOption,
} from '@/data/packingData';

const BRAND_PURCHASE_LINKS = {
  fissler: {
    naver: "https://mkt.shopping.naver.com/link/69d870ddc81d717af867c738",
    coupang: "https://www.coupang.com/vp/products/4971258047?itemId=14152992686&vendorItemId=81421124792&q=%ED%9C%98%EC%8A%AC%EB%9F%AC%EA%B3%A0%EB%AC%B4%ED%8C%A8%ED%82%B9&searchId=40aa55444825126&sourceType=search&itemsCount=36&searchRank=1&rank=1&traceId=mnscz3zv",
    es_living: "https://es-living.com/product/%ED%9C%98%EC%8A%AC%EB%9F%AC%EC%95%95%EB%A0%A5%EB%B0%A5%EC%86%A5-%EA%B3%A0%EB%AC%B4%ED%8C%A8%ED%82%B9-%ED%98%B8%ED%99%98-%EB%B6%80%ED%92%88-%EB%A7%81-22cm18cm26cm/481/category/458/display/1/"
  },
  wmf: {
    naver: "https://smartstore.naver.com/esliving/products/7167556107",
    coupang: "https://www.coupang.com/vp/products/8644132196?itemId=25088593735&vendorItemId=92092344732&q=wmf+%EC%95%95%EB%A0%A5%EB%B0%A5%EC%86%A5+%EA%B3%A0%EB%AC%B4%ED%8C%A8%ED%82%B9&searchId=64bf31b67956193&sourceType=search&itemsCount=36&searchRank=24&rank=24&traceId=mnsf1qou",
    es_living: "https://es-living.com/product/wmf-%ED%8D%BC%ED%8E%99%ED%8A%B8-%ED%8D%BC%ED%8E%99%ED%8A%B8%ED%94%8C%EB%9F%AC%EC%8A%A4-%EB%A6%AC%EA%B0%88-%ED%83%80%ED%8C%8C%EC%9B%A8%EC%96%B4-%ED%97%A4%EC%8A%A4%ED%83%80-%ED%98%B8%ED%99%98%EC%9A%A9-%EC%95%95%EB%A0%A5%EC%86%A5-%EC%8B%A4%EB%A6%AC%EC%BD%98%ED%8C%A8%ED%82%B9-%EA%B3%A0%EB%AC%B4%ED%8C%A8%ED%82%B9-%EB%B6%80%ED%92%88-18cm/3679/category/459/display/1/"
  },
  silit: {
    naver: "https://smartstore.naver.com/esliving/products/7167545891",
    coupang: "https://www.coupang.com/vp/products/8519729599?itemId=24667152462&vendorItemId=81267540320",
    es_living: "https://es-living.com/product/%ED%98%B8%ED%99%98-%EC%8B%A4%EB%A6%AC%ED%8A%B8-%EC%95%95%EB%A0%A5%EB%B0%A5%EC%86%A5-%EA%B3%A0%EB%AC%B4%ED%8C%A8%ED%82%B9-%EB%B6%80%ED%92%88-as-18cm/4018/category/293/display/1/"
  },
  other: {
    naver: "#",
    coupang: "#",
    es_living: "#"
  }
};

const BRAND_MEASURE_GUIDES = {
  fissler: {
    default: {
      correct: "/measure-guide-correct-v4.png",
      incorrect: "/measure-guide-incorrect-v4.png"
    },
    A: { // 구형 (A모델)
      correct: "/measure-guide-correct-fissler-old.png",
      incorrect: "/measure-guide-incorrect-fissler-old.png"
    },
    B: { // 신형 (B모델)
      correct: "/measure-guide-correct-fissler-new.png",
      incorrect: "/measure-guide-incorrect-fissler-new.png"
    }
  },
  wmf: {
    correct: "/measure-guide-correct-v4.png",
    incorrect: "/measure-guide-incorrect-v4.png"
  },
  silit: {
    correct: "/measure-guide-correct-silit.png",
    incorrect: "/measure-guide-incorrect-silit.png"
  },
  other: {
    correct: "/measure-guide-correct-v4.png",
    incorrect: "/measure-guide-incorrect-v4.png"
  }
};

export default function PackingGuide() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<FisslerModel | null>(null);
  const [selectedLidCap, setSelectedLidCap] = useState<LidCap | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);

  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedLidCap(null);
    setSelectedSize(null);
    if (brand !== 'other') scrollToRef(step2Ref);
  };

  const handleModelSelect = (model: FisslerModel) => {
    setSelectedModel(model);
    setSelectedLidCap(null);
    setSelectedSize(null);
    scrollToRef(step3Ref);
  };

  const handleSizeSelect = (size: SizeOption) => {
    setSelectedSize(size);
    scrollToRef(resultRef);
  };

  const handleReset = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedLidCap(null);
    setSelectedSize(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showStep2 = selectedBrand && selectedBrand !== 'other';
  const showStep3 =
    selectedBrand &&
    selectedBrand !== 'other' &&
    (selectedBrand !== 'fissler' || selectedModel !== null);
  const showResult = selectedSize !== null;

  const brandData = BRANDS.find((b) => b.id === selectedBrand);
  const modelData = FISSLER_MODELS.find((m) => m.id === selectedModel);
  const lidCapData = LID_CAP_OPTIONS.find((l) => l.id === selectedLidCap);

  const getStepNumber = () => {
    if (selectedBrand === 'fissler') return 3;
    return 2;
  };

  const getMeasureGuide = () => {
    if (!selectedBrand) return BRAND_MEASURE_GUIDES.other;
    const brandGuide = BRAND_MEASURE_GUIDES[selectedBrand];
    
    // 휘슬러의 경우 모델별 분기 처리
    if (selectedBrand === 'fissler' && selectedModel && (brandGuide as any)[selectedModel]) {
      return (brandGuide as any)[selectedModel];
    }
    
    return (brandGuide as any).default || brandGuide;
  };

  const measureGuide = getMeasureGuide();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[640px] mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">압력밥솥 고무패킹 실수하지 않고 주문하는 방법</h1>
          <p className="text-sm text-gray-800 mt-1 font-bold">브랜드 → 모델 → 사이즈 순서로 선택하세요</p>
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-4 pt-5 space-y-5">
        {/* 경고 배너 */}
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex gap-2 items-center">
          <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
          <p className="text-base text-red-600 font-medium leading-snug">
            지름만 재시고 아무 고무패킹이나 주문하시면 <strong>사용이 안됩니다</strong>
          </p>
        </div>

        {/* STEP 1: 브랜드 선택 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-gray-50">
            <span className="text-sm font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
              STEP 1
            </span>
            <h2 className="text-base font-bold text-gray-900 mt-1.5">브랜드를 선택하세요</h2>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {BRANDS.map((brand) => {
              const isSelected = selectedBrand === brand.id;
              const isUnavailable = brand.unavailable;
              return (
                <button
                  key={brand.id}
                  id={`brand-${brand.id}`}
                  onClick={() => handleBrandSelect(brand.id)}
                  className={`
                    rounded-xl px-4 py-4 text-left transition-all duration-200 border-2
                    ${isUnavailable
                      ? isSelected
                        ? 'border-gray-400 bg-gray-50'
                        : 'border-dashed border-gray-300 bg-white hover:bg-gray-50'
                      : isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30'
                    }
                  `}
                >
                  <p className={`font-bold text-base ${isUnavailable ? 'text-gray-500' : 'text-gray-900'}`}>
                    {brand.name}
                  </p>
                  <p className={`text-xs mt-0.5 ${isUnavailable ? 'text-gray-400' : 'text-gray-500'}`}>
                    {brand.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 타브랜드 안내 */}
        {selectedBrand === 'other' && (
          <div className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-4 text-center animate-fadeIn">
            <p className="text-sm text-gray-800 font-bold">
              휘슬러 · WMF · 타파웨어 · 실리트 이외의 브랜드는<br />
              현재 취급하지 않아요.
            </p>
          </div>
        )}

        {/* STEP 2: 모델 선택 (휘슬러 전용) */}
        {showStep2 && selectedBrand === 'fissler' && (
          <div ref={step2Ref} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
            <div className="px-4 pt-4 pb-3 border-b border-gray-50">
              <span className="text-sm font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                STEP 2
              </span>
              <h2 className="text-base font-bold text-gray-900 mt-1.5">모델을 선택하세요</h2>
              <p className="text-sm text-gray-700 mt-1 font-bold">휘슬러는 구형/신형 패킹이 서로 호환되지 않습니다</p>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {FISSLER_MODELS.map((model) => {
                const isSelected = selectedModel === model.id;
                return (
                  <button
                    key={model.id}
                    id={`model-${model.id}`}
                    onClick={() => handleModelSelect(model.id)}
                    className={`
                      rounded-xl px-4 py-4 text-left transition-all duration-200 border-2
                      ${isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30'
                      }
                    `}
                  >
                    <span className={`
                      text-xs font-bold px-2 py-0.5 rounded-full
                      ${model.color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}
                    `}>
                      {model.tag}
                    </span>
                    <p className="font-bold text-gray-900 mt-2 text-sm">{model.name}</p>
                  </button>
                );
              })}
            </div>

            {/* 뚜껑캡 안내 및 사이즈 선택 (모델 선택 시에만 노출) */}
            {selectedModel && (
              <div className="animate-fadeIn">
                <div className={`mx-4 mb-4 rounded-xl overflow-hidden border ${selectedModel === 'B' ? 'border-green-200' : 'border-orange-200'}`}>
                  <div className={`${selectedModel === 'B' ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'} px-3 py-2 border-b`}>
                    {selectedModel === 'B' && (
                      <p className="text-xl font-bold text-green-700 text-center mb-1">
                        압력솥 뚜껑캡이 아래와 같은 경우는
                      </p>
                    )}
                    <p className={`text-base font-semibold ${selectedModel === 'B' ? 'text-green-500' : 'text-orange-500'} text-center mt-1 font-bold`}>
                      {selectedModel === 'B' ? '[신형모델용 고무패킹 구매]' : '[구형모델용 고무패킹 구매]'}
                    </p>
                  </div>
                  <img
                    src={selectedModel === 'B' ? '/fissler-guide-v2.jpg' : '/lidcap-guide-old-v3.png'}
                    alt="압력솥 뚜껑캡 종류 안내"
                    className="w-full object-contain px-2 py-4 bg-white"
                  />

                  {/* 모델 사이즈 빠른 선택 */}
                  <div className={`bg-white px-4 py-4 border-t ${selectedModel === 'B' ? 'border-green-100' : 'border-orange-100'}`}>
                    <p className="text-sm font-bold text-gray-700 mb-3 text-center">
                      {selectedModel === 'B' ? '신형 모델이라면 사이즈를 확인해주세요' : '구형 모델이라면 사이즈를 확인해주세요'}
                    </p>
                    <div className={`grid ${selectedModel === 'B' ? 'grid-cols-2' : 'grid-cols-3'} gap-2`}>
                      {(SIZE_DATA[`fissler-${selectedModel || 'A'}`] || [])
                        .filter(size => !(selectedModel === 'B' && size.innerDiameter === '26cm'))
                        .map((size) => (
                        <button
                          key={size.volume}
                          id={`old-size-${size.innerDiameter}`}
                          onClick={() => {
                            if (!selectedModel) setSelectedModel('A');
                            handleSizeSelect(size);
                          }}
                          className={`rounded-xl py-3 text-center border-2 transition-all duration-200 ${
                            selectedModel === 'B' 
                              ? 'border-green-300 bg-green-50 hover:bg-green-100 hover:border-green-500' 
                              : 'border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-500'
                          }`}
                        >
                          <p className={`font-bold text-lg ${selectedModel === 'B' ? 'text-green-700' : 'text-orange-700'}`}>내경 {size.innerDiameter}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}


          </div>
        )}

        {/* STEP 3: 용량 선택 */}
        {showStep3 && (
          <div ref={step3Ref} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
            <div className="px-4 pt-4 pb-3 border-b border-gray-50">
              <span className="text-sm font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                STEP {getStepNumber()}
              </span>
              <h2 className="text-base font-bold text-gray-900 mt-1.5">사이즈를 선택하세요</h2>
            </div>

            {/* 내경 측정 가이드 */}
            <div className="mx-4 mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-sm font-bold text-amber-700 mb-2">📏 올바른 고무패킹 측정방법</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white rounded-lg p-2 border border-green-200">
                  <p className="font-bold text-green-600">✅ 올바른 측정</p>
                  <p className="text-gray-600 mt-0.5 text-[11px]">고무패킹 안쪽과 안쪽 지름을 계측</p>
                  <img 
                    src={measureGuide.correct} 
                    alt="고무패킹 내경 측정 방법" 
                    className="w-full mt-2 rounded" 
                  />
                </div>
                <div className="bg-white rounded-lg p-2 border border-red-200">
                  <p className="font-bold text-red-500">❌ 잘못된 측정</p>
                  <p className="text-gray-600 mt-0.5 text-[11px]">고무패킹 바깥쪽과 바깥쪽 지름을 계측</p>
                  <img 
                    src={measureGuide.incorrect} 
                    alt="잘못된 측정 방법" 
                    className="w-full mt-2 rounded" 
                  />
                </div>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {(() => {
                const dataKey = selectedBrand === 'fissler' ? `${selectedBrand}-${selectedModel}` : selectedBrand!;
                return (SIZE_DATA[dataKey] || [])
                  .filter(size => !(selectedModel === 'B' && size.innerDiameter === '26cm'))
                  .map((size, index) => {
                    const isSelected = selectedSize?.volume === size.volume;
                    return (
                      <button
                        key={index}
                        id={`size-${size.volume.replace(/\s/g, '-')}`}
                        onClick={() => handleSizeSelect(size)}
                        className={`
                          w-full rounded-xl px-4 py-4 text-center transition-all duration-200 border-2
                          ${isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30'
                          }
                        `}
                      >
                        <p className="text-base font-bold text-gray-900">내경 {size.innerDiameter}</p>
                      </button>
                    );
                  });
              })()}
            </div>
          </div>
        )}

        {/* 결과 카드 */}
        {showResult && selectedBrand && (
          <div ref={resultRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
            <div className="bg-blue-500 px-4 py-4">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {brandData?.name}
                </span>
                {selectedModel && (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                    ${modelData?.color === 'orange' ? 'bg-orange-300/30 text-white' : 'bg-green-300/30 text-white'}
                  `}>
                    {modelData?.name}
                  </span>
                )}
              </div>
              <h3 className="text-white font-bold text-lg mt-2">
                {brandData?.name} {selectedModel ? `${modelData?.name} ` : ''}전용 호환 패킹
                {lidCapData ? ` + ${lidCapData.label}` : ''}
              </h3>
              <p className="text-blue-50 text-sm mt-1 font-medium bg-white/20 px-2 py-0.5 rounded inline-block">아래 규격의 패킹을 구매하시면 정확히 맞습니다.</p>
            </div>

            <div className="p-4 space-y-3">
              {/* 규격 테이블 */}
              <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-500 text-sm w-1/2 font-medium">내경 (안지름)</td>
                      <td className="px-3 py-2.5 font-bold text-gray-900">{selectedSize?.innerDiameter} ({selectedSize?.innerDiameterMm})</td>
                    </tr>

                    {selectedModel && (
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 text-gray-500 text-sm font-medium">모델</td>
                        <td className="px-3 py-2.5 font-bold text-gray-900">{modelData?.name}</td>
                      </tr>
                    )}
                    {lidCapData && (
                      <tr>
                        <td className="px-4 py-3 text-gray-500 text-sm font-medium">뚜껑캡</td>
                        <td className="px-3 py-2.5 font-bold text-gray-900">{lidCapData.label} ({lidCapData.subtitle})</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* 경고 박스 */}
              {(selectedSize?.warning || modelData?.warning) && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-3">
                  <p className="text-sm font-bold text-orange-800 mb-1">⚠️ 주의사항</p>
                  <p className="text-sm text-gray-900 font-bold leading-relaxed">
                    {selectedSize?.warning || modelData?.warning}
                  </p>
                </div>
              )}

              {/* 주문 섹션 */}
              <div className="space-y-2">
                <div className="block w-full bg-gray-100 text-gray-500 font-bold text-sm py-3.5 rounded-xl text-center">
                  이 패킹 주문하기
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <a
                    href={selectedSize?.links?.naver || (selectedBrand ? BRAND_PURCHASE_LINKS[selectedBrand].naver : "#")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#03C75A] hover:bg-[#02b350] text-white font-bold text-sm py-3 rounded-xl transition-colors"
                  >
                    네이버에서 주문하기
                  </a>
                  <a
                    href={selectedSize?.links?.coupang || (selectedBrand ? BRAND_PURCHASE_LINKS[selectedBrand].coupang : "#")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#E52528] hover:bg-[#d11e21] text-white font-bold text-sm py-3 rounded-xl transition-colors"
                  >
                    쿠팡에서 주문하기
                  </a>
                  <a
                    href={selectedSize?.links?.esLiving || (selectedBrand ? BRAND_PURCHASE_LINKS[selectedBrand].es_living : "#")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold text-sm py-3 rounded-xl transition-colors"
                  >
                    ES리빙 자사몰에서 주문하기
                  </a>
                </div>
              </div>

              {/* 상담 및 다시 선택 */}
              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <p className="text-sm font-bold text-gray-800 mb-2">💡 주문방법을 모르겠다면?</p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    <strong>[압력솥 뚜껑윗부분]</strong>과 <strong>[뚜껑지름]</strong> 계측해서<br />
                    <span className="text-blue-600 font-bold text-base">1877-6945</span>로 문자주시면<br />
                    알맞은 고무패킹 구매 링크를 보내드립니다.
                  </p>
                </div>
                
                <button
                  id="reset-button"
                  onClick={handleReset}
                  className="block w-full text-gray-400 font-medium text-xs hover:text-gray-600 transition-colors"
                >
                  ← 처음부터 다시 선택하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
