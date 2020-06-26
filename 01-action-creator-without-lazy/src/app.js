
import React, { Component } from "react";
import { connect } from "react-redux";
import multiplication, * as multiplicationActions from "./actions/multiplication.js";
import addition, { additionThree, additionFour } from "./actions/addition.js";
import subtraction, { subtractionThree as subThree } from "./actions/subtraction.js";


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
      addition2(2, 3);
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
        <h1>Action creator without lazy</h1>
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

const mapdispatchToProps= {
  multiplication2: multiplication,
  ...multiplicationActions,
  addition2: addition,
  addition3: additionThree,
  subtraction2: subtraction,
  subtraction3: subThree
};


export default connect(mapStateToProps, mapdispatchToProps)(App);

// function lazyLoadAction({filename, dispatch, functionName, args}){
//   return (a, b)=>import(
//     /* webpackChunkName: "my-chunk-name" */
//     /* webpackMode: "lazy" */
//     /* webpackExports: ["default", "named"] */
//     `./actions/${filename}`)
//     .then((module)=>dispatch(module["default"](a, b)))
// }


