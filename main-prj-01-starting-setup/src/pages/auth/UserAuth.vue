<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred" @close="handleCloseError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Authenticating..." fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent>
                <div class="form-control">
                    <label for="email">E-Mail</label>
                    <input type="email" id="email" v-model="email">
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password">
                </div>
                <base-button @click="submitForm">{{ submitButtonCaption }}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}
                    Instead</base-button>
            </form>
        </base-card>
    </div>
</template>

<script>

export default {
    data() {
        return {
            email: "",
            password: "",
            formIsValid: true,
            mode: 'login',
            error: "",
            isLoading: false
        }
    },
    computed: {
        submitButtonCaption() {
            if (this.mode === 'login') {
                return 'Login'
            } else {
                return 'Signup'
            }
        },
        switchModeButtonCaption() {
            if (this.mode === 'login') {
                return 'Signup'
            } else {
                return 'Login'
            }
        }
    },
    methods: {
        switchAuthMode() {
            if (this.mode === 'login') {
                this.mode = 'signup'
            } else {
                this.mode = 'login'
            }
        },
        handleCloseError() {
            this.error = null
        },
        async submitForm() {
            this.formIsValid = true;
            console.log(this.email)
            console.log(this.password)
            if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
                this.formIsValid = false;
                return;
            }
            this.isLoading = true
            const loginData = {
                email: this.email,
                password: this.password,
            }
            if (this.mode === 'login') {
                try {
                    console.log(this.$route)
                    await this.$store.dispatch('login', loginData, { root: true })
                    const redirectUrl = '/' + (this.$route?.query?.redirect || "coaches");
                    this.$router.replace(redirectUrl)
                } catch (error) {
                    console.log(error)
                    this.error = error?.message || 'Failed to authenticate'
                }
            } else {
                try {
                    await this.$store.dispatch('signup', loginData, { root: true })
                } catch (error) {
                    console.log(error)
                    this.error = error?.message || 'Failed to authenticate'
                }
            }
            this.isLoading = false
        }
    }
}

</script>

<style scoped> form {
     border-radius: 12px;
     padding: 1rem;
 }

 .form-control {
     margin: 0.5rem 0;
 }

 label {
     font-weight: bold;
     margin-bottom: 0.5rem;
     display: block;
 }

 input,
 textarea {
     display: block;
     width: 100%;
     font: inherit;
     border: 1px solid #ccc;
     padding: 0.15rem;
 }

 input:focus,
 textarea:focus {
     border-color: #3d008d;
     background-color: #faf6ff;
     outline: none;
 }
</style>