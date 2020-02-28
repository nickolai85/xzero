import React, { Component } from 'react';
import {connect} from 'react-redux';

class CourseLibrary extends Component {
    constructor(props) {
        super(props)
        this.renderCourse = this.renderCourse.bind(this);
    }
    renderCourse(course) {
        return (
        <li key={course.description} className="course">
            <div className="course_info">
                <div className="course_title-container">
                    <div className="course_title">{course.title}</div>
                </div>
            </div>
        </li>
        )
    }
    render() {
        return (
            <div>
                <ul>
                    {this.props.courses.map(this.renderCourse)}
                </ul>
           </div>
        )
    }
}
function mapStateToProps(state){
    console.log(`state: ${JSON.stringify(state.courses)}`)
   // this.props = state;
    return {courses: state.courses}
}
export default connect(mapStateToProps)(CourseLibrary);