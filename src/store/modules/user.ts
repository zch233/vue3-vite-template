import { defineStore } from "pinia";
import { computed, ref } from 'vue';

// export const useUser = defineStore({
//   // id: 必须的，在所有 Store 中唯一
//   id: "user",
//   state: ()=> ({
//     name: 'from pinia userName',
//     nickname: 'from pinia nickname',
//   }),
//   getters: {
//     fullName: state => state.name + state.nickname
//     fullName: () => this.name + this.nickname
//   },
//   actions: {
//     changeName() {
//       this.name = 'changeName userName'
//     },
//   },
// });

// 第二种写法
export const useUser = defineStore('user', () => {
  const name = ref('from pinia userName')
  const nickname = ref('from pinia nickname')
  const fullName = computed(() => name.value + nickname.value)
  const changeName = () =>  {
    name.value = 'changeName userName'
  }
  return {
    name,
    nickname,
    fullName,
    changeName,
  }
});
