<template>
  <!-- <MDBContainer> -->
  <div class="home container">
    <!-- <Header /> -->
    <div class="p-5 text-center">
      <h1>
        Material Design for Bootstrap 5 & Vue 3と
        GraphQL（Laravel）で掲示板を作ってみる
      </h1>
    </div>
    <p>tharber@example.net</p>
    <div v-if="isLogined">
      <h2 class="text-center">ようこそ {{ userName }} 様</h2>
    </div>
    <div v-else>
      <MDBRow class="d-flex justify-content-center mb-4">
        <MDBCol
          class="col-md-6 p-3 border border-1 border-togglebar shadow rounded-3"
        >
          <form>
            <div v-show="hasError" class="alert alert-danger" role="alert">
              メールアドレスまたは、パスワードが一致しません。
            </div>

            <MDBInput
              label="email"
              type="email"
              v-model="email"
              class="mb-3 bg-white"
            />
            <MDBInput
              label="password"
              type="password"
              v-model="password"
              class="mb-3 bg-white"
            />
            <div class="text-center pt-4">
              <button
                @click="onClickLogin"
                type="button"
                class="btn btn-togglebtn"
              >
                ログイン
              </button>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </div>
    <!-- </MDBContainer> -->
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import axios from "axios";
import store from "../store";
import { MDBRow, MDBCol, MDBInput } from "mdb-vue-ui-kit";
import { computed } from "@vue/runtime-core";
// import Header from "../components/Header";
export default {
  name: "Home",
  setup() {
    const isLogined = computed(() => {
      return store.state.isLogined;
    });
    const userName = computed(() => {
      return store.state.userName;
    });
    const input = reactive({
      email: "",
      password: "",
    });
    const state = reactive({
      hasError: false,
    });

    const onClickLogin = () => {
      state.hasError = false;
      axios({
        url: "http://localhost/graphql",
        method: "POST",
        data: {
          query: `
            mutation {
              login(email:"${input.email}", password:"${input.password}"){
                token
                user{
                  name
                }
              }
            }
          `,
        },
      })
        .then((response) => {
          const data = response.data.data.login;
          if (data == null) {
            state.hasError = true;
            return;
          }
          input.email = "";
          input.password = "";

          store.commit("login", {
            token: data.token,
            userName: data.user.name,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return {
      isLogined,
      userName,
      ...toRefs(input),
      ...toRefs(state),
      onClickLogin,
    };
  },
  components: {
    MDBRow,
    MDBCol,
    MDBInput,
  },
};
</script>
