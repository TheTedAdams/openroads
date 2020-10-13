## Getting started.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app),
as such it requires Node >= 6. It also uses [yarn](https://yarnpkg.com/en/) to install dependencies, (though `NPM` might
work... we haven't tested.)

## Explanation

This is a simple "starter" project, with a few things that need implementing,
and a few others that are implemented poorly.

This uses React, so a prior knowledge of React will help, but is not necessary.
There is enough scaffolding here, that familiarity with HTML, CSS, JavaScript
and some prior experience with some kind of HTML templating tool should be all you need.

Follow the Trail of TODOs and fix things the best way you see fit.
When you are done, please zip up and return any files that you changed at the project root,
and of course within the `src` directory.

## Exercises

1.  Fetch "Notes" from the dev server backend, at end-point `/notes`, and update the App state.
2.  Ensure all variables have correct type annotations.
    2.a You may need to create new interfaces/types, you can do so in a types.ts file
3.  Update App.scss to take advantage of SCSS features, You can rework the scss in any way you find appropriate. Ensure you've updated your markup to match the new SCSS
4.  Split the the large App component into separate components.
5.  Fix the layout, so the note-selection Sidebar appears left of the note details, instead of above it.
6.  Fix header so readout of unread notes is correct.
7.  Fix menu selection class assignment, so selected row is always highlighted.

##### Bonus: Write unit tests for the new components you created, using Jest's snapshot-testing.
