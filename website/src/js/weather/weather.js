//http://www.wunderground.com/weather/api/d/docs?d=data/index&MR=1

var WeatherBox = React.createClass({
    getInitialState:function(){
        return null;
    },
    componentDidMount:function(){
        $.ajax({
            url: "http://api.wunderground.com/api/683c747a43ae80b0/forecast/conditions/q/98107.json",
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
        if( this.state === null){
            return (null);
        }
        return(
            <div>
                <WeatherNow data={this.state} />
                <WeatherForecast data={this.state} />
            </div>
            );
    }
});

var WeatherNow = React.createClass({
    render:function(){
        return(
            <div className="current-conditions">
                <div className="left-container">
                    <img src={this.props.data.current_observation.icon_url}
                    alt={this.props.data.current_observation.icon}
                    clasNames="left today-icon" />
                    <div className="wind">{this.props.data.current_observation.wind_mph} mph</div>
                </div>
                <div className="right-container">
                    <div className="temp">{this.props.data.current_observation.temp_f} &deg;<span className="superscript">F</span></div>
                    <p className="today-desc">{this.props.data.forecast.txt_forecast.forecastday[0].fcttext} </p>
                </div>
            </div>);
    }
});

var WeatherForecast = React.createClass({
    render:function(){
        var dailyNodes = this.props.data.forecast.simpleforecast.forecastday.map( function(daily){
            return (
                <DailyForecast min={ daily.low.fahrenheit }
                max={ daily.high.fahrenheit }
                icon={ daily.icon_url }
                alt={ daily.icon }
                day={ daily.date.weekday_short } />
                );
        });

        return (
            <ul className="forecast clear-both">
                {dailyNodes}
            </ul>
            );
    }
});

var DailyForecast = React.createClass({
    render:function(){
        return (
            <li>
                <div>
                    {this.props.day}
                </div>
                <div>
                    <img src={this.props.icon} alt={this.props.alt} />
                </div>
                <div>
                    {this.props.max}/{this.props.min}
                </div>
            </li>
            );
    }
});

React.render(
    <WeatherBox pollInterval={2000} />,
    document.getElementById('Weather')
);