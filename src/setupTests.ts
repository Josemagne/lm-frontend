import "@testing-library/jest-dom/extend-expect";
import React from "react"
import Adapter from 'enzyme-adapter-react-16';
import { expect } from "chai";
import { configure } from 'enzyme';

configure({ adapter: new Adapter(), disableLifecycleMethods: false })