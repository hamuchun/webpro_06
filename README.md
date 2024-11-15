# webpro_06
2024/11/12
# #このプログラムについて
# #ファイル一覧
ファイル名 | 説明 
-|-|
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
public/guess.html | 数字当てゲームの開始画面
public/pokemon.html | ポケモンガチャの開始画面
janken.ejs | プログラム本体
guess.ejs |プログラム本体
pokemon.ejs |プログラム本体

```javascript

```
# #使用方法
1. ターミナルで```node app5.js```を入力して起動する
1. Webブラウザでlocalhost:8080/public/janken.htmlにアクセスする
1. Webブラウザでlocalhost:8080/public/guess.htmlにアクセスする
1. Webブラウザでlocalhost:8080/public/pokemon.htmlにアクセスする
1. 自分の手や数字,タイプを入力し送信する
# #フローチャート(janken)
```mermaid
flowchart TD;
start["開始"];
user["ユーザーの手を取得"]
cpu["cpuがランダムに手を取得"]
end1["終了"]
if["勝敗の判断"→userが 'グー'の時cpuは'チョキ'
    user が 'チョキ'の時 cpuは'パー'
    userが 'パー'の時cpu は'グー']
win["勝ち"]
loose["負け"]
same[あいこ]
start --> user
user --> cpu
cpu --> if
if -->|yes| win
win --> end1
if -->|no| loose
loose --> end1
if -->|same| same
same --> end1
```
# #フローチャート(guess)
```mermaid
flowchart TD;
start["開始"];
user["ユーザーの選んだ数字を取得"]
cpu["cpuがランダムに数字を取得"]
end1["終了"]
if["userの選んだ数字とcpuの選んだ数字を比較"]
win["正解"]
loose["不正解"]
start --> user
user --> cpu
cpu --> if
if -->|一致| win
win --> end1
if -->|不一致| loose
loose --> end1
```
# #フローチャート(pokemon)
```mermaid
flowchart TD;
start["開始"];
type1[ほのお]
type2[みず]
type3[くさ]
judge[指定されたタイプは存在するか判断]
user["ユーザー選んだタイプを取得"]
a["ヒトカゲ,リザードン,ブーバー,ファイヤー"]
b["ゼニガメ,カメックス,ギャラドス,シャワーズ"]
c["フシギダネ,ナッシー,ラフレシア,ジュプトル"]
cpu["cpuがランダムにポケモンを取得"]
result["選択されたポケモンを排出"]
end1["終了"]
if["対応するタイプのリストからポケモンを選択"]
start --> user
user --> cpu
cpu --> judge
judge -->type1
judge -->type2
judge -->type3
type1 -->|であれば| a
type2 -->|であれば| b
type3 -->|であれば| c
 a --> if
 b --> if
 c --> if
if -->result
result --> end1
```

