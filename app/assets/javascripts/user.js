$(document).on('turbolinks:load', function() {

  var user_list = $("#user-search-result");
  var add_user_list = $('.chat-group-users');
  
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    user_list.append(html);
  }
  
  function appendNoUser(user){
    var html = `<div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">${ user }</p>
                 </div>`
    user_list.append(html);
  }
  
  function addUser(userId, userName){
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                   <input name='group[user_ids][]' type='hidden' value='${ userId }' class='chatuserid'>
                   <p class='chat-group-user__name'>${ userName }</p>
                   <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                 </div>`
    add_user_list.append(html);
  }
  
    $('#user-search-field').on('keyup', function(){
      var input = $('#user-search-field').val();
  
      $.ajax({
        type: 'get',
        url: '/users',
        data: {keyword: input},
        dataType: 'json'
      })
  
      .done(function(users){
        $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser('一致するユーザはいません')
        }
      })
      .fail(function() {
        alert('検索に失敗しました')
      });
    });
  
    $('#user-search-result').on('click', '.user-search-add', function(){
      var user = $(this);
      var userId = $(this).attr('data-user-id');
      var userName = $(this).attr('data-user-name');
      addUser(userId, userName);
      $(this).parent().remove();
    });
  
    $('#chat-group-user-8').on('click', '.user-search-remove', function(){
      $(this).parent().remove();
    });
  });
  
  