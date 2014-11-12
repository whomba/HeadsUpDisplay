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
            var now = new Date(),
                hours = now.getHours(),
                ampm = hours > 12 ? "PM" : "AM";
            hours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours );

            return {
                time: this.ns( hours ) + ":" + this.ns( now.getMinutes()) + " " + ampm,
                day: days[now.getDate()],
                month: months[now.getMonth()],
                date: this.ns( now.getDate() ),
                year: now.getFullYear()
            };
        },

        ns:function( n ){
          return n<= 9  ? "0" + n.toString() : n.toString();
        },

        render:function(){
            return(
                <div>
                    <h2 className="time">
                        {this.state.time}
                    </h2>
                    <h2 className="date">
                        {this.state.day} {this.state.month} {this.state.date}, {this.state.year}
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
    }),
    days = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

React.render(
    <TimeDate />,
    document.getElementById("TimeDate")
);

