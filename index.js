/**
 * Created by ubhagde on 5/27/15.
 */

selectedModule = -1;
elementPool = 0;
elementIndex = 1;
moduleIndex = 1;

var data = {
    modules : [
        {
            id : 1,
            name : "Chapter 1",
            description : "The Nature of Science and Technology"
        },
        {
            id : 2,
            name : "Chapter 2",
            description : "The Atmosphere"
        },
        {
            id : 3,
            name : "Chapter 3",
            description : "Weather Factors"
        },
        {
            id : 4,
            name : "Chapter 4",
            description : "Weather Patterns"
        },
        {
            id : 5,
            name : "Chapter 5",
            description : "Climate and Climate Change"
        },
        {
            id : 6,
            name : "Chapter 6",
            description : "Plants"
        },
        {
            id : 7,
            name : "Chapter 7",
            description : "Animals"
        },
        {
            id : 8,
            name : "Chapter 8",
            description : "Bones, Muscles, and Skin"
        },
        {
            id : 9,
            name : "Chapter 9",
            description : "Food and Digestion"
        },
        {
            id : 10,
            name : "Chapter 10",
            description : "Circulation"
        }

    ],
    elements : [
        {
            id : 1,
            name : "The Nature of Inquiry"
        },
        {
            id : 2,
            name : "Technology and Society"
        },
        {
            id : 3,
            name : "Microwave Ovens"
        },
        {
            id : 4,
            name : "Atmosphere"
        },
        {
            id : 5,
            name : "Air Pressure"
        },
        {
            id : 6,
            name : "The Ozone Layer"
        },
        {
            id : 7,
            name : "Air Pollution"
        },
        {
            id : 8,
            name : "How Clean is the Air ?"
        },
        {
            id : 9,
            name : "Cars and Clean Air"
        },
        {
            id : 10,
            name : "Environment"
        },
        {
            id : 11,
            name : "Changes in Climate"
        },
        {
            id : 12,
            name : "Energy in the Earth's Atmosphere"
        },
        {
            id : 13,
            name : "Heat Transfer"
        },
        {
            id : 14,
            name : "Global Winds"
        },
        {
            id : 15,
            name : "Water Cycle"
        },
        {
            id : 16,
            name : "Precipitation"
        },
        {
            id : 17,
            name : "Drought in Your State"
        },
        {
            id : 18,
            name : "Weather Fronts"
        },
        {
            id : 19,
            name : "Thunder and Lightning"
        },
        {
            id : 20,
            name : "Today's Weather"
        },
        {
            id : 21,
            name : "Seasons"
        },
        {
            id : 22,
            name : "Climates of the World"
        },
        {
            id : 23,
            name : "Continental Drift"
        },
        {
            id : 24,
            name : "The Greenhouse Effect"
        },
        {
            id : 25,
            name : "Plant Cell Structures"
        },
        {
            id : 26,
            name : "Paper"
        },
        {
            id : 27,
            name : "Leaves"
        },
        {
            id : 28,
            name : "Gymnosperms"
        },
        {
            id : 29,
            name : "The Structure of a Flower"
        },
        {
            id : 30,
            name : "Plants as Food"
        }

    ]

}

function initialize(){
    var elementTemplate = $('#element-template').html();
    var moduleTemplate = $('#module-template').html();


    var elems = Mustache.render(elementTemplate, {data : data});
    var mods = Mustache.render(moduleTemplate, {data : data});

    console.log(elems);
    $('.elements-container').html(elems);
    $('.modules-container').html(mods);


}

$(document).ready(function(){


    initialize();

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
            $('.right').find('.controls').find('.helper-text').text("Remove this from " + " chapter " + selectedModule);
            TweenLite.to(getModule(selectedModule).find('.controls'),0.7,{backgroundColor : '#BE0E0E'});
        });

    }

    function placeElementBack(element){
        var from = selectedModule;
        var to = elementPool;
        $('.right').css('z-index', 1001);
        transferElement(element, from, to, function(){
            $('.right').css('z-index', 0);
            $('.left').find('.controls').find('.helper-text').text("Add to " + " chapter " + selectedModule);
            TweenLite.to(getModule(0).find('.controls'),0.7,{backgroundColor : '#154795'});
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



        mod.find('.element').find('.controls').addClass('active-module-element');

        TweenLite.to($('.module').not($('.module[module='+module+']')).not($('.module[module='+0+']')), 0.8, {opacity : 0.2});
        mod.css('opacity', 1);

        var next = mod.next();

        next.css('margin-top', mod.height() + 70);
        TweenLite.set(mod, {position : 'fixed', 'zIndex': 1, left : mod_offset.left - 10, top : mod_offset.top - $(window).scrollTop()});


        TweenLite.to(mod, 0.2,{scaleX : 0.9, scaleY : 0.9, onComplete: function(){
            TweenLite.to(mod, 0.5, {top : 50, bottom : 50, scaleX : 1, scaleY : 1, backgroundColor : '#DEEBEF', onComplete: function(){
                mod.addClass('no-transform');
                TweenLite.to((getModule(0)).find('.controls'), 0.7, {backgroundColor : '#154795'});
                TweenLite.to((getModule(selectedModule)).find('.controls'), 0.7, {backgroundColor : '#BE0E0E'});
                TweenLite.to(getModule(selectedModule).add(getModule(0)).find('.controls').find('.helper-text'), 0.7, {opacity : 1, onComplete: function(){
                    activateCheckboxes();
                }});

                $('.left').find('.controls').find('.helper-text').text("Add to " + " chapter " + selectedModule);

            }});

        }});


        mod.find('.add-elements').hide();
        mod.find('.done-adding').show();
        mod.addClass('activeModule');

        mod.find('.done-adding').click(function(){
            mod.removeClass('no-transform');
            deactivateModule(module, mod_offset);
        })



        mod.removeClass('non-empty-module');
        $('body').css('overflow','hidden');

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

        TweenLite.to(mod, 0.5, {left : originalOffset.left - 10, top : originalOffset.top - $(window).scrollTop(), backgroundColor : '#eee', onComplete : function(){
            TweenLite.set(mod, {position : 'relative', 'zIndex': 1, left : 0, top :0});
            next.css('margin-top', 0);
            mod.removeClass('activeModule');
            TweenLite.to($('.module'), 0.8, {opacity : 1});

            TweenLite.to($('.controls'),0.7,{backgroundColor : '#DEEBEF'});
            TweenLite.to($('.controls').find('.helper-text'), 0.7, {opacity : 0});

        }});


        var containsChildren = mod.find('.elements').children().length > 0;

        mod.find('.add-elements').text("Add Contents")
        if(containsChildren){
            mod.addClass('non-empty-module');

            mod.find('.add-elements').text("Edit Contents")
        }


        mod.find('.element').find('.controls').removeClass('active-module-element');


        deactiveCheckboxes();


        $('body').css('overflow','scroll');
    }
});
