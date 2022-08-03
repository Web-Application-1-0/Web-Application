
 let createComment= function() {
     // console.log("1st");
        let newCommentForm = $('#new-comment-form');
       // console.log(newCommentForm);
        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post', 
                url: '/comments/create',
                data:newCommentForm.serialize(),
                success : function(data){
                    console.log(data);
                   let newComment= newCommentDom(data.data);
                    //console.log(newComment);
                   $('.post-comment-list>ul').prepend(newComment);
                  
                   deleteComment($('#delete-comment-button',newComment));

                },error: function(error){
                    console.log(error,responseText);
                }
            });

        });
}
createComment();

 newCommentDom =  function(data){
    return (`<li id="comment-${data.comment._id}"> 
    <p>
       
            <small>
                <a id="delete-comment-button" href="/comments/destroy/${ data.comment._id }">X</a>
            </small>
        ${ data.comment.content} 
        <br>
        <small>
            ${ data.username } 
        </small>
    </p>

</li>`);
}


//method to delete a comment from DOM

let deleteComment = function(deleteLink){ //here deleteLink chosen as we'll pass href tag and simulate a click on it
    console.log(deleteLink);
    $(deleteLink).click(function(e){
        console.log("1th");
      e.preventDefault();
 
      $.ajax({
           type : 'get',
           url : $(deleteLink).prop('href'),//value of href in a tag
           success : function(data){// this data has id of the post to be deleted
          console.log(data);
          console.log("hello2");
            $(`#comment-${data.data.comment_id}`).remove();// #post used as we are changing otherwise #get would be used, it removes post from dom
           },error:function(error){
               console.log(error.responseText);
           }
      });
    });
 }