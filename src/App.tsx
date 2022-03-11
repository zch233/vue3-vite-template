import { defineComponent } from 'vue';
import Exit from '@src/components/Exit';
import styled from 'vue3-styled-components';
import logo from './assets/logo.png'
import Icon from '@src/components/Icon';

const Wrapper = styled.div`
  text-align: center;
`

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
      <Wrapper>
        <Icon icon={'empty'} />
        <Exit />
        <img alt="Vue logo" src={logo} />
      </Wrapper>
    )
  },
});

