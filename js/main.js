/**
 * Коллбек для задання параметрів елемента за допомогою функції {@link makeTag}
 * @callback fnParamsCallback
 * @param {HTMLElement} element Елемент, якому потрібно вказати параметри
 */

/**
 * Створення вкладених тегів
 * @param {string|object} tag Назва тегу. Наприклад 'div', 'h1' тощо. У випадку, якщо параметр має тип object, то
 * поля об'єкта мають наступне значення:
 *   tagName - назва тегу
 *   id - ID тегу
 *   className - назва класу, із пробілами в ролі роздільників, у випадку, якщо кілька класів
 *   innerHTML - innerHTML значення тегу
 *   innerText - innerText значення тегу. Якщо, цей атрибут заданий, то значення атрибуту html - буде ігноруватись
 *
 * @param {fnParamsCallback|HTMLElement} fnParams Колбек функція для задання параметрів елемента
 * У випадку, якщо функція не задана, то даний параметр буде вважатись дочірнім елементом, який додається
 * до поточного елемента
 * @param {...HTMLElement} children Дочірні елементи, які будуть додані до поточного елемента
 * @returns {HTMLElement}
 */
const makeTag = function(tag, fnParams= undefined, ...children) {
    let res;

    if (typeof tag === 'object') {
        res = document.createElement(tag.tagName || 'div');
        if(tag.id) res.id = tag.id;
        if(tag.className) res.className = tag.className;
        if(tag.innerText) {
            res.innerText = tag.innerText;
        } else if (tag.innerHTML) {
            res.innerHTML = tag.innerHTML;
        }
    } else {
        res = document.createElement(tag);
    }

    if (typeof fnParams === 'function') {
        fnParams(res);
        if (children.length) res.append(...children);
    } else if (fnParams){
        res.append(fnParams, ...children);
    } else {
        res.append(...children);
    }

    return res;
}

/**
 * Друкуємо виділений текст завдання
 * @param text
 */
const writeHeader = function(text) {
    document.body.appendChild(makeTag('p', e => {
        e.classList.add('task-header');
        e.innerText = text;
    }));
}

writeHeader(`- З масиву users за допомогою циклу витягнути адреси користувачів і записати (скопіювати) 
 їх в інший порожній масив.
`);

let users = [{
    name: 'vasya',
    age: 31,
    status: false,
    address: {city: 'Lviv', country: 'Ukraine', street: 'Shevchenko', houseNumber: 1}
}, {
    name: 'petya',
    age: 30,
    status: true,
    address: {city: 'New York', country: 'USA', street: 'East str', houseNumber: 21}
}, {
    name: 'kolya',
    age: 29,
    status: true,
    address: {city: 'Budapest', country: 'Hungary', street: 'Kuraku', houseNumber: 78}
}, {
    name: 'olya',
    age: 28,
    status: false,
    address: {city: 'Prague', country: 'Czech', street: 'Paster', houseNumber: 56}
}, {
    name: 'max',
    age: 30,
    status: true,
    address: {city: 'Istanbul', country: 'Turkey', street: 'Mikar', houseNumber: 39}
}, {
    name: 'anya',
    age: 31,
    status: false,
    address: {city: 'Rio', country: 'Brasil', street: 'Ronaldi', houseNumber: 5}
}, {
    name: 'oleg',
    age: 28,
    status: false,
    address: {city: 'Montreal', country: 'Canada', street: 'Acusto', houseNumber: 90}
}, {
    name: 'andrey',
    age: 29,
    status: true,
    address: {city: 'Quebeck', country: 'Canada', street: 'Binaro', houseNumber: 33}
}, {
    name: 'masha',
    age: 30,
    status: true,
    address: {city: 'Moscow', country: 'Russia', street: 'Gogolia', houseNumber: 1}
}, {
    name: 'olya',
    age: 31,
    status: false,
    address: {city: 'Portland', country: 'USA', street: 'Forest str', houseNumber: 4}
}, {
    name: 'max',
    age: 31,
    status: true,
    address: {city: 'Cairo', country: 'Egypt', street: 'Seashore', houseNumber: 45}
}];

const userAddresses = users.reduce((acc,val) => acc.push(val.address) && acc, []);

document.body.appendChild(makeTag({innerText: JSON.stringify(userAddresses)}));

writeHeader(`- За допомоги циклу проітерувати  масив users, записати кожного юзера в сівй блок за 
допомоги document.createElement. Всі данні в одному блоці.
`);

const layout0 = makeTag('div', e => e.classList.add('layout'));
const margin0 = e => e.style.margin = '5px';

for (const user of users) {
    layout0.appendChild(
        makeTag({
            className: 'layout-card layout-body',
            innerHTML: `
<b>name</b>: ${user.name}<br>
<b>age</b>: ${user.age}<br>
<b>status</b>: ${user.status}<br>
<b>city</b>: ${user.address.city} <br>
<b>country</b>: ${user.address.city} <br>
<b>street</b>: ${user.address.city} <br>
<b>house number</b>: ${user.address.houseNumber}
            `
        }, margin0)
    )
}
document.body.appendChild(layout0);

/*******************************************************************************/

writeHeader(`- За допомоги циклу проітерувати  масив users, записати кожного юзера в сівй блок за допомоги document.createElement,
  розділивши всі властивості по своїм блокам (div>div*4)
`);

const layout1 = makeTag('div', e => e.classList.add('layout'));
const margin1 = e => e.style.margin = '5px';

for (const user of users) {
    layout1.appendChild(
        makeTag({ className: 'layout-card layout-body' },
            makeTag({ className: 'layout-body', innerHTML: `<b>name</b>: ${user.name}` }, margin1),
            makeTag({ className: 'layout-body', innerHTML: `<b>age</b>: ${user.age}` }, margin1),
            makeTag({ className: 'layout-body', innerHTML: `<b>status</b>: ${user.status}` }, margin1),
            makeTag({ className: 'layout-body', innerHTML: `<b>city</b>: ${user.address.city}` }, margin1),
            makeTag({ className: 'layout-body', innerHTML: `
<b>country</b>: ${user.address.city}<br>
<b>street</b>: ${user.address.city}<br>
<b>house number</b>: ${user.address.houseNumber}
            ` }, margin1)
        )
    )
}
document.body.appendChild(layout1);

/*******************************************************************************/

writeHeader(`- За допомоги циклу проітерувати  масив users, записати кожного юзера в сівй блок за допомоги document.createElement,
  розділивши всі властивості по своїм блокам , блок з адресою зробити окремим блоком, з блоками для кожної властивості
`);

const layout2 = makeTag('div', e => e.classList.add('layout'));
const margin2 = e => e.style.margin = '5px';

for (const user of users) {
    layout2.appendChild(
        makeTag({ className: 'layout-card layout-body' },
            makeTag({ className: 'layout-body', innerHTML: `<b>name</b>: ${user.name}` }, margin2),
            makeTag({ className: 'layout-body', innerHTML: `<b>age</b>: ${user.age}` }, margin2),
            makeTag({ className: 'layout-body', innerHTML: `<b>status</b>: ${user.status}` }, margin2),
            makeTag({ className: 'layout-body', innerHTML: `<b>city</b>: ${user.address.city}` }, margin2),

            makeTag({ className: 'layout-body' }, margin2,
                makeTag({ className: 'layout-body', innerHTML: `<b>country</b>: ${user.address.city}` }, margin2 ),
                makeTag({ className: 'layout-body', innerHTML: `<b>street</b>: ${user.address.city}` }, margin2 ),
                makeTag({ className: 'layout-body', innerHTML: `<b>house number</b>: ${user.address.houseNumber}` }, margin2 )
            )
        )
    )
}
document.body.appendChild(layout2);

/*******************************************************************************/

writeHeader(`- є сторінка rules.html. Контентом сторінки є заголовки та параграфи. 
Заголовки (h2) характеризують тему контенту яка вказана в параграфі.
створити скріпт, котрий зчитує всі заголовки, та робить в блоці з id=content з них список(ul>li),
який буде змістом того, що знаходиться на сторінці.
Скріпт повинен працювати навіть якщо кількість блоків з заголовком та параграфом зміниться.
`);

document.body.appendChild(makeTag('pre', n => {
    n.style.color = 'red';
    n.innerText = ` *** Додав цю процедуру до rules.html `}));

/*******************************************************************************/

writeHeader(`-Є масив котрий характеризує правила. Створити скрипт який ітерує цей масив, та робить з 
кожне правило в окремому блоці.
При цому в блоці, номер правила записати в свій блок, текст правила записати в свій окремий блок.
Результатом відпрацювання скріпта повинна бути структура яка міститься в блоці wrap файла rule.html
`);

let rules = [
    {
        title: 'Первое правило Бойцовского клуба.',
        body: 'Никому не рассказывать о Бойцовском клубе.'
    },
    {
        title: 'Второе правило Бойцовского клуба.',
        body: 'Никогда никому не рассказывать о Бойцовском клубе.'
    },
    {
        title: 'Третье правило Бойцовского клуба.',
        body: 'В схватке участвуют только двое.'
    },
    {
        title: 'Четвертое правило Бойцовского клуба.',
        body: 'Не более одного поединка за один раз.'
    },
    {
        title: 'Пятое правило Бойцовского клуба.',
        body: 'Бойцы сражаются без обуви и голые по пояс.'
    },
    {
        title: 'Шестое правило Бойцовского клуба.',
        body: 'Поединок продолжается столько, сколько потребуется.'
    },
    {
        title: 'Седьмое правило Бойцовского клуба.',
        body: 'Если противник потерял сознание или делает вид, что потерял, или говорит «Хватит» — поединок окончен.'
    },
    {
        title: 'Восьмое и последнее правило Бойцовского клуба.',
        body: 'Новичок обязан принять бой.'
    },

];

const wrapTag = makeTag({ id: 'wrap'});

for (let i = 0; i < rules.length; i++) {
    const { title, body } = rules[i];

    wrapTag.appendChild(makeTag({ className: 'rules rule' + (i + 1) },
        makeTag({ tagName: 'h2', innerText: title }),
        makeTag({ tagName: 'p', innerText: body })
    ));
}

document.body.appendChild(wrapTag);