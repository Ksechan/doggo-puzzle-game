# 🐶댕댕이 퍼즐

React로 진행한 댕댕이 퍼즐

댕댕이가 영어로 doggo라고 하여 doggo-puzzle-game으로 작명하였습니다



## 💻프로젝트 소개

Drag and Drop을 이용한 3x3 퍼즐게임



## ⚒개발 환경

react vite를 사용하였고 주로 javascript + typescript를 이용하여 진행하였습니다
```
React 18.2.0
```
```
vite 5.0.0
```
```
typescript 5.2.2
```


## 🔮주요기능

![스크린샷 2023-12-05 오후 2 57 33](https://github.com/Ksechan/doggo-puzzle-game/assets/74916518/cca0afac-158f-44ef-887a-263fa6e88e64)

![스크린샷 2023-12-05 오후 2 58 42](https://github.com/Ksechan/doggo-puzzle-game/assets/74916518/d46c061a-2522-4c16-8c8d-26b77671968e)

* 이미지 선택 후 9등분 조각으로 나누기

![스크린샷 2023-12-05 오후 2 59 59](https://github.com/Ksechan/doggo-puzzle-game/assets/74916518/ead934eb-7ffb-45cc-8210-833c183d2290)
  
* 퍼즐조각 shuffle

* 퍼즐조각 Drag and Drop

![화면-기록-2023-12-05-오후-2 59 25](https://github.com/Ksechan/doggo-puzzle-game/assets/74916518/04ae05f5-7356-4e9e-ad1e-a9d2d9f043dd)


## 🏓게임방법

1. 이미지 선택
2. 맨 앞의 퍼즐을 퍼즐판으로 이동
3. 맨 앞의 퍼즐이 어디로 가야할지 모르겠다면 넘기기 버튼!
4. 퍼즐조각을 퍼즐판으로 이동해도 위치가 맞지 않는것 같다면 퍼즐판내에서 옮길 수 있습니다


## ✏트러블슈팅

이미지를 선택하여 9등분 하는 작업을 위해 css background-position으로 각각 절대위치를 구하여 나누려고 하였으나, 확장성을 고려하여 width와 height를 props로 넘겨 pc와 모바일에서도 크기조절이 가능하도록 설계하였습니다.

javascript의 mouseEvent와 touchEvent는 각각 데스크탑과 모바일에서 따로 동작합니다. 두가지를 공통적으로 사용하기 위해 touchScreen환경인지 mouse를 사용하는 환경인지 파악하여 분기하여 합치는 과정이 생각보다 시간이 소요되었습니다.

모바일 환경에서 touch를 하고 있을 경우 브라우저 기본 옵션창이 나타나는 이슈가 있었습니다. 이를 해결하기 위해 css 속성 user-select를 각 브라우저마다 설정하여 touch and hold 기능을 완료하였습니다.



vercel로 무료배포 하였습니다 해당링크에서 확인 부탁드리겠습니다 <https://doggo-puzzle-game.vercel.app/>


특별히 과제를 받게되어 정말 기쁘게 생각하여 작업하였습니다.

기술 면접진행 시 자바스크립트에 대해 아직 공부가 많이 필요하다고 느꼈습니다

하여 이번에는 react를 사용하였지만 javascript의 event처리로 진행하려 노력하였습니다

감사합니다.



# doggo-puzzle-game
