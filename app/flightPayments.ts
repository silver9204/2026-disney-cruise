// Issued 2026-09-13. Source PDFs remain in Google Drive with their existing access controls.
// Ticket and payment receipt describe the same fare: count only the receipt once.
export const flightPayments = [
  {
    "label": "성인 1",
    "airfare": 1164300,
    "seatFee": 40400,
    "ticketUrl": "https://drive.google.com/file/d/1O_g17U_6RcOZuZiEzdpABx_4apGic8iF/view?usp=drivesdk",
    "receiptUrl": "https://drive.google.com/file/d/16cUqcWCuEOZeK6B0Cud7fX896w1ssGQu/view?usp=drivesdk",
    "seatReceiptUrl": "https://drive.google.com/file/d/1Dq5dxMI-9mV_tVFEROJpqXQpX1zY0Sq7/view?usp=drivesdk"
  },
  {
    "label": "성인 2",
    "airfare": 1164300,
    "seatFee": 40400,
    "ticketUrl": "https://drive.google.com/file/d/1w3E5DvoMnaWY8idnqvvzbicdaoagyD-X/view?usp=drivesdk",
    "receiptUrl": "https://drive.google.com/file/d/1WfhvaB-M9_omJBsCGUocxGdQN-kqBAmK/view?usp=drivesdk",
    "seatReceiptUrl": "https://drive.google.com/file/d/1LfiTsprFr-gbGcJ_8WsqK4pA2-WJ_xlK/view?usp=drivesdk"
  },
  {
    "label": "어린이 1",
    "airfare": 966100,
    "seatFee": 40400,
    "ticketUrl": "https://drive.google.com/file/d/12y7BXPqeLXWZWicwXVKu67iqdxR3vAFL/view?usp=drivesdk",
    "receiptUrl": "https://drive.google.com/file/d/143yG8F_pBROVZ4oUbam4wDSX9yzVvkTj/view?usp=drivesdk",
    "seatReceiptUrl": "https://drive.google.com/file/d/1OyeUFWEGMxR6PgRtkpT1qo4WaGFEeiR4/view?usp=drivesdk"
  },
  {
    "label": "어린이 2",
    "airfare": 966100,
    "seatFee": 40400,
    "ticketUrl": "https://drive.google.com/file/d/1UzdcojBkEZL4WsgmeSnGX7DIlJJnVcZQ/view?usp=drivesdk",
    "receiptUrl": "https://drive.google.com/file/d/14LLltHpmpt5Dc-oQJ_52s3hdp6ap2dT8/view?usp=drivesdk",
    "seatReceiptUrl": "https://drive.google.com/file/d/1dI59zb1y569EwDeUPetqDpEBqIoB-FcF/view?usp=drivesdk"
  }
];

export const airfareTotal = flightPayments.reduce((sum, item) => sum + item.airfare, 0);
export const seatTotal = flightPayments.reduce((sum, item) => sum + item.seatFee, 0);
export const flightPaidTotal = airfareTotal + seatTotal;
export const won = (amount: number) => `₩${amount.toLocaleString("ko-KR")}`;

