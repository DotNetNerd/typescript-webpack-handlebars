import * as template from 'template/person.hbs';
import * as styles from 'css/person.css';

document.body.innerHTML += template({styles: styles});

console.log(template);
console.log(styles);