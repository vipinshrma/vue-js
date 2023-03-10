export default {
    getRequests(state,_ , _2,rootGetters){
        console.log("rootGetters",rootGetters.getUserId)
        const userId = rootGetters.getUserId
        return state.requests.filter((request=>request.coachId===userId))
    },
    hasRequests(state,getters){
        return getters.getRequests && getters.getRequests.length > 0
    }
}