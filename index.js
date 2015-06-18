/**
 * Created by ubhagde on 5/27/15.
 */

selectedModule = -1;
elementPool = 0;

$(document).ready(function(){


    deactiveCheckboxes();

    $('.add-elements').click(function(e){
        var module = $(e.currentTarget).attr('module');
        selectModule(module);


    });



    addSelectHandler();

    function addSelectHandler(){

        $('.selectElement').unbind('click');
        $('.selectElement').click(function(e){
            var checked = this.checked;

            var element = $(e.currentTarget).attr('element');

            if(checked){
                placeElementInSelectedModule(element);
            } else {

                placeElementBack(element);
            }

        });
    }


    function selectModule(module){
        selectedModule = module;
        // Fade out everything else
        activateModule(module);

    }

    function pulsate(elems){
        $(elems).addClass('pulsate');
        var elems = $('.pulsate');

        TweenMax.set(elems, {backgroundColor : '#fff'});
        var tween = TweenMax.to(elems, 0.4, {backgroundColor : '#eee', yoyo : true, repeat : -1});


    }

    function stopPulsating(tween){
        tween.stop();
    }

    function placeElementInSelectedModule(element){
        var from = elementPool;
        var to = selectedModule;
        //pulsate(getElement(element));

        transferElement(element, from, to, function(){
            $('.right').find('.controls').find('.helper-text').text("Remove element from " + " module" + selectedModule);
        });

    }

    function placeElementBack(element){
        var from = selectedModule;
        var to = elementPool;
        $('.right').css('z-index', 1001);
        transferElement(element, from, to, function(){
            $('.right').css('z-index', 0);
            $('.left').find('.controls').find('.helper-text').text("Place in " + " module " + selectedModule);

        });

    }

    function transferElement(elementNo, from, to, callback){
        var from = getModule(from);
        var to = getModule(to);

        var element = getElement(elementNo);

        var scrollTop = $(window).scrollTop();

        var elementCopy = element.clone();

        to.find('.elements').prepend(elementCopy);

        elementCopy.css('opacity',0);

        var destination = elementCopy.offset();
        var origin = element.offset();

        console.log("DESTINATION", destination, "ORIGIN", origin);
        TweenLite.set(element, {position : 'fixed', margin : 0, left : origin.left, top : origin.top - scrollTop});


        var nextElement = element.next();

        element.remove();

        $('body').append(element);


        TweenLite.set(nextElement, {marginTop : element.css('height')});

        $('.left').css('overflow','visible');

        TweenLite.to(element, 0.6, {left : destination.left, top : destination.top - scrollTop, onComplete: function(){

            TweenLite.to(elementCopy, 0.5, {opacity : 1});

            element.remove();

            addSelectHandler();
            $('.left').css('overflow','scroll');
            if(callback)
            callback();
        }});

        TweenLite.to(nextElement, 0.6, {marginTop : 10});

    }

    function getElement(elementId){
        return $('.element[element='+elementId+']');
    }

    function getModule(moduleId){
        return $('.module[module='+moduleId+']');
    }

    function activateCheckboxes(){
        var boxes = $('.selectElement');
        TweenLite.to(boxes, 0.8, {scaleX : 1, scaleY : 1, ease: "Bounce.easeOut"});
    }

    function deactiveCheckboxes(){
        var boxes = $('.selectElement');
        TweenLite.to(boxes, 0.8, {scaleX : 0, scaleY : 0});
    }

    function activateModule(module){
        //$('.module').css('opacity', 0.3);

        var wH = $(window).height();


        var mod = $('.module[module='+module+']');
        var mod_offset = mod.offset();

        TweenLite.to($('.module').not($('.module[module='+module+']')).not($('.module[module='+0+']')), 0.8, {opacity : 0.2});
        mod.css('opacity', 1);

        var next = mod.next();

        next.css('margin-top', mod.height() + 70);
        TweenLite.set(mod, {position : 'fixed', 'zIndex': 1, left : mod_offset.left - 10, top : mod_offset.top - $(window).scrollTop()});


        TweenLite.to(mod, 0.2,{scaleX : 0.9, scaleY : 0.9, onComplete: function(){
            TweenLite.to(mod, 0.5, {top : 50, bottom : 50, scaleX : 1, scaleY : 1, backgroundColor : '#DEEBEF', onComplete: function(){
                mod.addClass('no-transform');
                TweenLite.to(getModule(selectedModule).add(getModule(0)).find('.controls'), 0.7, {height : 25, padding : 4, opacity : 1, onComplete: function(){
                    activateCheckboxes();
                }});

                $('.left').find('.controls').find('.helper-text').text("Place in " + " module " + selectedModule);

            }});

        }});


        mod.find('.add-elements').hide();
        mod.find('.done-adding').show();
        mod.addClass('activeModule');

        mod.find('.done-adding').click(function(){
            mod.removeClass('no-transform');
            deactivateModule(module, mod_offset);
        })

    }

    function deactivateModule(module, originalOffset){

        if(originalOffset == null){
            originalOffset = {}
            originalOffset.left = 0;
            originalOffset.right = 0;
        }

        var mod = $('.module[module='+module+']');


        mod.find('.add-elements').show();
        mod.find('.done-adding').hide();

        var next = mod.next();


        next.css('margin-top', mod.height() + 70);

        TweenLite.to(mod, 0.5, {left : originalOffset.left - 10, top : originalOffset.top - $(window).scrollTop(), backgroundColor : '#ddd', onComplete : function(){
            TweenLite.set(mod, {position : 'relative', 'zIndex': 1, left : 0, top :0});
            next.css('margin-top', 0);
            mod.removeClass('activeModule');
            TweenLite.to($('.module'), 0.8, {opacity : 1});

            TweenLite.to($('.controls'), 0.7, {height : 0, padding : 0, opacity : 0});

        }});





        deactiveCheckboxes();


    }
});
