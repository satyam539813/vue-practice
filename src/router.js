import {createMemoryHistory} from "vue-router";
import {Home} from "lucide-vue-next";

const routes=[{path:"/",component:Home}];

(
    {history:createMemoryHistory(),
        routes}
);