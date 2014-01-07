// Avoid `console` errors in browsers that lack a console
// https://github.com/h5bp/html5-boilerplate/blob/master/js/plugins.js
(function() {
    var method,
        noop = function() {},
        methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ],
        length = methods.length,
        console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
/////--
/////--
/////-- ;(function(window, document, $, undefined) {
/////--     "use strict"; // best practice
/////--
/////--
/////-- /*/ Setup an event listener for the form that will execute checkUser()
/////-- // when the form is submitted.
/////-- $(function() {
/////--     // extract and decode hash
/////--     var hash = decodeURIComponent(window.location.hash.substr(1)),
/////--         field = document.tweetfinder.user;
/////--
/////--     if (hash) {
/////-- 	   if (hash[0] != '#') {
/////--             // Do the user magic
/////--             checkUser(hash, function() {
/////--                 enable_realtime_update(hash);
/////--             });
/////--
/////--         } else {
/////--             // Do the search magic
/////--             getLinks(hash);
/////--             console.log(hash);
/////--             enable_realtime_update(hash);
/////--         }
/////--
/////--         // Fill field
/////--         field.value = hash;
/////--     } else {
/////--         enable_realtime_update("davidbauer");
/////--     }
/////--
/////--
/////--     $('#searchform').submit(function(e) {
/////--         // Stop the form from sending and reloading the page
/////--         e.preventDefault();
/////--         // clean up
/////--         $('#bugfixing').html("");
/////--         $('#embeds div').html("");
/////--         $('.userinfo').html("");
/////--         //reset search api request counter, max_id and link counter
/////--         searchApiRequests = 0;
/////--         since_id = null;
/////--         linksTotal = 0;
/////--
/////--         // Get the articles from typed user
/////--         var myInput = getInput();
/////--
/////--         //proceed with either hashtag or username
/////--         if (myInput[0] == '#') {
/////-- 	        getLinks(myInput);
/////-- 	         // Update URL
/////-- 	         window.location.hash = "%23" + myInput.substring(1);
/////--         }
/////--
/////--         else {
/////--         	if (myInput != "usernameistoolong") {
/////--         		checkUser(myInput);
/////--                 enable_realtime_update(myInput);
/////--         		}
/////--         		 // Update URL
/////--         		 window.location.hash = myInput;
/////--         	}
/////--
/////--     });
/////-- });
/////--
/////-- */
/////--
/////-- /*
/////-- $(function() {
/////--
/////--     $('.linkinput').live('click', function(e) {
/////--         e.preventDefault();
/////--
/////--         var myInput = $(this).attr('data-user');
/////--
/////--         setInput(myInput);
/////--
/////--         $('#searchform').submit();
/////--     });
/////-- });
/////-- */
/////--
/////-- function warn(message) {
/////--     $('#bugfixing').html("<div class='alert'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Warning! </strong>" + message + "</div>");
/////--     console.log("warning: " + message);
/////-- }
/////--
/////-- // store username given via input
/////-- function getInput() {
/////--     var myInput;
/////--
/////--     // check if a hashtag is entered
/////--     if (document.tweetfinder.user.value[0] == "#") {
/////-- 	    myInput = document.tweetfinder.user.value;
/////--
/////--     }
/////--
/////--     else {
/////--
/////-- 		// Check if cleanup of the @ is needed
/////-- 	    if (document.tweetfinder.user.value[0] == "@") {
/////-- 	        myInput = document.tweetfinder.user.value.substring(1,20); //get rid of the @
/////-- 	    }
/////-- 	    else { myInput = document.tweetfinder.user.value };
/////--
/////-- 	    // Validate length of username
/////-- 	     if (myInput.length > 16) { // TODO: if true, return error msg and don't continue
/////-- 	        warn("This doesn't seem to be a username, too long.");
/////-- 	        return "usernameistoolong";
/////-- 	     }
/////--     }
/////--     return myInput;
/////-- }
/////--
/////-- function setInput(myInput) {
/////--     document.tweetfinder.user.value = myInput;
/////-- }
/////--
/////-- // call info about username via twitter api and get link data
/////-- function checkUser(myInput, success) {
/////--     if (typeof success == "undefined") {
/////--         success = function() {/* empty fun */};
/////--     }
/////--     $.ajax({
/////--         url: 'https://api.twitter.com/1/users/show.json',
/////--         data: {
/////--             screen_name: myInput,
/////--             include_entities: true,
/////--             suppress_response_codes: true
/////--         },
/////--         dataType: 'jsonp',
/////--         success: function(data) {
/////--             var html = "";
/////--
/////--             if (data.error) {
/////--                 warn("Twitter doesn't know this username. Try another one.");
/////--             }
/////--
/////--             else if (data.protected == true) {
/////-- 	            warn("This user's tweets are protected. Can't access them. Try another one.");
/////--             }
/////--
/////--             else {
/////--                 success();
/////--                 var created = new Date(data.created_at),
/////--                     name = data.name,
/////--                     username = data.screen_name,
/////--                     followersNumber = data.followers_count,
/////--                     tweetsNumber = data.statuses_count;
/////--
/////--                 var user = data;
/////--
/////--                 html += "The latest links posted by <a href='https://www.twitter.com/" + username + "'>" + name + "</a>. <iframe allowtransparency='true' frameborder='0' scrolling='no' src='//platform.twitter.com/widgets/follow_button.html?screen_name=" + username + "' style='width:250px; height:20px;margin-left:8px;'></iframe>"
/////--
/////--
/////--                 getLinks(myInput); // getting those links from tweets
/////--             }
/////--
/////--             //update headline and userinfo
/////--             label(myInput);
/////--             showProfile(user);
/////--         }
/////--     });
/////-- }
/////--
/////-- function label(myInput,isLoggedIn) {
/////-- 		$('#demo').html("");
/////-- 		if(isLoggedIn && decodeURIComponent(window.location.hash) == "") {
/////-- 			$('h1').html("Your timeline, instacurated");
/////-- 			document.title = "Your timeline, instacurated"; // add input to page title
/////-- 			}
/////-- 		else {
/////-- 			$('h1').html(myInput + ", instacurated"); // add input name to headline
/////-- 			document.title = myInput + ", instacurated"; // add input to page title
/////-- 			}
/////--         }
/////--
/////-- function showProfile(myInput) {
/////-- 	var embeds_columns = $('#embeds div.column');
/////-- 	var $userinfo = $('<div class="userinfo"/>');
/////-- 	if (myInput[0] == "#") {} // might add some info later
/////-- 	else {
/////-- 	$(embeds_columns[0]).append($userinfo);
/////-- 	$userinfo.append("<h3>" + myInput.name + "</h3><p class='userimg' style='background:url(" + myInput.profile_image_url.replace(/_normal(\.[a-z]{3,4})$/, '_bigger$1') + ");'></p>");
/////-- 	$userinfo.append(myInput.name + ": " + myInput.description + "<br />");
/////-- 	if(myInput.url) {$userinfo.append("<a href='" + myInput.url + "'>" + myInput.url + "</a><br />")};
/////-- 	$userinfo.append("<iframe allowtransparency='true' frameborder='0' scrolling='no' src='//platform.twitter.com/widgets/follow_button.html?screen_name=" + myInput.screen_name + "' data-size='large' class='userfollow'></iframe>");
/////-- 		 }
/////-- }


function Tweet(t, urlEntity, container, add_by) {
    this.text = t.text;
    this.retweets = t.retweet_count;
    this.img = t.user.profile_image_url;
    this.realname = t.user.name;
    this.accountname = t.user.screen_name;
    this.id = t.id_str;
    this.link = urlEntity.expanded_url;
    this.debug = true;
    // this.embedCacheUrl = 'http://instacurate.com/embed-cache.php?url=';
    // I used my own embed.ly API-Key so instacurate.com wont run into rate limits
    this.embedCacheUrl = 'http://api.embed.ly/1/oembed?key=ab0fdaa34f634136bf4eb2325e040527&url=';

	var date = new Date(t.created_at);
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	this.tstamp =  date.getDate() + ". " + months[date.getMonth()] + " " + date.getFullYear();
    var tw = this;

    this.init = function(url, container) {
        $.getJSON(this.embedCacheUrl + url + '&maxwidth=370&callback?', function(embed) {
            // maxwidth needed for correct multimedia element size
            if(embed.error) {
                console.log("Error on requesting '"+link+"': "+embed.error);
            } else {
                tw.title = embed.title;
                tw.description = embed.description;
                tw.url = embed.url;
                tw.provider = embed.provider_name;
                tw.provider_url = embed.provider_url;
                tw.img_url = embed.thumbnail_url;
                tw.img_width = embed.thumbnail_width;
                tw.author = embed.author_name;
                tw.author_url = embed.author_url;
                tw.type = embed.type; // used to distinguish links from audio and video
                tw.multimedia = embed.html;
                tw.render(container, add_by);
            }
        });
    },
    this.render = function(container, add_by) {

        var blocked = ["Img", "Img.ly", "Mediagazer"];

        if (jQuery.inArray(tw.provider, blocked) == -1 && tw.title != undefined) {
            // exclude blocked providers
            //
            //cache teaser DOM elements for faster access
            var $teaser = $('<li class="teaser"/>'),
                $media = $('<div class="media" />'),
                $article = $('<article class="article" />'),
                $title = $('<h3 />'),
                $description = $('<div class="description" />'),
                $credits = $('<div class="credits" />'),
                $instapaper = $('<div class="instapaper"/>'),
                $recommender = $('<div class="recommender"/>'),
                $tweet = $('<span class="rectext" />'),
                $tweetLink = $('<a><i class="icon-twitter small"></i> </a>');
            $teaser.append($media);
            $teaser.append($article);
            $article.append($credits);
            $article.append($title);
            $article.append($description);
            $teaser.append($recommender);

            // crop long description
            if (this.description && this.description.length > 140) {
                this.description = jQuery.trim(this.description).substring(0, 139).split(" ").slice(0, -1).join(" ") + " [...]"};
            // crop long titles
            if (this.title && this.title.length > 100) {
                this.title = jQuery.trim(this.title).substring(0, 99).split(" ").slice(0, -1).join(" ") + " [...]"};

            //assign correct content to all those elements
            if (this.type === "link" && this.img_url !== undefined && this.img_width >= 150) {
                $media.html("<a href='" + this.link + "' target='_blank'>" + "<img src='" + this.img_url + "'></a><br/>")
            }
            
            else if (this.type == "photo" && this.url != undefined) {
            			$media.html("<a href='" + this.link + "' target='_blank'>" + "<img src='" + this.url + "'></a><br/>")
            			}
            
            else if (this.type === "video" || this.type === "rich" || this.type === "audio") {
                $teaser.addClass(this.type); // add type as class to teaser for later styling
                $media.html(this.multimedia + "<br/>")
            };

            $title.html("<a href='" + this.link + "' target='_blank'>" + this.title + "</a><br />");
            if (this.description !== undefined)
                $description.html(this.description + " <a href='"+ this.link + "' target='_blank'>read on</a>");

            if (this.author !== undefined) {
                $credits.html("<a href='" + this.author_url + "' title='" + this.author + "' target='_blank'>" + this.author + "</a>, " + "<a href='" + this.provider_url + "' title='" + this.provider + "' target='_blank'>" + this.provider + "</a>");}
            else {$credits.html("<a href='" + this.provider_url + "' title='" + this.provider + "' target='_blank'>" + this.provider + "</a>");};

            //add instapaper button
            if (this.type === "link") {
                $instapaper.html("<iframe border='0' scrolling='no' width='78' height='17' allowtransparency='true' frameborder='0' style='margin-bottom: -3px; z-index: 1338; border: 0px; background-color: transparent; overflow: hidden;' src='http://www.instapaper.com/e2?url=" + this.link + "&title=" + this.title + "&description=" + this.description + " (via instacurate.com)'></iframe>");
            }

            $recommender.html("<img src='" + this.img + "'>" + "<p class='rectext'>Shared by <a href='http://www.twitter.com/" + this.accountname + "'>" + this.realname + "</a>.");
            $recommender.append($tweet);
            $tweet.append($tweetLink);
            $recommender.append($instapaper);

            //add the tweet as a tooltip
            $tweetLink.append(this.tstamp).attr('href', 'http://twitter.com/'+ this.accountname +'/status/'+ this.id).popover({
                title: "<blockquote class='twitter-tweet'><p>"+ this.text+"</p></blockquote><script src='//platform.twitter.com/widgets.js' charset='utf-8'></script>",
                html: true,
                trigger: "hover",
                placement: "top"
            });

            if (this.retweets != 0) {
                $tweetLink.append(", " + this.retweets + " retweets.")
            }
            // add tweet to the dom
            if(add_by == 'prepend') {
                container.prepend($teaser);
            } else {
                container.append($teaser);
            }
            if(this.debug) console.log('Adding new Tweet '+this.id+' by '+add_by+'.');
        }
    };
    this.init(urlEntity.expanded_url, container, add_by);
}

function TimeLine(query) {
    this.query = query;
    this.processedTweets = {};
    this.nrOfProcessedLinks = 0;
    this.tweetsToFetch = 50;
    this.minNrOfLinks = 12;
    this.maxTweetId = 1;
    this.minTweetId = 0;
    this.isLoggedIn = false;
    this.loggedInUser = null;
    this.processing = false;
    this.rawTweets = { 'up': [], 'down': [] };
    this.twitterMaxSearchApiRequests = 10;
    this.autoRefresh = true;
    this.autoRefreshInterval = 30000;
    this.autoRefreshTimer = null;
    this.appServerUrl = "http://tlinkstimeline.appspot.com";
    this.debug = true;
    this.container = "#embeds";

    this.isLoggedInCallback = function() {
        $(".signin").toggleClass('hide');
        $('.twi').html("Here's your personalised news site, based on your Twitter timeline.");
    };

    this.init = function() {
        var tl = this;
        if (typeof tl.loggedInUser === 'undefined') {
            $.getJSON(tl.appServerUrl + "/loggedinuser?callback=?", function(username){
                if (username) {
                    tl.loggedInUser = username;
                    tl.init();
                }
            });
        } else {
            // check if the given user is logged in
            $.getJSON(tl.appServerUrl + "/loggedin?callback=?", function(isLoggedIn){
                tl.isLoggedIn = isLoggedIn;
                if (isLoggedIn) {
                    tl.isLoggedInCallback();
                    tl.query = typeof query === 'undefined' || query === '' ? 'owntimeline' : query;
                    tl.fetchTweetsForQuery();
                } else {
                    // place logic here to deal with non-registered users
                }
            });
            $(document).unbind('scroll');
            $(document).scroll(function(e){ // load more links when user scolls down
                if (tl.processing || tl.isLoggedIn == false)
                    return false;

                if ($(window).scrollTop() >= ($(document).height() - $(window).height())*0.8){
                    $('#status').addClass('state-loading alert alert-info').html("<i class='icon-spinner icon-spin'></i> Loading more stories...");
                    tl.fetchTweetsForQuery();
                }
            });

        }
    };

    this.fetchTweetsForQuery = function(update) { // if update, get newer tweets instead of older
        var update = update?true:false;
        var tl = this;
        var rawTweets = tl.rawTweets[update?'up':'down'];
        tl.processing = true;
        var params = {
            'include_entities': true,
            'include_rts': true,
            'count' : tl.tweetsToFetch
        };
        if(tl.debug) console.log('Fetching Tweets for query "'+tl.query+'"'+(update?' as an update.':''));
        // set since_id or max_id parameter depeding on querying an update or e.g. scroll load
        if(update) params['since_id'] = tl.maxTweedId;
        else if(tl.minTweetId > 0) params['max_id'] = tl.minTweetId;

        if (tl.query === 'owntimeline') {
            $.getJSON(tl.appServerUrl + "/statuses/home_timeline.json?callback=?", params, function(data) {
                tl.rawTweets[update?'up':'down'] = update?data.concat(rawTweets):rawTweets.concat(data);
                tl._processTweets(update);
                if (tl.nrOfProcessedLinks < tl.minNrOfLinks) {
                    tl.fetchTweetsForQuery(update);
                } else {
                    tl.finishedFetchTweetsForQuery();
                }
            });
        } else if (tl.query.substring(0,4) == "list:") {
            // if user is looking at a list of his/her
            params['slug'] = tl.query.substring(5,100);
            params['owner_screen_name'] = tl.loggedInUser;
	        $.getJSON('https://api.twitter.com/1.1/lists/statuses.json?callback=?', params, function(data) {
                // request needs to go to the server script
                tl.rawTweets[update?'up':'down'] = update?data.concat(rawTweets):rawTweets.concat(data);
                tl._processTweets(update);
                if (tl.nrOfProcessedLinks < tl.minNrOfLinks) {
                    tl.fetchTweetsForQuery(update);
                } else {
                    tl.finishedFetchTweetsForQuery();
                }
	        });
        } else if (tl.query[0] === '@') {
            params['screen_name'] = tl.query.substring(1,100);
            $.getJSON(tl.appServerUrl + '/statuses/user_timeline.json?&callback=?', params, function(data) {
                // request needs to go to the server script
                tl.rawTweets[update?'up':'down'] = update?data.concat(rawTweets):rawTweets.concat(data);
                tl._processTweets(update);
                if (tl.nrOfProcessedLinks < tl.minNrOfLinks) {
                    tl.fetchTweetsForQuery(update);
                } else {
                    tl.finishedFetchTweetsForQuery();
                }
            });
        } else {
            params['q'] = tl.query + " filter:links";
            $.getJSON('https://api.twitter.com/1.1/search/tweets.json?callback=?', params, function(data) {
                    // request needs to go to the server script
                    tl.rawTweets[update?'up':'down'] = update?data.concat(rawTweets):rawTweets.concat(data);
                    //decrement the search api request counter. we don't wanna send too many requests (limited by maxSearchApiRequests)
                    var nrOfFetchedTweets = data.results.length;
                    if (nrOfFetchedTweets > 0) {
                        tl._processTweets(update);
                        tl.twitterMaxSearchApiRequests--;
                    } else {
                        tl.twitterMaxSearchApiRequests = 0;
                    }
                    //only try to get more links IF: we don't have minNrOfLinks already AND
                    //we didn't use the API more than maxSearchApiRequests times AND
                    //the last api called contained tweets
                    if (tl.twitterMaxSearchApiRequests > 0 && tl.nrOfProcessedLinks < tl.minNrOfLinks) {
                        tl.fetchTweetsForQuery(update);
                    } else {
                        tl.finishedFetchTweetsForQuery();
                    }
            });
        }
    };

    this._processTweets = function(update) {
        var update = update?true:false;
        var tl = this;
        var n = tl.minNrOfLinks;
        var nrOfProcessedLinks = 0;
        var rawTweets = tl.rawTweets[update?'up':'down'];
        // update minTweetId or maxTweetId with first processed Tweet Id depeding on an update being processed or not
        if(tl.debug) console.log('Tweet Ids: [first] => '+rawTweets[0].id_str+', [last] => '+rawTweets[rawTweets.length - 1].id_str);
        if(update) tl.maxTweetId = rawTweets[0].id_str; 
        else {
            tl.minTweetId = rawTweets[rawTweets.length - 1].id_str; 
            if(tl.maxTweetId == 1) tl.maxTweetId = rawTweets[0].id_str;
        }
        while (n && rawTweets.length > 0) {
            var t = update?rawTweets.pop():rawTweets.shift();
            if (typeof t === 'undefined') {
                break;
            }
            //cache container DOM element
            
            $.each(t.entities.urls, function(i, urlEntity) {
                var url = urlEntity.expanded_url;
                // exclude duplicate links and links from @-replies
                if (typeof tl.processedTweets[url] === 'undefined' && t.text[0] !== '@') {
                    nrOfProcessedLinks++;
                    n -= 1;
                    tl.processedTweets[url] = new Tweet(t, urlEntity, $(tl.container), update?'prepend':'append');
                    if (n == 0) {
                        return false;
                    }
                }
            });
        }
        tl.nrOfProcessedLinks += nrOfProcessedLinks;
        tl.rawTweets[update?'up':'down'] = rawTweets;
        if(tl.debug) {
	        console.log('Found '+nrOfProcessedLinks+' new stories. ');
	        console.log('Most recent Tweet Id: '+tl.maxTweetId+'; oldest Tweet Id: '+tl.minTweetId);
	    }
	};

    this._compareTweetIds = function(id_1, id_2) {
        if (id_1.length < id_2.length) return -1;
        else if (id_1.length > id_2.length) return 1;
        else return id_1.localCompare(id_2);
    }

    this.finishedFetchTweetsForQuery = function() {
        //get rid of loading message if loading class is still applied
        if ($('#status').hasClass('state-loading')) {
            $('#status').removeClass('state-loading alert alert-info').html('');
        }
        var tl = this;
        tl.processing = false;

	    if (tl.autoRefresh) {
	        tl.autoRefreshTimer = setTimeout(function() {
	        	if(tl.debug) console.log('Auto-refreshing …');
	            tl.fetchTweetsForQuery(true);
	        }, tl.autoRefreshInterval);
	    }

    }

    this.init();
}

$(document).ready(function() {
    
    //remove demo image
    $('#demo').html("");
    var t = new TimeLine();

});
