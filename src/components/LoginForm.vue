<template>
    <v-card class="elevation-12">
        <v-toolbar color="warning">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-center">
                        <h3>Необходимо авторизоваться</h3>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-toolbar>
        <v-card-text>
            <v-alert v-if="errorAuth" type="error">
                Не верный логин или пароль
            </v-alert>
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    class="text-center"
            >
                <v-text-field
                        v-model="login"
                        :rules="loginRules"
                        label="Login"
                        required
                ></v-text-field>

                <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        :type="'password'"
                        label="Password"
                        required
                ></v-text-field>

                <v-btn
                        :disabled="!valid"
                        color="success"
                        @click.prevent="submit()"
                >
                    Войти
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    const axios = require('axios').default;

    export default {
        name: "LoginForm",
        data: () => ({
            valid: true,
            login: '',
            loginRules: [
                v => !!v || 'Введите логин',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Введите пароль',
            ],
            errorAuth: false
        }),
        computed: mapGetters(['getUser']),

        methods: {
            ...mapActions(['setAuth']),
            submit () {
                this.errorAuth = false;
                if (this.$refs.form.validate()) {
                    axios.post('http://localhost:3000/login', {
                        login: this.login,
                        password: this.password
                    }).then((response) => {
                        if (response.status === 200) {
                            this.setAuth(true);
                            this.login = this.password = '';
                            this.$router.push('/home');
                        } else {
                            this.errorAuth = true;
                        }
                    }).catch((error) => {
                        this.errorAuth = true;
                        console.warn(error);
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>