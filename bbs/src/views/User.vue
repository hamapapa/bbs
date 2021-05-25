<template>
  <div class="p-3 text-center mb-3">
    <h1 class="text-togglenav">ユーザリスト</h1>
    <div v-if="users">
      <MDBTable class="shadow">
        <thead>
          <tr class="bg-togglebar text-white">
            <th>ID</th>
            <th>name</th>
            <th>email</th>
            <th>created_at</th>
            <th>updated_at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" v-bind:key="user.ID">
            <td v-cloak>{{ user.id }}</td>
            <td v-cloak>{{ user.name }}</td>
            <td v-cloak>{{ user.email }}</td>
            <td v-cloak>{{ user.created_at }}</td>
            <td v-cloak>{{ user.updated_at }}</td>
          </tr>
        </tbody>
      </MDBTable>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watchEffect } from "vue";
import axios from "axios";
import store from "../store";
import { MDBTable } from "mdb-vue-ui-kit";

export default defineComponent({
  setup() {
    const token = computed(() => {
      return store.state.token;
    });
    const state = reactive({
      users: "",
    });

    watchEffect(() => {
      axios({
        url: "http://localhost/graphql",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        data: {
          query: `
            query GetUsers{
              users(first: 20,page: 1){
                data{
                  id,
                  name,
                  email,
                  created_at,
                  updated_at
                }
              }
            }
          `,
        },
      })
        .then((response) => {
          const res = response.data;
          if (res.errors) {
            console.log("is errros");
            state.users = null;
            return;
          }
          state.users = JSON.parse(
            JSON.stringify(response.data.data.users.data)
          );
        })
        .catch((e) => {
          console.log(e);
        });
    });

    return {
      ...toRefs(state),
    };
  },

  components: {
    MDBTable,
  },
});
</script>
