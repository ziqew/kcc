---
<%
def format_email_address(email, name='')
  name = "\"#{name.gsub('"', '\"').gsub("'","\\'")}\"" if name =~ /[;,\"\'\(\)]/
  "#{name} <#{email}>".strip
end

  workshop_row = DB[:forms].first(id:form.parent_id)
  workshop = JSON.parse(workshop_row[:data]).merge(JSON.parse(workshop_row[:processed_data]))

  affiliate = DASHBOARD_DB[:users].where(id: workshop_row[:user_id]).first
%>
to: '<%= format_email_address(affiliate[:email], affiliate[:name]) %>'
from: "Code.org <info@code.org>"
subject: "[Code.org] Workshop registration - <%= workshop['dates'].map{|i| i['date_s']}.join(', ') %>"
litmus_tracking_id: "ioqy9lh1"
---

<%
  workshop_row = DB[:forms].first(id:form.parent_id)
  workshop = JSON.parse(workshop_row[:data]).merge(JSON.parse(workshop_row[:processed_data]))
%>

The following teacher has signed up for one of your workshops:

- Name: <%= name_s %>
- Email address: [<%= email_s %>](<%= email_s %>)
- Role: <%= ((teacher_role_ss || []) - ['Other']).concat(teacher_role_other_ss || []).sort.uniq.join(', ') %>
- Tech experience: <%= teacher_tech_experience_level_s %>
- School name: <%= school_name_s %>
- School location: <%= school_location_s %>
- School type: <%= (school_type_ss || []).join(', ') %>
- School level: <%= (school_levels_ss || []).join(', ') %>
- Number of students at school: <%= number_students_s %>

Workshop details:

- Date(s): <%= workshop['dates'].map{|i| i['date_s']}.join(', ') %>
- Location: [<%= workshop['location_name_s'] %>](http://<%=CDO.canonical_hostname('code.org')%>/manage-professional-development-workshops#/<%= workshop_row[:secret] %>/view)

![](<%= tracking_pixel %>)
