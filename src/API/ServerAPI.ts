import axios from 'axios'

export class ServerAPI {

    static async getEvents() {
        const url = 'https://api.github.com/users/letow/repos'
        return await axios.get(url).then(response => response.data)
    }

    static async changeEvents() {
        const url = 'https://api.github.com/users/letow/repos'
        return await axios.post(url).then(response => response.data)
    }


    static async getRecruiters() {
        const url = 'https://api.github.com/users/letow/repos'
        return await axios.get(url).then(response => response.data)
    }

    static async changeRecruiters() {
        const url = 'https://api.github.com/users/letow/repos'
        return await axios.post(url).then(response => response.data)
    }


    static async getRole() {
        const url = 'https://api.github.com/users/letow/repos'
        return await axios.get(url).then(response => response.data)
    }

    static async changeRole() {
        const url = 'https://api.github.com/users/letow/repos'
        return await axios.post(url).then(response => response.data)
    }


    static async getDayStart() {
        const url = 'https://api.github.com/users/letow/repos'
        return await axios.get(url).then(response => response.data)
    }
    
    static async changeDayStart() {
        const url = 'https://api.github.com/users/letow/repos'
        return await axios.post(url).then(response => response.data)
    }


    static async getDayEnd() {
        const url = 'https://api.github.com/users/letow/repos'
        return await axios.get(url).then(response => response.data)
    }

    static async changeDayEnd() {
        const url = 'https://api.github.com/users/letow/repos'
        return await axios.post(url).then(response => response.data)
    }

    
    static async getInterviewTime() {
        const url = 'https://api.github.com/users/letow/repos'
        return await axios.get(url).then(response => response.data)
    }

    static async changeInterviewTime() {
        const url = 'https://api.github.com/users/letow/repos'
        return await axios.post(url).then(response => response.data)
    }
    
}