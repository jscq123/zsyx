import Vue from 'vue'
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  InputNumber,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Icon,
  Row,
  Col,
  Upload,
  Container,
  Main,
  Link,
  Loading,
  Message,
  Radio
} from 'element-ui'
import axios from 'axios'
import HighchartsVue from 'highcharts-vue'
import VueClipboard from 'vue-clipboard2'

// 为了实现Class的私有属性
const showMessage = Symbol('showMessage')
/** 
 *  重写ElementUI的Message
 *  single默认值true，因为项目需求，默认只弹出一个，可以根据实际需要设置
 */
class DonMessage {
  success(options, single = true) {
    this[showMessage]('success', options, single)
  }
  warning(options, single = true) {
    this[showMessage]('warning', options, single)
  }
  info(options, single = true) {
    this[showMessage]('info', options, single)
  }
  error(options, single = true) {
    this[showMessage]('error', options, single)
  }

  [showMessage](type, options, single) {
    if (single) {
      // 判断是否已存在Message
      if (document.getElementsByClassName('el-message').length === 0) {
        Message[type](options)
      }
    } else {
      Message[type](options)
    }
  }
}

export default () => {
  Vue.use(Pagination);
  Vue.use(Dialog);
  Vue.use(Autocomplete);
  Vue.use(Dropdown);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  Vue.use(Input);
  Vue.use(InputNumber);
  Vue.use(Checkbox);
  Vue.use(CheckboxButton);
  Vue.use(CheckboxGroup);
  Vue.use(Switch);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(OptionGroup);
  Vue.use(Button);
  Vue.use(ButtonGroup);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Tabs);
  Vue.use(TabPane);
  Vue.use(Icon);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Upload);
  Vue.use(Container);
  Vue.use(Radio);
  Vue.use(Main);
  Vue.use(Link);

  Vue.use(Loading.directive);

  // 命名根据需要，DonMessage只是在文章中使用
  Vue.prototype.$message = new DonMessage();
  Vue.config.productionTip = false;
  Vue.use(VueClipboard);
  Vue.prototype.axios = axios;
  Vue.use(HighchartsVue)
}
