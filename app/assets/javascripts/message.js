$(document).on('turbolinks:load', function() {

  function scroll(insertHTML){
    $('.messages').append(insertHTML).animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }
  function buildHTML(message){
    var image_html = message.image == null ? `` : `<img src="${message.image}" alt="">` ;

    var html = `<div class="message"data-message-id="${message.id}">
    <div class="upper-message">
      <div class="upper-message__user-name">${message.user_name}</div>
      <div class="upper-message__date">${message.created_at}</div>
    </div>
    <div class="lower-message">
      <p class="lower-message__content">${message.content}</p>
      <p class="lower-message__image">${image_html}</p>
    </div>
  </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('')
      $('.messages').animate({scrollTop: $('.message')[0].scrollHeight}, 'fast')
      $('.form__submit').prop("disabled", false);
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  })
  $(function(){
  var interval = setInterval(update,5000);
    function update() {
      if (location.pathname.match(/\/groups\/\d+\/messages/)) {
        $.ajax({
          url: location.href,
          type: 'GET',
          dataType: 'json',
        })
        .done(function(data){
          var id = $(".message:last").data("message-id");
          data.messages.forEach(function(message) {
            if (message.id > id){
              var html = buildHTML(message);
              $(".messages").append(html);
            }
          });
        })
        .fail(function(){
          alert('自動更新に失敗しました');
        })
      }
    }
  })
});
