﻿(function ($) {
    $.fn.extend({
        autoScrollSidebar: function (options) {
            var option = $.extend({ target: null, offsetTop: 0 }, options);
            var $navItem = option.target;
            if ($navItem === null || $navItem.length === 0) return this;

            // sidebar scroll animate
            var middle = this.outerHeight() / 2;
            var top = $navItem.offset().top + option.offsetTop - this.offset().top;
            var $scrollInstance = this[0]["__overlayScrollbars__"];
            if (top > middle) {
                if ($scrollInstance) $scrollInstance.scroll({ x: 0, y: top - middle }, 500, "swing");
                else this.animate({ scrollTop: top - middle });
            }
            return this;
        },
        addNiceScroll: function () {
            if ($(window).width() > 768) {
                this.overlayScrollbars({
                    className: 'os-theme-light',
                    scrollbars: {
                        autoHide: 'leave',
                        autoHideDelay: 100
                    },
                    overflowBehavior: {
                        x: "hidden",
                        y: "scroll"
                    }
                });
            }
            else {
                this.css('overflow', 'auto');
            }
            return this;
        }
    });

    $.extend({
        format: function (source, params) {
            if (params === undefined || params === null) {
                return null;
            }
            if (arguments.length > 2 && params.constructor !== Array) {
                params = $.makeArray(arguments).slice(1);
            }
            if (params.constructor !== Array) {
                params = [params];
            }
            $.each(params, function (i, n) {
                source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                    return n;
                });
            });
            return source;
        },
        activeMenu: function (id) {
            var $curMenu = $('.sidebar .active').first();

            // set website title
            $('head title').text($curMenu.text());
            this.resetTab(id);
        },
        removeTab: function (tabId) {
            // 通过当前 Tab 返回如果移除后新的 TabId
            var activeTabId = $('#navBar').find('.active').first().attr('id');
            var $curTab = $('#' + tabId);
            if ($curTab.hasClass('active')) {
                var $nextTab = $curTab.next();
                var $prevTab = $curTab.prev();
                if ($nextTab.length === 1) activeTabId = $nextTab.attr('id');
                else if ($prevTab.length === 1) activeTabId = $prevTab.attr('id');
                else activeTabId = "";
            }
            return activeTabId;
        },
        resetTab: function (tabId) {
            // 通过计算 Tab 宽度控制滚动条显示完整 Tab
            var $tab = $('#' + tabId);
            if ($tab.length === 0) return;

            var $navBar = $('#navBar');
            var $first = $navBar.children().first();
            var marginLeft = $tab.position().left - $first.position().left;
            var scrollLeft = $navBar.scrollLeft();
            if (marginLeft < scrollLeft) {
                // overflow left
                $navBar.scrollLeft(marginLeft);
                return;
            }

            var marginRight = $tab.position().left + $tab.outerWidth() - $navBar.outerWidth();
            if (marginRight < 0) return;
            $navBar.scrollLeft(marginRight - $first.position().left);
        },
        movePrevTab: function () {
            var $navBar = $('#navBar');
            var $curTab = $navBar.find('.active').first();
            return $curTab.prev().attr('url');
        },
        moveNextTab: function () {
            var $navBar = $('#navBar');
            var $curTab = $navBar.find('.active').first();
            return $curTab.next().attr('url');
        },
        initDocument: function () {
            $('body').removeClass('trans-mute');
            $('[data-toggle="tooltip"]').tooltip();
            $('.sidebar').addNiceScroll().autoScrollSidebar();
        },
        initModal: function () {
            $('.modal').appendTo($('body'));
        },
        initToast: function () {
            $('.toast').appendTo($('body'));
        },
        toggleModal: function (modalId) {
            $(modalId).modal('toggle');
        },
        showToast: function () {
            $('.toast').toast('show');
        },
        tooltip: function (id, method) {
            var $ele = $(id);
            if (method === 'enable') {
                $ele.tooltip();
                $ele.parents('form').find('.invalid:first').focus();
            }
            else $ele.tooltip(method);
        },
        submitForm: function (btn) {
            $(btn).parent().prev().find('form :submit').click();
        }
    });

    $(function () {
        $(document)
            .on('hidden.bs.toast', '.toast', function () {
                $(this).removeClass('hide');
            })
            .on('inserted.bs.tooltip', '.is-invalid', function () {
                $('#' + $(this).attr('aria-describedby')).addClass('is-invalid');
            });
    });
})(jQuery);
