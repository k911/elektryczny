!function(t){"use strict";phpbb.addAjaxCallback("mark_forums_read",function(a){var e=a.NO_UNREAD_POSTS,o=a.UNREAD_POSTS,i={forum_unread:"forum_read",forum_unread_subforum:"forum_read_subforum",forum_unread_locked:"forum_read_locked"};t("li.row").find('dl[class*="forum_unread"]').each(function(){var a=t(this);t.each(i,function(t,e){a.hasClass(t)&&a.removeClass(t).addClass(e)}),a.children('dt[title="'+o+'"]').attr("title",e)}),t('a.subforum[class*="unread"]').removeClass("unread").addClass("read"),t("#active_topics").length&&phpbb.ajaxCallbacks.mark_topics_read.call(this,a,!1),t('[data-ajax="mark_forums_read"]').attr("href",a.U_MARK_FORUMS),phpbb.closeDarkenWrapper(3e3)}),phpbb.addAjaxCallback("mark_topics_read",function(a,e){var o,i=a.NO_UNREAD_POSTS,n=a.UNREAD_POSTS,r={global_unread:"global_read",announce_unread:"announce_read",sticky_unread:"sticky_read",topic_unread:"topic_read"},l=["","_hot","_hot_mine","_locked","_locked_mine","_mine"],s={},d=[];void 0===e&&(e=!0),t.each(r,function(a,e){t.each(l,function(t,o){if(("_hot"===o||"_hot_mine"===o)&&"topic_unread"!==a)return!0;s[a+o]=e+o,d.push(a+o)})}),o="."+d.join(",."),t("li.row").find(o).each(function(){var a=t(this);t.each(s,function(t,e){a.hasClass(t)&&a.removeClass(t).addClass(e)}),a.children('dt[title="'+n+'"]').attr("title",i)}),t("a").has("span.icon_topic_newest").remove(),e&&t('[data-ajax="mark_topics_read"]').attr("href",a.U_MARK_TOPICS),phpbb.closeDarkenWrapper(3e3)}),phpbb.addAjaxCallback("notification.mark_all_read",function(a){void 0!==a.success&&(phpbb.markNotifications(t("#notification_list li.notification-unseen"),0),phpbb.closeDarkenWrapper(3e3))}),phpbb.addAjaxCallback("notification.mark_read",function(a){if(void 0!==a.success){var e=Number(t(".notifications.tab").data("badge"))-1;phpbb.markNotifications(t(this).parent("li.notification-unseen"),e)}}),phpbb.markNotifications=function(a,e){a.removeClass("notification-unseen"),a.find("a.mark_read").remove(),a.each(function(){var a=t(this).find("a");a.attr("href",a.attr("data-real-url"))}),t(".notifications.tab").attr("data-badge",e).toggleClass("non-zero mdl-badge mdl-badge--small",e>0),e||t(".mark_all_read").remove();var o=t("title"),i=o.text().replace(/(\((\d+)\))/,"");o.text((e?"("+e+")":"")+i)},phpbb.addAjaxCallback("post_delete",function(){var a,e=t(this);if(void 0===e.attr("data-refresh")){a=e[0].href.split("&p=")[1];var o=e.parents("#p"+a).css("pointer-events","none");if(o.hasClass("bg1")||o.hasClass("bg2")){var i=o.nextAll(".bg1");o.nextAll(".bg2").removeClass("bg2").addClass("bg1"),i.removeClass("bg1").addClass("bg2")}o.fadeOut(function(){t(this).remove()})}}),phpbb.addAjaxCallback("post_visibility",function(a){var e=a.visible?t(this):t(this).parents(".post");t(e).css("pointer-events","none").fadeOut(function(){t(this).remove()}),a.visible&&e.parents(".post").find(".post_deleted_msg").css("pointer-events","none").fadeOut(function(){t(this).remove()})}),phpbb.addAjaxCallback("row_delete",function(){t(this).parents("tr").remove()}),phpbb.addAjaxCallback("zebra",function(a){var e;a.success&&(e=t(".zebra"),e.first().html(a.MESSAGE_TEXT),e.not(":first").html("&nbsp;").prev().html("&nbsp;"))}),phpbb.addAjaxCallback("vote_poll",function(a){if(void 0!==a.success){var e=t(".topic_poll"),o=e.find(".panel"),i=e.find("dl:first-child .resultbar").is(":visible"),n=0,r=function(t){t=void 0===t?o.find(".inner").outerHeight():t,o.css("min-height",t)};r(),i||e.find(".poll_view_results").hide(500),a.can_vote?e.find(".resultbar, .poll_option_percent, .poll_total_votes").show(500):e.find(".polls, .poll_max_votes, .poll_vote, .poll_option_select").fadeOut(500,function(){e.find(".resultbar, .poll_option_percent, .poll_total_votes").show()}),e.find("[data-poll-option-id]").each(function(){var e=t(this),o=e.attr("data-poll-option-id");n=a.vote_counts[o]>=n?a.vote_counts[o]:n}),e.find(".poll_total_vote_cnt").html(a.total_votes),e.find("[data-poll-option-id]").each(function(){var e,o=t(this),i=o.attr("data-poll-option-id"),r=void 0!==a.user_votes[i],l=a.vote_counts[i]===n,s=a.total_votes?Math.round(a.vote_counts[i]/a.total_votes*100):0,d=0===n?0:Math.round(a.vote_counts[i]/n*100);e=o.attr("data-alt-text"),r?o.attr("title",t.trim(e)):o.attr("title",""),o.toggleClass("voted",r),o.toggleClass("most-votes",l);var c=o.find(".resultbar div"),p=a.can_vote?500:1500,_=100===s?"pollbar5":"pollbar"+(Math.floor(s/20)+1);setTimeout(function(){c.animate({width:d+"%"},500).removeClass("pollbar1 pollbar2 pollbar3 pollbar4 pollbar5").addClass(_).html(a.vote_counts[i]);var t=s?s+"%":a.NO_VOTES;o.find(".poll_option_percent").html(t)},p)}),a.can_vote||e.find(".polls").delay(400).fadeIn(500);var l=function(t){var a=o.height(),e=o.find(".inner").outerHeight();a!==e&&o.css({minHeight:"",height:a}).animate({height:e},t,function(){o.css({minHeight:e,height:""})})},s=a.can_vote?300:900;e.find(".vote-submitted").delay(s).slideDown(200,function(){i&&r(),t(this).delay(5e3).fadeOut(500,function(){l(300)})}),setTimeout(function(){l(500)},1500)}}),t(".poll_view_results a").click(function(a){a.preventDefault();var e=t(this).parents(".topic_poll");e.find(".resultbar, .poll_option_percent, .poll_total_votes").show(500),e.find(".poll_view_results").hide(500)}),t("[data-ajax]").each(function(){var a=t(this),e=a.attr("data-ajax"),o=a.attr("data-filter");if("false"!==e){var i="true"!==e?e:null;o=void 0!==o?phpbb.getFunctionByName(o):null,phpbb.ajaxify({selector:this,refresh:void 0!==a.attr("data-refresh"),filter:o,callback:i})}}),t("#qr_full_editor").click(function(){t("#qr_postform").attr("action",function(t,a){return a+"#preview"})}),t(".display_post").click(function(a){a.preventDefault();var e=t(this).attr("data-post-id");t("#post_content"+e).show(),t("#profile"+e).show(),t("#post_hidden"+e).hide()}),t("#member_search").click(function(){var a=t("#memberlist_search");return a.slideToggle("fast"),phpbb.ajaxCallbacks.alt_text.call(this),a.is(":visible")&&t("#username").focus(),!1}),t(function(){var a=t("textarea:not(#message-box textarea, .no-auto-resize)");phpbb.resizeTextArea(a,{minHeight:75,maxHeight:250}),phpbb.resizeTextArea(t("textarea","#message-box"))})}(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiJCIsInBocGJiIiwiYWRkQWpheENhbGxiYWNrIiwicmVzIiwicmVhZFRpdGxlIiwiTk9fVU5SRUFEX1BPU1RTIiwidW5yZWFkVGl0bGUiLCJVTlJFQURfUE9TVFMiLCJpY29uc0FycmF5IiwiZm9ydW1fdW5yZWFkIiwiZm9ydW1fdW5yZWFkX3N1YmZvcnVtIiwiZm9ydW1fdW5yZWFkX2xvY2tlZCIsImZpbmQiLCJlYWNoIiwiJHRoaXMiLCJ0aGlzIiwidW5yZWFkQ2xhc3MiLCJyZWFkQ2xhc3MiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJjaGlsZHJlbiIsImF0dHIiLCJsZW5ndGgiLCJhamF4Q2FsbGJhY2tzIiwibWFya190b3BpY3NfcmVhZCIsImNhbGwiLCJVX01BUktfRk9SVU1TIiwiY2xvc2VEYXJrZW5XcmFwcGVyIiwidXBkYXRlVG9waWNMaW5rcyIsInVucmVhZENsYXNzU2VsZWN0b3JzIiwiZ2xvYmFsX3VucmVhZCIsImFubm91bmNlX3VucmVhZCIsInN0aWNreV91bnJlYWQiLCJ0b3BpY191bnJlYWQiLCJpY29uc1N0YXRlIiwiY2xhc3NNYXAiLCJjbGFzc05hbWVzIiwia2V5IiwidmFsdWUiLCJwdXNoIiwiam9pbiIsImhhcyIsInJlbW92ZSIsIlVfTUFSS19UT1BJQ1MiLCJzdWNjZXNzIiwibWFya05vdGlmaWNhdGlvbnMiLCJ1bnJlYWRDb3VudCIsIk51bWJlciIsImRhdGEiLCJwYXJlbnQiLCIkcG9wdXAiLCJsaW5rIiwidG9nZ2xlQ2xhc3MiLCIkdGl0bGUiLCJvcmlnaW5hbFRpdGxlIiwidGV4dCIsInJlcGxhY2UiLCJwb3N0SWQiLCJ1bmRlZmluZWQiLCJocmVmIiwic3BsaXQiLCJwb3N0IiwicGFyZW50cyIsImNzcyIsInBvc3RzMSIsIm5leHRBbGwiLCJmYWRlT3V0IiwidmlzaWJsZSIsInplYnJhIiwiZmlyc3QiLCJodG1sIiwiTUVTU0FHRV9URVhUIiwibm90IiwicHJldiIsInBvbGwiLCJwYW5lbCIsInJlc3VsdHNWaXNpYmxlIiwiaXMiLCJtb3N0Vm90ZXMiLCJ1cGRhdGVQYW5lbEhlaWdodCIsImhlaWdodCIsIm91dGVySGVpZ2h0IiwiaGlkZSIsImNhbl92b3RlIiwic2hvdyIsIm9wdGlvbiIsIm9wdGlvbklkIiwidm90ZV9jb3VudHMiLCJ0b3RhbF92b3RlcyIsImFsdFRleHQiLCJ2b3RlZCIsInVzZXJfdm90ZXMiLCJtb3N0Vm90ZWQiLCJwZXJjZW50IiwiTWF0aCIsInJvdW5kIiwicGVyY2VudFJlbCIsInRyaW0iLCJiYXIiLCJiYXJUaW1lTGFwc2UiLCJuZXdCYXJDbGFzcyIsImZsb29yIiwic2V0VGltZW91dCIsImFuaW1hdGUiLCJ3aWR0aCIsInBlcmNlbnRUZXh0IiwiTk9fVk9URVMiLCJkZWxheSIsImZhZGVJbiIsInJlc2l6ZVBhbmVsIiwidGltZSIsInBhbmVsSGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJtaW5IZWlnaHQiLCJjb25maXJtYXRpb25EZWxheSIsInNsaWRlRG93biIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwiJHBvbGwiLCJhamF4IiwiZmlsdGVyIiwiZm4iLCJnZXRGdW5jdGlvbkJ5TmFtZSIsImFqYXhpZnkiLCJzZWxlY3RvciIsInJlZnJlc2giLCJjYWxsYmFjayIsImkiLCJ2YWwiLCIkbWVtYmVybGlzdFNlYXJjaCIsInNsaWRlVG9nZ2xlIiwiYWx0X3RleHQiLCJmb2N1cyIsIiR0ZXh0YXJlYSIsInJlc2l6ZVRleHRBcmVhIiwibWF4SGVpZ2h0IiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiQ0FFQSxTQUFXQSxHQUNULFlBR0FDLE9BQU1DLGdCQUFnQixtQkFBb0IsU0FBVUMsR0FDbEQsR0FBSUMsR0FBWUQsRUFBSUUsZ0JBQ2hCQyxFQUFjSCxFQUFJSSxhQUNsQkMsR0FDRkMsYUFBYyxhQUNkQyxzQkFBdUIsc0JBQ3ZCQyxvQkFBcUIsb0JBR3ZCWCxHQUFFLFVBQVVZLEtBQUssNkJBQTZCQyxLQUFLLFdBQ2pELEdBQUlDLEdB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YiAqL1xuXG4oZnVuY3Rpb24gKCQpIHsgIC8vIEF2b2lkIGNvbmZsaWN0cyB3aXRoIG90aGVyIGxpYnJhcmllc1xuICAndXNlIHN0cmljdCc7XG5cbi8vIFRoaXMgY2FsbGJhY2sgd2lsbCBtYXJrIGFsbCBmb3J1bSBpY29ucyByZWFkXG4gIHBocGJiLmFkZEFqYXhDYWxsYmFjaygnbWFya19mb3J1bXNfcmVhZCcsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICB2YXIgcmVhZFRpdGxlID0gcmVzLk5PX1VOUkVBRF9QT1NUUztcbiAgICB2YXIgdW5yZWFkVGl0bGUgPSByZXMuVU5SRUFEX1BPU1RTO1xuICAgIHZhciBpY29uc0FycmF5ID0ge1xuICAgICAgZm9ydW1fdW5yZWFkOiAnZm9ydW1fcmVhZCcsXG4gICAgICBmb3J1bV91bnJlYWRfc3ViZm9ydW06ICdmb3J1bV9yZWFkX3N1YmZvcnVtJyxcbiAgICAgIGZvcnVtX3VucmVhZF9sb2NrZWQ6ICdmb3J1bV9yZWFkX2xvY2tlZCdcbiAgICB9O1xuXG4gICAgJCgnbGkucm93JykuZmluZCgnZGxbY2xhc3MqPVwiZm9ydW1fdW5yZWFkXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAkLmVhY2goaWNvbnNBcnJheSwgZnVuY3Rpb24gKHVucmVhZENsYXNzLCByZWFkQ2xhc3MpIHtcbiAgICAgICAgaWYgKCR0aGlzLmhhc0NsYXNzKHVucmVhZENsYXNzKSkge1xuICAgICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKHVucmVhZENsYXNzKS5hZGRDbGFzcyhyZWFkQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgICR0aGlzLmNoaWxkcmVuKCdkdFt0aXRsZT1cIicgKyB1bnJlYWRUaXRsZSArICdcIl0nKS5hdHRyKCd0aXRsZScsIHJlYWRUaXRsZSk7XG4gICAgfSk7XG5cblx0Ly8gTWFyayBzdWJmb3J1bXMgcmVhZFxuICAgICQoJ2Euc3ViZm9ydW1bY2xhc3MqPVwidW5yZWFkXCJdJykucmVtb3ZlQ2xhc3MoJ3VucmVhZCcpLmFkZENsYXNzKCdyZWFkJyk7XG5cblx0Ly8gTWFyayB0b3BpY3MgcmVhZCBpZiB3ZSBhcmUgd2F0Y2hpbmcgYSBjYXRlZ29yeSBhbmQgc2hvd2luZyBhY3RpdmUgdG9waWNzXG4gICAgaWYgKCQoJyNhY3RpdmVfdG9waWNzJykubGVuZ3RoKSB7XG4gICAgICBwaHBiYi5hamF4Q2FsbGJhY2tzLm1hcmtfdG9waWNzX3JlYWQuY2FsbCh0aGlzLCByZXMsIGZhbHNlKTtcbiAgICB9XG5cblx0Ly8gVXBkYXRlIG1hcmsgZm9ydW1zIHJlYWQgbGlua3NcbiAgICAkKCdbZGF0YS1hamF4PVwibWFya19mb3J1bXNfcmVhZFwiXScpLmF0dHIoJ2hyZWYnLCByZXMuVV9NQVJLX0ZPUlVNUyk7XG5cbiAgICBwaHBiYi5jbG9zZURhcmtlbldyYXBwZXIoMzAwMCk7XG4gIH0pO1xuXG4vKipcbiogVGhpcyBjYWxsYmFjayB3aWxsIG1hcmsgYWxsIHRvcGljIGljb25zIHJlYWRcbipcbiogQHBhcmFtIHtib29sfSBbdXBkYXRlX3RvcGljX2xpbmtzPXRydWVdIFdoZXRoZXIgXCJNYXJrIHRvcGljcyByZWFkXCIgbGlua3NcbiogXHRzaG91bGQgYmUgdXBkYXRlZC4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiovXG4gIHBocGJiLmFkZEFqYXhDYWxsYmFjaygnbWFya190b3BpY3NfcmVhZCcsIGZ1bmN0aW9uIChyZXMsIHVwZGF0ZVRvcGljTGlua3MpIHtcbiAgICB2YXIgcmVhZFRpdGxlID0gcmVzLk5PX1VOUkVBRF9QT1NUUztcbiAgICB2YXIgdW5yZWFkVGl0bGUgPSByZXMuVU5SRUFEX1BPU1RTO1xuICAgIHZhciBpY29uc0FycmF5ID0ge1xuICAgICAgZ2xvYmFsX3VucmVhZDogJ2dsb2JhbF9yZWFkJyxcbiAgICAgIGFubm91bmNlX3VucmVhZDogJ2Fubm91bmNlX3JlYWQnLFxuICAgICAgc3RpY2t5X3VucmVhZDogJ3N0aWNreV9yZWFkJyxcbiAgICAgIHRvcGljX3VucmVhZDogJ3RvcGljX3JlYWQnXG4gICAgfTtcbiAgICB2YXIgaWNvbnNTdGF0ZSA9IFsnJywgJ19ob3QnLCAnX2hvdF9taW5lJywgJ19sb2NrZWQnLCAnX2xvY2tlZF9taW5lJywgJ19taW5lJ107XG4gICAgdmFyIHVucmVhZENsYXNzU2VsZWN0b3JzO1xuICAgIHZhciBjbGFzc01hcCA9IHt9O1xuICAgIHZhciBjbGFzc05hbWVzID0gW107XG5cbiAgICBpZiAodHlwZW9mIHVwZGF0ZVRvcGljTGlua3MgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB1cGRhdGVUb3BpY0xpbmtzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAkLmVhY2goaWNvbnNBcnJheSwgZnVuY3Rpb24gKHVucmVhZENsYXNzLCByZWFkQ2xhc3MpIHtcbiAgICAgICQuZWFjaChpY29uc1N0YXRlLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0Ly8gT25seSB0b3BpY3MgY2FuIGJlIGhvdFxuICAgICAgICBpZiAoKHZhbHVlID09PSAnX2hvdCcgfHwgdmFsdWUgPT09ICdfaG90X21pbmUnKSAmJiB1bnJlYWRDbGFzcyAhPT0gJ3RvcGljX3VucmVhZCcpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjbGFzc01hcFt1bnJlYWRDbGFzcyArIHZhbHVlXSA9IHJlYWRDbGFzcyArIHZhbHVlO1xuICAgICAgICBjbGFzc05hbWVzLnB1c2godW5yZWFkQ2xhc3MgKyB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHVucmVhZENsYXNzU2VsZWN0b3JzID0gJy4nICsgY2xhc3NOYW1lcy5qb2luKCcsLicpO1xuXG4gICAgJCgnbGkucm93JykuZmluZCh1bnJlYWRDbGFzc1NlbGVjdG9ycykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgJC5lYWNoKGNsYXNzTWFwLCBmdW5jdGlvbiAodW5yZWFkQ2xhc3MsIHJlYWRDbGFzcykge1xuICAgICAgICBpZiAoJHRoaXMuaGFzQ2xhc3ModW5yZWFkQ2xhc3MpKSB7XG4gICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3ModW5yZWFkQ2xhc3MpLmFkZENsYXNzKHJlYWRDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgJHRoaXMuY2hpbGRyZW4oJ2R0W3RpdGxlPVwiJyArIHVucmVhZFRpdGxlICsgJ1wiXScpLmF0dHIoJ3RpdGxlJywgcmVhZFRpdGxlKTtcbiAgICB9KTtcblxuXHQvLyBSZW1vdmUgbGluayB0byBmaXJzdCB1bnJlYWQgcG9zdFxuICAgICQoJ2EnKS5oYXMoJ3NwYW4uaWNvbl90b3BpY19uZXdlc3QnKS5yZW1vdmUoKTtcblxuXHQvLyBVcGRhdGUgbWFyayB0b3BpY3MgcmVhZCBsaW5rc1xuICAgIGlmICh1cGRhdGVUb3BpY0xpbmtzKSB7XG4gICAgICAkKCdbZGF0YS1hamF4PVwibWFya190b3BpY3NfcmVhZFwiXScpLmF0dHIoJ2hyZWYnLCByZXMuVV9NQVJLX1RPUElDUyk7XG4gICAgfVxuXG4gICAgcGhwYmIuY2xvc2VEYXJrZW5XcmFwcGVyKDMwMDApO1xuICB9KTtcblxuLy8gVGhpcyBjYWxsYmFjayB3aWxsIG1hcmsgYWxsIG5vdGlmaWNhdGlvbnMgcmVhZFxuICBwaHBiYi5hZGRBamF4Q2FsbGJhY2soJ25vdGlmaWNhdGlvbi5tYXJrX2FsbF9yZWFkJywgZnVuY3Rpb24gKHJlcykge1xuICAgIGlmICh0eXBlb2YgcmVzLnN1Y2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBwaHBiYi5tYXJrTm90aWZpY2F0aW9ucygkKCcjbm90aWZpY2F0aW9uX2xpc3QgbGkubm90aWZpY2F0aW9uLXVuc2VlbicpLCAwKTtcbiAgICAgIHBocGJiLmNsb3NlRGFya2VuV3JhcHBlcigzMDAwKTtcbiAgICB9XG4gIH0pO1xuXG4vLyBUaGlzIGNhbGxiYWNrIHdpbGwgbWFyayBhIG5vdGlmaWNhdGlvbiByZWFkXG4gIHBocGJiLmFkZEFqYXhDYWxsYmFjaygnbm90aWZpY2F0aW9uLm1hcmtfcmVhZCcsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICBpZiAodHlwZW9mIHJlcy5zdWNjZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIHVucmVhZENvdW50ID0gTnVtYmVyKCQoJy5ub3RpZmljYXRpb25zLnRhYicpLmRhdGEoJ2JhZGdlJykpIC0gMTtcbiAgICAgIHBocGJiLm1hcmtOb3RpZmljYXRpb25zKCQodGhpcykucGFyZW50KCdsaS5ub3RpZmljYXRpb24tdW5zZWVuJyksIHVucmVhZENvdW50KTtcbiAgICB9XG4gIH0pO1xuXG4vKipcbiAqIE1hcmsgbm90aWZpY2F0aW9uIHBvcHVwIHJvd3MgYXMgcmVhZC5cbiAqXG4gKiBAcGFyYW0ge2pRdWVyeX0gJHBvcHVwIGpRdWVyeSBvYmplY3QocykgdG8gbWFyayByZWFkLlxuICogQHBhcmFtIHtpbnR9IHVucmVhZENvdW50IFRoZSBuZXcgdW5yZWFkIG5vdGlmaWNhdGlvbnMgY291bnQuXG4gKi9cbiAgcGhwYmIubWFya05vdGlmaWNhdGlvbnMgPSBmdW5jdGlvbiAoJHBvcHVwLCB1bnJlYWRDb3VudCkge1xuXHQvLyBSZW1vdmUgdGhlIHVucmVhZCBzdGF0dXMuXG4gICAgJHBvcHVwLnJlbW92ZUNsYXNzKCdub3RpZmljYXRpb24tdW5zZWVuJyk7XG4gICAgJHBvcHVwLmZpbmQoJ2EubWFya19yZWFkJykucmVtb3ZlKCk7XG5cblx0Ly8gVXBkYXRlIHRoZSBub3RpZmljYXRpb24gbGluayB0byB0aGUgcmVhbCBVUkwuXG4gICAgJHBvcHVwLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGxpbmsgPSAkKHRoaXMpLmZpbmQoJ2EnKTtcbiAgICAgIGxpbmsuYXR0cignaHJlZicsIGxpbmsuYXR0cignZGF0YS1yZWFsLXVybCcpKTtcbiAgICB9KTtcblxuXHQvLyBVcGRhdGUgdGhlIHVucmVhZCBjb3VudC5cbiAgICAkKCcubm90aWZpY2F0aW9ucy50YWInKS5hdHRyKCdkYXRhLWJhZGdlJywgdW5yZWFkQ291bnQpLnRvZ2dsZUNsYXNzKCdub24temVybyBtZGwtYmFkZ2UgbWRsLWJhZGdlLS1zbWFsbCcsIHVucmVhZENvdW50ID4gMCk7XG5cblx0Ly8gUmVtb3ZlIHRoZSBNYXJrIGFsbCByZWFkIGxpbmsgaWYgdGhlcmUgYXJlIG5vIHVucmVhZCBub3RpZmljYXRpb25zLlxuICAgIGlmICghdW5yZWFkQ291bnQpIHtcbiAgICAgICQoJy5tYXJrX2FsbF9yZWFkJykucmVtb3ZlKCk7XG4gICAgfVxuXG5cdC8vIFVwZGF0ZSBwYWdlIHRpdGxlXG4gICAgdmFyICR0aXRsZSA9ICQoJ3RpdGxlJyk7XG4gICAgdmFyIG9yaWdpbmFsVGl0bGUgPSAkdGl0bGUudGV4dCgpLnJlcGxhY2UoLyhcXCgoXFxkKylcXCkpLywgJycpO1xuICAgICR0aXRsZS50ZXh0KCh1bnJlYWRDb3VudCA/ICcoJyArIHVucmVhZENvdW50ICsgJyknIDogJycpICsgb3JpZ2luYWxUaXRsZSk7XG4gIH07XG5cbi8vIFRoaXMgY2FsbGJhY2sgZmluZHMgdGhlIHBvc3QgZnJvbSB0aGUgZGVsZXRlIGxpbmssIGFuZCByZW1vdmVzIGl0LlxuICBwaHBiYi5hZGRBamF4Q2FsbGJhY2soJ3Bvc3RfZGVsZXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICBwb3N0SWQ7XG5cbiAgICBpZiAoJHRoaXMuYXR0cignZGF0YS1yZWZyZXNoJykgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcG9zdElkID0gJHRoaXNbMF0uaHJlZi5zcGxpdCgnJnA9JylbMV07XG4gICAgICB2YXIgcG9zdCA9ICR0aGlzLnBhcmVudHMoJyNwJyArIHBvc3RJZCkuY3NzKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG4gICAgICBpZiAocG9zdC5oYXNDbGFzcygnYmcxJykgfHwgcG9zdC5oYXNDbGFzcygnYmcyJykpIHtcbiAgICAgICAgdmFyIHBvc3RzMSA9IHBvc3QubmV4dEFsbCgnLmJnMScpO1xuICAgICAgICBwb3N0Lm5leHRBbGwoJy5iZzInKS5yZW1vdmVDbGFzcygnYmcyJykuYWRkQ2xhc3MoJ2JnMScpO1xuICAgICAgICBwb3N0czEucmVtb3ZlQ2xhc3MoJ2JnMScpLmFkZENsYXNzKCdiZzInKTtcbiAgICAgIH1cbiAgICAgIHBvc3QuZmFkZU91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4vLyBUaGlzIGNhbGxiYWNrIHJlbW92ZXMgdGhlIGFwcHJvdmUgLyBkaXNhcHByb3ZlIGRpdiBvciBsaW5rLlxuICBwaHBiYi5hZGRBamF4Q2FsbGJhY2soJ3Bvc3RfdmlzaWJpbGl0eScsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICB2YXIgcmVtb3ZlID0gKHJlcy52aXNpYmxlKSA/ICQodGhpcykgOiAkKHRoaXMpLnBhcmVudHMoJy5wb3N0Jyk7XG4gICAgJChyZW1vdmUpLmNzcygncG9pbnRlci1ldmVudHMnLCAnbm9uZScpLmZhZGVPdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICB9KTtcblxuICAgIGlmIChyZXMudmlzaWJsZSkge1xuXHRcdC8vIFJlbW92ZSB0aGUgXCJEZWxldGVkIGJ5XCIgbWVzc2FnZSBmcm9tIHRoZSBwb3N0IG9uIHJlc3RvcmluZy5cbiAgICAgIHJlbW92ZS5wYXJlbnRzKCcucG9zdCcpLmZpbmQoJy5wb3N0X2RlbGV0ZWRfbXNnJykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdub25lJykuZmFkZU91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4vLyBUaGlzIHJlbW92ZXMgdGhlIHBhcmVudCByb3cgb2YgdGhlIGxpbmsgb3IgZm9ybSB0aGF0IGZpcmVkIHRoZSBjYWxsYmFjay5cbiAgcGhwYmIuYWRkQWpheENhbGxiYWNrKCdyb3dfZGVsZXRlJywgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucGFyZW50cygndHInKS5yZW1vdmUoKTtcbiAgfSk7XG5cbi8vIFRoaXMgaGFuZGxlcyBmcmllbmQgLyBmb2UgYWRkaXRpb25zIHJlbW92YWxzLlxuICBwaHBiYi5hZGRBamF4Q2FsbGJhY2soJ3plYnJhJywgZnVuY3Rpb24gKHJlcykge1xuICAgIHZhciB6ZWJyYTtcblxuICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgemVicmEgPSAkKCcuemVicmEnKTtcbiAgICAgIHplYnJhLmZpcnN0KCkuaHRtbChyZXMuTUVTU0FHRV9URVhUKTtcbiAgICAgIHplYnJhLm5vdCgnOmZpcnN0JykuaHRtbCgnJm5ic3A7JykucHJldigpLmh0bWwoJyZuYnNwOycpO1xuICAgIH1cbiAgfSk7XG5cbi8qKlxuICogVGhpcyBjYWxsYmFjayB1cGRhdGVzIHRoZSBwb2xsIHJlc3VsdHMgYWZ0ZXIgdm90aW5nLlxuICovXG4gIHBocGJiLmFkZEFqYXhDYWxsYmFjaygndm90ZV9wb2xsJywgZnVuY3Rpb24gKHJlcykge1xuICAgIGlmICh0eXBlb2YgcmVzLnN1Y2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgcG9sbCA9ICQoJy50b3BpY19wb2xsJyk7XG4gICAgICB2YXIgcGFuZWwgPSBwb2xsLmZpbmQoJy5wYW5lbCcpO1xuICAgICAgdmFyIHJlc3VsdHNWaXNpYmxlID0gcG9sbC5maW5kKCdkbDpmaXJzdC1jaGlsZCAucmVzdWx0YmFyJykuaXMoJzp2aXNpYmxlJyk7XG4gICAgICB2YXIgbW9zdFZvdGVzID0gMDtcblxuXHRcdC8vIFNldCBtaW4taGVpZ2h0IHRvIHByZXZlbnQgdGhlIHBhZ2UgZnJvbSBqdW1waW5nIHdoZW4gdGhlIGNvbnRlbnQgY2hhbmdlc1xuICAgICAgdmFyIHVwZGF0ZVBhbmVsSGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCkge1xuICAgICAgICBoZWlnaHQgPSAodHlwZW9mIGhlaWdodCA9PT0gJ3VuZGVmaW5lZCcpID8gcGFuZWwuZmluZCgnLmlubmVyJykub3V0ZXJIZWlnaHQoKSA6IGhlaWdodDtcbiAgICAgICAgcGFuZWwuY3NzKCdtaW4taGVpZ2h0JywgaGVpZ2h0KTtcbiAgICAgIH07XG4gICAgICB1cGRhdGVQYW5lbEhlaWdodCgpO1xuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBWaWV3IHJlc3VsdHMgbGlua1xuICAgICAgaWYgKCFyZXN1bHRzVmlzaWJsZSkge1xuICAgICAgICBwb2xsLmZpbmQoJy5wb2xsX3ZpZXdfcmVzdWx0cycpLmhpZGUoNTAwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFyZXMuY2FuX3ZvdGUpIHtcbiAgICAgICAgcG9sbC5maW5kKCcucG9sbHMsIC5wb2xsX21heF92b3RlcywgLnBvbGxfdm90ZSwgLnBvbGxfb3B0aW9uX3NlbGVjdCcpLmZhZGVPdXQoNTAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcG9sbC5maW5kKCcucmVzdWx0YmFyLCAucG9sbF9vcHRpb25fcGVyY2VudCwgLnBvbGxfdG90YWxfdm90ZXMnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcblx0XHRcdC8vIElmIHRoZSB1c2VyIGNhbiBzdGlsbCB2b3RlLCBzaW1wbHkgc2xpZGUgZG93biB0aGUgcmVzdWx0c1xuICAgICAgICBwb2xsLmZpbmQoJy5yZXN1bHRiYXIsIC5wb2xsX29wdGlvbl9wZXJjZW50LCAucG9sbF90b3RhbF92b3RlcycpLnNob3coNTAwKTtcbiAgICAgIH1cblxuXHRcdC8vIEdldCB0aGUgdm90ZXMgY291bnQgb2YgdGhlIGhpZ2hlc3QgcG9sbCBvcHRpb25cbiAgICAgIHBvbGwuZmluZCgnW2RhdGEtcG9sbC1vcHRpb24taWRdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvcHRpb24gPSAkKHRoaXMpO1xuICAgICAgICB2YXIgb3B0aW9uSWQgPSBvcHRpb24uYXR0cignZGF0YS1wb2xsLW9wdGlvbi1pZCcpO1xuICAgICAgICBtb3N0Vm90ZXMgPSAocmVzLnZvdGVfY291bnRzW29wdGlvbklkXSA+PSBtb3N0Vm90ZXMpID8gcmVzLnZvdGVfY291bnRzW29wdGlvbklkXSA6IG1vc3RWb3RlcztcbiAgICAgIH0pO1xuXG5cdFx0Ly8gVXBkYXRlIHRoZSB0b3RhbCB2b3RlcyBjb3VudFxuICAgICAgcG9sbC5maW5kKCcucG9sbF90b3RhbF92b3RlX2NudCcpLmh0bWwocmVzLnRvdGFsX3ZvdGVzKTtcblxuXHRcdC8vIFVwZGF0ZSBlYWNoIG9wdGlvblxuICAgICAgcG9sbC5maW5kKCdbZGF0YS1wb2xsLW9wdGlvbi1pZF0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIG9wdGlvbklkID0gJHRoaXMuYXR0cignZGF0YS1wb2xsLW9wdGlvbi1pZCcpO1xuICAgICAgICB2YXIgdm90ZWQgPSAodHlwZW9mIHJlcy51c2VyX3ZvdGVzW29wdGlvbklkXSAhPT0gJ3VuZGVmaW5lZCcpO1xuICAgICAgICB2YXIgbW9zdFZvdGVkID0gKHJlcy52b3RlX2NvdW50c1tvcHRpb25JZF0gPT09IG1vc3RWb3Rlcyk7XG4gICAgICAgIHZhciBwZXJjZW50ID0gKCFyZXMudG90YWxfdm90ZXMpID8gMCA6IE1hdGgucm91bmQoKHJlcy52b3RlX2NvdW50c1tvcHRpb25JZF0gLyByZXMudG90YWxfdm90ZXMpICogMTAwKTtcbiAgICAgICAgdmFyIHBlcmNlbnRSZWwgPSAobW9zdFZvdGVzID09PSAwKSA/IDAgOiBNYXRoLnJvdW5kKChyZXMudm90ZV9jb3VudHNbb3B0aW9uSWRdIC8gbW9zdFZvdGVzKSAqIDEwMCk7XG4gICAgICAgIHZhciBhbHRUZXh0O1xuXG4gICAgICAgIGFsdFRleHQgPSAkdGhpcy5hdHRyKCdkYXRhLWFsdC10ZXh0Jyk7XG4gICAgICAgIGlmICh2b3RlZCkge1xuICAgICAgICAgICR0aGlzLmF0dHIoJ3RpdGxlJywgJC50cmltKGFsdFRleHQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkdGhpcy5hdHRyKCd0aXRsZScsICcnKTtcbiAgICAgICAgfVxuICAgICAgICAkdGhpcy50b2dnbGVDbGFzcygndm90ZWQnLCB2b3RlZCk7XG4gICAgICAgICR0aGlzLnRvZ2dsZUNsYXNzKCdtb3N0LXZvdGVzJywgbW9zdFZvdGVkKTtcblxuXHRcdFx0Ly8gVXBkYXRlIHRoZSBiYXJzXG4gICAgICAgIHZhciBiYXIgPSAkdGhpcy5maW5kKCcucmVzdWx0YmFyIGRpdicpO1xuICAgICAgICB2YXIgYmFyVGltZUxhcHNlID0gKHJlcy5jYW5fdm90ZSkgPyA1MDAgOiAxNTAwO1xuICAgICAgICB2YXIgbmV3QmFyQ2xhc3MgPSAocGVyY2VudCA9PT0gMTAwKSA/ICdwb2xsYmFyNScgOiAncG9sbGJhcicgKyAoTWF0aC5mbG9vcihwZXJjZW50IC8gMjApICsgMSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYmFyLmFuaW1hdGUoeyB3aWR0aDogcGVyY2VudFJlbCArICclJyB9LCA1MDApXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdwb2xsYmFyMSBwb2xsYmFyMiBwb2xsYmFyMyBwb2xsYmFyNCBwb2xsYmFyNScpXG5cdFx0XHRcdFx0LmFkZENsYXNzKG5ld0JhckNsYXNzKVxuXHRcdFx0XHRcdC5odG1sKHJlcy52b3RlX2NvdW50c1tvcHRpb25JZF0pO1xuXG4gICAgICAgICAgdmFyIHBlcmNlbnRUZXh0ID0gcGVyY2VudCA/IHBlcmNlbnQgKyAnJScgOiByZXMuTk9fVk9URVM7XG4gICAgICAgICAgJHRoaXMuZmluZCgnLnBvbGxfb3B0aW9uX3BlcmNlbnQnKS5odG1sKHBlcmNlbnRUZXh0KTtcbiAgICAgICAgfSwgYmFyVGltZUxhcHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlcy5jYW5fdm90ZSkge1xuICAgICAgICBwb2xsLmZpbmQoJy5wb2xscycpLmRlbGF5KDQwMCkuZmFkZUluKDUwMCk7XG4gICAgICB9XG4gICAgICB2YXIgcmVzaXplUGFuZWwgPSBmdW5jdGlvbiAodGltZSkge1xuICAgICAgICB2YXIgcGFuZWxIZWlnaHQgPSBwYW5lbC5oZWlnaHQoKTtcbiAgICAgICAgdmFyIGlubmVySGVpZ2h0ID0gcGFuZWwuZmluZCgnLmlubmVyJykub3V0ZXJIZWlnaHQoKTtcblxuICAgICAgICBpZiAocGFuZWxIZWlnaHQgIT09IGlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgcGFuZWwuY3NzKHsgbWluSGVpZ2h0OiAnJywgaGVpZ2h0OiBwYW5lbEhlaWdodCB9KVxuXHRcdFx0XHRcdC5hbmltYXRlKHsgaGVpZ2h0OiBpbm5lckhlaWdodCB9LCB0aW1lLFxuICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcGFuZWwuY3NzKHsgbWluSGVpZ2h0OiBpbm5lckhlaWdodCwgaGVpZ2h0OiAnJyB9KSB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuXHRcdC8vIERpc3BsYXkgXCJZb3VyIHZvdGUgaGFzIGJlZW4gY2FzdC5cIiBtZXNzYWdlLiBEaXNhcHBlYXJzIGFmdGVyIDUgc2Vjb25kcy5cbiAgICAgIHZhciBjb25maXJtYXRpb25EZWxheSA9IChyZXMuY2FuX3ZvdGUpID8gMzAwIDogOTAwO1xuICAgICAgcG9sbC5maW5kKCcudm90ZS1zdWJtaXR0ZWQnKS5kZWxheShjb25maXJtYXRpb25EZWxheSkuc2xpZGVEb3duKDIwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAocmVzdWx0c1Zpc2libGUpIHtcbiAgICAgICAgICB1cGRhdGVQYW5lbEhlaWdodCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCh0aGlzKS5kZWxheSg1MDAwKS5mYWRlT3V0KDUwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJlc2l6ZVBhbmVsKDMwMCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cblx0XHQvLyBSZW1vdmUgdGhlIGdhcCByZXN1bHRpbmcgZnJvbSByZW1vdmluZyBvcHRpb25zXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzaXplUGFuZWwoNTAwKTtcbiAgICAgIH0sIDE1MDApO1xuICAgIH1cbiAgfSk7XG5cbi8qKlxuICogU2hvdyBwb2xsIHJlc3VsdHMgd2hlbiBjbGlja2luZyBWaWV3IHJlc3VsdHMgbGluay5cbiAqL1xuICAkKCcucG9sbF92aWV3X3Jlc3VsdHMgYScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG5cdC8vIERvIG5vdCBmb2xsb3cgdGhlIGxpbmtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgJHBvbGwgPSAkKHRoaXMpLnBhcmVudHMoJy50b3BpY19wb2xsJyk7XG5cbiAgICAkcG9sbC5maW5kKCcucmVzdWx0YmFyLCAucG9sbF9vcHRpb25fcGVyY2VudCwgLnBvbGxfdG90YWxfdm90ZXMnKS5zaG93KDUwMCk7XG4gICAgJHBvbGwuZmluZCgnLnBvbGxfdmlld19yZXN1bHRzJykuaGlkZSg1MDApO1xuICB9KTtcblxuICAkKCdbZGF0YS1hamF4XScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgdmFyIGFqYXggPSAkdGhpcy5hdHRyKCdkYXRhLWFqYXgnKTtcbiAgICB2YXIgZmlsdGVyID0gJHRoaXMuYXR0cignZGF0YS1maWx0ZXInKTtcblxuICAgIGlmIChhamF4ICE9PSAnZmFsc2UnKSB7XG4gICAgICB2YXIgZm4gPSAoYWpheCAhPT0gJ3RydWUnKSA/IGFqYXggOiBudWxsO1xuICAgICAgZmlsdGVyID0gKGZpbHRlciAhPT0gdW5kZWZpbmVkKSA/IHBocGJiLmdldEZ1bmN0aW9uQnlOYW1lKGZpbHRlcikgOiBudWxsO1xuXG4gICAgICBwaHBiYi5hamF4aWZ5KHtcbiAgICAgICAgc2VsZWN0b3I6IHRoaXMsXG4gICAgICAgIHJlZnJlc2g6ICR0aGlzLmF0dHIoJ2RhdGEtcmVmcmVzaCcpICE9PSB1bmRlZmluZWQsXG4gICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICBjYWxsYmFjazogZm5cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cblxuLyoqXG4gKiBUaGlzIHNpbXBseSBhcHBlbmRzICNwcmV2aWV3IHRvIHRoZSBhY3Rpb24gb2YgdGhlXG4gKiBRUiBhY3Rpb24gd2hlbiB5b3UgY2xpY2sgdGhlIEZ1bGwgRWRpdG9yICYgUHJldmlldyBidXR0b25cbiAqL1xuICAkKCcjcXJfZnVsbF9lZGl0b3InKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJCgnI3FyX3Bvc3Rmb3JtJykuYXR0cignYWN0aW9uJywgZnVuY3Rpb24gKGksIHZhbCkge1xuICAgICAgcmV0dXJuIHZhbCArICcjcHJldmlldyc7XG4gICAgfSk7XG4gIH0pO1xuXG5cbi8qKlxuICogTWFrZSB0aGUgZGlzcGxheSBwb3N0IGxpbmtzIHRvIHVzZSBKU1xuICovXG4gICQoJy5kaXNwbGF5X3Bvc3QnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuXHQvLyBEbyBub3QgZm9sbG93IHRoZSBsaW5rXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIHBvc3RJZCA9ICQodGhpcykuYXR0cignZGF0YS1wb3N0LWlkJyk7XG4gICAgJCgnI3Bvc3RfY29udGVudCcgKyBwb3N0SWQpLnNob3coKTtcbiAgICAkKCcjcHJvZmlsZScgKyBwb3N0SWQpLnNob3coKTtcbiAgICAkKCcjcG9zdF9oaWRkZW4nICsgcG9zdElkKS5oaWRlKCk7XG4gIH0pO1xuXG4vKipcbiogVG9nZ2xlIHRoZSBtZW1iZXIgc2VhcmNoIHBhbmVsIGluIG1lbWJlcmxpc3QucGhwLlxuKlxuKiBJZiB1c2VyIHJldHVybnMgdG8gc2VhcmNoIHBhZ2UgYWZ0ZXIgdmlld2luZyByZXN1bHRzIHRoZSBzZWFyY2ggcGFuZWwgaXMgYXV0b21hdGljYWxseSBkaXNwbGF5ZWQuXG4qIEluIGFueSBjYXNlIHRoZSBsaW5rIHdpbGwgdG9nZ2xlIHRoZSBkaXNwbGF5IHN0YXR1cyBvZiB0aGUgc2VhcmNoIHBhbmVsIGFuZCBsaW5rIHRleHQgd2lsbCBiZVxuKiBhcHByb3ByaWF0ZWx5IGNoYW5nZWQgYmFzZWQgb24gdGhlIHN0YXR1cyBvZiB0aGUgc2VhcmNoIHBhbmVsLlxuKi9cbiAgJCgnI21lbWJlcl9zZWFyY2gnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRtZW1iZXJsaXN0U2VhcmNoID0gJCgnI21lbWJlcmxpc3Rfc2VhcmNoJyk7XG5cbiAgICAkbWVtYmVybGlzdFNlYXJjaC5zbGlkZVRvZ2dsZSgnZmFzdCcpO1xuICAgIHBocGJiLmFqYXhDYWxsYmFja3MuYWx0X3RleHQuY2FsbCh0aGlzKTtcblxuXHQvLyBGb2N1cyBvbiB0aGUgdXNlcm5hbWUgdGV4dGJveCBpZiBpdCdzIGF2YWlsYWJsZSBhbmQgZGlzcGxheWVkXG4gICAgaWYgKCRtZW1iZXJsaXN0U2VhcmNoLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAkKCcjdXNlcm5hbWUnKS5mb2N1cygpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuXG4vKipcbiogQXV0b21hdGljYWxseSByZXNpemUgdGV4dGFyZWFcbiovXG4gICQoZnVuY3Rpb24gKCkge1xuICAgIHZhciAkdGV4dGFyZWEgPSAkKCd0ZXh0YXJlYTpub3QoI21lc3NhZ2UtYm94IHRleHRhcmVhLCAubm8tYXV0by1yZXNpemUpJyk7XG4gICAgcGhwYmIucmVzaXplVGV4dEFyZWEoJHRleHRhcmVhLCB7IG1pbkhlaWdodDogNzUsIG1heEhlaWdodDogMjUwIH0pO1xuICAgIHBocGJiLnJlc2l6ZVRleHRBcmVhKCQoJ3RleHRhcmVhJywgJyNtZXNzYWdlLWJveCcpKTtcbiAgfSk7XG59KShqUXVlcnkpOyAvLyBBdm9pZCBjb25mbGljdHMgd2l0aCBvdGhlciBsaWJyYXJpZXNcbiJdfQ==
