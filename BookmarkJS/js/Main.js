//Listen for fourm Submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//save Bookmark
function saveBookmark(e){
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  if(!validateForm(siteName,siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  if(localStorage.getItem('bookmarks')== null){
    //int array
    var bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //add to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }else{
  //get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //add bookmar to array
  bookmarks.push(bookmark);
  //set it back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  fetchBookmarks();
//Prevent fourm from submitting
  e.preventDefault();
}

function deleteBookmark(url){
  //get bookmark from localStorage and deleteBookmark
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i = 0; i<bookmarks.length; i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i,1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  document.getElementById('myForm').reset();

  fetchBookmarks();
}

function fetchBookmarks(){
  //get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //get ouput id
  var bookmarksResults = document.getElementById('bookmarksResults');

  //build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i<bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = +bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class ="well">'+
                                  '<h3>'+name+
                                  '<a class = "btn btn-default" target = "_blank" href="'+url+'">Visit</a>  '+
                                  '<a onclick="deleteBookmark(\''+url+'\')" class = "btn btn-danger" href="#">Delete</a>'+
                                  '</h3>'+
                                  '</div>';
  }
}

function validateForm(siteName,siteUrl){
  if(!siteName || !siteUrl){
    alert('fill it in!');
    return fasle;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('use real url');
    return false;
  }
  return true;
}
