---
- name: "{{name}}"
- description: "{{description}}"
- author: "{{author}}"
- github-id: "{{github-id}}"
---


## git

```sh
# xcli 설치
npm i -g xcli

# git make(remote 설치, local -> remote)
xgit -e make -n {{name}} -u {{github-id}} -d {{description}}

# git copy(remote -> local)
xgit -e copy -n {{name}} -u {{github-id}}

# init app(create project with template + git make)
xcli -e init "{{name}}||{{github-id}}||{{template}}||{{description}}"
```

## install packages

```sh
npm i
```

## populate data

```sh
# 1. Prisma 클라이언트 생성
npm run prisma:generate

# 2. 데이터베이스 마이그레이션 실행
npm run prisma:migrate

# 3. 목데이터 삽입
npm run prisma:seed
```

## start server

```sh
npm run dev
```

## check graphql

"""
http://localhost:4000
"""

```gql
query ExampleQuery {
  health

  users {
    email
  }
}
```

## publish

```sh
# npm login
npm login {{github-id}}

# windows
./publish.bat

# macos
./publish.sh
```


## docker

```sh
docker-compose down -v

docker-compose up -d
docker-compose exec selenium bash


sudo apt-get update
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs


cd /app
npm install

npx ts-node -r module-alias/register src/tests/lib.web.chromeBasic.ts
# docker-compose up -d --build

----

docker-compose exec app /bin/bash

cd /app
npx ts-node -r module-alias/register src/tests/lib.web.chromeBasic.ts


docker-compose exec app npx ts-node -r module-alias/register src/tests/lib.web.chromeBasic.ts

docker-compose exec app npm install -g ts-node typescript
```



