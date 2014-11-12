// https://developers.google.com/gdata/samples/cal_sample
var Calendar = React.createClass({
    getInitialState:function(){
        return null;
    },
    componentDidMount:function(){
        $.ajax({
            url: "http://www.google.com/calendar/feeds/andrew.luly@gmail.com/public/full?alt=json-in-script&orderby=starttime&max-results=15&singleevents=true&sortorder=ascending&futureevents=true",
            dataType:"jsonp",
            success:this.handleSuccess,
            error:this.handleFailure
        });
    },

    handleSuccess:function(data){
        this.setState( data );
    },
    handleFailure:function(){
        alert("There is an error");
    },
    render:function(){
        var events;

        if( this.state === null){
            return (null);
        }
        events = this.state.feed.entry.map( function(event){
           return (
               <CalendarEvents data={event}/>
               )
        });
        return(
            <ul>
                {events}
            </ul>
            );
    }
})

var CalendarEvents = React.createClass({
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
                {this.props.data.gd$when[0].startTime} - {this.props.data.title.$t} -
            </li>
            );
    }
})

React.render(
    <Calendar />,
    document.getElementById("Calendar")
);