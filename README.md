# webpro_06
2024年10月29日
# #このプログラムについて
# #ファイル一覧
ファイル名 | 説明 
-|-|
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
janken.ejs | プログラム本体
```javascript
console.log( 'Hello' );
```
# #使用方法
1. ターミナルで```node app5.js```を入力して起動する
1. Webブラウザでlocalhost:8080/public/janken.htmlにアクセスする
1. 自分の手を入力する

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"条件に合うか"}
win["勝ち"]
loose["負け"]

start --> if
if -->|yes| win
win --> end1
if -->|no| loose
loose --> end1
```




