const axios = require('axios')

exports.getRadioData = async (req, res) => {
    let filter = {
        limit: 5,          // list max 5 items
        by: 'tag',         // search in tag
        searchterm: 'jazz' // term in tag
    }
    try {
        const response = await axios.get('http://de1.api.radio-browser.info/json/stations/bycountryexact/italy')
        res.json(response.data);
        // console.log(`API Server: ${RadioBrowser.service_url}`)
        // console.log(response)
        
    }
    catch (e) {
        console.error(e)
    }
}