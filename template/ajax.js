!function(t){"use strict";phpbb.addAjaxCallback("mark_forums_read",function(a){var e=a.NO_UNREAD_POSTS,o=a.UNREAD_POSTS,i={forum_unread:"forum_read",forum_unread_subforum:"forum_read_subforum",forum_unread_locked:"forum_read_locked"};t("li.row").find('dl[class*="forum_unread"]').each(function(){var a=t(this);t.each(i,function(t,e){a.hasClass(t)&&a.removeClass(t).addClass(e)}),a.children('dt[title="'+o+'"]').attr("title",e)}),t('a.subforum[class*="unread"]').removeClass("unread").addClass("read"),t("#active_topics").length&&phpbb.ajaxCallbacks.mark_topics_read.call(this,a,!1),t('[data-ajax="mark_forums_read"]').attr("href",a.U_MARK_FORUMS),phpbb.closeDarkenWrapper(3e3)}),phpbb.addAjaxCallback("mark_topics_read",function(a,e){var o,i=a.NO_UNREAD_POSTS,n=a.UNREAD_POSTS,r={global_unread:"global_read",announce_unread:"announce_read",sticky_unread:"sticky_read",topic_unread:"topic_read"},l=["","_hot","_hot_mine","_locked","_locked_mine","_mine"],s={},d=[];"undefined"==typeof e&&(e=!0),t.each(r,function(a,e){t.each(l,function(t,o){return("_hot"===o||"_hot_mine"===o)&&"topic_unread"!==a||(s[a+o]=e+o,void d.push(a+o))})}),o="."+d.join(",."),t("li.row").find(o).each(function(){var a=t(this);t.each(s,function(t,e){a.hasClass(t)&&a.removeClass(t).addClass(e)}),a.children('dt[title="'+n+'"]').attr("title",i)}),t("a").has("span.icon_topic_newest").remove(),e&&t('[data-ajax="mark_topics_read"]').attr("href",a.U_MARK_TOPICS),phpbb.closeDarkenWrapper(3e3)}),phpbb.addAjaxCallback("notification.mark_all_read",function(a){"undefined"!=typeof a.success&&(phpbb.markNotifications(t("#notification_list li.notification-unseen"),0),phpbb.closeDarkenWrapper(3e3))}),phpbb.addAjaxCallback("notification.mark_read",function(a){if("undefined"!=typeof a.success){var e=Number(t(".notifications.tab").data("badge"))-1;phpbb.markNotifications(t(this).parent("li.notification-unseen"),e)}}),phpbb.markNotifications=function(a,e){a.removeClass("notification-unseen"),a.find("a.mark_read").remove(),a.each(function(){var a=t(this).find("a");a.attr("href",a.attr("data-real-url"))}),t(".notifications.tab").attr("data-badge",e).toggleClass("non-zero mdl-badge mdl-badge--small",e>0),e||t(".mark_all_read").remove();var o=t("title"),i=o.text().replace(/(\((\d+)\))/,"");o.text((e?"("+e+")":"")+i)},phpbb.addAjaxCallback("post_delete",function(){var a,e=t(this);if(void 0===e.attr("data-refresh")){a=e[0].href.split("&p=")[1];var o=e.parents("#p"+a).css("pointer-events","none");if(o.hasClass("bg1")||o.hasClass("bg2")){var i=o.nextAll(".bg1");o.nextAll(".bg2").removeClass("bg2").addClass("bg1"),i.removeClass("bg1").addClass("bg2")}o.fadeOut(function(){t(this).remove()})}}),phpbb.addAjaxCallback("post_visibility",function(a){var e=a.visible?t(this):t(this).parents(".post");t(e).css("pointer-events","none").fadeOut(function(){t(this).remove()}),a.visible&&e.parents(".post").find(".post_deleted_msg").css("pointer-events","none").fadeOut(function(){t(this).remove()})}),phpbb.addAjaxCallback("row_delete",function(){t(this).parents("tr").remove()}),phpbb.addAjaxCallback("zebra",function(a){var e;a.success&&(e=t(".zebra"),e.first().html(a.MESSAGE_TEXT),e.not(":first").html("&nbsp;").prev().html("&nbsp;"))}),phpbb.addAjaxCallback("vote_poll",function(a){if("undefined"!=typeof a.success){var e=t(".topic_poll"),o=e.find(".panel"),i=e.find("dl:first-child .resultbar").is(":visible"),n=0,r=function(t){t="undefined"==typeof t?o.find(".inner").outerHeight():t,o.css("min-height",t)};r(),i||e.find(".poll_view_results").hide(500),a.can_vote?e.find(".resultbar, .poll_option_percent, .poll_total_votes").show(500):e.find(".polls, .poll_max_votes, .poll_vote, .poll_option_select").fadeOut(500,function(){e.find(".resultbar, .poll_option_percent, .poll_total_votes").show()}),e.find("[data-poll-option-id]").each(function(){var e=t(this),o=e.attr("data-poll-option-id");n=a.vote_counts[o]>=n?a.vote_counts[o]:n}),e.find(".poll_total_vote_cnt").html(a.total_votes),e.find("[data-poll-option-id]").each(function(){var e,o=t(this),i=o.attr("data-poll-option-id"),r="undefined"!=typeof a.user_votes[i],l=a.vote_counts[i]===n,s=a.total_votes?Math.round(a.vote_counts[i]/a.total_votes*100):0,d=0===n?0:Math.round(a.vote_counts[i]/n*100);e=o.attr("data-alt-text"),r?o.attr("title",t.trim(e)):o.attr("title",""),o.toggleClass("voted",r),o.toggleClass("most-votes",l);var c=o.find(".resultbar div"),p=a.can_vote?500:1500,f=100===s?"pollbar5":"pollbar"+(Math.floor(s/20)+1);setTimeout(function(){c.animate({width:d+"%"},500).removeClass("pollbar1 pollbar2 pollbar3 pollbar4 pollbar5").addClass(f).html(a.vote_counts[i]);var t=s?s+"%":a.NO_VOTES;o.find(".poll_option_percent").html(t)},p)}),a.can_vote||e.find(".polls").delay(400).fadeIn(500);var l=a.can_vote?300:900;e.find(".vote-submitted").delay(l).slideDown(200,function(){i&&r(),t(this).delay(5e3).fadeOut(500,function(){s(300)})}),setTimeout(function(){s(500)},1500);var s=function(t){var a=o.height(),e=o.find(".inner").outerHeight();a!==e&&o.css({minHeight:"",height:a}).animate({height:e},t,function(){o.css({minHeight:e,height:""})})}}}),t(".poll_view_results a").click(function(a){a.preventDefault();var e=t(this).parents(".topic_poll");e.find(".resultbar, .poll_option_percent, .poll_total_votes").show(500),e.find(".poll_view_results").hide(500)}),t("[data-ajax]").each(function(){var a=t(this),e=a.attr("data-ajax"),o=a.attr("data-filter");if("false"!==e){var i="true"!==e?e:null;o=void 0!==o?phpbb.getFunctionByName(o):null,phpbb.ajaxify({selector:this,refresh:void 0!==a.attr("data-refresh"),filter:o,callback:i})}}),t("#qr_full_editor").click(function(){t("#qr_postform").attr("action",function(t,a){return a+"#preview"})}),t(".display_post").click(function(a){a.preventDefault();var e=t(this).attr("data-post-id");t("#post_content"+e).show(),t("#profile"+e).show(),t("#post_hidden"+e).hide()}),t("#member_search").click(function(){var a=t("#memberlist_search");return a.slideToggle("fast"),phpbb.ajaxCallbacks.alt_text.call(this),a.is(":visible")&&t("#username").focus(),!1}),t(function(){var a=t("textarea:not(#message-box textarea, .no-auto-resize)");phpbb.resizeTextArea(a,{minHeight:75,maxHeight:250}),phpbb.resizeTextArea(t("textarea","#message-box"))})}(jQuery);