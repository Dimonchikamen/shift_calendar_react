import axios from 'axios'

export class ServerAPI {

    static async getEvents() {
        const url = 'https://api.github.com/users/hacktivist123/repos'
        return await axios.get(url).then((response) => response.data)
    }

    static async getRecruiters() {
        const url = 'https://api.github.com/users/hacktivist123/repos'
        return await axios.get(url).then((response) => response.data)
    }

    static async getRole() {
        const url = 'https://api.github.com/users/hacktivist123/repos'
        return await axios.get(url).then((response) => response.data)
    }

    static async getDayStart() {
        const url = 'https://api.github.com/users/hacktivist123/repos'
        return await axios.get(url).then((response) => response.data)
    }

    static async getDayEnd() {
        const url = 'https://api.github.com/users/hacktivist123/repos'
        return await axios.get(url).then((response) => response.data)
    }

    static async getInterviewTime() {
        const url = 'https://api.github.com/users/hacktivist123/repos'
        return await axios.get(url).then((response) => response.data)
    }
}