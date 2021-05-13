<template>
  <div class="text-center">
    <h1>{{ title }}#{{ thread_id }}</h1>
    <MDBContainer>
      <template v-for="comment in comments" v-bind:key="comment.id">
        <MDBRow class="mt-4">
          <MDBCol col="2"></MDBCol>
          <MDBCol col="8">
            <MDBCard style="width: 100%">
              <MDBCardBody>
                <MDBCardTitle>{{ comment.user.name }}</MDBCardTitle>
                <MDBCardText class="text-start">
                  {{ comment.comment }}
                  <p>{{ comment.updated_at }}</p>
                </MDBCardText>
                <MDBBtn color="danger">削除</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol col="2"></MDBCol>
        </MDBRow>
      </template>
      <div class="my-4">
        <MDBRow class="mt-4">
          <MDBCol col="4"></MDBCol>
          <MDBCol col="4">
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
              class="btn btn-primary"
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
import { watchEffect } from "@vue/runtime-core";
import axios from "axios";
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
          console.log(state.comments);
        })
        .catch((e) => {
          console.log(e);
        });
    });

    const onClickCreate = () => {
      axios({
        url: "http://localhost/graphql",
        method: "POST",
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
          console.log("create comment response");
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

    return {
      ...toRefs(state),
      input,
      onClickCreate,
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