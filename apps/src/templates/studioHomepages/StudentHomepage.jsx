import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import HeaderBanner from '../HeaderBanner';
import RecentCourses from './RecentCourses';
import StudentSections from './StudentSections';
import ProjectWidgetWithData from '@cdo/apps/templates/projects/ProjectWidgetWithData';
import shapes from './shapes';
import ProtectedStatefulDiv from '../ProtectedStatefulDiv';
import i18n from '@cdo/locale';
import $ from 'jquery';

export default class StudentHomepage extends Component {
  static propTypes = {
    courses: shapes.courses,
    topCourse: shapes.topCourse,
    sections: shapes.sections,
    isRtl: PropTypes.bool.isRequired,
    canLeave: PropTypes.bool.isRequired,
    canViewAdvancedTools: PropTypes.bool,
  };

  componentDidMount() {
    // The component used here is implemented in legacy HAML/CSS rather than React.
    $('#flashes').appendTo(ReactDOM.findDOMNode(this.refs.flashes)).show();
  }

  render() {
    const { courses, sections, isRtl, canLeave, topCourse } = this.props;
    const { canViewAdvancedTools } = this.props;

    return (
      <div>
        <HeaderBanner
          headingText={i18n.homepageHeading()}
          short={true}
        />
        <ProtectedStatefulDiv
          ref="flashes"
        />
        <RecentCourses
          courses={courses}
          topCourse={topCourse}
          isTeacher={false}
          isRtl={false}
        />
        <ProjectWidgetWithData
          isRtl={isRtl}
          canViewFullList={true}
          canViewAdvancedTools={canViewAdvancedTools}
        />
        <StudentSections
          initialSections={sections}
          isRtl={isRtl}
          canLeave={canLeave}
        />
      </div>
    );
  }
}
