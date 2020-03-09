import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import {Steps,Step,Backtop,FormItem,RadioGroup,Radio,Form,Input,
    Button,Select,Option,Collapse,CollapseItem,Breadcrumb,
    BreadcrumbItem,Avatar,Table,TableColumn,Pagination} from "element-ui";
Vue.component(Steps.name,Steps);
Vue.component(Step.name,Step);
Vue.use(Backtop);
Vue.use(Button);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Form);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Avatar);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);