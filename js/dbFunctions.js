// these functions are not polished jet || BIZA

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
    function addCommentMYSQL() {
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
// from here are cleaned functinons
// gets slovicka from DB using Dexie.js || BIZA
function dbGetSlovicka() {   
    // ajax   
    $.ajax({
        type: "POST",
        url: "phpRequests/getSlovnik.php",
        data: "check",
        success: function(data) {    
            //alert(data);
            data = JSON.parse(data);
            //console.log(data);    
            db[sortStoreName].clear();    
            db[sortStoreName].bulkPut(data).then(function(lastKey) {
               
            }).catch(Dexie.BulkError, function (e) {
                
                console.log("addin data didnt work ");
            });
        }
        
    
    });      
}
// shows search result || BIZA
// TODO change to get and render.js
function getSearchResult() {    
    // search value 
    var searchValue = $('#nazev').val();
    // smart searchs    
    db[sortStoreName].where(czechIndexName).startsWithIgnoreCase(searchValue).toArray(function (data) {
        //console.log(data); // showing results
        showSearchResult(data);
    });
   
   

    
    
}