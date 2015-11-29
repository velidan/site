/**
 * Created by Cronix-23-ZTan on 18.11.2015.
 * Auth service
 */
'use strict';
(function(angular) {
    angular.module('terminal')
        .service('panelScripts'
            ,[function() {
                    function init() {
                        //Fix for IE page transitions
                        $("body").removeClass("hold-transition");

                        //Extend options if external options exist
                        if (typeof AdminLTEOptions !== "undefined") {
                            $.extend(true,
                                $.AdminLTE.options,
                                AdminLTEOptions);
                        }

                        //Easy access to options
                        var o = $.AdminLTE.options;

                        //Set up the object
                        _init();

                        //Activate the layout maker
                        $.AdminLTE.layout.activate();

                        //Enable sidebar tree view controls
                        $.AdminLTE.tree('.sidebar');

                        //Enable control sidebar
                        if (o.enableControlSidebar) {
                            $.AdminLTE.controlSidebar.activate();
                        }

                        //Add slimscroll to navbar dropdown
                        if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
                            $(".navbar .menu").slimscroll({
                                height: o.navbarMenuHeight,
                                alwaysVisible: false,
                                size: o.navbarMenuSlimscrollWidth
                            }).css("width", "100%");
                        }

                        //Activate sidebar push menu
                        if (o.sidebarPushMenu) {
                            $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
                        }

                        //Activate Bootstrap tooltip
                        if (o.enableBSToppltip) {
                            $('body').tooltip({
                                selector: o.BSTooltipSelector
                            });
                        }

                        //Activate box widget
                        if (o.enableBoxWidget) {
                            $.AdminLTE.boxWidget.activate();
                        }

                        //Activate fast click
                        if (o.enableFastclick && typeof FastClick != 'undefined') {
                            FastClick.attach(document.body);
                        }

                        //Activate direct chat widget
                        if (o.directChat.enable) {
                            $(document).on('click', o.directChat.contactToggleSelector, function () {
                                var box = $(this).parents('.direct-chat').first();
                                box.toggleClass('direct-chat-contacts-open');
                            });
                        }

                        /*
                         * INITIALIZE BUTTON TOGGLE
                         * ------------------------
                         */
                        $('.btn-group[data-toggle="btn-toggle"]').each(function () {
                            var group = $(this);
                            $(this).find(".btn").on('click', function (e) {
                                group.find(".btn.active").removeClass("active");
                                $(this).addClass("active");
                                e.preventDefault();
                            });

                        });
                    }



                    return {
                        init : init
                    };

                }]);
}(angular));