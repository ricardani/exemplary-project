# Exemplary Project
[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ricardani/exemplary-project/blob/master/LICENSE)
[![](https://github.com/ricardani/exemplary-project/workflows/Unit%20Tests/badge.svg)](https://github.com/ricardani/exemplary-project/actions)
[![](https://github.com/ricardani/exemplary-project/workflows/Lint/badge.svg)](https://github.com/ricardani/exemplary-project/actions)
[![](https://github.com/ricardani/exemplary-project/workflows/Mutation%20Tests/badge.svg)](https://github.com/ricardani/exemplary-project/actions)

This will be my attempt to have a single project where I can add every development tool I think it should be necessary in a frontend project.

## Table of Contents

* [Webpack](#webpack)
* [Linting](#linting)
* [Unit Testing](#unit-testing)

### Webpack

The main purpose of [webpack](https://github.com/webpack/webpack) is to be a module bundler but I will also use it to:
* Transpile `es6` code to became browser compatible
* Compile `scss` into `css`
* Create a dev server for development

#### Examples

In the example bellow we can see a rule to load style into our code. The `loaders` are read from right to left so in this case the following will happen:
* `sass-loader` will compile sass/scss files into css
* `css-loader` will bundle all css and resolve `@import` and `url()`
* `style-loader` will inject css into the DOM 
```js
module: {  
    rules: [  
        {  
            test: /\.(sa|sc|c)ss$/,  
            use: ['style-loader', 'css-loader', 'sass-loader']  
        }  
    ]  
}
```

In the following example you can see a small configuration for the dev server. In this config I defined the url for my application to be `http://0.0.0.0:9000/` and for it to have `hot reload`.
```js
devServer: {  
    host: '0.0.0.0',  
    port: 9000,  
    hot: true,  
}
```

You can check my full configuration [here](https://github.com/ricardani/exemplary-project/tree/master/tools/webpack).

### Linting

Linting lets you analyse your code for programatic or styling erros (e.g. unused variable or missing indentation).
One of the benefits of using linters is keeping the style of the code consistent. This is really useful when you work in teams because it enforces a styling standard for everyone and, consequently, it will improve the maintainability of the project because it's easier to read.
In this project I'm using [eslint](https://github.com/eslint/eslint) for javascript and [stylelint](https://github.com/stylelint/stylelint) for sass.

#### Examples

The setup phase is really complicated because you never know what rules to add. Some plugins lets you extend a predefined set of rules. I like to use the `airbnb` rules and then change those that I don't like.

```js
"extends": ["airbnb", "airbnb/hooks"]
```

One rule that I always change is the `indent` one. The `airbnb` rules set it to 2 spaces but I feel that it's not enough so I change it to 4.

```js
"rules": {  
    "indent": ["error", 4]  
}
```

You can check my full configuration for javascript [here](https://github.com/ricardani/exemplary-project/blob/master/.eslintrc) and for sass [here](https://github.com/ricardani/exemplary-project/blob/master/.stylelintrc)

### Unit Testing

Unit testing is a type of test that focus on a single unit of code.
This unit refers to smallest block of testable code in your application.

This testing method is useful to keep your application consistent by defining test cases that will guarantee effectiveness of your current code and that future development don't change the previous behaviour.

In this project I will be using [Jest](https://github.com/facebook/jest) as my unit testing tool.

#### Examples

This is a small example to test the sum of two values
```js
describe('Sum test', () => {
    it('should return the correct sum', () => {
        expect(2 + 2).toEqual(4);
    });
});
```

Jest allows you to do snapshot testing.
This means, for example, if you want to test the result of a rendered component you can do it like this:
```js
describe('Render', () => {
    it('should render correctly', () => {
        expect(enzyme.shallow(<App />)).toMatchSnapshot();
    });
});
```

One thing you need to take into consideration while writing unit tests is to mock your dependencies.
This will help you focus on the block of code you are testing without worrying about what the dependencies will do.
```js
// Mocks everything from awesome-util file
jest.mock('../utils/awesome-util');
 
// Only mocks the methodA from awesome-util file
jest.mock('../utils/awesome-util', () => ({
    ...jest.requireActual('../utils/awesome-file'),
    methodA: jest.fn().mockReturnValue(true) //Returns true every time it's called
}));
```
