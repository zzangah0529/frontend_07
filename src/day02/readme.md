wep pack 구성 요소 

APP.js 
컴포넌트 에서 작업 하고
index.js 에서 경로 가지고 번역해서 'root'
public index.html ( root ) 에 넣어준다



# react 주요 개념

jsx : 새로운 언어( javascript + xml : html )

xml 정의 기능이 있다.

ECMA6 이상 문법을 사용 (바닐라 JS 가 아님)




# 기존의 javascript, html 과의 차이점
1. class 속성 => className

기존의 태그 => class
내가 만든 컴포넌트(함수로 만든다) => className
=> 구분해야 함

2. 작업하면 자동으로 갱신 
   HMR ( Hot Module Replace ) F5 refresh 하지 않아도 자동으로 모듈을 바꿔주는것 

다양한 변수 사용법 3가지

2-1. state 변수 : 컴포넌트 내에서 사용하는 변수 
화면을 갱신하고 싶을 때 사용하는 변수 

함수 = 컴포넌트 

2-2. props : 속성, 변수로 전달 
< img src="경로" alt="설명" class="img"  id="img" data-title="설명" >
   태그           속성    
                             속성 / 속성값 " "

   내가 새로 태그를 만들 수 있음 (예:)
  <Img title="속성값">

  2-3. context : props 전역으로 설정 


3. hook: 함수 
useState
useContext
useRef
useEffect 

4. 사용자 정의 hook (내가 만듣는것)


# 컴포넌트 ( 태그를 리턴하는 함수 ) 
확장자를  .js /  .mjs /  .jsx를  사용할 수 있고 
import할 때는 확장자를 생략 가능  

반드시 첫글자는 대문자 사용 ( html은 전부 소문자 )
함수로 묶어 놓는다.

대부분의 컴포넌트는 단일 태그로 사용 </>

그룹 역할을 하는 컴포넌트는 쌍으로 이루어 사용


# extention
## ES7

// rfc  : 함수형 컴포넌트 export 내장
// rfce : 함수형 컴포넌트 export 별도 선언
// rafc : 화살표 함수 컴포넌트 export 내장
// rafce : 화살표 함수 컴포넌트 export 별도 선언
// rcc  : class 형 컴포넌트



# 크롬 브라우저에 설치하는 개발 도구
react development tools
각종 컴포넌트, state, props, context 확인할 수 있는 도구  