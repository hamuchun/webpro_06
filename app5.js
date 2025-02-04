const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '';
  if (hand == cpu) {
    judgement = '引き分け';
  } else if (
    (hand == 'グー' && cpu == 'チョキ')
    (hand == 'チョキ' && cpu == 'パー')
    (hand == 'パー' && cpu == 'グー')
  ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }
  
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };
  
  
  res.render('janken', display);
});
app.get("/guess", (req, res) => {
  let userGuess = Number(req.query.guess);
  let correctNumber = Math.floor(Math.random() * 10);

  console.log({ userGuess, correctNumber });
  let result = '';

  if (userGuess == correctNumber) {
    result = '正解！';
  } else {
    result = `残念！正解は ${correctNumber} でした。`;
  }

  res.send(result);
});

const pokemonType = {
  ほのお: ['ヒトカゲ', 'リザードン', 'ブーバー', 'ファイヤー'],
  みず: ['ゼニガメ', 'カメックス', 'ギャラドス', 'シャワーズ'],
  くさ: ['フシギダネ', 'ナッシー', 'ラフレシア', 'ジュプトル']
};

app.get("/pokemon", (req, res) => {
  const type = req.query.type;
  let result = '';

  if (pokemonType[type]) {
    const pokemonList = pokemonType[type];
    const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
    result = randomPokemon;
  } 

  res.send(result);
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));

