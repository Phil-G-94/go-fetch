# Food order app 

- Built as part of Max Schwartzmueller's React - The Complete Guide course

- Issue with React Context, specifically within Cart component. cartCtx.totalAmount.toFixed(2) returns undefined 
when it should return the total dollar amount of all the items added to cart. 

Error log 

React-dom.development.js:18687 The above error occurred in the <Cart> component:

    at Cart (http://localhost:5173/src/components/Cart/Cart.jsx?t=1682540832744:23:19)
    at CartProvider (http://localhost:5173/src/store/CartProvider.jsx:36:43)
    at App (http://localhost:5173/src/App.jsx?t=1682540686194:25:41)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ react-dom.development.js:18687
Show 1 more frame
react-dom.development.js:12056 Uncaught TypeError: Cannot read properties of undefined (reading 'toFixed')
    at Cart (Cart.jsx:9:49)
    at renderWithHooks (react-dom.development.js:16305:18)
    at mountIndeterminateComponent (react-dom.development.js:20074:13)
    at beginWork (react-dom.development.js:21587:16)
    at beginWork$1 (react-dom.development.js:27426:14)
    at performUnitOfWork (react-dom.development.js:26557:12)
    at workLoopSync (react-dom.development.js:26466:5)
    at renderRootSync (react-dom.development.js:26434:7)
    at recoverFromConcurrentError (react-dom.development.js:25850:20)
    at performSyncWorkOnRoot (react-dom.development.js:26096:20)
