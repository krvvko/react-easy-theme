# React Easy Theme
A simple theme management library for React applications, allowing developers to manage themes using React Context API. It supports saving themes to local storage, detecting system preferences, and applying themes to the root html element.

## Installation:

Install the package via npm or yarn:

```npm install react-easy-theme```

or

```yarn add react-easy-theme```

## Usage:

To use react-easy-theme, wrap your application with the ThemeProvider component and access the current theme or theme-switching functionality through the useTheme hook.

## Example:

Wrap your app in `<ThemeProvider>`:
```jsx
import React from 'react';
import { ThemeProvider } from 'react-easy-theme';

const App = () => { 
    return (
        <ThemeProvider themes={['light', 'dark', 'dark-blue']}> 
            <Component /> 
        </ThemeProvider> 
    ); 
};

export default App;
```
Create themes in your main css file (Note: this file should not be a module):

```css
.light {
    --bg-color: #ffffff;
    --text-color: #000000;
}

.dark {
    --bg-color: #000000;
    --text-color: #ffffff;
}

.dark-blue {
    --bg-color: #0a1229;
    --text-color: #d8dce8;
}

/* Example of usage variables, you can use them in any css element */
body {
    background: var(--bg-color);
    color: var(--text-color);
}
```
Usage of `useTheme()`:
```jsx
import React from 'react';
import { useTheme } from 'react-easy-theme';

const Component = () => {
    const { currentTheme, changeTheme, getThemes } = useTheme();
    return (
        <div>
            <h1>Current Theme: {currentTheme}</h1>
            <button onClick={() => changeTheme('dark')}>Switch to Dark</button>
            <button onClick={() => changeTheme('light')}>Switch to Light</button>
            <button onClick={() => changeTheme('dark-blue')}>Switch to Dark Blue</button>
            <p>Available themes: {getThemes().join(', ')}</p>
        </div>
    );
};

export default App;
```


## Props for `<ThemeProvider>`:
initialTheme (optional): The initial theme to use if no theme is saved in local storage. Defaults to light. detectPreferences (optional): If set to true, the system's preferred theme (dark/light) will be detected and used initially. Defaults to true. localStorageKey (optional): The key used to save the theme to local storage. Defaults to app-theme. themes (optional): An array of valid theme names. Defaults to.


### Example:
```jsx
<ThemeProvider
    localStorageKey="app-theme" // You can set key of the local storage item
    initialTheme="light" // You may use it if detectPreferences is set to false
    detectPreferences={true} // Detects user preference, and after the first load - sets the theme (light or dark)
    themes={['light', 'dark']} // possible themes (you may add additional ones), you wont be able to change the theme if its not statet here
>
    <Component />
</ThemeProvider>
```

## Values of `useTheme()`:
```jsx
const { 
    currentTheme, // react state, the current theme
    changeTheme, // function that takes new theme as a string 
    getThemes // returns an array of all possible themes
} = useTheme();
```