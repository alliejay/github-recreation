// USER DATA SNIPPET

var userData = $.map(user, function(el, idx, arr) {
  return {avatar: el.avatar_url,
          name: el.name,
          login: el.login,
          location: el.location,
          created: el.created_at,
          followers: el.followers,
          followersURL: el.followers_url,
          starredURL: el.starred_url,
          following: el.following,
          followingURL: el.following_url
  }
});

// SIDE PANEL
var basicInfo = "<img src='" + userData[0].avatar + "' id='pfpic'><br>"
  + "<h1>" + userData[0].name + "</h1>"
  + "<h3>" + userData[0].login + "</h3>"
$('#top-side').append(basicInfo);

var secondaryInfo =
  "<span class='octicon octicon-location' id='OP'></span>"
  + "<h4>" + userData[0].location + "</h4><br>"
  + "<span class='octicon octicon-clock' id='OP'></span>"
  + "<h4> Joined on " + moment(userData[0].created).format('ll'); + "</h4>"
$('#second-side').append(secondaryInfo);

// SOCIAL COUNTS
var followerCount =
  "<h1 class='special'><a href='http://www.github.com/alliejay/followers'>"
  + userData[0].followers
  + "</h1>"
  + "<h5>Followers</h5></a>";

var starredCount =
  "<h1 class='special'><a href='http://www.github.com/stars'>"
  + 1 + "</h1>"
  + "<h5>Starred</h5></a>";

var followingCount =
  "<h1 class='special'><a href='http://www.github.com/alliejay/following'>"
  + userData[0].following
  + "</h1>"
  + "<h5>Following</h5></a>";

$('.s1').append(followerCount);
$('.s2').append(starredCount);
$('.s3').append(followingCount);


// REPO SNIPPET

var repoData = $.map(repos, function(el, idx, arr){
  return {title: el.name, lastUpdate: el.updated_at, language: el.language, stars: el.stargazers_count, forks: el.forks_count, url: el.svn_url};
});

var sortedRepos = _.sortBy(repoData, 'lastUpdate');

var reverseSort = sortedRepos.reverse();

var repoHTML = "";

_.each(reverseSort, function(el, idx, arr) {
    repoHTML += "<article class='rPreview'>"
    + "<section class='col-2 left'>"
    + "<h2><a href='" + el.url + "'>"
    + el.title + "</a></h2><br>"
    + "<h5> Updated "
    + moment(el.lastUpdate).fromNow('hh') + " ago</h5>"
    + "</section>"
    + "<section class='col-2 right'>"
    + "<h5 class='spaceOut'><strong>" + el.language
    + "</strong></h5>"
    + "<span class='octicon octicon-star'></span>"
    + "<h5 class='spaceOut'><strong>" + el.stars
    + "</strong></h5>"
    + "<span class='octicon octicon-git-branch'></span>"
    + "<h5 class='spaceOut'><strong>" + el.forks + "</strong></h5>"
    + "</section>"
    + "</article>";
  })

$('#contentArea1').append(repoHTML);


// PUBLIC ACTIVITY

var activityData = $.map(pubActivity, function(el, idx, arr) {
  return {type: el.type, time: el.created_at, userName: el.actor.login, repoName: el.repo.name, repoURL: el.repo.url, userPic: el.actor.avatar_url, ref: el.payload.ref, master: el.payload.master_branch, branch: el.payload.ref_type}
});

var paHTML = "";

_.each(activityData, function(el, idx, arr) {
  if(el.branch === 'repository'){ //REPOS
    paHTML += "<article class='paPreview'>"
    + "<section class='col-1'>"
    + "<span class='octicon octicon-repo spaceOut'></span>"
    + " "
    + "<h5><a href='http://www.github.com/alliejay'>"
    + el.userName
    + "</a>" + "</h5>" + " "
    + "<h5>created repository</h5>" + " "
    + "<h5><a href='" + el.repoURL + "'>"
    + el.repoName
    + "</a></h5>" + " "
    + "<h5 class='lighter'>" + moment(el.time).fromNow('hh')
    + " ago " + "</h5>"
    + "</section>"
    + "</article>"
  } else if (el.branch === 'branch') { //BRANCHES
    paHTML += "<article class='paPreview'>"
    + "<section class='col-1'>"
    + "<span class='octicon octicon-git-branch spaceOut'></span>"
    + " "
    + "<h5><a href='http://www.github.com/alliejay'>"
    + el.userName
    + "</a>" + "</h5>" + " "
    + "<h5>created branch</h5>" + " "
    + "<h5>" + el.master + "</h5>" + " "
    + "<h5> at </h5>" + " "
    + "<h5><a href='" + el.repoURL + "'>"
    + el.repoName
    + "</a></h5>" + " "
    + "<h5 class='lighter'>" + moment(el.time).fromNow('hh')
    + " ago " + "</h5>"
    + "</section>"
    + "</article>"
  } else { //PUSHES
    paHTML += "<article class='paPreview'>"
    + "<section class='col-1'>"
    + "<span class='octicon octicon-git-commit spaceOut'></span>"
    + " "
    + "<h5><a href='http://www.github.com/alliejay'>"
    + el.userName
    + "</a>" + "</h5>" + " "
    + "<h5>pushed to master at </h5>" + " "
    + "<h5><a href='" + el.repoURL + "'>"
    + el.repoName
    + "</a></h5>" + " "
    + "<h5 class='lighter'>" + moment(el.time).fromNow('hh')
    + " ago " + "</h5>"
    + "</section>"
    + "</article>";
  }
});

// ^ adjust all to pull from pubActivity, then message & sha will pull from push event if statment

$('#contentArea2').append(paHTML);

var contentArea1 = document.getElementById('contentArea1');
var contentArea2 = document.getElementById('contentArea2');
var switchPA = document.getElementById('switchPA');
var switchR = document.getElementById('switchR');

switchPA.addEventListener("click", function (event) {
  contentArea1.classList.add("hidden");
  contentArea2.classList.remove("hidden");
});

switchR.addEventListener("click", function (event) {
  contentArea1.classList.remove("hidden");
  contentArea2.classList.add("hidden");
});
