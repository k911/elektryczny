!function(e){"use strict";e("#tz_date").change(function(){phpbb.timezoneSwitchDate(!1)}),e("#tz_select_date_suggest").click(function(){phpbb.timezonePreselectSelect(!0)}),e(function(){phpbb.timezoneEnableDateSelection(),phpbb.timezonePreselectSelect("true"===e("#tz_select_date_suggest").attr("timezone-preselect"))})}(jQuery);