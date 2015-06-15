/**
 * Created by ubhagde on 5/27/15.
 */

selectedModule = -1;
elementPool = 0;

$(document).ready(function(){


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
        transferElement(element, from, to);

    }

    function placeElementBack(element){
        var from = selectedModule;
        var to = elementPool;
        $('.right').css('z-index', 1001);
        transferElement(element, from, to, function(){$('.right').css('z-index', 0);});

    }

    function transferElement(elementNo, from, to, callback){
        var from = getModule(from);
        var to = getModule(to);
        var element = getElement(elementNo);

        var scrollTop = $(window).scrollTop();
        var elementCopy = element.clone();

        to.find('.elements').append(elementCopy);

        elementCopy.css('opacity',0);


        var destination = elementCopy.offset();
        var origin = element.offset();
        TweenLite.set(element, {position : 'fixed', margin : 0, left : origin.left, top : origin.top - scrollTop});


        var nextElement = element.next();

        TweenLite.set(nextElement, {marginTop : element.css('height')});

        $('.left').css('overflow','visible');
        TweenLite.to(element, 0.6, {left : destination.left, top : destination.top - scrollTop, onComplete: function(){

            TweenLite.to(elementCopy, 0.5, {opacity : 1});

            element.remove();

            addSelectHandler();
            $('.left').css('overflow','scroll');
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
});
