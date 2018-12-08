<template>
    <div class="columns">
        <div class="column is-9">
            <div class="card events-card">
                <header class="card-header">
                    <p class="card-header-title">Events</p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                    </a>
                </header>
                <div class="card-table">
                    <div class="content">
                        <table class="table is-fullwidth is-striped">
                            <thead>
                                <tr>
                                    <th>Ord</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Event date</th>
                                    <th>Created</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="events != null && event.length > 0 " v-for="(e,i) in events" :key="i">
                                    <td>{{ i+1 }}</td>
                                    <td>{{{ e.name }}}</td>
                                    <td>{{{ e.desc }}}</td>
                                    <td>{{ e.notification_date }}</td>
                                    <td>{{ e.created_at }}</td>
                                    <td>
                                        <a class="button is-small is-primary" href="#" @click="edit(e)">Edit</a>
                                        <a class="button is-small is-primary" href="#" @click="delete(e)">Delete</a>
                                    </td>
                                </tr>
                                <tr v-if="events == null || event.length <= 0 ">Nothing to display</tr>
                            </tbody>
                        </table>
                    </div>    
                </div>
            </div>
            
        </div>
        <div class="column is-3">
            <div class="bd-snippet-preview ">
      
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Name" v-model="item.name">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Type</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="item.type">
                                <option>Select dropdown</option>
                                <option>With options</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea class="textarea" v-model="item.desc" placeholder="Textarea"></textarea>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <datepicker v-model="item.notification_date" placeholder="Notification date" :config="{ dateFormat: 'd-m-Y', static: true }"></datepicker>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" @click="save">Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-text">Cancel</button>
                    </div>
                </div>
                    
            </div>
        </div>
        <ul v-if="errors && errors.length">
            <li v-for="error of errors">{{error.message}}</li>
        </ul>
    </div>
</template>

<script>

import axios from 'axios'
import Datepicker from 'vue-bulma-datepicker'

export default {
    name: 'EventList',
    components: {
        Datepicker
    },
    data() {
        return {
            events: [],
            item:{
                id: null,
                name:'',
                des:'',
                notification_date:null,
                created_at: null
            },
            errors: []
        }
    },
    created () {
        this.load();
    },
    methods: {
        load: function() {
            axios.get('/api/events')
            .then(response => {
                this.events = response.data
            })
            .catch(e => {
                this.errors.push(e)
            });
        },
        add: function() {
            this.item = {
                id: null,
                name:'',
                des:'',
                notification_date:null,
                created_at: null
            };
        },
        edit: function(e) {
            this.item = e;
        },
        save: function() {
            axios.post('/api/events/create', this.item)
            .then( function(response) {

            })
            .catch( function(error) {

            } );
        },
        delete: function(e){
            axios.delete('/api/events/' + e.id)
            .then( function(response) {

            })
            .catch( function(error){

            } );
        }
    }
}
</script>
