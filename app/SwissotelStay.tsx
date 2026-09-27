const hotelsUrl = "https://kr.hotels.com/ho105303/?chkin=2026-12-30&chkout=2026-12-31&rm1=a2%3Ac8%3Ac10&currency=KRW";
const airportGuide = "https://www.changiairport.com/en/at-changi/transport-and-directions/leaving-the-airport.html";
const directions = (origin: string, destination: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
const hotelAddress = "Swissotel The Stamford, 2 Stamford Road, Singapore 178882";

export default function SwissotelStay() {
  return (
    <div className="swissotel-plan">
      <article className="swissotel-stay" aria-labelledby="swissotel-title">
        <div className="swissotel-stay-heading">
          <div><span className="kicker">CITY HALL · MARINA BAY 도보권</span><h3 id="swissotel-title">Swissôtel The Stamford</h3><p>스위소텔 더 스탬퍼드 · 예약 전 후보</p></div>
          <span className="swissotel-budget">1박 총액 70만 원 이하</span>
        </div>
        <p>2026.12.30 체크인 → 12.31 체크아웃 · 성인 2명 + 어린이 2명(8·10세) · 객실 1개. 마리나 베이 수변 바로 앞은 아닌 시티홀 지역으로, 에스플러네이드까지 도보 8–10분입니다.</p>
        <div className="swissotel-rate-grid">
          <div className="recommended"><small>무료취소 요금 · 추천</small><strong>₩679,195</strong><span>12/28 전 취소 가능 · 나중에 결제</span></div>
          <div><small>환불 불가 요금</small><strong>₩640,678</strong><span>무료취소 요금과 차이 ₩38,517</span></div>
        </div>
        <ul className="swissotel-room-facts">
          <li><strong>프리미어 더블</strong> · 40㎡ · 더블베드 2개 · 최대 4인</li>
          <li><strong>발코니 + 시티뷰</strong> · 마리나 베이 전망 객실이 아님</li>
          <li><strong>조식 불포함</strong> · 체크인 15:00 / 체크아웃 12:00</li>
          <li><strong>2 Stamford Road, Singapore 178882</strong> · 택시 목적지는 Fairmont가 아닌 Swissôtel The Stamford</li>
        </ul>
        <p className="swissotel-note">2026.09.16 Hotels.com 비로그인 조회 · 두 요금 모두 세금·수수료 포함 1박 총액. 재고와 가격은 변동되며, 취소 마감의 정확한 시각·현지 시간 기준은 예약 화면에서 확인하세요. 숙박비는 아직 지출 내역에 합산하지 않았습니다.</p>
        <div className="swissotel-links"><a href={hotelsUrl} target="_blank" rel="noreferrer">Hotels.com 날짜·인원으로 확인 ↗</a><a href="https://www.swissotelthestamford.com/" target="_blank" rel="noreferrer">호텔 공식 안내 ↗</a><a href="https://www.swissotelthestamford.com/places/esplanade-theatres-on-the-bay/" target="_blank" rel="noreferrer">수변 도보 거리 ↗</a></div>
      </article>

      <div className="swissotel-transfer-grid" id="swissotel-transport">
        <article>
          <span className="kicker">12/30 · AIRPORT → HOTEL</span>
          <h3>밤 9시 이후에도 T4에서 바로 택시</h3>
          <p><strong>20:25 도착 → 입국·짐 찾기 → T4 도착층 Taxi 표지 → 호텔.</strong> 21시 이후 출발을 예상하되 입국·수하물 처리 시간은 달라질 수 있습니다. Jewel이나 다른 터미널로 이동할 필요가 없습니다.</p>
          <ul>
            <li><strong>24시간 운행:</strong> 공항 택시와 차량호출 모두 이용 가능. 실제 대기시간은 항공편 도착 집중·날씨·차량 크기에 따라 달라집니다.</li>
            <li><strong>택시 요금:</strong> 17:00–23:59 공항 할증 S$8 + 미터 요금의 25% 피크 할증. 00:00–05:59에는 공항 할증 S$6 + 미터 요금의 50% 심야 할증으로 바뀝니다. 예약·결제 방식 등에 따른 추가요금은 별도입니다.</li>
            <li><strong>차량 이동 약 20–30분:</strong> 호텔 공식 안내 기준이며 택시 대기시간은 제외. 일반 택시는 계획용으로 S$40–60을 잡고, 실제 미터 또는 앱 견적을 확인합니다.</li>
            <li><strong>Grab 등 앱 호출:</strong> 배차 후 앱에 표시된 T4 Arrival / Ride-Hailing 픽업 지점으로 이동. 일반 택시 줄과 혼동하지 않도록 확인하세요.</li>
          </ul>
          <div className="swissotel-callout"><strong>가족 4명 + 캐리어는 차량 크기부터</strong><p>짐이 많으면 일반 세단에 모두 싣지 못할 수 있습니다. T4 도착층 안내데스크 옆 24시간 Ground Transport Concierge에서 6인승 차량을 문의할 수 있으며, 공식 안내 가격은 편도 S$75입니다. 좌석 수가 짐 공간을 보장하지는 않으므로 캐리어 개수·크기도 알려주세요.</p></div>
          <div className="swissotel-links"><a href={airportGuide} target="_blank" rel="noreferrer">창이공항 공식 교통·요금 ↗</a><a href="https://www.swissotelthestamford.com/location/" target="_blank" rel="noreferrer">호텔 위치·차량 진입 ↗</a><a href={directions("Changi Airport Terminal 4, Singapore", hotelAddress)} target="_blank" rel="noreferrer">T4 → 호텔 Google Maps ↗</a></div>
        </article>
        <article>
          <span className="kicker">12/31 · HOTEL → CRUISE</span>
          <h3>다음 날은 호텔 로비에서 항구로</h3>
          <p><strong>Marina Bay Cruise Centre Singapore</strong><br />61 Marina Coastal Drive, Singapore 018947</p>
          <p>호텔에 택시를 요청하거나 앱으로 차량을 호출합니다. 이동은 약 15–25분, 일반 택시 S$15–25를 계획용 추정치로 잡되 교통·차종·할증에 따라 달라집니다. 배차와 짐 싣기 시간은 별도로 여유를 두세요.</p>
          <ol>
            <li><strong>아침:</strong> 식사 후 여유가 있으면 에스플러네이드 산책. 조식은 객실 요금에 포함되지 않습니다.</li>
            <li><strong>체크아웃:</strong> 배정받은 PAT 약 45–60분 전부터 체크아웃과 차량 준비를 시작합니다.</li>
            <li><strong>항구 도착:</strong> 12시 전후는 목표일 뿐, 실제로는 온라인 체크인에서 배정받은 Port Arrival Time에 맞춥니다. 항구 체크인과 실제 승선은 별도입니다.</li>
          </ol>
          <div className="swissotel-callout"><strong>목적지 이름을 끝까지 확인</strong><p>Marina Bay Sands나 Marina South Pier가 아닌 <b>Marina Bay Cruise Centre</b>입니다. 스위소텔 출발 디즈니 셔틀은 확정하지 않았으며, 이 계획은 개별 택시·차량호출 기준입니다.</p></div>
          <div className="swissotel-links"><a href={directions(hotelAddress, "Marina Bay Cruise Centre Singapore, 61 Marina Coastal Drive")} target="_blank" rel="noreferrer">호텔 → 항구 Google Maps ↗</a><a href="https://disneycruise.disney.go.com/en-ca/guest-services/departure-port-address-parking/" target="_blank" rel="noreferrer">디즈니 공식 항구 안내 ↗</a><a href="https://disneycruise.disney.go.com/en/faq/preparing-for-cruise/boarding-time/" target="_blank" rel="noreferrer">PAT·승선 안내 ↗</a></div>
        </article>
      </div>
      <p className="swissotel-note">교통 안내 확인: 2026.09.16 · 차량 요금은 싱가포르달러(S$). 예상 이동시간·일반 택시 예산은 확정 견적이 아닙니다. 늦은 도착 예정 시 호텔에 도착 시간을 미리 알리고, 출발 전 운영·할증을 다시 확인하세요.</p>
    </div>
  );
}
