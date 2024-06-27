
import { ShowModal } from "../modal.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5"
const API_Key = "9922747989cd32375eab00ec624e7dd6"

export const CurrentWeather = async (city, status, position) => {


    let url

    if (status == 'current')
        url = position ? `${BASE_URL}/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_Key}&units=metric`
            : `${BASE_URL}/weather?q=${city}&appid=${API_Key}&units=metric`
    else

        url = position ? `${BASE_URL}/forecast?lat=${position.latitude}&lon=${position.longitude}&appid=${API_Key}&units=metric`
            : `${BASE_URL}/forecast?q=${city}&appid=${API_Key}&units=metric`


    console.log(url);
    try {
        const res = await fetch(url)
        console.log(res);
        if (+res.status != 200) {
            ShowModal(res.statusText)
            return
        }
        const json = await res.json()
        return json
    } catch (error) {
        ShowModal('not found');
    }

}


