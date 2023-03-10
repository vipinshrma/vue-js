<template>
    <base-card>
        <section>
            <h2>Register as coach now</h2>
            <coach-form @submit-data="submitData"></coach-form>
        </section>
    </base-card>

</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
    components: {
        CoachForm
    },
    methods:{
        submitData(data){
            this.$store.dispatch('coaches/registerCoach',data).then(()=>{
                // this.$store.commit('updateUser',data.id)
            })
            this.$router.replace('/coaches')
        }
    }
}
</script>