// these functions are not polished jet || BIZA
// TODO polish functions

// add comment
function addComment() 
{
    var email = $('#email').val(); // jquery
    var content = $('#content').val();

    var transaction = db.transaction(['databasestore'], 'readwrite');
    // ask for object sore
    var store = transaction.objectStore('databasestore');

    // define comment
    var comment = {
        email: email,
        content: content
    }

    // perform add
    var request = store.add(comment);
    

    // callbacks
    request.onsuccess = function(e) {
        //window.location.href = 'index.php';
    }
    request.onerror = function(e) {
        alert('comment wans enerent');
        console.log('error', e.target.error.name);
    }
}
// show comments 
function showComments(nummer) {
    var transaction = db.transaction(['databasestore'], 'readonly');
    // ask for object sore
    var store = transaction.objectStore('databasestore');
    var index = store.index('email');

    var output = '';
    index.openCursor(null, 'prev').onsuccess = function(e) {
        var cursor = e.target.result;
        if (cursor) {
            output += '<div class="comment_div z-depth-1 comment_div_delete'+cursor.value.ID+'" >';
            output += '<div class="comment_email_div"><p class="comment_email flow-text">'+cursor.value.email+'</p></div>';
            output += '<div class="comment_content_div"><p class="comment_content flow-text">'+cursor.value.content+'</p></div>';
            //output += '<a class="waves-effect waves-light btn" onclick="deleteComment('+cursor.value.ID+')"><i class="material-icons ">cancel</i></a>';
            output +='</div>';
            cursor.continue();
        }
        console.log(nummer);
        if (nummer === 1) 
        {
            //$('#comment_content0').hide();
            $('#comment_content0').html(output);
            $('#comment_content0').ready(function() {
                $('#comment_content0').show();
                $('#comment_content1').hide();
            });
            
        }
        else if (nummer == 0)
        {
            //$('#comment_content1').hide();
            $('#comment_content1').html(output);
            $('#comment_content1').ready(function() {
                $('#comment_content1').show();
                $('#comment_content0').hide();
            });
        } 
        else 
        {
            $('#comment_content0').hide();
            $('#comment_content0').html(output);
            $('#comment_content0').ready(function() {
                $('#comment_content0').show();
                $('#comment_content1').hide();
            });
        }

    }
}
// delete comment
function deleteComment(id) {
    var transaction = db.transaction(['databasestore'], 'readwrite');
    // ask for object sore
    var store = transaction.objectStore('databasestore');

    var request = store.delete(id);

    // callbacks
    request.onsuccess = function(e) {
        console.log('comment deleted' + id);
        $('.comment_div_delete'+id).remove();
    }
    request.onerror = function(e) {
        alert('comment wans deleted');
        console.log('error', e.target.error.name);
    }
}
function get_comments() 
    {
        
        
        // ajax
        var ajax = new XMLHttpRequest();
        var method = 'GET';
        var url = 'include/data.php';
        var asynchronous = true;

        ajax.open(method, url, asynchronous);

        //sending ajax request
        ajax.send();

        // receiving response
        ajax.onreadystatechange = function() 
        {
            if(this.readyState == 4 && this.status == 200)
            {
                // db
                var transaction = db.transaction(['databasestore'], 'readwrite');
                // ask for object sore
                var store = transaction.objectStore('databasestore');
                var data = JSON.parse(this.responseText);
                //console.log(data);
                //delete old stuff
                var request = store.clear();

                // callbacks
                request.onsuccess = function(e) 
                {
                    for (i = 0; i < data.length; i++)
                    { 
                        store.put(data[i]);
                        //console.log(data[i]);
                    } 
                }
                request.onerror = function(e)
                {
                    alert('database wans cleaned');
                    console.log('error', e.target.error.name);
                }
                
            }
        }
    }
    function addCommentMYSQL() 
    {
        var email = $('#email').val(); // jquery
        var content = $('#content').val();
        
        $.ajax({
            type: "POST",
            url: "function/insertmessage.php",
            data: "email=" + email+ "&content=" + content,
            success: function(data) {
            alert("sucess");
            }
        });

    }    
