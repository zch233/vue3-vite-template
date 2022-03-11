import { defineComponent } from 'vue';
import HelloWorld from './HelloWorld.vue';

export default defineComponent({
  name: 'Exit',
  setup() {
    const modules = import.meta.glob('../components/*')
    console.log(modules);
    const Button = () => {
      const handleClick = () => {
        alert('hi');
      };
      return <button onClick={handleClick}>click me!</button>
    };
    return () => (
        <div>
          <p>JSXInSetup2</p>
          <Button />
          <HelloWorld msg={import.meta.env.VITE_APP_TITLE} />
        </div>
    );
  },
});