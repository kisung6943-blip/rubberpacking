import type { Metadata } from 'next';
import PackingGuide from '@/components/PackingGuide';

export const metadata: Metadata = {
  title: '압력밥솥 고무패킹 실수하지 않고 주문하는 방법 | 이에스리빙',
  description:
    '휘슬러, WMF, 타파웨어, 실리트 압력밥솥 고무패킹을 브랜드 → 모델 → 사이즈 순서로 정확하게 찾아드립니다. 오주문 없이 딱 맞는 패킹을 선택하세요.',
};

export default function Home() {
  return <PackingGuide />;
}
