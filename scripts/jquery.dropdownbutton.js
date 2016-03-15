// jquery.dropdownbutton is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License. See http://creativecommons.org/licenses/by-sa/3.0/
//
// You are free:
// - to Share — to copy, distribute and transmit the work
// - to Remix — to adapt the work
// - to make commercial use of the work 
//
// Under the following conditions:
// - Attribution — You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
// - Share Alike — If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one. 
//
// https://twitter.com/#!/anders_nygaard

(function ($) {
    "use strict";
    $.fn.dropdownButton = function (options) {

        var defaults = {
            links: [
                {
                    title: "somewhere",
                    url: "http://www.vg.no",
                    target: "_blank"
                }, {
                    title: "somewhere else",
                    url: "http://www.vg.no",
                    target: "_blank"
                }]
        }

        var options = $.extend(defaults, options);

        return this.each(function () {

            var self = this;
            var $element = $(this);

            var callback = function (e) {
                e.preventDefault();

                var $element = $(this).parent();

                // Remove old menus
                $("#dropdownButtonMenu").remove();

                // Create a new
                var $menu = $("<ul></ul>");
                options.links.forEach(function (item) {
                    $("<li><a href=\"" + item.url + "\" target=\"" + item.target + "\">" + item.title + "</a></li>").appendTo($menu);
                });

                // Mount it all
                $("<div id=\"dropdownButtonMenu\"></div>")
                        .append($menu)
                        .css({
                            top: $element.height()
                        })
                        .mouseleave(function () {
                            $(this).remove();
                        })
                        .hide()
                        .appendTo($element)
                        .slideDown(50);
            }

            $("<button class=\"dropdownButton\" style=\"display:inline-block\"></button>")
                    .click(callback)
                    .appendTo($element);

            $("<div class= \"dropdownButtonArrow\"></div>")
                    .click(callback)
                    .appendTo($element).mouseover(function () {
                        $(this).prev().addClass("dropdownButtonMouseOver");
                    }).mouseout(function () {
                        $(this).prev().removeClass("dropdownButtonMouseOver");
                    });

            // Close menu on page click
            $(document).mouseup(function (e) {
                var container = $("#dropdownButtonMenu");

                if (!container.is(e.target) // if the target of the click isn't the container...
                        && container.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    container.hide();
                }
            });
        });
    };
})($)