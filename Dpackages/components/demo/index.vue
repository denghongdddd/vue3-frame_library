<script>
import {defineComponent, h} from "vue";

export default defineComponent({
    name:"demo",
    setup(){
        return{

        }
    },
    render(the){
        console.log(the,"------the--------")
        console.log({...the.$attrs})
        return h("div",{},"demo")
    },
})
</script>