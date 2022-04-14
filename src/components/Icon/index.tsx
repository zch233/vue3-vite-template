import { defineComponent } from 'vue';
import './style.less';

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
            <svg class='gupoIcon' aria-hidden='true'>
                <use xlinkHref={`#icon-${props.icon}`} />
            </svg>
        );
    },
});
