/**
 * Created by ubhagde on 5/27/15.
 */

$(document).ready(function(){

    totalModules = $('.module').length;
    $('.place_cta').attr('placingbegun', false)
    $('.place_cta').click(function(e){
        e.stopPropagation();
        var elem = $(e.currentTarget);

        var placingBegun = elem.attr('placingbegun');

        window.elem = elem;
        if(placingBegun === 'true') {
            elem.attr('placingbegun', false);
            placingBegun = false;
        }
        else {
            elem.attr('placingBegun', true);
            placingBegun = true;
        }


        if(placingBegun) {
            elem.parent().parent().addClass('placingBegun');
            elem.text("Stop Placing");
            beginPlacing(elem.parent().parent())

        } else {
            elem.parent().parent().removeClass('placingBegun');
            elem.text("Click to Place");
        }


        $('.left .place_cta[placingbegun=true]').click(function(e){
            var elem = $(e.currentTarget).parent().parent();

            elem.removeClass('placingBegun');
            var position = elem.attr('position');
            $('.right .element[position='+position+']').remove();

        });


    });


    function beginPlacing(elem){
        var elemCopyRight = elem.clone();

        var currentModule = elem.find('.organizeButtons').attr('currentModule');
        var desiredModule = (Number) (currentModule) + 1;
        $('.module[position='+desiredModule+']').find('.elements').prepend(elemCopyRight).css('visibility', 'hidden');

        var elemCopyLeft = elem.clone();

        var placed = false;

        var position = elem.attr('position');

        var after = position-1;

        if(after<1){
            $('.left .elements').prepend(elemCopyLeft);
        } else {
            $('.left .element[position='+after+']').after(elemCopyLeft);
        }

        var leftOffset = elemCopyLeft.offset();

        elem.find('a').css('visibility','hidden');
        elem.css('zIndex',100);
        elem.css('position','fixed');

        elem.css({
            'left':leftOffset.left,
            'top':leftOffset.top
        });
        elem.removeClass('placingBegun');



        elem.animate({
            'left' : elemCopyRight.offset().left - 10,
            'top' : elemCopyRight.offset().top - 10 - $(window).scrollTop(),
            'zIndex' : 100
        },800, function(){
            elem.remove();
            elemCopyRight.removeClass('placingBegun');
            elemCopyRight.css('visibility','visible');
            elem.find('a').css('visibility','hidden');

            elemCopyRight.find('.organizeButtons').attr('currentModule', desiredModule);

        })

        //while(!placed){
        //    elemCopyRight.
        //}
        elemCopyRight.find('a').text("Place here");
        elemCopyRight.find('a').addClass('placeHere');
        elemCopyRight.find('a').addClass('pulsate');

        window.elem = elemCopyRight;
        elemCopyRight.find('.down').click(function(){
            var currentModule = elemCopyRight.find('.organizeButtons').attr('currentModule');
            var desiredModule = (Number) (currentModule) + 1;
            placeInModule(elemCopyRight, desiredModule);
        });
        elemCopyRight.find('.up').click(function(){
            var currentModule = elemCopyRight.find('.organizeButtons').attr('currentModule');
            var desiredModule = (Number) (currentModule) - 1;
            if(desiredModule < 1)
                desiredModule = totalModules;
            placeInModule(elemCopyRight, desiredModule);
        });

        elemCopyRight.find('a').click(function(e){
            e.stopPropagation();
            elemCopyLeft.animate({
                'height' : 0,
                'margin' : 0,
                'padding' : 0
            }, function(){
                elemCopyLeft.hide();
                elemCopyRight.find('a').hide().text('Click to move')
                elemCopyRight.find('a').removeClass('pulsate');
                placed = true;
            })
        })
    }

    function stopPlacing(elem){

    }

    function placeInModule(elem,mod_pos){

        var position = elem.attr('position');

        var elemCopy = elem.clone();

        var currentModule = elem.find('.organizeButtons').attr('currentModule');

        currentModule = (Number) (currentModule);

        $('.module[position='+mod_pos+']').find('.elements').prepend(elemCopy);
        elemCopy.css('visibility', 'hidden');

        var placed = false;

        var initialOffset = elem.offset();

        elem.find('a').css('visibility','hidden');
        elem.css('zIndex',100);
        elem.css('position','fixed');

        elem.css({
            'left':initialOffset.left,
            'top':initialOffset.top - $(window).scrollTop()
        });

        elem.animate({
            'left' : elemCopy.offset().left,
            'top' : elemCopy.offset().top - 10 - $(window).scrollTop(),
            'zIndex' : 100
        },800, function(){
            elem.remove();
            //elemCopy.removeClass('placingBegun');
            elemCopy.css('visibility','visible');
            elem.find('a').css('visibility','hidden');
            elemCopy.find('.organizeButtons').attr('currentModule', mod_pos);

        })


        elemCopy.find('a').text("Place here");
        elemCopy.find('a').addClass('placeHere');
        elemCopy.find('a').addClass('pulsate');

        elemCopy.find('.down').click(function(){
            var currentModule = elemCopy.find('.organizeButtons').attr('currentModule');
            var desiredModule = (Number) (currentModule) + 1;
            if(desiredModule > totalModules)
            desiredModule = 1
            placeInModule(elemCopy, desiredModule);
        });

        elemCopy.find('.up').click(function(){
            var currentModule = elemCopy.find('.organizeButtons').attr('currentModule');
            var desiredModule = (Number) (currentModule) - 1;
            if(desiredModule < 1)
                desiredModule = totalModules
            placeInModule(elemCopy, desiredModule);
        });

        elemCopy.find('a').click(function(e){

            e.stopPropagation();
            var elemCopyLeft = $('.left .elements .element[position='+position+']');

            elemCopyLeft.animate({
                'height' : 0,
                'margin' : 0,
                'padding' : 0
            }, function(){
                elemCopyLeft.hide();
                elemCopy.find('a').hide().text('Click to move')
                elemCopy.find('a').removeClass('pulsate');
                placed = true;
            })


        })


    }

});
