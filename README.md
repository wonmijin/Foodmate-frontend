# 시연영상

https://github.com/wonmijin/Foodmate-frontend/assets/101543286/89ea4dfd-0c56-4566-85db-8e6d8869f89c



# Dir. Layout
```
├─api: API를 모아놓은 폴더입니다.
├─assets: logo와 같은 변하지않는 이미지를 모아놓은 폴더입니다.
├─components: 컴포넌트를 정의하는 폴더입니다.
│  ├─common: 공용 컴포넌트를 정의하는 폴더입니다.
├─constants: 상수를 정의하는 폴더입니다.
├─hooks: 커스텀hook을 정의하는 폴더입니다.
├─mocks: mock데이터를 모아놓은 폴더입니다.
├─pages: 각 페이지를 정의하는 폴더입니다.
├─store: 상태관리를 위한 폴더입니다.
├─styles: 공용으로 사용되는 스타일을 정의하는 폴더입니다.
├─types: 프론트 공용 타입을 정의하는 폴더입니다. 
└─utils: 자주사용되는 메소드를 정의하는 폴더입니다.
```

# Commit message rule
- feat : 새로운 기능의 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 스타일 관련 기능(코드 포맷팅, 세미콜론 누락, 코드 자체의 변경이 없는 경우)
- refactor: 코드 리펙토링
- test: 테스트 코트, 리펙토링 테스트 코드 추가
- chore: 빌드 업무 수정, 패키지 매니저 수정(ex .gitignore 수정 같은 경우)

# Git flow process
1. **작업할 항목에 대한 Issue를 다음과 같은 형식으로 작성한다. (Assignees)**
    - Title: [<commit message prefix>] <작업 제목>     ex) [docs] PR 템플릿 작성
    - Assignees: 본인
    - Labels: 제목에 포함된 commit message prefix와 연관된 심볼을 선택
    - Projects: `fontend project` -> `Status: In Progress`
2. **작업할 Branch를 `origin/develop` Branch를 기반으로 아래와 같은 이름으로 생성한다.**
    - feature/<작업자>-<Issue 번호>              ex) feature/suzy-#1
    - ex) ![image](https://github.com/withfoodmate/frontend/assets/96711699/59c32e5f-9f99-4f2c-ac0d-328fe0665da6)
3. **2번에서 생성한 Branch를 Checkout하고 Push한다.**
4. **해당 Branch에서 Issue에 해당하는 개발 작업을 하고 세분화해서 [Commit message rule](#commit-message-rule)에 맞게 Commit 후 Push를 한다.**
5. **모든 개발 작업이 완료되었다면, 해당 Branch를 `origin/develop` Branch로 Pull Request(이하 PR)를 아래와 같은 형식으로 생성한다.**
    - Title: FOODMATE <Issue 번호> <개발 작업을 포괄하는 제목>                   ex) FOODMATE #1 PR 템플릿 추가
    - Content: PR 작성 가이드를 참고해서 내용을 작성
    - Reviewers: 프론트엔드 팀원 모두 선택
    - Assignees: 본인
    - Labels: 개발 작업을 대표하는 심볼을 선택
    - ex) ![image](https://github.com/withfoodmate/frontend/assets/96711699/b4c16f4a-194f-4be6-9ac1-b319fec49299)

6. **모든 Reviewer가 코드 리뷰를 완료하면, PR 생성자가 Merge를 진행하고 해당 Branch를 삭제한다.**
    - 마지막 Reviewer는 PR 생성자를 멘션하여 PR 생성자에게 모든 코드 리뷰가 끝났다는 것을 알려준다.
7. **해당 Issue는 Close 한다.**
