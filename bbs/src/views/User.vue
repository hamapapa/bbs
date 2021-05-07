<template>
  <div class="p-5 text-center">
    <h1>ユーザリスト</h1>
  </div>
  <div class="text-center">
    {{ users }}
  </div>
</template>

<script>
// import { computed, defineComponent } from "vue";
import { defineComponent, reactive, toRefs, watchEffect } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const state = reactive({
      users: "",
    });

    watchEffect(() => {
      axios
        .get("http://localhost:8080/")
        .then((response) => {
          state.users = response.data;
        })
        .catch((e) => {
          state.users = "no user";
          console.log(e);
        });
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>