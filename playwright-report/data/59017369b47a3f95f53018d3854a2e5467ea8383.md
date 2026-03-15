# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e12]: auth_login.sys
        - generic [ref=e13]: 🇰🇷 로그인
        - generic [ref=e14]: 워케이션 코리아 계정으로 로그인하세요
      - generic [ref=e16]:
        - generic [ref=e17]:
          - text: 이메일
          - textbox "이메일" [ref=e18]:
            - /placeholder: example@workcation.kr
        - generic [ref=e19]:
          - text: 비밀번호
          - textbox "비밀번호" [ref=e20]:
            - /placeholder: ••••••••
        - generic [ref=e21]:
          - generic [ref=e22]:
            - checkbox "로그인 상태 유지" [ref=e23]
            - text: 로그인 상태 유지
          - link "비밀번호 찾기" [ref=e24] [cursor=pointer]:
            - /url: /forgot-password
        - button "[ LOGIN ]" [ref=e25] [cursor=pointer]
        - generic [ref=e30]: 소셜 로그인 (준비중)
      - generic [ref=e31]:
        - paragraph [ref=e32]:
          - text: 아직 계정이 없으신가요?
          - link "무료 회원가입" [ref=e33] [cursor=pointer]:
            - /url: /register
        - link "← 홈으로 돌아가기" [ref=e34] [cursor=pointer]:
          - /url: /
  - button "Open Next.js Dev Tools" [ref=e40] [cursor=pointer]:
    - img [ref=e41]
  - alert [ref=e44]
```