!function(t){"use strict";phpbb.addAjaxCallback("mark_forums_read",function(a){var e=a.NO_UNREAD_POSTS,i=a.UNREAD_POSTS,o={forum_unread:"forum_read",forum_unread_subforum:"forum_read_subforum",forum_unread_locked:"forum_read_locked"};t("li.row").find('dl[class*="forum_unread"]').each(function(){t.each(o,function(a,e){t(this).hasClass(a)&&t(this).removeClass(a).addClass(e)}),t(this).children('dt[title="'+i+'"]').attr("title",e)}),t('a.subforum[class*="unread"]').removeClass("unread").addClass("read"),t("#active_topics").length&&phpbb.ajaxCallbacks.mark_topics_read.call(this,a,!1),t('[data-ajax="mark_forums_read"]').attr("href",a.U_MARK_FORUMS),phpbb.closeDarkenWrapper(3e3)}),phpbb.addAjaxCallback("mark_topics_read",function(a,e){var i,o=a.NO_UNREAD_POSTS,n=a.UNREAD_POSTS,s={global_unread:"global_read",announce_unread:"announce_read",sticky_unread:"sticky_read",topic_unread:"topic_read"},r=["","_hot","_hot_mine","_locked","_locked_mine","_mine"],l={},d=[];t.each(s,function(a,e){t.each(r,function(t,i){return("_hot"===i||"_hot_mine"===i)&&"topic_unread"!==a||(l[a+i]=e+i,d.push(a+i),!1)})}),i="."+d.join(",."),t("li.row").find(i).each(function(){t.each(l,function(a,e){t(this).hasClass(a)&&t(this).removeClass(a).addClass(e)}),t(this).children('dt[title="'+n+'"]').attr("title",o)}),t("a").has("span.icon_topic_newest").remove(),(void 0===e||e)&&t('[data-ajax="mark_topics_read"]').attr("href",a.U_MARK_TOPICS),phpbb.closeDarkenWrapper(3e3)}),phpbb.addAjaxCallback("notification.mark_all_read",function(a){void 0!==a.success&&(phpbb.markNotifications(t("#notification_list li.notification-unseen"),0),phpbb.closeDarkenWrapper(3e3))}),phpbb.addAjaxCallback("notification.mark_read",function(a){if(void 0!==a.success){var e=Number(t(".notifications.tab").data("badge"))-1;phpbb.markNotifications(t(this).parent("li.notification-unseen"),e)}}),phpbb.markNotifications=function(a,e){a.removeClass("notification-unseen"),a.find("a.mark_read").remove(),a.each(function(){var a=t(this).find("a");a.attr("href",a.attr("data-real-url"))}),t(".notifications.tab").attr("data-badge",e).toggleClass("non-zero mdl-badge mdl-badge--small",e>0),e||t(".mark_all_read").remove();var i=t("title"),o=i.text().replace(/(\((\d+)\))/,"");i.text((e?"("+e+")":"")+o)},phpbb.addAjaxCallback("post_delete",function(){var a;if(!t(this).attr("data-refresh")){a=t(this)[0].href.split("&p=")[1];var e=t(this).parents("#p"+a).css("pointer-events","none");if(e.hasClass("bg1")||e.hasClass("bg2")){var i=e.nextAll(".bg1");e.nextAll(".bg2").removeClass("bg2").addClass("bg1"),i.removeClass("bg1").addClass("bg2")}e.fadeOut(function(){t(this).remove()})}}),phpbb.addAjaxCallback("post_visibility",function(a){var e=a.visible?t(this):t(this).parents(".post");t(e).css("pointer-events","none").fadeOut(function(){t(this).remove()}),a.visible&&e.parents(".post").find(".post_deleted_msg").css("pointer-events","none").fadeOut(function(){t(this).remove()})}),phpbb.addAjaxCallback("row_delete",function(){t(this).parents("tr").remove()}),phpbb.addAjaxCallback("zebra",function(a){var e;a.success&&(e=t(".zebra"),e.first().html(a.MESSAGE_TEXT),e.not(":first").html("&nbsp;").prev().html("&nbsp;"))}),phpbb.addAjaxCallback("vote_poll",function(a){if(void 0!==a.success){var e=t(".topic_poll"),i=e.find(".panel"),o=e.find("dl:first-child .resultbar").is(":visible"),n=0,s=function(t){i.css("min-height",t||i.find(".inner").outerHeight())};s(),o||e.find(".poll_view_results").hide(500),a.can_vote?e.find(".resultbar, .poll_option_percent, .poll_total_votes").show(500):e.find(".polls, .poll_max_votes, .poll_vote, .poll_option_select").fadeOut(500,function(){e.find(".resultbar, .poll_option_percent, .poll_total_votes").show()}),e.find("[data-poll-option-id]").each(function(){var e=t(this),i=e.attr("data-poll-option-id");n=a.vote_counts[i]>=n?a.vote_counts[i]:n}),e.find(".poll_total_vote_cnt").html(a.total_votes),e.find("[data-poll-option-id]").each(function(){var e,i=t(this).attr("data-poll-option-id"),o=void 0!==a.user_votes[i],s=a.vote_counts[i]===n,r=a.total_votes?Math.round(a.vote_counts[i]/a.total_votes*100):0,l=0===n?0:Math.round(a.vote_counts[i]/n*100);e=t(this).attr("data-alt-text"),o?t(this).attr("title",t.trim(e)):t(this).attr("title",""),t(this).toggleClass("voted",o),t(this).toggleClass("most-votes",s);var d=t(this).find(".resultbar div"),c=a.can_vote?500:1500,p=100===r?"pollbar5":"pollbar"+(Math.floor(r/20)+1);setTimeout(function(){d.animate({width:l+"%"},500).removeClass("pollbar1 pollbar2 pollbar3 pollbar4 pollbar5").addClass(p).html(a.vote_counts[i]);var e=r?r+"%":a.NO_VOTES;t(this).find(".poll_option_percent").html(e)},c)}),a.can_vote||e.find(".polls").delay(400).fadeIn(500);var r=function(t){var a=i.height(),e=i.find(".inner").outerHeight();a!==e&&i.css({minHeight:"",height:a}).animate({height:e},t,function(){i.css({minHeight:e,height:""})})},l=a.can_vote?300:900;e.find(".vote-submitted").delay(l).slideDown(200,function(){o&&s(),t(this).delay(5e3).fadeOut(500,function(){r(300)})}),setTimeout(function(){r(500)},1500)}}),t(".poll_view_results a").click(function(a){a.preventDefault();var e=t(this).parents(".topic_poll");e.find(".resultbar, .poll_option_percent, .poll_total_votes").show(500),e.find(".poll_view_results").hide(500)}),t("[data-ajax]").each(function(){var a=t(this).attr("data-ajax");if("false"!==a){var e=t(this).attr("data-filter");e&&(e=phpbb.getFunctionByName(e));var i="true"!==a?a:null;phpbb.ajaxify({selector:this,refresh:!!t(this).attr("data-refresh"),filter:e,callback:i})}}),t("#qr_full_editor").click(function(){t("#qr_postform").attr("action",function(t,a){return a+"#preview"})}),t(".display_post").click(function(a){a.preventDefault();var e=t(this).attr("data-post-id");t("#post_content"+e).show(),t("#profile"+e).show(),t("#post_hidden"+e).hide()}),t("#member_search").click(function(){var a=t("#memberlist_search");return a.slideToggle("fast"),phpbb.ajaxCallbacks.alt_text.call(this),a.is(":visible")&&t("#username").focus(),!1}),t(function(){var a=t("textarea:not(#message-box textarea, .no-auto-resize)");phpbb.resizeTextArea(a,{minHeight:75,maxHeight:250}),phpbb.resizeTextArea(t("textarea","#message-box"))})}(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiJCIsInBocGJiIiwiYWRkQWpheENhbGxiYWNrIiwicmVzIiwicmVhZFRpdGxlIiwiTk9fVU5SRUFEX1BPU1RTIiwidW5yZWFkVGl0bGUiLCJVTlJFQURfUE9TVFMiLCJpY29uc0FycmF5IiwiZm9ydW1fdW5yZWFkIiwiZm9ydW1fdW5yZWFkX3N1YmZvcnVtIiwiZm9ydW1fdW5yZWFkX2xvY2tlZCIsImZpbmQiLCJlYWNoIiwidW5yZWFkQ2xhc3MiLCJyZWFkQ2xhc3MiLCJ0aGlzIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY2hpbGRyZW4iLCJhdHRyIiwibGVuZ3RoIiwiYWpheENhbGxiYWNrcyIsIm1hcmtfdG9waWNzX3JlYWQiLCJjYWxsIiwiVV9NQVJLX0ZPUlVNUyIsImNsb3NlRGFya2VuV3JhcHBlciIsInVwZGF0ZVRvcGljTGlua3MiLCJ1bnJlYWRDbGFzc1NlbGVjdG9ycyIsImdsb2JhbF91bnJlYWQiLCJhbm5vdW5jZV91bnJlYWQiLCJzdGlja3lfdW5yZWFkIiwidG9waWNfdW5yZWFkIiwiaWNvbnNTdGF0ZSIsImNsYXNzTWFwIiwiY2xhc3NOYW1lcyIsImtleSIsInZhbHVlIiwicHVzaCIsImpvaW4iLCJoYXMiLCJyZW1vdmUiLCJVX01BUktfVE9QSUNTIiwic3VjY2VzcyIsIm1hcmtOb3RpZmljYXRpb25zIiwidW5yZWFkQ291bnQiLCJOdW1iZXIiLCJkYXRhIiwicGFyZW50IiwiJHBvcHVwIiwibGluayIsInRvZ2dsZUNsYXNzIiwiJHRpdGxlIiwib3JpZ2luYWxUaXRsZSIsInRleHQiLCJyZXBsYWNlIiwicG9zdElkIiwiaHJlZiIsInNwbGl0IiwicG9zdCIsInBhcmVudHMiLCJjc3MiLCJwb3N0czEiLCJuZXh0QWxsIiwiZmFkZU91dCIsInZpc2libGUiLCJ6ZWJyYSIsImZpcnN0IiwiaHRtbCIsIk1FU1NBR0VfVEVYVCIsIm5vdCIsInByZXYiLCJwb2xsIiwicGFuZWwiLCJyZXN1bHRzVmlzaWJsZSIsImlzIiwibW9zdFZvdGVzIiwidXBkYXRlUGFuZWxIZWlnaHQiLCJoZWlnaHQiLCJvdXRlckhlaWdodCIsImhpZGUiLCJjYW5fdm90ZSIsInNob3ciLCJvcHRpb24iLCJvcHRpb25JZCIsInZvdGVfY291bnRzIiwidG90YWxfdm90ZXMiLCJhbHRUZXh0Iiwidm90ZWQiLCJ1c2VyX3ZvdGVzIiwibW9zdFZvdGVkIiwicGVyY2VudCIsIk1hdGgiLCJyb3VuZCIsInBlcmNlbnRSZWwiLCJ0cmltIiwiYmFyIiwiYmFyVGltZUxhcHNlIiwibmV3QmFyQ2xhc3MiLCJmbG9vciIsInNldFRpbWVvdXQiLCJhbmltYXRlIiwid2lkdGgiLCJwZXJjZW50VGV4dCIsIk5PX1ZPVEVTIiwiZGVsYXkiLCJmYWRlSW4iLCJyZXNpemVQYW5lbCIsInRpbWUiLCJwYW5lbEhlaWdodCIsImlubmVySGVpZ2h0IiwibWluSGVpZ2h0IiwiY29uZmlybWF0aW9uRGVsYXkiLCJzbGlkZURvd24iLCJjbGljayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIiRwb2xsIiwiYWpheCIsImZpbHRlciIsImdldEZ1bmN0aW9uQnlOYW1lIiwiZm4iLCJhamF4aWZ5Iiwic2VsZWN0b3IiLCJyZWZyZXNoIiwiY2FsbGJhY2siLCJpIiwidmFsIiwiJG1lbWJlcmxpc3RTZWFyY2giLCJzbGlkZVRvZ2dsZSIsImFsdF90ZXh0IiwiZm9jdXMiLCIkdGV4dGFyZWEiLCJyZXNpemVUZXh0QXJlYSIsIm1heEhlaWdodCIsImpRdWVyeSJdLCJtYXBwaW5ncyI6IkNBRUEsU0FBV0EsR0FDVCxZQUdBQyxPQUFNQyxnQkFBZ0IsbUJBQW9CLFNBQVVDLEdBQ2xELEdBQUlDLEdBQVlELEVBQUlFLGdCQUNoQkMsRUFBY0gsRUFBSUksYUFDbEJDLEdBQ0ZDLGFBQWMsYUFDZEMsc0JBQXVCLHNCQUN2QkMsb0JBQXFCLG9CQUd2QlgsR0FBRSxVQUFVWSxLQUFLLDZCQUE2QkMsS0FBSyxXQUNqRGIsRUFBRWEsS0FBS0wsRUFBWSxTQUFVTSxFQUFh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YSxLQUFLLFdBQ3BCLEdBQUkwRyxHQUFPdkgsRUFBRWdCLE1BQU1LLEtBQUssWUFDeEIsSUFBYSxVQUFUa0csRUFBa0IsQ0FDcEIsR0FBSUMsR0FBU3hILEVBQUVnQixNQUFNSyxLQUFLLGNBQ3RCbUcsS0FDRkEsRUFBU3ZILE1BQU13SCxrQkFBa0JELEdBR25DLElBQUlFLEdBQWUsU0FBVEgsRUFBbUJBLEVBQU8sSUFDcEN0SCxPQUFNMEgsU0FDSkMsU0FBVTVHLEtBQ1Y2RyxVQUFTN0gsRUFBRWdCLE1BQU1LLEtBQUssZ0JBQ3RCbUcsT0FBUUEsRUFDUk0sU0FBVUosT0FVaEIxSCxFQUFFLG1CQUFtQm1ILE1BQU0sV0FDekJuSCxFQUFFLGdCQUFnQnFCLEtBQUssU0FBVSxTQUFVMEcsRUFBR0MsR0FDNUMsTUFBT0EsR0FBTSxlQVFqQmhJLEVBQUUsaUJBQWlCbUgsTUFBTSxTQUFVQyxHQUVqQ0EsRUFBRUMsZ0JBRUYsSUFBSTVELEdBQVN6RCxFQUFFZ0IsTUFBTUssS0FBSyxlQUMxQnJCLEdBQUUsZ0JBQWtCeUQsR0FBUTBCLE9BQzVCbkYsRUFBRSxXQUFheUQsR0FBUTBCLE9BQ3ZCbkYsRUFBRSxlQUFpQnlELEdBQVF3QixTQVU3QmpGLEVBQUUsa0JBQWtCbUgsTUFBTSxXQUN4QixHQUFJYyxHQUFvQmpJLEVBQUUscUJBUzFCLE9BUEFpSSxHQUFrQkMsWUFBWSxRQUM5QmpJLE1BQU1zQixjQUFjNEcsU0FBUzFHLEtBQUtULE1BRzlCaUgsRUFBa0JyRCxHQUFHLGFBQ3ZCNUUsRUFBRSxhQUFhb0ksU0FFVixJQU1UcEksRUFBRSxXQUNBLEdBQUlxSSxHQUFZckksRUFBRSx1REFDbEJDLE9BQU1xSSxlQUFlRCxHQUNuQnJCLFVBQVcsR0FDWHVCLFVBQVcsTUFFYnRJLE1BQU1xSSxlQUFldEksRUFBRSxXQUFZLG9CQUVwQ3dJIiwiZmlsZSI6ImFqYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgcGhwYmIgKi9cblxuKGZ1bmN0aW9uICgkKSB7IC8vIEF2b2lkIGNvbmZsaWN0cyB3aXRoIG90aGVyIGxpYnJhcmllc1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gVGhpcyBjYWxsYmFjayB3aWxsIG1hcmsgYWxsIGZvcnVtIGljb25zIHJlYWRcbiAgcGhwYmIuYWRkQWpheENhbGxiYWNrKCdtYXJrX2ZvcnVtc19yZWFkJywgZnVuY3Rpb24gKHJlcykge1xuICAgIHZhciByZWFkVGl0bGUgPSByZXMuTk9fVU5SRUFEX1BPU1RTO1xuICAgIHZhciB1bnJlYWRUaXRsZSA9IHJlcy5VTlJFQURfUE9TVFM7XG4gICAgdmFyIGljb25zQXJyYXkgPSB7XG4gICAgICBmb3J1bV91bnJlYWQ6ICdmb3J1bV9yZWFkJyxcbiAgICAgIGZvcnVtX3VucmVhZF9zdWJmb3J1bTogJ2ZvcnVtX3JlYWRfc3ViZm9ydW0nLFxuICAgICAgZm9ydW1fdW5yZWFkX2xvY2tlZDogJ2ZvcnVtX3JlYWRfbG9ja2VkJ1xuICAgIH07XG5cbiAgICAkKCdsaS5yb3cnKS5maW5kKCdkbFtjbGFzcyo9XCJmb3J1bV91bnJlYWRcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICQuZWFjaChpY29uc0FycmF5LCBmdW5jdGlvbiAodW5yZWFkQ2xhc3MsIHJlYWRDbGFzcykge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyh1bnJlYWRDbGFzcykpIHtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKHVucmVhZENsYXNzKS5hZGRDbGFzcyhyZWFkQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgICQodGhpcykuY2hpbGRyZW4oJ2R0W3RpdGxlPVwiJyArIHVucmVhZFRpdGxlICsgJ1wiXScpLmF0dHIoJ3RpdGxlJywgcmVhZFRpdGxlKTtcbiAgICB9KTtcblxuICAgIC8vIE1hcmsgc3ViZm9ydW1zIHJlYWRcbiAgICAkKCdhLnN1YmZvcnVtW2NsYXNzKj1cInVucmVhZFwiXScpLnJlbW92ZUNsYXNzKCd1bnJlYWQnKS5hZGRDbGFzcygncmVhZCcpO1xuXG4gICAgLy8gTWFyayB0b3BpY3MgcmVhZCBpZiB3ZSBhcmUgd2F0Y2hpbmcgYSBjYXRlZ29yeSBhbmQgc2hvd2luZyBhY3RpdmUgdG9waWNzXG4gICAgaWYgKCQoJyNhY3RpdmVfdG9waWNzJykubGVuZ3RoKSB7XG4gICAgICBwaHBiYi5hamF4Q2FsbGJhY2tzLm1hcmtfdG9waWNzX3JlYWQuY2FsbCh0aGlzLCByZXMsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgbWFyayBmb3J1bXMgcmVhZCBsaW5rc1xuICAgICQoJ1tkYXRhLWFqYXg9XCJtYXJrX2ZvcnVtc19yZWFkXCJdJykuYXR0cignaHJlZicsIHJlcy5VX01BUktfRk9SVU1TKTtcblxuICAgIHBocGJiLmNsb3NlRGFya2VuV3JhcHBlcigzMDAwKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFRoaXMgY2FsbGJhY2sgd2lsbCBtYXJrIGFsbCB0b3BpYyBpY29ucyByZWFkXG4gICAqIEBwYXJhbSB7Ym9vbH0gW3VwZGF0ZV90b3BpY19saW5rcz10cnVlXVxuICAgKiBXaGV0aGVyIFwiTWFyayB0b3BpY3MgcmVhZFwiIGxpbmtzIHNob3VsZCBiZSB1cGRhdGVkLiBEZWZhdWx0cyB0byB0cnVlLlxuICAgKi9cbiAgcGhwYmIuYWRkQWpheENhbGxiYWNrKCdtYXJrX3RvcGljc19yZWFkJywgZnVuY3Rpb24gKHJlcywgdXBkYXRlVG9waWNMaW5rcykge1xuICAgIHZhciByZWFkVGl0bGUgPSByZXMuTk9fVU5SRUFEX1BPU1RTO1xuICAgIHZhciB1bnJlYWRUaXRsZSA9IHJlcy5VTlJFQURfUE9TVFM7XG4gICAgdmFyIGljb25zQXJyYXkgPSB7XG4gICAgICBnbG9iYWxfdW5yZWFkOiAnZ2xvYmFsX3JlYWQnLFxuICAgICAgYW5ub3VuY2VfdW5yZWFkOiAnYW5ub3VuY2VfcmVhZCcsXG4gICAgICBzdGlja3lfdW5yZWFkOiAnc3RpY2t5X3JlYWQnLFxuICAgICAgdG9waWNfdW5yZWFkOiAndG9waWNfcmVhZCdcbiAgICB9O1xuICAgIHZhciBpY29uc1N0YXRlID0gWycnLCAnX2hvdCcsICdfaG90X21pbmUnLCAnX2xvY2tlZCcsICdfbG9ja2VkX21pbmUnLCAnX21pbmUnXTtcbiAgICB2YXIgdW5yZWFkQ2xhc3NTZWxlY3RvcnM7XG4gICAgdmFyIGNsYXNzTWFwID0ge307XG4gICAgdmFyIGNsYXNzTmFtZXMgPSBbXTtcbiAgICAkLmVhY2goaWNvbnNBcnJheSwgZnVuY3Rpb24gKHVucmVhZENsYXNzLCByZWFkQ2xhc3MpIHtcbiAgICAgICQuZWFjaChpY29uc1N0YXRlLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAvLyBPbmx5IHRvcGljcyBjYW4gYmUgaG90XG4gICAgICAgIGlmICgodmFsdWUgPT09ICdfaG90JyB8fCB2YWx1ZSA9PT0gJ19ob3RfbWluZScpICYmIHVucmVhZENsYXNzICE9PSAndG9waWNfdW5yZWFkJykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNsYXNzTWFwW3VucmVhZENsYXNzICsgdmFsdWVdID0gcmVhZENsYXNzICsgdmFsdWU7XG4gICAgICAgIGNsYXNzTmFtZXMucHVzaCh1bnJlYWRDbGFzcyArIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB1bnJlYWRDbGFzc1NlbGVjdG9ycyA9ICcuJyArIGNsYXNzTmFtZXMuam9pbignLC4nKTtcblxuICAgICQoJ2xpLnJvdycpLmZpbmQodW5yZWFkQ2xhc3NTZWxlY3RvcnMpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgJC5lYWNoKGNsYXNzTWFwLCBmdW5jdGlvbiAodW5yZWFkQ2xhc3MsIHJlYWRDbGFzcykge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyh1bnJlYWRDbGFzcykpIHtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKHVucmVhZENsYXNzKS5hZGRDbGFzcyhyZWFkQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgICQodGhpcykuY2hpbGRyZW4oJ2R0W3RpdGxlPVwiJyArIHVucmVhZFRpdGxlICsgJ1wiXScpLmF0dHIoJ3RpdGxlJywgcmVhZFRpdGxlKTtcbiAgICB9KTtcblxuICAgIC8vIFJlbW92ZSBsaW5rIHRvIGZpcnN0IHVucmVhZCBwb3N0XG4gICAgJCgnYScpLmhhcygnc3Bhbi5pY29uX3RvcGljX25ld2VzdCcpLnJlbW92ZSgpO1xuXG4gICAgLy8gVXBkYXRlIG1hcmsgdG9waWNzIHJlYWQgbGlua3NcbiAgICBpZiAodHlwZW9mIHVwZGF0ZVRvcGljTGlua3MgPT09ICd1bmRlZmluZWQnIHx8IHVwZGF0ZVRvcGljTGlua3MpIHtcbiAgICAgICQoJ1tkYXRhLWFqYXg9XCJtYXJrX3RvcGljc19yZWFkXCJdJykuYXR0cignaHJlZicsIHJlcy5VX01BUktfVE9QSUNTKTtcbiAgICB9XG5cbiAgICBwaHBiYi5jbG9zZURhcmtlbldyYXBwZXIoMzAwMCk7XG4gIH0pO1xuXG4gIC8vIFRoaXMgY2FsbGJhY2sgd2lsbCBtYXJrIGFsbCBub3RpZmljYXRpb25zIHJlYWRcbiAgcGhwYmIuYWRkQWpheENhbGxiYWNrKCdub3RpZmljYXRpb24ubWFya19hbGxfcmVhZCcsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICBpZiAodHlwZW9mIHJlcy5zdWNjZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcGhwYmIubWFya05vdGlmaWNhdGlvbnMoJCgnI25vdGlmaWNhdGlvbl9saXN0IGxpLm5vdGlmaWNhdGlvbi11bnNlZW4nKSwgMCk7XG4gICAgICBwaHBiYi5jbG9zZURhcmtlbldyYXBwZXIoMzAwMCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBUaGlzIGNhbGxiYWNrIHdpbGwgbWFyayBhIG5vdGlmaWNhdGlvbiByZWFkXG4gIHBocGJiLmFkZEFqYXhDYWxsYmFjaygnbm90aWZpY2F0aW9uLm1hcmtfcmVhZCcsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICBpZiAodHlwZW9mIHJlcy5zdWNjZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIHVucmVhZENvdW50ID0gTnVtYmVyKCQoJy5ub3RpZmljYXRpb25zLnRhYicpLmRhdGEoJ2JhZGdlJykpIC0gMTtcbiAgICAgIHBocGJiLm1hcmtOb3RpZmljYXRpb25zKCQodGhpcykucGFyZW50KCdsaS5ub3RpZmljYXRpb24tdW5zZWVuJyksIHVucmVhZENvdW50KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBNYXJrIG5vdGlmaWNhdGlvbiBwb3B1cCByb3dzIGFzIHJlYWQuXG4gICAqXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkcG9wdXAgalF1ZXJ5IG9iamVjdChzKSB0byBtYXJrIHJlYWQuXG4gICAqIEBwYXJhbSB7aW50fSB1bnJlYWRDb3VudCBUaGUgbmV3IHVucmVhZCBub3RpZmljYXRpb25zIGNvdW50LlxuICAgKi9cbiAgcGhwYmIubWFya05vdGlmaWNhdGlvbnMgPSBmdW5jdGlvbiAoJHBvcHVwLCB1bnJlYWRDb3VudCkge1xuICAgIC8vIFJlbW92ZSB0aGUgdW5yZWFkIHN0YXR1cy5cbiAgICAkcG9wdXAucmVtb3ZlQ2xhc3MoJ25vdGlmaWNhdGlvbi11bnNlZW4nKTtcbiAgICAkcG9wdXAuZmluZCgnYS5tYXJrX3JlYWQnKS5yZW1vdmUoKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgbm90aWZpY2F0aW9uIGxpbmsgdG8gdGhlIHJlYWwgVVJMLlxuICAgICRwb3B1cC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBsaW5rID0gJCh0aGlzKS5maW5kKCdhJyk7XG4gICAgICBsaW5rLmF0dHIoJ2hyZWYnLCBsaW5rLmF0dHIoJ2RhdGEtcmVhbC11cmwnKSk7XG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHVucmVhZCBjb3VudC5cbiAgICAkKCcubm90aWZpY2F0aW9ucy50YWInKS5hdHRyKCdkYXRhLWJhZGdlJywgdW5yZWFkQ291bnQpLnRvZ2dsZUNsYXNzKCdub24temVybyBtZGwtYmFkZ2UgbWRsLWJhZGdlLS1zbWFsbCcsIHVucmVhZENvdW50ID4gMCk7XG5cbiAgICAvLyBSZW1vdmUgdGhlIE1hcmsgYWxsIHJlYWQgbGluayBpZiB0aGVyZSBhcmUgbm8gdW5yZWFkIG5vdGlmaWNhdGlvbnMuXG4gICAgaWYgKCF1bnJlYWRDb3VudCkge1xuICAgICAgJCgnLm1hcmtfYWxsX3JlYWQnKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgcGFnZSB0aXRsZVxuICAgIHZhciAkdGl0bGUgPSAkKCd0aXRsZScpO1xuICAgIHZhciBvcmlnaW5hbFRpdGxlID0gJHRpdGxlLnRleHQoKS5yZXBsYWNlKC8oXFwoKFxcZCspXFwpKS8sICcnKTtcbiAgICAkdGl0bGUudGV4dCgodW5yZWFkQ291bnQgPyAnKCcgKyB1bnJlYWRDb3VudCArICcpJyA6ICcnKSArIG9yaWdpbmFsVGl0bGUpO1xuICB9O1xuXG4gIC8vIFRoaXMgY2FsbGJhY2sgZmluZHMgdGhlIHBvc3QgZnJvbSB0aGUgZGVsZXRlIGxpbmssIGFuZCByZW1vdmVzIGl0LlxuICBwaHBiYi5hZGRBamF4Q2FsbGJhY2soJ3Bvc3RfZGVsZXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBwb3N0SWQ7XG5cbiAgICBpZiAoISQodGhpcykuYXR0cignZGF0YS1yZWZyZXNoJykpIHtcbiAgICAgIHBvc3RJZCA9ICQodGhpcylbMF0uaHJlZi5zcGxpdCgnJnA9JylbMV07XG4gICAgICB2YXIgcG9zdCA9ICQodGhpcykucGFyZW50cygnI3AnICsgcG9zdElkKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgIGlmIChwb3N0Lmhhc0NsYXNzKCdiZzEnKSB8fCBwb3N0Lmhhc0NsYXNzKCdiZzInKSkge1xuICAgICAgICB2YXIgcG9zdHMxID0gcG9zdC5uZXh0QWxsKCcuYmcxJyk7XG4gICAgICAgIHBvc3QubmV4dEFsbCgnLmJnMicpLnJlbW92ZUNsYXNzKCdiZzInKS5hZGRDbGFzcygnYmcxJyk7XG4gICAgICAgIHBvc3RzMS5yZW1vdmVDbGFzcygnYmcxJykuYWRkQ2xhc3MoJ2JnMicpO1xuICAgICAgfVxuICAgICAgcG9zdC5mYWRlT3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gVGhpcyBjYWxsYmFjayByZW1vdmVzIHRoZSBhcHByb3ZlIC8gZGlzYXBwcm92ZSBkaXYgb3IgbGluay5cbiAgcGhwYmIuYWRkQWpheENhbGxiYWNrKCdwb3N0X3Zpc2liaWxpdHknLCBmdW5jdGlvbiAocmVzKSB7XG4gICAgdmFyIHJlbW92ZSA9IChyZXMudmlzaWJsZSkgPyAkKHRoaXMpIDogJCh0aGlzKS5wYXJlbnRzKCcucG9zdCcpO1xuICAgICQocmVtb3ZlKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKS5mYWRlT3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICBpZiAocmVzLnZpc2libGUpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgXCJEZWxldGVkIGJ5XCIgbWVzc2FnZSBmcm9tIHRoZSBwb3N0IG9uIHJlc3RvcmluZy5cbiAgICAgIHJlbW92ZS5wYXJlbnRzKCcucG9zdCcpLmZpbmQoJy5wb3N0X2RlbGV0ZWRfbXNnJykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdub25lJykuZmFkZU91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFRoaXMgcmVtb3ZlcyB0aGUgcGFyZW50IHJvdyBvZiB0aGUgbGluayBvciBmb3JtIHRoYXQgZmlyZWQgdGhlIGNhbGxiYWNrLlxuICBwaHBiYi5hZGRBamF4Q2FsbGJhY2soJ3Jvd19kZWxldGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5wYXJlbnRzKCd0cicpLnJlbW92ZSgpO1xuICB9KTtcblxuICAvLyBUaGlzIGhhbmRsZXMgZnJpZW5kIC8gZm9lIGFkZGl0aW9ucyByZW1vdmFscy5cbiAgcGhwYmIuYWRkQWpheENhbGxiYWNrKCd6ZWJyYScsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICB2YXIgemVicmE7XG5cbiAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgIHplYnJhID0gJCgnLnplYnJhJyk7XG4gICAgICB6ZWJyYS5maXJzdCgpLmh0bWwocmVzLk1FU1NBR0VfVEVYVCk7XG4gICAgICB6ZWJyYS5ub3QoJzpmaXJzdCcpLmh0bWwoJyZuYnNwOycpLnByZXYoKS5odG1sKCcmbmJzcDsnKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBUaGlzIGNhbGxiYWNrIHVwZGF0ZXMgdGhlIHBvbGwgcmVzdWx0cyBhZnRlciB2b3RpbmcuXG4gICAqL1xuICBwaHBiYi5hZGRBamF4Q2FsbGJhY2soJ3ZvdGVfcG9sbCcsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICBpZiAodHlwZW9mIHJlcy5zdWNjZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIHBvbGwgPSAkKCcudG9waWNfcG9sbCcpO1xuICAgICAgdmFyIHBhbmVsID0gcG9sbC5maW5kKCcucGFuZWwnKTtcbiAgICAgIHZhciByZXN1bHRzVmlzaWJsZSA9IHBvbGwuZmluZCgnZGw6Zmlyc3QtY2hpbGQgLnJlc3VsdGJhcicpLmlzKCc6dmlzaWJsZScpO1xuICAgICAgdmFyIG1vc3RWb3RlcyA9IDA7XG5cbiAgICAgIC8vIFNldCBtaW4taGVpZ2h0IHRvIHByZXZlbnQgdGhlIHBhZ2UgZnJvbSBqdW1waW5nIHdoZW4gdGhlIGNvbnRlbnQgY2hhbmdlc1xuICAgICAgdmFyIHVwZGF0ZVBhbmVsSGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCkge1xuICAgICAgICBwYW5lbC5jc3MoJ21pbi1oZWlnaHQnLCBoZWlnaHQgfHwgcGFuZWwuZmluZCgnLmlubmVyJykub3V0ZXJIZWlnaHQoKSk7XG4gICAgICB9O1xuICAgICAgdXBkYXRlUGFuZWxIZWlnaHQoKTtcblxuICAgICAgLy8gUmVtb3ZlIHRoZSBWaWV3IHJlc3VsdHMgbGlua1xuICAgICAgaWYgKCFyZXN1bHRzVmlzaWJsZSkge1xuICAgICAgICBwb2xsLmZpbmQoJy5wb2xsX3ZpZXdfcmVzdWx0cycpLmhpZGUoNTAwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFyZXMuY2FuX3ZvdGUpIHtcbiAgICAgICAgcG9sbC5maW5kKCcucG9sbHMsIC5wb2xsX21heF92b3RlcywgLnBvbGxfdm90ZSwgLnBvbGxfb3B0aW9uX3NlbGVjdCcpLmZhZGVPdXQoNTAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcG9sbC5maW5kKCcucmVzdWx0YmFyLCAucG9sbF9vcHRpb25fcGVyY2VudCwgLnBvbGxfdG90YWxfdm90ZXMnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgdGhlIHVzZXIgY2FuIHN0aWxsIHZvdGUsIHNpbXBseSBzbGlkZSBkb3duIHRoZSByZXN1bHRzXG4gICAgICAgIHBvbGwuZmluZCgnLnJlc3VsdGJhciwgLnBvbGxfb3B0aW9uX3BlcmNlbnQsIC5wb2xsX3RvdGFsX3ZvdGVzJykuc2hvdyg1MDApO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdGhlIHZvdGVzIGNvdW50IG9mIHRoZSBoaWdoZXN0IHBvbGwgb3B0aW9uXG4gICAgICBwb2xsLmZpbmQoJ1tkYXRhLXBvbGwtb3B0aW9uLWlkXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3B0aW9uID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIG9wdGlvbklkID0gb3B0aW9uLmF0dHIoJ2RhdGEtcG9sbC1vcHRpb24taWQnKTtcbiAgICAgICAgbW9zdFZvdGVzID0gKHJlcy52b3RlX2NvdW50c1tvcHRpb25JZF0gPj0gbW9zdFZvdGVzKSA/IHJlcy52b3RlX2NvdW50c1tvcHRpb25JZF0gOiBtb3N0Vm90ZXM7XG4gICAgICB9KTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSB0b3RhbCB2b3RlcyBjb3VudFxuICAgICAgcG9sbC5maW5kKCcucG9sbF90b3RhbF92b3RlX2NudCcpLmh0bWwocmVzLnRvdGFsX3ZvdGVzKTtcblxuICAgICAgLy8gVXBkYXRlIGVhY2ggb3B0aW9uXG4gICAgICBwb2xsLmZpbmQoJ1tkYXRhLXBvbGwtb3B0aW9uLWlkXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3B0aW9uSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcG9sbC1vcHRpb24taWQnKTtcbiAgICAgICAgdmFyIHZvdGVkID0gKHR5cGVvZiByZXMudXNlcl92b3Rlc1tvcHRpb25JZF0gIT09ICd1bmRlZmluZWQnKTtcbiAgICAgICAgdmFyIG1vc3RWb3RlZCA9IChyZXMudm90ZV9jb3VudHNbb3B0aW9uSWRdID09PSBtb3N0Vm90ZXMpO1xuICAgICAgICB2YXIgcGVyY2VudCA9ICghcmVzLnRvdGFsX3ZvdGVzKSA/IDAgOiBNYXRoLnJvdW5kKChyZXMudm90ZV9jb3VudHNbb3B0aW9uSWRdIC8gcmVzLnRvdGFsX3ZvdGVzKSAqIDEwMCk7XG4gICAgICAgIHZhciBwZXJjZW50UmVsID0gKG1vc3RWb3RlcyA9PT0gMCkgPyAwIDogTWF0aC5yb3VuZCgocmVzLnZvdGVfY291bnRzW29wdGlvbklkXSAvIG1vc3RWb3RlcykgKiAxMDApO1xuICAgICAgICB2YXIgYWx0VGV4dDtcblxuICAgICAgICBhbHRUZXh0ID0gJCh0aGlzKS5hdHRyKCdkYXRhLWFsdC10ZXh0Jyk7XG4gICAgICAgIGlmICh2b3RlZCkge1xuICAgICAgICAgICQodGhpcykuYXR0cigndGl0bGUnLCAkLnRyaW0oYWx0VGV4dCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQodGhpcykuYXR0cigndGl0bGUnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygndm90ZWQnLCB2b3RlZCk7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ21vc3Qtdm90ZXMnLCBtb3N0Vm90ZWQpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgYmFyc1xuICAgICAgICB2YXIgYmFyID0gJCh0aGlzKS5maW5kKCcucmVzdWx0YmFyIGRpdicpO1xuICAgICAgICB2YXIgYmFyVGltZUxhcHNlID0gKHJlcy5jYW5fdm90ZSkgPyA1MDAgOiAxNTAwO1xuICAgICAgICB2YXIgbmV3QmFyQ2xhc3MgPSAocGVyY2VudCA9PT0gMTAwKSA/ICdwb2xsYmFyNScgOiAncG9sbGJhcicgKyAoTWF0aC5mbG9vcihwZXJjZW50IC8gMjApICsgMSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYmFyLmFuaW1hdGUoe1xuICAgICAgICAgICAgd2lkdGg6IHBlcmNlbnRSZWwgKyAnJSdcbiAgICAgICAgICB9LCA1MDApXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3BvbGxiYXIxIHBvbGxiYXIyIHBvbGxiYXIzIHBvbGxiYXI0IHBvbGxiYXI1JylcbiAgICAgICAgICAgIC5hZGRDbGFzcyhuZXdCYXJDbGFzcylcbiAgICAgICAgICAgIC5odG1sKHJlcy52b3RlX2NvdW50c1tvcHRpb25JZF0pO1xuXG4gICAgICAgICAgdmFyIHBlcmNlbnRUZXh0ID0gcGVyY2VudCA/IHBlcmNlbnQgKyAnJScgOiByZXMuTk9fVk9URVM7XG4gICAgICAgICAgJCh0aGlzKS5maW5kKCcucG9sbF9vcHRpb25fcGVyY2VudCcpLmh0bWwocGVyY2VudFRleHQpO1xuICAgICAgICB9LCBiYXJUaW1lTGFwc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghcmVzLmNhbl92b3RlKSB7XG4gICAgICAgIHBvbGwuZmluZCgnLnBvbGxzJykuZGVsYXkoNDAwKS5mYWRlSW4oNTAwKTtcbiAgICAgIH1cbiAgICAgIHZhciByZXNpemVQYW5lbCA9IGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICAgIHZhciBwYW5lbEhlaWdodCA9IHBhbmVsLmhlaWdodCgpO1xuICAgICAgICB2YXIgaW5uZXJIZWlnaHQgPSBwYW5lbC5maW5kKCcuaW5uZXInKS5vdXRlckhlaWdodCgpO1xuXG4gICAgICAgIGlmIChwYW5lbEhlaWdodCAhPT0gaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgICBwYW5lbC5jc3Moe1xuICAgICAgICAgICAgbWluSGVpZ2h0OiAnJyxcbiAgICAgICAgICAgIGhlaWdodDogcGFuZWxIZWlnaHRcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFuaW1hdGUoe1xuICAgICAgICAgICAgICBoZWlnaHQ6IGlubmVySGVpZ2h0XG4gICAgICAgICAgICB9LCB0aW1lLFxuICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcGFuZWwuY3NzKHtcbiAgICAgICAgICAgICAgICAgIG1pbkhlaWdodDogaW5uZXJIZWlnaHQsXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBEaXNwbGF5IFwiWW91ciB2b3RlIGhhcyBiZWVuIGNhc3QuXCIgbWVzc2FnZS4gRGlzYXBwZWFycyBhZnRlciA1IHNlY29uZHMuXG4gICAgICB2YXIgY29uZmlybWF0aW9uRGVsYXkgPSAocmVzLmNhbl92b3RlKSA/IDMwMCA6IDkwMDtcbiAgICAgIHBvbGwuZmluZCgnLnZvdGUtc3VibWl0dGVkJykuZGVsYXkoY29uZmlybWF0aW9uRGVsYXkpLnNsaWRlRG93bigyMDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHJlc3VsdHNWaXNpYmxlKSB7XG4gICAgICAgICAgdXBkYXRlUGFuZWxIZWlnaHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQodGhpcykuZGVsYXkoNTAwMCkuZmFkZU91dCg1MDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXNpemVQYW5lbCgzMDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZW1vdmUgdGhlIGdhcCByZXN1bHRpbmcgZnJvbSByZW1vdmluZyBvcHRpb25zXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzaXplUGFuZWwoNTAwKTtcbiAgICAgIH0sIDE1MDApO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFNob3cgcG9sbCByZXN1bHRzIHdoZW4gY2xpY2tpbmcgVmlldyByZXN1bHRzIGxpbmsuXG4gICAqL1xuICAkKCcucG9sbF92aWV3X3Jlc3VsdHMgYScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgLy8gRG8gbm90IGZvbGxvdyB0aGUgbGlua1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciAkcG9sbCA9ICQodGhpcykucGFyZW50cygnLnRvcGljX3BvbGwnKTtcblxuICAgICRwb2xsLmZpbmQoJy5yZXN1bHRiYXIsIC5wb2xsX29wdGlvbl9wZXJjZW50LCAucG9sbF90b3RhbF92b3RlcycpLnNob3coNTAwKTtcbiAgICAkcG9sbC5maW5kKCcucG9sbF92aWV3X3Jlc3VsdHMnKS5oaWRlKDUwMCk7XG4gIH0pO1xuXG4gICQoJ1tkYXRhLWFqYXhdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFqYXggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtYWpheCcpO1xuICAgIGlmIChhamF4ICE9PSAnZmFsc2UnKSB7XG4gICAgICB2YXIgZmlsdGVyID0gJCh0aGlzKS5hdHRyKCdkYXRhLWZpbHRlcicpO1xuICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICBmaWx0ZXIgPSBwaHBiYi5nZXRGdW5jdGlvbkJ5TmFtZShmaWx0ZXIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZm4gPSAoYWpheCAhPT0gJ3RydWUnKSA/IGFqYXggOiBudWxsO1xuICAgICAgcGhwYmIuYWpheGlmeSh7XG4gICAgICAgIHNlbGVjdG9yOiB0aGlzLFxuICAgICAgICByZWZyZXNoOiAkKHRoaXMpLmF0dHIoJ2RhdGEtcmVmcmVzaCcpID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICBmaWx0ZXI6IGZpbHRlcixcbiAgICAgICAgY2FsbGJhY2s6IGZuXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG5cbiAgLyoqXG4gICAqIFRoaXMgc2ltcGx5IGFwcGVuZHMgI3ByZXZpZXcgdG8gdGhlIGFjdGlvbiBvZiB0aGVcbiAgICogUVIgYWN0aW9uIHdoZW4geW91IGNsaWNrIHRoZSBGdWxsIEVkaXRvciAmIFByZXZpZXcgYnV0dG9uXG4gICAqL1xuICAkKCcjcXJfZnVsbF9lZGl0b3InKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJCgnI3FyX3Bvc3Rmb3JtJykuYXR0cignYWN0aW9uJywgZnVuY3Rpb24gKGksIHZhbCkge1xuICAgICAgcmV0dXJuIHZhbCArICcjcHJldmlldyc7XG4gICAgfSk7XG4gIH0pO1xuXG5cbiAgLyoqXG4gICAqIE1ha2UgdGhlIGRpc3BsYXkgcG9zdCBsaW5rcyB0byB1c2UgSlNcbiAgICovXG4gICQoJy5kaXNwbGF5X3Bvc3QnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIC8vIERvIG5vdCBmb2xsb3cgdGhlIGxpbmtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgcG9zdElkID0gJCh0aGlzKS5hdHRyKCdkYXRhLXBvc3QtaWQnKTtcbiAgICAkKCcjcG9zdF9jb250ZW50JyArIHBvc3RJZCkuc2hvdygpO1xuICAgICQoJyNwcm9maWxlJyArIHBvc3RJZCkuc2hvdygpO1xuICAgICQoJyNwb3N0X2hpZGRlbicgKyBwb3N0SWQpLmhpZGUoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0aGUgbWVtYmVyIHNlYXJjaCBwYW5lbCBpbiBtZW1iZXJsaXN0LnBocC5cbiAgICpcbiAgICogSWYgdXNlciByZXR1cm5zIHRvIHNlYXJjaCBwYWdlIGFmdGVyIHZpZXdpbmcgcmVzdWx0cyB0aGUgc2VhcmNoIHBhbmVsIGlzIGF1dG9tYXRpY2FsbHkgZGlzcGxheWVkLlxuICAgKiBJbiBhbnkgY2FzZSB0aGUgbGluayB3aWxsIHRvZ2dsZSB0aGUgZGlzcGxheSBzdGF0dXMgb2YgdGhlIHNlYXJjaCBwYW5lbCBhbmQgbGluayB0ZXh0IHdpbGwgYmVcbiAgICogYXBwcm9wcmlhdGVseSBjaGFuZ2VkIGJhc2VkIG9uIHRoZSBzdGF0dXMgb2YgdGhlIHNlYXJjaCBwYW5lbC5cbiAgICovXG4gICQoJyNtZW1iZXJfc2VhcmNoJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIHZhciAkbWVtYmVybGlzdFNlYXJjaCA9ICQoJyNtZW1iZXJsaXN0X3NlYXJjaCcpO1xuXG4gICAgJG1lbWJlcmxpc3RTZWFyY2guc2xpZGVUb2dnbGUoJ2Zhc3QnKTtcbiAgICBwaHBiYi5hamF4Q2FsbGJhY2tzLmFsdF90ZXh0LmNhbGwodGhpcyk7XG5cbiAgICAvLyBGb2N1cyBvbiB0aGUgdXNlcm5hbWUgdGV4dGJveCBpZiBpdCdzIGF2YWlsYWJsZSBhbmQgZGlzcGxheWVkXG4gICAgaWYgKCRtZW1iZXJsaXN0U2VhcmNoLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAkKCcjdXNlcm5hbWUnKS5mb2N1cygpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBBdXRvbWF0aWNhbGx5IHJlc2l6ZSB0ZXh0YXJlYVxuICAgKi9cbiAgJChmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR0ZXh0YXJlYSA9ICQoJ3RleHRhcmVhOm5vdCgjbWVzc2FnZS1ib3ggdGV4dGFyZWEsIC5uby1hdXRvLXJlc2l6ZSknKTtcbiAgICBwaHBiYi5yZXNpemVUZXh0QXJlYSgkdGV4dGFyZWEsIHtcbiAgICAgIG1pbkhlaWdodDogNzUsXG4gICAgICBtYXhIZWlnaHQ6IDI1MFxuICAgIH0pO1xuICAgIHBocGJiLnJlc2l6ZVRleHRBcmVhKCQoJ3RleHRhcmVhJywgJyNtZXNzYWdlLWJveCcpKTtcbiAgfSk7XG59KShqUXVlcnkpOyAvLyBBdm9pZCBjb25mbGljdHMgd2l0aCBvdGhlciBsaWJyYXJpZXNcbiJdfQ==
