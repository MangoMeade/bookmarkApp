var theForm = document.getElementById("theForm");
theForm.addEventListener('submit', saveBookmark);

var websiteName;
var url;
var details;
var bookmark;
var bookmarkList;
var bookmarkDiv;
var expression;
var regex;

fetchBookmarks();

function saveBookmark(e){
    e.preventDefault();

    websiteName = document.getElementById("websiteName").value;
    url = document.getElementById("url").value;
    details = document.getElementById("details").value;
    bookmark = {
        name: websiteName,
        url: url,
        details: details
    };
    bookmarkList = [];

    if (!validateForm(websiteName, url)) {
        alert('Fill out the form correctly');
        return false;
    }

    if(localStorage.getItem('bookmarks') === null) {
        bookmarkList = [];
        // Add to array
        bookmarkList.push(bookmark);
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
        }
        else {
        bookmarkList = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarkList.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
    }

    fetchBookmarks();
    theForm.reset();

}

function fetchBookmarks(){
    bookmarkList = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarkDiv = document.getElementById("bookmarkList");

    bookmarkDiv.innerHTML = "";
    for (var i = 0; i < bookmarkList.length; i++){
        var name = bookmarkList[i].name;
        var url = bookmarkList[i].url;
        var details = bookmarkList[i].details;

        bookmarkDiv.innerHTML += '<div>' +
                                    '<h3>' +
                                        '<a href=https://www.' + url + '>' + name + '</a>' +
                                        ' <a onclick="deleteBookmark(\''+url+'\')" href="#">Delete Bookmark</a> ' +
                                        ' <a  >' + details + '</a> ' +
                                    '</h3>' +
                                '</div>';
    }
}

function deleteBookmark(url){
    bookmarkList = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i = 0; i < bookmarkList.length; i++){
        if (bookmarkList[i].url === url){
            bookmarkList.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));

    fetchBookmarks();
    console.log(bookmarkList);
}

function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    //alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    // alert('Please use a valid URL');
    return false;
  }

  return true;
}