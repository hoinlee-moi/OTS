# :stew: **OTS** - [배포 사이트](https://ots-amber.vercel.app/)

<span style="font-size : 19px">**식단관리 SNS** 
<br>
(개인 프로젝트) - 프론트엔드,백엔드
</span>
<br>
참고페이지 - pinterest, instagram
<br>

<br>

>## 1. 제작기간 & 참여인원

- 2023.05.20 ~ 2023.06.10
- 1명

<br>

>## 2. 사용기술

Front-end
- React 18
- TypeScript 5
- Axios 1.4
- Fontawesome 6
<br>

Back-end
- Next.js 13.4
- mongodb 5.5
- firebase/storage
- Next auth 4
- bcrypt 5
- dotenv

<br>

>## 3. 구현기능

### 3-1. 메인페이지 :mag: [코드확인](https://github.com/hoinlee-moi/OTS/blob/main/components/home/Sections.tsx#L23)
<br>
첫 접속시 사이트를 소개하기 위한 페이지를 구현했고 scroll이 일어날 때마다 한 section씩 이동하도록 구현하였습니다. <br>
또한 상단 고정 navbar를 통해 회원가입과 로그인을 modal창으로 가능하도록 했습니다.<br><br>

<details>
<summary style="cursor : pointer;">기능 설명 펼치기</summary>

- 이번 프로젝트에선 슬라이드 형식의 스크롤 애니메이션을 사용하고 싶어 useEffect와 useState를 이용해 휠 이벤트가 일어날 시 한 섹션씩 이동하도록 했습니다.
- 휠 이벤트이기 때문에 보통 유저는 휠을 여러번씩 사용한다 예상하여 state값을 추적, 섹션 이동이 완전히 끝나기 전엔 이벤트가 실행되지 않도록 했습니다.
- header의 고정된 nav bar에 로그인 회원가입 버튼을 붙여 페이지 이동 없이 로그인, 회원가입이 가능하도록 했습니다.
- keyframe 애니메이션과 딜레이를 계산하여 첫번째 section에서 이미지들이 로딩되도록 했습니다. 이후 setTimeOut을 통해 state값을 관리하여 이미지 애니메이션이 무한히 지속되도록 했습니다.

</details>

<br>

### 3-2. 회원기능 :mag: [코드확인1](https://github.com/hoinlee-moi/OTS/blob/main/components/home/Login.tsx)[코드확인2](https://github.com/hoinlee-moi/OTS/blob/main/components/home/SignUp.tsx)
<br>
Next Auth를 이용해 로그인을 구현하였고 MongoDB 검사를 통해 통과시 JWT,session을 통해 로그인 상태와 로그인한 유저 정보를 쿠키에 저장되도록 구현하였습니다. <br>
회원가입은 동작 전 각 입력값이 벗어날 때 onBlur를 이용해 유효성 검사와 email과 nickname에는 중복 검사가 되도록 구현하였습니다.<br>
profile 페이지에서 Next.js의 Dynamic Routes를 통해 유저 닉네임을 전달하였고 session에 저장된 로그인 데이터와 같다면 프로필 편집이 가능하도록 했습니다.<br>


<details>
<summary style="cursor : pointer;">기능 설명 펼치기</summary>

- Next Auth의 CredentialsProvider를 통해 구현하였고 바로 MongoDB 검사를 통해 통과될 경우 callback의 JWT,sessoin에 userData를 담아 전달합니다.
- 회원가입시 MongoDB에 회원 정보 데이터를 저장하며 각각 email과 nickname, 비밀번호는  백과 프론트에서 양쪽으로 유효성 검사를 진행했습니다.
- DB와 중복검사를 nickname과 email에서 각각 진행되도록 했습니다.
- bcrypt를 사용해 비밀번호를 hash화 시켜 비밀번호 그 자체가 저장되지 않게 하였습니다.
- 프로필 페이지는 params로 받은 nickname을 통해 유저데이터를 불러왔고 session 데이터를 이용해 편집 기능을 모달창으로 가능하게 만들었습니다.
- 프로필 편집을 통해 프로필 이미지, 성별, 비밀번호, 닉네임등을 변경할 수 있었고 프로필 이미지는 firebase를 통해 저장과 삭제를 진행했고 db에는 이미지의 url을 저장하였습니다
- 프로필 수정시엔 댓글과 게시글에 저장된 프로필 이미지 url도 전부 변경되도록 만들었습니다.

</details>

<br><br>

### 3-3. 게시판 기능 :mag: [코드확인](https://github.com/hoinlee-moi/OTS/blob/main/components/mainBoard/PostBoard.tsx)
<br>
페이지의 가장 중요한 부분이고 댓글을 포함하여 게시글과 댓글은 전부 DB에 저장하였습니다. <br>
이때 게시글 db에 너무 많은 데이터가 들어가지 않도록 댓글 테이블을 따로 구성하여 저장했습니다.<br>
update를 사용할 땐 세션에 저장된 id정보와 각 게시글과 댓글에 저장된 id를 백과 프론트에서 검사하도록 구현하였습니다.

<br><br>

<details>
<summary style="cursor : pointer;">기능 설명 펼치기</summary>

- 전체적인 SNS 느낌은 굉장히 가볍게 진행하고자 했고 페이지 이동 없이 모달창을 이용했습니다.
- 이부분은 모달창은 그대로 가져가지만 URL변경을 통한 뒤로가기를 만들었다면 모바일 환경에서의 유저 사용감을 높일 수 있었다 생각하고 아쉽습니다.
- state값을 통해 모달창을 컨트롤 하도록 하였고 drag&drop기능을 이용한 이미지 파일을 받도록 했습니다.
- 이미지 데이터가 저장되기 전 클라이언트에서 firebase에 접속 이미지 파일들을 저장하고 url을 다시 받아 db에 저장되도록 구현하였습니다.
- 오픈API를 통해 음식의 영양 성분과 칼로리를 가져오고 선택한 음식 데이터 값들과 총 합을 따로 계산하여 저장될 수 있도록 했습니다.
- 수정과 삭제시는 서버와 클라이언트 양쪽에서 유저 검사를 하도록 진행했습니다.
</details>

<br><br>

### 3-4. 오픈 API를 활용한 음식 영양소 :mag: [코드확인](https://github.com/hoinlee-moi/OTS/blob/main/app/api/post/foodSearch/route.ts)
<br>
공공 데이터 포탈의 서비스를 이용해 식품 영양성분 정보를 검색할 수 있게 만들었습니다.<br>
모달창 내에서 검색하도록 하였고 비슷한 이름의 음식들을 최대 40개까지 불러올 수 있게 하였고 선택시 글 작성시 음식 이름, 영양 성분들을 저장할 수 있도록 구현하였습니다.

<br><br>

### 3-5. 게시판 무한스크롤 기능 :mag: [코드확인1](https://github.com/hoinlee-moi/OTS/blob/main/components/mainBoard/PostBoard.tsx) [코드확인2](https://github.com/hoinlee-moi/OTS/blob/main/hooks/useObserve.ts)
<br>
커스텀훅을 이용하여 게시판 글 마지막에 붙어있는 공간을 옵저빙 하여 스크롤을 통해 유저 화면에 들어올 경우 다음 페이지의 글을 불러오도록 구현하였습니다 <br>
한번 로드시 15개씩 가져올 수 있도록 했고 MongoDB의 쿼리를 사용하였고 더이상 불러올 데이터가 없을 때의 상태값을 보내 로딩이 더 진행되지 않도록 했습니다<br>
또한 setTimeOut을 이용해 여러번 요청이 들어가 page가 늘어나는 것을 방지했습니다.

<br><br>

### 3-6. firebase storage를 통한 이미지 파일 관리 :mag:[코드확인](https://github.com/hoinlee-moi/OTS/blob/main/util/firebase.ts)

<br>

처음엔 DB에 이미지를 저장하려 계획했지만 데이터당 저장되는 한계값도 존재하며 데이터 자체가 너무 무거워지는 것 같아 외부 데이터 저장소를 고민했습니다.<br>
이전 프로젝트처럼 S3를 사용할까 했지만 AWS의 과금 문제도 있고 Firebase의 storage를 사용하여 이미지를 업로드 하고 프로필 이미지가 변경되거나 글등이 삭제될 때 storage의 이미지 파일들도 삭제될 수 있도록 구현하였습니다.



<br><br>

>## 4. 핵심 트러블 슈팅
<br>

4-1. 이미지 로딩 속도 <br>
- 현재도 맨처음 로딩시엔 페이지는 느리지 않게 들어오지만 컴포넌트, 그 중에서 특히 이미지 데이터가 많이 들어가다보니 로딩이 느리고 띄엄띄엄 뜨는 경우가 있었습니다.<br>
- 아예 로딩 안된 이미지가 빈공간으로 뜨는 것 또한 유저 사용감을 매우 떨어뜨린다 생각하여 이미지 최적화를 찾던중 Next.js의 Image태그를 사용하는 방법을 공식문서를 통해 공부했습니다.<br>
- Next.js Image태그를 사용해 기본 html의 image태그를 전부 교체 시켰고 태그의 placeholder='blur'를 사용해 이미지가 뜨기전 빈 공간을 채울 수 있도록 했습니다.

<br>

4-2. formData 전송시 Next.js 버전별로 다른 문제
- 처음 진행시 가장 최신으로 나온 app디렉토리의 api폴더를 사용하지 않고 루트 폴더로 pages를 만들어 api를 만들었습니다.
- 이에 기본적인 string의 데이터는 제대로 통신하였지만 formData의 경우 도착하지 않는 상태가 되었고 찾아보니 Next.js는 통신시 따로 헤더에 타입을 담지 않아도 됐는데 타입 문제일까 싶어 작성해 봤지만 여전히 에러가 생겼습니다
- 관련하여 Next.js로 formData를 받을 때 특정 라이브러리를 사용해야 하는 것을 구글링을 통해 알았고 라이브러리 설치를 최소화 하고 싶어 공식문서를 찾아보니 가장 최신 app디렉토리를 사용하는 방법에 formData를 처리하는 방법이 나와 해결하였습니다.
- app폴더의 api폴더로 서버 코드를 전부 이사하였고 공식문서를 따라 서버 통신 코드를 변경하여 잘 진행되었습니다.

<br>

4-3. firebase 서버 에러
- 이미지 파일을 firebase storage에 저장하려 했지만 Next.js 서버단에선 firebase 접속이 실패하는 에러가 생겼습니다
- 이는 서버는 nodeJS를 api폴더에서 사용하지만 firebase Web 9 SDK를 사용하고 있기에 생긴 문제였고 시간상의 문제로 짜여진 코드들을 삭제하기 어렵다고 판단하여 클라이언트에서 파이어베이스에 접근할 수 있도록 변경하였습니다.

<br>

4-4. CSS파일이 코드를 변경하고 저장할 때마다 쌓이는 문제
- 프로젝트 작업을 진행하던 중 속도가 점점 느려지는 것을 발견하고 크롬 개발자 도구를 확인해 보니 error는 아니지만 동일한 오류가 꾸준하게 쌓여있는 것을 발견했습니다.
- 이에 추적을 해보니 동일한 CSS 파일들을 코드 변경후 저장할 때마다 똑같이 로드 하여 웹에 누적되는 문제가 있었습니다.
- 이에 검색을 통해 똑같은 Next.js 13.4 버전에서 동일한 오류를 가진 사람이 많았고 이에 CSS google font조정, CSS파일 조정, Link 태그의 prefetch를 조정하기도 했지만 여전했고 현재도 사이트에서 문제에 관해 토론중에 있습니다.
- 다만 이는 개발 도중 생기는 문제로 배포후엔 완전히 사라지는 것을 확인했고 좀 더 찾아보니 Next.js 13.4 버전 자체에서 생긴 문제로 버전 업을 기다리거나 좀 더 안정된 버전으로 내리는 방법이 있습니다.
- 개발 시 불편함이 쌓인다면 버전을 다운그레이드 하는 것이 좋다고 생각합니다.

<br>

4-5. 스크롤링 및 클릭 이벤트 연속 발생

- 무한 스크롤을 진행할 때 Loading이 진행되는 동안 스크롤에 마지막에 존재하기 때문에 계속해서 데이터를 불러들이는 현상이 있었습니다
- 이에 home페이지를 만들 때 스크롤링이 되는 시점에서 스크롤이 동작되게 만든 부분을 생각하고 동일하게 state상태값을 통해 데이터 fetch가 진행되지 않도록 픽스했습니다.
- 픽스 후 관련해서 서버나 db의 부하가 일어나지 않도록 state값을 통해 버튼을 클릭시 loading circle을 이용해 버튼을 사라지게 하고 유저에게 진행도를 알려주거나  비활성화 하는 방법으로 모두 변경하였습니다.

<br>

4-6. recoil 사용 실패

- 프로젝트 진행 시 props 드릴링이나 역으로 전달할 값등 전역적인 상태관리가 필요하다 느껴 이전 프로젝트 연습 때 사용했던 recoil을 사용하려 했지만 실패했습니다.
- 이유는 Next.js 13에 들어오며 모든 페이지의 디폴트값이 SSR이 된것을 공식 블로그를 통해 확인했고 'use client'를 이용할 경우 CSR로 변경 가능하였습니다.
- 다만 recoil같은 경우 중앙 집중화된 상태관리로 이를 사용하려면 전체 페이지에 CSR을 적용시켜야 했습니다. 이에 SSR의 검색 엔진이나 초기 사이트 로딩 같은 이점을 버리기에 아쉽다고 생각하여 React 기본 상태관리 훅인 useContext를 사용하여 필요한 부분에만 상태관리를 할 수 있도록 변경하였습니다.
- 이후 recoil에서 패치가 있을 경우 다시 한번 사용해봐도 괜찮다 생각합니다.

<br>

4-7. DELETE method 사용시 데이터 전송

- DELETE method를 사용시 데이터 전송시 body에 데이터를 담을 수 있지만 현재 Next.js13 에선 .json()을 이용해 데이터를 꺼내다보니 제대로 전달되지 않는 문제가 있었습니다.
- url 끝에 ?를 붙여 파라미터로 보낼 수 있었지만 user의 db아이디 넘버등이 노출되는 것을 염려하여 POST를 변경하여 진행시켰습니다.
- 보안을 위해 id넘버값도 hash로 변경시켜 진행후 compare로 비교했으면 더 좋았을 것 같다는 생각이 듭니다.

<br>

4-8. vercel 배포시 환경변수 문제
- 기존 .env에 작성 후 개발중이던 프로젝트를 곧 바로 vercel에 배포 시도 해 봤지만 계속 DB데이터에 접속할 수 없다는 오류가 생겼습니다.
- 에러를 검색 후 에러 위치 코드와 git에 올라간 코드를 확인중 .gitignore를 이용해 .env파일은 보안상 push하지 않도록 설정해 놓은 걸 놓친 상태였습니다.
- git을 이용한 배포를 했을 때도 똑같이 환경변수 처리하던 것이 기억나 vercel도 관련하여 검색해보니 똑같이 설정하는 것이 있어 배포 전 .env에 적어놓은 환경변수를 전부 옮겨 적으니 무사히 배포 완료 

<br><br>

> ## 5.회고 느낀점

### [개인 블로그](https://velog.io/@lee_moi)를 통해 작성하였습니다.
