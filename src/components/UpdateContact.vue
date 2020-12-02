<template>
    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
        >
            <v-card>
                <v-card-title>
                    <span class="headline">{{title}}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                                class="text-center"
                        >
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                            label="Имя*"
                                            v-model="name"
                                            :rules="notEmpty"
                                            required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            label="Email*"
                                            v-model="email"
                                            :rules="validEmail"
                                            required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            label="Телефон*"
                                            :rules="validPhone"
                                            v-model="phone"
                                            v-mask="maskPhone"
                                            required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="close()"
                            >
                                Закрыть
                            </v-btn>
                            <v-btn
                                    color="blue darken-1"
                                    :disabled="!valid"
                                    text
                                    @click.prevent="save()"
                            >
                                Сохранить
                            </v-btn>
                        </v-form>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import { mask } from 'vue-the-mask'

    export default {
        directives: {
            mask,
        },
        name: "UpdateContact",
        data: () => ({
            name: '',
            email: '',
            phone: '',
            valid: true,
            maskPhone: '+#(###)-###-##-##',
            notEmpty: [
                v => !!v || 'Поле обязательно к заполнению',
            ],
            validPhone: [
                v => !!v || 'Поле обязательно к заполнению',
                v => /.{3}-.{3}-.{2}-.{2}/.test(v) || 'Не полный номер телефона',
            ],
            validEmail: [
                v => !!v || 'Поле обязательно к заполнению',
                v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || 'Не корректный email',
            ]

        }),
        props: {
            contact: Object,
            dialog: Boolean,
            title: String
        },
        mounted() {
            this.setAttributes();
        },
        watch: {
            contact() {
                this.setAttributes();
            }
        },
        methods: {
            setAttributes() {
                this.name = this.contact.name;
                this.email = this.contact.email;
                this.phone = this.contact.phone;
            },
            save() {
                if (this.$refs.form.validate()) {
                    this.contact.name = this.name;
                    this.contact.email = this.email;
                    this.contact.phone = this.phone.replace(/([-()]+)/g, '');
                    this.$emit('save', this.contact);
                }
            },
            close() {
                this.setAttributes();
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>

</style>