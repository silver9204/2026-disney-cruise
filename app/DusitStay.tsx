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
          <div><small>객실 1개 · 금연</small><strong>Deluxe Laguna Twin</strong><span>싱글침대 2개 · 조식 포함</span></div>
        </div>
        <ul className="swissotel-room-facts">
          <li><strong>체크인 15:00부터</strong> · 21:30–22:00 도착 예정으로 숙소에 전달</li>
          <li><strong>공항 인근 · 차량 이동 필요</strong> · {hotel.address}</li>
        </ul>
        <div className="swissotel-callout" role="note">
          <strong>답변 대기 · 4인 조식 포함 여부 / 추가 침구 요금</strong>
          <p>9/18 문의 전송 완료 · 추가 침구는 아직 요청하지 않음</p>
        </div>
        <div className="swissotel-links"><a href={hotel.confirmationUrl} target="_blank" rel="noreferrer">예약 원문 ↗</a><a href={hotel.propertyMessageUrl} target="_blank" rel="noreferrer">숙소 메시지 ↗</a><a href="https://www.dusit.com/dusitthani-laguna-singapore/" target="_blank" rel="noreferrer">호텔 공식 안내 ↗</a></div>
        <details className="hotel-research-archive">
          <summary>체크아웃·셔틀 등 이용 안내</summary>
          <ul className="swissotel-room-facts">
            <li><strong>체크아웃</strong> · 숙소 메시지 12:00 / 예약 화면 11:00로 안내가 다름</li>
            <li><strong>무료 셔틀</strong> · Changi City Point, Jewel 2층, Sands Expo(MBS) · 사전 등록 필요 · 1인당 짐 1개 · 출발 5분 전 도착</li>
            <li><strong>유료 공항 픽업</strong> · Mercedes E Class 편도 S$90++ · 최종 총액·적재 가능 여부 미확인 · 신청하지 않음</li>
          </ul>
          <p className="swissotel-note">현재 이동 계획은 택시이며 차량은 미예약입니다. 무료 셔틀은 T4·크루즈 터미널 직행 안내가 없습니다.</p>
        </details>
        <div className="swissotel-links" id="dusit-transport"><a href={directions("Changi Airport Terminal 4, Singapore", hotelDestination)} target="_blank" rel="noreferrer">T4 → 호텔 지도 ↗</a><a href={directions(hotelDestination, "Marina Bay Cruise Centre Singapore, 61 Marina Coastal Drive")} target="_blank" rel="noreferrer">호텔 → 크루즈 터미널 지도 ↗</a></div>
      </article>
    </div>
  );
}
