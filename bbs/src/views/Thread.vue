<template>
  <div class="p-3 text-center">
    <h1 class="text-togglenav">スレッド一覧</h1>
    <div>
      <MDBRow class="d-flex justify-content-center mb-4">
        <MDBCol
          class="col-md-6 p-3 border border-1 border-togglebar shadow rounded-3"
        >
          <MDBInput label="コメント" v-model="input.title" class="bg-white" />
          <br />
          <button
            @click="onClickCreate"
            type="button"
            class="btn btn-togglebtn"
          >
            登録
          </button>
        </MDBCol>
      </MDBRow>
    </div>
    <section class="border p-4 text-center mb-4">
      <div>
        <div class="input-group">
          <div class="form-outline">
            <MDBInput
              label="Search"
              v-model="input.searchTitle"
              class="bg-white shadow"
            />
            <!-- <input type="search" id="form1" class="form-control" /> -->
          </div>
          <button
            v-on:click="onClickSearch"
            type="button"
            class="btn btn-togglebtn"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </section>
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
              <router-link
                :to="{ name: 'Comment', params: { thread_id: thread.id } }"
                class="text-togglebtn"
                >{{ thread.title }}</router-link
              >
              <!-- <a class="text-togglebtn" v-bind:href="'/comment/' + thread.id">{{
                thread.title
              }}</a> -->
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
import { computed, watchEffect } from "@vue/runtime-core";
import axios from "axios";
import store from "../store";
import { MDBRow, MDBCol, MDBInput, MDBTable } from "mdb-vue-ui-kit";
export default {
  setup() {
    const token = computed(() => {
      return store.state.token;
    });
    const userId = computed(() => {
      return store.state.userId;
    });
    const input = reactive({
      title: "",
      searchTitle: "",
    });
    const state = reactive({
      threads: [],
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
      }).then((response) => {
        state.threads = Object.values(response.data.data.threads);
      });
    });

    const onClickCreate = () => {
      axios({
        url: "http://localhost/graphql",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        data: {
          query: `
            mutation{
              createThread(user_id: ${userId.value}, title: "${input.title}"){
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
      }).then((response) => {
        state.threads.push(response.data.data.createThread);
        input.user_id = "";
        input.title = "";
      });
    };

    const onClickSearch = () => {
      axios({
        url: "http://localhost/graphql",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        data: {
          query: `
            query {
              searchThreads(title: "%${input.searchTitle}%"){
                id
                user_id
                title
                user {
                  name
                }
              }
            }
          `,
        },
      })
        .then((response) => {
          state.threads = Object.values(response.data.data.searchThreads);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return {
      ...toRefs(state),
      input,
      onClickCreate,
      onClickSearch,
    };
  },
  components: {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBTable,
  },
};
</script>