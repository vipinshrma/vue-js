<template>
    <div>
        <section>
            <coach-filter @change-filter="setFilters"></coach-filter>
        </section>
        <section>
            <base-card>
                <base-dialog :show="!!error" @close="handleError" title="An Error Occured">
                    <p>
                        {{ error }}
                    </p>
                </base-dialog>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches">
                        Refresh
                    </base-button>
                    <base-button link to="/register" v-if="isLoggedIn && !isCoach && !isLoading">Register as Coach</base-button>
                    <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to register as coach</base-button>
                </div>
                <base-spinner v-if="isLoading"></base-spinner>
                <ul v-else-if="hasCoaches">
                    <coach-item v-for="coach in filteredCoaches" :key="coach.id"
                        :fullName="coach.firstName + ' ' + coach.lastName" :rate="coach.hourlyRate" :areas="coach.areas"
                        :id="coach.id">
                    </coach-item>
                </ul>
                <h3 v-else>No Coach Found</h3>
            </base-card>

        </section>
    </div>
</template>

<script>






import CoachFilter from '../../components/coaches/CoachFilter.vue';
import CoachItem from '../../components/coaches/CoachItem.vue';
export default {
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    components: {
        CoachItem,
        CoachFilter,
    },
    computed: {
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches']
            return coaches.filter((coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true
                }
                return false
            }))
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches']
        },
        isCoach() {
            return this.$store.getters.getUserId
        },
        isLoggedIn() {
            return this.$store.getters.isAuthenticated
        },
    },
    methods: {
       
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async loadCoaches() {
            try {
                this.isLoading = true
                await this.$store.dispatch('coaches/loadCoaches')
            } catch (error) {
                this.error = error?.message || "Something went wrong"
            }
            this.isLoading = false

        },
        handleError() {
            this.error = null
        }
    },
    created() {
        this.loadCoaches()
    }

}

</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>