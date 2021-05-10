<template>
  <div class="p-5 text-center mb-3">
    <h1>ユーザリスト</h1>
    <div v-if="users">
      <MDBTable variant="striped">
        <thead>
          <tr class="table-success">
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
import { defineComponent, reactive, toRefs, watchEffect } from "vue";
import axios from "axios";
import { MDBTable } from "mdb-vue-ui-kit";

export default defineComponent({
  setup() {
    const state = reactive({
      users: "",
    });

    watchEffect(() => {
      axios({
        url: "http://localhost/graphql",
        method: "POST",
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
