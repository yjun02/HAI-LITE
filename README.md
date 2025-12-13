# 🚀 HAI-LITE: 나이브한 신경망 시각화 프로젝트

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://hai-lite.vercel.app/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF)](https://vitejs.dev/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22-FF6F00)](https://www.tensorflow.org/js)
[![D3.js](https://img.shields.io/badge/D3.js-7-F9A03C)](https://d3js.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

## 📖 프로젝트 소개

**HAI-LITE**는 **H**andong **AI LITE**RACY의 줄임말로, 인공지능의 원리를 가장 **가볍고(LITE)** 투명하게 보여줌으로써 신경망의 작동 방식을 시각화하여 쉽게 이해할 수 있도록 돕는 웹 프로젝트입니다.

복잡한 최신 모델 대신, $8 \times 8$ 픽셀 데이터를 처리하는 **나이브한 형태의 피드포워드 신경망($64 \to 16 \to 8 \to 1$ 구조)**을 직접 설계하고 시각화하여, 예측 과정의 모든 단계를 사용자가 눈으로 직접 추적할 수 있도록 합니다.

👉 **Live Demo On vercel:** [https://hai-lite.vercel.app/](https://hai-lite.vercel.app/)

## ✨ 주요 기능 (Features)

*   **Builder Mode**: 사용자가 직접 데이터를 생성하고 모델을 학습시킬 수 있는 환경 제공.
*   **Viewer Mode**: 학습된 모델의 가중치와 예측 흐름을 시각적으로 탐색.
*   **Interactive Visualization**: D3.js를 활용한 동적인 신경망 시각화.
*   **On-Device ML**: TensorFlow.js를 사용하여 브라우저 내에서 직접 모델 추론 수행.
*   **Themes**: 다크 모드 및 다양한 컬러 테마 지원.

## 🛠 기술 스택 (Tech Stack)

이 프로젝트는 다음의 오픈 소스 기술들을 사용하여 구축되었습니다.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/React-19-blue) | 사용자 인터페이스 구축 |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-7-646CFF) | 빠른 개발 서버 및 번들링 |
| **ML Core** | ![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22-FF6F00) | 브라우저 기반 머신러닝 연산 |
| **Visualization** | ![D3.js](https://img.shields.io/badge/D3.js-7-F9A03C) | 데이터 기반 문서 조작 및 시각화 |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-App-black) | 정적 사이트 배포 및 호스팅 |

---

### 📝 개발 로그 (Log)

#### 251212 First build
- 첫 커밋, builder 메뉴, viewer 메뉴 구현
- 샘플 모델 학습시킨 후 내장 (총 70장의 $8 \times 8$ 픽셀 이미지로 학습)
- 0, 1 이진 분류 문제에서 괜찮은 정확도를 보이나 샘플 데이터의 학습 데이터 수 자체가 너무 적어서 숫자가 회전되거나 평행이동된 경우 제대로 인식되지 않음.
- 테마 추가(6가지), 라이트류 테마에서 일부 디자인 수정 필요