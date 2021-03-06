/* global phpbb */

/**
 * phpBB3 forum functions
 */
var styleConfig = {
  staticNavigation: true,
  staticNavigationMinWidth: 700,
  staticNavigationMinHeight: 400,
  extendPosterProfile: true,
  collapseForums: true
};

/**
 * Find a member
 */
function find_username(url) {
  'use strict';

  popup(url, 760, 570, '_usersearch');
  return false;
}

/**
 * Window popup
 */
function popup(url, width, height, name) {
  'use strict';

  window.open(url.replace(/&amp;/g, '&'), name || '_popup', 'height=' + height + ',resizable=yes,scrollbars=yes, width=' + width);
  return false;
}

/**
 * Jump to page
 */
function pageJump(item) {
  'use strict';

  var page = parseInt(item.val(), 10);
  var perPage = item.attr('data-per-page');
  var baseUrl = item.attr('data-base-url');
  var startName = item.attr('data-start-name');

  if (page !== null && !isNaN(page) && page === Math.floor(page) && page > 0) {
    if (baseUrl.indexOf('?') === -1) {
      document.location.href = baseUrl + '?' + startName + '=' + ((page - 1) * perPage);
    } else {
      document.location.href = baseUrl.replace(/&amp;/g, '&') + '&' + startName + '=' + ((page - 1) * perPage);
    }
  }
}

/**
 * Mark/unmark checklist
 * id = ID of parent container, name = name prefix, state = state [true/false]
 */
function marklist(id, name, state) {
  'use strict';

  jQuery('#' + id + ' input[type=checkbox][name]').each(function () {
    var $this = jQuery(this);
    if ($this.attr('name').substr(0, name.length) === name) {
      $this.prop('checked', state);
    }
  });
}

/**
 * Resize viewable area for attached image or topic review panel (possibly others to come)
 * e = element
 */
function viewableArea(e, itself) {
  'use strict';

  if (!e) {
    return;
  }

  var element = (!itself) ? e.parentNode : e;
  if (!element.vaHeight) {
    // Store viewable area height before changing style to auto
    element.vaHeight = element.offsetHeight;
    element.vaMaxHeight = element.style.maxHeight;
    element.style.height = 'auto';
    element.style.maxHeight = 'none';
    element.style.overflow = 'visible';
  } else {
    // Restore viewable area height to the default
    element.style.height = element.vaHeight + 'px';
    element.style.overflow = 'auto';
    element.style.maxHeight = element.vaMaxHeight;
    element.vaHeight = false;
  }
}

/**
 * Alternate display of subPanels
 */
jQuery(function ($) {
  'use strict';

  $('.sub-panels').each(function () {
    var $childNodes = $('a[data-subpanel]', this);
    var panels = $childNodes.map(function () {
      return this.getAttribute('data-subpanel');
    });
    var showPanel = this.getAttribute('data-show-panel');

    if (panels.length) {
      activateSubPanel(showPanel, panels);
      $childNodes.click(function () {
        activateSubPanel(this.getAttribute('data-subpanel'), panels);
        return false;
      });
    }
  });
});

/**
 * Activate specific subPanel
 */
function activateSubPanel(p, panelsOption) {
  'use strict';

  var i;
  var showPanel;
  var panels = (typeof panelsOption === 'undefined') ?
    jQuery('.sub-panels a[data-subpanel]').map(function () {
      return this.getAttribute('data-subpanel');
    }) : panelsOption;

  if (typeof p === 'string') {
    showPanel = p;
  }
  $('input[name="show_panel"]').val(showPanel);

  for (i = 0; i < panels.length; i++) {
    jQuery('#' + panels[i]).css('display', panels[i] === showPanel ? 'block' : 'none');
    jQuery('#' + panels[i] + '-tab').toggleClass('activetab', panels[i] === showPanel);
  }
}

function selectCode(a) {
  'use strict';

  // Get ID of code block
  var e = a.parentNode.parentNode.getElementsByTagName('CODE')[0];
  var s;
  var r;

  // Not IE and IE9+
  if (window.getSelection) {
    s = window.getSelection();
    // Safari and Chrome
    if (s.setBaseAndExtent) {
      var l = (e.innerText.length > 1) ? e.innerText.length - 1 : 1;
      try {
        s.setBaseAndExtent(e, 0, e, l);
      } catch (error) {
        r = document.createRange();
        r.selectNodeContents(e);
        s.removeAllRanges();
        s.addRange(r);
      }
    // Firefox and Opera
    } else {
      // workaround for bug # 42885
      if (window.opera && e.innerHTML.substring(e.innerHTML.length - 4) === '<BR>') {
        e.innerHTML = e.innerHTML + '&nbsp;';
      }

      r = document.createRange();
      r.selectNodeContents(e);
      s.removeAllRanges();
      s.addRange(r);
    }
  // Some older browsers
  } else if (document.getSelection) {
    s = document.getSelection();
    r = document.createRange();
    r.selectNodeContents(e);
    s.removeAllRanges();
    s.addRange(r);
  // IE
  } else if (document.selection) {
    r = document.body.createTextRange();
    r.moveToElementText(e);
    r.select();
  }
}

/**
 * Play quicktime file by determining it's width/height
 * from the displayed rectangle area
 */
function play_qt_file(obj) {
  'use strict';

  var rectangle = obj.GetRectangle();
  var width;
  var height;

  if (rectangle) {
    rectangle = rectangle.split(',');
    var x1 = parseInt(rectangle[0], 10);
    var x2 = parseInt(rectangle[2], 10);
    var y1 = parseInt(rectangle[1], 10);
    var y2 = parseInt(rectangle[3], 10);

    width = (x1 < 0) ? (x1 * -1) + x2 : x2 - x1;
    height = (y1 < 0) ? (y1 * -1) + y2 : y2 - y1;
  } else {
    width = 200;
    height = 0;
  }

  obj.width = width;
  obj.height = height + 16;

  obj.SetControllerVisible(true);
  obj.Play();
}

var inAutocomplete = false;
var lastKeyEntered = '';

/**
 * Check event key
 */
function phpbbCheckKey(event) {
  'use strict';

  // Keycode is array down or up?
  if (event.keyCode && (event.keyCode === 40 || event.keyCode === 38)) {
    inAutocomplete = true;
  }

  // Make sure we are not within an "autocompletion" field
  if (inAutocomplete) {
    // If return pressed and key changed we reset the autocompletion
    if (!lastKeyEntered || lastKeyEntered === event.which) {
      inAutocomplete = false;
      return true;
    }
  }

  // Keycode is not return, then return. ;)
  if (event.which !== 13) {
    lastKeyEntered = event.which;
    return true;
  }

  return false;
}

/**
 * Apply onkeypress event for forcing default submit button on ENTER key press
 */
jQuery(function ($) {
  'use strict';

  $('form input[type=text], form input[type=password]').on('keypress', function (e) {
    var defaultButton = $(this).parents('form').find('input[type=submit].default-submit-action');

    if (!defaultButton || defaultButton.length <= 0) {
      return true;
    }

    if (phpbbCheckKey(e)) {
      return true;
    }

    if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
      defaultButton.click();
      return false;
    }

    return true;
  });
});

/**
 * Functions for user search popup
 */
function insertUser(formId, value) {
  'use strict';

  var $form = jQuery(formId);
  var formName = $form.attr('data-form-name');
  var fieldName = $form.attr('data-field-name');
  var item = opener.document.forms[formName][fieldName];

  if (item.value.length && item.type === 'textarea') {
    // eslint-disable-next-line
    value = item.value + '\n' + value;
  }

  item.value = value;
}

function insert_marked_users(formId, users) {
  'use strict';

  for (var i = 0; i < users.length; i++) {
    if (users[i].checked) {
      insertUser(formId, users[i].value);
    }
  }

  window.close();
}

function insert_single_user(formId, user) {
  'use strict';

  insertUser(formId, user);
  window.close();
}

/**
 * Resize poster profile block
 */
function adjustPosterProfile(postbody) {
  var profile = postbody.parent().prev();
  var post = profile.parent();
  var resized = profile.hasClass('resized');

  function unresize() {
    profile.removeClass('resized').css('min-height', '');
  }

  if (post.width() < (profile.width() + postbody.width())) {
    if (resized) {
      unresize();
    }
    return;
  }

  if (resized) {
    profile.css('min-height', '');
  }
  profile.css('min-height', Math.floor(postbody.height()) + 'px').addClass('resized');
}

/**
 * Responsive navigation
 */
function checkNavigation(force) {
  function init(nav) {
    nav.responsive = false;
    nav.lastWidth = 0;
    nav.itemCount = 0;

    // Copy children items
    nav.contents = nav.menu.find('.dropdown-contents:first');
    nav.canToggle = $();
    nav.noToggle = $();
    nav.contents.children('.separator:last-child').hide();
    nav.items = nav.lists.children().not(nav.menu).each(function (i) {
      var $this = $(this);
      var cloneClass;

      if ($this.is('.not-responsive, .responsive-menu, .dropdown-container, .selected') || $this.attr('data-skip-responsive') === 'true') {
        $this.attr('data-responsive-index', -1);
        nav.noToggle = nav.noToggle.add($this);
        return;
      }

      cloneClass = $this.attr('data-responsive-class') || $this.hasClass('small-icon') ? $this.attr('class') : ''
        + ' responsive-index-' + i;

      nav.contents.append(
        $this.clone(true).attr('class', cloneClass).addClass('responsive-clone').removeClass('tab')
      );

      $this.addClass('responsive-cloned-item').attr('data-clone-index', i);
      nav.canToggle = nav.canToggle.add($this);
      nav.itemCount++;
    });
    nav.contents.find('a.nav-link').removeClass('nav-link');
    nav.responsiveClones = nav.contents.children('.responsive-clone').hide();

    nav.initialized = true;
  }

  function check(nav, forceCheck) {
    var containerWidth;
    var total;
    var width;
    var menuWidth;
    var hiding;

    // Setup navigation
    if (!nav.initialized) {
      init(nav);
      // eslint-disable-next-line
      forceCheck = true;
    }

    if (!nav.itemCount) {
      // Nothing to hide
      return;
    }

    // Check width
    containerWidth = nav.container.width();
    if (!forceCheck && containerWidth === nav.lastWidth) {
      return;
    }
    nav.lastWidth = containerWidth;

    // Show all items
    if (nav.responsive) {
      nav.canToggle.show();
      nav.responsiveClones.hide();
      nav.menu.removeClass('showing-responsive-menu');
      if (!nav.alwaysShowMenu) {
        nav.menu.show();
      }
    }
    nav.responsive = false;
    menuWidth = nav.menu.outerWidth(true);
    width = menuWidth;

    // Count width of all items that cannot be hidden
    nav.noToggle.each(function () {
      var $this = $(this);
      if ($this.is(':visible')) {
        width += $this.outerWidth(true);
      }
    });

    // Test all other items
    hiding = (width >= containerWidth);
    nav.canToggle.each(function () {
      var $this = $(this);
      var itemWidth;
      var margin;

      if (!$this.is(':visible')) {
        return;
      }

      if (!hiding) {
        itemWidth = $this.outerWidth(true);
        if (!itemWidth) {
          $this.hide();
          return;
        }

        width += itemWidth;
        if (width >= containerWidth) {
          hiding = true;
        }
      }

      if (hiding) {
        $this.hide();
        nav.responsiveClones.filter('.responsive-index-' + $this.attr('data-clone-index')).show();
      }
    });

    nav.responsive = hiding;
    if (!hiding && !nav.alwaysShowMenu) {
      nav.menu.hide();
    } else if (hiding) {
      nav.menu.addClass('showing-responsive-menu');
    }
  }

  for (var i = 0; i < styleConfig._responsiveNavigation.length; i++) {
    check(styleConfig._responsiveNavigation[i], force);
  }
}

function initResponsiveNavigation() {
  styleConfig._responsiveNavigation = [];

  $('.nav-tabs, .navbar.secondary').each(function () {
    var $this = $(this);
    var lists = $this.children('ul');
    var menu = lists.children('.responsive-menu:first');
    var alwaysShowMenu = (menu.length > 0);

    // Create empty hidden menu
    if (!menu.length) {
      if ($this.is('.nav-tabs')) {
        // Something went wrong - main menu must have responsive menu
        return;
      }
      // Secondary menu
      lists.eq(0).prepend('<li class="responsive-menu dropdown-container" style="display: none;"><a href="#" class="dropdown-trigger dropdown-toggle"><i class="mdi mdi-menu" aria-hidden="true"></a>' +
        '<div class="dropdown hidden">' +
        '<div class="pointer"><div class="pointer-inner"></div></div>' +
        '<ul class="dropdown-contents" /></ul>' +
        '</div>' +
        '</li>');
      menu = lists.children('.responsive-menu:first');
      phpbb.registerDropdown(menu.find('.dropdown-toggle'), menu.find('.dropdown'));
    }

    styleConfig._responsiveNavigation.push({
      container: $this,
      lists: lists,
      menu: menu,
      initialized: false,
      alwaysShowMenu: alwaysShowMenu
    });
  });
}

/**
 * Parse document block
 */
function parseDocument($container) {
  'use strict';

  var test = document.createElement('div');
  var oldBrowser = (typeof test.style.borderRadius === 'undefined');
  var $body = $('body');

  /**
   * Adjust navigation tabs
   */
  $container.find('.nav-tabs').each(function () {
    var tabs = $(this).children().children();

    // Fix tabs structure
    tabs.not('.tab').each(function () {
      var tab = $(this);
      var className = tab.attr('class').split(' ');
      tab.attr('class', 'tab');
      for (var i = 0; i < className.length; i++) {
        if (className[i].substr(0, 5) === 'icon-') {
          tab.addClass(className[i].substr(5));
        }
      }
    }).children(':first-child').addClass('nav-link');

    // Tooltips for tabs
    tabs.each(function () {
      var $this = $(this);
      var title = '';
      if (!$this.attr('title')) {
        title = $this.children('.nav-link').text().trim();
        if (!title.length) return;

        $this.children('.nav-link + strong').each(function () {
          title += ' (' + $(this).text().trim() + ')';
        });
        $this.attr('title', title);
      }
    });
  });

  /**
   * Switch selected tab
   */
  $container.find('.nav-tabs[data-current-page]').each(function () {
    var tabs = $(this);
    var current = tabs.attr('data-current-page');
    var found = false;
    var content;
    var classes;
    var i;
    var key;

    $('.tab[data-select-match]', this).each(function () {
      var matches = $(this).attr('data-select-match').split(',');
      var match;
      var item;

      for (var j = 0; j < matches.length; j++) {
        match = matches[j].trim();
        if (current.indexOf(match) !== -1) {
          // Found a match!
          item = $(this);
          if (!item.hasClass('selected')) {
            tabs.find('.tab.selected').removeClass('selected');
            item.addClass('selected');
          }
          found = true;
          return;
        }
      }
    });

    // Check for known extensions
    if (found) {
      return;
    }

    content = $container.find('.content.pages-content');
    if (content.length) {
      // Get page content class, try to find matching link
      classes = content.prop('class').split(' ');
      for (i = 0; i < classes.length && !found; i++) {
        key = classes[i].trim();
        if (key !== 'content' && key !== 'pages-content') {
          // eslint-disable-next-line
          $container.find('.tab.pages.' + key).each(function () {
            tabs.find('.tab.selected').removeClass('selected');
            $(this).addClass('selected');
            found = true;
          });
        }
      }
      if (found) {
        return;
      }

      // Get first page link
      $container.find('.tab.pages:first').each(function () {
        tabs.find('.tab.selected').removeClass('selected');
        $(this).addClass('selected');
        found = true;
      });
    }
  });

  /**
   * Reset avatar dimensions when changing URL or EMAIL
   */
  $container.find('input[data-reset-on-edit]').on('keyup', function () {
    $(this.getAttribute('data-reset-on-edit')).val('');
  });

  /**
   * Pagination
   */
  $container.find('.pagination .page-jump-form :button').click(function () {
    var $input = $(this).siblings('input.inputbox');
    pageJump($input);
  });

  $container.find('.pagination .page-jump-form input.inputbox').on('keypress', function (event) {
    if (event.which === 13 || event.keyCode === 13) {
      event.preventDefault();
      pageJump($(this));
    }
  });

  $container.find('.pagination .dropdown-trigger').click(function () {
    var $dropdownContainer = $(this).parent();
    // Wait a little bit to make sure the dropdown has activated
    setTimeout(function () {
      if ($dropdownContainer.hasClass('dropdown-visible')) {
        $dropdownContainer.find('input.inputbox').focus();
      }
    }, 100);
  });

  /**
   * Adjust HTML code for IE8 and older versions
   */
  // if (oldBrowser) {
  // 	// Fix .linklist.bulletin lists
  // 	$container
  // 		.find('ul.linklist.bulletin > li')
  // 		.filter(':first-child, .rightside:last-child')
  // 		.addClass('no-bulletin');
  // }

  /**
   * Resize navigation (breadcrumbs) block to keep all links on same line
   */
  $container.find('.navlinks').each(function () {
    var $this = $(this);
    var $left = $this.children().not('.rightside');
    var $right = $this.children('.rightside');
    var queued = false;
    var throttled = false;

    if ($left.length !== 1 || !$right.length) {
      return;
    }

    function resize() {
      var width = 0;
      var diff = $left.outerWidth(true) - $left.width();
      var minWidth = Math.max($this.width() / 3, 240);
      var maxWidth;

      throttled = false;
      $right.each(function () {
        if ($(this).is(':visible')) {
          width += $(this).outerWidth(true);
        }
      });

      maxWidth = $this.width() - width - diff;
      $left.css('max-width', Math.floor(Math.max(maxWidth, minWidth)) + 'px');
    }

    resize();
    $(window).resize(function () {
      if (throttled) {
        queued = true;
      } else {
        resize();
        throttled = true;
        queued = false;
        setTimeout(function () {
          throttled = false;
          if (queued) {
            resize();
          }
        }, 250);
      }
    });
  });

  /**
   * Makes breadcrumbs responsive
   */
  $container.find('.breadcrumbs:not([data-skip-responsive])').each(function () {
    var $this = $(this);
    var $links = $this.find('.crumb');
    var length = $links.length;
    var classes = ['wrapped-max', 'wrapped-wide', 'wrapped-medium', 'wrapped-small', 'wrapped-tiny'];
    var classesLength = classes.length;
    var maxHeight = 0;
    var lastWidth = false;
    var wrapped = false;
    var queued = false;
    var throttled = false;

    // Set tooltips
    $this.find('a').each(function () {
      var $link = $(this);
      $link.attr('title', $link.text());
    });

    // Function that checks breadcrumbs
    function check() {
      var height = $this.height();
      var width;

      // Test max-width set in code for .navlinks above
      width = parseInt($this.css('max-width'), 10);
      if (!width) {
        width = $body.width();
      }

      throttled = false;
      maxHeight = parseInt($this.css('line-height'), 10);
      $links.each(function () {
        if ($(this).height() > 0) {
          maxHeight = Math.max(maxHeight, $(this).outerHeight(true));
        }
      });

      if (height <= maxHeight) {
        if (!wrapped || lastWidth === false || lastWidth >= width) {
          return;
        }
      }
      lastWidth = width;

      if (wrapped) {
        $this.removeClass('wrapped').find('.crumb.wrapped').removeClass('wrapped ' + classes.join(' '));
        if ($this.height() <= maxHeight) {
          return;
        }
      }

      wrapped = true;
      $this.addClass('wrapped');
      if ($this.height() <= maxHeight) {
        return;
      }

      for (var i = 0; i < classesLength; i++) {
        for (var j = length - 1; j >= 0; j--) {
          $links.eq(j).addClass('wrapped ' + classes[i]);
          if ($this.height() <= maxHeight) {
            return;
          }
        }
      }
    }

    // Run function and set event
    check();
    $(window).resize(function () {
      if (throttled) {
        queued = true;
      } else {
        check();
        throttled = true;
        queued = false;
        setTimeout(function () {
          throttled = false;
          if (queued) {
            check();
          }
        }, 250);
      }
    });
  });

  /**
   * Responsive link lists
   */
  var selector = '.linklist:not(.navlinks, [data-skip-responsive]),' +
    '.postbody .post-buttons:not([data-skip-responsive])';
  $container.find(selector).each(function () {
    var $this = $(this);
    var filterSkip = '.breadcrumbs, [data-skip-responsive]';
    var filterLast = '.edit-icon, .quote-icon, [data-last-responsive]';
    var $linksAll = $this.children();
    var $linksNotSkip = $linksAll.not(filterSkip); // All items that can potentially be hidden
    var $linksFirst = $linksNotSkip.not(filterLast); // The items that will be hidden first
    var $linksLast = $linksNotSkip.filter(filterLast); // The items that will be hidden last
    var persistent = $this.attr('id') === 'nav-main'; // Does this list already have a menu (such as quick-links)?
    var html = '<li class="responsive-menu hidden"><a href="javascript:void(0);" class="responsive-menu-link"></a><div class="dropdown hidden"><div class="pointer"><div class="pointer-inner" /></div><ul class="dropdown-contents" /></div></li>';
    var slack = 3; // Vertical slack space (in pixels). Determines how sensitive the script is in determining whether a line-break has occured.

    // Add a hidden drop-down menu to each links list (except those that already have one)
    if (!persistent) {
      if ($linksNotSkip.is('.rightside')) {
        $linksNotSkip.filter('.rightside:first').before(html);
        $this.children('.responsive-menu').addClass('rightside');
      } else {
        $this.append(html);
      }
    }

    // Set some object references and initial states
    var $menu = $this.children('.responsive-menu');
    var $menuContents = $menu.find('.dropdown-contents');
    var persistentContent = $menuContents.find('li:not(.separator)').length;
    var lastWidth = false;
    var compact = false;
    var responsive1 = false;
    var responsive2 = false;
    var copied1 = false;
    var copied2 = false;
    var maxHeight = 0;

    // Find the tallest element in the list (we assume that all elements are roughly the same height)
    $linksAll.each(function () {
      if (!$(this).height()) {
        return;
      }
      maxHeight = Math.max(maxHeight, $(this).outerHeight(true));
    });
    if (maxHeight < 1) {
      return; // Shouldn't be possible, but just in case, abort
    }
    maxHeight = maxHeight + slack;


    function check() {
      var width = $body.width();
      // We can't make it any smaller than this, so just skip
      if (responsive2 && compact && (width <= lastWidth)) {
        return;
      }
      lastWidth = width;

      // Reset responsive and compact layout
      if (responsive1 || responsive2) {
        $linksNotSkip.removeClass('hidden');
        $menuContents.children('.clone').addClass('hidden');
        responsive1 = responsive2 = false;
      }
      if (compact) {
        $this.removeClass('compact');
        compact = false;
      }

      // Unhide the quick-links menu if it has "persistent" content
      if (persistent && persistentContent) {
        $menu.removeClass('hidden');
      } else {
        $menu.addClass('hidden');
      }

      // Nothing to resize if block's height is not bigger than tallest element's height
      if ($this.height() <= maxHeight) {
        return;
      }

      // STEP 1: Compact
      if (!compact) {
        $this.addClass('compact');
        compact = true;
      }
      if ($this.height() <= maxHeight) {
        return;
      }

      // STEP 2: First responsive set - compact
      if (compact) {
        $this.removeClass('compact');
        compact = false;
      }
      // Copy the list items to the dropdown
      if (!copied1) {
        var $clones1 = $linksFirst.clone();
        $menuContents.prepend($clones1.addClass('clone clone-first').removeClass('leftside rightside'));

        if ($this.hasClass('post-buttons')) {
          $('.button', $menuContents).removeClass('button icon-button');
          $('.responsive-menu-link', $menu).addClass('button icon-button').prepend('<span></span>');
        }
        copied1 = true;
      }
      if (!responsive1) {
        $linksFirst.addClass('hidden');
        responsive1 = true;
        $menuContents.children('.clone-first').removeClass('hidden');
        $menu.removeClass('hidden');
      }
      if ($this.height() <= maxHeight) {
        return;
      }

      // STEP 3: First responsive set + compact
      if (!compact) {
        $this.addClass('compact');
        compact = true;
      }
      if ($this.height() <= maxHeight) {
        return;
      }

      // STEP 4: Last responsive set - compact
      if (!$linksLast.length) {
        return; // No other links to hide, can't do more
      }
      if (compact) {
        $this.removeClass('compact');
        compact = false;
      }
      // Copy the list items to the dropdown
      if (!copied2) {
        var $clones2 = $linksLast.clone();
        $menuContents.prepend($clones2.addClass('clone clone-last').removeClass('leftside rightside'));
        copied2 = true;
      }
      if (!responsive2) {
        $linksLast.addClass('hidden');
        responsive2 = true;
        $menuContents.children('.clone-last').removeClass('hidden');
      }
      if ($this.height() <= maxHeight) {
        return;
      }

      // STEP 5: Last responsive set + compact
      if (!compact) {
        $this.addClass('compact');
        compact = true;
      }
    }

    if (!persistent) {
      phpbb.registerDropdown($menu.find('a.responsive-menu-link'), $menu.find('.dropdown'), false);
    }

    // If there are any images in the links list, run the check again after they have loaded
    $linksAll.find('img').each(function () {
      $(this).load(function () {
        check();
      });
    });

    check();
    $(window).resize(check);
  });

  /**
   * Fix container for messages
   */
  $container.find('.postbody').each(function () {
    var $this = $(this);
    var children = $this.children();

    if (children.length === 1 && children.is('div')) {
      return;
    }

    $this.wrapInner('<div class="postbody-inner" />');
  });

  /**
   * Adjust post z-index for post profiles for all posts
   */
  $('.postprofile').each(function (i) {
    var z = Math.max(28 - i, 2);
    $(this).css('z-index', z);
  });

  /**
   * Do not run functions below for old browsers
   */
  if (oldBrowser) {
    return;
  }

  /**
   * Adjust topiclist lists with check boxes
   */
  $container.find('ul.topiclist dd.mark').siblings('dt').children('.list-inner').addClass('with-mark');

  /**
   * Appends contents of all extra columns to first column in
   * .topiclist lists for mobile devices. Copies contents as is.
   *
   * To add that functionality to .topiclist list simply add
   * responsive-show-all to list of classes
   */
  $container.find('.topiclist.responsive-show-all > li > dl').each(function () {
    var $this = $(this);
    var $block = $this.find('dt .responsive-show:last-child');
    var first = true;

    // Create block that is visible only on mobile devices
    if (!$block.length) {
      $this.find('dt > .list-inner').append('<div class="responsive-show" style="display:none;" />');
      $block = $this.find('dt .responsive-show:last-child');
    } else {
      first = ($.trim($block.text()).length === 0);
    }

    // Copy contents of each column
    $this.find('dd').not('.mark').each(function () {
      var column = $(this);
      var $children = column.children();
      var html = column.html();

      if ($children.length === 1 && $children.text() === column.text()) {
        html = $children.html();
      }

      $block.append((first ? '' : '<br />') + html);

      first = false;
    });
  });

  /**
   * Same as above, but prepends text from header to each
   * column before contents of that column.
   *
   * To add that functionality to .topiclist list simply add
   * responsive-show-columns to list of classes
   */
  $container.find('.topiclist.responsive-show-columns').each(function () {
    var $list = $(this);
    var headers = [];
    var headersLength = 0;

    // Find all headers, get contents
    $list.prev('.topiclist').find('li.header dd').not('.mark').each(function () {
      headers.push($(this).text());
      headersLength++;
    });

    if (!headersLength) {
      return;
    }

    // Parse each row
    $list.find('dl').each(function () {
      var $this = $(this);
      var $block = $this.find('dt .responsive-show:last-child');
      var first = true;

      // Create block that is visible only on mobile devices
      if (!$block.length) {
        $this.find('dt > .list-inner').append('<div class="responsive-show" style="display:none;" />');
        $block = $this.find('dt .responsive-show:last-child');
      } else {
        first = ($.trim($block.text()).length === 0);
      }

      // Copy contents of each column
      $this.find('dd').not('.mark').each(function (i) {
        var column = $(this);
        var children = column.children();
        var html = column.html();

        if (children.length === 1 && children.text() === column.text()) {
          html = children.html();
        }

        // Prepend contents of matching header before contents of column
        if (i < headersLength) {
          html = headers[i] + ': <strong>' + html + '</strong>';
        }

        $block.append((first ? '' : '<br />') + html);

        first = false;
      });
    });
  });

  /**
   * Responsive tables
   */
  $container.find('table.table1').not('.not-responsive').each(function () {
    var $this = $(this);
    var $th = $this.find('thead > tr > th');
    var headers = [];
    var totalHeaders = 0;
    var headersLength;

    // Find each header
    $th.each(function (column) {
      var cell = $(this);
      var colspan = parseInt(cell.attr('colspan'), 10);
      var dfn = cell.attr('data-dfn');
      var text = dfn ? dfn : cell.text();

      colspan = isNaN(colspan) || colspan < 1 ? 1 : colspan;

      for (var i = 0; i < colspan; i++) {
        headers.push(text);
      }
      totalHeaders++;

      if (dfn && !column) {
        $this.addClass('show-header');
      }
    });

    headersLength = headers.length;

    // Add header text to each cell as <dfn>
    $this.addClass('responsive');

    if (totalHeaders < 2) {
      $this.addClass('show-header');
      return;
    }

    $this.find('tbody > tr').each(function () {
      var row = $(this);
      var cells = row.children('td');
      var column = 0;

      if (cells.length === 1) {
        row.addClass('big-column');
        return;
      }

      cells.each(function () {
        var cell = $(this);
        var colspan = parseInt(cell.attr('colspan'), 10);
        var text = $.trim(cell.text());

        if (headersLength <= column) {
          return;
        }

        if ((text.length && text !== '-') || cell.children().length) {
          cell.prepend('<dfn style="display: none;">' + headers[column] + '</dfn>');
        } else {
          cell.addClass('empty');
        }

        colspan = isNaN(colspan) || colspan < 1 ? 1 : colspan;
        column += colspan;
      });
    });
  });

  /**
   * Hide empty responsive tables
   */
  $container.find('table.responsive > tbody').not('.responsive-skip-empty').each(function () {
    var $items = $(this).children('tr');
    if (!$items.length) {
      $(this).parent('table:first').addClass('responsive-hide');
    }
  });

  /**
   * Responsive tabs
   */
  $container.find('#tabs, #minitabs').not('[data-skip-responsive]').each(function () {
    var $this = $(this);
    var $ul = $this.children();
    var $tabs = $ul.children().not('[data-skip-responsive]');
    var $links = $tabs.children('a');
    var $item = $ul.append('<li class="tab responsive-tab" style="display:none;"><a href="javascript:void(0);" class="responsive-tab-link">&nbsp;</a><div class="dropdown tab-dropdown" style="display: none;"><div class="pointer"><div class="pointer-inner" /></div><ul class="dropdown-contents" /></div></li>').find('li.responsive-tab');
    var $menu = $item.find('.dropdown-contents');
    var maxHeight = 0;
    var lastWidth = false;
    var responsive = false;

    $links.each(function () {
      maxHeight = Math.max(maxHeight, Math.max($(this).outerHeight(true), $(this).parent().outerHeight(true)));
    });

    function check() {
      var width = $body.width();
      var height = $this.height();

      if (!arguments.length && (!responsive || width <= lastWidth) && height <= maxHeight) {
        return;
      }

      $tabs.show();
      $item.hide();

      lastWidth = width;
      height = $this.height();
      if (height <= maxHeight) {
        if ($item.hasClass('dropdown-visible')) {
          phpbb.toggleDropdown.call($item.find('a.responsive-tab-link').get(0));
        }
        return;
      }

      responsive = true;
      $item.show();
      $menu.html('');

      var $availableTabs = $tabs.filter(':not(.activetab, .responsive-tab)');
      var total = $availableTabs.length;
      var $tab;

      for (var i = total - 1; i >= 0; i--) {
        $tab = $availableTabs.eq(i);
        $menu.prepend($tab.clone(true).removeClass('tab'));
        $tab.hide();
        if ($this.height() <= maxHeight) {
          $menu.find('a').click(function () {
            check(true);
          });
          return;
        }
      }
      $menu.find('a').click(function () {
        check(true);
      });
    }

    var $tabLink = $item.find('a.responsive-tab-link');
    phpbb.registerDropdown($tabLink, $item.find('.dropdown'), {
      visibleClass: 'activetab'
    });

    check(true);
    $(window).resize(check);
  });

  /**
   * Hide UCP/MCP navigation if there is only 1 item
   */
  $container.find('#navigation').each(function () {
    var $items = $(this).children('ol, ul').children('li');
    if ($items.length === 1) {
      $(this).addClass('responsive-hide');
    }
  });

  /**
   * Replace responsive text
   */
  $container.find('[data-responsive-text]').each(function () {
    var $this = $(this);
    var fullText = $this.text();
    var responsiveText = $this.attr('data-responsive-text');
    var responsive = false;

    function check() {
      if ($(window).width() > 700) {
        if (!responsive) {
          return;
        }
        $this.text(fullText);
        responsive = false;
        return;
      }
      if (responsive) {
        return;
      }
      $this.text(responsiveText);
      responsive = true;
    }

    check();
    $(window).resize(check);
  });

  /**
   * Static navigation
   */
  if (styleConfig.staticNavigation) {
    $container.find('.navbar.tabbed > .inner').each(function (i) {
      var nav = this;
      var navigation = $(nav);
      var isStatic = false;
      var parent = navigation.parent();
      var inner;
      var $w = $(window);
      var minTopPosition = 0;
      var minWidth = styleConfig.staticNavigationMinWidth;
      var minHeight = styleConfig.staticNavigationMinHeight;
      var queued = false;
      var throttled = false;
      var navbarBox = $('.inner.page-width.card');
      var headerBox = $('#page-header-box.card');
      var breakLine = 0;
      var currOffset = 0;
      var prevOffset = 0;

      function enableStatic() {
        $('#page-header-box').css('padding-top', Math.floor(navigation.height()) + 'px');
        navigation.addClass('static');
        parent.removeClass('not-static');
        isStatic = true;
        checkNavigation(true);
      }

      function disableStatic() {
        $('#page-header-box').css('padding-top', 0);
        navbarBox.attr('data-card', 0);
        headerBox.attr('data-card', 1);
        navigation.removeClass('static');
        parent.addClass('not-static');
        isStatic = false;
        checkNavigation(true);
      }

      function testHash() {
        var hash = (window.location.hash) ? window.location.hash : '';
        if (!hash) {
          return;
        }
        window.scrollTo($w.scrollLeft(), $w.scrollTop() - navigation.height());
      }

      function check(checkHash) {
        var windowTop = 0;
        var windowWidth = Math.floor($w.width());
        var top;

        if (windowWidth < minWidth || $w.height() < minHeight) {
          if (isStatic) {
            disableStatic();
          }
          return;
        }
        if (!isStatic) {
          // navHeight = navigation.height();
          top = nav.getBoundingClientRect().top;
          if (top > 0) {
            return;
          }
          minTopPosition = $w.scrollTop() + top;
          enableStatic();
          if (checkHash) {
            testHash();
          }
          return;
        }
        if ($w.scrollTop() < minTopPosition) {
          disableStatic();
        } else if (checkHash) {
          testHash();
        }
      }
      $w.on('scroll resize', function () {
        if (!isStatic) {
          check(false);
        } else {
          if (!throttled) {
            check(false);
            throttled = true;
            queued = false;
            setTimeout(function () {
              throttled = false;
              if (queued) {
                check(false);
              }
            }, 250);
          } else {
            queued = true;
          }

          /**
           * Smooth transition shadow box from header to navbar
           * ---      k911@elektryczny.tk © 2016           ---
           */
          currOffset = $w.scrollTop();
          breakLine = headerBox.height();
          if (Math.abs(currOffset - prevOffset) > Math.abs(breakLine - prevOffset)) {
            if (currOffset < breakLine) {
              navbarBox.attr('data-card', 0);
              headerBox.attr('data-card', 1);
            } else {
              navbarBox.attr('data-card', 1);
              headerBox.attr('data-card', 0);
            }
            prevOffset = currOffset;
          }
        }
      });
      $w.on('load', function () {
        check(true);
      });
      $w.on('hashchange', function () {
        check(true);
      });
    });
  }

  /**
   * Empty last post column
   */
  $container.find('dd.lastpost > span:only-child > br:only-child').parents('dd.lastpost').addClass('empty');

  /**
   * Spoiler à la wykop.pl
   * Usage:
   * 	| <a href="#" class="spoiler">pokaż spoiler</a>
   *	| <code class="spoiler">{TEXT}</code>
   */
  $('a.spoiler').click(function (e) {
    e.preventDefault();
    $(this).next('div.spoiler').show();
    $(this).hide();
  });

  /**
   * HD images
   */
  if (window.matchMedia && window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 1.5dppx)').matches) {
    $container.find('img[data-src-hd]').each(function () {
      var img = this;
      var $this = $(this);
      var hdImage = new Image();
      var hdLoaded = false;
      var normalLoaded = false;

      function replaceImage() {
        $this.css('width', (img.naturalWidth ? img.naturalWidth : img.width) + 'px');
        img.setAttribute('src', img.getAttribute('data-src-hd'));
      }

      if (img.complete) {
        normalLoaded = true;
      } else {
        img.onload = function () {
          if (normalLoaded) {
            return;
          }
          normalLoaded = true;
          if (hdLoaded) {
            replaceImage();
          }
        };
      }

      hdImage.onload = function () {
        hdLoaded = true;
        if (normalLoaded) {
          replaceImage();
        }
      };
      hdImage.src = img.getAttribute('data-src-hd');
    });
  }

  /**
   * Split buttons
   */
  $container.find('div.buttons a.button.icon-button').each(function () {
    var $this = $(this);
    var words;

    if ($this.children().length) return;

    words = $this.text().trim().split(' ');
    if (words.length > 1) {
      $this.text(words.shift() + ' ').append('<strong />');
      $this.find('strong').text(words.join(' '));
    }
  });

  /**
   * Add online status
   */
  $('#phpbb.can-transform[data-online-text]').each(function () {
    var text = $(this).attr('data-online-text');

    $container.find('.online').each(function () {
      var $this = $(this);

      $this.css('position', 'relative').append('<span class="online-ribbon"><span>' + text + '</span><span>' + text + '</span></span>');
    });
  });

  /**
   * Extend poster profile
   */
  if (styleConfig._loaded) {
    $container.find('.postprofile + .postbody > div:only-child').each(function () {
      adjustPosterProfile($(this));
    });
  }

  /**
   * Collapse forums
   */
  if (styleConfig.collapseForums) {
    $container.find('.forabg li.header').each(function () {
      var $this = $(this);
      var forum = $this.parent().next('ul.forums');
      var id = 0;
      var toggled = false;
      var toggle;

      if (forum.length !== 1) {
        return;
      }

      // Find category id
      $('a[data-id]', $this).each(function () {
        id = parseInt(this.getAttribute('data-id'), 10);
      });
      if (!id) {
        forum.find('.forumtitle[data-id]:first').each(function () {
          id = parseInt(this.getAttribute('data-id'), 10);
          if (!isNaN(id)) {
            id = 'f' + id;
          }
        });
      }
      if (!id) {
        return;
      }

      // Add toggle code
      $this.append('<a class="forum-toggle" href="#"></a>');
      toggle = $this.find('.forum-toggle');
      toggle.click(function (event) {
        event.preventDefault();
        if (toggled) {
          forum.stop(true, true).slideDown(200);
          toggled = false;
          toggle.removeClass('toggled');
          phpbb.deleteCookie('toggled-' + id, styleConfig.cookieConfig);
          return;
        }
        forum.stop(true, true).slideUp(200);
        toggled = true;
        toggle.addClass('toggled');
        phpbb.setCookie('toggled-' + id, '1', styleConfig.cookieConfig);
      });

      // Check default state
      if (phpbb.getCookie('toggled-' + id, styleConfig.cookieConfig) === '1') {
        forum.stop(true, true).slideUp(0);
        toggled = true;
        toggle.addClass('toggled');
      }
    });
  }
}

/**
 * Run onload functions
 */
jQuery(function ($) {
  'use strict';

  function processResizeEvent() {
    styleConfig._resizeThrottled = false;

    checkNavigation(false);

    if (styleConfig.extendPosterProfile) {
      $('.postprofile + .postbody > div:only-child').each(function () {
        adjustPosterProfile($(this));
      });
    }
  }

  var transforms = ['transform', 'webkitTransform', 'msTransform'];
  var test;

  // Cookie configuration
  styleConfig.cookieConfig = {
    prefix: '',
    path: '/',
    expires: new Date()
  };
  styleConfig.cookieConfig.expires.setFullYear(styleConfig.cookieConfig.expires.getFullYear() + 1);

  // Swap .nojs and .hasjs
  $('#phpbb.nojs').toggleClass('nojs hasjs');
  $('#phpbb').toggleClass('hastouch', phpbb.isTouch);
  $('#phpbb.hastouch').removeClass('notouch');

  // Focus forms
  $('form[data-focus]:first').each(function () {
    $('#' + this.getAttribute('data-focus')).focus();
  });

  // Check for transformations
  test = $('#phpbb').get(0);
  for (var i = 0; i < transforms.length; i++) {
    if (typeof (test.style[transforms[i]]) !== 'undefined') {
      $('#phpbb').addClass('can-transform');
      break;
    }
  }

  // Cookies
  phpbb.setCookie = function (name, value, config) {
    // eslint-disable-next-line
    config = $.extend({
      prefix: '',
      path: '/'
    }, typeof config === 'object' ? config : {});

    document.cookie = config.prefix + name + '=' + encodeURIComponent(value) +
      (typeof config.expires === 'undefined' ? '' : ';expires=' + config.expires.toUTCString()) +
      (config.path ? ';path=' + config.path : '') +
      (config.domain ? ';domain=' + config.domain : '');

    return value;
  };

  phpbb.getCookie = function (name, config) {
    var expr;
    var cookie;

    // eslint-disable-next-line
    config = $.extend({
      prefix: '',
      path: '/'
    }, typeof config === 'object' ? config : {});

    expr = new RegExp('(^| )' + config.prefix + name + '=([^;]+)(;|$)');
    cookie = expr.exec(document.cookie);

    if (cookie) {
      return decodeURIComponent(cookie[2]);
    }
    return null;
  };

  phpbb.deleteCookie = function (name, config) {
    // eslint-disable-next-line
    config = $.extend({
      prefix: '',
      path: '/'
    }, typeof config === 'object' ? config : {});

    document.cookie = config.prefix + name + '=' +
      (config.path ? '; path=' + config.path : '') +
      (config.domain ? '; domain=' + config.domain : '') +
      '; expires=Thu, 01-Jan-70 00:00:01 GMT';

    return null;
  };

  // Responsive navigation
  initResponsiveNavigation();

  // Parse body
  parseDocument($('body'));

  // Check responsive navigation
  checkNavigation(true);

  // Events
  styleConfig._loaded = true;
  styleConfig._resizeThrottled = false;
  styleConfig._resizeQueued = false;

  $(window).load(function () {
    checkNavigation(true);
    if (styleConfig.extendPosterProfile) {
      $('.postprofile + .postbody > div:only-child').each(function () {
        adjustPosterProfile($(this));
      });
    }
  });

  $(window).resize(function () {
    if (!styleConfig._resizeThrottled) {
      processResizeEvent();
      styleConfig._resizeThrottled = true;
      styleConfig._resizeQueued = false;
      setTimeout(function () {
        styleConfig._resizeThrottled = false;
        if (styleConfig._resizeQueued) {
          processResizeEvent();
        }
      }, 500);
    } else {
      styleConfig._resizeQueued = true;
    }
  });
});
