# Exemplary Project <!-- omit in toc -->
[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ricardani/exemplary-project/blob/master/LICENSE)
[![](https://github.com/ricardani/exemplary-project/workflows/Lint/badge.svg)](https://github.com/ricardani/exemplary-project/actions)
[![](https://github.com/ricardani/exemplary-project/workflows/Unit%20Tests/badge.svg)](https://github.com/ricardani/exemplary-project/actions)
[![](https://github.com/ricardani/exemplary-project/workflows/Mutation%20Tests/badge.svg)](https://github.com/ricardani/exemplary-project/actions)
[![](https://github.com/ricardani/exemplary-project/workflows/Firebase%20Deploy/badge.svg)](https://github.com/ricardani/exemplary-project/actions)

This will be my attempt to have a single project where I can add every development tool I think it should be necessary in a frontend project.

## Table of Contents <!-- omit in toc -->

- [Bundler](#bundler)
  - [Webpack](#webpack)
- [Linting](#linting)
- [Testing](#testing)
  - [Unit Testing](#unit-testing)
  - [Mutation Testing](#mutation-testing)

## Bundler

### Webpack

The main purpose of [webpack](https://github.com/webpack/webpack) is to be a module bundler but I will also use it to:
* Transpile `es6` code to became browser compatible
* Compile `scss` into `css`
* Create a dev server for development

#### Examples <!-- omit in toc -->

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

## Linting

Linting lets you analyse your code for programmatic or styling errors (e.g. unused variable or missing indentation).
One of the benefits of using linters is keeping the style of the code consistent. This is really useful when you work in teams because it enforces a styling standard for everyone and, consequently, it will improve the maintainability of the project because it's easier to read.
In this project I'm using [eslint](https://github.com/eslint/eslint) for javascript and [stylelint](https://github.com/stylelint/stylelint) for sass.

#### Examples <!-- omit in toc -->

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

## Testing

### Unit Testing

Unit testing is a type of test that focus on a single unit of code.
This unit refers to smallest block of testable code in your application.

This testing method is useful to keep your application consistent by defining test cases that will guarantee effectiveness of your current code and that future development don't change the previous behavior.

In this project I will be using [Jest](https://github.com/facebook/jest) as my unit testing tool and you can check my configuration [here](https://github.com/ricardani/exemplary-project/blob/master/tools/jest/jest.config.js).

#### Examples <!-- omit in toc -->

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

### Mutation Testing

If your unit tests will guarantee that your code will work as intended, what will validate your unit tests?

You could answer that most unit testing tools already provides a mechanism to validate if you are testing every part of your code, this mechanism is called code coverage.

But one problem with code coverage is that you can't know for sure that the coverage that you are seeing represents the code that was tested. Code coverage only reports the blocks of code that were executed during the tests, it doesn't know if you have the correct expectations.

In the code bellow we see an example that could give 100% coverage to a function but because it does not expect anything the test becomes meaningless.

```js
describer('awesomeFunction', () => {
    it('should call awesomeFunction', () => {
        awesomeFunction();
    });
});
```

Mutation testing could solve this issue by making small changes in your code (this new version of the code is called a mutant) and then running the unit tests. Even a small change could result in a totally different behavior, so if your unit tests continue to pass after this change you will need to review what the unit test is in fact testing.

In this project I will be using [Stryker](https://stryker-mutator.io/) as my mutation testing tool and you can check my configuration [here](https://github.com/ricardani/exemplary-project/blob/master/tools/stryker/stryker.conf.js).

#### Examples <!-- omit in toc -->

Imagine that you have a simple function that tells if a number is greater than zero:

```js
function isNumberGreaterThanZero(number) {
    return number > 0;
}
```

And to test this you have the following unit tests: 

```js
describer('isNumberGreaterThanZero', () => {
    it('should be true for 1', () => {
        expect(isNumberGreaterThanZero(1)).toEqual(true);
    });

    it('should be false for -1', () => {
        expect(isNumberGreaterThanZero(-1)).toEqual(false);
    });
});
```

If you check the coverage report on this function it will give 100%, but now enters the mutation testing and makes the following change:

```js
function isNumberGreaterThanZero(number) {
    return number >= 0;
}
```

By just adding the ```=``` the code has a different meaning but the tests continue to pass.
You could argue that this would never happen because if the ```0``` is the boundary we should test it and you are right, but imagine that you have a really complex function, knowing what you should test sometimes is not easy and if you only follow what is reported on the coverage analysis you could be making a mistake.

#### Problems <!-- omit in toc -->

I've been using this tool in several of my projects but it has two major problems.

First are what they call equivalent mutants. These happen when the mutation testing tool makes a change in your code but the end result will be the same. For example:

```js
for (let i = 0; i < itemList.length; i++) {
    if (i === 10) {
        break;
    }
    // Some code
}
```

```js
for (let i = 0; i < itemList.length; i++) {
    if (i >= 10) {
        break;
    }
    // Some code
}
```

In this case the change will not lead to a different behavior. This could be easily caught by an human eye but by an automatic process is more complex, because it will only know that a change was made and, if a change was made and all the tests passed that means you need to review your unit tests.

As you can see this would be impossible because you can´t write a test that passes on the first example but fails on the second.

This already happened to my team and our "solution" was to rewrite that piece of code. This isn't a good solution because you shouldn't rewrite your code because of a testing tool.

The second problem is the performance issue. 
Lets imagine that your unit tests take 1 minute to finish and when you run the mutation testing tool it generates 600 mutants. 
As you can already tell if for every mutant it needs to run all the unit tests it would take 600 minutes (10 hours) to finish.
This would be for the worst scenario where for every mutant all the unit test would pass. 
Even if in reality it took "only" 1 hour it would still be a lot of time to run this task.

There isn't a straightforward solution for this problem but what most mutation testing tools do is to run several tests in parallel. 
This will considerably reduce the time it takes to finished but it will still take more time than we wish for.

Some "solved" this by running it for example once a week, then checking the mutation report for any mutant that wasn't caught, but this, at least for me, is not a good solution because, from my experience, if this kind of tasks are not checked on every merge request they are not mandatory and when something is not mandatory and you only receive a report once a week this kind of work starts to pile up and then no one wants to check, for example, 100 mutants that weren't caught by the unit tests.

My team tried to implement a kind of incremental analysis using git (at the time I'm writing this it's still not available on [Stryker](https://stryker-mutator.io/)).
We first needed to guarantee that in our current code every mutant was caught, then we checked which files were changed in the current branch and only the mutation tool on those files.

// TODO: Add incremental analysis config
