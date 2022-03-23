import Icon from '@src/components/Icon';
import Exit from '@src/views/Demo/components/Exit';
import { defineComponent } from 'vue';
import logo from '@src/assets/logo.png'


export default defineComponent({
  name: 'TSX',
  setup(props) {
    return () => (
      <div>
        <Icon icon={'empty'} />
        <Exit />
        <img alt="Vue logo" src={logo} />
      </div>
    )
  },
});
