export default {
    async contactCoach(context, payload) {
        const response = await fetch(`https://find-coach-vue-js-default-rtdb.firebaseio.com/requests.json`, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const error = new Error(response?.message || 'Failed to fetch')
            throw error;
        }
        const responseData = response.json()
        payload.id = responseData.name;
        context.commit('addRequest', payload)
    },
    async fetchRequests(context) {
        const token = context.rootGetters.getToken
        const response = await fetch(`https://find-coach-vue-js-default-rtdb.firebaseio.com/requests.json?auth=${token}`);
        const responseData = await response.json()
        let requests = []

        if (!response.ok) {
            const error = new Error(responseData?.message || 'Failed to fetch')
            throw error;
        }
        for (const key in responseData) {
            requests.push(responseData[key])
        }
        context.commit('setRequests', requests)
    }
}