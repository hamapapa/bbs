<template>
  <div class="text-center">
    <h1>{{ title }}#{{ thread_id }}</h1>
    <MDBContainer>
      <template v-for="(comment, index) in comments" v-bind:key="comment.id">
        <!-- <MDBRow class="mt-4" v-if="comment.deleted_at"> -->
        <MDBRow class="mt-4" v-if="!comment.deleted_at">
          <MDBCol col="2"></MDBCol>
          <MDBCol col="8">
            <MDBCard
              class="bg-togglebar text-white shadow-5 rounded-3"
              style="width: 100%"
            >
              <MDBCardBody>
                <MDBCardTitle class="border-bottom border-white">
                  {{ comment.user.name }}</MDBCardTitle
                >
                <MDBCardText class="text-start">
                  {{ comment.comment }}
                  <p>{{ comment.updated_at }}</p>
                </MDBCardText>
                <MDBBtn
                  v-on:click="onClickDelete(comment.id, index)"
                  color="white"
                  >削除</MDBBtn
                >
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol col="2"></MDBCol>
        </MDBRow>
      </template>
      <div class="my-4">
        <MDBRow class="mt-4">
          <MDBCol col="4"></MDBCol>
          <MDBCol
            col="4"
            class="p-3 border border-1 border-togglebar shadow rounded-3"
          >
            <MDBInput
              label="ユーザID"
              v-model="input.user_id"
              class="mb-3 bg-white"
            />
            <MDBInput
              label="コメント"
              v-model="input.comment"
              class="bg-white"
            />
            <br />
            <button
              @click="onClickCreate"
              type="button"
              class="btn btn-togglebtn"
            >
              登録
            </button>
          </MDBCol>
          <MDBCol col="4"></MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { computed, watchEffect } from "@vue/runtime-core";
import axios from "axios";
import store from "../store";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBContainer,
} from "mdb-vue-ui-kit";
export default {
  setup(props) {
    const token = computed(() => {
      return store.state.token;
    });
    const state = reactive({
      title: "",
      comments: [],
    });

    const input = reactive({
      user_id: "",
      comment: "",
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
              thread(id: ${props.thread_id}){
                id
                user_id
                title
                comments {
                  id
                  user_id
                  comment
                  deleted_at
                  updated_at
                  user{
                    name
                  }
                }
              }
            }
          `,
        },
      })
        .then((response) => {
          const data = response.data.data.thread;
          state.title = data.title;
          state.comments = Object.values(response.data.data.thread.comments);
        })
        .catch((e) => {
          console.log(e);
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
            mutation {
              createComment(
                thread_id: ${props.thread_id}
                user_id: ${input.user_id}
                comment: "${input.comment}"
              ){
                id
                user_id
                comment
                updated_at
                user{
                  name
                }
              }
            }
          `,
        },
      })
        .then((response) => {
          state.comments.push(response.data.data.createComment);

          // state.thread.splice(0, state.thread.length);
          // state.thread.push(GetThread());
          input.user_id = "";
          input.comment = "";
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const onClickDelete = (comment_id, index) => {
      const dt = new Date();
      const y = dt.getFullYear();
      const m = (dt.getMonth() + 1).toString().padStart(2, "0");
      const d = dt.getDate().toString().padStart(2, "0");
      const hh = dt.getHours().toString().padStart(2, "0");
      const mm = dt.getMinutes().toString().padStart(2, "0");
      const ss = dt.getSeconds().toString().padStart(2, "0");
      const deleted_at = `${y}-${m}-${d} ${hh}:${mm}:${ss}`;

      axios({
        url: "http://localhost/graphql",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        data: {
          query: `
             mutation {
               deleteComment(
                  id: ${comment_id}
                  deleted_at: "${deleted_at}"
               ){
                  id
                  user_id
                  comment
                  deleted_at
                  updated_at
                  user{
                    name
                  }
               }
             }

          `,
        },
      })
        .then((response) => {
          state.comments[index] = response.data.data.deleteComment;
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return {
      ...toRefs(state),
      input,
      onClickCreate,
      onClickDelete,
    };
  },
  props: {
    thread_id: {
      type: String,
    },
  },
  components: {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBContainer,
  },
};
</script>