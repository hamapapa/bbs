<template>
  <div class="p-3 text-center">
    <h1 class="text-togglenav">スレッド一覧</h1>
    <div class="shadow">
      <MDBTable>
        <thead>
          <tr class="bg-togglebar text-white">
            <th>スレッドID</th>
            <th class="text-start">タイトル</th>
            <th>ユーザID</th>
            <th class="text-start">ユーザ名</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="thread in threads" v-bind:key="thread.id">
            <td>{{ thread.id }}</td>
            <td class="text-start">
              <a class="text-togglebtn" v-bind:href="'/comment/' + thread.id">{{
                thread.title
              }}</a>
            </td>
            <td>{{ thread.user_id }}</td>
            <td class="text-start">{{ thread.user.name }}</td>
          </tr>
        </tbody>
      </MDBTable>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import axios from "axios";
import { MDBTable } from "mdb-vue-ui-kit";
export default {
  setup() {
    const state = reactive({
      threads: [],
    });

    watchEffect(() => {
      axios({
        url: "http://localhost/graphql",
        method: "POST",
        data: {
          query: `
                  query {
                    threads{
                        id
                        user_id
                        title
                        user{
                          name
                        }
                    }
                  }
                `,
        },
      }).then((Response) => {
        state.threads = JSON.parse(JSON.stringify(Response.data.data.threads));
      });
    });

    return {
      ...toRefs(state),
    };
  },
  components: {
    MDBTable,
  },
};
</script>