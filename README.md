# i Shadow - Front end

CRA 를 기반으로 만들어진 React 프로젝트입니다.
현재 배포되어 페이지는 https://ishadow.kr/ 에서 확인하실 수 있습니다.

## 프로젝트 다운로드 & 설정 & 실행

`git clone https://git.swmgit.org/swm-12/12_swm50/ishadow-react.git`  
`cd ./ishadow-react`

루트 디렉터리에 .env 파일을 추가합니다.
.env 파일에는 주로 외부 API 와 관련된 상수들이 포함됩니다.

`npm start`

## 프로젝트 배포

`git pull`  
`npm install`  
`npm run build`

위 명령어까지 성공적으로 완료되면 build 폴더가 생깁니다. 이 폴더를 웹서버와 연결시켜줍니다.
웹서버는 nginx 를 사용하고 있습니다.
nginx 설치 후 `/etc/nginx/sites-available/*` 위치에 설정파일을 만들어 프로젝트의 build 폴더와 연결합니다.

## CI/CD

gitlab-runner 와 .gitlab-ci.yml 를 통해 CI/CD 가 구축되어 있습니다.
build 혹은 test 에 실패하면 실제 새로운 버전이 배포되지 않습니다.
총 3개의 stages 를 갖고 각각 build, test, deploy 입니다. 각각 build.sh, test.sh, deploy.sh 를 실행하게 됩니다.
build 에서는 `git pull` `npm install` `npm run build` 를 실행합니다.
test 에서는 `npm run test` 를 실행합니다. 유닛 테스트가 실행됩니다. (jest 라이브러리 사용)
deploy 에서는 `rm -rf ./deploy` `cp ./build ./deploy` 를 실행합니다. (nginx 설정은 build 가 아닌 deploy 와 연결되어야 합니다.)

## 디렉토리 구조

```
├─assets  
├─components  
│  ├─App  
│  ├─common  
│  │  ├─Completion  
│  │  ├─Dialog  
│  │  ├─Fail  
│  │  ├─FileUpload  
│  │  ├─Footer  
│  │  ├─Header  
│  │  ├─Loading  
│  │  ├─RecodedList  
│  │  └─YoutubeURL  
│  └─feature  
│      ├─AudioPlayer  
│      ├─ChatBot  
│      ├─Contents  
│      ├─EditProfile  
│      ├─FindPassword  
│      ├─Home  
│      ├─Login  
│      ├─MyRoom  
│      ├─NotFound  
│      ├─Payment  
│      ├─PaymentMethod  
│      ├─Signup  
│      ├─VideoPlayer  
│      └─YoutubePlayer  
├─fonts  
└─global  
    ├─Bookmark  
    ├─Dictionary  
    ├─log  
    ├─Oauth  
    ├─player  
    ├─record  
    ├─store  
    └─styles  
```
