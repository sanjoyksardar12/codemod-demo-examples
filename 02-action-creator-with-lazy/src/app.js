
import React, { Component } from "react";
import { connect } from "react-redux";
import  { additionFour } from "./actions/addition.js";


class App extends Component {
  componentDidMount() {
    additionFour(2, 3, 4, 5);

    setTimeout(() => {
      const { multiplication2, multiplication3 } = this.props;
      multiplication2(2, 3);
      setTimeout(() => {
        multiplication3(2, 3, 4);
      }, 1000);

    }, 1000 * 2);

    setTimeout(() => {
      const { addition2, addition3 } = this.props;
      addition2(2, 3, 4);
      setTimeout(() => {
        addition3(2, 3, 4);
      }, 1000);
    }, 1000 * 4);

    setTimeout(() => {
      const { subtraction2 , subtraction3 } = this.props;
      subtraction2(2, 3);
      setTimeout(() => {
        subtraction3(2, 3, 4);
      }, 1000);
    }, 1000 * 6);

  }

  render() {
    const { addition, subtraction, multiplication } = this.props;
    return (
      <div className="App">
        <h1>Action creator with lazy</h1>
        <h2> Multiplication: {multiplication} </h2>
        <h2> Addition: {addition} </h2>
        <h2> Subtraction: {subtraction} </h2>
      </div>
    );
  }
}

const mapStateToProps = state=>{
  return{
    ...state
  }
}

const mapdispatchToProps = (dispatch) => ({
  multiplication2: (...rest) => import("./actions/multiplication.js")
    .then(({ default: multiplication }) => dispatch(multiplication(...rest))),

  multiplication3: (...rest) => import("./actions/multiplication.js")
    .then(({ multiplication3 }) => dispatch(multiplication3(...rest))),

  addition2: (...rest) => import("./actions/addition.js")
    .then(({ default: addition }) => dispatch(addition(...rest))),

  addition3: (...rest) => import("./actions/addition.js")
    .then(({ additionThree }) => dispatch(additionThree(...rest))),

  subtraction2: (...rest) => import("./actions/subtraction.js")
    .then(({ default: subtraction }) => dispatch(subtraction(...rest))),

  subtraction3: (...rest) => import("./actions/subtraction.js")
    .then(({ subtractionThree : subThree }) => dispatch(subThree(...rest))),
});


export default connect(mapStateToProps, mapdispatchToProps)(App);



// const mapdispatchToProps = (dispatch) => ({
//   multiplication2: (...rest) => import(/* webpackPrefetch: true */ "./actions/multiplication.js")
//     .then(({ default: multiplication }) => dispatch(multiplication(...rest))),

//   multiplication3: (...rest) => import(/* webpackPrefetch: true */ "./actions/multiplication.js")
//     .then(({ multiplication3 }) => dispatch(multiplication3(...rest))),

//   addition2: (...rest) => import(/* webpackPrefetch: true */ "./actions/addition.js")
//     .then(({ default: addition }) => dispatch(addition(...rest))),

//   addition3: (...rest) => import(/* webpackPrefetch: true */ "./actions/addition.js")
//     .then(({ additionThree }) => dispatch(additionThree(...rest))),

//   subtraction2: (...rest) => import( /* webpackPrefetch: true  */ /*  webpackMode: "lazy" */"./actions/subtraction.js")
//     .then(({ default: subtraction }) => dispatch(subtraction(...rest))),

//   subtraction3: (...rest) => import( /* webpackPrefetch: true */ /*  webpackMode: "lazy" */"./actions/subtraction.js")
//     .then(({ subtractionThree : subThree }) => dispatch(subThree(...rest))),
// });


// function lazyLoadAction({filename, dispatch, functionName, args}){
//   return (a, b)=>import(
//     /* webpackChunkName: "my-chunk-name" */
//     /* webpackMode: "lazy" */
//     /* webpackExports: ["default", "named"] */
//     `./actions/${filename}`)
//     .then((module)=>dispatch(module["default"](a, b)))
// }


