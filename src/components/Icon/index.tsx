import { defineComponent } from 'vue';
import { Svg } from '@src/components/Icon/style';

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
      <Svg aria-hidden='true'>
        <use xlinkHref={`#icon-${props.icon}`} />
      </Svg>
    );
  },
});