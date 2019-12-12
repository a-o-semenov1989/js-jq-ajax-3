$(function(){
    
    let $countries = $('select[name=country]');
    let $towns = $('select[name=town]');
    let $res = $('.res');
    let url = 'data.php';
    
    $.get(url, {action: 'countries'}, function(countries){
        
        for(let code in countries){
            $('<option/>').attr('value', code)
                          .html(countries[code])
                          .appendTo($countries);
        }
        
        $countries.prop('disabled', false);
    }, 'json');
    
    
    $countries.on('change', function(){
        let code = $(this).val();
        
        if(code != ''){
            $towns.find('option:gt(0)').remove();
            $towns.prop('disabled', true);
            
            $.get(url, {action: 'towns', country: code}, function(towns){
        
                for(let townCode in towns){
                    $('<option/>').attr('value', townCode)
                                  .html(towns[townCode])
                                  .appendTo($towns);
                }
            
                $towns.prop('disabled', false);
            }, 'json');
        }
        else{
            /* ? */
        }
    });
    
    $towns.on('change', function(){
        let townCode = $(this).val();
        
        if(townCode != ''){
            $res.empty();
            
            $.get(url, {action: 'tours', town: townCode}, function(tours){
        
                for(let tour of tours){
                    $('<li/>').html(tour).appendTo($res);
                }
            }, 'json');
        }
        else{
            /* ? */
        }
    });
});