<template>
    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                persistent
                max-width="300"
        >
            <v-card>
                <v-card-title>
                    Вы действительно хотите удалить контакт?
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="$emit('close')"
                    >
                        Нет
                    </v-btn>
                    <v-btn
                            color="red darken-1"
                            text
                            @click="$emit('delete')"
                    >
                        Да
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "ConfirmModal",
        props: {
            dialog: Boolean,
        },
    }
</script>

<style scoped>

</style>