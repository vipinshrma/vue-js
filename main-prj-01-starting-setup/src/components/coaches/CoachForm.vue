<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: !firstName.isValid }">
            <label for="firstName">Firstname</label>
            <input type="text" id="firstName" v-model.trim="firstName.val" @blur="removeValidation('firstName')">
            <p v-if="!firstName.isValid">Firstname must not be empty</p>
        </div>
        <div class="form-control" :class="{ invalid: !lastName.isValid }">
            <label for="LastName">Lastname</label>
            <input type="text" id="LastName" v-model.trim="lastName.val" @blur="removeValidation('lastName')">
            <p v-if="!lastName.isValid">Lastname must not be empty</p>
        </div>
        <div class="form-control" :class="{ invalid: !description.isValid }">
            <label for="description">Description</label>
            <textarea id="description" rows="5" v-model.trim="description.val"
                @blur="removeValidation('description')" />
            <p v-if="!description.isValid">Description must not be empty</p>

        </div>
        <div class="form-control" :class="{ invalid: !hourlyRate.isValid }">
            <label for="rate">Hourly rate</label>
            <input type="number" id="rate" v-model.number="hourlyRate.val" @blur="removeValidation('hourlyRate')">
            <p v-if="!hourlyRate.isValid">Hourly rate must be greater than 0</p>
        </div>
        <div class="form-control">
            <h3>Area of expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.val"
                    @blur="removeValidation('areas')">
                <label for="frontend">Frontend Development</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas.val"
                    @blur="removeValidation('areas')">
                <label for="backend">Backend Development</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="areas.val" @blur="removeValidation('areas')">
                <label for="career">Career Advisory</label>
            </div>
            <p v-if="!areas.isValid">Rate must be greater than 0</p>
        </div>
        <p v-if="!formIsValid">Please fix the above errors and submit again</p>
        <base-button>Register</base-button>

    </form>
</template>

<script>
export default {
    emits: ['submit-data'],
    data() {
        return {
            firstName: {
                val: "",
                isValid: true,
            },
            lastName: {
                val: "",
                isValid: true,
            },
            description: {
                val: "",
                isValid: true,
            },
            hourlyRate: {
                val: "",
                isValid: true,
            },
            areas: {
                val: [],
                isValid: true
            },
            formIsValid: true
        }
    },
    methods: {
        validateForm() {
            this.formIsValid = true
            if (this.firstName.val === '') {
                this.firstName.isValid = false,
                    this.formIsValid = false
            }
            if (this.lastName.val === '') {
                this.lastName.isValid = false,
                    this.formIsValid = false
            }
            if (this.description.val === '') {
                this.description.isValid = false,
                    this.formIsValid = false
            }
            if (this.hourlyRate.val === '') {
                this.hourlyRate.isValid = false,
                    this.formIsValid = false
            }
            if (this.areas.val.length === 0) {
                this.areas.isValid = false,
                    this.formIsValid = false
            }
        },
        submitForm() {
            this.validateForm()
            if (!this.formIsValid) return;
            let data = {
                firstName: this.firstName.val,
                lastName: this.lastName.val,
                description: this.description.val,
                hourlyRate: this.hourlyRate.val,
                areas: this.areas.val,
            }

            this.$emit('submit-data', data)
        },
        removeValidation(input) {
            this[input].isValid = true
        }

    }
}
</script>

<style scoped>
.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input[type='checkbox']+label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
}

input,
textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
}

input:focus,
textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
}

input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
}

input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
}

h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
}

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}
</style>