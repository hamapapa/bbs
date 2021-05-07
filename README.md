# bbs
Material Design for Bootstrap 5 &amp; Vue 3　と　GraphQL（Laravel）で掲示板を作ってみる

## laravel環境
laravel-graphqlディレクトリで.env.example をコピーして .envを作成

```
docker-compose up -d
```
でコンテナを立ち上げたら
```
docker-compose exec web bash
```
でコンテナに入って
```
composer install
php artisan key:generate
php artisan migrate
exit
```
後は localhost/graphql-playground にアクセスするとgrapqlを確認できる

## Vue環境
bbsディレクトリで下記コマンドを実行
```
npm start
```