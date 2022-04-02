import Icon from '@src/components/Icon';
import Exit from '@src/views/Demo/components/Exit';
import { defineComponent } from 'vue';
import logo from '@src/assets/logo.png';
import { useUser } from '@src/store/modules/user';
import { storeToRefs } from 'pinia';

export default defineComponent({
    name: 'Tsx',
    setup(props) {
        const user = useUser();
        const { fullName } = storeToRefs(user);
        return () => (
            <div>
                <h2>
                    vuex: {fullName.value}
                    {user.fullName}
                </h2>
                <Icon icon={'empty'} />
                <Exit />
                <img alt='Vue logo' src={logo} onClick={() => user.changeName()} />
            </div>
        );
    },
});
