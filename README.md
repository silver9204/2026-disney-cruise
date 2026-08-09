# 2026 Disney Cruise

2026년 12월 31일 싱가포르에서 출항하는 Disney Adventure 가족 여행 계획 페이지입니다. 항해 일정, 대한항공 항공편 검토, 호텔 비교, 객실 위치와 사진, 선내 활동·어트랙션·레스토랑, Pixie Dust 준비 목록을 한 페이지에 정리했습니다.

## Local development

Node.js 22 이상이 필요합니다.

```bash
npm ci
npm run dev
```

프로덕션 정적 빌드는 다음 명령으로 확인할 수 있습니다.

```bash
npm run build
```

## GitHub Pages

`main` 브랜치에 푸시하면 GitHub Actions가 정적 사이트를 빌드해 GitHub Pages에 배포합니다.

- Site: https://silver9204.github.io/2026-disney-cruise/
- Repository: https://github.com/silver9204/2026-disney-cruise

GitHub Pages의 프로젝트 하위 경로를 위해 빌드 시 `NEXT_PUBLIC_BASE_PATH=/2026-disney-cruise`를 사용합니다.

## Private documents

예약확정서, 결제내역서, 일정표, 예약 유의사항 PDF 원본은 저장소에 포함하지 않습니다. 웹페이지의 문서 카드는 Google Drive 원본으로 연결되며, 기존 Drive 접근 권한이 있는 계정만 열 수 있습니다.
