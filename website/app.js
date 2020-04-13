

/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=f32a2e7e37d657baf26c6369bc0a4d89'

const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', () => {

    getWeather(baseURL, zipCode.value, apiKey).then((data) => {
        postWeather('http://localhost:8000/add', {
            temp: data.main.temp,
            date: d, userResponse: feelings.value
        })
    }).then(
        updateUI()
    );
});

// get method
const getWeather = async (baseURL, zipCode, apiKey) => {
    let URL = baseURL + zipCode + apiKey;
    const res = await fetch(URL);
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (err) {
        console.log("error: ", err);
    }
};

// Post Method
const postWeather = async (url = '', weatherData = {}) => {

    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(weatherData),
    })

    // try {
    //     const newData = await req.json();
    //     console.log(newData);
    //     return newData;

    // } catch (err) {
    //     console.log("error: ", err);

    // }
}



// update UI
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/getdata');
    try {
        const weatherData = await request.json();
        document.getElementById('temp').textContent = weatherData.temp;
        document.getElementById('date').textContent = weatherData.date;
        document.getElementById('content').textContent = weatherData.userResponse;

    } catch (error) {
        console.log("error: ", err);

    }
}