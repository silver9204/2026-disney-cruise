"use client";

import { useEffect, useMemo, useState } from "react";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${publicBasePath}${path}`;

const itinerary = [
  { date: "12.31", day: "THU", place: "Singapore", detail: "승선 · 16:00 출항", kind: "port" },
  { date: "01.01", day: "FRI", place: "New Year at Sea", detail: "전일 해상", kind: "sea" },
  { date: "01.02", day: "SAT", place: "Day at Sea", detail: "전일 해상", kind: "sea" },
  { date: "01.03", day: "SUN", place: "Day at Sea", detail: "전일 해상", kind: "sea" },
  { date: "01.04", day: "MON", place: "Singapore", detail: "07:00 입항", kind: "port" },
];

const gallery = [
  { src: "/images/room-actual-wide.jpg", alt: "Disney Adventure Reef View 객실의 침대와 리빙 공간", label: "침대와 리빙 공간", kind: "ROOM PHOTO", note: "Disney Adventure Reef View 객실 참고 · 15150호와 전망·테마는 다를 수 있음", sourceUrl: "https://wdwnt.com/2026/03/tour-deluxe-reef-view-stateroom-with-verandah-disney-adventure/" },
  { src: "/images/room-actual-entry.jpg", alt: "Disney Adventure 실제 객실의 입구와 분리형 욕실 문", label: "입구와 수납", kind: "ACTUAL PHOTO", note: "입구에서 본 수납장과 분리형 욕실 배치", sourceUrl: "https://wdwnt.com/2026/03/tour-deluxe-reef-view-stateroom-with-verandah-disney-adventure/" },
  { src: "/images/room-actual-shower.jpg", alt: "Disney Adventure 실제 객실 샤워 부스", label: "샤워 부스", kind: "ACTUAL PHOTO", note: "핸드 샤워와 벽걸이 어메니티 구성", sourceUrl: "https://wdwnt.com/2026/03/tour-deluxe-reef-view-stateroom-with-verandah-disney-adventure/" },
  { src: "/images/room-actual-vanity.jpg", alt: "Disney Adventure 실제 객실 세면대와 화장실", label: "세면대와 화장실", kind: "ACTUAL PHOTO", note: "샤워실과 분리된 두 번째 욕실 공간", sourceUrl: "https://wdwnt.com/2026/03/tour-deluxe-reef-view-stateroom-with-verandah-disney-adventure/" },
  { src: "/images/room-actual-coffee.jpg", alt: "Disney Adventure 실제 객실의 커피와 전기 주전자", label: "커피 스테이션", kind: "ACTUAL PHOTO", note: "전기 주전자·컵·티백이 놓인 객실 수납 코너", sourceUrl: "https://wdwnt.com/2026/03/tour-deluxe-reef-view-stateroom-with-verandah-disney-adventure/" },
  { src: "/images/room-actual-sofa.jpg", alt: "Disney Adventure 실제 객실의 인어공주 아트워크", label: "객실 아트워크", kind: "ACTUAL PHOTO", note: "The Little Mermaid 테마의 실제 객실 디테일", sourceUrl: "https://wdwnt.com/2026/03/tour-deluxe-reef-view-stateroom-with-verandah-disney-adventure/" },
  { src: "/images/room-actual-desk.jpg", alt: "Disney Adventure 실제 객실의 상부 풀다운 베드", label: "상부 풀다운 베드", kind: "ACTUAL PHOTO", note: "천장에서 내려오는 추가 침대 구조 참고", sourceUrl: "https://wdwnt.com/2026/03/tour-deluxe-reef-view-stateroom-with-verandah-disney-adventure/" },
  { src: "/images/room-main.jpg", alt: "디즈니 어드벤처 베란다 객실의 침대와 발코니", label: "침실 & 베란다", kind: "ROOM PHOTO", note: "침대에서 발코니까지 이어지는 객실 구조 참고", sourceUrl: "" },
  { src: "/images/room-sitting.jpg", alt: "디즈니 어드벤처 베란다 객실의 소파 공간", label: "리빙 공간", kind: "ROOM PHOTO", note: "소파베드와 수납 공간의 배치 참고", sourceUrl: "" },
  { src: "/images/room-bathroom.jpg", alt: "디즈니 어드벤처 객실의 분리형 욕실", label: "분리형 욕실", kind: "ROOM PHOTO", note: "샤워실과 화장실이 나뉜 욕실 구조 참고", sourceUrl: "" },
];

const hotelMapOptions = [
  {
    name: "Conrad Singapore Orchard",
    short: "Conrad Orchard",
    address: "1 Cuscaden Road, Singapore 249715",
    airportTime: "25–30분",
    portTime: "15–20분",
    lat: 1.3048,
    lng: 103.8239,
    hotels: "https://kr.hotels.com/ho3077871584/konlaedeu-sing-gapoleu-ochadeu-sing-gapoleu-sing-gapoleu/?chkin=2026-12-30&chkout=2026-12-31&rm1=a2%3Ac8%3Ac10&currency=KRW",
  },
  {
    name: "The Westin Singapore",
    short: "Westin",
    address: "12 Marina View, Singapore 018961",
    airportTime: "20–25분",
    portTime: "5–10분",
    lat: 1.2785,
    lng: 103.8504,
    hotels: "https://kr.hotels.com/ho440637/deo-weseutin-sing-gapoleu-sg-clean-sing-gapoleu-sing-gapoleu/?chkin=2026-12-30&chkout=2026-12-31&rm1=a2%3Ac8%3Ac10&currency=KRW",
  },
  {
    name: "The St. Regis Singapore",
    short: "St. Regis",
    address: "29 Tanglin Road, Singapore 247911",
    airportTime: "25–30분",
    portTime: "15–20분",
    lat: 1.3059,
    lng: 103.8257,
    hotels: "https://kr.hotels.com/ho260530/deo-seinteu-lejiseu-sing-gapoleu-sg-clean-sing-gapoleu-sing-gapoleu/?chkin=2026-12-30&chkout=2026-12-31&rm1=a2%3Ac8%3Ac10&currency=KRW",
  },
  {
    name: "Four Seasons Hotel Singapore",
    short: "Four Seasons",
    address: "190 Orchard Boulevard, Singapore 248646",
    airportTime: "25–30분",
    portTime: "15–20분",
    lat: 1.3055,
    lng: 103.8279,
    hotels: "https://kr.hotels.com/ho133982/po-sijeunseu-hotel-sing-gapoleu-sg-clean-sing-gapoleu-sing-gapoleu/?chkin=2026-12-30&chkout=2026-12-31&rm1=a2%3Ac8%3Ac10&currency=KRW",
  },
];

const valueHotels = [
  {
    name: "Pan Pacific Singapore",
    area: "MARINA BAY · PROMENADE",
    image: "/images/hotel-pan-pacific.jpg",
    badge: "동선 추천",
    price: "₩1,087,451",
    total: "₩1,303,854",
    score: "9.4 / 10",
    mrt: "Promenade MRT 도보 3분",
    port: "터미널 택시 약 10–15분",
    note: "마리나 베이 관광과 승선일 이동을 함께 잡기 좋은 시내형 5성급.",
    official: "https://www.panpacific.com/en/hotels-and-resorts/pp-marina/rooms.html",
    hotels: "https://kr.hotels.com/ho126334/paen-peosipig-sing-gapoleu-sg-clean-sing-gapoleu-sing-gapoleu/?chkin=2026-12-30&chkout=2026-12-31&rm1=a2%3Ac8%3Ac10&currency=KRW",
  },
  {
    name: "QT Singapore",
    area: "CBD · ROBINSON ROAD",
    image: "/images/hotel-qt.jpg",
    badge: "부티크",
    price: "₩961,284",
    total: "₩1,152,579",
    score: "9.4 / 10",
    mrt: "Telok Ayer MRT 도보 3분",
    port: "터미널 택시 약 5–10분",
    note: "Lau Pa Sat 옆의 감각적인 부티크 호텔. 크루즈 터미널과 가장 가까운 축에 속합니다.",
    official: "https://www.qthotels.com/singapore/",
    hotels: "https://kr.hotels.com/ho438184/so-sing-gapoleu-sing-gapoleu-sing-gapoleu/?chkin=2026-12-30&chkout=2026-12-31&rm1=a2%3Ac8%3Ac10&currency=KRW",
  },
  {
    name: "Goodwood Park Hotel",
    area: "ORCHARD · SCOTTS ROAD",
    image: "/images/hotel-goodwood.jpg",
    badge: "헤리티지",
    price: "₩908,622",
    total: "₩1,089,438",
    score: "9.0 / 10",
    mrt: "Orchard MRT 도보 7분",
    port: "터미널 택시 약 15–20분",
    note: "두 개의 수영장과 식민지풍 건물이 강점인 오차드 헤리티지 호텔. 조용히 쉬는 하루에 잘 맞습니다.",
    official: "https://www.goodwoodparkhotel.com/rooms-suites",
    hotels: "https://kr.hotels.com/ho115869/gus-udeu-pakeu-hotel-sg-clean-sing-gapoleu-sing-gapoleu/?chkin=2026-12-30&chkout=2026-12-31&rm1=a2%3Ac8%3Ac10&currency=KRW",
  },
  {
    name: "Fairmont Singapore",
    area: "CIVIC DISTRICT · CITY HALL",
    image: "/images/fairmont-family.jpg",
    badge: "균형 추천",
    price: "₩858,021",
    total: "₩1,028,767",
    score: "9.4 / 10",
    mrt: "Esplanade MRT 도보 2분",
    port: "터미널 택시 약 10–15분",
    note: "Raffles City와 연결돼 식사·쇼핑·관광이 편합니다. 하루 시내 일정의 균형이 가장 좋습니다.",
    official: "https://www.fairmont-singapore.com/rooms-suites/",
    hotels: "https://kr.hotels.com/ho105367/peeomonteu-sing-gapoleu-sg-clean-sing-gapoleu-sing-gapoleu/?chkin=2026-12-30&chkout=2026-12-31&rm1=a2%3Ac8%3Ac10&currency=KRW",
  },
  {
    name: "JEN Singapore Orchardgateway",
    area: "ORCHARD · SOMERSET",
    image: "/images/hotel-jen-orchard.jpg",
    badge: "쇼핑 추천",
    price: "₩837,094",
    total: "₩1,003,675",
    score: "9.4 / 10",
    mrt: "Somerset MRT 도보 1분",
    port: "터미널 택시 약 15–20분",
    note: "오차드 중심과 바로 연결되고 루프톱 풀이 강점. 관광 비중이 큰 전박에 잘 맞습니다.",
    official: "https://www.shangri-la.com/singapore/jenshingaporeorchardgateway/rooms-suites/",
    hotels: "https://kr.hotels.com/ho474747/jen-sing-gapoleu-ochadeugeiteuwei-bai-syang-geulilla-sg-clean-sing-gapoleu-sing-gapoleu/?chkin=2026-12-30&chkout=2026-12-31&rm1=a2%3Ac8%3Ac10&currency=KRW",
  },
  {
    name: "The Capitol Kempinski Singapore",
    area: "CIVIC DISTRICT · CITY HALL",
    image: "/images/hotel-kempinski.jpg",
    badge: "가격 추천",
    price: "₩789,732",
    total: "₩1,006,317",
    score: "9.2 / 10",
    mrt: "City Hall MRT 도보 3분",
    port: "터미널 택시 약 10–15분",
    note: "헤리티지 건물과 넓은 객실이 장점. 새 후보 중 객실료가 가장 낮으면서 시내 동선은 유지됩니다.",
    official: "https://www.kempinski.com/en/the-capitol-singapore/rooms-suites",
    hotels: "https://kr.hotels.com/ho528618/deo-kaepitol-kempinseuki-hotel-sing-gapoleu-sg-clean-sing-gapoleu-sing-gapoleu/?chkin=2026-12-30&chkout=2026-12-31&rm1=a2%3Ac8%3Ac10&currency=KRW",
  },
];

const hotelSlides: Record<string, { src: string; alt: string; label: string }[]> = {
  "The Westin Singapore": [
    { src: "/images/hotel-westin.jpg", alt: "The Westin Singapore 객실", label: "Guest Room" },
    { src: "/images/hotel-westin-2.jpg", alt: "The Westin Singapore 디럭스 객실", label: "Deluxe Room" },
    { src: "/images/hotel-westin-3.jpg", alt: "The Westin Singapore 대리석 욕실", label: "Marble Bathroom" },
    { src: "/images/hotel-westin-4.jpg", alt: "The Westin Singapore 스카이 로비 라운지", label: "Sky Lobby" },
    { src: "/images/hotel-westin-5.jpg", alt: "The Westin Singapore 인피니티 풀", label: "Infinity Pool" },
  ],
  "Pan Pacific Singapore": [
    { src: "/images/hotel-pan-pacific.jpg", alt: "Pan Pacific Singapore 객실", label: "Guest Room" },
    { src: "/images/hotel-pan-pacific-2.jpg", alt: "Pan Pacific Singapore Pacific Club 라운지", label: "Pacific Club" },
    { src: "/images/hotel-pan-pacific-3.jpg", alt: "Pan Pacific Singapore 수영장", label: "Outdoor Pool" },
    { src: "/images/hotel-pan-pacific-4.jpg", alt: "Pan Pacific Singapore 아트리움 라운지", label: "Atrium Lounge" },
    { src: "/images/hotel-pan-pacific-5.png", alt: "Pan Pacific Singapore 로비 아트리움", label: "Lobby Atrium" },
  ],
  "QT Singapore": [
    { src: "/images/hotel-qt.jpg", alt: "QT Singapore 객실", label: "Guest Room" },
    { src: "/images/hotel-qt-2.jpg", alt: "QT Singapore 헤리티지 외관", label: "Heritage Exterior" },
    { src: "/images/hotel-qt-3.webp", alt: "QT Singapore 야간 외관", label: "Night Exterior" },
    { src: "/images/hotel-qt-4.jpg", alt: "QT Singapore 루프톱 수영장", label: "Rooftop Pool" },
    { src: "/images/hotel-qt-5.jpg", alt: "QT Singapore 디자인 인테리어", label: "Design Interior" },
  ],
  "Fairmont Singapore": [
    { src: "/images/fairmont-family.jpg", alt: "Fairmont Singapore 객실", label: "Guest Room" },
    { src: "/images/hotel-fairmont-2.jpg", alt: "Fairmont Singapore 야외 수영장", label: "Outdoor Pool" },
    { src: "/images/hotel-fairmont-3.jpg", alt: "Fairmont Singapore 로비", label: "Main Lobby" },
    { src: "/images/hotel-fairmont-4.jpg", alt: "Fairmont Singapore 풀사이드", label: "Poolside" },
    { src: "/images/hotel-fairmont-5.jpg", alt: "Fairmont Singapore 노스 타워 로비", label: "North Tower Lobby" },
  ],
  "The Capitol Kempinski Singapore": [
    { src: "/images/hotel-kempinski.jpg", alt: "The Capitol Kempinski Singapore 객실", label: "Guest Room" },
    { src: "/images/hotel-kempinski-2.jpg", alt: "The Capitol Kempinski Singapore 헤리티지 외관", label: "Heritage Exterior" },
    { src: "/images/hotel-kempinski-3.jpg", alt: "The Capitol Kempinski Singapore 객실 내부", label: "Room Interior" },
    { src: "/images/hotel-kempinski-4.jpg", alt: "The Capitol Kempinski Singapore 라운지", label: "Lobby Lounge" },
    { src: "/images/hotel-kempinski-5.jpg", alt: "The Capitol Kempinski Singapore 이그제큐티브 스위트", label: "Executive Suite" },
  ],
  "Conrad Singapore Orchard": [
    { src: "/images/hotel-conrad-orchard.jpg", alt: "Conrad Singapore Orchard 객실", label: "Guest Room" },
    { src: "/images/hotel-conrad-orchard-2.jpg", alt: "Conrad Singapore Orchard 야외 수영장", label: "Outdoor Pool" },
    { src: "/images/hotel-conrad-orchard-3.jpg", alt: "Conrad Singapore Orchard 디럭스 객실", label: "Deluxe Room" },
    { src: "/images/hotel-conrad-orchard-4.jpg", alt: "Conrad Singapore Orchard 아트리움", label: "Atrium" },
    { src: "/images/hotel-conrad-orchard-5.jpg", alt: "Conrad Singapore Orchard 침실 전망", label: "Bedroom View" },
  ],
  "The St. Regis Singapore": [
    { src: "/images/hotel-st-regis.jpg", alt: "The St. Regis Singapore 객실", label: "Guest Room" },
    { src: "/images/hotel-st-regis-2.jpg", alt: "The St. Regis Singapore 트로피컬 풀", label: "Tropical Pool" },
    { src: "/images/hotel-st-regis-3.jpg", alt: "The St. Regis Singapore 그랜드 계단", label: "Grand Staircase" },
    { src: "/images/hotel-st-regis-4.jpg", alt: "The St. Regis Singapore 바", label: "St. Regis Bar" },
    { src: "/images/hotel-st-regis-5.jpg", alt: "The St. Regis Singapore 스위트 리빙룸", label: "Suite Living Room" },
  ],
  "Four Seasons Singapore": [
    { src: "/images/hotel-four-seasons.jpg", alt: "Four Seasons Singapore 객실", label: "Guest Room" },
    { src: "/images/hotel-four-seasons-2.jpg", alt: "Four Seasons Singapore 루프톱 수영장", label: "Rooftop Pool" },
    { src: "/images/hotel-four-seasons-3.jpg", alt: "Four Seasons Singapore 스파", label: "Spa" },
    { src: "/images/hotel-four-seasons-4.jpg", alt: "Four Seasons Singapore Jiang-Nan Chun", label: "Jiang-Nan Chun" },
    { src: "/images/hotel-four-seasons-5.jpg", alt: "Four Seasons Singapore 풀사이드", label: "Poolside" },
  ],
  "Goodwood Park Hotel": [
    { src: "/images/hotel-goodwood.jpg", alt: "Goodwood Park Hotel 객실", label: "Guest Room" },
    { src: "/images/hotel-goodwood-2.jpg", alt: "Goodwood Park Hotel 메인 수영장", label: "Main Pool" },
    { src: "/images/hotel-goodwood-3.jpg", alt: "Goodwood Park Hotel 가든 수영장", label: "Garden Pool" },
    { src: "/images/hotel-goodwood-4.jpg", alt: "Goodwood Park Hotel 헤리티지 외관", label: "Heritage Tower" },
    { src: "/images/hotel-goodwood-5.jpg", alt: "Goodwood Park Hotel 풀 코트야드", label: "Pool Courtyard" },
  ],
  "JEN Singapore Orchardgateway": [
    { src: "/images/hotel-jen-orchard.jpg", alt: "JEN Singapore Orchardgateway 객실", label: "Guest Room" },
    { src: "/images/hotel-jen-orchard-2.jpg", alt: "JEN Singapore Orchardgateway 디럭스 객실", label: "Deluxe Room" },
    { src: "/images/hotel-jen-orchard-3.jpg", alt: "JEN Singapore Orchardgateway 인피니티 풀", label: "Infinity Pool" },
    { src: "/images/hotel-jen-orchard-4.jpg", alt: "JEN Singapore Orchardgateway 선셋 풀", label: "Sunset Pool" },
    { src: "/images/hotel-jen-orchard-5.jpg", alt: "JEN Singapore Orchardgateway 루프톱", label: "Rooftop" },
  ],
};

const hotelGroups = [
  {
    id: "marina-cbd",
    name: "Marina Bay · CBD",
    korean: "마리나 베이 · 중심업무지구",
    summary: "선착장까지 가장 짧은 5–15분 축. 승선일 이동을 단순하게 만들고 싶을 때 우선합니다.",
    color: "#efb94f",
    point: { lat: 1.2828, lng: 103.854 },
    hotels: [
      {
        name: "The Westin Singapore", area: "MARINA BAY CBD · 5 STAR", image: "/images/hotel-westin.jpg", badge: "최단 동선",
        price: "₩1,309,612", total: "₩1,570,226", score: "9.2 / 10", mrt: "Shenton Way MRT 인접", port: "터미널 택시 약 5–10분",
        note: "기존 후보 중 승선 터미널 접근이 가장 짧고, 도심 이동도 편한 동선 우선형 호텔입니다.",
        official: "https://www.marriott.com/en-us/hotels/sinwi-the-westin-singapore/rooms/", hotels: hotelMapOptions[1].hotels,
      },
      valueHotels[0],
      valueHotels[1],
    ],
  },
  {
    id: "civic",
    name: "Civic District",
    korean: "시빅 디스트릭트 · 시티홀",
    summary: "마리나 베이 관광과 오차드 사이의 균형점. 짧은 전박에 걷기·식사·관광을 모두 넣기 좋습니다.",
    color: "#39aeb6",
    point: { lat: 1.2942, lng: 103.8514 },
    hotels: [valueHotels[3], valueHotels[5]],
  },
  {
    id: "orchard",
    name: "Orchard · Tanglin",
    korean: "오차드 · 탕린",
    summary: "선착장까지 15–20분으로 조금 더 멀지만, 쇼핑과 호텔 휴식에 가장 강한 구역입니다.",
    color: "#d97876",
    point: { lat: 1.3047, lng: 103.827 },
    hotels: [
      {
        name: "Conrad Singapore Orchard", area: "TANGLIN · ORCHARD · 5 STAR", image: "/images/hotel-conrad-orchard.jpg", badge: "여유형",
        price: "₩1,138,007", total: "₩1,364,471", score: "9.2 / 10", mrt: "Orchard Boulevard 인근", port: "터미널 택시 약 15–20분",
        note: "조용한 Tanglin 구역과 넉넉한 공용 공간이 강점인 휴식 중심 후보입니다.",
        official: "https://www.hilton.com/en/hotels/sinodci-conrad-singapore-orchard/rooms/", hotels: hotelMapOptions[0].hotels,
      },
      {
        name: "The St. Regis Singapore", area: "TANGLIN · ORCHARD · 5 STAR", image: "/images/hotel-st-regis.jpg", badge: "리노베이션",
        price: "₩1,310,713", total: "₩1,571,544", score: "9.2 / 10", mrt: "Orchard Boulevard 인근", port: "터미널 택시 약 15–20분",
        note: "새롭게 단장한 객실과 버틀러 서비스, Botanic Gardens 접근성이 강점입니다.",
        official: "https://www.marriott.com/en-us/hotels/sinxr-the-st-regis-singapore/rooms/", hotels: hotelMapOptions[2].hotels,
      },
      {
        name: "Four Seasons Singapore", area: "ORCHARD BOULEVARD · 5 STAR", image: "/images/hotel-four-seasons.jpg", badge: "가족 럭셔리",
        price: "₩1,486,943", total: "₩1,782,844", score: "9.6 / 10", mrt: "Orchard Boulevard MRT 인근", port: "터미널 택시 약 15–20분",
        note: "가족 서비스와 높은 평점이 강점인 호텔 중심 전박 후보입니다.",
        official: "https://www.fourseasons.com/singapore/accommodations/", hotels: hotelMapOptions[3].hotels,
      },
      valueHotels[2],
      valueHotels[4],
    ],
  },
];

const hotelZonePoints = hotelGroups.map((group) => ({ id: group.id, name: group.name, korean: group.korean, color: group.color, ...group.point }));

const onboardExplorers = [
  {
    id: "activities",
    eyebrow: "01 · ACTIVITY",
    title: "공연·키즈 클럽·성인 웰니스",
    intro: "가족 공연과 키즈 클럽뿐 아니라, 아이들이 클럽에 있는 동안 이용할 수 있는 성인 중심 웰니스도 함께 골랐습니다.",
    source: "https://disneycruise.disney.go.com/en-eu/ships/adventure/entertainment/",
    sourceLabel: "공식 Entertainment 안내",
    tone: "activity",
    items: [
      { title: "Disney Seas the Adventure", meta: "Walt Disney Theatre · INCLUDED", image: "/images/activity-disney-seas.jpg", alt: "Disney Seas the Adventure 무대 공연", description: "미키와 친구들이 이끄는 시그니처 환영 공연. 첫날 또는 항해 초반 관람 우선순위입니다.", images: [
        { src: "/images/activity-disney-seas.jpg", alt: "Disney Adventure에서 공연 중인 Disney Seas the Adventure 피날레", kind: "DISNEY ADVENTURE", caption: "미키와 친구들이 한 무대에 모이는 실제 피날레" },
        { src: "/images/activity-seas-crush.jpg", alt: "Disney Seas the Adventure에서 Goofy와 Crush가 만나는 장면", kind: "SHOW SCENE", caption: "Goofy가 Crush에게 흐름을 타는 법을 배우는 Finding Nemo 장면" },
        { src: "/images/activity-theatre-1.jpeg", alt: "Disney Adventure Walt Disney Theatre의 객석과 무대", kind: "ACTUAL THEATRE", caption: "공연 시작 전 확인하는 실제 Walt Disney Theatre의 객석·무대 전경" },
      ] },
      { title: "Remember", meta: "WALL-E & EVE · INCLUDED", image: "/images/activity-remember.jpg", alt: "WALL-E와 EVE가 등장하는 Remember 공연", description: "WALL-E가 EVE의 기억을 되살리는 Disney Adventure 오리지널 뮤지컬입니다.", images: [
        { src: "/images/activity-remember.jpg", alt: "Remember 공연의 WALL-E와 EVE 피날레", kind: "OFFICIAL PHOTO", caption: "WALL-E와 EVE, 디즈니 캐릭터가 함께하는 피날레" },
        { src: "/images/activity-remember-2.jpg", alt: "Remember 공연의 실제 무대", kind: "ACTUAL SHOW", caption: "화려한 조명과 캐릭터가 펼치는 실제 공연 장면" },
        { src: "/images/activity-remember-3.jpg", alt: "Remember 공연 콘셉트 이미지", kind: "CONCEPT ART", caption: "WALL-E와 EVE를 중심으로 한 초기 무대 콘셉트" },
      ] },
      { title: "Moana: Call of the Sea", meta: "Wayfinder Bay · LIVE", image: "/images/activity-moana.jpg", alt: "Wayfinder Bay에서 펼쳐지는 Moana Call of the Sea 공연", description: "수영장과 무대를 함께 쓰는 야외 라이브 쇼. 해질 무렵 Wayfinder Bay 동선과 묶기 좋습니다.", images: [
        { src: "/images/activity-moana.jpg", alt: "Wayfinder Bay 수면 위에서 공연하는 Moana Call of the Sea", kind: "ACTUAL SHOW", caption: "수면과 대형 스크린을 함께 활용하는 야외 공연" },
        { src: "/images/activity-moana-2.jpg", alt: "Moana Call of the Sea 공연 시작 전 Wayfinder Bay 무대", kind: "ACTUAL STAGE", caption: "공연 로고와 수면 무대를 함께 볼 수 있는 시작 전 Wayfinder Bay" },
        { src: "/images/activity-moana-3.jpg", alt: "Moana Call of the Sea 출연진과 무대", kind: "OFFICIAL PHOTO", caption: "Wayfinder Bay의 바다 배경과 어우러지는 무대" },
      ] },
      { title: "Oceaneer Club", meta: "AGES 3–10 · REGISTER", image: "/images/activity-oceaneer.jpg", alt: "Disney Adventure Oceaneer Club의 Toy Story 놀이 공간", description: "Toy Story·Marvel·공주 테마 공간을 자유롭게 오가는 어린이 전용 클럽. 첫날 등록과 오픈하우스 확인이 핵심입니다.", images: [
        { src: "/images/activity-oceaneer.jpg", alt: "Oceaneer Club의 Toy Story 캐릭터 놀이 공간", kind: "KIDS SPACE", caption: "Woody와 Jessie가 반기는 Andy’s Toy Box" },
        { src: "/images/activity-oceaneer-2.jpg", alt: "Disney Adventure Oceaneer Club 내부", kind: "ACTUAL SPACE", caption: "게임과 체험 장치가 이어지는 실제 키즈 공간" },
        { src: "/images/activity-oceaneer-3.jpg", alt: "Oceaneer Club의 대형 블록과 슬라이드", kind: "KIDS SPACE", caption: "대형 Toy Story 소품과 슬라이드를 갖춘 놀이 구역" },
      ] },
      { title: "Spa, Salon & Fitness", meta: "ADULT FOCUS · RESERVATION", image: "/images/activity-adult-spa.jpg", alt: "Disney Adventure의 성인 중심 스파 휴식 공간", description: "레인포레스트 휴식 공간, 스파 트리트먼트, 피트니스와 요가·사이클링을 묶은 성인 중심 웰니스 구역입니다.", images: [
        { src: "/images/activity-adult-spa.jpg", alt: "Disney Adventure 레인포레스트 휴식 공간", kind: "ADULT WELLNESS", caption: "온열 라운저와 식물, 원형 창이 어우러진 레인포레스트 휴식 공간" },
        { src: "/images/activity-adult-spa-treatment.jpg", alt: "Disney Adventure Opulence Spa의 트리트먼트 룸", kind: "SPA TREATMENT", caption: "따뜻한 우드 톤과 싱잉볼 테이블로 꾸민 Opulence Spa 트리트먼트 룸" },
        { src: "/images/activity-adult-spa-3.webp", alt: "Disney Adventure 피트니스 센터", kind: "FITNESS", caption: "바다 전망 운동 기구와 요가·사이클링 프로그램을 갖춘 피트니스 센터" },
      ] },
    ],
  },
  {
    id: "attractions",
    eyebrow: "02 · ATTRACTION",
    title: "상부 데크·테마 거리·성인 라운지",
    intro: "가족용 어트랙션은 오전과 해질 무렵, 실내 거리와 성인 지향 라운지는 한낮이나 아이들의 클럽 시간에 배치합니다.",
    source: "https://disneycruise.disney.go.com/en-ph/ships/adventure/themed-areas/",
    sourceLabel: "공식 Themed Areas 안내",
    tone: "attraction",
    items: [
      { title: "Marvel Landing", meta: "DECK 18–19 · TOP PICK", image: "/images/attraction-marvel.jpg", alt: "Disney Adventure Marvel Landing의 Ironcycle Test Run", description: "Ironcycle Test Run, Groot Galaxy Spin, Pym Quantum Racers가 모인 최상층 어트랙션 존입니다.", images: [
        { src: "/images/attraction-marvel.jpg", alt: "Ironcycle Test Run 콘셉트 이미지", kind: "CONCEPT ART", caption: "Iron Man 오토바이를 닮은 2인승 코스터" },
        { src: "/images/attraction-marvel-2.jpg", alt: "운행 중인 Ironcycle Test Run", kind: "ACTUAL RIDE", caption: "상부 데크 트랙을 달리는 실제 Ironcycle" },
        { src: "/images/attraction-marvel-3.jpg", alt: "Marvel Landing의 탑승 플랫폼", kind: "ACTUAL SPACE", caption: "Iron Man 조형물과 탑승 차량이 보이는 플랫폼" },
      ] },
      { title: "Toy Story Place", meta: "DECK 17 · FAMILY", image: "/images/attraction-toy-story.jpg", alt: "Disney Adventure Toy Story Place 물놀이 공간", description: "워터 슬라이드와 스플래시 존, Pizza Planet을 한 동선으로 묶는 가족용 물놀이 구역입니다.", images: [
        { src: "/images/attraction-toy-story.jpg", alt: "Toy Story Place의 물놀이 공간", kind: "ACTUAL SPACE", caption: "Alien 조형물과 슬라이드가 모인 가족 물놀이 존" },
        { src: "/images/attraction-toy-2.jpg", alt: "Toy Story Place의 워터 슬라이드", kind: "ACTUAL SPACE", caption: "Woody와 Jessie 테마 슬라이드와 스플래시 패드" },
        { src: "/images/attraction-toy-3.jpg", alt: "밤에 빛나는 Flying Saucer Splash Zone", kind: "NIGHT VIEW", caption: "야간 조명 아래의 Flying Saucer Splash Zone" },
      ] },
      { title: "Wayfinder Bay", meta: "DECK 10 · SUNSET", image: "/images/attraction-wayfinder.jpg", alt: "Disney Adventure Wayfinder Bay 수영장과 바다 전망", description: "Moana 테마의 풀·바·공연장이 결합된 선미 오픈데크. 일몰 시간대가 가장 잘 어울립니다.", images: [
        { src: "/images/attraction-wayfinder.jpg", alt: "Wayfinder Bay의 수영장과 바다 전망", kind: "ACTUAL SPACE", caption: "선미 바다 전망을 바라보는 원형 풀과 계단식 좌석" },
        { src: "/images/attraction-wayfinder-2.jpg", alt: "Wayfinder Bay의 데크와 라운지", kind: "ACTUAL SPACE", caption: "낮 시간의 라운지 좌석과 오픈데크 전경" },
        { src: "/images/attraction-wayfinder-3.jpg", alt: "Wayfinder Bay의 계단식 좌석과 풀", kind: "ACTUAL SPACE", caption: "공연 관람석으로 바뀌는 풀 주변의 계단형 데크" },
      ] },
      { title: "San Fransokyo Street", meta: "DECK 6–7 · INDOOR", image: "/images/attraction-san-fransokyo.jpg", alt: "Disney Adventure San Fransokyo Street의 네온 거리", description: "Big Hero Arcade와 Baymax Cinemas가 이어지는 실내 거리. 더운 낮의 피난 동선으로 좋습니다.", images: [
        { src: "/images/attraction-san-fransokyo.jpg", alt: "San Fransokyo Street의 네온 트롤리", kind: "ACTUAL SPACE", caption: "네온과 종이등으로 꾸민 San Fransokyo 실내 거리" },
        { src: "/images/attraction-sanfran-2.jpg", alt: "San Fransokyo Street의 Big Hero Arcade", kind: "ACTUAL SPACE", caption: "Big Hero Arcade 입구와 Baymax Cinemas 방향" },
        { src: "/images/attraction-sanfran-3.jpg", alt: "San Fransokyo Street의 Baymax", kind: "CHARACTER SPOT", caption: "Baymax를 가까이 만나는 캐릭터 포토 스팟" },
      ] },
      { title: "Adult Lounges", meta: "EVENING · ADULT FOCUS", image: "/images/attraction-adult-lounge.jpg", alt: "Disney Adventure Buccaneer Bar", description: "Buccaneer Bar와 Tiana’s Bayou Lounge 등 칵테일·라이브 스포츠·대화를 중심으로 한 성인 지향 저녁 공간입니다.", images: [
        { src: "/images/attraction-adult-lounge.jpg", alt: "Disney Adventure Buccaneer Bar의 바 좌석", kind: "BUCCANEER BAR", caption: "Captain Hook 테마와 대형 현창, 스포츠 중계를 갖춘 Buccaneer Bar" },
        { src: "/images/attraction-adult-lounge-2.jpg", alt: "Disney Adventure Tiana’s Bayou Lounge", kind: "TIANA’S BAYOU", caption: "뉴올리언스 분위기와 음료, 비녜를 즐기는 Tiana’s Bayou Lounge" },
        { src: "/images/attraction-adult-lounge-3.jpg", alt: "Disney Adventure 성인 라운지의 칵테일 서비스", kind: "EVENING LOUNGE", caption: "아이들의 클럽 시간에 맞춰 짧게 즐기기 좋은 칵테일 라운지 동선" },
      ] },
    ],
  },
  {
    id: "restaurants",
    eyebrow: "03 · RESTAURANT",
    title: "로테이셔널 다이닝과 예약 식사",
    intro: "저녁은 지정 로테이션을 기본으로 두고, 프리미엄 다이닝은 가족 일정과 겹치지 않게 한 번만 고릅니다.",
    source: "https://disneycruise.disney.go.com/en-sg/ships/adventure/dining/",
    sourceLabel: "공식 Dining 안내",
    tone: "restaurant",
    items: [
      { title: "Animator’s Palate", meta: "ROTATIONAL · INCLUDED", image: "/images/restaurant-animators.jpg", alt: "Disney Adventure Animator’s Palate 레스토랑", description: "애니메이션 스튜디오 콘셉트의 메인 다이닝. 지정 로테이션에 포함되는지 앱에서 확인합니다.", images: [
        { src: "/images/restaurant-animators.jpg", alt: "Animator’s Palate 다이닝룸", kind: "VENUE", caption: "감독 의자와 애니메이션 아트로 꾸민 메인 다이닝" },
        { src: "/images/restaurant-animators-food-1.jpg", alt: "Animator’s Palate의 하이난 치킨라이스", kind: "SIGNATURE FOOD", caption: "치킨·향미밥과 세 가지 소스를 함께 내는 Hainanese Chicken Rice" },
        { src: "/images/restaurant-animators-food-2.jpg", alt: "Animator’s Palate의 락사 르막", kind: "SIGNATURE FOOD", caption: "새우·달걀·두부 퍼프에 코코넛 국물을 붓는 Laksa Lemak" },
      ] },
      { title: "Hollywood Spotlight Club", meta: "CHARACTER · SCHEDULED", image: "/images/restaurant-hollywood.jpg", alt: "Disney Adventure Hollywood Spotlight Club 다이닝룸", description: "미키와 친구들이 등장하는 골든 에이지 할리우드 테마의 다이닝 쇼입니다.", images: [
        { src: "/images/restaurant-hollywood.jpg", alt: "Hollywood Spotlight Club 다이닝룸", kind: "VENUE", caption: "아르데코 조명과 바다 전망을 갖춘 캐릭터 다이닝" },
        { src: "/images/restaurant-hollywood-food-1.jpg", alt: "Hollywood Spotlight Club 대표 요리 네 가지", kind: "FOOD", caption: "스테이크·커리·치킨·파스타로 구성된 대표 메뉴" },
        { src: "/images/restaurant-hollywood-food-2.jpg", alt: "Hollywood Spotlight Club의 실제 식사와 캐릭터", kind: "DINING MOMENT", caption: "실제 플레이팅과 함께 즐기는 캐릭터 다이닝 장면" },
      ] },
      { title: "Enchanted Summer", meta: "ROTATIONAL · INCLUDED", image: "/images/restaurant-enchanted.jpg", alt: "Disney Adventure Enchanted Summer 레스토랑", description: "Frozen과 Tangled에서 영감을 받은 두 개의 다이닝룸을 갖춘 포함 식사 공간입니다.", images: [
        { src: "/images/restaurant-enchanted.jpg", alt: "Enchanted Summer의 Olaf 다이닝룸", kind: "VENUE", caption: "Frozen의 여름 축제를 표현한 Olaf 다이닝룸" },
        { src: "/images/restaurant-enchanted-2.jpg", alt: "Enchanted Summer의 Maximus 다이닝룸", kind: "DINING MOMENT", caption: "Tangled 등불 축제 분위기의 Maximus 다이닝룸" },
        { src: "/images/restaurant-enchanted-food.jpg", alt: "Disney Adventure의 아시아풍 대표 음식과 디저트", kind: "SHIP MENU", caption: "회전식 다이닝과 퀵서비스에서 만나는 아시아풍 음식 예시" },
      ] },
      { title: "Palo Trattoria", meta: "ADULTS · RESERVE", image: "/images/restaurant-palo.jpg", alt: "Disney Adventure Palo Trattoria 레스토랑", description: "Luca의 해안 마을 분위기를 살린 성인 전용 북부 이탈리아 레스토랑. 별도 요금과 예약이 필요합니다.", images: [
        { src: "/images/restaurant-palo.jpg", alt: "Disney Adventure Palo Trattoria 레스토랑", kind: "VENUE", caption: "2개 층과 바다 전망을 갖춘 성인 전용 트라토리아" },
        { src: "/images/restaurant-palo-food-1.jpg", alt: "Palo의 파스타와 피자, 안티파스티", kind: "FOOD", caption: "파스타·피자·안티파스티를 함께 보는 Palo 식사 구성" },
        { src: "/images/restaurant-palo-food-2.jpg", alt: "Palo의 파스타 세 가지", kind: "FOOD", caption: "뇨키·파파르델레·라비올리로 구성된 파스타 셀렉션" },
      ] },
    ],
  },
];

const airportMapPoint = { lat: 1.36442, lng: 103.99153 };
const portMapPoint = { lat: 1.26639, lng: 103.86052 };
const hotelZoneMapPoint = { lat: 1.296, lng: 103.836 };
const mapCenter = { lat: 1.316, lng: 103.895 };
const mapZoom = 12;
const mapFrameOffsetY = -30;

function projectMapPoint(point: { lat: number; lng: number }) {
  const worldSize = 256 * 2 ** mapZoom;
  const worldX = (lng: number) => (lng + 180) / 360 * worldSize;
  const worldY = (lat: number) => {
    const radians = lat * Math.PI / 180;
    return (1 - Math.log(Math.tan(radians) + 1 / Math.cos(radians)) / Math.PI) / 2 * worldSize;
  };

  return {
    x: worldX(point.lng) - worldX(mapCenter.lng),
    y: worldY(point.lat) - worldY(mapCenter.lat),
  };
}

function mapPointStyle(point: { lat: number; lng: number }) {
  const projected = projectMapPoint(point);
  return { left: `calc(50% + ${projected.x}px)`, top: `calc(50% + ${mapFrameOffsetY + projected.y}px)` };
}

function routeSegment(from: { lat: number; lng: number }, to: { lat: number; lng: number }) {
  const start = projectMapPoint(from);
  const end = projectMapPoint(to);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return {
    left: `calc(50% + ${start.x}px)`,
    top: `calc(50% + ${mapFrameOffsetY + start.y}px)`,
    width: `${Math.hypot(dx, dy)}px`,
    transform: `rotate(${Math.atan2(dy, dx) * 180 / Math.PI}deg)`,
  };
}

const initialChecklist = [
  { id: "flight", label: "대한항공 왕복 항공권 확정", meta: "추천: 12/29 출국 · 1/4 KE644 귀국" },
  { id: "passport", label: "여권 유효기간 확인", meta: "4권 모두 확인 완료 · 갱신 불필요" },
  { id: "passport-copy", label: "여권 사본 제출", meta: "출발 1개월 전까지 여행사 전달" },
  { id: "balance", label: "크루즈 잔금 결제", meta: "2026.09.11 · US$2,289.40" },
  { id: "hotel", label: "싱가포르 전박 호텔 예약", meta: "12/30 체크인 · 12/31 체크아웃 · 1박" },
  { id: "app", label: "Disney Cruise Line 앱 준비", meta: "온라인 체크인·활동 예약 일정 확인" },
  { id: "pixie-plan", label: "Pixie Dust 구성 확정", meta: "가볍고 식품이 아닌 선물 · 8개 내외" },
  { id: "pixie-pack", label: "Pixie Dust 개별 포장", meta: "스티커·팔찌·미니 퍼즐 중심" },
];

function formatCountdown() {
  const target = new Date("2026-12-31T16:00:00+08:00").getTime();
  const now = Date.now();
  return Math.max(0, Math.ceil((target - now) / 86_400_000));
}

export default function DisneyCruisePage() {
  const [activeImage, setActiveImage] = useState(0);
  const [activeHotelSlides, setActiveHotelSlides] = useState<Record<string, number>>({});
  const [activeOnboard, setActiveOnboard] = useState<Record<string, number>>({ activities: 0, attractions: 0, restaurants: 0 });
  const [activeOnboardSlides, setActiveOnboardSlides] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const days = useMemo(() => formatCountdown(), []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("disney-cruise-checklist");
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, boolean>;
        const timer = window.setTimeout(() => setChecked(parsed), 0);
        return () => window.clearTimeout(timer);
      }
    } catch {
      // The checklist still works for the current session when storage is unavailable.
    }
  }, []);

  const toggleItem = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try {
      window.localStorage.setItem("disney-cruise-checklist", JSON.stringify(next));
    } catch {
      // Ignore storage failures in private browsing mode.
    }
  };

  const doneCount = initialChecklist.filter((item) => checked[item.id]).length;
  const previousImage = () => setActiveImage((current) => (current - 1 + gallery.length) % gallery.length);
  const nextImage = () => setActiveImage((current) => (current + 1) % gallery.length);

  return (
    <main>
      <header className={`topbar${mobileNavOpen ? " mobile-nav-open" : ""}`}>
        <a className="brand" href="#top" aria-label="페이지 맨 위로" onClick={() => setMobileNavOpen(false)}>
          <span className="brand-star">✦</span>
          <span>Disney Adventure</span>
          <small>FAMILY VOYAGE 2026</small>
        </a>
        <button
          className="mobile-nav-toggle"
          type="button"
          aria-label={mobileNavOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileNavOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="primary-navigation" className={mobileNavOpen ? "open" : ""} aria-label="주요 섹션" onClick={() => setMobileNavOpen(false)}>
          <a href="#voyage">항해 일정</a>
          <a href="#flights">항공</a>
          <a href="#hotels">호텔</a>
          <a href="#stateroom">객실</a>
          <a href="#activities">Activity</a>
          <a href="#attractions">Attraction</a>
          <a href="#restaurants">Restaurant</a>
          <a href="#pixie-dust">Pixie Dust</a>
          <a href="#checklist">체크리스트</a>
          <a className="mobile-doc-link" href="#documents">예약 문서</a>
        </nav>
        <a className="nav-cta" href="#documents">예약 문서</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-content">
          <div className="eyebrow"><span>✦</span> 4-NIGHT MAGIC AT SEA</div>
          <h1>새해를 여는<br /><em>마법 같은 항해</em></h1>
          <p className="hero-copy">싱가포르에서 출발하는 4박의 Disney Adventure.<br />우리 가족의 예약, 항공, 객실과 준비 일정을 한곳에 모았습니다.</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#voyage">여행 계획 보기 <span>→</span></a>
            <a className="button button-ghost" href="#stateroom">15150호 둘러보기</a>
          </div>
        </div>
        <div className="ship-frame">
          <img src={assetPath("/images/disney-adventure-ship.jpg")} alt="싱가포르에 입항한 Disney Adventure 크루즈선" />
          <div className="ship-vignette" />
          <div className="ship-caption"><span>THE SHIP</span><strong>Disney Adventure</strong><small>Singapore</small></div>
        </div>
        <div className="countdown"><strong>D-{days}</strong><span>SAIL AWAY</span></div>
        <div className="hero-wave" />
      </section>

      <section className="trip-strip" aria-label="여행 요약">
        <div><span>출항</span><strong>2026.12.31 · 16:00</strong><small>Singapore</small></div>
        <i />
        <div><span>귀항</span><strong>2027.01.04 · 07:00</strong><small>Singapore</small></div>
        <i />
        <div><span>여행 인원</span><strong>성인 2 · 어린이 2</strong><small>4 Guests</small></div>
        <i />
        <div><span>객실</span><strong>15150 · Category 06B</strong><small>Verandah</small></div>
      </section>

      <section className="section voyage-section" id="voyage">
        <div className="section-heading centered">
          <span className="kicker">YOUR VOYAGE</span>
          <h2>다섯 번의 아침, <em>한 번의 특별한 새해</em></h2>
          <p>기항지 없이 온전히 선상에서 즐기는 일정입니다. 첫날 승선 시간을 기준으로 싱가포르 전박을 여유 있게 잡는 것이 핵심입니다.</p>
        </div>
        <div className="itinerary-line">
          {itinerary.map((item, index) => (
            <article className={`day-card ${item.kind}`} key={`${item.date}-${item.place}`}>
              <div className="day-number">0{index + 1}</div>
              <div className="day-icon">{item.kind === "port" ? "⚓" : index === 1 ? "✦" : "≈"}</div>
              <span>{item.day} · {item.date}</span>
              <h3>{item.place}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="info-ribbon">
          <strong>추천 여행 프레임</strong>
          <span><b>12/29</b> 인천 출발</span><span className="arrow">→</span>
          <span><b>12/30</b> 싱가포르 도착·전박</span><span className="arrow">→</span>
          <span><b>12/31</b> 승선</span><span className="arrow">→</span>
          <span><b>1/4</b> 하선·야간 귀국</span>
        </div>
      </section>

      <section className="section flights-section" id="flights">
        <div className="section-heading">
          <span className="kicker light">FLIGHT PLAN</span>
          <h2>대한항공으로, <em>안전 여유 우선</em></h2>
          <p>귀국일은 1월 4일 고정. 입항 지연과 하선 시간을 고려하면 22:30편이 가장 안정적인 선택입니다.</p>
        </div>
        <div className="flight-grid">
          <article className="flight-card recommended">
            <div className="card-flag">RECOMMENDED</div>
            <div className="flight-title"><span className="airline-mark">KE</span><div><small>대한항공 · 이코노미</small><h3>안전한 왕복 조합</h3></div></div>
            <div className="route-row"><div><small>DEC 29</small><strong>ICN</strong><span>서울</span></div><div className="route-line"><span>출국</span><i /></div><div><small>DEC 30</small><strong>SIN</strong><span>싱가포르</span></div></div>
            <div className="route-row"><div><small>JAN 04 · 22:30</small><strong>SIN</strong><span>싱가포르</span></div><div className="route-line"><span>KE644</span><i /></div><div><small>JAN 05 · 05:45</small><strong>ICN</strong><span>서울</span></div></div>
            <div className="fare"><div><span>4인 총액</span><strong>₩4,210,600</strong></div><small>2026.08.09 조회 · 운임 변동 가능</small></div>
          </article>

          <article className="flight-card prestige">
            <div className="flight-title"><span className="airline-mark gold">P</span><div><small>대한항공 · 프레스티지</small><h3>편안함을 최우선으로</h3></div></div>
            <div className="prestige-copy"><strong>장거리 귀국에서 확실한 휴식</strong><p>현재 KE644는 777 기재의 개별 스위트형 좌석으로 표시됩니다. 단, 실제 기재는 운항 사정에 따라 변경될 수 있습니다.</p></div>
            <div className="compare-table"><div><span>4인 총액</span><strong>₩9,553,800</strong></div><div><span>이코노미 대비</span><strong>+₩5,343,200</strong></div><div><span>1인 추가</span><strong>약 +₩1,335,800</strong></div></div>
            <div className="verdict"><span>판단</span><p>전 구간 프레스티지는 가격 차이가 큽니다. 별도 편도 발권도 불리해, 우선 이코노미 왕복을 확보한 뒤 업그레이드 옵션을 확인하는 편이 합리적입니다.</p></div>
          </article>
        </div>
        <div className="risk-note"><strong>피해야 할 귀국편</strong><span><b>01:35</b> 배 입항 전 출발이라 불가능</span><span><b>10:40</b> 입항·하선·이동 지연 위험이 커 비추천</span></div>
      </section>

      <section className="section hotel-section" id="hotels">
        <div className="section-heading hotel-heading">
          <div>
            <span className="kicker">1 NIGHT IN SINGAPORE</span>
            <h2>승선 전 하루, <em>동선으로 고르는 호텔</em></h2>
            <p>12월 29일 출국·30일 새벽 도착을 기준으로, 가족 4인이 한 객실에 투숙 가능한 객실만 우선 비교했습니다.</p>
          </div>
          <div className="hotel-verdict"><span>BEST ROUTE</span><strong>The Westin Singapore</strong><small>Marina Bay CBD · 터미널 5–10분</small></div>
        </div>

        <div className="legacy-hotels" aria-hidden="true">
        <div className="hotel-group-heading"><span>ORIGINAL SHORTLIST</span><h3>기존 프리미엄 4곳</h3><p>처음 비교하던 호텔은 그대로 유지했습니다.</p></div>
        <div className="hotel-grid">
          <article className="hotel-card">
            <div className="hotel-image"><img src={assetPath("/images/hotel-conrad-orchard.jpg")} alt="Conrad Singapore Orchard 대표 객실" /><span>01 · ORCHARD RETREAT</span></div>
            <div className="hotel-body">
              <div className="hotel-title"><div><small>ORCHARD · 5 STAR</small><h3>Conrad Singapore Orchard</h3></div><b>여유형</b></div>
              <p>조용한 Tanglin·Orchard 구역에서 전박을 쉬어 가기 좋습니다. 쇼핑 동선과 수영장, 넉넉한 공용 공간을 함께 보는 선택입니다.</p>
              <div className="hotel-price"><span>Hotels.com 가족 4인 객실가</span><strong>₩1,138,007</strong><em>세금·수수료 포함 총 ₩1,364,471</em></div>
              <ul><li>객실 1개 · 성인 2 + 어린이 2 조건 확인</li><li>12/30 체크인 → 12/31 체크아웃 · 1박</li><li>호텔 → 터미널 택시 약 15–20분</li></ul>
              <div className="hotel-actions"><a href="https://www.hilton.com/en/hotels/sinodci-conrad-singapore-orchard/rooms/" target="_blank" rel="noreferrer">공식 객실 ↗</a><a href={hotelMapOptions[0].hotels} target="_blank" rel="noreferrer">Hotels.com ↗</a><a href="#hotel-map">동선 보기 ↓</a></div>
            </div>
          </article>

          <article className="hotel-card featured">
            <div className="hotel-image"><img src={assetPath("/images/hotel-westin.jpg")} alt="The Westin Singapore 대표 객실과 도심 전망" /><span>02 · BEST ROUTE</span></div>
            <div className="hotel-body">
              <div className="hotel-title"><div><small>MARINA BAY CBD · 5 STAR</small><h3>The Westin Singapore</h3></div><b>동선 추천</b></div>
              <p>Shenton Way MRT 앞이라 도심 이동이 편하고, 네 후보 중 크루즈 터미널 접근이 가장 짧습니다. 승선일 동선을 단순하게 만들기 좋습니다.</p>
              <div className="hotel-price"><span>Hotels.com 가족 4인 객실가</span><strong>₩1,309,612</strong><em>세금·수수료 포함 총 ₩1,570,226</em></div>
              <ul><li>객실 1개 · 성인 2 + 어린이 2 조건 확인</li><li>전액 환불 가능 · 현장 결제 표시 요금</li><li>호텔 → 터미널 택시 약 5–10분</li></ul>
              <div className="hotel-actions"><a href="https://www.marriott.com/en-us/hotels/sinwi-the-westin-singapore/rooms/" target="_blank" rel="noreferrer">공식 객실 ↗</a><a href={hotelMapOptions[1].hotels} target="_blank" rel="noreferrer">Hotels.com ↗</a><a href="#hotel-map">동선 보기 ↓</a></div>
            </div>
          </article>

          <article className="hotel-card">
            <div className="hotel-image"><img src={assetPath("/images/hotel-st-regis.jpg")} alt="새롭게 단장한 The St. Regis Singapore 대표 객실" /><span>03 · NEWLY RENOVATED</span></div>
            <div className="hotel-body">
              <div className="hotel-title"><div><small>ORCHARD · 5 STAR</small><h3>The St. Regis Singapore</h3></div><b>리노베이션</b></div>
              <p>새롭게 단장한 객실과 버틀러 서비스가 강점입니다. Orchard 쇼핑과 Botanic Gardens를 함께 즐기려는 전박에 잘 맞습니다.</p>
              <div className="hotel-price"><span>Hotels.com 가족 4인 객실가</span><strong>₩1,310,713</strong><em>세금·수수료 포함 총 ₩1,571,544</em></div>
              <ul><li>객실 1개 · 성인 2 + 어린이 2 조건 확인</li><li>전액 환불 가능 · 현장 결제 표시 요금</li><li>호텔 → 터미널 택시 약 15–20분</li></ul>
              <div className="hotel-actions"><a href="https://www.marriott.com/en-us/hotels/sinxr-the-st-regis-singapore/rooms/" target="_blank" rel="noreferrer">공식 객실 ↗</a><a href={hotelMapOptions[2].hotels} target="_blank" rel="noreferrer">Hotels.com ↗</a><a href="#hotel-map">동선 보기 ↓</a></div>
            </div>
          </article>

          <article className="hotel-card">
            <div className="hotel-image"><img src={assetPath("/images/hotel-four-seasons.jpg")} alt="Four Seasons Hotel Singapore 대표 객실" /><span>04 · FAMILY LUXE</span></div>
            <div className="hotel-body">
              <div className="hotel-title"><div><small>ORCHARD · 5 STAR</small><h3>Four Seasons Singapore</h3></div><b>가족 럭셔리</b></div>
              <p>가족 서비스와 높은 고객 평점이 강점입니다. Orchard Boulevard의 차분한 분위기에서 승선 전 하루를 호텔 중심으로 보내기 좋습니다.</p>
              <div className="hotel-price"><span>Hotels.com 가족 4인 객실가</span><strong>₩1,486,943</strong><em>세금·수수료 포함 총 ₩1,782,844</em></div>
              <ul><li>객실 1개 · 성인 2 + 어린이 2 조건 확인</li><li>Hotels.com 고객 평점 9.6/10</li><li>호텔 → 터미널 택시 약 15–20분</li></ul>
              <div className="hotel-actions"><a href="https://www.fourseasons.com/singapore/accommodations/" target="_blank" rel="noreferrer">공식 객실 ↗</a><a href={hotelMapOptions[3].hotels} target="_blank" rel="noreferrer">Hotels.com ↗</a><a href="#hotel-map">동선 보기 ↓</a></div>
            </div>
          </article>
        </div>

        <div className="hotel-group-heading value"><span>NEW · ₩720K–₩1.10M</span><h3>조금 더 낮춘 시티 호텔 6곳</h3><p>객실료가 72만–110만원 사이인 후보 중 센토사는 제외하고, CBD·마리나 베이·시빅 디스트릭트·오차드만 골랐습니다.</p></div>
        <div className="value-hotel-grid">
          {valueHotels.map((hotel, index) => (
            <article className="value-hotel-card" key={hotel.name}>
              <div className="value-hotel-image"><img src={assetPath(hotel.image)} alt={`${hotel.name} 대표 객실`} /><span>{String(index + 5).padStart(2, "0")} · {hotel.area}</span></div>
              <div className="value-hotel-body">
                <div className="value-hotel-title"><div><small>{hotel.area}</small><h3>{hotel.name}</h3></div><b>{hotel.badge}</b></div>
                <p>{hotel.note}</p>
                <div className="value-hotel-facts"><span><small>객실료</small><strong>{hotel.price}</strong></span><span><small>세금 포함 총액</small><strong>{hotel.total}</strong></span><span><small>평점</small><strong>{hotel.score}</strong></span></div>
                <ul><li>{hotel.mrt}</li><li>{hotel.port}</li><li>객실 1개 · 성인 2 + 어린이 2 조건</li></ul>
                <div className="hotel-actions"><a href={hotel.official} target="_blank" rel="noreferrer">공식 객실 ↗</a><a href={hotel.hotels} target="_blank" rel="noreferrer">Hotels.com ↗</a><a href="#hotel-map">동선 보기 ↓</a></div>
              </div>
            </article>
          ))}
        </div>
        </div>

        <div className="hotel-zone-groups">
          {hotelGroups.map((group, groupIndex) => (
            <section className="hotel-zone-group" key={group.id} id={`hotels-${group.id}`}>
              <div className="hotel-zone-heading">
                <span className="hotel-zone-index" style={{ background: group.color }}>0{groupIndex + 1}</span>
                <div><small>{group.name}</small><h3>{group.korean}</h3><p>{group.summary}</p></div>
                <a href="#hotel-map">지도에서 위치 보기 ↓</a>
              </div>
              <div className="value-hotel-grid unified">
                {group.hotels.map((hotel) => {
                  const slides = hotelSlides[hotel.name] ?? [{ src: hotel.image, alt: `${hotel.name} 대표 사진`, label: "Hotel" }];
                  const activeSlide = activeHotelSlides[hotel.name] ?? 0;
                  const changeHotelSlide = (direction: number) => setActiveHotelSlides((current) => ({ ...current, [hotel.name]: (activeSlide + direction + slides.length) % slides.length }));
                  return (
                  <article className="value-hotel-card" key={hotel.name}>
                    <div className="value-hotel-image hotel-card-slider">
                      <img src={assetPath(slides[activeSlide].src)} alt={slides[activeSlide].alt} />
                      <span>{slides[activeSlide].label} · {String(activeSlide + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}</span>
                      <button className="hotel-slide-prev" onClick={() => changeHotelSlide(-1)} aria-label={`${hotel.name} 이전 사진`}>←</button>
                      <button className="hotel-slide-next" onClick={() => changeHotelSlide(1)} aria-label={`${hotel.name} 다음 사진`}>→</button>
                      <div className="hotel-slide-dots" role="tablist" aria-label={`${hotel.name} 사진 선택`}>{slides.map((slide, slideIndex) => <button className={activeSlide === slideIndex ? "active" : ""} onClick={() => setActiveHotelSlides((current) => ({ ...current, [hotel.name]: slideIndex }))} key={slide.src} role="tab" aria-selected={activeSlide === slideIndex} aria-label={`${slide.label} 사진 보기`} />)}</div>
                    </div>
                    <div className="value-hotel-body">
                      <div className="value-hotel-title"><div><small>{hotel.area}</small><h3>{hotel.name}</h3></div><b>{hotel.badge}</b></div>
                      <p>{hotel.note}</p>
                      <div className="value-hotel-facts"><span><small>객실료</small><strong>{hotel.price}</strong></span><span><small>세금 포함 총액</small><strong>{hotel.total}</strong></span><span><small>평점</small><strong>{hotel.score}</strong></span></div>
                      <ul><li>{hotel.mrt}</li><li>{hotel.port}</li><li>객실 1개 · 성인 2 + 어린이 2 조건</li></ul>
                      <div className="hotel-actions"><a href={hotel.official} target="_blank" rel="noreferrer">공식 객실 ↗</a><a href={hotel.hotels} target="_blank" rel="noreferrer">Hotels.com ↗</a><a href="#hotel-map">구역 지도 ↓</a></div>
                    </div>
                  </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="google-map-panel" id="hotel-map">
          <div className="map-sidebar">
            <span className="map-kicker">LIVE GOOGLE MAP</span>
            <h3>공항부터 선착장까지</h3>
            <p>호텔별 점 대신 세 구역의 중심 위치를 표시했습니다. CBD·마리나 베이는 선착장에 가깝고, 시빅 디스트릭트는 관광 균형형, 오차드·탕린은 쇼핑과 휴식에 유리합니다.</p>
            <div className="map-route-summary" aria-label="시티 호텔 존 이동 경로">
              <div><i>✈</i><span><small>START</small><strong>Changi Airport</strong></span></div>
              <b>20–30분</b>
              <div className="selected"><i>⌂</i><span><small>STAY</small><strong>3 Central Areas</strong></span></div>
              <b>5–20분</b>
              <div><i>⚓</i><span><small>SAIL</small><strong>Marina Bay Cruise Centre</strong></span></div>
            </div>
            <div className="map-zone-list" aria-label="호텔 구역 범례">
              {hotelGroups.map((group) => <div className="map-zone-item" key={group.id}><i style={{ background: group.color }} /><span><strong>{group.name}</strong><small>{group.hotels.length} hotels · {group.id === "marina-cbd" ? "선착장 5–15분" : group.id === "civic" ? "선착장 10–15분" : "선착장 15–20분"}</small></span></div>)}
            </div>
          </div>
          <div className="map-canvas">
            <iframe src={`https://maps.google.com/maps?ll=${mapCenter.lat},${mapCenter.lng}&z=${mapZoom}&output=embed`} title="창이공항, 세 호텔 구역과 Marina Bay Cruise Centre를 함께 보는 Google 지도" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <div className="map-route-segment" style={routeSegment(airportMapPoint, hotelZonePoints[0])} />
            <div className="map-route-segment" style={routeSegment(hotelZonePoints[0], portMapPoint)} />
            <div className="map-pin map-pin-airport" style={mapPointStyle(airportMapPoint)}><i>✈</i><span>Changi Airport</span></div>
            <div className="map-pin map-pin-port" style={mapPointStyle(portMapPoint)}><i>⚓</i><span>Marina Bay Cruise Centre</span></div>
            {hotelZonePoints.map((zone) => <div className={`map-pin map-pin-zone map-pin-zone-${zone.id}`} style={mapPointStyle(zone)} key={zone.id}><i style={{ background: zone.color }}>⌂</i><span><strong>{zone.name}</strong><small>{zone.korean}</small></span></div>)}
          </div>
        </div>

        <div className="route-panel">
          <div className="route-intro"><span>ONE SIMPLE ROUTE</span><h3>세 시내 구역 기준</h3><p>짐이 4인분인 만큼 공항과 승선일은 Grab 또는 택시가 가장 단순합니다.</p></div>
          <div className="route-flow">
            <div className="route-stop"><i>✈</i><span><small>12/30 새벽</small><strong>Changi Airport</strong><em>입국·수하물 수령</em></span></div>
            <div className="route-leg"><b>20–30분</b><span>택시 · 약 S$25–40</span></div>
            <div className="route-stop hotel"><i>⌂</i><span><small>12/30–31</small><strong>CBD · Civic · Orchard</strong><em>1박 · 도심 관광</em></span></div>
            <div className="route-leg"><b>5–20분</b><span>택시 · 약 S$10–25</span></div>
            <div className="route-stop port"><i>⚓</i><span><small>12/31</small><strong>Marina Bay Cruise Centre</strong><em>권장 도착 12:00–13:00</em></span></div>
          </div>
          <div className="mini-plan"><span><b>12/30</b> 체크인 전 짐 보관 → Merlion Park → Gardens by the Bay</span><span><b>12/31</b> 조식 → 체크아웃 → Grab/택시로 터미널 이동</span></div>
        </div>
        <p className="price-disclaimer">2026.08.09 Hotels.com에서 2026.12.30–31, 객실 1개, 성인 2명과 어린이 2명 조건으로 확인한 1박 요금입니다. 모든 호텔은 객실료와 세금·수수료 포함 총액을 같은 형식으로 표시했습니다. 대표 사진은 검색된 객실 타입과 다를 수 있습니다. 실제 재고·침구·취소 조건·최종 결제가는 예약 링크에서 다시 확인하세요.</p>
      </section>

      <section className="section room-section" id="stateroom">
        <div className="section-heading centered">
          <span className="kicker">YOUR STATEROOM</span>
          <h2>바다를 가장 가까이, <em>Stateroom 15150</em></h2>
          <p>Deluxe Oceanview Stateroom with Verandah · Category 06B</p>
        </div>
        <div className="room-slider">
          <div className="room-slider-stage">
            <img src={assetPath(gallery[activeImage].src)} alt={gallery[activeImage].alt} />
            <button className="room-slide-prev" onClick={previousImage} aria-label="이전 객실 사진">←</button>
            <button className="room-slide-next" onClick={nextImage} aria-label="다음 객실 사진">→</button>
            <span className="room-slide-count">{String(activeImage + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
            <div className="room-slide-caption"><small>ROOM PHOTO TOUR</small><strong>{gallery[activeImage].label}</strong><p>{gallery[activeImage].note}{gallery[activeImage].sourceUrl && <> · <a href={gallery[activeImage].sourceUrl} target="_blank" rel="noreferrer">사진 출처 ↗</a></>}</p></div>
          </div>
          <div className="room-slider-thumbs" role="tablist" aria-label="객실 사진 선택">
            {gallery.map((item, index) => <button className={activeImage === index ? "active" : ""} onClick={() => setActiveImage(index)} key={item.src} aria-label={`${item.label} 사진 보기`} aria-selected={activeImage === index} role="tab"><img src={assetPath(item.src)} alt="" /><span>{item.label}</span></button>)}
          </div>
        </div>
        <div className="room-facts">
          <article><span className="fact-icon">◫</span><small>SIZE</small><strong>253 sq ft</strong><p>발코니 포함 약 23.5㎡</p></article>
          <article><span className="fact-icon">♙</span><small>CAPACITY</small><strong>Sleeps 4</strong><p>더블 침대 + 더블 소파베드</p></article>
          <article><span className="fact-icon">≈</span><small>VIEW</small><strong>Private Verandah</strong><p>전용 오션뷰 발코니</p></article>
          <article><span className="fact-icon">Ⅱ</span><small>BATH</small><strong>Split Bathroom</strong><p>샤워실과 화장실 분리</p></article>
        </div>
        <div className="deck-layout">
          <div className="deck-copy">
            <span className="kicker">DECK LOCATION</span>
            <h3>Deck 15 · 우현</h3>
            <p>15150호는 우현 선수 쪽 객실입니다. 도면에서 선수부 첫 번째 엘리베이터 홀보다 앞쪽에 있어, 방 번호가 적힌 위치를 바로 확인할 수 있습니다.</p>
            <ul>
              <li><b>위치</b> Deck 15 · 우현 · 선수 쪽</li>
              <li><b>동선</b> 선수부 엘리베이터 홀과 가까운 편</li>
              <li><b>확인</b> Category 06B는 Deck 12·13·15·16에 배치</li>
              <li><b>참고</b> 고층 객실이라 파도에 민감하면 움직임이 더 느껴질 수 있음</li>
            </ul>
            <div className="amenities"><span>50″ TV</span><span>USB-C</span><span>Mini fridge</span><span>Kettle</span><span>Safe</span><span>Elemis</span></div>
          </div>
          <div className="location-visuals">
            <figure className="deck-plan">
              <div className="visual-heading"><span>01</span><div><b>DECK 15 FLOOR PLAN</b><small>선실 번호 기준 실제 배치도</small></div></div>
              <div className="deck-image-wrap">
                <div className="deck-plan-sheet">
                  <img src={assetPath("/images/deck-15-plan.png")} alt="Disney Adventure Deck 15 전체 객실 배치도" />
                  <div className="room-marker"><i /><span>15150</span></div>
                </div>
              </div>
              <figcaption><span>▲ BOW · 선수</span><b>15150 · STARBOARD</b><span>AFT · 선미 ▼</span></figcaption>
            </figure>
            <div className="profile-stack">
              <figure className="ship-profile">
                <div className="visual-heading light"><span>02</span><div><b>SIDE PROFILE</b><small>측면 렌더링으로 보는 층수와 전후 위치</small></div></div>
                <div className="ship-profile-image">
                  <img src={assetPath("/images/disney-adventure-side.jpg")} alt="바다 위 Disney Adventure 측면 전경" />
                  <div className="deck-level-line"><span>DECK 15</span></div>
                  <div className="profile-marker"><i /><span>15150<br /><small>FORWARD · STARBOARD</small></span></div>
                  <span className="profile-bow">BOW · 선수 →</span>
                </div>
                <figcaption>측면 렌더링은 층수와 선수·선미 방향을 이해하기 위한 참고도입니다. 우현 객실은 보이는 면의 반대편일 수 있습니다. <a href="https://www.thestreet.com/travel/disney-removes-popular-character-from-cruise-ships" target="_blank" rel="noreferrer">Image: Walt Disney ↗</a></figcaption>
              </figure>
              <div className="venue-map">
                <div className="venue-map-heading"><span>03 · AROUND THE SHIP</span><strong>15150호에서 주요 시설까지</strong><small>FWD 선수 · MID 중앙 · AFT 선미</small></div>
                <div className="venue-rail" aria-label="Disney Adventure 주요 시설 층별 안내">
                  <div className="venue-row attraction"><b>D18–19</b><span><strong>Marvel Landing</strong><small>AFT · Ironcycle · Groot · Pym</small></span><em>RIDE</em></div>
                  <div className="venue-row family"><b>D17</b><span><strong>Toy Story Place</strong><small>AFT · Pizza Planet · Pixar Market</small></span><em>FAMILY</em></div>
                  <div className="venue-row room"><b>D15</b><span><strong>YOU ARE HERE · 15150</strong><small>FWD · STARBOARD</small></span><em>ROOM</em></div>
                  <div className="venue-row mixed"><b>D10</b><span><strong>Imagination Garden · Wayfinder Bay</strong><small>FWD → AFT · Palo · Mike &amp; Sulley&apos;s</small></span><em>DINING</em></div>
                  <div className="venue-row show"><b>D7–9</b><span><strong>Baymax Cinemas · Animator&apos;s Table</strong><small>AFT · Hollywood Spotlight Club</small></span><em>SHOW</em></div>
                  <div className="venue-row dining"><b>D5–6</b><span><strong>Walt Disney Theatre · Town Square</strong><small>Animator&apos;s Palate · Navigator&apos;s Club</small></span><em>DINING</em></div>
                </div>
                <div className="venue-legend"><span className="room">객실</span><span className="dining">식당</span><span className="show">공연</span><span className="attraction">어트랙션</span></div>
                <div className="location-links"><a href={assetPath("/docs/disney-adventure-deck-plan-v2.pdf")} target="_blank" rel="noreferrer">전체 데크 플랜 PDF ↗</a><a href="https://disneycruise.disney.go.com/en-gb/ships/deck-plans/adventure/10701/" target="_blank" rel="noreferrer">Disney 인터랙티브 도면 ↗</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="legacy-onboard" id="onboard-guide" aria-hidden="true">
        <div className="onboard-heading">
          <div className="section-heading">
            <span className="kicker light">ACTIVITY · ATTRACTION · RESTAURANT</span>
            <h2>4박 동안 <em>놓치지 않을 것들</em></h2>
            <p>공연은 첫날 앱에서 시간을 확인하고, 인기 체험과 유료 다이닝은 예약 창이 열리면 먼저 확보합니다. 아래는 Disney Adventure 공식 안내를 바탕으로 만든 가족 우선순위입니다.</p>
          </div>
          <div className="onboard-rules">
            <span><b>01</b> 예약 먼저</span><span><b>02</b> 첫날 동선 익히기</span><span><b>03</b> 매일 앱 확인</span>
          </div>
        </div>

        <div className="onboard-grid">
          <article className="onboard-card activity-card">
            <header><span>01 · ACTIVITY</span><h3>공연과 키즈 클럽</h3><p>가족이 함께 보는 시그니처 쇼와 아이들만의 시간을 균형 있게.</p></header>
            <div className="onboard-list">
              <div className="priority"><b>TOP SHOW</b><span><strong>Disney Seas the Adventure</strong><small>Walt Disney Theatre · 첫날 또는 초반 관람 추천</small></span><em>INCLUDED</em></div>
              <div><b>SHOW</b><span><strong>Remember</strong><small>WALL-E와 EVE가 이끄는 오리지널 무대</small></span><em>INCLUDED</em></div>
              <div><b>LIVE</b><span><strong>Moana: Call of the Sea</strong><small>Wayfinder Bay에서 펼쳐지는 라이브 공연</small></span><em>INCLUDED</em></div>
              <div><b>KIDS</b><span><strong>Oceaneer · Edge · Vibe</strong><small>각각 3–10세 · 11–14세 · 14–17세</small></span><em>REGISTER</em></div>
              <div><b>PLAY</b><span><strong>Baymax Cinemas · Karaoke</strong><small>더운 시간대나 휴식일의 실내 대안</small></span><em>CHECK APP</em></div>
            </div>
            <a href="https://disneycruise.disney.go.com/en-eu/ships/adventure/entertainment/" target="_blank" rel="noreferrer">공식 Entertainment 안내 ↗</a>
          </article>

          <article className="onboard-card attraction-card">
            <header><span>02 · ATTRACTION</span><h3>상부 데크 집중 공략</h3><p>해가 덜 뜨거운 오전과 해질 무렵을 중심으로 두 구역을 묶습니다.</p></header>
            <div className="onboard-list">
              <div className="priority"><b>D18–19</b><span><strong>Marvel Landing</strong><small>Ironcycle · Groot Galaxy Spin · Pym Quantum Racers</small></span><em>TOP PICK</em></div>
              <div><b>D17</b><span><strong>Toy Story Place</strong><small>패밀리 풀 · 워터 슬라이드 · 스플래시 존</small></span><em>FAMILY</em></div>
              <div><b>D10</b><span><strong>Wayfinder Bay</strong><small>Moana 테마 풀과 바 · 공연을 한 동선으로</small></span><em>SUNSET</em></div>
              <div><b>D6–7</b><span><strong>San Fransokyo Street</strong><small>아케이드와 Baymax Cinemas를 실내 동선으로</small></span><em>INDOOR</em></div>
              <div><b>TIP</b><span><strong>첫날 키·신장 제한 확인</strong><small>인기 라이드 대기와 운영 여부는 앱에서 재확인</small></span><em>CHECK APP</em></div>
            </div>
            <a href="https://disneycruise.disney.go.com/en-ph/ships/adventure/themed-areas/" target="_blank" rel="noreferrer">공식 Themed Areas 안내 ↗</a>
          </article>

          <article className="onboard-card dining-card">
            <header><span>03 · RESTAURANT</span><h3>포함 식사부터 예약 식사까지</h3><p>기본은 지정된 로테이셔널 다이닝, 점심과 간식은 동선 가까운 퀵서비스로.</p></header>
            <div className="onboard-list">
              <div className="priority"><b>DINNER</b><span><strong>Rotational Dining</strong><small>캐릭터 · 애니메이션 · Enchanted Summer/Pixar 그룹</small></span><em>INCLUDED</em></div>
              <div><b>CHARACTER</b><span><strong>Hollywood Spotlight · Navigator&apos;s</strong><small>미키와 친구들 또는 Captain&apos;s Table 경험</small></span><em>SCHEDULED</em></div>
              <div><b>QUICK</b><span><strong>Mowgli · Gramma Tala · Cosmic Kebabs</strong><small>선상 이동 중 빠르게 먹기 좋은 선택</small></span><em>INCLUDED</em></div>
              <div><b>SNACK</b><span><strong>Pizza Planet · Wheezy&apos;s Freezies</strong><small>Toy Story Place에서 물놀이와 한 번에</small></span><em>INCLUDED</em></div>
              <div><b>PREMIUM</b><span><strong>Palo · Mike &amp; Sulley&apos;s</strong><small>사전 예약 필요 · 별도 요금</small></span><em>RESERVE</em></div>
            </div>
            <a href="https://disneycruise.disney.go.com/en-sg/ships/adventure/dining/" target="_blank" rel="noreferrer">공식 Dining 안내 ↗</a>
          </article>
        </div>

        <div className="four-night-plan">
          <div className="plan-intro"><span>4-NIGHT PRIORITY</span><strong>밤 공연을 축으로 낮 동선을 배치</strong><small>정확한 시간과 운영 여부는 승선 후 Navigator 앱 기준</small></div>
          <div><b>NIGHT 1</b><strong>Disney Seas</strong><span>첫 로테이셔널 디너</span></div>
          <div><b>DAY 2</b><strong>Marvel Landing</strong><span>저녁 Remember</span></div>
          <div><b>DAY 3</b><strong>Toy Story · Wayfinder</strong><span>Moana 공연</span></div>
          <div><b>DAY 4</b><strong>키즈 클럽 · 재탑승</strong><span>예약 시 프리미엄 다이닝</span></div>
        </div>
      </section>

      {onboardExplorers.map((section, sectionIndex) => {
        const activeIndex = activeOnboard[section.id] ?? 0;
        const activeItem = section.items[activeIndex];
        const slideKey = `${section.id}-${activeIndex}`;
        const activeSlide = activeOnboardSlides[slideKey] ?? 0;
        const currentPhoto = activeItem.images[activeSlide];
        const changeSlide = (direction: number) => setActiveOnboardSlides((current) => ({ ...current, [slideKey]: (activeSlide + direction + activeItem.images.length) % activeItem.images.length }));
        return (
          <section className={`section onboard-explorer ${section.tone}`} id={section.id} key={section.id}>
            <div className="explorer-heading">
              <div><span className="kicker">{section.eyebrow}</span><h2>{section.title}</h2><p>{section.intro}</p></div>
              <span className="explorer-count">0{sectionIndex + 1}<small> / 03</small></span>
            </div>
            <div className="explorer-layout">
              <figure className={`explorer-photo ${section.id === "restaurants" && currentPhoto.kind !== "VENUE" ? "food-photo" : ""}`}>
                <img src={assetPath(currentPhoto.src)} alt={currentPhoto.alt} />
                <div className="explorer-slide-controls"><span>{String(activeSlide + 1).padStart(2, "0")} / {String(activeItem.images.length).padStart(2, "0")}</span><button className="prev" onClick={() => changeSlide(-1)} aria-label={`${activeItem.title} 이전 사진`}>←</button><button className="next" onClick={() => changeSlide(1)} aria-label={`${activeItem.title} 다음 사진`}>→</button></div>
                <figcaption><small>{currentPhoto.kind} · {activeItem.meta}</small><strong>{activeItem.title}</strong><p>{currentPhoto.caption}</p></figcaption>
                <div className="explorer-filmstrip" role="tablist" aria-label={`${activeItem.title} 사진 슬라이드`}>
                  {activeItem.images.map((photo, photoIndex) => <button className={`${activeSlide === photoIndex ? "active" : ""} ${section.id === "restaurants" && photo.kind !== "VENUE" ? "food-thumb" : ""}`} key={photo.src} onClick={() => setActiveOnboardSlides((current) => ({ ...current, [slideKey]: photoIndex }))} role="tab" aria-selected={activeSlide === photoIndex}><img src={assetPath(photo.src)} alt="" /><span>{String(photoIndex + 1).padStart(2, "0")}</span></button>)}
                </div>
              </figure>
              <div className="explorer-list" role="tablist" aria-label={`${section.title} 사진 선택`}>
                {section.items.map((item, index) => (
                  <button key={item.title} className={activeIndex === index ? "active" : ""} onClick={() => setActiveOnboard((current) => ({ ...current, [section.id]: index }))} role="tab" aria-selected={activeIndex === index}>
                    <span className="explorer-thumb"><img src={assetPath(item.images[0].src)} alt="" /></span>
                    <span><small>{item.meta}</small><strong>{item.title}</strong><em>{item.description}</em></span>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                  </button>
                ))}
                <a href={section.source} target="_blank" rel="noreferrer">{section.sourceLabel} ↗</a>
                {(section.id === "activities" || section.id === "attractions") && <a href="https://disneycruise.disney.go.com/en-gb/ships/adventure/adults/" target="_blank" rel="noreferrer">공식 Adults 안내 ↗</a>}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section onboard-plan-section">
        <div className="four-night-plan">
          <div className="plan-intro"><span>4-NIGHT PRIORITY</span><strong>밤 공연을 축으로 낮 동선을 배치</strong><small>정확한 시간과 운영 여부는 승선 후 Disney Cruise Line 앱 기준</small></div>
          <div><b>NIGHT 1</b><strong>Disney Seas</strong><span>첫 로테이셔널 디너</span></div>
          <div><b>DAY 2</b><strong>Marvel Landing</strong><span>저녁 Remember</span></div>
          <div><b>DAY 3</b><strong>Toy Story · Wayfinder</strong><span>Moana 공연</span></div>
          <div><b>DAY 4</b><strong>키즈 클럽 · 재탑승</strong><span>예약 시 프리미엄 다이닝</span></div>
        </div>
      </section>

      <section className="legacy-magic" id="onboard-magic" aria-hidden="true">
        <div className="magic-heading">
          <div className="section-heading">
            <span className="kicker light">GOODIES &amp; DOOR DECOR</span>
            <h2>작게 준비해서, <em>매일 한 번씩 설레게</em></h2>
            <p>4박 일정과 항공 수하물을 생각하면 대규모 교환보다 가족 서프라이즈와 소량의 Pixie Dust가 가장 부담이 적습니다.</p>
          </div>
          <div className="magic-verdict"><span>OUR PICK</span><strong>문꾸 + 미니 구디백 8개</strong><small>FE는 승선 그룹이 확인되면 선택</small></div>
        </div>

        <div className="magic-feature-grid">
          <article className="magic-card door-card">
            <div className="magic-photo">
              <img src={assetPath("/images/door-decor.jpg")} alt="자석 장식으로 꾸민 디즈니 크루즈 객실 문" />
              <span>STATEROOM 15150 · DOOR PLAN</span>
            </div>
            <div className="magic-card-body">
              <div className="magic-title"><span>01</span><div><small>MAGNETS ONLY</small><h3>우리 가족 문꾸 세트</h3></div></div>
              <p className="magic-lead">멀리서도 객실을 바로 찾을 수 있도록 가볍고 납작한 자석 6–8개만 준비합니다.</p>
              <div className="decor-set">
                <span><b>1</b> 선실 번호 둘레 미키 이어</span>
                <span><b>1</b> Disney Adventure · New Year 2027</span>
                <span><b>4</b> 가족별 캐릭터 아이콘</span>
                <span><b>1–2</b> 첫 크루즈·항해 테마 포인트</span>
              </div>
              <div className="rule-box">
                <strong>공식 규정</strong>
                <ul>
                  <li>테이프·양면테이프·젤 접착제 사용 금지</li>
                  <li>문 위에 거는 수납함 사용 금지</li>
                  <li>장식은 객실 문 안에만, 복도 벽·천장 금지</li>
                  <li>고가 장식·소리·영상 장식 금지 · 훼손 시 US$100</li>
                </ul>
              </div>
              <div className="magic-links"><a href="https://disneycruise.disney.go.com/en-nz/faq/prohibited-items/door-decorations/" target="_blank" rel="noreferrer">Disney 공식 문 장식 규정 ↗</a><a href="https://disneycruiseplanning.com/ideas-for-disney-cruise-door-decorations/" target="_blank" rel="noreferrer">사진 출처 ↗</a></div>
            </div>
          </article>

          <article className="magic-card gift-card">
            <div className="magic-photo">
              <img src={assetPath("/images/fish-extender.jpg")} alt="객실 옆 주머니에 작은 선물을 넣는 Fish Extender 교환" />
              <span>GUEST TRADITION · OPTIONAL</span>
            </div>
            <div className="magic-card-body">
              <div className="magic-title"><span>02</span><div><small>GOODIE BAG</small><h3>세 가지 참여 방식</h3></div></div>
              <div className="exchange-list">
                <div className="exchange-row recommended"><b>추천</b><span><strong>Pixie Dust</strong><small>신청 없이 다른 객실에 작은 선물을 랜덤으로 전달</small></span></div>
                <div className="exchange-row"><b>선택</b><span><strong>Fish Extender</strong><small>동일 항차 승객 그룹이 정한 객실끼리 선물을 교환</small></span></div>
                <div className="exchange-row"><b>가족</b><span><strong>Kids Surprise</strong><small>아이 2명에게 하루 한 번 객실 안에서 깜짝 선물</small></span></div>
              </div>
              <div className="gift-ideas"><strong>가볍고 실패 없는 구성</strong><span>캐릭터 스티커</span><span>야광 팔찌</span><span>미니 노트·연필</span><span>임시 타투</span><span>작은 자석</span><span>미니 퍼즐</span></div>
              <p className="food-note"><b>식품은 제외 권장</b> 알레르기·종교·싱가포르 더위 변수를 줄이고, 액체·슬라임·깨지는 장난감도 피합니다.</p>
              <div className="budget-grid">
                <div><span>아이용 2개</span><strong>₩40–60k</strong></div>
                <div><span>Pixie Dust 8개</span><strong>₩24–40k</strong></div>
                <div><span>FE 5객실 참가 시</span><strong>+₩50–75k</strong></div>
              </div>
              <p className="hook-note">Fish Extender는 디즈니 공식 행사가 아닙니다. 문에 걸지 말고, 15150호 옆에 전용 메시지 훅이 있는지와 승무원 안내를 승선일에 확인한 뒤 사용하세요.</p>
              <div className="magic-links"><a href="https://www.undercovertourist.com/blog/disney-cruise-fish-extenders/" target="_blank" rel="noreferrer">Fish Extender 안내 ↗</a><a href="https://www.cruisecritic.com/articles/disney-cruise-line-fish-extenders-pros-and-cons" target="_blank" rel="noreferrer">사진 출처 ↗</a></div>
            </div>
          </article>
        </div>

        <div className="magic-timeline">
          <div><span>SEP</span><strong>동일 항차 그룹 찾기</strong><small>“Disney Adventure Dec 31 2026” 검색</small></div>
          <i>→</i>
          <div><span>OCT 31</span><strong>FE 참여 여부 결정</strong><small>그룹 규모·아이 나이·알레르기 확인</small></div>
          <i>→</i>
          <div><span>NOV</span><strong>자석 제작·선물 구매</strong><small>문구에 영문 이름 대신 가족 테마 사용</small></div>
          <i>→</i>
          <div><span>DEC 20</span><strong>냉장고 테스트 후 포장</strong><small>문꾸 1봉 + 구디백 1봉으로 분리</small></div>
        </div>
        <p className="magic-disclaimer">예산은 2026년 준비용 계획 범위이며 배송비는 제외했습니다. 문 장식 규정과 선물 교환 방식은 출항 전 다시 확인하세요.</p>
      </section>

      <section className="section pixie-section" id="pixie-dust">
        <div className="pixie-heading">
          <div className="section-heading">
            <span className="kicker light">PIXIE DUST ONLY</span>
            <h2>작은 선물로 남기는 <em>한 번의 마법</em></h2>
            <p>문 장식이나 Fish Extender 교환은 제외하고, 신청 없이 가볍게 나눌 수 있는 Pixie Dust만 준비합니다.</p>
          </div>
          <div className="pixie-verdict"><span>OUR PLAN</span><strong>8개 내외 · 식품 제외</strong><small>가볍고 납작한 소품 중심</small></div>
        </div>
        <div className="pixie-card">
          <figure><img src={assetPath("/images/pixie-dust-bags.jpg")} alt="스티커와 팔찌로 구성한 Disney Cruise Pixie Dust 선물 봉투" /><figcaption>PHOTO IDEA · PIXIE DUST GIFT BAGS</figcaption></figure>
          <div className="pixie-copy">
            <span className="kicker">WHAT TO PACK</span>
            <h3>8개의 작은 봉투, 부담 없는 구성</h3>
            <p>받는 사람의 나이·알레르기를 몰라도 무난하도록 먹을 것은 빼고, 여행 중 바로 쓸 수 있는 소품으로만 구성합니다.</p>
            <div className="pixie-ideas"><span>캐릭터 스티커</span><span>야광 팔찌</span><span>임시 타투</span><span>미니 노트</span><span>작은 퍼즐</span><span>가벼운 키링</span></div>
            <div className="pixie-steps"><div><b>01</b><span><strong>한 봉투당 2–3개</strong><small>부피와 수하물 무게 최소화</small></span></div><div><b>02</b><span><strong>개별 포장</strong><small>“Happy Sailing” 태그만 간단히</small></span></div><div><b>03</b><span><strong>승선 후 전달</strong><small>통행을 막지 않도록 짧게 전달</small></span></div></div>
            <div className="pixie-note"><strong>피할 것</strong><span>식품 · 액체 · 슬라임 · 깨지는 장난감 · 개인정보가 적힌 태그</span></div>
            <a href="https://celebratingwithkids.com/pixie-dust-gift-ideas/" target="_blank" rel="noreferrer">Pixie Dust 아이디어와 사진 출처 ↗</a>
          </div>
        </div>
      </section>

      <section className="section checklist-section" id="checklist">
        <div className="section-heading split-heading">
          <div><span className="kicker">BEFORE WE SAIL</span><h2>출항 전 <em>체크리스트</em></h2></div>
          <div className="check-progress"><strong>{doneCount}<small> / {initialChecklist.length}</small></strong><span>준비 완료</span></div>
        </div>
        <div className="checklist-grid">
          {initialChecklist.map((item) => (
            <button className={`check-item ${checked[item.id] ? "done" : ""}`} key={item.id} onClick={() => toggleItem(item.id)}>
              <span className="checkbox">{checked[item.id] ? "✓" : ""}</span>
              <span><strong>{item.label}</strong><small>{item.meta}</small></span>
            </button>
          ))}
        </div>
        <p className="storage-note">체크 상태는 이 브라우저에만 저장됩니다.</p>
      </section>

      <section className="section docs-section" id="documents">
        <div className="section-heading centered">
          <span className="kicker light">TRAVEL DOCUMENTS</span>
          <h2>예약 원본 문서</h2>
          <p>원본은 Google Drive에서 열리며, Drive 접근 권한이 있는 Google 계정으로 로그인해야 합니다.</p>
        </div>
        <div className="docs-grid">
          <a href="https://drive.google.com/file/d/1W3zyVJJR4oJlTYhfrhClcxx-BEJmN2om/view?usp=drivesdk" target="_blank" rel="noreferrer"><span>01</span><div><strong>크루즈 일정표</strong><small>Google Drive 원본 · PDF</small></div><b>↗</b></a>
          <a href="https://drive.google.com/file/d/1c7h2h_V8t7HAxwcCCbvaYh-JwqJdZUO-/view?usp=drivesdk" target="_blank" rel="noreferrer"><span>02</span><div><strong>예약확정서</strong><small>Drive 권한 필요 · PDF</small></div><b>↗</b></a>
          <a href="https://drive.google.com/file/d/1goX9JX_IpCYc811HgUmRSHIWOGZDrUZ_/view?usp=drivesdk" target="_blank" rel="noreferrer"><span>03</span><div><strong>결제내역서</strong><small>Drive 권한 필요 · PDF</small></div><b>↗</b></a>
          <a href="https://drive.google.com/file/d/10Rg6EBfm-r_vIl_XgEuotjHMpcW_AL0d/view?usp=drivesdk" target="_blank" rel="noreferrer"><span>04</span><div><strong>예약 시 유의사항</strong><small>Google Drive 원본 · PDF</small></div><b>↗</b></a>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span>✦</span><strong>Disney Adventure</strong><small>2026 Family Voyage Planner</small></div>
        <div className="sources"><span>주요 출처</span><a href="https://www.ica.gov.sg/enter-transit-depart/entering-singapore" target="_blank" rel="noreferrer">Singapore ICA</a><a href="https://disneycruise.disney.go.com/en-as/guest-services/departure-port-address-parking/" target="_blank" rel="noreferrer">Disney 터미널 안내</a><a href="https://disneycruise.disney.go.com/en-nz/faq/prohibited-items/door-decorations/" target="_blank" rel="noreferrer">문 장식 규정</a><a href="https://disneycruise.disney.go.com/en-ph/ships/adventure/stateroom-subtypes/verandah/" target="_blank" rel="noreferrer">객실 사양</a><a href="https://disneycruise.disney.go.com/en-gb/ships/deck-plans/adventure/10701/" target="_blank" rel="noreferrer">Disney Deck plan</a></div>
        <p>개인 여행 계획용 대시보드 · 항공 운임과 운항 기재, 크루즈 일정은 변경될 수 있습니다.</p>
      </footer>
    </main>
  );
}
