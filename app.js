var searchResults = {};
function urlEncode(object) {
				var html = '';
				for (var key in object) {
					html += key + '=' + object[key] + '&';
				}

				return (html);
			}
	
function search(){
var params = {
					term: jQuery('#search-keyword').val(),
					country: "US",
					media: "music",
					entity: "musicTrack",
					limit: 200,
					callback: "parseResults"
				};
				var params = urlEncode(params);

				var url = "https://itunes.apple.com/search?" + params;
				var html = '<script src="' + url + '"><\/script>';
				jQuery('head').append(html);
}
function parseResults(result) {
				var results = result.results;
				searchResults = result;
				var html = "";
				var pages = Math.ceil(results.length/20);
				for (var i = 0; i < pages; i++){
					var pageNumber = i+1;
					html += '<input  type = "button" class = "pageButton" value = "'+pageNumber+'" onclick= "goToPage('+pageNumber+');">';
				}
				html += '<br><br>';
				for (var i = 0; i < 20  && i < results.length; i++) {
					var item = results[i];
					var obj = {
						source: 0,
						track_id: item.trackId,
						track_name: item.trackCensoredName,
						track_url: item.trackViewUrl,
						artist_name: item.artistName,
						artist_url: item.artistViewUrl,
						collection_name: item.collectionCensoredName,
						collection_url: item.collectionViewUrl,
						genre: item.primaryGenreName
					};

					html += '<div class="songs-search-result">';

					html += '<p><strong>Track: </strong>{0}&nbsp;&nbsp;'.replace("{0}", obj.track_name);
					html += '<a href="{0}" target="_blank">Preview</a>&nbsp;&nbsp;'.replace("{0}", item.previewUrl);
					html += '<a href="{0}" target="_blank">Full Song</a>&nbsp;&nbsp;'.replace("{0}", obj.track_url);
					html += '<strong>Track Price: </strong>{0} {1}</p>'.replace("{0}", item.trackPrice).replace("{1}", item.currency);
					html += '<p><strong>Artist: </strong><a href="{0}" target="_blank">{1}</a></p>'.replace("{0}", obj.artist_url).replace("{1}", obj.artist_name);
					html += '<p><strong>Album: </strong><a href="{0}" target="_blank">{1}</a></p>'.replace("{0}", obj.collection_url).replace("{1}", obj.collection_name);
					html += '<p><strong>Album Price: </strong>{0} {1}</p>'.replace("{0}", item.collectionPrice).replace("{1}", item.currency);
					html += '<p><strong>Primary Genre: </strong>{0}</p>'.replace("{0}", obj.genre);					
					html += '</div>';
					html += '<br>';
					html += '<div class="separator"></div>';
					html += '<br>';
				}
				jQuery('#results').html(html);
			}
			
function goToPage(page){
	var results = searchResults.results;
				var html = "";
				var pages = Math.ceil(results.length/20);
				for (var i = 0; i < pages; i++){
					var pageNumber = i+1;
					html += '<input class = "pageButton" type = "button" value = "'+pageNumber+'" onclick= "goToPage('+pageNumber+');">';
				}
				html += '<br><br>';
				if (page === 0){
					page = 1;
				}
				var firstResult = (page-1)*20;
				var lastResult  = 0;
				if (results.length >= page*20){
					lastResult = page*20;
				}
				else {
					lastResult = results.length;
				}
				for (var i = firstResult; i < lastResult; i++) {
					var item = results[i];
					var obj = {
						source: 0,
						track_id: item.trackId,
						track_name: item.trackCensoredName,
						track_url: item.trackViewUrl,
						artist_name: item.artistName,
						artist_url: item.artistViewUrl,
						collection_name: item.collectionCensoredName,
						collection_url: item.collectionViewUrl,
						genre: item.primaryGenreName
					};

					html += '<div class="songs-search-result">';

					html += '<p><strong>Track: </strong>{0}&nbsp;&nbsp;'.replace("{0}", obj.track_name);
					html += '<a href="{0}" target="_blank">Preview</a>&nbsp;&nbsp;'.replace("{0}", item.previewUrl);
					html += '<a href="{0}" target="_blank">Full Song</a>&nbsp;&nbsp;'.replace("{0}", obj.track_url);
					html += '<strong>Track Price: </strong>{0} {1}</p>'.replace("{0}", item.trackPrice).replace("{1}", item.currency);
					html += '<p><strong>Artist: </strong><a href="{0}" target="_blank">{1}</a></p>'.replace("{0}", obj.artist_url).replace("{1}", obj.artist_name);
					html += '<p><strong>Album: </strong><a href="{0}" target="_blank">{1}</a></p>'.replace("{0}", obj.collection_url).replace("{1}", obj.collection_name);
					html += '<p><strong>Album Price: </strong>{0} {1}</p>'.replace("{0}", item.collectionPrice).replace("{1}", item.currency);
					html += '<p><strong>Primary Genre: </strong>{0}</p>'.replace("{0}", obj.genre);
					html += '</div>';
					html += '<br>';
					html += '<div class="separator"></div>';
					html += '<br>';
				}
				
				jQuery('#results').html(html);
			}
			
			
			
			
			
