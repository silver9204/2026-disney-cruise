import { flightPayments, airfareTotal, seatTotal, flightPaidTotal, won } from "./flightPayments";
import { cruisePayments, cruisePaidCents, cruisePaymentStatementUrl, usd } from "./cruisePayments";
import { hotelBooking as hotel } from "./hotelBooking";

export default function TravelExpenses() {
  return (
    <section className="section expense-section" id="expenses">
      <div className="section-heading">
        <span className="kicker">TRAVEL EXPENSES</span>
        <h2>여행 경비 <em>결제 현황</em></h2>
        <p>항공 · 크루즈 · 숙박 · 교통 및 선택 비용</p>
      </div>
      <div className="expense-summary">
        <article><span>항공 · 4인 왕복 + 귀국 좌석</span><strong>{won(flightPaidTotal)}</strong><small>2026.09.13 결제 완료</small></article>
        <article><span>크루즈 · 4박</span><strong>{usd(cruisePaidCents)}</strong><small>전액 결제 완료 · 잔액 0</small></article>
        <article><span>숙박 · 두짓타니 1박</span><strong>{won(hotel.paid)}</strong><small>2026.09.17 결제 완료 · 세금 포함</small></article>
      </div>
      <details className="expense-category">
        <summary>항공 상세 · {won(flightPaidTotal)}</summary>
        <p>항공권 {won(airfareTotal)} + 귀국 좌석 {won(seatTotal)}</p>
        <div className="expense-table-wrap"><table className="expense-table">
          <caption>4인 항공 결제 내역 · KRW</caption>
          <thead><tr><th scope="col">구분</th><th scope="col">항공권</th><th scope="col">좌석</th><th scope="col">합계</th><th scope="col">증빙</th></tr></thead>
          <tbody>{flightPayments.map((item) => <tr key={item.label}><th scope="row">{item.label}</th><td>{won(item.airfare)}</td><td>{won(item.seatFee)}</td><td>{won(item.airfare + item.seatFee)}</td><td><a href={item.receiptUrl} target="_blank" rel="noreferrer">항공권 ↗</a><a href={item.seatReceiptUrl} target="_blank" rel="noreferrer">좌석 ↗</a></td></tr>)}</tbody>
        </table></div>
      </details>
      <details className="expense-category">
        <summary>크루즈 상세 · {usd(cruisePaidCents)}</summary>
        <div className="expense-table-wrap"><table className="expense-table">
          <caption>예약금·잔금 납부 내역 · USD</caption>
          <thead><tr><th scope="col">결제일</th><th scope="col">구분</th><th scope="col">금액</th></tr></thead>
          <tbody>{cruisePayments.map((item) => <tr key={item.label}><th scope="row">{item.date}</th><td>{item.label}</td><td>{usd(item.amountCents)}</td></tr>)}</tbody>
        </table></div>
        <p><a href={cruisePaymentStatementUrl} target="_blank" rel="noreferrer">최종 결제내역서 ↗</a></p>
      </details>
      <details className="expense-category">
        <summary>숙박 상세 · {won(hotel.paid)}</summary>
        <p>두짓타니 라구나 · 12/30–31 · 객실료 {won(hotel.roomCharge)} + 세금 {won(hotel.tax)} · 환불 불가</p>
        <a href={hotel.confirmationUrl} target="_blank" rel="noreferrer">예약·결제 원문 ↗</a>
      </details>
      <div className="expense-pending">
        <h3>교통·선택 비용 <small>미예약 · 합계 제외</small></h3>
        <ul><li>호텔 → 크루즈 터미널: Grab 또는 대형 차량 · 견적 확인 후 예약</li><li>아동 조식: 2명 1회 합계 S$35++ · 호텔 안내 기준, 10세·8세 적용 요금 재확인 필요</li><li>추가 침대: 1박 S$90++ · 선택 사항, 신청하지 않음</li></ul>
        <p>++는 세금·수수료 별도 표기입니다. 위 금액은 추가 결제한 내역이 아닙니다.</p>
      </div>
      <p className="expense-footnote">결제 합계: {won(flightPaidTotal + hotel.paid)} + {usd(cruisePaidCents)}. 크루즈는 완납했으며, 영수증 통화인 USD로 표시했습니다. 실제 카드 원화 청구액을 확인하기 전에는 임의 환산해 합산하지 않습니다.</p>
    </section>
  );
}
