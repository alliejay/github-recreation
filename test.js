var date = moment(userData[0].created).format('ll');


var followerCount =
  "<h1><a href='http://www.github.com/alliejay/followers'>"
  + userData[0].followers
  + "</h1><br>"
  + "<h5>Followers</h5></a>";

var starredCount =
  "<h1><a href='http://www.github.com/stars'>"
  + 1 + "</h1><br>"
  + "<h5>Starred</h5></a>";

var followingCount =
  "<h1><a href='http://www.github.com/alliejay/following'>"
  + userData[0].following
  + "</h1><br>"
  + "<h5>Following</h5></a>";


  var socialInfo =
    "<h1><a href='http://www.github.com/alliejay/followers'>"
    + userData[0].followers
    + "</a></h1>"
    + "<h1><a href='http://www.github.com/stars'>"
    + 1 + "</a></h1>"
    + "<h1><a href='http://www.github.com/alliejay/following'>"
    + userData[0].following
    + "</a></h1>"
