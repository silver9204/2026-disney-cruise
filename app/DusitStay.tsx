import { hotelBooking as hotel } from "./hotelBooking";
import { won } from "./flightPayments";

const directions = (origin: string, destination: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
const hotelDestination = `${hotel.name}, ${hotel.address}`;

export default function DusitStay() {
  return (
    <div className="swissotel-plan" id="booked-hotel">
      <article className="swissotel-stay" aria-labelledby="dusit-title">
        <div className="swissotel-stay-heading">
          <div><span className="kicker">CONFIRMED · CHANGI / LAGUNA</span><h3 id="dusit-title">{hotel.name}</h3><p>{hotel.koreanName}</p></div>
          <span className="swissotel-budget">결제 완료 · 환불 불가</span>
        </div>
        <p><strong>2026.12.30 → 12.31 · 1박 · 성인 2명 + 아동 2명</strong></p>
        <div className="swissotel-rate-grid">
          <div className="recommended"><small>세금 포함 결제액</small><strong>{won(hotel.paid)}</strong><span>{hotel.paidDate} · Hotels.com</span></div>
          <div><small>객실 1개 · 금연</small><strong>Deluxe Laguna Twin</strong><span>싱글침대 2개 · 성인 2명 조식 포함</span></div>
        </div>
        <ul className="swissotel-room-facts">
          <li><strong>체크인 15:00부터</strong> · 21:30–22:00 도착 예정으로 숙소에 전달</li>
          <li><strong>공항 인근 · 차량 이동 필요</strong> · {hotel.address}</li>
        </ul>
        <div className="swissotel-callout" role="note">
          <strong>9/19 숙소 답변 · 조식·추가 침대</strong>
          <ul><li>조식은 성인 2명만 포함. 아동은 1인 1회 S$17.50++.</li><li>추가 침대는 1박 S$90++. 조식 추가·침대 모두 신청하지 않음.</li></ul>
          <p><strong>호텔 답변 재확인 필요:</strong> 예약 화면은 성인 2명·아동 2명이며, 9/18 메시지에도 체크인 기준 10세·8세를 전달했습니다. 호텔의 9/19 답변은 ‘2세’로 기재되어 있어 아동 나이와 조식 요금의 재확인이 필요합니다. 불일치 원인은 아직 확인되지 않았습니다.</p>
        </div>
        <div className="swissotel-links"><a href={hotel.confirmationUrl} target="_blank" rel="noreferrer">예약 원문 ↗</a><a href={hotel.propertyMessageUrl} target="_blank" rel="noreferrer">숙소 메시지 ↗</a><a href="https://www.dusit.com/dusitthani-laguna-singapore/" target="_blank" rel="noreferrer">호텔 공식 안내 ↗</a></div>
        <p className="swissotel-note">체크아웃: 숙소 메시지 12:00 / 예약 화면 11:00로 안내가 다름 · ++는 세금·수수료 별도</p>
      </article>
      <article className="swissotel-stay" id="dusit-transport" aria-labelledby="port-transfer-title">
        <span className="kicker">12/31 · HOTEL → CRUISE</span>
        <h3 id="port-transfer-title">체크아웃 후 크루즈 터미널로</h3>
        <p><strong>두짓타니 로비 → Marina Bay Cruise Centre Singapore</strong><br />61 Marina Coastal Drive · Marina Bay Sands와 다른 장소</p>
        <div className="swissotel-transfer-grid">
          <article><h4>Grab · 앱에서 호출</h4><p>성인 2명 + 아동 2명과 캐리어가 실리는 차량 선택. 짐이 많으면 앱의 대형 차량 옵션을 비교하고 기사에게 적재 가능 여부를 확인합니다.</p><p>요금은 예약 화면 기준 · 통행료·할증 별도 여부 확인</p></article>
          <article><h4>대형 차량 · 사전 예약</h4><p>짐이 많거나 출발 시간을 정해두려면 CDG Zig의 6/7-Seater Limo 또는 호텔 컨시어지를 통해 견적을 확인합니다.</p><p>인원·캐리어 크기와 개수를 전달하고 차량 크기·총액·취소 조건 확인</p></article>
        </div>
        <p className="swissotel-note">이동 약 25–35분은 계획용 추정치입니다. 배정된 항구 도착 시간(PAT) 약 60분 전부터 체크아웃·배차·짐 싣기를 준비하고, 당일 교통 상황에 맞춰 조정하세요. 차량은 아직 예약하지 않았습니다.</p>
        <details className="hotel-research-archive"><summary>차량 선택 시 확인할 사항</summary><ul><li>6인승이라도 캐리어 적재량은 차종과 접는 좌석 수에 따라 달라집니다.</li><li>아이 키가 135cm 미만이면 일반 Grab 차량 대신 적합한 부스터·안전장치가 있는 옵션을 확인하세요.</li><li>PAT가 체크아웃보다 늦다면 짐 보관 가능 여부를 프런트에 문의하세요.</li></ul></details>
        <div className="swissotel-links"><a href={directions(hotelDestination, "Marina Bay Cruise Centre Singapore, 61 Marina Coastal Drive")} target="_blank" rel="noreferrer">호텔 → 터미널 지도 ↗</a><a href="https://transport.grab.com/sg/" target="_blank" rel="noreferrer">Grab 안내 ↗</a><a href="https://www.cdgtaxi.com.sg/6-seater/" target="_blank" rel="noreferrer">CDG 대형 차량 안내 ↗</a></div>
      </article>
    </div>
  );
}
