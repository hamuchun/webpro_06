"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');

function updateMessages() {
    fetch("/read", {
        method: "POST",
        body: 'start=0',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => response.json())
    .then(response => {
        bbs.innerHTML = '';
        response.messages.forEach((mes, index) => {
            let cover = document.createElement('div');
            cover.className = 'cover';
            let name_area = document.createElement('span');
            name_area.className = 'name';
            name_area.innerText = `${index}: ${mes.name}`;
            let mes_area = document.createElement('span');
            mes_area.className = 'mes';
            mes_area.innerText = mes.message;
            let like_button = document.createElement('button');
            like_button.className = 'like-button';
            like_button.innerText = `👍 ${mes.likes || 0}`;
            like_button.addEventListener('click', () => {
                fetch("/like", {
                    method: "POST",
                    body: `index=${index}`,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(response => response.json())
                  .then(data => {
                      if (data.status === "success") {
                          like_button.innerText = `👍 ${data.likes}`;
                      } else {
                          alert(data.message);
                      }
                  }).catch(error => {
                      console.error("Error updating likes:", error);
                  });
            });
            cover.appendChild(name_area);
            cover.appendChild(mes_area);
            cover.appendChild(like_button);
            bbs.appendChild(cover);
        });
    });
}

document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    fetch("/post", {
        method: "POST",
        body: `name=${name}&message=${message}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(() => {
        document.querySelector('#message').value = "";
        updateMessages();
    });
});

document.querySelector('#check').addEventListener('click', () => {
    updateMessages();
});

document.querySelector('#delete').addEventListener('click', () => {
    const index = prompt("削除する投稿の番号を入力してください:");
    fetch("/delete", {
        method: "POST",
        body: `index=${index}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(response => response.json())
      .then(data => {
          alert(data.message);
          updateMessages();
      });
});

document.querySelector('#edit').addEventListener('click', () => {
    const index = prompt("編集する投稿の番号を入力してください:");
    const newMessage = prompt("新しいメッセージを入力してください:");
    fetch("/edit", {
        method: "POST",
        body: `index=${index}&message=${newMessage}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(response => response.json())
      .then(data => {
          alert(data.message);
          updateMessages();
      });
});

document.querySelector('#search').addEventListener('click', () => {
    const keyword = prompt("検索するキーワードを入力してください:");
    fetch("/search", {
        method: "POST",
        body: `keyword=${keyword}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(response => response.json())
      .then(data => {
          alert(`検索結果: ${JSON.stringify(data.results)}`);
      });
});
