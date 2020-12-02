<template>
    <v-card
            class="mx-auto"
    >
        <v-toolbar
                color="pink"
                dark
        >
            <v-toolbar-title>Список контактов</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                            @click="updateContact()"
                    >
                        <v-icon aria-hidden="false">
                            mdi-note-plus
                        </v-icon>
                    </v-btn>
                </template>
                <span>Добавить контакт</span>
            </v-tooltip>
            <v-col class="d-flex">
                <v-text-field
                        v-model="searchValue"
                        light
                        solo hide-details
                        placeholder="Поиск..."
                ></v-text-field>
            </v-col>
        </v-toolbar>

        <v-list two-line>
            <v-list-item-group active-class="pink--text">
                <template v-for="(contact, index) in collection">
                    <v-list-item
                            :key="contact.title"
                            @click="getInfoContact(contact.id)"
                    >
                        <template>
                            <v-list-item-content>
                                <v-list-item-title v-text="contact.name"></v-list-item-title>

                                <v-list-item-subtitle
                                        class="text--primary"
                                        v-text="contact.email"
                                ></v-list-item-subtitle>

                                <v-list-item-subtitle v-text="contact.phone"></v-list-item-subtitle>
                            </v-list-item-content>
                        </template>
                    </v-list-item>

                    <v-divider
                            v-if="index < collection.length - 1"
                            :key="index"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-list>
        <UpdateContact :dialog="showUpdateContact" :title="title" :contact="contact"
                       @close="showUpdateContact = false" @save="save"></UpdateContact>
    </v-card>
</template>

<script>
    import {mapGetters} from 'vuex'
    import UpdateContact from './UpdateContact'
    import Contact from '../models/Contact'

    export default {
        name: "ListContacts",
        components: {
            UpdateContact
        },
        data: () => ({
            searchValue: '',
            showUpdateContact: false,
            title: '',
            contact: {}
        }),
        computed: {
            ...mapGetters(['getAllContacts']),
            collection() {
                if (this.searchValue.trim()) {
                    return this.getAllContacts.filter(contact => {
                        if (contact.name.toLowerCase().includes(this.searchValue.toLowerCase().trim())) return contact;
                        if (contact.email.toLowerCase().includes(this.searchValue.toLowerCase())) return contact;
                        if (contact.phone.toLowerCase().includes(this.searchValue.toLowerCase())) return contact;
                    });
                } else {
                    return this.getAllContacts;
                }
            },
        },
        methods: {
            getInfoContact(id) {
                const selected = this.getAllContacts.find(contact => contact.id === id);
                if (selected) {
                    this.$emit('setSelectedContact', selected);
                }
            },
            updateContact() {
                this.contact = new Contact();
                this.title = 'Добавить контакт';
                this.showUpdateContact = true;
            },
            save(data) {
                this.showUpdateContact = false;
                this.$emit('save', data);
            }
        }
    }
</script>

<style scoped>

</style>