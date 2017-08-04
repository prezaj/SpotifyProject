

var spotURL='https://api.spotify.com'

var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' +
    '<a class="js-thumbnail" href=""> <img src=""> </a> <br> <a class="js-result-name" href="" target="_blank"> </a> on channel <a class="js-channel" target="_blank"></a></h2>' +

  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var query = {
    client_id: 'cabf930fb8434297871b05436f64f672',
    client_secret: 'c5ec6aad0b064d9391cbe93f11045fd5',
    redirect_uri: '', //Need to add this!! How? https://developer.spotify.com/web-api/authorization-guide/
    response_type: 'code',
    q: searchTerm + " in:name",
    SEARCH_URL: 'https://api.spotify.com/v1/users/',
    per_page: 5
  }
  console.log( $.getJSON(query.SEARCH_URL, query, callback))
  $.getJSON(query.SEARCH_URL, query, callback);
}


function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  /*template.find(".js-result-name").text(result.snippet.title).attr("href", 'https://www.youtube.com/watch?v='+result.id.videoId);
  template.find("img").prop("src",result.snippet.thumbnails.medium.url);
  template.find(".js-thumbnail").attr("href", 'https://www.youtube.com/watch?v='+result.id.videoId);
  template.find(".js-channel").text(result.snippet.channelTitle).attr("href", 'https://www.youtube.com/channel/'+result.snippet.channelId);*/
  return template;
}

function displaySearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displaySearchData);
  });
}

$(watchSubmit);
