/**
 * Created by ubhagde on 5/27/15.
 */

selectedModule = -1;
elementPool = 0;
elementIndex = 1;
moduleIndex = 1;
tempElementStore = [];
pickModeOn = false;
placeholderTemplate = "";

Array.prototype.remove = function(element){
    var index = this.indexOf(element);
    if(index != -1){
        return this.splice(index,1)[0];
    }
    return -1;
}
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
    placeholderTemplate = $('#placeholder-template').html();

    var elems = Mustache.render(elementTemplate, {data : data});
    var mods = Mustache.render(moduleTemplate, {data : data});

    console.log(elems);
    $('.elements-container').html(elems);
    $('.modules-container').html(mods);

    $('.leftHeader').css('left',$('.left').css('left'));



}

$(document).ready(function(){


    initialize();

    activateCheckboxes();

    $('.add-elements').click(function(e){
        var module = $(e.currentTarget).attr('module');
        selectModule(module);


    });

    $('.module').not(getModule(0)).hover(function(){
        //TweenLite.to($(this),0.1,{scaleX : 1.01, scaleY:1.01});
        if(pickModeOn)
        TweenLite.to($(this).find('.placeholder'), 0.4, {scaleX : 1.2, scaleY : 1.2, marginTop:10,  ease: "Bounce.easeOut"})

    }, function(){
        //TweenLite.to($(this),0.2,{scaleX : 1, scaleY:1});
        TweenLite.to($(this).find('.placeholder'), 0.2, {scaleX : 1, scaleY : 1, marginTop : 0})
    })



    addSelectHandler();

    function addSelectHandler(){

        $('.selectElement').unbind();
        $('.removeButton').unbind();

        $('.removeButton').click(function(){
            console.log($(this).attr('element'),$(this).parent().parent().parent().parent().attr('module'), 0, null, null);
            transferElement($(this).attr('element'),$(this).parent().parent().parent().attr('module'), 0, null, null);
        });

        $('.removeButton').hover(function(){
            TweenLite.to($(this),0.5,{scaleX: 1.3, scaleY : 1.3});
        }, function(){
            TweenLite.to($(this),0.3,{scaleX: 1, scaleY : 1});

        })

        $('.selectElement').hover(function(){
            TweenLite.to($(this),0.1,{scaleX: 1.3, scaleY : 1.3});
        }, function(){
            TweenLite.to($(this),0.5,{scaleX: 1, scaleY : 1});
        });

        $('.selectElement').click(function(e){
            var checked = this.checked;

            var element = $(e.currentTarget).attr('element');

            if(checked){
                //placeElementInSelectedModule(element);
                tempElementStore.push(element);
                if(!pickModeOn)
                activatePlaceholderLinesForModules($('.module').not(getModule(0)));
                pickModeOn = true;


            } else {
                tempElementStore.remove(element);
                //placeElementBack(element);
                if(tempElementStore.length == 0) {
                    pickModeOn = false;
                    deactivatePlaceholderLinesForModules($('.module').not(getModule(0)));

                }
            }



            manageGlobalPickButton(tempElementStore.length);

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
            TweenLite.to(getModule(selectedModule).find('.controls'),0.7,{backgroundColor : '#9B3B3B'});
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

    function transferElement(elementNo, from, to, placeholder, callback){
        var from = getModule(from);
        var to = getModule(to);

        var element = getElement(elementNo);

        TweenLite.set(element, {marginTop : 10});

        var scrollTop = $(window).scrollTop();

        var elementCopy = element.clone();

        if(placeholder != null) {
            placeholder.append(elementCopy);
        } else {
            var elements = to.find('.element');

            elements.each(function(index, element){
                var offset = $(element).offset().top - $(document).scrollTop();
                if(offset > 0){
                    $(element).before(elementCopy);
                    return false;
                }
            });
        }

        elementCopy.css('opacity',0);


        var origin = element.offset();

        console.log("DESTINATION", destination, "ORIGIN", origin);
        TweenLite.set(element, {position : 'fixed', margin : 0, left : origin.left, top : origin.top - scrollTop});

        var nextElement = element.next();

        element.remove();

        $('body').append(element);

        var destination = elementCopy.offset();

        TweenLite.set(nextElement, {marginTop : element.css('height')});

        TweenLite.to(element, 0.6, {left : destination.left - 10, top : destination.top - scrollTop - 20, onComplete: function(){

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

    function untickCheckboxes(){
        var boxes = $('.selectElement');
        boxes.prop("checked", false);
        tempElementStore = [];
    }

    function manageGlobalPickButton(howMany){
        var pickControl = $('.pick-control');
        pickControl.show();
        TweenLite.to(pickControl,0,{scaleX : 0.8, scaleY : 0.9});
        TweenLite.to(pickControl, 0.8, {scaleX : 1, scaleY : 1, ease: "Bounce.easeOut"});

        if(howMany <= 0) {
            howMany = ""
            pickControl.hide();
            return;
        }
        if(howMany > 1)
            pickControl.text("Picked " + howMany + " elements");
        else
            pickControl.text("Picked " + howMany + " element");
    }

    function activatePlaceholderLines(moduleId){

        var placeholder = $(placeholderTemplate);
        var module = getModule(moduleId);
        var oldPlaceholders = module.find('.placeholder');
        var elements = module.find('.element');
        var placeholder = $(placeholderTemplate);
        placeholder.css('opacity',0);
        attachClickListenerToPlaceholder(placeholder);
        placeholder.attr('module',moduleId);
        if(elements.length == 0){
            module.find('.elements').append(placeholder);
        } else {
            module.find('.elements').prepend(placeholder);
        }
        oldPlaceholders.remove();

        module.find('.element').each(function(index, element){
            //placeholder = $(placeholderTemplate).attr(moduleId);
            var placeholder = $(placeholderTemplate);
            attachClickListenerToPlaceholder(placeholder);
            placeholder.attr('module',moduleId);
            $(element).after(placeholder);

        });

        var newPlaceholders = module.find('.placeholder');
        //newPlaceholders.css('opacity', 1);
        TweenLite.to(newPlaceholders, 1, {'opacity':1,scaleX:1,scaleY:1,ease: "Bounce.easeOut"});

    }

    function getTempElementStore(){
        var elements = [];
        tempElementStore.forEach(function(e, i){
            elements.push(getElement(e));
        })

        return elements;
    }

    function attachClickListenerToPlaceholder(placeholder){
        $(placeholder).click(function(){
            transferElementStoreTo(placeholder);
            deactivatePlaceholderLinesForModules($('.module').not(getModule(0)));
            pickModeOn = false;
            untickCheckboxes();
            manageGlobalPickButton(0)
        });
    }

    function deactivatePlaceholderLines(moduleId){
        var module = getModule(moduleId);
        var elements = module.find('.element');
        var thePlaceholder = module.find('.placeholder');

        thePlaceholder.each(function(i,placeholder){
            pHolder = $(placeholder);
            console.log("LENGTH",pHolder.find('.element').length);
            if(pHolder.find('.element').length >= 1){
                var theChildren = pHolder.find('.element');
                console.log("PHOLDER", pHolder);
                pHolder.replaceWith(theChildren);

            } else {
                pHolder.css('opacity',0);
                pHolder.css('width',0);

            }
        })

    }

    function activatePlaceholderLinesForModules(modules){
        modules.each(function(index, element){
            var moduleId = $(element).attr('module');
            deactivatePlaceholderLines(moduleId);
            activatePlaceholderLines(moduleId);
        });
    }

    function deactivatePlaceholderLinesForModules(modules){
        modules.each(function(index, element){
            var moduleId = $(element).attr('module');
            deactivatePlaceholderLines(moduleId);
        });
    }

    function transferElementStoreTo(placeholder){

        console.log("GETTING TEMP ELEMENT STORE")
        var elStore = getTempElementStore();

        console.log(elStore);
        elStore.forEach(function(e,i){
            console.log(e, $(e).parent().parent().parent().attr('module'), $(placeholder).attr('module'));
            transferElement(e.attr('element'), $(e).parent().parent().parent().attr('module'), $(placeholder).attr('module'), $(placeholder), null );
        });


    }



});
