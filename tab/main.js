"use strict";

//Object containing commands
const commands = {
    'a': input => { make_url('Amazon', 'https://www.amazon.com/s/?field-keywords=', input); },
    'g': input => { make_url('Google', 'https://encrypted.google.com/search?q=', input); },
    'u': input => { make_url('URL', 'https://', input); },
    'd': input => { make_url('DuckDuckGo', 'https://duckduckgo.com/?q=', input); },
    'm': input => { make_url('Google Maps', 'https://www.google.com/maps/?q=', input); },
    'w': input => { make_url('Wolfram Alpha', 'https://www.wolframalpha.com/input/?i=', input); },
    'y': input => { make_url('YouTube', 'https://youtube.com/results?search_query=', input); }
};

//Weather-responsive background gradients. TO BE IMPLEMENTED
const weather_gradients = {
    'clear': 'linear-gradient(#309eff,#ffffff) no-repeat center fixed',
    'cloudy': 'linear-gradient(#b3b3b3,#ffffff) no-repeat center fixed',
    'snow': 'linear-gradient(#ffffff,#ffffff) no-repeat center fixed',
    'rain': 'linear-gradient(#b3b3b3,#309eff) no-repeat center fixed'
};

var default_command = 'd';

var delimeter = ' ';
var current_url = '';

$(document).ready(() => {
    clock();
    get_location();
    $(document).on('keydown keyup', event => interpretKey(event));
});
//display time
function clock(){
    var d = new Date();
    $('time').text(pad(d.getHours())+' '+pad(d.getMinutes())+' '+pad(d.getSeconds()));
    setTimeout(clock,1000);
}
//Get the client's location from ip address
function get_location(){
    var ip;
    var lat_long;
    //Get location of user for weather data
    $.ajax({
        url: 'https://jsonip.com/',
        dataType: 'json',
        success: data => {
        ip = data.ip;
        //Uses ip to get coordinates
        $.ajax({
            url: 'https://freegeoip.net/json/'+ip,
            dataType: 'json',
            success: data => {
            lat_long = data.latitude+','+data.longitude;
            weather(lat_long);
            }
        });
        }
    });
}
//Asynchonously get weather data and update weather
function weather(location){
    $.ajax({
    url: 'https://api.darksky.net/forecast/1903f13c0caa565e37e3f681d0013412/'+location,
    dataType: 'jsonp',
    success: data => {
        $('.weather').show();
        $('#temperature').text(data['currently']['temperature']+'\xb0');
        var prec_perc = Number(data['currently']['precipProbability'])*100;
        $('#precipitation').text('☂ '+prec_perc+'%');
        $('#weather-description').text(data['currently']['summary']);
        var icon_str = data['currently']['icon'].toLowerCase();
        icon_str = ((icon_str.indexOf('cloudy') !== -1 || icon_str==='fog') ? 'cloudy' : icon_str);
        icon_str = (icon_str==='sleet' ? 'snow' : icon_str);
        icon_str = (icon_str.indexOf('clear') !== -1 ? 'clear' : icon_str);
        $('html').css('background',weather_gradients[icon_str]);
    },
    error: () => {
        $('.weather').hide();
    }
    });
    setTimeout(weather.bind(null,location), 900000);
    
}

//pads single digit numbers with 0
function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function interpretKey(e) {
    var input = $('input').focus().val().trim();
    var com = input.split(delimeter)[0];
    if(commands[com]) //Checks to see if command is in input
        commands[com](input.substr(com.length +1));
    else if(/^(https?:\/\/)?([\w\-]+\.[\w-]+)+([^\w\s]\S*?)*$/.test(input)) //Checks to see if input is a URL
        commands['u'](input);
    else if(input) //Resorts to default command if none of the above conditions are met
        commands[default_command](input);
    else
        make_url();
    if(e.keyCode == 13 && input) window.open(current_url,'_self'); //Opens webpage when enter key is pressed
}

//Creates URL based off of command
function make_url(name='', start_url='', url_param=''){
    if(name==='URL')
        current_url = (/^https?:\/\//.test(url_param) ? '' : start_url) + url_param;
    else
        current_url = start_url + encodeURIComponent(url_param);
    $('#input-info').text(name + (url_param ? ': ' : '') + url_param);
}
