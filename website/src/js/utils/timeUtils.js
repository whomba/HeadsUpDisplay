function getRealDate( s ){
    var d  = new Date(s);
    return d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
}

function normalizeAllDayDate( str ){
    return ( str.length <= 10 ) ? str + "T00:00:00.000-08:00" : str;
}

function non24hourTime( d, includeSeconds ){
    var str, hour,
        hours = d.getHours();

    hour = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours );

    str = hour + ":" + ns(d.getMinutes());

    if( includeSeconds ){
        str +":" + ns( d.getSeconds() );
    }

    return {
        t:str,
        ampm:( d.getHours() >= 12 ? "PM" : "AM" )
    };
}

function ns(n){
    return n<= 9  ? "0" + n.toString() : n.toString();
}

var daysShort = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"],
    daysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthsShort = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
