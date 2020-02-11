import React from 'react';
import Info from "./components/info";
import Form from "./components/form";
import WeatherInfo from "./components/weatherInfo";


const API_KEY = "c4ae7cad4b5bdf63566b821f63b82829";

class App extends React.Component {
    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: undefined
    }

    gettingWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;

        // делаем проверку, если в поле для ввода задан город, то выполняем операцию по выводу температуры
        if (city) {
            const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await api_url.json();

            //меняем секунды во время
            const sunset = data.sys.sunset;
            const date = new Date();
            date.setTime(sunset);
            const sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            //перезаписываем данные state на данные, полученные с api_url
            this.setState({
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                pressure: data.main.pressure,
                sunset: sunset_date,
                error: undefined
            });
        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                pressure: undefined,
                sunset: undefined,
                error: "Enter the name of the city"
            });
        }
    }

    render() {
        return (
            <div className="wrapper" expand="md">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 info">
                                <Info/>
                            </div>
                            <div className="col-sm-6 form">
                                <Form weatherMethod={this.gettingWeather}/>
                                <WeatherInfo
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    pressure={this.state.pressure}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
