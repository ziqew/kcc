# == Schema Information
#
# Table name: levels
#
#  id                    :integer          not null, primary key
#  game_id               :integer
#  name                  :string(255)      not null
#  created_at            :datetime
#  updated_at            :datetime
#  level_num             :string(255)
#  ideal_level_source_id :integer
#  user_id               :integer
#  properties            :text(65535)
#  type                  :string(255)
#  md5                   :string(255)
#  published             :boolean          default(FALSE), not null
#  notes                 :text(65535)
#  audit_log             :text(65535)
#
# Indexes
#
#  index_levels_on_game_id  (game_id)
#  index_levels_on_name     (name)
#

# Text Match type.
class TextMatch < DSLDefined
  def dsl_default
    <<ruby
name 'Enter name here'
title 'Enter title here'
content1 'Enter prompt here'
answer 'Enter answer here'
ruby
  end

  def supports_markdown?
    true
  end

  def icon
    'fa-check-square-o'
  end
end