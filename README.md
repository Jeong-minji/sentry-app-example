## Settings

### Environment

- Framework: Next.js
- Deployment: Vercel

### Install

#### Sentry 설치
```
yarn add @sentry/nextjs
```
#### Sentry 마법사 실행
```
npx @sentry/wizard -i nextjs
```
마법사 실행시 다음 파일들이 자동 생성되며, 직접 세팅을 원하는 경우 해당 명령어는 skip 가능하다.
```
├── sentry.properties     
├── .sentryclirc
├── .sentry.client.config.js                   
├── .sentry.server.config.js      
└── .next.config.wizardcopy.js.md
```

`.next.config.wizardcopy.js`는 프로젝트에 `next.config.js` 파일이 존재하지 않을 때 생성된다. <br/>
해당 파일에 있는 내용을 복사하여 `next.config.js`에 추가해주면 된다.

### 환경 변수

`.sentry.client.config.js`, `.sentry.server.config.js` 파일이 처음 생성되면 dsn 값으로 고유한 DSN_KEY 값이 세팅되어 있다. <br/>
해당 키 값은 env 파일로 분리하여 git에서 제외시킨다.

Production mode 에서만 실행하기 위해 production시 실행되는 env에만 DSN KEY 추가한다. <br/>
Sentry가 정상적으로 작동하면 네트워크 탭에 Sentry 요청이 찍히는 것을 확인할 수 있다.

```jsx
// .env.production
NEXT_PUBLIC_SENTRY_DSN_KEY = 'my_dsn_key'
```


### sentry.client.config.js

```jsx
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN_KEY,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
	beforeSend: (event) => sendErrorMessage(event) // 에러 발생시 텔레그램 전송 함수 실행
});
```

#### environment

해당 값이 세팅되지 않았을 때 기본값은 development이다. <br/>
NODE ENV에 따라 environment 값을 세팅해주면, 모니터링 사이트에서 development, production 두 옵션이 생긴다.

![스크린샷 2022-12-06 오후 2 52 52](https://user-images.githubusercontent.com/20683436/205829203-829866e6-1c8d-42dd-917d-38b6383e5159.png)

### next.config.js

Sentry를 이용하기 위해서는 next 웹팩 설정을 `withSentryConfig`로 감싸서 export 해야한다. <br/>
해당 설정은 파일을 build 할 때 적용되고, build 한 파일을 Sentry 서버에 업로드 한다.

```js
const { withSentryConfig } = require("@sentry/nextjs")

const moduleExports = {
  sentry: {
    hideSourceMaps: true
  }
}

const sentryWebpackPluginOptions = {
  silent: true
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
```

#### `hideSourceMaps`
소스맵 공개 여부로, false인 경우 production에 함께 올라가서 원본 코드가 브라우저에 노출된다.
|true|false|
|------|---|
|![스크린샷 2022-12-05 오후 3 56 28](https://user-images.githubusercontent.com/20683436/205827694-bb72e1cc-b0dc-4282-b606-19fd66787c56.png)|![스크린샷 2022-12-05 오후 3 49 18](https://user-images.githubusercontent.com/20683436/205827671-7aa25b3e-2099-4d34-ab6e-74114ccdb388.png)|
