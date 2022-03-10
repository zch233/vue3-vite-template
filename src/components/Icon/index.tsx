import { defineComponent } from 'vue';
import './index.less'

export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <svg class='icon' aria-hidden='true'>
        <use xlinkHref={`#icon-${props.icon}`} />
      </svg>
    );
  },
});