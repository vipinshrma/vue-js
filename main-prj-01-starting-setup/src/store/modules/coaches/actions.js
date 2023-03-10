export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.getUserId
        const coachData = {
            id: new Date().toISOString(),
            ...data,
        }
        const token = context.rootGetters.getToken
        const response = await fetch(`https://find-coach-vue-js-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(coachData)

        });
        // const responseData = await response.json();
        if (!response.ok) {
            //error
        }
        context.commit('registerCoach', { ...coachData, id: userId })
        context.commit('updateUser', coachData.id, { root: true })

    },
    async loadCoaches(context) {
        const response = await fetch(`https://find-coach-vue-js-default-rtdb.firebaseio.com/coaches.json`);
        const coaches = await response.json()
        if (!response.ok) {
            const error = new Error(response?.message || 'Failed to fetch')
            throw error;
        }
        context.commit('loadCoaches', [coaches])

    }
}
