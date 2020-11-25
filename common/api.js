function requestUserRank(language, location, page, callback){
  var GET_URL_JSONP;
  if (language === 'All language') {
    GET_URL_JSONP = 'https://api.github.com/search/users?sort=followers&page='+page+'&q=location:'+location;

  } else {
    GET_URL_JSONP = 'https://api.github.com/search/users?sort=followers&page='+page+'&q=language:'+language;
    if (location !== 'World') {
      GET_URL_JSONP = GET_URL_JSONP + '%20location:' + location;
    }
  }
  request({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data.items);
  }, function(response) {
    console.log('get in progress:' + response.length);
  });
}

function requestRepRank(language,page){
  return new Promise((resolve, reject) => {
    var GET_URL_JSONP = 'https://api.github.com/search/repositories?sort=stars&order=desc&page='+page+'&q=language:'+language;

    request({
      method: 'GET',
      url: GET_URL_JSONP,
      type: 'json'
    }, function(ret) {
      if (!ret.ok) {
      } else {
      }
      resolve(ret.data ? ret.data.items : null);
    }, function(response){
      console.log('get in progress:' + response.length);
    });
  });
}

function request (params, success, fail) {
  let data = params;
  data.success = function (res) {
    if (success) {
      success(res);
    }
  };
  data.fail = function (res) {
    if (success) {
      success(res);
    }
  };
  tt.request(data);
}

function requestUserDetail(login, callback){
  var GET_URL_JSONP = 'https://api.github.com/users/'+login;

  request({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if(!ret.ok){
    }else{
    }

    callback(ret.data);
  },function(response){
  });
}


function requestUserReps(userName, page, callback) {
  var GET_URL_JSONP = 'https://api.github.com/users/' + userName + '/repos?sort=updated&page=' + page;

  request({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data);
  }, function(response){
    console.log('get in progress:' + response.length);
  });
}

function requestUserFollowing(userName, page, callback){
  var GET_URL_JSONP = 'https://api.github.com/users/' + userName + '/following?page=' + page;

  request({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data);
  }, function(response){
    console.log('get in progress:' + response.length);
  });
}

function requestUserFollowers(userName, page, callback) {
  var GET_URL_JSONP = 'https://api.github.com/users/' + userName + '/followers?page=' + page;
  request({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data);
  }, function(response){
    console.log('get in progress:' + response.length);
  });
}

function requestRepoContributors(userName, repositoryName, page, callback) {
  var GET_URL_JSONP = 'https://api.github.com/repos/' + userName + '/' + repositoryName + '/contributors?page=' + page;
  request({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data);
  }, function(response){
    console.log('get in progress:' + response.length);
  });
}

function requestRepoStargazers(userName, repositoryName, page, callback){
  var GET_URL_JSONP = 'https://api.github.com/repos/' + userName + '/' + repositoryName + '/stargazers?page=' + page;
  request({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data);
  }, function(response){
    console.log('get in progress:' + response.length);
  });
}


function requestRepoForks(userName, repositoryName, page, callback){
  // var GET_URL_JSONP = 'https://api.github.com/repos/' + userName + '/' + repositoryName + '/forks?page=' + page;
  var GET_URL_JSONP = `https://api.github.com/repos/${userName}/${repositoryName}/forks?page=${page}`;
  request({
    method: 'GET',
    url: GET_URL_JSONP,
    type: 'json'
  }, function(ret) {
    if (!ret.ok) {
    } else {
    }
    callback(ret.data);
  }, function(response){
    console.log('get in progress:' + response.length);
  });
}
exports.requestRepRank = requestRepRank
exports.requestUserRank = requestUserRank
exports.requestUserDetail = requestUserDetail
exports.requestUserReps = requestUserReps
exports.requestUserFollowing = requestUserFollowing
exports.requestUserFollowers = requestUserFollowers
exports.requestRepoContributors = requestRepoContributors
exports.requestRepoStargazers = requestRepoStargazers
exports.requestRepoForks = requestRepoForks