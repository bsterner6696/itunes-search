function urlEncode(object) {
				var html = '';
				for (var key in object) {
					html += encodeURIComponent(key) + '=' + encodeURIComponent(object[key]) + '&';
				}

				return (html);
			}
			
function search(){
var params = {
					term: encodeURIComponent(jQuery('#search-keyword').val()),
					country: "US",
					media: "music",
					entity: "musicTrack",
					//attribute: 'artistTerm,albumTerm,songTerm,musicTrackTerm',
					limit: 20,
					callback: "parseResults"
				};
				var params = urlEncode(params);

				var url = "https://itunes.apple.com/search?" + params;
				var html = '<script src="' + url + '"><\/script>';
				jQuery('head').append(html);
}
function parseResults(result) {
				var results = result.results;
				var html = "";
				for (var i = 0; i < results.length; i++) {
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
					results[i] = obj;

					html += '<div class="songs-search-result">';

					html += '<span class="label">Track:</span>{0}&nbsp;&nbsp;'.replace("{0}", obj.track_name);
					html += '<a href="{0}" target="_blank">Preview</a>&nbsp;&nbsp;'.replace("{0}", item.previewUrl);
					html += '<a href="{0}" target="_blank">Full Song</a>&nbsp;&nbsp;'.replace("{0}", obj.track_url);
					html += '<span class="label">Track Price:</span>{0} {1}<br />'.replace("{0}", item.trackPrice).replace("{1}", item.currency);
					html += '<span class="label">Artist:</span><a href="{0}" target="_blank">{1}</a><br />'.replace("{0}", obj.artist_url).replace("{1}", obj.artist_name);
					html += '<span class="label">Collection:</span><a href="{0}" target="_blank">{1}</a><br />'.replace("{0}", obj.collection_url).replace("{1}", obj.collection_name);
					html += '<span class="label">Collection Price:</span>{0} {1}<br />'.replace("{0}", item.collectionPrice).replace("{1}", item.currency);
					html += '<span class="label">Primary Genre:</span>{0}<br />'.replace("{0}", obj.genre);

					html += '</div>';
				}
				jQuery('#results').html(html);
			}