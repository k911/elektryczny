!function(t){"use strict";phpbb.addAjaxCallback("mark_forums_read",function(a){var e=a.NO_UNREAD_POSTS,o=a.UNREAD_POSTS,i={forum_unread:"forum_read",forum_unread_subforum:"forum_read_subforum",forum_unread_locked:"forum_read_locked"};t("li.row").find('dl[class*="forum_unread"]').each(function(){var a=t(this);t.each(i,function(t,e){a.hasClass(t)&&a.removeClass(t).addClass(e)}),a.children('dt[title="'+o+'"]').attr("title",e)}),t('a.subforum[class*="unread"]').removeClass("unread").addClass("read"),t("#active_topics").length&&phpbb.ajaxCallbacks.mark_topics_read.call(this,a,!1),t('[data-ajax="mark_forums_read"]').attr("href",a.U_MARK_FORUMS),phpbb.closeDarkenWrapper(3e3)}),phpbb.addAjaxCallback("mark_topics_read",function(a,e){var o,i=a.NO_UNREAD_POSTS,n=a.UNREAD_POSTS,r={global_unread:"global_read",announce_unread:"announce_read",sticky_unread:"sticky_read",topic_unread:"topic_read"},l=["","_hot","_hot_mine","_locked","_locked_mine","_mine"],s={},d=[];void 0===e&&(e=!0),t.each(r,function(a,e){t.each(l,function(t,o){if(("_hot"===o||"_hot_mine"===o)&&"topic_unread"!==a)return!0;s[a+o]=e+o,d.push(a+o)})}),o="."+d.join(",."),t("li.row").find(o).each(function(){var a=t(this);t.each(s,function(t,e){a.hasClass(t)&&a.removeClass(t).addClass(e)}),a.children('dt[title="'+n+'"]').attr("title",i)}),t("a").has("span.icon_topic_newest").remove(),e&&t('[data-ajax="mark_topics_read"]').attr("href",a.U_MARK_TOPICS),phpbb.closeDarkenWrapper(3e3)}),phpbb.addAjaxCallback("notification.mark_all_read",function(a){void 0!==a.success&&(phpbb.markNotifications(t("#notification_list li.notification-unseen"),0),phpbb.closeDarkenWrapper(3e3))}),phpbb.addAjaxCallback("notification.mark_read",function(a){if(void 0!==a.success){var e=Number(t(".notifications.tab").data("badge"))-1;phpbb.markNotifications(t(this).parent("li.notification-unseen"),e)}}),phpbb.markNotifications=function(a,e){a.removeClass("notification-unseen"),a.find("a.mark_read").remove(),a.each(function(){var a=t(this).find("a");a.attr("href",a.attr("data-real-url"))}),t(".notifications.tab").attr("data-badge",e).toggleClass("non-zero mdl-badge mdl-badge--small",e>0),e||t(".mark_all_read").remove();var o=t("title"),i=o.text().replace(/(\((\d+)\))/,"");o.text((e?"("+e+")":"")+i)},phpbb.addAjaxCallback("post_delete",function(){var a,e=t(this);if(void 0===e.attr("data-refresh")){a=e[0].href.split("&p=")[1];var o=e.parents("#p"+a).css("pointer-events","none");if(o.hasClass("bg1")||o.hasClass("bg2")){var i=o.nextAll(".bg1");o.nextAll(".bg2").removeClass("bg2").addClass("bg1"),i.removeClass("bg1").addClass("bg2")}o.fadeOut(function(){t(this).remove()})}}),phpbb.addAjaxCallback("post_visibility",function(a){var e=a.visible?t(this):t(this).parents(".post");t(e).css("pointer-events","none").fadeOut(function(){t(this).remove()}),a.visible&&e.parents(".post").find(".post_deleted_msg").css("pointer-events","none").fadeOut(function(){t(this).remove()})}),phpbb.addAjaxCallback("row_delete",function(){t(this).parents("tr").remove()}),phpbb.addAjaxCallback("zebra",function(a){var e;a.success&&(e=t(".zebra"),e.first().html(a.MESSAGE_TEXT),e.not(":first").html("&nbsp;").prev().html("&nbsp;"))}),phpbb.addAjaxCallback("vote_poll",function(a){if(void 0!==a.success){var e=t(".topic_poll"),o=e.find(".panel"),i=e.find("dl:first-child .resultbar").is(":visible"),n=0,r=function(t){t=void 0===t?o.find(".inner").outerHeight():t,o.css("min-height",t)};r(),i||e.find(".poll_view_results").hide(500),a.can_vote?e.find(".resultbar, .poll_option_percent, .poll_total_votes").show(500):e.find(".polls, .poll_max_votes, .poll_vote, .poll_option_select").fadeOut(500,function(){e.find(".resultbar, .poll_option_percent, .poll_total_votes").show()}),e.find("[data-poll-option-id]").each(function(){var e=t(this),o=e.attr("data-poll-option-id");n=a.vote_counts[o]>=n?a.vote_counts[o]:n}),e.find(".poll_total_vote_cnt").html(a.total_votes),e.find("[data-poll-option-id]").each(function(){var e,o=t(this),i=o.attr("data-poll-option-id"),r=void 0!==a.user_votes[i],l=a.vote_counts[i]===n,s=a.total_votes?Math.round(a.vote_counts[i]/a.total_votes*100):0,d=0===n?0:Math.round(a.vote_counts[i]/n*100);e=o.attr("data-alt-text"),r?o.attr("title",t.trim(e)):o.attr("title",""),o.toggleClass("voted",r),o.toggleClass("most-votes",l);var c=o.find(".resultbar div"),p=a.can_vote?500:1500,_=100===s?"pollbar5":"pollbar"+(Math.floor(s/20)+1);setTimeout(function(){c.animate({width:d+"%"},500).removeClass("pollbar1 pollbar2 pollbar3 pollbar4 pollbar5").addClass(_).html(a.vote_counts[i]);var t=s?s+"%":a.NO_VOTES;o.find(".poll_option_percent").html(t)},p)}),a.can_vote||e.find(".polls").delay(400).fadeIn(500);var l=a.can_vote?300:900;e.find(".vote-submitted").delay(l).slideDown(200,function(){i&&r(),t(this).delay(5e3).fadeOut(500,function(){s(300)})}),setTimeout(function(){s(500)},1500);var s=function(t){var a=o.height(),e=o.find(".inner").outerHeight();a!==e&&o.css({minHeight:"",height:a}).animate({height:e},t,function(){o.css({minHeight:e,height:""})})}}}),t(".poll_view_results a").click(function(a){a.preventDefault();var e=t(this).parents(".topic_poll");e.find(".resultbar, .poll_option_percent, .poll_total_votes").show(500),e.find(".poll_view_results").hide(500)}),t("[data-ajax]").each(function(){var a=t(this),e=a.attr("data-ajax"),o=a.attr("data-filter");if("false"!==e){var i="true"!==e?e:null;o=void 0!==o?phpbb.getFunctionByName(o):null,phpbb.ajaxify({selector:this,refresh:void 0!==a.attr("data-refresh"),filter:o,callback:i})}}),t("#qr_full_editor").click(function(){t("#qr_postform").attr("action",function(t,a){return a+"#preview"})}),t(".display_post").click(function(a){a.preventDefault();var e=t(this).attr("data-post-id");t("#post_content"+e).show(),t("#profile"+e).show(),t("#post_hidden"+e).hide()}),t("#member_search").click(function(){var a=t("#memberlist_search");return a.slideToggle("fast"),phpbb.ajaxCallbacks.alt_text.call(this),a.is(":visible")&&t("#username").focus(),!1}),t(function(){var a=t("textarea:not(#message-box textarea, .no-auto-resize)");phpbb.resizeTextArea(a,{minHeight:75,maxHeight:250}),phpbb.resizeTextArea(t("textarea","#message-box"))})}(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiJCIsInBocGJiIiwiYWRkQWpheENhbGxiYWNrIiwicmVzIiwicmVhZFRpdGxlIiwiTk9fVU5SRUFEX1BPU1RTIiwidW5yZWFkVGl0bGUiLCJVTlJFQURfUE9TVFMiLCJpY29uc0FycmF5IiwiZm9ydW1fdW5yZWFkIiwiZm9ydW1fdW5yZWFkX3N1YmZvcnVtIiwiZm9ydW1fdW5yZWFkX2xvY2tlZCIsImZpbmQiLCJlYWNoIiwiJHRoaXMiLCJ0aGlzIiwidW5yZWFkQ2xhc3MiLCJyZWFkQ2xhc3MiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJjaGlsZHJlbiIsImF0dHIiLCJsZW5ndGgiLCJhamF4Q2FsbGJhY2tzIiwibWFya190b3BpY3NfcmVhZCIsImNhbGwiLCJVX01BUktfRk9SVU1TIiwiY2xvc2VEYXJrZW5XcmFwcGVyIiwidXBkYXRlVG9waWNMaW5rcyIsInVucmVhZENsYXNzU2VsZWN0b3JzIiwiZ2xvYmFsX3VucmVhZCIsImFubm91bmNlX3VucmVhZCIsInN0aWNreV91bnJlYWQiLCJ0b3BpY191bnJlYWQiLCJpY29uc1N0YXRlIiwiY2xhc3NNYXAiLCJjbGFzc05hbWVzIiwia2V5IiwidmFsdWUiLCJwdXNoIiwiam9pbiIsImhhcyIsInJlbW92ZSIsIlVfTUFSS19UT1BJQ1MiLCJzdWNjZXNzIiwibWFya05vdGlmaWNhdGlvbnMiLCJ1bnJlYWRDb3VudCIsIk51bWJlciIsImRhdGEiLCJwYXJlbnQiLCIkcG9wdXAiLCJsaW5rIiwidG9nZ2xlQ2xhc3MiLCIkdGl0bGUiLCJvcmlnaW5hbFRpdGxlIiwidGV4dCIsInJlcGxhY2UiLCJwb3N0SWQiLCJ1bmRlZmluZWQiLCJocmVmIiwic3BsaXQiLCJwb3N0IiwicGFyZW50cyIsImNzcyIsInBvc3RzMSIsIm5leHRBbGwiLCJmYWRlT3V0IiwidmlzaWJsZSIsInplYnJhIiwiZmlyc3QiLCJodG1sIiwiTUVTU0FHRV9URVhUIiwibm90IiwicHJldiIsInBvbGwiLCJwYW5lbCIsInJlc3VsdHNWaXNpYmxlIiwiaXMiLCJtb3N0Vm90ZXMiLCJ1cGRhdGVQYW5lbEhlaWdodCIsImhlaWdodCIsIm91dGVySGVpZ2h0IiwiaGlkZSIsImNhbl92b3RlIiwic2hvdyIsIm9wdGlvbiIsIm9wdGlvbklkIiwidm90ZV9jb3VudHMiLCJ0b3RhbF92b3RlcyIsImFsdFRleHQiLCJ2b3RlZCIsInVzZXJfdm90ZXMiLCJtb3N0Vm90ZWQiLCJwZXJjZW50IiwiTWF0aCIsInJvdW5kIiwicGVyY2VudFJlbCIsInRyaW0iLCJiYXIiLCJiYXJUaW1lTGFwc2UiLCJuZXdCYXJDbGFzcyIsImZsb29yIiwic2V0VGltZW91dCIsImFuaW1hdGUiLCJ3aWR0aCIsInBlcmNlbnRUZXh0IiwiTk9fVk9URVMiLCJkZWxheSIsImZhZGVJbiIsImNvbmZpcm1hdGlvbkRlbGF5Iiwic2xpZGVEb3duIiwicmVzaXplUGFuZWwiLCJ0aW1lIiwicGFuZWxIZWlnaHQiLCJpbm5lckhlaWdodCIsIm1pbkhlaWdodCIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwiJHBvbGwiLCJhamF4IiwiZmlsdGVyIiwiZm4iLCJnZXRGdW5jdGlvbkJ5TmFtZSIsImFqYXhpZnkiLCJzZWxlY3RvciIsInJlZnJlc2giLCJjYWxsYmFjayIsImkiLCJ2YWwiLCIkbWVtYmVybGlzdFNlYXJjaCIsInNsaWRlVG9nZ2xlIiwiYWx0X3RleHQiLCJmb2N1cyIsIiR0ZXh0YXJlYSIsInJlc2l6ZVRleHRBcmVhIiwibWF4SGVpZ2h0IiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiQ0FFQSxTQUFVQSxHQUVWLFlBR0FDLE9BQU1DLGdCQUFnQixtQkFBb0IsU0FBU0MsR0FDbEQsR0FBSUMsR0FBWUQsRUFBSUUsZ0JBQ2hCQyxFQUFjSCxFQUFJSSxhQUNsQkMsR0FDSEMsYUFBYyxhQUNkQyxzQkFBdUIsc0JBQ3ZCQyxvQkFBcUIsb0JBR3RCWCxHQUFFLFVBQVVZLEtBQUssNkJBQTZCQyxLQUFLLFdBQ2xELEdBQUlDLEdB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YmIgKi9cblxuKGZ1bmN0aW9uKCQpIHsgIC8vIEF2b2lkIGNvbmZsaWN0cyB3aXRoIG90aGVyIGxpYnJhcmllc1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIFRoaXMgY2FsbGJhY2sgd2lsbCBtYXJrIGFsbCBmb3J1bSBpY29ucyByZWFkXG5waHBiYi5hZGRBamF4Q2FsbGJhY2soJ21hcmtfZm9ydW1zX3JlYWQnLCBmdW5jdGlvbihyZXMpIHtcblx0dmFyIHJlYWRUaXRsZSA9IHJlcy5OT19VTlJFQURfUE9TVFM7XG5cdHZhciB1bnJlYWRUaXRsZSA9IHJlcy5VTlJFQURfUE9TVFM7XG5cdHZhciBpY29uc0FycmF5ID0ge1xuXHRcdGZvcnVtX3VucmVhZDogJ2ZvcnVtX3JlYWQnLFxuXHRcdGZvcnVtX3VucmVhZF9zdWJmb3J1bTogJ2ZvcnVtX3JlYWRfc3ViZm9ydW0nLFxuXHRcdGZvcnVtX3VucmVhZF9sb2NrZWQ6ICdmb3J1bV9yZWFkX2xvY2tlZCdcblx0fTtcblxuXHQkKCdsaS5yb3cnKS5maW5kKCdkbFtjbGFzcyo9XCJmb3J1bV91bnJlYWRcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cblx0XHQkLmVhY2goaWNvbnNBcnJheSwgZnVuY3Rpb24odW5yZWFkQ2xhc3MsIHJlYWRDbGFzcykge1xuXHRcdFx0aWYgKCR0aGlzLmhhc0NsYXNzKHVucmVhZENsYXNzKSkge1xuXHRcdFx0XHQkdGhpcy5yZW1vdmVDbGFzcyh1bnJlYWRDbGFzcykuYWRkQ2xhc3MocmVhZENsYXNzKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHQkdGhpcy5jaGlsZHJlbignZHRbdGl0bGU9XCInICsgdW5yZWFkVGl0bGUgKyAnXCJdJykuYXR0cigndGl0bGUnLCByZWFkVGl0bGUpO1xuXHR9KTtcblxuXHQvLyBNYXJrIHN1YmZvcnVtcyByZWFkXG5cdCQoJ2Euc3ViZm9ydW1bY2xhc3MqPVwidW5yZWFkXCJdJykucmVtb3ZlQ2xhc3MoJ3VucmVhZCcpLmFkZENsYXNzKCdyZWFkJyk7XG5cblx0Ly8gTWFyayB0b3BpY3MgcmVhZCBpZiB3ZSBhcmUgd2F0Y2hpbmcgYSBjYXRlZ29yeSBhbmQgc2hvd2luZyBhY3RpdmUgdG9waWNzXG5cdGlmICgkKCcjYWN0aXZlX3RvcGljcycpLmxlbmd0aCkge1xuXHRcdHBocGJiLmFqYXhDYWxsYmFja3MubWFya190b3BpY3NfcmVhZC5jYWxsKHRoaXMsIHJlcywgZmFsc2UpO1xuXHR9XG5cblx0Ly8gVXBkYXRlIG1hcmsgZm9ydW1zIHJlYWQgbGlua3Ncblx0JCgnW2RhdGEtYWpheD1cIm1hcmtfZm9ydW1zX3JlYWRcIl0nKS5hdHRyKCdocmVmJywgcmVzLlVfTUFSS19GT1JVTVMpO1xuXG5cdHBocGJiLmNsb3NlRGFya2VuV3JhcHBlcigzMDAwKTtcbn0pO1xuXG4vKipcbiogVGhpcyBjYWxsYmFjayB3aWxsIG1hcmsgYWxsIHRvcGljIGljb25zIHJlYWRcbipcbiogQHBhcmFtIHtib29sfSBbdXBkYXRlX3RvcGljX2xpbmtzPXRydWVdIFdoZXRoZXIgXCJNYXJrIHRvcGljcyByZWFkXCIgbGlua3NcbiogXHRzaG91bGQgYmUgdXBkYXRlZC4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiovXG5waHBiYi5hZGRBamF4Q2FsbGJhY2soJ21hcmtfdG9waWNzX3JlYWQnLCBmdW5jdGlvbihyZXMsIHVwZGF0ZVRvcGljTGlua3MpIHtcblx0dmFyIHJlYWRUaXRsZSA9IHJlcy5OT19VTlJFQURfUE9TVFM7XG5cdHZhciB1bnJlYWRUaXRsZSA9IHJlcy5VTlJFQURfUE9TVFM7XG5cdHZhciBpY29uc0FycmF5ID0ge1xuXHRcdGdsb2JhbF91bnJlYWQ6ICdnbG9iYWxfcmVhZCcsXG5cdFx0YW5ub3VuY2VfdW5yZWFkOiAnYW5ub3VuY2VfcmVhZCcsXG5cdFx0c3RpY2t5X3VucmVhZDogJ3N0aWNreV9yZWFkJyxcblx0XHR0b3BpY191bnJlYWQ6ICd0b3BpY19yZWFkJ1xuXHR9O1xuXHR2YXIgaWNvbnNTdGF0ZSA9IFsnJywgJ19ob3QnLCAnX2hvdF9taW5lJywgJ19sb2NrZWQnLCAnX2xvY2tlZF9taW5lJywgJ19taW5lJ107XG5cdHZhciB1bnJlYWRDbGFzc1NlbGVjdG9ycztcblx0dmFyIGNsYXNzTWFwID0ge307XG5cdHZhciBjbGFzc05hbWVzID0gW107XG5cblx0aWYgKHR5cGVvZiB1cGRhdGVUb3BpY0xpbmtzID09PSAndW5kZWZpbmVkJykge1xuXHRcdHVwZGF0ZVRvcGljTGlua3MgPSB0cnVlO1xuXHR9XG5cblx0JC5lYWNoKGljb25zQXJyYXksIGZ1bmN0aW9uKHVucmVhZENsYXNzLCByZWFkQ2xhc3MpIHtcblx0XHQkLmVhY2goaWNvbnNTdGF0ZSwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuXHRcdFx0Ly8gT25seSB0b3BpY3MgY2FuIGJlIGhvdFxuXHRcdFx0aWYgKCh2YWx1ZSA9PT0gJ19ob3QnIHx8IHZhbHVlID09PSAnX2hvdF9taW5lJykgJiYgdW5yZWFkQ2xhc3MgIT09ICd0b3BpY191bnJlYWQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0Y2xhc3NNYXBbdW5yZWFkQ2xhc3MgKyB2YWx1ZV0gPSByZWFkQ2xhc3MgKyB2YWx1ZTtcblx0XHRcdGNsYXNzTmFtZXMucHVzaCh1bnJlYWRDbGFzcyArIHZhbHVlKTtcblx0XHR9KTtcblx0fSk7XG5cblx0dW5yZWFkQ2xhc3NTZWxlY3RvcnMgPSAnLicgKyBjbGFzc05hbWVzLmpvaW4oJywuJyk7XG5cblx0JCgnbGkucm93JykuZmluZCh1bnJlYWRDbGFzc1NlbGVjdG9ycykuZWFjaChmdW5jdGlvbigpIHtcblx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdCQuZWFjaChjbGFzc01hcCwgZnVuY3Rpb24odW5yZWFkQ2xhc3MsIHJlYWRDbGFzcykge1xuXHRcdFx0aWYgKCR0aGlzLmhhc0NsYXNzKHVucmVhZENsYXNzKSkge1xuXHRcdFx0XHQkdGhpcy5yZW1vdmVDbGFzcyh1bnJlYWRDbGFzcykuYWRkQ2xhc3MocmVhZENsYXNzKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHQkdGhpcy5jaGlsZHJlbignZHRbdGl0bGU9XCInICsgdW5yZWFkVGl0bGUgKyAnXCJdJykuYXR0cigndGl0bGUnLCByZWFkVGl0bGUpO1xuXHR9KTtcblxuXHQvLyBSZW1vdmUgbGluayB0byBmaXJzdCB1bnJlYWQgcG9zdFxuXHQkKCdhJykuaGFzKCdzcGFuLmljb25fdG9waWNfbmV3ZXN0JykucmVtb3ZlKCk7XG5cblx0Ly8gVXBkYXRlIG1hcmsgdG9waWNzIHJlYWQgbGlua3Ncblx0aWYgKHVwZGF0ZVRvcGljTGlua3MpIHtcblx0XHQkKCdbZGF0YS1hamF4PVwibWFya190b3BpY3NfcmVhZFwiXScpLmF0dHIoJ2hyZWYnLCByZXMuVV9NQVJLX1RPUElDUyk7XG5cdH1cblxuXHRwaHBiYi5jbG9zZURhcmtlbldyYXBwZXIoMzAwMCk7XG59KTtcblxuLy8gVGhpcyBjYWxsYmFjayB3aWxsIG1hcmsgYWxsIG5vdGlmaWNhdGlvbnMgcmVhZFxucGhwYmIuYWRkQWpheENhbGxiYWNrKCdub3RpZmljYXRpb24ubWFya19hbGxfcmVhZCcsIGZ1bmN0aW9uKHJlcykge1xuXHRpZiAodHlwZW9mIHJlcy5zdWNjZXNzICE9PSAndW5kZWZpbmVkJykge1xuXHRcdHBocGJiLm1hcmtOb3RpZmljYXRpb25zKCQoJyNub3RpZmljYXRpb25fbGlzdCBsaS5ub3RpZmljYXRpb24tdW5zZWVuJyksIDApO1xuXHRcdHBocGJiLmNsb3NlRGFya2VuV3JhcHBlcigzMDAwKTtcblx0fVxufSk7XG5cbi8vIFRoaXMgY2FsbGJhY2sgd2lsbCBtYXJrIGEgbm90aWZpY2F0aW9uIHJlYWRcbnBocGJiLmFkZEFqYXhDYWxsYmFjaygnbm90aWZpY2F0aW9uLm1hcmtfcmVhZCcsIGZ1bmN0aW9uKHJlcykge1xuXHRpZiAodHlwZW9mIHJlcy5zdWNjZXNzICE9PSAndW5kZWZpbmVkJykge1xuXHRcdHZhciB1bnJlYWRDb3VudCA9IE51bWJlcigkKCcubm90aWZpY2F0aW9ucy50YWInKS5kYXRhKCdiYWRnZScpKSAtIDE7XG5cdFx0cGhwYmIubWFya05vdGlmaWNhdGlvbnMoJCh0aGlzKS5wYXJlbnQoJ2xpLm5vdGlmaWNhdGlvbi11bnNlZW4nKSwgdW5yZWFkQ291bnQpO1xuXHR9XG59KTtcblxuLyoqXG4gKiBNYXJrIG5vdGlmaWNhdGlvbiBwb3B1cCByb3dzIGFzIHJlYWQuXG4gKlxuICogQHBhcmFtIHtqUXVlcnl9ICRwb3B1cCBqUXVlcnkgb2JqZWN0KHMpIHRvIG1hcmsgcmVhZC5cbiAqIEBwYXJhbSB7aW50fSB1bnJlYWRDb3VudCBUaGUgbmV3IHVucmVhZCBub3RpZmljYXRpb25zIGNvdW50LlxuICovXG5waHBiYi5tYXJrTm90aWZpY2F0aW9ucyA9IGZ1bmN0aW9uKCRwb3B1cCwgdW5yZWFkQ291bnQpIHtcblx0Ly8gUmVtb3ZlIHRoZSB1bnJlYWQgc3RhdHVzLlxuXHQkcG9wdXAucmVtb3ZlQ2xhc3MoJ25vdGlmaWNhdGlvbi11bnNlZW4nKTtcblx0JHBvcHVwLmZpbmQoJ2EubWFya19yZWFkJykucmVtb3ZlKCk7XG5cblx0Ly8gVXBkYXRlIHRoZSBub3RpZmljYXRpb24gbGluayB0byB0aGUgcmVhbCBVUkwuXG5cdCRwb3B1cC5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdHZhciBsaW5rID0gJCh0aGlzKS5maW5kKCdhJyk7XG5cdFx0bGluay5hdHRyKCdocmVmJywgbGluay5hdHRyKCdkYXRhLXJlYWwtdXJsJykpO1xuXHR9KTtcblxuXHQvLyBVcGRhdGUgdGhlIHVucmVhZCBjb3VudC5cblx0JCgnLm5vdGlmaWNhdGlvbnMudGFiJykuYXR0cignZGF0YS1iYWRnZScsIHVucmVhZENvdW50KS50b2dnbGVDbGFzcygnbm9uLXplcm8gbWRsLWJhZGdlIG1kbC1iYWRnZS0tc21hbGwnLCB1bnJlYWRDb3VudCA+IDApO1xuXG5cdC8vIFJlbW92ZSB0aGUgTWFyayBhbGwgcmVhZCBsaW5rIGlmIHRoZXJlIGFyZSBubyB1bnJlYWQgbm90aWZpY2F0aW9ucy5cblx0aWYgKCF1bnJlYWRDb3VudCkge1xuXHRcdCQoJy5tYXJrX2FsbF9yZWFkJykucmVtb3ZlKCk7XG5cdH1cblxuXHQvLyBVcGRhdGUgcGFnZSB0aXRsZVxuXHR2YXIgJHRpdGxlID0gJCgndGl0bGUnKTtcblx0dmFyIG9yaWdpbmFsVGl0bGUgPSAkdGl0bGUudGV4dCgpLnJlcGxhY2UoLyhcXCgoXFxkKylcXCkpLywgJycpO1xuXHQkdGl0bGUudGV4dCgodW5yZWFkQ291bnQgPyAnKCcgKyB1bnJlYWRDb3VudCArICcpJyA6ICcnKSArIG9yaWdpbmFsVGl0bGUpO1xufTtcblxuLy8gVGhpcyBjYWxsYmFjayBmaW5kcyB0aGUgcG9zdCBmcm9tIHRoZSBkZWxldGUgbGluaywgYW5kIHJlbW92ZXMgaXQuXG5waHBiYi5hZGRBamF4Q2FsbGJhY2soJ3Bvc3RfZGVsZXRlJywgZnVuY3Rpb24oKSB7XG5cdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0cG9zdElkO1xuXG5cdGlmICgkdGhpcy5hdHRyKCdkYXRhLXJlZnJlc2gnKSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cG9zdElkID0gJHRoaXNbMF0uaHJlZi5zcGxpdCgnJnA9JylbMV07XG5cdFx0dmFyIHBvc3QgPSAkdGhpcy5wYXJlbnRzKCcjcCcgKyBwb3N0SWQpLmNzcygncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuXHRcdGlmIChwb3N0Lmhhc0NsYXNzKCdiZzEnKSB8fCBwb3N0Lmhhc0NsYXNzKCdiZzInKSkge1xuXHRcdFx0dmFyIHBvc3RzMSA9IHBvc3QubmV4dEFsbCgnLmJnMScpO1xuXHRcdFx0cG9zdC5uZXh0QWxsKCcuYmcyJykucmVtb3ZlQ2xhc3MoJ2JnMicpLmFkZENsYXNzKCdiZzEnKTtcblx0XHRcdHBvc3RzMS5yZW1vdmVDbGFzcygnYmcxJykuYWRkQ2xhc3MoJ2JnMicpO1xuXHRcdH1cblx0XHRwb3N0LmZhZGVPdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZSgpO1xuXHRcdH0pO1xuXHR9XG59KTtcblxuLy8gVGhpcyBjYWxsYmFjayByZW1vdmVzIHRoZSBhcHByb3ZlIC8gZGlzYXBwcm92ZSBkaXYgb3IgbGluay5cbnBocGJiLmFkZEFqYXhDYWxsYmFjaygncG9zdF92aXNpYmlsaXR5JywgZnVuY3Rpb24ocmVzKSB7XG5cdHZhciByZW1vdmUgPSAocmVzLnZpc2libGUpID8gJCh0aGlzKSA6ICQodGhpcykucGFyZW50cygnLnBvc3QnKTtcblx0JChyZW1vdmUpLmNzcygncG9pbnRlci1ldmVudHMnLCAnbm9uZScpLmZhZGVPdXQoZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGlzKS5yZW1vdmUoKTtcblx0fSk7XG5cblx0aWYgKHJlcy52aXNpYmxlKSB7XG5cdFx0Ly8gUmVtb3ZlIHRoZSBcIkRlbGV0ZWQgYnlcIiBtZXNzYWdlIGZyb20gdGhlIHBvc3Qgb24gcmVzdG9yaW5nLlxuXHRcdHJlbW92ZS5wYXJlbnRzKCcucG9zdCcpLmZpbmQoJy5wb3N0X2RlbGV0ZWRfbXNnJykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdub25lJykuZmFkZU91dChmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykucmVtb3ZlKCk7XG5cdFx0fSk7XG5cdH1cbn0pO1xuXG4vLyBUaGlzIHJlbW92ZXMgdGhlIHBhcmVudCByb3cgb2YgdGhlIGxpbmsgb3IgZm9ybSB0aGF0IGZpcmVkIHRoZSBjYWxsYmFjay5cbnBocGJiLmFkZEFqYXhDYWxsYmFjaygncm93X2RlbGV0ZScsIGZ1bmN0aW9uKCkge1xuXHQkKHRoaXMpLnBhcmVudHMoJ3RyJykucmVtb3ZlKCk7XG59KTtcblxuLy8gVGhpcyBoYW5kbGVzIGZyaWVuZCAvIGZvZSBhZGRpdGlvbnMgcmVtb3ZhbHMuXG5waHBiYi5hZGRBamF4Q2FsbGJhY2soJ3plYnJhJywgZnVuY3Rpb24ocmVzKSB7XG5cdHZhciB6ZWJyYTtcblxuXHRpZiAocmVzLnN1Y2Nlc3MpIHtcblx0XHR6ZWJyYSA9ICQoJy56ZWJyYScpO1xuXHRcdHplYnJhLmZpcnN0KCkuaHRtbChyZXMuTUVTU0FHRV9URVhUKTtcblx0XHR6ZWJyYS5ub3QoJzpmaXJzdCcpLmh0bWwoJyZuYnNwOycpLnByZXYoKS5odG1sKCcmbmJzcDsnKTtcblx0fVxufSk7XG5cbi8qKlxuICogVGhpcyBjYWxsYmFjayB1cGRhdGVzIHRoZSBwb2xsIHJlc3VsdHMgYWZ0ZXIgdm90aW5nLlxuICovXG5waHBiYi5hZGRBamF4Q2FsbGJhY2soJ3ZvdGVfcG9sbCcsIGZ1bmN0aW9uKHJlcykge1xuXHRpZiAodHlwZW9mIHJlcy5zdWNjZXNzICE9PSAndW5kZWZpbmVkJykge1xuXHRcdHZhciBwb2xsID0gJCgnLnRvcGljX3BvbGwnKTtcblx0XHR2YXIgcGFuZWwgPSBwb2xsLmZpbmQoJy5wYW5lbCcpO1xuXHRcdHZhciByZXN1bHRzVmlzaWJsZSA9IHBvbGwuZmluZCgnZGw6Zmlyc3QtY2hpbGQgLnJlc3VsdGJhcicpLmlzKCc6dmlzaWJsZScpO1xuXHRcdHZhciBtb3N0Vm90ZXMgPSAwO1xuXG5cdFx0Ly8gU2V0IG1pbi1oZWlnaHQgdG8gcHJldmVudCB0aGUgcGFnZSBmcm9tIGp1bXBpbmcgd2hlbiB0aGUgY29udGVudCBjaGFuZ2VzXG5cdFx0dmFyIHVwZGF0ZVBhbmVsSGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCkge1xuXHRcdFx0aGVpZ2h0ID0gKHR5cGVvZiBoZWlnaHQgPT09ICd1bmRlZmluZWQnKSA/IHBhbmVsLmZpbmQoJy5pbm5lcicpLm91dGVySGVpZ2h0KCkgOiBoZWlnaHQ7XG5cdFx0XHRwYW5lbC5jc3MoJ21pbi1oZWlnaHQnLCBoZWlnaHQpO1xuXHRcdH07XG5cdFx0dXBkYXRlUGFuZWxIZWlnaHQoKTtcblxuXHRcdC8vIFJlbW92ZSB0aGUgVmlldyByZXN1bHRzIGxpbmtcblx0XHRpZiAoIXJlc3VsdHNWaXNpYmxlKSB7XG5cdFx0XHRwb2xsLmZpbmQoJy5wb2xsX3ZpZXdfcmVzdWx0cycpLmhpZGUoNTAwKTtcblx0XHR9XG5cblx0XHRpZiAoIXJlcy5jYW5fdm90ZSkge1xuXHRcdFx0cG9sbC5maW5kKCcucG9sbHMsIC5wb2xsX21heF92b3RlcywgLnBvbGxfdm90ZSwgLnBvbGxfb3B0aW9uX3NlbGVjdCcpLmZhZGVPdXQoNTAwLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHBvbGwuZmluZCgnLnJlc3VsdGJhciwgLnBvbGxfb3B0aW9uX3BlcmNlbnQsIC5wb2xsX3RvdGFsX3ZvdGVzJykuc2hvdygpO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIElmIHRoZSB1c2VyIGNhbiBzdGlsbCB2b3RlLCBzaW1wbHkgc2xpZGUgZG93biB0aGUgcmVzdWx0c1xuXHRcdFx0cG9sbC5maW5kKCcucmVzdWx0YmFyLCAucG9sbF9vcHRpb25fcGVyY2VudCwgLnBvbGxfdG90YWxfdm90ZXMnKS5zaG93KDUwMCk7XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IHRoZSB2b3RlcyBjb3VudCBvZiB0aGUgaGlnaGVzdCBwb2xsIG9wdGlvblxuXHRcdHBvbGwuZmluZCgnW2RhdGEtcG9sbC1vcHRpb24taWRdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvcHRpb24gPSAkKHRoaXMpO1xuXHRcdFx0dmFyIG9wdGlvbklkID0gb3B0aW9uLmF0dHIoJ2RhdGEtcG9sbC1vcHRpb24taWQnKTtcblx0XHRcdG1vc3RWb3RlcyA9IChyZXMudm90ZV9jb3VudHNbb3B0aW9uSWRdID49IG1vc3RWb3RlcykgPyByZXMudm90ZV9jb3VudHNbb3B0aW9uSWRdIDogbW9zdFZvdGVzO1xuXHRcdH0pO1xuXG5cdFx0Ly8gVXBkYXRlIHRoZSB0b3RhbCB2b3RlcyBjb3VudFxuXHRcdHBvbGwuZmluZCgnLnBvbGxfdG90YWxfdm90ZV9jbnQnKS5odG1sKHJlcy50b3RhbF92b3Rlcyk7XG5cblx0XHQvLyBVcGRhdGUgZWFjaCBvcHRpb25cblx0XHRwb2xsLmZpbmQoJ1tkYXRhLXBvbGwtb3B0aW9uLWlkXScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0dmFyIG9wdGlvbklkID0gJHRoaXMuYXR0cignZGF0YS1wb2xsLW9wdGlvbi1pZCcpO1xuXHRcdFx0dmFyIHZvdGVkID0gKHR5cGVvZiByZXMudXNlcl92b3Rlc1tvcHRpb25JZF0gIT09ICd1bmRlZmluZWQnKTtcblx0XHRcdHZhciBtb3N0Vm90ZWQgPSAocmVzLnZvdGVfY291bnRzW29wdGlvbklkXSA9PT0gbW9zdFZvdGVzKTtcblx0XHRcdHZhciBwZXJjZW50ID0gKCFyZXMudG90YWxfdm90ZXMpID8gMCA6IE1hdGgucm91bmQoKHJlcy52b3RlX2NvdW50c1tvcHRpb25JZF0gLyByZXMudG90YWxfdm90ZXMpICogMTAwKTtcblx0XHRcdHZhciBwZXJjZW50UmVsID0gKG1vc3RWb3RlcyA9PT0gMCkgPyAwIDogTWF0aC5yb3VuZCgocmVzLnZvdGVfY291bnRzW29wdGlvbklkXSAvIG1vc3RWb3RlcykgKiAxMDApO1xuXHRcdFx0dmFyIGFsdFRleHQ7XG5cblx0XHRcdGFsdFRleHQgPSAkdGhpcy5hdHRyKCdkYXRhLWFsdC10ZXh0Jyk7XG5cdFx0XHRpZiAodm90ZWQpIHtcblx0XHRcdFx0JHRoaXMuYXR0cigndGl0bGUnLCAkLnRyaW0oYWx0VGV4dCkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JHRoaXMuYXR0cigndGl0bGUnLCAnJyk7XG5cdFx0XHR9O1xuXHRcdFx0JHRoaXMudG9nZ2xlQ2xhc3MoJ3ZvdGVkJywgdm90ZWQpO1xuXHRcdFx0JHRoaXMudG9nZ2xlQ2xhc3MoJ21vc3Qtdm90ZXMnLCBtb3N0Vm90ZWQpO1xuXG5cdFx0XHQvLyBVcGRhdGUgdGhlIGJhcnNcblx0XHRcdHZhciBiYXIgPSAkdGhpcy5maW5kKCcucmVzdWx0YmFyIGRpdicpO1xuXHRcdFx0dmFyIGJhclRpbWVMYXBzZSA9IChyZXMuY2FuX3ZvdGUpID8gNTAwIDogMTUwMDtcblx0XHRcdHZhciBuZXdCYXJDbGFzcyA9IChwZXJjZW50ID09PSAxMDApID8gJ3BvbGxiYXI1JyA6ICdwb2xsYmFyJyArIChNYXRoLmZsb29yKHBlcmNlbnQgLyAyMCkgKyAxKTtcblxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGJhci5hbmltYXRlKHsgd2lkdGg6IHBlcmNlbnRSZWwgKyAnJScgfSwgNTAwKVxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcygncG9sbGJhcjEgcG9sbGJhcjIgcG9sbGJhcjMgcG9sbGJhcjQgcG9sbGJhcjUnKVxuXHRcdFx0XHRcdC5hZGRDbGFzcyhuZXdCYXJDbGFzcylcblx0XHRcdFx0XHQuaHRtbChyZXMudm90ZV9jb3VudHNbb3B0aW9uSWRdKTtcblxuXHRcdFx0XHR2YXIgcGVyY2VudFRleHQgPSBwZXJjZW50ID8gcGVyY2VudCArICclJyA6IHJlcy5OT19WT1RFUztcblx0XHRcdFx0JHRoaXMuZmluZCgnLnBvbGxfb3B0aW9uX3BlcmNlbnQnKS5odG1sKHBlcmNlbnRUZXh0KTtcblx0XHRcdH0sIGJhclRpbWVMYXBzZSk7XG5cdFx0fSk7XG5cblx0XHRpZiAoIXJlcy5jYW5fdm90ZSkge1xuXHRcdFx0cG9sbC5maW5kKCcucG9sbHMnKS5kZWxheSg0MDApLmZhZGVJbig1MDApO1xuXHRcdH1cblxuXHRcdC8vIERpc3BsYXkgXCJZb3VyIHZvdGUgaGFzIGJlZW4gY2FzdC5cIiBtZXNzYWdlLiBEaXNhcHBlYXJzIGFmdGVyIDUgc2Vjb25kcy5cblx0XHR2YXIgY29uZmlybWF0aW9uRGVsYXkgPSAocmVzLmNhbl92b3RlKSA/IDMwMCA6IDkwMDtcblx0XHRwb2xsLmZpbmQoJy52b3RlLXN1Ym1pdHRlZCcpLmRlbGF5KGNvbmZpcm1hdGlvbkRlbGF5KS5zbGlkZURvd24oMjAwLCBmdW5jdGlvbigpIHtcblx0XHRcdGlmIChyZXN1bHRzVmlzaWJsZSkge1xuXHRcdFx0XHR1cGRhdGVQYW5lbEhlaWdodCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQkKHRoaXMpLmRlbGF5KDUwMDApLmZhZGVPdXQoNTAwLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmVzaXplUGFuZWwoMzAwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBnYXAgcmVzdWx0aW5nIGZyb20gcmVtb3Zpbmcgb3B0aW9uc1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXNpemVQYW5lbCg1MDApO1xuXHRcdH0sIDE1MDApO1xuXG5cdFx0dmFyIHJlc2l6ZVBhbmVsID0gZnVuY3Rpb24gKHRpbWUpIHtcblx0XHRcdHZhciBwYW5lbEhlaWdodCA9IHBhbmVsLmhlaWdodCgpO1xuXHRcdFx0dmFyIGlubmVySGVpZ2h0ID0gcGFuZWwuZmluZCgnLmlubmVyJykub3V0ZXJIZWlnaHQoKTtcblxuXHRcdFx0aWYgKHBhbmVsSGVpZ2h0ICE9PSBpbm5lckhlaWdodCkge1xuXHRcdFx0XHRwYW5lbC5jc3MoeyBtaW5IZWlnaHQ6ICcnLCBoZWlnaHQ6IHBhbmVsSGVpZ2h0IH0pXG5cdFx0XHRcdFx0LmFuaW1hdGUoeyBoZWlnaHQ6IGlubmVySGVpZ2h0IH0sIHRpbWUsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHBhbmVsLmNzcyh7IG1pbkhlaWdodDogaW5uZXJIZWlnaHQsIGhlaWdodDogJycgfSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSk7XG5cbi8qKlxuICogU2hvdyBwb2xsIHJlc3VsdHMgd2hlbiBjbGlja2luZyBWaWV3IHJlc3VsdHMgbGluay5cbiAqL1xuJCgnLnBvbGxfdmlld19yZXN1bHRzIGEnKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdC8vIERvIG5vdCBmb2xsb3cgdGhlIGxpbmtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdHZhciAkcG9sbCA9ICQodGhpcykucGFyZW50cygnLnRvcGljX3BvbGwnKTtcblxuXHQkcG9sbC5maW5kKCcucmVzdWx0YmFyLCAucG9sbF9vcHRpb25fcGVyY2VudCwgLnBvbGxfdG90YWxfdm90ZXMnKS5zaG93KDUwMCk7XG5cdCRwb2xsLmZpbmQoJy5wb2xsX3ZpZXdfcmVzdWx0cycpLmhpZGUoNTAwKTtcbn0pO1xuXG4kKCdbZGF0YS1hamF4XScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdHZhciBhamF4ID0gJHRoaXMuYXR0cignZGF0YS1hamF4Jyk7XG5cdHZhciBmaWx0ZXIgPSAkdGhpcy5hdHRyKCdkYXRhLWZpbHRlcicpO1xuXG5cdGlmIChhamF4ICE9PSAnZmFsc2UnKSB7XG5cdFx0dmFyIGZuID0gKGFqYXggIT09ICd0cnVlJykgPyBhamF4IDogbnVsbDtcblx0XHRmaWx0ZXIgPSAoZmlsdGVyICE9PSB1bmRlZmluZWQpID8gcGhwYmIuZ2V0RnVuY3Rpb25CeU5hbWUoZmlsdGVyKSA6IG51bGw7XG5cblx0XHRwaHBiYi5hamF4aWZ5KHtcblx0XHRcdHNlbGVjdG9yOiB0aGlzLFxuXHRcdFx0cmVmcmVzaDogJHRoaXMuYXR0cignZGF0YS1yZWZyZXNoJykgIT09IHVuZGVmaW5lZCxcblx0XHRcdGZpbHRlcjogZmlsdGVyLFxuXHRcdFx0Y2FsbGJhY2s6IGZuXG5cdFx0fSk7XG5cdH1cbn0pO1xuXG5cbi8qKlxuICogVGhpcyBzaW1wbHkgYXBwZW5kcyAjcHJldmlldyB0byB0aGUgYWN0aW9uIG9mIHRoZVxuICogUVIgYWN0aW9uIHdoZW4geW91IGNsaWNrIHRoZSBGdWxsIEVkaXRvciAmIFByZXZpZXcgYnV0dG9uXG4gKi9cbiQoJyNxcl9mdWxsX2VkaXRvcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHQkKCcjcXJfcG9zdGZvcm0nKS5hdHRyKCdhY3Rpb24nLCBmdW5jdGlvbihpLCB2YWwpIHtcblx0XHRyZXR1cm4gdmFsICsgJyNwcmV2aWV3Jztcblx0fSk7XG59KTtcblxuXG4vKipcbiAqIE1ha2UgdGhlIGRpc3BsYXkgcG9zdCBsaW5rcyB0byB1c2UgSlNcbiAqL1xuJCgnLmRpc3BsYXlfcG9zdCcpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0Ly8gRG8gbm90IGZvbGxvdyB0aGUgbGlua1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0dmFyIHBvc3RJZCA9ICQodGhpcykuYXR0cignZGF0YS1wb3N0LWlkJyk7XG5cdCQoJyNwb3N0X2NvbnRlbnQnICsgcG9zdElkKS5zaG93KCk7XG5cdCQoJyNwcm9maWxlJyArIHBvc3RJZCkuc2hvdygpO1xuXHQkKCcjcG9zdF9oaWRkZW4nICsgcG9zdElkKS5oaWRlKCk7XG59KTtcblxuLyoqXG4qIFRvZ2dsZSB0aGUgbWVtYmVyIHNlYXJjaCBwYW5lbCBpbiBtZW1iZXJsaXN0LnBocC5cbipcbiogSWYgdXNlciByZXR1cm5zIHRvIHNlYXJjaCBwYWdlIGFmdGVyIHZpZXdpbmcgcmVzdWx0cyB0aGUgc2VhcmNoIHBhbmVsIGlzIGF1dG9tYXRpY2FsbHkgZGlzcGxheWVkLlxuKiBJbiBhbnkgY2FzZSB0aGUgbGluayB3aWxsIHRvZ2dsZSB0aGUgZGlzcGxheSBzdGF0dXMgb2YgdGhlIHNlYXJjaCBwYW5lbCBhbmQgbGluayB0ZXh0IHdpbGwgYmVcbiogYXBwcm9wcmlhdGVseSBjaGFuZ2VkIGJhc2VkIG9uIHRoZSBzdGF0dXMgb2YgdGhlIHNlYXJjaCBwYW5lbC5cbiovXG4kKCcjbWVtYmVyX3NlYXJjaCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0dmFyICRtZW1iZXJsaXN0U2VhcmNoID0gJCgnI21lbWJlcmxpc3Rfc2VhcmNoJyk7XG5cblx0JG1lbWJlcmxpc3RTZWFyY2guc2xpZGVUb2dnbGUoJ2Zhc3QnKTtcblx0cGhwYmIuYWpheENhbGxiYWNrcy5hbHRfdGV4dC5jYWxsKHRoaXMpO1xuXG5cdC8vIEZvY3VzIG9uIHRoZSB1c2VybmFtZSB0ZXh0Ym94IGlmIGl0J3MgYXZhaWxhYmxlIGFuZCBkaXNwbGF5ZWRcblx0aWYgKCRtZW1iZXJsaXN0U2VhcmNoLmlzKCc6dmlzaWJsZScpKSB7XG5cdFx0JCgnI3VzZXJuYW1lJykuZm9jdXMoKTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59KTtcblxuLyoqXG4qIEF1dG9tYXRpY2FsbHkgcmVzaXplIHRleHRhcmVhXG4qL1xuJChmdW5jdGlvbigpIHtcblx0dmFyICR0ZXh0YXJlYSA9ICQoJ3RleHRhcmVhOm5vdCgjbWVzc2FnZS1ib3ggdGV4dGFyZWEsIC5uby1hdXRvLXJlc2l6ZSknKTtcblx0cGhwYmIucmVzaXplVGV4dEFyZWEoJHRleHRhcmVhLCB7IG1pbkhlaWdodDogNzUsIG1heEhlaWdodDogMjUwIH0pO1xuXHRwaHBiYi5yZXNpemVUZXh0QXJlYSgkKCd0ZXh0YXJlYScsICcjbWVzc2FnZS1ib3gnKSk7XG59KTtcblxuXG59KShqUXVlcnkpOyAvLyBBdm9pZCBjb25mbGljdHMgd2l0aCBvdGhlciBsaWJyYXJpZXNcbiJdfQ==
