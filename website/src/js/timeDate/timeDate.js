var TimeDate = React.createClass({
        getInitialState:function(){
            return this.generateTimeObj();
        },

        componentDidMount:function(){
            setInterval( this.updateTime, 1000);
        },

        updateTime:function(){
            this.setState( this.generateTimeObj() );
        },

        generateTimeObj:function(){
            var time,
                now = new Date();

            time = non24hourTime( now, false );

            return {
                time: time.t + " " + time.ampm,
                day: daysLong[ now.getDay() ],
                month: monthsLong[now.getMonth()],
                date: ns( now.getDate() ),
                year: now.getFullYear()
            };
        },

        render:function(){
            return(
                <div>
                    <h2 className="time">
                        {this.state.time}
                    </h2>
                    <h2 className="date">
                        {this.state.day}, {this.state.month} {this.state.date}, {this.state.year}
                    </h2>
                    <SpecialDay/>
                </div>
                )
        }
    }),

    SpecialDay = React.createClass({
        data:null,
        getInitialState:function(){
            return null;
        },
        componentDidMount:function(){
            //Not sure if this should be based off a calendar, or if it should just
            //be a set of keys in the file.  If it is in the calendar, then we would
            //have to somehow designate why this date is important for an icon, vs
            //just a file somewhere to say 'these dates are important'
//            $.ajax({
//                url:
//            })
        },
        isSpecialDay:function(){
            return false;
        },
        render:function(){
            var specialDay;
            //Check to see if today is a special day
            //If today is a special day, then display the following:
            /*
             (
             <aside>
             <!-- icon --> <!-- Event -->
             </aside>
             )
             */
            if(this.isSpecialDay() ){
                specialDay = (<span> @TODO Special Days</span>);
            }
            else{
                specialDay = (null);
            }
            return specialDay;
        }
    });

React.render(
    <TimeDate />,
    document.getElementById("TimeDate")
);

