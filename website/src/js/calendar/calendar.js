var CalendarHelper = (function(){

    function massageArray( arr ){
        var retArr = [],
            previousDate,
            i,
            currDate = [],
            eventDate;

        previousDate = getRealDate( arr[0].gd$when[0].startTime );

        for( i = 0; i < arr.length; i++){
            event = arr[i];
            eventDate = getRealDate( event.gd$when[0].startTime );
            if( previousDate === eventDate ){
                currDate.push( event  )
            }
            else{
                previousDate = eventDate
                retArr.push(currDate);
                currDate = [];
                currDate.push( event );
            }
        }
        return retArr;
    }

    function mergeEvents( cals ){
        var key,
            obj = {},
            retArr = [],
            cal,
            entry,
            i, x, y;
        for( i =0; i < cals.length; i++){
            cal = cals[i];
            for( x = 0; x < cal.feed.entry.length; x++){
                entry = cal.feed.entry[x];
                key = entry.title.$t + entry.gd$when[0].startTime;
                obj[key] = entry;
            }
        }

        for( key in obj){
            if( obj.hasOwnProperty( key ) ){
                retArr.push( obj[key] );
            }
        }

        return retArr;
    }

    function eventTime( t1, t2 ){
        var startTime  = non24hourTime( new Date( normalizeAllDayDate( t1 ) ) ),
            endTime = non24hourTime( new Date( normalizeAllDayDate( t2 ) ) );

        if( t1 === t2){
            return "All Day";
        }
        else if( startTime.ampm === endTime.ampm ){
            return startTime.t + ' - ' + endTime.t + ' ' + startTime.ampm;
        }
        else{
            return startTime.t + ' ' + startTime.ampm + ' - ' + endTime.t + ' ' + endTime.ampm;
        }
    }

    function generateCalendarDayTitle( timeStr ){
        var date = new Date( normalizeAllDayDate( timeStr )),
            now = new Date(),
            oneDay = 60*60*24*1000,
            tomorrow = new Date( now.getTime() + oneDay),
            str;

        if( date.toDateString() === now.toDateString()){
            str = "Today"
        }
        else if( date.toDateString() === tomorrow.toDateString()){
            str = "Tomorrow"
        }
        else{
            str =  daysLong[ date.getDay() ] + ", " + monthsShort[ date.getMonth() ] + " " +  date.getDate();
        }

        return str;
    }

    return {
        massageArray: massageArray,
        generateCalendarDayTitle: generateCalendarDayTitle,
        eventTime: eventTime,
        mergeEvents: mergeEvents
    };
}());


// https://developers.google.com/gdata/samples/cal_sample
var Calendar = React.createClass({
    maxDays: 5,

    getInitialState:function(){
        return null;
    },
    componentDidMount:function(){
        var url = "http://www.google.com/calendar/feeds/__ACCOUNT__/public/full?alt=json-in-script&orderby=starttime&max-results=15&singleevents=true&sortorder=ascending&futureevents=true",
            andy = url.replace("__ACCOUNT__", "andrew.luly@gmail.com"),
            kim = url.replace("__ACCOUNT__", "kimberly.rastetter@gmail.com");

        $.when(
            $.ajax({url: kim,dataType:"jsonp"}),
            $.ajax({url: andy,dataType:"jsonp"})
        ).then( this.handleCalendarsLoaded, this.handleFailure );
    },

    handleCalendarsLoaded: function( a, k ){
        var eventsToShow = CalendarHelper.mergeEvents( [ a[0], k[0] ]),
            multiDayArr;

        eventsToShow.sort( function(e1, e2 ) {
            var st1 = normalizeAllDayDate( e1.gd$when[0].startTime ),
                st2 = normalizeAllDayDate( e2.gd$when[0].startTime ),
                t1 = new Date( st1 ).getTime(),
                t2 = new Date( st2 ).getTime();
            if( t1 > t2){
                return 1;
            }
            else if( t1 < t2 ){
                return -1;
            }
            return 0;
        });

        multiDayArr = CalendarHelper.massageArray( eventsToShow );

        this.setState( {events:multiDayArr} );
    },

    handleFailure:function(){
        alert("There is an error");
    },

    render:function(){
        var i, x, date,
            oneDayEvents = [];

        if( this.state === null){
            return (null);
        }

        for( i =0 ; i < Math.min(this.state.events.length, this.maxDays); i++){
            date = new Date(this.state.events[i][0] ).getDate();

            oneDayEvents.push( (
                <CalendarDay data={ this.state.events[i] }/>
            ) );
        }

        return(
            <div>
                {oneDayEvents}
            </div>
        );
    }
})

var CalendarDay = React.createClass({
    render:function(){

        var events = this.props.data.map(function( event ){
           return (
               <CalendarEvent data={event} />
           )
        }),
            dayHeader = CalendarHelper.generateCalendarDayTitle( this.props.data[0].gd$when[0].startTime );
        return (
            <div>
                <h2>{dayHeader}</h2>
                <ul>
                    {events}
                </ul>
            </div>
        );
    }
});

var CalendarEvent = React.createClass({
    render:function(){
        var author = this.props.data.author[0].name.$t,
            cx = React.addons.classSet,
            classObj={
                'event':true
            },
            classes;

        classObj["author-" + author.split(' ')[0].toLowerCase()] =true;
        classes = cx(classObj);



        return(
            <li className={classes} >
                <p>{this.props.data.title.$t}</p>
                <p className='small-light'>{ CalendarHelper.eventTime( this.props.data.gd$when[0].startTime, this.props.data.gd$when[0].endTime ) }</p>
            </li>
            );
    }
})

React.render(
    <Calendar />,
    document.getElementById("Calendar")
);


//This thing is being a piece of shit.  Eventually i'd like to re-visit this, however
// not anytime soon....  Benefit of using this is getting the
/**
 <!DOCTYPE html>
 <html>

 <head>
 <meta charset="utf-8">
 <title>JS Bin</title>
 </head>

 <body>

 <div id='content'>
 <h1>Events</h1>
 <ul id='events'></ul>
 </div>
 <a href='#' id='authorize-button' onclick='handleAuthClick();'>Login</a>
 <div id="log"/>
 <script>
 var clientId = '578983590169-4qb53nbn4sudeos7ntkvjcgu696253rd.apps.googleusercontent.com';
 var apiKey = 'AIzaSyC0yuDc7UjkwNKklesZxwLnKNrg73JrMmY';
 var scopes = 'https://www.googleapis.com/auth/calendar';


 function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth,1);
    }

 function checkAuth() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
    }

 function handleAuthResult(authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {
            authorizeButton.style.visibility = 'hidden';
            makeApiCall();
        } else {
            authorizeButton.style.visibility = '';
            authorizeButton.onclick = handleAuthClick;
        }
    }

 function makeApiCall() {
        gapi.client.load('calendar', 'v3', function() {
            var request = gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMax': new Date().getTime()
            });

            request.execute(function(resp) {
                for (var i = 0; i < resp.items.length; i++) {
                    var li = document.createElement('li');
                    li.appendChild(document.createTextNode(resp.items[i].summary));
                    document.getElementById('events').appendChild(li);
                }
            });
        });
    }

 function handleAuthClick(event) {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
    }

 function logger( s ){
        document.querySelector( "#log").innerHTML = document.querySelector( "#log").innerHTML + "<br/>"+s;
    }
 </script>
 <script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>
 </body>

 </html>
 **/